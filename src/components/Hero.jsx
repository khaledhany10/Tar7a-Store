import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useEffect, useState, useRef } from 'react';

// استيراد الصور من المجلد العام
import Image1 from "../../public/Img/Collections/06-Pattern/01-Pattern Collection/01.jpeg";
import Image2 from "../../public/Img/Collections/01-Basic-Pinks/01-Basic-Pinks-Grading-Colours/Main.jpeg";
import Image3 from "../../public/Img/Collections/03-Islamic-Ornaments/01-Islamic-Ornaments-Collection/Main.jpeg";

const Hero = () => {
  const { language } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideInterval = useRef(null);
  
  const slides = [
    {
      image: Image1,
      title_ar: "أناقة لا تنتهي",
      title_en: "Endless Elegance",
      subtitle_ar: "مجموعتنا الفاخرة من الشيفون",
      subtitle_en: "Our Luxury Chiffon Collection"
    },
    {
      image: Image2,
      title_ar: "طرحه لكل اطلاله",
      title_en: "He presented it for every appearance",
      subtitle_ar: "نسيج حريري ناعم كالهواء",
      subtitle_en: "Silky Soft Airy Fabric"
    },
    {
      image: Image3,
      title_ar: "اقل تفاصيل اكثر جمالا",
      title_en: "Less details more beauty",
      subtitle_ar: "تصميمات تناسب كل مناسبة",
      subtitle_en: "Designs for Every Occasion"
    }
  ];

  // دالة للتحكم في البانر المتحرك
  const startSlider = () => {
    slideInterval.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
  };

  const stopSlider = () => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
    }
  };

  useEffect(() => {
    startSlider();
    return () => stopSlider();
  }, []);

  const goToSlide = (index) => {
    stopSlider();
    setCurrentSlide(index);
    startSlider();
  };

  const goToNextSlide = () => {
    stopSlider();
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    startSlider();
  };

  const goToPrevSlide = () => {
    stopSlider();
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    startSlider();
  };

  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-gradient-to-b from-white to-peach-soft/20 dark:from-background-dark dark:to-gray-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
