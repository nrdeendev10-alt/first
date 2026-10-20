import React, { useState } from 'react';
import { PageBanner } from '../components/PageBanner';
import { PRICE_INDEX, fmt } from '../data/initialData';
import { useApp } from '../context/AppContext';
import { Icon } from '../components/Icons';

export const CalculatorPage: React.FC = () => {
  const { navigate } = useApp();
  const [guests, setGuests] = useState<number>(35);
  const [portion, setPortion] = useState<number>(0.35); // kg per person
  const [waste, setWaste] = useState<number>(10); // buffer %
  const [breedIndex, setBreedIndex] = useState<number>(0);

  const selectedBreed = PRICE_INDEX[breedIndex] || PRICE_INDEX[0];
  const breedPrice = selectedBreed.v[selectedBreed.v.length - 1];

  // Calculation
  const totalMeatNeed = guests * portion * (1 + waste / 100);
  const dressedWeight = selectedBreed.kg * 0.5; // carcass is approx 50% of live weight
  const headsNeeded = Math.max(1, Math.ceil(totalMeatNeed / dressedWeight - 0.0001));
  const estimatedCost = headsNeeded * breedPrice;

  return (
    <div className="space-y-10">
      <PageBanner
        title="حاسبة الولائم والعزائم الذكية"
        subtitle="احسب عدد رؤوس الأغنام المطلوبة لمناسبتك بدقة، وتعرّف على التكلفة التقديرية بالريال"
        badge="أداة حسابية دقيقة"
        icon="calc"
        crumbs={[{ label: 'حاسبة الولائم' }]}
        tone="sand"
        chips={[
          { label: 'حساب الذبيحة الصافية', icon: 'weight' },
          { label: 'أسعار السوق الحالية', icon: 'trend' },
        ]}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-right">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-7 bg-white dark:bg-[#122119] border border-gray-200/80 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">بيانات العزيمة والضيوف</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">حرّك المؤشرات لتخصيص كمية اللحم وعدد الذبائح المناسبة.</p>
            </div>

            {/* Guests count slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">عدد الضيوف المتوقع:</label>
                <span className="font-['Readex_Pro',sans-serif] text-xl font-extrabold text-[#0f4a36] dark:text-[#58d39a]">
                  {guests} ضيف
                </span>
              </div>
              <input
                type="range"
                min={5}
                max={250}
                step={5}
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full accent-[#0f4a36] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-gray-400 font-sans">
                <span>5 ضيوف</span>
                <span>120 ضيف</span>
                <span>250 ضيف</span>
              </div>
            </div>

            {/* Feast Style Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block">طبيعة المناسبة وحجم الوجبة:</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                {[
                  { p: 0.5, label: 'وليمة زواج ضخمة', sub: 'نصف كيلو صافي للفرد' },
                  { p: 0.35, label: 'عزيمة عائلية ممتلئة', sub: '350 جرام للفرد' },
                  { p: 0.25, label: 'عشاء خفيف / تجمع', sub: 'ربع كيلو للفرد' },
                ].map((item) => (
                  <button
                    key={item.p}
                    type="button"
                    onClick={() => setPortion(item.p)}
                    className={`p-3 rounded-xl border text-right transition-all cursor-pointer ${
                      portion === item.p
                        ? 'bg-emerald-50 dark:bg-emerald-950/80 border-[#0f4a36] dark:border-emerald-500 text-[#0f4a36] dark:text-emerald-300 font-bold'
                        : 'border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5'
                    }`}
                  >
                    <b className="block text-xs">{item.label}</b>
                    <small className="text-[10px] text-gray-400 block mt-0.5">{item.sub}</small>
                  </button>
                ))}
              </div>
            </div>

            {/* Breed Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block">السلالة المفضلة للذبح:</label>
              <select
                value={breedIndex}
                onChange={(e) => setBreedIndex(Number(e.target.value))}
                className="w-full text-sm font-semibold bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/15 rounded-xl p-3 outline-none cursor-pointer"
              >
                {PRICE_INDEX.map((s, idx) => (
                  <option key={s.k} value={idx}>
                    {s.k} (متوسط وزن حي ~{s.kg} كجم) - سعر السوق الحالي ~{fmt(s.v[s.v.length - 1])} ر.س
                  </option>
                ))}
              </select>
            </div>

            {/* Waste Margin Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">هامش الضيافة الإضافي (احتياط):</label>
                <span className="font-['Readex_Pro',sans-serif] text-base font-bold text-amber-600 dark:text-amber-400">
                  {waste}%
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={30}
                step={5}
                value={waste}
                onChange={(e) => setWaste(Number(e.target.value))}
                className="w-full accent-[#b98425] cursor-pointer"
              />
              <small className="text-[11px] text-gray-400 block">
                هامش أمان للضيوف الإضافيين وتفاوت أحجام الذبائح عند السلخ.
              </small>
            </div>
          </div>

          {/* Result Card Column */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#0f4a36] to-[#0a3123] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-600/30 space-y-6 lg:sticky lg:top-28">
            <div>
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block mb-1">
                النتيجة المقترحة لمناسبتك
              </span>
              <h3 className="text-lg font-bold text-white">العدد الكافي والتكلفة التقريبية</h3>
            </div>

            {/* Big Heads Count */}
            <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center">
              <span className="text-xs text-emerald-200 block mb-1">تحتاج لوليمتك تقريباً:</span>
              <div className="font-['Readex_Pro',sans-serif] text-5xl sm:text-6xl font-black text-amber-300 tracking-tight leading-none my-2">
                {headsNeeded} <span className="text-2xl font-bold text-white">رأس</span>
              </div>
              <span className="text-xs text-emerald-100 font-medium">سلالة {selectedBreed.k}</span>
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-3 text-xs bg-black/25 p-4 rounded-2xl border border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-white/80">إجمالي اللحم الصافي المطلوب:</span>
                <b className="font-bold text-amber-300">{totalMeatNeed.toFixed(1)} كجم</b>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/80">صافي ذبيحة الرأس الواحد:</span>
                <b className="font-bold text-white">~{dressedWeight} كجم بالعظم</b>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/80">سعر الرأس التقريبي:</span>
                <b className="font-bold text-white">{fmt(breedPrice)} ر.س</b>
              </div>
              <div className="pt-2 border-t border-white/15 flex items-center justify-between text-sm">
                <span className="font-bold text-emerald-200">التكلفة الإجمالية التقديرية:</span>
                <b className="font-['Readex_Pro',sans-serif] text-lg font-black text-amber-300">
                  {fmt(estimatedCost)} ر.س
                </b>
              </div>
            </div>

            {/* CTA to listings */}
            <button
              type="button"
              onClick={() => navigate('listings', { type: selectedBreed.k })}
              className="w-full bg-[#b98425] hover:bg-amber-600 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm"
            >
              <Icon name="search" className="w-4 h-4" />
              <span>تصفّح إعلانات {selectedBreed.k} في السوق الآن</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
