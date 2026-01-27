import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../locales/translations';

const Achievements = () => {
  const { language } = useLanguage();
  const t = (key) => translations[language][key] || key;

  const achievements = [
    {
      id: 1,
      year: "2024",
      title: t("achievement.customer2024"),
      description: t("achievement.customer2024Desc"),
      icon: "diversity_3",
      image: "/img/1.jpeg"
    },
    {
      id: 2,
      year: "2023",
      title: t("achievement.award2023"),
      description: t("achievement.award2023Desc"),
      icon: "emoji_events",
      image: "/img/2.jpeg"
    },
    {
      id: 3,
      year: "2023",
      title: t("achievement.expansion2023"),
      description: t("achievement.expansion2023Desc"),
      icon: "public",
      image: "/img/3.jpeg"
    },
    {
      id: 4,
      year: "2022",
      title: t("achievement.eco2022"),
      description: t("achievement.eco2022Desc"),
      icon: "eco",
      image: "/img/4.jpeg"
    },
    {
      id: 5,
      year: "2022",
      title: t("achievement.community2022"),
      description: t("achievement.community2022Desc"),
      icon: "volunteer_activism",
      image: "/img/5.jpeg"
    },
    {
      id: 6,
      year: "2021",
      title: t("achievement.launch2021"),
      description: t("achievement.launch2021Desc"),
      icon: "rocket_launch",
      image: "/img/6.jpeg"
    }
  ];

  const milestones = [
    { number: "٦٨+", label: t("milestones.uniqueDesigns") },
    { number: "٢٠٠٠+", label: t("milestones.fiveStarReviews") },
    { number: "٥٠+", label: t("milestones.countriesServed") },
    { number: "١٠٠٠٠+", label: t("milestones.satisfiedCustomers") },
    { number: "٨", label: t("milestones.fabricTypes") },
    { number: "٢٤/٧", label: t("milestones.customerSupport") }
  ];

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Hero Section */}
      <div className="relative py-20 px-6 md:px-20 bg-gradient-to-r from-primary/10 to-peach-soft dark:from-primary/5 dark:to-background-dark">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className={`${language === 'ar' ? 'arabic-text' : ''} text-5xl md:text-7xl font-bold mb-6 dark:text-white`}>
              {t("achievements.title")}
            </h1>
            <p className={`${language === 'ar' ? 'arabic-text' : ''} text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto`}>
              {t("achievements.subtitle")}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-20 py-16">
        {/* Milestones */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-20">
          {milestones.map((milestone, index) => (
            <div key={index} className="text-center">
              <div className={`${language === 'ar' ? 'arabic-text' : ''} text-4xl font-bold text-primary mb-2`}>
                {milestone.number}
              </div>
              <div className={`${language === 'ar' ? 'arabic-text' : ''} text-gray-600 dark:text-gray-400 text-sm`}>
                {milestone.label}
              </div>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-primary/20"></div>
          
          {achievements.map((achievement, index) => (
            <div 
              key={achievement.id} 
              className={`relative mb-16 ${index % 2 === 0 ? 'md:pr-1/2 md:pl-20' : 'md:pl-1/2 md:pr-20'}`}
            >
              <div className="flex flex-col md:flex-row items-center">
                {/* Year */}
                <div className={`mb-4 md:mb-0 ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'}`}>
                  <div className={`${language === 'ar' ? 'arabic-text' : ''} text-2xl font-bold text-primary`}>
                    {achievement.year}
                  </div>
                </div>
                
                {/* Content Card */}
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
                        <h3 className={`${language === 'ar' ? 'arabic-text' : ''} text-2xl font-bold dark:text-white`}>
                          {achievement.title}
                        </h3>
                      </div>
                      
                      <p className={`${language === 'ar' ? 'arabic-text' : ''} text-gray-600 dark:text-gray-300 mb-6`}>
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

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-12 mt-24">
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
              <span className="material-symbols-outlined text-3xl">target</span>
            </div>
            <h3 className={`${language === 'ar' ? 'arabic-text' : ''} text-2xl font-bold mb-4 dark:text-white`}>
              {t("mission.title")}
            </h3>
            <p className={`${language === 'ar' ? 'arabic-text' : ''} text-gray-600 dark:text-gray-300 leading-relaxed`}>
              {t("mission.text")}
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
              <span className="material-symbols-outlined text-3xl">visibility</span>
            </div>
            <h3 className={`${language === 'ar' ? 'arabic-text' : ''} text-2xl font-bold mb-4 dark:text-white`}>
              {t("vision.title")}
            </h3>
            <p className={`${language === 'ar' ? 'arabic-text' : ''} text-gray-600 dark:text-gray-300 leading-relaxed`}>
              {t("vision.text")}
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-24">
          <h2 className={`${language === 'ar' ? 'arabic-text' : ''} text-3xl font-bold text-center mb-12 dark:text-white`}>
            {t("team.title")}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: t("team.sara"), role: t("team.saraRole"), image: "/img/10.jpeg" },
              { name: t("team.fatima"), role: t("team.fatimaRole"), image: "/img/11.jpeg" },
              { name: t("team.amena"), role: t("team.amenaRole"), image: "/img/12.jpeg" }
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
                  <h4 className={`${language === 'ar' ? 'arabic-text' : ''} text-xl font-bold mb-1 dark:text-white`}>
                    {member.name}
                  </h4>
                  <p className={`${language === 'ar' ? 'arabic-text' : ''} text-primary mb-4`}>{member.role}</p>
                  <p className={`${language === 'ar' ? 'arabic-text' : ''} text-gray-600 dark:text-gray-300 text-sm`}>
                    {t("team.memberDesc")}
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