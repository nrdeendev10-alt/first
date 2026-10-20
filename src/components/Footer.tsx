import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Icon } from './Icons';

export const Footer: React.FC = () => {
  const { navigate, showToast } = useApp();
  const [email, setEmail] = useState('');
  const [waOpen, setWaOpen] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      showToast('شكراً لاشتراكك! ستصلك أحدث الأسعار والإعلانات أسبوعياً.');
      setEmail('');
    }
  };

  return (
    <>
      {/* Sadu Traditional Geometric Band */}
      <div className="sadu h-3 w-full opacity-90" />

      {/* Hills & Stats Band */}
      <div className="bg-gradient-to-b from-[#edf2e8] to-[#e2ece0] dark:from-[#122119] dark:to-[#0c1812] py-12 px-4 border-b border-[#dde5d7] dark:border-emerald-950">
        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-right">
          <div className="flex items-center gap-4 justify-center sm:justify-start p-3 bg-white/70 dark:bg-white/5 rounded-2xl border border-emerald-900/10 dark:border-white/10 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#0f4a36]/10 dark:bg-emerald-500/20 text-[#0f4a36] dark:text-[#58d39a] grid place-items-center shrink-0">
              <Icon name="box" className="w-6 h-6" />
            </div>
            <div>
              <b className="font-['Readex_Pro',sans-serif] text-2xl font-black text-gray-950 dark:text-white block leading-none">
                +10,000
              </b>
              <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">إعلان موثوق ونشط</span>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center sm:justify-start p-3 bg-white/70 dark:bg-white/5 rounded-2xl border border-emerald-900/10 dark:border-white/10 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#b98425]/10 dark:bg-amber-500/20 text-[#b98425] dark:text-amber-400 grid place-items-center shrink-0">
              <Icon name="users" className="w-6 h-6" />
            </div>
            <div>
              <b className="font-['Readex_Pro',sans-serif] text-2xl font-black text-gray-950 dark:text-white block leading-none">
                +25,000
              </b>
              <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">مشترٍ ومربٍّ مسجل</span>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center sm:justify-start p-3 bg-white/70 dark:bg-white/5 rounded-2xl border border-emerald-900/10 dark:border-white/10 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#2c6a78]/10 dark:bg-sky-500/20 text-[#2c6a78] dark:text-sky-400 grid place-items-center shrink-0">
              <Icon name="shield" className="w-6 h-6" />
            </div>
            <div>
              <b className="font-['Readex_Pro',sans-serif] text-2xl font-black text-gray-950 dark:text-white block leading-none">
                +1,200
              </b>
              <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">مربٍّ معتمد ومرخص</span>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center sm:justify-start p-3 bg-white/70 dark:bg-white/5 rounded-2xl border border-emerald-900/10 dark:border-white/10 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-emerald-700/10 dark:bg-emerald-400/20 text-emerald-800 dark:text-emerald-300 grid place-items-center shrink-0">
              <Icon name="check" className="w-6 h-6" />
            </div>
            <div>
              <b className="font-['Readex_Pro',sans-serif] text-2xl font-black text-gray-950 dark:text-white block leading-none">
                100%
              </b>
              <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">معاملات وفحص آمن</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <footer className="bg-[#0a3123] text-[#e6efe8] pt-14 pb-12 px-4 sm:px-6 lg:px-8 border-t border-[#1c4b39]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-[#1c4b39]/80 text-right">
            {/* Brand column */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 select-none">
                <div className="w-11 h-11 rounded-2xl bg-white text-[#0f4a36] grid place-items-center shrink-0 shadow-md p-1">
                  <svg viewBox="0 18 220 130" className="w-9 h-9 fill-[#0f4a36]">
                    <use href="#sheep" />
                  </svg>
                </div>
                <div>
                  <b className="font-['Readex_Pro',sans-serif] text-2xl font-black text-white leading-none block">
                    سوق الغنم
                  </b>
                  <small className="text-xs text-[#9bb5a6] block mt-0.5">
                    المنصة السعودية الأولى لتجارة المواشي والأغنام
                  </small>
                </div>
              </div>

              <p className="mt-4 text-xs sm:text-sm text-[#9bb5a6] leading-relaxed max-w-sm">
                نربط بين كبار المربين وأصحاب المزارع والمشترين في كافة مناطق المملكة، مع خدمات المقارنة والفحص
                وحساب الولائم والنقل المرخّص.
              </p>

              <div className="mt-5 flex items-center gap-3">
                <span className="text-xs text-emerald-300 font-bold">موثوق من منصة الأعمال السعودية</span>
              </div>
            </div>

            {/* Links Column 1: Market & Ads */}
            <div>
              <h4 className="font-bold text-white text-sm mb-4">السوق والإعلانات</h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#9bb5a6]">
                <li>
                  <button type="button" onClick={() => navigate('listings')} className="hover:text-white transition-colors cursor-pointer">
                    جميع الإعلانات
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => navigate('listings', { cat: 'sheep' })} className="hover:text-white transition-colors cursor-pointer">
                    قسم الضأن
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => navigate('listings', { cat: 'goat' })} className="hover:text-white transition-colors cursor-pointer">
                    قسم الماعز
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => navigate('breeders')} className="hover:text-white transition-colors cursor-pointer">
                    دليل المربين
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => navigate('add-ad')} className="hover:text-white transition-colors cursor-pointer text-amber-300 font-bold">
                    + أضف إعلانك مجاناً
                  </button>
                </li>
              </ul>
            </div>

            {/* Links Column 2: Tools & Calculators */}
            <div>
              <h4 className="font-bold text-white text-sm mb-4">الأدوات الذكية</h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#9bb5a6]">
                <li>
                  <button type="button" onClick={() => navigate('prices')} className="hover:text-white transition-colors cursor-pointer">
                    مؤشر أسعار المواشي
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => navigate('calculator')} className="hover:text-white transition-colors cursor-pointer">
                    حاسبة الولائم والعزائم
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => navigate('checklist')} className="hover:text-white transition-colors cursor-pointer">
                    قائمة فحص المشتري (8 بنود)
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => navigate('occasions')} className="hover:text-white transition-colors cursor-pointer">
                    الشراء حسب المناسبة
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => navigate('compare')} className="hover:text-white transition-colors cursor-pointer">
                    مقارنة الإعلانات
                  </button>
                </li>
              </ul>
            </div>

            {/* Links Column 3: Help & Center */}
            <div>
              <h4 className="font-bold text-white text-sm mb-4">المعرفة والمساعدة</h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#9bb5a6]">
                <li>
                  <button type="button" onClick={() => navigate('guide')} className="hover:text-white transition-colors cursor-pointer">
                    دليل السلالات المفصل
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => navigate('articles')} className="hover:text-white transition-colors cursor-pointer">
                    نصائح ومعرفة عمر الخروف
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => navigate('services')} className="hover:text-white transition-colors cursor-pointer">
                    طلب نقل وبيطرة وأعلاف
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => navigate('faq')} className="hover:text-white transition-colors cursor-pointer">
                    الأسئلة الشائعة
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => navigate('contact')} className="hover:text-white transition-colors cursor-pointer">
                    اتصل بنا أو أبلغ عن إعلان
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter Box */}
          <div className="py-8 border-b border-[#1c4b39]/80 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-right">
              <h4 className="text-base font-bold text-white">اشترك بنشرة أسعار المواشي الأسبوعية</h4>
              <p className="text-xs text-[#9bb5a6] mt-1">تصلك أحدث تحركات الأسعار وسوق الأعلاف والإعلانات الجديدة</p>
            </div>
            <form onSubmit={handleNewsletter} className="flex items-center gap-2 w-full md:w-auto max-w-md">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="أدخل بريدك الإلكتروني..."
                required
                className="bg-white/10 border border-white/20 rounded-full px-4 py-2.5 text-xs sm:text-sm text-white placeholder:text-[#9bb5a6] outline-none focus:border-amber-400 w-full md:w-64"
              />
              <button
                type="submit"
                className="bg-[#b98425] hover:bg-amber-600 text-white font-bold px-5 py-2.5 rounded-full text-xs sm:text-sm shrink-0 transition-colors cursor-pointer shadow-md"
              >
                اشتراك
              </button>
            </form>
          </div>

          {/* Bottom Copyright & Legal Links */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9bb5a6]">
            <div>
              جميع الحقوق محفوظة © {new Date().getFullYear()} سوق الغنم | المملكة العربية السعودية
            </div>
            <div className="flex items-center gap-4">
              <button type="button" onClick={() => navigate('terms')} className="hover:text-white transition-colors cursor-pointer">
                الشروط والأحكام
              </button>
              <span>•</span>
              <button type="button" onClick={() => navigate('privacy')} className="hover:text-white transition-colors cursor-pointer">
                سياسة الخصوصية
              </button>
              <span>•</span>
              <button type="button" onClick={() => navigate('how')} className="hover:text-white transition-colors cursor-pointer">
                كيف نضمن الصفقات؟
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => navigate('admin')}
                className="text-amber-300 font-bold hover:text-white transition-colors cursor-pointer flex items-center gap-1"
              >
                <Icon name="shield" className="w-3 h-3 text-amber-400" />
                <span>لوحة التحكم</span>
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Quick Contact Button */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          type="button"
          onClick={() => setWaOpen(!waOpen)}
          className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-4 py-3 rounded-full shadow-2xl hover:scale-105 transition-all duration-300 font-bold text-sm cursor-pointer"
          title="مساعد سوق الغنم السريع"
        >
          <span className="w-5 h-5 grid place-items-center font-bold">💬</span>
          <span className="hidden sm:inline">خدمة العملاء السريعة</span>
        </button>

        {waOpen && (
          <div className="absolute bottom-16 left-0 w-80 bg-white dark:bg-[#122119] rounded-2xl shadow-2xl border border-gray-200 dark:border-white/10 p-4 text-right animate-fade-in z-50">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-white/10 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#25D366] text-white grid place-items-center text-xs font-bold">
                  واتساب
                </div>
                <div>
                  <b className="block text-xs text-gray-900 dark:text-white font-bold">فريق سوق الغنم</b>
                  <small className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">متصل الآن للمساعدة</small>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setWaOpen(false)}
                className="w-6 h-6 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 grid place-items-center text-gray-400 text-xs"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-300 mb-3 leading-relaxed">
              مرحباً بك في سوق الغنم! هل تحتاج إلى مساعدة في العثور على خروف مناسب أو حاسبة ولائم أو توثيق حسابك؟
            </p>
            <a
              href="https://wa.me/966500000000?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D8%A3%D8%AD%D8%AA%D8%A7%D8%AC%20%D9%85%D8%B3%D8%A7%D8%B9%D8%AF%D8%A9%20%D9%81%D9%8A%20%D8%B3%D9%88%D9%82%20%D8%A7%D9%84%D8%BA%D9%86%D9%85"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-[#25D366] hover:bg-[#20ba59] text-white text-center py-2.5 rounded-xl font-bold text-xs shadow-md"
            >
              فتح محادثة واتساب الآن
            </a>
          </div>
        )}
      </div>
    </>
  );
};
