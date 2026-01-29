import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import Logo from "../../public/Shefon print/Shefon print 14.jpeg";

const Hero = () => {
  const { language } = useLanguage();
  
  return (
    <section className="px-6 md:px-20 py-12 lg:py-20">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col gap-12 lg:flex-row items-center">
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <div className={`${language === 'ar' ? 'text-right' : 'text-left'} lg:pr-12`}>
              <h1 
                className={`${language === 'ar' ? 'arabic-text' : ''} text-[#2d1a1e] dark:text-white text-5xl md:text-7xl lg:text-8xl font-black leading-tight`}
                dangerouslySetInnerHTML={{ __html: language === 'ar' 
                  ? 'الحياء و <br/><span class="text-primary italic">الجمال</span>'
                  : 'Modesty & <br/><span class="text-primary italic">Beauty</span>'
                }}
              />
              <p className={`${language === 'ar' ? 'arabic-text' : ''} text-[#2d1a1e]/70 dark:text-gray-400 text-lg md:text-xl font-normal leading-relaxed max-w-[500px] mt-4`}>
                {language === 'ar' 
                  ? 'إعادة تعريف الحجاب العصري. اكتشف مجموعتنا الجديدة من الأقمشة المميزة، المصممة للأناقة اليومية والرقي المحتشم.'
                  : 'Redefining modern hijab. Discover our new collection of premium fabrics, designed for everyday elegance and modest sophistication.'
                }
              </p>
              <div className="flex flex-wrap gap-4 mt-6">
                <Link 
                  to="/products" 
                  className={`${language === 'ar' ? 'arabic-text' : ''} flex min-w-[200px] cursor-pointer items-center justify-center rounded-full h-14 px-8 bg-primary text-white text-lg font-bold shadow-xl shadow-primary/30 hover:shadow-2xl hover:translate-y-[-2px] transition-all`}
                >
                  {language === 'ar' ? 'تسوق المجموعة' : 'Shop Collection'}
                </Link>
                <Link 
                  to="/products" 
                  className={`${language === 'ar' ? 'arabic-text' : ''} flex min-w-[200px] cursor-pointer items-center justify-center rounded-full h-14 px-8 border-2 border-primary/20 text-primary text-lg font-bold hover:bg-primary/5 transition-all`}
                >
                  {language === 'ar' ? 'أقمشتنا' : 'Our Fabrics'}
                </Link>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -right-10 w-56 h-56 bg-peach-soft rounded-full blur-3xl"></div>
              <div className="relative w-full aspect-[1/1.2] lg:aspect-[4/5] bg-center bg-no-repeat bg-cover rounded-[3rem] shadow-2xl overflow-hidden border-[12px] border-white dark:border-background-dark" style={{backgroundImage: `url(${Logo})`}}>
                <div className="absolute inset-0 bg-gradient-to-t from-[#2d1a1e]/30 to-transparent"></div>
                <div className={`absolute bottom-10 ${language === 'ar' ? 'right-10 text-right' : 'left-10 text-left'}`}>
                  <p className={`${language === 'ar' ? 'arabic-text' : ''} text-white text-sm font-medium uppercase tracking-[0.2em] mb-1`}>
                    {language === 'ar' ? 'موسم جديد' : 'New Season'}
                  </p>
                  <p className={`${language === 'ar' ? 'arabic-text' : ''} text-white text-2xl font-bold`}>
                    {language === 'ar' ? 'مجموعة الحرير' : 'Silk Collection'}
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