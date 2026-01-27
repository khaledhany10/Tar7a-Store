// src/components/Header.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../public/Logo.png';
import { useLanguage } from '../context/LanguageContext';
import { t, getLanguageName } from '../utils/translations';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();

  // إغلاق القوائم المنسدلة عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isLanguageDropdownOpen && !event.target.closest('.language-dropdown')) {
        setIsLanguageDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isLanguageDropdownOpen]);

  const handleLanguageToggle = () => {
    toggleLanguage();
    setIsLanguageDropdownOpen(false);
  };

  return (
    <header className="flex items-center justify-between border-b border-solid border-primary/10 px-6 md:px-20 py-5 bg-background-light/90 backdrop-blur-md sticky top-0 z-50 dark:bg-background-dark/90 dark:border-white/5">
      <Link to="/" className="flex items-center gap-2 text-primary">
        <div className="size-8">
          <img src={Logo} alt={t('header.shop', language)} />
        </div>
        <h2 className={`${language === 'ar' ? 'arabic-text' : ''} text-[#2d1a1e] dark:text-white text-2xl font-bold tracking-tight`}>
          {language === 'ar' ? 'متجر طرحة' : 'Tar7a_Store'}
        </h2>
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
      <nav className="hidden lg:flex items-center gap-6">
        <Link to="/" className={`${language === 'ar' ? 'arabic-text' : ''} text-[#2d1a1e] dark:text-gray-300 text-sm font-semibold hover:text-primary transition-colors`}>
          {t('header.home', language)}
        </Link>
        <Link to="/products" className={`${language === 'ar' ? 'arabic-text' : ''} text-[#2d1a1e] dark:text-gray-300 text-sm font-semibold hover:text-primary transition-colors`}>
          {t('header.allProducts', language)}
        </Link>
        
        <div className="relative group">
          <button className={`flex items-center gap-1 ${language === 'ar' ? 'arabic-text' : ''} text-[#2d1a1e] dark:text-gray-300 text-sm font-semibold hover:text-primary transition-colors`}>
            {t('header.fabrics', language)}
            <span className="material-symbols-outlined text-base">expand_more</span>
          </button>
          <div className={`absolute top-full ${language === 'ar' ? 'left-0' : 'right-0'} mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50`}>
            <Link to="/products?category=Chiffon" className={`${language === 'ar' ? 'arabic-text text-right' : 'text-left'} block px-4 py-3 hover:bg-primary/10 hover:text-primary transition-colors`}>
              {t('header.chiffon', language)}
            </Link>
            <Link to="/products?category=Silk" className={`${language === 'ar' ? 'arabic-text text-right' : 'text-left'} block px-4 py-3 hover:bg-primary/10 hover:text-primary transition-colors`}>
              {t('header.silk', language)}
            </Link>
            <Link to="/products?category=Jersey" className={`${language === 'ar' ? 'arabic-text text-right' : 'text-left'} block px-4 py-3 hover:bg-primary/10 hover:text-primary transition-colors`}>
              {t('header.jersey', language)}
            </Link>
            <Link to="/products?category=Modal" className={`${language === 'ar' ? 'arabic-text text-right' : 'text-left'} block px-4 py-3 hover:bg-primary/10 hover:text-primary transition-colors`}>
              {t('header.modal', language)}
            </Link>
          </div>
        </div>
        
        <Link to="/achievements" className={`${language === 'ar' ? 'arabic-text' : ''} text-[#2d1a1e] dark:text-gray-300 text-sm font-semibold hover:text-primary transition-colors`}>
          {t('header.achievements', language)}
        </Link>
        <Link to="/contact" className={`${language === 'ar' ? 'arabic-text' : ''} text-[#2d1a1e] dark:text-gray-300 text-sm font-semibold hover:text-primary transition-colors`}>
          {t('header.contact', language)}
        </Link>
        <Link to="/products?category=Sale" className={`${language === 'ar' ? 'arabic-text' : ''} text-primary text-sm font-semibold hover:text-primary-dark transition-colors`}>
          {t('header.sale', language)}
        </Link>
      </nav>
      
      {/* أدوات المستخدم */}
      <div className="flex items-center gap-4">
        {/* زر تبديل اللغة */}
        <div className="relative language-dropdown">
          <button
            onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <span className="material-symbols-outlined text-lg">translate</span>
            <span className={`${language === 'ar' ? 'arabic-text' : ''} text-sm font-medium`}>
              {getLanguageName(language)}
            </span>
            <span className="material-symbols-outlined text-sm">
              {isLanguageDropdownOpen ? 'expand_less' : 'expand_more'}
            </span>
          </button>
          
          {isLanguageDropdownOpen && (
            <div className={`absolute top-full ${language === 'ar' ? 'right-0' : 'left-0'} mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50`}>
              <button
                onClick={handleLanguageToggle}
                className={`${language === 'ar' ? 'arabic-text text-right' : 'text-left'} w-full px-4 py-3 flex items-center gap-3 hover:bg-primary/10 hover:text-primary transition-colors ${
                  language === 'en' ? 'bg-primary/5 text-primary' : ''
                }`}
              >
                <span className={`text-xs ${language === 'en' ? 'font-bold' : ''}`}>EN</span>
                <span className="flex-1">English</span>
                {language === 'en' && (
                  <span className="material-symbols-outlined text-sm">check</span>
                )}
              </button>
              
              <button
                onClick={handleLanguageToggle}
                className={`${language === 'ar' ? 'arabic-text text-right' : 'text-left'} w-full px-4 py-3 flex items-center gap-3 hover:bg-primary/10 hover:text-primary transition-colors ${
                  language === 'ar' ? 'bg-primary/5 text-primary' : ''
                }`}
              >
                <span className={`text-xs ${language === 'ar' ? 'font-bold' : ''}`}>AR</span>
                <span className="flex-1">العربية</span>
                {language === 'ar' && (
                  <span className="material-symbols-outlined text-sm">check</span>
                )}
              </button>
            </div>
          )}
        </div>
        
        {/* زر البحث */}
        <button className="text-[#2d1a1e] dark:text-white p-2" title={t('header.search', language)}>
          <span className="material-symbols-outlined">search</span>
        </button>
        
        {/* سلة التسوق */}
        <Link to="/cart" className="text-[#2d1a1e] dark:text-white p-2 relative" title={t('header.cart', language)}>
          <span className="material-symbols-outlined">shopping_bag</span>
          <span className="absolute top-1 right-1 bg-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
            {language === 'ar' ? '٠' : '0'}
          </span>
        </Link>
      </div>
      
      {/* القائمة المتنقلة */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-lg">
          <div className="px-6 py-4 space-y-4">
            <Link to="/" className={`${language === 'ar' ? 'arabic-text text-right' : ''} block py-2 hover:text-primary transition-colors`} onClick={() => setIsMenuOpen(false)}>
              {t('header.home', language)}
            </Link>
            <Link to="/products" className={`${language === 'ar' ? 'arabic-text text-right' : ''} block py-2 hover:text-primary transition-colors`} onClick={() => setIsMenuOpen(false)}>
              {t('header.allProducts', language)}
            </Link>
            <div className="space-y-2">
              <div className={`${language === 'ar' ? 'arabic-text text-right' : ''} font-semibold text-sm text-gray-500 uppercase tracking-wider`}>
                {t('header.fabrics', language)}
              </div>
              <Link to="/products?category=Chiffon" className={`${language === 'ar' ? 'arabic-text text-right' : ''} block py-2 ${language === 'ar' ? 'pr-4' : 'pl-4'} hover:text-primary transition-colors`} onClick={() => setIsMenuOpen(false)}>
                {t('header.chiffon', language)}
              </Link>
              <Link to="/products?category=Silk" className={`${language === 'ar' ? 'arabic-text text-right' : ''} block py-2 ${language === 'ar' ? 'pr-4' : 'pl-4'} hover:text-primary transition-colors`} onClick={() => setIsMenuOpen(false)}>
                {t('header.silk', language)}
              </Link>
              <Link to="/products?category=Jersey" className={`${language === 'ar' ? 'arabic-text text-right' : ''} block py-2 ${language === 'ar' ? 'pr-4' : 'pl-4'} hover:text-primary transition-colors`} onClick={() => setIsMenuOpen(false)}>
                {t('header.jersey', language)}
              </Link>
              <Link to="/products?category=Modal" className={`${language === 'ar' ? 'arabic-text text-right' : ''} block py-2 ${language === 'ar' ? 'pr-4' : 'pl-4'} hover:text-primary transition-colors`} onClick={() => setIsMenuOpen(false)}>
                {t('header.modal', language)}
              </Link>
            </div>
            <Link to="/achievements" className={`${language === 'ar' ? 'arabic-text text-right' : ''} block py-2 hover:text-primary transition-colors`} onClick={() => setIsMenuOpen(false)}>
              {t('header.achievements', language)}
            </Link>
            <Link to="/contact" className={`${language === 'ar' ? 'arabic-text text-right' : ''} block py-2 hover:text-primary transition-colors`} onClick={() => setIsMenuOpen(false)}>
              {t('header.contact', language)}
            </Link>
            <Link to="/products?category=Sale" className={`${language === 'ar' ? 'arabic-text text-right' : ''} block py-2 text-primary font-semibold`} onClick={() => setIsMenuOpen(false)}>
              {t('header.sale', language)}
            </Link>
            
            {/* زر تبديل اللغة في القائمة المتنقلة */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => {
                  handleLanguageToggle();
                  setIsMenuOpen(false);
                }}
                className={`${language === 'ar' ? 'arabic-text text-right' : ''} w-full flex items-center justify-between py-2 hover:text-primary transition-colors`}
              >
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined">translate</span>
                  <span>{t('header.switchLanguage', language)}</span>
                </span>
                <span className="text-sm font-medium">
                  {language === 'ar' ? 'English' : 'العربية'}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;