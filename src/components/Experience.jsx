import React from 'react';

const experiences = [
  {
    id: 1,
    icon: "eco",
    title: "أقمشة مميزة",
    description: "نختار فقط أعلى جودة من الأقمشة القابلة للتنفس التي تشعر بالراحة مثل مظهرها الرائع."
  },
  {
    id: 2,
    icon: "auto_awesome",
    title: "تدلي مثالي",
    description: "مصممة بأبعاد ووزن مثاليين لتنسيق سهل طوال اليوم دون مجهود."
  },
  {
    id: 3,
    icon: "local_shipping",
    title: "شحن عالمي",
    description: "شحن سريع وموثوق للأخوات في جميع أنحاء العالم، يتم التعامل معه بعناية فائقة."
  }
];

const Experience = () => {
  return (
    <section className="bg-peach-soft/20 dark:bg-background-dark/50 px-6 md:px-20 py-24">
      <div className="max-w-[1200px] mx-auto text-center">
        <h2 className="arabic-text text-3xl md:text-5xl font-bold mb-16 tracking-tight">تجربة متجر طرحة</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {experiences.map((experience) => (
            <div key={experience.id} className="flex flex-col items-center gap-6">
              <div className="w-16 h-16 rounded-3xl bg-white dark:bg-gray-800 flex items-center justify-center text-primary shadow-md">
                <span className="material-symbols-outlined text-3xl">{experience.icon}</span>
              </div>
              <h3 className="arabic-text font-bold text-xl">{experience.title}</h3>
              <p className="arabic-text text-[#2d1a1e]/60 dark:text-gray-400 leading-relaxed">
                {experience.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;