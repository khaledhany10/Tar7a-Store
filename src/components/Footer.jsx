import React from 'react';
import { Link } from 'react-router-dom';
import Logo from "../../public/Logo.png"

const Footer = () => {
  return (
    <footer className="px-6 md:px-20 py-20 bg-beige-card dark:bg-background-dark border-t border-primary/10">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 text-primary mb-8">
            <div className="size-6">
              <img src={Logo} alt="شعار متجر طرحة" />
            </div>
            <span className="arabic-text text-2xl font-bold dark:text-white">متجر طرحة</span>
          </div>
          
          <p className="arabic-text text-[#2d1a1e]/60 dark:text-gray-400 text-base leading-relaxed max-w-sm">
            تمكين المرأة المسلمة العصرية من خلال تصميمات مدروسة وحجابات عالية الجودة تحترم التقاليد والأناقة.
          </p>
          
        </div>
        
        <div>
          <h5 className="arabic-text font-bold mb-6 dark:text-white uppercase tracking-widest text-sm">التسوق</h5>
          <ul className="flex flex-col gap-4 text-sm text-[#2d1a1e]/70 dark:text-gray-400 font-medium">
            <li><Link to="/products" className="arabic-text hover:text-primary transition-colors">جميع المنتجات</Link></li>
            <li><Link to="/products?category=Chiffon" className="arabic-text hover:text-primary transition-colors">مجموعة الشيفون</Link></li>
            <li><Link to="/products?category=Silk" className="arabic-text hover:text-primary transition-colors">الحرير الفاخر</Link></li>
            <li><Link to="/products?category=Sale" className="arabic-text hover:text-primary transition-colors">العروض والخصومات</Link></li>
          </ul>
        </div>
        
        <div>
          <h5 className="arabic-text font-bold mb-6 dark:text-white uppercase tracking-widest text-sm">الشركة</h5>
          <ul className="flex flex-col gap-4 text-sm text-[#2d1a1e]/70 dark:text-gray-400 font-medium">
            <li><Link to="/achievements" className="arabic-text hover:text-primary transition-colors">إنجازاتنا</Link></li>
            <li><Link to="/contact" className="arabic-text hover:text-primary transition-colors">اتصل بنا</Link></li>
            <li><a className="arabic-text hover:text-primary transition-colors" href="#">عن متجر طرحة</a></li>
            <li><a className="arabic-text hover:text-primary transition-colors" href="#">الوظائف</a></li>
          </ul>
        </div>
        
        <div>
          <h5 className="arabic-text font-bold mb-6 dark:text-white uppercase tracking-widest text-sm">الدعم</h5>
          <ul className="flex flex-col gap-4 text-sm text-[#2d1a1e]/70 dark:text-gray-400 font-medium">
            <li><a className="arabic-text hover:text-primary transition-colors" href="#">الشحن والإرجاع</a></li>
            <li><a className="arabic-text hover:text-primary transition-colors" href="#">تتبع الطلب</a></li>
            <li><a className="arabic-text hover:text-primary transition-colors" href="#">دليل العناية بالأقمشة</a></li>
            <li><a className="arabic-text hover:text-primary transition-colors" href="#">الأسئلة الشائعة</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-[1400px] mx-auto mt-20 pt-8 border-t border-primary/10 text-center text-sm text-[#2d1a1e]/40 dark:text-gray-600">
        <span className="arabic-text">© ٢٠٢٤ متجر طرحة. جميع الحقوق محفوظة. تمكين المرأة من خلال الموضة المحتشمة.</span>
      </div>
    </footer>
  );
};

export default Footer;