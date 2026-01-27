// توليد أرقام عشوائية للصور لتنويع المنتجات
const generateRandomImages = (baseNumber, count = 3) => {
  const images = [];
  // استخدام الصورة الأساسية
  images.push(`/img/${baseNumber}.jpeg`);
  // إضافة صور إضافية بشكل عشوائي من المجموعة
  for (let i = 1; i < count; i++) {
    const randomImage = Math.floor(Math.random() * 68) + 1;
    images.push(`/img/${randomImage}.jpeg`);
  }
  return images;
};

export const products = [
  {
    id: 1,
    name: "كوارتز روز شيفون",
    price: "100EGP",
    description: "خفيف الوزن • منفوش • شبه شفاف",
    fullDescription: "حجاب الشيفون الممتاز المصنوع من 100% شيفون حرير. خفيف كالهواء بتدليه جميل يتحرك برشاقة معك. مثالي للارتداء اليومي والمناسبات الخاصة. اللون الوردي الكوارتزي الرقيق يلائم جميع درجات البشرة ويمكن تنسيقه بشكل أنيق أو بسيط.",
    image: "/img/1.jpeg",
    category: "شيفون",
    bgColor: "bg-[#f3e9e5]",
    colors: [
      { name: "كوارتز وردي", value: "#e5d5d5" },
      { name: "وردي خجول", value: "#f4e7d3" },
      { name: "نعناعي", value: "#d9e2e5" },
      { name: "لافندر", value: "#e6d4f7" }
    ],
    sizes: ["(195*70)"],
    material: "100% شيفون حرير",
    care: "غسل يدوي بماء بارد، تنشيف على سطح مستو، كي على حرارة منخفضة",
    rating: 4.8,
    reviews: 124,
    inStock: true,
    images: generateRandomImages(1),
    hasOffer: true // عرض على هذا المنتج
  },
  {
    id: 2,
    name: "شوفان جيرسي ممتاز",
    price: "100EGP",
    description: "مطاط • قابل للتنفس • غير منزلق",
    fullDescription: "مصنوع من مزيج قطني جيرسي ممتاز يوفر مطاطية مثالية واستعادة الشكل. النسيج غير المنزلق يضمن بقاءه في مكانه طوال اليوم دون دبابيس. مثالي لأسلوب الحياة النشط، العمل، أو إنجاز المهام. اللون الشوفاني محايد متناسق مع كل شيء.",
    image: "/img/2.jpeg",
    category: "شيفون",
    bgColor: "bg-[#e9e4e0]",
    colors: [
      { name: "شوفان", value: "#d4c8be" },
      { name: "فحمي", value: "#5c5450" },
      { name: "بني فاتح", value: "#8a7f70" }
    ],
    sizes: ["قاس واحد (مطاط)"],
    material: "95% قطن، 5% سباندكس",
    care: "غسيل آلي بماء بارد، تنشيف على حرارة منخفضة، لا تستخدم المبيض",
    rating: 4.9,
    reviews: 89,
    inStock: true,
    images: generateRandomImages(2),
    hasOffer: false // لا يوجد عرض
  },
  {
    id: 3,
    name: "رمادي أردواز شيفون",
    price: "100EGP",
    description: "صديق للبيئة • ناعم • يتدلى بشكل جميل",
    fullDescription: "حجاب الشيفون الصديق للبيئة المصنوع من مواد عضوية. ناعم بشكل لا يصدق بتدليه فاخر يشبه الجلد الثاني. اللون الرمادي الأردوازي أنيق ويعمل للمناسبات العادية والرسمية. مثالي للبشرة الحساسة.",
    image: "/img/3.jpeg",
    category: "شيفون",
    bgColor: "bg-[#f0f0f0]",
    colors: [
      { name: "رمادي أردوازي", value: "#7d8285" },
      { name: "كحلي", value: "#2d1a1e" },
      { name: "أزرق غبارى", value: "#a3b5c8" }
    ],
    sizes: ["(195*70)"],
    material: "100% شيفون عضوي",
    care: "غسيل آلي لطيف، تنشيف على حبل، كي على حرارة متوسطة",
    rating: 4.7,
    reviews: 67,
    inStock: true,
    images: generateRandomImages(3),
    hasOffer: true // عرض على هذا المنتج
  },
  {
    id: 4,
    name: "وشاح شيفون وردي خجول",
    price: "100EGP",
    description: "100% شيفون نقي • لمعان أنيق",
    fullDescription: "حجاب شيفون فاخر 100% شيفون نقي مع لمعان طبيعي جميل. اللون الوردي الخجول مناسب للجميع ويضيف لمسة أنيقة لأي زي. الحواف الملفوفة يدوياً والنسيج خفيف الوزن يجعل هذا عرضنا الأكثر فخامة.",
    image: "/img/4.jpeg",
    category: "شيفون",
    bgColor: "bg-[#fdf2f2]",
    colors: [
      { name: "وردي خجول", value: "#f9dbdb" },
      { name: "عاجي", value: "#fffaf0" },
      { name: "وردي ذهبي", value: "#e6b8b2" }
    ],
    sizes: ["كبير (70x200سم)"],
    material: "100% شيفون توت",
    care: "تنظيف جاف فقط أو غسل يدوي بمنظف خاص للشيفون",
    rating: 4.9,
    reviews: 203,
    inStock: true,
    images: generateRandomImages(4),
    hasOffer: false // لا يوجد عرض
  },
  {
    id: 5,
    name: "حجاب شيفون زمردي",
    price: "100EGP",
    description: "لا يحتاج كي • مناسب للسفر • سهل العناية",
    fullDescription: "نسيج كرينكل لا يحتاج إلى كي وهو مثالي للسفر. اللون الزمردي الجميل يترك انطباعاً بينما يجعل النسيج سهل العناية الحياة أبسط. رائع للمبتدئين والنساء المشغولات.",
    image: "/img/5.jpeg",
    category: "شيفون",
    bgColor: "bg-[#e8f5e9]",
    colors: [
      { name: "زمردي", value: "#50c878" },
      { name: "بترولي", value: "#008080" },
      { name: "غابي", value: "#228B22" }
    ],
    sizes: ["قاس واحد (60x180سم)"],
    material: "100% بوليستر كرينكل",
    care: "غسيل آلي، تنشيف على حرارة منخفضة، لا يحتاج كي",
    rating: 4.6,
    reviews: 56,
    inStock: true,
    images: generateRandomImages(5),
    hasOffer: true // عرض على هذا المنتج
  },
  {
    id: 6,
    name: "مزيج شيفون قطني",
    price: "100EGP",
    description: "قابل للتنفس • طبيعي • نسيج مجعد",
    fullDescription: "مزيج مثالي من القطن والكتان لأقصى قدر من التنفس. النسيج المجعد الطبيعي يضيف شخصية والنسيج يصبح أكثر نعومة مع كل غسلة. مثالي للصيف والمناخات الدافئة.",
    image: "/img/6.jpeg",
    category: "شيفون",
    bgColor: "bg-[#f5f1e6]",
    colors: [
      { name: "طبيعي", value: "#f5f1e6" },
      { name: "تراكوتا", value: "#e2725b" },
      { name: "ملفوفي", value: "#9caf88" }
    ],
    sizes: ["(195*70)", "(210*70)"],
    material: "50% قطن، 50% كتان",
    care: "غسيل آلي بماء بارد، تنشيف على حبل، كي وهو رطب",
    rating: 4.5,
    reviews: 42,
    inStock: true,
    images: generateRandomImages(6),
    hasOffer: false // لا يوجد عرض
  },
  {
    id: 7,
    name: "حجاب شيفون شتوي",
    price: "100EGP",
    description: "دافئ • فاخر • أساسي شتوي",
    fullDescription: "حجاب مخمل مفروش مثالي للطقس البارد. يوفر الدفء دون الحجم وله ملمس فاخر. اللون العنابي العميق مثالي لموسم الأعياد والمناسبات الشتوية الخاصة.",
    image: "/img/7.jpeg",
    category: "شيفون",
    bgColor: "bg-[#f8e8e8]",
    colors: [
      { name: "عنابي", value: "#800020" },
      { name: "كحلي", value: "#000080" },
      { name: "زمردي", value: "#046307" }
    ],
    sizes: ["(195*70)"],
    material: "100% مخمل قطني",
    care: "تنظيف جاف فقط أو غسل يدوي بماء بارد",
    rating: 4.8,
    reviews: 78,
    inStock: true,
    images: generateRandomImages(7),
    hasOffer: true // عرض على هذا المنتج
  },
  {
    id: 8,
    name: "حجاب شيفون للمساء",
    price: "100EGP",
    description: "أنيق • متدفق • للمناسبات المسائية",
    fullDescription: "حجاب شيفون أنيق بتدليه جميل للمناسبات المسائية والمناسبات الخاصة. النسيج له شفافية خفيفة تلتقط الضوء بشكل جميل. مثالي لحفلات الزفاف، الحفلات، والفعاليات الرسمية.",
    image: "/img/8.jpeg",
    category: "شيفون",
    bgColor: "bg-[#f9f3ff]",
    colors: [
      { name: "ذهبي", value: "#ffd700" },
      { name: "فضي", value: "#c0c0c0" },
      { name: "وردي", value: "#ff007f" }
    ],
    sizes: ["(195*70)"],
    material: "100% بوليستر شيفون",
    care: "غسل يدوي بماء بارد، تنشيف على حبل، تبخير لإزالة التجاعيد",
    rating: 4.7,
    reviews: 91,
    inStock: true,
    images: generateRandomImages(8),
    hasOffer: false // لا يوجد عرض
  },
  {
    id: 9,
    name: "مجموعة شيفون بألوان الباستيل",
    price: "100EGP",
    description: "باستيل ناعم • مجموعة 3 قطع • متنوعة",
    fullDescription: "مجموعة جميلة من ثلاثة حجاب شيفون بألوان الباستيل المتناسقة. مثالية لخلق مظاهر متعددة باستثمار بسيط. كل حجاب خفيف الوزن ويتدلى بشكل جميل.",
    image: "/img/9.jpeg",
    category: "شيفون",
    bgColor: "bg-[#f8f0f8]",
    colors: [
      { name: "لافندر", value: "#e6d4f7" },
      { name: "نعناعي", value: "#d9e2e5" },
      { name: "خوخي", value: "#ffdab9" }
    ],
    sizes: ["(195*70)"],
    material: "100% شيفون حرير",
    care: "غسل يدوي بماء بارد بشكل منفصل، تنشيف على سطح مستو",
    rating: 4.9,
    reviews: 145,
    inStock: true,
    images: generateRandomImages(9),
    hasOffer: true // عرض على هذا المنتج
  },
  {
    id: 10,
    name: "حجاب شيفون بامبو",
    price: "100EGP",
    description: "مستدام • ناعم للغاية • مضاد للبكتيريا",
    fullDescription: "مصنوع من ألياف البامبو المستدامة، هذا الحجاب الشيفون ناعم للغاية وله خصائص مضادة للبكتيريا طبيعية. مثالي للبشرة الحساسة والمتسوقات الواعيات بيئياً.",
    image: "/img/10.jpeg",
    category: "شيفون",
    bgColor: "bg-[#e8f5e9]",
    colors: [
      { name: "طبيعي", value: "#f5f1e6" },
      { name: "أزرق سماوي", value: "#87ceeb" },
      { name: "وردي غبارى", value: "#dc9a9a" }
    ],
    sizes: ["(195*70)"],
    material: "100% بامبو فيسكوز",
    care: "غسيل آلي بماء بارد، تنشيف على حبل، لا تنشف في المجفف",
    rating: 4.8,
    reviews: 67,
    inStock: true,
    images: generateRandomImages(10),
    hasOffer: false // لا يوجد عرض
  },
  {
    id: 11,
    name: "شيفون أزرق ملكي",
    price: "100EGP",
    description: "لون غني • شعور فاخر • قابل للتنفس",
    fullDescription: "حجاب شيفون أزرق ملكي عميق يترك انطباعاً. اللون الغني يتناسق بشكل جميل مع الملابس المحايدة ونسيج الشيفون يشعر بالفخامة على الجلد.",
    image: "/img/11.jpeg",
    category: "شيفون",
    bgColor: "bg-[#e8eaf6]",
    colors: [
      { name: "أزرق ملكي", value: "#4169e1" },
      { name: "كحلي", value: "#000080" },
      { name: "بترولي", value: "#008080" }
    ],
    sizes: ["(195*70)"],
    material: "100% شيفون",
    care: "غسيل آلي لطيف، تنشيف على حبل، كي على حرارة منخفضة",
    rating: 4.6,
    reviews: 89,
    inStock: true,
    images: generateRandomImages(11),
    hasOffer: true // عرض على هذا المنتج
  },
  {
    id: 12,
    name: "شيفون مطرز بالذهب",
    price: "100EGP",
    description: "مطرز يدوياً • فخم • للمناسبات الخاصة",
    fullDescription: "حجاب شيفون رائع مطرز يدوياً بتفاصيل خيوط ذهبية. كل قطعة فريدة وتستغرق ساعات من الحرفية الماهرة. مثالي لحفلات الزفاف، العيد، والاحتفالات الخاصة.",
    image: "/img/12.jpeg",
    category: "شيفون",
    bgColor: "bg-[#fffaf0]",
    colors: [
      { name: "عاجي", value: "#fffaf0" },
      { name: "ذهبي", value: "#ffd700" }
    ],
    sizes: ["(195*70)"],
    material: "100% شيفون مع خيوط ذهبية",
    care: "تنظيف جاف فقط",
    rating: 4.9,
    reviews: 203,
    inStock: true,
    images: generateRandomImages(12),
    hasOffer: false // لا يوجد عرض
  }
];

