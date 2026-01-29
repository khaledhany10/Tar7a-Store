import React, { useState, useEffect, useRef } from 'react';
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
    quote_en: "The Modal collection changed the game. Stays in place all day without needing a thousand pins. Absolutely amazing!",
    rating: 5
  },
  {
    id: 2,
    name_ar: "ليلى ك.",
    name_en: "Layla K.",
    role_ar: "عميل موثوق",
    role_en: "Trusted Customer",
    image: "/img/2.jpeg",
    quote_ar: "تغليف متجر طرحة جميل جدًا، شعرت أنني أفتح هدية فاخرة. جودة الشيفون لا مثيل لها في أي ماركة أخرى.",
    quote_en: "Tar7a Store packaging is so beautiful, felt like opening a luxury gift. The chiffon quality is unmatched by any other brand.",
    rating: 5
  },
  {
    id: 3,
    name_ar: "مريم ج.",
    name_en: "Mariam J.",
    role_ar: "عميل موثوق",
    role_en: "Trusted Customer",
    image: "/img/3.jpeg",
    quote_ar: "وجدت أخيرًا مصدرًا موثوقًا للاحتياجات اليومية. حجابات الجيرسي ناعمة جدًا والألوان مثالية وهادئة.",
    quote_en: "Finally found a reliable source for daily essentials. The jersey hijabs are so soft and the colors are perfect and muted.",
    rating: 5
  },
  {
    id: 4,
    name_ar: "فاطمة أ.",
    name_en: "Fatima A.",
    role_ar: "عميل VIP",
    role_en: "VIP Customer",
    image: "/img/4.jpeg",
    quote_ar: "مجموعة الحرير تستحق كل قرش أنفقته. أحصل على إعجاب في كل مرة أرتديها. خدمة العملاء ممتازة أيضًا!",
    quote_en: "The silk collection is worth every penny. Get compliments every time I wear them. Customer service is excellent too!",
    rating: 5
  }
];

