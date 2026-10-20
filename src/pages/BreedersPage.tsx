import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { PageBanner } from '../components/PageBanner';
import { REGIONS } from '../data/initialData';
import { Icon } from '../components/Icons';

export const BreedersPage: React.FC = () => {
  const { listings, navigate, breeders } = useApp();
  const [selectedRegion, setSelectedRegion] = useState('');
  const [sortBy, setSortBy] = useState<'rt' | 'ads' | 'yrs'>('rt');

  // Exclude placeholder 'إعلانك' entry if present
  const breedersList = useMemo(() => breeders.filter((b) => b.n !== 'إعلانك'), [breeders]);

  const filteredBreeders = useMemo(() => {
    return breedersList
      .filter((b) => !selectedRegion || b.r === selectedRegion)
      .sort((a, b) => b[sortBy] - a[sortBy]);
  }, [breedersList, selectedRegion, sortBy]);

  return (
    <div className="space-y-10">
      <PageBanner
        title="دليل المربين المعتمدين في المملكة"
        subtitle="مزارع مرخصة وموثقة بهويات وسجلات تجارية رسمية، مع شهادات صحية للمواشي"
        badge="مربون معتمدون"
        icon="shield"
        crumbs={[{ label: 'المربون' }]}
        tone="teal"
        chips={[
          { label: '+1,200 مربٍّ معتمد', icon: 'shield' },
          { label: 'سجلات صحية معتمدة', icon: 'check' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-right space-y-8">
        {/* Filter bar */}
        <div className="bg-white dark:bg-[#122119] border border-gray-200/80 dark:border-white/10 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            عرض <b className="text-[#0f4a36] dark:text-[#58d39a]">{filteredBreeders.length}</b> مربٍّ معتمد
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="text-xs bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/15 rounded-xl px-3 py-2 outline-none font-semibold cursor-pointer w-full sm:w-48"
            >
              <option value="">كل المناطق</option>
              {REGIONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/15 rounded-xl px-3 py-2 outline-none font-semibold cursor-pointer w-full sm:w-40"
            >
              <option value="rt">الأعلى تقييماً</option>
              <option value="ads">الأكثر إعلانات</option>
              <option value="yrs">الأطول خبرة</option>
            </select>
          </div>
        </div>

        {/* Breeders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBreeders.map((b) => {
            const breederAdsCount = listings.filter((a) => breeders[a.b]?.n === b.n).length;

            return (
              <div
                key={b.n}
                className="bg-white dark:bg-[#122119] border border-gray-200/80 dark:border-white/10 rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between gap-5"
              >
                <div>
                  <div className="flex items-center gap-3.5 mb-4">
                    <span
                      className="w-16 h-16 rounded-2xl text-white font-bold grid place-items-center text-2xl shrink-0 shadow-sm"
                      style={{ backgroundColor: b.c }}
                    >
                      {b.n.charAt(0)}
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                        <span>{b.n}</span>
                        <Icon name="shield" className="w-4 h-4 text-[#0f4a36] dark:text-[#58d39a]" />
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-1">
                        <span className="flex items-center gap-1">
                          <Icon name="pin" className="w-3.5 h-3.5 text-gray-400" />
                          <span>{b.r}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Stats dl */}
                  <div className="grid grid-cols-3 gap-2 text-center bg-gray-50 dark:bg-white/5 p-3 rounded-2xl border border-gray-200/80 dark:border-white/10 mb-4 text-xs">
                    <div>
                      <small className="text-gray-400 block">التقييم</small>
                      <b className="font-['Readex_Pro',sans-serif] text-base text-amber-500 font-bold">
                        ★ {b.rt.toFixed(1)}
                      </b>
                    </div>
                    <div>
                      <small className="text-gray-400 block">الإعلانات</small>
                      <b className="font-['Readex_Pro',sans-serif] text-base text-gray-800 dark:text-gray-200 font-bold">
                        {b.ads}
                      </b>
                    </div>
                    <div>
                      <small className="text-gray-400 block">الخبرة</small>
                      <b className="font-['Readex_Pro',sans-serif] text-base text-gray-800 dark:text-gray-200 font-bold">
                        {b.yrs} سنة
                      </b>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{b.d}</p>
                </div>

                <button
                  type="button"
                  onClick={() => navigate('listings', { breeder: b.n })}
                  className="w-full bg-[#0f4a36] hover:bg-[#156047] text-white py-3 rounded-xl font-bold text-xs shadow transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>عرض عروض المربي ({breederAdsCount} متاح الآن)</span>
                  <Icon name="left" className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
