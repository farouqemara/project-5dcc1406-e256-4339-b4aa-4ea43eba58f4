import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar';
type Direction = 'ltr' | 'rtl';

interface LanguageContextType {
  language: Language;
  direction: Direction;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.categories': 'Categories',
    'nav.suppliers': 'Suppliers',
    'nav.equipment': 'Equipment Rental',
    'nav.about': 'About',
    'nav.login': 'Login',
    'nav.register': 'Register',
    'nav.dashboard': 'Dashboard',
    'nav.logout': 'Logout',
    
    // Hero
    'hero.title': 'Connect with Top Construction Suppliers',
    'hero.subtitle': 'The leading marketplace for construction materials, equipment rental, and professional services',
    'hero.cta.supplier': 'Register as Supplier',
    'hero.cta.contractor': 'Find Suppliers',
    'hero.stats.suppliers': 'Verified Suppliers',
    'hero.stats.contractors': 'Active Contractors',
    'hero.stats.transactions': 'Successful Transactions',
    
    // Categories
    'category.building': 'Building Materials',
    'category.electrical': 'Electrical Supplies',
    'category.plumbing': 'Plumbing Supplies',
    'category.finishing': 'Finishing & Interior',
    'category.equipment': 'Heavy Equipment',
    
    // Common
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.sort': 'Sort',
    'common.viewAll': 'View All',
    'common.learnMore': 'Learn More',
    'common.getStarted': 'Get Started',
    'common.contact': 'Contact',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.submit': 'Submit',
    'common.loading': 'Loading...',
    'common.verified': 'Verified',
    'common.featured': 'Featured',
    'common.new': 'New',
    
    // Auth
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.confirmPassword': 'Confirm Password',
    'auth.forgotPassword': 'Forgot Password?',
    'auth.noAccount': "Don't have an account?",
    'auth.hasAccount': 'Already have an account?',
    'auth.signIn': 'Sign In',
    'auth.signUp': 'Sign Up',
    'auth.selectRole': 'I am a...',
    'auth.supplier': 'Supplier',
    'auth.contractor': 'Contractor',
    
    // Dashboard
    'dashboard.overview': 'Overview',
    'dashboard.requests': 'Requests',
    'dashboard.messages': 'Messages',
    'dashboard.analytics': 'Analytics',
    'dashboard.settings': 'Settings',
    'dashboard.products': 'Products',
    'dashboard.orders': 'Orders',
    'dashboard.favorites': 'Favorites',
    'dashboard.profile': 'Profile',
    
    // Request Status
    'status.new': 'New',
    'status.negotiation': 'In Negotiation',
    'status.accepted': 'Accepted',
    'status.progress': 'In Progress',
    'status.completed': 'Completed',
    'status.cancelled': 'Cancelled',
    
    // Footer
    'footer.rights': 'All rights reserved',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.categories': 'الفئات',
    'nav.suppliers': 'الموردين',
    'nav.equipment': 'تأجير المعدات',
    'nav.about': 'من نحن',
    'nav.login': 'تسجيل الدخول',
    'nav.register': 'التسجيل',
    'nav.dashboard': 'لوحة التحكم',
    'nav.logout': 'تسجيل الخروج',
    
    // Hero
    'hero.title': 'تواصل مع أفضل موردي البناء',
    'hero.subtitle': 'السوق الرائد لمواد البناء وتأجير المعدات والخدمات المهنية',
    'hero.cta.supplier': 'سجل كمورد',
    'hero.cta.contractor': 'ابحث عن موردين',
    'hero.stats.suppliers': 'موردين موثقين',
    'hero.stats.contractors': 'مقاولين نشطين',
    'hero.stats.transactions': 'صفقات ناجحة',
    
    // Categories
    'category.building': 'مواد البناء',
    'category.electrical': 'المستلزمات الكهربائية',
    'category.plumbing': 'مستلزمات السباكة',
    'category.finishing': 'التشطيبات والديكور',
    'category.equipment': 'المعدات الثقيلة',
    
    // Common
    'common.search': 'بحث',
    'common.filter': 'تصفية',
    'common.sort': 'ترتيب',
    'common.viewAll': 'عرض الكل',
    'common.learnMore': 'اعرف المزيد',
    'common.getStarted': 'ابدأ الآن',
    'common.contact': 'تواصل',
    'common.save': 'حفظ',
    'common.cancel': 'إلغاء',
    'common.submit': 'إرسال',
    'common.loading': 'جاري التحميل...',
    'common.verified': 'موثق',
    'common.featured': 'مميز',
    'common.new': 'جديد',
    
    // Auth
    'auth.email': 'البريد الإلكتروني',
    'auth.password': 'كلمة المرور',
    'auth.confirmPassword': 'تأكيد كلمة المرور',
    'auth.forgotPassword': 'نسيت كلمة المرور؟',
    'auth.noAccount': 'ليس لديك حساب؟',
    'auth.hasAccount': 'لديك حساب بالفعل؟',
    'auth.signIn': 'تسجيل الدخول',
    'auth.signUp': 'إنشاء حساب',
    'auth.selectRole': 'أنا...',
    'auth.supplier': 'مورد',
    'auth.contractor': 'مقاول',
    
    // Dashboard
    'dashboard.overview': 'نظرة عامة',
    'dashboard.requests': 'الطلبات',
    'dashboard.messages': 'الرسائل',
    'dashboard.analytics': 'التحليلات',
    'dashboard.settings': 'الإعدادات',
    'dashboard.products': 'المنتجات',
    'dashboard.orders': 'الطلبيات',
    'dashboard.favorites': 'المفضلة',
    'dashboard.profile': 'الملف الشخصي',
    
    // Request Status
    'status.new': 'جديد',
    'status.negotiation': 'قيد التفاوض',
    'status.accepted': 'مقبول',
    'status.progress': 'قيد التنفيذ',
    'status.completed': 'مكتمل',
    'status.cancelled': 'ملغي',
    
    // Footer
    'footer.rights': 'جميع الحقوق محفوظة',
    'footer.privacy': 'سياسة الخصوصية',
    'footer.terms': 'شروط الخدمة',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');
  const direction: Direction = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = language;
    if (language === 'ar') {
      document.body.classList.add('font-arabic');
    } else {
      document.body.classList.remove('font-arabic');
    }
  }, [language, direction]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, direction, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
