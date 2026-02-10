// src/utils/auth.js
// دالات مساعدة للتحقق من صلاحيات المستخدم

export const checkUserLogin = () => {
  try {
    const userData = localStorage.getItem('tar7a_user');
    if (!userData) return false;
    
    const user = JSON.parse(userData);
    return user.loggedIn === true;
  } catch {
    return false;
  }
};

export const checkAdminAccess = () => {
  try {
    const userData = localStorage.getItem('tar7a_user');
    if (!userData) return false;
    
    const user = JSON.parse(userData);
    
    const adminEmails = [
      'admin@tar7a.com',
      'admin@tar7astore.com',
      'manager@tar7a.com',
      'your-email@example.com'
    ];
    
    const isAdmin = user.isAdmin || adminEmails.includes(user.email?.toLowerCase());
    
    return isAdmin && user.loggedIn === true;
  } catch {
    return false;
  }
};

export const getUserInfo = () => {
  try {
    const userData = localStorage.getItem('tar7a_user');
    if (!userData) return null;
    
    const user = JSON.parse(userData);
    return {
      name: user.fullName || user.email,
      email: user.email,
      isAdmin: checkAdminAccess(),
      joinedDate: user.registeredAt
    };
  } catch {
    return null;
  }
};

export const logoutUser = () => {
  localStorage.removeItem('tar7a_user');
  window.location.href = '/';
};