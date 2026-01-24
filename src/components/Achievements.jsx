import React from 'react';

const Achievements = () => {
  const achievements = [
    {
      id: 1,
      year: "2024",
      title: "أكثر من ١٠،٠٠٠ عميل راضٍ",
      description: "وصلنا إلى معلم خدمة أكثر من ١٠،٠٠٠ عميل راضٍ حول العالم",
      icon: "diversity_3",
      image: "/img/1.jpeg"
    },
    {
      id: 2,
      year: "2023",
      title: "جائزة أفضل ماركة حجاب",
      description: "تم الاعتراف بنا كأفضل ماركة حجاب في جوائز الشرق الأوسط للأزياء",
      icon: "emoji_events",
      image: "/img/2.jpeg"
    },
    {
      id: 3,
      year: "2023",
      title: "التوسع العالمي",
      description: "بدأنا الشحن إلى أكثر من ٥٠ دولة عبر ٥ قارات",
      icon: "public",
      image: "/img/3.jpeg"
    },
    {
      id: 4,
      year: "2022",
      title: "مبادرة صديقة للبيئة",
      description: "أطلقنا مجموعتنا المستدامة باستخدام مواد عضوية ومعاد تدويرها",
      icon: "eco",
      image: "/img/4.jpeg"
    },
    {
      id: 5,
      year: "2022",
      title: "التواصل المجتمعي",
      description: "تبرعنا ب٥٠٠٠ حجاب للنساء المحتاجات من خلال برنامجنا الخيري",
      icon: "volunteer_activism",
      image: "/img/5.jpeg"
    },
    {
      id: 6,
      year: "2021",
      title: "إطلاق العلامة التجارية",
      description: "أطلقنا متجر طرحة بنجاح مع مجموعتنا المميزة من الشيفون",
      icon: "rocket_launch",
      image: "/img/6.jpeg"
    }
  ];

  const milestones = [
    { number: "٦٨+", label: "تصميم حجاب فريد" },
    { number: "٢٠٠٠+", label: "تقييم ٥ نجوم" },
    { number: "٥٠+", label: "دولة يتم خدمتها" },
    { number: "١٠٠٠٠+", label: "عميل راضٍ" },
    { number: "٨", label: "أنواع أقمشة" },
    { number: "٢٤/٧", label: "دعم عملاء" }
  ];

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* قسم البطل */}
      <div className="relative py-20 px-6 md:px-20 bg-gradient-to-r from-primary/10 to-peach-soft dark:from-primary/5 dark:to-background-dark">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="arabic-text text-5xl md:text-7xl font-bold mb-6 dark:text-white">رحلتنا</h1>
            <p className="arabic-text text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              من مشروع ناشئ صغير إلى ماركة حجاب رائدة، اكتشف المعالم التي شكلت قصة نجاح متجر طرحة.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-20 py-16">
        {/* المعالم */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-20">
          {milestones.map((milestone, index) => (
            <div key={index} className="text-center">
              <div className="arabic-text text-4xl font-bold text-primary mb-2">{milestone.number}</div>
              <div className="arabic-text text-gray-600 dark:text-gray-400 text-sm">{milestone.label}</div>
            </div>
          ))}
        </div>

        {/* الخط الزمني */}
        <div className="relative">
          {/* خط الخط الزمني */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-primary/20"></div>
          
          {achievements.map((achievement, index) => (
            <div 
              key={achievement.id} 
              className={`relative mb-16 ${index % 2 === 0 ? 'md:pr-1/2 md:pl-20' : 'md:pl-1/2 md:pr-20'}`}
            >
              <div className="flex flex-col md:flex-row items-center">
                {/* نقطة الخط الزمني */}
\                
                {/* السنة */}
                <div className={`mb-4 md:mb-0 ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'}`}>
                  <div className="arabic-text text-2xl font-bold text-primary">{achievement.year}</div>
                </div>
                
                {/* بطاقة المحتوى */}
                <div className={`bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg flex-1 ${index % 2 === 0 ? 'md:ml-8' : 'md:mr-8'}`}>
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="md:w-1/3">
                      <div className="aspect-square rounded-2xl overflow-hidden">
                        <img 
                          src={achievement.image} 
                          alt={achievement.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    
                    <div className="md:w-2/3">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                          <span className="material-symbols-outlined text-2xl">{achievement.icon}</span>
                        </div>
                        <h3 className="arabic-text text-2xl font-bold dark:text-white">{achievement.title}</h3>
                      </div>
                      
                      <p className="arabic-text text-gray-600 dark:text-gray-300 mb-6">
                        {achievement.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div key={i} className="w-3 h-3 rounded-full bg-primary/20"></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* الرسالة والرؤية */}
        <div className="grid md:grid-cols-2 gap-12 mt-24">
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
              <span className="material-symbols-outlined text-3xl">target</span>
            </div>
            <h3 className="arabic-text text-2xl font-bold mb-4 dark:text-white">رسالتنا</h3>
            <p className="arabic-text text-gray-600 dark:text-gray-300 leading-relaxed">
              تمكين المرأة المسلمة في جميع أنحاء العالم من خلال توفير حجاب عالي الجودة وعصري ومريح يحترم التقاليد ويتبنى الموضة العصرية. نؤمن أن كل امرأة تستحق أن تشعر بالثقة والجمال في ملابسها المحتشمة.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
              <span className="material-symbols-outlined text-3xl">visibility</span>
            </div>
            <h3 className="arabic-text text-2xl font-bold mb-4 dark:text-white">رؤيتنا</h3>
            <p className="arabic-text text-gray-600 dark:text-gray-300 leading-relaxed">
              أن نصبح ماركة الحجاب الرائدة في العالم، ووضع معايير للجودة والابتكار والأزياء الأخلاقية. نتطلع إلى مستقبل يتم فيه الاحتفاء بالموضة المحتشمة على مستوى العالم ويمكن لكل امرأة التعبير عن إيمانها بثقة وأناقة.
            </p>
          </div>
        </div>

        {/* قسم الفريق */}
        <div className="mt-24">
          <h2 className="arabic-text text-3xl font-bold text-center mb-12 dark:text-white">تعرف على مؤسسينا</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "سارة أحمد", role: "المدير التنفيذي والمدير الإبداعي", image: "/img/10.jpeg" },
              { name: "فاطمة حسن", role: "رئيسة قسم التصميم", image: "/img/11.jpeg" },
              { name: "آمنة خان", role: "مديرة العمليات", image: "/img/12.jpeg" }
            ].map((member, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg">
                <div className="aspect-square">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h4 className="arabic-text text-xl font-bold mb-1 dark:text-white">{member.name}</h4>
                  <p className="arabic-text text-primary mb-4">{member.role}</p>
                  <p className="arabic-text text-gray-600 dark:text-gray-300 text-sm">
                    شغوفة بإنشاء حجاب جميل وعملي يجعل النساء يشعرن بالثقة.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievements;