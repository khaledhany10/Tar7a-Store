import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { allProducts } from '../data/products';

// دالة للحصول على أفضل المنتجات مبيعاً
const getBestSellingProducts = (limit = 8) => {
  // تصنيف المنتجات حسب الشعبية والتصنيف والطلبات
  return [...allProducts]
    .sort((a, b) => {
      // أولوية للعروض الخاصة
      if (a.hasOffer && !b.hasOffer) return -1;
      if (!a.hasOffer && b.hasOffer) return 1;
      
      // ثم حسب الشعبية
      const popularityA = a.popularity || 0;
      const popularityB = b.popularity || 0;
      if (popularityB !== popularityA) return popularityB - popularityA;
      
      // ثم حسب التقييم
      const ratingA = parseFloat(a.rating) || 4.0;
      const ratingB = parseFloat(b.rating) || 4.0;
      if (ratingB !== ratingA) return ratingB - ratingA;
      
      // ثم حسب عدد التقييمات
      const reviewsA = a.reviews || 0;
      const reviewsB = b.reviews || 0;
      return reviewsB - reviewsA;
    })
    .slice(0, limit)
    .map((product, index) => ({
      ...product,
      collectionNumber: index + 1
    }));
};

const NewArrivals = () => {
  const { language } = useLanguage();
  const [hoveredProduct, setHoveredProduct] = useState(null);

  // الحصول على أفضل المنتجات مبيعاً
  const bestSellingProducts = useMemo(() => getBestSellingProducts(8), []);

  // تصحيح مسار الصور
  const correctImagePath = (imagePath) => {
    if (!imagePath) return '/images/placeholder.jpg';
    
    let correctedPath = imagePath;
    
    // إذا كان المسار يحتوي على /img/ قم بإزالته
    if (correctedPath.startsWith('/img/')) {
      correctedPath = correctedPath.substring(4);
    }
    
    // تأكد من أن المسار يبدأ بـ /
    if (!correctedPath.startsWith('/')) {
      correctedPath = '/' + correctedPath;
    }
    
    // إصلاح المسارات المزدوجة
    correctedPath = correctedPath.replace('//', '/');
    
    return correctedPath;
  };

  // الحصول على التقييم كرقم
  const getRating = (product) => {
    const rating = product.rating;
    if (typeof rating === 'number') return rating;
    if (typeof rating === 'string') return parseFloat(rating);
    return 4.5; // قيمة افتراضية
  };

  // الحصول على عدد التقييمات
  const getReviewsCount = (product) => {
    const reviews = product.reviews;
    if (typeof reviews === 'number') return reviews;
    if (typeof reviews === 'string') return parseInt(reviews);
    return 0;
  };

  // الحصول على الشعبية
  const getPopularity = (product) => {
    const popularity = product.popularity;
    if (typeof popularity === 'number') return popularity;
    if (typeof popularity === 'string') return parseInt(popularity);
    return Math.floor(Math.random() * 1000) + 100; // قيمة عشوائية إذا لم تكن موجودة
  };

  const handleOrderClick = (product) => {
    const orderData = {
      productId: product.id,
      productName: product.name || '',
      productPrice: product.price || '150EGP',
      productImage: correctImagePath(product.image || product.images?.[0]),
      collectionType: product.collectionType,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('lastSelectedProduct', JSON.stringify(orderData));
    window.location.href = '/order-form';
  };

  // الحصول على لون الشارة للمجموعة
  const getCollectionBadgeColor = (collectionType) => {
    const colorMap = {
      '01-Basic-Pinks': 'bg-gradient-to-r from-pink-500 to-rose-600',
      '02-Christian-Dior': 'bg-gradient-to-r from-gray-700 to-black',
      '03-Islamic-Ornaments': 'bg-gradient-to-r from-yellow-600 to-yellow-800',
      '04-Islamic-Scarf': 'bg-gradient-to-r from-green-600 to-emerald-800',
      '05-Ramadan': 'bg-gradient-to-r from-purple-600 to-indigo-800',
      '06-Pattern': 'bg-gradient-to-r from-blue-500 to-cyan-500',
      '07-Itamine': 'bg-gradient-to-r from-red-500 to-pink-600',
      '08-Colourfull-Limited': 'bg-gradient-to-r from-orange-500 to-red-600',
      '09-Melt-designs': 'bg-gradient-to-r from-teal-500 to-green-600',
      '10-Beige-Basic-grad': 'bg-gradient-to-r from-amber-500 to-orange-600'
    };
    
    return colorMap[collectionType] || 'bg-gradient-to-r from-primary to-purple-600';
  };

  // الحصول على اسم المجموعة المناسب للغة
  const getCollectionName = (product) => {
    if (language === 'ar') {
      return product.collectionName || product.category || 'مجموعة إسلامية';
    }
    return product.collectionType || product.category || 'Islamic Collection';
  };

  // حساب متوسط التقييمات
  const averageRating = useMemo(() => {
    if (bestSellingProducts.length === 0) return 0;
    const totalRating = bestSellingProducts.reduce((sum, product) => {
      return sum + getRating(product);
    }, 0);
    return (totalRating / bestSellingProducts.length).toFixed(1);
  }, [bestSellingProducts]);

  // الحصول على إجمالي التقييمات
  const totalReviews = useMemo(() => {
    return bestSellingProducts.reduce((sum, product) => sum + getReviewsCount(product), 0);
  }, [bestSellingProducts]);

  // الحصول على إجمالي الشعبية
  const totalPopularity = useMemo(() => {
    return bestSellingProducts.reduce((sum, product) => sum + getPopularity(product), 0);
  }, [bestSellingProducts]);

  return (
    <section className="relative overflow-hidden px-6 md:px-20 py-28">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-peach-soft/20 to-primary/5 dark:from-background-dark dark:via-gray-900 dark:to-primary/10"></div>
      
      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%232d1a1e%22%20fill-opacity%3D%220.1%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')]"></div>
      </div>
      
      {/* Floating Circles */}
      <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/10 blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-peach-soft/20 blur-3xl"></div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            <span className={`${language === 'ar' ? 'arabic-text' : ''} text-sm font-medium text-[#2d1a1e] dark:text-gray-300`}>
              {language === 'ar' ? 'الأكثر طلباً' : 'Most Popular'}
            </span>
          </div>
          
          <h2 className={`${language === 'ar' ? 'arabic-text' : ''} text-4xl md:text-5xl lg:text-6xl font-black text-[#2d1a1e] dark:text-white mb-6`}>
            {language === 'ar' ? 'الأكثر مبيعاً' : 'Best Sellers'}
          </h2>
          
          <p className={`${language === 'ar' ? 'arabic-text' : ''} text-lg text-[#2d1a1e]/70 dark:text-gray-400 max-w-2xl mx-auto mb-8`}>
            {language === 'ar' 
              ? 'اكتشف تصاميمنا الإسلامية الأكثر طلباً. اختارت العملاء هذه القطع لما تتميز به من جودة وإتقان.'
              : 'Discover our most requested Islamic designs. Customers have chosen these pieces for their quality and craftsmanship.'
            }
          </p>
          
          {/* Stats */}
          <div className="flex justify-center gap-6 mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">
                {bestSellingProducts.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {language === 'ar' ? 'منتج مميز' : 'Premium Products'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {totalReviews.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {language === 'ar' ? 'تقييمات' : 'Reviews'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600">
                {averageRating}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {language === 'ar' ? 'تقييم متوسط' : 'Avg Rating'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">
                {(totalPopularity / 1000).toFixed(0)}K
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {language === 'ar' ? 'مشاهدات' : 'Views'}
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {bestSellingProducts.map((product) => {
            const rating = getRating(product);
            const reviewsCount = getReviewsCount(product);
            const popularity = getPopularity(product);
            
            return (
              <div 
                key={product.id}
                className="group relative"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                  {/* Image Container */}
                  <div className={`relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900`}>
                    <Link to={`/product/${product.id}`}>
                      <img 
                        src={correctImagePath(product.image || product.images?.[0])}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/images/placeholder.jpg';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </Link>
                    
                    {/* Tags */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {product.hasOffer && (
                        <div className={`${language === 'ar' ? 'arabic-text' : ''} px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg`}>
                          {language === 'ar' ? 'عرض خاص' : 'Special Offer'}
                        </div>
                      )}
                      
                      <div className={`${language === 'ar' ? 'arabic-text' : ''} px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getCollectionBadgeColor(product.collectionType)} text-white shadow-lg`}>
                        {getCollectionName(product)}
                      </div>
                      
                      {!product.inStock && (
                        <div className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-red-500 to-red-700 text-white shadow-lg">
                          {language === 'ar' ? 'نفذ' : 'Sold Out'}
                        </div>
                      )}
                    </div>
                    
                    {/* Rating */}
                    <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 shadow-lg">
                      <span className="material-symbols-outlined text-yellow-500 text-sm">star</span>
                      <span className="text-sm font-bold">{rating.toFixed(1)}</span>
                    </div>
                    
                    {/* Quick Action Button */}
                    <div className={`absolute bottom-4 ${language === 'ar' ? 'right-4' : 'left-4'} translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300`}>
                      <button 
                        onClick={() => handleOrderClick(product)}
                        disabled={!product.inStock}
                        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all ${
                          product.inStock
                            ? 'bg-white dark:bg-gray-800 text-primary hover:bg-primary hover:text-white'
                            : 'bg-gray-400 cursor-not-allowed text-white'
                        }`}
                        aria-label={product.inStock ? (language === 'ar' ? 'أطلب الآن' : 'Order now') : (language === 'ar' ? 'نفذ' : 'Sold out')}
                      >
                        <span className="material-symbols-outlined">shopping_cart</span>
                      </button>
                    </div>
                  </div>
                  
                  {/* Product Info */}
                  <div className="p-6">
                    <div className="mb-3">
                      <Link to={`/product/${product.id}`}>
                        <h3 className={`${language === 'ar' ? 'arabic-text' : ''} text-lg font-bold text-[#2d1a1e] dark:text-white mb-2 line-clamp-1 hover:text-primary transition-colors`}>
                          {product.name}
                        </h3>
                      </Link>
                      <p className={`${language === 'ar' ? 'arabic-text' : ''} text-sm text-[#2d1a1e]/60 dark:text-gray-400 mb-3 line-clamp-2`}>
                        {product.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className={`${language === 'ar' ? 'arabic-text' : ''} text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent`}>
                          {product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                            {product.originalPrice}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex gap-1">
                        {(product.colors || []).slice(0, 3).map((color, index) => (
                          <div 
                            key={index}
                            className="w-5 h-5 rounded-full border border-white shadow-sm transition-transform group-hover:scale-110"
                            style={{ backgroundColor: typeof color === 'object' ? color.value : color || '#ccc' }}
                            title={typeof color === 'object' ? color.name : `${language === 'ar' ? 'لون' : 'Color'} ${index + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                    
                    {/* Popularity Indicator */}
                    <div className="mt-3">
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                        {language === 'ar' ? 'الشعبية:' : 'Popularity:'} {popularity.toLocaleString()}
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                        <div 
                          className="bg-gradient-to-r from-primary to-purple-600 h-1 rounded-full"
                          style={{ width: `${Math.min(popularity / 1000, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    {/* Tags */}
                    <div className="mt-3 flex flex-wrap gap-1">
                      {product.tags?.slice(0, 2).map((tag, index) => (
                        <span key={index} className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Hover Effect Overlay */}
                <div className={`absolute inset-0 rounded-3xl border-2 border-primary/20 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none ${
                  hoveredProduct === product.id ? 'scale-105' : 'scale-100'
                }`}></div>
                
                {/* Collection Indicator */}
                <div className="absolute -top-2 -right-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-purple-600 flex items-center justify-center shadow-lg">
                    <span className="text-white text-xs font-bold">
                      {product.collectionNumber?.toString().padStart(2, '0') || '01'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* View All Button */}
        <div className="text-center mt-16">
          <Link 
            to="/products" 
            className={`${language === 'ar' ? 'arabic-text' : ''} group inline-flex items-center justify-center rounded-full h-14 px-8 bg-gradient-to-r from-primary to-purple-600 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden`}
            aria-label={language === 'ar' ? 'استكشف جميع المنتجات' : 'Explore all products'}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <span className="relative z-10 flex items-center gap-2">
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