// src/components/ProtectedRoute.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

// دالة للتحقق إذا كان المستخدم مسجلاً
const isUserLoggedIn = () => {
  if (typeof window === 'undefined') return false;
  
  try {
    const userData = localStorage.getItem('tar7a_user');
    if (!userData) return false;
    
    const user = JSON.parse(userData);
    return user.loggedIn === true;
  } catch (error) {
    return false;
  }
};

// دالة للتحقق إذا كان المستخدم مديراً
const isAdminUser = () => {
  if (typeof window === 'undefined') return false;
  
  try {
    const userData = localStorage.getItem('tar7a_user');
    if (!userData) return false;
    
    const user = JSON.parse(userData);
    
    // بيانات المدير الثابتة
    const adminCredentials = {
      email: "admin@tar7a.com",
      password: "Admin@Tar7a123"  // كلمة مرور قوية
    };
    
    // التحقق من تطابق البريد الإلكتروني وكلمة المرور
    const isEmailMatch = user.email?.toLowerCase() === adminCredentials.email.toLowerCase();
    const isPasswordMatch = user.password === adminCredentials.password;
    
    // فقط إذا كان البريد وكلمة المرور متطابقين تماماً
    const isAdmin = isEmailMatch && isPasswordMatch && user.loggedIn === true;
    
    return isAdmin;
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
};

// دالة خاصة للتحقق من بيانات تسجيل الدخول الإدارية
export const validateAdminLogin = (email, password) => {
  const adminCredentials = {
    email: "admin@tar7a.com",
    password: "Admin@Tar7a123"
  };
  
  return email?.toLowerCase() === adminCredentials.email.toLowerCase() && 
         password === adminCredentials.password;
};

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  
  useEffect(() => {
    const checkAccess = () => {
      const loggedIn = isUserLoggedIn();
      
      if (!loggedIn) {
        // استخدام Custom Event بدلاً من alert
        const event = new CustomEvent('show-toast', {
          detail: {
            message: language === 'ar' 
              ? 'يجب تسجيل الدخول للوصول لهذه الصفحة'
              : 'You must be logged in to access this page',
            type: 'warning'
          }
        });
        window.dispatchEvent(event);
        
        navigate('/login');
        return;
      }
      
      if (requireAdmin) {
        const isAdmin = isAdminUser();
        
        if (!isAdmin) {
          // إذا لم يكن مديراً، إعادة توجيه للصفحة الرئيسية
          const event = new CustomEvent('show-toast', {
            detail: {
              message: language === 'ar' 
                ? 'ليس لديك صلاحيات الوصول إلى لوحة التحكم'
                : 'You do not have permission to access the admin panel',
              type: 'error'
            }
          });
          window.dispatchEvent(event);
          
          navigate('/');
          return;
        }
      }
    };
    
    // إضافة تأخير بسيط للسماح بتحميل localStorage
    const timeoutId = setTimeout(checkAccess, 100);
    
    // استمع لتغييرات localStorage
    const handleStorageChange = (e) => {
      if (e.key === 'tar7a_user') {
        checkAccess();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('localStorageChange', handleStorageChange);
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('localStorageChange', handleStorageChange);
    };
  }, [navigate, language, requireAdmin]);
  
  // إذا تم التحقق بنجاح، عرض المحتوى
  return children;
};

export default ProtectedRoute;