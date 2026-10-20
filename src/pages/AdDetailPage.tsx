import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PageBanner } from '../components/PageBanner';
import { AdImageTemplate } from '../components/AdImageTemplate';
import { ListingCard } from '../components/ListingCard';
import { fmt, ageText, sexLabel } from '../data/initialData';
import { Icon } from '../components/Icons';

export const AdDetailPage: React.FC = () => {
  const {
    listings,
    params,
    navigate,
    favorites,
    toggleFavorite,
    compareList,
    toggleCompare,
    deleteUserListing,
    deleteListing,
    toggleVerifyListing,
    toggleFeatureListing,
    breeders,
    isAdmin,
    showToast
  } = useApp();
  const [phoneRevealed, setPhoneRevealed] = useState(false);
  const [msgText, setMsgText] = useState('');

  const adId = params.id ? Number(params.id) : 1001;
  const ad = listings.find((a) => a.id === adId) || listings[0];

  if (!ad) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">الإعلان غير موجود أو انتهت صلاحيته</h2>
        <button
          type="button"
          onClick={() => navigate('listings')}
          className="bg-[#0f4a36] text-white font-bold py-2.5 px-6 rounded-xl"
        >
          العودة لسوق الإعلانات
        </button>
      </div>
    );
  }

  const breeder = breeders[ad.b] || breeders[0];
  const isFav = favorites.includes(ad.id);
  const isCmp = compareList.includes(ad.id);

  // Market price comparison calculations
  const sameBreedAds = listings.filter((x) => x.type === ad.type);
  const avgPrice = Math.round(sameBreedAds.reduce((sum, x) => sum + x.price, 0) / sameBreedAds.length);
  const priceDiffPct = Math.round(((ad.price - avgPrice) / avgPrice) * 100);
  const pricePerKg = Math.round(ad.price / ad.kg);

  const verdict =
    Math.abs(priceDiffPct) < 5
      ? 'قريب جداً من متوسط أسعار السلالة في السوق'
      : priceDiffPct < 0
      ? `أوفر من متوسط السلالة بنحو ${Math.abs(priceDiffPct)}% (فرصة مميزة)`
      : `أعلى من متوسط السلالة بنحو ${priceDiffPct}%`;

  // Similar listings
  const similarAds = listings
    .filter((x) => x.id !== ad.id && x.cat === ad.cat)
    .sort((a, b) => Math.abs(a.price - ad.price) - Math.abs(b.price - ad.price))
    .slice(0, 3);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('تم نسخ رابط الإعلان بنجاح');
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('تم إرسال رسالتك للبائع بنجاح (سيصلك الرد عبر الواتساب/الجوال)');
    setMsgText('');
  };

  return (
    <div className="space-y-10">
      {/* Page Banner with Breadcrumbs */}
      <PageBanner
        title={ad.t}
        subtitle={`سلالة ${ad.type} أصيلة ومفحوصة - معروض في منطقة ${ad.reg}`}
        badge={ad.v ? 'إعلان موثّق بالترخيص' : 'إعلان جديد'}
        icon="shield"
        crumbs={[
          { label: 'سوق الإعلانات', onClick: () => navigate('listings') },
          { label: ad.type, onClick: () => navigate('listings', { type: ad.type }) },
          { label: `إعلان #${ad.id}` },
        ]}
        tone="green"
      />

      {/* Admin Quick Action Toolbar */}
      {isAdmin && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-3.5 bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800/60 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs shadow-sm">
            <div className="flex items-center gap-2 font-bold text-amber-900 dark:text-amber-200">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
              <span>تحكّم المشرف السريع في هذا الإعلان (#{ad.id})</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => toggleVerifyListing(ad.id)}
                className="px-3 py-1.5 rounded-lg font-bold bg-[#0f4a36] text-white hover:bg-emerald-800 transition-colors cursor-pointer"
              >
                {ad.v === 1 ? 'إلغاء التوثيق' : 'توثيق الإعلان ✓'}
              </button>
              <button
                type="button"
                onClick={() => toggleFeatureListing(ad.id)}
                className="px-3 py-1.5 rounded-lg font-bold bg-amber-600 text-white hover:bg-amber-700 transition-colors cursor-pointer"
              >
                {ad.fl === 1 ? 'إلغاء التمييز' : 'تمييز الإعلان ★'}
              </button>
              <button
                type="button"
                onClick={() => {
                  if (window.confirm('هل أنت متأكد من حذف هذا الإعلان كمدير للنظام؟')) {
                    deleteListing(ad.id);
                    navigate('listings');
                  }
                }}
                className="px-3 py-1.5 rounded-lg font-bold bg-rose-600 text-white hover:bg-rose-700 transition-colors cursor-pointer"
              >
                حذف الإعلان 🗑️
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-right">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-6">
            {/* Branded Showcase Frame with Overlaid Information Template */}
            <div className="bg-white dark:bg-[#122119] border border-gray-200/80 dark:border-white/10 rounded-3xl overflow-hidden shadow-md">
              <AdImageTemplate listing={ad} isFav={isFav} isCmp={isCmp} />
            </div>

            {/* Description Card */}
            <div className="bg-white dark:bg-[#122119] border border-gray-200/80 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Icon name="file" className="w-5 h-5 text-[#0f4a36] dark:text-[#58d39a]" />
                <span>تفاصيل ووصف الإعلان</span>
              </h2>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {ad.d || 'خروف أصيل بحالة صحية ممتازة، تغذية طبيعية على الشعير والبرسيم، محصن وجاهز للمعاينة والتسليم.'}
              </p>
            </div>

            {/* Price vs Market Analytics Card */}
            <div className="bg-white dark:bg-[#122119] border border-gray-200/80 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Icon name="chart" className="w-5 h-5 text-[#b98425]" />
                  <span>تحليل السعر مقارنةً بالسوق اليوم</span>
                </h3>
                <span className="text-xs text-gray-400 font-medium">محدّث لحظياً</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-900/10 dark:border-white/5">
                  <small className="block text-xs text-gray-500 dark:text-gray-400 mb-1">سعر هذا الإعلان</small>
                  <b className="font-['Readex_Pro',sans-serif] text-xl font-extrabold text-[#0f4a36] dark:text-[#58d39a]">
                    {fmt(ad.price)} ر.س
                  </b>
                </div>

                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                  <small className="block text-xs text-gray-500 dark:text-gray-400 mb-1">متوسط سلالة {ad.type}</small>
                  <b className="font-['Readex_Pro',sans-serif] text-xl font-extrabold text-gray-800 dark:text-gray-200">
                    {fmt(avgPrice)} ر.س
                  </b>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-900/10 dark:border-white/5">
                  <small className="block text-xs text-gray-500 dark:text-gray-400 mb-1">سعر الكيلو الحي تقريباً</small>
                  <b className="font-['Readex_Pro',sans-serif] text-xl font-extrabold text-[#b98425]">
                    ~{fmt(pricePerKg)} ر.س/كجم
                  </b>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-100/70 dark:bg-emerald-950/60 border border-emerald-800/20 text-xs text-emerald-950 dark:text-emerald-200 font-semibold flex items-center gap-2">
                <Icon name="shield" className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{verdict}</span>
              </div>
            </div>
          </div>

          {/* Sidebar Action Column */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
            {/* Price & Specs Card */}
            <div className="bg-white dark:bg-[#122119] border border-gray-200/80 dark:border-white/10 rounded-3xl p-6 shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-white/10">
                <div>
                  <small className="text-xs text-gray-400 block">السعر المطلوب</small>
                  <div className="font-['Readex_Pro',sans-serif] text-3xl font-black text-[#0f4a36] dark:text-[#58d39a]">
                    {fmt(ad.price)} <small className="text-sm font-bold text-gray-500">ر.س</small>
                  </div>
                </div>
                <span className="text-sm font-bold px-3 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-[#0f4a36] dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40">
                  {ad.type}
                </span>
              </div>

              {/* Specifications Table */}
              <div className="grid grid-cols-2 gap-2 text-xs bg-gray-50 dark:bg-white/5 p-3 rounded-2xl border border-gray-200/80 dark:border-white/10">
                <div>
                  <span className="text-gray-400 block">الجنس:</span>
                  <b className="text-gray-900 dark:text-white font-bold">{sexLabel(ad)}</b>
                </div>
                <div>
                  <span className="text-gray-400 block">العمر:</span>
                  <b className="text-gray-900 dark:text-white font-bold">{ageText(ad.age)}</b>
                </div>
                <div>
                  <span className="text-gray-400 block">الوزن الحي التقريبي:</span>
                  <b className="text-gray-900 dark:text-white font-bold">~{ad.kg} كجم</b>
                </div>
                <div>
                  <span className="text-gray-400 block">المنطقة:</span>
                  <b className="text-gray-900 dark:text-white font-bold">{ad.reg}</b>
                </div>
                <div>
                  <span className="text-gray-400 block">القرون:</span>
                  <b className="text-gray-900 dark:text-white font-bold">{ad.horns ? 'مقرّن' : 'أجم (بلا قرون)'}</b>
                </div>
                <div>
                  <span className="text-gray-400 block">رقم الإعلان:</span>
                  <b className="text-gray-900 dark:text-white font-bold">#{ad.id}</b>
                </div>
              </div>

              {/* Contact / Phone Action */}
              <div className="space-y-3 pt-2">
                {!phoneRevealed ? (
                  <button
                    type="button"
                    onClick={() => setPhoneRevealed(true)}
                    className="w-full bg-[#0f4a36] hover:bg-[#156047] text-white font-bold py-3.5 px-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
                  >
                    <Icon name="phone" className="w-4 h-4" />
                    <span>إظهار رقم التواصل المباشر</span>
                  </button>
                ) : (
                  <a
                    href={ad.phone ? `tel:${ad.phone}` : 'tel:0500000000'}
                    dir="ltr"
                    className="block w-full bg-emerald-50 text-[#0f4a36] font-['Readex_Pro',sans-serif] font-bold text-center py-3.5 px-4 rounded-2xl border-2 border-[#0f4a36] text-lg shadow-sm"
                  >
                    {ad.phone || '055 123 4567'}
                  </a>
                )}

                {/* Secondary Actions Row */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => toggleFavorite(ad.id)}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                      isFav
                        ? 'bg-rose-50 border-rose-300 text-rose-600'
                        : 'border-gray-200 dark:border-white/15 hover:bg-gray-50 dark:hover:bg-white/5'
                    }`}
                  >
                    <Icon name="heart" className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                    <span>{isFav ? 'في المفضلة' : 'حفظ بالمفضلة'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleCompare(ad.id)}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                      isCmp
                        ? 'bg-emerald-50 border-emerald-300 text-[#0f4a36]'
                        : 'border-gray-200 dark:border-white/15 hover:bg-gray-50 dark:hover:bg-white/5'
                    }`}
                  >
                    <Icon name="layers" className="w-4 h-4" />
                    <span>{isCmp ? 'في المقارنة' : 'مقارنة'}</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleShare}
                    className="flex-1 py-2 px-3 rounded-xl border border-gray-200 dark:border-white/15 text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-gray-50 dark:hover:bg-white/5"
                  >
                    <Icon name="share" className="w-3.5 h-3.5" />
                    <span>مشاركة</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="flex-1 py-2 px-3 rounded-xl border border-gray-200 dark:border-white/15 text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-gray-50 dark:hover:bg-white/5"
                  >
                    <Icon name="print" className="w-3.5 h-3.5" />
                    <span>طباعة</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate('contact', { sub: 'report', ad: String(ad.id) })}
                    className="py-2 px-3 rounded-xl border border-rose-200 text-rose-600 dark:text-rose-400 text-xs font-semibold flex items-center justify-center gap-1 hover:bg-rose-50 dark:hover:bg-rose-950/30"
                    title="إبلاغ عن إعلان مخالف"
                  >
                    <Icon name="warn" className="w-3.5 h-3.5" />
                    <span>إبلاغ</span>
                  </button>
                </div>

                {/* If created by user: Delete option */}
                {ad.user && (
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm('هل أنت متأكد من حذف هذا الإعلان؟')) {
                        deleteUserListing(ad.id);
                      }
                    }}
                    className="w-full mt-2 text-rose-600 dark:text-rose-400 text-xs font-bold hover:underline"
                  >
                    حذف إعلاني من الموقع
                  </button>
                )}
              </div>
            </div>

            {/* Breeder Profile Card */}
            <div className="bg-white dark:bg-[#122119] border border-gray-200/80 dark:border-white/10 rounded-3xl p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-3">
                <span
                  className="w-12 h-12 rounded-2xl text-white font-bold grid place-items-center text-lg shrink-0"
                  style={{ backgroundColor: breeder.c }}
                >
                  {breeder.n.charAt(0)}
                </span>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-1">
                    <span>{breeder.n}</span>
                    <Icon name="shield" className="w-3.5 h-3.5 text-[#0f4a36] dark:text-[#58d39a]" />
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    <span>{breeder.r}</span>
                    <span>•</span>
                    <span className="text-amber-500 font-bold">★ {breeder.rt.toFixed(1)}</span>
                  </div>
                </div>
              </div>
              {breeder.d && <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{breeder.d}</p>}
              <button
                type="button"
                onClick={() => navigate('listings', { breeder: breeder.n })}
                className="w-full text-xs font-bold text-[#0f4a36] dark:text-[#58d39a] bg-emerald-50 dark:bg-emerald-950/60 py-2 rounded-xl text-center hover:bg-emerald-100 transition-colors cursor-pointer"
              >
                جميع عروض هذا المربي ({breeder.ads})
              </button>
            </div>

            {/* Quick Message Form */}
            <div className="bg-white dark:bg-[#122119] border border-gray-200/80 dark:border-white/10 rounded-3xl p-5 shadow-sm space-y-3">
              <h4 className="text-sm font-bold text-gray-900 dark:text-white">أرسل استفساراً سريعاً للبائع</h4>
              <form onSubmit={handleSendMessage} className="space-y-3">
                <textarea
                  rows={3}
                  value={msgText}
                  onChange={(e) => setMsgText(e.target.value)}
                  placeholder={`السلام عليكم، هل رأس الخروف رقم #${ad.id} ما زال متاحاً للمعاينة؟`}
                  className="w-full text-xs p-3 rounded-xl border border-gray-200 dark:border-white/15 bg-gray-50 dark:bg-white/5 outline-none resize-none"
                />
                <button
                  type="submit"
                  className="w-full bg-[#0f4a36] hover:bg-[#156047] text-white text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5 shadow transition-colors cursor-pointer"
                >
                  <Icon name="send" className="w-3.5 h-3.5" />
                  <span>إرسال الرسالة للبائع</span>
                </button>
              </form>
            </div>
          </aside>
        </div>

        {/* Similar Listings Section */}
        {similarAds.length > 0 && (
          <section className="mt-16 pt-12 border-t border-gray-200 dark:border-white/10 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">إعلانات مشابهة قد تهمك</h3>
              <button
                type="button"
                onClick={() => navigate('listings', { cat: ad.cat })}
                className="text-xs font-bold text-[#0f4a36] dark:text-[#58d39a] hover:underline"
              >
                المزيد من هذه السلالة ←
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarAds.map((sim) => (
                <ListingCard key={sim.id} listing={sim} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
