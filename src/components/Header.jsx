import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../public/Logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="flex items-center justify-between border-b border-solid border-primary/10 px-6 md:px-20 py-5 bg-background-light/90 backdrop-blur-md sticky top-0 z-50 dark:bg-background-dark/90 dark:border-white/5">
      <Link to="/" className="flex items-center gap-2 text-primary">
        <div className="size-8">
          <img src={Logo} alt="شعار متجر طرحة" />
        </div>
        <h2 className="arabic-text text-[#2d1a1e] dark:text-white text-2xl font-bold tracking-tight">متجر طرحة</h2>
      </Link>
      
      {/* زر القائمة المتنقلة */}
      <button 
        className="lg:hidden text-[#2d1a1e] dark:text-white"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <span className="material-symbols-outlined">
          {isMenuOpen ? 'close' : 'menu'}
        </span>
      </button>
      
      {/* التنقل لسطح المكتب */}
      <nav className="hidden lg:flex items-center gap-8">
        <Link to="/" className="arabic-text text-[#2d1a1e] dark:text-gray-300 text-sm font-semibold hover:text-primary transition-colors">الرئيسية</Link>
        <Link to="/products" className="arabic-text text-[#2d1a1e] dark:text-gray-300 text-sm font-semibold hover:text-primary transition-colors">جميع المنتجات</Link>
        
        <div className="relative group">
          <button className="flex items-center gap-1 arabic-text text-[#2d1a1e] dark:text-gray-300 text-sm font-semibold hover:text-primary transition-colors">
            الأقمشة
            <span className="material-symbols-outlined text-base">expand_more</span>
          </button>
          <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
            <Link to="/products?category=Chiffon" className="arabic-text block px-4 py-3 hover:bg-primary/10 hover:text-primary transition-colors text-right">شيفون</Link>
            <Link to="/products?category=Silk" className="arabic-text block px-4 py-3 hover:bg-primary/10 hover:text-primary transition-colors text-right">حرير</Link>
            <Link to="/products?category=Jersey" className="arabic-text block px-4 py-3 hover:bg-primary/10 hover:text-primary transition-colors text-right">جيرسي</Link>
            <Link to="/products?category=Modal" className="arabic-text block px-4 py-3 hover:bg-primary/10 hover:text-primary transition-colors text-right">مودال</Link>
          </div>
        </div>
        
        <Link to="/achievements" className="arabic-text text-[#2d1a1e] dark:text-gray-300 text-sm font-semibold hover:text-primary transition-colors">إنجازاتنا</Link>
        <Link to="/contact" className="arabic-text text-[#2d1a1e] dark:text-gray-300 text-sm font-semibold hover:text-primary transition-colors">اتصل بنا</Link>
        <Link to="/products?category=Sale" className="arabic-text text-primary text-sm font-semibold hover:text-primary-dark transition-colors">خصومات</Link>
      </nav>
      
      {/* القائمة المتنقلة */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-lg">
          <div className="px-6 py-4 space-y-4">
            <Link to="/" className="arabic-text block py-2 hover:text-primary transition-colors text-right" onClick={() => setIsMenuOpen(false)}>الرئيسية</Link>
            <Link to="/products" className="arabic-text block py-2 hover:text-primary transition-colors text-right" onClick={() => setIsMenuOpen(false)}>جميع المنتجات</Link>
            <div className="space-y-2">
              <div className="arabic-text font-semibold text-sm text-gray-500 uppercase tracking-wider text-right">الأقمشة</div>
              <Link to="/products?category=Chiffon" className="arabic-text block py-2 pr-4 hover:text-primary transition-colors text-right" onClick={() => setIsMenuOpen(false)}>شيفون</Link>
              <Link to="/products?category=Silk" className="arabic-text block py-2 pr-4 hover:text-primary transition-colors text-right" onClick={() => setIsMenuOpen(false)}>حرير</Link>
              <Link to="/products?category=Jersey" className="arabic-text block py-2 pr-4 hover:text-primary transition-colors text-right" onClick={() => setIsMenuOpen(false)}>جيرسي</Link>
              <Link to="/products?category=Modal" className="arabic-text block py-2 pr-4 hover:text-primary transition-colors text-right" onClick={() => setIsMenuOpen(false)}>مودال</Link>
            </div>
            <Link to="/achievements" className="arabic-text block py-2 hover:text-primary transition-colors text-right" onClick={() => setIsMenuOpen(false)}>إنجازاتنا</Link>
            <Link to="/contact" className="arabic-text block py-2 hover:text-primary transition-colors text-right" onClick={() => setIsMenuOpen(false)}>اتصل بنا</Link>
            <Link to="/products?category=Sale" className="arabic-text block py-2 text-primary font-semibold text-right" onClick={() => setIsMenuOpen(false)}>خصومات</Link>
          </div>
        </div>
      )}
      
      <div className="flex items-center gap-6">
        <Link to="/cart" className="text-[#2d1a1e] dark:text-white p-2 relative" title="سلة التسوق">
          <span className="material-symbols-outlined">shopping_bag</span>
          <span className="absolute top-1 right-1 bg-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">٠</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;