// src/components/Admin.jsx
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  allProducts, 
  collections, 
  updateAllProducts,
  addNewProduct,
  updateProduct,
  deleteProduct,
  getDynamicStats,
  checkStorageQuota,
  cleanupOldImages
} from '../data/products';

// للتشخيص - أضف هذا في بداية الملف
console.log('Admin.jsx loading...');
try {
  const quota = checkStorageQuota();
  console.log('Storage quota:', quota);
} catch (e) {
  console.error('Error checking storage:', e);
}

// معالج الأخطاء العام
window.onerror = function(msg, url, lineNo, columnNo, error) {
  console.error('Global error in Admin:', { msg, url, lineNo, columnNo, error });
  return false;
};

// دالة ضغط الصور
const compressImage = async (base64String, maxWidth = 800, maxHeight = 800, quality = 0.7) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = base64String;
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;
      
      // تصغير الأبعاد إذا كانت أكبر من الحد الأقصى
      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }
      
      canvas.width = width;
      canvas.height = height;
      
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      
      // ضغط الجودة
      const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
      resolve(compressedBase64);
    };
    
    img.onerror = () => {
      // إذا فشل الضغط، أرجع الصورة الأصلية
      resolve(base64String);
    };
  });
};

// دالة تحويل الملف إلى Base64
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

// دالة تصحيح مسار الصور
const correctImagePath = (imagePath) => {
  if (!imagePath) return '';
  let path = imagePath.trim().replace(/\\/g, '/');
  
  if (path.startsWith('/Img/') || path.startsWith('/images/') || path.startsWith('http') || path.startsWith('data:')) {
    return path;
  }
  
  if (path.startsWith('/')) {
    return '/Img' + path;
  }
  
  return '/Img/' + path;
};

const getDefaultImage = (collectionType) => {
  const collectionImages = {
    '01-Basic-Pinks': '/Img/Collections/01-Basic-Pinks/01-Basic-Pinks-Grading-Colours/Main.jpeg',
    '02-Christian-Dior': '/Img/Collections/02-Christian-Dior/01-Christian-Dior-Collection/Main.jpeg',
    '03-Islamic-Ornaments': '/Img/Collections/03-Islamic-Ornaments/01-Islamic-Ornaments-Collection/Main.jpeg',
    '04-Islamic-Scarf': '/Img/Collections/04-Islamic-Scarf/01-Islamic-Scarf-Collection/Main.jpeg',
    '05-Ramadan': '/Img/Collections/05-Ramadan/01-Ramadan-Collection/Main.jpeg',
    '06-Pattern': '/Img/Collections/06-Pattern/01-Pattern-Collection/Main.jpeg',
    '07-Itamine': '/Img/Collections/07-Itamine/01-Itamine-design-collection/Main.jpeg',
    '08-Colourfull-Limited': '/Img/Collections/08-Colourfull-Limited/01-Colourfull-Limited-Design-Collection/Main.jpeg',
    '09-Melt-designs': '/Img/Collections/09-Melt-designs/01-Melt-designs-Collection/01.jpeg',
    '10-Beige-Basic-grad': '/Img/Collections/10-Beige-Basic-grad/01-Beige-Basic-grad-Colours-Collection/Main.jpeg'
  };
  return collectionImages[collectionType] || '/Img/Collections/default-product.jpg';
};

// تخزين الصور في localStorage مع الضغط
const saveImageToStorage = async (file) => {
  try {
    let base64 = await fileToBase64(file);
    
    // ضغط الصورة إذا كانت أكبر من 500KB
    if (file.size > 500 * 1024) {
      base64 = await compressImage(base64, 800, 800, 0.7);
    }
    
    const imageId = `image_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const storageKey = `tar7a_image_${imageId}`;
    
    // تحقق من المساحة قبل الحفظ
    const quota = checkStorageQuota();
    if (quota.isFull) {
      // نظف الصور القديمة
      const deleted = cleanupOldImages(allProducts);
      console.log(`Cleaned up ${deleted} unused images`);
    }
    
    localStorage.setItem(storageKey, base64);
    
    return {
      id: imageId,
      name: file.name,
      type: file.type,
      size: file.size,
      url: base64,
      storageKey: storageKey
    };
  } catch (error) {
    console.error('Error saving image:', error);
    if (error.name === 'QuotaExceededError') {
      throw new Error('مساحة التخزين ممتلئة. الرجاء حذف بعض الصور القديمة.');
    }
    throw error;
  }
};

// مكون Drag & Drop لرفع الصور
const ImageUploader = ({ 
  onImagesUploaded, 
  onImageSelected, 
  language, 
  multiple = false,
  initialImages = []
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedImages, setUploadedImages] = useState(initialImages);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const processFile = async (file) => {
    try {
      const savedImage = await saveImageToStorage(file);
      
      return {
        ...savedImage,
        path: `/Img/Uploads/${savedImage.id}.${file.type.split('/')[1] || 'jpg'}`,
        previewUrl: savedImage.url
      };
    } catch (error) {
      console.error('Error processing file:', error);
      throw error;
    }
  };

  const handleDrop = useCallback(async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    setError(null);
    
    const files = Array.from(e.dataTransfer.files).filter(file => 
      file.type.startsWith('image/')
    );
    
    if (files.length === 0) {
      setError(language === 'ar' ? 'الرجاء رفع ملفات صور فقط' : 'Please upload image files only');
      return;
    }
    
    if (!multiple && files.length > 1) {
      setError(language === 'ar' ? 'يمكن رفع صورة واحدة فقط' : 'Only one image can be uploaded');
      return;
    }
    
    setUploading(true);
    
    try {
      const processedImages = await Promise.all(files.map(processFile));
      
      if (multiple) {
        const newImages = [...uploadedImages, ...processedImages];
        setUploadedImages(newImages);
        onImagesUploaded(newImages);
      } else {
        setUploadedImages(processedImages);
        onImageSelected(processedImages[0]);
      }
    } catch (error) {
      console.error('Error processing files:', error);
      setError(error.message || (language === 'ar' ? 'حدث خطأ في معالجة الصور' : 'Error processing images'));
    } finally {
      setUploading(false);
    }
  }, [multiple, uploadedImages, onImagesUploaded, onImageSelected, language]);

  const handleFileInput = async (e) => {
    const files = Array.from(e.target.files).filter(file => 
      file.type.startsWith('image/')
    );
    
    if (files.length === 0) return;
    
    setUploading(true);
    setError(null);
    
    try {
      const processedImages = await Promise.all(files.map(processFile));
      
      if (multiple) {
        const newImages = [...uploadedImages, ...processedImages];
        setUploadedImages(newImages);
        onImagesUploaded(newImages);
      } else {
        setUploadedImages(processedImages);
        onImageSelected(processedImages[0]);
      }
    } catch (error) {
      console.error('Error processing files:', error);
      setError(error.message || (language === 'ar' ? 'حدث خطأ في معالجة الصور' : 'Error processing images'));
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const removeImage = useCallback((index) => {
    const imageToRemove = uploadedImages[index];
    if (imageToRemove.storageKey) {
      localStorage.removeItem(imageToRemove.storageKey);
    }
    
    const newImages = uploadedImages.filter((_, i) => i !== index);
    setUploadedImages(newImages);
    onImagesUploaded(newImages);
  }, [uploadedImages, onImagesUploaded]);

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}
      
      <div
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer ${
          isDragging 
            ? 'border-primary bg-primary/10' 
            : 'border-gray-300 dark:border-gray-600 hover:border-primary hover:bg-gray-50 dark:hover:bg-gray-800'
        }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={triggerFileInput}
      >
        {uploading ? (
          <div className="flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-3"></div>
            <p className="text-gray-600 dark:text-gray-400">
              {language === 'ar' ? 'جاري رفع الصور...' : 'Uploading images...'}
            </p>
          </div>
        ) : (
          <>
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl text-primary">
                {multiple ? 'photo_library' : 'add_photo_alternate'}
              </span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              {multiple 
                ? (language === 'ar' ? 'اسحب وأفلت صوراً هنا' : 'Drag & drop images here')
                : (language === 'ar' ? 'اسحب وأفلت صورة هنا' : 'Drag & drop an image here')
              }
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              {multiple 
                ? (language === 'ar' ? 'أو انقر لاختيار صور متعددة' : 'Or click to select multiple images')
                : (language === 'ar' ? 'أو انقر لاختيار صورة' : 'Or click to select an image')
              }
            </p>
            <span className="text-xs text-gray-400">
              {language === 'ar' ? 'JPG, PNG, GIF, WebP - سيتم ضغط الصور الكبيرة' : 'JPG, PNG, GIF, WebP - Large images will be compressed'}
            </span>
          </>
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInput}
        accept="image/*"
        multiple={multiple}
        className="hidden"
      />

      {/* عرض الصور المرفوعة */}
      {uploadedImages.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            {multiple 
              ? `${uploadedImages.length} ${language === 'ar' ? 'صورة مرفوعة' : 'images uploaded'}`
              : (language === 'ar' ? 'الصورة المرفوعة' : 'Uploaded image')
            }
          </h4>
          <div className={`grid gap-3 ${multiple ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4' : ''}`}>
            {uploadedImages.map((image, index) => (
              <div key={image.id || index} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <img
                    src={image.previewUrl || image.url}
                    alt={`Uploaded ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2VlZWVlZSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiM5OTk5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZSBFcnJvcjwvdGV4dD48L3N2Zz4=';
                    }}
                  />
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(index);
                  }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
                <div className="mt-1 text-xs text-gray-500 truncate">
                  {image.name || `صورة ${index + 1}`}
                </div>
                {!multiple && (
                  <div className="mt-2 text-center">
                    <button
                      type="button"
                      onClick={() => onImageSelected(image)}
                      className="text-sm text-primary hover:text-primary-dark font-medium"
                    >
                      {language === 'ar' ? 'استخدم هذه الصورة' : 'Use this image'}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// مكون المنتج في لوحة التحكم
const AdminProductCard = ({ product, onDelete, onEdit, language }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
        {!imageError ? (
          <img
            src={correctImagePath(product.image)}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <span className="material-symbols-outlined text-gray-400 text-4xl mb-2">image</span>
            <span className="text-gray-500 text-sm">{product.name}</span>
          </div>
        )}
        
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.hasOffer && (
            <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full">
              {language === 'ar' ? 'عرض' : 'Offer'}
            </span>
          )}
          {!product.inStock && (
            <span className="px-2 py-1 bg-gray-500 text-white text-xs rounded-full">
              {language === 'ar' ? 'نفذ' : 'Out'}
            </span>
          )}
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-gray-800 dark:text-white truncate flex-1">
            {product.name}
          </h3>
          <span className="text-primary font-bold text-lg ml-2">
            {product.price}
          </span>
        </div>
        
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded">
            {product.collectionName}
          </span>
          <span className="flex items-center text-xs text-gray-500">
            <span className="material-symbols-outlined text-sm mr-1">star</span>
            {product.rating}
          </span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(product)}
            className="flex-1 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg py-2 text-sm font-medium transition-colors flex items-center justify-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">edit</span>
            {language === 'ar' ? 'تعديل' : 'Edit'}
          </button>
          <button
            onClick={() => onDelete(product.id)}
            className="flex-1 bg-red-100 text-red-600 hover:bg-red-200 rounded-lg py-2 text-sm font-medium transition-colors flex items-center justify-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">delete</span>
            {language === 'ar' ? 'حذف' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

// نموذج إضافة/تعديل المنتج مع Drag & Drop
const ProductForm = ({ product, onSubmit, onCancel, language, collectionsList }) => {
  const [formData, setFormData] = useState({
    id: product?.id || `product_${Date.now()}`,
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || '130 EGP',
    collectionType: product?.collectionType || '01-Basic-Pinks',
    inStock: product?.inStock !== undefined ? product.inStock : true,
    hasOffer: product?.hasOffer || false,
    rating: product?.rating || 4.0,
    popularity: product?.popularity || 100,
    reviews: product?.reviews || 5,
    material: product?.material || 'شيفون حريري فاخر',
    weight: product?.weight || '150 جرام',
    dimensions: product?.dimensions || '110 × 110 سم',
    image: product?.image || '',
    images: product?.images || [],
  });

  const [uploadedImages, setUploadedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (product?.images && product.images.length > 0) {
      const initialImages = product.images.map((img, index) => ({
        id: `existing_${index}`,
        url: correctImagePath(img),
        path: img,
        previewUrl: correctImagePath(img)
      }));
      setUploadedImages(initialImages);
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));
    
    if (name === 'collectionType' && !formData.image && uploadedImages.length === 0) {
      const defaultImg = getDefaultImage(newValue);
      setFormData(prev => ({ 
        ...prev, 
        image: defaultImg,
        images: [defaultImg]
      }));
    }
  };

  const handleImageUpload = (images) => {
    setUploadedImages(images);
    if (images.length > 0) {
      setFormData(prev => ({
        ...prev,
        image: images[0].previewUrl,
        images: images.map(img => img.previewUrl)
      }));
    }
  };

  const handleSingleImageSelect = (image) => {
    setFormData(prev => ({
      ...prev,
      image: image.previewUrl,
      images: [image.previewUrl]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      // تحقق من المساحة قبل الحفظ
      const quota = checkStorageQuota();
      if (quota.isFull) {
        const confirmSave = window.confirm(
          language === 'ar' 
            ? 'مساحة التخزين ممتلئة تقريباً. هل تريد محاولة الحفظ مع تنظيف الصور القديمة؟'
            : 'Storage is almost full. Do you want to try saving with cleanup?'
        );
        if (!confirmSave) {
          setIsLoading(false);
          return;
        }
        // تنظيف الصور القديمة
        cleanupOldImages(allProducts);
      }
      
      const processedData = {
        ...formData,
        rating: parseFloat(formData.rating) || 4.0,
        popularity: parseInt(formData.popularity) || 100,
        reviews: parseInt(formData.reviews) || 5,
        collectionName: collectionsList.find(c => c.id === formData.collectionType)?.name || 'مجموعة إسلامية',
        colors: product?.colors || [
          { name: 'ذهبي', value: '#FFD700' },
          { name: 'فضي', value: '#C0C0C0' },
          { name: 'أبيض', value: '#FFFFFF' },
          { name: 'أسود', value: '#000000' }
        ],
        sizes: product?.sizes || ['S', 'M', 'L', 'XL'],
        tags: product?.tags || ['فاخر', 'إسلامي', 'حجاب', 'شيفون'],
        images: formData.images.length > 0 ? formData.images : [formData.image],
        image: formData.images[0] || formData.image
      };
      
      await onSubmit(processedData);
    } catch (error) {
      console.error('Error submitting form:', error);
      setError(error.message || (language === 'ar' ? 'حدث خطأ في حفظ المنتج' : 'Error saving product'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              {product ? (language === 'ar' ? 'تعديل المنتج' : 'Edit Product') : (language === 'ar' ? 'إضافة منتج جديد' : 'Add New Product')}
            </h2>
            <button
              onClick={onCancel}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {error && (
            <div className="mb-6 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* القسم الأيمن: صورة المنتج */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                  {language === 'ar' ? 'صور المنتج' : 'Product Images'}
                </h3>
                
                <ImageUploader
                  onImagesUploaded={handleImageUpload}
                  onImageSelected={handleSingleImageSelect}
                  language={language}
                  multiple={true}
                  initialImages={uploadedImages}
                />
                
                {/* معاينة الصورة الرئيسية */}
                {formData.image && (
                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      {language === 'ar' ? 'الصورة الرئيسية' : 'Main Image'}
                    </h4>
                    <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4">
                      <img
                        src={correctImagePath(formData.image)}
                        alt="Main Preview"
                        className="w-full h-48 object-cover rounded"
                        onError={(e) => {
                          e.target.src = getDefaultImage(formData.collectionType);
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* القسم الأيسر: بيانات المنتج */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {language === 'ar' ? 'اسم المنتج' : 'Product Name'} *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {language === 'ar' ? 'الوصف' : 'Description'} *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {language === 'ar' ? 'السعر' : 'Price'} *
                    </label>
                    <input
                      type="text"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                      placeholder="130 EGP"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {language === 'ar' ? 'المجموعة' : 'Collection'} *
                    </label>
                    <select
                      name="collectionType"
                      value={formData.collectionType}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                    >
                      {collectionsList.map(collection => (
                        <option key={collection.id} value={collection.id}>
                          {collection.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {language === 'ar' ? 'التقييم' : 'Rating'}
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange}
                        min="0"
                        max="5"
                        step="0.1"
                        className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="text-primary font-bold w-10">{formData.rating}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {language === 'ar' ? 'الشعبية' : 'Popularity'}
                    </label>
                    <input
                      type="number"
                      name="popularity"
                      value={formData.popularity}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {language === 'ar' ? 'المادة' : 'Material'}
                    </label>
                    <input
                      type="text"
                      name="material"
                      value={formData.material}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {language === 'ar' ? 'الأبعاد' : 'Dimensions'}
                    </label>
                    <input
                      type="text"
                      name="dimensions"
                      value={formData.dimensions}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                    />
                  </div>
                </div>

                <div className="flex gap-6 pt-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="inStock"
                      checked={formData.inStock}
                      onChange={handleChange}
                      className="w-4 h-4 text-primary rounded focus:ring-primary"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {language === 'ar' ? 'متوفر في المخزون' : 'In Stock'}
                    </span>
                  </label>
                  
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="hasOffer"
                      checked={formData.hasOffer}
                      onChange={handleChange}
                      className="w-4 h-4 text-primary rounded focus:ring-primary"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {language === 'ar' ? 'عرض خاص' : 'Special Offer'}
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    {language === 'ar' ? 'جاري الحفظ...' : 'Saving...'}
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined">check</span>
                    {product ? (language === 'ar' ? 'حفظ التغييرات' : 'Save Changes') : (language === 'ar' ? 'إضافة المنتج' : 'Add Product')}
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={onCancel}
                disabled={isLoading}
                className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 py-3 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="material-symbols-outlined">close</span>
                {language === 'ar' ? 'إلغاء' : 'Cancel'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const Admin = () => {
  const { language } = useLanguage();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedCollection, setSelectedCollection] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [storageWarning, setStorageWarning] = useState(null);

  // تحميل المنتجات عند بدء التشغيل
  useEffect(() => {
    try {
      setProducts([...allProducts]);
      setFilteredProducts([...allProducts]);
      
      // فحص مساحة التخزين
      const quota = checkStorageQuota();
      if (quota.isFull) {
        const deleted = cleanupOldImages(allProducts);
        setStorageWarning(
          language === 'ar' 
            ? `تحذير: مساحة التخزين تقترب من الامتلاء (${quota.used}MB مستخدم). تم حذف ${deleted} صورة قديمة.`
            : `Warning: Storage is almost full (${quota.used}MB used). Deleted ${deleted} old images.`
        );
      }
    } catch (error) {
      console.error('Error loading products:', error);
    }
  }, [language]);

  // فلترة المنتجات
  useEffect(() => {
    let filtered = [...products];
    
    if (selectedCollection !== 'all') {
      filtered = filtered.filter(p => p.collectionType === selectedCollection);
    }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.name?.toLowerCase().includes(query) ||
        (p.description && p.description.toLowerCase().includes(query)) ||
        (p.collectionName && p.collectionName.toLowerCase().includes(query))
      );
    }
    
    setFilteredProducts(filtered);
  }, [selectedCollection, searchQuery, products]);

  const handleDeleteProduct = (productId) => {
    if (window.confirm(language === 'ar' ? 'هل أنت متأكد من حذف هذا المنتج؟' : 'Are you sure you want to delete this product?')) {
      try {
        const success = deleteProduct(productId);
        if (success) {
          setProducts([...allProducts]);
          alert(language === 'ar' ? 'تم حذف المنتج بنجاح' : 'Product deleted successfully');
        }
      } catch (error) {
        console.error('Error deleting product:', error);
        alert(language === 'ar' ? 'حدث خطأ في حذف المنتج' : 'Error deleting product');
      }
    }
  };

  const handleSubmitProduct = (productData) => {
    try {
      if (editingProduct) {
        const updated = updateProduct(editingProduct.id, productData);
        if (updated) {
          setProducts([...allProducts]);
          alert(language === 'ar' ? 'تم تحديث المنتج بنجاح' : 'Product updated successfully');
        }
      } else {
        const newProduct = addNewProduct(productData);
        setProducts([...allProducts]);
        alert(language === 'ar' ? 'تم إضافة المنتج بنجاح' : 'Product added successfully');
      }
      
      setShowForm(false);
      setEditingProduct(null);
    } catch (error) {
      console.error('Error saving product:', error);
      alert(error.message || (language === 'ar' ? 'حدث خطأ في حفظ المنتج' : 'Error saving product'));
    }
  };


  const stats = useMemo(() => {
    try {
      return getDynamicStats();
    } catch (error) {
      console.error('Error getting stats:', error);
      return {
        totalProducts: products.length,
        inStockCount: products.filter(p => p.inStock).length,
        outOfStockCount: products.filter(p => !p.inStock).length,
        averagePrice: 130,
        collectionsCount: collections.length
      };
    }
  }, [products]);

  if (!products.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            {language === 'ar' ? 'جاري تحميل المنتجات...' : 'Loading products...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {language === 'ar' ? 'لوحة التحكم - إدارة المنتجات' : 'Admin Panel - Product Management'}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {language === 'ar' 
                  ? 'إدارة منتجات متجر طرحة - الصور تحفظ في المتصفح'
                  : 'Manage Tar7a Store products - Images are saved in browser'
                }
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setShowForm(true);
                }}
                className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors flex items-center gap-2"
              >
                <span className="material-symbols-outlined">add</span>
                {language === 'ar' ? 'إضافة منتج جديد' : 'Add New Product'}
              </button>
              
              <button
                onClick={() => {
                  try {
                    const dataStr = JSON.stringify(allProducts.map(p => ({
                      ...p,
                      image: p.image?.startsWith('data:') ? '/Img/default-product.jpg' : p.image,
                      images: p.images ? p.images.map(img => 
                        img?.startsWith('data:') ? '/Img/default-product.jpg' : img
                      ) : []
                    })), null, 2);
                    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
                    const linkElement = document.createElement('a');
                    linkElement.setAttribute('href', dataUri);
                    linkElement.setAttribute('download', `tar7a_products_${new Date().toISOString().split('T')[0]}.json`);
                    linkElement.click();
                  } catch (error) {
                    console.error('Error exporting:', error);
                    alert(language === 'ar' ? 'حدث خطأ في التصدير' : 'Error exporting');
                  }
                }}
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <span className="material-symbols-outlined">download</span>
                {language === 'ar' ? 'تصدير المنتجات' : 'Export Products'}
              </button>
              
              <label className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 cursor-pointer">
                <span className="material-symbols-outlined">upload</span>
                {language === 'ar' ? 'استيراد منتجات' : 'Import Products'}
                <input
                  type="file"
                  accept=".json"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = (e) => {
                      try {
                        const importedProducts = JSON.parse(e.target.result);
                        if (Array.isArray(importedProducts)) {
                          if (window.confirm(
                            language === 'ar' 
                              ? `هل تريد استيراد ${importedProducts.length} منتج؟`
                              : `Import ${importedProducts.length} products?`
                          )) {
                            updateAllProducts(importedProducts);
                            setProducts(importedProducts);
                            alert(language === 'ar' ? 'تم الاستيراد بنجاح' : 'Import successful');
                          }
                        }
                      } catch (error) {
                        console.error('Error importing:', error);
                        alert(language === 'ar' ? 'خطأ في الملف' : 'File error');
                      }
                    };
                    reader.readAsText(file);
                  }}
                />
              </label>
              
            </div>
          </div>
          
          {/* تحذير التخزين */}
          {storageWarning && (
            <div className="mt-4 bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-800 text-yellow-800 dark:text-yellow-400 px-4 py-3 rounded-lg">
              {storageWarning}
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
            <div className="text-2xl font-bold text-primary mb-1">{stats.totalProducts}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {language === 'ar' ? 'إجمالي المنتجات' : 'Total Products'}
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
            <div className="text-2xl font-bold text-green-600 mb-1">{stats.inStockCount}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {language === 'ar' ? 'متوفر' : 'In Stock'}
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
            <div className="text-2xl font-bold text-yellow-600 mb-1">
              {Math.round(stats.averagePrice)} EGP
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {language === 'ar' ? 'متوسط السعر' : 'Avg Price'}
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
            <div className="text-2xl font-bold text-purple-600 mb-1">{stats.collectionsCount}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {language === 'ar' ? 'مجموعات' : 'Collections'}
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
            <div className="text-2xl font-bold text-red-600 mb-1">{stats.outOfStockCount}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {language === 'ar' ? 'غير متوفر' : 'Out of Stock'}
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <span className="material-symbols-outlined">search</span>
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={language === 'ar' ? 'بحث في المنتجات...' : 'Search products...'}
                  className="w-full px-4 py-2 pr-10 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                />
              </div>
            </div>
            
            <div className="md:w-64">
              <select
                value={selectedCollection}
                onChange={(e) => setSelectedCollection(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              >
                <option value="all">
                  {language === 'ar' ? 'كل المجموعات' : 'All Collections'}
                </option>
                {collections.map(collection => (
                  <option key={collection.id} value={collection.id}>
                    {collection.name} ({collection.count})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-4xl text-primary">inventory</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
              {language === 'ar' ? 'لا توجد منتجات' : 'No Products Found'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              {language === 'ar' 
                ? 'لم يتم العثور على منتجات تطابق بحثك'
                : 'No products match your search criteria'
              }
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCollection('all');
                setShowForm(true);
              }}
              className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors flex items-center gap-2 mx-auto"
            >
              <span className="material-symbols-outlined">add</span>
              {language === 'ar' ? 'إضافة أول منتج' : 'Add First Product'}
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <AdminProductCard
                  key={product.id}
                  product={product}
                  onDelete={handleDeleteProduct}
                  onEdit={(product) => {
                    setEditingProduct(product);
                    setShowForm(true);
                  }}
                  language={language}
                />
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setShowForm(true);
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300"
              >
                <span className="material-symbols-outlined">add</span>
                {language === 'ar' ? 'إضافة منتج جديد' : 'Add New Product'}
              </button>
              <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                {language === 'ar' ? 'عرض' : 'Showing'} {filteredProducts.length} {language === 'ar' ? 'من' : 'of'} {products.length} {language === 'ar' ? 'منتج' : 'products'}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Product Form Modal */}
      {showForm && (
        <ProductForm
          product={editingProduct}
          onSubmit={handleSubmitProduct}
          onCancel={() => {
            setShowForm(false);
            setEditingProduct(null);
          }}
          language={language}
          collectionsList={collections}
        />
      )}

      {/* Footer Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm text-gray-500 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>{language === 'ar' ? 'متوفر في المخزون' : 'In Stock'}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span>{language === 'ar' ? 'عرض خاص' : 'Special Offer'}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span>{language === 'ar' ? 'تصميم حصري' : 'Exclusive Design'}</span>
          </div>
        </div>
        <p className="mb-2">
          {language === 'ar' 
            ? '💾 الصور تحفظ في ذاكرة المتصفح (localStorage). يتم ضغط الصور الكبيرة تلقائياً.'
            : '💾 Images are saved in browser storage (localStorage). Large images are automatically compressed.'
          }
        </p>
        <p>
          {language === 'ar' 
            ? '📱 مساحة التخزين المتاحة: حتى 5-10MB. يتم تنظيف الصور غير المستخدمة تلقائياً.'
            : '📱 Available storage: Up to 5-10MB. Unused images are automatically cleaned up.'
          }
        </p>
      </div>
    </div>
  );
};

export default Admin;