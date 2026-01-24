import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ImageGallery = () => {
  const [currentImage, setCurrentImage] = useState(1);
  const totalImages = 24;

  const nextImage = () => {
    setCurrentImage(prev => prev === totalImages ? 1 : prev + 1);
  };

  const prevImage = () => {
    setCurrentImage(prev => prev === 1 ? totalImages : prev - 1);
  };

  return (
    <section className="py-16 px-6 md:px-20 bg-gradient-to-b from-white to-peach-soft/30 dark:from-background-dark dark:to-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="arabic-text text-3xl font-bold mb-4 dark:text-white">تصفح مجموعتنا</h2>
          <p className="arabic-text text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            استكشف معرضنا الكامل لأنماط الحجاب. انقر للتصفح ورؤية جميع التصاميم الجميلة.
          </p>
        </div>

        <div className="relative">
          {/* أزرار التنقل */}
          <button
            onClick={nextImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          
          <button
            onClick={prevImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>

          {/* عداد الصور */}
          <div className="arabic-text absolute top-6 right-6 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium">
            {currentImage} / {totalImages}
          </div>
        </div>

        {/* شبكة الصور المصغرة */}
        <div className="mt-8 grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-2">
          {Array.from({ length: 12 }, (_, i) => {
            const imgNum = ((currentImage - 1 + i) % totalImages) + 1;
            return (
              <button
                key={i}
                onClick={() => setCurrentImage(imgNum)}
                className={`aspect-square rounded-lg overflow-hidden border-2 ${
                  currentImage === imgNum ? 'border-primary' : 'border-transparent'
                }`}
              >
                <img 
                  src={`/img/${imgNum}.jpeg`}
                  alt={`صورة مصغرة ${imgNum}`}
                  className="w-full h-full object-cover hover:scale-110 transition-transform"
                />
              </button>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <Link 
            to="/products" 
            className="arabic-text inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full font-bold hover:bg-primary-dark transition-colors"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            <span>عرض جميع المنتجات</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ImageGallery;