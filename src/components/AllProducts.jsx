import React, { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { products } from '../data/products';
import { t } from '../locales/translations';

const AllProducts = () => {
  const location = useLocation();
  const { language } = useLanguage();
  
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  
  const productsPerPage = viewMode === 'grid' ? 12 : 6;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

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

  const categories = useMemo(() => [
    { id: 'all', name_ar: 'جميع المنتجات', name_en: 'All Products', count: products.length, icon: 'grid_view' },
    { id: 'sada', name_ar: 'سادة', name_en: 'Plain', count: products.filter(p => p.printed === false).length, icon: 'contrast' },
    { id: 'print', name_ar: 'مطبوع', name_en: 'Printed', count: products.filter(p => p.printed === true).length, icon: 'format_paint' },
    { id: 'offer', name_ar: 'العروض', name_en: 'Offers', count: products.filter(p => p.hasOffer === true).length, icon: 'local_offer' },
  ], []);

  const sortOptions = [
    { value: 'newest', label_ar: 'الأحدث أولاً', label_en: 'Newest First', icon: 'new_releases' },
    { value: 'rating', label_ar: 'الأعلى تقييماً', label_en: 'Highest Rated', icon: 'star' },
    { value: 'name', label_ar: 'بالاسم', label_en: 'By Name', icon: 'sort_by_alpha' },
    { value: 'price-low', label_ar: 'السعر: منخفض', label_en: 'Price: Low', icon: 'arrow_upward' },
    { value: 'price-high', label_ar: 'السعر: مرتفع', label_en: 'Price: High', icon: 'arrow_downward' }
  ];

  const correctImagePath = (imagePath) => {
    if (!imagePath) return '/default.jpeg';
    let correctedPath = imagePath;
    if (correctedPath.startsWith('/img/')) correctedPath = correctedPath.substring(5);
    if (!correctedPath.startsWith('/')) correctedPath = '/' + correctedPath;
    return correctedPath;
  };

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      let categoryMatch = false;
      switch(selectedCategory) {
        case 'all': categoryMatch = true; break;
        case 'sada': categoryMatch = product.printed === false; break;
        case 'print': categoryMatch = product.printed === true; break;
        case 'offer': categoryMatch = product.hasOffer === true; break;
        default: categoryMatch = true;
      }
      
      if (!searchQuery.trim()) return categoryMatch;
      
      const searchMatch = 
        product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.fullDescription?.toLowerCase().includes(searchQuery.toLowerCase());
      
      return categoryMatch && searchMatch;
    });
  }, [selectedCategory, searchQuery]);

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
        case 'rating': return (b.rating || 0) - (a.rating || 0);
        case 'name': return (a.name || '').localeCompare(b.name || '');
        default: return (b.id || 0) - (a.id || 0);
      }
    });
  }, [filteredProducts, sortBy]);

  const currentProducts = useMemo(() => {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    return sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  }, [sortedProducts, currentPage, productsPerPage, viewMode]);

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  const handleOrderClick = (product) => {
    const orderData = {
      productName: product.name || '',
      productDescription: product.description || '',
      productPrice: product.price || '100EGP',
      productImage: correctImagePath(product.image || product.images?.[0]),
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('lastSelectedProduct', JSON.stringify(orderData));
    window.location.href = '/order-form';
  };

  const SkeletonLoader = () => (
    <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1'}`}>
      {[...Array(productsPerPage)].map((_, index) => (
        <div key={index} className={`animate-pulse ${viewMode === 'grid' ? '' : 'flex gap-4'}`}>
          <div className={`bg-gray-200 dark:bg-gray-700 ${viewMode === 'grid' ? 'rounded-xl aspect-[3/4] mb-3' : 'w-32 h-32 rounded-lg'}`}></div>
          <div className="space-y-2 flex-1">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );

  const ProductCardGrid = ({ product }) => (
    <div 
      className="group relative"
      onMouseEnter={() => setHoveredProduct(product.id)}
      onMouseLeave={() => setHoveredProduct(null)}
    >
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group-hover:-translate-y-1">
        <Link to={`/product/${product.id}`}>
          <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
            <img 
              src={correctImagePath(product.image || product.images?.[0])} 
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              onError={(e) => e.target.src = '/default.jpeg'}
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.hasOffer && (
                <div className="px-3 py-1 rounded-full bg-gradient-to-r from-primary to-purple-600 text-white text-xs font-bold uppercase tracking-wider shadow-lg">
                  {language === 'ar' ? 'عرض خاص' : 'Special Offer'}
                </div>
              )}
              <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                product.printed 
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white' 
                  : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
              }`}>
                {language === 'ar' ? (product.printed ? 'مطبوع' : 'سادة') : (product.printed ? 'Printed' : 'Plain')}
              </div>
            </div>
            
            <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 shadow-lg">
              <span className="material-symbols-outlined text-yellow-500 text-sm">star</span>
              <span className="text-sm font-bold">{product.rating || '4.5'}</span>
            </div>
          </div>
        </Link>
        
        <div className="p-4">
          <Link to={`/product/${product.id}`}>
            <h3 className="font-bold text-lg mb-2 dark:text-white group-hover:text-primary transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between mb-3">
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              {product.price}
            </span>
            <div className="flex gap-1">
              {(product.colors || []).slice(0, 4).map((color, index) => (
                <div 
                  key={index}
                  className="w-4 h-4 rounded-full border border-white shadow-sm"
                  style={{ backgroundColor: color.value || '#ccc' }}
                />
              ))}
            </div>
          </div>
          
          <button 
            onClick={() => handleOrderClick(product)}
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-gray-400 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">shopping_cart</span>
            {language === 'ar' ? 'أطلب الآن' : 'Order Now'}
          </button>
        </div>
        
        {hoveredProduct === product.id && (
          <div className="absolute inset-0 border-2 border-primary/20 rounded-2xl pointer-events-none"></div>
        )}
      </div>
    </div>
  );

  const ProductCardList = ({ product }) => (
    <div 
      className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden"
      onMouseEnter={() => setHoveredProduct(product.id)}
      onMouseLeave={() => setHoveredProduct(null)}
    >
      <div className="flex">
        <Link to={`/product/${product.id}`} className="flex-shrink-0 w-48 md:w-56">
          <div className="relative h-48 md:h-56 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
            <img 
              src={correctImagePath(product.image || product.images?.[0])} 
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              onError={(e) => e.target.src = '/default.jpeg'}
            />
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.hasOffer && (
                <div className="px-3 py-1 rounded-full bg-gradient-to-r from-primary to-purple-600 text-white text-xs font-bold uppercase tracking-wider">
                  {language === 'ar' ? 'عرض' : 'Offer'}
                </div>
              )}
            </div>
          </div>
        </Link>
        
        <div className="flex-1 p-6">
          <div className="flex flex-col h-full">
            <div className="flex-1">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <Link to={`/product/${product.id}`}>
                    <h3 className="text-xl font-bold mb-2 dark:text-white group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {product.description}
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                    {product.price}
                  </span>
                  <div className="flex items-center gap-1 mt-2">
                    <span className="material-symbols-outlined text-yellow-500">star</span>
                    <span className="text-sm font-bold">{product.rating || '4.5'}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <span className={`material-symbols-outlined text-sm ${
                    product.printed ? 'text-pink-500' : 'text-blue-500'
                  }`}>
                    {product.printed ? 'format_paint' : 'contrast'}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {language === 'ar' ? (product.printed ? 'مطبوع' : 'سادة') : (product.printed ? 'Printed' : 'Plain')}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-gray-500">palette</span>
                  <div className="flex gap-1">
                    {(product.colors || []).slice(0, 5).map((color, index) => (
                      <div 
                        key={index}
                        className="w-4 h-4 rounded-full border border-white shadow-sm"
                        style={{ backgroundColor: color.value || '#ccc' }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                {product.fullDescription?.substring(0, 150)}...
              </p>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <button 
                onClick={() => handleOrderClick(product)}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">shopping_cart</span>
                {language === 'ar' ? 'أطلب الآن' : 'Order Now'}
              </button>
              
              <Link 
                to={`/product/${product.id}`}
                className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">visibility</span>
                {language === 'ar' ? 'عرض التفاصيل' : 'View Details'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const Pagination = () => {
    if (totalPages <= 1) return null;

    const pageNumbers = [];
    for (let i = 1; i <= Math.min(totalPages, 7); i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-gray-600 dark:text-gray-400 text-sm">
            {language === 'ar' ? 'عرض' : 'Showing'} {Math.min((currentPage - 1) * productsPerPage + 1, sortedProducts.length)}-{Math.min(currentPage * productsPerPage, sortedProducts.length)} {language === 'ar' ? 'من' : 'of'} {sortedProducts.length} {language === 'ar' ? 'منتج' : 'products'}
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 transition-all duration-300"
            >
              <span className="material-symbols-outlined text-lg">
                {language === 'ar' ? 'chevron_right' : 'chevron_left'}
              </span>
            </button>
            
            {pageNumbers.map(page => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-10 h-10 rounded-lg text-sm font-medium transition-all duration-300 ${
                  currentPage === page
                    ? 'bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {page}
              </button>
            ))}
            
            {totalPages > 7 && (
              <span className="px-2 text-gray-500">...</span>
            )}
            
            <button
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 transition-all duration-300"
            >
              <span className="material-symbols-outlined text-lg">
                {language === 'ar' ? 'chevron_left' : 'chevron_right'}
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-peach-soft/10 to-white/80 dark:from-background-dark dark:via-gray-900/50 dark:to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-white/50 to-purple-50/50 dark:from-primary/10 dark:via-gray-900 dark:to-purple-900/10 py-20 px-4 md:px-8">
        {/* Animated Background */}
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
                {language === 'ar' ? 'مجموعتنا الفاخرة' : 'Our Luxury Collection'}
              </span>
            </div>
            
            <h1 className={`${language === 'ar' ? 'arabic-text' : ''} text-4xl md:text-5xl lg:text-6xl font-black text-[#2d1a1e] dark:text-white mb-6`}>
              <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                {language === 'ar' ? 'كنوز الشيفون' : 'Chiffon Treasures'}
              </span>
            </h1>
            
            <p className={`${language === 'ar' ? 'arabic-text' : ''} text-lg text-[#2d1a1e]/70 dark:text-gray-400 max-w-2xl mx-auto mb-8`}>
              {language === 'ar' 
                ? 'اكتشف عالم الأناقة الفاخر مع مجموعتنا المتميزة من حجابات الشيفون السادة والمطبوعة'
                : 'Discover the world of luxurious elegance with our premium collection of plain and printed chiffon hijabs'
              }
            </p>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto relative group">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'ar' ? "🔍 ابحث في كنوزنا..." : "🔍 Search our treasures..."}
                className="w-full px-6 py-4 rounded-2xl border-2 border-gray-300 dark:border-gray-700 dark:bg-gray-800/80 dark:text-white focus:border-primary focus:ring-4 focus:ring-primary/20 outline-none shadow-xl backdrop-blur-sm transition-all duration-300 text-lg"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls Section */}
      <div className="sticky top-0 z-30 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">{category.icon}</span>
                  <span className={`${language === 'ar' ? 'arabic-text' : ''}`}>
                    {language === 'ar' ? category.name_ar : category.name_en}
                  </span>
                  <span className={`text-xs opacity-70 ${language === 'ar' ? 'mr-1' : 'ml-1'}`}>
                    ({category.count})
                  </span>
                </button>
              ))}
            </div>

            {/* View Controls */}
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
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Results Info */}
        <div className={`flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4`}>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#2d1a1e] dark:text-white mb-2">
              {selectedCategory === 'all' 
                ? (language === 'ar' ? 'جميع الكنوز' : 'All Treasures')
                : (language === 'ar' 
                    ? categories.find(c => c.id === selectedCategory)?.name_ar 
                    : categories.find(c => c.id === selectedCategory)?.name_en)}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {sortedProducts.length} {language === 'ar' ? 'قطعة متميزة' : 'premium pieces'} {searchQuery && `• "${searchQuery}"`}
            </p>
          </div>

          {sortedProducts.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {currentPage} {language === 'ar' ? 'من' : 'of'} {totalPages}
              </span>
              <div className="w-32 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-purple-600"
                  style={{ width: `${(currentPage / totalPages) * 100}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Products Display */}
        {isLoading ? (
          <SkeletonLoader />
        ) : currentProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-primary/10 to-purple-600/10 rounded-2xl flex items-center justify-center">
              <span className="material-symbols-outlined text-4xl text-primary">search_off</span>
            </div>
            <h3 className="text-2xl font-bold text-[#2d1a1e] dark:text-white mb-3">
              {language === 'ar' ? 'لم يتم العثور على كنوز' : 'No Treasures Found'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
              {language === 'ar' 
                ? 'حاول البحث بكلمات مختلفة أو استكشف مجموعاتنا الأخرى'
                : 'Try different search terms or explore our other collections'
              }
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="px-6 py-3 bg-gradient-to-r from-primary to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
            >
              {language === 'ar' ? 'عرض كل الكنوز' : 'View All Treasures'}
            </button>
          </div>
        ) : (
          <>
            <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-6'}`}>
              {currentProducts.map(product => (
                viewMode === 'grid' 
                  ? <ProductCardGrid key={product.id} product={product} />
                  : <ProductCardList key={product.id} product={product} />
              ))}
            </div>

            {totalPages > 1 && <Pagination />}
          </>
        )}
      </div>
    </div>
  );
};

export default AllProducts;