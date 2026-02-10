// src/components/AllProducts.jsx
import React, { useState, useEffect, useMemo, useCallback, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { 
  allProducts, 
  collections,
  getDynamicStats,
  searchAllProducts
} from '../data/products';

// دالة تحسين مسار الصور - معدلة للنظام الجديد
const correctImagePath = (imagePath) => {
  if (!imagePath) return '';
  
  let correctedPath = imagePath;
  
  // تحسين إصلاح المسارات
  if (correctedPath.includes('\\')) correctedPath = correctedPath.replace(/\\/g, '/');
  
  // إذا كان المسار يبدأ بـ /Img/ أو /images/ أو http اتركه كما هو
  if (correctedPath.startsWith('/Img/') || correctedPath.startsWith('/images/') || correctedPath.startsWith('http')) {
    return correctedPath;
  }
  
  // إذا كان المسار يبدأ بـ / فقط وأول حرف ليس I أو i
  if (correctedPath.startsWith('/') && !correctedPath.startsWith('/I') && !correctedPath.startsWith('/i')) {
    correctedPath = '/Img' + correctedPath;
  }
  
  // إذا لم يبدأ بـ / إطلاقاً
  if (!correctedPath.startsWith('/') && !correctedPath.startsWith('http')) {
    correctedPath = '/Img/' + correctedPath;
  }
  
  correctedPath = correctedPath.replace('//', '/');
  
  return correctedPath;
};

// معالج أخطاء الصور
const handleImageError = (e) => {
  e.target.onerror = null;
  
  // محاولة استخدام مسار بديل
  const imgSrc = e.target.src;
  
  if (imgSrc.includes('Main.jpeg')) {
    const basePath = imgSrc.substring(0, imgSrc.lastIndexOf('/'));
    e.target.src = correctImagePath(basePath + '/01.jpg');
  } else if (imgSrc.includes('01.jpg')) {
    const basePath = imgSrc.substring(0, imgSrc.lastIndexOf('/'));
    e.target.src = correctImagePath(basePath + '/02.jpg');
  } else {
    // عرض أيقونة بدلاً من الصورة
    e.target.style.display = 'none';
    const parent = e.target.parentElement;
    const fallback = document.createElement('div');
    fallback.className = 'absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center rounded-lg';
    fallback.innerHTML = `<span class="material-symbols-outlined text-gray-400 text-4xl">image</span>`;
    parent.appendChild(fallback);
  }
};

// الحصول على صورة افتراضية بناءً على المجموعة
const getDefaultImage = (collectionType) => {
  const collectionImages = {
    '01-Basic-Pinks': '/Img/Collections/01-Basic-Pinks/01-Basic-Pinks-Grading-Colours/Main.jpeg',
    '02-Christian-Dior': '/Img/Collections/02-Christian-Dior/01-Christian-Dior-Collection/Main.jpeg',
    '03-Islamic-Ornaments': '/Img/Collections/03-Islamic-Ornaments/01-Islamic-Ornaments-Collection/Main.jpeg',
    '04-Islamic-Scarf': '/Img/Collections/04-Islamic-Scarf/01-Islamic-Scarf-Collection/Main.jpeg',
    '05-Ramadan': '/Img/Collections/05-Ramadan/01-Ramadan-Collection/Main.jpeg',
    '06-Pattern': '/Img/Collections/06-Pattern/01-Pattern-Collection/Main.jpeg',
    '07-Itamine': '/Img/Collections/07-Itamine/01-Itamine-design-collection/Main.jpeg',
    '08-Colourfull-Limited': '/Img/Collections/08-Colourfull-Limited/01-Colourfull-Limited-Design-Collection/Main.jpeg',
    '09-Melt-designs': '/Img/Collections/09-Melt-designs/01-Melt-designs-Collection/01.jpeg',
    '10-Beige-Basic-grad': '/Img/Collections/10-Beige-Basic-grad/01-Beige-Basic-grad-Colours-Collection/Main.jpeg'
  };
  
  return collectionImages[collectionType] || '/Img/placeholder.jpg';
};

// ProductCardGrid - معدل
const ProductCardGrid = memo(({ product, language, onOrderClick, hoveredProduct, setHoveredProduct }) => {
  const imageSrc = useMemo(() => {
    if (!product || !product.image) return getDefaultImage(product?.collectionType);
    
    let src = product.image.trim();
    
    // تنظيف بسيط
    src = src.replace(/\\/g, '/');
    src = src.replace(/\/+/g, '/');
    
    // استخدام دالة correctImagePath
    return correctImagePath(src);
  }, [product]);

  return (
    <div 
      className="group relative"
      onMouseEnter={() => setHoveredProduct(product.id)}
      onMouseLeave={() => setHoveredProduct(null)}
    >
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group-hover:-translate-y-1 h-full flex flex-col">
        <Link to={`/product/${product.id}`} className="flex-shrink-0">
          <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
            <img 
              src={imageSrc}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null;
                console.error('Failed to load image:', imageSrc);
                e.target.style.display = 'none';
                const parent = e.target.parentElement;
                const fallback = document.createElement('div');
                fallback.className = 'absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex flex-col items-center justify-center rounded-lg';
                fallback.innerHTML = `
                  <span class="material-symbols-outlined text-gray-400 text-4xl mb-2">image</span>
                  <span class="text-xs text-gray-500">${product.name || 'Image'}</span>
                `;
                parent.appendChild(fallback);
              }}
            />
            
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.hasOffer && (
                <div className="px-3 py-1 rounded-full bg-gradient-to-r from-primary to-purple-600 text-white text-xs font-bold uppercase tracking-wider shadow-lg">
                  {language === 'ar' ? 'عرض خاص' : 'Special Offer'}
                </div>
              )}
              {!product.inStock && (
                <div className="px-3 py-1 rounded-full bg-red-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg">
                  {language === 'ar' ? 'نفذ' : 'Sold Out'}
                </div>
              )}
            </div>
          </div>
        </Link>
        
        {/* Product Info */}
        <div className="flex-1 p-4 flex flex-col">
          {/* Collection Tag */}
          <div className="mb-3">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              product.collectionType === '03-Islamic-Ornaments' 
                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                : product.collectionType === '04-Islamic-Scarf'
                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                : product.collectionType === '05-Ramadan'
                ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
                : product.collectionType === '01-Basic-Pinks'
                ? 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300'
                : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
            }`}>
              {language === 'ar' ? product.collectionName || product.category : product.collectionType}
            </span>
          </div>
          
          {/* Product Name */}
          <Link to={`/product/${product.id}`} className="flex-1 mb-3">
            <h3 className="text-base font-bold mb-2 dark:text-white text-gray-800 hover:text-primary transition-colors line-clamp-2 leading-snug">
              {product.name}
            </h3>
          </Link>
          
          {/* Simple Description */}
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
            {product.description || 'منتج إسلامي مميز بجودة عالية'}
          </p>
          
          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <span 
                  key={i} 
                  className="material-symbols-outlined text-sm"
                  style={{ 
                    color: i < Math.floor(product.rating || 4.5) ? '#F59E0B' : '#D1D5DB' 
                  }}
                >
                  star
                </span>
              ))}
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {product.rating || '4.5'}
            </span>
            <span className="text-xs text-gray-500">({product.reviews || 0})</span>
          </div>
          
          {/* Price and Action Button */}
          <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  {product.price || '150 EGP'}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    {product.originalPrice}
                  </span>
                )}
              </div>
            </div>
            
            <button 
              onClick={() => onOrderClick(product)}
              disabled={!product.inStock}
              className={`w-full py-3 text-white font-semibold rounded-lg hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2 ${
                product.inStock 
                  ? 'bg-gradient-to-r from-primary to-purple-600 hover:from-purple-600 hover:to-primary' 
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              <span className="material-symbols-outlined text-sm">shopping_cart</span>
              {product.inStock 
                ? (language === 'ar' ? 'أطلب الآن' : 'Order Now')
                : (language === 'ar' ? 'نفذ' : 'Sold Out')
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

// ProductCardList - معدل
const ProductCardList = memo(({ product, language, onOrderClick }) => {
  const imageSrc = useMemo(() => {
    if (!product || !product.image) return getDefaultImage(product?.collectionType);
    return correctImagePath(product.image);
  }, [product]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <Link to={`/product/${product.id}`} className="md:w-1/4 flex-shrink-0">
          <div className="relative aspect-[4/3] md:aspect-square overflow-hidden">
            <img 
              src={imageSrc}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              loading="lazy"
              onError={handleImageError}
            />
            {product.hasOffer && (
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-gradient-to-r from-primary to-purple-600 text-white text-xs font-bold uppercase tracking-wider">
                {language === 'ar' ? 'عرض خاص' : 'Special Offer'}
              </div>
            )}
          </div>
        </Link>
        
        <div className="flex-1 p-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  product.collectionType === '03-Islamic-Ornaments' 
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                    : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                }`}>
                  {language === 'ar' ? product.collectionName || product.category : product.collectionType}
                </span>
                {!product.inStock && (
                  <span className="px-3 py-1 rounded-full bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 text-xs font-medium">
                    {language === 'ar' ? 'نفذ' : 'Sold Out'}
                  </span>
                )}
              </div>
              
              <Link to={`/product/${product.id}`}>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 hover:text-primary transition-colors">
                  {product.name}
                </h3>
              </Link>
              
              <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                {product.description || 'منتج إسلامي مميز بجودة عالية'}
              </p>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span 
                      key={i} 
                      className="material-symbols-outlined text-sm"
                      style={{ 
                        color: i < Math.floor(product.rating || 4.5) ? '#F59E0B' : '#D1D5DB' 
                      }}
                    >
                      star
                    </span>
                  ))}
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {product.rating || '4.5'} ({product.reviews || 0} {language === 'ar' ? 'تقييم' : 'reviews'})
                </span>
              </div>
            </div>
            
            <div className="md:w-48 flex flex-col items-end">
              <div className="mb-4 text-right">
                <div className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  {product.price || '150 EGP'}
                </div>
                {product.originalPrice && (
                  <div className="text-sm text-gray-500 line-through">
                    {product.originalPrice}
                  </div>
                )}
              </div>
              
              <button 
                onClick={() => onOrderClick(product)}
                disabled={!product.inStock}
                className={`w-full px-6 py-3 text-white font-semibold rounded-lg hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2 ${
                  product.inStock 
                    ? 'bg-gradient-to-r from-primary to-purple-600 hover:from-purple-600 hover:to-primary' 
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                <span className="material-symbols-outlined text-sm">shopping_cart</span>
                {product.inStock 
                  ? (language === 'ar' ? 'أطلب الآن' : 'Order Now')
                  : (language === 'ar' ? 'نفذ' : 'Sold Out')
                }
              </button>
              
              <button className="mt-3 text-primary hover:text-purple-600 text-sm font-medium flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">favorite</span>
                {language === 'ar' ? 'إضافة للمفضلة' : 'Add to Wishlist'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

// Pagination Component
const Pagination = ({ currentPage, totalPages, onPageChange, language }) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let start = Math.max(1, currentPage - 2);
      let end = Math.min(totalPages, start + maxVisiblePages - 1);
      
      if (end - start + 1 < maxVisiblePages) {
        start = Math.max(1, end - maxVisiblePages + 1);
      }
      
      if (start > 1) {
        pages.push(1);
        if (start > 2) pages.push('...');
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (end < totalPages) {
        if (end < totalPages - 1) pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2 rounded-lg transition-all duration-300 flex items-center gap-1 ${
          currentPage === 1
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
        }`}
        aria-label={language === 'ar' ? 'الصفحة السابقة' : 'Previous page'}
      >
        <span className="material-symbols-outlined text-sm">chevron_left</span>
        <span className="text-sm font-medium">{language === 'ar' ? 'السابق' : 'Prev'}</span>
      </button>

      <div className="flex items-center gap-1">
        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === 'number' && onPageChange(page)}
            className={`w-10 h-10 rounded-lg transition-all duration-300 flex items-center justify-center text-sm font-medium ${
              page === currentPage
                ? 'bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg'
                : typeof page === 'number'
                ? 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                : 'text-gray-500 cursor-default'
            }`}
            disabled={typeof page !== 'number'}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-lg transition-all duration-300 flex items-center gap-1 ${
          currentPage === totalPages
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
        }`}
        aria-label={language === 'ar' ? 'الصفحة التالية' : 'Next page'}
      >
        <span className="text-sm font-medium">{language === 'ar' ? 'التالي' : 'Next'}</span>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
      </button>
    </div>
  );
};

// Skeleton Loader
const SkeletonLoader = ({ count = 6, viewMode = 'grid' }) => {
  return (
    <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
            <div className="aspect-[3/4] bg-gray-200 dark:bg-gray-700"></div>
            <div className="p-4 space-y-4">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Filter Sidebar
const FilterSidebar = ({ 
  language, 
  collectionsList, 
  selectedCollection, 
  filters, 
  stats,
  onFilterChange,
  onClearFilters 
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-[#2d1a1e] dark:text-white">
          {language === 'ar' ? 'التصفية والبحث' : 'Filter & Search'}
        </h2>
        <button
          onClick={onClearFilters}
          className="text-sm text-primary hover:text-purple-600 transition-colors flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-sm">filter_alt_off</span>
          {language === 'ar' ? 'مسح الكل' : 'Clear All'}
        </button>
      </div>
      
      <div className="space-y-6">
        {/* Collections Only */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-lg mb-4 dark:text-white">
            <span className="material-symbols-outlined text-primary mr-2">collections</span>
            {language === 'ar' ? 'المجموعات' : 'Collections'}
          </h3>
          <div className="space-y-2">
            <button
              key="all"
              onClick={() => onFilterChange('collection', 'all')}
              className={`w-full text-right px-4 py-3 rounded-xl transition-all duration-300 flex justify-between items-center ${
                selectedCollection === 'all'
                  ? 'bg-primary/10 text-primary font-semibold'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              <span className="text-sm text-gray-500 dark:text-gray-400">{stats.totalProducts}</span>
              <span>{language === 'ar' ? 'كل المجموعات' : 'All Collections'}</span>
            </button>
            
            {collectionsList.filter(c => c.id !== 'all').map(collection => (
              <button
                key={collection.id}
                onClick={() => onFilterChange('collection', collection.id)}
                className={`w-full text-right px-4 py-3 rounded-xl transition-all duration-300 flex justify-between items-center ${
                  selectedCollection === collection.id
                    ? 'bg-primary/10 text-primary font-semibold'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                <span className="text-sm text-gray-500 dark:text-gray-400">{collection.count}</span>
                <span>{language === 'ar' ? collection.name : collection.nameEn}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-lg mb-4 dark:text-white">
            <span className="material-symbols-outlined text-primary mr-2">attach_money</span>
            {language === 'ar' ? 'نطاق السعر' : 'Price Range'}
          </h3>
          <div className="space-y-4">
            <div className="px-2">
              <input
                type="range"
                min={stats.priceRange.min}
                max={stats.priceRange.max}
                value={filters.maxPrice || stats.priceRange.max}
                onChange={(e) => onFilterChange('maxPrice', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
              />
            </div>
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>{stats.priceRange.min} EGP</span>
              <span className="font-bold text-primary">{filters.maxPrice || stats.priceRange.max} EGP</span>
            </div>
          </div>
        </div>

        {/* Additional Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-lg mb-4 dark:text-white">
            <span className="material-symbols-outlined text-primary mr-2">tune</span>
            {language === 'ar' ? 'تصفية إضافية' : 'Additional Filters'}
          </h3>
          <div className="space-y-3">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filters.inStock}
                onChange={(e) => onFilterChange('inStock', e.target.checked)}
                className="w-4 h-4 text-primary rounded focus:ring-primary"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {language === 'ar' ? 'المتاح فقط' : 'Available Only'}
              </span>
            </label>
            
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filters.hasOffer}
                onChange={(e) => onFilterChange('hasOffer', e.target.checked)}
                className="w-4 h-4 text-primary rounded focus:ring-primary"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {language === 'ar' ? 'العروض الخاصة' : 'Special Offers'}
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Component
const AllProducts = () => {
  const location = useLocation();
  const { language } = useLanguage();
  
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCollection, setSelectedCollection] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [filters, setFilters] = useState({
    inStock: false,
    hasOffer: false,
    maxPrice: null,
    minPrice: null
  });

  const productsPerPage = viewMode === 'grid' ? 12 : 6;
  
  // الحصول على الإحصائيات الحية
  const stats = useMemo(() => getDynamicStats(), [allProducts]);
  
  // تحديث collections بناءً على المنتجات الحالية
  const collectionsList = useMemo(() => [
    { 
      id: 'all', 
      name: language === 'ar' ? 'كل المجموعات' : 'All Collections', 
      nameEn: 'All Collections',
      count: allProducts.length,
      icon: 'collections' 
    },
    ...collections.filter(c => c.id !== 'all').map(col => ({
      id: col.id,
      name: col.name,
      nameEn: col.nameEn || col.name,
      count: col.count,
      icon: 'collections_bookmark'
    }))
  ], [language, collections, allProducts]);

  const sortOptions = useMemo(() => [
    { value: 'newest', label_ar: 'الأحدث أولاً', label_en: 'Newest First', icon: 'new_releases' },
    { value: 'popularity', label_ar: 'الأكثر شعبية', label_en: 'Most Popular', icon: 'trending_up' },
    { value: 'rating', label_ar: 'الأعلى تقييماً', label_en: 'Highest Rated', icon: 'star' },
    { value: 'price-low', label_ar: 'السعر: منخفض', label_en: 'Price: Low', icon: 'arrow_upward' },
    { value: 'price-high', label_ar: 'السعر: مرتفع', label_en: 'Price: High', icon: 'arrow_downward' }
  ], []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    const searchParam = params.get('search');
    
    if (categoryParam) {
      const validCollections = ['all', ...collectionsList.map(c => c.id)];
      if (validCollections.includes(categoryParam)) {
        setSelectedCollection(categoryParam);
        setSelectedCategory('all');
      }
    }
    
    if (searchParam) {
      setSearchQuery(searchParam);
    }
    
    setCurrentPage(1);
  }, [location.search, collectionsList]);

  // البحث والفلترة باستخدام النظام الجديد
  const filteredProducts = useMemo(() => {
    return searchAllProducts(searchQuery, {
      category: null,
      collection: selectedCollection !== 'all' ? selectedCollection : null,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      inStock: filters.inStock,
      hasOffer: filters.hasOffer,
      sortBy: sortBy
    });
  }, [searchQuery, selectedCollection, filters, sortBy, allProducts]);

  // المنتجات الحالية للصفحة
  const currentProducts = useMemo(() => {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    return filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  }, [filteredProducts, currentPage, productsPerPage]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleOrderClick = useCallback((product) => {
    if (!product.inStock) return;
    
    const orderData = {
      productId: product.id,
      productName: product.name || '',
      productDescription: product.description || '',
      productPrice: product.price || '150EGP',
      productImage: correctImagePath(product.image || product.images?.[0] || getDefaultImage(product.collectionType)),
      collectionType: product.collectionType,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('lastSelectedProduct', JSON.stringify(orderData));
    window.location.href = '/order-form';
  }, []);

  const handleCollectionChange = useCallback((collectionId) => {
    setSelectedCollection(collectionId);
    setSelectedCategory('all');
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handlePageChange = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  }, []);

  const handleFilterChange = useCallback((filterName, value) => {
    if (filterName === 'collection') {
      setSelectedCollection(value);
      setSelectedCategory('all');
    }
    
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
    setCurrentPage(1);
  }, []);

  const clearFilters = useCallback(() => {
    setSelectedCategory('all');
    setSelectedCollection('all');
    setSearchQuery('');
    setFilters({
      inStock: false,
      hasOffer: false,
      maxPrice: null,
      minPrice: null
    });
    setCurrentPage(1);
  }, []);

  // استمع لتغييرات في localStorage للتحديث التلقائي
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'tar7a_products') {
        window.location.reload();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Mock loading state for demo
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [selectedCollection, searchQuery, filters, sortBy]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-peach-soft/10 to-white/80 dark:from-background-dark dark:via-gray-900/50 dark:to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-white/50 to-purple-50/50 dark:from-primary/10 dark:via-gray-900 dark:to-purple-900/10 py-20 px-4 md:px-8">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/10 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <div className="flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-2 h-2 rounded-full bg-primary animate-pulse" 
                       style={{ animationDelay: `${i * 150}ms` }}></div>
                ))}
              </div>
              <span className={`${language === 'ar' ? 'arabic-text' : ''} text-sm font-medium text-[#2d1a1e] dark:text-gray-300`}>
                {language === 'ar' ? `${allProducts.length} قطعة إسلامية مميزة` : `${allProducts.length} Premium Islamic Pieces`}
              </span>
            </div>
            
            <h1 className={`${language === 'ar' ? 'arabic-text' : ''} text-4xl md:text-5xl lg:text-6xl font-black text-[#2d1a1e] dark:text-white mb-6`}>
              <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                {language === 'ar' ? 'كنوز إسلامية' : 'Islamic Treasures'}
              </span>
            </h1>
            
            <p className={`${language === 'ar' ? 'arabic-text' : ''} text-lg text-[#2d1a1e]/70 dark:text-gray-400 max-w-2xl mx-auto mb-8`}>
              {language === 'ar' 
                ? 'اكتشف عالم الأناقة الإسلامية مع مجموعتنا المتميزة من الزخارف والنقوش الإسلامية الفاخرة'
                : 'Discover the world of Islamic elegance with our premium collection of luxurious ornaments and patterns'
              }
            </p>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto relative group">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder={language === 'ar' ? "🔍 ابحث في كنوزنا الإسلامية..." : "🔍 Search our Islamic treasures..."}
                className="w-full px-6 py-4 rounded-2xl border-2 border-gray-300 dark:border-gray-700 dark:bg-gray-800/80 dark:text-white focus:border-primary focus:ring-4 focus:ring-primary/20 outline-none shadow-xl backdrop-blur-sm transition-all duration-300 text-lg"
                aria-label={language === 'ar' ? "بحث في المنتجات" : "Search products"}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-xl bg-gradient-to-r from-primary/5 to-purple-500/5">
              <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                {allProducts.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {language === 'ar' ? 'منتج متاح' : 'Available Products'}
              </div>
            </div>
            <div className="text-center p-4 rounded-xl bg-gradient-to-r from-green-500/5 to-emerald-600/5">
              <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                {allProducts.filter(p => p.inStock).length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {language === 'ar' ? 'متوفر بالمخزون' : 'In Stock'}
              </div>
            </div>
            <div className="text-center p-4 rounded-xl bg-gradient-to-r from-yellow-500/5 to-amber-600/5">
              <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-yellow-500 to-amber-600 bg-clip-text text-transparent">
                {collections.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {language === 'ar' ? 'مجموعة فاخرة' : 'Luxury Collections'}
              </div>
            </div>
            <div className="text-center p-4 rounded-xl bg-gradient-to-r from-pink-500/5 to-rose-600/5">
              <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-500 to-rose-600 bg-clip-text text-transparent">
                {allProducts.filter(p => p.hasOffer).length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {language === 'ar' ? 'عروض خاصة' : 'Special Offers'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="sticky top-24">
              <FilterSidebar
                language={language}
                collectionsList={collectionsList}
                selectedCollection={selectedCollection}
                filters={filters}
                stats={stats}
                onFilterChange={handleFilterChange}
                onClearFilters={clearFilters}
              />
            </div>
          </div>

          {/* Products Section */}
          <div className="lg:w-3/4">
            {/* Controls */}
            <div className="mb-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#2d1a1e] dark:text-white mb-2">
                    {selectedCollection === 'all'
                      ? (language === 'ar' ? 'جميع المنتجات' : 'All Products')
                      : collectionsList.find(c => c.id === selectedCollection)?.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {filteredProducts.length} {language === 'ar' ? 'منتج متميز' : 'premium products'} {searchQuery && `• "${searchQuery}"`}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  {/* View Mode */}
                  <div className="flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-lg transition-all duration-300 ${viewMode === 'grid' ? 'bg-white dark:bg-gray-700 shadow-sm' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                      title={language === 'ar' ? 'عرض شبكي' : 'Grid View'}
                    >
                      <span className="material-symbols-outlined text-lg">grid_view</span>
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-lg transition-all duration-300 ${viewMode === 'list' ? 'bg-white dark:bg-gray-700 shadow-sm' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                      title={language === 'ar' ? 'عرض قائمة' : 'List View'}
                    >
                      <span className="material-symbols-outlined text-lg">view_list</span>
                    </button>
                  </div>

                  {/* Sort Dropdown */}
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none px-4 py-2.5 pr-10 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 text-sm font-medium"
                    >
                      {sortOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {language === 'ar' ? option.label_ar : option.label_en}
                        </option>
                      ))}
                    </select>
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                      <span className="material-symbols-outlined text-sm">expand_more</span>
                    </span>
                  </div>
                </div>
              </div>

              {filteredProducts.length > 0 && (
                <div className="flex items-center gap-4">
                  <div className="w-32 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-purple-600 transition-all duration-300"
                      style={{ width: `${(currentPage / totalPages) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {currentPage} {language === 'ar' ? 'من' : 'of'} {totalPages}
                  </span>
                </div>
              )}
            </div>

            {/* Products Display */}
            {isLoading ? (
              <SkeletonLoader count={productsPerPage} viewMode={viewMode} />
            ) : currentProducts.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-primary/10 to-purple-600/10 rounded-2xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-4xl text-primary">search_off</span>
                </div>
                <h3 className="text-2xl font-bold text-[#2d1a1e] dark:text-white mb-3">
                  {language === 'ar' ? 'لم يتم العثور على منتجات' : 'No Products Found'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                  {language === 'ar' 
                    ? 'حاول البحث بكلمات مختلفة أو استكشف مجموعاتنا الأخرى'
                    : 'Try different search terms or explore our other collections'
                  }
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 bg-gradient-to-r from-primary to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
                >
                  {language === 'ar' ? 'عرض كل المنتجات' : 'View All Products'}
                </button>
              </div>
            ) : (
              <>
                <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}`}>
                  {currentProducts.map(product => (
                    viewMode === 'grid' ? (
                      <ProductCardGrid 
                        key={product.id} 
                        product={product} 
                        language={language}
                        onOrderClick={handleOrderClick}
                        hoveredProduct={hoveredProduct}
                        setHoveredProduct={setHoveredProduct}
                      />
                    ) : (
                      <ProductCardList 
                        key={product.id} 
                        product={product} 
                        language={language}
                        onOrderClick={handleOrderClick}
                      />
                    )
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {language === 'ar' 
                          ? `عرض ${Math.min((currentPage - 1) * productsPerPage + 1, filteredProducts.length)}-${Math.min(currentPage * productsPerPage, filteredProducts.length)} من ${filteredProducts.length} منتج`
                          : `Showing ${Math.min((currentPage - 1) * productsPerPage + 1, filteredProducts.length)}-${Math.min(currentPage * productsPerPage, filteredProducts.length)} of ${filteredProducts.length} products`
                        }
                      </div>

                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                        language={language}
                      />
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Featured Collections Banner */}
      <div className="bg-gradient-to-r from-primary/5 via-white/50 to-purple-50/50 dark:from-primary/10 dark:via-gray-900 dark:to-purple-900/10 py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#2d1a1e] dark:text-white mb-4">
              {language === 'ar' ? 'المجموعات المميزة' : 'Featured Collections'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {language === 'ar' 
                ? 'اكتشف مجموعاتنا المميزة من الزخارف والنقوش الإسلامية الفريدة'
                : 'Explore our featured collections of unique Islamic ornaments and patterns'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {collectionsList.slice(1, 4).map(collection => (
              <div 
                key={collection.id}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
                onClick={() => handleCollectionChange(collection.id)}
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary/10 to-purple-600/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary">collections_bookmark</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-[#2d1a1e] dark:text-white">
                        {language === 'ar' ? collection.name : collection.nameEn}
                      </h3>
                      <p className="text-sm text-primary">{collection.count} {language === 'ar' ? 'منتج' : 'products'}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-4">
                    {collection.description || (language === 'ar' 
                      ? 'مجموعة مميزة من الزخارف الإسلامية الفريدة'
                      : 'Premium collection of unique Islamic ornaments'
                    )}
                  </p>
                  
                  <button className="text-primary hover:text-purple-600 text-sm font-medium flex items-center gap-1">
                    <span>{language === 'ar' ? 'استعرض المجموعة' : 'Browse Collection'}</span>
                    <span className="material-symbols-outlined text-sm transform group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </button>
                </div>
                
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function for image optimization
export const optimizeImageUrl = (url) => {
  if (!url) return '';
  
  let optimizedUrl = correctImagePath(url);
  
  // Add optimization parameters for external images
  if (optimizedUrl.startsWith('http')) {
    try {
      const urlObj = new URL(optimizedUrl);
      // You can add image optimization parameters here
      // For example, for Cloudinary, Imgix, etc.
      return optimizedUrl;
    } catch {
      return optimizedUrl;
    }
  }
  
  return optimizedUrl;
};

// Export search function for external use
export const searchProducts = (query, filters = {}) => {
  return searchAllProducts(query, filters);
};

export default AllProducts;