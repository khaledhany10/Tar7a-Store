// src/components/FabricTypes.jsx
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useState } from 'react';
import { collections } from '../data/products';

// تصحيح مسار الصور
const correctImagePath = (imagePath) => {
  if (!imagePath) return '/images/placeholder.jpg';
  
  let correctedPath = imagePath;
  if (correctedPath.startsWith('/img/')) correctedPath = correctedPath.substring(4);
  if (!correctedPath.startsWith('/')) correctedPath = '/' + correctedPath;
  correctedPath = correctedPath.replace('//', '/');
  
  return correctedPath;
};

const FabricTypes = () => {
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');

  // تحويل المجموعات إلى تنسيق Fabric Types
  const fabricData = collections.map((collection, index) => {
    let category = 'print';
    let subCategory = 'islamic';
    
    // تعيين الفئة والتصنيف الفرعي بناءً على نوع المجموعة
    if (collection.id === '01-Basic-Pinks') {
      category = 'sada';
    } else if (collection.id === '02-Christian-Dior') {
      subCategory = 'floral';
    } else if (collection.id === '03-Islamic-Ornaments') {
      subCategory = 'geometric';
    } else if (collection.id === '04-Islamic-Scarf') {
      subCategory = 'islamic';
    } else if (collection.id === '05-Ramadan') {
      subCategory = 'ramadan';
    } else if (collection.id === '06-Pattern') {
      subCategory = 'pattern';
    }
    
    return {
      id: collection.id,
      name_ar: collection.name,
      name_en: collection.name,
      image: `/images/${collection.id}/Main.jpg`, // مسار افتراضي
      category: category,
      subCategory: subCategory,
      count_ar: `${collection.count} تصميم فاخر`,
      count_en: `${collection.count} luxury designs`,
      description_ar: collection.description,
      description_en: collection.description,
      gradient: 'from-purple-500/20 via-pink-500/10 to-transparent'
    };
  });

  // الحصول على صورة للمجموعة (من أول منتج في المجموعة)
  const getCollectionImage = (collectionId) => {
    const collection = collections.find(c => c.id === collectionId);
    if (collection && collection.id === '01-Basic-Pinks') {
      return '/images/01-Basic-Pinks/01-Basic-Pinks-Grading-Colours/Main.jpeg';
    } else if (collection && collection.id === '02-Christian-Dior') {
      return '/images/02-Christian-Dior/01-Christian-Dior-Collection/Main.jpeg';
    } else if (collection && collection.id === '03-Islamic-Ornaments') {
      return '/images/03-Islamic-Ornaments/01-Islamic-Ornaments-Collection/Main.jpeg';
    } else if (collection && collection.id === '04-Islamic-Scarf') {
      return '/images/04-Islamic-Scarf/01-Islamic-Scarf-Collection/Main.jpeg';
    } else if (collection && collection.id === '05-Ramadan') {
      return '/images/05-Ramadan/01-Ramadan-Collection/Main.jpeg';
    } else if (collection && collection.id === '06-Pattern') {
      return '/images/06-Pattern/01-Pattern-Collection/Main.jpeg';
    }
    return '/images/placeholder.jpg';
  };

  return (
    <section className="relative overflow-hidden px-6 md:px-20 py-28 bg-gradient-to-b from-white via-peach-soft/10 to-primary/5 dark:from-background-dark dark:via-gray-900/50 dark:to-primary/10">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-primary/5 to-purple-500/5 blur-3xl"></div>
      </div>

      {/* Decorative Circles */}
      <div className="absolute top-1/4 left-10 w-6 h-6 rounded-full bg-primary/20 animate-pulse"></div>
      <div className="absolute bottom-1/3 right-10 w-8 h-8 rounded-full bg-purple-500/20 animate-pulse"></div>
      <div className="absolute top-10 right-1/3 w-4 h-4 rounded-full bg-pink-500/30"></div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
              <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse delay-100"></div>
              <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse delay-200"></div>
            </div>
            <span className={`${language === 'ar' ? 'arabic-text' : ''} text-sm font-medium text-[#2d1a1e] dark:text-gray-300`}>
              {language === 'ar' ? 'تصنيف المجموعات' : 'Collection Categories'}
            </span>
          </div>

          <h2 className={`${language === 'ar' ? 'arabic-text' : ''} text-4xl md:text-5xl lg:text-6xl font-black text-[#2d1a1e] dark:text-white mb-6`}>
            <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
              {language === 'ar' ? 'مجموعات فاخرة' : 'Luxury Collections'}
            </span>
          </h2>

          <p className={`${language === 'ar' ? 'arabic-text' : ''} text-lg text-[#2d1a1e]/70 dark:text-gray-400 max-w-2xl mx-auto mb-8`}>
            {language === 'ar'
              ? 'اكتشف مجموعتنا الفاخرة من التصاميم الإسلامية المختارة بعناية، كل مجموعة تحمل قصتها الخاصة وجمالها الفريد'
              : 'Discover our luxurious collection of carefully selected Islamic designs, each collection carries its own story and unique beauty'
            }
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {fabricData.slice(0, 8).map((fabric) => (
            <Link
              key={fabric.id}
              to={`/products?category=${fabric.category}${fabric.subCategory ? `&sub=${fabric.subCategory}` : ''}`}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                {/* Image Container */}
                <div className="relative aspect-[4/5] overflow-hidden rounded-t-3xl">
                  <div className={`absolute inset-0 bg-gradient-to-b ${fabric.gradient} z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  
                  <img
                    src={correctImagePath(getCollectionImage(fabric.id))}
                    alt={language === 'ar' ? fabric.name_ar : fabric.name_en}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/images/placeholder.jpg';
                    }}
                  />

                  {/* Category Badge */}
                  <div className={`absolute top-4 left-4 z-20 ${
                    fabric.category === 'sada'
                      ? 'bg-purple-500/90 text-white'
                      : 'bg-gradient-to-r from-pink-500 to-rose-500 text-white'
                  } backdrop-blur-sm px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg`}>
                    {language === 'ar' ?
                      (fabric.category === 'sada' ? 'سادة' : 'مطبوع')
                      : (fabric.category === 'sada' ? 'Plain' : 'Printed')
                    }
                  </div>

                  {/* Count Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20">
                    <div className="text-center">
                      <div className={`${language === 'ar' ? 'arabic-text' : ''} text-white text-2xl font-bold mb-1`}>
                        {language === 'ar' ? fabric.count_ar.split(' ')[0] : fabric.count_en.split(' ')[0]}
                      </div>
                      <div className={`${language === 'ar' ? 'arabic-text' : ''} text-white/80 text-sm`}>
                        {language === 'ar' ? fabric.count_ar.split(' ').slice(1).join(' ') : fabric.count_en.split(' ').slice(1).join(' ')}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className={`${language === 'ar' ? 'arabic-text' : ''} text-xl font-bold text-[#2d1a1e] dark:text-white mb-2 line-clamp-1`}>
                    {language === 'ar' ? fabric.name_ar : fabric.name_en}
                  </h3>
                  
                  <p className={`${language === 'ar' ? 'arabic-text' : ''} text-[#2d1a1e]/60 dark:text-gray-400 text-sm mb-4 line-clamp-2`}>
                    {language === 'ar' ? fabric.description_ar : fabric.description_en}
                  </p>

                  {/* Explore Button */}
                  <div className="flex items-center justify-between">
                    <span className={`${language === 'ar' ? 'arabic-text' : ''} text-primary font-bold text-sm`}>
                      {language === 'ar' ? 'استكشف التصميمات' : 'Explore Designs'}
                    </span>
                    <span className="material-symbols-outlined text-primary group-hover:translate-x-2 transition-transform duration-300">
                      {language === 'ar' ? 'arrow_back' : 'arrow_forward'}
                    </span>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/30 rounded-3xl transition-all duration-500 pointer-events-none"></div>
              </div>
            </Link>
          ))}
        </div>

        {/* Main Categories Showcase */}
        <div className="mb-16">
          <h3 className={`${language === 'ar' ? 'arabic-text' : ''} text-3xl font-bold text-center text-[#2d1a1e] dark:text-white mb-8`}>
            {language === 'ar' ? 'التصنيفات الرئيسية' : 'Main Categories'}
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Plain Category Card */}
            <Link
              to="/products?category=sada"
              className="group relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-transparent z-0"></div>
              
              <div className="relative h-64 flex items-center justify-between p-8 z-10">
                <div className={`${language === 'ar' ? 'text-right ml-12' : 'text-left mr-12'} flex-1`}>
                  <h4 className={`${language === 'ar' ? 'arabic-text' : ''} text-3xl font-bold text-[#2d1a1e] dark:text-white mb-3`}>
                    {language === 'ar' ? 'سادة نقية' : 'Pure Plain'}
                  </h4>
                  
                  <p className={`${language === 'ar' ? 'arabic-text' : ''} text-[#2d1a1e]/70 dark:text-gray-400 mb-6`}>
                    {language === 'ar'
                      ? 'تصاميم كلاسيكية تظهر جمال البساطة والأناقة الأبدية'
                      : 'Classic designs showcasing the beauty of simplicity and eternal elegance'
                    }
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <span className={`${language === 'ar' ? 'arabic-text' : ''} text-purple-600 dark:text-purple-400 font-bold`}>
                      {language === 'ar' ? 'عرض المجموعة' : 'View Collection'}
                    </span>
                    <span className="material-symbols-outlined text-purple-600 dark:text-purple-400 group-hover:translate-x-2 transition-transform duration-300">
                      {language === 'ar' ? 'arrow_back' : 'arrow_forward'}
                    </span>
                  </div>
                </div>
                
                <div className="w-48 h-48 rounded-full overflow-hidden border-8 border-white/20 shadow-2xl group-hover:scale-110 transition-transform duration-500">
                  <img
                    src={correctImagePath('/images/01-Basic-Pinks/01-Basic-Pinks-Grading-Colours/Main.jpeg')}
                    alt={language === 'ar' ? 'شيفون سادة' : 'Plain Chiffon'}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/images/placeholder.jpg';
                    }}
                  />
                </div>
              </div>
            </Link>

            {/* Printed Category Card */}
            <Link
              to="/products?category=print"
              className="group relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-rose-500/5 to-transparent z-0"></div>
              
              <div className="relative h-64 flex items-center justify-between p-8 z-10">
                {language === 'ar' ? (
                  <>
                    <div className="w-48 h-48 rounded-full overflow-hidden border-8 border-white/20 shadow-2xl group-hover:scale-110 transition-transform duration-500">
                      <img
                        src={correctImagePath('/images/02-Christian-Dior/01-Christian-Dior-Collection/Main.jpeg')}
                        alt={language === 'ar' ? 'شيفون مطبوع' : 'Printed Chiffon'}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/images/placeholder.jpg';
                        }}
                      />
                    </div>
                    <div className="text-right mr-12 flex-1">
                      <div className="inline-flex items-center gap-3 mb-4">
                        <div className="w-3 h-3 rounded-full bg-pink-500"></div>
                        <span className={`${language === 'ar' ? 'arabic-text' : ''} text-pink-600 dark:text-pink-400 font-bold text-sm`}>
                          {language === 'ar' ? 'مجموعة متنوعة' : 'Diverse Collection'}
                        </span>
                      </div>
                      
                      <h4 className={`${language === 'ar' ? 'arabic-text' : ''} text-3xl font-bold text-[#2d1a1e] dark:text-white mb-3`}>
                        {language === 'ar' ? 'مطبوعات فنية' : 'Artistic Prints'}
                      </h4>
                      
                      <p className={`${language === 'ar' ? 'arabic-text' : ''} text-[#2d1a1e]/70 dark:text-gray-400 mb-6`}>
                        {language === 'ar'
                          ? 'تصميمات فنية متنوعة لكل ذوق ومناسبة'
                          : 'Diverse artistic designs for every taste and occasion'
                        }
                      </p>
                      
                      <div className="flex items-center gap-4">
                        <span className={`${language === 'ar' ? 'arabic-text' : ''} text-pink-600 dark:text-pink-400 font-bold`}>
                          {language === 'ar' ? 'استكشاف التصاميم' : 'Explore Designs'}
                        </span>
                        <span className="material-symbols-outlined text-pink-600 dark:text-pink-400 group-hover:translate-x-2 transition-transform duration-300">
                          arrow_back
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-left ml-12 flex-1">
                      <div className="inline-flex items-center gap-3 mb-4">
                        <div className="w-3 h-3 rounded-full bg-pink-500"></div>
                        <span className={`${language === 'ar' ? 'arabic-text' : ''} text-pink-600 dark:text-pink-400 font-bold text-sm`}>
                          {language === 'ar' ? 'مجموعة متنوعة' : 'Diverse Collection'}
                        </span>
                      </div>
                      
                      <h4 className={`${language === 'ar' ? 'arabic-text' : ''} text-3xl font-bold text-[#2d1a1e] dark:text-white mb-3`}>
                        {language === 'ar' ? 'مطبوعات فنية' : 'Artistic Prints'}
                      </h4>
                      
                      <p className={`${language === 'ar' ? 'arabic-text' : ''} text-[#2d1a1e]/70 dark:text-gray-400 mb-6`}>
                        {language === 'ar'
                          ? 'تصميمات فنية متنوعة لكل ذوق ومناسبة'
                          : 'Diverse artistic designs for every taste and occasion'
                        }
                      </p>
                      
                      <div className="flex items-center gap-4">
                        <span className={`${language === 'ar' ? 'arabic-text' : ''} text-pink-600 dark:text-pink-400 font-bold`}>
                          {language === 'ar' ? 'استكشاف التصاميم' : 'Explore Designs'}
                        </span>
                        <span className="material-symbols-outlined text-pink-600 dark:text-pink-400 group-hover:translate-x-2 transition-transform duration-300">
                          arrow_forward
                        </span>
                      </div>
                    </div>
                    <div className="w-48 h-48 rounded-full overflow-hidden border-8 border-white/20 shadow-2xl group-hover:scale-110 transition-transform duration-500">
                      <img
                        src={correctImagePath('/images/02-Christian-Dior/01-Christian-Dior-Collection/Main.jpeg')}
                        alt={language === 'ar' ? 'شيفون مطبوع' : 'Printed Chiffon'}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/images/placeholder.jpg';
                        }}
                      />
                    </div>
                  </>
                )}
              </div>
            </Link>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Link
            to="/products"
            className={`${language === 'ar' ? 'arabic-text' : ''} group relative inline-flex items-center justify-center rounded-full h-16 px-12 bg-gradient-to-r from-primary via-purple-500 to-pink-500 text-white font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <span className="relative z-10 flex items-center gap-3">
              {language === 'ar' ? 'استكشف جميع الكنوز' : 'Explore All Treasures'}
              <span className="material-symbols-outlined text-xl transition-transform group-hover:translate-x-2">
                {language === 'ar' ? 'arrow_back' : 'arrow_forward'}
              </span>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FabricTypes;