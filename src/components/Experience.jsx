import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const experiences = [
  {
    id: 1,
    icon: "eco",
    title_ar: "أقمشة مميزة",
    title_en: "Premium Fabrics",
    description_ar: "نختار فقط أعلى جودة من الأقمشة القابلة للتنفس التي تشعر بالراحة مثل مظهرها الرائع.",
    description_en: "We select only the highest quality, breathable fabrics that feel as good as they look."
  },
  {
    id: 2,
    icon: "auto_awesome",
    title_ar: "تدلي مثالي",
    title_en: "Perfect Drape",
    description_ar: "مصممة بأبعاد ووزن مثاليين لتنسيق سهل طوال اليوم دون مجهود.",
    description_en: "Engineered with ideal dimensions and weight for effortless styling all day long."
  },
  {
    id: 3,
    icon: "local_shipping",
    title_ar: "شحن عالمي",
    title_en: "Global Shipping",
    description_ar: "شحن سريع وموثوق للأخوات في جميع أنحاء العالم، يتم التعامل معه بعناية فائقة.",
    description_en: "Fast and reliable shipping for sisters worldwide, handled with utmost care."
  }
];

const Experience = () => {
  const { language } = useLanguage();

  return (
    <section className="bg-peach-soft/20 dark:bg-background-dark/50 px-6 md:px-20 py-24">
      <div className="max-w-[1200px] mx-auto text-center">
        <h2 className={`${language === 'ar' ? 'arabic-text' : ''} text-3xl md:text-5xl font-bold mb-16 tracking-tight`}>
          {language === 'ar' ? 'تجربة متجر طرحة' : 'Tar7a Store Experience'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {experiences.map((experience) => (
            <div key={experience.id} className="flex flex-col items-center gap-6">
              <div className="w-16 h-16 rounded-3xl bg-white dark:bg-gray-800 flex items-center justify-center text-primary shadow-md">
                <span className="material-symbols-outlined text-3xl">{experience.icon}</span>
              </div>
              <h3 className={`${language === 'ar' ? 'arabic-text' : ''} font-bold text-xl`}>
                {language === 'ar' ? experience.title_ar : experience.title_en}
              </h3>
              <p className={`${language === 'ar' ? 'arabic-text' : ''} text-[#2d1a1e]/60 dark:text-gray-400 leading-relaxed`}>
                {language === 'ar' ? experience.description_ar : experience.description_en}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;