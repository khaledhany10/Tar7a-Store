// =============================================
// نظام إدارة المنتجات الديناميكي
// =============================================

// الدوال المساعدة

const generateProductName = (type, number) => {
  const nameTemplates = {
    'basic-pinks': [
      "وردي فاتح", "وردي غامق", "زهري ناعم", "وردي مشرق",
      "وردي تركواز", "وردي لافندر", "وردي كرزي", "وردي سلمون"
    ],
    'christian-dior': [
      "ديور كلاسيك", "أناقة ديور", "رفاهية ديور", "توقيع ديور",
      "ديور الأصيل", "أنوثة ديور", "جمال ديور", "فخامة ديور"
    ],
    'islamic-ornaments': [
      "زخارف إسلامية ذهبية", "نقوش عربية كلاسيكية", "زخارف أندلسية",
      "نقوش مغربية تقليدية", "زخارف عثمانية", "نقوش إسلامية معاصرة",
      "زخارف قبة الصخرة", "نقوش المساجد", "زخارف الخط العربي",
      "تزيينات إسلامية", "زخارف مملوكية", "نقوش فاطمية"
    ],
    'islamic-scarf': [
      "طرحة شيفون إسلامية", "حجاب زخرفي أنيق", "وشاح بنقوش عربية",
      "طرحة بنقوش إسلامية", "حجاب بشعارات دينية", "وشاح برسومات إسلامية",
      "طرحة حريرية", "حجاب قطني", "وشاح شتوي إسلامي"
    ],
    'ramadan': [
      "طرحة رمضان المبارك", "حجاب رمضاني خاص", "وشاح ليالي القدر",
      "طرحة أيام الصيام", "حجاب ليالي رمضان", "وشاح روحانية رمضان",
      "طرحة العيد", "حجاب التراويح", "وشاح الخير"
    ],
    'pattern': [
      "نقش إسلامي هندسي", "زخارف عربية متناظرة", "نقوش إسلامية متداخلة",
      "زخارف نباتية إسلامية", "نقوش خط عربي", "زخارف قبة الصخرة",
      "أنماط سداسية", "زخارف مثمنة", "نقوش نجمة إسلامية"
    ]
  };
  
  const names = nameTemplates[type] || nameTemplates['islamic-ornaments'];
  return names[(number - 1) % names.length] + ` ${number}`;
};

const getIslamicDescription = (type) => {
  const descriptions = {
    'basic-pinks': "ألوان وردية أساسية • شيفون ناعم • مناسبة لكل المناسبات",
    'christian-dior': "تصميم ديور فاخر • جودة عالية • أناقة كلاسيكية",
    'islamic-ornaments': "زخارف إسلامية تقليدية • تصميم أنيق • روحانية إسلامية",
    'islamic-scarf': "شيفون عالي الجودة • نقوش عربية • مناسب للمناسبات الدينية",
    'ramadan': "تصميم رمضاني خاص • ألوان احتفالية • لشهر الخير والبركة",
    'pattern': "نقش هندسي إسلامي • تناظر جميل • إبداع في التصميم"
  };
  
  return descriptions[type] || "تصميم إسلامي أنيق • جودة عالية • مناسب لكل المناسبات";
};

const getFullIslamicDescription = (type, name) => {
  const fullDescriptions = {
    'basic-pinks': `${name} بألوان وردية ناعمة. شيفون عالي الجودة مع ملمس ناعم وراقي. مناسب للاستخدام اليومي والمناسبات الخاصة.`,
    'christian-dior': `${name} بتوقيع ديور الكلاسيكي. تصميم فاخر يعكس أناقة العلامة الفرنسية الشهيرة، مع خامات ممتازة واهتمام بالتفاصيل.`,
    'islamic-ornaments': `${name} مصمم بتقنيات زخرفية إسلامية تقليدية. يجمع بين الأصالة والأناقة، مع نقوش مستوحاة من التراث الإسلامي العريق. مثالي للارتداء في المناسبات الدينية والاجتماعات المهمة.`,
    'islamic-scarf': `طرحة ${name} المصنوعة من شيفون فاخر بنقوش عربية وأنماط إسلامية. تجمع بين الراحة والأناقة، مع احترام التقاليد الإسلامية في التصميم.`,
    'ramadan': `${name} بمناسبة شهر رمضان المبارك. تصميم خاص يعبر عن فرحة الشهر الكريم، بألوان تناسب روحانية الصيام والعبادة.`,
    'pattern': `${name} بنقش هندسي إسلامي دقيق. يعكس جمال الرياضيات في الفن الإسلامي، مع تناظر وإتقان في التصميم.`
  };
  
  return fullDescriptions[type] || `${name} بتصميم إسلامي أنيق يجمع بين الأصالة والعصرية. مثالي للمسلمات الحديثات اللواتي يقدّرن التراث مع مواكبة الموضة.`;
};

