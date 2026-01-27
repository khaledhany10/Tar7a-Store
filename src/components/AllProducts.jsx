import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { products, categories } from '../data/products';

const AllProducts = () => {
  const location = useLocation();
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState(language === 'ar' ? 'الكل' : 'All');
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  // Extract category from URL query parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
      setCurrentPage(1);
    }
  }, [location.search]);

  // Filter products based on selected category and search query
  const filteredProducts = products.filter(product => {
    // التحقق من التصنيف
    const categoryMatch = selectedCategory === (language === 'ar' ? 'الكل' : 'All') || 
                          selectedCategory === 'All' || 
                          product.category === selectedCategory ||
                          (selectedCategory === 'عرض' && product.hasOffer === true);
    
    // إذا لم يكن هناك بحث، نرجع المنتجات المطابقة للتصنيف فقط
    if (!searchQuery.trim()) return categoryMatch;
    
    // الحصول على اسم المنتج مع قيمة افتراضية
    const productName = (language === 'ar' ? product.name : product.name) || '';
    const productDescription = product.description || '';
    const productCategory = product.category || '';
    
    // التحقق من البحث
    const searchMatch = productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       productDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       productCategory.toLowerCase().includes(searchQuery.toLowerCase());
    
    return categoryMatch && searchMatch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        // تحويل السعر من "100EGP" إلى رقم
        const priceA = parseFloat(a.price.replace('EGP', '').trim()) || 0;
        const priceB = parseFloat(b.price.replace('EGP', '').trim()) || 0;
        return priceA - priceB;
      case 'price-high':
        const priceAHigh = parseFloat(a.price.replace('EGP', '').trim()) || 0;
        const priceBHigh = parseFloat(b.price.replace('EGP', '').trim()) || 0;
        return priceBHigh - priceAHigh;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.id - a.id;
      default:
        return 0;
    }
  });

  // Calculate pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generate page numbers for pagination
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

  // Reset filters
  const resetFilters = () => {
    setSelectedCategory(language === 'ar' ? 'الكل' : 'All');
    setSearchQuery('');
    setSortBy('featured');
    setCurrentPage(1);
  };

  // Translate category names
  const translateCategory = (category) => {
    const translations = {
      'شيفون': language === 'ar' ? 'شيفون' : 'Chiffon',
      'مودال': language === 'ar' ? 'مودال' : 'Modal',
      'حرير': language === 'ar' ? 'حرير' : 'Silk',
      'عرض': language === 'ar' ? 'عرض' : 'Offer',
      'الكل': language === 'ar' ? 'الكل' : 'All',
      'All': language === 'ar' ? 'الكل' : 'All'
    };
    return translations[category] || category;
  };

  // Translate sort options
  const translateSortOption = (value) => {
    const translations = {
      'featured': language === 'ar' ? 'المميزة' : 'Featured',
      'newest': language === 'ar' ? 'الأحدث' : 'Newest',
      'rating': language === 'ar' ? 'الأعلى تقييماً' : 'Highest Rated',
      'price-low': language === 'ar' ? 'السعر: منخفض إلى مرتفع' : 'Price: Low to High',
      'price-high': language === 'ar' ? 'السعر: مرتفع إلى منخفض' : 'Price: High to Low'
    };
    return translations[value] || value;
  };

  // Sort options
  const sortOptions = [
    { value: 'featured', label_ar: 'المميزة', label_en: 'Featured' },
    { value: 'newest', label_ar: 'الأحدث', label_en: 'Newest' },
    { value: 'rating', label_ar: 'الأعلى تقييماً', label_en: 'Highest Rated' },
    { value: 'price-low', label_ar: 'السعر: منخفض إلى مرتفع', label_en: 'Price: Low to High' },
    { value: 'price-high', label_ar: 'السعر: مرتفع إلى منخفض', label_en: 'Price: High to Low' }
  ];

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 to-peach-soft dark:from-primary/5 dark:to-background-dark py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className={`${language === 'ar' ? 'arabic-text' : ''} text-5xl font-bold mb-6 dark:text-white`}>
            {language === 'ar' ? 'تسوق جميع الحجابات' : 'Shop All Hijabs'}
          </h1>
          <p className={`${language === 'ar' ? 'arabic-text' : ''} text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto`}>
            {language === 'ar' 
              ? 'اكتشف مجموعتنا الكاملة من الحجابات المميزة بأنواع وألوان وتصاميم متنوعة.'
              : 'Discover our complete collection of premium hijabs in various fabrics, colors, and designs.'
            }
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder={language === 'ar' 
                  ? "ابحث عن الحجابات بالاسم، النسيج، أو اللون..."
                  : "Search for hijabs by name, fabric, or color..."
                }
                className={`${language === 'ar' ? 'arabic-text' : ''} w-full px-6 py-4 rounded-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none`}
                dir={language === 'ar' ? 'rtl' : 'ltr'}
              />
              <button className={`absolute ${language === 'ar' ? 'left-3' : 'right-3'} top-1/2 transform -translate-y-1/2 text-gray-500`}>
                <span className="material-symbols-outlined">search</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="sticky top-24 space-y-8">
              {/* Categories */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                <div className={`flex justify-between items-center mb-6 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                  <h3 className={`${language === 'ar' ? 'arabic-text' : ''} text-xl font-bold dark:text-white`}>
                    {language === 'ar' ? 'الفئات' : 'Categories'}
                  </h3>
                  {(selectedCategory !== (language === 'ar' ? 'الكل' : 'All') || searchQuery) && (
                    <button 
                      onClick={resetFilters}
                      className={`${language === 'ar' ? 'arabic-text' : ''} text-sm text-primary hover:text-primary-dark transition-colors`}
                    >
                      {language === 'ar' ? 'مسح الكل' : 'Clear All'}
                    </button>
                  )}
                </div>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setSelectedCategory(language === 'ar' ? 'الكل' : 'All');
                      setCurrentPage(1);
                    }}
                    className={`${language === 'ar' ? 'arabic-text text-right' : 'text-left'} w-full px-4 py-3 rounded-lg transition-colors flex justify-between items-center ${
                      selectedCategory === (language === 'ar' ? 'الكل' : 'All') || selectedCategory === 'All'
                        ? 'bg-primary/10 text-primary font-bold'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span className="text-sm text-gray-500">{products.length}</span>
                    <span>{language === 'ar' ? 'جميع المنتجات' : 'All Products'}</span>
                  </button>
                  
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => {
                        setSelectedCategory(category.name);
                        setCurrentPage(1);
                      }}
                      className={`${language === 'ar' ? 'arabic-text text-right' : 'text-left'} w-full px-4 py-3 rounded-lg transition-colors flex justify-between items-center ${
                        selectedCategory === category.name
                          ? 'bg-primary/10 text-primary font-bold'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <span className="text-sm text-gray-500">{category.count}</span>
                      <span>{translateCategory(category.name)}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort By */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                <h3 className={`${language === 'ar' ? 'arabic-text' : ''} text-xl font-bold mb-6 dark:text-white`}>
                  {language === 'ar' ? 'ترتيب حسب' : 'Sort By'}
                </h3>
                <div className="space-y-2">
                  {sortOptions.map(option => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortBy(option.value);
                        setCurrentPage(1);
                      }}
                      className={`${language === 'ar' ? 'arabic-text text-right' : 'text-left'} w-full px-4 py-3 rounded-lg transition-colors ${
                        sortBy === option.value
                          ? 'bg-primary/10 text-primary font-bold'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      {language === 'ar' ? option.label_ar : option.label_en}
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Filters */}
              {(selectedCategory !== (language === 'ar' ? 'الكل' : 'All') || searchQuery) && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                  <h3 className={`${language === 'ar' ? 'arabic-text' : ''} text-xl font-bold mb-4 dark:text-white`}>
                    {language === 'ar' ? 'الفلتر النشط' : 'Active Filters'}
                  </h3>
                  <div className="space-y-2">
                    {selectedCategory !== (language === 'ar' ? 'الكل' : 'All') && selectedCategory !== 'All' && (
                      <div className={`flex items-center justify-between bg-primary/5 px-3 py-2 rounded-lg ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                        <span className={`${language === 'ar' ? 'arabic-text' : ''} text-sm`}>
                          {language === 'ar' ? 'الفئة:' : 'Category:'} {translateCategory(selectedCategory)}
                        </span>
                        <button
                          onClick={() => setSelectedCategory(language === 'ar' ? 'الكل' : 'All')}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <span className="material-symbols-outlined text-sm">close</span>
                        </button>
                      </div>
                    )}
                    {searchQuery && (
                      <div className={`flex items-center justify-between bg-primary/5 px-3 py-2 rounded-lg ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                        <span className={`${language === 'ar' ? 'arabic-text' : ''} text-sm`}>
                          {language === 'ar' ? 'بحث:' : 'Search:'} "{searchQuery}"
                        </span>
                        <button
                          onClick={() => setSearchQuery('')}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <span className="material-symbols-outlined text-sm">close</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Quick Links */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                <h3 className={`${language === 'ar' ? 'arabic-text' : ''} text-xl font-bold mb-6 dark:text-white`}>
                  {language === 'ar' ? 'روابط سريعة' : 'Quick Links'}
                </h3>
                <div className="space-y-4">
                  <Link to="/" className={`flex items-center gap-3 ${language === 'ar' ? 'flex-row-reverse' : ''} text-gray-700 dark:text-gray-300 hover:text-primary transition-colors`}>
                    <span className={`${language === 'ar' ? 'arabic-text' : ''}`}>
                      {language === 'ar' ? 'الرئيسية' : 'Home'}
                    </span>
                    <span className="material-symbols-outlined">home</span>
                  </Link>
                  <Link to="/products?category=عرض" className={`flex items-center gap-3 ${language === 'ar' ? 'flex-row-reverse' : ''} text-gray-700 dark:text-gray-300 hover:text-primary transition-colors`}>
                    <span className={`${language === 'ar' ? 'arabic-text' : ''}`}>
                      {language === 'ar' ? 'مجموعة العرض' : 'Offer Collection'}
                    </span>
                    <span className="material-symbols-outlined">local_offer</span>
                  </Link>
                  <Link to="/products?category=شيفون" className={`flex items-center gap-3 ${language === 'ar' ? 'flex-row-reverse' : ''} text-gray-700 dark:text-gray-300 hover:text-primary transition-colors`}>
                    <span className={`${language === 'ar' ? 'arabic-text' : ''}`}>
                      {language === 'ar' ? 'مجموعة الشيفون' : 'Chiffon Collection'}
                    </span>
                    <span className="material-symbols-outlined">star</span>
                  </Link>
                  <Link to="/contact" className={`flex items-center gap-3 ${language === 'ar' ? 'flex-row-reverse' : ''} text-gray-700 dark:text-gray-300 hover:text-primary transition-colors`}>
                    <span className={`${language === 'ar' ? 'arabic-text' : ''}`}>
                      {language === 'ar' ? 'دعم العملاء' : 'Customer Support'}
                    </span>
                    <span className="material-symbols-outlined">support_agent</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            <div className={`flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
              <div>
                <h2 className={`${language === 'ar' ? 'arabic-text' : ''} text-2xl font-bold dark:text-white`}>
                  {selectedCategory === (language === 'ar' ? 'الكل' : 'All') || selectedCategory === 'All' 
                    ? (language === 'ar' ? 'جميع المنتجات' : 'All Products')
                    : translateCategory(selectedCategory)}
                  <span className={`${language === 'ar' ? 'arabic-text' : ''} text-lg font-normal text-gray-600 dark:text-gray-400 ${language === 'ar' ? 'mr-2' : 'ml-2'}`}>
                    ({sortedProducts.length} {sortedProducts.length === 1 
                      ? (language === 'ar' ? 'منتج' : 'product') 
                      : (language === 'ar' ? 'منتجات' : 'products')})
                  </span>
                </h2>
                {searchQuery && (
                  <p className={`${language === 'ar' ? 'arabic-text' : ''} text-gray-600 dark:text-gray-400 mt-1`}>
                    {language === 'ar' ? 'نتائج البحث عن' : 'Search results for'} "{searchQuery}"
                  </p>
                )}
              </div>
              
              <div className={`flex items-center gap-4 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                <div className={`${language === 'ar' ? 'arabic-text' : ''} text-gray-600 dark:text-gray-400 text-sm`}>
                  {language === 'ar' ? 'صفحة' : 'Page'} {currentPage} {language === 'ar' ? 'من' : 'of'} {totalPages}
                </div>
                <div className="flex items-center gap-2">
                  <span className={`${language === 'ar' ? 'arabic-text' : ''} text-gray-600 dark:text-gray-400`}>
                    {language === 'ar' ? 'العرض:' : 'View:'}
                  </span>
                  <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700">
                    <span className="material-symbols-outlined">grid_view</span>
                  </button>
                  <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                    <span className="material-symbols-outlined">view_list</span>
                  </button>
                </div>
              </div>
            </div>

            {currentProducts.length === 0 ? (
              <div className="text-center py-20">
                <span className="material-symbols-outlined text-6xl text-gray-400 mb-4">search_off</span>
                <h3 className={`${language === 'ar' ? 'arabic-text' : ''} text-2xl font-bold mb-2 dark:text-white`}>
                  {language === 'ar' ? 'لم يتم العثور على منتجات' : 'No Products Found'}
                </h3>
                <p className={`${language === 'ar' ? 'arabic-text' : ''} text-gray-600 dark:text-gray-400 mb-6`}>
                  {language === 'ar' ? 'حاول تعديل معايير البحث أو الفلتر' : 'Try adjusting your search or filter criteria'}
                </p>
                <button
                  onClick={resetFilters}
                  className={`${language === 'ar' ? 'arabic-text' : ''} px-6 py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary-dark transition-colors`}
                >
                  {language === 'ar' ? 'مسح جميع الفلاتر' : 'Clear All Filters'}
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {currentProducts.map(product => {
                    const productName = product.name || '';
                    
                    return (
                      <div key={product.id} className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                        <Link to={`/product/${product.id}`}>
                          <div className="relative aspect-square overflow-hidden">
                            <img 
                              src={product.image || product.images?.[0] || '/img/default.jpeg'} 
                              alt={productName}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            
                            {/* عرض علامة "عرض" إذا كان المنتج لديه عرض */}
                            {product.hasOffer === true && (
                              <div className={`absolute top-4 ${language === 'ar' ? 'right-4' : 'left-4'} px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary text-white`}>
                                <span className={`${language === 'ar' ? 'arabic-text' : ''}`}>
                                  {language === 'ar' ? 'عرض' : 'Offer'}
                                </span>
                              </div>
                            )}
                            
                            {!product.inStock && (
                              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                <span className={`${language === 'ar' ? 'arabic-text' : ''} text-white text-lg font-bold`}>
                                  {language === 'ar' ? 'نفذت الكمية' : 'Out of Stock'}
                                </span>
                              </div>
                            )}
                          </div>

                          <div className="p-4">
                            <div className={`flex justify-between items-start mb-2 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                              <h3 className={`${language === 'ar' ? 'arabic-text' : ''} text-base font-bold dark:text-white group-hover:text-primary transition-colors line-clamp-1`}>
                                {productName}
                              </h3>
                              <div className={language === 'ar' ? 'text-left' : 'text-right'}>
                                <span className={`${language === 'ar' ? 'arabic-text' : ''} text-lg font-bold text-primary`}>{product.price}</span>
                              </div>
                            </div>

                            <p className={`${language === 'ar' ? 'arabic-text' : ''} text-gray-600 dark:text-gray-400 text-xs mb-3 line-clamp-2`}>
                              {product.description || ''}
                            </p>

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

                              <div className="flex gap-1">
                                {(product.colors || []).slice(0, 3).map((color, index) => (
                                  <div 
                                    key={index}
                                    className="w-3 h-3 rounded-full border border-gray-300"
                                    style={{ backgroundColor: color.value || '#ccc' }}
                                    title={color.name || 'لون'}
                                  />
                                ))}
                                {(product.colors || []).length > 3 && (
                                  <div className="w-3 h-3 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-[8px]">
                                    +{(product.colors || []).length - 3}
                                  </div>
                                )}
                              </div>
                            </div>

                            <button className={`${language === 'ar' ? 'arabic-text' : ''} w-full mt-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary-dark transition-colors opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                              {language === 'ar' ? 'عرض التفاصيل' : 'View Details'}
                            </button>
                          </div>
                        </Link>
                      </div>
                    );
                  })}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                    <div className={`${language === 'ar' ? 'arabic-text' : ''} text-sm text-gray-600 dark:text-gray-400`}>
                      {language === 'ar' ? 'عرض' : 'Showing'} {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, sortedProducts.length)} {language === 'ar' ? 'من' : 'of'} {sortedProducts.length} {language === 'ar' ? 'منتج' : 'products'}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {/* Previous Button */}
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="material-symbols-outlined">
                          {language === 'ar' ? 'chevron_right' : 'chevron_left'}
                        </span>
                      </button>
                      
                      {/* First Page */}
                      {currentPage > 3 && (
                        <>
                          <button
                            onClick={() => handlePageChange(1)}
                            className={`${language === 'ar' ? 'arabic-text' : ''} w-10 h-10 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700`}
                          >
                            {1}
                          </button>
                          {currentPage > 4 && (
                            <span className="px-2 text-gray-400">...</span>
                          )}
                        </>
                      )}
                      
                      {/* Page Numbers */}
                      {getPageNumbers().map(page => (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`${language === 'ar' ? 'arabic-text' : ''} w-10 h-10 rounded-lg font-medium ${
                            currentPage === page
                              ? 'bg-primary text-white'
                              : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                        >
                          {page.toLocaleString(language === 'ar' ? 'ar-EG' : 'en-US')}
                        </button>
                      ))}
                      
                      {/* Last Page */}
                      {currentPage < totalPages - 2 && (
                        <>
                          {currentPage < totalPages - 3 && (
                            <span className="px-2 text-gray-400">...</span>
                          )}
                          <button
                            onClick={() => handlePageChange(totalPages)}
                            className={`${language === 'ar' ? 'arabic-text' : ''} w-10 h-10 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700`}
                          >
                            {totalPages.toLocaleString(language === 'ar' ? 'ar-EG' : 'en-US')}
                          </button>
                        </>
                      )}
                      
                      {/* Next Button */}
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="material-symbols-outlined">
                          {language === 'ar' ? 'chevron_left' : 'chevron_right'}
                        </span>
                      </button>
                    </div>
                    
                    <div className={`flex items-center gap-2 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                      <span className={`${language === 'ar' ? 'arabic-text' : ''} text-sm text-gray-600 dark:text-gray-400`}>
                        {language === 'ar' ? 'اذهب إلى:' : 'Go to:'}
                      </span>
                      <select
                        value={currentPage}
                        onChange={(e) => handlePageChange(parseInt(e.target.value))}
                        className={`${language === 'ar' ? 'arabic-text' : ''} px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800`}
                        dir={language === 'ar' ? 'rtl' : 'ltr'}
                      >
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                          <option key={page} value={page}>
                            {language === 'ar' ? 'صفحة' : 'Page'} {page.toLocaleString(language === 'ar' ? 'ar-EG' : 'en-US')}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;