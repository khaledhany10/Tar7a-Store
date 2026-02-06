// data/products.js
import imagesData from './images.json';

// استخراج المنتجات من ملف JSON
export const allProducts = imagesData.collections.flatMap((collection, collectionIndex) => {
  return collection.folders.flatMap((folder, folderIndex) => {
    return folder.files.map((file, fileIndex) => {
      // إنشاء معرف فريد للمنتج
      const productId = `${collectionIndex + 1}${folderIndex + 1}${fileIndex + 1}`.padStart(3, '0');
      
      return {
        id: productId,
        name: file.name.replace('.jpeg', '').replace('.jpg', '').replace(/\d+-/g, ''),
        description: file.description || `${collection.name} - تصميم إسلامي فاخر`,
        fullDescription: `تصميم إسلامي فريد من نوعه من مجموعة ${collection.name}. ${file.description || 'أناقة لا تضاهى لجمالك الإسلامي.'} جودة عالية ومناسبة لكل المناسبات.`,
        price: file.price || collection.price || '130 EGP',
        originalPrice: file.originalPrice || null,
        image: file.url,
        images: [file.url],
        collectionType: collection.id,
        collectionName: collection.name,
        category: collection.id,
        rating: parseFloat((Math.random() * 0.5 + 4.0).toFixed(1)), // بين 4.0 و4.5
        popularity: Math.floor(Math.random() * 500) + 100,
        reviews: Math.floor(Math.random() * 50) + 5,
        colors: [
          { name: 'ذهبي', value: '#FFD700' },
          { name: 'فضي', value: '#C0C0C0' },
          { name: 'أبيض', value: '#FFFFFF' },
          { name: 'أسود', value: '#000000' }
        ],
        sizes: ['S', 'M', 'L', 'XL'],
        material: 'شيفون حريري فاخر',
        care: 'تنظيف جاف فقط',
        weight: '150 جرام',
        dimensions: '110 × 110 سم',
        deliveryTime: '2-5 أيام عمل',
        inStock: Math.random() > 0.1, // 90% في المخزون
        hasOffer: Math.random() > 0.7, // 30% عروض
        tags: ['فاخر', 'إسلامي', 'حجاب', 'شيفون', collection.name],
        collectionNumber: folderIndex + 1
      };
    });
  });
});

// المجموعات
export const collections = imagesData.collections.map(collection => ({
  id: collection.id,
  name: collection.name,
  nameEn: collection.name,
  description: collection.description,
  count: collection.folders.reduce((sum, folder) => sum + folder.files.length, 0),
  price: collection.price,
  rating: collection.rating || 4.0
}));

// الفئات الديناميكية
export const dynamicCategories = [
  { id: '01-Basic-Pinks', name: 'وردي أساسي', count: allProducts.filter(p => p.collectionType === '01-Basic-Pinks').length },
  { id: '02-Christian-Dior', name: 'كريستيان ديور', count: allProducts.filter(p => p.collectionType === '02-Christian-Dior').length },
  { id: '03-Islamic-Ornaments', name: 'زخارف إسلامية', count: allProducts.filter(p => p.collectionType === '03-Islamic-Ornaments').length },
  { id: '04-Islamic-Scarf', name: 'حجاب إسلامي', count: allProducts.filter(p => p.collectionType === '04-Islamic-Scarf').length },
  { id: '05-Ramadan', name: 'رمضاني', count: allProducts.filter(p => p.collectionType === '05-Ramadan').length },
  { id: '06-Pattern', name: 'أنماط', count: allProducts.filter(p => p.collectionType === '06-Pattern').length },
  { id: '07-Itamine', name: 'إيتامين', count: allProducts.filter(p => p.collectionType === '07-Itamine').length },
  { id: '08-Colourfull-Limited', name: 'ملون محدود', count: allProducts.filter(p => p.collectionType === '08-Colourfull-Limited').length },
  { id: '09-Melt-designs', name: 'ميلت ديزاين', count: allProducts.filter(p => p.collectionType === '09-Melt-designs').length },
  { id: '10-Beige-Basic-grad', name: 'بيج متدرج', count: allProducts.filter(p => p.collectionType === '10-Beige-Basic-grad').length }
];

// إحصائيات المنتجات
export const productStats = {
  totalProducts: allProducts.length,
  averageRating: parseFloat((allProducts.reduce((sum, p) => sum + p.rating, 0) / allProducts.length).toFixed(1)),
  priceRange: {
    min: 100,
    max: 130
  }
};