const getIslamicColors = (type) => {
  const colorPalettes = {
    'basic-pinks': [
      { name: "وردي فاتح", value: "#ffb6c1" },
      { name: "وردي غامق", value: "#db7093" },
      { name: "زهري ناعم", value: "#ffc0cb" },
      { name: "وردي مشرق", value: "#ff69b4" }
    ],
    'christian-dior': [
      { name: "أسود ديور", value: "#000000" },
      { name: "أبيض نقي", value: "#ffffff" },
      { name: "بيج فاخر", value: "#f5f5dc" },
      { name: "أحمر داكن", value: "#8b0000" }
    ],
    'islamic-ornaments': [
      { name: "ذهبي إسلامي", value: "#d4af37" },
      { name: "أخضر إسلامي", value: "#228b22" },
      { name: "أزرق تركي", value: "#1e56a0" },
      { name: "أحمر عثماني", value: "#8b0000" }
    ],
    'islamic-scarf': [
      { name: "أبيض نقي", value: "#ffffff" },
      { name: "أسود أنيق", value: "#000000" },
      { name: "بيج هادئ", value: "#f5f5dc" },
      { name: "أخضر زيتوني", value: "#808000" }
    ],
    'ramadan': [
      { name: "أخضر رمضان", value: "#006400" },
      { name: "أبيض الصيام", value: "#f8f8ff" },
      { name: "ذهبي القمر", value: "#ffd700" },
      { name: "أرجواني روحاني", value: "#800080" }
    ],
    'pattern': [
      { name: "ذهب ونيلي", value: "#d4af37" },
      { name: "أحمر وأبيض", value: "#8b0000" },
      { name: "أزرق وفضي", value: "#1e56a0" },
      { name: "أخضر وذهبي", value: "#228b22" }
    ]
  };
  
  return colorPalettes[type] || colorPalettes['islamic-ornaments'];
};

const getBackgroundColor = (type, number) => {
  const colors = {
    'basic-pinks': ['bg-[#ffe6e6]', 'bg-[#ffd6d6]', 'bg-[#ffc6c6]', 'bg-[#ffb6b6]'],
    'christian-dior': ['bg-[#f0f8ff]', 'bg-[#e6f3ff]', 'bg-[#d9edff]', 'bg-[#cce8ff]'],
    'islamic-ornaments': ['bg-[#fffaf0]', 'bg-[#f5f5f5]', 'bg-[#f8f8ff]', 'bg-[#fff8dc]'],
    'islamic-scarf': ['bg-[#e6f3ff]', 'bg-[#fff0f5]', 'bg-[#f0fff0]', 'bg-[#fff5e6]'],
    'ramadan': ['bg-[#f0fff0]', 'bg-[#fffaf0]', 'bg-[#e6e6fa]', 'bg-[#ffe4e1]'],
    'pattern': ['bg-[#f5f5f5]', 'bg-[#f5fffa]', 'bg-[#f0ffff]', 'bg-[#fffaf0]']
  };
  
  const palette = colors[type] || colors['islamic-ornaments'];
  return palette[number % palette.length];
};

const getProductSizes = (type) => {
  const sizes = {
    'scarf': ["(180*90)", "(190*95)"],
    'default': ["(195*70)", "(200*75)", "(185*65)"]
  };
  
  return type.includes('scarf') ? sizes.scarf : sizes.default;
};

