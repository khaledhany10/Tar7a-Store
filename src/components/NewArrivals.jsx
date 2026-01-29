import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const products = [
  {
    id: 1,
    name_ar: "كوارتز روز شيفون",
    name_en: "Quartz Rose Chiffon",
    price: "١٠٠ ج.م",
    description_ar: "خفيف الوزن • منفوش • شبه شفاف",
    description_en: "Lightweight • Airy • Semi-transparent",
    image: "/Shefon Sada/Shefon Sada1.jpeg",
    tag: "جديد",
    bgColor: "bg-[#f3e9e5]",
    colors: ["#e5d5d5", "#f4e7d3", "#d9e2e5", "#e6d4f7"],
    category: "سادة"
  },
  {
    id: 2,
    name_ar: "شوفان جيرسي ممتاز",
    name_en: "Premium Oatmeal Jersey",
    price: "١٠٠ ج.م",
    description_ar: "مطاط • قابل للتنفس • غير منزلق",
    description_en: "Elastic • Breathable • Non-slip",
    image: "/Shefon print/Shefon print 1.jpeg",
    bgColor: "bg-[#e9e4e0]",
    colors: ["#d4c8be", "#5c5450", "#8a7f70"],
    category: "مطبوع"
  },
  {
    id: 3,
    name_ar: "رمادي أردواز شيفون",
    name_en: "Slate Gray Chiffon",
    price: "١٠٠ ج.م",
    description_ar: "صديق للبيئة • ناعم • يتدلى بشكل جميل",
    description_en: "Eco-friendly • Soft • Drapes beautifully",
    image: "/Shefon Sada/Shefon Sada2.jpeg",
    tag: "جديد",
    bgColor: "bg-[#f0f0f0]",
    colors: ["#7d8285", "#2d1a1e", "#a3b5c8"],
    category: "سادة"
  },
  {
    id: 4,
    name_ar: "وشاح شيفون وردي خجول",
    name_en: "Bashful Pink Chiffon Scarf",
    price: "١٠٠ ج.م",
    description_ar: "١٠٠٪ شيفون نقي • لمعان أنيق",
    description_en: "100% Pure chiffon • Elegant shine",
    image: "/Shefon print/Shefon print 2.jpeg",
    tag: "خصم",
    bgColor: "bg-[#fdf2f2]",
    colors: ["#f9dbdb", "#fffaf0", "#e6b8b2"],
    category: "مطبوع"
  },
  {
    id: 5,
    name_ar: "حجاب شيفون زمردي",
    name_en: "Emerald Chiffon Hijab",
    price: "١٠٠ ج.م",
    description_ar: "لا يحتاج كي • مناسب للسفر • سهل العناية",
    description_en: "No ironing needed • Travel-friendly • Easy care",
    image: "/Shefon Sada/Shefon Sada3.jpeg",
    tag: "جديد",
    bgColor: "bg-[#e8f5e9]",
    colors: ["#50c878", "#008080", "#228B22"],
    category: "سادة"
  },
  {
    id: 6,
    name_ar: "مزيج شيفون قطني",
    name_en: "Cotton Chiffon Blend",
    price: "١٠٠ ج.م",
    description_ar: "قابل للتنفس • طبيعي • نسيج مجعد",
    description_en: "Breathable • Natural • Crinkled fabric",
    image: "/Shefon print/Shefon print 3.jpeg",
    bgColor: "bg-[#f5f1e6]",
    colors: ["#f5f1e6", "#e2725b", "#9caf88"],
    category: "مطبوع"
  },
  {
    id: 7,
    name_ar: "حجاب شيفون شتوي",
    name_en: "Winter Chiffon Hijab",
    price: "١٠٠ ج.م",
    description_ar: "دافئ • فاخر • أساسي شتوي",
    description_en: "Warm • Luxurious • Winter essential",
    image: "/Shefon Sada/Shefon Sada4.jpeg",
    tag: "جديد",
    bgColor: "bg-[#f8e8e8]",
    colors: ["#800020", "#000080", "#046307"],
    category: "سادة"
  },
  {
    id: 8,
    name_ar: "حجاب شيفون للمساء",
    name_en: "Evening Chiffon Hijab",
    price: "١٠٠ ج.م",
    originalPrice: "١٥٠ ج.م",
    description_ar: "أنيق • متدفق • للمناسبات المسائية",
    description_en: "Elegant • Flowing • For evening occasions",
    image: "/Shefon print/Shefon print 4.jpeg",
    tag: "خصم",
    bgColor: "bg-[#f9f3ff]",
    colors: ["#ffd700", "#c0c0c0", "#ff007f"],
    category: "مطبوع"
  }
];