const Testimonials = () => {
  const { language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);
  
  // تحديد عدد البطاقات المعروضة حسب حجم الشاشة
  const getCardsPerView = () => {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  };

  const [cardsPerView, setCardsPerView] = useState(getCardsPerView());

  useEffect(() => {
    const handleResize = () => {
      setCardsPerView(getCardsPerView());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev + cardsPerView >= testimonials.length ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? testimonials.length - cardsPerView : prev - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // حساب عرض البطاقة بناءً على عدد البطاقات المعروضة
  const cardWidth = 100 / cardsPerView;

  return (
    <section className="relative overflow-hidden px-4 md:px-10 lg:px-20 py-16 lg:py-28 bg-gradient-to-b from-white via-peach-soft/10 to-primary/5 dark:from-background-dark dark:via-gray-900/50 dark:to-primary/10">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-primary/10 blur-xl lg:blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-peach-soft/20 blur-xl lg:blur-3xl"></div>
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 mb-4 lg:mb-6 px-3 py-1 lg:px-4 lg:py-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-primary animate-pulse" 
                     style={{ animationDelay: `${i * 150}ms` }}></div>
              ))}
            </div>
            <span className={`${language === 'ar' ? 'arabic-text' : ''} text-xs lg:text-sm font-medium text-[#2d1a1e] dark:text-gray-300`}>
              {language === 'ar' ? 'آراء العملاء' : 'Customer Voices'}
            </span>
          </div>

          <h2 className={`${language === 'ar' ? 'arabic-text' : ''} text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-[#2d1a1e] dark:text-white mb-4 lg:mb-6`}>
            <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
              {language === 'ar' ? 'قصص نجاحنا' : 'Our Success Stories'}
            </span>
          </h2>

          <p className={`${language === 'ar' ? 'arabic-text' : ''} text-base lg:text-lg text-[#2d1a1e]/70 dark:text-gray-400 max-w-2xl mx-auto px-4`}>
            {language === 'ar'
              ? 'نحن نفتخر ببناء مجتمع من النساء الواثقات السعيدات. إليكم ما يقوله أعضاء عائلتنا المتنامية.'
              : 'We take pride in building a community of confident, happy women. Here\'s what our growing family members say.'
            }
          </p>
        </div>

        {/* Testimonials Container */}
        <div className="relative mb-12 lg:mb-16">
          {/* Navigation Arrows - Desktop only */}
          <button
            onClick={prevSlide}
            className="hidden lg:flex absolute top-1/2 -translate-y-1/2 -left-16 z-20 w-12 h-12 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110"
          >
            <span className="material-symbols-outlined text-primary text-2xl">
              {language === 'ar' ? 'chevron_right' : 'chevron_left'}
            </span>
          </button>

          <button
            onClick={nextSlide}
            className="hidden lg:flex absolute top-1/2 -translate-y-1/2 -right-16 z-20 w-12 h-12 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110"
          >
            <span className="material-symbols-outlined text-primary text-2xl">
              {language === 'ar' ? 'chevron_left' : 'chevron_right'}
            </span>
          </button>

          {/* Mobile Navigation */}
          <div className="flex lg:hidden justify-center gap-4 mb-6">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <span className="material-symbols-outlined text-primary">
                {language === 'ar' ? 'chevron_right' : 'chevron_left'}
              </span>
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <span className="material-symbols-outlined text-primary">
                {language === 'ar' ? 'chevron_left' : 'chevron_right'}
              </span>
            </button>
          </div>

          {/* Testimonials Slider */}
          <div 
            ref={containerRef}
            className="relative overflow-hidden rounded-2xl lg:rounded-3xl"
          >
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ 
                transform: `translateX(-${currentIndex * cardWidth}%)`,
                width: `${(testimonials.length / cardsPerView) * 100}%`
              }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id} 
                  className="px-2 md:px-3 lg:px-4 flex-shrink-0"
                  style={{ width: `${cardWidth}%` }}
                >
                  <div className="bg-white dark:bg-gray-800 rounded-xl lg:rounded-2xl xl:rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden h-full">
                    {/* Quote Icon */}
                    <div className="absolute top-4 right-4 opacity-5 lg:opacity-10">
                      <span className="material-symbols-outlined text-4xl lg:text-6xl text-primary">format_quote</span>
                    </div>

                    <div className="p-4 lg:p-6 xl:p-8">
                      {/* Rating Stars */}
                      <div className="flex gap-0.5 lg:gap-1 mb-4 lg:mb-6">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <span key={i} className="material-symbols-outlined text-yellow-500 text-sm lg:text-base xl:text-lg">star</span>
                        ))}
                      </div>

                      {/* Quote */}
                      <p className={`${language === 'ar' ? 'arabic-text' : ''} text-[#2d1a1e]/80 dark:text-gray-300 text-sm lg:text-base xl:text-lg leading-relaxed mb-6 lg:mb-8 line-clamp-4 lg:line-clamp-none`}>
                        "{language === 'ar' ? testimonial.quote_ar : testimonial.quote_en}"
                      </p>

                      {/* Customer Info */}
                      <div className={`flex items-center gap-3 lg:gap-4 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                        <div className="relative">
                          <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full overflow-hidden border-2 lg:border-4 border-white/50 shadow-md lg:shadow-lg">
                            <img
                              src={testimonial.image}
                              alt={language === 'ar' ? testimonial.name_ar : testimonial.name_en}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/100x100/f3e9e5/2d1a1e?text=👤';
                              }}
                            />
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 lg:w-6 lg:h-6 rounded-full bg-primary flex items-center justify-center">
                            <span className="material-symbols-outlined text-white text-xs lg:text-sm">done</span>
                          </div>
                        </div>

                        <div className={`${language === 'ar' ? 'text-right' : 'text-left'} flex-1`}>
                          <h4 className={`${language === 'ar' ? 'arabic-text' : ''} font-bold text-[#2d1a1e] dark:text-white text-base lg:text-lg mb-1`}>
                            {language === 'ar' ? testimonial.name_ar : testimonial.name_en}
                          </h4>
                          <p className={`${language === 'ar' ? 'arabic-text' : ''} text-primary text-xs lg:text-sm font-medium`}>
                            {language === 'ar' ? testimonial.role_ar : testimonial.role_en}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Gradient Bottom Border */}
                    <div className="h-0.5 lg:h-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Slider Dots */}
          <div className="flex justify-center gap-1.5 lg:gap-2 mt-6 lg:mt-12">
            {[...Array(Math.max(1, testimonials.length - cardsPerView + 1))].map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 lg:w-3 lg:h-3 rounded-full transition-all duration-300 ${
                  currentIndex === index 
                    ? 'bg-primary w-6 lg:w-8' 
                    : 'bg-gray-300 dark:bg-gray-700 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-gradient-to-r from-white/80 to-white/60 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-sm rounded-2xl lg:rounded-3xl p-6 lg:p-8 xl:p-12 shadow-lg lg:shadow-xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 xl:gap-8">
            <div className="text-center">
              <div className="relative inline-flex items-center justify-center mb-3 lg:mb-4">
                <div className="absolute inset-0 w-16 h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 rounded-full bg-primary/10"></div>
                <div className={`${language === 'ar' ? 'arabic-text' : ''} relative text-3xl lg:text-4xl xl:text-5xl font-bold text-primary`}>
                  68+
                </div>
              </div>
              <h4 className={`${language === 'ar' ? 'arabic-text' : ''} font-bold text-[#2d1a1e] dark:text-white text-base lg:text-lg mb-1`}>
                {language === 'ar' ? 'تصميم فريد' : 'Unique Designs'}
              </h4>
              <p className={`${language === 'ar' ? 'arabic-text' : ''} text-xs lg:text-sm text-[#2d1a1e]/60 dark:text-gray-400`}>
                {language === 'ar' ? 'من الإبداع' : 'Of Creativity'}
              </p>
            </div>

            <div className="text-center">
              <div className="relative inline-flex items-center justify-center mb-3 lg:mb-4">
                <div className="absolute inset-0 w-16 h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 rounded-full bg-purple-500/10"></div>
                <div className={`${language === 'ar' ? 'arabic-text' : ''} relative text-3xl lg:text-4xl xl:text-5xl font-bold text-purple-600 dark:text-purple-400`}>
                  2K+
                </div>
              </div>
              <h4 className={`${language === 'ar' ? 'arabic-text' : ''} font-bold text-[#2d1a1e] dark:text-white text-base lg:text-lg mb-1`}>
                {language === 'ar' ? 'عميل سعيد' : 'Happy Customers'}
              </h4>
              <p className={`${language === 'ar' ? 'arabic-text' : ''} text-xs lg:text-sm text-[#2d1a1e]/60 dark:text-gray-400`}>
                {language === 'ar' ? 'وأكثر' : 'And Counting'}
              </p>
            </div>

            <div className="text-center">
              <div className="relative inline-flex items-center justify-center mb-3 lg:mb-4">
                <div className="absolute inset-0 w-16 h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 rounded-full bg-pink-500/10"></div>
                <div className={`${language === 'ar' ? 'arabic-text' : ''} relative text-3xl lg:text-4xl xl:text-5xl font-bold text-pink-600 dark:text-pink-400 flex items-center gap-1`}>
                  4.8<sub className="text-lg lg:text-xl xl:text-2xl">★</sub>
                </div>
              </div>
              <h4 className={`${language === 'ar' ? 'arabic-text' : ''} font-bold text-[#2d1a1e] dark:text-white text-base lg:text-lg mb-1`}>
                {language === 'ar' ? 'متوسط التقييم' : 'Average Rating'}
              </h4>
              <p className={`${language === 'ar' ? 'arabic-text' : ''} text-xs lg:text-sm text-[#2d1a1e]/60 dark:text-gray-400`}>
                {language === 'ar' ? 'جودة ممتازة' : 'Excellent Quality'}
              </p>
            </div>

            <div className="text-center">
              <div className="relative inline-flex items-center justify-center mb-3 lg:mb-4">
                <div className="absolute inset-0 w-16 h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 rounded-full bg-orange-500/10"></div>
                <div className={`${language === 'ar' ? 'arabic-text' : ''} relative text-3xl lg:text-4xl xl:text-5xl font-bold text-orange-600 dark:text-orange-400`}>
                  24/7
                </div>
              </div>
              <h4 className={`${language === 'ar' ? 'arabic-text' : ''} font-bold text-[#2d1a1e] dark:text-white text-base lg:text-lg mb-1`}>
                {language === 'ar' ? 'دعم فني' : 'Support'}
              </h4>
              <p className={`${language === 'ar' ? 'arabic-text' : ''} text-xs lg:text-sm text-[#2d1a1e]/60 dark:text-gray-400`}>
                {language === 'ar' ? 'على مدار الساعة' : 'Round the Clock'}
              </p>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 lg:mt-12 flex flex-wrap justify-center gap-4 lg:gap-6 xl:gap-8 opacity-70">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-green-500/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-green-500 text-sm lg:text-base">verified</span>
            </div>
            <span className={`${language === 'ar' ? 'arabic-text' : ''} text-xs lg:text-sm font-medium text-[#2d1a1e] dark:text-gray-300`}>
              {language === 'ar' ? 'جودة مضمونة' : 'Quality Guaranteed'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-blue-500 text-sm lg:text-base">local_shipping</span>
            </div>
            <span className={`${language === 'ar' ? 'arabic-text' : ''} text-xs lg:text-sm font-medium text-[#2d1a1e] dark:text-gray-300`}>
              {language === 'ar' ? 'شحن سريع' : 'Fast Shipping'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-red-500/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-red-500 text-sm lg:text-base">return</span>
            </div>
            <span className={`${language === 'ar' ? 'arabic-text' : ''} text-xs lg:text-sm font-medium text-[#2d1a1e] dark:text-gray-300`}>
              {language === 'ar' ? 'إرجاع مجاني' : 'Free Returns'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-purple-500 text-sm lg:text-base">support_agent</span>
            </div>
            <span className={`${language === 'ar' ? 'arabic-text' : ''} text-xs lg:text-sm font-medium text-[#2d1a1e] dark:text-gray-300`}>
              {language === 'ar' ? 'دعم 24/7' : '24/7 Support'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;