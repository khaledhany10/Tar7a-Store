import React, { useState, useEffect, useCallback, memo } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { 
  collections,  // استيراد المجموعات مباشرة
  allProducts  // استيراد جميع المنتجات
} from '../data/products';

// تصحيح مسار الصور
const correctImagePath = (imagePath) => {
  
  let correctedPath = imagePath;
  
  // إذا كان المسار يحتوي على /img/ قم بإزالته (إذا كان مكرراً)
  if (correctedPath.startsWith('/img/')) {
    correctedPath = correctedPath.substring(4);
  }
  
  // تأكد من أن المسار يبدأ بـ /
  if (!correctedPath.startsWith('/')) {
    correctedPath = '/' + correctedPath;
  }
  
  return correctedPath;
};

// دالة للحصول على منتجات مجموعة معينة
const getProductsByCollection = (collectionId) => {
  return allProducts.filter(product => product.collectionType === collectionId);
};

// دالة للحصول على صور مميزة من مجموعة معينة
const getFeaturedProductsFromCollection = (collectionId, limit = 3) => {
  const products = getProductsByCollection(collectionId);
  return products.slice(0, limit).map(product => ({
    url: product.image || product.images?.[0],
    alt: product.name,
    productName: product.name,
    description: product.description,
    productId: product.id
  }));
};

const Thumbnail = memo(({ img, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
        isActive ? 'border-primary scale-105 shadow-lg' : 'border-transparent hover:border-gray-300'
      } group`}
      aria-label={`View image ${img.number}`}
    >
      <img 
        src={correctImagePath(img.url)}
        alt={img.alt}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        loading="lazy"
        onError={(e) => {
          e.target.onerror = null;
        }}
      />
      <div className="absolute bottom-1 right-1 bg-black/60 text-white text-[8px] px-1.5 py-0.5 rounded">
        {img.type}
      </div>
    </button>
  );
});

const CollectionCard = memo(({ collection, language, onClick }) => {
  // الحصول على لون الشارة للمجموعة
  const getCollectionBadgeColor = (collectionType) => {
    const colorMap = {
      'basic-pinks': 'from-pink-500 to-rose-600',
      'christian-dior': 'from-gray-700 to-black',
      'islamic-ornaments': 'from-yellow-600 to-yellow-800',
      'islamic-scarf': 'from-green-600 to-emerald-800',
      'ramadan': 'from-purple-600 to-indigo-800',
      'pattern': 'from-blue-500 to-cyan-500',
      'special-edition': 'from-red-500 to-pink-600'
    };
    
    return colorMap[collectionType] || 'from-primary to-purple-600';
  };

  const collectionName = language === 'ar' ? collection.name : collection.nameEn;
  
  return (
    <div 
      onClick={() => onClick(collection.id)}
      className="cursor-pointer flex flex-col items-center p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl hover:shadow-xl transition-all hover:scale-105 border border-gray-200 dark:border-gray-700"
    >
      <div className="relative w-20 h-20 mb-4 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg">
        <img 
          src={correctImagePath(collection.image)}
          alt={collectionName}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
          }}
        />
        <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-r ${getCollectionBadgeColor(collection.id)} flex items-center justify-center`}>
          <span className="text-white text-xs font-bold">{collection.count}</span>
        </div>
      </div>
      
      <span className={`${language === 'ar' ? 'arabic-text' : ''} font-bold text-lg mb-2 text-center`}>
        {collectionName}
      </span>
      
      <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-3 line-clamp-2">
        {language === 'ar' ? collection.description : `${collection.count} premium designs`}
      </p>
      
      <div className="mt-auto">
        <span className="text-primary font-bold text-lg">
          {collection.price}
        </span>
        <div className="text-xs text-gray-500 mt-1">
          {language === 'ar' ? 'تبدأ من' : 'Starting from'}
        </div>
      </div>
    </div>
  );
});

