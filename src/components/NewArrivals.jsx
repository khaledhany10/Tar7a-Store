import React from 'react';
import { Link } from 'react-router-dom';

const products = [
  {
    id: 1,
    name: "شيفون كوارتز وردي",
    price: "٢٨٠ ج.م",
    description: "خفيف الوزن • جيد التهوية • شبه شفاف",
    image: "/img/1.jpeg",
    tag: "جديد",
    bgColor: "bg-[#f3e9e5]",
    colors: ["#e5d5d5", "#f4e7d3", "#d9e2e5"]
  },
  {
    id: 2,
    name: "جيرسي شوفان متميز",
    price: "٣٢٠ ج.م",
    description: "مرن • قابل للتنفس • غير قابل للانزلاق",
    image: "/img/2.jpeg",
    bgColor: "bg-[#e9e4e0]",
    colors: ["#d4c8be", "#5c5450"]
  },
  {
    id: 3,
    name: "مودال رمادي أردوازي",
    price: "٣٥٠ ج.م",
    description: "صديق للبيئة • ناعم • يتدلى بشكل جميل",
    image: "/img/3.jpeg",
    bgColor: "bg-[#f0f0f0]",
    colors: ["#7d8285", "#2d1a1e"]
  },
  {
    id: 4,
    name: "وشاح حرير وردي",
    price: "٤٥٠ ج.م",
    originalPrice: "٦٥٠ ج.م",
    description: "١٠٠٪ حرير نقي • بريق أنيق",
    image: "/img/4.jpeg",
    tag: "خصم",
    bgColor: "bg-[#fdf2f2]",
    colors: ["#f9dbdb"]
  }
];

const NewArrivals = () => {
  return (
    <section className="px-6 md:px-20 py-24">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="arabic-text text-3xl md:text-5xl font-bold tracking-tight mb-4">الوصلات الجديدة</h2>
            <p className="arabic-text text-[#2d1a1e]/60 dark:text-gray-400">تصاميم حديثة وصلت حديثًا لخزانتك.</p>
          </div>
          <Link 
            to="/products" 
            className="arabic-text text-primary font-bold border-b-2 border-primary pb-1 hover:text-primary-dark hover:border-primary-dark transition-all"
          >
            عرض جميع الوصلات
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {products.map((product) => (
            <div key={product.id} className="group flex flex-col gap-4">
              <div className={`relative aspect-[4/5] rounded-[2rem] overflow-hidden ${product.bgColor} group-hover:shadow-xl transition-all duration-500`}>
                <Link to={`/product/${product.id}`}>
                  <img 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    src={product.image}
                    loading="lazy"
                  />
                </Link>
                {product.tag && (
                  <div className={`arabic-text absolute top-4 right-4 ${product.tag === 'خصم' ? 'bg-primary text-white' : 'bg-white/90 backdrop-blur'} px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider`}>
                    {product.tag}
                  </div>
                )}
                <button className="absolute bottom-6 left-6 w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-lg translate-y-20 group-hover:translate-y-0 transition-all duration-300 opacity-0 group-hover:opacity-100">
                  <span className="material-symbols-outlined">add_shopping_cart</span>
                </button>
              </div>
              
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-start">
                  <Link to={`/product/${product.id}`} className="arabic-text font-bold text-lg hover:text-primary transition-colors">
                    {product.name}
                  </Link>
                  <div className="text-left">
                    {product.originalPrice && (
                      <span className="arabic-text text-sm line-through text-gray-400 ml-2">{product.originalPrice}</span>
                    )}
                    <span className="arabic-text font-bold text-primary">{product.price}</span>
                  </div>
                </div>
                <p className="arabic-text text-sm text-[#2d1a1e]/50 dark:text-gray-400">{product.description}</p>
                <div className="flex gap-2 mt-2">
                  {product.colors.map((color, index) => (
                    <div 
                      key={index} 
                      className="w-4 h-4 rounded-full border border-gray-200" 
                      style={{backgroundColor: color}}
                      title={`لون ${index + 1}`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;