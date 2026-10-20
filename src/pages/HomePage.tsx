import React from 'react';
import { useApp } from '../context/AppContext';
import { VideoHeroBanner } from '../components/VideoHeroBanner';
import { ListingCard } from '../components/ListingCard';
import { OCCASIONS, ARTICLES, fmt } from '../data/initialData';
import { Icon } from '../components/Icons';

export const HomePage: React.FC = () => {
  const { listings, breeders, navigate } = useApp();

  const handleHeroSearch = (cat: string, region: string, q: string) => {
    navigate('listings', { cat, region, q });
  };

  const handleTagClick = (breed: string) => {
    navigate('listings', { type: breed });
  };

  // Featured ads (verified first)
  const featured = listings.filter((a) => a.v === 1).slice(0, 6);

  return (
    <div className="space-y-16">
      {/* 1. Video Hero Banner */}
      <VideoHeroBanner onSearch={handleHeroSearch} onTagClick={handleTagClick} />

      {/* 2. Quick Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
          <button
            type="button"
            onClick={() => navigate('listings')}
            className="p-5 rounded-2xl bg-white dark:bg-[#122119] border border-gray-200/80 dark:border-white/10 hover:border-[#0f4a36] shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center gap-2.5 cursor-pointer group"
          >
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-[#0f4a36] dark:text-[#58d39a] grid place-items-center group-hover:scale-110 transition-transform">
              <Icon name="grid" className="w-7 h-7" />
            </div>
            <b className="text-sm font-bold text-gray-900 dark:text-white">جميع الإعلانات</b>
            <small className="text-xs text-gray-500 dark:text-gray-400 font-medium">{listings.length} إعلان نشط</small>
          </button>

          <button
            type="button"
            onClick={() => navigate('listings', { cat: 'sheep' })}
            className="p-5 rounded-2xl bg-white dark:bg-[#122119] border border-gray-200/80 dark:border-white/10 hover:border-[#0f4a36] shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center gap-2.5 cursor-pointer group"
          >
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-[#0f4a36] dark:text-[#58d39a] grid place-items-center group-hover:scale-110 transition-transform">
              <svg viewBox="0 18 220 130" className="w-8 h-8 fill-current text-current">
                <use href="#sheep" />
              </svg>
            </div>
            <b className="text-sm font-bold text-gray-900 dark:text-white">قسم الضأن</b>
            <small className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              {listings.filter((a) => a.cat === 'sheep').length} إعلان
            </small>
          </button>

          <button
            type="button"
            onClick={() => navigate('listings', { cat: 'goat' })}
            className="p-5 rounded-2xl bg-white dark:bg-[#122119] border border-gray-200/80 dark:border-white/10 hover:border-[#0f4a36] shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center gap-2.5 cursor-pointer group"
          >
            <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-[#b98425] dark:text-amber-400 grid place-items-center group-hover:scale-110 transition-transform">
              <svg viewBox="0 0 220 150" className="w-8 h-8 fill-current text-current">
                <use href="#goat" />
              </svg>
            </div>
            <b className="text-sm font-bold text-gray-900 dark:text-white">قسم الماعز</b>
            <small className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              {listings.filter((a) => a.cat === 'goat').length} إعلان
            </small>
          </button>

          <button
            type="button"
            onClick={() => navigate('services')}
            className="p-5 rounded-2xl bg-white dark:bg-[#122119] border border-gray-200/80 dark:border-white/10 hover:border-[#0f4a36] shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center gap-2.5 cursor-pointer group"
          >
            <div className="w-14 h-14 rounded-2xl bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-400 grid place-items-center group-hover:scale-110 transition-transform">
              <Icon name="truck" className="w-7 h-7" />
            </div>
            <b className="text-sm font-bold text-gray-900 dark:text-white">خدمات النقل</b>
            <small className="text-xs text-gray-500 dark:text-gray-400 font-medium">مركبات مجهزة ومعتمدة</small>
          </button>

          <button
            type="button"
            onClick={() => navigate('services')}
            className="p-5 rounded-2xl bg-white dark:bg-[#122119] border border-gray-200/80 dark:border-white/10 hover:border-[#0f4a36] shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center gap-2.5 cursor-pointer group"
          >
            <div className="w-14 h-14 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-400 grid place-items-center group-hover:scale-110 transition-transform">
              <Icon name="box" className="w-7 h-7" />
            </div>
            <b className="text-sm font-bold text-gray-900 dark:text-white">الأعلاف والمستلزمات</b>
            <small className="text-xs text-gray-500 dark:text-gray-400 font-medium">برسيم وشعير ومكملات</small>
          </button>

          <button
            type="button"
            onClick={() => navigate('services')}
            className="p-5 rounded-2xl bg-white dark:bg-[#122119] border border-gray-200/80 dark:border-white/10 hover:border-[#0f4a36] shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center gap-2.5 cursor-pointer group"
          >
            <div className="w-14 h-14 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 grid place-items-center group-hover:scale-110 transition-transform">
              <Icon name="steth" className="w-7 h-7" />
            </div>
            <b className="text-sm font-bold text-gray-900 dark:text-white">الخدمات البيطرية</b>
            <small className="text-xs text-gray-500 dark:text-gray-400 font-medium">فحص وتحصين وشهادات</small>
          </button>
        </div>
      </section>

      {/* 3. Bento Grid: Smart Tools */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-right">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-[#b98425] uppercase tracking-wider block mb-1">
              أدوات تفاعلية ذكية
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-950 dark:text-white">
              استكشف خدمات السوق المتكاملة
            </h2>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 max-w-md">
            أدوات حسابية ومؤشرات أسعار تفاعلية صُممت خصيصاً لمساعدتك على اتخاذ قرار الشراء الأفضل.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Tile 1: Listings (Large) */}
          <div
            onClick={() => navigate('listings')}
            className="lg:col-span-2 p-8 rounded-3xl bg-gradient-to-br from-[#145a41] to-[#0a3123] text-white flex flex-col justify-between shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer relative overflow-hidden group min-h-[220px]"
          >
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-white/15 grid place-items-center mb-4">
                <Icon name="search" className="w-6 h-6 text-emerald-300" />
              </div>
              <h3 className="text-2xl font-bold mb-2">تصفّح الإعلانات المعتمدة</h3>
              <p className="text-emerald-100/80 text-sm max-w-sm leading-relaxed">
                مئات الإعلانات اليومية بفلاتر دقيقة للسلالة والعمر والوزن والمنطقة، مع مقارنة الأسعار فورياً.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-2 font-bold text-sm text-amber-300 group-hover:translate-x-[-4px] transition-transform">
              <span>تصفّح السوق الآن</span>
              <Icon name="left" className="w-4 h-4" />
            </div>
            {/* Background sheep art */}
            <div className="absolute left-[-20px] bottom-[-20px] w-48 opacity-15 pointer-events-none">
              <svg viewBox="0 18 220 130" className="w-full fill-white">
                <use href="#ram" />
              </svg>
            </div>
          </div>

          {/* Tile 2: Feast Calculator */}
          <div
            onClick={() => navigate('calculator')}
            className="p-6 rounded-3xl bg-gradient-to-br from-[#a2583a] to-[#6b3320] text-white flex flex-col justify-between shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer relative overflow-hidden group min-h-[200px]"
          >
            <div>
              <div className="w-11 h-11 rounded-2xl bg-white/15 grid place-items-center mb-3">
                <Icon name="calc" className="w-5 h-5 text-amber-300" />
              </div>
              <h3 className="text-xl font-bold mb-1">حاسبة الولائم</h3>
              <p className="text-white/80 text-xs leading-relaxed">
                حدد عدد الضيوف ونوع الوليمة واحسب عدد الرؤوس والتكلفة التقديرية بالريال.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1.5 font-bold text-xs text-amber-300 group-hover:translate-x-[-4px] transition-transform">
              <span>احسب وليمتك</span>
              <Icon name="left" className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Tile 3: Price Index */}
          <div
            onClick={() => navigate('prices')}
            className="p-6 rounded-3xl bg-gradient-to-br from-[#3f5f8a] to-[#223a5c] text-white flex flex-col justify-between shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer relative overflow-hidden group min-h-[200px]"
          >
            <div>
              <div className="w-11 h-11 rounded-2xl bg-white/15 grid place-items-center mb-3">
                <Icon name="chart" className="w-5 h-5 text-sky-300" />
              </div>
              <h3 className="text-xl font-bold mb-1">مؤشر الأسعار</h3>
              <p className="text-white/80 text-xs leading-relaxed">
                رسم بياني تفاعلي يوضح اتجاهات أسعار النعيمي والحري والنجدي على مدار 8 أشهر.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1.5 font-bold text-xs text-sky-300 group-hover:translate-x-[-4px] transition-transform">
              <span>افتح المؤشر</span>
              <Icon name="left" className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Tile 4: Breeders */}
          <div
            onClick={() => navigate('breeders')}
            className="p-6 rounded-3xl bg-gradient-to-br from-[#2c6a78] to-[#143f4a] text-white flex flex-col justify-between shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer relative overflow-hidden group min-h-[200px]"
          >
            <div>
              <div className="w-11 h-11 rounded-2xl bg-white/15 grid place-items-center mb-3">
                <Icon name="shield" className="w-5 h-5 text-emerald-300" />
              </div>
              <h3 className="text-xl font-bold mb-1">المربون الموثّقون</h3>
              <p className="text-white/80 text-xs leading-relaxed">
                أكثر من 1,200 مربٍّ معتمد مع سجلات صحية وتقييمات حقيقية من المشترين.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1.5 font-bold text-xs text-emerald-300 group-hover:translate-x-[-4px] transition-transform">
              <span>تعرّف عليهم</span>
              <Icon name="left" className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Tile 5: Buyer Checklist */}
          <div
            onClick={() => navigate('checklist')}
            className="p-6 rounded-3xl bg-gradient-to-br from-[#7a3f5a] to-[#4b2236] text-white flex flex-col justify-between shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer relative overflow-hidden group min-h-[200px]"
          >
            <div>
              <div className="w-11 h-11 rounded-2xl bg-white/15 grid place-items-center mb-3">
                <Icon name="clip" className="w-5 h-5 text-purple-300" />
              </div>
              <h3 className="text-xl font-bold mb-1">قائمة فحص المشتري</h3>
              <p className="text-white/80 text-xs leading-relaxed">
                ثمانية معايير بيطرية أساسية لفحص العينين والتنفس والأسنان قبل تحويل المبلغ.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1.5 font-bold text-xs text-purple-300 group-hover:translate-x-[-4px] transition-transform">
              <span>ابدأ الفحص</span>
              <Icon name="left" className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Tile 6: Breed Guide (Wide) */}
          <div
            onClick={() => navigate('guide')}
            className="lg:col-span-2 p-6 rounded-3xl bg-gradient-to-br from-[#5c7a2c] to-[#34471a] text-white flex flex-col justify-between shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer relative overflow-hidden group min-h-[200px]"
          >
            <div>
              <div className="w-11 h-11 rounded-2xl bg-white/15 grid place-items-center mb-3">
                <Icon name="book" className="w-5 h-5 text-lime-300" />
              </div>
              <h3 className="text-xl font-bold mb-1">دليل السلالات الشامل</h3>
              <p className="text-white/80 text-xs leading-relaxed max-w-md">
                تعرّف على الفروقات الدقيقة بين النعيمي والحري والنجدي والسواكني من حيث حجم الذبيحة وطراوة اللحم وتحمل الطقس.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1.5 font-bold text-xs text-lime-300 group-hover:translate-x-[-4px] transition-transform">
              <span>استكشف السلالات</span>
              <Icon name="left" className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Featured Listings with the New Unified Template */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-right">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-[#b98425] uppercase tracking-wider block mb-1">
              مواشي مختارة ومفحوصة
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-950 dark:text-white">
              أحدث الإعلانات المميزة
            </h2>
          </div>
          <button
            type="button"
            onClick={() => navigate('listings')}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0f4a36] dark:text-[#58d39a] hover:gap-2.5 transition-all cursor-pointer"
          >
            <span>عرض كل الإعلانات ({listings.length})</span>
            <Icon name="left" className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((ad) => (
            <ListingCard key={ad.id} listing={ad} />
          ))}
        </div>
      </section>

      {/* 5. Shop By Occasion */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-right">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-[#b98425] uppercase tracking-wider block mb-1">
              تجهيز كامل لمناسبتك
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-950 dark:text-white">
              تسوّق حسب المناسبة
            </h2>
          </div>
          <button
            type="button"
            onClick={() => navigate('occasions')}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0f4a36] dark:text-[#58d39a] hover:gap-2.5 transition-all cursor-pointer"
          >
            <span>دليل جميع المناسبات</span>
            <Icon name="left" className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {OCCASIONS.map((occ, idx) => {
            const matched = listings.filter((a) => {
              if (occ.f.cat && a.cat !== occ.f.cat) return false;
              if (occ.f.sex && a.sex !== occ.f.sex) return false;
              if (occ.f.max && a.price > Number(occ.f.max)) return false;
              return true;
            });
            const minPrice = matched.length ? Math.min(...matched.map((a) => a.price)) : 2500;

            return (
              <div
                key={occ.t}
                onClick={() => navigate('occasions', { id: idx })}
                className="bg-white dark:bg-[#122119] border border-gray-200/80 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer flex flex-col group"
              >
                <div
                  className="h-36 relative overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${occ.bg[0]}, ${occ.bg[1]})` }}
                >
                  <div className="absolute inset-0 flex items-center justify-center p-4">
                    <svg viewBox="0 18 220 130" className="w-32 h-24 fill-current text-gray-800/80 group-hover:scale-105 transition-transform">
                      <use href="#sheep" />
                    </svg>
                  </div>
                </div>

                <div className="p-5 flex flex-col justify-between flex-1 gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{occ.t}</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{occ.d}</p>
                  </div>
                  <div className="pt-3 border-t border-gray-100 dark:border-white/10 flex items-center justify-between text-xs">
                    <span className="text-gray-500 dark:text-gray-400">{matched.length} إعلان متاح</span>
                    <b className="font-['Readex_Pro',sans-serif] text-sm text-[#0f4a36] dark:text-[#58d39a] font-bold">
                      من {fmt(minPrice)} ر.س
                    </b>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. Verified Breeders Spotlight */}
      <section className="bg-emerald-50/60 dark:bg-[#0c1812] py-16 px-4 sm:px-6 lg:px-8 border-y border-emerald-900/10 dark:border-white/5 text-right">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold text-[#b98425] uppercase tracking-wider block mb-1">
                مزارع مرخصة وموثوقة
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-950 dark:text-white">
                مربون معتمدون في المملكة
              </h2>
            </div>
            <button
              type="button"
              onClick={() => navigate('breeders')}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0f4a36] dark:text-[#58d39a] hover:gap-2.5 transition-all cursor-pointer"
            >
              <span>عرض كل المربين ({breeders.length - 1})</span>
              <Icon name="left" className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {breeders.slice(0, 3).map((b) => (
              <div
                key={b.n}
                className="bg-white dark:bg-[#122119] border border-gray-200/80 dark:border-white/10 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-3.5 mb-4">
                    <span
                      className="w-14 h-14 rounded-2xl text-white font-bold grid place-items-center text-xl shrink-0 shadow-sm"
                      style={{ backgroundColor: b.c }}
                    >
                      {b.n.charAt(0)}
                    </span>
                    <div>
                      <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                        <span>{b.n}</span>
                        <Icon name="shield" className="w-4 h-4 text-[#0f4a36] dark:text-[#58d39a]" />
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-1">
                        <span className="flex items-center gap-1">
                          <Icon name="pin" className="w-3.5 h-3.5 text-gray-400" />
                          <span>{b.r}</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-amber-500 font-bold">
                          <Icon name="star" className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>{b.rt.toFixed(1)}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{b.d}</p>
                </div>

                <div className="pt-4 border-t border-gray-100 dark:border-white/10 flex items-center justify-between text-xs">
                  <span className="text-gray-500 dark:text-gray-400 font-medium">{b.ads} إعلان نشط</span>
                  <button
                    type="button"
                    onClick={() => navigate('listings', { breeder: b.n })}
                    className="font-bold text-[#0f4a36] dark:text-[#58d39a] hover:underline cursor-pointer"
                  >
                    عرض إعلانات المربي ←
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Articles & Advice */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-right">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-[#b98425] uppercase tracking-wider block mb-1">
              ثقافة ومعرفة
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-950 dark:text-white">
              مقالات وإرشادات للمشتري
            </h2>
          </div>
          <button
            type="button"
            onClick={() => navigate('articles')}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0f4a36] dark:text-[#58d39a] hover:gap-2.5 transition-all cursor-pointer"
          >
            <span>كل المقالات والنصائح</span>
            <Icon name="left" className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ARTICLES.slice(0, 3).map((art, idx) => (
            <div
              key={art.t}
              onClick={() => navigate('articles', { id: idx })}
              className="bg-white dark:bg-[#122119] border border-gray-200/80 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer flex flex-col group"
            >
              <div
                className="h-36 grid place-items-center text-white"
                style={{ background: art.bg }}
              >
                <Icon name={art.icon} className="w-12 h-12 text-white/90 group-hover:scale-110 transition-transform" />
              </div>

              <div className="p-5 flex flex-col justify-between flex-1 gap-3">
                <div>
                  <span className="text-xs font-bold text-[#b98425] block mb-1">{art.tag}</span>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white leading-snug mb-1">
                    {art.t}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2">
                    {art.lead}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 dark:border-white/10 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <Icon name="clock" className="w-3.5 h-3.5" />
                    <span>قراءة {art.min} دقائق</span>
                  </span>
                  <span className="text-[#0f4a36] dark:text-[#58d39a] font-bold group-hover:translate-x-[-2px] transition-transform">
                    اقرأ المزيد ←
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Call To Action (Add Listing) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-gradient-to-r from-[#0a3123] via-[#0f4a36] to-[#14604a] text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-emerald-600/30 flex flex-col md:flex-row items-center justify-between gap-8 text-right">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block mb-2">
              لأصحاب المزارع والمربين في كافة المناطق
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
              هل لديك أغنام أو ماعز ترغب في بيعها؟
            </h2>
            <p className="mt-3 text-sm sm:text-base text-emerald-100/85 leading-relaxed">
              انشر إعلانك مجاناً وبكل سهولة، واحصل على وصول مباشر لأكثر من 25,000 مشترٍ مسجل يبحثون عن أضاحٍ،
              وعقائق، وولائم أسبوعية.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => navigate('add-ad')}
              className="bg-[#b98425] hover:bg-amber-600 text-white font-bold py-3.5 px-7 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              <Icon name="plus" className="w-5 h-5" />
              <span>أضف إعلانك الآن مجاناً</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('how')}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/25 font-bold py-3.5 px-6 rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              <Icon name="info" className="w-5 h-5" />
              <span>كيف يعمل البيع؟</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
