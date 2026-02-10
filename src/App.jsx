// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Achievements from './components/Achievements';
import AllProducts from './components/AllProducts';
import AboutUs from './components/AboutUs';
import ProductDetail from './components/ProductDetail';
import CustomizeOrder from './components/CustomizeOrder';
import OrderForm from './components/OrderForm';
import Admin from './components/Admin';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import AdminGuard from './components/Admin';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen bg-background-light dark:bg-background-dark transition-colors duration-300">
          <Header />
          
          <main className="min-h-screen">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/products" element={<AllProducts />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/AboutUs" element={<AboutUs />} />
              <Route path="/customize-order" element={<CustomizeOrder />} />
              <Route path="/order-form" element={<OrderForm />} />
              
              {/* Authentication Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Protected Routes */}
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              
              {/* Admin Route with Guard */}
              <Route path="/admin" element={
                <ProtectedRoute requireAdmin={true}>
                  <AdminGuard>
                    <Admin />
                  </AdminGuard>
                </ProtectedRoute>
              } />
              
              {/* Fallback Route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;