import React, { useState, useRef } from 'react';
import { PageBanner } from '../components/PageBanner';
import { MONTHS, fmt } from '../data/initialData';
import { useApp } from '../context/AppContext';
import { Icon } from '../components/Icons';

export const PricesPage: React.FC = () => {
  const { listings, navigate, priceIndex } = useApp();
  const [hiddenBreeds, setHiddenBreeds] = useState<Record<string, boolean>>({});
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const chartRef = useRef<HTMLDivElement>(null);

  const visibleSeries = priceIndex.filter((s) => !hiddenBreeds[s.k]);
  const allValues = visibleSeries.flatMap((s) => s.v);

  const minVal = allValues.length ? Math.floor((Math.min(...allValues) * 0.96) / 250) * 250 : 3000;
  const maxVal = allValues.length ? Math.ceil((Math.max(...allValues) * 1.03) / 250) * 250 : 7500;

  const chartW = 750;
  const chartH = 340;
  const margin = { l: 65, r: 25, t: 30, b: 45 };

  const getX = (i: number) => margin.l + (i * (chartW - margin.l - margin.r)) / (MONTHS.length - 1);
  const getY = (v: number) => margin.t + (1 - (v - minVal) / (maxVal - minVal)) * (chartH - margin.t - margin.b);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!chartRef.current) return;
    const rect = chartRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const step = (chartW - margin.l - margin.r) / (MONTHS.length - 1);
    const idx = Math.max(0, Math.min(MONTHS.length - 1, Math.round((x - margin.l) / step)));
    setHoverIndex(idx);
  };

  const toggleBreed = (k: string) => {
    setHiddenBreeds((prev) => ({ ...prev, [k]: !prev[k] }));
  };

  // Color mapping
  const colorMap: Record<string, string> = {
    '--c1': '#0f4a36',
    '--c2': '#b98425',
    '--c3': '#2c6a78',
    '--c4': '#8a4b2a',
  };

  // Insights calculation
  const avgByMonth = MONTHS.map((_, i) => priceIndex.reduce((sum, x) => sum + x.v[i], 0) / (priceIndex.length || 1));
  const peakIdx = avgByMonth.indexOf(Math.max(...avgByMonth));
  const lowIdx = avgByMonth.indexOf(Math.min(...avgByMonth));
  const curAvg = avgByMonth[MONTHS.length - 1];
  const peakDiffPct = Math.round(((curAvg - avgByMonth[peakIdx]) / avgByMonth[peakIdx]) * 100);

  // Group listings by breed for stats table
  const breedTypes = Array.from(new Set(listings.map((a) => a.type)));

  return (
    <div className="space-y-10">
      <PageBanner
        title="مؤشر أسعار المواشي في المملكة"
        subtitle="راقب حركة الأسعار الشهرية وتغيرات الموسم بين النعيمي والحري والنجدي والسواكني"
        badge="مؤشر بياني تفاعلي"
        icon="chart"
        crumbs={[{ label: 'مؤشر الأسعار' }]}
        tone="teal"
        chips={[
          { label: 'محدّث لعام 2026', icon: 'cal' },
          { label: 'بيانات موسمية دقيقة', icon: 'trend' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-right space-y-10">
        {/* Interactive Chart Container */}
        <div className="bg-white dark:bg-[#122119] border border-gray-200/80 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">حركة أسعار السلالات الرئيسية (8 أشهر)</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">اضغط على السلالة لإظهار أو إخفاء خط الرسم البياني</p>
            </div>

            {/* Toggle series legend */}
            <div className="flex flex-wrap items-center gap-2">
              {priceIndex.map((s) => {
                const isHidden = hiddenBreeds[s.k];
                const c = colorMap[s.c] || '#0f4a36';
                return (
                  <button
                    key={s.k}
                    type="button"
                    onClick={() => toggleBreed(s.k)}
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                      !isHidden
                        ? 'bg-gray-50 dark:bg-white/10 border-gray-300 dark:border-white/20 text-gray-900 dark:text-white'
                        : 'opacity-40 border-gray-200 dark:border-white/10'
                    }`}
                  >
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: c }} />
                    <span>{s.k}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SVG Chart Render */}
          <div
            ref={chartRef}
            onPointerMove={handlePointerMove}
            onPointerLeave={() => setHoverIndex(null)}
            className="relative w-full overflow-x-auto touch-pan-y"
          >
            <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full h-auto min-w-[580px] select-none">
              {/* Grid lines and Y labels */}
              {[0, 1, 2, 3, 4].map((step) => {
                const val = minVal + ((maxVal - minVal) * step) / 4;
                const y = getY(val);
                return (
                  <g key={step}>
                    <line x1={margin.l} x2={chartW - margin.r} y1={y} y2={y} stroke="rgba(150,150,150,0.18)" strokeDasharray="3 3" />
                    <text x={margin.l - 12} y={y + 4} textAnchor="end" className="text-[11px] fill-gray-400 font-sans">
                      {fmt(Math.round(val))}
                    </text>
                  </g>
                );
              })}

              {/* X Labels (Months) */}
              {MONTHS.map((mo, i) => (
                <text
                  key={mo}
                  x={getX(i)}
                  y={chartH - 12}
                  textAnchor="middle"
                  className={`text-[12px] font-semibold ${hoverIndex === i ? 'fill-[#0f4a36] dark:fill-emerald-400 font-bold' : 'fill-gray-500'}`}
                >
                  {mo}
                </text>
              ))}

              {/* Data lines */}
              {visibleSeries.map((s) => {
                const c = colorMap[s.c] || '#0f4a36';
                const d = s.v.map((v, i) => `${i === 0 ? 'M' : 'L'} ${getX(i).toFixed(1)} ${getY(v).toFixed(1)}`).join(' ');

                return (
                  <g key={s.k}>
                    <path d={d} fill="none" stroke={c} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                    {s.v.map((v, i) => (
                      <circle
                        key={i}
                        cx={getX(i)}
                        cy={getY(v)}
                        r={hoverIndex === i ? 6 : 4}
                        fill="#fff"
                        stroke={c}
                        strokeWidth="2.5"
                        className="transition-all"
                      />
                    ))}
                  </g>
                );
              })}

              {/* Hover Cursor Vertical Line */}
              {hoverIndex !== null && (
                <line
                  x1={getX(hoverIndex)}
                  x2={getX(hoverIndex)}
                  y1={margin.t}
                  y2={chartH - margin.b}
                  stroke="#58d39a"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
              )}
            </svg>

            {/* Floating Tooltip when hovering over a month */}
            {hoverIndex !== null && (
              <div
                className="absolute top-4 bg-gray-900/95 dark:bg-[#072419]/95 backdrop-blur-md text-white p-3.5 rounded-2xl shadow-xl border border-white/20 text-xs space-y-1.5 pointer-events-none z-20 min-w-[170px]"
                style={{
                  left: `${(getX(hoverIndex) / chartW) * 100}%`,
                  transform: 'translateX(-50%)',
                }}
              >
                <div className="font-bold text-amber-300 border-b border-white/20 pb-1 mb-1">
                  شهر {MONTHS[hoverIndex]}
                </div>
                {visibleSeries.map((s) => (
                  <div key={s.k} className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: colorMap[s.c] }} />
                      <span>{s.k}:</span>
                    </span>
                    <b className="font-['Readex_Pro',sans-serif] text-emerald-200">{fmt(s.v[hoverIndex])} ر.س</b>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Seasonal Insights Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-100 dark:border-white/10">
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-900/10 dark:border-white/5">
              <small className="text-gray-500 dark:text-gray-400 block text-xs mb-1">ذروة الموسم السنوي</small>
              <b className="font-['Readex_Pro',sans-serif] text-xl font-bold text-[#b98425]">شهر {MONTHS[peakIdx]}</b>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-900/10 dark:border-white/5">
              <small className="text-gray-500 dark:text-gray-400 block text-xs mb-1">أنسب شهر للشراء (أقل سعر)</small>
              <b className="font-['Readex_Pro',sans-serif] text-xl font-bold text-[#0f4a36] dark:text-[#58d39a]">
                شهر {MONTHS[lowIdx]}
              </b>
            </div>

            <div className="p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-900/10 dark:border-white/5">
              <small className="text-gray-500 dark:text-gray-400 block text-xs mb-1">السعر الحالي مقابل الذروة</small>
              <b className="font-['Readex_Pro',sans-serif] text-xl font-bold text-[#2c6a78] dark:text-sky-400">
                {peakDiffPct}%
              </b>
            </div>
          </div>
        </div>

        {/* Detailed Price Summary Table */}
        <div className="bg-white dark:bg-[#122119] border border-gray-200/80 dark:border-white/10 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">جدول متوسط الأسعار الحالي وحركة التغير</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-right border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-white/10 text-gray-400 pb-2">
                  <th className="py-3 px-4 font-bold">السلالة</th>
                  <th className="py-3 px-4 font-bold">الوزن التقريبي</th>
                  <th className="py-3 px-4 font-bold">السعر الحالي</th>
                  <th className="py-3 px-4 font-bold">سعر الكيلو الحي</th>
                  <th className="py-3 px-4 font-bold">التغير الشهري</th>
                  <th className="py-3 px-4 font-bold">أعلى سعر مسجل</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                {priceIndex.map((s) => {
                  const n = s.v.length;
                  const cur = s.v[n - 1];
                  const prev = s.v[n - 2];
                  const diff = ((cur - prev) / prev) * 100;
                  const isUp = diff >= 0;
                  const maxRegistered = Math.max(...s.v);

                  return (
                    <tr key={s.k} className="hover:bg-gray-50/80 dark:hover:bg-white/5">
                      <td className="py-3 px-4 font-bold text-gray-900 dark:text-white">{s.k}</td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-300">~{s.kg} كجم</td>
                      <td className="py-3 px-4 font-['Readex_Pro',sans-serif] font-bold text-[#0f4a36] dark:text-[#58d39a]">
                        {fmt(cur)} ر.س
                      </td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                        {fmt(Math.round(cur / s.kg))} ر.س
                      </td>
                      <td className={`py-3 px-4 font-bold ${isUp ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600'}`}>
                        {isUp ? '▲' : '▼'} {Math.abs(diff).toFixed(1)}%
                      </td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-300 font-['Readex_Pro',sans-serif]">
                        {fmt(maxRegistered)} ر.س
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
