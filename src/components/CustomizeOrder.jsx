import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const CustomizeOrder = () => {
  const { language } = useLanguage();
  const phoneNumber = '01066362979';
  const whatsappLink = `https://wa.me/${phoneNumber.replace('0', '2')}`;
  
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(phoneNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppClick = () => {
    const message = language === 'ar' 
      ? 'مرحباً! أريد طلب مخصص من متجر طرحة'
      : 'Hello! I would like to place a custom order from Tar7a Store';
    
    const whatsappUrl = `${whatsappLink}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const features = [
    {
      icon: "star",
      title_ar: "تصميم حسب الطلب",
      title_en: "Custom Design",
      description_ar: "اختياري لألوان، أقمشة، وتصاميم تناسب ذوقك الشخصي",
      description_en: "Choose colors, fabrics, and designs that match your personal taste"
    },
    {
      icon: "palette",
      title_ar: "مجموعة ألوان متنوعة",
      title_en: "Color Variety",
      description_ar: "اختر من مجموعة واسعة من الألوان المتاحة",
      description_en: "Choose from a wide range of available colors"
    },
    {
      icon: "style",
      title_ar: "تفاصيل مخصصة",
      title_en: "Custom Details",
      description_ar: "إضافة تفاصيل خاصة مثل تطريز أو زخارف",
      description_en: "Add special details like embroidery or decorations"
    },
    {
      icon: "check_circle",
      title_ar: "جودة عالية",
      title_en: "High Quality",
      description_ar: "نضمن لكم الجودة العالية في كل منتج مخصص",
      description_en: "We guarantee high quality in every custom product"
    }
  ];

  const processSteps = [
    {
      number: "01",
      title_ar: "التواصل معنا",
      title_en: "Contact Us",
      description_ar: "تواصل معنا عبر الواتساب لتحديد مواصفات طلبك",
      description_en: "Contact us via WhatsApp to specify your order requirements"
    },
    {
      number: "02",
      title_ar: "مناقشة التصميم",
      title_en: "Design Discussion",
      description_ar: "نناقش معك التصميم، الألوان، والأقمشة المناسبة",
      description_en: "We discuss the design, colors, and suitable fabrics with you"
    },
    {
      number: "03",
      title_ar: "تأكيد الطلب",
      title_en: "Order Confirmation",
      description_ar: "تأكيد الطلب والمواصفات النهائية",
      description_en: "Confirm the order and final specifications"
    },
    {
      number: "04",
      title_ar: "التنفيذ والتوصيل",
      title_en: "Implementation & Delivery",
      description_ar: "ننفذ طلبك بدقة ونقوم بالتوصيل إلى عنوانك",
      description_en: "We implement your order precisely and deliver to your address"
    }
  ];

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Hero Section */}
      <div className="relative py-20 px-6 md:px-20 bg-gradient-to-r from-primary/10 to-peach-soft dark:from-primary/5 dark:to-background-dark">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className={`${language === 'ar' ? 'arabic-text' : ''} text-5xl md:text-7xl font-bold mb-6 dark:text-white`}>
              {language === 'ar' ? 'طلب مخصص' : 'Custom Order'}
            </h1>
            <p className={`${language === 'ar' ? 'arabic-text' : ''} text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto`}>
              {language === 'ar' 
                ? 'احصلي على حجاب مصمم خصيصاً لك! اختباري ألوانك المفضلة، أقمشتك المفضلة، وتصميمك المناسب.'
                : 'Get a hijab designed specifically for you! Choose your favorite colors, fabrics, and suitable design.'
              }
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-20 py-16">
        {/* Contact Card */}
        <div className="mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className={`${language === 'ar' ? 'text-right' : 'text-left'}`}>
                <h2 className={`${language === 'ar' ? 'arabic-text' : ''} text-3xl font-bold mb-4 dark:text-white`}>
                  {language === 'ar' ? 'تواصل معنا للطلب المخصص' : 'Contact Us for Custom Order'}
                </h2>
                <p className={`${language === 'ar' ? 'arabic-text' : ''} text-gray-600 dark:text-gray-300 mb-8`}>
                  {language === 'ar' 
                    ? 'تواصل معنا عبر الواتساب لطلب حجاب مصمم خصيصاً لك. سنعمل معك لتحقيق رؤيتك وتنفيذ التصميم الذي ترغبين به.'
                    : 'Contact us via WhatsApp to order a custom-designed hijab. We will work with you to realize your vision and implement the design you desire.'
                  }
                </p>
                
                {/* Features */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                        <span className="material-symbols-outlined">{feature.icon}</span>
                      </div>
                      <div className={`${language === 'ar' ? 'text-right' : 'text-left'}`}>
                        <h4 className={`${language === 'ar' ? 'arabic-text' : ''} font-bold text-sm mb-1 dark:text-white`}>
                          {language === 'ar' ? feature.title_ar : feature.title_en}
                        </h4>
                        <p className={`${language === 'ar' ? 'arabic-text' : ''} text-xs text-gray-600 dark:text-gray-400`}>
                          {language === 'ar' ? feature.description_ar : feature.description_en}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* WhatsApp Card */}
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-8 text-white text-center">
                <div className="mb-6">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="material-symbols-outlined text-4xl">whatsapp</span>
                  </div>
                  <h3 className={`${language === 'ar' ? 'arabic-text' : ''} text-2xl font-bold mb-2`}>
                    {language === 'ar' ? 'تواصل عبر الواتساب' : 'Contact via WhatsApp'}
                  </h3>
                  <p className="text-white/90">
                    {language === 'ar' 
                      ? 'متوفر 24/7 للرد على استفساراتك وطلباتك'
                      : 'Available 24/7 to answer your inquiries and orders'
                    }
                  </p>
                </div>

                {/* Phone Number */}
                <div className="mb-8">
                  <div className={`${language === 'ar' ? 'arabic-text' : ''} text-3xl font-bold mb-2 tracking-wider`}>
                    {phoneNumber}
                  </div>
                  <div className="text-white/80 text-sm">
                    {language === 'ar' ? 'رقم الواتساب' : 'WhatsApp Number'}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleWhatsAppClick}
                    className="bg-white text-green-600 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined">send</span>
                    {language === 'ar' ? 'فتح الواتساب' : 'Open WhatsApp'}
                  </button>
                  
                  <button
                    onClick={copyToClipboard}
                    className="bg-transparent border-2 border-white py-3 rounded-lg font-bold hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                  >
                    {copied ? (
                      <>
                        <span className="material-symbols-outlined">check</span>
                        {language === 'ar' ? 'تم النسخ!' : 'Copied!'}
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined">content_copy</span>
                        {language === 'ar' ? 'نسخ الرقم' : 'Copy Number'}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Process Steps */}
        <div className="mb-16">
          <h2 className={`${language === 'ar' ? 'arabic-text' : ''} text-3xl font-bold text-center mb-12 dark:text-white`}>
            {language === 'ar' ? 'خطوات الطلب المخصص' : 'Custom Order Process'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 h-full">
                  <div className={`${language === 'ar' ? 'arabic-text text-right' : 'text-left'}`}>
                    <div className={`${language === 'ar' ? 'arabic-text' : ''} text-4xl font-bold text-primary/20 mb-4`}>
                      {step.number}
                    </div>
                    <h3 className={`${language === 'ar' ? 'arabic-text' : ''} text-xl font-bold mb-3 dark:text-white`}>
                      {language === 'ar' ? step.title_ar : step.title_en}
                    </h3>
                    <p className={`${language === 'ar' ? 'arabic-text' : ''} text-gray-600 dark:text-gray-300`}>
                      {language === 'ar' ? step.description_ar : step.description_en}
                    </p>
                  </div>
                </div>
                
                {/* Connector Line (except for last step) */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 right-0 w-8 h-0.5 bg-primary/20 transform translate-x-1/2"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-3xl p-8 md:p-12">
          <h2 className={`${language === 'ar' ? 'arabic-text' : ''} text-3xl font-bold text-center mb-8 dark:text-white`}>
            {language === 'ar' ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question_ar: "كم تستغرق مدة تنفيذ الطلب المخصص؟",
                question_en: "How long does it take to implement a custom order?",
                answer_ar: "عادةً ما تستغرق من 3 إلى 7 أيام عمل حسب تعقيد التصميم. سنخبرك بالمدة التقديرية عند مناقشة الطلب.",
                answer_en: "Usually it takes 3 to 7 working days depending on the complexity of the design. We will inform you of the estimated time when discussing the order."
              },
              {
                question_ar: "هل يمكنني طلب ألوان غير موجودة في المعرض؟",
                question_en: "Can I request colors not available in the gallery?",
                answer_ar: "نعم! يمكننا البحث عن الأقمشة بالألوان التي ترغبين بها. فقط أرسلي لنا صورة للون المطلوب.",
                answer_en: "Yes! We can search for fabrics in the colors you desire. Just send us a picture of the required color."
              },
              {
                question_ar: "هل يمكنني إضافة تطريز خاص أو شعار؟",
                question_en: "Can I add special embroidery or a logo?",
                answer_ar: "نعم، يمكننا إضافة التطريز أو الشعار الذي ترغبين به. سنحتاج فقط إلى تصميم واضح للتنفيذ.",
                answer_en: "Yes, we can add the embroidery or logo you desire. We just need a clear design for implementation."
              },
              {
                question_ar: "كيف أدفع مقابل الطلب المخصص؟",
                question_en: "How do I pay for a custom order?",
                answer_ar: "يمكنك الدفع عند الاستلام أو التحويل البنكي. سنناقش معك طريقة الدفع المناسبة.",
                answer_en: "You can pay cash on delivery or by bank transfer. We will discuss the appropriate payment method with you."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6">
                <div className={`flex justify-between items-center cursor-pointer ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                  <h3 className={`${language === 'ar' ? 'arabic-text' : ''} text-lg font-bold dark:text-white`}>
                    {language === 'ar' ? faq.question_ar : faq.question_en}
                  </h3>
                  <span className="material-symbols-outlined text-primary">expand_more</span>
                </div>
                <div className={`mt-4 ${language === 'ar' ? 'arabic-text' : ''} text-gray-600 dark:text-gray-300`}>
                  {language === 'ar' ? faq.answer_ar : faq.answer_en}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-block p-1 bg-gradient-to-r from-primary to-primary-dark rounded-2xl">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8">
              <h3 className={`${language === 'ar' ? 'arabic-text' : ''} text-2xl font-bold mb-4 dark:text-white`}>
                {language === 'ar' 
                  ? 'جاهزة لبدء طلبك المخصص؟'
                  : 'Ready to start your custom order?'
                }
              </h3>
              <p className={`${language === 'ar' ? 'arabic-text' : ''} text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto`}>
                {language === 'ar' 
                  ? 'لا تترددي في التواصل معنا عبر الواتساب. فريقنا متواجد للإجابة على جميع أسئلتك ومساعدتك في تصميم الحجاب المثالي لك.'
                  : 'Do not hesitate to contact us via WhatsApp. Our team is available to answer all your questions and help you design the perfect hijab for you.'
                }
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleWhatsAppClick}
                  className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined">whatsapp</span>
                  {language === 'ar' ? 'تواصل عبر الواتساب' : 'Contact via WhatsApp'}
                </button>
                
                <a
                  href="tel:01066362979"
                  className="px-8 py-4 bg-primary text-white rounded-lg font-bold hover:bg-primary-dark transition-colors flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined">call</span>
                  {language === 'ar' ? 'اتصال مباشر' : 'Direct Call'}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizeOrder;