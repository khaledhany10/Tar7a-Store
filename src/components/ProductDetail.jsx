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

  useEffect(() => {
    if (product) {
      // Set default selected color
      if (product.colors && product.colors.length > 0) {
        setSelectedColor(product.colors[0]);
      }
      // Set default selected size
      if (product.sizes && product.sizes.length > 0) {
        setSelectedSize(product.sizes[0]);
      }
      setIsLoading(false);
    }
  }, [product]);

  // دالة لتصحيح مسار الصورة
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

  // الحصول على صور المنتج
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
    
    // إذا لم توجد صور، استخدم صورة افتراضية
    if (images.length === 0) {
      images.push('/default.jpeg');
    }
    
    return images;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto"></div>
          <p className={`${language === 'ar' ? 'arabic-text' : ''} mt-4 text-gray-600`}>
            {language === 'ar' ? 'جاري التحميل...' : 'Loading...'}
          </p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-peach-soft/20 to-white dark:from-background-dark dark:via-background-dark dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-primary/10 to-purple-600/10 rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-4xl text-primary">error</span>
          </div>
          <h2 className={`${language === 'ar' ? 'arabic-text' : ''} text-3xl font-bold mb-4 dark:text-white`}>
            {language === 'ar' ? 'المنتج غير موجود' : 'Product Not Found'}
          </h2>
          <p className={`${language === 'ar' ? 'arabic-text' : ''} text-gray-600 dark:text-gray-400 mb-6`}>
            {language === 'ar' ? 'عذراً، لم نتمكن من العثور على المنتج المطلوب' : 'Sorry, we couldn\'t find the requested product'}
          </p>
          <Link 
            to="/products" 
            className={`${language === 'ar' ? 'arabic-text' : ''} inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-purple-600 text-white rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all duration-300`}
          >
            <span className="material-symbols-outlined transform rotate-180">arrow_back</span>
            {language === 'ar' ? 'تصفح المنتجات' : 'Browse Products'}
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      color: selectedColor?.name || '',
      size: selectedSize,
      image: getProductImages()[0]
    };
    
    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if item already exists in cart
    const existingItemIndex = existingCart.findIndex(item => 
      item.id === cartItem.id && 
      item.color === cartItem.color && 
      item.size === cartItem.size
    );
    
    if (existingItemIndex > -1) {
      // Update quantity if item exists
      existingCart[existingItemIndex].quantity += cartItem.quantity;
    } else {
      // Add new item
      existingCart.push(cartItem);
    }
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(existingCart));
    
    alert(`${language === 'ar' ? 'تم إضافة' : 'Added'} ${quantity} ${language === 'ar' ? product.name : product.name} ${language === 'ar' ? 'إلى سلة التسوق!' : 'to cart!'}`);
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

  const images = getProductImages();
  const productBgClass = product.bgColor || 'bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900';

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-peach-soft/20 to-white dark:from-background-dark dark:via-background-dark dark:to-gray-900">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <nav className={`flex items-center text-sm text-gray-600 dark:text-gray-400 mb-8 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
          <Link to="/" className={`${language === 'ar' ? 'arabic-text' : ''} hover:text-primary transition-colors flex items-center gap-1`}>
            <span className="material-symbols-outlined text-sm">home</span>
            {language === 'ar' ? 'الرئيسية' : 'Home'}
          </Link>
          <span className="mx-2">/</span>
          <Link to="/products" className={`${language === 'ar' ? 'arabic-text' : ''} hover:text-primary transition-colors flex items-center gap-1`}>
            <span className="material-symbols-outlined text-sm">store</span>
            {language === 'ar' ? 'التسوق' : 'Shop'}
          </Link>
          <span className="mx-2">/</span>
          <span className={`${language === 'ar' ? 'arabic-text' : ''} text-gray-900 dark:text-white font-medium truncate max-w-xs`}>
            {product.name}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images Section */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className={`relative rounded-3xl overflow-hidden shadow-2xl ${productBgClass} aspect-square`}>
              <img 
                src={images[selectedImage]} 
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = '/default.jpeg';
                }}
              />
              
              {/* Badges */}
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                {product.hasOffer && (
                  <div className={`${language === 'ar' ? 'arabic-text' : ''} px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg`}>
                    {language === 'ar' ? 'عرض مميز' : 'Special Offer'}
                  </div>
                )}
                
                {/* Type Badge */}
                <div className={`${language === 'ar' ? 'arabic-text' : ''} px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider ${
                  product.printed 
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white' 
                    : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                } shadow-lg`}>
                  {language === 'ar' ? (product.printed ? 'مطبوع' : 'سادة') : (product.printed ? 'Printed' : 'Plain')}
                </div>
              </div>
              
              {!product.inStock && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
                  <span className={`${language === 'ar' ? 'arabic-text' : ''} text-white text-2xl font-bold px-6 py-3 rounded-full bg-black/50`}>
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
                  className={`flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden border-4 transition-all duration-300 ${
                    selectedImage === index 
                      ? 'border-primary scale-105 shadow-lg' 
                      : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <img 
                    src={img} 
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-8">
            {/* Product Header */}
            <div>
              <h1 className={`${language === 'ar' ? 'arabic-text' : ''} text-4xl md:text-5xl font-bold mb-4 dark:text-white leading-tight`}>
                {product.name}
              </h1>
              
              <div className={`flex flex-wrap items-center gap-4 mb-6 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                <div className="flex items-center">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined text-xl">
                        {i < Math.floor(product.rating || 0) ? 'star' : 'star_half'}
                      </span>
                    ))}
                  </div>
                  <span className={`${language === 'ar' ? 'arabic-text mr-2' : 'ml-2'} text-gray-600 dark:text-gray-400`}>
                    {product.rating?.toFixed(1) || '5.0'} ({product.reviews || 0} {language === 'ar' ? 'تقييم' : 'reviews'})
                  </span>
                </div>
                
                <span className={`px-3 py-1.5 rounded-full text-sm font-bold ${
                  product.inStock 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                    : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                }`}>
                  {product.inStock ? (language === 'ar' ? '🟢 متوفر' : '🟢 In Stock') : (language === 'ar' ? '🔴 نفذت الكمية' : '🔴 Out of Stock')}
                </span>
              </div>

              {/* Price */}
              <div className={`flex items-center gap-6 mb-8 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                <span className={`${language === 'ar' ? 'arabic-text' : ''} text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent`}>
                  {product.price}
                </span>
                {product.originalPrice && (
                  <span className={`${language === 'ar' ? 'arabic-text' : ''} text-2xl line-through text-gray-500 dark:text-gray-400`}>
                    {product.originalPrice}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6">
              <h3 className={`${language === 'ar' ? 'arabic-text' : ''} text-xl font-bold mb-4 dark:text-white flex items-center gap-2`}>
                <span className="material-symbols-outlined text-primary">description</span>
                {language === 'ar' ? 'الوصف التفصيلي' : 'Full Description'}
              </h3>
              <p className={`${language === 'ar' ? 'arabic-text' : ''} text-gray-700 dark:text-gray-300 leading-relaxed text-lg`}>
                {product.fullDescription || product.description}
              </p>
            </div>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6">
                <h3 className={`${language === 'ar' ? 'arabic-text' : ''} text-xl font-bold mb-4 dark:text-white flex items-center gap-2`}>
                  <span className="material-symbols-outlined text-primary">palette</span>
                  {language === 'ar' ? 'اختر اللون' : 'Choose Color'}
                  {selectedColor && (
                    <span className="font-normal text-gray-600 dark:text-gray-400">
                      : {selectedColor.name}
                    </span>
                  )}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(color)}
                      className={`group flex flex-col items-center gap-2 p-2 rounded-xl transition-all duration-300 ${
                        selectedColor?.value === color.value 
                          ? 'bg-primary/10 ring-2 ring-primary' 
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <div 
                        className={`w-12 h-12 rounded-full border-4 shadow-lg transition-transform duration-300 ${
                          selectedColor?.value === color.value 
                            ? 'border-white scale-110' 
                            : 'border-white/50 group-hover:scale-105'
                        }`}
                        style={{ backgroundColor: color.value || '#ccc' }}
                      />
                      <span className={`${language === 'ar' ? 'arabic-text' : ''} text-sm font-medium dark:text-white`}>
                        {color.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6">
                <h3 className={`${language === 'ar' ? 'arabic-text' : ''} text-xl font-bold mb-4 dark:text-white flex items-center gap-2`}>
                  <span className="material-symbols-outlined text-primary">straighten</span>
                  {language === 'ar' ? 'اختر المقاس' : 'Choose Size'}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedSize(size)}
                      className={`${language === 'ar' ? 'arabic-text' : ''} px-6 py-3 rounded-xl border-2 font-medium transition-all duration-300 hover:scale-105 active:scale-95 ${
                        selectedSize === size 
                          ? 'border-primary bg-primary/10 text-primary shadow-lg' 
                          : 'border-gray-300 dark:border-gray-600 hover:border-primary dark:text-white'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Actions */}
            <div className="space-y-6">
              {/* Quantity Selector */}
              <div className={`flex items-center gap-6 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                <h3 className={`${language === 'ar' ? 'arabic-text' : ''} text-xl font-bold dark:text-white`}>
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

              {/* Action Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`${language === 'ar' ? 'arabic-text' : ''} px-8 py-4 bg-gradient-to-r from-primary to-purple-600 text-white rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
                >
                  <span className="material-symbols-outlined">shopping_cart</span>
                  {language === 'ar' ? 'إضافة إلى السلة' : 'Add to Cart'}
                </button>
                
                <button
                  onClick={handleOrderNow}
                  disabled={!product.inStock}
                  className={`${language === 'ar' ? 'arabic-text' : ''} px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
                >
                  <span className="material-symbols-outlined">assignment</span>
                  {language === 'ar' ? 'أطلب الآن عبر الاستمارة' : 'Order Now via Form'}
                </button>
              </div>
            </div>

            {/* Product Details */}
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 space-y-6">
              <h3 className={`${language === 'ar' ? 'arabic-text' : ''} text-xl font-bold mb-2 dark:text-white flex items-center gap-2`}>
                <span className="material-symbols-outlined text-primary">info</span>
                {language === 'ar' ? 'تفاصيل المنتج' : 'Product Details'}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`flex justify-between items-center ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                  <span className={`${language === 'ar' ? 'arabic-text' : ''} text-gray-600 dark:text-gray-400 flex items-center gap-2`}>
                    <span className="material-symbols-outlined text-sm">checkroom</span>
                    {language === 'ar' ? 'النسيج' : 'Material'}
                  </span>
                  <span className={`${language === 'ar' ? 'arabic-text' : ''} font-medium dark:text-white`}>{product.material}</span>
                </div>
                
                <div className={`flex justify-between items-center ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                  <span className={`${language === 'ar' ? 'arabic-text' : ''} text-gray-600 dark:text-gray-400 flex items-center gap-2`}>
                    <span className="material-symbols-outlined text-sm">cleaning_services</span>
                    {language === 'ar' ? 'العناية' : 'Care'}
                  </span>
                  <span className={`${language === 'ar' ? 'arabic-text' : ''} font-medium dark:text-white`}>{product.care}</span>
                </div>
                
                <div className={`flex justify-between items-center ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                  <span className={`${language === 'ar' ? 'arabic-text' : ''} text-gray-600 dark:text-gray-400 flex items-center gap-2`}>
                    <span className="material-symbols-outlined text-sm">category</span>
                    {language === 'ar' ? 'النوع' : 'Type'}
                  </span>
                  <span className={`${language === 'ar' ? 'arabic-text' : ''} font-medium dark:text-white`}>
                    {language === 'ar' ? (product.printed ? 'مطبوع' : 'سادة') : (product.printed ? 'Printed' : 'Plain')}
                  </span>
                </div>
                
                <div className={`flex justify-between items-center ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                  <span className={`${language === 'ar' ? 'arabic-text' : ''} text-gray-600 dark:text-gray-400 flex items-center gap-2`}>
                    <span className="material-symbols-outlined text-sm">sell</span>
                    {language === 'ar' ? 'العرض' : 'Offer'}
                  </span>
                  <span className={`${language === 'ar' ? 'arabic-text' : ''} font-medium dark:text-white`}>
                    {product.hasOffer ? (language === 'ar' ? 'متوفر' : 'Available') : (language === 'ar' ? 'غير متوفر' : 'Not Available')}
                  </span>
                </div>
              </div>
            </div>

            {/* Shipping & Return Info */}
            <div className="bg-gradient-to-r from-primary/5 to-purple-600/5 dark:from-primary/10 dark:to-purple-600/10 backdrop-blur-sm rounded-2xl p-6">
              <h3 className={`${language === 'ar' ? 'arabic-text' : ''} text-xl font-bold mb-4 dark:text-white flex items-center gap-2`}>
                <span className="material-symbols-outlined text-primary">local_shipping</span>
                {language === 'ar' ? 'الشحن والإرجاع' : 'Shipping & Returns'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <span className="material-symbols-outlined text-3xl text-primary mb-2">local_shipping</span>
                  <p className={`${language === 'ar' ? 'arabic-text' : ''} font-medium dark:text-white`}>
                    {language === 'ar' ? 'شحن سريع' : 'Fast Shipping'}
                  </p>
                  <p className={`${language === 'ar' ? 'arabic-text' : ''} text-sm text-gray-600 dark:text-gray-400`}>
                    {language === 'ar' ? '3-5 أيام عمل' : '3-5 business days'}
                  </p>
                </div>
                <div className="text-center">
                  <span className="material-symbols-outlined text-3xl text-primary mb-2">assignment_return</span>
                  <p className={`${language === 'ar' ? 'arabic-text' : ''} font-medium dark:text-white`}>
                    {language === 'ar' ? 'إرجاع مجاني' : 'Free Returns'}
                  </p>
                  <p className={`${language === 'ar' ? 'arabic-text' : ''} text-sm text-gray-600 dark:text-gray-400`}>
                    {language === 'ar' ? 'خلال 30 يوم' : 'Within 30 days'}
                  </p>
                </div>
                <div className="text-center">
                  <span className="material-symbols-outlined text-3xl text-primary mb-2">support_agent</span>
                  <p className={`${language === 'ar' ? 'arabic-text' : ''} font-medium dark:text-white`}>
                    {language === 'ar' ? 'دعم 24/7' : '24/7 Support'}
                  </p>
                  <p className={`${language === 'ar' ? 'arabic-text' : ''} text-sm text-gray-600 dark:text-gray-400`}>
                    {language === 'ar' ? 'خدمة عملاء' : 'Customer Service'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Products Button */}
        <div className="mt-16 text-center">
          <Link 
            to="/products" 
            className={`${language === 'ar' ? 'arabic-text' : ''} inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-purple-600 text-white rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all duration-300`}
          >
            <span className="material-symbols-outlined transform rotate-180">arrow_back</span>
            {language === 'ar' ? 'العودة إلى جميع المنتجات' : 'Back to All Products'}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;