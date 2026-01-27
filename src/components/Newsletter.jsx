import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const { language } = useLanguage();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Subscribed email:', email);
      setIsSubmitting(false);
      setSubmitStatus('success');
      setEmail('');
      
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 1500);
  };

  return (
    <section className="px-6 md:px-20 pb-24">
      <div className="bg-primary rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-primary/30">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -mr-40 -mt-40 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/5 rounded-full -ml-40 -mb-40 blur-3xl"></div>
        
        <div className="relative z-10 flex flex-col items-center gap-6">
          <h2 className={`${language === 'ar' ? 'arabic-text' : ''} text-white text-4xl md:text-5xl font-bold tracking-tight`}>
            {language === 'ar' ? 'انضمي إلى مجتمعنا' : 'Join Our Community'}
          </h2>
          <p className={`${language === 'ar' ? 'arabic-text' : ''} text-white/90 text-lg md:text-xl max-w-[600px]`}>
            {language === 'ar' 
              ? 'اشتركي واحصلي على خصم ١٠٪ على أول طلب لك، نصائح تنسيق حصرية، ووصول مبكر للمجموعات الجديدة.'
              : 'Subscribe and get 10% off your first order, exclusive styling tips, and early access to new collections.'
            }
          </p>

          {submitStatus === 'success' && (
            <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg flex items-center gap-3">
              <span className="material-symbols-outlined">check_circle</span>
              <span className={`${language === 'ar' ? 'arabic-text' : ''}`}>
                {language === 'ar' ? 'شكرًا لك! تم الاشتراك بنجاح.' : 'Thank you! Successfully subscribed.'}
              </span>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col sm:flex-row gap-3 mt-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`${language === 'ar' ? 'arabic-text' : ''} flex-1 h-14 px-6 rounded-full border-none focus:ring-2 focus:ring-white outline-none text-[#2d1a1e]`}
              placeholder={language === 'ar' ? 'عنوان بريدك الإلكتروني' : 'Your email address'}
              required
              dir={language === 'ar' ? 'rtl' : 'ltr'}
            />
            <button 
              type="submit"
              disabled={isSubmitting}
              className={`${language === 'ar' ? 'arabic-text' : ''} bg-white text-primary px-8 h-14 rounded-full font-bold hover:scale-105 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
            >
              {isSubmitting ? (
                <>
                  <span className="material-symbols-outlined animate-spin">progress_activity</span>
                  {language === 'ar' ? 'جاري الاشتراك...' : 'Subscribing...'}
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined">send</span>
                  {language === 'ar' ? 'اشتراك' : 'Subscribe'}
                </>
              )}
            </button>
          </form>

          <p className={`${language === 'ar' ? 'arabic-text' : ''} text-white/70 text-sm mt-4`}>
            {language === 'ar' 
              ? 'نشرة إخبارية أسبوعية • يمكنك إلغاء الاشتراك في أي وقت'
              : 'Weekly newsletter • Unsubscribe anytime'
            }
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;