const ImageGallery = () => {
  const { language } = useLanguage();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [featuredImages, setFeaturedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // توليد صور مميزة من جميع المجموعات
  useEffect(() => {
    const loadImages = async () => {
      try {
        setIsLoading(true);
        
        // توليد صور مميزة من جميع المجموعات
        const images = [];
        
        // المرور على جميع المجموعات
        collections.forEach(collection => {
          // الحصول على منتجات مميزة من هذه المجموعة
          const featuredProducts = getFeaturedProductsFromCollection(collection.id, 3);
          
          featuredProducts.forEach(product => {
            if (product.url) {
              images.push({
                url: product.url,
                alt: product.productName,
                type: language === 'ar' ? collection.name : collection.nameEn,
                collectionId: collection.id,
                productId: product.productId,
                productName: product.productName,
                description: product.description
              });
            }
          });
        });
        
        // خلط الصور عشوائياً
        const shuffledImages = [...images].sort(() => Math.random() - 0.5);
        setFeaturedImages(shuffledImages);
        
      } catch (error) {
        console.error('Error loading images:', error);
        
        // في حالة الخطأ، إضافة صور افتراضية
        setFeaturedImages([
          {
            alt: 'Islamic Design',
            type: language === 'ar' ? 'تصميم إسلامي' : 'Islamic Design',
            collectionId: 'islamic-ornaments',
            productId: 1,
            productName: language === 'ar' ? 'زخارف إسلامية ذهبية' : 'Golden Islamic Ornaments',
            description: language === 'ar' ? 'تصميم إسلامي فاخر' : 'Luxury Islamic Design'
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadImages();
  }, [language]);
  
  const totalImages = featuredImages.length;
  
  const nextImage = useCallback(() => {
    setCurrentIndex(prev => prev === totalImages - 1 ? 0 : prev + 1);
  }, [totalImages]);
  
  const prevImage = useCallback(() => {
    setCurrentIndex(prev => prev === 0 ? totalImages - 1 : prev - 1);
  }, []);
  
  // التحكم في التشغيل التلقائي
  useEffect(() => {
    if (!isAutoPlaying || totalImages === 0 || isLoading) return;
    
    const interval = setInterval(() => {
      nextImage();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextImage, totalImages, isLoading]);
  
  const getThumbnails = useCallback(() => {
    if (totalImages === 0) return [];
    const thumbnails = [];
    const count = Math.min(12, totalImages);
    
    for (let i = 0; i < count; i++) {
      const index = (currentIndex + i) % totalImages;
      thumbnails.push({
        ...featuredImages[index],
        number: i + 1
      });
    }
    
    return thumbnails;
  }, [currentIndex, featuredImages, totalImages]);
  
  const handleThumbnailClick = useCallback((index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  }, []);
  
  const handleCollectionClick = useCallback((collectionId) => {
    localStorage.setItem('selectedCollection', collectionId);
    window.location.href = `/products?category=${collectionId}`;
  }, []);
  
  if (isLoading) {
    return (
      <section className="py-16 px-6 md:px-20 bg-gradient-to-b from-white to-peach-soft/30 dark:from-background-dark dark:to-gray-900">
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-64 mx-auto"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-96 mx-auto"></div>
            
            {/* Main image skeleton */}
            <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-3xl"></div>
            
            {/* Thumbnails skeleton */}
            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  if (totalImages === 0) {
    return (
      <section className="py-16 px-6 md:px-20 bg-gradient-to-b from-white to-peach-soft/30 dark:from-background-dark dark:to-gray-900">
        <div className="max-w-6xl mx-auto text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-primary/10 to-purple-600/10 rounded-2xl flex items-center justify-center">
            <span className="material-symbols-outlined text-4xl text-primary">collections</span>
          </div>
          <h3 className="text-2xl font-bold text-[#2d1a1e] dark:text-white mb-3">
            {language === 'ar' ? 'لا توجد صور متاحة' : 'No Images Available'}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {language === 'ar' 
              ? 'جاري تحميل الصور والمجموعات...'
              : 'Loading images and collections...'
            }
          </p>
        </div>
      </section>
    );
  }
  
  const currentImage = featuredImages[currentIndex];
  
  return (
    <section className="py-16 px-6 md:px-20 bg-gradient-to-b from-white via-peach-soft/10 to-white/80 dark:from-background-dark dark:via-gray-900/50 dark:to-gray-900">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-primary animate-pulse" 
                     style={{ animationDelay: `${i * 150}ms` }}></div>
              ))}
            </div>
            <span className={`${language === 'ar' ? 'arabic-text' : ''} text-sm font-medium text-[#2d1a1e] dark:text-gray-300`}>
              {language === 'ar' ? 'معرض الصور الإسلامي' : 'Islamic Image Gallery'}
            </span>
          </div>
          
          <h2 className={`${language === 'ar' ? 'arabic-text' : ''} text-4xl md:text-5xl lg:text-6xl font-black text-[#2d1a1e] dark:text-white mb-6`}>
            <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
              {language === 'ar' ? 'كنوز إسلامية بصرية' : 'Visual Islamic Treasures'}
            </span>
          </h2>
          
          <p className={`${language === 'ar' ? 'arabic-text' : ''} text-lg text-[#2d1a1e]/70 dark:text-gray-400 max-w-2xl mx-auto mb-8`}>
            {language === 'ar' 
              ? 'استكشف معرضنا الكامل للزخارف والنقوش الإسلامية الفاخرة. انقر لاكتشاف جميع التصاميم الجميلة.'
              : 'Explore our complete gallery of luxurious Islamic ornaments and patterns. Click to discover all the beautiful designs.'
            }
          </p>
        </div>
        
        {/* Main Image Carousel */}
        <div className="relative mb-12 group" 
             onMouseEnter={() => setIsAutoPlaying(false)} 
             onMouseLeave={() => setIsAutoPlaying(true)}>
          
          <Link to={`/product/${currentImage?.productId}`} className="block">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 aspect-video">
              <img 
                src={correctImagePath(currentImage?.url)}
                alt={currentImage?.alt || 'Islamic Design'}
                className="w-full h-full object-contain transition-opacity duration-500"
                loading="eager"
                onError={(e) => {
                  e.target.onerror = null;
                }}
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              
              {/* Image Info */}
              {currentImage && (
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                        {currentImage.productName}
                      </h3>
                      <p className="text-white/80 text-lg">
                        {currentImage.type} • {currentImage.description}
                      </p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
                      <span className="text-white font-bold">
                        {language === 'ar' ? 'تصميم رقم' : 'Design #'} {currentIndex + 1}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Link>
          
          {/* Navigation Buttons */}
          <button
            onClick={prevImage}
            className={`absolute ${language === 'ar' ? 'right-4' : 'left-4'} top-1/2 transform -translate-y-1/2 w-14 h-14 bg-white/90 dark:bg-gray-900/90 rounded-full flex items-center justify-center shadow-2xl hover:bg-white dark:hover:bg-gray-800 transition-all opacity-0 group-hover:opacity-100 hover:scale-110`}
            aria-label={language === 'ar' ? 'الصورة السابقة' : 'Previous image'}
          >
            <span className="material-symbols-outlined text-2xl">
              {language === 'ar' ? 'chevron_right' : 'chevron_left'}
            </span>
          </button>
          
          <button
            onClick={nextImage}
            className={`absolute ${language === 'ar' ? 'left-4' : 'right-4'} top-1/2 transform -translate-y-1/2 w-14 h-14 bg-white/90 dark:bg-gray-900/90 rounded-full flex items-center justify-center shadow-2xl hover:bg-white dark:hover:bg-gray-800 transition-all opacity-0 group-hover:opacity-100 hover:scale-110`}
            aria-label={language === 'ar' ? 'الصورة التالية' : 'Next image'}
          >
            <span className="material-symbols-outlined text-2xl">
              {language === 'ar' ? 'chevron_left' : 'chevron_right'}
            </span>
          </button>
          
          {/* Progress Indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
            {[...Array(Math.min(5, totalImages))].map((_, i) => {
              const index = (currentIndex + i) % totalImages;
              return (
                <button
                  key={i}
                  onClick={() => handleThumbnailClick(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentIndex === index 
                      ? 'bg-white w-10' 
                      : 'bg-white/50 hover:bg-white w-3'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              );
            })}
          </div>
          
          {/* Auto-play toggle */}
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="absolute top-4 right-4 w-12 h-12 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all"
            aria-label={isAutoPlaying ? (language === 'ar' ? 'إيقاف التشغيل التلقائي' : 'Pause auto-play') : (language === 'ar' ? 'تشغيل تلقائي' : 'Play auto')}
          >
            <span className="material-symbols-outlined">
              {isAutoPlaying ? 'pause' : 'play_arrow'}
            </span>
          </button>
        </div>
        
        {/* Quick Browse Thumbnails */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h3 className={`${language === 'ar' ? 'arabic-text' : ''} text-2xl font-bold dark:text-white`}>
              {language === 'ar' ? 'تصفح سريع' : 'Quick Browse'}
            </h3>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {currentIndex + 1} / {totalImages} {language === 'ar' ? 'صورة' : 'images'}
            </div>
          </div>
          
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-3">
            {getThumbnails().map((img, index) => (
              <Thumbnail
                key={index}
                img={img}
                isActive={currentIndex === img.number - 1}
                onClick={() => handleThumbnailClick((currentIndex + index) % totalImages)}
              />
            ))}
          </div>
        </div>
        
        {/* Collections */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className={`${language === 'ar' ? 'arabic-text' : ''} text-3xl font-bold dark:text-white mb-4`}>
              {language === 'ar' ? 'المجموعات الإسلامية' : 'Islamic Collections'}
            </h3>
            <p className={`${language === 'ar' ? 'arabic-text' : ''} text-gray-600 dark:text-gray-400 max-w-2xl mx-auto`}>
              {language === 'ar' 
                ? 'اكتشف مجموعاتنا الإسلامية الفريدة والمتنوعة. كل مجموعة تضم تصميمات متميزة ومتفردة.'
                : 'Discover our unique and diverse Islamic collections. Each collection features premium and distinctive designs.'
              }
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {collections.map(collection => (
              <CollectionCard 
                key={collection.id}
                collection={collection} 
                language={language}
                onClick={handleCollectionClick}
              />
            ))}
          </div>
        </div>
        
        {/* View All Button */}
        <div className="text-center">
          <Link 
            to="/products" 
            className={`${language === 'ar' ? 'arabic-text' : ''} group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-purple-600 text-white rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300`}
            aria-label={language === 'ar' ? 'عرض جميع المنتجات' : 'View all products'}
          >
            <span className="flex items-center gap-2">
              {language === 'ar' ? 'استكشف جميع التصاميم' : 'Explore All Designs'}
              <span className="material-symbols-outlined text-xl transition-transform group-hover:translate-x-1">
                {language === 'ar' ? 'arrow_back' : 'arrow_forward'}
              </span>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ImageGallery;