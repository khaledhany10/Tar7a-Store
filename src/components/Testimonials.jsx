import React from 'react';

const testimonials = [
  {
    id: 1,
    name: "أماني ر.",
    role: "عميل موثوق",
    image: "/img/1.jpeg",
    quote: "مجموعة المودال غيرت قواعد اللعبة. تظل في مكانها طوال اليوم دون الحاجة إلى آلاف الدبابيس. مذهلة تمامًا!"
  },
  {
    id: 2,
    name: "ليلى ك.",
    role: "عميل موثوق",
    image: "/img/2.jpeg",
    quote: "تغليف متجر طرحة جميل جدًا، شعرت أنني أفتح هدية فاخرة. جودة الشيفون لا مثيل لها في أي ماركة أخرى."
  },
  {
    id: 3,
    name: "مريم ج.",
    role: "عميل موثوق",
    image: "/img/3.jpeg",
    quote: "وجدت أخيرًا مصدرًا موثوقًا للاحتياجات اليومية. حجابات الجيرسي ناعمة جدًا والألوان مثالية وهادئة."
  },
  {
    id: 4,
    name: "فاطمة أ.",
    role: "عميل VIP",
    image: "/img/4.jpeg",
    quote: "مجموعة الحرير تستحق كل قرش أنفقته. أحصل على إعجاب في كل مرة أرتديها. خدمة العملاء ممتازة أيضًا!"
  }
];

const Testimonials = () => {
  return (
    <section className="px-6 md:px-20 py-24 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-12">
          <h2 className="arabic-text text-3xl font-bold mb-4 dark:text-white">محبوب من مجتمع متجر طرحة</h2>
          <p className="arabic-text text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            اقرأ ما تقوله أخواتنا عن تجربتهم مع متجر طرحة.
          </p>
        </div>
        
        <div className="flex overflow-x-auto pb-10 gap-8 no-scrollbar scroll-smooth">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="flex-none w-[320px] md:w-[400px] bg-beige-card dark:bg-gray-800 p-10 rounded-[2.5rem] border border-primary/5">
              <div className="flex gap-1 mb-6 text-primary">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined fill-1">star</span>
                ))}
              </div>
              
              <p className="arabic-text text-[#2d1a1e]/70 dark:text-gray-300 italic text-lg leading-relaxed mb-8">
                "{testimonial.quote}"
              </p>
              
              <div className="flex items-center gap-4">
                <div 
                  className="w-12 h-12 rounded-full bg-cover bg-center border-2 border-primary/20" 
                  style={{backgroundImage: `url('${testimonial.image}')`}}
                ></div>
                <div className="text-right">
                  <p className="arabic-text font-bold dark:text-white">{testimonial.name}</p>
                  <p className="arabic-text text-primary text-xs font-semibold uppercase tracking-wider">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* الإحصائيات */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="arabic-text text-4xl font-bold text-primary mb-2">٦٨+</div>
            <div className="arabic-text text-gray-600 dark:text-gray-400">تصميم فريد</div>
          </div>
          <div>
            <div className="arabic-text text-4xl font-bold text-primary mb-2">٢٠٠٠+</div>
            <div className="arabic-text text-gray-600 dark:text-gray-400">عميل سعيد</div>
          </div>
          <div>
            <div className="arabic-text text-4xl font-bold text-primary mb-2">٤.٨★</div>
            <div className="arabic-text text-gray-600 dark:text-gray-400">متوسط التقييم</div>
          </div>
          <div>
            <div className="arabic-text text-4xl font-bold text-primary mb-2">٥٠+</div>
            <div className="arabic-text text-gray-600 dark:text-gray-400">دولة يتم الشحن لها</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;