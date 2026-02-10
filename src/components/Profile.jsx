// src/components/Profile.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Profile = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: 'Egypt',
    notifications: true,
    newsletter: true
  });

  // تحميل بيانات المستخدم
  useEffect(() => {
    const checkAuthAndLoadData = () => {
      try {
        const storedUser = localStorage.getItem('tar7a_user');
        if (!storedUser) {
          navigate('/login');
          return;
        }
        
        const user = JSON.parse(storedUser);
        if (!user.loggedIn) {
          navigate('/login');
          return;
        }
        
        setUserData(user);
        setFormData({
          fullName: user.fullName || '',
          email: user.email || '',
          phone: user.phone || '',
          address: user.address || '',
          city: user.city || '',
          country: user.country || 'Egypt',
          notifications: user.notifications !== false,
          newsletter: user.newsletter !== false
        });
        
        loadOrders();
      } catch (error) {
        console.error('Error loading user data:', error);
        navigate('/login');
      }
    };

    checkAuthAndLoadData();
  }, [navigate]);

  const loadOrders = () => {
    // محاكاة بيانات الطلبات
    const mockOrders = [
      {
        id: 'ORD-2024-001',
        date: '2024-01-15',
        total: '450 EGP',
        status: 'delivered',
        items: 3,
        itemsList: [
          { name: 'طرحة زخرفة إسلامية ذهبية', price: '150 EGP', quantity: 1 },
          { name: 'طرحة شيفون حريري فاخر', price: '180 EGP', quantity: 2 }
        ]
      },
      {
        id: 'ORD-2024-002',
        date: '2024-01-10',
        total: '320 EGP',
        status: 'processing',
        items: 2,
        itemsList: [
          { name: 'طرحة رمضان مطرزة', price: '160 EGP', quantity: 2 }
        ]
      },
      {
        id: 'ORD-2023-012',
        date: '2023-12-20',
        total: '280 EGP',
        status: 'delivered',
        items: 1,
        itemsList: [
          { name: 'طرحة دايور كلاسيك', price: '280 EGP', quantity: 1 }
        ]
      }
    ];
    setOrders(mockOrders);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // محاكاة تحديث البيانات
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedUser = {
        ...userData,
        ...formData,
        updatedAt: new Date().toISOString()
      };
      
      localStorage.setItem('tar7a_user', JSON.stringify(updatedUser));
      setUserData(updatedUser);
      setIsEditing(false);
      
      alert(language === 'ar' 
        ? '✅ تم تحديث بياناتك بنجاح!' 
        : '✅ Your profile has been updated successfully!'
      );
      
    } catch (error) {
      console.error('Error updating profile:', error);
      alert(language === 'ar' 
        ? '❌ حدث خطأ في تحديث البيانات' 
        : '❌ Error updating profile'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    if (window.confirm(
      language === 'ar' 
        ? 'هل أنت متأكد من تسجيل الخروج؟'
        : 'Are you sure you want to logout?'
    )) {
      localStorage.removeItem('tar7a_user');
      navigate('/');
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'delivered': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'processing': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'pending': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const getStatusText = (status) => {
    if (language === 'ar') {
      switch(status) {
        case 'delivered': return 'تم التوصيل';
        case 'processing': return 'قيد المعالجة';
        case 'pending': return 'قيد الانتظار';
        case 'cancelled': return 'ملغى';
        default: return 'غير معروف';
      }
    } else {
      return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return language === 'ar' 
      ? date.toLocaleDateString('ar-EG')
      : date.toLocaleDateString('en-US');
  };

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/5 via-white/50 to-purple-50/50 dark:from-primary/10 dark:via-gray-900 dark:to-purple-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {language === 'ar' ? 'الملف الشخصي' : 'My Profile'}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {language === 'ar' 
                  ? 'إدارة حسابك وتتبع طلباتك وتفضيلاتك الشخصية'
                  : 'Manage your account, track orders, and personal preferences'
                }
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/')}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">home</span>
                {language === 'ar' ? 'العودة للمتجر' : 'Back to Store'}
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-800/50 transition-colors flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">logout</span>
                {language === 'ar' ? 'تسجيل الخروج' : 'Logout'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sticky top-24">
              {/* User Info */}
              <div className="text-center mb-8">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white text-3xl font-bold">
                  {userData.fullName?.charAt(0).toUpperCase() || 'U'}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {userData.fullName || 'User'}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {userData.email}
                </p>
                {userData.isAdmin && (
                  <span className="inline-block mt-2 px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                    {language === 'ar' ? 'مدير النظام' : 'Administrator'}
                  </span>
                )}
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full text-right px-4 py-3 rounded-xl transition-all duration-300 flex items-center justify-between ${
                    activeTab === 'profile'
                      ? 'bg-primary/10 text-primary font-semibold'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">person</span>
                  <span>{language === 'ar' ? 'الملف الشخصي' : 'Profile'}</span>
                </button>

                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full text-right px-4 py-3 rounded-xl transition-all duration-300 flex items-center justify-between ${
                    activeTab === 'orders'
                      ? 'bg-primary/10 text-primary font-semibold'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">shopping_bag</span>
                  <span>{language === 'ar' ? 'طلباتي' : 'My Orders'}</span>
                  <span className="text-xs bg-primary text-white px-2 py-1 rounded-full">
                    {orders.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('wishlist')}
                  className={`w-full text-right px-4 py-3 rounded-xl transition-all duration-300 flex items-center justify-between ${
                    activeTab === 'wishlist'
                      ? 'bg-primary/10 text-primary font-semibold'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">favorite</span>
                  <span>{language === 'ar' ? 'المفضلة' : 'Wishlist'}</span>
                  <span className="text-xs bg-pink-500 text-white px-2 py-1 rounded-full">
                    12
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('addresses')}
                  className={`w-full text-right px-4 py-3 rounded-xl transition-all duration-300 flex items-center justify-between ${
                    activeTab === 'addresses'
                      ? 'bg-primary/10 text-primary font-semibold'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">location_on</span>
                  <span>{language === 'ar' ? 'العناوين' : 'Addresses'}</span>
                </button>

                <button
                  onClick={() => setActiveTab('security')}
                  className={`w-full text-right px-4 py-3 rounded-xl transition-all duration-300 flex items-center justify-between ${
                    activeTab === 'security'
                      ? 'bg-primary/10 text-primary font-semibold'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">shield</span>
                  <span>{language === 'ar' ? 'الأمان' : 'Security'}</span>
                </button>
              </nav>

              {/* Stats */}
              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">
                      {language === 'ar' ? 'عضو منذ' : 'Member since'}
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {formatDate(userData.registeredAt || new Date().toISOString())}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">
                      {language === 'ar' ? 'الطلبات' : 'Orders'}
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {orders.length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">
                      {language === 'ar' ? 'المشتريات' : 'Total Spent'}
                    </span>
                    <span className="font-medium text-primary">
                      {orders.reduce((total, order) => {
                        const amount = parseFloat(order.total) || 0;
                        return total + amount;
                      }, 0)} EGP
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {language === 'ar' ? 'المعلومات الشخصية' : 'Personal Information'}
                    </h2>
                    {!isEditing && (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-2"
                      >
                        <span className="material-symbols-outlined text-sm">edit</span>
                        {language === 'ar' ? 'تعديل البيانات' : 'Edit Profile'}
                      </button>
                    )}
                  </div>
                </div>

                <div className="p-6">
                  {isEditing ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {language === 'ar' ? 'الاسم الكامل' : 'Full Name'} *
                          </label>
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {language === 'ar' ? 'البريد الإلكتروني' : 'Email Address'} *
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {language === 'ar' ? 'رقم الهاتف' : 'Phone Number'} *
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {language === 'ar' ? 'الدولة' : 'Country'}
                          </label>
                          <select
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                          >
                            <option value="Egypt">Egypt</option>
                            <option value="Saudi Arabia">Saudi Arabia</option>
                            <option value="UAE">United Arab Emirates</option>
                            <option value="Kuwait">Kuwait</option>
                            <option value="Qatar">Qatar</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {language === 'ar' ? 'المدينة' : 'City'}
                          </label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {language === 'ar' ? 'العنوان' : 'Address'}
                          </label>
                          <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            rows="3"
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <label className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            name="newsletter"
                            checked={formData.newsletter}
                            onChange={handleChange}
                            className="w-4 h-4 text-primary rounded focus:ring-primary"
                          />
                          <span className="text-gray-700 dark:text-gray-300">
                            {language === 'ar' 
                              ? 'الاشتراك في النشرة الإخبارية والعروض الخاصة'
                              : 'Subscribe to newsletter and special offers'
                            }
                          </span>
                        </label>

                        <label className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            name="notifications"
                            checked={formData.notifications}
                            onChange={handleChange}
                            className="w-4 h-4 text-primary rounded focus:ring-primary"
                          />
                          <span className="text-gray-700 dark:text-gray-300">
                            {language === 'ar' 
                              ? 'تفعيل الإشعارات'
                              : 'Enable notifications'
                            }
                          </span>
                        </label>
                      </div>

                      <div className="flex gap-4 pt-6">
                        <button
                          type="submit"
                          disabled={isLoading}
                          className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors disabled:opacity-50 flex items-center gap-2"
                        >
                          {isLoading ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                              {language === 'ar' ? 'جاري الحفظ...' : 'Saving...'}
                            </>
                          ) : (
                            <>
                              <span className="material-symbols-outlined text-sm">save</span>
                              {language === 'ar' ? 'حفظ التغييرات' : 'Save Changes'}
                            </>
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setIsEditing(false);
                            setFormData({
                              fullName: userData.fullName || '',
                              email: userData.email || '',
                              phone: userData.phone || '',
                              address: userData.address || '',
                              city: userData.city || '',
                              country: userData.country || 'Egypt',
                              notifications: userData.notifications !== false,
                              newsletter: userData.newsletter !== false
                            });
                          }}
                          className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          {language === 'ar' ? 'إلغاء' : 'Cancel'}
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                            {language === 'ar' ? 'الاسم الكامل' : 'Full Name'}
                          </h4>
                          <p className="text-lg font-medium text-gray-900 dark:text-white">
                            {userData.fullName || 'غير محدد'}
                          </p>
                        </div>

                        <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                            {language === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
                          </h4>
                          <p className="text-lg font-medium text-gray-900 dark:text-white">
                            {userData.email}
                          </p>
                        </div>

                        <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                            {language === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
                          </h4>
                          <p className="text-lg font-medium text-gray-900 dark:text-white">
                            {userData.phone || 'غير محدد'}
                          </p>
                        </div>

                        <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                            {language === 'ar' ? 'الدولة' : 'Country'}
                          </h4>
                          <p className="text-lg font-medium text-gray-900 dark:text-white">
                            {userData.country || 'غير محدد'}
                          </p>
                        </div>

                        <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                            {language === 'ar' ? 'المدينة' : 'City'}
                          </h4>
                          <p className="text-lg font-medium text-gray-900 dark:text-white">
                            {userData.city || 'غير محدد'}
                          </p>
                        </div>

                        <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                            {language === 'ar' ? 'عضو منذ' : 'Member Since'}
                          </h4>
                          <p className="text-lg font-medium text-gray-900 dark:text-white">
                            {formatDate(userData.registeredAt)}
                          </p>
                        </div>
                      </div>

                      {userData.address && (
                        <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                            {language === 'ar' ? 'العنوان' : 'Address'}
                          </h4>
                          <p className="text-gray-900 dark:text-white">
                            {userData.address}
                          </p>
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${userData.newsletter !== false ? 'bg-green-500' : 'bg-red-500'}`}></div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {language === 'ar' ? 'النشرة الإخبارية' : 'Newsletter'}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {userData.newsletter !== false 
                                ? (language === 'ar' ? 'مفعل' : 'Active')
                                : (language === 'ar' ? 'غير مفعل' : 'Inactive')
                              }
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${userData.notifications !== false ? 'bg-green-500' : 'bg-red-500'}`}></div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {language === 'ar' ? 'الإشعارات' : 'Notifications'}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {userData.notifications !== false 
                                ? (language === 'ar' ? 'مفعلة' : 'Active')
                                : (language === 'ar' ? 'غير مفعلة' : 'Inactive')
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {language === 'ar' ? 'طلباتي' : 'My Orders'}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    {language === 'ar' 
                      ? `عرض ${orders.length} طلب`
                      : `Showing ${orders.length} orders`
                    }
                  </p>
                </div>

                <div className="p-6">
                  {orders.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-gray-400 text-3xl">shopping_bag</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        {language === 'ar' ? 'لا توجد طلبات' : 'No Orders Yet'}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-8">
                        {language === 'ar' 
                          ? 'لم تقم بأي طلبات حتى الآن. ابدأ التسوق الآن!'
                          : 'You haven\'t placed any orders yet. Start shopping now!'
                        }
                      </p>
                      <Link
                        to="/products"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                      >
                        <span className="material-symbols-outlined">shopping_cart</span>
                        {language === 'ar' ? 'تصفح المنتجات' : 'Browse Products'}
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {orders.map((order) => (
                        <div key={order.id} className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                          <div className="p-6 bg-gradient-to-r from-gray-50 to-gray-100/50 dark:from-gray-900/50 dark:to-gray-800/50">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                              <div>
                                <div className="flex items-center gap-4 mb-2">
                                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                    {order.id}
                                  </h3>
                                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                    {getStatusText(order.status)}
                                  </span>
                                </div>
                                <p className="text-gray-600 dark:text-gray-400">
                                  {language === 'ar' ? 'بتاريخ' : 'Placed on'} {formatDate(order.date)}
                                </p>
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-bold text-primary">
                                  {order.total}
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  {order.items} {language === 'ar' ? 'منتج' : 'items'}
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="p-6">
                            <h4 className="font-medium text-gray-900 dark:text-white mb-4">
                              {language === 'ar' ? 'المنتجات' : 'Products'}
                            </h4>
                            <div className="space-y-3">
                              {order.itemsList.map((item, index) => (
                                <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800 last:border-0">
                                  <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                                      <span className="material-symbols-outlined text-gray-400">inventory</span>
                                    </div>
                                    <div>
                                      <p className="font-medium text-gray-900 dark:text-white">
                                        {item.name}
                                      </p>
                                      <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {language === 'ar' ? 'الكمية' : 'Quantity'}: {item.quantity}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-bold text-gray-900 dark:text-white">
                                      {item.price}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                            
                            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-4">
                              <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                {language === 'ar' ? 'تفاصيل الطلب' : 'Order Details'}
                              </button>
                              <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
                                {language === 'ar' ? 'تتبع الشحنة' : 'Track Order'}
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab === 'wishlist' && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {language === 'ar' ? 'قائمة المفضلة' : 'My Wishlist'}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    {language === 'ar' 
                      ? '12 منتج في المفضلة'
                      : '12 items in wishlist'
                    }
                  </p>
                </div>
                
                <div className="p-6">
                  <div className="text-center py-12">
                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-pink-100 to-pink-200 dark:from-pink-900/30 dark:to-pink-800/30 rounded-full flex items-center justify-center">
                      <span className="material-symbols-outlined text-pink-500 text-3xl">favorite</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {language === 'ar' ? 'قائمة المفضلة فارغة' : 'Wishlist is Empty'}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">
                      {language === 'ar' 
                        ? 'أضف المنتجات التي تحبها إلى المفضلة لتجدها بسهولة لاحقاً'
                        : 'Add products you love to your wishlist to find them easily later'
                      }
                    </p>
                    <Link
                      to="/products"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-lg hover:shadow-lg transition-colors"
                    >
                      <span className="material-symbols-outlined">shopping_cart</span>
                      {language === 'ar' ? 'تصفح المنتجات' : 'Browse Products'}
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Other Tabs - محتوى تجريبي */}
            {(activeTab === 'addresses' || activeTab === 'security') && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {activeTab === 'addresses' 
                      ? (language === 'ar' ? 'العناوين' : 'Addresses')
                      : (language === 'ar' ? 'إعدادات الأمان' : 'Security Settings')
                    }
                  </h2>
                </div>
                
                <div className="p-6 text-center py-12">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-blue-500 text-3xl">
                      {activeTab === 'addresses' ? 'construction' : 'security'}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {language === 'ar' ? 'قيد التطوير' : 'Under Development'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {language === 'ar' 
                      ? 'هذه الميزة قيد التطوير حالياً. ستكون متاحة قريباً!'
                      : 'This feature is currently under development. Coming soon!'
                    }
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;