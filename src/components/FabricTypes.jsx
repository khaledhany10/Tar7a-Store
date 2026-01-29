import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const fabricData = [
  {
    id: 1,
    name_ar: "شيفون سادة",
    name_en: "Plain Chiffon",
    image: "/Shefon Sada/Shefon Sada1.jpeg",
    category: "sada",
    count_ar: "6 تصاميم",
    count_en: "6 designs"
  },
  {
    id: 2,
    name_ar: "شيفون مطبوع - زهور",
    name_en: "Printed Chiffon - Floral",
    image: "/Shefon print/Shefon print 1.jpeg",
    category: "print",
    subCategory: "floral",
    count_ar: "15+ تصميم",
    count_en: "15+ designs"
  },
  {
    id: 3,
    name_ar: "شيفون مطبوع - هندسي",
    name_en: "Printed Chiffon - Geometric",
    image: "/Shefon print/Shefon print 2.jpeg",
    category: "print",
    subCategory: "geometric",
    count_ar: "12+ تصميم",
    count_en: "12+ designs"
  },
  {
    id: 4,
    name_ar: "شيفون مطبوع - خطوط",
    name_en: "Printed Chiffon - Stripes",
    image: "/Shefon print/Shefon print 3.jpeg",
    category: "print",
    subCategory: "stripes",
    count_ar: "10+ تصميم",
    count_en: "10+ designs"
  },
  {
    id: 5,
    name_ar: "شيفون مطبوع - نقاط",
    name_en: "Printed Chiffon - Dots",
    image: "/Shefon print/Shefon print 4.jpeg",
    category: "print",
    subCategory: "dots",
    count_ar: "8+ تصميم",
    count_en: "8+ designs"
  },
  {
    id: 6,
    name_ar: "شيفون مطبوع - فانتازيا",
    name_en: "Printed Chiffon - Fantasy",
    image: "/Shefon print/Shefon print 5.jpeg",
    category: "print",
    subCategory: "fantasy",
    count_ar: "12+ تصميم",
    count_en: "12+ designs"
  },
  {
    id: 7,
    name_ar: "شيفون مطبوع - أزهار كبيرة",
    name_en: "Printed Chiffon - Large Flowers",
    image: "/Shefon print/Shefon print 6.jpeg",
    category: "print",
    subCategory: "large-floral",
    count_ar: "5+ تصميم",
    count_en: "5+ designs"
  },
  {
    id: 8,
    name_ar: "شيفون مطبوع - مجردات",
    name_en: "Printed Chiffon - Abstracts",
    image: "/Shefon print/Shefon print 7.jpeg",
    category: "print",
    subCategory: "abstract",
    count_ar: "8+ تصميم",
    count_en: "8+ designs"
  }
];