// دالة البحث في المنتجات
export const searchAllProducts = (query = '', filters = {}) => {
  let filtered = [...allProducts];
  
  // البحث النصي
  if (query.trim()) {
    const searchTerm = query.toLowerCase();
    filtered = filtered.filter(product => {
      const searchFields = [
        product.name?.toLowerCase(),
        product.description?.toLowerCase(),
        product.collectionName?.toLowerCase(),
        product.tags?.join(' ')?.toLowerCase()
      ].filter(Boolean);
      
      return searchFields.some(field => field.includes(searchTerm));
    });
  }
  
  // فلترة حسب الفئة
  if (filters.category && filters.category !== 'all') {
    filtered = filtered.filter(product => product.collectionType === filters.category);
  }
  
  // فلترة حسب المجموعة
  if (filters.collection && filters.collection !== 'all') {
    filtered = filtered.filter(product => product.collectionType === filters.collection);
  }
  
  // فلترة حسب السعر
  if (filters.minPrice) {
    filtered = filtered.filter(product => {
      try {
        const price = parseInt(product.price.replace('EGP', '').trim());
        return price >= filters.minPrice;
      } catch {
        return true;
      }
    });
  }
  
  if (filters.maxPrice) {
    filtered = filtered.filter(product => {
      try {
        const price = parseInt(product.price.replace('EGP', '').trim());
        return price <= filters.maxPrice;
      } catch {
        return true;
      }
    });
  }
  
  // فلترة حسب التوفر
  if (filters.inStock) {
    filtered = filtered.filter(product => product.inStock);
  }
  
  // فلترة حسب العروض
  if (filters.hasOffer) {
    filtered = filtered.filter(product => product.hasOffer);
  }
  
  // الترتيب
  if (filters.sortBy) {
    switch (filters.sortBy) {
      case 'newest':
        filtered.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        break;
      case 'popularity':
        filtered.sort((a, b) => b.popularity - a.popularity);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'price-low':
        filtered.sort((a, b) => {
          try {
            const priceA = parseInt(a.price.replace('EGP', '').trim());
            const priceB = parseInt(b.price.replace('EGP', '').trim());
            return priceA - priceB;
          } catch {
            return 0;
          }
        });
        break;
      case 'price-high':
        filtered.sort((a, b) => {
          try {
            const priceA = parseInt(a.price.replace('EGP', '').trim());
            const priceB = parseInt(b.price.replace('EGP', '').trim());
            return priceB - priceA;
          } catch {
            return 0;
          }
        });
        break;
    }
  }
  
  return filtered;
};

// دالة للحصول على منتجات حسب المجموعة
export const getProductsByCollection = (collectionId) => {
  return allProducts.filter(product => product.collectionType === collectionId);
};

// دالة للحصول على أفضل المنتجات مبيعاً
export const getBestSellingProducts = (limit = 8) => {
  return [...allProducts]
    .sort((a, b) => {
      // أولوية للعروض الخاصة
      if (a.hasOffer && !b.hasOffer) return -1;
      if (!a.hasOffer && b.hasOffer) return 1;
      
      // ثم حسب الشعبية
      const popularityDiff = b.popularity - a.popularity;
      if (popularityDiff !== 0) return popularityDiff;
      
      // ثم حسب التقييم
      const ratingDiff = b.rating - a.rating;
      if (ratingDiff !== 0) return ratingDiff;
      
      // ثم حسب عدد التقييمات
      return b.reviews - a.reviews;
    })
    .slice(0, limit);
};

// دالة لتحميل المزيد من المنتجات
export const loadMoreProducts = (currentProducts, count = 12) => {
  const startIndex = currentProducts.length;
  return allProducts.slice(startIndex, startIndex + count);
};

// دالة للحصول على الإحصائيات الديناميكية
export const getDynamicStats = () => ({
  totalProducts: allProducts.length,
  priceRange: {
    min: 100,
    max: 130
  },
  collectionsCount: collections.length,
  inStockCount: allProducts.filter(p => p.inStock).length,
  outOfStockCount: allProducts.filter(p => !p.inStock).length,
  averagePrice: Math.round(allProducts.reduce((sum, p) => {
    try {
      const price = parseInt(p.price.replace('EGP', '').trim());
      return sum + price;
    } catch {
      return sum + 100;
    }
  }, 0) / allProducts.length)
});

// دالة لتصحيح مسار الصور
export const correctImagePath = (imagePath) => {
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

// دالة للحصول على لون الشارة للمجموعة
export const getCollectionBadgeColor = (collectionType) => {
  const colorMap = {
    '01-Basic-Pinks': 'from-pink-500 to-rose-600',
    '02-Christian-Dior': 'from-gray-700 to-black',
    '03-Islamic-Ornaments': 'from-yellow-600 to-yellow-800',
    '04-Islamic-Scarf': 'from-green-600 to-emerald-800',
    '05-Ramadan': 'from-purple-600 to-indigo-800',
    '06-Pattern': 'from-blue-500 to-cyan-500',
    '07-Itamine': 'from-red-500 to-pink-600',
    '08-Colourfull-Limited': 'from-orange-500 to-red-600',
    '09-Melt-designs': 'from-teal-500 to-green-600',
    '10-Beige-Basic-grad': 'from-amber-500 to-orange-600'
  };
  
  return colorMap[collectionType] || 'from-primary to-purple-600';
};