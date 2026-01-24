import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || {});
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="arabic-text text-2xl font-bold mb-4">المنتج غير موجود</h2>
          <Link to="/" className="arabic-text text-primary hover:underline">
            العودة إلى الرئيسية
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    alert(`تم إضافة ${quantity} ${product.name} إلى سلة التسوق!`);
    // في التطبيق الحقيقي، سيتم إرسال الأمر إلى Redux أو Context
  };

  const handleBuyNow = () => {
    alert(`المتابعة إلى الدفع مع ${quantity} ${product.name}`);
    // في التطبيق الحقيقي، سيتم التوجيه إلى صفحة الدفع
  };

  // دالة لترجمة الفئات
  const translateCategory = (category) => {
    const translations = {
      'Chiffon': 'شيفون',
      'Jersey': 'جيرسي',
      'Modal': 'مودال',
      'Silk': 'حرير',
      'Crinkle': 'كرينكل',
      'Linen': 'كتان',
      'Velvet': 'قطيفة',
      'Georgette': 'جرجيت',
      'Sale': 'خصم',
      'New': 'جديد',
      'Bestseller': 'الأكثر مبيعاً'
    };
    return translations[category] || category;
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* مسار التنقل */}
      <div className="container mx-auto px-6 py-8">
        <nav className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-8">
          <Link to="/" className="arabic-text hover:text-primary transition-colors">الرئيسية</Link>
          <span className="mx-2">/</span>
          <Link to="/products" className="arabic-text hover:text-primary transition-colors">التسوق</Link>
          <span className="mx-2">/</span>
          <span className="arabic-text text-gray-900 dark:text-white">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* صور المنتج */}
          <div>
            <div className="rounded-3xl overflow-hidden mb-6">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name}
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
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* معلومات المنتج */}
          <div className="space-y-8">
            <div>
              {product.tag && (
                <span className="arabic-text inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 bg-primary/10 text-primary">
                  {translateCategory(product.tag)}
                </span>
              )}
              
              <h1 className="arabic-text text-4xl font-bold mb-4 dark:text-white">{product.name}</h1>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  <div className="flex text-primary">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined text-lg">
                        {i < Math.floor(product.rating) ? 'star' : 'star_half'}
                      </span>
                    ))}
                  </div>
                  <span className="arabic-text mr-2 text-gray-600 dark:text-gray-400">
                    {product.rating} ({product.reviews} تقييم)
                  </span>
                </div>
                <span className={`arabic-text px-2 py-1 rounded text-xs font-bold ${product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {product.inStock ? 'متوفر' : 'نفذت الكمية'}
                </span>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <span className="arabic-text text-3xl font-bold text-primary">{product.price}</span>
                {product.originalPrice && (
                  <span className="arabic-text text-xl line-through text-gray-500">{product.originalPrice}</span>
                )}
              </div>
            </div>

            {/* الوصف */}
            <div>
              <h3 className="arabic-text text-lg font-bold mb-3 dark:text-white">الوصف</h3>
              <p className="arabic-text text-gray-700 dark:text-gray-300 leading-relaxed">
                {product.fullDescription}
              </p>
            </div>

            {/* اختيار اللون */}
            <div>
              <h3 className="arabic-text text-lg font-bold mb-3 dark:text-white">اللون: <span className="font-normal">{selectedColor.name}</span></h3>
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

            {/* اختيار المقاس */}
            <div>
              <h3 className="arabic-text text-lg font-bold mb-3 dark:text-white">المقاس</h3>
              <div className="flex gap-3">
                {product.sizes.map((size, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedSize(size)}
                    className={`arabic-text px-6 py-3 rounded-lg border ${
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

            {/* الكمية وإضافة إلى السلة */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded-lg">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <span className="material-symbols-outlined">remove</span>
                  </button>
                  <span className="arabic-text px-6 py-3 text-lg font-medium">{quantity.toLocaleString('ar-EG')}</span>
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
                    className="arabic-text px-8 py-4 bg-primary text-white rounded-lg font-bold hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    إضافة إلى السلة
                  </button>
                  <button
                    onClick={handleBuyNow}
                    disabled={!product.inStock}
                    className="arabic-text px-8 py-4 bg-white dark:bg-gray-800 text-primary border-2 border-primary rounded-lg font-bold hover:bg-primary/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    شراء الآن
                  </button>
                </div>
              </div>
            </div>

            {/* تفاصيل المنتج */}
            <div className="border-t pt-6 space-y-4">
              <div className="flex justify-between">
                <span className="arabic-text text-gray-600 dark:text-gray-400">النسيج</span>
                <span className="arabic-text font-medium dark:text-white">{product.material}</span>
              </div>
              <div className="flex justify-between">
                <span className="arabic-text text-gray-600 dark:text-gray-400">تعليمات العناية</span>
                <span className="arabic-text font-medium dark:text-white">{product.care}</span>
              </div>
              <div className="flex justify-between">
                <span className="arabic-text text-gray-600 dark:text-gray-400">الفئة</span>
                <span className="arabic-text font-medium dark:text-white">{translateCategory(product.category)}</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;