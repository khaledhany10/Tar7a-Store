import React from 'react';
import { Link } from 'react-router-dom';

const fabricData = [
  {
    id: 1,
    name: "شيفون أساسي",
    image: "/img/1.jpeg",
    category: "Chiffon"
  },
  {
    id: 2,
    name: "جيرسي متميز",
    image: "/img/2.jpeg",
    category: "Jersey"
  },
  {
    id: 3,
    name: "مودال فاخر",
    image: "/img/3.jpeg",
    category: "Modal"
  },
  {
    id: 4,
    name: "حرير نقي",
    image: "/img/4.jpeg",
    category: "Silk"
  },
  {
    id: 5,
    name: "كرينكل سهل",
    image: "/img/5.jpeg",
    category: "Crinkle"
  },
  {
    id: 6,
    name: "كتان طبيعي",
    image: "/img/6.jpeg",
    category: "Linen"
  },
  {
    id: 7,
    name: "قطيفة شتوية",
    image: "/img/7.jpeg",
    category: "Velvet"
  },
  {
    id: 8,
    name: "جرجيت أنيق",
    image: "/img/8.jpeg",
    category: "Georgette"
  }
];

const FabricTypes = () => {
  return (
    <section className="bg-white/50 dark:bg-background-dark/30 py-16 px-6 md:px-20">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="arabic-text text-3xl font-bold mb-12 text-center dark:text-white">تسوق حسب نوع القماش</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {fabricData.map((fabric) => (
            <Link 
              key={fabric.id} 
              to={`/products?category=${fabric.category}`}
              className="group cursor-pointer"
            >
              <div className="aspect-square rounded-2xl bg-beige-card overflow-hidden mb-3">
                <img 
                  alt={fabric.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  src={fabric.image}
                  loading="lazy"
                />
              </div>
              <h3 className="arabic-text text-center font-semibold text-sm group-hover:text-primary transition-colors">
                {fabric.name}
              </h3>
            </Link>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link 
            to="/products" 
            className="arabic-text inline-flex items-center gap-2 text-primary font-bold hover:text-primary-dark transition-colors"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            <span>عرض جميع الفئات</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FabricTypes;