import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const testimonials = [
  {
    id: 1,
    name_ar: "أماني ر.",
    name_en: "Amani R.",
    role_ar: "عميل موثوق",
    role_en: "Trusted Customer",
    image: "/img/1.jpeg",
    quote_ar: "مجموعة المودال غيرت قواعد اللعبة. تظل في مكانها طوال اليوم دون الحاجة إلى آلاف الدبابيس. مذهلة تمامًا!",
    quote_en: "The Modal collection changed the game. Stays in place all day without needing a thousand pins. Absolutely amazing!"
  },
  {
    id: 2,
    name_ar: "ليلى ك.",
    name_en: "Layla K.",
    role_ar: "عميل موثوق",
    role_en: "Trusted Customer",
    image: "/img/2.jpeg",
    quote_ar: "تغليف متجر طرحة جميل جدًا، شعرت أنني أفتح هدية فاخرة. جودة الشيفون لا مثيل لها في أي ماركة أخرى.",
    quote_en: "Tar7a Store packaging is so beautiful, felt like opening a luxury gift. The chiffon quality is unmatched by any other brand."
  },
  {
    id: 3,
    name_ar: "مريم ج.",
    name_en: "Mariam J.",
    role_ar: "عميل موثوق",
    role_en: "Trusted Customer",
    image: "/img/3.jpeg",
    quote_ar: "وجدت أخيرًا مصدرًا موثوقًا للاحتياجات اليومية. حجابات الجيرسي ناعمة جدًا والألوان مثالية وهادئة.",
    quote_en: "Finally found a reliable source for daily essentials. The jersey hijabs are so soft and the colors are perfect and muted."
  },
  {
    id: 4,
    name_ar: "فاطمة أ.",
    name_en: "Fatima A.",
    role_ar: "عميل VIP",
    role_en: "VIP Customer",
    image: "/img/4.jpeg",
    quote_ar: "مجموعة الحرير تستحق كل قرش أنفقته. أحصل على إعجاب في كل مرة أرتديها. خدمة العملاء ممتازة أيضًا!",
    quote_en: "The silk collection is worth every penny. Get compliments every time I wear them. Customer service is excellent too!"
  }
];

const Testimonials = () => {
  const { language } = useLanguage();

  return (
    <section className="px-6 md:px-20 py-24 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-12">
          <h2 className={`${language === 'ar' ? 'arabic-text' : ''} text-3xl font-bold mb-4 dark:text-white`}>
            {language === 'ar' ? 'محبوب من مجتمع متجر طرحة' : 'Loved By Tar7a Store Community'}
          </h2>
          <p className={`${language === 'ar' ? 'arabic-text' : ''} text-gray-600 dark:text-gray-400 max-w-2xl mx-auto`}>
            {language === 'ar' ? 'اقرأ ما تقوله أخواتنا عن تجربتهم مع متجر طرحة.' : 'Read what our sisters say about their Tar7a Store experience.'}
          </p>
        </div>
        
        <div className="flex overflow-x-auto pb-10 gap-8 no-scrollbar scroll-smooth">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="flex-none w-[320px] md:w-[400px] bg-beige-card dark:bg-gray-800 p-10 rounded-[2.5rem] border border-primary/5">
              <div className="flex gap-1 mb-6 text-primary">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined fill-1">star</span>
                ))}
              </div>
              
              <p className={`${language === 'ar' ? 'arabic-text' : ''} text-[#2d1a1e]/70 dark:text-gray-300 italic text-lg leading-relaxed mb-8`}>
                "{language === 'ar' ? testimonial.quote_ar : testimonial.quote_en}"
              </p>
              
              <div className={`flex items-center gap-4 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                <div 
                  className="w-12 h-12 rounded-full bg-cover bg-center border-2 border-primary/20" 
                  style={{backgroundImage: `url('${testimonial.image}')`}}
                ></div>
                <div className={`${language === 'ar' ? 'text-right' : 'text-left'}`}>
                  <p className={`${language === 'ar' ? 'arabic-text' : ''} font-bold dark:text-white`}>
                    {language === 'ar' ? testimonial.name_ar : testimonial.name_en}
                  </p>
                  <p className={`${language === 'ar' ? 'arabic-text' : ''} text-primary text-xs font-semibold uppercase tracking-wider`}>
                    {language === 'ar' ? testimonial.role_ar : testimonial.role_en}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Statistics */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className={`${language === 'ar' ? 'arabic-text' : ''} text-4xl font-bold text-primary mb-2`}>٦٨+</div>
            <div className={`${language === 'ar' ? 'arabic-text' : ''} text-gray-600 dark:text-gray-400`}>
              {language === 'ar' ? 'تصميم فريد' : 'Unique Designs'}
            </div>
          </div>
          <div>
            <div className={`${language === 'ar' ? 'arabic-text' : ''} text-4xl font-bold text-primary mb-2`}>٢٠٠٠+</div>
            <div className={`${language === 'ar' ? 'arabic-text' : ''} text-gray-600 dark:text-gray-400`}>
              {language === 'ar' ? 'عميل سعيد' : 'Happy Customers'}
            </div>
          </div>
          <div>
            <div className={`${language === 'ar' ? 'arabic-text' : ''} text-4xl font-bold text-primary mb-2`}>٤.٨★</div>
            <div className={`${language === 'ar' ? 'arabic-text' : ''} text-gray-600 dark:text-gray-400`}>
              {language === 'ar' ? 'متوسط التقييم' : 'Average Rating'}
            </div>
          </div>
          <div>
            <div className={`${language === 'ar' ? 'arabic-text' : ''} text-4xl font-bold text-primary mb-2`}>٥٠+</div>
            <div className={`${language === 'ar' ? 'arabic-text' : ''} text-gray-600 dark:text-gray-400`}>
              {language === 'ar' ? 'دولة يتم الشحن لها' : 'Shipping Countries'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;