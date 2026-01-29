import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

const OrderForm = () => {
  const { language } = useLanguage();
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // رابط Google Form الخاص بك
  const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScQdpH3BDWF9mjImvy0n3ZZU5D-jRUoqoBkQc4UPXIW2Blfjw/viewform?usp=pp_url';
  
  // إيميل استلام البيانات
  const RECEIVING_EMAIL = 'hanykhaled153@gmail.com';
  const PHONE_NUMBER = '01066362979';

  useEffect(() => {
    // جلب المنتج المختار من localStorage
    const savedProduct = localStorage.getItem('lastSelectedProduct');
    if (savedProduct) {
      setSelectedProduct(JSON.parse(savedProduct));
    }
    
    // جلب سلة التسوق إذا كانت موجودة
    const savedCart = localStorage.getItem('shoppingCart');
    if (savedCart) {
      try {
        const cartItems = JSON.parse(savedCart);
        if (cartItems.length > 0) {
          setSelectedProduct({
            productName: language === 'ar' ? 'سلة تسوق متعددة المنتجات' : 'Multiple Products Cart',
            productDescription: language === 'ar' 
              ? `${cartItems.length} منتجات في السلة`
              : `${cartItems.length} products in cart`,
            productPrice: cartItems.reduce((total, item) => total + (parseFloat(item.price.replace('EGP', '')) || 0), 0) + ' EGP',
            productImage: cartItems[0]?.image || '/img/default.jpeg',
            cartItems: cartItems
          });
        }
      } catch (error) {
        console.error('Error parsing cart:', error);
      }
    }
  }, [language]);

  const handleOpenForm = () => {
    window.open(GOOGLE_FORM_URL, '_blank', 'noopener,noreferrer');
  };

  const handleWhatsAppClick = () => {
    let message = language === 'ar' 
      ? 'مرحباً! أريد تقديم طلب من متجر طرحة.\n'
      : 'Hello! I want to place an order from Tar7a Store.\n';
    
    if (selectedProduct) {
      message += language === 'ar' 
        ? `المنتج: ${selectedProduct.productName}\n`
        : `Product: ${selectedProduct.productName}\n`;
    }
    
    const whatsappLink = `https://wa.me/${PHONE_NUMBER.replace('0', '2')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank', 'noopener,noreferrer');
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert(language === 'ar' ? 'تم نسخ النص!' : 'Text copied!');
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Hero Section */}
      <div className="relative py-12 px-4 md:px-6 bg-gradient-to-r from-primary/10 to-peach-soft dark:from-primary/5 dark:to-background-dark">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <h1 className={`${language === 'ar' ? 'arabic-text' : ''} text-3xl md:text-5xl font-bold mb-6 dark:text-white`}>
              {language === 'ar' ? 'تقديم طلب جديد' : 'Place New Order'}
            </h1>
            <p className={`${language === 'ar' ? 'arabic-text' : ''} text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto`}>
              {language === 'ar' 
                ? 'انقر على الزر أدناه لملء استمارة الطلب عبر Google Forms'
                : 'Click the button below to fill out the order form via Google Forms'
              }
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* معلومات الطلب الجانبية */}
          <div className="lg:w-2/5">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <h2 className={`${language === 'ar' ? 'arabic-text' : ''} text-2xl font-bold mb-6 dark:text-white`}>
                {language === 'ar' ? 'معلومات الطلب' : 'Order Information'}
              </h2>
              
              {/* معلومات الاستلام */}
              <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                <h3 className={`${language === 'ar' ? 'arabic-text' : ''} font-bold mb-3 dark:text-white flex items-center gap-2`}>
                  <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">mail</span>
                  {language === 'ar' ? 'إيميل الاستلام:' : 'Receiving Email:'}
                </h3>
                <div className="flex items-center justify-between bg-white dark:bg-gray-700 p-3 rounded-lg">
                  <code className="text-sm font-mono text-blue-600 dark:text-blue-300 break-all">
                    {RECEIVING_EMAIL}
                  </code>
                  <button 
                    onClick={() => copyToClipboard(RECEIVING_EMAIL)}
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 p-1"
                    title={language === 'ar' ? 'نسخ الإيميل' : 'Copy email'}
                  >
                    <span className="material-symbols-outlined text-sm">content_copy</span>
                  </button>
                </div>
                <p className={`${language === 'ar' ? 'arabic-text' : ''} text-xs text-gray-500 dark:text-gray-400 mt-2`}>
                  {language === 'ar' 
                    ? 'جميع الطلبات سيتم استلامها على هذا الإيميل تلقائياً'
                    : 'All orders will be automatically received on this email'
                  }
                </p>
              </div>

              {/* معلومات الاتصال */}
              <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-100 dark:border-green-800">
                <h3 className={`${language === 'ar' ? 'arabic-text' : ''} font-bold mb-3 dark:text-white flex items-center gap-2`}>
                  <span className="material-symbols-outlined text-green-600 dark:text-green-400">support_agent</span>
                  {language === 'ar' ? 'الدعم والاستفسارات:' : 'Support & Inquiries:'}
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between bg-white dark:bg-gray-700 p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-sm">whatsapp</span>
                      <span className="font-bold">{PHONE_NUMBER}</span>
                    </div>
                    <div className="flex gap-1">
                      <a 
                        href={`https://wa.me/${PHONE_NUMBER.replace('0', '2')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 p-1"
                        title={language === 'ar' ? 'واتساب' : 'WhatsApp'}
                      >
                        <span className="material-symbols-outlined text-sm">whatsapp</span>
                      </a>
                      <a 
                        href={`tel:${PHONE_NUMBER}`}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 p-1"
                        title={language === 'ar' ? 'اتصال' : 'Call'}
                      >
                        <span className="material-symbols-outlined text-sm">call</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* المنتج/المنتجات المختارة */}
              {selectedProduct && (
                <div className="mb-6 border-t pt-6">
                  <h3 className={`${language === 'ar' ? 'arabic-text' : ''} font-bold mb-4 dark:text-white`}>
                    {language === 'ar' ? 'المنتجات المختارة:' : 'Selected Products:'}
                  </h3>
                  
                  {selectedProduct.cartItems ? (
                    // عرض سلة التسوق المتعددة
                    <div className="space-y-3">
                      {selectedProduct.cartItems.slice(0, 3).map((item, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/30 rounded-xl">
                          <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                            <img 
                              src={item.image || '/img/default.jpeg'} 
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className={`${language === 'ar' ? 'arabic-text' : ''} font-bold text-sm line-clamp-1 dark:text-white`}>
                              {item.name}
                            </h4>
                            <p className={`${language === 'ar' ? 'arabic-text' : ''} text-primary font-bold text-sm`}>
                              {item.price || '100EGP'}
                            </p>
                          </div>
                        </div>
                      ))}
                      {selectedProduct.cartItems.length > 3 && (
                        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                          + {selectedProduct.cartItems.length - 3} {language === 'ar' ? 'منتجات أخرى' : 'more products'}
                        </div>
                      )}
                    </div>
                  ) : (
                    // عرض منتج واحد
                    <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-xl">
                      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={selectedProduct.productImage} 
                          alt={selectedProduct.productName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className={`${language === 'ar' ? 'arabic-text' : ''} font-bold text-lg line-clamp-2 dark:text-white`}>
                          {selectedProduct.productName}
                        </h4>
                        <p className={`${language === 'ar' ? 'arabic-text' : ''} text-primary font-bold text-lg`}>
                          {selectedProduct.productPrice}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* أزرار سريعة */}
              <div className="space-y-3 mt-6">
                <Link 
                  to="/products" 
                  className={`${language === 'ar' ? 'arabic-text' : ''} block w-full py-3 text-center bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors`}
                >
                  {language === 'ar' ? '← العودة للمنتجات' : '← Back to Products'}
                </Link>
              </div>
            </div>
          </div>

          {/* قسم رابط الفورم الرئيسي */}
          <div className="lg:w-3/5">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <div className="text-center mb-10">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-5xl text-green-600 dark:text-green-400">
                    description
                  </span>
                </div>
                <h2 className={`${language === 'ar' ? 'arabic-text' : ''} text-3xl md:text-4xl font-bold mb-4 dark:text-white`}>
                  {language === 'ar' ? 'استمارة طلب Tar7a Store' : 'Tar7a Store Order Form'}
                </h2>
                <p className={`${language === 'ar' ? 'arabic-text' : ''} text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg`}>
                  {language === 'ar' 
                    ? 'انقر على الزر أدناه لفتح استمارة الطلب على Google Forms. املأ جميع البيانات المطلوبة بدقة.'
                    : 'Click the button below to open the order form on Google Forms. Fill in all required information accurately.'
                  }
                </p>
              </div>

              {/* زر الفورم الرئيسي */}
              <div className="max-w-2xl mx-auto">
                <button
                  onClick={handleOpenForm}
                  className="w-full py-6 px-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-2xl font-bold text-xl md:text-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-4 mb-8"
                >
                  <span className="material-symbols-outlined text-2xl">
                    open_in_new
                  </span>
                  {language === 'ar' ? 'افتح استمارة الطلب الآن' : 'Open Order Form Now'}
                  <span className="material-symbols-outlined text-2xl">
                    arrow_forward
                  </span>
                </button>

                <p className="text-center text-gray-500 dark:text-gray-400 mb-10">
                  {language === 'ar' 
                    ? 'سيتم فتح الاستمارة في نافذة جديدة'
                    : 'The form will open in a new window'
                  }
                </p>

                {/* خيارات بديلة */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                  <button
                    onClick={handleWhatsAppClick}
                    className="py-4 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-3"
                  >
                    <span className="material-symbols-outlined">whatsapp</span>
                    {language === 'ar' ? 'تواصل عبر واتساب' : 'Contact via WhatsApp'}
                  </button>
                  
                  <a
                    href={`tel:${PHONE_NUMBER}`}
                    className="py-4 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-3 text-center"
                  >
                    <span className="material-symbols-outlined">call</span>
                    {language === 'ar' ? 'اتصل بنا مباشرة' : 'Call us directly'}
                  </a>
                </div>

                {/* معلومات مهمة */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-6 border border-amber-200 dark:border-amber-800">
                  <h3 className={`${language === 'ar' ? 'arabic-text' : ''} text-xl font-bold mb-4 dark:text-white flex items-center gap-2`}>
                    <span className="material-symbols-outlined text-amber-600 dark:text-amber-400">info</span>
                    {language === 'ar' ? 'تعليمات هامة:' : 'Important Instructions:'}
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400 flex-shrink-0">
                        <span className="material-symbols-outlined text-sm">check</span>
                      </div>
                      <div>
                        <h4 className={`${language === 'ar' ? 'arabic-text' : ''} font-bold text-sm mb-1 dark:text-white`}>
                          {language === 'ar' ? 'املأ جميع الحقول' : 'Fill all fields'}
                        </h4>
                        <p className={`${language === 'ar' ? 'arabic-text' : ''} text-sm text-gray-700 dark:text-gray-300`}>
                          {language === 'ar' 
                            ? 'تأكد من ملء جميع المعلومات المطلوبة في الاستمارة بدقة'
                            : 'Make sure to fill all required information in the form accurately'
                          }
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400 flex-shrink-0">
                        <span className="material-symbols-outlined text-sm">schedule</span>
                      </div>
                      <div>
                        <h4 className={`${language === 'ar' ? 'arabic-text' : ''} font-bold text-sm mb-1 dark:text-white`}>
                          {language === 'ar' ? 'تأكيد الطلب' : 'Order Confirmation'}
                        </h4>
                        <p className={`${language === 'ar' ? 'arabic-text' : ''} text-sm text-gray-700 dark:text-gray-300`}>
                          {language === 'ar' 
                            ? 'سنقوم بالتواصل معك خلال 24 ساعة لتأكيد طلبك'
                            : 'We will contact you within 24 hours to confirm your order'
                          }
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400 flex-shrink-0">
                        <span className="material-symbols-outlined text-sm">description</span>
                      </div>
                      <div>
                        <h4 className={`${language === 'ar' ? 'arabic-text' : ''} font-bold text-sm mb-1 dark:text-white`}>
                          {language === 'ar' ? 'حفظ التأكيد' : 'Save Confirmation'}
                        </h4>
                        <p className={`${language === 'ar' ? 'arabic-text' : ''} text-sm text-gray-700 dark:text-gray-300`}>
                          {language === 'ar' 
                            ? 'احفظ رقم تأكيد الطلب أو خذ لقطة شاشة للصفحة بعد الإرسال'
                            : 'Save the order confirmation number or take a screenshot after submission'
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;