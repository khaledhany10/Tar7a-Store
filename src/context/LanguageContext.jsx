// src/context/LanguageContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { translations, t, getDirection, getLanguageName } from '../locales/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('ar');
  const [direction, setDirection] = useState('rtl');
  const [isInitialized, setIsInitialized] = useState(false);

  // تهيئة اللغة عند تحميل المكون
  useEffect(() => {
    const savedLang = localStorage.getItem('language');
    const browserLang = navigator.language.substring(0, 2); // الحصول على أول حرفين من لغة المتصفح
    
    let initialLang = 'ar'; // اللغة الافتراضية
    
    if (savedLang && (savedLang === 'ar' || savedLang === 'en')) {
      initialLang = savedLang;
    } else if (browserLang === 'ar' || browserLang === 'en') {
      initialLang = browserLang;
    }
    
    setLanguage(initialLang);
    setDirection(initialLang === 'ar' ? 'rtl' : 'ltr');
    
    // تطبيق الاتجاه على العناصر
    document.documentElement.lang = initialLang;
    document.documentElement.dir = initialLang === 'ar' ? 'rtl' : 'ltr';
    document.body.dir = initialLang === 'ar' ? 'rtl' : 'ltr';
    
    // إضافة class للغة على الـ body
    document.body.classList.remove('language-ar', 'language-en');
    document.body.classList.add(`language-${initialLang}`);
    
    setIsInitialized(true);
  }, []);

  // تغيير اللغة
  const changeLanguage = (newLang) => {
    if (newLang !== 'ar' && newLang !== 'en') {
      console.warn(`لغة غير مدعومة: ${newLang}. تم تعيين اللغة العربية كبديل.`);
      newLang = 'ar';
    }
    
    setLanguage(newLang);
    setDirection(newLang === 'ar' ? 'rtl' : 'ltr');
    localStorage.setItem('language', newLang);
    
    // تحديث العناصر
    document.documentElement.lang = newLang;
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.body.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    
    // تحديث class للغة
    document.body.classList.remove('language-ar', 'language-en');
    document.body.classList.add(`language-${newLang}`);
    
    // تحديث العنوان بناءً على اللغة
    if (newLang === 'ar') {
      document.title = 'متجر طرحة - حجابات إسلامية مميزة';
    } else {
      document.title = 'Tar7a Store - Premium Islamic Hijabs';
    }
  };

  // تبديل اللغة بين العربية والإنجليزية
  const toggleLanguage = () => {
    const newLang = language === 'ar' ? 'en' : 'ar';
    changeLanguage(newLang);
  };

  // دالة الترجمة مع معالجة النصوص التي تحتوي على HTML
  const translate = (key, variables = {}) => {
    if (!translations[language] || !translations[language][key]) {
      console.warn(`مفتاح ترجمة غير موجود: ${key} في اللغة: ${language}`);
      return key;
    }
    
    let translation = translations[language][key];
    
    // استبدال المتغيرات إذا وجدت
    Object.keys(variables).forEach(variable => {
      const regex = new RegExp(`\\{\\{${variable}\\}\\}`, 'g');
      translation = translation.replace(regex, variables[variable]);
    });
    
    return translation;
  };

  // دالة الترجمة الآمنة (بدون HTML)
  const translateText = (key, variables = {}) => {
    const translated = translate(key, variables);
    // إزالة أي علامات HTML للحصول على نص خالص
    return translated.replace(/<[^>]*>/g, '');
  };

  // دالة الترجمة مع HTML (للعناوين التي تحتوي على تنسيق)
  const translateHtml = (key, variables = {}) => {
    const translated = translate(key, variables);
    return <span dangerouslySetInnerHTML={{ __html: translated }} />;
  };

  // الحصول على اسم اللغة الحالية
  const getCurrentLanguageName = () => {
    return getLanguageName(language);
  };

  // الحصول على كل الترجمات للغة الحالية
  const getAllTranslations = () => {
    return translations[language] || {};
  };

  // فحص إذا كانت اللغة هي العربية
  const isArabic = () => language === 'ar';

  // فحص إذا كانت اللغة هي الإنجليزية
  const isEnglish = () => language === 'en';

  // الحصول على اتجاه النص
  const getTextDirection = () => direction;

  // إعادة تعيين اللغة إلى الافتراضي
  const resetToDefault = () => {
    changeLanguage('ar');
  };

  const value = {
    language,
    direction,
    isInitialized,
    isArabic,
    isEnglish,
    getTextDirection,
    t: translate, // اختصار
    translate,
    translateText,
    translateHtml,
    getCurrentLanguageName,
    getAllTranslations,
    toggleLanguage,
    changeLanguage,
    resetToDefault
  };

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          <p className="mt-4 text-gray-600">جاري تحميل اللغة...</p>
        </div>
      </div>
    );
  }

  return (
    <LanguageContext.Provider value={value}>
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

// دالة مساعدة لاستخدام الترجمات خارج المكونات
export const getTranslation = (key, lang = 'ar') => {
  return translations[lang]?.[key] || key;
};

// دالة للحصول على الاتجاه بناءً على اللغة
export const getLanguageDirection = (lang) => {
  return getDirection(lang);
};

// دالة للتحقق من صحة مفتاح الترجمة
export const hasTranslation = (key, lang = 'ar') => {
  return !!translations[lang]?.[key];
};

// إنشاء هوك مساعد للترجمة السريعة
export const useT = () => {
  const { translate } = useLanguage();
  return translate;
};

// إنشاء هوك مساعد للترجمة النصية
export const useText = () => {
  const { translateText } = useLanguage();
  return translateText;
};

// إنشاء هوك مساعد للترجمة مع HTML
export const useHtml = () => {
  const { translateHtml } = useLanguage();
  return translateHtml;
};

// هوك للحصول على حالة اللغة الحالية
export const useLanguageState = () => {
  const { language, direction, isArabic, isEnglish } = useLanguage();
  return { language, direction, isArabic, isEnglish };
};