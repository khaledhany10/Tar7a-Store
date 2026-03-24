// src/components/admin/AdminLogin.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
// استيراد دوال تسجيل الدخول من ProtectedRoute
import { validateAdminLogin, loginAsAdmin } from '../ProtectedRoute';

const AdminLogin = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // مسح الخطأ عند الكتابة
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (errors.submit) {
      setErrors(prev => ({ ...prev, submit: '' }));
    }
  };

  // دالة لعرض الإشعارات (بدلاً من CustomEvent)
  const showNotification = (message, type = 'info') => {
    // يمكنك استخدام alert مؤقتاً أو تطوير نظام إشعارات لاحقاً
    console.log(`[${type}] ${message}`);
    if (type === 'error') {
      alert(message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // التحقق من الحقول المطلوبة
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = language === 'ar' ? 'البريد الإلكتروني مطلوب' : 'Email is required';
    } else if (!formData.email.includes('@')) {
      newErrors.email = language === 'ar' ? 'البريد الإلكتروني غير صالح' : 'Invalid email format';
    }
    
    if (!formData.password) {
      newErrors.password = language === 'ar' ? 'كلمة المرور مطلوبة' : 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = language === 'ar' ? 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' : 'Password must be at least 6 characters';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsLoading(true);
    
    try {
      // استخدام دالة loginAsAdmin من ProtectedRoute
      const result = loginAsAdmin(formData.email, formData.password);
      
      if (!result.success) {
        throw new Error(result.error || 'Invalid credentials');
      }
      
      // إشعار بالنجاح
      showNotification(
        language === 'ar' 
          ? 'تم تسجيل الدخول كمدير بنجاح!'
          : 'Logged in as admin successfully!',
        'success'
      );
      
      // إرسال حدث لتحديث ProtectedRoute
      window.dispatchEvent(new Event('localStorageChange'));
      
      // تأخير بسيط قبل التوجيه
      setTimeout(() => {
        navigate('/admin/dashboard', { replace: true });
      }, 500);
      
    } catch (error) {
      console.error('Admin login error:', error);
      
      showNotification(
        language === 'ar' 
          ? 'بيانات تسجيل الدخول غير صحيحة'
          : 'Invalid login credentials',
        'error'
      );
      
      setErrors({
        submit: language === 'ar' 
          ? 'البريد الإلكتروني أو كلمة المرور غير صحيحة'
          : 'Invalid email or password'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // دالة لملء بيانات التجربة بسرعة
  const fillTestCredentials = () => {
    setFormData({
      email: 'admin@tar7a.com',
      password: 'Admin@Tar7a123'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 via-yellow-500/20 to-green-500/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-100 transition-all duration-500"></div>
          
          <div className="relative bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-gray-700/50">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-red-500 to-yellow-500 flex items-center justify-center mb-6 shadow-lg animate-pulse">
                <span className="material-symbols-outlined text-white text-3xl">
                  admin_panel_settings
                </span>
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-2">
                {language === 'ar' ? 'لوحة تحكم المدير' : 'Admin Control Panel'}
              </h2>
              <p className="text-gray-400 text-sm">
                {language === 'ar' 
                  ? 'أدخل بيانات الاعتماد الإدارية للوصول'
                  : 'Enter administrator credentials to access'
                }
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                </label>
                <div className="relative">
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    <span className="material-symbols-outlined text-sm">badge</span>
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 pr-12 bg-gray-700/50 border ${
                      errors.email ? 'border-red-500' : 'border-gray-600'
                    } rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition-all duration-300`}
                    placeholder="admin@tar7a.com"
                    autoComplete="username"
                    disabled={isLoading}
                  />
                </div>
                {errors.email && (
                  <p className="mt-2 text-sm text-red-400">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {language === 'ar' ? 'كلمة المرور' : 'Password'}
                </label>
                <div className="relative">
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    <span className="material-symbols-outlined text-sm">key</span>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 pr-12 pl-12 bg-gray-700/50 border ${
                      errors.password ? 'border-red-500' : 'border-gray-600'
                    } rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition-all duration-300`}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-500 transition-colors"
                    disabled={isLoading}
                  >
                    <span className="material-symbols-outlined text-sm">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-2 text-sm text-red-400">{errors.password}</p>
                )}
              </div>

              {/* Quick Fill Button */}
              <button
                type="button"
                onClick={fillTestCredentials}
                className="w-full text-sm text-yellow-500 hover:text-yellow-400 transition-colors flex items-center justify-center gap-1"
                disabled={isLoading}
              >
                <span className="material-symbols-outlined text-sm">bolt</span>
                {language === 'ar' ? 'ملء بيانات التجربة' : 'Fill test credentials'}
              </button>

              {/* Credentials Hint */}
              <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-yellow-500 text-sm mt-0.5">
                    info
                  </span>
                  <div>
                    <p className="text-xs text-gray-400">
                      {language === 'ar' 
                        ? 'بيانات الاعتماد الافتراضية:'
                        : 'Default credentials:'
                      }
                    </p>
                    <p className="text-xs text-gray-300 font-mono mt-1">
                      Email: admin@tar7a.com
                      <br />
                      Password: Admin@Tar7a123
                    </p>
                  </div>
                </div>
              </div>

              {errors.submit && (
                <div className="bg-red-900/20 border border-red-800 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-red-400 text-sm">
                      error
                    </span>
                    <p className="text-red-400 text-sm">{errors.submit}</p>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white py-3.5 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    {language === 'ar' ? 'جاري التحقق...' : 'Verifying...'}
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined">shield</span>
                    {language === 'ar' ? 'دخول كمدير' : 'Login as Admin'}
                  </>
                )}
              </button>

              {/* Back to Home */}
              <div className="text-center pt-4">
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="text-sm text-gray-400 hover:text-white transition-colors flex items-center justify-center gap-1 mx-auto"
                  disabled={isLoading}
                >
                  <span className="material-symbols-outlined text-sm">arrow_back</span>
                  {language === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;