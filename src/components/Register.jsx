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
      await new Promise(resolve => setTimeout(resolve, 1500));
      
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
      
      const event = new CustomEvent('show-toast', {
        detail: {
          message: language === 'ar' 
            ? '🎉 تم إنشاء حسابك بنجاح! مرحباً بك في Tar7a Store.' 
            : '🎉 Account created successfully! Welcome to Tar7a Store.',
          type: 'success'
        }
      });
      window.dispatchEvent(event);
      
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
    console.log(`Social register with ${provider}`);
    const event = new CustomEvent('show-toast', {
      detail: {
        message: `${provider} registration would be implemented here`,
        type: 'info'
      }
    });
    window.dispatchEvent(event);
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
    
    if (score <= 2) return { score, text: language === 'ar' ? 'ضعيفة' : 'Weak', color: 'red-500' };
    if (score === 3) return { score, text: language === 'ar' ? 'متوسطة' : 'Medium', color: 'yellow-500' };
    return { score, text: language === 'ar' ? 'قوية' : 'Strong', color: 'green-500' };
  };

  const strength = passwordStrength();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-primary/5 dark:from-gray-900 dark:via-gray-800 dark:to-primary/10">
      <div className="relative overflow-hidden">
        {/* Enhanced Background */}
        <div className="absolute inset-0">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-primary/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-tr from-yellow-500/10 via-orange-500/10 to-red-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/3 right-1/4 w-12 h-12 rounded-full bg-purple-500/30 animate-bounce"></div>
          <div className="absolute bottom-1/3 left-1/4 w-8 h-8 rounded-full bg-primary/30 animate-bounce delay-300"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
            {/* Left side - Enhanced Benefits */}
            <div className="lg:w-1/2 text-center lg:text-left">
              <div className="max-w-lg mx-auto lg:mx-0">
                <div className="mb-10">
                  <h2 className="text-5xl lg:text-6xl font-black text-gray-900 dark:text-white mb-6 leading-tight">
                    <span className="block">
                      {language === 'ar' ? 'انضم إلى' : 'Join'}
                    </span>
                    <span className="bg-gradient-to-r from-primary via-purple-600 to-pink-500 bg-clip-text text-transparent animate-gradient">
                      {language === 'ar' ? 'مجتمعنا الفاخر' : 'Our Luxury Community'}
                    </span>
                  </h2>
                  
                  <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                    {language === 'ar' 
                      ? 'استمتع بتجربة تسوق استثنائية واحصل على مميزات حصرية لأعضاء مجتمعنا فقط'
                      : 'Enjoy an exceptional shopping experience and get exclusive benefits for community members only'
                    }
                  </p>
                </div>
                
                {/* Enhanced Benefits */}
                <div className="space-y-6">
                  <div className="group flex items-start gap-5 p-5 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/20 hover:shadow-xl transition-all duration-300">
                    <div className="relative flex-shrink-0">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <span className="material-symbols-outlined text-white text-2xl">
                          discount
                        </span>
                      </div>
                      <div className="absolute -inset-1 bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="text-right flex-1">
                      <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                        {language === 'ar' ? 'خصومات حصرية' : 'Exclusive Discounts'}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        {language === 'ar' 
                          ? 'عروض خاصة وتخفيضات تصل إلى 40% لأعضاء مجتمعنا فقط'
                          : 'Special offers and discounts up to 40% for community members only'
                        }
                      </p>
                    </div>
                  </div>
                  
                  <div className="group flex items-start gap-5 p-5 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/20 hover:shadow-xl transition-all duration-300">
                    <div className="relative flex-shrink-0">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <span className="material-symbols-outlined text-white text-2xl">
                          local_shipping
                        </span>
                      </div>
                      <div className="absolute -inset-1 bg-gradient-to-br from-purple-500/20 to-pink-600/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="text-right flex-1">
                      <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 transition-colors">
                        {language === 'ar' ? 'شحن مجاني' : 'Free Shipping'}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        {language === 'ar' 
                          ? 'شحن مجاني على جميع الطلبات فوق 500 جنيه مصري'
                          : 'Free shipping on all orders above 500 EGP'
                        }
                      </p>
                    </div>
                  </div>
                  
                  <div className="group flex items-start gap-5 p-5 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/20 hover:shadow-xl transition-all duration-300">
                    <div className="relative flex-shrink-0">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <span className="material-symbols-outlined text-white text-2xl">
                          priority
                        </span>
                      </div>
                      <div className="absolute -inset-1 bg-gradient-to-br from-pink-500/20 to-rose-600/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="text-right flex-1">
                      <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-2 group-hover:text-pink-600 transition-colors">
                        {language === 'ar' ? 'معالجة سريعة' : 'Priority Processing'}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        {language === 'ar' 
                          ? 'طلباتك تعالج بشكل أسرع مع دعم متميز'
                          : 'Your orders are processed faster with premium support'
                        }
                      </p>
                    </div>
                  </div>
                  
                  <div className="group flex items-start gap-5 p-5 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/20 hover:shadow-xl transition-all duration-300">
                    <div className="relative flex-shrink-0">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <span className="material-symbols-outlined text-white text-2xl">
                          star
                        </span>
                      </div>
                      <div className="absolute -inset-1 bg-gradient-to-br from-green-500/20 to-emerald-600/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="text-right flex-1">
                      <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-2 group-hover:text-green-600 transition-colors">
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
                
                {/* Enhanced Security Badge */}
                <div className="mt-10 relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-teal-500/10 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-green-200 dark:border-green-800/50">
                    <div className="flex items-center justify-center lg:justify-start gap-5">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                          <span className="material-symbols-outlined text-white text-3xl">
                            shield
                          </span>
                        </div>
                        <div className="absolute -inset-2 bg-gradient-to-br from-green-500/20 to-emerald-600/20 rounded-full blur-md"></div>
                      </div>
                      <div className="text-right">
                        <h4 className="font-bold text-xl text-gray-900 dark:text-white">
                          {language === 'ar' ? 'آمن 100%' : '100% Secure'}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          {language === 'ar' 
                            ? 'بياناتك محمية باستخدام أحدث تقنيات التشفير المتقدمة'
                            : 'Your data is protected with latest advanced encryption technologies'
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Enhanced Form */}
            <div className="lg:w-1/2">
              <div className="max-w-md mx-auto">
                <div className="relative group">
                  {/* Form glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 via-purple-500/30 to-pink-500/30 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition-all duration-500"></div>
                  
                  <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-10 overflow-hidden border border-white/20 dark:border-gray-700/20">
                    {/* Form header with gradient */}
                    <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary via-purple-500 to-pink-500"></div>
                    
                    <div className="text-center mb-10">
                      <Link to="/" className="inline-block mb-6 group">
                        <div className="flex items-center justify-center gap-3">
                          <div className="relative">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-500 group-hover:scale-110">
                              <span className="material-symbols-outlined text-white text-2xl">
                                diamond
                              </span>
                            </div>
                            <div className="absolute -inset-2 bg-gradient-to-r from-primary/30 to-purple-600/30 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          </div>
                          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-purple-600 to-pink-500 bg-clip-text text-transparent animate-gradient">
                            Tar7a Store
                          </h1>
                        </div>
                      </Link>
                      
                      <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 mb-6">
                        <span className="material-symbols-outlined text-primary text-3xl">
                          person_add
                        </span>
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                        {language === 'ar' ? 'أنشئ حسابك الآن' : 'Create Your Account'}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400">
                        {language === 'ar' 
                          ? 'سجل الآن وابدأ رحلة التسوق الاستثنائية'
                          : 'Register now and start your exceptional shopping journey'
                        }
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-7">
                      {/* Full Name */}
                      <div className="group">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 text-right">
                          {language === 'ar' ? 'الاسم الكامل' : 'Full Name'} *
                        </label>
                        <div className="relative">
                          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
                            <span className="material-symbols-outlined">person</span>
                          </div>
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            className={`w-full px-5 py-4 pr-12 border-2 rounded-2xl focus:ring-4 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-300 text-right ${
                              errors.fullName 
                                ? 'border-red-500 dark:border-red-500 bg-red-50 dark:bg-red-900/20' 
                                : 'border-gray-300 dark:border-gray-600 dark:bg-gray-700/50 hover:border-primary/50'
                            }`}
                            placeholder={language === 'ar' ? 'أحمد محمد' : 'John Doe'}
                          />
                        </div>
                        {errors.fullName && (
                          <p className="mt-2 text-sm text-red-600 text-right animate-fadeIn">{errors.fullName}</p>
                        )}
                      </div>

                      {/* Email */}
                      <div className="group">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 text-right">
                          {language === 'ar' ? 'البريد الإلكتروني' : 'Email Address'} *
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

                      {/* Phone */}
                      <div className="group">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 text-right">
                          {language === 'ar' ? 'رقم الهاتف' : 'Phone Number'} *
                        </label>
                        <div className="relative">
                          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
                            <span className="material-symbols-outlined">call</span>
                          </div>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={`w-full px-5 py-4 pr-12 border-2 rounded-2xl focus:ring-4 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-300 text-right ${
                              errors.phone 
                                ? 'border-red-500 dark:border-red-500 bg-red-50 dark:bg-red-900/20' 
                                : 'border-gray-300 dark:border-gray-600 dark:bg-gray-700/50 hover:border-primary/50'
                            }`}
                            placeholder={language === 'ar' ? '+20 123 456 7890' : '+1 234 567 8900'}
                          />
                        </div>
                        {errors.phone && (
                          <p className="mt-2 text-sm text-red-600 text-right animate-fadeIn">{errors.phone}</p>
                        )}
                      </div>

                      {/* Password */}
                      <div className="group">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 text-right">
                          {language === 'ar' ? 'كلمة المرور' : 'Password'} *
                        </label>
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
                        
                        {/* Password Strength - Enhanced */}
                        {formData.password && (
                          <div className="mt-3 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-medium text-gray-500">
                                {language === 'ar' ? 'قوة كلمة المرور:' : 'Password strength:'}
                              </span>
                              <span className={`text-xs font-bold text-${strength.color}`}>
                                {strength.text}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full bg-${strength.color} transition-all duration-500`}
                                style={{ width: `${(strength.score / 5) * 100}%` }}
                              ></div>
                            </div>
                            <div className="grid grid-cols-4 gap-2">
                              {[1, 2, 3, 4].map((i) => (
                                <div 
                                  key={i}
                                  className={`h-1 rounded-full ${
                                    i <= strength.score ? `bg-${strength.color}` : 'bg-gray-300 dark:bg-gray-600'
                                  }`}
                                ></div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {errors.password && (
                          <p className="mt-2 text-sm text-red-600 text-right animate-fadeIn">{errors.password}</p>
                        )}
                      </div>

                      {/* Confirm Password */}
                      <div className="group">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 text-right">
                          {language === 'ar' ? 'تأكيد كلمة المرور' : 'Confirm Password'} *
                        </label>
                        <div className="relative">
                          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
                            <span className="material-symbols-outlined">lock_reset</span>
                          </div>
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={`w-full px-5 py-4 pr-24 border-2 rounded-2xl focus:ring-4 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-300 text-right ${
                              errors.confirmPassword 
                                ? 'border-red-500 dark:border-red-500 bg-red-50 dark:bg-red-900/20' 
                                : 'border-gray-300 dark:border-gray-600 dark:bg-gray-700/50 hover:border-primary/50'
                            }`}
                            placeholder={language === 'ar' ? '••••••••' : '••••••••'}
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors"
                          >
                            <span className="material-symbols-outlined text-xl">
                              {showConfirmPassword ? 'visibility_off' : 'visibility'}
                            </span>
                          </button>
                        </div>
                        {errors.confirmPassword && (
                          <p className="mt-2 text-sm text-red-600 text-right animate-fadeIn">{errors.confirmPassword}</p>
                        )}
                      </div>

                      {/* Checkboxes - Enhanced */}
                      <div className="space-y-5">
                        <label className="group flex items-start gap-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 p-3 rounded-xl transition-colors">
                          <div className="relative mt-1">
                            <input
                              type="checkbox"
                              name="agreeToTerms"
                              checked={formData.agreeToTerms}
                              onChange={handleChange}
                              className="peer sr-only"
                            />
                            <div className="w-5 h-5 rounded border-2 border-gray-300 dark:border-gray-600 peer-checked:border-primary peer-checked:bg-primary transition-all duration-200 flex items-center justify-center group-hover:border-primary">
                              {formData.agreeToTerms && (
                                <span className="material-symbols-outlined text-white text-sm">check</span>
                              )}
                            </div>
                          </div>
                          <span className="text-sm text-gray-700 dark:text-gray-300 select-none flex-1 text-right">
                            {language === 'ar' 
                              ? 'أوافق على '
                              : 'I agree to the '
                            }
                            <Link to="/terms" className="text-primary hover:text-purple-600 font-medium hover:underline">
                              {language === 'ar' ? 'الشروط والأحكام' : 'Terms and Conditions'}
                            </Link>
                            {language === 'ar' ? ' و ' : ' and '}
                            <Link to="/privacy" className="text-primary hover:text-purple-600 font-medium hover:underline">
                              {language === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
                            </Link>
                            *
                          </span>
                        </label>
                        
                        <label className="group flex items-start gap-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 p-3 rounded-xl transition-colors">
                          <div className="relative mt-1">
                            <input
                              type="checkbox"
                              name="newsletter"
                              checked={formData.newsletter}
                              onChange={handleChange}
                              className="peer sr-only"
                            />
                            <div className="w-5 h-5 rounded border-2 border-gray-300 dark:border-gray-600 peer-checked:border-primary peer-checked:bg-primary transition-all duration-200 flex items-center justify-center group-hover:border-primary">
                              {formData.newsletter && (
                                <span className="material-symbols-outlined text-white text-sm">check</span>
                              )}
                            </div>
                          </div>
                          <span className="text-sm text-gray-700 dark:text-gray-300 select-none flex-1 text-right">
                            {language === 'ar' 
                              ? 'أرغب في تلقي عروض حصرية وأحدث التحديثات عبر البريد الإلكتروني'
                              : 'I want to receive exclusive offers and latest updates via email'
                            }
                          </span>
                        </label>
                      </div>

                      {errors.agreeToTerms && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-4 animate-fadeIn">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
                              <span className="material-symbols-outlined text-red-600 dark:text-red-400 text-sm">
                                error
                              </span>
                            </div>
                            <p className="text-red-600 dark:text-red-400 text-sm flex-1 text-right">
                              {errors.agreeToTerms}
                            </p>
                          </div>
                        </div>
                      )}

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
                              {language === 'ar' ? 'جاري إنشاء الحساب...' : 'Creating account...'}
                            </>
                          ) : (
                            <>
                              <span className="material-symbols-outlined text-xl">rocket_launch</span>
                              {language === 'ar' ? 'إنشاء حساب' : 'Create Account'}
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

                      {/* Login Link */}
                      <div className="text-center pt-6">
                        <p className="text-gray-600 dark:text-gray-400">
                          {language === 'ar' ? 'هل لديك حساب بالفعل؟' : 'Already have an account?'}
                          <Link 
                            to="/login" 
                            className="group relative text-primary font-semibold hover:text-purple-600 transition-colors mr-1 inline-flex items-center gap-1"
                          >
                            {language === 'ar' ? ' سجل الدخول' : ' Sign in'}
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

export default Register;