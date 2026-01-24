import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import FabricTypes from './components/FabricTypes';
import NewArrivals from './components/NewArrivals';
import Experience from './components/Experience';
import Testimonials from './components/Testimonials';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import AllProducts from './components/AllProducts';
import ProductDetail from './components/ProductDetail';
import ImageGallery from './components/ImageGallery';
import Achievements from './components/Achievements';
import Contact from './components/Contact';

function HomePage() {
  return (
    <>
      <Hero />
      <FabricTypes />
      <NewArrivals />
      <ImageGallery />
      <Experience />
      <Testimonials />
      <Newsletter />
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="layout-container flex h-full grow flex-col bg-background-light dark:bg-background-dark text-[#2d1a1e] transition-colors duration-300 min-h-screen">
        <Header />
        <main className="flex flex-1 flex-col">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<AllProducts />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;