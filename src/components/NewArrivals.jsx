import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const products = [
  {
    id: 1,
    name_ar: "شيفون كوارتز وردي",
    name_en: "Quartz Pink Chiffon",
    price: "٢٨٠ ج.م",
    description_ar: "خفيف الوزن • جيد التهوية • شبه شفاف",
    description_en: "Lightweight • Breathable • Semi-sheer",
    image: "/img/1.jpeg",
    tag: "جديد",
    bgColor: "bg-[#f3e9e5]",
    colors: ["#e5d5d5", "#f4e7d3", "#d9e2e5"]
  },
  {
    id: 2,
    name_ar: "جيرسي شوفان متميز",
    name_en: "Premium Oatmeal Jersey",
    price: "٣٢٠ ج.م",
    description_ar: "مرن • قابل للتنفس • غير قابل للانزلاق",
    description_en: "Stretchy • Breathable • Non-slip",
    image: "/img/2.jpeg",
    bgColor: "bg-[#e9e4e0]",
    colors: ["#d4c8be", "#5c5450"]
  },
  {
    id: 3,
    name_ar: "مودال رمادي أردوازي",
    name_en: "Slate Grey Modal",
    price: "٣٥٠ ج.م",
    description_ar: "صديق للبيئة • ناعم • يتدلى بشكل جميل",
    description_en: "Eco-friendly • Soft • Drapes beautifully",
    image: "/img/3.jpeg",
    bgColor: "bg-[#f0f0f0]",
    colors: ["#7d8285", "#2d1a1e"]
  },
  {
    id: 4,
    name_ar: "وشاح حرير وردي",
    name_en: "Pink Silk Scarf",
    price: "٤٥٠ ج.م",
    originalPrice: "٦٥٠ ج.م",
    description_ar: "١٠٠٪ حرير نقي • بريق أنيق",
    description_en: "100% Pure Silk • Elegant shine",
    image: "/img/4.jpeg",
    tag: "خصم",
    bgColor: "bg-[#fdf2f2]",
    colors: ["#f9dbdb"]
  }
];

const NewArrivals = () => {
  const { language } = useLanguage();

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
            {language === 'ar' ? 'عرض جميع الوصلات' : 'View All Arrivals'}
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
                  />
                </Link>
                {product.tag && (
                  <div className={`${language === 'ar' ? 'arabic-text' : ''} absolute top-4 ${language === 'ar' ? 'right-4' : 'left-4'} ${product.tag === 'خصم' || product.tag === 'Sale' ? 'bg-primary text-white' : 'bg-white/90 backdrop-blur'} px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider`}>
                    {language === 'ar' ? product.tag : (product.tag === 'خصم' ? 'Sale' : 'New')}
                  </div>
                )}
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