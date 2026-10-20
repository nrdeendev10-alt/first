import React from 'react';
import { useApp } from '../context/AppContext';
import { fmt } from '../data/initialData';
import { Icon } from './Icons';

export const CompareTray: React.FC = () => {
  const { compareList, removeFromCompare, clearCompare, listings, navigate, page } = useApp();

  if (compareList.length === 0 || page === 'compare') {
    return null;
  }

  const selectedAds = compareList.map((id) => listings.find((a) => a.id === id)).filter(Boolean);

  return (
    <div className="fixed bottom-6 inset-x-4 max-w-2xl mx-auto z-40 animate-slide-up">
      <div className="bg-[#0a3123]/95 backdrop-blur-xl text-white rounded-2xl p-3 shadow-2xl border border-white/20 flex flex-wrap items-center justify-between gap-3 text-right">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-amber-400 text-emerald-950 grid place-items-center font-bold text-xs">
            {compareList.length}
          </span>
          <div>
            <b className="block text-xs font-bold text-white">قائمة المقارنة المباشرة</b>
            <small className="text-[10px] text-emerald-200">قارن المواصفات والأسعار بدقة</small>
          </div>
        </div>

        {/* Selected items chips */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {selectedAds.map((ad) => (
            <span
              key={ad!.id}
              className="inline-flex items-center gap-1.5 bg-white/10 text-white text-xs px-2.5 py-1 rounded-lg border border-white/15"
            >
              <span>{ad!.type}</span>
              <span className="text-amber-300 font-bold">{fmt(ad!.price)} ر.س</span>
              <button
                type="button"
                onClick={() => removeFromCompare(ad!.id)}
                className="hover:text-rose-400 p-0.5 cursor-pointer"
                title="إزالة"
              >
                ✕
              </button>
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {compareList.length >= 2 ? (
            <button
              type="button"
              onClick={() => navigate('compare')}
              className="bg-[#b98425] hover:bg-amber-600 text-white text-xs font-bold px-4 py-2 rounded-xl shadow transition-colors cursor-pointer"
            >
              قارن الآن
            </button>
          ) : (
            <span className="text-[11px] text-emerald-200/80">اختر إعلاناً آخر للمقارنة</span>
          )}

          <button
            type="button"
            onClick={clearCompare}
            className="text-white/70 hover:text-white text-xs px-2 py-1 cursor-pointer"
          >
            مسح
          </button>
        </div>
      </div>
    </div>
  );
};
