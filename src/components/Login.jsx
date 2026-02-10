// src/components/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Login = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = language === 'ar' ? 'البريد الإلكتروني مطلوب' : 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = language === 'ar' ? 'بريد إلكتروني غير صالح' : 'Invalid email address';
    }
    
    if (!formData.password) {
      newErrors.password = language === 'ar' ? 'كلمة المرور مطلوبة' : 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = language === 'ar' ? 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' : 'Password must be at least 6 characters';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      localStorage.setItem('tar7a_user', JSON.stringify({
        email: formData.email,
        loggedIn: true,
        timestamp: new Date().toISOString()
      }));
      
      // Use toast notification instead of alert
      const event = new CustomEvent('show-toast', {
        detail: {
          message: language === 'ar' ? 'تم تسجيل الدخول بنجاح!' : 'Login successful!',
          type: 'success'
        }
      });
      window.dispatchEvent(event);
      
      navigate('/');
      
    } catch (error) {
      console.error('Login error:', error);
      setErrors({
        submit: language === 'ar' 
          ? 'خطأ في تسجيل الدخول. تحقق من بياناتك وحاول مرة أخرى.'
          : 'Login failed. Please check your credentials and try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Social login with ${provider}`);
    const event = new CustomEvent('show-toast', {
      detail: {
        message: `${provider} login would be implemented here`,
        type: 'info'
      }
    });
    window.dispatchEvent(event);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary/5 dark:from-gray-900 dark:via-gray-800 dark:to-primary/10">
      <div className="relative overflow-hidden">
        {/* Enhanced Background */}
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-yellow-500/10 via-orange-500/10 to-red-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/3 left-1/4 w-12 h-12 rounded-full bg-primary/30 animate-bounce"></div>
          <div className="absolute bottom-1/4 right-1/4 w-8 h-8 rounded-full bg-purple-500/30 animate-bounce delay-300"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
            {/* Left side - Enhanced Branding */}
            <div className="lg:w-1/2 text-center lg:text-right">
              <div className="max-w-lg mx-auto lg:mx-0 lg:ml-auto">
                <Link to="/" className="inline-block mb-10 group">
                  <div className="flex items-center justify-center lg:justify-end gap-4">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-110">
                        <span className="material-symbols-outlined text-white text-3xl">
                          diamond
                        </span>
                      </div>
                      <div className="absolute -inset-2 bg-gradient-to-r from-primary/30 to-purple-600/30 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    <div>
                      <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-purple-600 to-pink-500 bg-clip-text text-transparent animate-gradient">
                        Tar7a Store
                      </h1>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {language === 'ar' ? 'فاخر • إسلامي • راقي' : 'Luxury • Islamic • Elegant'}
                      </p>
                    </div>
                  </div>
                </Link>
                
                <div className="mb-10">
                  <h2 className="text-5xl lg:text-6xl font-black text-gray-900 dark:text-white mb-6 leading-tight">
                    <span className="block">
                      {language === 'ar' ? 'مرحباً بعودتك!' : 'Welcome Back!'}
                    </span>
                    <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                      {language === 'ar' ? 'إلى عالمنا الفاخر' : 'To Our Luxury World'}
                    </span>
                  </h2>
                  
                  <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                    {language === 'ar' 
                      ? 'استمتع بتجربة تسوق استثنائية لأرقى تشكيلات الطرحة الإسلامية والعقود الروحانية'
                      : 'Experience exceptional shopping for the finest Islamic veils and spiritual necklaces'
                    }
                  </p>
                </div>
                
                {/* Enhanced Features */}
                <div className="space-y-6">
                  <div className="flex items-center justify-center lg:justify-end gap-4 p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/20 hover:shadow-lg transition-all duration-300">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                        <span className="material-symbols-outlined text-white text-xl">
                          verified
                        </span>
                      </div>
                      <div className="absolute -inset-1 bg-gradient-to-br from-green-500/20 to-emerald-600/20 rounded-xl blur-sm"></div>
                    </div>
                    <div className="text-right flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {language === 'ar' ? 'جودة فاخرة مضمونة' : 'Premium Quality Guaranteed'}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {language === 'ar' ? 'ضمان الجودة لمدة 3 سنوات' : '3-year quality guarantee'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center lg:justify-end gap-4 p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/20 hover:shadow-lg transition-all duration-300">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg">
                        <span className="material-symbols-outlined text-white text-xl">
                          local_shipping
                        </span>
                      </div>
                      <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/20 to-cyan-600/20 rounded-xl blur-sm"></div>
                    </div>
                    <div className="text-right flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {language === 'ar' ? 'شحن سريع وآمن' : 'Fast & Secure Shipping'}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {language === 'ar' ? 'توصيل خلال 2-5 أيام عمل' : 'Delivery in 2-5 working days'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center lg:justify-end gap-4 p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/20 hover:shadow-lg transition-all duration-300">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg">
                        <span className="material-symbols-outlined text-white text-xl">
                          support_agent
                        </span>
                      </div>
                      <div className="absolute -inset-1 bg-gradient-to-br from-purple-500/20 to-pink-600/20 rounded-xl blur-sm"></div>
                    </div>
                    <div className="text-right flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {language === 'ar' ? 'دعم فني 24/7' : '24/7 Customer Support'}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {language === 'ar' ? 'متاح على مدار الساعة' : 'Available around the clock'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Enhanced Login Form */}
            <div className="lg:w-1/2">
              <div className="max-w-md mx-auto">
                <div className="relative group">
                  {/* Form glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 via-purple-500/30 to-pink-500/30 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition-all duration-500"></div>
                  
                  <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-10 overflow-hidden border border-white/20 dark:border-gray-700/20">
                    {/* Form header with gradient */}
                    <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary via-purple-500 to-pink-500"></div>
                    
                    <div className="text-center mb-10">
                      <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 mb-6">
                        <span className="material-symbols-outlined text-primary text-3xl">
                          login
                        </span>
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                        {language === 'ar' ? 'تسجيل الدخول' : 'Sign In'}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {language === 'ar' 
                          ? 'أدخل بياناتك للوصول إلى حسابك الشخصي'
                          : 'Enter your details to access your personal account'
                        }
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-7">
                      {/* Email Field */}
                      <div className="group">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 text-right">
                          {language === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
                        </label>
                        <div className="relative">
                          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
                            <span className="material-symbols-outlined">mail</span>
                          </div>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full px-5 py-4 pr-12 border-2 rounded-2xl focus:ring-4 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-300 text-right ${
                              errors.email 
                                ? 'border-red-500 dark:border-red-500 bg-red-50 dark:bg-red-900/20' 
                                : 'border-gray-300 dark:border-gray-600 dark:bg-gray-700/50 hover:border-primary/50'
                            }`}
                            placeholder={language === 'ar' ? 'example@email.com' : 'you@example.com'}
                          />
                        </div>
                        {errors.email && (
                          <p className="mt-2 text-sm text-red-600 text-right animate-fadeIn">{errors.email}</p>
                        )}
                      </div>

                      {/* Password Field */}
                      <div className="group">
                        <div className="flex justify-between items-center mb-3">
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 text-right">
                            {language === 'ar' ? 'كلمة المرور' : 'Password'}
                          </label>
                          <Link 
                            to="/forgot-password" 
                            className="text-sm text-primary hover:text-purple-600 transition-colors hover:underline"
                          >
                            {language === 'ar' ? 'نسيت كلمة المرور؟' : 'Forgot password?'}
                          </Link>
                        </div>
                        <div className="relative">
                          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
                            <span className="material-symbols-outlined">lock</span>
                          </div>
                          <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`w-full px-5 py-4 pr-24 border-2 rounded-2xl focus:ring-4 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-300 text-right ${
                              errors.password 
                                ? 'border-red-500 dark:border-red-500 bg-red-50 dark:bg-red-900/20' 
                                : 'border-gray-300 dark:border-gray-600 dark:bg-gray-700/50 hover:border-primary/50'
                            }`}
                            placeholder={language === 'ar' ? '••••••••' : '••••••••'}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors"
                          >
                            <span className="material-symbols-outlined text-xl">
                              {showPassword ? 'visibility_off' : 'visibility'}
                            </span>
                          </button>
                        </div>
                        {errors.password && (
                          <p className="mt-2 text-sm text-red-600 text-right animate-fadeIn">{errors.password}</p>
                        )}
                      </div>

                      {/* Remember Me */}
                      <div className="flex items-center justify-between">
                        <label className="flex items-center gap-3 cursor-pointer group">
                          <div className="relative">
                            <input
                              type="checkbox"
                              name="rememberMe"
                              checked={formData.rememberMe}
                              onChange={handleChange}
                              className="peer sr-only"
                            />
                            <div className="w-5 h-5 rounded border-2 border-gray-300 dark:border-gray-600 peer-checked:border-primary peer-checked:bg-primary transition-all duration-200 flex items-center justify-center">
                              {formData.rememberMe && (
                                <span className="material-symbols-outlined text-white text-sm">check</span>
                              )}
                            </div>
                          </div>
                          <span className="text-sm text-gray-700 dark:text-gray-300 select-none group-hover:text-primary transition-colors">
                            {language === 'ar' ? 'تذكرني على هذا الجهاز' : 'Remember me on this device'}
                          </span>
                        </label>
                      </div>

                      {errors.submit && (
                        <div className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/10 border border-red-200 dark:border-red-800 rounded-2xl p-4 animate-fadeIn">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
                              <span className="material-symbols-outlined text-red-600 dark:text-red-400 text-sm">
                                error
                              </span>
                            </div>
                            <p className="text-red-600 dark:text-red-400 text-sm flex-1 text-right">
                              {errors.submit}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full group relative bg-gradient-to-r from-primary to-purple-600 text-white py-4 rounded-2xl font-semibold hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/10 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                        <div className="relative flex items-center justify-center gap-3">
                          {isLoading ? (
                            <>
                              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                              {language === 'ar' ? 'جاري تسجيل الدخول...' : 'Signing in...'}
                            </>
                          ) : (
                            <>
                              <span className="material-symbols-outlined text-xl">arrow_forward</span>
                              {language === 'ar' ? 'تسجيل الدخول' : 'Sign In'}
                            </>
                          )}
                        </div>
                      </button>

                      {/* Divider */}
                      <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
                        </div>
                      </div>

                      {/* Register Link */}
                      <div className="text-center pt-6">
                        <p className="text-gray-600 dark:text-gray-400">
                          {language === 'ar' ? 'ليس لديك حساب؟' : "Don't have an account?"}
                          <Link 
                            to="/register" 
                            className="group relative text-primary font-semibold hover:text-purple-600 transition-colors mr-1 inline-flex items-center gap-1"
                          >
                            {language === 'ar' ? ' سجل الآن' : ' Sign up now'}
                            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                              arrow_forward
                            </span>
                          </Link>
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
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
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default Login;