import React, { useState } from 'react';
import { PageBanner } from '../components/PageBanner';
import { FAQ_DATA } from '../data/initialData';
import { useApp } from '../context/AppContext';
import { Icon } from '../components/Icons';

export const FaqPage: React.FC = () => {
  const { navigate } = useApp();
  const [activeCat, setActiveCat] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [openItems, setOpenItems] = useState<Record<number, boolean>>({ 0: true });

  const categories = Array.from(new Set(FAQ_DATA.map((q) => q[0])));

  const filteredFaqs = FAQ_DATA.map((item, idx) => ({ item, idx })).filter(({ item }) => {
    if (activeCat && item[0] !== activeCat) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return item[1].toLowerCase().includes(q) || item[2].toLowerCase().includes(q);
    }
    return true;
  });

  const toggleOpen = (idx: number) => {
    setOpenItems((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="space-y-10">
      <PageBanner
        title="الأسئلة الشائعة ومركز المساعدة"
        subtitle="إجابات واضحة ومباشرة عن طرق المعاينة، فحص الأسعار، التوثيق، والتواصل مع المربين"
        badge="مركز المساعدة"
        icon="chat"
        crumbs={[{ label: 'الأسئلة الشائعة' }]}
        tone="green"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-right space-y-8">
        {/* Search input */}
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="ابحث في الأسئلة الشائعة (مثال: معاينة، دفع، توثيق)..."
            className="w-full bg-white dark:bg-[#122119] border border-gray-200 dark:border-white/10 rounded-2xl py-3.5 pr-12 pl-4 text-sm outline-none shadow-sm focus:border-[#0f4a36]"
          />
          <Icon name="search" className="w-5 h-5 text-gray-400 absolute right-4 top-4" />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveCat('')}
            className={`px-4 py-2 rounded-full font-bold text-xs transition-all cursor-pointer ${
              activeCat === ''
                ? 'bg-[#0f4a36] text-white shadow-md'
                : 'bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300'
            }`}
          >
            كل الأسئلة
          </button>
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setActiveCat(c)}
              className={`px-4 py-2 rounded-full font-bold text-xs transition-all cursor-pointer ${
                activeCat === c
                  ? 'bg-[#0f4a36] text-white shadow-md'
                  : 'bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Accordions List */}
        <div className="space-y-3">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map(({ item, idx }) => {
              const isOpen = !!openItems[idx];
              return (
                <div
                  key={idx}
                  className="bg-white dark:bg-[#122119] border border-gray-200/80 dark:border-white/10 rounded-2xl overflow-hidden shadow-xs transition-all"
                >
                  <button
                    type="button"
                    onClick={() => toggleOpen(idx)}
                    className="w-full p-5 text-right font-bold text-sm sm:text-base text-gray-900 dark:text-white flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span>{item[1]}</span>
                    <Icon
                      name="down"
                      className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180 text-[#0f4a36]' : ''}`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-white/5">
                      {item[2]}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="bg-white dark:bg-[#122119] p-8 rounded-2xl border text-center space-y-3">
              <h4 className="font-bold text-gray-900 dark:text-white">لم نجد نتائج مطابقة لبحثك</h4>
              <p className="text-xs text-gray-500">تواصل معنا مباشرة وسيجيبك فريق الدعم الفني.</p>
              <button
                type="button"
                onClick={() => navigate('contact')}
                className="bg-[#0f4a36] text-white text-xs font-bold py-2 px-4 rounded-xl"
              >
                تواصل مع الدعم الفني
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
