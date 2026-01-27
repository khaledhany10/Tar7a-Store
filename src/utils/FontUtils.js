// src/utils/FontUtils.js

/**
 * وظائف مساعدة لاستخدام الخطوط المناسبة بناءً على اللغة
 */

// الحصول على كلاس الخط للجسم بناءً على اللغة
export const getBodyFontClass = (language) => {
  return language === 'ar' 
    ? 'font-arabic-body' 
    : 'font-english-body';
};

// الحصول على كلاس الخط للعناوين بناءً على اللغة
export const getHeadingFontClass = (language) => {
  return language === 'ar' 
    ? 'font-arabic-heading font-bold' 
    : 'font-english-heading font-bold';
};

// الحصول على كلاس التنسيق النصي بناءً على اللغة
export const getTextAlignmentClass = (language) => {
  return language === 'ar' 
    ? 'text-right' 
    : 'text-left';
};

// الحصول على إعدادات الخط للعناوين الرئيسية
export const getTitleFontStyles = (language) => {
  const baseClasses = "font-bold dark:text-white";
  const fontClass = getHeadingFontClass(language);
  const alignmentClass = getTextAlignmentClass(language);
  
  return `${baseClasses} ${fontClass} ${alignmentClass}`;
};

// الحصول على إعدادات الخط للنصوص العادية
export const getParagraphFontStyles = (language) => {
  const baseClasses = "text-gray-700 dark:text-gray-300";
  const fontClass = getBodyFontClass(language);
  const alignmentClass = getTextAlignmentClass(language);
  
  return `${baseClasses} ${fontClass} ${alignmentClass}`;
};