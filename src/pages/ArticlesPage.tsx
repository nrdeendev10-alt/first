import React, { useState } from 'react';
import { PageBanner } from '../components/PageBanner';
import { ARTICLES } from '../data/initialData';
import { useApp } from '../context/AppContext';
import { Icon } from '../components/Icons';

export const ArticlesPage: React.FC = () => {
  const { params, navigate } = useApp();
  const [selectedTag, setSelectedTag] = useState<string>(params.tag || '');

  const articleId = params.id !== undefined ? Number(params.id) : null;
  const isReading = articleId !== null && ARTICLES[articleId];

  const tags = Array.from(new Set(ARTICLES.map((a) => a.tag)));
  const filteredArticles = ARTICLES.map((a, i) => ({ a, i })).filter(
    (x) => !selectedTag || x.a.tag === selectedTag
  );

  if (isReading) {
    const current = ARTICLES[articleId!];
    const prevIdx = (articleId! - 1 + ARTICLES.length) % ARTICLES.length;
    const nextIdx = (articleId! + 1) % ARTICLES.length;

    return (
      <div className="space-y-10">
        <PageBanner
          title={current.t}
          subtitle={current.lead}
          badge={`مقال ${current.tag}`}
          icon="file"
          crumbs={[{ label: 'المقالات والنصائح', onClick: () => navigate('articles') }, { label: current.t }]}
          tone="sand"
          chips={[{ label: `قراءة ${current.min} دقائق`, icon: 'clock' }]}
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-right space-y-8">
          <article className="bg-white dark:bg-[#122119] border border-gray-200/80 dark:border-white/10 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
            <div
              className="h-44 rounded-2xl grid place-items-center text-white mb-6"
              style={{ background: current.bg }}
            >
              <Icon name={current.icon} className="w-16 h-16" />
            </div>

            <div className="space-y-6">
              {current.body.map(([heading, text], idx) => (
                <div key={idx} className="space-y-2">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{heading}</h3>
                  <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">{text}</p>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300/40 text-xs text-amber-900 dark:text-amber-200 font-semibold flex items-center gap-2 mt-8">
              <Icon name="info" className="w-4 h-4 text-amber-600 shrink-0" />
              <span>معلومات عامة للإرشاد الصحي، ولا تغني عن استشارة الطبيب البيطري عند الضرورة.</span>
            </div>

            {/* Prev/Next buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-100 dark:border-white/10">
              <button
                type="button"
                onClick={() => navigate('articles', { id: prevIdx })}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 text-xs font-bold hover:bg-gray-50 flex items-center gap-2 cursor-pointer"
              >
                <Icon name="right" className="w-4 h-4" />
                <span>السابق: {ARTICLES[prevIdx].t}</span>
              </button>

              <button
                type="button"
                onClick={() => navigate('articles', { id: nextIdx })}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 text-xs font-bold hover:bg-gray-50 flex items-center gap-2 cursor-pointer"
              >
                <span>التالي: {ARTICLES[nextIdx].t}</span>
                <Icon name="left" className="w-4 h-4" />
              </button>
            </div>
          </article>

          <div className="text-center">
            <button
              type="button"
              onClick={() => navigate('articles')}
              className="text-sm font-bold text-[#0f4a36] dark:text-[#58d39a] hover:underline"
            >
              ← العودة لجميع المقالات
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <PageBanner
        title="دليل المقالات والنصائح التوعوية"
        subtitle="أدلة عملية ومبسطة حول تقدير أعمار المواشي، مواسم الأسعار، والرعاية بعد الشراء"
        badge="معرفة المشتري"
        icon="file"
        crumbs={[{ label: 'المقالات والنصائح' }]}
        tone="sand"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-right space-y-8">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 dark:border-white/10 pb-4">
          <button
            type="button"
            onClick={() => setSelectedTag('')}
            className={`px-4 py-2 rounded-full font-bold text-xs transition-all cursor-pointer ${
              selectedTag === ''
                ? 'bg-[#0f4a36] text-white shadow-md'
                : 'bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300'
            }`}
          >
            جميع المقالات
          </button>
          {tags.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setSelectedTag(t)}
              className={`px-4 py-2 rounded-full font-bold text-xs transition-all cursor-pointer ${
                selectedTag === t
                  ? 'bg-[#0f4a36] text-white shadow-md'
                  : 'bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map(({ a, i }) => (
            <div
              key={a.t}
              onClick={() => navigate('articles', { id: i })}
              className="bg-white dark:bg-[#122119] border border-gray-200/80 dark:border-white/10 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer flex flex-col group"
            >
              <div
                className="h-40 grid place-items-center text-white"
                style={{ background: a.bg }}
              >
                <Icon name={a.icon} className="w-14 h-14 group-hover:scale-110 transition-transform" />
              </div>

              <div className="p-6 flex flex-col justify-between flex-1 gap-3">
                <div>
                  <span className="text-xs font-bold text-[#b98425] block mb-1">{a.tag}</span>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-snug mb-1">
                    {a.t}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3">
                    {a.lead}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 dark:border-white/10 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <Icon name="clock" className="w-3.5 h-3.5" />
                    <span>قراءة {a.min} دقائق</span>
                  </span>
                  <span className="text-[#0f4a36] dark:text-[#58d39a] font-bold group-hover:translate-x-[-2px] transition-transform">
                    اقرأ المقال ←
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
