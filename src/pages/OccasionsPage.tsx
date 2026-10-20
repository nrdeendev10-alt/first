import React, { useState } from 'react';
import { PageBanner } from '../components/PageBanner';
import { OCCASIONS, OCCASIONS_INFO, fmt } from '../data/initialData';
import { ListingCard } from '../components/ListingCard';
import { useApp } from '../context/AppContext';
import { Icon } from '../components/Icons';

export const OccasionsPage: React.FC = () => {
  const { listings, params, navigate } = useApp();
  const [selectedOccIdx, setSelectedOccIdx] = useState<number>(
    params.id !== undefined ? Number(params.id) : 0
  );

  const occ = OCCASIONS[selectedOccIdx] || OCCASIONS[0];
  const info = OCCASIONS_INFO[selectedOccIdx] || OCCASIONS_INFO[0];

  const matchedAds = listings.filter((a) => {
    if (occ.f.cat && a.cat !== occ.f.cat) return false;
    if (occ.f.sex && a.sex !== occ.f.sex) return false;
    if (occ.f.max && a.price > Number(occ.f.max)) return false;
    return true;
  });

  const minPrice = matchedAds.length ? Math.min(...matchedAds.map((a) => a.price)) : 0;

  return (
    <div className="space-y-10">
      <PageBanner
        title="تسوّق الأغنام حسب المناسبة"
        subtitle="عقيقة، وليمة زواج، عزيمة عائلية، أو مزرعة وتربية - كل مناسبة ولها مواصفاتها المناسبة"
        badge="دليل المناسبات"
        icon="star"
        crumbs={[{ label: 'حسب المناسبة' }]}
        tone="gold"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-right space-y-8">
        {/* Occasions Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 dark:border-white/10 pb-4">
          {OCCASIONS.map((o, idx) => (
            <button
              key={o.t}
              type="button"
              onClick={() => setSelectedOccIdx(idx)}
              className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all cursor-pointer ${
                selectedOccIdx === idx
                  ? 'bg-[#b98425] text-white shadow-md'
                  : 'bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-50'
              }`}
            >
              {o.t}
            </button>
          ))}
        </div>

        {/* Occasion Spotlight Header */}
        <div className="bg-white dark:bg-[#122119] border border-gray-200/80 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black text-gray-900 dark:text-white">{occ.t}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{occ.d}</p>
            </div>
            <button
              type="button"
              onClick={() => navigate('listings', { cat: occ.f.cat, sex: occ.f.sex })}
              className="bg-[#0f4a36] text-white text-xs font-bold py-2.5 px-5 rounded-xl shadow-sm self-start sm:self-auto cursor-pointer"
            >
              عرض جميع إعلانات {occ.t} ({matchedAds.length})
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-900/10 dark:border-white/5">
              <small className="text-gray-500 dark:text-gray-400 block text-xs mb-1">العدد المعتاد للمناسبة</small>
              <b className="font-['Readex_Pro',sans-serif] text-lg font-bold text-[#b98425]">{info.heads}</b>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-900/10 dark:border-white/5">
              <small className="text-gray-500 dark:text-gray-400 block text-xs mb-1">تبدأ الأسعار في السوق من</small>
              <b className="font-['Readex_Pro',sans-serif] text-lg font-bold text-[#0f4a36] dark:text-[#58d39a]">
                {minPrice ? `${fmt(minPrice)} ر.س` : '—'}
              </b>
            </div>
          </div>

          {/* Tips List */}
          <div className="space-y-2 pt-2 border-t border-gray-100 dark:border-white/10">
            <h4 className="text-xs font-bold text-gray-700 dark:text-gray-300">إرشادات الشراء لهذه المناسبة:</h4>
            <ul className="space-y-1.5 text-xs text-gray-600 dark:text-gray-400">
              {info.tips.map((tip, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <Icon name="check" className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Matched Ads Grid */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">إعلانات ملائمة لـ {occ.t}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchedAds.slice(0, 6).map((ad) => (
              <ListingCard key={ad.id} listing={ad} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
