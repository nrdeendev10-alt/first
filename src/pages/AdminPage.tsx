import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Listing, Breeder, ServiceOrder, ReportItem, PriceSeries, Palette } from '../types';
import { REGIONS, MONTHS, PAL, sexLabel, fmt } from '../data/initialData';
import { AdImageTemplate } from '../components/AdImageTemplate';
import {
  LayoutDashboard,
  Layers,
  Users,
  Truck,
  TrendingUp,
  ShieldAlert,
  Settings,
  Plus,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  Star,
  Check,
  Trash2,
  Edit,
  ExternalLink,
  Phone,
  MessageCircle,
  Download,
  Upload,
  RefreshCw,
  Eye,
  DollarSign,
  MapPin,
  Tag,
  ShieldCheck,
  AlertTriangle,
  Lock,
  LogOut,
  Sliders,
  Filter
} from 'lucide-react';

export const AdminPage: React.FC = () => {
  const {
    isAdmin,
    loginAdmin,
    logoutAdmin,
    navigate,
    listings,
    addListing,
    updateListing,
    deleteListing,
    toggleVerifyListing,
    toggleFeatureListing,
    setListingStatus,
    breeders,
    addBreeder,
    updateBreeder,
    deleteBreeder,
    priceIndex,
    updatePriceSeriesValue,
    addPriceSeries,
    resetPriceIndex,
    serviceOrders,
    addServiceOrder,
    updateServiceOrderStatus,
    deleteServiceOrder,
    reports,
    resolveReport,
    deleteReport,
    settings,
    updateSettings,
    resetSettings,
    exportAllData,
    importAllData,
    resetAllToFactoryDefaults,
    showToast
  } = useApp();

  // Active Tab
  const [activeTab, setActiveTab] = useState<
    'overview' | 'listings' | 'breeders' | 'services' | 'prices' | 'reports' | 'settings'
  >('overview');

  // PIN modal state if not logged in
  const [pinInput, setPinInput] = useState('');

  // -------------------------
  // LISTINGS TAB STATE
  // -------------------------
  const [listingSearch, setListingSearch] = useState('');
  const [listingBreedFilter, setListingBreedFilter] = useState('');
  const [listingRegionFilter, setListingRegionFilter] = useState('');
  const [listingStatusFilter, setListingStatusFilter] = useState<'all' | 'verified' | 'featured' | 'user' | 'sold'>('all');
  const [editingAd, setEditingAd] = useState<Listing | null>(null);
  const [isAddingAd, setIsAddingAd] = useState(false);
  const [selectedAdIds, setSelectedAdIds] = useState<number[]>([]);

  // -------------------------
  // BREEDERS TAB STATE
  // -------------------------
  const [breederSearch, setBreederSearch] = useState('');
  const [breederRegionFilter, setBreederRegionFilter] = useState('');
  const [editingBreeder, setEditingBreeder] = useState<{ index: number; data: Breeder } | null>(null);
  const [isAddingBreeder, setIsAddingBreeder] = useState(false);

  // -------------------------
  // SERVICES TAB STATE
  // -------------------------
  const [serviceStatusFilter, setServiceStatusFilter] = useState<string>('all');
  const [serviceTypeFilter, setServiceTypeFilter] = useState<string>('all');
  const [isAddingServiceOrder, setIsAddingServiceOrder] = useState(false);

  // -------------------------
  // REPORTS TAB STATE
  // -------------------------
  const [reportStatusFilter, setReportStatusFilter] = useState<string>('all');

  // -------------------------
  // BACKUP / RESTORE
  // -------------------------
  const [importJsonText, setImportJsonText] = useState('');
  const [showImportModal, setShowImportModal] = useState(false);

  // If user is not logged in as Admin, show friendly unlock screen
  if (!isAdmin) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white dark:bg-[#122119] border border-gray-200 dark:border-white/10 rounded-3xl p-8 shadow-xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-[#0f4a36]/10 text-[#0f4a36] dark:text-[#58d39a] grid place-items-center mx-auto">
            <Lock className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white font-['Readex_Pro',sans-serif]">
              لوحة تحكم سوق الغنم
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
              هذه المنطقة مخصصة لإدارة المنصة والمشرفين. يمكنك الدخول السريع لمعاينة وتجربة كافة صلاحيات التحكم.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              loginAdmin(pinInput);
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5 text-right">
                رمز المرور (الافتراضي: 2026 أو 1234)
              </label>
              <input
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="أدخل رمز المرور أو اضغط دخول فوري"
                className="w-full px-4 py-3 text-center tracking-widest text-lg font-mono rounded-xl border border-gray-200 dark:border-white/15 bg-gray-50 dark:bg-white/5 focus:border-[#0f4a36] outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#0f4a36] hover:bg-[#145d44] text-white font-bold py-3.5 rounded-xl shadow-md transition-all cursor-pointer text-sm"
            >
              تسجيل الدخول للوحة التحكم
            </button>

            <button
              type="button"
              onClick={() => loginAdmin('2026')}
              className="w-full bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 text-[#0f4a36] dark:text-[#58d39a] font-bold py-2.5 rounded-xl border border-emerald-200 dark:border-emerald-800/40 text-xs transition-colors cursor-pointer"
            >
              دخول سريع بضغطة واحدة (مدير النظام) 🚀
            </button>
          </form>

          <button
            type="button"
            onClick={() => navigate('home')}
            className="text-xs text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 underline cursor-pointer"
          >
            ← العودة للتصفح في السوق كزائر
          </button>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // ANALYTICS & KPIS CALCULATIONS
  // ----------------------------------------------------
  const totalListingsCount = listings.length;
  const verifiedListingsCount = listings.filter((a) => a.v === 1).length;
  const featuredListingsCount = listings.filter((a) => a.fl === 1).length;
  const soldListingsCount = listings.filter((a) => a.status === 'sold').length;
  const totalBreederCount = breeders.length;
  const totalOrdersCount = serviceOrders.length;
  const pendingOrdersCount = serviceOrders.filter((o) => o.status === 'new').length;
  const pendingReportsCount = reports.filter((r) => r.status === 'pending').length;

  const totalMarketValuation = listings.reduce((acc, curr) => acc + (curr.price || 0), 0);
  const averageAdPrice = totalListingsCount > 0 ? Math.round(totalMarketValuation / totalListingsCount) : 0;

  // Breed Distribution
  const breedCounts = useMemo(() => {
    const map: Record<string, number> = {};
    listings.forEach((ad) => {
      const b = ad.type || 'أخرى';
      map[b] = (map[b] || 0) + 1;
    });
    return map;
  }, [listings]);

  // Region Distribution
  const regionCounts = useMemo(() => {
    const map: Record<string, number> = {};
    listings.forEach((ad) => {
      const r = ad.reg || 'أخرى';
      map[r] = (map[r] || 0) + 1;
    });
    return map;
  }, [listings]);

  // Filtered Listings
  const filteredListings = useMemo(() => {
    return listings.filter((ad) => {
      if (listingSearch) {
        const q = listingSearch.toLowerCase();
        const matchesTitle = ad.t.toLowerCase().includes(q);
        const matchesId = String(ad.id).includes(q);
        const matchesDesc = (ad.d || '').toLowerCase().includes(q);
        if (!matchesTitle && !matchesId && !matchesDesc) return false;
      }
      if (listingBreedFilter && ad.type !== listingBreedFilter) return false;
      if (listingRegionFilter && ad.reg !== listingRegionFilter) return false;
      if (listingStatusFilter === 'verified' && ad.v !== 1) return false;
      if (listingStatusFilter === 'featured' && ad.fl !== 1) return false;
      if (listingStatusFilter === 'user' && !ad.user) return false;
      if (listingStatusFilter === 'sold' && ad.status !== 'sold') return false;
      return true;
    });
  }, [listings, listingSearch, listingBreedFilter, listingRegionFilter, listingStatusFilter]);

  // Filtered Breeders
  const filteredBreeders = useMemo(() => {
    return breeders.filter((b) => {
      if (breederSearch) {
        const q = breederSearch.toLowerCase();
        const matchesName = b.n.toLowerCase().includes(q);
        const matchesDesc = (b.d || '').toLowerCase().includes(q);
        if (!matchesName && !matchesDesc) return false;
      }
      if (breederRegionFilter && b.r !== breederRegionFilter) return false;
      return true;
    });
  }, [breeders, breederSearch, breederRegionFilter]);

  // Filtered Orders
  const filteredOrders = useMemo(() => {
    return serviceOrders.filter((o) => {
      if (serviceStatusFilter !== 'all' && o.status !== serviceStatusFilter) return false;
      if (serviceTypeFilter !== 'all' && o.serviceType !== serviceTypeFilter) return false;
      return true;
    });
  }, [serviceOrders, serviceStatusFilter, serviceTypeFilter]);

  // Filtered Reports
  const filteredReports = useMemo(() => {
    return reports.filter((r) => {
      if (reportStatusFilter !== 'all' && r.status !== reportStatusFilter) return false;
      return true;
    });
  }, [reports, reportStatusFilter]);

  // Handle bulk actions
  const handleBulkVerify = () => {
    selectedAdIds.forEach((id) => updateListing(id, { v: 1 }));
    setSelectedAdIds([]);
    showToast(`تم توثيق ${selectedAdIds.length} إعلان بنجاح`);
  };

  const handleBulkFeature = () => {
    selectedAdIds.forEach((id) => updateListing(id, { fl: 1 }));
    setSelectedAdIds([]);
    showToast(`تم تمييز ${selectedAdIds.length} إعلان بنجاح`);
  };

  const handleBulkDelete = () => {
    if (window.confirm(`هل أنت متأكد من حذف ${selectedAdIds.length} إعلان نهائياً؟`)) {
      selectedAdIds.forEach((id) => deleteListing(id));
      setSelectedAdIds([]);
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Top Banner / Hero Admin Bar */}
      <div className="bg-[#0a3123] text-white border-b border-[#1c4b39] pt-6 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#58d39a]/20 border border-[#58d39a]/30 text-[#58d39a] grid place-items-center shrink-0">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black font-['Readex_Pro',sans-serif]">
                  لوحة التحكم الشاملة
                </h1>
                <span className="bg-[#58d39a] text-[#0a3123] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  مدير النظام
                </span>
              </div>
              <p className="text-xs sm:text-sm text-emerald-200/80 mt-1">
                التحكم الكامل في الإعلانات، المربين، الأسعار، الطلبات اللوجستية، والبلاغات في منصة سوق الغنم
              </p>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => navigate('home')}
              className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Eye className="w-4 h-4" />
              <span>معاينة السوق كزائر</span>
            </button>

            <button
              type="button"
              onClick={() => {
                const json = exportAllData();
                const blob = new Blob([json], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `souq-alghanam-backup-${new Date().toISOString().slice(0, 10)}.json`;
                a.click();
                showToast('تم تصدير النسخة الاحتياطية بنجاح 💾');
              }}
              className="bg-emerald-800/80 hover:bg-emerald-700 text-emerald-100 text-xs font-bold px-3.5 py-2 rounded-xl border border-emerald-600/40 transition-colors flex items-center gap-1.5 cursor-pointer"
              title="تصدير نسخة احتياطية كاملة"
            >
              <Download className="w-4 h-4" />
              <span>نسخة احتياطية</span>
            </button>

            <button
              type="button"
              onClick={logoutAdmin}
              className="bg-rose-900/60 hover:bg-rose-800 text-rose-200 text-xs font-bold px-3.5 py-2 rounded-xl border border-rose-700/50 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>خروج</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation Tabs Bar */}
        <div className="bg-white dark:bg-[#122119] border border-gray-200 dark:border-white/10 rounded-2xl p-1.5 shadow-sm overflow-x-auto no-scrollbar flex items-center gap-1 text-xs sm:text-sm font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-[#0f4a36] text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>نظرة عامة وإحصائيات</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('listings')}
            className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'listings'
                ? 'bg-[#0f4a36] text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>إدارة الإعلانات ({totalListingsCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('breeders')}
            className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'breeders'
                ? 'bg-[#0f4a36] text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>المربون والتجار ({totalBreederCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('services')}
            className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer relative ${
              activeTab === 'services'
                ? 'bg-[#0f4a36] text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>طلبات الخدمات ({totalOrdersCount})</span>
            {pendingOrdersCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('prices')}
            className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'prices'
                ? 'bg-[#0f4a36] text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>مؤشر الأسعار المباشر</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('reports')}
            className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer relative ${
              activeTab === 'reports'
                ? 'bg-[#0f4a36] text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>البلاغات والمراقبة ({reports.length})</span>
            {pendingReportsCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-rose-500 text-white text-[10px] font-black">
                {pendingReportsCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-[#0f4a36] text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>إعدادات المنصة</span>
          </button>
        </div>

        {/* ---------------------------------------------------- */}
        {/* TAB 1: OVERVIEW & ANALYTICS                          */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fade-in">
            {/* Top Stat KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-white dark:bg-[#122119] border border-gray-200/80 dark:border-white/10 rounded-2xl p-5 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-gray-500 dark:text-gray-400">
                  <span className="text-xs font-semibold">إجمالي الإعلانات</span>
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-[#0f4a36] dark:text-[#58d39a] grid place-items-center">
                    <Layers className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white font-['Readex_Pro',sans-serif]">
                  {totalListingsCount}
                </div>
                <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                  {verifiedListingsCount} موثقة • {featuredListingsCount} مميزة
                </div>
              </div>

              <div className="bg-white dark:bg-[#122119] border border-gray-200/80 dark:border-white/10 rounded-2xl p-5 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-gray-500 dark:text-gray-400">
                  <span className="text-xs font-semibold">المربون المعتمدون</span>
                  <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-[#b98425] grid place-items-center">
                    <Users className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white font-['Readex_Pro',sans-serif]">
                  {totalBreederCount}
                </div>
                <div className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">
                  في جميع مناطق المملكة
                </div>
              </div>

              <div className="bg-white dark:bg-[#122119] border border-gray-200/80 dark:border-white/10 rounded-2xl p-5 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-gray-500 dark:text-gray-400">
                  <span className="text-xs font-semibold">طلبات النقل والخدمات</span>
                  <div className="w-8 h-8 rounded-xl bg-sky-100 dark:bg-sky-950/60 text-sky-600 grid place-items-center">
                    <Truck className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white font-['Readex_Pro',sans-serif]">
                  {totalOrdersCount}
                </div>
                <div className="text-[11px] text-amber-600 dark:text-amber-400 font-medium">
                  {pendingOrdersCount} طلب جديد بانتظار التعيين
                </div>
              </div>

              <div className="bg-white dark:bg-[#122119] border border-gray-200/80 dark:border-white/10 rounded-2xl p-5 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-gray-500 dark:text-gray-400">
                  <span className="text-xs font-semibold">القيمة المعروضة التقديرية</span>
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-[#0f4a36] dark:text-[#58d39a] grid place-items-center">
                    <DollarSign className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-[#0f4a36] dark:text-[#58d39a] font-['Readex_Pro',sans-serif]">
                  {fmt(totalMarketValuation)} <span className="text-xs font-normal text-gray-400">ر.س</span>
                </div>
                <div className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">
                  متوسط الرأس ~{fmt(averageAdPrice)} ر.س
                </div>
              </div>
            </div>

            {/* Visual Analytics Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Breed Distribution Bar Chart */}
              <div className="bg-white dark:bg-[#122119] border border-gray-200/80 dark:border-white/10 rounded-3xl p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base flex items-center gap-2">
                    <Tag className="w-4 h-4 text-[#0f4a36] dark:text-[#58d39a]" />
                    <span>توزيع الإعلانات حسب السلالة</span>
                  </h3>
                  <span className="text-xs text-gray-400 font-medium">محدّث لحظياً</span>
                </div>

                <div className="space-y-3 pt-2">
                  {Object.entries(breedCounts).map(([breed, count]) => {
                    const pct = Math.round((count / totalListingsCount) * 100);
                    return (
                      <div key={breed} className="space-y-1">
                        <div className="flex justify-between text-xs font-bold text-gray-700 dark:text-gray-300">
                          <span>{breed}</span>
                          <span className="text-gray-500">{count} رأس ({pct}%)</span>
                        </div>
                        <div className="w-full h-2.5 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#0f4a36] to-[#58d39a] rounded-full transition-all duration-500"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Region Distribution */}
              <div className="bg-white dark:bg-[#122119] border border-gray-200/80 dark:border-white/10 rounded-3xl p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-amber-500" />
                    <span>توزيع الإعلانات حسب المناطق</span>
                  </h3>
                  <span className="text-xs text-gray-400 font-medium">تغطية المملكة</span>
                </div>

                <div className="space-y-3 pt-2">
                  {Object.entries(regionCounts).slice(0, 5).map(([reg, count]) => {
                    const pct = Math.round((count / totalListingsCount) * 100);
                    return (
                      <div key={reg} className="space-y-1">
                        <div className="flex justify-between text-xs font-bold text-gray-700 dark:text-gray-300">
                          <span>{reg}</span>
                          <span className="text-gray-500">{count} إعلان ({pct}%)</span>
                        </div>
                        <div className="w-full h-2.5 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-amber-600 to-amber-400 rounded-full transition-all duration-500"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Quick Actions Shortcuts Grid */}
            <div className="bg-gradient-to-br from-[#0f4a36]/10 via-transparent to-amber-500/10 border border-[#0f4a36]/20 rounded-3xl p-6 space-y-4">
              <h3 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base">
                إجراءات سريعة لإدارة المنصة
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('listings');
                    setIsAddingAd(true);
                  }}
                  className="p-4 bg-white dark:bg-[#122119] border border-gray-200/80 dark:border-white/10 rounded-2xl hover:border-[#0f4a36] text-right shadow-sm transition-all cursor-pointer group"
                >
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-[#0f4a36] dark:text-[#58d39a] grid place-items-center mb-2 group-hover:scale-110 transition-transform">
                    <Plus className="w-5 h-5" />
                  </div>
                  <b className="block text-xs sm:text-sm text-gray-900 dark:text-white font-bold">إضافة إعلان جديد</b>
                  <small className="text-[11px] text-gray-400">نشر رأس مواشي بالمنصة</small>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('breeders');
                    setIsAddingBreeder(true);
                  }}
                  className="p-4 bg-white dark:bg-[#122119] border border-gray-200/80 dark:border-white/10 rounded-2xl hover:border-amber-500 text-right shadow-sm transition-all cursor-pointer group"
                >
                  <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-[#b98425] grid place-items-center mb-2 group-hover:scale-110 transition-transform">
                    <Users className="w-5 h-5" />
                  </div>
                  <b className="block text-xs sm:text-sm text-gray-900 dark:text-white font-bold">تسجيل مربٍ معتمد</b>
                  <small className="text-[11px] text-gray-400">إضافة مزرعة أو تاجر</small>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('prices')}
                  className="p-4 bg-white dark:bg-[#122119] border border-gray-200/80 dark:border-white/10 rounded-2xl hover:border-sky-500 text-right shadow-sm transition-all cursor-pointer group"
                >
                  <div className="w-9 h-9 rounded-xl bg-sky-100 dark:bg-sky-950/60 text-sky-600 grid place-items-center mb-2 group-hover:scale-110 transition-transform">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <b className="block text-xs sm:text-sm text-gray-900 dark:text-white font-bold">تحديث مؤشر الأسعار</b>
                  <small className="text-[11px] text-gray-400">تعديل متوسطات السوق</small>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('services')}
                  className="p-4 bg-white dark:bg-[#122119] border border-gray-200/80 dark:border-white/10 rounded-2xl hover:border-purple-500 text-right shadow-sm transition-all cursor-pointer group"
                >
                  <div className="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 grid place-items-center mb-2 group-hover:scale-110 transition-transform">
                    <Truck className="w-5 h-5" />
                  </div>
                  <b className="block text-xs sm:text-sm text-gray-900 dark:text-white font-bold">معالجة طلبات النقل</b>
                  <small className="text-[11px] text-gray-400">إسناد الطلبات للناقلين</small>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* TAB 2: LISTINGS MANAGEMENT                          */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'listings' && (
          <div className="space-y-6 animate-fade-in">
            {/* Header + Action Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-gray-900 dark:text-white font-['Readex_Pro',sans-serif]">
                  إدارة الإعلانات والمواشي المعروضة
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  تعديل، توثيق، تمييز، أو حذف أي إعلان منشور على المنصة فورياً
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsAddingAd(true)}
                className="bg-[#0f4a36] hover:bg-[#156047] text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة إعلان كمدير</span>
              </button>
            </div>

            {/* Filter controls */}
            <div className="bg-white dark:bg-[#122119] border border-gray-200 dark:border-white/10 rounded-2xl p-4 shadow-sm grid grid-cols-1 sm:grid-cols-4 gap-3">
              {/* Search input */}
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute right-3 top-3" />
                <input
                  type="text"
                  value={listingSearch}
                  onChange={(e) => setListingSearch(e.target.value)}
                  placeholder="بحث بالعنوان، رقم الإعلان، الوصف..."
                  className="w-full pl-3 pr-9 py-2 text-xs rounded-xl border border-gray-200 dark:border-white/15 bg-gray-50 dark:bg-white/5 outline-none"
                />
              </div>

              {/* Breed select */}
              <select
                value={listingBreedFilter}
                onChange={(e) => setListingBreedFilter(e.target.value)}
                className="px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-white/15 bg-gray-50 dark:bg-white/5 outline-none"
              >
                <option value="">جميع السلالات</option>
                <option value="نعيمي">نعيمي</option>
                <option value="حري">حري</option>
                <option value="نجدي">نجدي</option>
                <option value="سواكني">سواكني</option>
                <option value="ماعز">ماعز</option>
              </select>

              {/* Region select */}
              <select
                value={listingRegionFilter}
                onChange={(e) => setListingRegionFilter(e.target.value)}
                className="px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-white/15 bg-gray-50 dark:bg-white/5 outline-none"
              >
                <option value="">جميع المناطق</option>
                {REGIONS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>

              {/* Status select */}
              <select
                value={listingStatusFilter}
                onChange={(e) => setListingStatusFilter(e.target.value as any)}
                className="px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-white/15 bg-gray-50 dark:bg-white/5 outline-none"
              >
                <option value="all">كل الحالات</option>
                <option value="verified">الموثقة فقط ✓</option>
                <option value="featured">المميزة فقط ★</option>
                <option value="sold">تم بيعها</option>
                <option value="user">المضافة حديثاً</option>
              </select>
            </div>

            {/* Bulk Actions Bar if any selected */}
            {selectedAdIds.length > 0 && (
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 rounded-xl flex items-center justify-between gap-3 text-xs font-bold animate-slide-up">
                <span className="text-[#0f4a36] dark:text-[#58d39a]">
                  تم تحديد {selectedAdIds.length} إعلان
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleBulkVerify}
                    className="bg-[#0f4a36] text-white px-3 py-1.5 rounded-lg hover:bg-emerald-800 transition-colors cursor-pointer"
                  >
                    توثيق المحددة
                  </button>
                  <button
                    type="button"
                    onClick={handleBulkFeature}
                    className="bg-amber-600 text-white px-3 py-1.5 rounded-lg hover:bg-amber-700 transition-colors cursor-pointer"
                  >
                    تمييز المحددة
                  </button>
                  <button
                    type="button"
                    onClick={handleBulkDelete}
                    className="bg-rose-600 text-white px-3 py-1.5 rounded-lg hover:bg-rose-700 transition-colors cursor-pointer"
                  >
                    حذف المحددة
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedAdIds([])}
                    className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 px-2 py-1 cursor-pointer"
                  >
                    إلغاء التحديد
                  </button>
                </div>
              </div>
            )}

            {/* Listings Table */}
            <div className="bg-white dark:bg-[#122119] border border-gray-200 dark:border-white/10 rounded-2xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead className="bg-gray-50 dark:bg-white/5 border-b border-gray-200 dark:border-white/10 font-bold text-gray-700 dark:text-gray-300">
                    <tr>
                      <th className="p-3.5 w-10 text-center">
                        <input
                          type="checkbox"
                          checked={
                            filteredListings.length > 0 &&
                            selectedAdIds.length === filteredListings.length
                          }
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedAdIds(filteredListings.map((a) => a.id));
                            } else {
                              setSelectedAdIds([]);
                            }
                          }}
                          className="rounded text-[#0f4a36]"
                        />
                      </th>
                      <th className="p-3.5">المعاينة</th>
                      <th className="p-3.5">العنوان والرقم</th>
                      <th className="p-3.5">السلالة والتصنيف</th>
                      <th className="p-3.5">العمر والوزن</th>
                      <th className="p-3.5">السعر المطلوب</th>
                      <th className="p-3.5">المنطقة والمربي</th>
                      <th className="p-3.5 text-center">التوثيق والتميز</th>
                      <th className="p-3.5 text-center">الحالة</th>
                      <th className="p-3.5 text-center">إجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                    {filteredListings.length === 0 ? (
                      <tr>
                        <td colSpan={10} className="p-8 text-center text-gray-400">
                          لا توجد إعلانات مطابقة لمعايير البحث
                        </td>
                      </tr>
                    ) : (
                      filteredListings.map((ad) => {
                        const breeder = breeders[ad.b] || breeders[0];
                        const isSelected = selectedAdIds.includes(ad.id);
                        return (
                          <tr
                            key={ad.id}
                            className={`hover:bg-gray-50/80 dark:hover:bg-white/[0.02] transition-colors ${
                              isSelected ? 'bg-emerald-50/50 dark:bg-emerald-950/20' : ''
                            }`}
                          >
                            <td className="p-3.5 text-center">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedAdIds([...selectedAdIds, ad.id]);
                                  } else {
                                    setSelectedAdIds(selectedAdIds.filter((id) => id !== ad.id));
                                  }
                                }}
                                className="rounded text-[#0f4a36]"
                              />
                            </td>

                            {/* Thumbnail */}
                            <td className="p-3.5 w-24">
                              <div className="w-20 h-14 rounded-lg overflow-hidden border border-gray-200 dark:border-white/10 shrink-0">
                                <AdImageTemplate listing={ad} compact={true} />
                              </div>
                            </td>

                            {/* Title & ID */}
                            <td className="p-3.5 max-w-xs">
                              <b className="block font-bold text-gray-900 dark:text-white line-clamp-1">
                                {ad.t}
                              </b>
                              <span className="text-[11px] text-gray-400 font-mono">
                                #{ad.id}
                              </span>
                            </td>

                            {/* Breed & Category */}
                            <td className="p-3.5">
                              <span className="px-2 py-0.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-[#0f4a36] dark:text-[#58d39a] font-bold">
                                {ad.type}
                              </span>
                              <span className="block text-[11px] text-gray-500 mt-0.5">
                                {sexLabel(ad)}
                              </span>
                            </td>

                            {/* Age & Weight */}
                            <td className="p-3.5 whitespace-nowrap">
                              <span className="block">{ad.age} شهر</span>
                              <span className="text-gray-500 text-[11px] font-bold">
                                {ad.kg} كجم
                              </span>
                            </td>

                            {/* Price */}
                            <td className="p-3.5 whitespace-nowrap">
                              <b className="font-['Readex_Pro',sans-serif] text-sm font-extrabold text-[#0f4a36] dark:text-[#58d39a]">
                                {fmt(ad.price)}
                              </b>
                              <span className="text-[10px] text-gray-400 mr-1">ر.س</span>
                            </td>

                            {/* Region & Breeder */}
                            <td className="p-3.5 whitespace-nowrap">
                              <span className="block font-semibold">{ad.reg}</span>
                              <span className="text-[11px] text-gray-400">{breeder.n}</span>
                            </td>

                            {/* Badges toggles */}
                            <td className="p-3.5 text-center whitespace-nowrap">
                              <div className="inline-flex items-center gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => toggleVerifyListing(ad.id)}
                                  className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                                    ad.v === 1
                                      ? 'bg-emerald-500 text-white border-emerald-600'
                                      : 'bg-gray-100 dark:bg-white/10 text-gray-400 border-gray-200'
                                  }`}
                                  title={ad.v === 1 ? 'إلغاء التوثيق' : 'توثيق الإعلان'}
                                >
                                  <Check className="w-3.5 h-3.5" />
                                </button>

                                <button
                                  type="button"
                                  onClick={() => toggleFeatureListing(ad.id)}
                                  className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                                    ad.fl === 1
                                      ? 'bg-amber-500 text-white border-amber-600'
                                      : 'bg-gray-100 dark:bg-white/10 text-gray-400 border-gray-200'
                                  }`}
                                  title={ad.fl === 1 ? 'إلغاء التمييز' : 'تمييز الإعلان'}
                                >
                                  <Star className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>

                            {/* Status */}
                            <td className="p-3.5 text-center whitespace-nowrap">
                              <button
                                type="button"
                                onClick={() => {
                                  const nextStatus =
                                    ad.status === 'sold'
                                      ? 'active'
                                      : ad.status === 'pending'
                                      ? 'active'
                                      : 'sold';
                                  setListingStatus(ad.id, nextStatus);
                                }}
                                className={`px-2.5 py-1 rounded-full text-[10px] font-black cursor-pointer transition-colors ${
                                  ad.status === 'sold'
                                    ? 'bg-gray-200 dark:bg-white/15 text-gray-700 dark:text-gray-300'
                                    : 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300'
                                }`}
                                title="اضغط لتغيير الحالة"
                              >
                                {ad.status === 'sold' ? 'تم البيع' : 'نشط بالسوق'}
                              </button>
                            </td>

                            {/* Actions */}
                            <td className="p-3.5 text-center whitespace-nowrap">
                              <div className="inline-flex items-center gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => navigate('ad', { id: ad.id })}
                                  className="p-1.5 rounded-lg bg-gray-100 dark:bg-white/10 hover:bg-emerald-100 dark:hover:bg-emerald-950/60 text-gray-600 dark:text-gray-300 hover:text-[#0f4a36] transition-colors cursor-pointer"
                                  title="معاينة في صفحة الإعلان"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </button>

                                <button
                                  type="button"
                                  onClick={() => setEditingAd(ad)}
                                  className="p-1.5 rounded-lg bg-gray-100 dark:bg-white/10 hover:bg-amber-100 dark:hover:bg-amber-950/60 text-gray-600 dark:text-gray-300 hover:text-amber-700 transition-colors cursor-pointer"
                                  title="تعديل الإعلان"
                                >
                                  <Edit className="w-3.5 h-3.5" />
                                </button>

                                <button
                                  type="button"
                                  onClick={() => {
                                    if (window.confirm(`هل أنت متأكد من حذف الإعلان #${ad.id} نهائياً؟`)) {
                                      deleteListing(ad.id);
                                    }
                                  }}
                                  className="p-1.5 rounded-lg bg-gray-100 dark:bg-white/10 hover:bg-rose-100 dark:hover:bg-rose-950/60 text-gray-600 dark:text-gray-300 hover:text-rose-600 transition-colors cursor-pointer"
                                  title="حذف الإعلان"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* TAB 3: BREEDERS & MERCHANTS                          */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'breeders' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-gray-900 dark:text-white font-['Readex_Pro',sans-serif]">
                  إدارة المربين ومزارع الإنتاج المعتمدة
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  تحديث سجلات المزارع، توثيق الحسابات، وإضافة مربين جدد لدليل المنصة
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsAddingBreeder(true)}
                className="bg-[#0f4a36] hover:bg-[#156047] text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة مربٍّ جديد</span>
              </button>
            </div>

            {/* Filter */}
            <div className="bg-white dark:bg-[#122119] border border-gray-200 dark:border-white/10 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-gray-400 absolute right-3 top-3" />
                <input
                  type="text"
                  value={breederSearch}
                  onChange={(e) => setBreederSearch(e.target.value)}
                  placeholder="بحث باسم المربي، المزرعة، أو الوصف..."
                  className="w-full pl-3 pr-9 py-2 text-xs rounded-xl border border-gray-200 dark:border-white/15 bg-gray-50 dark:bg-white/5 outline-none"
                />
              </div>

              <select
                value={breederRegionFilter}
                onChange={(e) => setBreederRegionFilter(e.target.value)}
                className="px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-white/15 bg-gray-50 dark:bg-white/5 outline-none sm:w-48"
              >
                <option value="">جميع المناطق</option>
                {REGIONS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            {/* Breeders Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBreeders.map((b, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-[#122119] border border-gray-200/80 dark:border-white/10 rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-4 hover:border-emerald-500/50 transition-colors"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span
                          className="w-12 h-12 rounded-2xl text-white font-bold grid place-items-center text-lg shadow-sm"
                          style={{ backgroundColor: b.c || '#0f4a36' }}
                        >
                          {b.n.slice(0, 2)}
                        </span>
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-white text-base">
                            {b.n}
                          </h4>
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                            <span>{b.r}</span>
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 px-2.5 py-1 rounded-xl text-xs font-bold border border-amber-200 dark:border-amber-800/40">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{b.rt.toFixed(1)}</span>
                      </div>
                    </div>

                    <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed min-h-[36px]">
                      {b.d || 'مربي مواشي معتمد ومسجل بسوق الغنم.'}
                    </p>

                    <div className="grid grid-cols-2 gap-2 text-center text-xs">
                      <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                        <small className="block text-gray-400 text-[10px]">عدد الإعلانات</small>
                        <b className="font-bold text-gray-800 dark:text-gray-200">{b.ads} رأس</b>
                      </div>
                      <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                        <small className="block text-gray-400 text-[10px]">سنوات الخبرة</small>
                        <b className="font-bold text-gray-800 dark:text-gray-200">{b.yrs} سنة</b>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-100 dark:border-white/10 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => navigate('listings', { breeder: b.n })}
                      className="text-xs font-bold text-[#0f4a36] dark:text-[#58d39a] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>عرض الإعلانات</span>
                    </button>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setEditingBreeder({ index: idx, data: { ...b } })}
                        className="p-2 rounded-xl bg-gray-100 dark:bg-white/10 hover:bg-amber-100 text-gray-600 hover:text-amber-700 transition-colors cursor-pointer"
                        title="تعديل المربي"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm(`هل أنت متأكد من حذف ${b.n}؟`)) {
                            deleteBreeder(idx);
                          }
                        }}
                        className="p-2 rounded-xl bg-gray-100 dark:bg-white/10 hover:bg-rose-100 text-gray-600 hover:text-rose-600 transition-colors cursor-pointer"
                        title="حذف المربي"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* TAB 4: SERVICE ORDERS MANAGEMENT                    */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'services' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-gray-900 dark:text-white font-['Readex_Pro',sans-serif]">
                  طلبات النقل، الأعلاف، والخدمات البيطرية
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  إدارة طلبات المشترين بعد الشراء وتعيين الشركاء المعتمدين والمتابعة
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsAddingServiceOrder(true)}
                className="bg-[#0f4a36] hover:bg-[#156047] text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة طلب خدمة يدوي</span>
              </button>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-[#122119] border border-gray-200 dark:border-white/10 rounded-2xl p-4 shadow-sm flex flex-wrap items-center gap-3">
              <span className="text-xs font-bold text-gray-600 dark:text-gray-300">تصفية حسب:</span>

              <select
                value={serviceStatusFilter}
                onChange={(e) => setServiceStatusFilter(e.target.value)}
                className="px-3 py-1.5 text-xs rounded-xl border border-gray-200 dark:border-white/15 bg-gray-50 dark:bg-white/5 outline-none"
              >
                <option value="all">جميع الحالات</option>
                <option value="new">جديد بانتظار الشريك</option>
                <option value="in_progress">قيد التنفيذ</option>
                <option value="completed">مكتمل</option>
                <option value="cancelled">ملغي</option>
              </select>

              <select
                value={serviceTypeFilter}
                onChange={(e) => setServiceTypeFilter(e.target.value)}
                className="px-3 py-1.5 text-xs rounded-xl border border-gray-200 dark:border-white/15 bg-gray-50 dark:bg-white/5 outline-none"
              >
                <option value="all">جميع أنواع الخدمات</option>
                <option value="نقل المواشي">نقل المواشي</option>
                <option value="الأعلاف والمستلزمات">الأعلاف والمستلزمات</option>
                <option value="فحص ورعاية بيطرية">فحص ورعاية بيطرية</option>
              </select>
            </div>

            {/* Orders list */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredOrders.length === 0 ? (
                <div className="col-span-2 p-12 text-center bg-white dark:bg-[#122119] border border-gray-200 dark:border-white/10 rounded-3xl text-gray-400">
                  لا توجد طلبات خدمة مطابقة لمعايير البحث
                </div>
              ) : (
                filteredOrders.map((order) => {
                  const statusColors = {
                    new: 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border-amber-200',
                    in_progress: 'bg-sky-100 text-sky-800 dark:bg-sky-950/80 dark:text-sky-300 border-sky-200',
                    completed: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-200',
                    cancelled: 'bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300 border-rose-200'
                  };

                  const statusLabels = {
                    new: 'جديد',
                    in_progress: 'قيد التنفيذ',
                    completed: 'مكتمل بنجاح',
                    cancelled: 'ملغي'
                  };

                  return (
                    <div
                      key={order.id}
                      className="bg-white dark:bg-[#122119] border border-gray-200/80 dark:border-white/10 rounded-3xl p-5 shadow-sm space-y-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-gray-500">
                              #{order.id}
                            </span>
                            <span className="font-bold text-sm text-gray-900 dark:text-white">
                              {order.serviceType}
                            </span>
                          </div>
                          <span className="text-[11px] text-gray-400 block mt-0.5">
                            {new Date(order.date).toLocaleString('ar-SA')} • {order.region}
                          </span>
                        </div>

                        <span
                          className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                            statusColors[order.status]
                          }`}
                        >
                          {statusLabels[order.status]}
                        </span>
                      </div>

                      {/* Customer info */}
                      <div className="p-3 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 space-y-2 text-xs">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-500">صاحب الطلب:</span>
                          <b className="text-gray-900 dark:text-white">{order.fullName}</b>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-500">رقم الجوال:</span>
                          <b className="font-mono dir-ltr">{order.phone}</b>
                        </div>
                        {order.notes && (
                          <div className="pt-1 border-t border-gray-200/50 dark:border-white/5">
                            <span className="text-gray-400 block text-[11px] mb-0.5">تفاصيل وملاحظات:</span>
                            <p className="text-gray-700 dark:text-gray-300 text-xs leading-relaxed">
                              {order.notes}
                            </p>
                          </div>
                        )}
                        {order.assignedPartner && (
                          <div className="flex justify-between items-center text-emerald-600 dark:text-emerald-400 pt-1">
                            <span>الشريك المعتمد:</span>
                            <b>{order.assignedPartner}</b>
                          </div>
                        )}
                        {order.cost && (
                          <div className="flex justify-between items-center text-gray-700 dark:text-gray-300">
                            <span>التكلفة المقدرة:</span>
                            <b className="font-['Readex_Pro',sans-serif]">{order.cost} ر.س</b>
                          </div>
                        )}
                      </div>

                      {/* Order Controls */}
                      <div className="pt-2 flex flex-wrap items-center justify-between gap-2">
                        {/* Direct contact buttons */}
                        <div className="flex items-center gap-1.5">
                          <a
                            href={`tel:${order.phone}`}
                            className="p-2 rounded-xl bg-emerald-50 text-[#0f4a36] hover:bg-emerald-100 transition-colors"
                            title="اتصال هاتفي"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>
                          <a
                            href={`https://wa.me/966${order.phone.replace(/^0/, '')}`}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 rounded-xl bg-green-50 text-green-700 hover:bg-green-100 transition-colors"
                            title="محادثة واتساب"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                          </a>
                        </div>

                        {/* Status change buttons */}
                        <div className="flex items-center gap-1">
                          {order.status === 'new' && (
                            <button
                              type="button"
                              onClick={() => updateServiceOrderStatus(order.id, 'in_progress')}
                              className="text-[11px] font-bold px-2.5 py-1.5 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors cursor-pointer"
                            >
                              بدء التنفيذ
                            </button>
                          )}
                          {order.status === 'in_progress' && (
                            <button
                              type="button"
                              onClick={() => updateServiceOrderStatus(order.id, 'completed')}
                              className="text-[11px] font-bold px-2.5 py-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer"
                            >
                              إتمام الطلب ✓
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => {
                              if (window.confirm('هل أنت متأكد من حذف هذا الطلب؟')) {
                                deleteServiceOrder(order.id);
                              }
                            }}
                            className="p-1.5 text-gray-400 hover:text-rose-600 transition-colors cursor-pointer"
                            title="حذف الطلب"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* TAB 5: PRICE INDEX CONTROL                          */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'prices' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-gray-900 dark:text-white font-['Readex_Pro',sans-serif]">
                  مؤشر ومحدد أسعار السوق الحية
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  تعديل سجلات الأسعار وتحديث متوسطات السلالات — التعديل هنا ينعكس فورياً في صفحة مؤشر الأسعار ومقارنة الإعلانات!
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={resetPriceIndex}
                  className="bg-gray-100 dark:bg-white/10 hover:bg-gray-200 text-gray-700 dark:text-gray-200 text-xs font-bold px-3 py-2 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>استعادة المؤشر الافتراضي</span>
                </button>
              </div>
            </div>

            {/* Price Index Table with Editable Inputs */}
            <div className="bg-white dark:bg-[#122119] border border-gray-200 dark:border-white/10 rounded-2xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead className="bg-gray-50 dark:bg-white/5 border-b border-gray-200 dark:border-white/10 font-bold text-gray-700 dark:text-gray-300">
                    <tr>
                      <th className="p-3.5">السلالة</th>
                      <th className="p-3.5">الوزن المرجعي</th>
                      {MONTHS.map((m) => (
                        <th key={m} className="p-3.5 text-center">
                          {m}
                        </th>
                      ))}
                      <th className="p-3.5 text-center">المتوسط الحالي</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                    {priceIndex.map((series) => {
                      const latestPrice = series.v[series.v.length - 1];
                      const avg = Math.round(series.v.reduce((a, b) => a + b, 0) / series.v.length);
                      return (
                        <tr key={series.k} className="hover:bg-gray-50/50 dark:hover:bg-white/[0.02]">
                          <td className="p-3.5 font-bold text-gray-900 dark:text-white">
                            <span className="text-base">{series.k}</span>
                          </td>
                          <td className="p-3.5 text-gray-500 font-medium whitespace-nowrap">
                            ~{series.kg} كجم
                          </td>
                          {series.v.map((val, mIdx) => (
                            <td key={mIdx} className="p-2 text-center">
                              <input
                                type="number"
                                value={val}
                                onChange={(e) =>
                                  updatePriceSeriesValue(series.k, mIdx, Number(e.target.value))
                                }
                                className="w-20 px-2 py-1 text-center font-mono text-xs rounded-lg border border-gray-200 dark:border-white/15 bg-gray-50 dark:bg-white/5 focus:border-[#0f4a36] outline-none"
                              />
                            </td>
                          ))}
                          <td className="p-3.5 text-center whitespace-nowrap">
                            <b className="font-['Readex_Pro',sans-serif] text-sm text-[#0f4a36] dark:text-[#58d39a] font-bold">
                              {fmt(avg)} ر.س
                            </b>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Preview Callout */}
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-900/10 flex items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="text-emerald-950 dark:text-emerald-200 font-medium">
                  التغييرات تُحفظ تلقائياً في التخزين وتنعكس مباشرة على الرسم البياني التفاعلي للمشترين.
                </span>
              </div>
              <button
                type="button"
                onClick={() => navigate('prices')}
                className="font-bold text-[#0f4a36] dark:text-[#58d39a] hover:underline shrink-0"
              >
                معاينة صفحة مؤشر الأسعار ←
              </button>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* TAB 6: REPORTS & MODERATION                         */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'reports' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-gray-900 dark:text-white font-['Readex_Pro',sans-serif]">
                  البلاغات والشكاوى وحماية المستهلك
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  مراجعة شكاوى المشترين حول الإعلانات المخالفة أو الأسعار غير الدقيقة واتخاذ الإجراءات الفورية
                </p>
              </div>

              <select
                value={reportStatusFilter}
                onChange={(e) => setReportStatusFilter(e.target.value)}
                className="px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-white/15 bg-white dark:bg-[#122119] outline-none"
              >
                <option value="all">جميع البلاغات ({reports.length})</option>
                <option value="pending">قيد المراجعة ({pendingReportsCount})</option>
                <option value="resolved">تمت المعالجة</option>
                <option value="dismissed">مرفوضة / محفوظة</option>
              </select>
            </div>

            {/* Reports List */}
            <div className="space-y-4">
              {filteredReports.length === 0 ? (
                <div className="p-12 text-center bg-white dark:bg-[#122119] border border-gray-200 dark:border-white/10 rounded-3xl text-gray-400">
                  لا توجد بلاغات مسجلة في هذا القسم
                </div>
              ) : (
                filteredReports.map((report) => (
                  <div
                    key={report.id}
                    className="bg-white dark:bg-[#122119] border border-gray-200/80 dark:border-white/10 rounded-3xl p-6 shadow-sm space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100 dark:border-white/10">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-rose-600 bg-rose-50 dark:bg-rose-950/60 px-2.5 py-0.5 rounded-md">
                            #{report.id}
                          </span>
                          <b className="text-sm font-bold text-gray-900 dark:text-white">
                            سبب البلاغ: {report.reason}
                          </b>
                        </div>
                        <span className="text-[11px] text-gray-400 block mt-1">
                          تاريخ البلاغ: {new Date(report.date).toLocaleString('ar-SA')}
                        </span>
                      </div>

                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full self-start sm:self-auto ${
                          report.status === 'pending'
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300'
                            : report.status === 'resolved'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300'
                            : 'bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-400'
                        }`}
                      >
                        {report.status === 'pending'
                          ? 'قيد الفحص والمراجعة'
                          : report.status === 'resolved'
                          ? 'تم اتخاذ الإجراء'
                          : 'بلاغ محفوظ'}
                      </span>
                    </div>

                    {/* Report details body */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="space-y-1.5 p-3 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                        <span className="text-gray-400 block text-[11px]">الإعلان المشكو في حقه:</span>
                        <div className="flex items-center justify-between">
                          <b className="text-gray-900 dark:text-white">
                            {report.adTitle || `إعلان رقم #${report.adId}`}
                          </b>
                          {report.adId && (
                            <button
                              type="button"
                              onClick={() => navigate('ad', { id: report.adId })}
                              className="text-emerald-700 dark:text-emerald-400 font-bold hover:underline flex items-center gap-1"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              <span>معاينة</span>
                            </button>
                          )}
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 pt-2 border-t border-gray-200/40 dark:border-white/5">
                          {report.details}
                        </p>
                      </div>

                      <div className="space-y-1.5 p-3 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                        <span className="text-gray-400 block text-[11px]">مقدم البلاغ:</span>
                        <div className="flex justify-between items-center">
                          <b className="text-gray-900 dark:text-white">{report.reporterName}</b>
                          <a
                            href={`tel:${report.reporterPhone}`}
                            className="font-mono text-emerald-600 hover:underline"
                          >
                            {report.reporterPhone}
                          </a>
                        </div>
                        {report.actionTaken && (
                          <div className="pt-2 border-t border-gray-200/40 dark:border-white/5 text-emerald-700 dark:text-emerald-400 font-semibold">
                            الإجراء المتخذ: {report.actionTaken}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    {report.status === 'pending' && (
                      <div className="pt-2 flex flex-wrap items-center gap-2">
                        {report.adId && (
                          <button
                            type="button"
                            onClick={() => resolveReport(report.id, 'delete_ad')}
                            className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors cursor-pointer"
                          >
                            حذف الإعلان المخالف فوراً
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => resolveReport(report.id, 'resolve')}
                          className="bg-[#0f4a36] hover:bg-[#145d44] text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors cursor-pointer"
                        >
                          تحديد كـ "تمت المعالجة" ✓
                        </button>
                        <button
                          type="button"
                          onClick={() => resolveReport(report.id, 'dismiss')}
                          className="bg-gray-100 dark:bg-white/10 hover:bg-gray-200 text-gray-700 dark:text-gray-300 text-xs font-bold px-3 py-2 rounded-xl transition-colors cursor-pointer"
                        >
                          حفظ وتجاهل (لا توجد مخالفة)
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* TAB 7: SETTINGS & BACKUP                            */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'settings' && (
          <div className="space-y-8 animate-fade-in">
            <div>
              <h2 className="text-xl font-black text-gray-900 dark:text-white font-['Readex_Pro',sans-serif]">
                إعدادات المنصة والنسخ الاحتياطي
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                تخصيص بيانات المتجر، شريط التنبيهات، هاتف الدعم، والنسخ الاحتياطي الكامل
              </p>
            </div>

            {/* General Settings Form */}
            <div className="bg-white dark:bg-[#122119] border border-gray-200 dark:border-white/10 rounded-3xl p-6 shadow-sm space-y-6">
              <h3 className="font-bold text-gray-900 dark:text-white text-base">
                البيانات الأساسية ومعلومات التواصل
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                    اسم المنصة
                  </label>
                  <input
                    type="text"
                    value={settings.siteName}
                    onChange={(e) => updateSettings({ siteName: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-200 dark:border-white/15 bg-gray-50 dark:bg-white/5 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                    الشعار اللفظي (Slogan)
                  </label>
                  <input
                    type="text"
                    value={settings.siteSlogan}
                    onChange={(e) => updateSettings({ siteSlogan: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-200 dark:border-white/15 bg-gray-50 dark:bg-white/5 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                    رقم الدعم الموحد
                  </label>
                  <input
                    type="text"
                    value={settings.supportPhone}
                    onChange={(e) => updateSettings({ supportPhone: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs font-mono rounded-xl border border-gray-200 dark:border-white/15 bg-gray-50 dark:bg-white/5 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                    رقم الواتساب الرسمي
                  </label>
                  <input
                    type="text"
                    value={settings.whatsappNumber}
                    onChange={(e) => updateSettings({ whatsappNumber: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs font-mono rounded-xl border border-gray-200 dark:border-white/15 bg-gray-50 dark:bg-white/5 outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                    نص الشريط الإعلاني العلوي (Ticker)
                  </label>
                  <input
                    type="text"
                    value={settings.announcementText}
                    onChange={(e) => updateSettings({ announcementText: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-200 dark:border-white/15 bg-gray-50 dark:bg-white/5 outline-none"
                  />
                </div>
              </div>

              {/* Toggles */}
              <div className="pt-4 border-t border-gray-100 dark:border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold">
                  <input
                    type="checkbox"
                    checked={settings.announcementEnabled}
                    onChange={(e) => updateSettings({ announcementEnabled: e.target.checked })}
                    className="w-4 h-4 rounded text-[#0f4a36]"
                  />
                  <span>تفعيل الشريط العلوي</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold">
                  <input
                    type="checkbox"
                    checked={settings.autoApproveAds}
                    onChange={(e) => updateSettings({ autoApproveAds: e.target.checked })}
                    className="w-4 h-4 rounded text-[#0f4a36]"
                  />
                  <span>الموافقة التلقائية على الإعلانات</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold">
                  <input
                    type="checkbox"
                    checked={settings.allowGuestOrders}
                    onChange={(e) => updateSettings({ allowGuestOrders: e.target.checked })}
                    className="w-4 h-4 rounded text-[#0f4a36]"
                  />
                  <span>إتاحة طلب الخدمات للزوار</span>
                </label>
              </div>
            </div>

            {/* Backup & Factory Reset Card */}
            <div className="bg-white dark:bg-[#122119] border border-gray-200 dark:border-white/10 rounded-3xl p-6 shadow-sm space-y-4">
              <h3 className="font-bold text-gray-900 dark:text-white text-base">
                إدارة النسخ الاحتياطية واستعادة البيانات
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                يمكنك تحميل نسخة احتياطية كاملة تتضمن كل الإعلانات والمربين ومؤشر الأسعار والطلبات كملف JSON واستعادتها في أي وقت.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    const json = exportAllData();
                    const blob = new Blob([json], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `souq-alghanam-backup-${new Date().toISOString().slice(0, 10)}.json`;
                    a.click();
                    showToast('تم تصدير النسخة الاحتياطية بنجاح 💾');
                  }}
                  className="bg-[#0f4a36] hover:bg-[#156047] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>تصدير وحفظ نسخة احتياطية (JSON)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowImportModal(true)}
                  className="bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 text-[#0f4a36] dark:text-[#58d39a] text-xs font-bold px-4 py-2.5 rounded-xl border border-emerald-200 dark:border-emerald-800/40 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Upload className="w-4 h-4" />
                  <span>استيراد نسخة احتياطية</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (
                      window.confirm(
                        'تحذير: هل أنت متأكد من إعادة ضبط المصنع؟ سيتم استعادة البيانات الأصلية بالكامل.'
                      )
                    ) {
                      resetAllToFactoryDefaults();
                    }
                  }}
                  className="bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 text-rose-700 dark:text-rose-400 text-xs font-bold px-4 py-2.5 rounded-xl border border-rose-200 dark:border-rose-800/40 transition-colors flex items-center gap-2 cursor-pointer mr-auto"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>إعادة ضبط المصنع للبيانات الافتراضية</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ---------------------------------------------------- */}
      {/* MODAL: ADD / EDIT LISTING                            */}
      {/* ---------------------------------------------------- */}
      {(isAddingAd || editingAd) && (
        <AdEditModal
          listing={editingAd}
          onClose={() => {
            setIsAddingAd(false);
            setEditingAd(null);
          }}
          onSave={(adData) => {
            if (editingAd) {
              updateListing(editingAd.id, adData);
            } else {
              addListing({
                ...adData,
                id: Math.floor(2000 + Math.random() * 8000),
                user: 1
              } as Listing);
            }
            setIsAddingAd(false);
            setEditingAd(null);
          }}
          breeders={breeders}
        />
      )}

      {/* ---------------------------------------------------- */}
      {/* MODAL: ADD / EDIT BREEDER                            */}
      {/* ---------------------------------------------------- */}
      {(isAddingBreeder || editingBreeder) && (
        <BreederEditModal
          breeder={editingBreeder ? editingBreeder.data : null}
          onClose={() => {
            setIsAddingBreeder(false);
            setEditingBreeder(null);
          }}
          onSave={(bData) => {
            if (editingBreeder) {
              updateBreeder(editingBreeder.index, bData);
            } else {
              addBreeder(bData);
            }
            setIsAddingBreeder(false);
            setEditingBreeder(null);
          }}
        />
      )}

      {/* ---------------------------------------------------- */}
      {/* MODAL: ADD MANUAL SERVICE ORDER                      */}
      {/* ---------------------------------------------------- */}
      {isAddingServiceOrder && (
        <ManualServiceOrderModal
          onClose={() => setIsAddingServiceOrder(false)}
          onSave={(orderData) => {
            addServiceOrder(orderData);
            setIsAddingServiceOrder(false);
          }}
        />
      )}

      {/* ---------------------------------------------------- */}
      {/* MODAL: IMPORT JSON BACKUP                            */}
      {/* ---------------------------------------------------- */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#122119] border border-gray-200 dark:border-white/10 rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
            <h3 className="font-bold text-gray-900 dark:text-white text-base">
              استيراد نسخة احتياطية من ملف JSON
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              الصق محتوى ملف النسخة الاحتياطية أدناه لتحديث كافة بيانات الموقع فورياً:
            </p>
            <textarea
              rows={8}
              value={importJsonText}
              onChange={(e) => setImportJsonText(e.target.value)}
              placeholder='{"version": "2.0", "listings": [...], "breeders": [...]}'
              className="w-full text-xs font-mono p-3 rounded-xl border border-gray-200 dark:border-white/15 bg-gray-50 dark:bg-white/5 outline-none resize-none"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowImportModal(false)}
                className="px-4 py-2 text-xs font-bold text-gray-600 hover:text-gray-900 cursor-pointer"
              >
                إلغاء
              </button>
              <button
                type="button"
                onClick={() => {
                  if (importAllData(importJsonText)) {
                    setShowImportModal(false);
                    setImportJsonText('');
                  }
                }}
                className="bg-[#0f4a36] text-white px-4 py-2 text-xs font-bold rounded-xl shadow cursor-pointer hover:bg-emerald-800"
              >
                تطبيق النسخة الاحتياطية
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ----------------------------------------------------
// SUB-MODAL: AD ADD/EDIT
// ----------------------------------------------------
interface AdEditModalProps {
  listing: Listing | null;
  onClose: () => void;
  onSave: (data: Partial<Listing>) => void;
  breeders: Breeder[];
}

const AdEditModal: React.FC<AdEditModalProps> = ({ listing, onClose, onSave, breeders }) => {
  const [title, setTitle] = useState(listing ? listing.t : '');
  const [category, setCategory] = useState<'sheep' | 'goat'>(listing ? listing.cat : 'sheep');
  const [breed, setBreed] = useState(listing ? listing.type : 'نعيمي');
  const [sex, setSex] = useState<'m' | 'f' | 'y'>(listing ? listing.sex : 'y');
  const [age, setAge] = useState<number>(listing ? listing.age : 8);
  const [kg, setKg] = useState<number>(listing ? listing.kg : 45);
  const [price, setPrice] = useState<number>(listing ? listing.price : 4200);
  const [region, setRegion] = useState(listing ? listing.reg : REGIONS[0]);
  const [breederIdx, setBreederIdx] = useState<number>(listing ? listing.b : 0);
  const [palette, setPalette] = useState(listing ? listing.pal : 'cream');
  const [description, setDescription] = useState(listing ? listing.d : '');
  const [verified, setVerified] = useState<number>(listing ? listing.v : 1);
  const [featured, setFeatured] = useState<number>(listing ? listing.fl : 0);
  const [horns, setHorns] = useState<boolean>(listing ? !!listing.horns : false);
  const [twin, setTwin] = useState<boolean>(listing ? !!listing.twin : false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      t: title,
      cat: category,
      type: breed,
      sex,
      age: Number(age),
      kg: Number(kg),
      price: Number(price),
      reg: region,
      b: Number(breederIdx),
      pal: palette,
      d: description,
      v: verified,
      fl: featured,
      horns: horns ? 1 : 0,
      twin: twin ? 1 : 0,
      goat: category === 'goat' ? 1 : undefined,
      sk: listing ? listing.sk : 0
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-[#122119] border border-gray-200 dark:border-white/10 rounded-3xl p-6 max-w-2xl w-full my-8 shadow-2xl space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-white/10">
          <h3 className="font-bold text-gray-900 dark:text-white text-base">
            {listing ? `تعديل الإعلان #${listing.id}` : 'إضافة إعلان جديد إلى المنصة كمدير'}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/10 grid place-items-center text-gray-500 cursor-pointer"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
              عنوان الإعلان
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="مثال: خروف نعيمي جذع سمين مناسب للوليمة"
              className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-white/15 bg-gray-50 dark:bg-white/5 outline-none font-bold"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                التصنيف
              </label>
              <select
                value={category}
                onChange={(e) => {
                  const c = e.target.value as 'sheep' | 'goat';
                  setCategory(c);
                  if (c === 'goat') {
                    setBreed('ماعز');
                    setPalette('goatBrown');
                  } else {
                    setBreed('نعيمي');
                    setPalette('cream');
                  }
                }}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-white/15 bg-gray-50 dark:bg-white/5 outline-none"
              >
                <option value="sheep">ضأن (غنم)</option>
                <option value="goat">ماعز</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                السلالة
              </label>
              <select
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-white/15 bg-gray-50 dark:bg-white/5 outline-none"
              >
                {category === 'sheep' ? (
                  <>
                    <option value="نعيمي">نعيمي</option>
                    <option value="حري">حري</option>
                    <option value="نجدي">نجدي</option>
                    <option value="سواكني">سواكني</option>
                  </>
                ) : (
                  <>
                    <option value="ماعز">ماعز بلدي</option>
                    <option value="شامي">شامي</option>
                    <option value="حجازي">حجازي</option>
                    <option value="عارضي">عارضي</option>
                  </>
                )}
              </select>
            </div>

            <div>
              <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                الجنس والطور
              </label>
              <select
                value={sex}
                onChange={(e) => setSex(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-white/15 bg-gray-50 dark:bg-white/5 outline-none"
              >
                <option value="y">صغير (جذع / خروف)</option>
                <option value="m">ذكر بالغ (كبش / فحل)</option>
                <option value="f">أنثى (نعجة / عنزة)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                المنطقة
              </label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-white/15 bg-gray-50 dark:bg-white/5 outline-none"
              >
                {REGIONS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                السعر (ر.س)
              </label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-white/15 bg-gray-50 dark:bg-white/5 outline-none font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                الوزن التقريبي (كجم)
              </label>
              <input
                type="number"
                required
                value={kg}
                onChange={(e) => setKg(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-white/15 bg-gray-50 dark:bg-white/5 outline-none font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                العمر (بالأشهر)
              </label>
              <input
                type="number"
                required
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-white/15 bg-gray-50 dark:bg-white/5 outline-none font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                المربي / البائع
              </label>
              <select
                value={breederIdx}
                onChange={(e) => setBreederIdx(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-white/15 bg-gray-50 dark:bg-white/5 outline-none"
              >
                {breeders.map((b, idx) => (
                  <option key={idx} value={idx}>
                    {b.n} ({b.r})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                لون القالب التوضيحي
              </label>
              <select
                value={palette}
                onChange={(e) => setPalette(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-white/15 bg-gray-50 dark:bg-white/5 outline-none"
              >
                {Object.keys(PAL).map((pKey) => (
                  <option key={pKey} value={pKey}>
                    {pKey}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
              الوصف والملاحظات
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="اكتب تفاصيل التغذية، الصحة، التحصينات والتوصيل..."
              className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-white/15 bg-gray-50 dark:bg-white/5 outline-none"
            />
          </div>

          {/* Badges toggles */}
          <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-gray-100 dark:border-white/10">
            <label className="flex items-center gap-2 cursor-pointer font-bold">
              <input
                type="checkbox"
                checked={verified === 1}
                onChange={(e) => setVerified(e.target.checked ? 1 : 0)}
                className="rounded text-[#0f4a36]"
              />
              <span>إعلان موثق رسمياً ✓</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer font-bold">
              <input
                type="checkbox"
                checked={featured === 1}
                onChange={(e) => setFeatured(e.target.checked ? 1 : 0)}
                className="rounded text-amber-500"
              />
              <span>إعلان مميز في البانر ★</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer font-bold">
              <input
                type="checkbox"
                checked={horns}
                onChange={(e) => setHorns(e.target.checked)}
                className="rounded"
              />
              <span>مقرّن</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer font-bold">
              <input
                type="checkbox"
                checked={twin}
                onChange={(e) => setTwin(e.target.checked)}
                className="rounded"
              />
              <span>ولادة توأم</span>
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-gray-100 dark:border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 font-bold text-gray-500 hover:text-gray-800 cursor-pointer"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="bg-[#0f4a36] hover:bg-[#156047] text-white px-5 py-2.5 font-bold rounded-xl shadow cursor-pointer"
            >
              حفظ الإعلان
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ----------------------------------------------------
// SUB-MODAL: BREEDER ADD/EDIT
// ----------------------------------------------------
interface BreederEditModalProps {
  breeder: Breeder | null;
  onClose: () => void;
  onSave: (data: Breeder) => void;
}

const BreederEditModal: React.FC<BreederEditModalProps> = ({ breeder, onClose, onSave }) => {
  const [name, setName] = useState(breeder ? breeder.n : '');
  const [region, setRegion] = useState(breeder ? breeder.r : REGIONS[0]);
  const [rating, setRating] = useState<number>(breeder ? breeder.rt : 4.8);
  const [ads, setAds] = useState<number>(breeder ? breeder.ads : 20);
  const [years, setYears] = useState<number>(breeder ? breeder.yrs : 5);
  const [color, setColor] = useState(breeder ? breeder.c : '#0f4a36');
  const [desc, setDesc] = useState(breeder ? breeder.d : '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      n: name,
      r: region,
      rt: Number(rating),
      ads: Number(ads),
      yrs: Number(years),
      c: color,
      d: desc
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#122119] border border-gray-200 dark:border-white/10 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-white/10">
          <h3 className="font-bold text-gray-900 dark:text-white text-base">
            {breeder ? 'تعديل بيانات المربي' : 'إضافة مربٍّ / مزرعة معتمدة'}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/10 grid place-items-center text-gray-500 cursor-pointer"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
              اسم المزرعة أو المربي
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="مثال: مزرعة نجد الأصيلة"
              className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-white/15 bg-gray-50 dark:bg-white/5 outline-none font-bold"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                المنطقة
              </label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-white/15 bg-gray-50 dark:bg-white/5 outline-none"
              >
                {REGIONS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                التقييم (من 5.0)
              </label>
              <input
                type="number"
                step="0.1"
                min="1"
                max="5"
                required
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-white/15 bg-gray-50 dark:bg-white/5 outline-none font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                عدد الإعلانات
              </label>
              <input
                type="number"
                required
                value={ads}
                onChange={(e) => setAds(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-white/15 bg-gray-50 dark:bg-white/5 outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                سنوات الخبرة
              </label>
              <input
                type="number"
                required
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-white/15 bg-gray-50 dark:bg-white/5 outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                لون الهوية
              </label>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full h-9 p-1 rounded-xl border border-gray-200 dark:border-white/15 bg-gray-50 cursor-pointer"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
              نبذة عن المزرعة والتخصص
            </label>
            <textarea
              rows={3}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="اكتب نبذة عن السلالات، الرعاية البيطرية، وموقع الحظائر..."
              className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-white/15 bg-gray-50 dark:bg-white/5 outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 font-bold text-gray-500 hover:text-gray-800 cursor-pointer"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="bg-[#0f4a36] hover:bg-[#156047] text-white px-5 py-2 font-bold rounded-xl shadow cursor-pointer"
            >
              حفظ بيانات المربي
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ----------------------------------------------------
// SUB-MODAL: MANUAL SERVICE ORDER
// ----------------------------------------------------
interface ManualServiceOrderModalProps {
  onClose: () => void;
  onSave: (data: Omit<ServiceOrder, 'id' | 'date'>) => void;
}

const ManualServiceOrderModal: React.FC<ManualServiceOrderModalProps> = ({ onClose, onSave }) => {
  const [serviceType, setServiceType] = useState('نقل المواشي');
  const [region, setRegion] = useState(REGIONS[0]);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [cost, setCost] = useState<number>(250);
  const [assignedPartner, setAssignedPartner] = useState('أسطول النقل السريع');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      serviceType,
      region,
      fullName,
      phone,
      notes,
      status: 'in_progress',
      cost: Number(cost),
      assignedPartner
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#122119] border border-gray-200 dark:border-white/10 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4 text-xs">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-white/10">
          <h3 className="font-bold text-gray-900 dark:text-white text-base">
            إضافة طلب خدمة مساندة يدوي
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/10 grid place-items-center text-gray-500 cursor-pointer"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                نوع الخدمة
              </label>
              <select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-white/15 bg-gray-50 dark:bg-white/5 outline-none"
              >
                <option value="نقل المواشي">نقل المواشي</option>
                <option value="الأعلاف والمستلزمات">الأعلاف والمستلزمات</option>
                <option value="فحص ورعاية بيطرية">فحص ورعاية بيطرية</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                المنطقة
              </label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-white/15 bg-gray-50 dark:bg-white/5 outline-none"
              >
                {REGIONS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                اسم العميل
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="مثال: فهد بن عبدالعزيز"
                className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-white/15 bg-gray-50 dark:bg-white/5 outline-none font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                رقم الجوال
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="050xxxxxxx"
                className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-white/15 bg-gray-50 dark:bg-white/5 outline-none font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                الشريك المسند إليه
              </label>
              <input
                type="text"
                value={assignedPartner}
                onChange={(e) => setAssignedPartner(e.target.value)}
                placeholder="اسم شركة النقل أو الطبيب"
                className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-white/15 bg-gray-50 dark:bg-white/5 outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                التكلفة المقدرة (ر.س)
              </label>
              <input
                type="number"
                value={cost}
                onChange={(e) => setCost(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-white/15 bg-gray-50 dark:bg-white/5 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
              ملاحظات وتفاصيل التوصيل
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="العنوان، عدد الرؤوس، وقت التحميل المفضل..."
              className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-white/15 bg-gray-50 dark:bg-white/5 outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 font-bold text-gray-500 hover:text-gray-800 cursor-pointer"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="bg-[#0f4a36] hover:bg-[#156047] text-white px-5 py-2 font-bold rounded-xl shadow cursor-pointer"
            >
              حفظ وإرسال الطلب
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
