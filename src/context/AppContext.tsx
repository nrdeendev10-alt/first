import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Listing,
  Breeder,
  PriceSeries,
  ServiceOrder,
  ReportItem,
  SiteSettings,
  PageId
} from '../types';
import {
  INITIAL_ADS,
  INITIAL_BREEDERS,
  PRICE_INDEX,
  DEFAULT_SITE_SETTINGS,
  INITIAL_SERVICE_ORDERS,
  INITIAL_REPORTS
} from '../data/initialData';

export type { PageId };

export interface RouteParams {
  id?: number;
  cat?: string;
  type?: string;
  sex?: string;
  region?: string;
  q?: string;
  breeder?: string;
  tag?: string;
  sub?: string;
  ad?: string;
  tab?: string;
}

interface AppContextType {
  page: PageId;
  params: RouteParams;
  navigate: (page: PageId, params?: RouteParams) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  favorites: number[];
  toggleFavorite: (id: number) => void;
  compareList: number[];
  toggleCompare: (id: number) => void;
  removeFromCompare: (id: number) => void;
  clearCompare: () => void;
  clearFavorites: () => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  checklistState: boolean[];
  toggleChecklistItem: (index: number) => void;
  resetChecklist: () => void;

  // Listings Management
  listings: Listing[];
  addListing: (listing: Listing) => void;
  addUserListing: (listing: Listing) => void;
  updateListing: (id: number, fields: Partial<Listing>) => void;
  deleteListing: (id: number) => void;
  deleteUserListing: (id: number) => void;
  toggleVerifyListing: (id: number) => void;
  toggleFeatureListing: (id: number) => void;
  setListingStatus: (id: number, status: NonNullable<Listing['status']>) => void;

  // Breeders Management
  breeders: Breeder[];
  addBreeder: (breeder: Breeder) => void;
  updateBreeder: (index: number, fields: Partial<Breeder>) => void;
  deleteBreeder: (index: number) => void;

  // Price Index
  priceIndex: PriceSeries[];
  updatePriceSeriesValue: (breedKey: string, monthIndex: number, newPrice: number) => void;
  addPriceSeries: (series: PriceSeries) => void;
  resetPriceIndex: () => void;

  // Services & Orders
  serviceOrders: ServiceOrder[];
  addServiceOrder: (order: Omit<ServiceOrder, 'id' | 'date'>) => void;
  updateServiceOrderStatus: (id: string, status: ServiceOrder['status'], partner?: string, cost?: number) => void;
  deleteServiceOrder: (id: string) => void;

  // Reports & Moderation
  reports: ReportItem[];
  addReport: (report: Omit<ReportItem, 'id' | 'date' | 'status'>) => void;
  resolveReport: (id: string, action: 'dismiss' | 'delete_ad' | 'resolve', note?: string) => void;
  deleteReport: (id: string) => void;

  // Platform Settings
  settings: SiteSettings;
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
  resetSettings: () => void;

  // Admin Authentication
  isAdmin: boolean;
  loginAdmin: (pin?: string) => boolean;
  logoutAdmin: () => void;

  // System Backup & Restore
  exportAllData: () => string;
  importAllData: (jsonStr: string) => boolean;
  resetAllToFactoryDefaults: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation State with URL parsing
  const [page, setPage] = useState<PageId>('home');
  const [params, setParams] = useState<RouteParams>({});

  // Parse initial route from URL search params
  useEffect(() => {
    const handlePopState = () => {
      const url = new URL(window.location.href);
      const p = (url.searchParams.get('page') as PageId) || 'home';
      const id = url.searchParams.get('id') ? Number(url.searchParams.get('id')) : undefined;
      const cat = url.searchParams.get('cat') || undefined;
      const type = url.searchParams.get('type') || undefined;
      const sex = url.searchParams.get('sex') || undefined;
      const region = url.searchParams.get('region') || undefined;
      const q = url.searchParams.get('q') || undefined;
      const breeder = url.searchParams.get('breeder') || undefined;
      const tag = url.searchParams.get('tag') || undefined;
      const sub = url.searchParams.get('sub') || undefined;
      const ad = url.searchParams.get('ad') || undefined;
      const tab = url.searchParams.get('tab') || undefined;

      setPage(p);
      setParams({ id, cat, type, sex, region, q, breeder, tag, sub, ad, tab });
    };

    handlePopState();
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (newPage: PageId, newParams: RouteParams = {}) => {
    setPage(newPage);
    setParams(newParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const url = new URL(window.location.href);
    url.searchParams.set('page', newPage);
    Object.keys(newParams).forEach((k) => {
      const val = (newParams as any)[k];
      if (val !== undefined && val !== '') {
        url.searchParams.set(k, String(val));
      } else {
        url.searchParams.delete(k);
      }
    });
    window.history.pushState({}, '', url.toString());
  };

  // Theme
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('souq-theme');
      if (saved === 'dark' || saved === 'light') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('souq-theme', theme);
    } catch {}
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3000);
  };

