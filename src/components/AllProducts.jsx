import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { products, categories } from '../data/products';

const AllProducts = () => {
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState('الكل');
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
      setCurrentPage(1); // Reset to first page when category changes
    }
  }, [location.search]);

  // Filter products based on selected category and search query
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'الكل' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', ''));
      case 'price-high':
        return parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', ''));
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
    setSelectedCategory('الكل');
    setSearchQuery('');
    setSortBy('featured');
    setCurrentPage(1);
  };

  // Translate category names to Arabic
  const translateCategoryToArabic = (category) => {
    const translations = {
      'Chiffon': 'شيفون',
      'Jersey': 'جيرسي',
      'Modal': 'مودال',
      'Silk': 'حرير',
      'Crinkle': 'كرينكل',
      'Linen': 'كتان',
      'Velvet': 'قطيفة',
      'Georgette': 'جرجيت',
      'New': 'جديد',
      'Sale': 'خصم',
      'All': 'الكل',
      'Featured': 'مميز'
    };
    return translations[category] || category;
  };

  // Translate sort options to Arabic
  const translateSortOption = (value) => {
    const translations = {
      'featured': 'المميزة',
      'newest': 'الأحدث',
      'rating': 'الأعلى تقييماً',
      'price-low': 'السعر: منخفض إلى مرتفع',
      'price-high': 'السعر: مرتفع إلى منخفض'
    };
    return translations[value] || value;
  };

  // Translate tag names to Arabic
  const translateTagToArabic = (tag) => {
    const translations = {
      'Sale': 'خصم',
      'New': 'جديد',
      'Bestseller': 'الأكثر مبيعاً',
      'Eco': 'صديق للبيئة',
      'Travel': 'سفر',
      'Summer': 'صيفي',
      'Winter': 'شتوي',
      'Evening': 'مسائي',
      'Set': 'مجموعة',
      'Luxury': 'فاخر'
    };
    return translations[tag] || tag;
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 to-peach-soft dark:from-primary/5 dark:to-background-dark py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="arabic-text text-5xl font-bold mb-6 dark:text-white">تسوق جميع الحجابات</h1>
          <p className="arabic-text text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            اكتشف مجموعتنا الكاملة من الحجابات المميزة بأنواع وألوان وتصاميم متنوعة.
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
                placeholder="ابحث عن الحجابات بالاسم، النسيج، أو اللون..."
                className="arabic-text w-full px-6 py-4 rounded-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
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
                <div className="flex justify-between items-center mb-6">
                  <h3 className="arabic-text text-xl font-bold dark:text-white">الفئات</h3>
                  {(selectedCategory !== 'الكل' || searchQuery) && (
                    <button 
                      onClick={resetFilters}
                      className="arabic-text text-sm text-primary hover:text-primary-dark transition-colors"
                    >
                      مسح الكل
                    </button>
                  )}
                </div>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setSelectedCategory('الكل');
                      setCurrentPage(1);
                    }}
                    className={`arabic-text w-full text-right px-4 py-3 rounded-lg transition-colors ${
                      selectedCategory === 'الكل'
                        ? 'bg-primary/10 text-primary font-bold'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">{products.length}</span>
                      <span>جميع المنتجات</span>
                    </div>
                  </button>
                  
                  {categories.filter(cat => cat.name !== 'All').map(category => (
                    <button
                      key={category.id}
                      onClick={() => {
                        setSelectedCategory(category.name);
                        setCurrentPage(1);
                      }}
                      className={`arabic-text w-full text-right px-4 py-3 rounded-lg transition-colors ${
                        selectedCategory === category.name
                          ? 'bg-primary/10 text-primary font-bold'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">{category.count}</span>
                        <span>{translateCategoryToArabic(category.name)}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort By */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                <h3 className="arabic-text text-xl font-bold mb-6 dark:text-white">ترتيب حسب</h3>
                <div className="space-y-2">
                  {[
                    { value: 'featured', label: 'المميزة' },
                    { value: 'newest', label: 'الأحدث' },
                    { value: 'rating', label: 'الأعلى تقييماً' },
                    { value: 'price-low', label: 'السعر: منخفض إلى مرتفع' },
                    { value: 'price-high', label: 'السعر: مرتفع إلى منخفض' }
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortBy(option.value);
                        setCurrentPage(1);
                      }}
                      className={`arabic-text w-full text-right px-4 py-3 rounded-lg transition-colors ${
                        sortBy === option.value
                          ? 'bg-primary/10 text-primary font-bold'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Filters */}
              {(selectedCategory !== 'الكل' || searchQuery) && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                  <h3 className="arabic-text text-xl font-bold mb-4 dark:text-white">الفلتر النشط</h3>
                  <div className="space-y-2">
                    {selectedCategory !== 'الكل' && (
                      <div className="flex items-center justify-between bg-primary/5 px-3 py-2 rounded-lg">
                        <span className="arabic-text text-sm">الفئة: {translateCategoryToArabic(selectedCategory)}</span>
                        <button
                          onClick={() => setSelectedCategory('الكل')}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <span className="material-symbols-outlined text-sm">close</span>
                        </button>
                      </div>
                    )}
                    {searchQuery && (
                      <div className="flex items-center justify-between bg-primary/5 px-3 py-2 rounded-lg">
                        <span className="arabic-text text-sm">بحث: "{searchQuery}"</span>
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
                <h3 className="arabic-text text-xl font-bold mb-6 dark:text-white">روابط سريعة</h3>
                <div className="space-y-4">
                  <Link to="/" className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
                    <span className="arabic-text">الرئيسية</span>
                    <span className="material-symbols-outlined">home</span>
                  </Link>
                  <Link to="/products?category=Sale" className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
                    <span className="arabic-text">مجموعة الخصم</span>
                    <span className="material-symbols-outlined">local_offer</span>
                  </Link>
                  <Link to="/products?category=New" className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
                    <span className="arabic-text">الأكثر مبيعاً</span>
                    <span className="material-symbols-outlined">star</span>
                  </Link>
                  <Link to="/contact" className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
                    <span className="arabic-text">دعم العملاء</span>
                    <span className="material-symbols-outlined">support_agent</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <h2 className="arabic-text text-2xl font-bold dark:text-white">
                  {selectedCategory === 'الكل' ? 'جميع المنتجات' : translateCategoryToArabic(selectedCategory)}
                  <span className="arabic-text text-lg font-normal text-gray-600 dark:text-gray-400 mr-2">
                    ({sortedProducts.length} {sortedProducts.length === 1 ? 'منتج' : 'منتج'})
                  </span>
                </h2>
                {searchQuery && (
                  <p className="arabic-text text-gray-600 dark:text-gray-400 mt-1">
                    نتائج البحث عن "{searchQuery}"
                  </p>
                )}
              </div>
              
              <div className="flex items-center gap-4">
                <div className="arabic-text text-gray-600 dark:text-gray-400 text-sm">
                  صفحة {currentPage} من {totalPages}
                </div>
                <div className="flex items-center gap-2">
                  <span className="arabic-text text-gray-600 dark:text-gray-400">العرض:</span>
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
                <h3 className="arabic-text text-2xl font-bold mb-2 dark:text-white">لم يتم العثور على منتجات</h3>
                <p className="arabic-text text-gray-600 dark:text-gray-400 mb-6">حاول تعديل معايير البحث أو الفلتر</p>
                <button
                  onClick={resetFilters}
                  className="arabic-text px-6 py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary-dark transition-colors"
                >
                  مسح جميع الفلاتر
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {currentProducts.map(product => (
                    <div key={product.id} className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                      <Link to={`/product/${product.id}`}>
                        <div className="relative aspect-square overflow-hidden">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          {product.tag && (
                            <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                              product.tag === 'Sale' 
                                ? 'bg-primary text-white' 
                                : product.tag === 'New' || product.tag === 'Bestseller'
                                ? 'bg-green-500 text-white'
                                : product.tag === 'Eco'
                                ? 'bg-emerald-500 text-white'
                                : 'bg-white/90 text-gray-800'
                            }`}>
                              <span className="arabic-text">{translateTagToArabic(product.tag)}</span>
                            </div>
                          )}
                          
                          {!product.inStock && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                              <span className="arabic-text text-white text-lg font-bold">نفذت الكمية</span>
                            </div>
                          )}
                        </div>

                        <div className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="arabic-text text-base font-bold dark:text-white group-hover:text-primary transition-colors line-clamp-1">
                              {product.name}
                            </h3>
                            <div className="text-left">
                              <span className="arabic-text text-lg font-bold text-primary">{product.price}</span>
                              {product.originalPrice && (
                                <div className="arabic-text text-xs line-through text-gray-500">{product.originalPrice}</div>
                              )}
                            </div>
                          </div>

                          <p className="arabic-text text-gray-600 dark:text-gray-400 text-xs mb-3 line-clamp-2">
                            {product.description}
                          </p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                  <span key={i} className="material-symbols-outlined text-primary text-sm">
                                    {i < Math.floor(product.rating) ? 'star' : 'star_half'}
                                  </span>
                                ))}
                              </div>
                              <span className="arabic-text text-xs text-gray-600 dark:text-gray-400 mr-1">
                                ({product.reviews})
                              </span>
                            </div>

                            <div className="flex gap-1">
                              {product.colors.slice(0, 3).map((color, index) => (
                                <div 
                                  key={index}
                                  className="w-3 h-3 rounded-full border border-gray-300"
                                  style={{ backgroundColor: color.value }}
                                  title={color.name}
                                />
                              ))}
                              {product.colors.length > 3 && (
                                <div className="w-3 h-3 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-[8px]">
                                  +{product.colors.length - 3}
                                </div>
                              )}
                            </div>
                          </div>

                          <button className="arabic-text w-full mt-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary-dark transition-colors opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            عرض التفاصيل
                          </button>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                    <div className="arabic-text text-sm text-gray-600 dark:text-gray-400">
                      عرض {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, sortedProducts.length)} من {sortedProducts.length} منتج
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {/* Previous Button */}
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="material-symbols-outlined">chevron_right</span>
                      </button>
                      
                      {/* First Page */}
                      {currentPage > 3 && (
                        <>
                          <button
                            onClick={() => handlePageChange(1)}
                            className="arabic-text w-10 h-10 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            ١
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
                          className={`arabic-text w-10 h-10 rounded-lg font-medium ${
                            currentPage === page
                              ? 'bg-primary text-white'
                              : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                        >
                          {page.toLocaleString('ar-EG')}
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
                            className="arabic-text w-10 h-10 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            {totalPages.toLocaleString('ar-EG')}
                          </button>
                        </>
                      )}
                      
                      {/* Next Button */}
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="material-symbols-outlined">chevron_left</span>
                      </button>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="arabic-text text-sm text-gray-600 dark:text-gray-400">اذهب إلى:</span>
                      <select
                        value={currentPage}
                        onChange={(e) => handlePageChange(parseInt(e.target.value))}
                        className="arabic-text px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800"
                      >
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                          <option key={page} value={page}>
                            صفحة {page.toLocaleString('ar-EG')}
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