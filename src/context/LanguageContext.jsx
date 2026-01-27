import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('ar');
  const [direction, setDirection] = useState('rtl');

  useEffect(() => {
    // تحقق من اللغة المحفوظة في localStorage
    const savedLang = localStorage.getItem('language') || 'ar';
    setLanguage(savedLang);
    setDirection(savedLang === 'ar' ? 'rtl' : 'ltr');
    
    // تطبيق الاتجاه على الـ body
    document.body.dir = savedLang === 'ar' ? 'rtl' : 'ltr';
  }, []);

  const toggleLanguage = () => {
    const newLang = language === 'ar' ? 'en' : 'ar';
    setLanguage(newLang);
    setDirection(newLang === 'ar' ? 'rtl' : 'ltr');
    localStorage.setItem('language', newLang);
    
    // تحديث اتجاه الـ body
    document.body.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  };

  return (
    <LanguageContext.Provider value={{ language, direction, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};