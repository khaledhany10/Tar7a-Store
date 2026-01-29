import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { products } from '../data/products';

const ProductDetail = () => {
  const { id } = useParams();
  const { language } = useLanguage();
  const product = products.find(p => p.id === parseInt(id));
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    if (product) {
      if (product.colors && product.colors.length > 0) {
        setSelectedColor(product.colors[0]);
      }
      if (product.sizes && product.sizes.length > 0) {
        setSelectedSize(product.sizes[0]);
      }
      setIsLoading(false);
    }
  }, [product]);

  const correctImagePath = (imagePath) => {
    if (!imagePath) return '/default.jpeg';
    let correctedPath = imagePath;
    if (correctedPath.startsWith('/img/')) {
      correctedPath = correctedPath.substring(5);
    }
    if (!correctedPath.startsWith('/')) {
      correctedPath = '/' + correctedPath;
    }
    return correctedPath;
  };

  const getProductImages = () => {
    if (!product) return ['/default.jpeg'];
    const images = [];
    if (product.image) {
      images.push(correctImagePath(product.image));
    }
    if (product.images && product.images.length > 0) {
      product.images.forEach(img => {
        images.push(correctImagePath(img));
      });
    }
    if (images.length === 0) {
      images.push('/default.jpeg');
    }
    return images;
  };

  const handleOrderNow = () => {
    const orderData = {
      productId: product.id,
      productName: product.name || '',
      productDescription: product.description || '',
      productPrice: product.price || '100EGP',
      productImage: getProductImages()[0],
      selectedColor: selectedColor?.name || '',
      selectedSize: selectedSize,
      quantity: quantity,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('lastSelectedProduct', JSON.stringify(orderData));
    window.location.href = '/order-form';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-peach-soft/10 to-white dark:from-background-dark dark:via-gray-900/50 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <p className={`${language === 'ar' ? 'arabic-text' : ''} text-xl text-[#2d1a1e] dark:text-gray-300`}>
            {language === 'ar' ? 'جاري تحميل التفاصيل...' : 'Loading details...'}
          </p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-peach-soft/10 to-white dark:from-background-dark dark:via-gray-900/50 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-primary/10 to-purple-600/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-6xl text-primary">search_off</span>
          </div>
          <h2 className={`${language === 'ar' ? 'arabic-text' : ''} text-4xl font-bold mb-6 dark:text-white`}>
            {language === 'ar' ? 'كنز مفقود' : 'Lost Treasure'}
          </h2>
          <p className={`${language === 'ar' ? 'arabic-text' : ''} text-lg text-[#2d1a1e]/70 dark:text-gray-400 mb-10`}>
            {language === 'ar' 
              ? 'عذراً، لم نتمكن من العثور على الكنز الذي تبحث عنه'
              : 'Sorry, we couldn\'t find the treasure you\'re looking for'}
          </p>
          <Link 
            to="/products" 
            className={`${language === 'ar' ? 'arabic-text' : ''} group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-purple-600 text-white rounded-2xl font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300`}
          >
            <span className="material-symbols-outlined text-xl transition-transform group-hover:-translate-x-1">
              {language === 'ar' ? 'arrow_back' : 'arrow_back'}
            </span>
            {language === 'ar' ? 'اكتشف كنوزنا' : 'Explore Our Treasures'}
          </Link>
        </div>
      </div>
    );
  }

  const images = getProductImages();
  const productBgClass = product.bgColor || 'bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900';

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-peach-soft/5 to-white dark:from-background-dark dark:via-gray-900/50 dark:to-gray-900">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-16 relative">
        {/* Breadcrumb */}
        <nav className={`flex items-center gap-2 text-sm text-[#2d1a1e]/60 dark:text-gray-400 mb-12 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
          <Link to="/" className={`${language === 'ar' ? 'arabic-text' : ''} hover:text-primary transition-colors flex items-center gap-1`}>
            <span className="material-symbols-outlined text-base">home</span>
            {language === 'ar' ? 'الرئيسية' : 'Home'}
          </Link>
          <span className="material-symbols-outlined text-base">chevron_right</span>
          <Link to="/products" className={`${language === 'ar' ? 'arabic-text' : ''} hover:text-primary transition-colors flex items-center gap-1`}>
            {language === 'ar' ? 'المتجر' : 'Store'}
          </Link>
          <span className="material-symbols-outlined text-base">chevron_right</span>
          <span className={`${language === 'ar' ? 'arabic-text' : ''} text-primary font-medium truncate max-w-xs`}>
            {product.name}
          </span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Images Section */}
          <div className="space-y-8">
            {/* Main Image with Zoom */}
            <div 
              className={`relative rounded-3xl overflow-hidden shadow-2xl group cursor-zoom-in ${productBgClass}`}
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <div className={`aspect-square transition-transform duration-700 ${isZoomed ? 'scale-150' : 'scale-100'}`}>
                <img 
                  src={images[selectedImage]} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => e.target.src = '/default.jpeg'}
                />
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              
              {/* Badges */}
              <div className="absolute top-6 left-6 flex flex-col gap-3">
                {product.hasOffer && (
                  <div className={`${language === 'ar' ? 'arabic-text' : ''} px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-primary to-purple-600 text-white shadow-2xl backdrop-blur-sm`}>
                    {language === 'ar' ? 'عرض خاص' : 'Special Offer'}
                  </div>
                )}
                <div className={`${language === 'ar' ? 'arabic-text' : ''} px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider ${
                  product.printed 
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white' 
                    : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                } shadow-2xl backdrop-blur-sm`}>
                  {language === 'ar' ? (product.printed ? 'مطبوع' : 'سادة') : (product.printed ? 'Printed' : 'Plain')}
                </div>
              </div>
              
              {/* Rating Badge */}
              <div className="absolute top-6 right-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-1 shadow-2xl">
                <span className="material-symbols-outlined text-yellow-500 text-sm">star</span>
                <span className="text-sm font-bold">{product.rating?.toFixed(1) || '5.0'}</span>
              </div>
              
              {/* Zoom Hint */}
              <div className="absolute bottom-6 right-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full p-3 shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="material-symbols-outlined text-primary text-base">zoom_in</span>
              </div>
              
              {!product.inStock && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                  <span className={`${language === 'ar' ? 'arabic-text' : ''} text-white text-2xl font-bold px-8 py-4 rounded-2xl bg-black/50`}>
                    {language === 'ar' ? 'نفذت الكمية' : 'Out of Stock'}
                  </span>
                </div>
              )}
            </div>
            
            {/* Thumbnails */}
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-28 h-28 rounded-2xl overflow-hidden border-4 transition-all duration-300 ${
                    selectedImage === index 
                      ? 'border-primary scale-105 shadow-xl' 
                      : 'border-transparent hover:border-gray-300 hover:scale-105'
                  }`}
                >
                  <img 
                    src={img} 
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info Section */}
          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-6">
              <div>
                <h1 className={`${language === 'ar' ? 'arabic-text' : ''} text-4xl md:text-5xl font-black text-[#2d1a1e] dark:text-white mb-4 leading-tight`}>
                  {product.name}
                </h1>
                <p className={`${language === 'ar' ? 'arabic-text' : ''} text-xl text-[#2d1a1e]/70 dark:text-gray-400 mb-6`}>
                  {product.description}
                </p>
              </div>

              {/* Price & Stock */}
              <div className="flex flex-wrap items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className={`${language === 'ar' ? 'arabic-text' : ''} text-5xl font-black bg-gradient-to-r from-primary via-purple-600 to-pink-500 bg-clip-text text-transparent`}>
                    {product.price}
                  </div>
                  {product.originalPrice && (
                    <div className={`${language === 'ar' ? 'arabic-text' : ''} text-2xl line-through text-[#2d1a1e]/40 dark:text-gray-500`}>
                      {product.originalPrice}
                    </div>
                  )}
                </div>
                
                <div className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider ${
                  product.inStock 
                    ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 dark:bg-gradient-to-r dark:from-green-900/30 dark:to-emerald-900/30 dark:text-green-400' 
                    : 'bg-gradient-to-r from-red-100 to-rose-100 text-red-800 dark:bg-gradient-to-r dark:from-red-900/30 dark:to-rose-900/30 dark:text-red-400'
                }`}>
                  {product.inStock 
                    ? (language === 'ar' ? '🟢 متوفر' : '🟢 In Stock') 
                    : (language === 'ar' ? '🔴 نفذت الكمية' : '🔴 Out of Stock')
                  }
                </div>
              </div>
            </div>

            {/* Full Description */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 border border-white/20 dark:border-gray-700/20">
              <h3 className={`${language === 'ar' ? 'arabic-text' : ''} text-2xl font-bold mb-6 dark:text-white flex items-center gap-3`}>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary">description</span>
                </div>
                {language === 'ar' ? 'الوصف الكامل' : 'Full Description'}
              </h3>
              <p className={`${language === 'ar' ? 'arabic-text' : ''} text-[#2d1a1e]/80 dark:text-gray-300 leading-relaxed text-lg`}>
                {product.fullDescription || product.description}
              </p>
            </div>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 border border-white/20 dark:border-gray-700/20">
                <div className="flex items-center justify-between mb-6">
                  <h3 className={`${language === 'ar' ? 'arabic-text' : ''} text-2xl font-bold dark:text-white flex items-center gap-3`}>
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary">palette</span>
                    </div>
                    {language === 'ar' ? 'اختر اللون' : 'Choose Color'}
                  </h3>
                  {selectedColor && (
                    <span className={`${language === 'ar' ? 'arabic-text' : ''} text-primary font-medium`}>
                      {selectedColor.name}
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
                  {product.colors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(color)}
                      className={`group relative flex flex-col items-center gap-3 p-4 rounded-2xl transition-all duration-300 ${
                        selectedColor?.value === color.value 
                          ? 'bg-primary/10 ring-2 ring-primary scale-105 shadow-lg' 
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700/50'
                      }`}
                    >
                      <div 
                        className={`w-12 h-12 rounded-full border-4 shadow-lg transition-all duration-300 ${
                          selectedColor?.value === color.value 
                            ? 'border-white scale-110' 
                            : 'border-white/50 group-hover:scale-110'
                        }`}
                        style={{ backgroundColor: color.value || '#ccc' }}
                      />
                      <span className={`${language === 'ar' ? 'arabic-text' : ''} text-sm font-medium dark:text-white text-center line-clamp-1`}>
                        {color.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 border border-white/20 dark:border-gray-700/20">
                <h3 className={`${language === 'ar' ? 'arabic-text' : ''} text-2xl font-bold mb-6 dark:text-white flex items-center gap-3`}>
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary">straighten</span>
                  </div>
                  {language === 'ar' ? 'اختر المقاس' : 'Choose Size'}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedSize(size)}
                      className={`${language === 'ar' ? 'arabic-text' : ''} px-6 py-4 rounded-xl border-2 font-medium transition-all duration-300 hover:scale-105 active:scale-95 ${
                        selectedSize === size 
                          ? 'border-primary bg-gradient-to-r from-primary/10 to-purple-600/10 text-primary shadow-xl' 
                          : 'border-gray-300 dark:border-gray-600 dark:text-white hover:border-primary'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Order */}
            <div className="space-y-6">
              <div className={`flex flex-col md:flex-row items-center gap-6 ${language === 'ar' ? 'md:flex-row-reverse' : ''}`}>
                <div className="w-full md:w-auto">
                  <div className={`flex items-center gap-4 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                    <h3 className={`${language === 'ar' ? 'arabic-text' : ''} text-xl font-bold dark:text-white whitespace-nowrap`}>
                      {language === 'ar' ? 'الكمية:' : 'Quantity:'}
                    </h3>
                    <div className={`flex items-center border-2 border-gray-300 dark:border-gray-600 rounded-xl overflow-hidden ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-5 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        <span className="material-symbols-outlined">remove</span>
                      </button>
                      <span className={`${language === 'ar' ? 'arabic-text' : ''} px-8 py-3 text-xl font-bold min-w-[80px] text-center dark:text-white`}>
                        {quantity.toLocaleString(language === 'ar' ? 'ar-EG' : 'en-US')}
                      </span>
                      <button 
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-5 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
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
                    className={`${language === 'ar' ? 'arabic-text' : ''} w-full px-8 py-5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 group`}
                  >
                    <span className="material-symbols-outlined text-xl group-hover:rotate-12 transition-transform">assignment</span>
                    {language === 'ar' ? 'أطلب الآن عبر الاستمارة' : 'Order Now via Form'}
                  </button>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="bg-gradient-to-br from-white/80 to-white/60 dark:from-gray-800/80 dark:to-gray-900/60 backdrop-blur-sm rounded-3xl p-8 border border-white/20 dark:border-gray-700/20">
              <h3 className={`${language === 'ar' ? 'arabic-text' : ''} text-2xl font-bold mb-8 dark:text-white flex items-center gap-3`}>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary">info</span>
                </div>
                {language === 'ar' ? 'تفاصيل المنتج' : 'Product Details'}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`flex items-center gap-4 p-4 rounded-2xl bg-white/50 dark:bg-gray-800/50 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-primary">checkroom</span>
                  </div>
                  <div>
                    <div className={`${language === 'ar' ? 'arabic-text' : ''} text-sm text-[#2d1a1e]/60 dark:text-gray-400 mb-1`}>
                      {language === 'ar' ? 'النسيج' : 'Material'}
                    </div>
                    <div className={`${language === 'ar' ? 'arabic-text' : ''} font-medium dark:text-white`}>{product.material}</div>
                  </div>
                </div>
                
                <div className={`flex items-center gap-4 p-4 rounded-2xl bg-white/50 dark:bg-gray-800/50 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-primary">cleaning_services</span>
                  </div>
                  <div>
                    <div className={`${language === 'ar' ? 'arabic-text' : ''} text-sm text-[#2d1a1e]/60 dark:text-gray-400 mb-1`}>
                      {language === 'ar' ? 'العناية' : 'Care'}
                    </div>
                    <div className={`${language === 'ar' ? 'arabic-text' : ''} font-medium dark:text-white`}>{product.care}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping & Support */}
            <div className="bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5 dark:from-primary/10 dark:via-purple-600/10 dark:to-pink-500/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 dark:border-gray-700/20">
              <h3 className={`${language === 'ar' ? 'arabic-text' : ''} text-2xl font-bold mb-8 dark:text-white flex items-center gap-3`}>
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
                  <h4 className={`${language === 'ar' ? 'arabic-text' : ''} font-bold dark:text-white mb-2`}>
                    {language === 'ar' ? 'شحن سريع' : 'Fast Shipping'}
                  </h4>
                  <p className={`${language === 'ar' ? 'arabic-text' : ''} text-sm text-[#2d1a1e]/60 dark:text-gray-400`}>
                    {language === 'ar' ? '3-5 أيام عمل' : '3-5 business days'}
                  </p>
                </div>
                
                <div className="text-center bg-white/80 dark:bg-gray-800/80 rounded-2xl p-6 backdrop-blur-sm">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-r from-primary/10 to-primary/5 flex items-center justify-center mx-auto mb-4">
                    <span className="material-symbols-outlined text-primary text-2xl">assignment_return</span>
                  </div>
                  <h4 className={`${language === 'ar' ? 'arabic-text' : ''} font-bold dark:text-white mb-2`}>
                    {language === 'ar' ? 'إرجاع مجاني' : 'Free Returns'}
                  </h4>
                  <p className={`${language === 'ar' ? 'arabic-text' : ''} text-sm text-[#2d1a1e]/60 dark:text-gray-400`}>
                    {language === 'ar' ? 'خلال 30 يوم' : 'Within 30 days'}
                  </p>
                </div>
                
                <div className="text-center bg-white/80 dark:bg-gray-800/80 rounded-2xl p-6 backdrop-blur-sm">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-r from-primary/10 to-primary/5 flex items-center justify-center mx-auto mb-4">
                    <span className="material-symbols-outlined text-primary text-2xl">support_agent</span>
                  </div>
                  <h4 className={`${language === 'ar' ? 'arabic-text' : ''} font-bold dark:text-white mb-2`}>
                    {language === 'ar' ? 'دعم 24/7' : '24/7 Support'}
                  </h4>
                  <p className={`${language === 'ar' ? 'arabic-text' : ''} text-sm text-[#2d1a1e]/60 dark:text-gray-400`}>
                    {language === 'ar' ? 'خدمة عملاء' : 'Customer Service'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Products */}
        <div className="mt-20 text-center">
          <Link 
            to="/products" 
            className={`${language === 'ar' ? 'arabic-text' : ''} group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-purple-600 text-white rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300`}
          >
            <span className="material-symbols-outlined text-xl transition-transform group-hover:-translate-x-1">
              {language === 'ar' ? 'arrow_back' : 'arrow_back'}
            </span>
            {language === 'ar' ? 'اكتشف المزيد من الكنوز' : 'Discover More Treasures'}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;