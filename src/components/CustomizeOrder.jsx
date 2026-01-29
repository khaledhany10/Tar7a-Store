import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const CustomizeOrder = () => {
  const { language } = useLanguage();
  const phoneNumber = '01066362979';
  const whatsappLink = `https://wa.me/${phoneNumber.replace('0', '2')}`;
  
  const [copied, setCopied] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

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
      title_ar: "تصميم شخصي",
      title_en: "Personal Design",
      description_ar: "صمم حجاب يناسب شخصيتك وأسلوبك الفريد",
      description_en: "Design a hijab that suits your personality and unique style",
      gradient: "from-yellow-500/20 to-yellow-500/5"
    },
    {
      icon: "palette",
      title_ar: "ألوان حصرية",
      title_en: "Exclusive Colors",
      description_ar: "اختر من مجموعة ألوان خاصة أو صمم لونك المميز",
      description_en: "Choose from special color sets or design your unique color",
      gradient: "from-pink-500/20 to-rose-500/5"
    },
    {
      icon: "style",
      title_ar: "تفاصيل فريدة",
      title_en: "Unique Details",
      description_ar: "أضف لمساتك الخاصة من تطريز وزخارف مميزة",
      description_en: "Add your personal touches with unique embroidery and decorations",
      gradient: "from-purple-500/20 to-indigo-500/5"
    },
    {
      icon: "verified",
      title_ar: "جودة مضمونة",
      title_en: "Guaranteed Quality",
      description_ar: "نضمن لك أعلى معايير الجودة في كل تفصيلة",
      description_en: "We guarantee the highest quality standards in every detail",
      gradient: "from-green-500/20 to-emerald-600/5"
    }
  ];

  const processSteps = [
    {
      number: "01",
      title_ar: "التواصل والتخطيط",
      title_en: "Contact & Planning",
      description_ar: "نبدأ معك رحلة التصميم بتحديد رؤيتك وأفكارك",
      description_en: "We start your design journey by defining your vision and ideas",
      icon: "forum"
    },
    {
      number: "02",
      title_ar: "تصميم ثلاثي الأبعاد",
      title_en: "3D Design",
      description_ar: "نصمم نموذج ثلاثي الأبعاد يظهر تفاصيل حجابك",
      description_en: "We create a 3D model showing your hijab details",
      icon: "view_in_ar"
    },
    {
      number: "03",
      title_ar: "تأكيد وتنفيذ",
      title_en: "Confirmation & Production",
      description_ar: "ننفذ التصميم بأفضل الخامات والتفاصيل الدقيقة",
      description_en: "We implement the design with premium materials and precise details",
      icon: "construction"
    },
    {
      number: "04",
      title_ar: "توصيل واستعراض",
      title_en: "Delivery & Showcase",
      description_ar: "نسلم لك الحجاب ونساعدك في طريقة ارتدائه",
      description_en: "We deliver your hijab and help with styling tips",
      icon: "local_shipping"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-peach-soft/10 to-white dark:from-background-dark dark:via-gray-900/50 dark:to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden py-24 md:py-32 px-4 md:px-8">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-white/50 to-purple-500/5 dark:from-primary/10 dark:via-gray-900 dark:to-purple-600/10"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl"></div>

        <div className="max-w-7xl mx-auto relative">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-3 mb-8 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse delay-150"></div>
                <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse delay-300"></div>
              </div>
              <span className={`${language === 'ar' ? 'arabic-text' : ''} text-sm font-medium text-[#2d1a1e] dark:text-gray-300`}>
                {language === 'ar' ? 'فخامة حسب الطلب' : 'Luxury on Demand'}
              </span>
            </div>
            
            <h1 className={`${language === 'ar' ? 'arabic-text' : ''} text-5xl md:text-6xl lg:text-7xl font-black text-[#2d1a1e] dark:text-white mb-8 leading-tight`}>
              <span className="block">
                {language === 'ar' ? 'تصميم حجاب' : 'Design Your'}
              </span>
              <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                {language === 'ar' ? 'يخبر قصتك' : 'Perfect Hijab'}
              </span>
            </h1>
            
            <p className={`${language === 'ar' ? 'arabic-text' : ''} text-xl text-[#2d1a1e]/70 dark:text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed`}>
              {language === 'ar' 
                ? 'أطلق إبداعك واصنعي حجاباً يعبر عن شخصيتك الفريدة. نحن هنا لتحويل رؤيتك إلى حقيقة أنيقة'
                : 'Unleash your creativity and create a hijab that expresses your unique personality. We\'re here to turn your vision into an elegant reality'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {/* Contact Card */}
        <div className="mb-24">
          <div className="bg-gradient-to-br from-white to-white/90 dark:from-gray-800 dark:to-gray-900/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Left Side - Features */}
              <div className="p-8 md:p-12">
                <h2 className={`${language === 'ar' ? 'arabic-text' : ''} text-3xl md:text-4xl font-bold mb-8 dark:text-white`}>
                  <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                    {language === 'ar' ? 'ابدأ حلمك' : 'Start Your Dream'}
                  </span>
                </h2>
                
                <p className={`${language === 'ar' ? 'arabic-text' : ''} text-[#2d1a1e]/70 dark:text-gray-400 mb-10 text-lg leading-relaxed`}>
                  {language === 'ar' 
                    ? 'كل امرأة تستحق حجاباً مصمماً خصيصاً لها. دعينا نعمل معاً لصنع قطعة فريدة تعكس أناقتك الداخلية'
                    : 'Every woman deserves a hijab designed specifically for her. Let us work together to create a unique piece that reflects your inner elegance'
                  }
                </p>
                
                {/* Features Grid */}
                <div className="grid grid-cols-2 gap-6">
                  {features.map((feature, index) => (
                    <div key={index} className="group">
                      <div className="bg-white dark:bg-gray-800/50 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-500 group-hover:-translate-y-1">
                        <div className={`w-12 h-12 rounded-xl ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                          <span className="material-symbols-outlined text-primary text-xl">{feature.icon}</span>
                        </div>
                        <h4 className={`${language === 'ar' ? 'arabic-text' : ''} font-bold text-lg mb-2 dark:text-white group-hover:text-primary transition-colors`}>
                          {language === 'ar' ? feature.title_ar : feature.title_en}
                        </h4>
                        <p className={`${language === 'ar' ? 'arabic-text' : ''} text-sm text-[#2d1a1e]/60 dark:text-gray-400`}>
                          {language === 'ar' ? feature.description_ar : feature.description_en}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Side - WhatsApp Card */}
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500 via-emerald-600 to-teal-500"></div>
<div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-20"></div>                
                <div className="relative p-8 md:p-12 text-white h-full flex flex-col justify-center">
                  <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                      <span className="material-symbols-outlined text-4xl">whatsapp</span>
                    </div>
                    <h3 className={`${language === 'ar' ? 'arabic-text' : ''} text-3xl font-bold mb-3`}>
                      {language === 'ar' ? 'تواصل مباشر' : 'Direct Connection'}
                    </h3>
                    <p className="text-white/90 text-lg">
                      {language === 'ar' 
                        ? 'متوفرون لخدمتك 24/7'
                        : 'Available to serve you 24/7'
                      }
                    </p>
                  </div>

                  {/* Phone Number Display */}
                  <div className="mb-10">
                    <div className={`${language === 'ar' ? 'arabic-text' : ''} text-4xl md:text-5xl font-bold mb-3 tracking-wider text-center`}>
                      {phoneNumber}
                    </div>
                    <div className="text-white/80 text-sm text-center">
                      {language === 'ar' ? 'رقم التواصل المباشر' : 'Direct Contact Number'}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-4">
                    <button
                      onClick={handleWhatsAppClick}
                      className="w-full bg-white text-emerald-600 py-4 rounded-xl font-bold hover:bg-gray-100 active:scale-95 transition-all duration-300 shadow-2xl flex items-center justify-center gap-3 text-lg group"
                    >
                      <span className="material-symbols-outlined group-hover:rotate-12 transition-transform">send</span>
                      {language === 'ar' ? 'ابدأ المحادثة' : 'Start Conversation'}
                    </button>
                    
                    <button
                      onClick={copyToClipboard}
                      className={`w-full bg-transparent border-2 border-white/30 py-4 rounded-xl font-bold hover:bg-white/10 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 text-lg group ${copied ? 'border-green-400' : ''}`}
                    >
                      {copied ? (
                        <>
                          <span className="material-symbols-outlined animate-pulse">check_circle</span>
                          {language === 'ar' ? 'تم النسخ!' : 'Copied!'}
                        </>
                      ) : (
                        <>
                          <span className="material-symbols-outlined group-hover:scale-110 transition-transform">content_copy</span>
                          {language === 'ar' ? 'نسخ الرقم' : 'Copy Number'}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Process Steps */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className={`${language === 'ar' ? 'arabic-text' : ''} text-4xl md:text-5xl font-bold mb-6 dark:text-white`}>
              <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                {language === 'ar' ? 'رحلة التصميم' : 'Design Journey'}
              </span>
            </h2>
            <p className={`${language === 'ar' ? 'arabic-text' : ''} text-lg text-[#2d1a1e]/70 dark:text-gray-400 max-w-2xl mx-auto`}>
              {language === 'ar' 
                ? 'خطوات بسيطة تفصلك عن حلمك. نعمل معك خطوة بخطوة لتحقيق رؤيتك'
                : 'Simple steps separate you from your dream. We work with you step by step to realize your vision'
              }
            </p>
          </div>
          
          <div className="relative">
            {/* Progress Line */}
            <div className="hidden md:block absolute left-0 right-0 top-1/2 h-1 bg-gradient-to-r from-primary/20 via-purple-500/20 to-pink-500/20 rounded-full -translate-y-1/2"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <div 
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className="relative group cursor-pointer"
                >
                  <div className={`relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 h-full ${
                    activeStep === index 
                      ? 'ring-2 ring-primary ring-offset-2 scale-105' 
                      : 'group-hover:-translate-y-2'
                  }`}>
                    {/* Step Number */}
                    <div className={`absolute -top-4 -left-4 w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold shadow-xl ${
                      activeStep === index
                        ? 'bg-gradient-to-r from-primary to-purple-600 text-white'
                        : 'bg-white dark:bg-gray-700 text-primary'
                    }`}>
                      {step.number}
                    </div>
                    
                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${
                      activeStep === index
                        ? 'bg-gradient-to-r from-primary/10 to-primary/5'
                        : 'bg-gray-100 dark:bg-gray-700'
                    }`}>
                      <span className={`material-symbols-outlined text-xl ${
                        activeStep === index ? 'text-primary' : 'text-gray-400'
                      }`}>
                        {step.icon}
                      </span>
                    </div>
                    
                    {/* Content */}
                    <div>
                      <h3 className={`${language === 'ar' ? 'arabic-text' : ''} text-xl font-bold mb-3 dark:text-white ${
                        activeStep === index ? 'text-primary' : ''
                      }`}>
                        {language === 'ar' ? step.title_ar : step.title_en}
                      </h3>
                      <p className={`${language === 'ar' ? 'arabic-text' : ''} text-[#2d1a1e]/60 dark:text-gray-400`}>
                        {language === 'ar' ? step.description_ar : step.description_en}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-24">
          <div className="bg-gradient-to-br from-white/80 to-white/60 dark:from-gray-800/80 dark:to-gray-900/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="text-center mb-12">
              <h2 className={`${language === 'ar' ? 'arabic-text' : ''} text-3xl md:text-4xl font-bold mb-4 dark:text-white`}>
                <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  {language === 'ar' ? 'أسئلتك المهمة' : 'Your Important Questions'}
                </span>
              </h2>
              <p className={`${language === 'ar' ? 'arabic-text' : ''} text-lg text-[#2d1a1e]/70 dark:text-gray-400 max-w-2xl mx-auto`}>
                {language === 'ar' 
                  ? 'إجابات على الأسئلة التي تهمك قبل بدء تجربتك المخصصة'
                  : 'Answers to the questions that matter to you before starting your custom experience'
                }
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  question_ar: "ما هي مدة التصميم والتنفيذ؟",
                  question_en: "What is the design and implementation duration?",
                  answer_ar: "التصميم ثلاثي الأبعاد يستغرق 1-2 أيام عمل، والتنفيذ يستغرق 3-5 أيام عمل حسب التعقيد",
                  answer_en: "3D design takes 1-2 working days, and implementation takes 3-5 working days depending on complexity"
                },
                {
                  question_ar: "هل يمكنني رؤية التصميم قبل التنفيذ؟",
                  question_en: "Can I see the design before implementation?",
                  answer_ar: "نعم، نرسل لك تصاميم ثلاثية الأبعاد ومقاطع فيديو توضيحية قبل البدء في التنفيذ",
                  answer_en: "Yes, we send you 3D designs and explanatory videos before starting implementation"
                },
                {
                  question_ar: "ما هي خيارات الدفع المتاحة؟",
                  question_en: "What payment options are available?",
                  answer_ar: "الدفع عند الاستلام، التحويل البنكي، أو الدفع الإلكتروني بأمان كامل",
                  answer_en: "Cash on delivery, bank transfer, or secure electronic payment"
                },
                {
                  question_ar: "هل يمكنني تعديل التصميم أثناء التنفيذ؟",
                  question_en: "Can I modify the design during implementation?",
                  answer_ar: "نعم، يمكن إجراء تعديلات طفيفة. للتعديلات الكبيرة قد يتغير الجدول الزمني",
                  answer_en: "Yes, minor modifications are possible. For major changes, the timeline may change"
                }
              ].map((faq, index) => (
                <div 
                  key={index} 
                  className="group bg-white dark:bg-gray-800/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`flex justify-between items-center cursor-pointer ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                    <h3 className={`${language === 'ar' ? 'arabic-text' : ''} text-lg font-bold dark:text-white group-hover:text-primary transition-colors`}>
                      {language === 'ar' ? faq.question_ar : faq.question_en}
                    </h3>
                    <span className="material-symbols-outlined text-primary group-hover:rotate-180 transition-transform duration-300">
                      expand_more
                    </span>
                  </div>
                  <div className={`mt-4 ${language === 'ar' ? 'arabic-text' : ''} text-[#2d1a1e]/70 dark:text-gray-300`}>
                    {language === 'ar' ? faq.answer_ar : faq.answer_en}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <div className="inline-block p-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500 rounded-3xl shadow-2xl">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-12">
              <div className="max-w-2xl mx-auto">
                <h3 className={`${language === 'ar' ? 'arabic-text' : ''} text-3xl md:text-4xl font-bold mb-6 dark:text-white`}>
                  {language === 'ar' 
                    ? 'جاهزة لصنع التاريخ؟'
                    : 'Ready to Make History?'
                  }
                </h3>
                <p className={`${language === 'ar' ? 'arabic-text' : ''} text-lg text-[#2d1a1e]/70 dark:text-gray-400 mb-8`}>
                  {language === 'ar' 
                    ? 'كل قطعة قصة، وكل تصميم رحلة. دعينا نصنع قصتك الفريدة معاً'
                    : 'Every piece is a story, every design is a journey. Let\'s create your unique story together'
                  }
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={handleWhatsAppClick}
                    className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg flex items-center justify-center gap-3 group"
                  >
                    <span className="material-symbols-outlined group-hover:animate-bounce">whatsapp</span>
                    {language === 'ar' ? 'ابدأ الرحلة' : 'Start the Journey'}
                  </button>
                  
                  <a
                    href="tel:01066362979"
                    className="px-8 py-4 bg-gradient-to-r from-primary to-purple-600 text-white rounded-xl font-bold hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg flex items-center justify-center gap-3 group"
                  >
                    <span className="material-symbols-outlined group-hover:animate-pulse">call</span>
                    {language === 'ar' ? 'اتصل الآن' : 'Call Now'}
                  </a>
                </div>
                
                {/* Motto */}
                <div className="mt-10 pt-6 border-t border-[#2d1a1e]/10 dark:border-gray-700">
                  <p className={`${language === 'ar' ? 'arabic-text' : ''} text-[#2d1a1e]/60 dark:text-gray-400 italic`}>
                    {language === 'ar' 
                      ? '"أنتِ فريدة، فليكن حجابكِ فريداً"'
                      : '"You are unique, let your hijab be unique"'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizeOrder;