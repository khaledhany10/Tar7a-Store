import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const AboutUs = () => {
  const { language } = useLanguage();

  const teamMembers = [
    {
      id: 1,
      name_ar: "سارة أحمد",
      name_en: "Sarah Ahmed",
      role_ar: "مؤسسة ومديرة التصميم",
      role_en: "Founder & Design Director",
      bio_ar: "مصممة أزياء بخبرة 10 سنوات في صناعة الأزياء الإسلامية. حاصلة على درجة الماجستير في تصميم الأزياء من كلية لندن للأزياء.",
      bio_en: "Fashion designer with 10 years experience in Islamic fashion industry. Holds a Master's degree in Fashion Design from London College of Fashion.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b786d4d1?w=400&h=400&fit=crop&crop=face",
      color: "bg-purple-100"
    },
    {
      id: 2,
      name_ar: "ليلى حسن",
      name_en: "Layla Hassan",
      role_ar: "مديرة العمليات",
      role_en: "Operations Manager",
      bio_ar: "متخصصة في إدارة سلاسل التوريد والخدمات اللوجستية بخبرة 8 سنوات في تجارة الأزياء الإلكترونية.",
      bio_en: "Supply chain and logistics specialist with 8 years experience in e-commerce fashion trade.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      color: "bg-blue-100"
    },
    {
      id: 3,
      name_ar: "نورا الخالد",
      name_en: "Nora Al-Khaled",
      role_ar: "مديرة التسويق",
      role_en: "Marketing Director",
      bio_ar: "خبيرة في التسويق الرقمي وبناء العلامات التجارية، حاصلة على شهادة Google في التسويق الرقمي.",
      bio_en: "Digital marketing and brand building expert, certified by Google in Digital Marketing.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w-400&h=400&fit=crop&crop=face",
      color: "bg-pink-100"
    },
    {
      id: 4,
      name_ar: "أميرة محمد",
      name_en: "Amira Mohamed",
      role_ar: "مستشارة الأناقة",
      role_en: "Style Consultant",
      bio_ar: "مستشارة أناقة معتمدة، تساعد العملاء في اختيار المظهر المناسب لكل مناسبة.",
      bio_en: "Certified style consultant, helping clients choose the perfect look for every occasion.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
      color: "bg-green-100"
    }
  ];

  const milestones = [
    { title_ar: "الانطلاق", title_en: "Launch", description_ar: "بداية المتجر الإلكتروني مع 50 منتج", description_en: "E-commerce launch with 50 products" },
    { title_ar: "التوسع", title_en: "Expansion", description_ar: "إضافة خط إنتاج للأطفال وفتح أول معرض", description_en: "Added kids line and opened first showroom" },
    { title_ar: "الابتكار", title_en: "Innovation", description_ar: "إطلاق خط الأقمشة المستدامة", description_en: "Launched sustainable fabrics line" },
    { title_ar: "المجتمع", title_en: "Community", description_ar: "تأسيس برنامج تمكين صانعي الأزياء", description_en: "Established fashion makers empowerment program" }
  ];

  const values = [
    {
      icon: "diversity_3",
      title_ar: "التنوع والشمول",
      title_en: "Diversity & Inclusion",
      description_ar: "نصمم لجميع النساء بغض النظر عن الحجم أو العمر أو الخلفية الثقافية",
      description_en: "We design for all women regardless of size, age, or cultural background"
    },
    {
      icon: "eco",
      title_ar: "الاستدامة",
      title_en: "Sustainability",
      description_ar: "نستخدم مواد صديقة للبيئة ونمارس الإنتاج المسؤول",
      description_en: "We use eco-friendly materials and practice responsible production"
    },
    {
      icon: "handshake",
      title_ar: "الجودة",
      title_en: "Quality",
      description_ar: "كل قطعة تخضع لفحص دقيق لضمان التميز في الصنع",
      description_en: "Every piece undergoes rigorous inspection to ensure excellence in craftsmanship"
    },
    {
      icon: "flare",
      title_ar: "الإبداع",
      title_en: "Creativity",
      description_ar: "نحن نبتكر تصاميم تدمج بين الأصالة والحداثة",
      description_en: "We innovate designs that blend tradition with modernity"
    },
    {
      icon: "favorite",
      title_ar: "مجتمعنا",
      title_en: "Community",
      description_ar: "نؤمن ببناء مجتمع يدعم ويرفع من شأن المرأة المسلمة",
      description_en: "We believe in building a community that supports and uplifts Muslim women"
    },
    {
      icon: "workspace_premium",
      title_ar: "الشفافية",
      title_en: "Transparency",
      description_ar: "نكون صادقين حول عمليات الإنتاج وأساليب العمل",
      description_en: "We are honest about our production processes and business practices"
    }
  ];

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Hero Section */}
      <div className="relative overflow-hidden py-20 px-6 md:px-20 bg-gradient-to-br from-primary/5 via-peach-soft/20 to-primary/10 dark:from-primary/10 dark:via-background-dark dark:to-primary/5">