const getMaterial = (type) => {
  const materials = {
    'basic-pinks': "شيفون قطني 100%",
    'christian-dior': "شيفون حريري فاخر",
    'islamic-ornaments': "شيفون مصري عالي الجودة مع طباعة ذهبية",
    'islamic-scarf': "شيفون ناعم مخلوط",
    'ramadan': "شيفون خاص مع طباعة احتفالية",
    'pattern': "شيفون مع طباعة هندسية دقيقة"
  };
  
  return materials[type] || "شيفون عالي الجودة";
};

const getCareInstructions = (type) => {
  const care = {
    'christian-dior': "تنظيف جاف فقط. لا تغسل. لا تكي.",
    'default': "غسل يدوي بماء فاتر. تجنب الشمس المباشرة. كي على حرارة منخفضة."
  };
  
  return care[type] || care.default;
};

const getProductWeight = (type) => {
  return type.includes('scarf') ? "120-150 جرام" : "100-130 جرام";
};

const getProductDimensions = (type) => {
  return type.includes('scarf') ? "90×180 سم" : "70×195 سم";
};

const generateTags = (type) => {
  const tagSets = {
    'basic-pinks': ["وردي", "أساسي", "يومي", "ناعم"],
    'christian-dior': ["ديور", "فاخر", "علامة تجارية", "رفاهية"],
    'islamic-ornaments': ["إسلامي", "زخارف", "ذهبي", "تراثي"],
    'islamic-scarf': ["طرحة", "إسلامي", "مريح", "عملي"],
    'ramadan': ["رمضان", "روحاني", "موسمي", "احتفالي"],
    'pattern': ["هندسي", "إسلامي", "رياضي", "فني"]
  };
  
  const baseTags = tagSets[type] || tagSets['islamic-ornaments'];
  const additionalTags = ["جديد", "مشهور", "مميز"];
  
  return [...baseTags, ...additionalTags.slice(0, 1)];
};

// دالة جديدة لتصحيح المسارات بناءً على المجموعة
const getCollectionPaths = (collectionType, collectionNumber) => {
  const paths = {
    'basic-pinks': {
      basePath: '/Img/Collections/01-Basic-Pinks/01-Basic-Pinks-Grading-Colours',
      folderFormat: number => `${number.toString().padStart(2, '0')}-Basic-Pinks-Collection`
    },
    'christian-dior': {
      basePath: '/Img/Collections/02-Christian-Dior',
      folderFormat: number => `${number.toString().padStart(2, '0')}-Christian-Dior-Collection`
    },
    'islamic-ornaments': {
      basePath: '/Img/Collections/03-Islamic-Ornaments',
      folderFormat: number => `${number.toString().padStart(2, '0')}-Islamic-Ornaments-Collection`
    },
    'islamic-scarf': {
      basePath: '/Img/Collections/04-Islamic-Scarf',
      folderFormat: number => `${number.toString().padStart(2, '0')}-Islamic-Scarf-Collection`
    },
    'ramadan': {
      basePath: '/Img/Collections/05-Ramadan',
      folderFormat: number => `${number.toString().padStart(2, '0')}-Ramadan-Collection`
    },
    'pattern': {
      basePath: '/Img/Collections/06-Pattern',
      folderFormat: number => `${number.toString().padStart(2, '0')}-Pattern Collection`
    },
    'special-edition': {
      basePath: '/Img/Collections/07-Special-Edition',
      folderFormat: number => `${number.toString().padStart(2, '0')}-Special-Edition-Collection`
    }
  };
  
  const collectionPaths = paths[collectionType] || paths['islamic-ornaments'];
  const folderName = collectionPaths.folderFormat(collectionNumber);
  
  return {
    basePath: collectionPaths.basePath,
    folderName: folderName,
    mainImage: `${collectionPaths.basePath}/${folderName}/Main.jpeg`,
    getImagePath: (imageNumber) => `${collectionPaths.basePath}/${folderName}/${imageNumber.toString().padStart(2, '0')}.jpeg`
  };
};

