import React, { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { products } from '../data/products';
import { t } from '../locales/translations';

const AllProducts = () => {
  const location = useLocation();
  const { language } = useLanguage();
  
  // States
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const productsPerPage = 12; // زيادة عدد المنتجات في الصفحة لأن الكارد أصغر

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Extract category from URL query parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    if (categoryParam === 'sada' || categoryParam === 'print' || categoryParam === 'offer') {
      setSelectedCategory(categoryParam);
    } else {
      setSelectedCategory('all');
    }
    setCurrentPage(1);
  }, [location.search]);

  // Categories with translations
  const categories = useMemo(() => [
    { 
      id: 'all', 
      name_ar: t('header.allProducts', 'ar'), 
      name_en: t('header.allProducts', 'en'), 
      count: products.length 
    },
    { 
      id: 'sada', 
      name_ar: 'شيفون سادة', 
      name_en: 'Plain Chiffon', 
      count: products.filter(p => p.printed === false).length 
    },
    { 
      id: 'print', 
      name_ar: 'شيفون مطبوع', 
      name_en: 'Printed Chiffon', 
      count: products.filter(p => p.printed === true).length 
    },
    { 
      id: 'offer', 
      name_ar: t('header.sale', 'ar'), 
      name_en: t('header.sale', 'en'), 
      count: products.filter(p => p.hasOffer === true).length 
    },
  ], [language]);

  // Sort options with translations
  const sortOptions = [
    { value: 'newest', label_ar: 'الأحدث أولاً', label_en: 'Newest First' },
    { value: 'rating', label_ar: 'الأعلى تقييماً', label_en: 'Highest Rated' },
    { value: 'name', label_ar: 'بالاسم (أ-ي)', label_en: 'By Name (A-Z)' },
    { value: 'price-low', label_ar: 'السعر: منخفض إلى مرتفع', label_en: 'Price: Low to High' },
    { value: 'price-high', label_ar: 'السعر: مرتفع إلى منخفض', label_en: 'Price: High to Low' }
  ];

  // Helper functions
  const getProductImage = (product) => {
    if (product.image && product.image.startsWith('/')) {
      return product.image;
    }
    if (product.images && product.images.length > 0) {
      return product.images[0];
    }
    return '/default.jpeg';
  };

  const correctImagePath = (imagePath) => {
    if (!imagePath) return '/default.jpeg';
    
    let correctedPath = imagePath;
    if (correctedPath.startsWith('/img/')) {
      correctedPath = correctedPath.substring(5);
    }
    
    if (!correctedPath.startsWith('/')) {
      correctedPath = '/' + correctedPath;
    }
    
    return correctedPath;
  };

  const getProductBgClass = (product) => {
    return product.bgColor || 'bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900';
  };

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Check category
      let categoryMatch = false;
      switch(selectedCategory) {
        case 'all':
          categoryMatch = true;
          break;
        case 'sada':
          categoryMatch = product.printed === false;
          break;
        case 'print':
          categoryMatch = product.printed === true;
          break;
        case 'offer':
          categoryMatch = product.hasOffer === true;
          break;
        default:
          categoryMatch = true;
      }
      
      // If no search query, return category match only
      if (!searchQuery.trim()) return categoryMatch;
      
      // Search in product details
      const productName = product.name || '';
      const productDescription = product.description || '';
      const productFullDescription = product.fullDescription || '';
      const productMaterial = product.material || '';
      
      const searchMatch = 
        productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        productDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        productFullDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        productMaterial.toLowerCase().includes(searchQuery.toLowerCase());
      
      return categoryMatch && searchMatch;
    });
  }, [selectedCategory, searchQuery]);

  // Sort products
  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          const priceA = parseFloat(a.price?.replace(/[^0-9]/g, '') || 0);
          const priceB = parseFloat(b.price?.replace(/[^0-9]/g, '') || 0);
          return priceA - priceB;
        case 'price-high':
          const priceAHigh = parseFloat(a.price?.replace(/[^0-9]/g, '') || 0);
          const priceBHigh = parseFloat(b.price?.replace(/[^0-9]/g, '') || 0);
          return priceBHigh - priceAHigh;
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'newest':
          return (b.id || 0) - (a.id || 0);
        case 'name':
          return (a.name || '').localeCompare(b.name || '');
        default:
          return (b.id || 0) - (a.id || 0);
      }
    });
  }, [filteredProducts, sortBy]);

  // Current products for pagination
  const currentProducts = useMemo(() => {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    return sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  }, [sortedProducts, currentPage, productsPerPage]);

  // Calculate total pages
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  // Event handlers
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  const handleSortChange = (sortValue) => {
    setSortBy(sortValue);
    setCurrentPage(1);
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSortBy('newest');
    setCurrentPage(1);
  };

  const handleOrderClick = (product) => {
    const orderData = {
      productName: product.name || '',
      productDescription: product.description || '',
      productPrice: product.price || '100EGP',
      productImage: correctImagePath(getProductImage(product)),
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('lastSelectedProduct', JSON.stringify(orderData));
    window.location.href = '/order-form';
  };

  // Skeleton loader
  const SkeletonLoader = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {[...Array(10)].map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="bg-gray-200 dark:bg-gray-700 rounded-xl aspect-[3/4] mb-3"></div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );

  // SVG pattern
  const gridPattern = `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='smallGrid' width='20' height='20' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 20 0 L 0 0 0 20' fill='none' stroke='rgba(255,107,107,0.1)' stroke-width='0.5'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23smallGrid)'/%3E%3C/svg%3E")`;

  // Product Card Component - UPDATED SMALLER SIZE
  const ProductCard = ({ product }) => {
    const isHovered = hoveredProduct === product.id;
    const productImage = correctImagePath(getProductImage(product));
    
    return (
      <div 
        className="group relative"
        onMouseEnter={() => setHoveredProduct(product.id)}
        onMouseLeave={() => setHoveredProduct(null)}
        dir={language === 'ar' ? 'rtl' : 'ltr'}
      >
        <div className={`relative rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${getProductBgClass(product)}`}>
          <Link to={`/product/${product.id}`}>
            <div className="relative aspect-[3/4] overflow-hidden">
              <img 
                src={productImage} 
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                onError={(e) => {
                  e.target.src = '/default.jpeg';
                }}
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              
              <div className={`absolute top-3 ${language === 'ar' ? 'right-3' : 'left-3'} flex flex-col gap-1.5`}>
                {product.hasOffer && (
                  <div className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-primary to-purple-600 text-white shadow-md`}>
                    {language === 'ar' ? 'عرض' : 'Offer'}
                  </div>
                )}
                
                <div className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  product.printed 
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white' 
                    : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                }`}>
                  {language === 'ar' ? (product.printed ? 'مطبوع' : 'سادة') : (product.printed ? 'Printed' : 'Plain')}
                </div>
              </div>

              {/* Quick Action on Hover */}
              <div className={`absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300`}>
                <div className="bg-black/50 backdrop-blur-sm rounded-full p-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="material-symbols-outlined text-white text-lg">
                    visibility
                  </span>
                </div>
              </div>
            </div>
          </Link>
          
          {/* Product Info */}
          <div className="p-3 bg-white dark:bg-gray-800">
            <div className="mb-2">
              <Link to={`/product/${product.id}`}>
                <h3 className="font-semibold text-sm mb-1 dark:text-white group-hover:text-primary transition-colors line-clamp-1">
                  {product.name}
                </h3>
              </Link>
              <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1 mb-2">
                {product.description}
              </p>
            </div>
            
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-base bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                {product.price}
              </span>
              
              <div className="flex items-center gap-0.5">
                <span className="material-symbols-outlined text-primary text-sm">
                  star
                </span>
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  {product.rating || '4.5'}
                </span>
              </div>
            </div>
            
            {/* Colors Preview */}
            <div className="flex items-center gap-1 mb-3">
              {(product.colors || []).slice(0, 4).map((color, index) => (
                <div 
                  key={index}
                  className="w-4 h-4 rounded-full border border-white shadow-sm"
                  style={{ backgroundColor: color.value || '#ccc' }}
                  title={color.name || 'Color'}
                />
              ))}
              {(product.colors || []).length > 4 && (
                <span className="text-[10px] text-gray-500">
                  +{(product.colors || []).length - 4}
                </span>
              )}
            </div>
            
            {/* Order Button */}
            <button 
              onClick={() => handleOrderClick(product)}
              className="w-full py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-semibold rounded-lg hover:shadow-md transition-all duration-300 flex items-center justify-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">shopping_cart</span>
              {language === 'ar' ? 'أطلب الآن' : 'Order Now'}
            </button>
          </div>
        </div>
        
        {/* Glow effect on hover */}
        {isHovered && (
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-purple-600/20 rounded-xl blur opacity-50 -z-10"></div>
        )}
      </div>
    );
  };

  // Pagination Component
  const Pagination = () => {
    const getPageNumbers = () => {
      const pageNumbers = [];
      const maxPagesToShow = 5;
      
      if (totalPages <= maxPagesToShow) {
        for (let i = 1; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        let endPage = startPage + maxPagesToShow - 1;
        
        if (endPage > totalPages) {
          endPage = totalPages;
          startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }
        
        for (let i = startPage; i <= endPage; i++) {
          pageNumbers.push(i);
        }
      }
      
      return pageNumbers;
    };

    if (totalPages <= 1) return null;

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

    return (
      <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {language === 'ar' ? 'عرض' : 'Showing'} {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, sortedProducts.length)} {language === 'ar' ? 'من' : 'of'} {sortedProducts.length}
          </div>
          
          <div className="flex items-center gap-1">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              <span className="material-symbols-outlined text-sm">
                {language === 'ar' ? 'chevron_right' : 'chevron_left'}
              </span>
            </button>
            
            {getPageNumbers().map(page => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-8 h-8 rounded-lg text-sm transition-all duration-300 ${
                  currentPage === page
                    ? 'bg-gradient-to-r from-primary to-purple-600 text-white shadow-md'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              <span className="material-symbols-outlined text-sm">
                {language === 'ar' ? 'chevron_left' : 'chevron_right'}
              </span>
            </button>
          </div>
          
          <div className={`flex items-center gap-2 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
            <select
              value={currentPage}
              onChange={(e) => handlePageChange(parseInt(e.target.value))}
              className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 text-sm"
              dir={language === 'ar' ? 'rtl' : 'ltr'}
            >
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <option key={page} value={page}>
                  {language === 'ar' ? 'صفحة' : 'Page'} {page}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-peach-soft/20 to-white dark:from-background-dark dark:via-background-dark dark:to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary/5 via-peach-soft/30 to-lavender-soft/30 dark:from-primary/10 dark:via-background-dark dark:to-gray-900 py-16 px-6">
        <div className="absolute inset-0" style={{ backgroundImage: gridPattern, opacity: 0.3 }}></div>
        
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-10" dir={language === 'ar' ? 'rtl' : 'ltr'}>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 dark:text-white">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                {language === 'ar' ? 'مجموعتنا الكاملة' : 'Our Complete Collection'}
              </span>
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              {language === 'ar' 
                ? 'اكتشف عالم الأناقة والراحة مع مجموعتنا المتميزة من حجابات الشيفون'
                : 'Discover a world of elegance and comfort with our premium collection of chiffon hijabs'
              }
            </p>
          </div>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-10">
            <div className="relative group">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder={language === 'ar' 
                  ? "🔍 ابحث عن حجاب أحلامك..."
                  : "🔍 Search for your dream hijab..."
                }
                className={`w-full px-5 py-4 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none shadow-md backdrop-blur-sm transition-all duration-300`}
                dir={language === 'ar' ? 'rtl' : 'ltr'}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Filters Bar */}
      <div className="sticky top-0 z-20 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className={`flex flex-col md:flex-row justify-between items-center gap-3`}>
            {/* Categories Tabs - Smaller */}
            <div className="flex flex-wrap gap-1.5">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-primary to-purple-600 text-white shadow-md'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                  dir={language === 'ar' ? 'rtl' : 'ltr'}
                >
                  {language === 'ar' ? category.name_ar : category.name_en}
                  <span className={`${language === 'ar' ? 'mr-1' : 'ml-1'} text-xs opacity-70`}>
                    ({category.count})
                  </span>
                </button>
              ))}
            </div>
            
            {/* Sort Dropdown - Smaller */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="appearance-none px-4 py-2 pr-8 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all duration-300 text-sm"
                dir={language === 'ar' ? 'rtl' : 'ltr'}
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {language === 'ar' ? option.label_ar : option.label_en}
                  </option>
                ))}
              </select>
              <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                <span className="material-symbols-outlined text-sm">expand_more</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Active Filters & Results */}
        <div className={`flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-3`}>
          <div className="space-y-1" dir={language === 'ar' ? 'rtl' : 'ltr'}>
            <h2 className="text-xl md:text-2xl font-bold dark:text-white">
              {selectedCategory === 'all' 
                ? (language === 'ar' ? 'جميع التصميمات' : 'All Designs')
                : language === 'ar' 
                  ? categories.find(c => c.id === selectedCategory)?.name_ar 
                  : categories.find(c => c.id === selectedCategory)?.name_en}
            </h2>
            
            <div className="flex flex-wrap gap-2 items-center">
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {sortedProducts.length} {language === 'ar' ? 'تصميم متاح' : 'designs available'}
              </p>
              
              {(selectedCategory !== 'all' || searchQuery) && (
                <>
                  <span className="text-gray-400">•</span>
                  <button
                    onClick={handleResetFilters}
                    className="flex items-center gap-1 text-xs text-primary hover:text-primary-dark transition-colors"
                  >
                    <span className="material-symbols-outlined text-xs">close</span>
                    {language === 'ar' ? 'مسح الفلاتر' : 'Clear Filters'}
                  </button>
                </>
              )}
              
              {searchQuery && (
                <>
                  <span className="text-gray-400">•</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                    "{searchQuery}"
                  </span>
                </>
              )}
            </div>
          </div>
          
          {/* Pagination Info */}
          {sortedProducts.length > 0 && (
            <div className={`flex items-center gap-3 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
              <div className="text-gray-600 dark:text-gray-400 text-sm">
                {language === 'ar' ? 'صفحة' : 'Page'} {currentPage} {language === 'ar' ? 'من' : 'of'} {totalPages}
              </div>
            </div>
          )}
        </div>

        {/* Products Grid - UPDATED: More cards per row */}
        {isLoading ? (
          <SkeletonLoader />
        ) : currentProducts.length === 0 ? (
          <div className="text-center py-16" dir={language === 'ar' ? 'rtl' : 'ltr'}>
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-primary/10 to-purple-600/10 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl text-primary">search_off</span>
            </div>
            <h3 className="text-xl font-bold mb-2 dark:text-white">
              {language === 'ar' ? 'لم نجد ما تبحث عنه' : "We couldn't find what you're looking for"}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto text-sm">
              {language === 'ar' 
                ? 'حاول البحث بكلمات مختلفة أو تصفح الفئات الأخرى'
                : 'Try searching with different words or browse other categories'
              }
            </p>
            <button
              onClick={handleResetFilters}
              className="px-5 py-2.5 bg-gradient-to-r from-primary to-purple-600 text-white rounded-lg font-medium hover:shadow-md transition-all duration-300 text-sm"
            >
              {language === 'ar' ? 'عرض جميع المنتجات' : 'View All Products'}
            </button>
          </div>
        ) : (
          <>
            {/* Updated grid with more columns for smaller cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {currentProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>

            <Pagination />
          </>
        )}
      </div>
    </div>
  );
};

export default AllProducts;