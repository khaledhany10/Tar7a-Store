import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { products } from '../data/products';

const ProductDetail = () => {
  const { id } = useParams();
  const { language } = useLanguage();
  const product = products.find(p => p.id === parseInt(id));
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || {});
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className={`${language === 'ar' ? 'arabic-text' : ''} text-2xl font-bold mb-4`}>
            {language === 'ar' ? 'المنتج غير موجود' : 'Product Not Found'}
          </h2>
          <Link to="/" className={`${language === 'ar' ? 'arabic-text' : ''} text-primary hover:underline`}>
            {language === 'ar' ? 'العودة إلى الرئيسية' : 'Back to Home'}
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    alert(`${language === 'ar' ? 'تم إضافة' : 'Added'} ${quantity} ${language === 'ar' ? product.name_ar : product.name_en} ${language === 'ar' ? 'إلى سلة التسوق!' : 'to cart!'}`);
  };

  const handleBuyNow = () => {
    alert(`${language === 'ar' ? 'المتابعة إلى الدفع مع' : 'Proceed to checkout with'} ${quantity} ${language === 'ar' ? product.name_ar : product.name_en}`);
  };

  // دالة لترجمة الفئات
  const translateCategory = (category) => {
    const translations = {
      'Chiffon': language === 'ar' ? 'شيفون' : 'Chiffon',
      'Jersey': language === 'ar' ? 'جيرسي' : 'Jersey',
      'Modal': language === 'ar' ? 'مودال' : 'Modal',
      'Silk': language === 'ar' ? 'حرير' : 'Silk',
      'Crinkle': language === 'ar' ? 'كرينكل' : 'Crinkle',
      'Linen': language === 'ar' ? 'كتان' : 'Linen',
      'Velvet': language === 'ar' ? 'قطيفة' : 'Velvet',
      'Georgette': language === 'ar' ? 'جرجيت' : 'Georgette',
      'Sale': language === 'ar' ? 'خصم' : 'Sale',
      'New': language === 'ar' ? 'جديد' : 'New',
      'Bestseller': language === 'ar' ? 'الأكثر مبيعاً' : 'Bestseller'
    };
    return translations[category] || category;
  };

  const handleOrderNow = (product) => {
  const orderData = {
    productName: language === 'ar' ? product.name : product.name,
    productDescription: product.description || '',
    productPrice: product.price || '100EGP',
    productImage: product.image || product.images?.[0] || '',
    timestamp: new Date().toISOString()
  };
  
  localStorage.setItem('lastSelectedProduct', JSON.stringify(orderData));
  window.location.href = '/order-form';
};

  // تحديث بيانات المنتج لتشمل الأسماء بالعربية والإنجليزية
  const productName = language === 'ar' ? product.name_ar || product.name : product.name_en || product.name;
  const productDescription = language === 'ar' ? product.description_ar || product.description : product.description_en || product.description;
  const fullDescription = language === 'ar' ? product.fullDescription_ar || product.fullDescription : product.fullDescription_en || product.fullDescription;

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Breadcrumb */}
      <div className="container mx-auto px-6 py-8">
        <nav className={`flex items-center text-sm text-gray-600 dark:text-gray-400 mb-8 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
          <Link to="/" className={`${language === 'ar' ? 'arabic-text' : ''} hover:text-primary transition-colors`}>
            {language === 'ar' ? 'الرئيسية' : 'Home'}
          </Link>
          <span className="mx-2">/</span>
          <Link to="/products" className={`${language === 'ar' ? 'arabic-text' : ''} hover:text-primary transition-colors`}>
            {language === 'ar' ? 'التسوق' : 'Shop'}
          </Link>
          <span className="mx-2">/</span>
          <span className={`${language === 'ar' ? 'arabic-text' : ''} text-gray-900 dark:text-white`}>{productName}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="rounded-3xl overflow-hidden mb-6">
              <img 
                src={product.images[selectedImage]} 
                alt={productName}
                className="w-full h-auto object-cover aspect-square"
              />
            </div>
            
            <div className="flex gap-4 overflow-x-auto pb-4">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 ${
                    selectedImage === index ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <img 
                    src={img} 
                    alt={`${productName} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-8">
            <div>
              {product.tag && (
                <span className={`${language === 'ar' ? 'arabic-text' : ''} inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 bg-primary/10 text-primary`}>
                  {translateCategory(product.tag)}
                </span>
              )}
              
              <h1 className={`${language === 'ar' ? 'arabic-text' : ''} text-4xl font-bold mb-4 dark:text-white`}>{productName}</h1>
              
              <div className={`flex items-center gap-4 mb-4 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                <div className="flex items-center">
                  <div className="flex text-primary">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined text-lg">
                        {i < Math.floor(product.rating) ? 'star' : 'star_half'}
                      </span>
                    ))}
                  </div>
                  <span className={`${language === 'ar' ? 'arabic-text mr-2' : 'ml-2'} text-gray-600 dark:text-gray-400`}>
                    {product.rating} ({product.reviews} {language === 'ar' ? 'تقييم' : 'reviews'})
                  </span>
                </div>
                <span className={`${language === 'ar' ? 'arabic-text' : ''} px-2 py-1 rounded text-xs font-bold ${product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {product.inStock ? (language === 'ar' ? 'متوفر' : 'In Stock') : (language === 'ar' ? 'نفذت الكمية' : 'Out of Stock')}
                </span>
              </div>

              <div className={`flex items-center gap-4 mb-6 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                <span className={`${language === 'ar' ? 'arabic-text' : ''} text-3xl font-bold text-primary`}>{product.price}</span>
                {product.originalPrice && (
                  <span className={`${language === 'ar' ? 'arabic-text' : ''} text-xl line-through text-gray-500`}>{product.originalPrice}</span>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className={`${language === 'ar' ? 'arabic-text' : ''} text-lg font-bold mb-3 dark:text-white`}>
                {language === 'ar' ? 'الوصف' : 'Description'}
              </h3>
              <p className={`${language === 'ar' ? 'arabic-text' : ''} text-gray-700 dark:text-gray-300 leading-relaxed`}>
                {fullDescription}
              </p>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className={`${language === 'ar' ? 'arabic-text' : ''} text-lg font-bold mb-3 dark:text-white`}>
                {language === 'ar' ? 'اللون:' : 'Color:'} <span className="font-normal">{selectedColor.name}</span>
              </h3>
              <div className="flex gap-3">
                {product.colors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 ${
                      selectedColor.value === color.value ? 'border-primary' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className={`${language === 'ar' ? 'arabic-text' : ''} text-lg font-bold mb-3 dark:text-white`}>
                {language === 'ar' ? 'المقاس' : 'Size'}
              </h3>
              <div className="flex gap-3">
                {product.sizes.map((size, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedSize(size)}
                    className={`${language === 'ar' ? 'arabic-text' : ''} px-6 py-3 rounded-lg border ${
                      selectedSize === size 
                        ? 'border-primary bg-primary/10 text-primary' 
                        : 'border-gray-300 hover:border-primary'
                    } transition-colors`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-6">
              <div className={`flex items-center gap-4 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                <div className={`flex items-center border rounded-lg ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <span className="material-symbols-outlined">remove</span>
                  </button>
                  <span className={`${language === 'ar' ? 'arabic-text' : ''} px-6 py-3 text-lg font-medium`}>
                    {quantity.toLocaleString(language === 'ar' ? 'ar-EG' : 'en-US')}
                  </span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <span className="material-symbols-outlined">add</span>
                  </button>
                </div>
                
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className={`${language === 'ar' ? 'arabic-text' : ''} px-8 py-4 bg-primary text-white rounded-lg font-bold hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {language === 'ar' ? 'إضافة إلى السلة' : 'Add to Cart'}
                  </button>
                  <button
  onClick={() => handleOrderNow(product)}
  className={`${language === 'ar' ? 'arabic-text' : ''} w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 mt-4`}
>
  <span className="material-symbols-outlined">assignment</span>
  {language === 'ar' ? 'أطلب الآن عبر الاستمارة' : 'Order Now via Form'}
</button>
                  <button
                    onClick={handleBuyNow}
                    disabled={!product.inStock}
                    className={`${language === 'ar' ? 'arabic-text' : ''} px-8 py-4 bg-white dark:bg-gray-800 text-primary border-2 border-primary rounded-lg font-bold hover:bg-primary/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {language === 'ar' ? 'شراء الآن' : 'Buy Now'}
                  </button>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="border-t pt-6 space-y-4">
              <div className={`flex justify-between ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                <span className={`${language === 'ar' ? 'arabic-text' : ''} text-gray-600 dark:text-gray-400`}>
                  {language === 'ar' ? 'النسيج' : 'Material'}
                </span>
                <span className={`${language === 'ar' ? 'arabic-text' : ''} font-medium dark:text-white`}>{product.material}</span>
              </div>
              <div className={`flex justify-between ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                <span className={`${language === 'ar' ? 'arabic-text' : ''} text-gray-600 dark:text-gray-400`}>
                  {language === 'ar' ? 'تعليمات العناية' : 'Care Instructions'}
                </span>
                <span className={`${language === 'ar' ? 'arabic-text' : ''} font-medium dark:text-white`}>{product.care}</span>
              </div>
              <div className={`flex justify-between ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                <span className={`${language === 'ar' ? 'arabic-text' : ''} text-gray-600 dark:text-gray-400`}>
                  {language === 'ar' ? 'الفئة' : 'Category'}
                </span>
                <span className={`${language === 'ar' ? 'arabic-text' : ''} font-medium dark:text-white`}>
                  {translateCategory(product.category)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;