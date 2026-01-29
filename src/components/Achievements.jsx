import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { t } from '../locales/translations';
import { Link } from 'react-router-dom';

const Achievements = () => {
  const { language } = useLanguage();
  const cardsRef = useRef([]);
  const timelineRef = useRef(null);
  
  // دالة لإصلاح مسار الصور
  const correctImagePath = (imagePath) => {
    if (!imagePath) return '/default.jpeg';
    
    let correctedPath = imagePath;
    if (correctedPath.startsWith('/img/')) {
      correctedPath = correctedPath.substring(5);
    }
    
    if (!correctedPath.startsWith('/')) {
      correctedPath = '/' + correctedPath;
    }
    
    return correctedPath;
  };

  const milestones = [
    { 
      number: language === 'ar' ? "١٠٠٠٠+" : "10,000+", 
      label: language === 'ar' ? "عميل راضٍ" : "Satisfied Customers",
      icon: "diversity_3",
      color: "from-primary to-purple-600",
      delay: 0
    },
    { 
      number: language === 'ar' ? "١٠٠٪" : "100%", 
      label: language === 'ar' ? "صناعة مصرية" : "Made in Egypt",
      icon: "flag",
      color: "from-green-500 to-emerald-600",
      delay: 100
    },
    { 
      number: language === 'ar' ? "٦٨+" : "68+", 
      label: language === 'ar' ? "تصميم فريد" : "Unique Designs",
      icon: "palette",
      color: "from-pink-500 to-rose-500",
      delay: 200
    },
    { 
      number: "24/7", 
      label: language === 'ar' ? "دعم فني" : "Customer Support",
      icon: "support_agent",
      color: "from-purple-600 to-indigo-600",
      delay: 300
    }
  ];

  const achievements = [
    {
      id: 1,
      year: "2024",
      title: language === 'ar' ? "التوسع المصري" : "Egyptian Expansion",
      description: language === 'ar' ? "نمو مبيعات بنسبة 500% وتوسع في المحافظات المصرية بجودة صناعة مصرية" : "500% sales growth and expansion across Egyptian governorates with Egyptian manufacturing quality",
      icon: "storefront",
      image: correctImagePath("/Shefon print/Shefon print 9.jpeg"),
      stats: "+500%",
      statsLabel: language === 'ar' ? "نمو المبيعات" : "Sales Growth",
      color: "from-primary to-purple-600"
    },
    {
      id: 2,
      year: "2023",
      title: language === 'ar' ? "الجودة المصرية" : "Egyptian Quality",
      description: language === 'ar' ? "تحقيق أعلى معايير الجودة والحصول على شهادات الجودة المصرية والعالمية" : "Achieving highest quality standards and obtaining Egyptian and international quality certificates",
      icon: "workspace_premium",
      image: correctImagePath("/Shefon print/Shefon print 3.jpeg"),
      stats: "99.8%",
      statsLabel: language === 'ar' ? "رضا العملاء" : "Customer Satisfaction",
      color: "from-green-500 to-emerald-600"
    },
    {
      id: 3,
      year: "2023",
      title: language === 'ar' ? "التميز في التصميم" : "Design Excellence",
      description: language === 'ar' ? "تصميم 50+ موديل جديد مستوحى من التراث المصري مع الحفاظ على الهوية المحتشمة" : "Designing 50+ new models inspired by Egyptian heritage while maintaining modest identity",
      icon: "design_services",
      image: correctImagePath("/Shefon print/Shefon print 4.jpeg"),
      stats: "+50",
      statsLabel: language === 'ar' ? "تصميم جديد" : "New Designs",
      color: "from-pink-500 to-rose-500"
    },
    {
      id: 4,
      year: "2022",
      title: language === 'ar' ? "التراث المصري" : "Egyptian Heritage",
      description: language === 'ar' ? "دمج التراث المصري في تصاميم الحجاب مع استخدام أفضل خامات القطن المصري" : "Integrating Egyptian heritage into hijab designs using the finest Egyptian cotton materials",
      icon: "history_edu",
      image: correctImagePath("/Shefon print/Shefon print 25.jpeg"),
      stats: "100%",
      statsLabel: language === 'ar' ? "قطن مصري" : "Egyptian Cotton",
      color: "from-yellow-500 to-orange-500"
    },
    {
      id: 5,
      year: "2021",
      title: language === 'ar' ? "البداية المصرية" : "Egyptian Beginning",
      description: language === 'ar' ? "انطلاق علامتنا المصرية بأول مجموعة حجاب من الشيفون المصري عالي الجودة" : "Launching our Egyptian brand with the first hijab collection of high-quality Egyptian chiffon",
      icon: "rocket_launch",
      image: correctImagePath("/Shefon print/Shefon print 6.jpeg"),
      stats: "🌟",
      statsLabel: language === 'ar' ? "الانطلاق" : "The Launch",
      color: "from-blue-500 to-cyan-500"
    }
  ];

  const values = [
    {
      icon: "flag",
      title: language === 'ar' ? "هوية مصرية" : "Egyptian Identity",
      description: language === 'ar' ? "نفخر بأننا علامة مصرية 100٪، من التصميم إلى التصنيع والتوزيع" : "We proudly represent a 100% Egyptian brand, from design to manufacturing and distribution",
      gradient: "from-primary/20 to-primary/5"
    },
    {
      icon: "star",
      title: language === 'ar' ? "جودة متميزة" : "Premium Quality",
      description: language === 'ar' ? "نلتزم بأعلى معايير الجودة في كل خطوة من خطوات التصنيع في مصر" : "We commit to the highest quality standards at every manufacturing step in Egypt",
      gradient: "from-green-500/20 to-emerald-600/5"
    },
    {
      icon: "diversity_3",
      title: language === 'ar' ? "مجتمع مصري" : "Egyptian Community",
      description: language === 'ar' ? "نخدم المجتمع المصري ونوفر فرص عمل للشابات المصريات في التصميم والإنتاج" : "We serve the Egyptian community and provide job opportunities for Egyptian women in design and production",
      gradient: "from-purple-600/20 to-indigo-600/5"
    },
    {
      icon: "eco",
      title: language === 'ar' ? "استدامة مصرية" : "Egyptian Sustainability",
      description: language === 'ar' ? "نستخدم مواد مصرية صديقة للبيئة ونعزز الاستدامة في صناعة النسيج المصرية" : "We use Egyptian eco-friendly materials and promote sustainability in the Egyptian textile industry",
      gradient: "from-teal-500/20 to-cyan-500/5"
    }
  ];

  // Animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeIn');
          }
        });
      },
      { threshold: 0.1 }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      cardsRef.current.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-peach-soft/5 to-white dark:from-background-dark dark:via-gray-900/50 dark:to-gray-900 overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/10 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/4 left-10 w-6 h-6 rounded-full bg-primary/20 animate-bounce"></div>
        <div className="absolute bottom-1/3 right-10 w-8 h-8 rounded-full bg-purple-500/20 animate-bounce delay-300"></div>
      </div>

      {/* Hero Section - Redesigned */}
      <section className="relative py-24 md:py-32 px-4 md:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center relative z-10">
            {/* Egyptian Badge */}
            <div className="inline-flex items-center gap-3 mb-8 px-6 py-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-primary/10 shadow-lg">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse delay-150"></div>
                <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse delay-300"></div>
              </div>
              <span className={`${language === 'ar' ? 'arabic-text' : ''} text-sm font-medium text-[#2d1a1e] dark:text-gray-300`}>
                {language === 'ar' ? 'علامة مصرية فاخرة' : 'Luxury Egyptian Brand'}
              </span>
            </div>
            
            <h1 className={`${language === 'ar' ? 'arabic-text' : ''} text-5xl md:text-6xl lg:text-7xl font-black text-[#2d1a1e] dark:text-white mb-8 leading-tight`}>
              <span className="block">
                {language === 'ar' ? 'قصة نجاح' : 'A Success Story'}
              </span>
              <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
                {language === 'ar' ? 'مصنوعة في مصر' : 'Made in Egypt'}
              </span>
            </h1>
            
            <p className={`${language === 'ar' ? 'arabic-text' : ''} text-xl text-[#2d1a1e]/70 dark:text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed`}>
              {language === 'ar' 
                ? 'انطلقنا بفخر من أرض مصر لنصنع تاريخاً من التميز والأناقة في عالم الأزياء المحتشمة'
                : 'We proudly launched from Egypt to create a history of excellence and elegance in the modest fashion world'}
            </p>
            
            {/* Hero Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {milestones.map((milestone, index) => (
                <div 
                  key={index}
                  ref={el => cardsRef.current[index] = el}
                  className="bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${milestone.color} flex items-center justify-center mb-4 mx-auto`}>
                    <span className="material-symbols-outlined text-white text-2xl">{milestone.icon}</span>
                  </div>
                  <div className={`${language === 'ar' ? 'arabic-text' : ''} text-3xl md:text-4xl font-bold bg-gradient-to-r ${milestone.color} bg-clip-text text-transparent mb-2`}>
                    {milestone.number}
                  </div>
                  <div className={`${language === 'ar' ? 'arabic-text' : ''} text-sm font-medium text-[#2d1a1e] dark:text-gray-300`}>
                    {milestone.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`${language === 'ar' ? 'arabic-text' : ''} text-4xl md:text-5xl font-black text-[#2d1a1e] dark:text-white mb-6`}>
              <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                {language === 'ar' ? 'أساس نجاحنا' : 'Our Foundation'}
              </span>
            </h2>
            <p className={`${language === 'ar' ? 'arabic-text' : ''} text-lg text-[#2d1a1e]/70 dark:text-gray-400 max-w-2xl mx-auto`}>
              {language === 'ar' 
                ? 'القيم التي تحكم كل قرار نتخذه وكل منتج نصنعه في مصر'
                : 'The values that govern every decision we make and every product we manufacture in Egypt'}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                ref={el => cardsRef.current[4 + index] = el}
                className="group relative"
              >
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-3 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  
                  <div className="relative z-10">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                      <span className="material-symbols-outlined text-3xl text-primary">{value.icon}</span>
                    </div>
                    <h3 className={`${language === 'ar' ? 'arabic-text' : ''} text-2xl font-bold mb-4 dark:text-white group-hover:text-primary transition-colors duration-300`}>
                      {value.title}
                    </h3>
                    <p className={`${language === 'ar' ? 'arabic-text' : ''} text-[#2d1a1e]/70 dark:text-gray-300 leading-relaxed`}>
                      {value.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className={`${language === 'ar' ? 'arabic-text' : ''} text-4xl md:text-5xl font-black text-[#2d1a1e] dark:text-white mb-6`}>
              <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                {language === 'ar' ? 'رحلة التميز' : 'Journey of Excellence'}
              </span>
            </h2>
            <p className={`${language === 'ar' ? 'arabic-text' : ''} text-lg text-[#2d1a1e]/70 dark:text-gray-400 max-w-2xl mx-auto`}>
              {language === 'ar' 
                ? 'محطات تاريخية في مسيرة نجاح صنعت في مصر'
                : 'Historical milestones in a success journey made in Egypt'}
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-purple-500 to-pink-500 hidden md:block"></div>
            
            <div className="space-y-20">
              {achievements.map((achievement, index) => (
                <div 
                  key={achievement.id}
                  ref={el => cardsRef.current[8 + index] = el}
                  className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} gap-8`}
                >
                  <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                    <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 group">
                      <div className="relative h-64 overflow-hidden">
                        <img 
                          src={achievement.image} 
                          alt={achievement.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          onError={(e) => e.target.src = '/default.jpeg'}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        
                        {/* Year Badge */}
                        <div className="absolute top-6 left-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg">
                          <div className="text-lg font-bold text-primary">{achievement.year}</div>
                        </div>
                        
                        {/* Stats Badge */}
                        <div className="absolute bottom-6 right-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl p-4 text-center min-w-20 shadow-lg">
                          <div className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                            {achievement.stats}
                          </div>
                          <div className={`${language === 'ar' ? 'arabic-text' : ''} text-xs text-[#2d1a1e] dark:text-gray-300`}>
                            {achievement.statsLabel}
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-8">
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${achievement.color} flex items-center justify-center`}>
                            <span className="material-symbols-outlined text-white text-xl">{achievement.icon}</span>
                          </div>
                          <h3 className={`${language === 'ar' ? 'arabic-text' : ''} text-2xl font-bold dark:text-white flex-1`}>
                            {achievement.title}
                          </h3>
                        </div>
                        <p className={`${language === 'ar' ? 'arabic-text' : ''} text-[#2d1a1e]/70 dark:text-gray-300 leading-relaxed`}>
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="hidden md:block w-16 h-16 rounded-full bg-gradient-to-br from-primary to-purple-600 border-8 border-white dark:border-gray-900 z-10 flex-shrink-0"></div>
                  <div className={`hidden md:block w-full md:w-1/2 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}`}></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10"></div>
            
            <div className="relative p-12 md:p-16 text-center">
              <div className="max-w-2xl mx-auto">
                {/* Decorative Circle */}
                <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-r from-primary via-purple-500 to-pink-500 flex items-center justify-center shadow-2xl animate-pulse">
                  <span className="material-symbols-outlined text-white text-3xl">rocket_launch</span>
                </div>
                
                <h3 className={`${language === 'ar' ? 'arabic-text' : ''} text-3xl md:text-4xl font-bold mb-6 dark:text-white`}>
                  {language === 'ar' ? 'كن جزءاً من قصتنا' : 'Be Part of Our Story'}
                </h3>
                
                <p className={`${language === 'ar' ? 'arabic-text' : ''} text-lg text-[#2d1a1e]/70 dark:text-gray-400 mb-10`}>
                  {language === 'ar' 
                    ? 'اكتشف الجودة المصرية والتصميم المتميز في كل قطعة من مجموعتنا الفاخرة'
                    : 'Discover Egyptian quality and exquisite design in every piece of our luxury collection'}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    to="/products"
                    className={`${language === 'ar' ? 'arabic-text' : ''} group relative px-8 py-4 bg-gradient-to-r from-primary to-purple-600 text-white rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl flex items-center justify-center gap-3 overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <span className="relative z-10 flex items-center gap-2">
                      <span className="material-symbols-outlined text-xl">shopping_bag</span>
                      {language === 'ar' ? 'تصفح المجموعة' : 'Browse Collection'}
                    </span>
                  </Link>
                  
                  <Link 
                    to="/about"
                    className={`${language === 'ar' ? 'arabic-text' : ''} group relative px-8 py-4 bg-white dark:bg-gray-800 text-[#2d1a1e] dark:text-white border-2 border-primary/20 rounded-2xl font-bold text-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-xl">info</span>
                      {language === 'ar' ? 'اعرف المزيد' : 'Learn More'}
                    </span>
                  </Link>
                </div>
                
                {/* Motto */}
                <div className="mt-12 pt-8 border-t border-[#2d1a1e]/10 dark:border-gray-700">
                  <p className={`${language === 'ar' ? 'arabic-text' : ''} text-[#2d1a1e]/60 dark:text-gray-400 text-lg italic`}>
                    {language === 'ar' 
                      ? 'مصنوع في مصر، مصمم للعالم'
                      : 'Made in Egypt, Designed for the World'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Add Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
        
        .animate-bounce {
          animation: bounce 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Achievements;