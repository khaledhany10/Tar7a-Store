// src/utils/translations.js
import arTranslations from '../locales/ar.json';
import enTranslations from '../locales/en.json';

const translations = {
  ar: arTranslations,
  en: enTranslations
};

export const t = (key, language = 'ar') => {
  const keys = key.split('.');
  let value = translations[language];
  
  for (const k of keys) {
    if (value && value[k] !== undefined) {
      value = value[k];
    } else {
      // إذا لم توجد الترجمة، ارجع المفتاح أو الترجمة الأخرى
      return translations['en'][k] || key;
    }
  }
  
  return value;
};

// دالة للحصول على الاتجاه بناءً على اللغة
export const getDirection = (language) => {
  return language === 'ar' ? 'rtl' : 'ltr';
};

// دالة للحصول على اسم اللغة بالكامل
export const getLanguageName = (language) => {
  return language === 'ar' ? 'العربية' : 'English';
};