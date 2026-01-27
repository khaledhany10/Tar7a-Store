import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import Logo from "../../public/Logo.png"

const Footer = () => {
  const { language } = useLanguage();

  return (
    <footer className="px-6 md:px-20 py-20 bg-beige-card dark:bg-background-dark border-t border-primary/10">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
        <div className="lg:col-span-2">
          <div className={`flex items-center gap-2 text-primary mb-8 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
            <div className="size-6">
              <img src={Logo} alt={language === 'ar' ? "شعار متجر طرحة" : "Tar7a Store Logo"} />
            </div>
            <span className={`${language === 'ar' ? 'arabic-text' : ''} text-2xl font-bold dark:text-white`}>
              {language === 'ar' ? 'متجر طرحة' : 'Tar7a Store'}
            </span>
          </div>
          
          <p className={`${language === 'ar' ? 'arabic-text' : ''} text-[#2d1a1e]/60 dark:text-gray-400 text-base leading-relaxed max-w-sm`}>
            {language === 'ar' 
              ? 'تمكين المرأة المسلمة العصرية من خلال تصميمات مدروسة وحجابات عالية الجودة تحترم التقاليد والأناقة.'
              : 'Empowering the modern Muslim woman through thoughtful designs and high-quality hijabs that honor tradition and elegance.'
            }
          </p>
        </div>
        
        <div>
          <h5 className={`${language === 'ar' ? 'arabic-text' : ''} font-bold mb-6 dark:text-white uppercase tracking-widest text-sm`}>
            {language === 'ar' ? 'التسوق' : 'Shopping'}
          </h5>
          <ul className={`flex flex-col gap-4 text-sm text-[#2d1a1e]/70 dark:text-gray-400 font-medium ${language === 'ar' ? 'text-right' : 'text-left'}`}>
            <li>
              <Link to="/products" className={`${language === 'ar' ? 'arabic-text' : ''} hover:text-primary transition-colors`}>
                {language === 'ar' ? 'جميع المنتجات' : 'All Products'}
              </Link>
            </li>
            <li>
              <Link to="/products?category=Chiffon" className={`${language === 'ar' ? 'arabic-text' : ''} hover:text-primary transition-colors`}>
                {language === 'ar' ? 'مجموعة الشيفون' : 'Chiffon Collection'}
              </Link>
            </li>
            <li>
              <Link to="/products?category=Silk" className={`${language === 'ar' ? 'arabic-text' : ''} hover:text-primary transition-colors`}>
                {language === 'ar' ? 'الحرير الفاخر' : 'Luxury Silk'}
              </Link>
            </li>
            <li>
              <Link to="/products?category=Sale" className={`${language === 'ar' ? 'arabic-text' : ''} hover:text-primary transition-colors`}>
                {language === 'ar' ? 'العروض والخصومات' : 'Discounts & Offers'}
              </Link>
            </li>
          </ul>
        </div>
        
        <div>
          <h5 className={`${language === 'ar' ? 'arabic-text' : ''} font-bold mb-6 dark:text-white uppercase tracking-widest text-sm`}>
            {language === 'ar' ? 'الشركة' : 'Company'}
          </h5>
          <ul className={`flex flex-col gap-4 text-sm text-[#2d1a1e]/70 dark:text-gray-400 font-medium ${language === 'ar' ? 'text-right' : 'text-left'}`}>
            <li>
              <Link to="/achievements" className={`${language === 'ar' ? 'arabic-text' : ''} hover:text-primary transition-colors`}>
                {language === 'ar' ? 'إنجازاتنا' : 'Our Achievements'}
              </Link>
            </li>
            <li>
              <Link to="/contact" className={`${language === 'ar' ? 'arabic-text' : ''} hover:text-primary transition-colors`}>
                {language === 'ar' ? 'اتصل بنا' : 'Contact Us'}
              </Link>
            </li>
            <li>
              <a className={`${language === 'ar' ? 'arabic-text' : ''} hover:text-primary transition-colors`} href="#">
                {language === 'ar' ? 'عن متجر طرحة' : 'About Tar7a Store'}
              </a>
            </li>
            <li>
              <a className={`${language === 'ar' ? 'arabic-text' : ''} hover:text-primary transition-colors`} href="#">
                {language === 'ar' ? 'الوظائف' : 'Careers'}
              </a>
            </li>
          </ul>
        </div>
        
        <div>
          <h5 className={`${language === 'ar' ? 'arabic-text' : ''} font-bold mb-6 dark:text-white uppercase tracking-widest text-sm`}>
            {language === 'ar' ? 'الدعم' : 'Support'}
          </h5>
          <ul className={`flex flex-col gap-4 text-sm text-[#2d1a1e]/70 dark:text-gray-400 font-medium ${language === 'ar' ? 'text-right' : 'text-left'}`}>
            <li>
              <a className={`${language === 'ar' ? 'arabic-text' : ''} hover:text-primary transition-colors`} href="#">
                {language === 'ar' ? 'الشحن والإرجاع' : 'Shipping & Returns'}
              </a>
            </li>
            <li>
              <a className={`${language === 'ar' ? 'arabic-text' : ''} hover:text-primary transition-colors`} href="#">
                {language === 'ar' ? 'تتبع الطلب' : 'Track Order'}
              </a>
            </li>
            <li>
              <a className={`${language === 'ar' ? 'arabic-text' : ''} hover:text-primary transition-colors`} href="#">
                {language === 'ar' ? 'دليل العناية بالأقمشة' : 'Fabric Care Guide'}
              </a>
            </li>
            <li>
              <a className={`${language === 'ar' ? 'arabic-text' : ''} hover:text-primary transition-colors`} href="#">
                {language === 'ar' ? 'الأسئلة الشائعة' : 'FAQs'}
              </a>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-[1400px] mx-auto mt-20 pt-8 border-t border-primary/10 text-center text-sm text-[#2d1a1e]/40 dark:text-gray-600">
        <span className={`${language === 'ar' ? 'arabic-text' : ''}`}>
          {language === 'ar' 
            ? '© ٢٠٢٤ متجر طرحة. جميع الحقوق محفوظة. تمكين المرأة من خلال الموضة المحتشمة.'
            : '© 2024 Tar7a Store. All rights reserved. Empowering women through modest fashion.'
          }
        </span>
      </div>
    </footer>
  );
};

export default Footer;