import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Achievements from './components/Achievements';
import AllProducts from './components/AllProducts';
import Contact from './components/Contact';
import ProductDetail from './components/ProductDetail';
import CustomizeOrder from './components/CustomizeOrder'; // أضف هذا الاستيراد
import OrderForm from './components/OrderForm';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen bg-background-light dark:bg-background-dark transition-colors duration-300">
          <Header />
          
          <main className="min-h-screen">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/products" element={<AllProducts />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/customize-order" element={<CustomizeOrder />} /> {/* أضف هذا المسار */}
              <Route path="/order-form" element={<OrderForm />} />
              {/* يمكنك إضافة مسارات أخرى هنا */}
            </Routes>
          </main>
          
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;