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
    
    // قائمة بريدات المديرين
    const adminEmails = [
      'admin@tar7a.com',
      'admin@tar7astore.com', 
      'manager@tar7a.com',
      'your-email@example.com' // أضف بريدك هنا
    ];
    
    const isAdmin = user.isAdmin || adminEmails.includes(user.email?.toLowerCase());
    
    return isAdmin && user.loggedIn === true;
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
};

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  
  useEffect(() => {
    const checkAccess = () => {
      const loggedIn = isUserLoggedIn();
      
      if (!loggedIn) {
        // إذا لم يكن مسجلاً، إعادة توجيه لصفحة تسجيل الدخول
        alert(
          language === 'ar' 
            ? '⚠️ يجب تسجيل الدخول للوصول لهذه الصفحة'
            : '⚠️ You must be logged in to access this page'
        );
        navigate('/login');
        return;
      }
      
      if (requireAdmin) {
        const isAdmin = isAdminUser();
        
        if (!isAdmin) {
          // إذا لم يكن مديراً، إعادة توجيه للصفحة الرئيسية
          alert(
            language === 'ar' 
              ? '⛔ ليس لديك صلاحيات الوصول إلى هذه الصفحة'
              : '⛔ You do not have permission to access this page'
          );
          navigate('/');
          return;
        }
      }
    };
    
    checkAccess();
    
    // استمع لتغييرات localStorage
    const handleStorageChange = () => {
      checkAccess();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [navigate, language, requireAdmin]);
  
  // إذا تم التحقق بنجاح، عرض المحتوى
  return children;
};

export default ProtectedRoute;