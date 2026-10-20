import React, { useState } from 'react';
import { PageBanner } from '../components/PageBanner';
import { BREED_GUIDE, PAL, fmt, pv, getSkyStyle } from '../data/initialData';
import { useApp } from '../context/AppContext';
import { Icon } from '../components/Icons';

export const GuidePage: React.FC = () => {
  const { listings, navigate } = useApp();
  const [selectedBreedIdx, setSelectedBreedIdx] = useState(0);

  const guide = BREED_GUIDE[selectedBreedIdx] || BREED_GUIDE[0];
  const matchingAds = listings.filter((a) => a.type === guide.k);
  const avgPrice = matchingAds.length
    ? Math.round(matchingAds.reduce((s, a) => s + a.price, 0) / matchingAds.length)
    : 0;

  const sampleAd = {
    pal: guide.pal,
    sk: guide.sk,
    horns: guide.horns,
    id: 0,
    goat: 0,
    cat: 'sheep' as const,
  };

  return (
    <div className="space-y-10">
      <PageBanner
        title="دليل سلالات المواشي في الجزيرة العربية"
        subtitle="تعرّف على مزايا كل سلالة، حجم الذبيحة، طراوة اللحم، وملاءمتها للمناسبات والتربية"
        badge="دليل المشتري والمعاينة"
        icon="book"
        crumbs={[{ label: 'دليل السلالات' }]}
        tone="green"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-right space-y-8">
        {/* Breed Selector Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 dark:border-white/10 pb-4">
          {BREED_GUIDE.map((g, idx) => (
            <button
              key={g.k}
              type="button"
              onClick={() => setSelectedBreedIdx(idx)}
              className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all cursor-pointer ${
                selectedBreedIdx === idx
                  ? 'bg-[#0f4a36] text-white shadow-md'
                  : 'bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-50'
              }`}
            >
              سلالة {g.k}
            </button>
          ))}
        </div>

        {/* Selected Breed Deep Dive Panel */}
        <div className="bg-white dark:bg-[#122119] border border-gray-200/80 dark:border-white/10 rounded-3xl overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* Visual Artwork Showcase */}
          <div
            className="lg:col-span-5 relative min-h-[320px] p-8 flex items-center justify-center overflow-hidden"
            style={getSkyStyle(guide.sk)}
          >
            <span className="absolute top-4 left-6 text-7xl font-black text-black/10 select-none">
              {guide.k}
            </span>
            <div className="w-64 h-52 relative z-10">
              <svg viewBox="0 18 220 130" className="w-full h-full drop-shadow-md">
                <use href={guide.horns ? '#ram' : '#sheep'} style={pv(PAL[guide.pal])} />
              </svg>
            </div>
          </div>

          {/* Details & Meters */}
          <div className="lg:col-span-7 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-black text-gray-900 dark:text-white">سلالة {guide.k}</h2>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-[#0f4a36] dark:text-[#58d39a]">
                  متوسط السعر: {fmt(avgPrice)} ر.س
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{guide.lead}</p>
            </div>

            {/* Meters (Rating 1 to 5) */}
            <div className="space-y-3 bg-gray-50 dark:bg-white/5 p-4 rounded-2xl border border-gray-200/80 dark:border-white/10 text-xs">
              <h4 className="font-bold text-gray-700 dark:text-gray-300 mb-2">تقييم المواصفات القياسية:</h4>
              {guide.m.map(([label, score]) => (
                <div key={label} className="grid grid-cols-12 items-center gap-3">
                  <span className="col-span-4 font-semibold text-gray-600 dark:text-gray-400">{label}</span>
                  <div className="col-span-8 bg-gray-200 dark:bg-white/10 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-l from-amber-500 to-emerald-600 h-full rounded-full"
                      style={{ width: `${(score / 5) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Facts Table */}
            <div className="grid grid-cols-2 gap-2 text-xs bg-gray-50 dark:bg-white/5 p-4 rounded-2xl border border-gray-200/80 dark:border-white/10">
              {guide.f.map(([label, val]) => (
                <div key={label}>
                  <small className="text-gray-400 block">{label}</small>
                  <b className="text-gray-900 dark:text-white font-bold">{val}</b>
                </div>
              ))}
            </div>

            {/* Expert Tip Box */}
            <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300/40 text-xs text-amber-900 dark:text-amber-200 leading-relaxed font-semibold">
              💡 <b>نصيحة الخبير:</b> {guide.tip}
            </div>

            {/* Action */}
            <button
              type="button"
              onClick={() => navigate('listings', { type: guide.k })}
              className="w-full bg-[#0f4a36] hover:bg-[#156047] text-white py-3 rounded-xl font-bold text-xs shadow transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Icon name="search" className="w-4 h-4" />
              <span>تصفّح إعلانات {guide.k} في السوق ({matchingAds.length} متوفر)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
