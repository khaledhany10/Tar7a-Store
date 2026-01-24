// توليد أرقام عشوائية للصور لتنويع المنتجات
const generateRandomImages = (baseNumber, count = 3) => {
  const images = [];
  // استخدام الصورة الأساسية
  images.push(`/img/${baseNumber}.jpeg`);
  // إضافة صور إضافية بشكل عشوائي من المجموعة
  for (let i = 1; i < count; i++) {
    const randomImage = Math.floor(Math.random() * 68) + 1;
    images.push(`../img/${randomImage}.jpeg`);
  }
  return images;
};

export const products = [
  {
    id: 1,
    name: "كوارتز روز شيفون",
    price: "$28.00",
    originalPrice: "$35.00",
    description: "خفيف الوزن • منفوش • شبه شفاف",
    fullDescription: "حجاب الشيفون الممتاز المصنوع من 100% شيفون حرير. خفيف كالهواء بتدليه جميل يتحرك برشاقة معك. مثالي للارتداء اليومي والمناسبات الخاصة. اللون الوردي الكوارتزي الرقيق يلائم جميع درجات البشرة ويمكن تنسيقه بشكل أنيق أو بسيط.",
    image: "/img/1.jpeg",
    category: "شيفون",
    tag: "الأكثر مبيعاً",
    bgColor: "bg-[#f3e9e5]",
    colors: [
      { name: "كوارتز وردي", value: "#e5d5d5" },
      { name: "وردي خجول", value: "#f4e7d3" },
      { name: "نعناعي", value: "#d9e2e5" },
      { name: "لافندر", value: "#e6d4f7" }
    ],
    sizes: ["قياسي (60x180سم)", "كبير (70x200سم)"],
    material: "100% شيفون حرير",
    care: "غسل يدوي بماء بارد، تنشيف على سطح مستو، كي على حرارة منخفضة",
    rating: 4.8,
    reviews: 124,
    inStock: true,
    images: generateRandomImages(1)
  },
  {
    id: 2,
    name: "شوفان جيرسي ممتاز",
    price: "$32.00",
    description: "مطاط • قابل للتنفس • غير منزلق",
    fullDescription: "مصنوع من مزيج قطني جيرسي ممتاز يوفر مطاطية مثالية واستعادة الشكل. النسيج غير المنزلق يضمن بقاءه في مكانه طوال اليوم دون دبابيس. مثالي لأسلوب الحياة النشط، العمل، أو إنجاز المهام. اللون الشوفاني محايد متناسق مع كل شيء.",
    image: "/img/2.jpeg",
    category: "جيرسي",
    tag: "جديد",
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
    images: generateRandomImages(2)
  },
  {
    id: 3,
    name: "رمادي أردواز مودال",
    price: "$35.00",
    description: "صديق للبيئة • ناعم • يتدلى بشكل جميل",
    fullDescription: "حجاب المودال الصديق للبيئة المصنوع من لب خشب الزان. ناعم بشكل لا يصدق بتدليه فاخر يشبه الجلد الثاني. اللون الرمادي الأردوازي أنيق ويعمل للمناسبات العادية والرسمية. مثالي للبشرة الحساسة.",
    image: "/img/3.jpeg",
    category: "مودال",
    tag: "إيكو",
    bgColor: "bg-[#f0f0f0]",
    colors: [
      { name: "رمادي أردوازي", value: "#7d8285" },
      { name: "كحلي", value: "#2d1a1e" },
      { name: "أزرق غبارى", value: "#a3b5c8" }
    ],
    sizes: ["قياسي (60x180سم)"],
    material: "100% مودال (ألياف خشب الزان)",
    care: "غسيل آلي لطيف، تنشيف على حبل، كي على حرارة متوسطة",
    rating: 4.7,
    reviews: 67,
    inStock: true,
    images: generateRandomImages(3)
  },
  {
    id: 4,
    name: "وشاح حرير وردي خجول",
    price: "$45.00",
    originalPrice: "$65.00",
    description: "100% حرير نقي • لمعان أنيق",
    fullDescription: "حجاب حرير فاخر 100% حرير نقي مع لمعان طبيعي جميل. اللون الوردي الخجول مناسب للجميع ويضيف لمسة أنيقة لأي زي. الحواف الملفوفة يدوياً والنسيج خفيف الوزن يجعل هذا عرضنا الأكثر فخامة.",
    image: "/img/4.jpeg",
    category: "حرير",
    tag: "تخفيض",
    bgColor: "bg-[#fdf2f2]",
    colors: [
      { name: "وردي خجول", value: "#f9dbdb" },
      { name: "عاجي", value: "#fffaf0" },
      { name: "وردي ذهبي", value: "#e6b8b2" }
    ],
    sizes: ["كبير (70x200سم)"],
    material: "100% حرير توت",
    care: "تنظيف جاف فقط أو غسل يدوي بمنظف خاص للحرير",
    rating: 4.9,
    reviews: 203,
    inStock: true,
    images: generateRandomImages(4)
  },
  {
    id: 5,
    name: "حجاب كرينكل زمردي",
    price: "$26.00",
    description: "لا يحتاج كي • مناسب للسفر • سهل العناية",
    fullDescription: "نسيج كرينكل لا يحتاج إلى كي وهو مثالي للسفر. اللون الزمردي الجميل يترك انطباعاً بينما يجعل النسيج سهل العناية الحياة أبسط. رائع للمبتدئين والنساء المشغولات.",
    image: "/img/5.jpeg",
    category: "كرينكل",
    tag: "سفر",
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
    images: generateRandomImages(5)
  },
  {
    id: 6,
    name: "مزيج كتان قطني",
    price: "$30.00",
    description: "قابل للتنفس • طبيعي • نسيج مجعد",
    fullDescription: "مزيج مثالي من القطن والكتان لأقصى قدر من التنفس. النسيج المجعد الطبيعي يضيف شخصية والنسيج يصبح أكثر نعومة مع كل غسلة. مثالي للصيف والمناخات الدافئة.",
    image: "/img/6.jpeg",
    category: "كتان",
    tag: "صيف",
    bgColor: "bg-[#f5f1e6]",
    colors: [
      { name: "طبيعي", value: "#f5f1e6" },
      { name: "تراكوتا", value: "#e2725b" },
      { name: "ملفوفي", value: "#9caf88" }
    ],
    sizes: ["قياسي (60x180سم)", "مقاس كبير (80x220سم)"],
    material: "50% قطن، 50% كتان",
    care: "غسيل آلي بماء بارد، تنشيف على حبل، كي وهو رطب",
    rating: 4.5,
    reviews: 42,
    inStock: true,
    images: generateRandomImages(6)
  },
  {
    id: 7,
    name: "حجاب مخمل شتوي",
    price: "$38.00",
    description: "دافئ • فاخر • أساسي شتوي",
    fullDescription: "حجاب مخمل مفروش مثالي للطقس البارد. يوفر الدفء دون الحجم وله ملمس فاخر. اللون العنابي العميق مثالي لموسم الأعياد والمناسبات الشتوية الخاصة.",
    image: "/img/7.jpeg",
    category: "مخمل",
    tag: "شتاء",
    bgColor: "bg-[#f8e8e8]",
    colors: [
      { name: "عنابي", value: "#800020" },
      { name: "كحلي", value: "#000080" },
      { name: "زمردي", value: "#046307" }
    ],
    sizes: ["قياسي (60x180سم)"],
    material: "100% مخمل قطني",
    care: "تنظيف جاف فقط أو غسل يدوي بماء بارد",
    rating: 4.8,
    reviews: 78,
    inStock: true,
    images: generateRandomImages(7)
  },
  {
    id: 8,
    name: "حجاب جورجيت للمساء",
    price: "$34.00",
    description: "أنيق • متدفق • للمناسبات المسائية",
    fullDescription: "حجاب جورجيت أنيق بتدليه جميل للمناسبات المسائية والمناسبات الخاصة. النسيج له شفافية خفيفة تلتقط الضوء بشكل جميل. مثالي لحفلات الزفاف، الحفلات، والفعاليات الرسمية.",
    image: "/img/8.jpeg",
    category: "جورجيت",
    tag: "مسائي",
    bgColor: "bg-[#f9f3ff]",
    colors: [
      { name: "ذهبي", value: "#ffd700" },
      { name: "فضي", value: "#c0c0c0" },
      { name: "وردي", value: "#ff007f" }
    ],
    sizes: ["كبير (70x200سم)"],
    material: "100% بوليستر جورجيت",
    care: "غسل يدوي بماء بارد، تنشيف على حبل، تبخير لإزالة التجاعيد",
    rating: 4.7,
    reviews: 91,
    inStock: true,
    images: generateRandomImages(8)
  },
  {
    id: 9,
    name: "مجموعة شيفون بألوان الباستيل",
    price: "$52.00",
    originalPrice: "$68.00",
    description: "باستيل ناعم • مجموعة 3 قطع • متنوعة",
    fullDescription: "مجموعة جميلة من ثلاثة حجاب شيفون بألوان الباستيل المتناسقة. مثالية لخلق مظاهر متعددة باستثمار بسيط. كل حجاب خفيف الوزن ويتدلى بشكل جميل.",
    image: "/img/9.jpeg",
    category: "شيفون",
    tag: "مجموعة",
    bgColor: "bg-[#f8f0f8]",
    colors: [
      { name: "لافندر", value: "#e6d4f7" },
      { name: "نعناعي", value: "#d9e2e5" },
      { name: "خوخي", value: "#ffdab9" }
    ],
    sizes: ["مجموعة من 3 (60x180سم لكل)"],
    material: "100% شيفون حرير",
    care: "غسل يدوي بماء بارد بشكل منفصل، تنشيف على سطح مستو",
    rating: 4.9,
    reviews: 145,
    inStock: true,
    images: generateRandomImages(9)
  },
  {
    id: 10,
    name: "حجاب جيرسي بامبو",
    price: "$36.00",
    description: "مستدام • ناعم للغاية • مضاد للبكتيريا",
    fullDescription: "مصنوع من ألياف البامبو المستدامة، هذا الحجاب الجيرسي ناعم للغاية وله خصائص مضادة للبكتيريا طبيعية. مثالي للبشرة الحساسة والمتسوقات الواعيات بيئياً.",
    image: "/img/10.jpeg",
    category: "جيرسي",
    tag: "إيكو",
    bgColor: "bg-[#e8f5e9]",
    colors: [
      { name: "طبيعي", value: "#f5f1e6" },
      { name: "أزرق سماوي", value: "#87ceeb" },
      { name: "وردي غبارى", value: "#dc9a9a" }
    ],
    sizes: ["قاس واحد (مطاط)"],
    material: "100% بامبو فيسكوز",
    care: "غسيل آلي بماء بارد، تنشيف على حبل، لا تنشف في المجفف",
    rating: 4.8,
    reviews: 67,
    inStock: true,
    images: generateRandomImages(10)
  },
  {
    id: 11,
    name: "مودال أزرق ملكي",
    price: "$37.00",
    description: "لون غني • شعور فاخر • قابل للتنفس",
    fullDescription: "حجاب مودال أزرق ملكي عميق يترك انطباعاً. اللون الغني يتناسق بشكل جميل مع الملابس المحايدة ونسيج المودال يشعر بالفخامة على الجلد.",
    image: "/img/11.jpeg",
    category: "مودال",
    tag: "جديد",
    bgColor: "bg-[#e8eaf6]",
    colors: [
      { name: "أزرق ملكي", value: "#4169e1" },
      { name: "كحلي", value: "#000080" },
      { name: "بترولي", value: "#008080" }
    ],
    sizes: ["قياسي (60x180سم)", "كبير (70x200سم)"],
    material: "100% مودال",
    care: "غسيل آلي لطيف، تنشيف على حبل، كي على حرارة منخفضة",
    rating: 4.6,
    reviews: 89,
    inStock: true,
    images: generateRandomImages(11)
  },
  {
    id: 12,
    name: "حرير مطرز بالذهب",
    price: "$85.00",
    originalPrice: "$120.00",
    description: "مطرز يدوياً • فخم • للمناسبات الخاصة",
    fullDescription: "حجاب حرير رائع مطرز يدوياً بتفاصيل خيوط ذهبية. كل قطعة فريدة وتستغرق ساعات من الحرفية الماهرة. مثالي لحفلات الزفاف، العيد، والاحتفالات الخاصة.",
    image: "/img/12.jpeg",
    category: "حرير",
    tag: "فخم",
    bgColor: "bg-[#fffaf0]",
    colors: [
      { name: "عاجي", value: "#fffaf0" },
      { name: "ذهبي", value: "#ffd700" }
    ],
    sizes: ["كبير (70x200سم)"],
    material: "100% حرير مع خيوط ذهبية",
    care: "تنظيف جاف فقط",
    rating: 4.9,
    reviews: 203,
    inStock: true,
    images: generateRandomImages(12)
  }
];