// 1. قاعدة البيانات الرئيسية للمنتجات مع التصحيحات
const productDatabase = {
  // المجموعة 1: Basic Pinks
  'basic-pinks': {
    name: 'ألوان أساسية',
    nameEn: 'Basic Pinks',
    basePath: '/Img/Collections/01-Basic-Pinks/01-Basic-Pinks-Grading-Colours',
    productCount: 6, // فقط 06 مجلدات كما قلت
    price: "120EGP",
    description: "ألوان أساسية متنوعة",
    category: "ألوان أساسية"
  },
  
  // المجموعة 2: Christian Dior
  'christian-dior': {
    name: 'كريستيان ديور',
    nameEn: 'Christian Dior',
    basePath: '/Img/Collections/02-Christian-Dior',
    productCount: 6, // حسب ما لديك
    price: "150EGP",
    description: "تصاميم مستوحاة من كريستيان ديور",
    category: "علامات تجارية"
  },
  
  // المجموعة 3: Islamic Ornaments
  'islamic-ornaments': {
    name: 'زخارف إسلامية',
    nameEn: 'Islamic Ornaments',
    basePath: '/Img/Collections/03-Islamic-Ornaments',
    productCount: 6, // فقط 06 مجلدات كما قلت
    price: "130EGP",
    description: "زخارف إسلامية تقليدية وأنيقة",
    category: "زخارف إسلامية"
  },
  
  // المجموعة 4: Islamic Scarf
  'islamic-scarf': {
    name: 'طرح إسلامية',
    nameEn: 'Islamic Scarves',
    basePath: '/Img/Collections/04-Islamic-Scarf',
    productCount: 1, // مجلد واحد فقط كما قلت
    price: "130EGP",
    description: "طرح إسلامية بتصاميم عصرية",
    category: "طرح إسلامية"
  },
  
  // المجموعة 5: Ramadan
  'ramadan': {
    name: 'مجموعة رمضان',
    nameEn: 'Ramadan Collection',
    basePath: '/Img/Collections/05-Ramadan',
    productCount: 4, // 04 مجلدات كما قلت
    price: "140EGP",
    description: "تصاميم خاصة لشهر رمضان المبارك",
    category: "مجموعة رمضان"
  },
  
  // المجموعة 6: Pattern
  'pattern': {
    name: 'أنماط إسلامية',
    nameEn: 'Islamic Patterns',
    basePath: '/Img/Collections/06-Pattern',
    productCount: 4, // 04 مجلدات كما قلت
    price: "130EGP",
    description: "أنماط هندسية إسلامية",
    category: "أنماط إسلامية"
  }
};

// 2. توليد جميع المنتجات تلقائياً مع المسارات الصحيحة
const generateAllProducts = () => {
  const allProducts = [];
  let productId = 1;
  
  // المرور على كل مجموعة في قاعدة البيانات
  Object.entries(productDatabase).forEach(([collectionType, collectionData]) => {
    const { productCount, price, category } = collectionData;
    
    // توليد منتجات لكل مجموعة
    for (let collectionNumber = 1; collectionNumber <= productCount; collectionNumber++) {
      // الحصول على المسارات الصحيحة
      const paths = getCollectionPaths(collectionType, collectionNumber);
      
      // توليد اسم المنتج
      const productName = generateProductName(collectionType, collectionNumber);
      
      // توليد صور إضافية (0-4 صور حسب توفرها)
      const additionalImages = [];
      for (let i = 1; i <= 4; i++) {
        const imagePath = paths.getImagePath(i);
        additionalImages.push(imagePath);
      }
      
      // إنشاء المنتج
      const product = {
        id: productId++,
        name: productName,
        price: price,
        description: getIslamicDescription(collectionType),
        fullDescription: getFullIslamicDescription(collectionType, productName),
        image: paths.mainImage,
        category: category,
        collectionType: collectionType,
        collectionNumber: collectionNumber,
        collectionName: collectionData.name,
        printed: true,
        bgColor: getBackgroundColor(collectionType, collectionNumber),
        colors: getIslamicColors(collectionType),
        sizes: getProductSizes(collectionType),
        material: getMaterial(collectionType),
        care: getCareInstructions(collectionType),
        rating: (4.5 + Math.random() * 0.5).toFixed(1),
        reviews: Math.floor(Math.random() * 200) + 50,
        inStock: Math.random() > 0.1, // 90% في المخزون
        images: [paths.mainImage, ...additionalImages].slice(0, 5), // أخذ أول 5 صور فقط
        hasOffer: collectionNumber % 3 === 0, // عرض خاص كل 3 منتجات
        tags: generateTags(collectionType),
        createdAt: new Date().toISOString(),
        popularity: Math.floor(Math.random() * 1000),
        // حقول إضافية
        weight: getProductWeight(collectionType),
        dimensions: getProductDimensions(collectionType),
        origin: "مصر",
        deliveryTime: "2-5 أيام عمل",
        warranty: "ضمان الجودة لمدة 3 أشهر",
        relatedProducts: []
      };
      
      allProducts.push(product);
    }
  });
  
  return allProducts;
};

