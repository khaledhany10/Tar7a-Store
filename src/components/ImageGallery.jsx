import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const ImageGallery = () => {
  const { language } = useLanguage();
  
  // بيانات الصور - نجمع بين السادة والمطبوع
  const images = [
    // صور السادة (6 صور)
    { id: 1, folder: 'sada', number: 1, type: 'سادة' },
    { id: 2, folder: 'sada', number: 2, type: 'سادة' },
    { id: 3, folder: 'sada', number: 3, type: 'سادة' },
    { id: 4, folder: 'sada', number: 4, type: 'سادة' },
    { id: 5, folder: 'sada', number: 5, type: 'سادة' },
    { id: 6, folder: 'sada', number: 6, type: 'سادة' },
    
    // صور المطبوع (24 صورة من أصل 62 للتنوع)
    { id: 7, folder: 'print', number: 1, type: 'مطبوع' },
    { id: 8, folder: 'print', number: 2, type: 'مطبوع' },
    { id: 9, folder: 'print', number: 3, type: 'مطبوع' },
    { id: 10, folder: 'print', number: 4, type: 'مطبوع' },
    { id: 11, folder: 'print', number: 5, type: 'مطبوع' },
    { id: 12, folder: 'print', number: 6, type: 'مطبوع' },
    { id: 13, folder: 'print', number: 7, type: 'مطبوع' },
    { id: 14, folder: 'print', number: 8, type: 'مطبوع' },
    { id: 15, folder: 'print', number: 9, type: 'مطبوع' },
    { id: 16, folder: 'print', number: 10, type: 'مطبوع' },
    { id: 17, folder: 'print', number: 11, type: 'مطبوع' },
    { id: 18, folder: 'print', number: 12, type: 'مطبوع' },
    { id: 19, folder: 'print', number: 13, type: 'مطبوع' },
    { id: 20, folder: 'print', number: 14, type: 'مطبوع' },
    { id: 21, folder: 'print', number: 15, type: 'مطبوع' },
    { id: 22, folder: 'print', number: 16, type: 'مطبوع' },
    { id: 23, folder: 'print', number: 17, type: 'مطبوع' },
    { id: 24, folder: 'print', number: 18, type: 'مطبوع' },
    { id: 25, folder: 'print', number: 19, type: 'مطبوع' },
    { id: 26, folder: 'print', number: 20, type: 'مطبوع' },
    { id: 27, folder: 'print', number: 21, type: 'مطبوع' },
    { id: 28, folder: 'print', number: 22, type: 'مطبوع' },
    { id: 29, folder: 'print', number: 23, type: 'مطبوع' },
    { id: 30, folder: 'print', number: 24, type: 'مطبوع' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const totalImages = images.length;
  
  // دالة للحصول على مسار الصورة
  const getImagePath = (img) => {
    if (img.folder === 'sada') {
      return `/Shefon Sada/Shefon Sada${img.number}.jpeg`;
    } else {
      return `/Shefon print/Shefon print ${img.number}.jpeg`;
    }
  };

  const nextImage = () => {
    setCurrentIndex(prev => prev === totalImages - 1 ? 0 : prev + 1);
  };

  const prevImage = () => {
    setCurrentIndex(prev => prev === 0 ? totalImages - 1 : prev - 1);
  };

  // تغيير تلقائي للصورة كل 5 ثواني
  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentIndex]);

  // عرض 12 صورة مصغرة فقط
  const getThumbnails = () => {
    const thumbnails = [];
    for (let i = 0; i < 12; i++) {
      const index = (currentIndex + i) % totalImages;
      thumbnails.push(images[index]);
    }
    return thumbnails;
  };

  return (
    <section className="py-16 px-6 md:px-20 bg-gradient-to-b from-white to-peach-soft/30 dark:from-background-dark dark:to-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className={`${language === 'ar' ? 'arabic-text' : ''} text-3xl font-bold mb-4 dark:text-white`}>
            {language === 'ar' ? 'تصفح مجموعتنا' : 'Browse Our Collection'}
          </h2>
          <p className={`${language === 'ar' ? 'arabic-text' : ''} text-gray-600 dark:text-gray-400 max-w-2xl mx-auto`}>
            {language === 'ar' 
              ? 'استكشف معرضنا الكامل لأنماط الحجاب. انقر للتصفح ورؤية جميع التصاميم الجميلة.'
              : 'Explore our complete gallery of hijab styles. Click to browse and see all the beautiful designs.'
            }
          </p>
        </div>

        <div className="relative mb-8">
          {/* أزرار التنقل */}
          <button
            onClick={nextImage}
            className={`absolute ${language === 'ar' ? 'right-4' : 'left-4'} top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors`}
          >
            <span className="material-symbols-outlined">
              {language === 'ar' ? 'chevron_right' : 'chevron_left'}
            </span>
          </button>
          
          <button
            onClick={prevImage}
            className={`absolute ${language === 'ar' ? 'left-4' : 'right-4'} top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors`}
          >
            <span className="material-symbols-outlined">
              {language === 'ar' ? 'chevron_left' : 'chevron_right'}
            </span>
          </button>
        </div>

        {/* شبكة الصور المصغرة */}
        <div className="mb-8">
          <h3 className={`${language === 'ar' ? 'arabic-text' : ''} text-xl font-semibold mb-4 dark:text-white text-center`}>
            {language === 'ar' ? 'تصفح سريع' : 'Quick Browse'}
          </h3>
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2">
            {getThumbnails().map((img, index) => {
              const isActive = images.findIndex(i => i.id === img.id) === currentIndex;
              return (
                <button
                  key={img.id}
                  onClick={() => {
                    const foundIndex = images.findIndex(i => i.id === img.id);
                    setCurrentIndex(foundIndex);
                  }}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    isActive ? 'border-primary scale-105' : 'border-transparent hover:border-gray-300'
                  } group`}
                >
                  <img 
                    src={getImagePath(img)}
                    alt={`${language === 'ar' ? 'صورة مصغرة' : 'Thumbnail'} ${img.number}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                  />
                  {/* شارة مصغرة للنوع */}
                  <div className={`${language === 'ar' ? 'arabic-text' : ''} absolute bottom-1 right-1 bg-black/60 text-white text-[8px] px-1.5 py-0.5 rounded`}>
                    {language === 'ar' ? img.type.charAt(0) : (img.type === 'سادة' ? 'P' : 'Pr')}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* قسم الفئات */}
        <div className="mb-8">
          <h3 className={`${language === 'ar' ? 'arabic-text' : ''} text-xl font-semibold mb-4 dark:text-white text-center`}>
            {language === 'ar' ? 'تصفح حسب النوع' : 'Browse by Type'}
          </h3>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link 
              to="/products?type=sada"
              className="flex flex-col items-center p-6 bg-gradient-to-r from-pink-50 to-peach-soft rounded-2xl hover:shadow-lg transition-all"
            >
              <div className="w-16 h-16 mb-4 rounded-full overflow-hidden border-4 border-white shadow">
                <img 
                  src="/Shefon Sada/Shefon Sada1.jpeg"
                  alt={language === 'ar' ? 'سادة' : 'Plain'}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className={`${language === 'ar' ? 'arabic-text' : ''} font-bold text-lg`}>
                {language === 'ar' ? 'سادة' : 'Plain'}
              </span>
              <span className="text-sm text-gray-600">
                {language === 'ar' ? '6 تصميم' : '6 designs'}
              </span>
            </Link>
            
            <Link 
              to="/products?type=print"
              className="flex flex-col items-center p-6 bg-gradient-to-r from-purple-50 to-lavender-soft rounded-2xl hover:shadow-lg transition-all"
            >
              <div className="w-16 h-16 mb-4 rounded-full overflow-hidden border-4 border-white shadow">
                <img 
                  src="/Shefon print/Shefon print 1.jpeg"
                  alt={language === 'ar' ? 'مطبوع' : 'Printed'}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className={`${language === 'ar' ? 'arabic-text' : ''} font-bold text-lg`}>
                {language === 'ar' ? 'مطبوع' : 'Printed'}
              </span>
              <span className="text-sm text-gray-600">
                {language === 'ar' ? '62+ تصميم' : '62+ designs'}
              </span>
            </Link>
          </div>
        </div>

        {/* زر عرض جميع المنتجات */}
        <div className="text-center">
          <Link 
            to="/products" 
            className={`${language === 'ar' ? 'arabic-text' : ''} inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-full font-bold hover:bg-primary-dark transition-all hover:scale-105 shadow-lg`}
          >
            {language === 'ar' ? (
              <>
                <span>عرض جميع المنتجات</span>
                <span className="material-symbols-outlined transform rotate-180">arrow_back</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined">arrow_forward</span>
                <span>View All Products</span>
              </>
            )}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ImageGallery;