// إنشاء المزيد من المنتجات باستخدام الصور المتبقية
for (let i = 13; i <= 20; i++) {
  const categoriesList = ["شيفون", "جيرسي", "مودال", "حرير", "كرينكل", "كتان", "مخمل", "جورجيت"];
  const tagsList = ["جديد", "الأكثر مبيعاً", "تخفيض", "إيكو", "سفر", "صيف", "شتاء", "فخم"];
  const priceList = ["$26.00", "$28.00", "$32.00", "$35.00", "$38.00", "$42.00", "$45.00", "$52.00"];
  
  const randomCategory = categoriesList[Math.floor(Math.random() * categoriesList.length)];
  const randomTag = tagsList[Math.floor(Math.random() * tagsList.length)];
  const randomPrice = priceList[Math.floor(Math.random() * priceList.length)];
  
  products.push({
    id: i,
    name: `مجموعة ${randomCategory} ${i}`,
    price: randomPrice,
    description: "جودة ممتازة • تدليه جميل • مريح",
    fullDescription: `حجاب ${randomCategory.toLowerCase()} جميل مصنوع من مواد ممتازة. مثالي للارتداء اليومي بتناسب مريح وتدليه أنيق.`,
    image: `/img/${i}.jpeg`,
    category: randomCategory,
    tag: randomTag,
    bgColor: "bg-[#f5f5f5]",
    colors: [
      { name: "كلاسيكي", value: "#f5f5f5" },
      { name: "أنيق", value: "#d4c8be" },
      { name: "عصري", value: "#7d8285" }
    ],
    sizes: ["قياسي (60x180سم)"],
    material: "نسيج ممتاز",
    care: "اتبع تعليمات العناية للحصول على أفضل النتائج",
    rating: 4.5 + Math.random() * 0.4,
    reviews: Math.floor(Math.random() * 100) + 20,
    inStock: Math.random() > 0.1,
    images: generateRandomImages(i)
  });
}

export const categories = [
  { id: 1, name: "شيفون", count: products.filter(p => p.category === "شيفون").length },
  { id: 2, name: "جيرسي", count: products.filter(p => p.category === "جيرسي").length },
  { id: 3, name: "مودال", count: products.filter(p => p.category === "مودال").length },
  { id: 4, name: "حرير", count: products.filter(p => p.category === "حرير").length },
  { id: 5, name: "كرينكل", count: products.filter(p => p.category === "كرينكل").length },
  { id: 6, name: "كتان", count: products.filter(p => p.category === "كتان").length },
  { id: 7, name: "مخمل", count: products.filter(p => p.category === "مخمل").length },
  { id: 8, name: "جورجيت", count: products.filter(p => p.category === "جورجيت").length },
  { id: 9, name: "الكل", count: products.length }
];