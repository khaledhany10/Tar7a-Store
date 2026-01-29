import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { t } from '../locales/translations';
import { Link } from 'react-router-dom';

const Achievements = () => {
  const { language } = useLanguage();
  const cardsRef = useRef([]);
  
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

  const teamMembers = [
    { 
      name: language === 'ar' ? "سارة أحمد" : "Sara Ahmed", 
      role: language === 'ar' ? "المصممة الرئيسية" : "Head Designer",
      image: correctImagePath("/Shefon print/Shefon print 1.jpeg"),
      description: language === 'ar' ? "خبيرة في تصميم الحجاب المصري بخبرة 8 سنوات، تدمج التراث المصري في التصاميم" : "Expert in Egyptian hijab design with 8 years experience, integrating Egyptian heritage into designs",
      social: ["design_services", "palette", "brush"],
      color: "from-primary to-purple-600"
    },
    { 
      name: language === 'ar' ? "فاطمة محمد" : "Fatima Mohamed", 
      role: language === 'ar' ? "مديرة العمليات" : "Operations Manager",
      image: correctImagePath("/Shefon Sada/Shefon Sada2.jpeg"),
      description: language === 'ar' ? "تضمن جودة التصنيع المصري وإدارة عمليات الإنتاج والتوزيع داخل مصر" : "Ensures Egyptian manufacturing quality and manages production and distribution operations within Egypt",
      social: ["storefront", "local_shipping", "headset_mic"],
      color: "from-green-500 to-emerald-600"
    },
    { 
      name: language === 'ar' ? "آمنة خالد" : "Amena Khaled", 
      role: language === 'ar' ? "خبيرة الجودة" : "Quality Expert",
      image: correctImagePath("/Shefon Sada/Shefon Sada3.jpeg"),
      description: language === 'ar' ? "تضمن أن كل قطعة تنتج في مصر تلتزم بأعلى معايير الجودة العالمية" : "Ensures every piece produced in Egypt adheres to the highest international quality standards",
      social: ["verified", "science", "check_circle"],
      color: "from-pink-500 to-rose-500"
    }
  ];

  const values = [
    {
      icon: "flag",
      title: language === 'ar' ? "هوية مصرية" : "Egyptian Identity",
      description: language === 'ar' ? "نفخر بأننا علامة مصرية 100٪، من التصميم إلى التصنيع والتوزيع" : "We proudly represent a 100% Egyptian brand, from design to manufacturing and distribution"
    },
    {
      icon: "star",
      title: language === 'ar' ? "جودة متميزة" : "Premium Quality",
      description: language === 'ar' ? "نلتزم بأعلى معايير الجودة في كل خطوة من خطوات التصنيع في مصر" : "We commit to the highest quality standards at every manufacturing step in Egypt"
    },
    {
      icon: "diversity_3",
      title: language === 'ar' ? "مجتمع مصري" : "Egyptian Community",
      description: language === 'ar' ? "نخدم المجتمع المصري ونوفر فرص عمل للشابات المصريات في التصميم والإنتاج" : "We serve the Egyptian community and provide job opportunities for Egyptian women in design and production"
    },
    {
      icon: "eco",
      title: language === 'ar' ? "استدامة مصرية" : "Egyptian Sustainability",
      description: language === 'ar' ? "نستخدم مواد مصرية صديقة للبيئة ونعزز الاستدامة في صناعة النسيج المصرية" : "We use Egyptian eco-friendly materials and promote sustainability in the Egyptian textile industry"
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Egyptian Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;100&quot; height=&quot;100&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cdefs%3E%3Cpattern id=&quot;egyptian&quot; width=&quot;20&quot; height=&quot;20&quot; patternUnits=&quot;userSpaceOnUse&quot;%3E%3Cpath d=&quot;M0,0 L20,20 M20,0 L0,20&quot; stroke=&quot;%2300597B&quot; stroke-width=&quot;0.5&quot;/%3E%3C/pattern%3E%3C/defs%3E%3Crect width=&quot;100%25&quot; height=&quot;100%25&quot; fill=&quot;url(%23egyptian)&quot;/%3E%3C/svg%3E')]"></div>
      </div>

      {/* Hero Section - Redesigned */}
      <div className="relative py-20 md:py-28 px-4 md:px-6 bg-gradient-to-br from-primary/5 via-white to-purple-600/5 dark:from-primary/10 dark:via-gray-800 dark:to-purple-600/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center relative z-10">
            {/* Egyptian Badge */}
            <div className="inline-flex items-center gap-2 mb-8 bg-gradient-to-r from-red-300 via-white to-gray-700 px-6 py-2 rounded-full shadow-lg animate-bounce-slow">
              <span className="material-symbols-outlined text-white bg-red-300 rounded-full p-1">flag</span>
              <span className="font-bold text-gray-800 dark:text-white">
                {language === 'ar' ? 'علامة مصرية أصيلة' : 'Authentic Egyptian Brand'}
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 dark:text-white leading-tight">
              <span className="block text-gray-800 dark:text-white mb-2">
                {language === 'ar' ? 'فخر' : 'Pride of'}
              </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-red-300 to-black dark:from-primary dark:via-red-500 dark:to-yellow-500 animate-gradient">
                {language === 'ar' ? 'الصناعة المصرية' : 'Egyptian Industry'}
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
              {language === 'ar' 
                ? 'نجاحاتنا قصة مصنوعة في مصر، من تصميمات مستوحاة من تراثنا إلى تصنيع بجودة عالمية'
                : 'Our success is a story made in Egypt, from designs inspired by our heritage to manufacturing with global quality'}
            </p>
            
            {/* Hero Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mt-12">
              {milestones.slice(0, 4).map((milestone, index) => (
                <div key={index} className="text-center bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md hover:shadow-xl transition-shadow duration-300">
                  <div className="text-2xl md:text-3xl font-bold text-primary dark:text-primary-light mb-1">
                    {milestone.number}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {milestone.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-20">
        
        {/* Our Values Section */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-red-600">
                {language === 'ar' ? 'قيمنا المصرية' : 'Our Egyptian Values'}
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
              {language === 'ar' 
                ? 'أساس نجاحنا هو التمسك بالقيم المصرية الأصيلة في كل ما نقدمه'
                : 'The foundation of our success is our commitment to authentic Egyptian values in everything we offer'}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div 
                key={index}
                ref={el => cardsRef.current[index] = el}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <span className="material-symbols-outlined text-2xl text-primary">{value.icon}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 dark:text-white group-hover:text-primary transition-colors duration-300">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Egyptian Journey Timeline - Horizontal Scroll */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-yellow-500">
                {language === 'ar' ? 'رحلتنا المصرية' : 'Our Egyptian Journey'}
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
              {language === 'ar' 
                ? 'مسيرة نجاح بدأت في مصر ونمَت في مصر'
                : 'A success journey that started in Egypt and grew in Egypt'}
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-red-600 to-yellow-500 hidden md:block"></div>
            
            <div className="space-y-12 md:space-y-0 md:grid md:grid-cols-5 gap-8">
              {achievements.map((achievement, index) => (
                <div 
                  key={achievement.id}
                  ref={el => cardsRef.current[4 + index] = el}
                  className={`relative ${index % 2 === 0 ? 'md:mt-0' : 'md:mt-24'}`}
                >
                  {/* Year Badge */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 -top-6 z-10">
                    <div className="bg-gradient-to-r from-red-500 to-white text-white px-4 py-2 rounded-full font-bold shadow-lg">
                      {achievement.year}
                    </div>
                  </div>
                  
                  {/* Card */}
                  <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 group">
                    {/* Image */}
                    <div className="aspect-square relative overflow-hidden">
                      <img 
                        src={achievement.image} 
                        alt={achievement.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => {
                          e.target.src = '/default.jpeg';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      
                      {/* Stats Overlay */}
                      <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-lg p-2 text-center min-w-16">
                        <div className="text-lg font-bold text-primary">{achievement.stats}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">{achievement.statsLabel}</div>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                          <span className="material-symbols-outlined text-primary">{achievement.icon}</span>
                        </div>
                        <h3 className="text-lg font-bold dark:text-white flex-1">
                          {achievement.title}
                        </h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section with Egyptian Theme */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
          {/* Egyptian Pattern Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-red-600/5 to-yellow-500/5"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;100&quot; height=&quot;100&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cdefs%3E%3Cpattern id=&quot;egyptian&quot; width=&quot;20&quot; height=&quot;20&quot; patternUnits=&quot;userSpaceOnUse&quot;%3E%3Cpath d=&quot;M0,0 L20,20 M20,0 L0,20&quot; stroke=&quot;%2300597B&quot; stroke-width=&quot;0.5&quot;/%3E%3C/pattern%3E%3C/defs%3E%3Crect width=&quot;100%25&quot; height=&quot;100%25&quot; fill=&quot;url(%23egyptian)&quot;/%3E%3C/svg%3E')]"></div>
          
          <div className="relative p-8 md:p-12 text-center">
            <div className="max-w-2xl mx-auto">
              {/* Egyptian Icon */}
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-red-600 via-white to-black rounded-full flex items-center justify-center shadow-lg animate-pulse">
                <span className="material-symbols-outlined text-3xl text-white">flag</span>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold mb-4 dark:text-white">
                {language === 'ar' ? 'انضم إلى رحلتنا المصرية' : 'Join Our Egyptian Journey'}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
                {language === 'ar' 
                  ? 'اكتشف جودة الصناعة المصرية في كل قطعة تختارها من مجموعتنا'
                  : 'Discover Egyptian manufacturing quality in every piece you choose from our collection'}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/products"
                  className="px-8 py-3.5 bg-gradient-to-r from-primary to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg flex items-center justify-center gap-2 group"
                >
                  <span className="material-symbols-outlined">shopping_bag</span>
                  {language === 'ar' ? 'تسوق الآن' : 'Shop Now'}
                </Link>
                
                <Link 
                  to="/contact"
                  className="px-8 py-3.5 bg-gradient-to-r from-primary to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg flex items-center justify-center gap-2 group"
                >
                  <span className="material-symbols-outlined">chat</span>
                  {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
                </Link>
              </div>
              
              {/* Egyptian Motto */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-gray-500 dark:text-gray-400 text-sm italic">
                  {language === 'ar' 
                    ? '"مصنوع في مصر، بفخر مصري"'
                    : '"Made in Egypt, with Egyptian pride"'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add CSS Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
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
        
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
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
        
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        
        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Achievements;