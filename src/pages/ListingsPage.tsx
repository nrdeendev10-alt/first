import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ListingCard } from '../components/ListingCard';
import { PageBanner } from '../components/PageBanner';
import { REGIONS, INITIAL_BREEDERS, fmt } from '../data/initialData';
import { Icon } from '../components/Icons';

export const ListingsPage: React.FC = () => {
  const { listings, params, navigate } = useApp();

  // Filters state initialized from URL params
  const [cat, setCat] = useState<string>(params.cat || '');
  const [types, setTypes] = useState<string[]>(params.type ? [params.type] : []);
  const [sex, setSex] = useState<string>('');
  const [region, setRegion] = useState<string>(params.region || '');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [minAge, setMinAge] = useState<string>('');
  const [maxAge, setMaxAge] = useState<string>('');
  const [query, setQuery] = useState<string>(params.q || '');
  const [breeder, setBreeder] = useState<string>(params.breeder || '');
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);
  const [hornedOnly, setHornedOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('new');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState<boolean>(false);

  const ITEMS_PER_PAGE = 9;

  // Compute available breed types with counts
  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    listings.forEach((a) => {
      counts[a.type] = (counts[a.type] || 0) + 1;
    });
    return counts;
  }, [listings]);

  // Handle breed type toggle
  const toggleType = (t: string) => {
    setTypes((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
    setCurrentPage(1);
  };

  // Reset all filters
  const resetFilters = () => {
    setCat('');
    setTypes([]);
    setSex('');
    setRegion('');
    setMinPrice('');
    setMaxPrice('');
    setMinAge('');
    setMaxAge('');
    setQuery('');
    setBreeder('');
    setVerifiedOnly(false);
    setHornedOnly(false);
    setSortBy('new');
    setCurrentPage(1);
  };

  // Filter listings
  const filteredListings = useMemo(() => {
    return listings.filter((a) => {
      if (cat && a.cat !== cat) return false;
      if (types.length > 0 && !types.includes(a.type)) return false;
      if (sex && a.sex !== sex) return false;
      if (region && a.reg !== region) return false;
      if (minPrice !== '' && a.price < Number(minPrice)) return false;
      if (maxPrice !== '' && a.price > Number(maxPrice)) return false;
      if (minAge !== '' && a.age < Number(minAge)) return false;
      if (maxAge !== '' && a.age > Number(maxAge)) return false;
      if (verifiedOnly && !a.v) return false;
      if (hornedOnly && !a.horns) return false;
      const bObj = INITIAL_BREEDERS[a.b];
      if (breeder && bObj && bObj.n !== breeder) return false;
      if (query.trim()) {
        const q = query.trim().toLowerCase();
        const hay = `${a.t} ${a.type} ${a.reg} ${a.d} ${a.id} ${bObj ? bObj.n : ''}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [
    listings,
    cat,
    types,
    sex,
    region,
    minPrice,
    maxPrice,
    minAge,
    maxAge,
    verifiedOnly,
    hornedOnly,
    breeder,
    query,
  ]);

  // Sort listings
  const sortedListings = useMemo(() => {
    const list = [...filteredListings];
    if (sortBy === 'pa') return list.sort((a, b) => a.price - b.price);
    if (sortBy === 'pd') return list.sort((a, b) => b.price - a.price);
    if (sortBy === 'kg') return list.sort((a, b) => b.kg - a.kg);
    if (sortBy === 'rate') {
      return list.sort((a, b) => {
        const rA = INITIAL_BREEDERS[a.b]?.rt || 0;
        const rB = INITIAL_BREEDERS[b.b]?.rt || 0;
        return rB - rA;
      });
    }
    return list; // 'new'
  }, [filteredListings, sortBy]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(sortedListings.length / ITEMS_PER_PAGE));
  const paginatedListings = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedListings.slice(start, start + ITEMS_PER_PAGE);
  }, [sortedListings, currentPage]);

  const removeChip = (key: string) => {
    if (key.startsWith('type:')) {
      const val = key.replace('type:', '');
      setTypes((prev) => prev.filter((t) => t !== val));
    } else if (key === 'cat') setCat('');
    else if (key === 'sex') setSex('');
    else if (key === 'region') setRegion('');
    else if (key === 'price') {
      setMinPrice('');
      setMaxPrice('');
    } else if (key === 'age') {
      setMinAge('');
      setMaxAge('');
    } else if (key === 'verified') setVerifiedOnly(false);
    else if (key === 'horned') setHornedOnly(false);
    else if (key === 'query') setQuery('');
    else if (key === 'breeder') setBreeder('');
    setCurrentPage(1);
  };

  return (
    <div className="space-y-8">
      {/* Dedicated Page Banner */}
      <PageBanner
        title="سوق الأغنام والماعز المعتمد"
        subtitle="تصفّح مئات العروض المفحوصة والمحدثة مع خيارات فلترة دقيقة للسلالة والعمر والمنطقة"
        badge="سوق حي مباشر"
        icon="grid"
        crumbs={[{ label: 'سوق الإعلانات' }]}
        tone="green"
        chips={[
          { label: 'مربون معتمدون', icon: 'shield' },
          { label: `${filteredListings.length} إعلان مطابق`, icon: 'box' },
          { label: 'دفع آمن عند الاستلام', icon: 'check' },
        ]}
      />

      {/* Main Market Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-right">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden flex items-center justify-between mb-4">
          <button
            type="button"
            onClick={() => setFilterDrawerOpen(true)}
            className="flex items-center gap-2 bg-[#0f4a36] text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-md"
          >
            <Icon name="sliders" className="w-4 h-4" />
            <span>تصفية الإعلانات ({filteredListings.length})</span>
          </button>

          <span className="text-xs text-gray-500 dark:text-gray-400 font-semibold">
            {filteredListings.length} إعلان متاح
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Filter Sidebar (Desktop + Mobile Drawer) */}
          <aside
            className={`lg:col-span-3 bg-white dark:bg-[#122119] border border-gray-200/80 dark:border-white/10 rounded-2xl p-5 shadow-sm space-y-5 sticky top-28 ${
              filterDrawerOpen
                ? 'fixed inset-0 z-50 overflow-y-auto rounded-none p-6 bg-white dark:bg-[#122119]'
                : 'hidden lg:block'
            }`}
          >
            {filterDrawerOpen && (
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-white/10">
                <b className="text-lg font-bold text-gray-900 dark:text-white">تصفية النتائج</b>
                <button
                  type="button"
                  onClick={() => setFilterDrawerOpen(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/10 grid place-items-center"
                >
                  <Icon name="x" className="w-4 h-4" />
                </button>
              </div>
            )}

            <div className="flex items-center justify-between border-b border-gray-100 dark:border-white/10 pb-3">
              <h3 className="font-bold text-gray-900 dark:text-white text-base flex items-center gap-2">
                <Icon name="sliders" className="w-4 h-4 text-[#0f4a36] dark:text-[#58d39a]" />
                <span>فلاتر البحث</span>
              </h3>
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs font-bold text-[#b98425] hover:underline cursor-pointer"
              >
                إعادة ضبط
              </button>
            </div>

            {/* Category Filter */}
            <div className="space-y-2 border-b border-gray-100 dark:border-white/10 pb-4">
              <h4 className="text-xs font-bold text-gray-700 dark:text-gray-300">النوع العام</h4>
              <div className="space-y-1.5 text-xs">
                {[
                  { id: '', label: 'كل الأنواع' },
                  { id: 'sheep', label: 'الضأن (أغنام)' },
                  { id: 'goat', label: 'الماعز' },
                ].map((item) => (
                  <label key={item.id} className="flex items-center gap-2 cursor-pointer font-medium">
                    <input
                      type="radio"
                      name="cat"
                      value={item.id}
                      checked={cat === item.id}
                      onChange={(e) => {
                        setCat(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="accent-[#0f4a36]"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Breed Types Filter */}
            <div className="space-y-2 border-b border-gray-100 dark:border-white/10 pb-4">
              <h4 className="text-xs font-bold text-gray-700 dark:text-gray-300">السلالة</h4>
              <div className="space-y-1.5 text-xs">
                {Object.keys(typeCounts).map((t) => (
                  <label key={t} className="flex items-center justify-between cursor-pointer font-medium">
                    <span className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={types.includes(t)}
                        onChange={() => toggleType(t)}
                        className="accent-[#0f4a36] rounded"
                      />
                      <span>{t}</span>
                    </span>
                    <span className="text-gray-400 font-sans text-[11px]">{typeCounts[t]}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Region Filter */}
            <div className="space-y-2 border-b border-gray-100 dark:border-white/10 pb-4">
              <h4 className="text-xs font-bold text-gray-700 dark:text-gray-300">المنطقة</h4>
              <select
                value={region}
                onChange={(e) => {
                  setRegion(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full text-xs font-medium bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/15 rounded-xl p-2.5 outline-none cursor-pointer"
              >
                <option value="">جميع المناطق والمحافظات</option>
                {REGIONS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div className="space-y-2 border-b border-gray-100 dark:border-white/10 pb-4">
              <h4 className="text-xs font-bold text-gray-700 dark:text-gray-300">نطاق السعر (ر.س)</h4>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="من"
                  value={minPrice}
                  onChange={(e) => {
                    setMinPrice(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full text-xs bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/15 rounded-xl p-2 text-center"
                />
                <input
                  type="number"
                  placeholder="إلى"
                  value={maxPrice}
                  onChange={(e) => {
                    setMaxPrice(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full text-xs bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/15 rounded-xl p-2 text-center"
                />
              </div>
            </div>

            {/* Age Range in Months */}
            <div className="space-y-2 border-b border-gray-100 dark:border-white/10 pb-4">
              <h4 className="text-xs font-bold text-gray-700 dark:text-gray-300">العمر (بالأشهر)</h4>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="أدنى عمر"
                  value={minAge}
                  onChange={(e) => {
                    setMinAge(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full text-xs bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/15 rounded-xl p-2 text-center"
                />
                <input
                  type="number"
                  placeholder="أقصى عمر"
                  value={maxAge}
                  onChange={(e) => {
                    setMaxAge(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full text-xs bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/15 rounded-xl p-2 text-center"
                />
              </div>
            </div>

            {/* Verified and Horned Toggles */}
            <div className="space-y-2.5">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium">
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={(e) => {
                    setVerifiedOnly(e.target.checked);
                    setCurrentPage(1);
                  }}
                  className="accent-[#0f4a36] rounded"
                />
                <span>إعلانات موثقة ومعتمدة فقط</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium">
                <input
                  type="checkbox"
                  checked={hornedOnly}
                  onChange={(e) => {
                    setHornedOnly(e.target.checked);
                    setCurrentPage(1);
                  }}
                  className="accent-[#0f4a36] rounded"
                />
                <span>رؤوس مقرّنة فقط</span>
              </label>
            </div>

            {filterDrawerOpen && (
              <button
                type="button"
                onClick={() => setFilterDrawerOpen(false)}
                className="w-full mt-4 bg-[#0f4a36] text-white py-3 rounded-xl font-bold text-xs"
              >
                تطبيق الفلاتر ({filteredListings.length})
              </button>
            )}
          </aside>

          {/* Listings Results Area */}
          <main className="lg:col-span-9 space-y-6">
            {/* Top Toolbar: Results count & Sort */}
            <div className="bg-white dark:bg-[#122119] border border-gray-200/80 dark:border-white/10 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                عرض <b className="font-['Readex_Pro',sans-serif] text-base text-[#0f4a36] dark:text-[#58d39a]">{fmt(filteredListings.length)}</b> إعلاناً مطابقاً
              </div>

              {/* Sort selector */}
              <div className="flex items-center gap-2 text-xs w-full sm:w-auto">
                <span className="font-bold text-gray-600 dark:text-gray-400 shrink-0">ترتيب حسب:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/15 rounded-xl px-3 py-2 font-semibold text-xs outline-none cursor-pointer w-full sm:w-48"
                >
                  <option value="new">الأحدث أولاً</option>
                  <option value="pa">السعر: من الأقل للأعلى</option>
                  <option value="pd">السعر: من الأعلى للأقل</option>
                  <option value="kg">الأثقل وزناً</option>
                  <option value="rate">تقييم المربي الأعلى</option>
                </select>
              </div>
            </div>

            {/* Active Filters Chips */}
            {(cat || types.length > 0 || sex || region || minPrice || maxPrice || minAge || maxAge || verifiedOnly || hornedOnly || query || breeder) && (
              <div className="flex flex-wrap items-center gap-2 bg-emerald-50/50 dark:bg-emerald-950/20 p-3 rounded-xl border border-emerald-900/10 dark:border-white/5">
                <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300">الفلاتر المطبقة:</span>

                {cat && (
                  <span className="inline-flex items-center gap-1.5 text-xs bg-white dark:bg-white/10 px-2.5 py-1 rounded-full border border-emerald-800/15 shadow-xs font-medium">
                    <span>{cat === 'sheep' ? 'الضأن' : 'الماعز'}</span>
                    <button type="button" onClick={() => removeChip('cat')} className="hover:text-rose-500">✕</button>
                  </span>
                )}

                {types.map((t) => (
                  <span key={t} className="inline-flex items-center gap-1.5 text-xs bg-white dark:bg-white/10 px-2.5 py-1 rounded-full border border-emerald-800/15 shadow-xs font-medium">
                    <span>{t}</span>
                    <button type="button" onClick={() => removeChip(`type:${t}`)} className="hover:text-rose-500">✕</button>
                  </span>
                ))}

                {region && (
                  <span className="inline-flex items-center gap-1.5 text-xs bg-white dark:bg-white/10 px-2.5 py-1 rounded-full border border-emerald-800/15 shadow-xs font-medium">
                    <span>المنطقة: {region}</span>
                    <button type="button" onClick={() => removeChip('region')} className="hover:text-rose-500">✕</button>
                  </span>
                )}

                {(minPrice || maxPrice) && (
                  <span className="inline-flex items-center gap-1.5 text-xs bg-white dark:bg-white/10 px-2.5 py-1 rounded-full border border-emerald-800/15 shadow-xs font-medium">
                    <span>السعر: {minPrice || '0'} - {maxPrice || '∞'} ر.س</span>
                    <button type="button" onClick={() => removeChip('price')} className="hover:text-rose-500">✕</button>
                  </span>
                )}

                {verifiedOnly && (
                  <span className="inline-flex items-center gap-1.5 text-xs bg-white dark:bg-white/10 px-2.5 py-1 rounded-full border border-emerald-800/15 shadow-xs font-medium">
                    <span>موثّق فقط</span>
                    <button type="button" onClick={() => removeChip('verified')} className="hover:text-rose-500">✕</button>
                  </span>
                )}

                {hornedOnly && (
                  <span className="inline-flex items-center gap-1.5 text-xs bg-white dark:bg-white/10 px-2.5 py-1 rounded-full border border-emerald-800/15 shadow-xs font-medium">
                    <span>مقرّن فقط</span>
                    <button type="button" onClick={() => removeChip('horned')} className="hover:text-rose-500">✕</button>
                  </span>
                )}

                {query && (
                  <span className="inline-flex items-center gap-1.5 text-xs bg-white dark:bg-white/10 px-2.5 py-1 rounded-full border border-emerald-800/15 shadow-xs font-medium">
                    <span>بحث: "{query}"</span>
                    <button type="button" onClick={() => removeChip('query')} className="hover:text-rose-500">✕</button>
                  </span>
                )}

                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-xs text-rose-600 dark:text-rose-400 font-bold hover:underline ml-auto"
                >
                  مسح الكل
                </button>
              </div>
            )}

            {/* Grid of Listings Cards */}
            {paginatedListings.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedListings.map((ad) => (
                  <ListingCard key={ad.id} listing={ad} />
                ))}
              </div>
            ) : (
              /* Empty state */
              <div className="bg-white dark:bg-[#122119] border border-dashed border-gray-300 dark:border-white/15 rounded-3xl p-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-white/10 text-[#0f4a36] dark:text-[#58d39a] grid place-items-center mx-auto text-2xl">
                  🔍
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">لا توجد إعلانات مطابقة</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                  جرّب توسيع نطاق السعر، أو إزالة بعض خيارات السلالة والمنطقة لتظهر النتائج.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="bg-[#0f4a36] hover:bg-[#156047] text-white font-bold py-2.5 px-6 rounded-xl text-xs transition-colors cursor-pointer shadow-md"
                >
                  إعادة ضبط جميع الفلاتر
                </button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-8">
                <button
                  type="button"
                  disabled={currentPage <= 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="w-10 h-10 rounded-xl border border-gray-200 dark:border-white/15 bg-white dark:bg-[#122119] grid place-items-center font-bold text-xs disabled:opacity-40 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                >
                  <Icon name="right" className="w-4 h-4" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                  <button
                    key={pg}
                    type="button"
                    onClick={() => setCurrentPage(pg)}
                    className={`w-10 h-10 rounded-xl font-bold text-xs transition-all ${
                      currentPage === pg
                        ? 'bg-[#0f4a36] text-white shadow-md'
                        : 'border border-gray-200 dark:border-white/15 bg-white dark:bg-[#122119] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5'
                    }`}
                  >
                    {pg}
                  </button>
                ))}

                <button
                  type="button"
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="w-10 h-10 rounded-xl border border-gray-200 dark:border-white/15 bg-white dark:bg-[#122119] grid place-items-center font-bold text-xs disabled:opacity-40 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                >
                  <Icon name="left" className="w-4 h-4" />
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
