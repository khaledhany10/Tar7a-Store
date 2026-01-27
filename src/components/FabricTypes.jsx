import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const fabricData = [
  {
    id: 1,
    name_ar: "شيفون أساسي",
    name_en: "Basic Chiffon",
    image: "/img/1.jpeg",
    category: "Chiffon"
  },
  {
    id: 2,
    name_ar: "جيرسي متميز",
    name_en: "Premium Jersey",
    image: "/img/2.jpeg",
    category: "Jersey"
  },
  {
    id: 3,
    name_ar: "مودال فاخر",
    name_en: "Luxury Modal",
    image: "/img/3.jpeg",
    category: "Modal"
  },
  {
    id: 4,
    name_ar: "حرير نقي",
    name_en: "Pure Silk",
    image: "/img/4.jpeg",
    category: "Silk"
  },
  {
    id: 5,
    name_ar: "كرينكل سهل",
    name_en: "Easy Crinkle",
    image: "/img/5.jpeg",
    category: "Crinkle"
  },
  {
    id: 6,
    name_ar: "كتان طبيعي",
    name_en: "Natural Linen",
    image: "/img/6.jpeg",
    category: "Linen"
  },
  {
    id: 7,
    name_ar: "قطيفة شتوية",
    name_en: "Winter Velvet",
    image: "/img/7.jpeg",
    category: "Velvet"
  },
  {
    id: 8,
    name_ar: "جرجيت أنيق",
    name_en: "Elegant Georgette",
    image: "/img/8.jpeg",
    category: "Georgette"
  }
];

const FabricTypes = () => {
  const { language } = useLanguage();

  return (
    <section className="bg-white/50 dark:bg-background-dark/30 py-16 px-6 md:px-20">
      <div className="max-w-[1400px] mx-auto">
        <h2 className={`${language === 'ar' ? 'arabic-text' : ''} text-3xl font-bold mb-12 text-center dark:text-white`}>
          {language === 'ar' ? 'تسوق حسب نوع القماش' : 'Shop By Fabric Type'}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {fabricData.map((fabric) => (
            <Link 
              key={fabric.id} 
              to={`/products?category=${fabric.category}`}
              className="group cursor-pointer"
            >
              <div className="aspect-square rounded-2xl bg-beige-card overflow-hidden mb-3">
                <img 
                  alt={language === 'ar' ? fabric.name_ar : fabric.name_en} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  src={fabric.image}
                  loading="lazy"
                />
              </div>
              <h3 className={`${language === 'ar' ? 'arabic-text' : ''} text-center font-semibold text-sm group-hover:text-primary transition-colors`}>
                {language === 'ar' ? fabric.name_ar : fabric.name_en}
              </h3>
            </Link>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link 
            to="/products" 
            className={`${language === 'ar' ? 'arabic-text' : ''} inline-flex items-center gap-2 text-primary font-bold hover:text-primary-dark transition-colors`}
          >
            <span className="material-symbols-outlined transform rotate-180">arrow_back</span>
            <span>{language === 'ar' ? 'عرض جميع الفئات' : 'View All Categories'}</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FabricTypes;