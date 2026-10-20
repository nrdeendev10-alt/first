import React from 'react';
import { PageBanner } from '../components/PageBanner';
import { CHECKLIST_ITEMS } from '../data/initialData';
import { useApp } from '../context/AppContext';
import { Icon } from '../components/Icons';

export const ChecklistPage: React.FC = () => {
  const { checklistState, toggleChecklistItem, resetChecklist } = useApp();

  const checkedCount = CHECKLIST_ITEMS.filter((_, i) => !!checklistState[i]).length;
  const totalItems = CHECKLIST_ITEMS.length;
  const progressRatio = checkedCount / totalItems;

  const circumference = 2 * Math.PI * 45; // radius 45 -> ~282.7
  const strokeDashoffset = circumference * (1 - progressRatio);

  const verdict =
    checkedCount === 0
      ? 'ابدأ بفحص بنود الحيوان بنداً بنداً قبل دفع أي مبالغ.'
      : checkedCount < 4
      ? 'ما زال أمامك عدة بنود مهمة، تأكد من سلامة التنفس والأظلاف.'
      : checkedCount < totalItems
      ? 'أوشكت على الانتهاء! أكمل بقية الفحوصات وتحقق من شهادة التطعيم.'
      : 'ممتاز! تم استيفاء جميع بنود الفحص بنجاح، ويمكنك إتمام الشراء بطمأنينة.';

  return (
    <div className="space-y-10">
      <PageBanner
        title="قائمة فحص المشتري قبل الدفع"
        subtitle="ثمانية بنود أساسية لفحص العينين والتنفس والمشي والأسنان لحماية صفقتك وضمان سلامة الحيوان"
        badge="دليل الأمان والمطابقة"
        icon="clip"
        crumbs={[{ label: 'قائمة فحص المشتري' }]}
        tone="clay"
        chips={[
          { label: '8 بنود بيطرية فاحصة', icon: 'steth' },
          { label: 'حفظ تلقائي للتقدم', icon: 'check' },
        ]}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-right">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Progress & Verdict Column */}
          <div className="lg:col-span-5 bg-white dark:bg-[#122119] border border-gray-200/80 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 lg:sticky lg:top-28 text-center sm:text-right">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">مؤشر اكتمال الفحص</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">انقر على أي بند لإدراجه كبند تم التحقق منه.</p>
            </div>

            {/* Circular Progress Ring */}
            <div className="relative w-36 h-36 mx-auto grid place-items-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" className="text-gray-100 dark:text-white/10" />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#0f4a36"
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-500"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-['Readex_Pro',sans-serif] text-3xl font-black text-[#0f4a36] dark:text-[#58d39a]">
                  {checkedCount}/{totalItems}
                </span>
                <span className="text-[11px] text-gray-400 font-medium">بنود مفحوصة</span>
              </div>
            </div>

            {/* Dynamic Status Verdict */}
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-900/10 dark:border-white/5 text-xs text-emerald-900 dark:text-emerald-200 leading-relaxed font-semibold">
              {verdict}
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="flex-1 bg-[#0f4a36] text-white py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow"
              >
                <Icon name="print" className="w-3.5 h-3.5" />
                <span>طباعة القائمة</span>
              </button>
              <button
                type="button"
                onClick={resetChecklist}
                className="py-2.5 px-4 rounded-xl border border-gray-200 dark:border-white/10 text-xs text-gray-600 dark:text-gray-300 font-semibold hover:bg-gray-50 dark:hover:bg-white/5"
              >
                إعادة ضبط
              </button>
            </div>
          </div>

          {/* Checklist Items Column */}
          <div className="lg:col-span-7 space-y-3">
            {CHECKLIST_ITEMS.map((item, idx) => {
              const isChecked = !!checklistState[idx];
              return (
                <div
                  key={idx}
                  onClick={() => toggleChecklistItem(idx)}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                    isChecked
                      ? 'bg-emerald-50/80 dark:bg-emerald-950/50 border-[#0f4a36] dark:border-emerald-500/50 shadow-sm'
                      : 'bg-white dark:bg-[#122119] border-gray-200/80 dark:border-white/10 hover:border-gray-300'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-lg border-2 grid place-items-center shrink-0 mt-0.5 transition-colors ${
                      isChecked
                        ? 'bg-[#0f4a36] border-[#0f4a36] text-white'
                        : 'border-gray-300 dark:border-white/20'
                    }`}
                  >
                    {isChecked && <Icon name="check" className="w-4 h-4 stroke-[3]" />}
                  </div>

                  <div className="flex-1">
                    <b
                      className={`block text-sm sm:text-base font-bold mb-1 ${
                        isChecked ? 'text-[#0f4a36] dark:text-[#58d39a]' : 'text-gray-900 dark:text-white'
                      }`}
                    >
                      {item[0]}
                    </b>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{item[1]}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
