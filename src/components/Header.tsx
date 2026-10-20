import React, { useState } from 'react';
import { useApp, PageId } from '../context/AppContext';
import { Icon } from './Icons';

export const Header: React.FC = () => {
  const { page, navigate, theme, toggleTheme, favorites, settings, isAdmin, serviceOrders, reports } = useApp();
  const [toolsOpen, setToolsOpen] = useState(false);
  const [learnOpen, setLearnOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const pendingCount =
    serviceOrders.filter((o) => o.status === 'new').length +
    reports.filter((r) => r.status === 'pending').length;

  const handleNav = (p: PageId, params?: any) => {
    navigate(p, params);
    setToolsOpen(false);
    setLearnOpen(false);
    setDrawerOpen(false);
  };

  const isToolsActive = ['prices', 'calculator', 'checklist', 'occasions', 'compare'].includes(page);
  const isLearnActive = ['guide', 'articles', 'how', 'faq'].includes(page);

  return (
    <>
      {/* Topbar */}
      {settings.announcementEnabled && (
        <div className="bg-[#0a3123] text-[#e6efe8] text-xs py-2 px-4 border-b border-[#1c4b39]/60 select-none">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#58d39a] shadow-[0_0_0_4px_rgba(88,211,154,0.2)] shrink-0" />
              <span className="font-medium line-clamp-1">{settings.announcementText}</span>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-emerald-200/80">
              <button
                type="button"
                onClick={() => handleNav('admin')}
                className="bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 hover:text-white px-2.5 py-0.5 rounded-full font-bold text-[11px] transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>لوحة التحكم</span>
                {pendingCount > 0 && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                )}
              </button>
              <button
                type="button"
                onClick={() => handleNav('faq')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                مركز المساعدة
              </button>
              <button
                type="button"
                onClick={() => handleNav('contact')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                تواصل معنا
              </button>
              <button
                type="button"
                onClick={() => handleNav('breeders')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                انضم كمربٍّ معتمد
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Site Header */}
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-[#122119]/95 backdrop-blur-md border-b border-gray-200/80 dark:border-emerald-900/40 shadow-sm transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Logo & Brand */}
          <div
            onClick={() => handleNav('home')}
            className="flex items-center gap-3.5 cursor-pointer select-none"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#0f4a36] text-white grid place-items-center shrink-0 shadow-md overflow-hidden p-1 border border-emerald-600/40">
              <svg viewBox="0 18 220 130" className="w-10 h-10 fill-white text-white">
                <use href="#sheep" />
              </svg>
            </div>
            <div>
              <b className="font-['Readex_Pro',sans-serif] text-2xl font-black text-[#0f4a36] dark:text-[#58d39a] leading-none block">
                سوق الغنم
              </b>
              <small className="text-[11px] text-gray-500 dark:text-gray-400 font-medium block mt-0.5">
                من المربين إلى المشترين بثقة
              </small>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1.5 font-medium text-sm text-gray-600 dark:text-gray-300">
            <button
              type="button"
              onClick={() => handleNav('home')}
              className={`px-3.5 py-2 rounded-full transition-all cursor-pointer ${
                page === 'home'
                  ? 'bg-emerald-50 dark:bg-emerald-950/80 text-[#0f4a36] dark:text-[#58d39a] font-bold'
                  : 'hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              الرئيسية
            </button>

            <button
              type="button"
              onClick={() => handleNav('listings')}
              className={`px-3.5 py-2 rounded-full transition-all cursor-pointer ${
                page === 'listings'
                  ? 'bg-emerald-50 dark:bg-emerald-950/80 text-[#0f4a36] dark:text-[#58d39a] font-bold'
                  : 'hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              الإعلانات
            </button>

            <button
              type="button"
              onClick={() => handleNav('breeders')}
              className={`px-3.5 py-2 rounded-full transition-all cursor-pointer ${
                page === 'breeders'
                  ? 'bg-emerald-50 dark:bg-emerald-950/80 text-[#0f4a36] dark:text-[#58d39a] font-bold'
                  : 'hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              المربون
            </button>

            {/* Tools Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setToolsOpen(!toolsOpen);
                  setLearnOpen(false);
                }}
                className={`px-3.5 py-2 rounded-full transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                  isToolsActive
                    ? 'bg-emerald-50 dark:bg-emerald-950/80 text-[#0f4a36] dark:text-[#58d39a] font-bold'
                    : 'hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <span>الأدوات</span>
                <Icon name="down" className={`w-3.5 h-3.5 transition-transform ${toolsOpen ? 'rotate-180' : ''}`} />
              </button>

              {toolsOpen && (
                <div
                  onMouseLeave={() => setToolsOpen(false)}
                  className="absolute top-full mt-2 right-0 w-72 bg-white dark:bg-[#122119] rounded-2xl shadow-xl border border-gray-200/80 dark:border-emerald-900/60 p-2 z-50 animate-fade-in flex flex-col gap-1 text-right"
                >
                  <button
                    type="button"
                    onClick={() => handleNav('prices')}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/50 transition-colors text-right w-full cursor-pointer"
                  >
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 text-[#0f4a36] dark:text-[#58d39a] grid place-items-center shrink-0">
                      <Icon name="chart" className="w-5 h-5" />
                    </div>
                    <div>
                      <b className="block text-sm text-gray-900 dark:text-white font-bold">مؤشر الأسعار</b>
                      <small className="text-xs text-gray-500 dark:text-gray-400">حركة السعر وتغيرات الموسم</small>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleNav('calculator')}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/50 transition-colors text-right w-full cursor-pointer"
                  >
                    <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-900/50 text-[#b98425] dark:text-amber-400 grid place-items-center shrink-0">
                      <Icon name="calc" className="w-5 h-5" />
                    </div>
                    <div>
                      <b className="block text-sm text-gray-900 dark:text-white font-bold">حاسبة الولائم</b>
                      <small className="text-xs text-gray-500 dark:text-gray-400">كم رأساً تحتاج وكم التكلفة؟</small>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleNav('checklist')}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/50 transition-colors text-right w-full cursor-pointer"
                  >
                    <div className="w-9 h-9 rounded-xl bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-400 grid place-items-center shrink-0">
                      <Icon name="clip" className="w-5 h-5" />
                    </div>
                    <div>
                      <b className="block text-sm text-gray-900 dark:text-white font-bold">قائمة فحص المشتري</b>
                      <small className="text-xs text-gray-500 dark:text-gray-400">ثمانية بنود فحص قبل الدفع</small>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleNav('occasions')}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/50 transition-colors text-right w-full cursor-pointer"
                  >
                    <div className="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-400 grid place-items-center shrink-0">
                      <Icon name="star" className="w-5 h-5" />
                    </div>
                    <div>
                      <b className="block text-sm text-gray-900 dark:text-white font-bold">حسب المناسبة</b>
                      <small className="text-xs text-gray-500 dark:text-gray-400">عقيقة، زواج، عزيمة، تربية</small>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleNav('compare')}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/50 transition-colors text-right w-full cursor-pointer"
                  >
                    <div className="w-9 h-9 rounded-xl bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-400 grid place-items-center shrink-0">
                      <Icon name="layers" className="w-5 h-5" />
                    </div>
                    <div>
                      <b className="block text-sm text-gray-900 dark:text-white font-bold">مقارنة الإعلانات</b>
                      <small className="text-xs text-gray-500 dark:text-gray-400">مقارنة حتى 3 رؤوس جنباً لجنب</small>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Learn Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setLearnOpen(!learnOpen);
                  setToolsOpen(false);
                }}
                className={`px-3.5 py-2 rounded-full transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                  isLearnActive
                    ? 'bg-emerald-50 dark:bg-emerald-950/80 text-[#0f4a36] dark:text-[#58d39a] font-bold'
                    : 'hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <span>تعلّم</span>
                <Icon name="down" className={`w-3.5 h-3.5 transition-transform ${learnOpen ? 'rotate-180' : ''}`} />
              </button>

              {learnOpen && (
                <div
                  onMouseLeave={() => setLearnOpen(false)}
                  className="absolute top-full mt-2 right-0 w-72 bg-white dark:bg-[#122119] rounded-2xl shadow-xl border border-gray-200/80 dark:border-emerald-900/60 p-2 z-50 animate-fade-in flex flex-col gap-1 text-right"
                >
                  <button
                    type="button"
                    onClick={() => handleNav('guide')}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/50 transition-colors text-right w-full cursor-pointer"
                  >
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 text-[#0f4a36] dark:text-[#58d39a] grid place-items-center shrink-0">
                      <Icon name="book" className="w-5 h-5" />
                    </div>
                    <div>
                      <b className="block text-sm text-gray-900 dark:text-white font-bold">دليل السلالات</b>
                      <small className="text-xs text-gray-500 dark:text-gray-400">نعيمي، حري، نجدي، سواكني</small>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleNav('articles')}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/50 transition-colors text-right w-full cursor-pointer"
                  >
                    <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-900/50 text-[#b98425] dark:text-amber-400 grid place-items-center shrink-0">
                      <Icon name="file" className="w-5 h-5" />
                    </div>
                    <div>
                      <b className="block text-sm text-gray-900 dark:text-white font-bold">المقالات والنصائح</b>
                      <small className="text-xs text-gray-500 dark:text-gray-400">أدلة عملية مبسطة للمشتري</small>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleNav('how')}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/50 transition-colors text-right w-full cursor-pointer"
                  >
                    <div className="w-9 h-9 rounded-xl bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-400 grid place-items-center shrink-0">
                      <Icon name="info" className="w-5 h-5" />
                    </div>
                    <div>
                      <b className="block text-sm text-gray-900 dark:text-white font-bold">كيف يعمل السوق</b>
                      <small className="text-xs text-gray-500 dark:text-gray-400">خطوات الشراء والبيع الموثّق</small>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleNav('faq')}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/50 transition-colors text-right w-full cursor-pointer"
                  >
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 text-[#0f4a36] dark:text-[#58d39a] grid place-items-center shrink-0">
                      <Icon name="chat" className="w-5 h-5" />
                    </div>
                    <div>
                      <b className="block text-sm text-gray-900 dark:text-white font-bold">الأسئلة الشائعة</b>
                      <small className="text-xs text-gray-500 dark:text-gray-400">إجابات استفسارات المواشي</small>
                    </div>
                  </button>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => handleNav('services')}
              className={`px-3.5 py-2 rounded-full transition-all cursor-pointer ${
                page === 'services'
                  ? 'bg-emerald-50 dark:bg-emerald-950/80 text-[#0f4a36] dark:text-[#58d39a] font-bold'
                  : 'hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              الخدمات
            </button>

            {/* Admin Dashboard Button */}
            <button
              type="button"
              onClick={() => handleNav('admin')}
              className={`px-3.5 py-2 rounded-full transition-all cursor-pointer font-bold inline-flex items-center gap-1.5 ${
                page === 'admin'
                  ? 'bg-[#0f4a36] text-white shadow-md'
                  : 'bg-emerald-50/80 dark:bg-emerald-950/50 text-[#0f4a36] dark:text-[#58d39a] border border-emerald-600/30 hover:bg-emerald-100'
              }`}
            >
              <Icon name="shield" className="w-3.5 h-3.5" />
              <span>لوحة التحكم</span>
              {pendingCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              )}
            </button>
          </nav>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-2.5">
            {/* Favorites Icon Button with Badge */}
            <button
              type="button"
              onClick={() => handleNav('favorites')}
              className="relative w-10 h-10 rounded-full border border-gray-200 dark:border-white/15 bg-white dark:bg-[#122119] text-[#0f4a36] dark:text-emerald-300 grid place-items-center hover:bg-gray-50 dark:hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="المفضلة"
            >
              <Icon name="heart" className="w-5 h-5" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[20px] h-[20px] rounded-full bg-[#b98425] text-white text-[11px] font-bold grid place-items-center px-1 shadow-sm">
                  {favorites.length}
                </span>
              )}
            </button>

            {/* Dark/Light Mode Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full border border-gray-200 dark:border-white/15 bg-white dark:bg-[#122119] text-gray-700 dark:text-amber-300 grid place-items-center hover:bg-gray-50 dark:hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="تبديل الوضع"
            >
              <Icon name={theme === 'dark' ? 'sun' : 'moon'} className="w-5 h-5" />
            </button>

            {/* "+ أضف إعلانك" Button */}
            <button
              type="button"
              onClick={() => handleNav('add-ad')}
              className="bg-[#0f4a36] hover:bg-[#156047] text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <Icon name="plus" className="w-4 h-4" />
              <span>أضف إعلانك</span>
            </button>

            {/* Mobile Burger Menu Button */}
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="lg:hidden w-10 h-10 rounded-full border border-gray-200 dark:border-white/15 bg-white dark:bg-[#122119] text-gray-700 dark:text-white grid place-items-center hover:bg-gray-50 dark:hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="القائمة"
            >
              <Icon name="menu" className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-start">
          <div className="w-[85%] max-w-xs h-full bg-white dark:bg-[#122119] p-6 flex flex-col gap-3 shadow-2xl overflow-y-auto text-right">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-white/10">
              <span className="font-['Readex_Pro',sans-serif] text-xl font-bold text-[#0f4a36] dark:text-[#58d39a]">
                سوق الغنم
              </span>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/10 grid place-items-center text-gray-600 dark:text-gray-300"
              >
                <Icon name="x" className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col gap-1 text-sm font-bold text-gray-800 dark:text-gray-200">
              {/* Admin Panel Link in Drawer */}
              <button
                type="button"
                onClick={() => handleNav('admin')}
                className="text-right p-3 rounded-xl bg-[#0f4a36] text-white flex items-center justify-between shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <Icon name="shield" className="w-4 h-4 text-[#58d39a]" />
                  <span>لوحة التحكم الشاملة</span>
                </div>
                <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full font-extrabold">
                  إدارة
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleNav('home')}
                className="text-right p-3 rounded-xl hover:bg-emerald-50 dark:hover:bg-white/5"
              >
                الرئيسية
              </button>
              <button
                type="button"
                onClick={() => handleNav('listings')}
                className="text-right p-3 rounded-xl hover:bg-emerald-50 dark:hover:bg-white/5"
              >
                تصفّح الإعلانات
              </button>
              <button
                type="button"
                onClick={() => handleNav('breeders')}
                className="text-right p-3 rounded-xl hover:bg-emerald-50 dark:hover:bg-white/5"
              >
                المربون المعتمدون
              </button>
              <button
                type="button"
                onClick={() => handleNav('prices')}
                className="text-right p-3 rounded-xl hover:bg-emerald-50 dark:hover:bg-white/5"
              >
                مؤشر الأسعار
              </button>
              <button
                type="button"
                onClick={() => handleNav('calculator')}
                className="text-right p-3 rounded-xl hover:bg-emerald-50 dark:hover:bg-white/5"
              >
                حاسبة الولائم
              </button>
              <button
                type="button"
                onClick={() => handleNav('checklist')}
                className="text-right p-3 rounded-xl hover:bg-emerald-50 dark:hover:bg-white/5"
              >
                قائمة فحص المشتري
              </button>
              <button
                type="button"
                onClick={() => handleNav('occasions')}
                className="text-right p-3 rounded-xl hover:bg-emerald-50 dark:hover:bg-white/5"
              >
                حسب المناسبة
              </button>
              <button
                type="button"
                onClick={() => handleNav('compare')}
                className="text-right p-3 rounded-xl hover:bg-emerald-50 dark:hover:bg-white/5"
              >
                مقارنة الإعلانات
              </button>
              <button
                type="button"
                onClick={() => handleNav('guide')}
                className="text-right p-3 rounded-xl hover:bg-emerald-50 dark:hover:bg-white/5"
              >
                دليل السلالات
              </button>
              <button
                type="button"
                onClick={() => handleNav('articles')}
                className="text-right p-3 rounded-xl hover:bg-emerald-50 dark:hover:bg-white/5"
              >
                المقالات والنصائح
              </button>
              <button
                type="button"
                onClick={() => handleNav('services')}
                className="text-right p-3 rounded-xl hover:bg-emerald-50 dark:hover:bg-white/5"
              >
                خدمات النقل والبيطرة
              </button>
              <button
                type="button"
                onClick={() => handleNav('faq')}
                className="text-right p-3 rounded-xl hover:bg-emerald-50 dark:hover:bg-white/5"
              >
                الأسئلة الشائعة
              </button>
              <button
                type="button"
                onClick={() => handleNav('contact')}
                className="text-right p-3 rounded-xl hover:bg-emerald-50 dark:hover:bg-white/5"
              >
                تواصل معنا
              </button>
            </div>

            <div className="mt-auto pt-4 border-t border-gray-100 dark:border-white/10">
              <button
                type="button"
                onClick={() => handleNav('add-ad')}
                className="w-full bg-[#0f4a36] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-md"
              >
                <Icon name="plus" className="w-4 h-4" />
                <span>أضف إعلانك الآن</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
