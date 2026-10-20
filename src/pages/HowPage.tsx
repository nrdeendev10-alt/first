import React from 'react';
import { PageBanner } from '../components/PageBanner';
import { useApp } from '../context/AppContext';
import { Icon } from '../components/Icons';

export const HowPage: React.FC = () => {
  const { navigate } = useApp();

  return (
    <div className="space-y-12">
      <PageBanner
        title="كيف يعمل سوق الغنم؟"
        subtitle="دليلك الكامل لرحلة شراء وبيع آمنة وسلسة من المزرعة وحتى باب منزلك"
        badge="طريقة العمل والأمان"
        icon="info"
        crumbs={[{ label: 'كيف يعمل السوق' }]}
        tone="green"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-right space-y-16">
        {/* Buyer Journey */}
        <section className="space-y-6">
          <div className="border-b border-gray-200 dark:border-white/10 pb-4">
            <span className="text-xs font-bold text-[#b98425] uppercase tracking-wider block mb-1">للمشترين</span>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">خطوات الشراء الذكي والآمن</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-[#122119] border border-gray-200/80 dark:border-white/10 rounded-2xl p-6 shadow-sm space-y-3 relative">
              <span className="w-9 h-9 rounded-full bg-[#0f4a36] text-white font-bold grid place-items-center text-sm">
                1
              </span>
              <h3 className="font-bold text-base text-gray-900 dark:text-white">التصفح والفلترة</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                ابحث بالسلالة والمنطقة ونطاق السعر، واستخدم حاسبة الولائم لتقدير الكمية المناسبة.
              </p>
            </div>

            <div className="bg-white dark:bg-[#122119] border border-gray-200/80 dark:border-white/10 rounded-2xl p-6 shadow-sm space-y-3 relative">
              <span className="w-9 h-9 rounded-full bg-[#0f4a36] text-white font-bold grid place-items-center text-sm">
                2
              </span>
              <h3 className="font-bold text-base text-gray-900 dark:text-white">المقارنة والفحص</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                قارن حتى 3 إعلانات واطلع على متوسط سعر الكيلو الحي واستخدم قائمة فحص المشتري.
              </p>
            </div>

            <div className="bg-white dark:bg-[#122119] border border-gray-200/80 dark:border-white/10 rounded-2xl p-6 shadow-sm space-y-3 relative">
              <span className="w-9 h-9 rounded-full bg-[#0f4a36] text-white font-bold grid place-items-center text-sm">
                3
              </span>
              <h3 className="font-bold text-base text-gray-900 dark:text-white">التواصل والمعاينة</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                تواصل مع المربي مباشرة عبر الهاتف أو الواتساب وحدد موعداً للمعاينة الميدانية.
              </p>
            </div>

            <div className="bg-white dark:bg-[#122119] border border-gray-200/80 dark:border-white/10 rounded-2xl p-6 shadow-sm space-y-3 relative">
              <span className="w-9 h-9 rounded-full bg-[#0f4a36] text-white font-bold grid place-items-center text-sm">
                4
              </span>
              <h3 className="font-bold text-base text-gray-900 dark:text-white">الدفع والتوصيل</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                ادفع بعد المعاينة عند الاستلام، واطلب خدمة نقل مجهزة من شركائنا المعتمدين.
              </p>
            </div>
          </div>
        </section>

        {/* Seller Journey */}
        <section className="space-y-6">
          <div className="border-b border-gray-200 dark:border-white/10 pb-4">
            <span className="text-xs font-bold text-[#b98425] uppercase tracking-wider block mb-1">للمربين والتجار</span>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">كيف تبيع مواشيك بسرعة ومصداقية؟</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-[#122119] border border-gray-200/80 dark:border-white/10 rounded-2xl p-6 shadow-sm space-y-3 relative">
              <span className="w-9 h-9 rounded-full bg-[#b98425] text-white font-bold grid place-items-center text-sm">
                1
              </span>
              <h3 className="font-bold text-base text-gray-900 dark:text-white">إضافة الإعلان</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                أدخل سلالة الرأس وعمره ووزنه التقريبي وسعره المطلوب، مع وصف دقيق لحالته.
              </p>
            </div>

            <div className="bg-white dark:bg-[#122119] border border-gray-200/80 dark:border-white/10 rounded-2xl p-6 shadow-sm space-y-3 relative">
              <span className="w-9 h-9 rounded-full bg-[#b98425] text-white font-bold grid place-items-center text-sm">
                2
              </span>
              <h3 className="font-bold text-base text-gray-900 dark:text-white">قالب احترافي موحد</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                يتم إدراج إعلانك تلقائياً داخل القالب المعتمد المدمج مع بيانات السلالة والوزن.
              </p>
            </div>

            <div className="bg-white dark:bg-[#122119] border border-gray-200/80 dark:border-white/10 rounded-2xl p-6 shadow-sm space-y-3 relative">
              <span className="w-9 h-9 rounded-full bg-[#b98425] text-white font-bold grid place-items-center text-sm">
                3
              </span>
              <h3 className="font-bold text-base text-gray-900 dark:text-white">توثيق الحساب</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                ارفع سجلك التجاري أو رخصة مزرعتك لتحصل على شارة «معتمد وموثّق» لزيادة المبيعات.
              </p>
            </div>

            <div className="bg-white dark:bg-[#122119] border border-gray-200/80 dark:border-white/10 rounded-2xl p-6 shadow-sm space-y-3 relative">
              <span className="w-9 h-9 rounded-full bg-[#b98425] text-white font-bold grid place-items-center text-sm">
                4
              </span>
              <h3 className="font-bold text-base text-gray-900 dark:text-white">التسليم واستلام المال</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                استقبل مكالمات ورسائل المشترين وأتمم صفقتك نقداً أو عبر التحويل المباشر.
              </p>
            </div>
          </div>
        </section>

        {/* Action Card */}
        <div className="bg-gradient-to-r from-[#0f4a36] to-[#14604a] text-white p-8 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold">جاهز لبدء رحلتك في سوق الغنم؟</h3>
            <p className="text-xs sm:text-sm text-emerald-100/80 mt-1">
              تصفّح مئات الرؤوس الآن أو انشر إعلانك خلال دقيقة واحدة فقط.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate('listings')}
              className="bg-white text-[#0f4a36] px-5 py-2.5 rounded-xl text-xs font-bold shadow"
            >
              تصفّح الإعلانات
            </button>
            <button
              type="button"
              onClick={() => navigate('add-ad')}
              className="bg-[#b98425] text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow"
            >
              + أضف إعلانك
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
