import React, { useState, useEffect, useCallback, memo, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { 
  allProducts, 
  // getProductsByCollection,
  collections,
  // productStats 
} from '../data/products';

// ميمو للمكونات الفرعية
const ImageThumbnail = memo(({ img, isActive, onClick, index }) => (
  <button
    onClick={() => onClick(index)}
    className={`flex-shrink-0 w-28 h-28 rounded-2xl overflow-hidden border-4 transition-all duration-300 ${
      isActive 
        ? 'border-primary scale-105 shadow-xl' 
        : 'border-transparent hover:border-gray-300 hover:scale-105'
    }`}
    aria-label={`View image ${index + 1}`}
  >
    <img 
      src={img} 
      alt={`Product view ${index + 1}`}
      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
      loading="lazy"
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = '/images/placeholder.jpg';
      }}
    />
  </button>
));

const ColorOption = memo(({ color, isSelected, onClick }) => (
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
      {typeof color === 'object' ? color.name : `Color ${color}`}
    </span>
  </button>
));

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
  const { language } = useLanguage();
  
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
    if (!imagePath) return '/images/placeholder.jpg';
    
    let correctedPath = imagePath;
    
    // إذا كان المسار يحتوي على /img/ قم بإزالته (إذا كان مكرراً)
    if (correctedPath.startsWith('/img/')) {
      correctedPath = correctedPath.substring(4);
    }
    
    // تأكد من أن المسار يبدأ بـ /
    if (!correctedPath.startsWith('/')) {
      correctedPath = '/' + correctedPath;
    }
    
    // تحقق من أن الصورة موجودة
    return correctedPath;
  }, []);

  // الحصول على معلومات المجموعة
  const collectionInfo = useMemo(() => {
    if (!product?.collectionType) return null;
    return collections.find(c => c.id === product.collectionType);
  }, [product]);

  // الحصول على بيانات المنتج
  useEffect(() => {
    const loadProduct = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // البحث عن المنتج من allProducts
        const foundProduct = allProducts.find(p => p.id === parseInt(id));
        
        if (!foundProduct) {
          setError('Product not found');
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
        
        // الحصول على منتجات ذات صلة
        if (foundProduct.collectionType) {
          const related = getProductsByCollection(foundProduct.collectionType)
            .filter(p => p.id !== foundProduct.id)
            .slice(0, 4);
          setRelatedProducts(related);
        }
        
      } catch (err) {
        setError('Failed to load product');
        console.error('Error loading product:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadProduct();
  }, [id]);

  // الحصول على صور المنتج
  const getProductImages = useCallback(() => {
    if (!product) return ['/images/placeholder.jpg'];
    
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
    
    // إذا لم يكن هناك صور، أضف صورة افتراضية
    if (images.size === 0) {
      images.add('/images/placeholder.jpg');
    }
    
    return Array.from(images);
  }, [product, correctImagePath]);

  // الحصول على لون الخلفية المناسب للمجموعة
  const getCollectionBgColor = useCallback(() => {
    if (!product?.collectionType) return 'bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900';
    
    const colorMap = {
      'basic-pinks': 'bg-gradient-to-br from-pink-50 to-rose-100 dark:from-pink-900/20 dark:to-rose-900/20',
      'christian-dior': 'bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900',
      'islamic-ornaments': 'bg-gradient-to-br from-yellow-50 to-amber-100 dark:from-yellow-900/20 dark:to-amber-900/20',
      'islamic-scarf': 'bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20',
      'ramadan': 'bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-purple-900/20 dark:to-indigo-900/20',
      'pattern': 'bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20',
    };
    
    return colorMap[product.collectionType] || colorMap['islamic-ornaments'];
  }, [product]);

  // الحصول على لون الشارة للمجموعة
  const getCollectionBadgeColor = useCallback(() => {
    if (!product?.collectionType) return 'bg-gradient-to-r from-blue-500 to-cyan-500';
    
    const colorMap = {
      'basic-pinks': 'bg-gradient-to-r from-pink-500 to-rose-600',
      'christian-dior': 'bg-gradient-to-r from-gray-700 to-black',
      'islamic-ornaments': 'bg-gradient-to-r from-yellow-600 to-yellow-800',
      'islamic-scarf': 'bg-gradient-to-r from-green-600 to-emerald-800',
      'ramadan': 'bg-gradient-to-r from-purple-600 to-indigo-800',
      'pattern': 'bg-gradient-to-r from-blue-500 to-cyan-500',
    };
    
    return colorMap[product.collectionType] || colorMap['islamic-ornaments'];
  }, [product]);

  // معالجة الطلب
  const handleOrderNow = useCallback(() => {
    if (!product) return;
    
    const orderData = {
      productId: product.id,
      productName: product.name || '',
      productDescription: product.description || '',
      productPrice: product.price || '150EGP',
      productImage: getProductImages()[0],
      selectedColor: selectedColor?.name || selectedColor || '',
      selectedSize: selectedSize,
      quantity: quantity,
      collectionType: product.collectionType,
      collectionName: product.collectionName,
      material: product.material,
      dimensions: product.dimensions,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('lastSelectedProduct', JSON.stringify(orderData));
    navigate('/order-form');
  }, [product, selectedColor, selectedSize, quantity, getProductImages, navigate]);

  // تحميل الهيكل العظمي
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-peach-soft/10 to-white dark:from-background-dark dark:via-gray-900/50 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-16">
          <div className="animate-pulse">
            {/* Breadcrumb Skeleton */}
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-64 mb-12"></div>
            
            {/* Product Grid Skeleton */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
              {/* Images Section */}
              <div className="space-y-8">
                <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-3xl"></div>
                <div className="flex gap-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-28 h-28 bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>
                  ))}
                </div>
              </div>
              
              {/* Product Info */}
              <div className="space-y-8">
                <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
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
      <div className="min-h-screen bg-gradient-to-b from-white via-peach-soft/10 to-white dark:from-background-dark dark:via-gray-900/50 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-primary/10 to-purple-600/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-6xl text-primary">search_off</span>
          </div>
          <h2 className="text-4xl font-bold mb-6 dark:text-white">
            {language === 'ar' ? 'المنتج غير موجود' : 'Product Not Found'}
          </h2>
          <p className="text-lg text-[#2d1a1e]/70 dark:text-gray-400 mb-10">
            {language === 'ar' 
              ? 'عذراً، لم نتمكن من العثور على المنتج الذي تبحث عنه'
              : 'Sorry, we couldn\'t find the product you\'re looking for'
            }
          </p>
          <button
            onClick={() => navigate('/products')}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-purple-600 text-white rounded-2xl font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <span className="material-symbols-outlined text-xl transition-transform group-hover:-translate-x-1">
              arrow_back
            </span>
            {language === 'ar' ? 'تصفح المنتجات' : 'Browse Products'}
          </button>
        </div>
      </div>
    );
  }

  const images = getProductImages();
  const productBgClass = getCollectionBgColor();
  const collectionBadgeColor = getCollectionBadgeColor();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-peach-soft/5 to-white dark:from-background-dark dark:via-gray-900/50 dark:to-gray-900">
      {/* خلفية متحركة */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-16 relative">
        {/* مسار التنقل */}
        <nav className={`flex items-center gap-2 text-sm text-[#2d1a1e]/60 dark:text-gray-400 mb-12 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
          <button 
            onClick={() => navigate('/')}
            className="hover:text-primary transition-colors flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-base">home</span>
            {language === 'ar' ? 'الرئيسية' : 'Home'}
          </button>
          <span className="material-symbols-outlined text-base">chevron_right</span>
          <button 
            onClick={() => navigate('/products')}
            className="hover:text-primary transition-colors flex items-center gap-1"
          >
            {language === 'ar' ? 'المتجر' : 'Store'}
          </button>
          <span className="material-symbols-outlined text-base">chevron_right</span>
          <span className="text-primary font-medium truncate max-w-xs">
            {product.name}
          </span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* قسم الصور */}
          <div className="space-y-8">
            {/* الصورة الرئيسية */}
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
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/placeholder.jpg';
                  }}
                />
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              
              {/* الشارات */}
              <div className="absolute top-6 left-6 flex flex-col gap-3">
                {product.hasOffer && (
                  <div className="px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-primary to-purple-600 text-white shadow-2xl backdrop-blur-sm">
                    {language === 'ar' ? 'عرض خاص' : 'Special Offer'}
                  </div>
                )}
                <div className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider ${collectionBadgeColor} text-white shadow-2xl backdrop-blur-sm`}>
                  {language === 'ar' ? product.collectionName || product.category : product.collectionType}
                </div>
                {!product.inStock && (
                  <div className="px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-red-500 to-red-700 text-white shadow-2xl backdrop-blur-sm">
                    {language === 'ar' ? 'نفذ' : 'Sold Out'}
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
            
            {/* الصور المصغرة */}
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
                    {product.inStock 
                      ? (language === 'ar' ? 'متوفر في المخزون' : 'In Stock')
                      : (language === 'ar' ? 'غير متوفر' : 'Out of Stock')
                    }
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-gray-400">visibility</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {language === 'ar' ? 'المشاهدات:' : 'Views:'}
                    </span>
                    <span className="font-medium">{product.popularity?.toLocaleString() || '0'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-gray-400">chat_bubble</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {language === 'ar' ? 'التقييمات:' : 'Reviews:'}
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
                        {language === 'ar' ? 'المجموعة' : 'Collection'}
                      </div>
                      <div className="font-bold text-lg dark:text-white">{language === 'ar' ? collectionInfo.name : collectionInfo.nameEn}</div>
                      <p className="text-sm text-[#2d1a1e]/70 dark:text-gray-400 mt-1">
                        {language === 'ar' ? collectionInfo.description : `${collectionInfo.count} products`}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* الوصف الكامل */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 border border-white/20 dark:border-gray-700/20">
              <h3 className="text-2xl font-bold mb-6 dark:text-white flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary">description</span>
                </div>
                {language === 'ar' ? 'الوصف الكامل' : 'Full Description'}
              </h3>
              <p className="text-[#2d1a1e]/80 dark:text-gray-300 leading-relaxed text-lg">
                {product.fullDescription || product.description}
              </p>
            </div>

            {/* اختيار اللون */}
            {product.colors && product.colors.length > 0 && (
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 border border-white/20 dark:border-gray-700/20">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold dark:text-white flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary">palette</span>
                    </div>
                    {language === 'ar' ? 'اختر اللون' : 'Choose Color'}
                  </h3>
                  {selectedColor && (
                    <span className="text-primary font-medium">
                      {typeof selectedColor === 'object' ? selectedColor.name : `Color ${selectedColor}`}
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
                  {language === 'ar' ? 'اختر المقاس' : 'Choose Size'}
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
              <div className={`flex flex-col md:flex-row items-center gap-6 ${language === 'ar' ? 'md:flex-row-reverse' : ''}`}>
                <div className="w-full md:w-auto">
                  <div className={`flex items-center gap-4 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                    <h3 className="text-xl font-bold dark:text-white whitespace-nowrap">
                      {language === 'ar' ? 'الكمية:' : 'Quantity:'}
                    </h3>
                    <div className={`flex items-center border-2 border-gray-300 dark:border-gray-600 rounded-xl overflow-hidden ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-5 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        aria-label={language === 'ar' ? 'تقليل الكمية' : 'Decrease quantity'}
                      >
                        <span className="material-symbols-outlined">remove</span>
                      </button>
                      <span className="px-8 py-3 text-xl font-bold min-w-[80px] text-center dark:text-white">
                        {quantity.toLocaleString(language === 'ar' ? 'ar-EG' : 'en-US')}
                      </span>
                      <button 
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-5 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        aria-label={language === 'ar' ? 'زيادة الكمية' : 'Increase quantity'}
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
                    aria-label={language === 'ar' ? 'أطلب الآن' : 'Order now'}
                  >
                    <span className="material-symbols-outlined text-xl group-hover:rotate-12 transition-transform">assignment</span>
                    {product.inStock 
                      ? (language === 'ar' ? 'أطلب الآن' : 'Order Now')
                      : (language === 'ar' ? 'نفذ من المخزون' : 'Out of Stock')
                    }
                  </button>
                </div>
              </div>

              {/* إجمالي السعر */}
              <div className="bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5 rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold dark:text-white">
                    {language === 'ar' ? 'الإجمالي:' : 'Total:'}
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
                {language === 'ar' ? 'تفاصيل المنتج' : 'Product Details'}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* المادة */}
                <div className={`flex items-center gap-4 p-4 rounded-2xl bg-white/50 dark:bg-gray-800/50 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-primary">checkroom</span>
                  </div>
                  <div>
                    <div className="text-sm text-[#2d1a1e]/60 dark:text-gray-400 mb-1">
                      {language === 'ar' ? 'الخامة' : 'Material'}
                    </div>
                    <div className="font-medium dark:text-white">{product.material}</div>
                  </div>
                </div>
                
                {/* العناية */}
                <div className={`flex items-center gap-4 p-4 rounded-2xl bg-white/50 dark:bg-gray-800/50 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-primary">cleaning_services</span>
                  </div>
                  <div>
                    <div className="text-sm text-[#2d1a1e]/60 dark:text-gray-400 mb-1">
                      {language === 'ar' ? 'العناية' : 'Care'}
                    </div>
                    <div className="font-medium dark:text-white">{product.care}</div>
                  </div>
                </div>
                
                {/* الأبعاد */}
                <div className={`flex items-center gap-4 p-4 rounded-2xl bg-white/50 dark:bg-gray-800/50 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-primary">straighten</span>
                  </div>
                  <div>
                    <div className="text-sm text-[#2d1a1e]/60 dark:text-gray-400 mb-1">
                      {language === 'ar' ? 'الأبعاد' : 'Dimensions'}
                    </div>
                    <div className="font-medium dark:text-white">{product.dimensions || product.sizes?.[0] || 'One Size'}</div>
                  </div>
                </div>
                
                {/* الوزن */}
                <div className={`flex items-center gap-4 p-4 rounded-2xl bg-white/50 dark:bg-gray-800/50 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-primary">weight</span>
                  </div>
                  <div>
                    <div className="text-sm text-[#2d1a1e]/60 dark:text-gray-400 mb-1">
                      {language === 'ar' ? 'الوزن' : 'Weight'}
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
                {language === 'ar' ? 'الشحن والدعم' : 'Shipping & Support'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center bg-white/80 dark:bg-gray-800/80 rounded-2xl p-6 backdrop-blur-sm">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-r from-primary/10 to-primary/5 flex items-center justify-center mx-auto mb-4">
                    <span className="material-symbols-outlined text-primary text-2xl">local_shipping</span>
                  </div>
                  <h4 className="font-bold dark:text-white mb-2">
                    {language === 'ar' ? 'شحن سريع' : 'Fast Shipping'}
                  </h4>
                  <p className="text-sm text-[#2d1a1e]/60 dark:text-gray-400">
                    {product.deliveryTime || (language === 'ar' ? '3-5 أيام عمل' : '3-5 business days')}
                  </p>
                </div>
                
                <div className="text-center bg-white/80 dark:bg-gray-800/80 rounded-2xl p-6 backdrop-blur-sm">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-r from-primary/10 to-primary/5 flex items-center justify-center mx-auto mb-4">
                    <span className="material-symbols-outlined text-primary text-2xl">assignment_return</span>
                  </div>
                  <h4 className="font-bold dark:text-white mb-2">
                    {language === 'ar' ? 'إرجاع مجاني' : 'Free Returns'}
                  </h4>
                  <p className="text-sm text-[#2d1a1e]/60 dark:text-gray-400">
                    {language === 'ar' ? 'خلال 30 يوم' : 'Within 30 days'}
                  </p>
                </div>
                
                <div className="text-center bg-white/80 dark:bg-gray-800/80 rounded-2xl p-6 backdrop-blur-sm">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-r from-primary/10 to-primary/5 flex items-center justify-center mx-auto mb-4">
                    <span className="material-symbols-outlined text-primary text-2xl">support_agent</span>
                  </div>
                  <h4 className="font-bold dark:text-white mb-2">
                    {language === 'ar' ? 'دعم 24/7' : '24/7 Support'}
                  </h4>
                  <p className="text-sm text-[#2d1a1e]/60 dark:text-gray-400">
                    {language === 'ar' ? 'خدمة عملاء' : 'Customer Service'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* المنتجات ذات الصلة */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-3xl font-bold dark:text-white">
                {language === 'ar' ? 'منتجات ذات صلة' : 'Related Products'}
              </h3>
              <button
                onClick={() => navigate(`/products?category=${product.collectionType}`)}
                className="text-primary hover:text-purple-600 transition-colors flex items-center gap-2"
              >
                <span>{language === 'ar' ? 'عرض الكل' : 'View All'}</span>
                <span className="material-symbols-outlined text-xl">arrow_forward</span>
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(relatedProduct => (
                <div 
                  key={relatedProduct.id}
                  className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden"
                >
                  <Link to={`/product/${relatedProduct.id}`} className="block">
                    <div className="aspect-[3/4] overflow-hidden">
                      <img 
                        src={correctImagePath(relatedProduct.image || relatedProduct.images?.[0])}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/images/placeholder.jpg';
                        }}
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold mb-2 dark:text-white line-clamp-1">
                        {relatedProduct.name}
                      </h4>
                      <div className="flex items-center justify-between">
                        <span className="text-primary font-bold">
                          {relatedProduct.price}
                        </span>
                        <div className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-yellow-500 text-sm">star</span>
                          <span className="text-sm">{relatedProduct.rating?.toFixed(1) || '4.5'}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* العودة للمنتجات */}
        <div className="mt-20 text-center">
          <button
            onClick={() => navigate('/products')}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-purple-600 text-white rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <span className="material-symbols-outlined text-xl transition-transform group-hover:-translate-x-1">
              arrow_back
            </span>
            {language === 'ar' ? 'اكتشف المزيد من المنتجات' : 'Discover More Products'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;