const FabricTypes = () => {
  const { language } = useLanguage();

  return (
    <section className="bg-white/50 dark:bg-background-dark/30 py-16 px-6 md:px-20">
      <div className="max-w-[1400px] mx-auto">
        <div className={`text-center mb-12 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
          <h2 className={`${language === 'ar' ? 'arabic-text' : ''} text-3xl md:text-4xl font-bold mb-4 dark:text-white`}>
            {language === 'ar' ? 'تصفح مجموعتنا حسب النوع' : 'Browse Our Collection By Type'}
          </h2>
          <p className={`${language === 'ar' ? 'arabic-text' : ''} text-gray-600 dark:text-gray-400 max-w-2xl mx-auto`}>
            {language === 'ar' 
              ? 'اكتشف مجموعة متنوعة من تصميمات الشيفون المناسبة لكل ذوق ومناسبة'
              : 'Discover a variety of chiffon designs suitable for every taste and occasion'
            }
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {fabricData.map((fabric) => (
            <Link 
              key={fabric.id} 
              to={`/products?category=${fabric.category}${fabric.subCategory ? `&sub=${fabric.subCategory}` : ''}`}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4 shadow-lg group-hover:shadow-2xl transition-all duration-300">
                <img 
                  alt={language === 'ar' ? fabric.name_ar : fabric.name_en} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  src={fabric.image}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className={`absolute bottom-4 ${language === 'ar' ? 'right-4' : 'left-4'} text-white`}>
                    <span className={`${language === 'ar' ? 'arabic-text' : ''} text-sm font-medium`}>
                      {language === 'ar' ? fabric.count_ar : fabric.count_en}
                    </span>
                  </div>
                </div>
                {/* شارة النوع */}
                <div className={`absolute top-4 ${language === 'ar' ? 'right-4' : 'left-4'} bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase ${
                  fabric.category === 'sada' ? 'text-purple-600' : 'text-pink-600'
                }`}>
                  {language === 'ar' ? 
                    (fabric.category === 'sada' ? 'سادة' : 'مطبوع') 
                    : (fabric.category === 'sada' ? 'Plain' : 'Printed')
                  }
                </div>
              </div>
              
              <div className={`${language === 'ar' ? 'text-right' : 'text-left'}`}>
                <h3 className={`${language === 'ar' ? 'arabic-text' : ''} font-bold text-lg mb-1 group-hover:text-primary transition-colors`}>
                  {language === 'ar' ? fabric.name_ar : fabric.name_en}
                </h3>
                <p className={`${language === 'ar' ? 'arabic-text' : ''} text-sm text-gray-600 dark:text-gray-400`}>
                  {language === 'ar' ? fabric.count_ar : fabric.count_en}
                </p>
              </div>
            </Link>
          ))}
        </div>
        
        {/* قسم التصنيف الرئيسي */}
        <div className="mt-16">
          <h3 className={`${language === 'ar' ? 'arabic-text' : ''} text-2xl font-bold mb-8 text-center dark:text-white`}>
            {language === 'ar' ? 'التصنيف الرئيسي' : 'Main Categories'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <Link 
              to="/products?category=sada"
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all"
            >
              <div className="aspect-[16/9] bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl">
                    <img 
                      src="/Shefon Sada/Shefon Sada1.jpeg"
                      alt={language === 'ar' ? 'شيفون سادة' : 'Plain Chiffon'}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm p-6 text-center">
                  <h4 className={`${language === 'ar' ? 'arabic-text' : ''} text-xl font-bold mb-2`}>
                    {language === 'ar' ? 'شيفون سادة' : 'Plain Chiffon'}
                  </h4>
                  <p className={`${language === 'ar' ? 'arabic-text' : ''} text-gray-600`}>
                    {language === 'ar' ? '6 تصميم كلاسيكي أنيق' : '6 elegant classic designs'}
                  </p>
                </div>
              </div>
            </Link>
            
            <Link 
              to="/products?category=print"
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all"
            >
              <div className="aspect-[16/9] bg-gradient-to-r from-pink-100 to-orange-100 dark:from-pink-900/30 dark:to-orange-900/30">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl">
                    <img 
                      src="/Shefon print/Shefon print 1.jpeg"
                      alt={language === 'ar' ? 'شيفون مطبوع' : 'Printed Chiffon'}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm p-6 text-center">
                  <h4 className={`${language === 'ar' ? 'arabic-text' : ''} text-xl font-bold mb-2`}>
                    {language === 'ar' ? 'شيفون مطبوع' : 'Printed Chiffon'}
                  </h4>
                  <p className={`${language === 'ar' ? 'arabic-text' : ''} text-gray-600`}>
                    {language === 'ar' ? '62+ تصميم متنوع' : '62+ diverse designs'}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <Link 
            to="/products" 
            className={`${language === 'ar' ? 'arabic-text' : ''} inline-flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-full font-bold hover:bg-primary-dark transition-all hover:scale-105 shadow-lg`}
          >
            {language === 'ar' ? (
              <>
                <span>عرض جميع التصميمات</span>
                <span className="material-symbols-outlined transform rotate-180">arrow_back</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined">arrow_forward</span>
                <span>View All Designs</span>
              </>
            )}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FabricTypes;