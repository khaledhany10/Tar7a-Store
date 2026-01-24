import React, { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // محاكاة استدعاء API
    setTimeout(() => {
      console.log('تم الاشتراك بالبريد الإلكتروني:', email);
      setIsSubmitting(false);
      setSubmitStatus('success');
      setEmail('');
      
      // إعادة تعيين الحالة بعد 5 ثواني
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 1500);
  };

  return (
    <section className="px-6 md:px-20 pb-24">
      <div className="bg-primary rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-primary/30">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -mr-40 -mt-40 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/5 rounded-full -ml-40 -mb-40 blur-3xl"></div>
        
        <div className="relative z-10 flex flex-col items-center gap-6">
          <h2 className="arabic-text text-white text-4xl md:text-5xl font-bold tracking-tight">انضمي إلى مجتمعنا</h2>
          <p className="arabic-text text-white/90 text-lg md:text-xl max-w-[600px]">
            اشتركي واحصلي على خصم ١٠٪ على أول طلب لك، نصائح تنسيق حصرية، ووصول مبكر للمجموعات الجديدة.
          </p>

          {submitStatus === 'success' && (
            <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg flex items-center gap-3">
              <span className="material-symbols-outlined">check_circle</span>
              <span className="arabic-text">شكرًا لك! تم الاشتراك بنجاح.</span>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col sm:flex-row gap-3 mt-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="arabic-text flex-1 h-14 px-6 rounded-full border-none focus:ring-2 focus:ring-white outline-none text-[#2d1a1e]"
              placeholder="عنوان بريدك الإلكتروني"
              required
              dir="rtl"
            />
            <button 
              type="submit"
              disabled={isSubmitting}
              className="arabic-text bg-white text-primary px-8 h-14 rounded-full font-bold hover:scale-105 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="material-symbols-outlined animate-spin">progress_activity</span>
                  جاري الاشتراك...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined">send</span>
                  اشتراك
                </>
              )}
            </button>
          </form>

          <p className="arabic-text text-white/70 text-sm mt-4">
            نشرة إخبارية أسبوعية • يمكنك إلغاء الاشتراك في أي وقت
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;