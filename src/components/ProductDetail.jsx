import React, { useState, useEffect, useCallback, memo, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useLanguage, useT, useText, useHtml } from '../context/LanguageContext';
import { 
  allProducts, 
  collections
} from '../data/products';

// ميمو للمكونات الفرعية
const ImageThumbnail = memo(({ img, isActive, onClick, index }) => {
  const { t } = useLanguage();
  
  return (
    <button
      onClick={() => onClick(index)}
      className={`flex-shrink-0 w-28 h-28 rounded-2xl overflow-hidden border-4 transition-all duration-300 ${
        isActive 
          ? 'border-primary scale-105 shadow-xl' 
          : 'border-transparent hover:border-gray-300 hover:scale-105'
      }`}
      aria-label={`${t('common.viewImage')} ${index + 1}`}
    >
      <img 
        src={img} 
        alt={`${t('productDetail.productView')} ${index + 1}`}
        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        loading="lazy"
        onError={(e) => {
          e.target.onerror = null;
          e.target.style.display = 'none';
          const parent = e.target.parentElement;
          const fallback = document.createElement('div');
          fallback.className = 'w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center';
          fallback.innerHTML = `<span class="material-symbols-outlined text-gray-400">image</span>`;
          parent.appendChild(fallback);
        }}
      />
    </button>
  );
});