// 3. توليد جميع المنتجات
export const allProducts = generateAllProducts();

// 4. دالات التصدير
export const products = allProducts; // للتوافق مع الكود القديم

// 5. دالة للبحث في جميع المنتجات
export const searchAllProducts = (query, filters = {}) => {
  let results = [...allProducts];
  
  // البحث النصي
  if (query) {
    const searchTerm = query.toLowerCase();
    results = results.filter(product => 
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm) ||
      product.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
      product.collectionName.toLowerCase().includes(searchTerm)
    );
  }
  
  // التصفية حسب الفئة
  if (filters.category && filters.category !== 'all') {
    results = results.filter(product => product.category === filters.category);
  }
  
  // التصفية حسب المجموعة
  if (filters.collection && filters.collection !== 'all') {
    results = results.filter(product => product.collectionType === filters.collection);
  }
  
  // التصفية حسب السعر
  if (filters.minPrice || filters.maxPrice) {
    const min = filters.minPrice || 0;
    const max = filters.maxPrice || Infinity;
    results = results.filter(product => {
      const price = parseFloat(product.price.replace('EGP', '').trim());
      return price >= min && price <= max;
    });
  }
  
  // التصفية حسب التوفر
  if (filters.inStock) {
    results = results.filter(product => product.inStock);
  }
  
  // التصفية حسب العروض
  if (filters.hasOffer) {
    results = results.filter(product => product.hasOffer);
  }
  
  // الفرز
  if (filters.sortBy) {
    switch(filters.sortBy) {
      case 'price-asc':
        results.sort((a, b) => parseFloat(a.price.replace('EGP', '')) - parseFloat(b.price.replace('EGP', '')));
        break;
      case 'price-desc':
        results.sort((a, b) => parseFloat(b.price.replace('EGP', '')) - parseFloat(a.price.replace('EGP', '')));
        break;
      case 'popularity':
        results.sort((a, b) => b.popularity - a.popularity);
        break;
      case 'rating':
        results.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
    }
  }
  
  return results;
};

// 6. دالة للحصول على إحصائيات ديناميكية
export const getDynamicStats = () => {
  const stats = {
    totalProducts: allProducts.length,
    categories: {},
    collections: {},
    priceRange: {
      min: Infinity,
      max: 0,
      average: 0
    }
  };
  
  // حساب إحصائيات الفئات
  allProducts.forEach(product => {
    // الفئات
    if (!stats.categories[product.category]) {
      stats.categories[product.category] = 0;
    }
    stats.categories[product.category]++;
    
    // المجموعات
    if (!stats.collections[product.collectionType]) {
      stats.collections[product.collectionType] = {
        count: 0,
        name: product.collectionName
      };
    }
    stats.collections[product.collectionType].count++;
    
    // نطاق السعر
    const price = parseFloat(product.price.replace('EGP', '').trim());
    stats.priceRange.min = Math.min(stats.priceRange.min, price);
    stats.priceRange.max = Math.max(stats.priceRange.max, price);
  });
  
  // حساب متوسط السعر
  const totalPrice = allProducts.reduce((sum, product) => {
    return sum + parseFloat(product.price.replace('EGP', '').trim());
  }, 0);
  stats.priceRange.average = (totalPrice / allProducts.length).toFixed(2);
  
  return stats;
};

// 7. دالة لتحديث عدد المنتجات في مجموعة معينة
export const updateCollectionCount = (collectionType, newCount) => {
  if (productDatabase[collectionType]) {
    productDatabase[collectionType].productCount = newCount;
    console.log(`تم تحديث عدد منتجات ${collectionType} إلى ${newCount}`);
  }
};

