import React from 'react';
import { PageBanner } from '../components/PageBanner';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="space-y-10">
      <PageBanner
        title="سياسة الخصوصية وسرية البيانات"
        subtitle="نلتزم بحماية بياناتك الشخصية وبيانات التواصل وسجلات المعاملات وفق الأنظمة السعودية"
        badge="الخصوصية والأمان"
        crumbs={[{ label: 'سياسة الخصوصية' }]}
        tone="teal"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-right space-y-6 text-sm text-gray-700 dark:text-gray-300 leading-relaxed bg-white dark:bg-[#122119] p-8 rounded-3xl border border-gray-200/80 dark:border-white/10 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">1. جمع البيانات</h2>
        <p>
          نقوم بجمع بيانات التواصل اللازمة فقط لتمكين المشترين من التواصل مع المربين، مثل الاسم ورقم الجوال والمنطقة،
          ولا نشارك أي بيانات حساسة مع أي طرف ثالث لأغراض تسويقية دون موافقتك.
        </p>

        <h2 className="text-xl font-bold text-gray-900 dark:text-white">2. حماية وتشفير البيانات</h2>
        <p>
          تُطبق المنصة أعلى معايير التشفير والبروتوكولات الأمنية لحماية سجلات الحسابات والإعلانات ضد أي وصول غير مصرح به.
        </p>

        <h2 className="text-xl font-bold text-gray-900 dark:text-white">3. ملفات تعريف الارتباط والتخزين المحلي</h2>
        <p>
          نستخدم التخزين المحلي الآمن في متصفحك لحفظ تفضيلاتك مثل المظهر الداكن/الفاتح، قائمة الإعلانات المفضلة،
          والإعلانات المحددة للمقارنة، لتسهيل تجربتك دون الحاجة لتسجيل دخول متكرر.
        </p>
      </div>
    </div>
  );
};
