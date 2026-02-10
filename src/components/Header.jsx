// src/components/Header.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../public/Logo.png';
import { useLanguage } from '../context/LanguageContext';
import { t, getLanguageName } from '../utils/translations';

// دالة للتحقق إذا كان المستخدم مسجلاً كمدير
const isAdminUser = () => {
  if (typeof window === 'undefined') return false;
  
  try {
    const userData = localStorage.getItem('tar7a_user');
    if (!userData) return false;
    
    const user = JSON.parse(userData);
    
    // تحقق إذا كان المستخدم مسجلاً كمدير
    // يمكنك تغيير هذا الشرط حسب احتياجاتك
    const adminEmails = [
      'admin@tar7a.com',
      'admin@tar7astore.com', 
      'manager@tar7a.com',
      // أضف بريدك الإلكتروني هنا
      'your-email@example.com'
    ];
    
    // يمكنك أيضاً استخدام معرف خاص أو صلاحيات
    const isAdmin = user.isAdmin || adminEmails.includes(user.email?.toLowerCase());
    
    return isAdmin && user.loggedIn === true;
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
};

// دالة للتحقق إذا كان المستخدم مسجلاً دخولاً
const isUserLoggedIn = () => {
  if (typeof window === 'undefined') return false;
  
  try {
    const userData = localStorage.getItem('tar7a_user');
    if (!userData) return false;
    
    const user = JSON.parse(userData);
    return user.loggedIn === true;
  } catch (error) {
    return false;
  }
};

// دالة تسجيل الخروج
const handleLogout = () => {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem('tar7a_user');
  window.location.href = '/';
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();
  
  // حالة المستخدم
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userName, setUserName] = useState('');

  // تحديث حالة المستخدم عند التحميل والتغيرات
  useEffect(() => {
    const updateUserStatus = () => {
      const loggedInStatus = isUserLoggedIn();
      const adminStatus = isAdminUser();
      
      setLoggedIn(loggedInStatus);
      setIsAdmin(adminStatus);
      
      // جلب اسم المستخدم
      if (loggedInStatus) {
        try {
          const userData = localStorage.getItem('tar7a_user');
          if (userData) {
            const user = JSON.parse(userData);
            setUserName(user.fullName || user.email || 'User');
          }
        } catch (error) {
          console.error('Error getting user data:', error);
        }
      }
    };

    updateUserStatus();
    
    // استمع لتغييرات localStorage
    const handleStorageChange = () => {
      updateUserStatus();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // تحديث كل 2 ثانية للتأكد من المزامنة
    const interval = setInterval(updateUserStatus, 2000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // إغلاق القوائم المنسدلة عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isLanguageDropdownOpen && !event.target.closest('.language-dropdown')) {
        setIsLanguageDropdownOpen(false);
      }
      if (isUserDropdownOpen && !event.target.closest('.user-dropdown')) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isLanguageDropdownOpen, isUserDropdownOpen]);

  const handleLanguageToggle = () => {
    toggleLanguage();
    setIsLanguageDropdownOpen(false);
  };

  // الروابط الأساسية - تظهر للجميع
  const baseNavLinks = [
    { to: "/", label: t('header.home', language) },
    { to: "/products", label: t('header.allProducts', language) },
    { to: "/achievements", label: t('header.achievements', language) },
    { to: "/AboutUs", label: t('AboutUs', language) },
    { to: "/customize-order", label: language === 'ar' ? 'طلب مخصص' : 'Custom Order' },
  ];

  // رابط لوحة التحكم - يظهر فقط للمديرين
  const adminNavLink = isAdmin 
    ? [{ to: "/admin", label: language === 'ar' ? 'لوحة التحكم' : 'Admin Panel' }]
    : [];

  // جميع الروابط
  const navLinks = [...baseNavLinks, ...adminNavLink];

  return (
    <header className="flex items-center justify-between border-b border-solid border-primary/10 px-6 md:px-20 py-5 bg-background-light/90 backdrop-blur-md sticky top-0 z-50 dark:bg-background-dark/90 dark:border-white/5">
      <Link to="/" className="flex items-center gap-2 text-primary">
        <div className="size-8">
          <img src={Logo} alt={t('header.shop', language)} />
        </div>
        <h2 className={`${language === 'ar' ? 'arabic-text' : ''} text-[#2d1a1e] dark:text-white text-2xl font-bold tracking-tight`}>
          Tar7a_Store
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
        {navLinks.map((link, index) => (
          <Link 
            key={index}
            to={link.to} 
            className={`${language === 'ar' ? 'arabic-text' : ''} text-[#2d1a1e] dark:text-gray-300 text-sm font-semibold hover:text-primary transition-colors`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      
      {/* أدوات المستخدم */}
      <div className="flex items-center gap-4">
        {/* زر حساب المستخدم */}
        {loggedIn ? (
          <div className="relative user-dropdown">
            <button
              onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                {userName.charAt(0).toUpperCase()}
              </div>
              <span className={`${language === 'ar' ? 'arabic-text' : ''} text-sm font-medium hidden md:inline`}>
                {userName}
              </span>
              <span className="material-symbols-outlined text-sm">
                {isUserDropdownOpen ? 'expand_less' : 'expand_more'}
              </span>
            </button>
            
            {isUserDropdownOpen && (
              <div className={`absolute top-full ${language === 'ar' ? 'right-0' : 'left-0'} mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50`}>
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold">
                      {userName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white truncate">
                        {userName}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {isAdmin 
                          ? (language === 'ar' ? 'مدير النظام' : 'Administrator')
                          : (language === 'ar' ? 'مستخدم' : 'User')
                        }
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-2">
                  <Link
                    to="/profile"
                    className={`${language === 'ar' ? 'arabic-text text-right' : 'text-left'} flex items-center gap-3 w-full px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors`}
                    onClick={() => setIsUserDropdownOpen(false)}
                  >
                    <span className="material-symbols-outlined text-lg">person</span>
                    <span>{language === 'ar' ? 'الملف الشخصي' : 'Profile'}</span>
                  </Link>
                  
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className={`${language === 'ar' ? 'arabic-text text-right' : 'text-left'} flex items-center gap-3 w-full px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors`}
                      onClick={() => setIsUserDropdownOpen(false)}
                    >
                      <span className="material-symbols-outlined text-lg">dashboard</span>
                      <span>{language === 'ar' ? 'لوحة التحكم' : 'Admin Panel'}</span>
                    </Link>
                  )}
                  
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsUserDropdownOpen(false);
                    }}
                    className={`${language === 'ar' ? 'arabic-text text-right' : 'text-left'} flex items-center gap-3 w-full px-3 py-2 rounded hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors`}
                  >
                    <span className="material-symbols-outlined text-lg">logout</span>
                    <span>{language === 'ar' ? 'تسجيل الخروج' : 'Logout'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          // أزرار تسجيل الدخول/التسجيل إذا لم يكن المستخدم مسجلاً
          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="px-4 py-2 text-primary hover:text-purple-600 font-medium transition-colors"
            >
              {language === 'ar' ? 'تسجيل الدخول' : 'Login'}
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 bg-gradient-to-r from-primary to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
            >
              {language === 'ar' ? 'انشاء حساب' : 'Register'}
            </Link>
          </div>
        )}

        {/* زر تبديل اللغة */}
        <div className="relative language-dropdown">
          <button
            onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <span className="material-symbols-outlined text-lg">translate</span>
            <span className={`${language === 'ar' ? 'arabic-text' : ''} text-sm font-medium hidden md:inline`}>
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
      </div>
      
      {/* القائمة المتنقلة */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-lg z-40">
          <div className="px-6 py-4 space-y-4">
            {navLinks.map((link, index) => (
              <Link 
                key={index}
                to={link.to} 
                className={`${language === 'ar' ? 'arabic-text text-right' : ''} block py-2 hover:text-primary transition-colors text-[#2d1a1e] dark:text-gray-300 text-base font-medium`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            
            {/* حالة المستخدم في القائمة المتنقلة */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-4">
              {loggedIn ? (
                <>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold">
                      {userName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {userName}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {isAdmin 
                          ? (language === 'ar' ? 'مدير النظام' : 'Administrator')
                          : (language === 'ar' ? 'مستخدم' : 'User')
                        }
                      </p>
                    </div>
                  </div>
                  
                  <Link
                    to="/profile"
                    className={`${language === 'ar' ? 'arabic-text text-right' : ''} flex items-center gap-3 py-2 hover:text-primary transition-colors`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="material-symbols-outlined">person</span>
                    <span>{language === 'ar' ? 'الملف الشخصي' : 'Profile'}</span>
                  </Link>
                  
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className={`${language === 'ar' ? 'arabic-text text-right' : ''} flex items-center gap-3 py-2 hover:text-primary transition-colors`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="material-symbols-outlined">dashboard</span>
                      <span>{language === 'ar' ? 'لوحة التحكم' : 'Admin Panel'}</span>
                    </Link>
                  )}
                  
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className={`${language === 'ar' ? 'arabic-text text-right' : ''} flex items-center gap-3 py-2 text-red-600 dark:text-red-400 hover:text-red-700 transition-colors w-full`}
                  >
                    <span className="material-symbols-outlined">logout</span>
                    <span>{language === 'ar' ? 'تسجيل الخروج' : 'Logout'}</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className={`${language === 'ar' ? 'arabic-text text-right' : ''} block py-2 hover:text-primary transition-colors`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {language === 'ar' ? 'تسجيل الدخول' : 'Login'}
                  </Link>
                  
                  <Link
                    to="/register"
                    className={`${language === 'ar' ? 'arabic-text text-right' : ''} block py-2 bg-gradient-to-r from-primary to-purple-600 text-white rounded-lg text-center`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {language === 'ar' ? 'انشاء حساب' : 'Register'}
                  </Link>
                </>
              )}
              
              {/* زر تبديل اللغة في القائمة المتنقلة */}
              <button
                onClick={() => {
                  handleLanguageToggle();
                  setIsMenuOpen(false);
                }}
                className={`${language === 'ar' ? 'arabic-text text-right' : ''} w-full flex items-center justify-between py-2 hover:text-primary transition-colors text-[#2d1a1e] dark:text-gray-300 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700`}
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