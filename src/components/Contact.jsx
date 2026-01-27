import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const { language } = useLanguage();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // محاكاة استدعاء API
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // إعادة تعيين الحالة بعد 5 ثواني
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: "mail",
      title_ar: "البريد الإلكتروني",
      title_en: "Email",
      details: ["support@tar7a-store.com", "orders@tar7a-store.com"],
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: "phone",
      title_ar: "الهاتف",
      title_en: "Phone",
      details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
      color: "bg-green-100 text-green-600"
    },
    {
      icon: "location_on",
      title_ar: "العنوان",
      title_en: "Address",
      details_ar: ["شارع الموضة 123", "القاهرة، مصر 11511"],
      details_en: ["123 Fashion Street", "Cairo, Egypt 11511"],
      color: "bg-red-100 text-red-600"
    },
    {
      icon: "schedule",
      title_ar: "ساعات العمل",
      title_en: "Working Hours",
      details_ar: ["الإثنين-الجمعة: 9 ص - 6 م", "السبت-الأحد: 10 ص - 4 م"],
      details_en: ["Mon-Fri: 9 AM - 6 PM", "Sat-Sun: 10 AM - 4 PM"],
      color: "bg-purple-100 text-purple-600"
    }
  ];

  const faqs = [
    {
      question_ar: "كم تستغرق مدة الشحن؟",
      question_en: "How long does shipping take?",
      answer_ar: "الطلبات المحلية: 3-5 أيام عمل. الطلبات الدولية: 7-14 يوم عمل حسب الموقع.",
      answer_en: "Local orders: 3-5 business days. International orders: 7-14 business days depending on location."
    },
    {
      question_ar: "ما هي سياسة الإرجاع الخاصة بكم؟",
      question_en: "What is your return policy?",
      answer_ar: "نقبل الإرجاع خلال 30 يومًا من تاريخ الاستلام. يجب أن تكون القطع غير مستخدمة وغير مغسولة وفي العبوة الأصلية.",
      answer_en: "We accept returns within 30 days of receipt. Items must be unused, unwashed, and in original packaging."
    },
    {
      question_ar: "هل تقدمون أسعارًا بالجملة؟",
      question_en: "Do you offer wholesale pricing?",
      answer_ar: "نعم! تواصل مع فريق الأعمال لدينا على wholesale@tar7a-store.com للطلبات بالجملة والأسعار.",
      answer_en: "Yes! Contact our business team at wholesale@tar7a-store.com for wholesale orders and pricing."
    },
    {
      question_ar: "كيف أعتني بحجابي؟",
      question_en: "How do I care for my hijab?",
      answer_ar: "لكل نسيج تعليمات عناية محددة. تحقق من صفحة المنتج أو دليل العناية بالأنسجة لدينا للحصول على التفاصيل.",
      answer_en: "Each fabric has specific care instructions. Check the product page or our fabric care guide for details."
    }
  ];

  const subjectOptions = [
    { value: "", label_ar: "اختر موضوعًا", label_en: "Select a subject" },
    { value: "order", label_ar: "استفسار عن طلب", label_en: "Order Inquiry" },
    { value: "product", label_ar: "سؤال عن منتج", label_en: "Product Question" },
    { value: "shipping", label_ar: "الشحن والتوصيل", label_en: "Shipping & Delivery" },
    { value: "return", label_ar: "الإرجاع والاستبدال", label_en: "Returns & Exchange" },
    { value: "wholesale", label_ar: "استفسار بالجملة", label_en: "Wholesale Inquiry" },
    { value: "other", label_ar: "أخرى", label_en: "Other" }
  ];

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Hero Section */}
      <div className="relative py-20 px-6 md:px-20 bg-gradient-to-r from-primary/10 to-peach-soft dark:from-primary/5 dark:to-background-dark">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className={`${language === 'ar' ? 'arabic-text' : ''} text-5xl md:text-7xl font-bold mb-6 dark:text-white`}>
              {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
            </h1>
            <p className={`${language === 'ar' ? 'arabic-text' : ''} text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto`}>
              {language === 'ar' 
                ? 'لديك أسئلة؟ نحن هنا لمساعدتك! تواصل مع فريقنا لأي استفسارات حول المنتجات أو الطلبات أو الشراكات.'
                : 'Got questions? We\'re here to help! Reach out to our team for any inquiries about products, orders, or partnerships.'
              }
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-20 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className={`${language === 'ar' ? 'arabic-text' : ''} text-3xl font-bold mb-8 dark:text-white`}>
              {language === 'ar' ? 'معلومات الاتصال' : 'Contact Information'}
            </h2>
            
            <div className="grid sm:grid-cols-2 gap-6 mb-12">
              {contactInfo.map((info, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                  <div className={`w-12 h-12 rounded-xl ${info.color} flex items-center justify-center mb-4`}>
                    <span className="material-symbols-outlined text-2xl">{info.icon}</span>
                  </div>
                  <h3 className={`${language === 'ar' ? 'arabic-text' : ''} text-lg font-bold mb-2 dark:text-white`}>
                    {language === 'ar' ? info.title_ar : info.title_en}
                  </h3>
                  {(info.details || (language === 'ar' ? info.details_ar : info.details_en)).map((detail, i) => (
                    <p key={i} className={`${language === 'ar' ? 'arabic-text' : ''} text-gray-600 dark:text-gray-300`}>
                      {detail}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg sticky top-24">
              <h2 className={`${language === 'ar' ? 'arabic-text' : ''} text-3xl font-bold mb-2 dark:text-white`}>
                {language === 'ar' ? 'أرسل لنا رسالة' : 'Send Us a Message'}
              </h2>
              <p className={`${language === 'ar' ? 'arabic-text' : ''} text-gray-600 dark:text-gray-300 mb-8`}>
                {language === 'ar' 
                  ? 'املأ النموذج أدناه وسنرد عليك خلال 24 ساعة.'
                  : 'Fill out the form below and we\'ll get back to you within 24 hours.'
                }
              </p>

              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg flex items-center gap-3">
                  <span className="material-symbols-outlined">check_circle</span>
                  <span className={`${language === 'ar' ? 'arabic-text' : ''}`}>
                    {language === 'ar' ? 'شكرًا لك! تم إرسال رسالتك بنجاح.' : 'Thank you! Your message has been sent successfully.'}
                  </span>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className={`${language === 'ar' ? 'arabic-text' : ''} block text-sm font-medium mb-2 dark:text-gray-300`}>
                        {language === 'ar' ? 'الاسم *' : 'Name *'}
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className={`${language === 'ar' ? 'arabic-text' : ''} w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all`}
                        placeholder={language === 'ar' ? "اسمك" : "Your name"}
                        dir={language === 'ar' ? 'rtl' : 'ltr'}
                      />
                    </div>
                    
                    <div>
                      <label className={`${language === 'ar' ? 'arabic-text' : ''} block text-sm font-medium mb-2 dark:text-gray-300`}>
                        {language === 'ar' ? 'البريد الإلكتروني *' : 'Email *'}
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={`${language === 'ar' ? 'arabic-text' : ''} w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all`}
                        placeholder={language === 'ar' ? "بريدك@الإلكتروني.com" : "your@email.com"}
                        dir="ltr"
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`${language === 'ar' ? 'arabic-text' : ''} block text-sm font-medium mb-2 dark:text-gray-300`}>
                      {language === 'ar' ? 'الموضوع *' : 'Subject *'}
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className={`${language === 'ar' ? 'arabic-text' : ''} w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all`}
                      dir={language === 'ar' ? 'rtl' : 'ltr'}
                    >
                      {subjectOptions.map((option, index) => (
                        <option key={index} value={option.value}>
                          {language === 'ar' ? option.label_ar : option.label_en}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={`${language === 'ar' ? 'arabic-text' : ''} block text-sm font-medium mb-2 dark:text-gray-300`}>
                      {language === 'ar' ? 'الرسالة *' : 'Message *'}
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="6"
                      className={`${language === 'ar' ? 'arabic-text' : ''} w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none`}
                      placeholder={language === 'ar' ? "رسالتك هنا..." : "Your message here..."}
                      dir={language === 'ar' ? 'rtl' : 'ltr'}
                    ></textarea>
                  </div>

                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      id="newsletter"
                      className="w-4 h-4 text-primary rounded focus:ring-primary"
                    />
                    <label htmlFor="newsletter" className={`${language === 'ar' ? 'arabic-text' : ''} text-sm text-gray-600 dark:text-gray-300`}>
                      {language === 'ar' 
                        ? 'اشترك في نشرتنا الإخبارية للحصول على التحديثات والعروض'
                        : 'Subscribe to our newsletter for updates and offers'
                      }
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`${language === 'ar' ? 'arabic-text' : ''} w-full py-4 bg-primary text-white rounded-lg font-bold hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="material-symbols-outlined animate-spin">progress_activity</span>
                        {language === 'ar' ? 'جاري الإرسال...' : 'Sending...'}
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined">send</span>
                        {language === 'ar' ? 'إرسال الرسالة' : 'Send Message'}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="mt-24">
          <h2 className={`${language === 'ar' ? 'arabic-text' : ''} text-3xl font-bold text-center mb-12 dark:text-white`}>
            {language === 'ar' ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
          </h2>
          <div className="max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="mb-4">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
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
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-20 bg-gradient-to-r from-primary/10 to-primary/5 rounded-3xl p-12 text-center">
          <h3 className={`${language === 'ar' ? 'arabic-text' : ''} text-2xl font-bold mb-4 dark:text-white`}>
            {language === 'ar' ? 'ابقَ على اطلاع' : 'Stay Updated'}
          </h3>
          <p className={`${language === 'ar' ? 'arabic-text' : ''} text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto`}>
            {language === 'ar' 
              ? 'اشترك في نشرتنا الإخبارية للحصول على الوصول المبكر للمنتجات الجديدة، نصائح التنسيق، والعروض الحصرية.'
              : 'Subscribe to our newsletter for early access to new products, styling tips, and exclusive offers.'
            }
          </p>
          <div className="max-w-md mx-auto flex gap-3">
            <input
              type="email"
              placeholder={language === 'ar' ? "أدخل بريدك الإلكتروني" : "Enter your email"}
              className={`${language === 'ar' ? 'arabic-text' : ''} flex-1 px-6 py-3 rounded-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary`}
              dir={language === 'ar' ? 'rtl' : 'ltr'}
            />
            <button className={`${language === 'ar' ? 'arabic-text' : ''} px-8 py-3 bg-primary text-white rounded-full font-bold hover:bg-primary-dark transition-colors`}>
              {language === 'ar' ? 'اشتراك' : 'Subscribe'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;