const RelatedProductThumbnail = memo(({ product, onClick }) => {
  const { t, translateText } = useLanguage();
  
  const correctImagePath = useCallback((imagePath) => {
    if (!imagePath) return '';
    
    let correctedPath = imagePath;
    correctedPath = correctedPath.replace(/\\/g, '/');
    
    if (correctedPath.startsWith('/img/')) {
      correctedPath = correctedPath.substring(4);
    }
    
    if (!correctedPath.startsWith('/') && !correctedPath.startsWith('http')) {
      correctedPath = '/' + correctedPath;
    }
    
    correctedPath = correctedPath.replace(/\/+/g, '/');
    return correctedPath;
  }, []);

  return (
    <button
      onClick={onClick}
      className="group relative w-full h-48 rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-2 border-transparent hover:border-primary transition-all duration-300"
    >
      <img 
        src={correctImagePath(product.image || product.images?.[0])}
        alt={product.name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
        onError={(e) => {
          e.target.onerror = null;
          e.target.style.display = 'none';
          const parent = e.target.parentElement;
          const fallback = document.createElement('div');
          fallback.className = 'absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex flex-col items-center justify-center';
          fallback.innerHTML = `
            <span class="material-symbols-outlined text-gray-400 text-2xl mb-1">image</span>
            <span class="text-xs text-gray-500">${product.name}</span>
          `;
          parent.appendChild(fallback);
        }}
        crossOrigin="anonymous"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute bottom-2 left-2 right-2 bg-black/60 backdrop-blur-sm rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <p className="text-white text-xs font-medium truncate text-center">{product.name}</p>
      </div>
    </button>
  );
});

const ColorOption = memo(({ color, isSelected, onClick }) => {
  const { t } = useLanguage();
  
  return (
    <button
      onClick={onClick}
      className={`group relative flex flex-col items-center gap-3 p-4 rounded-2xl transition-all duration-300 ${
        isSelected 
          ? 'bg-primary/10 ring-2 ring-primary scale-105 shadow-lg' 
          : 'hover:bg-gray-100 dark:hover:bg-gray-700/50'
      }`}
    >
      <div 
        className={`w-12 h-12 rounded-full border-4 shadow-lg transition-all duration-300 ${
          isSelected 
            ? 'border-white scale-110' 
            : 'border-white/50 group-hover:scale-110'
        }`}
        style={{ backgroundColor: typeof color === 'object' ? color.value : color || '#ccc' }}
      />
      <span className="text-sm font-medium dark:text-white text-center line-clamp-1">
        {typeof color === 'object' ? color.name : `${t('productDetail.color')} ${color}`}
      </span>
    </button>
  );
});

const SizeOption = memo(({ size, isSelected, onClick }) => (
  <button
    onClick={() => onClick(size)}
    className={`px-6 py-4 rounded-xl border-2 font-medium transition-all duration-300 hover:scale-105 active:scale-95 ${
      isSelected 
        ? 'border-primary bg-gradient-to-r from-primary/10 to-purple-600/10 text-primary shadow-xl' 
        : 'border-gray-300 dark:border-gray-600 dark:text-white hover:border-primary'
    }`}
  >
    {size}
  </button>
));

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, translateText, translateHtml, isArabic, direction } = useLanguage();
  
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isZoomed, setIsZoomed] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [error, setError] = useState(null);

  // تصحيح مسار الصور
  const correctImagePath = useCallback((imagePath) => {
    if (!imagePath) return '';
    
    let correctedPath = imagePath;
    correctedPath = correctedPath.replace(/\\/g, '/');
    
    if (correctedPath.startsWith('/img/')) {
      correctedPath = correctedPath.substring(4);
    }
    
    if (!correctedPath.startsWith('/') && !correctedPath.startsWith('http')) {
      correctedPath = '/' + correctedPath;
    }
    
    correctedPath = correctedPath.replace(/\/+/g, '/');
    return correctedPath;
  }, []);

  // ترجمة أسماء المجموعات
  const translateCollection = useCallback((collectionType) => {
    const collectionMap = {
      '01-Basic-Pinks': isArabic() ? 'الوردي الأساسي' : 'Basic Pinks',
      '02-Christian-Dior': isArabic() ? 'كريستيان ديور' : 'Christian Dior',
      '03-Islamic-Ornaments': isArabic() ? 'الزخارف الإسلامية' : 'Islamic Ornaments',
      '04-Islamic-Scarf': isArabic() ? 'الحجاب الإسلامي' : 'Islamic Scarf',
      '05-Ramadan': isArabic() ? 'رمضان' : 'Ramadan',
      '06-Pattern': isArabic() ? 'النقوش' : 'Pattern',
    };
    
    return collectionMap[collectionType] || collectionType;
  }, [isArabic]);

  // الحصول على معلومات المجموعة
  const collectionInfo = useMemo(() => {
    if (!product?.collectionType) return null;
    return collections.find(c => c.id === product.collectionType);
  }, [product]);

  // دالة للحصول على المنتجات حسب المجموعة
  const getProductsByCollection = useCallback((collectionId, excludeId) => {
    return allProducts.filter(product => 
      product.collectionType === collectionId && product.id !== excludeId
    );
  }, []);

  // الحصول على بيانات المنتج
  useEffect(() => {
    const loadProduct = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // البحث عن المنتج من allProducts
        const foundProduct = allProducts.find(p => p.id === id);
        
        if (!foundProduct) {
          setError(t('productDetail.notFound'));
          return;
        }
        
        setProduct(foundProduct);
        
        // تعيين القيم الافتراضية
        if (foundProduct.colors && foundProduct.colors.length > 0) {
          setSelectedColor(foundProduct.colors[0]);
        }
        if (foundProduct.sizes && foundProduct.sizes.length > 0) {
          setSelectedSize(foundProduct.sizes[0]);
        }
        
        // الحصول على منتجات ذات صلة من نفس المجموعة
        if (foundProduct.collectionType) {
          const related = getProductsByCollection(foundProduct.collectionType, foundProduct.id);
          setRelatedProducts(related.slice(0, 4));
        }
        
      } catch (err) {
        setError(t('productDetail.loadError'));
        console.error('Error loading product:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadProduct();
  }, [id, getProductsByCollection, t]);

  // الحصول على صور المنتج
  const getProductImages = useCallback(() => {
    if (!product) return [];
    
    const images = new Set();
    
    // إضافة الصورة الرئيسية
    if (product.image) {
      images.add(correctImagePath(product.image));
    }
    
    // إضافة الصور الإضافية
    if (product.images && Array.isArray(product.images)) {
      product.images.forEach(img => {
        if (img) {
          const correctedImg = correctImagePath(img);
          images.add(correctedImg);
        }
      });
    }
    
    return Array.from(images);
  }, [product, correctImagePath]);

  // الحصول على لون الخلفية المناسب للمجموعة
  const getCollectionBgColor = useCallback(() => {
    if (!product?.collectionType) return 'bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900';
    
    const colorMap = {
      '01-Basic-Pinks': 'bg-gradient-to-br from-pink-50 to-rose-100 dark:from-pink-900/20 dark:to-rose-900/20',
      '02-Christian-Dior': 'bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900',
      '03-Islamic-Ornaments': 'bg-gradient-to-br from-yellow-50 to-amber-100 dark:from-yellow-900/20 dark:to-amber-900/20',
      '04-Islamic-Scarf': 'bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20',
      '05-Ramadan': 'bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-purple-900/20 dark:to-indigo-900/20',
      '06-Pattern': 'bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20',
      '07-Itamine': 'bg-gradient-to-br from-red-50 to-pink-100 dark:from-red-900/20 dark:to-pink-900/20',
      '08-Colourfull-Limited': 'bg-gradient-to-br from-orange-50 to-red-100 dark:from-orange-900/20 dark:to-red-900/20',
      '09-Melt-designs': 'bg-gradient-to-br from-teal-50 to-green-100 dark:from-teal-900/20 dark:to-green-900/20',
      '10-Beige-Basic-grad': 'bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20',
    };
    
    return colorMap[product.collectionType] || colorMap['03-Islamic-Ornaments'];
  }, [product]);

  // الحصول على لون الشارة للمجموعة
  const getCollectionBadgeColor = useCallback(() => {
    if (!product?.collectionType) return 'bg-gradient-to-r from-blue-500 to-cyan-500';
    
    const colorMap = {
      '01-Basic-Pinks': 'bg-gradient-to-r from-pink-500 to-rose-600',
      '02-Christian-Dior': 'bg-gradient-to-r from-gray-700 to-black',
      '03-Islamic-Ornaments': 'bg-gradient-to-r from-yellow-600 to-yellow-800',
      '04-Islamic-Scarf': 'bg-gradient-to-r from-green-600 to-emerald-800',
      '05-Ramadan': 'bg-gradient-to-r from-purple-600 to-indigo-800',
      '06-Pattern': 'bg-gradient-to-r from-blue-500 to-cyan-500',
      '07-Itamine': 'bg-gradient-to-r from-red-500 to-pink-600',
      '08-Colourfull-Limited': 'bg-gradient-to-r from-orange-500 to-red-600',
      '09-Melt-designs': 'bg-gradient-to-r from-teal-500 to-green-600',
      '10-Beige-Basic-grad': 'bg-gradient-to-r from-amber-500 to-orange-600',
    };
    
    return colorMap[product.collectionType] || colorMap['03-Islamic-Ornaments'];
  }, [product]);

  // معالجة الطلب
  const handleOrderNow = useCallback(() => {
    if (!product) return;
    
    const images = getProductImages();
     const orderData = {
    productId: product.id,
    productName: product.name || '',
    productDescription: product.description || '',
    productPrice: product.price || '150EGP',
    productImage: images.length > 0 ? images[0] : '',
    selectedColor: selectedColor?.name || selectedColor || t('productDetail.color'),
    selectedSize: selectedSize || t('productDetail.size'),
    quantity: quantity,
    collectionType: product.collectionType,
    collectionName: translateCollection(product.collectionType),
    material: product.material || t('productDetail.material'),
    dimensions: product.dimensions || t('productDetail.oneSize'),
    timestamp: new Date().toISOString()
  };
    
    localStorage.setItem('lastSelectedProduct', JSON.stringify(orderData));
    navigate('/order-form');
  }, [product, selectedColor, selectedSize, quantity, getProductImages, navigate]);

  // معالج أخطاء الصور الرئيسية
  const handleMainImageError = useCallback((e) => {
    e.target.onerror = null;
    e.target.style.display = 'none';
    const parent = e.target.parentElement;
    const fallback = document.createElement('div');
    fallback.className = 'absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center';
    fallback.innerHTML = `
      <div class="text-center">
        <span class="material-symbols-outlined text-gray-400 text-6xl mb-4">image</span>
        <p class="text-gray-500 text-lg">${product?.name || t('productDetail.productImage')}</p>
      </div>
    `;
    parent.appendChild(fallback);
  }, [product, t]);

  // التنقل لمنتج مرتبط
  const navigateToRelatedProduct = useCallback((productId) => {
    navigate(`/product/${productId}`);
  }, [navigate]);

  // تحميل الهيكل العظمي
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-peach-soft/10 to-white dark:from-background-dark dark:via-gray-900/50 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-16">
          <div className="animate-pulse">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
              {/* جانب الصور */}
              <div className="lg:w-1/2 space-y-8">
                <div className="bg-gray-200 dark:bg-gray-700 rounded-3xl aspect-square"></div>
                <div className="flex gap-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-28 h-28 bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>
                  ))}
                </div>
              </div>
              
              {/* جانب التفاصيل */}
              <div className="lg:w-1/2 space-y-8">
                <div>
                  <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
                
                <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                
                <div className="space-y-4">
                  <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // صفحة الخطأ
  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-peach-soft/10 to-white dark:from-background-dark dark:via-gray-900/50 dark:to-gray-900 flex items-center justify-center" dir={direction}>
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-r from-primary/10 to-purple-600/10 rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-5xl text-primary">error</span>
          </div>
         <h1 className="text-3xl font-bold text-[#2d1a1e] dark:text-white mb-4">
            {t('productDetail.notFound')}
        </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            {t('productDetail.productNotFoundMessage')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/products')}
              className="px-8 py-3 bg-gradient-to-r from-primary to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">store</span>
              {t('productDetail.backToProducts')}
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-8 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">home</span>
              {t('productDetail.returnHome')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const images = getProductImages();
  const productBgClass = getCollectionBgColor();
  const collectionBadgeColor = getCollectionBadgeColor();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-peach-soft/5 to-white dark:from-background-dark dark:via-gray-900/50 dark:to-gray-900" dir={direction}>
      {/* خلفية متحركة */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-16 relative">
        {/* مسار التنقل */}
        <nav className={`flex items-center gap-2 text-sm text-[#2d1a1e]/60 dark:text-gray-400 mb-12 ${isArabic() ? 'flex-row-reverse' : ''}`}>
          <button 
            onClick={() => navigate('/')}
            className="hover:text-primary transition-colors flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-base">home</span>
            {t('header.home')}
          </button>
          <span className="material-symbols-outlined text-base">{isArabic() ? 'chevron_left' : 'chevron_right'}</span>
          <button 
            onClick={() => navigate('/products')}
            className="hover:text-primary transition-colors flex items-center gap-1"
          >
            {t('header.allProducts')}
          </button>
          <span className="material-symbols-outlined text-base">{isArabic() ? 'chevron_left' : 'chevron_right'}</span>
          <span className="text-primary font-medium truncate max-w-xs">
            {product.name}
          </span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* قسم الصور */}
          <div className="space-y-8">
            {/* الصورة الرئيسية */}
            {images.length > 0 ? (
              <div 
                className={`relative rounded-3xl overflow-hidden shadow-2xl group cursor-zoom-in ${productBgClass}`}
                onClick={() => setIsZoomed(!isZoomed)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setIsZoomed(!isZoomed)}
              >
                <div className={`aspect-square transition-transform duration-700 ${isZoomed ? 'scale-150' : 'scale-100'}`}>
                  <img 
                    src={images[selectedImage]} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="eager"
                    onError={handleMainImageError}
                    crossOrigin="anonymous"
                  />
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                
                {/* الشارات */}
                <div className="absolute top-6 left-6 flex flex-col gap-3">
                  {product.hasOffer && (
                    <div className="px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-primary to-purple-600 text-white shadow-2xl backdrop-blur-sm">
                      {t('common.sale')}
                    </div>
                  )}
                  <div className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider ${collectionBadgeColor} text-white shadow-2xl backdrop-blur-sm`}>
                    {translateCollection(product.collectionType)}
                  </div>
                  {!product.inStock && (
                    <div className="px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-red-500 to-red-700 text-white shadow-2xl backdrop-blur-sm">
                      {t('common.outOfStock')}
                    </div>
                  )}
                </div>
                
                {/* التقييم */}
                <div className="absolute top-6 right-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-1 shadow-2xl">
                  <span className="material-symbols-outlined text-yellow-500 text-sm">star</span>
                  <span className="text-sm font-bold">{product.rating?.toFixed(1) || '4.5'}</span>
                </div>
                
                {/* تلميح التكبير */}
                <div className="absolute bottom-6 right-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full p-3 shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="material-symbols-outlined text-primary text-base">zoom_in</span>
                </div>
              </div>
            ) : (
              <div className={`relative rounded-3xl overflow-hidden shadow-2xl aspect-square ${productBgClass} flex items-center justify-center`}>
                <div className="text-center">
                  <span className="material-symbols-outlined text-gray-400 text-6xl mb-4">image</span>
                  <p className="text-gray-500 text-lg">{product.name}</p>
                </div>
              </div>
            )}
            
            {/* الصور المصغرة */}
            {images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {images.map((img, index) => (
                  <ImageThumbnail
                    key={index}
                    img={img}
                    isActive={selectedImage === index}
                    onClick={setSelectedImage}
                    index={index}
                  />
                ))}
              </div>
            )}
            
            {/* المنتجات ذات الصلة تحت الصورة */}
            {relatedProducts.length > 0 && (
              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                <div className="mb-6">
                  <h3 className="text-xl font-bold dark:text-white flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-lg">collections</span>
                    {t('productDetail.relatedProducts')}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {t('productDetail.discoverMore', { 
                      count: relatedProducts.length, 
                      collection: collectionInfo?.name || translateCollection(product.collectionType) 
                    })}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {relatedProducts.map(relatedProduct => (
                    <RelatedProductThumbnail
                      key={relatedProduct.id}
                      product={relatedProduct}
                      onClick={() => navigateToRelatedProduct(relatedProduct.id)}
                    />
                  ))}
                </div>
              </div>
            )}
            
            {/* إذا لم يكن هناك منتجات ذات صلة */}
            {relatedProducts.length === 0 && collectionInfo && (
              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                <div className="text-center p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary/10 to-primary/5 flex items-center justify-center mx-auto mb-4">
                    <span className="material-symbols-outlined text-primary text-2xl">collections</span>
                  </div>
                  <h3 className="text-lg font-bold dark:text-white mb-2">
                    {t('productDetail.noRelatedProducts')}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                    {t('productDetail.uniqueProduct')}
                  </p>
                  <button
                    onClick={() => navigate('/products')}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary/10 to-purple-600/10 text-primary rounded-xl font-medium hover:shadow-lg transition-all duration-300"
                  >
                    <span className="material-symbols-outlined text-sm">{isArabic() ? 'arrow_back' : 'arrow_forward'}</span>
                    {t('productDetail.browseAllProducts')}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* معلومات المنتج */}
          <div className="space-y-8">
            {/* العنوان */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-black text-[#2d1a1e] dark:text-white mb-4 leading-tight">
                  {product.name}
                </h1>
                <p className="text-xl text-[#2d1a1e]/70 dark:text-gray-400 mb-6">
                  {product.description}
                </p>
              </div>

              {/* السعر والمخزون */}
              <div className="flex flex-wrap items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="text-5xl font-black bg-gradient-to-r from-primary via-purple-600 to-pink-500 bg-clip-text text-transparent">
                    {product.price}
                  </div>
                  {product.originalPrice && (
                    <div className="text-xl text-gray-500 dark:text-gray-400 line-through">
                      {product.originalPrice}
                    </div>
                  )}
                  <div className={`text-sm ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                    {product.inStock ? t('common.inStock') : t('common.outOfStock')}
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-gray-400">visibility</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {t('productDetail.views')}:
                    </span>
                    <span className="font-medium">{product.popularity?.toLocaleString() || '0'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-gray-400">chat_bubble</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {t('productDetail.reviews')}:
                    </span>
                    <span className="font-medium">{product.reviews?.toLocaleString() || '0'}</span>
                  </div>
                </div>
              </div>

              {/* معلومات المجموعة */}
              {collectionInfo && (
                <div className="bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5 rounded-2xl p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-primary">collections_bookmark</span>
                    </div>
                    <div>
                      <div className="text-sm text-[#2d1a1e]/60 dark:text-gray-400 mb-1">
                        {t('productDetail.collection')}
                      </div>
                      <div className="font-bold text-lg dark:text-white">
                        {translateCollection(product.collectionType)}
                      </div>
                      <p className="text-sm text-[#2d1a1e]/70 dark:text-gray-400 mt-1">
                        {collectionInfo.count} {t('productDetail.products')}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* الوصف الكامل */}
   <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 border border-white/20 dark:border-gray-700/20" dir={direction}>
  <h3 className="text-2xl font-bold mb-6 dark:text-white flex items-center gap-3">
    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
      <span className="material-symbols-outlined text-primary">description</span>
    </div>
    {t('productDetail.description')}
  </h3>
  
  <div 
    className={`space-y-4 ${
      isArabic() ? 'text-right' : 'text-left'
    }`}
    dir={isArabic() ? 'rtl' : 'ltr'}
  >
    {/* الوصف الرئيسي */}
      {/* <p className={`text-[#2d1a1e]/80 dark:text-gray-300 text-lg ${
        isArabic() 
          ? 'leading-[1.9] font-arabic text-justify' 
          : 'leading-relaxed font-sans'
      }`}>
        {product.fullDescription || product.description}
      </p>
      */}
    {/* نقاط مميزة مع أيقونات */}
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 ${
      isArabic() ? 'text-right' : 'text-left'
    }`}>
      <div className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-primary/5 to-purple-500/5">
        <span className="material-symbols-outlined text-primary flex-shrink-0">
          check_circle
        </span>
        <div>
          <h4 className="font-bold dark:text-white mb-1">
            {isArabic() ? 'تصميم فريد' : 'Unique Design'}
          </h4>
          <p className="text-sm text-[#2d1a1e]/70 dark:text-gray-400">
            {isArabic() ? 'تصميم إسلامي مميز يناسب جميع الأذواق' : 'Premium Islamic design suitable for all tastes'}
          </p>
        </div>
      </div>
      
      <div className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-primary/5 to-purple-500/5">
        <span className="material-symbols-outlined text-primary flex-shrink-0">
          verified
        </span>
        <div>
          <h4 className="font-bold dark:text-white mb-1">
            {isArabic() ? 'جودة عالية' : 'High Quality'}
          </h4>
          <p className="text-sm text-[#2d1a1e]/70 dark:text-gray-400">
            {isArabic() ? 'صناعة يدوية بمواد ممتازة' : 'Handmade with excellent materials'}
          </p>
        </div>
      </div>
    </div>
  </div>
</div>

            {/* اختيار اللون */}
            {product.colors && product.colors.length > 0 && (
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 border border-white/20 dark:border-gray-700/20">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold dark:text-white flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary">palette</span>
                    </div>
                    {t('productDetail.chooseColor')}
                  </h3>
                  {selectedColor && (
                    <span className="text-primary font-medium">
                      {typeof selectedColor === 'object' ? selectedColor.name : `${t('productDetail.color')} ${selectedColor}`}
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
                  {product.colors.map((color, index) => (
                    <ColorOption
                      key={index}
                      color={color}
                      isSelected={selectedColor === color}
                      onClick={() => setSelectedColor(color)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* اختيار المقاس */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 border border-white/20 dark:border-gray-700/20">
                <h3 className="text-2xl font-bold mb-6 dark:text-white flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary">straighten</span>
                  </div>
                  {t('productDetail.chooseSize')}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size, index) => (
                    <SizeOption
                      key={index}
                      size={size}
                      isSelected={selectedSize === size}
                      onClick={setSelectedSize}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* الكمية والطلب */}
            <div className="space-y-6">
              <div className={`flex flex-col md:flex-row items-center gap-6 ${isArabic() ? 'md:flex-row-reverse' : ''}`}>
                <div className="w-full md:w-auto">
                  <div className={`flex items-center gap-4 ${isArabic() ? 'flex-row-reverse' : ''}`}>
                    <h3 className="text-xl font-bold dark:text-white whitespace-nowrap">
                      {t('productDetail.quantity')}:
                    </h3>
                    <div className={`flex items-center border-2 border-gray-300 dark:border-gray-600 rounded-xl overflow-hidden ${isArabic() ? 'flex-row-reverse' : ''}`}>
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-5 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        aria-label={t('productDetail.decreaseQuantity')}
                      >
                        <span className="material-symbols-outlined">remove</span>
                      </button>
                      <span className="px-8 py-3 text-xl font-bold min-w-[80px] text-center dark:text-white">
                        {quantity.toLocaleString(isArabic() ? 'ar-EG' : 'en-US')}
                      </span>
                      <button 
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-5 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        aria-label={t('productDetail.increaseQuantity')}
                      >
                        <span className="material-symbols-outlined">add</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="w-full md:flex-1">
                  <button
                    onClick={handleOrderNow}
                    disabled={!product.inStock}
                    className="w-full px-8 py-5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 group"
                    aria-label={t('common.buyNow')}
                  >
                    <span className="material-symbols-outlined text-xl group-hover:rotate-12 transition-transform">assignment</span>
                    {product.inStock ? t('common.buyNow') : t('common.outOfStock')}
                  </button>
                </div>
              </div>

              {/* إجمالي السعر */}
              <div className="bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5 rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold dark:text-white">
                    {t('cart.total')}:
                  </span>
                  <span className="text-3xl font-black bg-gradient-to-r from-primary via-purple-600 to-pink-500 bg-clip-text text-transparent">
                    {parseFloat(product.price.replace('EGP', '').trim()) * quantity} EGP
                  </span>
                </div>
              </div>
            </div>

            {/* تفاصيل المنتج */}
            <div className="bg-gradient-to-br from-white/80 to-white/60 dark:from-gray-800/80 dark:to-gray-900/60 backdrop-blur-sm rounded-3xl p-8 border border-white/20 dark:border-gray-700/20">
              <h3 className="text-2xl font-bold mb-8 dark:text-white flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary">info</span>
                </div>
                {t('productDetail.productDetails')}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* المادة */}
                <div className={`flex items-center gap-4 p-4 rounded-2xl bg-white/50 dark:bg-gray-800/50 ${isArabic() ? 'flex-row-reverse' : ''}`}>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-primary">checkroom</span>
                  </div>
                  <div>
                    <div className="text-sm text-[#2d1a1e]/60 dark:text-gray-400 mb-1">
                      {t('productDetail.material')}
                    </div>
                    <div className="font-medium dark:text-white">{product.material}</div>
                  </div>
                </div>
                
                {/* العناية */}
                <div className={`flex items-center gap-4 p-4 rounded-2xl bg-white/50 dark:bg-gray-800/50 ${isArabic() ? 'flex-row-reverse' : ''}`}>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-primary">cleaning_services</span>
                  </div>
                  <div>
                    <div className="text-sm text-[#2d1a1e]/60 dark:text-gray-400 mb-1">
                      {t('productDetail.care')}
                    </div>
                    <div className="font-medium dark:text-white">{product.care}</div>
                  </div>
                </div>
                
                {/* الأبعاد */}
                <div className={`flex items-center gap-4 p-4 rounded-2xl bg-white/50 dark:bg-gray-800/50 ${isArabic() ? 'flex-row-reverse' : ''}`}>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-primary">straighten</span>
                  </div>
                  <div>
                    <div className="text-sm text-[#2d1a1e]/60 dark:text-gray-400 mb-1">
                      {t('productDetail.dimensions')}
                    </div>
                    <div className="font-medium dark:text-white">{product.dimensions || product.sizes?.[0] || t('productDetail.oneSize')}</div>
                  </div>
                </div>
                
                {/* الوزن */}
                <div className={`flex items-center gap-4 p-4 rounded-2xl bg-white/50 dark:bg-gray-800/50 ${isArabic() ? 'flex-row-reverse' : ''}`}>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-primary">weight</span>
                  </div>
                  <div>
                    <div className="text-sm text-[#2d1a1e]/60 dark:text-gray-400 mb-1">
                      {t('productDetail.weight')}
                    </div>
                    <div className="font-medium dark:text-white">{product.weight}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* الشحن والدعم */}
            <div className="bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5 dark:from-primary/10 dark:via-purple-600/10 dark:to-pink-500/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 dark:border-gray-700/20">
              <h3 className="text-2xl font-bold mb-8 dark:text-white flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary">local_shipping</span>
                </div>
                {t('productDetail.shippingSupport')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center bg-white/80 dark:bg-gray-800/80 rounded-2xl p-6 backdrop-blur-sm">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-r from-primary/10 to-primary/5 flex items-center justify-center mx-auto mb-4">
                    <span className="material-symbols-outlined text-primary text-2xl">local_shipping</span>
                  </div>
                  <h4 className="font-bold dark:text-white mb-2">
                    {t('productDetail.fastShipping')}
                  </h4>
                  <p className="text-sm text-[#2d1a1e]/60 dark:text-gray-400">
                    {product.deliveryTime || t('productDetail.deliveryTime')}
                  </p>
                </div>
                
                <div className="text-center bg-white/80 dark:bg-gray-800/80 rounded-2xl p-6 backdrop-blur-sm">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-r from-primary/10 to-primary/5 flex items-center justify-center mx-auto mb-4">
                    <span className="material-symbols-outlined text-primary text-2xl">assignment_return</span>
                  </div>
                  <h4 className="font-bold dark:text-white mb-2">
                    {t('productDetail.freeReturns')}
                  </h4>
                  <p className="text-sm text-[#2d1a1e]/60 dark:text-gray-400">
                    {t('productDetail.withinDays', { days: 30 })}
                  </p>
                </div>
                
                <div className="text-center bg-white/80 dark:bg-gray-800/80 rounded-2xl p-6 backdrop-blur-sm">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-r from-primary/10 to-primary/5 flex items-center justify-center mx-auto mb-4">
                    <span className="material-symbols-outlined text-primary text-2xl">support_agent</span>
                  </div>
                  <h4 className="font-bold dark:text-white mb-2">
                    {t('productDetail.support247')}
                  </h4>
                  <p className="text-sm text-[#2d1a1e]/60 dark:text-gray-400">
                    {t('productDetail.customerService')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* العودة للمنتجات */}
        <div className="mt-20 text-center">
          <button
            onClick={() => navigate('/products')}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-purple-600 text-white rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <span className="material-symbols-outlined text-xl transition-transform group-hover:-translate-x-1">
              {isArabic() ? 'arrow_forward' : 'arrow_back'}
            </span>
            {t('productDetail.discoverMoreProducts')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;