  // Admin Session State
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return localStorage.getItem('souq-admin-active') === 'true';
    } catch {
      return false;
    }
  });

  const loginAdmin = (pin?: string) => {
    // Allows pin '2026' or '1234' or empty for fast one-click admin demo
    if (!pin || pin === '2026' || pin === '1234' || pin === 'admin') {
      setIsAdmin(true);
      try {
        localStorage.setItem('souq-admin-active', 'true');
      } catch {}
      showToast('مرحباً بك! تم تسجيل الدخول كمسؤول للنظام');
      return true;
    }
    showToast('رمز الدخول غير صحيح');
    return false;
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    try {
      localStorage.removeItem('souq-admin-active');
    } catch {}
    showToast('تم تسجيل الخروج من لوحة الإدارة');
    if (page === 'admin') {
      navigate('home');
    }
  };

  // Listings State with persistent storage
  const [listings, setListings] = useState<Listing[]>(() => {
    try {
      const saved = localStorage.getItem('souq-listings-v2');
      if (saved) return JSON.parse(saved);
      // Migration from old souq-user-ads
      const oldUserAds = localStorage.getItem('souq-user-ads');
      const userAds = oldUserAds ? JSON.parse(oldUserAds) : [];
      return [...userAds, ...INITIAL_ADS];
    } catch {
      return INITIAL_ADS;
    }
  });

  const persistListings = (updated: Listing[]) => {
    setListings(updated);
    try {
      localStorage.setItem('souq-listings-v2', JSON.stringify(updated));
    } catch {}
  };

  const addListing = (listing: Listing) => {
    const updated = [listing, ...listings];
    persistListings(updated);
    showToast('تمت إضافة الإعلان بنجاح');
  };

  const addUserListing = (listing: Listing) => {
    addListing(listing);
  };

  const updateListing = (id: number, fields: Partial<Listing>) => {
    const updated = listings.map((ad) => (ad.id === id ? { ...ad, ...fields } : ad));
    persistListings(updated);
    showToast('تم تحديث بيانات الإعلان بنجاح');
  };

  const deleteListing = (id: number) => {
    const updated = listings.filter((ad) => ad.id !== id);
    persistListings(updated);
    showToast('تم حذف الإعلان نهائياً');
  };

  const deleteUserListing = (id: number) => {
    deleteListing(id);
    navigate('listings');
  };

  const toggleVerifyListing = (id: number) => {
    const target = listings.find((a) => a.id === id);
    if (!target) return;
    const newV = target.v === 1 ? 0 : 1;
    updateListing(id, { v: newV });
    showToast(newV === 1 ? 'تم توثيق الإعلان رسمياً ✓' : 'تم إلغاء توثيق الإعلان');
  };

  const toggleFeatureListing = (id: number) => {
    const target = listings.find((a) => a.id === id);
    if (!target) return;
    const newFl = target.fl === 1 ? 0 : 1;
    updateListing(id, { fl: newFl });
    showToast(newFl === 1 ? 'تم تمييز الإعلان في الواجهة ★' : 'تم إلغاء تمييز الإعلان');
  };

  const setListingStatus = (id: number, status: NonNullable<Listing['status']>) => {
    updateListing(id, { status });
    showToast(`تم تغيير حالة الإعلان إلى: ${status === 'active' ? 'نشط' : status === 'sold' ? 'تم البيع' : 'قيد المراجعة'}`);
  };

  // Breeders State
  const [breeders, setBreeders] = useState<Breeder[]>(() => {
    try {
      const saved = localStorage.getItem('souq-breeders');
      return saved ? JSON.parse(saved) : INITIAL_BREEDERS;
    } catch {
      return INITIAL_BREEDERS;
    }
  });

  const persistBreeders = (updated: Breeder[]) => {
    setBreeders(updated);
    try {
      localStorage.setItem('souq-breeders', JSON.stringify(updated));
    } catch {}
  };

  const addBreeder = (breeder: Breeder) => {
    const updated = [breeder, ...breeders];
    persistBreeders(updated);
    showToast('تمت إضافة المربي المعتمد بنجاح');
  };

  const updateBreeder = (index: number, fields: Partial<Breeder>) => {
    const updated = [...breeders];
    if (updated[index]) {
      updated[index] = { ...updated[index], ...fields };
      persistBreeders(updated);
      showToast('تم تحديث بيانات المربي بنجاح');
    }
  };

  const deleteBreeder = (index: number) => {
    const updated = breeders.filter((_, idx) => idx !== index);
    persistBreeders(updated);
    showToast('تم حذف المربي');
  };

  // Price Index State
  const [priceIndex, setPriceIndex] = useState<PriceSeries[]>(() => {
    try {
      const saved = localStorage.getItem('souq-price-index');
      return saved ? JSON.parse(saved) : PRICE_INDEX;
    } catch {
      return PRICE_INDEX;
    }
  });

  const persistPriceIndex = (updated: PriceSeries[]) => {
    setPriceIndex(updated);
    try {
      localStorage.setItem('souq-price-index', JSON.stringify(updated));
    } catch {}
  };

  const updatePriceSeriesValue = (breedKey: string, monthIndex: number, newPrice: number) => {
    const updated = priceIndex.map((series) => {
      if (series.k === breedKey) {
        const nextV = [...series.v];
        nextV[monthIndex] = Math.max(100, Math.round(newPrice));
        return { ...series, v: nextV };
      }
      return series;
    });
    persistPriceIndex(updated);
    showToast(`تم تحديث مؤشر سعر سلالة (${breedKey}) بنجاح`);
  };

  const addPriceSeries = (series: PriceSeries) => {
    const updated = [...priceIndex, series];
    persistPriceIndex(updated);
    showToast(`تمت إضافة سلالة جديدة لمؤشر الأسعار: ${series.k}`);
  };

  const resetPriceIndex = () => {
    persistPriceIndex(PRICE_INDEX);
    showToast('تمت استعادة مؤشر الأسعار المرجعي الافتراضي');
  };

  // Service Orders State
  const [serviceOrders, setServiceOrders] = useState<ServiceOrder[]>(() => {
    try {
      const saved = localStorage.getItem('souq-service-orders');
      if (saved) return JSON.parse(saved);
      // Migrate from old simple requests if present
      const old = localStorage.getItem('souq-requests');
      if (old) {
        const parsed = JSON.parse(old);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const migrated: ServiceOrder[] = parsed.map((item: any, idx: number) => ({
            id: `SRV-${9000 + idx}`,
            serviceType: item.serviceType || 'نقل المواشي',
            region: item.region || 'الرياض',
            fullName: item.fullName || 'عميل',
            phone: item.phone || '',
            notes: item.notes || '',
            status: 'new',
            date: item.date || Date.now()
          }));
          return [...migrated, ...INITIAL_SERVICE_ORDERS];
        }
      }
      return INITIAL_SERVICE_ORDERS;
    } catch {
      return INITIAL_SERVICE_ORDERS;
    }
  });

  const persistOrders = (updated: ServiceOrder[]) => {
    setServiceOrders(updated);
    try {
      localStorage.setItem('souq-service-orders', JSON.stringify(updated));
    } catch {}
  };

  const addServiceOrder = (order: Omit<ServiceOrder, 'id' | 'date'>) => {
    const newOrder: ServiceOrder = {
      ...order,
      id: `SRV-${Math.floor(1000 + Math.random() * 9000)}`,
      date: Date.now()
    };
    const updated = [newOrder, ...serviceOrders];
    persistOrders(updated);
    showToast('تم استلام طلبك بنجاح! سيتم التواصل معك قريباً');
  };

  const updateServiceOrderStatus = (id: string, status: ServiceOrder['status'], partner?: string, cost?: number) => {
    const updated = serviceOrders.map((o) => {
      if (o.id === id) {
        return {
          ...o,
          status,
          ...(partner !== undefined ? { assignedPartner: partner } : {}),
          ...(cost !== undefined ? { cost } : {})
        };
      }
      return o;
    });
    persistOrders(updated);
    showToast('تم تحديث حالة طلب الخدمة');
  };

  const deleteServiceOrder = (id: string) => {
    const updated = serviceOrders.filter((o) => o.id !== id);
    persistOrders(updated);
    showToast('تم حذف طلب الخدمة');
  };

  // Reports & Moderation State
  const [reports, setReports] = useState<ReportItem[]>(() => {
    try {
      const saved = localStorage.getItem('souq-reports');
      return saved ? JSON.parse(saved) : INITIAL_REPORTS;
    } catch {
      return INITIAL_REPORTS;
    }
  });

  const persistReports = (updated: ReportItem[]) => {
    setReports(updated);
    try {
      localStorage.setItem('souq-reports', JSON.stringify(updated));
    } catch {}
  };

  const addReport = (report: Omit<ReportItem, 'id' | 'date' | 'status'>) => {
    const newReport: ReportItem = {
      ...report,
      id: `REP-${Math.floor(100 + Math.random() * 900)}`,
      status: 'pending',
      date: Date.now()
    };
    const updated = [newReport, ...reports];
    persistReports(updated);
    showToast('تم إرسال بلاغك لإدارة السوق للمراجعة الفورية');
  };

  const resolveReport = (id: string, action: 'dismiss' | 'delete_ad' | 'resolve', note?: string) => {
    const target = reports.find((r) => r.id === id);
    if (!target) return;

    if (action === 'delete_ad' && target.adId) {
      deleteListing(target.adId);
    }

    const updated = reports.map((r) => {
      if (r.id === id) {
        return {
          ...r,
          status: action === 'dismiss' ? ('dismissed' as const) : ('resolved' as const),
          actionTaken:
            note ||
            (action === 'delete_ad'
              ? 'تم حذف الإعلان المخالف من المنصة'
              : action === 'dismiss'
              ? 'تم حفظ البلاغ بعد التحقق لعدم وجود مخالفة'
              : 'تمت معالجة الشكوى والتواصل مع الأطراف')
        };
      }
      return r;
    });
    persistReports(updated);
    showToast(action === 'dismiss' ? 'تم رفض البلاغ وحفظه' : 'تم حل البلاغ واتخاذ الإجراء اللازم');
  };

  const deleteReport = (id: string) => {
    const updated = reports.filter((r) => r.id !== id);
    persistReports(updated);
    showToast('تم حذف سجل البلاغ');
  };

  // Site Settings State
  const [settings, setSettings] = useState<SiteSettings>(() => {
    try {
      const saved = localStorage.getItem('souq-settings');
      return saved ? { ...DEFAULT_SITE_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SITE_SETTINGS;
    } catch {
      return DEFAULT_SITE_SETTINGS;
    }
  });

  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings((prev) => {
      const merged = { ...prev, ...newSettings };
      try {
        localStorage.setItem('souq-settings', JSON.stringify(merged));
      } catch {}
      return merged;
    });
    showToast('تم حفظ إعدادات المنصة بنجاح');
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SITE_SETTINGS);
    try {
      localStorage.setItem('souq-settings', JSON.stringify(DEFAULT_SITE_SETTINGS));
    } catch {}
    showToast('تمت استعادة الإعدادات الافتراضية');
  };

  // Favorites
  const [favorites, setFavorites] = useState<number[]>(() => {
    try {
      const s = localStorage.getItem('souq-favs');
      return s ? JSON.parse(s) : [];
    } catch {
      return [];
    }
  });

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => {
      const exists = prev.includes(id);
      const updated = exists ? prev.filter((x) => x !== id) : [...prev, id];
      try {
        localStorage.setItem('souq-favs', JSON.stringify(updated));
      } catch {}
      showToast(exists ? 'أُزيل من المفضلة' : 'أُضيف إلى المفضلة ❤️');
      return updated;
    });
  };

  const clearFavorites = () => {
    setFavorites([]);
    try {
      localStorage.setItem('souq-favs', JSON.stringify([]));
    } catch {}
    showToast('تم مسح المفضلة');
  };

  // Compare
  const [compareList, setCompareList] = useState<number[]>(() => {
    try {
      const s = localStorage.getItem('souq-cmp');
      return s ? JSON.parse(s) : [];
    } catch {
      return [];
    }
  });

  const toggleCompare = (id: number) => {
    setCompareList((prev) => {
      if (prev.includes(id)) {
        const updated = prev.filter((x) => x !== id);
        try {
          localStorage.setItem('souq-cmp', JSON.stringify(updated));
        } catch {}
        return updated;
      }
      if (prev.length >= 3) {
        showToast('يمكنك مقارنة 3 إعلانات كحد أقصى');
        return prev;
      }
      const updated = [...prev, id];
      try {
        localStorage.setItem('souq-cmp', JSON.stringify(updated));
      } catch {}
      showToast('أُضيف إلى المقارنة');
      return updated;
    });
  };

  const removeFromCompare = (id: number) => {
    setCompareList((prev) => {
      const updated = prev.filter((x) => x !== id);
      try {
        localStorage.setItem('souq-cmp', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const clearCompare = () => {
    setCompareList([]);
    try {
      localStorage.setItem('souq-cmp', JSON.stringify([]));
    } catch {}
  };

  // Checklist
  const [checklistState, setChecklistState] = useState<boolean[]>(() => {
    try {
      const s = localStorage.getItem('souq-chk');
      return s ? JSON.parse(s) : [];
    } catch {
      return [];
    }
  });

  const toggleChecklistItem = (index: number) => {
    setChecklistState((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      try {
        localStorage.setItem('souq-chk', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const resetChecklist = () => {
    setChecklistState([]);
    try {
      localStorage.setItem('souq-chk', JSON.stringify([]));
    } catch {}
    showToast('تمت إعادة ضبط قائمة الفحص');
  };

  // System Backup & Export / Import
  const exportAllData = (): string => {
    const backup = {
      version: '2.0',
      exportedAt: new Date().toISOString(),
      listings,
      breeders,
      priceIndex,
      serviceOrders,
      reports,
      settings
    };
    return JSON.stringify(backup, null, 2);
  };

  const importAllData = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.listings && Array.isArray(parsed.listings)) {
        persistListings(parsed.listings);
      }
      if (parsed.breeders && Array.isArray(parsed.breeders)) {
        persistBreeders(parsed.breeders);
      }
      if (parsed.priceIndex && Array.isArray(parsed.priceIndex)) {
        persistPriceIndex(parsed.priceIndex);
      }
      if (parsed.serviceOrders && Array.isArray(parsed.serviceOrders)) {
        persistOrders(parsed.serviceOrders);
      }
      if (parsed.reports && Array.isArray(parsed.reports)) {
        persistReports(parsed.reports);
      }
      if (parsed.settings && typeof parsed.settings === 'object') {
        updateSettings(parsed.settings);
      }
      showToast('تم استيراد النسخة الاحتياطية وتحديث بيانات المنصة بنجاح!');
      return true;
    } catch (e) {
      showToast('فشل في قراءة ملف النسخة الاحتياطية. تأكد من صحة تنسيق JSON');
      return false;
    }
  };

  const resetAllToFactoryDefaults = () => {
    persistListings(INITIAL_ADS);
    persistBreeders(INITIAL_BREEDERS);
    persistPriceIndex(PRICE_INDEX);
    persistOrders(INITIAL_SERVICE_ORDERS);
    persistReports(INITIAL_REPORTS);
    resetSettings();
    showToast('تمت إعادة تعيين جميع بيانات المنصة إلى الوضع الافتراضي الأصلي');
  };

  return (
    <AppContext.Provider
      value={{
        page,
        params,
        navigate,
        theme,
        toggleTheme,
        favorites,
        toggleFavorite,
        compareList,
        toggleCompare,
        removeFromCompare,
        clearCompare,
        clearFavorites,
        toastMessage,
        showToast,
        checklistState,
        toggleChecklistItem,
        resetChecklist,

        // Listings
        listings,
        addListing,
        addUserListing,
        updateListing,
        deleteListing,
        deleteUserListing,
        toggleVerifyListing,
        toggleFeatureListing,
        setListingStatus,

        // Breeders
        breeders,
        addBreeder,
        updateBreeder,
        deleteBreeder,

        // Prices
        priceIndex,
        updatePriceSeriesValue,
        addPriceSeries,
        resetPriceIndex,

        // Services
        serviceOrders,
        addServiceOrder,
        updateServiceOrderStatus,
        deleteServiceOrder,

        // Reports
        reports,
        addReport,
        resolveReport,
        deleteReport,

        // Settings
        settings,
        updateSettings,
        resetSettings,

        // Admin Auth
        isAdmin,
        loginAdmin,
        logoutAdmin,

        // Backup
        exportAllData,
        importAllData,
        resetAllToFactoryDefaults
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
