import React, { useState } from 'react';
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
    category: "سادة",
    rating: 4.8
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
    category: "مطبوع",
    rating: 4.9
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
    category: "سادة",
    rating: 4.7
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
    category: "مطبوع",
    rating: 4.9
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
    category: "سادة",
    rating: 4.6
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
    category: "مطبوع",
    rating: 4.5
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
    category: "سادة",
    rating: 4.8
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
    category: "مطبوع",
    rating: 4.7
  }
];

const NewArrivals = () => {
  const { language } = useLanguage();
  const [hoveredProduct, setHoveredProduct] = useState(null);

  return (
    <section className="relative overflow-hidden px-6 md:px-20 py-28">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-peach-soft/20 to-primary/5 dark:from-background-dark dark:via-gray-900 dark:to-primary/10"></div>
      
      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%232d1a1e%22%20fill-opacity%3D%220.1%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')]"></div>
      </div>
      
      {/* Floating Circles */}
      <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/5 blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-peach-soft/20 blur-3xl"></div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            <span className={`${language === 'ar' ? 'arabic-text' : ''} text-sm font-medium text-[#2d1a1e] dark:text-gray-300`}>
              {language === 'ar' ? 'مجموعة شيفون ٢٠٢٤' : 'Chiffon Collection 2024'}
            </span>
          </div>
          
          <h2 className={`${language === 'ar' ? 'arabic-text' : ''} text-4xl md:text-5xl lg:text-6xl font-black text-[#2d1a1e] dark:text-white mb-6`}>
            {language === 'ar' ? 'الجديد حصريًا' : 'Exclusively New'}
          </h2>
          
          <p className={`${language === 'ar' ? 'arabic-text' : ''} text-lg text-[#2d1a1e]/70 dark:text-gray-400 max-w-2xl mx-auto mb-8`}>
            {language === 'ar' 
              ? 'اكتشف آخر صيحات الأناقة المتواضعة. تصميمات فريدة تجمع بين الرقي والجودة العالية.'
              : 'Discover the latest trends in modest fashion. Unique designs that combine elegance with premium quality.'
            }
          </p>
          
          <div className="flex gap-3 justify-center mb-12">
            <button className={`${language === 'ar' ? 'arabic-text' : ''} px-6 py-2 rounded-full bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-all`}>
              {language === 'ar' ? 'الكل' : 'All'}
            </button>
            <button className={`${language === 'ar' ? 'arabic-text' : ''} px-6 py-2 rounded-full border border-[#2d1a1e]/20 text-[#2d1a1e] dark:text-white dark:border-gray-700 text-sm font-medium hover:bg-[#2d1a1e]/5 transition-all`}>
              {language === 'ar' ? 'سادة' : 'Plain'}
            </button>
            <button className={`${language === 'ar' ? 'arabic-text' : ''} px-6 py-2 rounded-full border border-[#2d1a1e]/20 text-[#2d1a1e] dark:text-white dark:border-gray-700 text-sm font-medium hover:bg-[#2d1a1e]/5 transition-all`}>
              {language === 'ar' ? 'مطبوع' : 'Printed'}
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {products.map((product) => (
            <div 
              key={product.id}
              className="group relative"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                {/* Image Container */}
                <div className={`relative aspect-[4/5] overflow-hidden ${product.bgColor}`}>
                  <Link to={`/product/${product.id}`}>
                    <img 
                      src={product.image}
                      alt={language === 'ar' ? product.name_ar : product.name_en}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </Link>
                  
                  {/* Tags */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.tag && (
                      <div className={`${language === 'ar' ? 'arabic-text' : ''} px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        product.tag === 'خصم' ? 'bg-primary text-white' : 'bg-white/90 dark:bg-gray-800/90 backdrop-blur text-[#2d1a1e] dark:text-white'
                      }`}>
                        {language === 'ar' ? product.tag : (product.tag === 'خصم' ? 'Sale' : 'New')}
                      </div>
                    )}
                    
                    <div className={`${language === 'ar' ? 'arabic-text' : ''} px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-black/80 dark:bg-gray-900/90 backdrop-blur text-white`}>
                      {language === 'ar' ? product.category : (product.category === 'سادة' ? 'Plain' : 'Printed')}
                    </div>
                  </div>
                  
                  {/* Rating */}
                  <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur rounded-full px-3 py-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-yellow-500 text-sm">star</span>
                    <span className="text-sm font-bold">{product.rating}</span>
                  </div>
                  
                  {/* Quick Action Button */}
                  <div className={`absolute bottom-4 ${language === 'ar' ? 'right-4' : 'left-4'} translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300`}>
                    <button className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-primary shadow-lg hover:bg-primary hover:text-white transition-all">
                      <span className="material-symbols-outlined">shopping_cart</span>
                    </button>
                  </div>
                </div>
                
                {/* Product Info */}
                <div className="p-6">
                  <div className="mb-3">
                    <Link to={`/product/${product.id}`}>
                      <h3 className={`${language === 'ar' ? 'arabic-text' : ''} text-lg font-bold text-[#2d1a1e] dark:text-white mb-2 line-clamp-1 hover:text-primary transition-colors`}>
                        {language === 'ar' ? product.name_ar : product.name_en}
                      </h3>
                    </Link>
                    <p className={`${language === 'ar' ? 'arabic-text' : ''} text-sm text-[#2d1a1e]/60 dark:text-gray-400 mb-3 line-clamp-2`}>
                      {language === 'ar' ? product.description_ar : product.description_en}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      {product.originalPrice && (
                        <span className={`${language === 'ar' ? 'arabic-text' : ''} text-sm line-through text-gray-400 mr-2`}>
                          {product.originalPrice}
                        </span>
                      )}
                      <span className={`${language === 'ar' ? 'arabic-text' : ''} text-xl font-bold text-primary`}>
                        {product.price}
                      </span>
                    </div>
                    
                    <div className="flex gap-1">
                      {product.colors.map((color, index) => (
                        <div 
                          key={index}
                          className="w-5 h-5 rounded-full border border-gray-200 dark:border-gray-700 transition-transform group-hover:scale-110"
                          style={{ backgroundColor: color }}
                          title={`${language === 'ar' ? 'لون' : 'Color'} ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Hover Effect Overlay */}
              <div className={`absolute inset-0 rounded-3xl border-2 border-primary opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none ${
                hoveredProduct === product.id ? 'scale-105' : 'scale-100'
              }`}></div>
            </div>
          ))}
        </div>
        
        {/* View All Button */}
        <div className="text-center mt-16">
          <Link 
            to="/products" 
            className={`${language === 'ar' ? 'arabic-text' : ''} group inline-flex items-center justify-center rounded-full h-14 px-8 bg-gradient-to-r from-primary to-primary/90 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
          >
            <span className="flex items-center gap-2">
              {language === 'ar' ? 'استكشف جميع المنتجات' : 'Explore All Products'}
              <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">
                {language === 'ar' ? 'arrow_back' : 'arrow_forward'}
              </span>
            </span>
          </Link>
        </div>
        
        {/* Decorative Line */}
        <div className="w-32 h-1 bg-gradient-to-r from-primary to-transparent mx-auto mt-16 rounded-full"></div>
      </div>
    </section>
  );
};

export default NewArrivals;