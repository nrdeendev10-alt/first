import React from 'react';
import { PageBanner } from '../components/PageBanner';
import { useApp } from '../context/AppContext';
import { AdImageTemplate } from '../components/AdImageTemplate';
import { INITIAL_BREEDERS, fmt, ageText, sexLabel } from '../data/initialData';
import { Icon } from '../components/Icons';

export const ComparePage: React.FC = () => {
  const { listings, compareList, removeFromCompare, navigate } = useApp();

  const selectedListings = compareList.map((id) => listings.find((a) => a.id === id)).filter(Boolean);

  if (selectedListings.length < 2) {
    return (
      <div className="space-y-10">
        <PageBanner
          title="مقارنة الإعلانات جنباً إلى جنب"
          subtitle="قارن حتى 3 رؤوس في السعر والوزن وتقييم المربي لاختيار الصفقة الأفضل"
          badge="أداة المقارنة"
          icon="layers"
          crumbs={[{ label: 'مقارنة الإعلانات' }]}
          tone="sand"
        />

        <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-white/10 text-[#0f4a36] dark:text-[#58d39a] grid place-items-center mx-auto text-2xl">
            ⚖️
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">اختر إعلانين على الأقل للمقارنة</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
            اضغط على زر «قارن» في أي بطاقة إعلان بالسوق لتضيفها إلى جدول المقارنة الفوري.
          </p>
          {selectedListings.length === 1 && (
            <div className="inline-block bg-emerald-50 dark:bg-emerald-950/40 px-4 py-2 rounded-xl text-xs text-[#0f4a36] dark:text-emerald-300 font-bold border border-emerald-900/10">
              المحدد حالياً: {selectedListings[0]!.t}
            </div>
          )}
          <div>
            <button
              type="button"
              onClick={() => navigate('listings')}
              className="bg-[#0f4a36] text-white font-bold py-2.5 px-6 rounded-xl text-xs shadow-md cursor-pointer"
            >
              تصفّح الإعلانات لاختيار رأس آخر
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Helper for computing best in row
  const prices = selectedListings.map((a) => a!.price);
  const minPrice = Math.min(...prices);

  const pricePerKgs = selectedListings.map((a) => Math.round(a!.price / a!.kg));
  const minPricePerKg = Math.min(...pricePerKgs);

  const weights = selectedListings.map((a) => a!.kg);
  const maxWeight = Math.max(...weights);

  const ratings = selectedListings.map((a) => INITIAL_BREEDERS[a!.b]?.rt || 0);
  const maxRating = Math.max(...ratings);

  return (
    <div className="space-y-10">
      <PageBanner
        title="مقارنة الإعلانات جنباً إلى جنب"
        subtitle="مقارنة مباشرة بين الأسعار وسعر الكيلو الحي والأوزان وتقييمات المربين"
        badge="مقارنة تفصيلية"
        icon="layers"
        crumbs={[{ label: 'مقارنة الإعلانات' }]}
        tone="sand"
        chips={[{ label: `${selectedListings.length} إعلانات محددة للمقارنة`, icon: 'layers' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-right space-y-6">
        <div className="bg-white dark:bg-[#122119] border border-gray-200/80 dark:border-white/10 rounded-3xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm text-right border-collapse min-w-[620px]">
              {/* Header row with Ad cards previews */}
              <thead>
                <tr className="border-b border-gray-200 dark:border-white/10">
                  <th className="p-4 bg-gray-50/80 dark:bg-white/5 font-bold text-gray-500 w-36">المعيار</th>
                  {selectedListings.map((ad) => (
                    <th key={ad!.id} className="p-4 align-top w-72">
                      <div className="space-y-3">
                        <div className="rounded-2xl overflow-hidden shadow-xs border border-gray-200 dark:border-white/10">
                          <AdImageTemplate listing={ad!} compact showBadges={false} />
                        </div>
                        <div className="font-bold text-gray-900 dark:text-white line-clamp-1">{ad!.t}</div>
                        <div className="flex items-center justify-between gap-2">
                          <button
                            type="button"
                            onClick={() => navigate('ad', { id: ad!.id })}
                            className="bg-[#0f4a36] text-white text-[11px] font-bold px-3 py-1.5 rounded-lg shadow-xs"
                          >
                            عرض الإعلان
                          </button>
                          <button
                            type="button"
                            onClick={() => removeFromCompare(ad!.id)}
                            className="text-rose-500 hover:underline text-[11px] font-semibold"
                          >
                            إزالة ✕
                          </button>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Rows */}
              <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                {/* Price */}
                <tr className="hover:bg-gray-50/50 dark:hover:bg-white/5">
                  <td className="p-4 font-bold bg-gray-50/80 dark:bg-white/5 text-gray-700 dark:text-gray-300">السعر الإجمالي</td>
                  {selectedListings.map((ad) => {
                    const isBest = ad!.price === minPrice && selectedListings.length > 1;
                    return (
                      <td key={ad!.id} className={`p-4 font-['Readex_Pro',sans-serif] font-bold text-base ${isBest ? 'text-[#0f4a36] dark:text-[#58d39a] bg-emerald-50/50 dark:bg-emerald-950/20' : 'text-gray-800 dark:text-gray-200'}`}>
                        {fmt(ad!.price)} ر.س {isBest && '✓ (الأوفر)'}
                      </td>
                    );
                  })}
                </tr>

                {/* Price per Kg */}
                <tr className="hover:bg-gray-50/50 dark:hover:bg-white/5">
                  <td className="p-4 font-bold bg-gray-50/80 dark:bg-white/5 text-gray-700 dark:text-gray-300">سعر الكيلو الحي</td>
                  {selectedListings.map((ad) => {
                    const ppk = Math.round(ad!.price / ad!.kg);
                    const isBest = ppk === minPricePerKg && selectedListings.length > 1;
                    return (
                      <td key={ad!.id} className={`p-4 font-semibold ${isBest ? 'text-[#0f4a36] dark:text-[#58d39a] font-bold bg-emerald-50/50 dark:bg-emerald-950/20' : ''}`}>
                        ~{fmt(ppk)} ر.س/كجم {isBest && '✓'}
                      </td>
                    );
                  })}
                </tr>

                {/* Breed */}
                <tr className="hover:bg-gray-50/50 dark:hover:bg-white/5">
                  <td className="p-4 font-bold bg-gray-50/80 dark:bg-white/5 text-gray-700 dark:text-gray-300">السلالة</td>
                  {selectedListings.map((ad) => (
                    <td key={ad!.id} className="p-4 font-semibold text-gray-800 dark:text-gray-200">
                      {ad!.type} ({ad!.cat === 'sheep' ? 'ضأن' : 'ماعز'})
                    </td>
                  ))}
                </tr>

                {/* Sex */}
                <tr className="hover:bg-gray-50/50 dark:hover:bg-white/5">
                  <td className="p-4 font-bold bg-gray-50/80 dark:bg-white/5 text-gray-700 dark:text-gray-300">الجنس</td>
                  {selectedListings.map((ad) => (
                    <td key={ad!.id} className="p-4 text-gray-800 dark:text-gray-200">
                      {sexLabel(ad!)}
                    </td>
                  ))}
                </tr>

                {/* Age */}
                <tr className="hover:bg-gray-50/50 dark:hover:bg-white/5">
                  <td className="p-4 font-bold bg-gray-50/80 dark:bg-white/5 text-gray-700 dark:text-gray-300">العمر</td>
                  {selectedListings.map((ad) => (
                    <td key={ad!.id} className="p-4 text-gray-800 dark:text-gray-200 font-medium">
                      {ageText(ad!.age)}
                    </td>
                  ))}
                </tr>

                {/* Weight */}
                <tr className="hover:bg-gray-50/50 dark:hover:bg-white/5">
                  <td className="p-4 font-bold bg-gray-50/80 dark:bg-white/5 text-gray-700 dark:text-gray-300">الوزن الحي</td>
                  {selectedListings.map((ad) => {
                    const isBest = ad!.kg === maxWeight && selectedListings.length > 1;
                    return (
                      <td key={ad!.id} className={`p-4 font-semibold ${isBest ? 'text-[#0f4a36] dark:text-[#58d39a] font-bold bg-emerald-50/50 dark:bg-emerald-950/20' : ''}`}>
                        ~{ad!.kg} كجم {isBest && '✓ (الأثقل)'}
                      </td>
                    );
                  })}
                </tr>

                {/* Region */}
                <tr className="hover:bg-gray-50/50 dark:hover:bg-white/5">
                  <td className="p-4 font-bold bg-gray-50/80 dark:bg-white/5 text-gray-700 dark:text-gray-300">المنطقة</td>
                  {selectedListings.map((ad) => (
                    <td key={ad!.id} className="p-4 text-gray-800 dark:text-gray-200">
                      {ad!.reg}
                    </td>
                  ))}
                </tr>

                {/* Breeder */}
                <tr className="hover:bg-gray-50/50 dark:hover:bg-white/5">
                  <td className="p-4 font-bold bg-gray-50/80 dark:bg-white/5 text-gray-700 dark:text-gray-300">البائع</td>
                  {selectedListings.map((ad) => {
                    const b = INITIAL_BREEDERS[ad!.b] || INITIAL_BREEDERS[0];
                    return (
                      <td key={ad!.id} className="p-4 text-gray-800 dark:text-gray-200 font-semibold">
                        {b.n}
                      </td>
                    );
                  })}
                </tr>

                {/* Rating */}
                <tr className="hover:bg-gray-50/50 dark:hover:bg-white/5">
                  <td className="p-4 font-bold bg-gray-50/80 dark:bg-white/5 text-gray-700 dark:text-gray-300">تقييم البائع</td>
                  {selectedListings.map((ad) => {
                    const rt = INITIAL_BREEDERS[ad!.b]?.rt || 0;
                    const isBest = rt === maxRating && selectedListings.length > 1;
                    return (
                      <td key={ad!.id} className={`p-4 font-semibold ${isBest ? 'text-amber-500 font-bold bg-amber-50/40 dark:bg-amber-950/20' : ''}`}>
                        ★ {rt.toFixed(1)} {isBest && '✓ (الأعلى)'}
                      </td>
                    );
                  })}
                </tr>

                {/* Verification */}
                <tr className="hover:bg-gray-50/50 dark:hover:bg-white/5">
                  <td className="p-4 font-bold bg-gray-50/80 dark:bg-white/5 text-gray-700 dark:text-gray-300">التوثيق الرسمي</td>
                  {selectedListings.map((ad) => (
                    <td key={ad!.id} className="p-4">
                      {ad!.v ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                          <Icon name="shield" className="w-4 h-4" />
                          <span>موثّق بالهوية والترخيص</span>
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400">إعلان عادي</span>
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400">
          ✓ العلامة تشير إلى الخيار الأفضل في المعيار (الأقل سعراً، الأثقل وزناً، الأعلى تقييماً).
        </p>
      </div>
    </div>
  );
};