<div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-30"></div>        
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
              <span className="material-symbols-outlined text-primary">spa</span>
              <span className={`${language === 'ar' ? 'arabic-text' : ''} text-sm font-medium`}>
                {language === 'ar' ? 'منذ 2020' : 'Since 2020'}
              </span>
            </div>
            
            <h1 className={`${language === 'ar' ? 'arabic-text' : ''} text-5xl md:text-7xl font-bold mb-6 dark:text-white`}>
              {language === 'ar' ? 'قصتنا' : 'Our Story'}
            </h1>
            
            <p className={`${language === 'ar' ? 'arabic-text' : ''} text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed`}>
              {language === 'ar' 
                ? 'نحن أكثر من مجرد علامة تجارية للأزياء - نحن حركة تهدف إلى تمكين المرأة المسلمة عبر أناقة متواضعة، تصميم متميز، ومجتمع داعم.'
                : 'We are more than a fashion brand - we are a movement empowering Muslim women through modest elegance, exquisite design, and supportive community.'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="max-w-7xl mx-auto px-6 md:px-20 py-20">
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <div className="bg-gradient-to-br from-primary/10 to-peach-soft/20 rounded-3xl p-8 md:p-12">
            <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-primary text-3xl">target</span>
            </div>
            <h2 className={`${language === 'ar' ? 'arabic-text' : ''} text-3xl font-bold mb-4 dark:text-white`}>
              {language === 'ar' ? 'رسالتنا' : 'Our Mission'}
            </h2>
            <p className={`${language === 'ar' ? 'arabic-text' : ''} text-lg text-gray-700 dark:text-gray-300 leading-relaxed`}>
              {language === 'ar' 
                ? 'إعادة تعريف الأناقة المتواضعة من خلال تصميمات عصرية تجمع بين الأصالة والحداثة. نهدف إلى تزويد المرأة المسلمة بقطع عالية الجودة تعكس شخصيتها وتزيد من ثقتها بنفسها.'
                : 'Redefining modest elegance through contemporary designs that blend tradition with modernity. We aim to provide Muslim women with high-quality pieces that reflect their personality and boost their confidence.'
              }
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-100/30 to-pink-100/30 dark:from-purple-900/20 dark:to-pink-900/20 rounded-3xl p-8 md:p-12">
            <div className="w-16 h-16 rounded-2xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-purple-600 dark:text-purple-400 text-3xl">visibility</span>
            </div>
            <h2 className={`${language === 'ar' ? 'arabic-text' : ''} text-3xl font-bold mb-4 dark:text-white`}>
              {language === 'ar' ? 'رؤيتنا' : 'Our Vision'}
            </h2>
            <p className={`${language === 'ar' ? 'arabic-text' : ''} text-lg text-gray-700 dark:text-gray-300 leading-relaxed`}>
              {language === 'ar' 
                ? 'أن نكون الوجهة العالمية الرائدة للأزياء الإسلامية المتواضعة، وأن نلهم جيلاً جديداً من النساء ليعبرن عن هويتهن بثقة وفخر.'
                : 'To be the leading global destination for modest Islamic fashion, inspiring a new generation of women to express their identity with confidence and pride.'
              }
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-20">
          <h2 className={`${language === 'ar' ? 'arabic-text' : ''} text-3xl font-bold text-center mb-12 dark:text-white`}>
            {language === 'ar' ? 'رحلة التطور' : 'Our Journey'}
          </h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary to-purple-400 hidden md:block"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                    <div className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg ${index % 2 === 0 ? 'text-left' : 'text-right'}`}>
                      <div className="inline-flex items-center gap-2 mb-2">
                        <span className="w-3 h-3 rounded-full bg-primary"></span>
                        <span className="text-sm text-gray-500">{milestone.year}</span>
                      </div>
                      <h3 className={`${language === 'ar' ? 'arabic-text' : ''} text-xl font-bold mb-2 dark:text-white`}>
                        {language === 'ar' ? milestone.title_ar : milestone.title_en}
                      </h3>
                      <p className={`${language === 'ar' ? 'arabic-text' : ''} text-gray-600 dark:text-gray-300`}>
                        {language === 'ar' ? milestone.description_ar : milestone.description_en}
                      </p>
                    </div>
                  </div>
                  <div className="hidden md:block w-12 h-12 rounded-full bg-primary border-4 border-white dark:border-gray-900 z-10 mx-6 flex-shrink-0"></div>
                  <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}`}></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-20">
          <h2 className={`${language === 'ar' ? 'arabic-text' : ''} text-3xl font-bold text-center mb-4 dark:text-white`}>
            {language === 'ar' ? 'قيمنا' : 'Our Values'}
          </h2>
          <p className={`${language === 'ar' ? 'arabic-text' : ''} text-gray-600 dark:text-gray-300 text-center mb-12 max-w-2xl mx-auto`}>
            {language === 'ar' 
              ? 'المبادئ التي توجه كل قرار نتخذه وكل منتج نصنعه'
              : 'The principles that guide every decision we make and every product we create'
            }
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-6 hover:shadow-xl transition-shadow">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-primary text-2xl">{value.icon}</span>
                </div>
                <h3 className={`${language === 'ar' ? 'arabic-text' : ''} text-xl font-bold mb-2 dark:text-white`}>
                  {language === 'ar' ? value.title_ar : value.title_en}
                </h3>
                <p className={`${language === 'ar' ? 'arabic-text' : ''} text-gray-600 dark:text-gray-300`}>
                  {language === 'ar' ? value.description_ar : value.description_en}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-primary/10 to-purple-100/30 dark:from-primary/20 dark:to-purple-900/20 rounded-3xl p-12 mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">5K+</div>
              <div className={`${language === 'ar' ? 'arabic-text' : ''} text-gray-700 dark:text-gray-300`}>
                {language === 'ar' ? 'عميل سعيد' : 'Happy Customers'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">50+</div>
              <div className={`${language === 'ar' ? 'arabic-text' : ''} text-gray-700 dark:text-gray-300`}>
                {language === 'ar' ? 'تصميمات' : 'Designs'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">500+</div>
              <div className={`${language === 'ar' ? 'arabic-text' : ''} text-gray-700 dark:text-gray-300`}>
                {language === 'ar' ? 'منتجات مباعه' : 'Products'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">2</div>
              <div className={`${language === 'ar' ? 'arabic-text' : ''} text-gray-700 dark:text-gray-300`}>
                {language === 'ar' ? 'سنوات من التميز' : 'Years of Excellence'}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className={`${language === 'ar' ? 'arabic-text' : ''} text-3xl font-bold mb-6 dark:text-white`}>
            {language === 'ar' ? 'انضم إلى رحلتنا' : 'Join Our Journey'}
          </h2>
          <p className={`${language === 'ar' ? 'arabic-text' : ''} text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto`}>
            {language === 'ar' 
              ? 'كن جزءاً من مجتمعنا المتنامي واستمتع بتجربة تسوق استثنائية تجمع بين الأناقة والجودة والأصالة'
              : 'Be part of our growing community and experience exceptional shopping that combines elegance, quality, and authenticity'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className={`${language === 'ar' ? 'arabic-text' : ''} px-8 py-4 bg-primary text-white rounded-full font-bold hover:bg-primary-dark transition-colors flex items-center justify-center gap-2`}>
              <span className="material-symbols-outlined">shopping_bag</span>
              {language === 'ar' ? 'تسوق الآن' : 'Shop Now'}
            </button>
            <button className={`${language === 'ar' ? 'arabic-text' : ''} px-8 py-4 bg-white dark:bg-gray-800 text-primary border border-primary rounded-full font-bold hover:bg-primary/5 transition-colors flex items-center justify-center gap-2`}>
              <span className="material-symbols-outlined">contact_support</span>
              {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;