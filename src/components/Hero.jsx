import { Link } from 'react-router-dom';
import Logo from "../../public/img/32.jpeg"

const Hero = () => {
  
  return (
    <section className="px-6 md:px-20 py-12 lg:py-20">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col gap-12 lg:flex-row items-center">
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <div className="flex flex-col gap-6 text-right lg:pr-12">
              <h1 className="arabic-text text-[#2d1a1e] dark:text-white text-5xl md:text-7xl lg:text-8xl font-black leading-tight">
                الحياء و <br/><span className="text-primary italic">الجمال</span>
              </h1>
              <p className="arabic-text text-[#2d1a1e]/70 dark:text-gray-400 text-lg md:text-xl font-normal leading-relaxed max-w-[500px]">
                إعادة تعريف الحجاب العصري. اكتشف مجموعتنا الجديدة من الأقمشة المميزة، المصممة للأناقة اليومية والرقي المحتشم.
              </p>
              <div className="flex flex-wrap gap-4 mt-6">
                <Link 
                  to="/products" 
                  className="arabic-text flex min-w-[200px] cursor-pointer items-center justify-center rounded-full h-14 px-8 bg-primary text-white text-lg font-bold shadow-xl shadow-primary/30 hover:shadow-2xl hover:translate-y-[-2px] transition-all"
                >
                  تسوق المجموعة
                </Link>
                <Link 
                  to="/products" 
                  className="arabic-text flex min-w-[200px] cursor-pointer items-center justify-center rounded-full h-14 px-8 border-2 border-primary/20 text-primary text-lg font-bold hover:bg-primary/5 transition-all"
                >
                  أقمشتنا
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
                <div className="absolute bottom-10 right-10 text-white text-right">
                  <p className="arabic-text text-sm font-medium uppercase tracking-[0.2em] mb-1">موسم جديد</p>
                  <p className="arabic-text text-2xl font-bold">مجموعة الحرير</p>
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