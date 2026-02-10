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
    
    // Clear error for this field
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In real app, you would make an API call here
      console.log('Login attempt:', formData);
      
      // Store login state
      localStorage.setItem('tar7a_user', JSON.stringify({
        email: formData.email,
        loggedIn: true,
        timestamp: new Date().toISOString()
      }));
      
      // Show success message
      alert(language === 'ar' ? 'تم تسجيل الدخول بنجاح!' : 'Login successful!');
      
      // Redirect to home or previous page
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
    // Simulate social login
    console.log(`Social login with ${provider}`);
    alert(`${provider} login would be implemented here`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/10">
      <div className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-pink-500/10 to-yellow-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
            {/* Left side - Branding */}
            <div className="lg:w-1/2 text-center lg:text-right">
              <div className="max-w-lg mx-auto lg:mx-0 lg:ml-auto">
                <Link to="/" className="inline-block mb-8">
                  <div className="flex items-center justify-center lg:justify-end gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                      <span className="material-symbols-outlined text-white text-2xl">
                        diamond
                      </span>
                    </div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                      Tar7a Store
                    </h1>
                  </div>
                </Link>
                
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  <span className="block">
                    {language === 'ar' ? 'مرحباً بعودتك!' : 'Welcome Back!'}
                  </span>
                  <span className="text-primary">
                    {language === 'ar' ? 'للعالم الإسلامي الفاخر' : 'To Luxury Islamic World'}
                  </span>
                </h2>
                
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                  {language === 'ar' 
                    ? 'تسوق أحدث تشكيلات الطرح الجديدة'
                    : 'Shop the latest collection of luxurious Islamic ornaments and spiritual jewelry'
                  }
                </p>
                
                {/* Features */}
                <div className="space-y-4">
                  <div className="flex items-center justify-center lg:justify-end gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <span className="material-symbols-outlined text-green-600 dark:text-green-400">
                        verified
                      </span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">
                      {language === 'ar' ? 'جودة فاخرة مضمونة' : 'Premium Quality Guaranteed'}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-center lg:justify-end gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">
                        local_shipping
                      </span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">
                      {language === 'ar' ? 'شحن سريع وآمن' : 'Fast & Secure Shipping'}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-center lg:justify-end gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                      <span className="material-symbols-outlined text-purple-600 dark:text-purple-400">
                        support_agent
                      </span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">
                      {language === 'ar' ? 'دعم فني 24/7' : '24/7 Customer Support'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Login Form */}
            <div className="lg:w-1/2">
              <div className="max-w-md mx-auto">
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-10">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {language === 'ar' ? 'تسجيل الدخول' : 'Sign In'}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {language === 'ar' 
                        ? 'أدخل بياناتك للوصول إلى حسابك'
                        : 'Enter your details to access your account'
                      }
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-right">
                        {language === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
                      </label>
                      <div className="relative">
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <span className="material-symbols-outlined">mail</span>
                        </div>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 pr-12 border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-300 ${
                            errors.email 
                              ? 'border-red-500 dark:border-red-500' 
                              : 'border-gray-300 dark:border-gray-600 dark:bg-gray-700'
                          }`}
                          placeholder={language === 'ar' ? 'example@email.com' : 'you@example.com'}
                        />
                      </div>
                      {errors.email && (
                        <p className="mt-2 text-sm text-red-600 text-right">{errors.email}</p>
                      )}
                    </div>

                    {/* Password */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-right">
                          {language === 'ar' ? 'كلمة المرور' : 'Password'}
                        </label>
                        <Link 
                          to="/forgot-password" 
                          className="text-sm text-primary hover:text-purple-600 transition-colors"
                        >
                          {language === 'ar' ? 'نسيت كلمة المرور؟' : 'Forgot password?'}
                        </Link>
                      </div>
                      <div className="relative">
                        <div className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <span className="material-symbols-outlined">lock</span>
                        </div>
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 pr-24 border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-300 ${
                            errors.password 
                              ? 'border-red-500 dark:border-red-500' 
                              : 'border-gray-300 dark:border-gray-600 dark:bg-gray-700'
                          }`}
                          placeholder={language === 'ar' ? '••••••••' : '••••••••'}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                        >
                          <span className="material-symbols-outlined text-sm">
                            {showPassword ? 'visibility_off' : 'visibility'}
                          </span>
                        </button>
                      </div>
                      {errors.password && (
                        <p className="mt-2 text-sm text-red-600 text-right">{errors.password}</p>
                      )}
                    </div>

                    {/* Remember Me & Submit */}
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          name="rememberMe"
                          checked={formData.rememberMe}
                          onChange={handleChange}
                          className="w-4 h-4 text-primary rounded focus:ring-primary"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {language === 'ar' ? 'تذكرني' : 'Remember me'}
                        </span>
                      </label>
                    </div>

                    {errors.submit && (
                      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
                        <p className="text-red-600 dark:text-red-400 text-sm text-center">
                          {errors.submit}
                        </p>
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-primary to-purple-600 text-white py-3.5 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          {language === 'ar' ? 'جاري تسجيل الدخول...' : 'Signing in...'}
                        </>
                      ) : (
                        <>
                          <span className="material-symbols-outlined">login</span>
                          {language === 'ar' ? 'تسجيل الدخول' : 'Sign In'}
                        </>
                      )}
                    </button>

                    {/* Divider */}
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white dark:bg-gray-800 text-gray-500">
                          {language === 'ar' ? 'أو سجل الدخول باستخدام' : 'Or continue with'}
                        </span>
                      </div>
                    </div>

                    {/* Social Login */}
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => handleSocialLogin('Google')}
                        className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        <span className="text-sm font-medium">Google</span>
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => handleSocialLogin('Facebook')}
                        className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"/>
                        </svg>
                        <span className="text-sm font-medium">Facebook</span>
                      </button>
                    </div>

                    {/* Register Link */}
                    <div className="text-center pt-4">
                      <p className="text-gray-600 dark:text-gray-400">
                        {language === 'ar' ? 'ليس لديك حساب؟' : "Don't have an account?"}
                        <Link 
                          to="/register" 
                          className="text-primary font-semibold hover:text-purple-600 transition-colors mr-1"
                        >
                          {language === 'ar' ? ' سجل الآن' : ' Sign up now'}
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
  );
};

export default Login;