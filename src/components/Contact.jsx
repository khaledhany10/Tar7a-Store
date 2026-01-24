import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

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
      console.log('تم إرسال النموذج:', formData);
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
      title: "البريد الإلكتروني",
      details: ["support@tar7a-store.com", "orders@tar7a-store.com"],
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: "phone",
      title: "الهاتف",
      details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
      color: "bg-green-100 text-green-600"
    },
    {
      icon: "location_on",
      title: "العنوان",
      details: ["شارع الموضة 123", "القاهرة، مصر 11511"],
      color: "bg-red-100 text-red-600"
    },
    {
      icon: "schedule",
      title: "ساعات العمل",
      details: ["الإثنين-الجمعة: 9 ص - 6 م", "السبت-الأحد: 10 ص - 4 م"],
      color: "bg-purple-100 text-purple-600"
    }
  ];

  const faqs = [
    {
      question: "كم تستغرق مدة الشحن؟",
      answer: "الطلبات المحلية: 3-5 أيام عمل. الطلبات الدولية: 7-14 يوم عمل حسب الموقع."
    },
    {
      question: "ما هي سياسة الإرجاع الخاصة بكم؟",
      answer: "نقبل الإرجاع خلال 30 يومًا من تاريخ الاستلام. يجب أن تكون القطع غير مستخدمة وغير مغسولة وفي العبوة الأصلية."
    },
    {
      question: "هل تقدمون أسعارًا بالجملة؟",
      answer: "نعم! تواصل مع فريق الأعمال لدينا على wholesale@tar7a-store.com للطلبات بالجملة والأسعار."
    },
    {
      question: "كيف أعتني بحجابي؟",
      answer: "لكل نسيج تعليمات عناية محددة. تحقق من صفحة المنتج أو دليل العناية بالأنسجة لدينا للحصول على التفاصيل."
    }
  ];

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* قسم البطل */}
      <div className="relative py-20 px-6 md:px-20 bg-gradient-to-r from-primary/10 to-peach-soft dark:from-primary/5 dark:to-background-dark">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="arabic-text text-5xl md:text-7xl font-bold mb-6 dark:text-white">تواصل معنا</h1>
            <p className="arabic-text text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              لديك أسئلة؟ نحن هنا لمساعدتك! تواصل مع فريقنا لأي استفسارات حول المنتجات أو الطلبات أو الشراكات.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-20 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* معلومات الاتصال */}
          <div>
            <h2 className="arabic-text text-3xl font-bold mb-8 dark:text-white">معلومات الاتصال</h2>
            
            <div className="grid sm:grid-cols-2 gap-6 mb-12">
              {contactInfo.map((info, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                  <div className={`w-12 h-12 rounded-xl ${info.color} flex items-center justify-center mb-4`}>
                    <span className="material-symbols-outlined text-2xl">{info.icon}</span>
                  </div>
                  <h3 className="arabic-text text-lg font-bold mb-2 dark:text-white">{info.title}</h3>
                  {info.details.map((detail, i) => (
                    <p key={i} className="arabic-text text-gray-600 dark:text-gray-300">{detail}</p>
                  ))}
                </div>
              ))}
            </div>

          </div>

          {/* نموذج الاتصال */}
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg sticky top-24">
              <h2 className="arabic-text text-3xl font-bold mb-2 dark:text-white">أرسل لنا رسالة</h2>
              <p className="arabic-text text-gray-600 dark:text-gray-300 mb-8">
                املأ النموذج أدناه وسنرد عليك خلال 24 ساعة.
              </p>

              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg flex items-center gap-3">
                  <span className="material-symbols-outlined">check_circle</span>
                  <span className="arabic-text">شكرًا لك! تم إرسال رسالتك بنجاح.</span>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="arabic-text block text-sm font-medium mb-2 dark:text-gray-300">الاسم *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="arabic-text w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        placeholder="اسمك"
                      />
                    </div>
                    
                    <div>
                      <label className="arabic-text block text-sm font-medium mb-2 dark:text-gray-300">البريد الإلكتروني *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="arabic-text w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        placeholder="بريدك@الإلكتروني.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="arabic-text block text-sm font-medium mb-2 dark:text-gray-300">الموضوع *</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="arabic-text w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    >
                      <option value="">اختر موضوعًا</option>
                      <option value="order">استفسار عن طلب</option>
                      <option value="product">سؤال عن منتج</option>
                      <option value="shipping">الشحن والتوصيل</option>
                      <option value="return">الإرجاع والاستبدال</option>
                      <option value="wholesale">استفسار بالجملة</option>
                      <option value="other">أخرى</option>
                    </select>
                  </div>

                  <div>
                    <label className="arabic-text block text-sm font-medium mb-2 dark:text-gray-300">الرسالة *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="6"
                      className="arabic-text w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                      placeholder="رسالتك هنا..."
                    ></textarea>
                  </div>

                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      id="newsletter"
                      className="w-4 h-4 text-primary rounded focus:ring-primary"
                    />
                    <label htmlFor="newsletter" className="arabic-text text-sm text-gray-600 dark:text-gray-300">
                      اشترك في نشرتنا الإخبارية للحصول على التحديثات والعروض
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="arabic-text w-full py-4 bg-primary text-white rounded-lg font-bold hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="material-symbols-outlined animate-spin">progress_activity</span>
                        جاري الإرسال...
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined">send</span>
                        إرسال الرسالة
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* قسم الأسئلة الشائعة */}
        <div className="mt-24">
          <h2 className="arabic-text text-3xl font-bold text-center mb-12 dark:text-white">الأسئلة الشائعة</h2>
          <div className="max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="mb-4">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                  <div className="flex justify-between items-center cursor-pointer">
                    <h3 className="arabic-text text-lg font-bold dark:text-white">{faq.question}</h3>
                    <span className="material-symbols-outlined text-primary">expand_more</span>
                  </div>
                  <div className="mt-4 arabic-text text-gray-600 dark:text-gray-300">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* الاشتراك في النشرة الإخبارية */}
        <div className="mt-20 bg-gradient-to-r from-primary/10 to-primary/5 rounded-3xl p-12 text-center">
          <h3 className="arabic-text text-2xl font-bold mb-4 dark:text-white">ابقَ على اطلاع</h3>
          <p className="arabic-text text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            اشترك في نشرتنا الإخبارية للحصول على الوصول المبكر للمنتجات الجديدة، نصائح التنسيق، والعروض الحصرية.
          </p>
          <div className="max-w-md mx-auto flex gap-3">
            <input
              type="email"
              placeholder="أدخل بريدك الإلكتروني"
              className="arabic-text flex-1 px-6 py-3 rounded-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button className="arabic-text px-8 py-3 bg-primary text-white rounded-full font-bold hover:bg-primary-dark transition-colors">
              اشتراك
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;