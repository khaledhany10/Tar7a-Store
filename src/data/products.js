// data/products.js
import imagesData from './images.json';

export const loadProductsFromStorage = () => {
  try {
    const saved = localStorage.getItem('tar7a_products');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('Error loading products from storage:', error);
  }
  return null;
};

export const saveProductsToStorage = (products) => {
  try {
    localStorage.setItem('tar7a_products', JSON.stringify(products));
    return true;
  } catch (error) {
    console.error('Error saving products to storage:', error);
    return false;
  }
};

// إنشاء المنتجات الافتراضية من JSON فقط لو مفيش منتجات مخزنة
const createInitialProducts = () => {
  return imagesData.collections.flatMap((collection, collectionIndex) => {
    return collection.folders.flatMap((folder, folderIndex) => {
      return folder.files.map((file, fileIndex) => {
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
          rating: parseFloat((Math.random() * 0.5 + 4.0).toFixed(1)),
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
          inStock: Math.random() > 0.1,
          hasOffer: Math.random() > 0.7,
          tags: ['فاخر', 'إسلامي', 'حجاب', 'شيفون', collection.name],
          collectionNumber: folderIndex + 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
      });
    });
  });
};

// المنتجات الحالية - أولاً نحاول من localStorage، وإلا ننشئ من JSON
let currentProducts = loadProductsFromStorage();
if (!currentProducts || currentProducts.length === 0) {
  currentProducts = createInitialProducts();
  saveProductsToStorage(currentProducts);
}

export let allProducts = currentProducts;

// دالة لتحديث allProducts وحفظها
export const updateAllProducts = (newProducts) => {
  allProducts = newProducts;
  saveProductsToStorage(newProducts);
  return allProducts;
};

// دالة للحصول على منتجات حسب المجموعة
export const getProductsByCollection = (collectionId) => {
  return allProducts.filter(product => product.collectionType === collectionId);
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

// إحصائيات ديناميكية
export const getDynamicStats = () => ({
  totalProducts: allProducts.length,
  priceRange: {
    min: Math.min(...allProducts.map(p => parseInt(p.price.replace('EGP', '').trim()) || 100)),
    max: Math.max(...allProducts.map(p => parseInt(p.price.replace('EGP', '').trim()) || 130))
  },
  collectionsCount: new Set(allProducts.map(p => p.collectionType)).size,
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

// المجموعات بناءً على المنتجات الحالية
export const collections = (() => {
  const collectionMap = new Map();
  
  allProducts.forEach(product => {
    if (!collectionMap.has(product.collectionType)) {
      collectionMap.set(product.collectionType, {
        id: product.collectionType,
        name: product.collectionName,
        nameEn: product.collectionName,
        count: 0,
        price: '130 EGP'
      });
    }
    const collection = collectionMap.get(product.collectionType);
    collection.count++;
  });
  
  return Array.from(collectionMap.values());
})();

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

// إحصائيات المنتجات (للتوافق مع الكود القديم)
export const productStats = {
  totalProducts: allProducts.length,
  averageRating: parseFloat((allProducts.reduce((sum, p) => sum + p.rating, 0) / allProducts.length).toFixed(1)),
  priceRange: {
    min: 100,
    max: 130
  }
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

// دالة لإضافة منتج جديد
export const addNewProduct = (productData) => {
  const newProduct = {
    ...productData,
    id: `PRD${Date.now().toString().slice(-6)}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    images: [productData.image],
    colors: productData.colors || [
      { name: 'ذهبي', value: '#FFD700' },
      { name: 'فضي', value: '#C0C0C0' },
      { name: 'أبيض', value: '#FFFFFF' },
      { name: 'أسود', value: '#000000' }
    ],
    sizes: productData.sizes || ['S', 'M', 'L', 'XL'],
    tags: productData.tags || ['فاخر', 'إسلامي', 'حجاب', 'شيفون'],
    fullDescription: productData.fullDescription || productData.description
  };
  
  allProducts.push(newProduct);
  updateAllProducts(allProducts);
  return newProduct;
};

// دالة لتحديث منتج
export const updateProduct = (productId, updates) => {
  const index = allProducts.findIndex(p => p.id === productId);
  if (index !== -1) {
    allProducts[index] = {
      ...allProducts[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    updateAllProducts(allProducts);
    return allProducts[index];
  }
  return null;
};

// دالة لحذف منتج
export const deleteProduct = (productId) => {
  const newProducts = allProducts.filter(p => p.id !== productId);
  allProducts = newProducts;
  updateAllProducts(newProducts);
  return true;
};

// دالة لتصحيح مسار الصور
export const correctImagePath = (imagePath) => {
  if (!imagePath) return '';
  
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