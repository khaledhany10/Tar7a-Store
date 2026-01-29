import React, { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { products } from '../data/products';

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
  
  const productsPerPage = 9;

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

  // Categories
  const categories = useMemo(() => [
    { id: 'all', name_ar: 'الكل', name_en: 'All', count: products.length },
    { id: 'sada', name_ar: 'شيفون سادة', name_en: 'Plain Chiffon', count: products.filter(p => p.printed === false).length },
    { id: 'print', name_ar: 'شيفون مطبوع', name_en: 'Printed Chiffon', count: products.filter(p => p.printed === true).length },
    { id: 'offer', name_ar: 'العروض', name_en: 'Offers', count: products.filter(p => p.hasOffer === true).length },
  ], []);

  // Sort options
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
    console.log('Filtering products...', {
      selectedCategory,
      searchQuery,
      totalProducts: products.length
    });
    
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
    console.log('Sorting products...', filteredProducts.length);
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
    const result = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    console.log('Current products:', result.length);
    return result;
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="bg-gray-200 dark:bg-gray-700 rounded-2xl aspect-[3/4] mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );

  // SVG pattern
  const gridPattern = `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='smallGrid' width='20' height='20' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 20 0 L 0 0 0 20' fill='none' stroke='rgba(255,107,107,0.1)' stroke-width='0.5'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23smallGrid)'/%3E%3C/svg%3E")`;

  // Product Card Component
  const ProductCard = ({ product }) => {
    const isHovered = hoveredProduct === product.id;
    const productImage = correctImagePath(getProductImage(product));
    
    return (
      <div 
        className="group relative"
        onMouseEnter={() => setHoveredProduct(product.id)}
        onMouseLeave={() => setHoveredProduct(null)}
      >
        <div className={`relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${getProductBgClass(product)}`}>
          <Link to={`/product/${product.id}`}>
            <div className="relative aspect-[3/4] overflow-hidden">
              <img 
                src={productImage} 
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                onError={(e) => {
                  e.target.src = '/default.jpeg';
                }}
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
              
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.hasOffer && (
                  <div className={`${language === 'ar' ? 'arabic-text' : ''} px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg`}>
                    {language === 'ar' ? 'عرض مميز' : 'Special Offer'}
                  </div>
                )}
                
                <div className={`${language === 'ar' ? 'arabic-text' : ''} px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                  product.printed 
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white' 
                    : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                }`}>
                  {language === 'ar' ? (product.printed ? 'مطبوع' : 'سادة') : (product.printed ? 'Printed' : 'Plain')}
                </div>
              </div>

              <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end justify-center p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                <div className="space-y-3 w-full">
                  <button className={`${language === 'ar' ? 'arabic-text' : ''} w-full py-3 bg-white text-primary rounded-xl font-bold hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-105 active:scale-95`}>
                    {language === 'ar' ? 'التفاصيل الكاملة' : 'View Full Details'}
                  </button>
                </div>
              </div>
            </div>
          </Link>
          
          <div className="p-5 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
            <div className={`flex justify-between items-start mb-3 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
              <div>
                <Link to={`/product/${product.id}`}>
                  <h3 className={`${language === 'ar' ? 'arabic-text' : ''} font-bold text-lg mb-1 dark:text-white group-hover:text-primary transition-colors line-clamp-1`}>
                    {product.name}
                  </h3>
                </Link>
                <p className={`${language === 'ar' ? 'arabic-text' : ''} text-gray-600 dark:text-gray-400 text-sm line-clamp-2`}>
                  {product.description}
                </p>
              </div>
              <div className={language === 'ar' ? 'text-left' : 'text-right'}>
                <span className={`${language === 'ar' ? 'arabic-text' : ''} text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent`}>
                  {product.price}
                </span>
              </div>
            </div>
            
            <div className={`flex items-center justify-between ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
              <div className="flex items-center gap-1">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-primary text-sm">
                      {i < Math.floor(product.rating || 0) ? 'star' : 'star_half'}
                    </span>
                  ))}
                </div>
                <span className={`${language === 'ar' ? 'arabic-text mr-1' : 'ml-1'} text-xs text-gray-600 dark:text-gray-400`}>
                  ({product.reviews || 0})
                </span>
              </div>
              
              <div className="flex -space-x-2">
                {(product.colors || []).slice(0, 3).map((color, index) => (
                  <div 
                    key={index}
                    className="w-6 h-6 rounded-full border-2 border-white shadow-lg transform hover:scale-125 transition-transform"
                    style={{ backgroundColor: color.value || '#ccc' }}
                    title={color.name || 'لون'}
                  />
                ))}
                {(product.colors || []).length > 3 && (
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center text-xs shadow-lg">
                    +{(product.colors || []).length - 3}
                  </div>
                )}
              </div>
            </div>
            
            <button 
              onClick={() => handleOrderClick(product)}
              className={`${language === 'ar' ? 'arabic-text' : ''} mt-4 w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2`}
            >
              <span className="material-symbols-outlined text-sm">shopping_cart</span>
              {language === 'ar' ? 'أطلب الآن' : 'Order Now'}
              {product.hasOffer && (
                <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                  {language === 'ar' ? 'خصم!' : 'Offer!'}
                </span>
              )}
            </button>
          </div>
        </div>
        
        {isHovered && (
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-purple-600/20 rounded-2xl blur-xl opacity-50 -z-10"></div>
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
      <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className={`${language === 'ar' ? 'arabic-text' : ''} text-sm text-gray-600 dark:text-gray-400`}>
            {language === 'ar' ? 'عرض' : 'Showing'} {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, sortedProducts.length)} {language === 'ar' ? 'من' : 'of'} {sortedProducts.length}
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <span className="material-symbols-outlined">
                {language === 'ar' ? 'chevron_right' : 'chevron_left'}
              </span>
            </button>
            
            {getPageNumbers().map(page => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-10 h-10 rounded-xl font-medium transition-all duration-300 hover:scale-105 active:scale-95 ${
                  currentPage === page
                    ? 'bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <span className="material-symbols-outlined">
                {language === 'ar' ? 'chevron_left' : 'chevron_right'}
              </span>
            </button>
          </div>
          
          <div className={`flex items-center gap-2 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
            <select
              value={currentPage}
              onChange={(e) => handlePageChange(parseInt(e.target.value))}
              className={`${language === 'ar' ? 'arabic-text' : ''} px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 hover:shadow-md`}
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
      <div className="relative overflow-hidden bg-gradient-to-r from-primary/5 via-peach-soft/30 to-lavender-soft/30 dark:from-primary/10 dark:via-background-dark dark:to-gray-900 py-20 px-6">
        <div className="absolute inset-0" style={{ backgroundImage: gridPattern, opacity: 0.3 }}></div>
        
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-12">
            <h1 className={`${language === 'ar' ? 'arabic-text' : ''} text-5xl md:text-6xl font-bold mb-6 dark:text-white`}>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                {language === 'ar' ? 'مجموعتنا الكاملة' : 'Our Complete Collection'}
              </span>
            </h1>
            <p className={`${language === 'ar' ? 'arabic-text' : ''} text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto`}>
              {language === 'ar' 
                ? 'اكتشف عالم الأناقة والراحة مع مجموعتنا المتميزة من حجابات الشيفون'
                : 'Discover a world of elegance and comfort with our premium collection of chiffon hijabs'
              }
            </p>
          </div>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative group">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder={language === 'ar' 
                  ? "🔍 ابحث عن حجاب أحلامك..."
                  : "🔍 Search for your dream hijab..."
                }
                className={`${language === 'ar' ? 'arabic-text' : ''} w-full px-6 py-5 rounded-2xl border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-4 focus:ring-primary/30 focus:border-primary outline-none shadow-lg shadow-primary/10 backdrop-blur-sm transition-all duration-300`}
                dir={language === 'ar' ? 'rtl' : 'ltr'}
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/10 to-purple-600/10 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Categories Bar */}
      <div className="sticky top-0 z-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className={`flex flex-col md:flex-row justify-between items-center gap-4 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
            {/* Categories Tabs */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`${language === 'ar' ? 'arabic-text' : ''} group relative px-5 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 active:scale-95 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg shadow-primary/30'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 shadow hover:shadow-md'
                  }`}
                >
                  <span className="relative z-10">
                    {language === 'ar' ? category.name_ar : category.name_en}
                    <span className={`${language === 'ar' ? 'mr-2' : 'ml-2'} text-xs opacity-70`}>
                      ({category.count})
                    </span>
                  </span>
                  
                  {selectedCategory === category.id && (
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-white rounded-full"></span>
                  )}
                  
                  <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </button>
              ))}
            </div>
            
            {/* Sort Dropdown */}
            <div className="relative group">
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className={`${language === 'ar' ? 'arabic-text' : ''} appearance-none px-5 py-3 pr-10 rounded-xl bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 hover:shadow-md cursor-pointer`}
                dir={language === 'ar' ? 'rtl' : 'ltr'}
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {language === 'ar' ? option.label_ar : option.label_en}
                  </option>
                ))}
              </select>
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                <span className="material-symbols-outlined">expand_more</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Active Filters & Results */}
        <div className={`flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
          <div className="space-y-2">
            <h2 className={`${language === 'ar' ? 'arabic-text' : ''} text-2xl md:text-3xl font-bold dark:text-white`}>
              {selectedCategory === 'all' 
                ? (language === 'ar' ? 'جميع التصميمات' : 'All Designs')
                : categories.find(c => c.id === selectedCategory)?.name_ar || 
                  categories.find(c => c.id === selectedCategory)?.name_en || ''}
            </h2>
            
            <div className="flex flex-wrap gap-2 items-center">
              <p className={`${language === 'ar' ? 'arabic-text' : ''} text-gray-600 dark:text-gray-400`}>
                {sortedProducts.length} {language === 'ar' ? 'تصميم متاح' : 'designs available'}
              </p>
              
              {(selectedCategory !== 'all' || searchQuery) && (
                <>
                  <span className="text-gray-400">•</span>
                  <button
                    onClick={handleResetFilters}
                    className={`${language === 'ar' ? 'arabic-text' : ''} flex items-center gap-2 text-sm text-primary hover:text-primary-dark transition-colors group`}
                  >
                    <span className="material-symbols-outlined text-sm group-hover:rotate-90 transition-transform">close</span>
                    {language === 'ar' ? 'مسح الفلاتر' : 'Clear Filters'}
                  </button>
                </>
              )}
              
              {searchQuery && (
                <>
                  <span className="text-gray-400">•</span>
                  <span className={`${language === 'ar' ? 'arabic-text' : ''} text-sm bg-primary/10 text-primary px-3 py-1 rounded-full`}>
                    "{searchQuery}"
                  </span>
                </>
              )}
            </div>
          </div>
          
          {/* Pagination Info */}
          {sortedProducts.length > 0 && (
            <div className={`flex items-center gap-4 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
              <div className={`${language === 'ar' ? 'arabic-text' : ''} text-gray-600 dark:text-gray-400`}>
                {language === 'ar' ? 'صفحة' : 'Page'} {currentPage} {language === 'ar' ? 'من' : 'of'} {totalPages}
              </div>
            </div>
          )}
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <SkeletonLoader />
        ) : currentProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-primary/10 to-purple-600/10 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-4xl text-primary">search_off</span>
            </div>
            <h3 className={`${language === 'ar' ? 'arabic-text' : ''} text-2xl font-bold mb-2 dark:text-white`}>
              {language === 'ar' ? 'لم نجد ما تبحث عنه' : "We couldn't find what you're looking for"}
            </h3>
            <p className={`${language === 'ar' ? 'arabic-text' : ''} text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto`}>
              {language === 'ar' 
                ? 'حاول البحث بكلمات مختلفة أو تصفح الفئات الأخرى'
                : 'Try searching with different words or browse other categories'
              }
            </p>
            <button
              onClick={handleResetFilters}
              className={`${language === 'ar' ? 'arabic-text' : ''} px-6 py-3 bg-gradient-to-r from-primary to-purple-600 text-white rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all duration-300`}
            >
              {language === 'ar' ? 'عرض جميع المنتجات' : 'View All Products'}
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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