// إنشاء المزيد من المنتجات باستخدام الصور المتبقية
for (let i = 13; i <= 20; i++) {
  // جعل نصف المنتجات عليها عرض والنصف الآخر بدون
  const hasOffer = i % 2 === 0;
  
  const productNames = [
    "شيفون كلاسيكي",
    "شيفون أنيق",
    "شيفون عصري",
    "شيفون فاخر",
    "شيفون خفيف",
    "شيفون مريح",
    "شيفون أنيق",
    "شيفون مميز"
  ];
  
  const randomNameIndex = (i - 13) % productNames.length;
  
  products.push({
    id: i,
    name: `${productNames[randomNameIndex]} ${i}`,
    price: "100EGP",
    description: "جودة ممتازة • تدليه جميل • مريح",
    fullDescription: `حجاب شيفون جميل مصنوع من مواد ممتازة. مثالي للارتداء اليومي بتناسب مريح وتدليه أنيق.`,
    image: `/img/${i}.jpeg`,
    category: "شيفون",
    bgColor: "bg-[#f5f5f5]",
    colors: [
      { name: "كلاسيكي", value: "#f5f5f5" },
      { name: "أنيق", value: "#d4c8be" },
      { name: "عصري", value: "#7d8285" }
    ],
    sizes: ["(195*70)"],
    material: "نسيج شيفون ممتاز",
    care: "اتبع تعليمات العناية للحصول على أفضل النتائج",
    rating: 4.5 + Math.random() * 0.4,
    reviews: Math.floor(Math.random() * 100) + 20,
    inStock: Math.random() > 0.1,
    images: generateRandomImages(i),
    hasOffer: hasOffer
  });
}

// حساب عدد المنتجات في كل فئة
export const categories = [
  { id: 1, name: "شيفون", count: products.filter(p => p.category === "شيفون").length },
  { id: 2, name: "عرض", count: products.filter(p => p.hasOffer === true).length }
];

// دالة لترجمة الفئات للعربية والإنجليزية
export const translateCategory = (category, language = 'ar') => {
  const translations = {
    'ar': {
      'شيفون': 'شيفون',
      'عرض': 'عرض'
    },
    'en': {
      'شيفون': 'Chiffon',
      'عرض': 'Offer'
    }
  };
  
  return translations[language][category] || category;
};