<div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%232d1a1e%22%20fill-opacity%3D%220.1%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')]"></div>      </div>

      {/* Slider Container */}
      <div className="relative h-[90vh]">
        {/* Slides */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Background Image with Overlay */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent dark:from-black/70 dark:via-black/50"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>

            {/* Slide Content */}
            <div className="relative z-20 h-full flex items-center">
              <div className="max-w-[1400px] mx-auto px-6 md:px-20 w-full">
                <div className={`${language === 'ar' ? 'text-right' : 'text-left'} max-w-2xl`}>
                  {/* Badge */}
                  <div className="inline-block mb-6">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 border border-white/30">
                      <span className={`${language === 'ar' ? 'arabic-text' : ''} text-white text-sm font-medium`}>
                        {language === 'ar' ? 'مجموعة ٢٠٢٤' : 'Collection 2024'}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h1 className={`${language === 'ar' ? 'arabic-text' : ''} text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight`}>
                    {language === 'ar' ? slide.title_ar : slide.title_en}
                  </h1>

                  {/* Subtitle */}
                  <p className={`${language === 'ar' ? 'arabic-text' : ''} text-xl md:text-2xl text-white/90 mb-8 max-w-xl`}>
                    {language === 'ar' ? slide.subtitle_ar : slide.subtitle_en}
                  </p>

                  {/* CTA Buttons */}
                  <div className="flex flex-wrap gap-4">
                    <Link 
                      to="/products" 
                      className={`${language === 'ar' ? 'arabic-text' : ''} group relative flex items-center justify-center rounded-full h-14 px-8 bg-white text-[#2d1a1e] font-bold hover:bg-white/90 transition-all duration-300 min-w-[180px]`}
                    >
                      <span className="flex items-center gap-2">
                        {language === 'ar' ? 'تسوق الآن' : 'Shop Now'}
                        <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">
                          {language === 'ar' ? 'arrow_back' : 'arrow_forward'}
                        </span>
                      </span>
                    </Link>
                    
                    <Link 
                      to="/AboutUs" 
                      className={`${language === 'ar' ? 'arabic-text' : ''} flex items-center justify-center rounded-full h-14 px-8 border-2 border-white/30 text-white font-bold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm min-w-[180px]`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-lg">play_circle</span>
                        {language === 'ar' ? 'شاهد الفيديو' : 'Watch Video'}
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slider Controls */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30">
          <div className="flex items-center gap-4">
            {/* Navigation Dots */}
            <div className="flex gap-3">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentSlide === index 
                    ? 'bg-white w-8' 
                    : 'bg-white/50 hover:bg-white/80'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Navigation Arrows (Desktop) */}
            <div className="hidden md:flex items-center gap-4 ml-8">
              <button
                onClick={goToPrevSlide}
                className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all duration-300"
                aria-label="Previous slide"
              >
                <span className="material-symbols-outlined text-white">
                  {language === 'ar' ? 'chevron_right' : 'chevron_left'}
                </span>
              </button>
              <button
                onClick={goToNextSlide}
                className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all duration-300"
                aria-label="Next slide"
              >
                <span className="material-symbols-outlined text-white">
                  {language === 'ar' ? 'chevron_left' : 'chevron_right'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-10 left-10 z-30 hidden lg:block">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
            <div className="text-white text-center">
              <div className="text-2xl font-bold">50%</div>
              <div className={`${language === 'ar' ? 'arabic-text' : ''} text-sm`}>
                {language === 'ar' ? 'خصم' : 'Off'}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-10 right-10 z-30 hidden lg:block">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-sm">local_shipping</span>
              </div>
              <div>
                <div className={`${language === 'ar' ? 'arabic-text' : ''} text-black text-sm font-bold`}>
                  {language === 'ar' ? 'شحن مجاني' : 'Free Shipping'}
                </div>
                <div className={`${language === 'ar' ? 'arabic-text' : ''} text-black/80 text-xs`}>
                  {language === 'ar' ? 'لطلبات فوق 300ج' : 'Orders over 300 EGP'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-24 right-10 z-30 hidden lg:block">
          <div className="flex flex-col items-center gap-2">
            <span className={`${language === 'ar' ? 'arabic-text' : ''} text-black/70 text-sm rotate-90 mb-8`}>
              {language === 'ar' ? 'اسحب لأسفل' : 'Scroll'}
            </span>
            <div className="w-0.5 h-20 bg-gradient-to-b from-black/50 to-transparent"></div>
          </div>
        </div>
      </div>

      {/* Features Bar */}
      <div className="relative z-40 -mt-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-20">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-primary text-2xl">verified</span>
                </div>
                <div>
                  <h3 className={`${language === 'ar' ? 'arabic-text' : ''} text-lg font-bold text-[#2d1a1e] dark:text-white mb-1`}>
                    {language === 'ar' ? 'جودة مضمونة' : 'Quality Guaranteed'}
                  </h3>
                  <p className={`${language === 'ar' ? 'arabic-text' : ''} text-sm text-[#2d1a1e]/70 dark:text-gray-400`}>
                    {language === 'ar' ? 'أفضل أنواع الأقمشة' : 'Premium Fabric Selection'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-primary text-2xl">recycling</span>
                </div>
                <div>
                  <h3 className={`${language === 'ar' ? 'arabic-text' : ''} text-lg font-bold text-[#2d1a1e] dark:text-white mb-1`}>
                    {language === 'ar' ? 'شحن سريع' : 'Fast Shipping'}
                  </h3>
                  <p className={`${language === 'ar' ? 'arabic-text' : ''} text-sm text-[#2d1a1e]/70 dark:text-gray-400`}>
                    {language === 'ar' ? 'توصيل في 24-48 ساعة' : 'Delivery in 24-48 Hours'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-primary text-2xl">support_agent</span>
                </div>
                <div>
                  <h3 className={`${language === 'ar' ? 'arabic-text' : ''} text-lg font-bold text-[#2d1a1e] dark:text-white mb-1`}>
                    {language === 'ar' ? 'دعم 24/7' : '24/7 Support'}
                  </h3>
                  <p className={`${language === 'ar' ? 'arabic-text' : ''} text-sm text-[#2d1a1e]/70 dark:text-gray-400`}>
                    {language === 'ar' ? 'خدمة عملاء دائمة' : 'Round-the-clock Customer Service'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;