// 8. دالة لإضافة مجموعة جديدة ديناميكياً
export const addNewCollection = (collectionData) => {
  const { id, name, nameEn, basePath, productCount, price, description, category } = collectionData;
  
  productDatabase[id] = {
    name,
    nameEn,
    basePath,
    productCount,
    price,
    description,
    category
  };
  
  console.log(`تمت إضافة المجموعة الجديدة: ${name}`);
};

// 9. دالة لتحميل المزيد من المنتجات (للتقسيم)
export const loadMoreProducts = (offset = 0, limit = 12) => {
  return allProducts.slice(offset, offset + limit);
};

// 10. تصدير قاعدة بيانات المجموعات
export const collections = Object.entries(productDatabase).map(([id, data]) => ({
  id,
  name: data.name,
  nameEn: data.nameEn,
  count: data.productCount,
  description: data.description,
  price: data.price,
  category: data.category,
  image: getCollectionPaths(id, 1).mainImage // استخدام المسار الصحيح
}));

// 11. تصدير الفئات الديناميكية
export const dynamicCategories = Object.values(productDatabase).reduce((acc, collection) => {
  if (!acc.find(cat => cat.name === collection.category)) {
    acc.push({
      id: collection.category.replace(/\s+/g, '-').toLowerCase(),
      name: collection.category,
      count: allProducts.filter(p => p.category === collection.category).length
    });
  }
  return acc;
}, []);

// 12. دالة لتصفية المنتجات حسب النوع (للتوافق مع الكود القديم)
export const filterProductsByType = (type) => {
  switch(type) {
    case 'all':
      return allProducts;
    case 'islamic-ornaments':
      return allProducts.filter(p => p.collectionType === 'islamic-ornaments');
    case 'islamic-scarf':
      return allProducts.filter(p => p.collectionType === 'islamic-scarf');
    case 'ramadan':
      return allProducts.filter(p => p.collectionType === 'ramadan');
    case 'pattern':
      return allProducts.filter(p => p.collectionType === 'pattern');
    case 'offer':
      return allProducts.filter(p => p.hasOffer === true);
    default:
      return allProducts.filter(p => p.category === type);
  }
};

// 13. دالة للبحث في المنتجات (للتوافق مع الكود القديم)
export const searchProducts = (query, filteredProducts = allProducts) => {
  const searchTerm = query.toLowerCase();
  return filteredProducts.filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm) ||
    product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  );
};

// 14. دالة للحصول على منتجات مجموعة معينة
export const getProductsByCollection = (collectionId) => {
  return allProducts.filter(product => product.collectionType === collectionId);
};

// 15. دالة للحصول على المنتجات الأكثر مبيعاً
export const getBestSellingProducts = (limit = 6) => {
  return [...allProducts]
    .sort((a, b) => b.reviews - a.reviews)
    .slice(0, limit);
};

// 16. دالة للحصول على المنتجات ذات العروض
export const getProductsWithOffers = () => {
  return allProducts.filter(product => product.hasOffer);
};

// 17. دالة للحصول على السعر بناءً على نوع المجموعة
export const getProductPrice = (product) => {
  const priceMap = {
    'basic-pinks': "120EGP",
    'christian-dior': "150EGP",
    'islamic-ornaments': "130EGP",
    'islamic-scarf': "130EGP",
    'ramadan': "140EGP",
    'pattern': "130EGP"
  };
  
  return priceMap[product.collectionType] || "130EGP";
};

// 18. دالة لتصفية المنتجات حسب السعر
export const filterProductsByPrice = (min, max) => {
  return allProducts.filter(product => {
    const priceStr = product.price.replace('EGP', '').trim();
    const price = parseFloat(priceStr);
    return price >= min && price <= max;
  });
};