const NewArrivals = () => {
  const { language } = useLanguage();

  // دالة للحصول على صورة عشوائية إضافية من نفس المجلد
  const getRandomImage = (currentImage) => {
    const isSada = currentImage.includes('Shefon Sada');
    if (isSada) {
      const randomNum = Math.floor(Math.random() * 6) + 1;
      return `/img/Shefon Sada/Shefon Sada${randomNum}.jpeg`;
    } else {
      const randomNum = Math.floor(Math.random() * 62) + 1;
      return `/img/Shefon print/Shefon print ${randomNum}.jpeg`;
    }
  };

  return (
    <section className="px-6 md:px-20 py-24">
      <div className="max-w-[1400px] mx-auto">
        <div className={`flex flex-col md:flex-row justify-between items-end mb-12 gap-6 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
          <div>
            <h2 className={`${language === 'ar' ? 'arabic-text' : ''} text-3xl md:text-5xl font-bold tracking-tight mb-4`}>
              {language === 'ar' ? 'الوصلات الجديدة' : 'New Arrivals'}
            </h2>
            <p className={`${language === 'ar' ? 'arabic-text' : ''} text-[#2d1a1e]/60 dark:text-gray-400`}>
              {language === 'ar' ? 'تصاميم حديثة وصلت حديثًا لخزانتك.' : 'Fresh designs that just arrived for your wardrobe.'}
            </p>
          </div>
          <Link 
            to="/products" 
            className={`${language === 'ar' ? 'arabic-text' : ''} text-primary font-bold border-b-2 border-primary pb-1 hover:text-primary-dark hover:border-primary-dark transition-all`}
          >
            {language === 'ar' ? 'عرض جميع المنتجات' : 'View All Products'}
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {products.map((product) => (
            <div key={product.id} className="group flex flex-col gap-4">
              <div className={`relative aspect-[4/5] rounded-[2rem] overflow-hidden ${product.bgColor} group-hover:shadow-xl transition-all duration-500`}>
                <Link to={`/product/${product.id}`}>
                  <img 
                    alt={language === 'ar' ? product.name_ar : product.name_en} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    src={product.image}
                    loading="lazy"
                    onMouseEnter={(e) => {
                      // عند مرور الماوس، تغيير الصورة إلى صورة عشوائية من نفس المجلد
                      e.target.src = getRandomImage(product.image);
                    }}
                    onMouseLeave={(e) => {
                      // عند مغادرة الماوس، العودة للصورة الأصلية
                      e.target.src = product.image;
                    }}
                  />
                </Link>
                {product.tag && (
                  <div className={`${language === 'ar' ? 'arabic-text' : ''} absolute top-4 ${language === 'ar' ? 'right-4' : 'left-4'} ${product.tag === 'خصم' || product.tag === 'Sale' ? 'bg-primary text-white' : 'bg-white/90 backdrop-blur'} px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider`}>
                    {language === 'ar' ? product.tag : (product.tag === 'خصم' ? 'Sale' : 'New')}
                  </div>
                )}
                {/* شارة السادة أو المطبوع */}
                <div className={`${language === 'ar' ? 'arabic-text' : ''} absolute top-4 ${language === 'ar' ? 'left-4' : 'right-4'} bg-black/70 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm`}>
                  {language === 'ar' ? product.category : (product.category === 'سادة' ? 'Plain' : 'Printed')}
                </div>
                <button className={`absolute bottom-6 ${language === 'ar' ? 'left-6' : 'right-6'} w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-lg translate-y-20 group-hover:translate-y-0 transition-all duration-300 opacity-0 group-hover:opacity-100`}>
                  <span className="material-symbols-outlined">add_shopping_cart</span>
                </button>
              </div>
              
              <div className="flex flex-col gap-1">
                <div className={`flex justify-between items-start ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                  <Link to={`/product/${product.id}`} className={`${language === 'ar' ? 'arabic-text' : ''} font-bold text-lg hover:text-primary transition-colors`}>
                    {language === 'ar' ? product.name_ar : product.name_en}
                  </Link>
                  <div className={language === 'ar' ? 'text-left' : 'text-right'}>
                    {product.originalPrice && (
                      <span className={`${language === 'ar' ? 'arabic-text' : ''} text-sm line-through text-gray-400 ${language === 'ar' ? 'ml-2' : 'mr-2'}`}>{product.originalPrice}</span>
                    )}
                    <span className={`${language === 'ar' ? 'arabic-text' : ''} font-bold text-primary`}>{product.price}</span>
                  </div>
                </div>
                <p className={`${language === 'ar' ? 'arabic-text' : ''} text-sm text-[#2d1a1e]/50 dark:text-gray-400`}>
                  {language === 'ar' ? product.description_ar : product.description_en}
                </p>
                <div className="flex gap-2 mt-2">
                  {product.colors.map((color, index) => (
                    <div 
                      key={index} 
                      className="w-4 h-4 rounded-full border border-gray-200" 
                      style={{backgroundColor: color}}
                      title={`${language === 'ar' ? 'لون' : 'Color'} ${index + 1}`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;