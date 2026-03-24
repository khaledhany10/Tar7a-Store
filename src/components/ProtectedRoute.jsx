// src/components/ProtectedRoute.jsx
import { useEffect, useState } from 'react';
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
    console.error('Error checking user login:', error);
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
    
    // بيانات المدير الثابتة - بدون كلمة المرور في التخزين!
    const adminEmails = [
      "admin@tar7a.com",
      "admin@tar7astore.com",
      "manager@tar7a.com"
    ];
    
    // التحقق من أن المستخدم مسجل دخول وإيميته في قائمة المديرين
    // لا نحتاج للتحقق من كلمة المرور هنا لأنها تكون قد تحققت عند تسجيل الدخول
    const isAdmin = adminEmails.includes(user.email?.toLowerCase()) && user.loggedIn === true;
    
    return isAdmin;
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
};

// دالة خاصة للتحقق من بيانات تسجيل الدخول الإدارية (تستخدم في صفحة تسجيل الدخول فقط)
export const validateAdminLogin = (email, password) => {
  const adminCredentials = {
    email: "admin@tar7a.com",
    password: "Admin@Tar7a123"
  };
  
  return email?.toLowerCase() === adminCredentials.email.toLowerCase() && 
         password === adminCredentials.password;
};

// دالة لتسجيل الدخول كمدير
export const loginAsAdmin = (email, password) => {
  if (validateAdminLogin(email, password)) {
    const userData = {
      fullName: 'مدير النظام',
      email: email.toLowerCase(),
      isAdmin: true,
      loggedIn: true,
      registeredAt: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    };
    
    localStorage.setItem('tar7a_user', JSON.stringify(userData));
    
    // إرسال حدث للتحديث في المكونات الأخرى
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('localStorageChange'));
    }
    
    return { success: true, user: userData };
  }
  
  return { success: false, error: 'Invalid credentials' };
};
// دالة لتسجيل الدخول كمستخدم عادي (للتجربة)
export const loginAsUser = (email, password) => {
  const userData = {
    fullName: email.split('@')[0],
    email: email.toLowerCase(),
    isAdmin: false,
    loggedIn: true,
    registeredAt: new Date().toISOString()
  };
  
  localStorage.setItem('tar7a_user', JSON.stringify(userData));
  window.dispatchEvent(new Event('localStorageChange'));
  
  return { success: true, user: userData };
};

// دالة تسجيل الخروج
export const logoutUser = () => {
  localStorage.removeItem('tar7a_user');
  window.dispatchEvent(new Event('localStorageChange'));
  return true;
};

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [isChecking, setIsChecking] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    const checkAccess = () => {
      try {
        const loggedIn = isUserLoggedIn();
        
        console.log('ProtectedRoute check:', { 
          loggedIn, 
          requireAdmin,
          path: window.location.pathname 
        });
        
        if (!loggedIn) {
          // عرض رسالة للمستخدم
          const message = language === 'ar' 
            ? 'يجب تسجيل الدخول للوصول لهذه الصفحة'
            : 'You must be logged in to access this page';
          
          // يمكنك استخدام toast أو console.log
          console.log(message);
          
          // إعادة توجيه لصفحة تسجيل الدخول
          navigate('/login', { replace: true });
          setHasAccess(false);
          setIsChecking(false);
          return;
        }
        
        if (requireAdmin) {
          const isAdmin = isAdminUser();
          
          if (!isAdmin) {
            const message = language === 'ar' 
              ? 'ليس لديك صلاحيات الوصول إلى لوحة التحكم'
              : 'You do not have permission to access the admin panel';
            
            console.log(message);
            
            // إعادة توجيه للصفحة الرئيسية
            navigate('/', { replace: true });
            setHasAccess(false);
            setIsChecking(false);
            return;
          }
        }
        
        // إذا وصلنا إلى هنا، المستخدم لديه الصلاحية
        setHasAccess(true);
        setIsChecking(false);
        
      } catch (error) {
        console.error('Error in ProtectedRoute:', error);
        setIsChecking(false);
        setHasAccess(false);
        navigate('/login', { replace: true });
      }
    };
    
    // التحقق الفوري
    checkAccess();
    
    // استمع لتغييرات localStorage
    const handleStorageChange = (e) => {
      console.log('localStorage changed, rechecking access...');
      checkAccess();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('localStorageChange', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('localStorageChange', handleStorageChange);
    };
  }, [navigate, language, requireAdmin]);

  // أثناء التحقق، عرض شاشة تحميل
  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            {language === 'ar' ? 'جاري التحقق...' : 'Checking access...'}
          </p>
        </div>
      </div>
    );
  }

  // إذا لم يكن لديه صلاحية، لا تعرض شيء (سيتم التوجيه تلقائياً)
  if (!hasAccess) {
    return null;
  }

  // إذا تم التحقق بنجاح، عرض المحتوى
  return children;
};

export default ProtectedRoute;