// 19. دالة لترجمة الفئات للعربية والإنجليزية
export const translateCategory = (category, language = 'ar') => {
  const translations = {
    'ar': {
      'ألوان أساسية': 'ألوان أساسية',
      'علامات تجارية': 'علامات تجارية',
      'زخارف إسلامية': 'زخارف إسلامية',
      'طرح إسلامية': 'طرح إسلامية',
      'مجموعة رمضان': 'مجموعة رمضان',
      'أنماط إسلامية': 'أنماط إسلامية',
      'عروض خاصة': 'عروض خاصة'
    },
    'en': {
      'ألوان أساسية': 'Basic Pinks',
      'علامات تجارية': 'Brands',
      'زخارف إسلامية': 'Islamic Ornaments',
      'طرح إسلامية': 'Islamic Scarves',
      'مجموعة رمضان': 'Ramadan Collection',
      'أنماط إسلامية': 'Islamic Patterns',
      'عروض خاصة': 'Special Offers'
    }
  };
  
  return translations[language][category] || category;
};

// 20. إحصائيات المنتجات
export const productStats = {
  total: allProducts.length,
  inStock: allProducts.filter(p => p.inStock).length,
  withOffers: allProducts.filter(p => p.hasOffer).length,
  averageRating: (allProducts.reduce((sum, p) => sum + parseFloat(p.rating), 0) / allProducts.length).toFixed(1),
  totalReviews: allProducts.reduce((sum, p) => sum + p.reviews, 0),
  totalPopularity: allProducts.reduce((sum, p) => sum + p.popularity, 0)
};

// 21. دالة لعرض جميع المنتجات في الكونسول مع مساراتها
export const logAllProductsWithPaths = () => {
  console.log('📋 === جميع المنتجات مع المسارات الصحيحة ===');
  console.log(`إجمالي المنتجات: ${allProducts.length}`);
  
  // عرض حسب المجموعات
  collections.forEach(collection => {
    console.log(`\n📁 المجموعة: ${collection.name} (${collection.id})`);
    console.log(`   عدد المنتجات: ${collection.count}`);
    
    const productsInCollection = allProducts.filter(p => p.collectionType === collection.id);
    productsInCollection.forEach((product, index) => {
      console.log(`\n   📦 المنتج #${index + 1}:`);
      console.log(`      ID: ${product.id}`);
      console.log(`      الاسم: ${product.name}`);
      console.log(`      رقم المجلد: ${product.collectionNumber}`);
      console.log(`      الصورة الرئيسية: ${product.image}`);
      
      // عرض المسار الصحيح
      const paths = getCollectionPaths(collection.id, product.collectionNumber);
      console.log(`      المسار الصحيح: ${paths.basePath}/${paths.folderName}/`);
    });
  });
  
  console.log('\n📊 === إحصائيات المجموعات ===');
  collections.forEach(collection => {
    const productsInCollection = allProducts.filter(p => p.collectionType === collection.id);
    console.log(`   ${collection.name}: ${productsInCollection.length} منتج`);
  });
};

console.log(`✅ تم تحميل ${allProducts.length} منتج من ${collections.length} مجموعة مختلفة`);
console.log(`📊 إجمالي المنتجات: ${allProducts.length}`);

// عرض المسارات الصحيحة
logAllProductsWithPaths();

// =============================================
// كيفية الاستخدام:
// =============================================

/*
1. لعرض جميع المنتجات في الكونسول:
logAllProductsWithPaths();

2. للحصول على مسار صحيح لأي مجموعة:
const paths = getCollectionPaths('islamic-ornaments', 3);
console.log(paths.mainImage); // /Img/Collections/03-Islamic-Ornaments/03-Islamic-Ornaments-Collection/Main.jpeg

3. لزيادة عدد المنتجات في مجموعة موجودة:
updateCollectionCount('islamic-ornaments', 10);

4. لإضافة مجموعة جديدة:
addNewCollection({
  id: 'winter-collection',
  name: 'مجموعة الشتاء',
  nameEn: 'Winter Collection',
  basePath: '/Img/Collections/08-Winter',
  productCount: 8,
  price: "160EGP",
  description: "تصاميم شتوية دافئة",
  category: "موسمية"
});

5. للبحث المتقدم:
const results = searchAllProducts('ذهبي', {
  category: 'زخارف إسلامية',
  minPrice: 100,
  maxPrice: 200,
  sortBy: 'price-asc'
});
*/