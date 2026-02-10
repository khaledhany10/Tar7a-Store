// src/components/Register.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Register = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    newsletter: true
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = language === 'ar' ? 'الاسم الكامل مطلوب' : 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = language === 'ar' ? 'البريد الإلكتروني مطلوب' : 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = language === 'ar' ? 'بريد إلكتروني غير صالح' : 'Invalid email address';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = language === 'ar' ? 'رقم الهاتف مطلوب' : 'Phone number is required';
    } else if (!/^[\+]?[0-9\s\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = language === 'ar' ? 'رقم هاتف غير صالح' : 'Invalid phone number';
    }
    
    if (!formData.password) {
      newErrors.password = language === 'ar' ? 'كلمة المرور مطلوبة' : 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = language === 'ar' ? 'كلمة المرور يجب أن تكون 8 أحرف على الأقل' : 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = language === 'ar' 
        ? 'كلمة المرور يجب أن تحتوي على حروف كبيرة وصغيرة وأرقام'
        : 'Password must contain uppercase, lowercase letters and numbers';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = language === 'ar' 
        ? 'كلمتا المرور غير متطابقتين'
        : 'Passwords do not match';
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = language === 'ar' 
        ? 'يجب الموافقة على الشروط والأحكام'
        : 'You must agree to the terms and conditions';
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
      console.log('Registration attempt:', formData);
      
      // Store user data
      const userData = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        registeredAt: new Date().toISOString(),
        newsletter: formData.newsletter
      };
      
      localStorage.setItem('tar7a_user', JSON.stringify({
        ...userData,
        loggedIn: true
      }));
      
      // Show success message
      alert(language === 'ar' 
        ? '🎉 تم إنشاء حسابك بنجاح! مرحباً بك في Tar7a Store.' 
        : '🎉 Account created successfully! Welcome to Tar7a Store.'
      );
      
      // Redirect to home
      navigate('/');
      
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({
        submit: language === 'ar' 
          ? 'خطأ في إنشاء الحساب. يرجى المحاولة مرة أخرى.'
          : 'Registration failed. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialRegister = (provider) => {
    // Simulate social registration
    console.log(`Social register with ${provider}`);
    alert(`${provider} registration would be implemented here`);
  };

  const passwordStrength = () => {
    const password = formData.password;
    if (!password) return { score: 0, text: language === 'ar' ? 'ضعيفة' : 'Weak', color: 'red' };
    
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/\d/.test(password)) score += 1;
    if (/[!@#$%^&*]/.test(password)) score += 1;
    
    if (score <= 2) return { score, text: language === 'ar' ? 'ضعيفة' : 'Weak', color: 'red' };
    if (score === 3) return { score, text: language === 'ar' ? 'متوسطة' : 'Medium', color: 'yellow' };
    return { score, text: language === 'ar' ? 'قوية' : 'Strong', color: 'green' };
  };

  const strength = passwordStrength();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/10">
      <div className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-primary/10 to-pink-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-tr from-yellow-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
            {/* Left side - Form */}
            <div className="lg:w-1/2">
              <div className="max-w-lg mx-auto">
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-10">
                  <div className="text-center mb-8">
                    <Link to="/" className="inline-block mb-4">
                      <div className="flex items-center justify-center gap-3">
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
                    
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {language === 'ar' ? 'أنشئ حسابك الآن' : 'Create Your Account'}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      {language === 'ar' 
                        ? 'انضم إلى مجتمعنا الفاخر واستمتع بتجربة تسوق استثنائية'
                        : 'Join our luxury community and enjoy an exceptional shopping experience'
                      }
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Full Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-right">
                        {language === 'ar' ? 'الاسم الكامل' : 'Full Name'} *
                      </label>
                      <div className="relative">
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <span className="material-symbols-outlined">person</span>
                        </div>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 pr-12 border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-300 ${
                            errors.fullName 
                              ? 'border-red-500 dark:border-red-500' 
                              : 'border-gray-300 dark:border-gray-600 dark:bg-gray-700'
                          }`}
                          placeholder={language === 'ar' ? 'أحمد محمد' : 'John Doe'}
                        />
                      </div>
                      {errors.fullName && (
                        <p className="mt-2 text-sm text-red-600 text-right">{errors.fullName}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-right">
                        {language === 'ar' ? 'البريد الإلكتروني' : 'Email Address'} *
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

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-right">
                        {language === 'ar' ? 'رقم الهاتف' : 'Phone Number'} *
                      </label>
                      <div className="relative">
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <span className="material-symbols-outlined">call</span>
                        </div>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 pr-12 border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-300 ${
                            errors.phone 
                              ? 'border-red-500 dark:border-red-500' 
                              : 'border-gray-300 dark:border-gray-600 dark:bg-gray-700'
                          }`}
                          placeholder={language === 'ar' ? '+20 123 456 7890' : '+1 234 567 8900'}
                        />
                      </div>
                      {errors.phone && (
                        <p className="mt-2 text-sm text-red-600 text-right">{errors.phone}</p>
                      )}
                    </div>

                    {/* Password */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-right">
                        {language === 'ar' ? 'كلمة المرور' : 'Password'} *
                      </label>
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
                      
                      {/* Password Strength */}
                      {formData.password && (
                        <div className="mt-2">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-gray-500">
                              {language === 'ar' ? 'قوة كلمة المرور:' : 'Password strength:'}
                            </span>
                            <span className={`text-xs font-medium text-${strength.color}-600`}>
                              {strength.text}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                            <div 
                              className={`h-1.5 rounded-full ${
                                strength.color === 'red' ? 'bg-red-500' :
                                strength.color === 'yellow' ? 'bg-yellow-500' : 'bg-green-500'
                              }`}
                              style={{ width: `${(strength.score / 5) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                      
                      {errors.password && (
                        <p className="mt-2 text-sm text-red-600 text-right">{errors.password}</p>
                      )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-right">
                        {language === 'ar' ? 'تأكيد كلمة المرور' : 'Confirm Password'} *
                      </label>
                      <div className="relative">
                        <div className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <span className="material-symbols-outlined">lock_reset</span>
                        </div>
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 pr-24 border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-300 ${
                            errors.confirmPassword 
                              ? 'border-red-500 dark:border-red-500' 
                              : 'border-gray-300 dark:border-gray-600 dark:bg-gray-700'
                          }`}
                          placeholder={language === 'ar' ? '••••••••' : '••••••••'}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                        >
                          <span className="material-symbols-outlined text-sm">
                            {showConfirmPassword ? 'visibility_off' : 'visibility'}
                          </span>
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="mt-2 text-sm text-red-600 text-right">{errors.confirmPassword}</p>
                      )}
                    </div>

                    {/* Checkboxes */}
                    <div className="space-y-4">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          name="agreeToTerms"
                          checked={formData.agreeToTerms}
                          onChange={handleChange}
                          className="w-4 h-4 text-primary rounded focus:ring-primary mt-1"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {language === 'ar' 
                            ? 'أوافق على '
                            : 'I agree to the '
                          }
                          <Link to="/terms" className="text-primary hover:text-purple-600">
                            {language === 'ar' ? 'الشروط والأحكام' : 'Terms and Conditions'}
                          </Link>
                          {language === 'ar' ? ' و ' : ' and '}
                          <Link to="/privacy" className="text-primary hover:text-purple-600">
                            {language === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
                          </Link>
                          *
                        </span>
                      </label>
                      
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          name="newsletter"
                          checked={formData.newsletter}
                          onChange={handleChange}
                          className="w-4 h-4 text-primary rounded focus:ring-primary mt-1"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {language === 'ar' 
                            ? 'أرغب في تلقي عروض حصرية وأحدث التحديثات عبر البريد الإلكتروني'
                            : 'I want to receive exclusive offers and latest updates via email'
                          }
                        </span>
                      </label>
                    </div>

                    {errors.agreeToTerms && (
                      <p className="text-sm text-red-600 text-right">{errors.agreeToTerms}</p>
                    )}

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
                          {language === 'ar' ? 'جاري إنشاء الحساب...' : 'Creating account...'}
                        </>
                      ) : (
                        <>
                          <span className="material-symbols-outlined">person_add</span>
                          {language === 'ar' ? 'إنشاء حساب' : 'Create Account'}
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
                          {language === 'ar' ? 'أو سجل باستخدام' : 'Or sign up with'}
                        </span>
                      </div>
                    </div>

                    {/* Social Register */}
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => handleSocialRegister('Google')}
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
                        onClick={() => handleSocialRegister('Facebook')}
                        className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"/>
                        </svg>
                        <span className="text-sm font-medium">Facebook</span>
                      </button>
                    </div>

                    {/* Login Link */}
                    <div className="text-center pt-4">
                      <p className="text-gray-600 dark:text-gray-400">
                        {language === 'ar' ? 'هل لديك حساب بالفعل؟' : 'Already have an account?'}
                        <Link 
                          to="/login" 
                          className="text-primary font-semibold hover:text-purple-600 transition-colors mr-1"
                        >
                          {language === 'ar' ? ' سجل الدخول' : ' Sign in'}
                        </Link>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Right side - Benefits */}
            <div className="lg:w-1/2 text-center lg:text-left">
              <div className="max-w-lg mx-auto lg:mx-0">
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  <span className="block">
                    {language === 'ar' ? 'انضم إلى' : 'Join'}
                  </span>
                  <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                    {language === 'ar' ? 'مجتمعنا الفاخر' : 'Our Luxury Community'}
                  </span>
                </h2>
                
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                  {language === 'ar' 
                    ? 'استمتع بمزايا حصرية عندما تنضم إلى Tar7a Store'
                    : 'Enjoy exclusive benefits when you join Tar7a Store'
                  }
                </p>
                
                {/* Benefits */}
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-primary text-2xl">
                        discount
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                        {language === 'ar' ? 'خصومات حصرية' : 'Exclusive Discounts'}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        {language === 'ar' 
                          ? 'احصل على عروض خاصة وتخفيضات لأعضاء مجتمعنا فقط'
                          : 'Get special offers and discounts for community members only'
                        }
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-500/5 flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-purple-600 dark:text-purple-400 text-2xl">
                        local_shipping
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                        {language === 'ar' ? 'شحن مجاني' : 'Free Shipping'}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        {language === 'ar' 
                          ? 'شحن مجاني على جميع الطلبات فوق 500 جنيه'
                          : 'Free shipping on all orders above 500 EGP'
                        }
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/10 to-pink-500/5 flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-pink-600 dark:text-pink-400 text-2xl">
                        priority
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                        {language === 'ar' ? 'معالجة سريعة' : 'Priority Processing'}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        {language === 'ar' 
                          ? 'طلباتك تعالج بشكل أسرع من العملاء العاديين'
                          : 'Your orders are processed faster than regular customers'
                        }
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/10 to-green-500/5 flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-2xl">
                        star
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                        {language === 'ar' ? 'برنامج الولاء' : 'Loyalty Program'}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        {language === 'ar' 
                          ? 'اكسب نقاطاً مع كل عملية شراء واستبدلها بمكافآت قيمة'
                          : 'Earn points with every purchase and redeem for valuable rewards'
                        }
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Security Badge */}
                <div className="mt-10 p-6 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl">
                  <div className="flex items-center justify-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-3xl">
                        shield
                      </span>
                    </div>
                    <div className="text-right">
                      <h4 className="font-bold text-gray-900 dark:text-white">
                        {language === 'ar' ? 'آمن 100%' : '100% Secure'}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {language === 'ar' 
                          ? 'بياناتك محمية باستخدام أحدث تقنيات التشفير'
                          : 'Your data is protected with latest encryption technologies'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;