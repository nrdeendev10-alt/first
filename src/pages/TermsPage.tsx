import React from 'react';
import { PageBanner } from '../components/PageBanner';

export const TermsPage: React.FC = () => {
  return (
    <div className="space-y-10">
      <PageBanner
        title="الشروط والأحكام"
        subtitle="شروط وضوابط استخدام منصة سوق الغنم للمشترين والمربين والمعلنين"
        badge="السياسات القانونية"
        crumbs={[{ label: 'الشروط والأحكام' }]}
        tone="green"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-right space-y-6 text-sm text-gray-700 dark:text-gray-300 leading-relaxed bg-white dark:bg-[#122119] p-8 rounded-3xl border border-gray-200/80 dark:border-white/10 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">1. مقدمة</h2>
        <p>
          أهلاً بكم في منصة «سوق الغنم»، المنصة الإلكترونية الرائدة في وساطة وتسهيل تجارة الأغنام والمواشي بالمملكة العربية السعودية.
          باستخدامك للمنصة، فإنك توافق على الالتزام الكامل بهذه الشروط والسياسات.
        </p>

        <h2 className="text-xl font-bold text-gray-900 dark:text-white">2. شروط النشر والإعلان</h2>
        <p>
          يجب على المعلن توخي الصدق التام في مواصفات الأغنام المعروضة من حيث السلالة، العمر، الوزن الحي، وسجل التحصينات.
          يُحظر منعاً باتاً نشر أي عروض مضللة أو مواشي مصابة بأمراض معدية أو صور منقولة بدون إذن أصحابها.
        </p>

        <h2 className="text-xl font-bold text-gray-900 dark:text-white">3. المعاينة وإتمام الصفقات</h2>
        <p>
          تؤكد منصة سوق الغنم على ضرورة قيام المشتري بمعاينة المواشي ميدانياً أو طلب فحص بيطري رسمي قبل دفع المبالغ كاملة.
          المنصة لا تتحمل أي خسائر ناتجة عن تحويلات مالية مسبقة خارج قنوات الدفع والتحقق الرسمية.
        </p>

        <h2 className="text-xl font-bold text-gray-900 dark:text-white">4. الملكية الفكرية</h2>
        <p>
          جميع التصاميم، القوالب الرسومية، مؤشر الأسعار، الشعار، والأدوات الحسابية هي ملكية حصرية لمنصة سوق الغنم ومحمية بموجب
          أنظمة حماية حقوق المؤلف والعلامات التجارية في المملكة العربية السعودية.
        </p>
      </div>
    </div>
  );
};
