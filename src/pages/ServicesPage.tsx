import React, { useState } from 'react';
import { PageBanner } from '../components/PageBanner';
import { REGIONS } from '../data/initialData';
import { useApp } from '../context/AppContext';
import { Icon } from '../components/Icons';

export const ServicesPage: React.FC = () => {
  const { showToast, addServiceOrder } = useApp();
  const [serviceType, setServiceType] = useState('نقل المواشي');
  const [region, setRegion] = useState(REGIONS[0]);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) {
      showToast('يرجى كتابة الاسم ورقم الجوال للتواصل');
      return;
    }

    addServiceOrder({
      serviceType,
      region,
      fullName: fullName.trim(),
      phone: phone.trim(),
      notes: notes.trim(),
      status: 'new'
    });

    setFullName('');
    setPhone('');
    setNotes('');
  };

  return (
    <div className="space-y-10">
      <PageBanner
        title="خدمات ما بعد الشراء من شركاء مرخصين"
        subtitle="خدمات النقل المبرد والمهيأ، الأعلاف المعتمدة، والفحوصات البيطرية الميدانية في جميع مناطق المملكة"
        badge="شركاء معتمدون"
        icon="truck"
        crumbs={[{ label: 'الخدمات المساندة' }]}
        tone="teal"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-right space-y-12">
        {/* Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Service 1: Transport */}
          <div className="rounded-3xl p-8 bg-gradient-to-br from-[#145a41] to-[#0b3526] text-white flex flex-col justify-between shadow-lg space-y-6">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-white/15 grid place-items-center mb-4">
                <Icon name="truck" className="w-7 h-7 text-emerald-300" />
              </div>
              <h3 className="text-2xl font-bold mb-2">خدمات النقل المخصص</h3>
              <p className="text-emerald-100/80 text-xs sm:text-sm leading-relaxed mb-4">
                شاحنات وسيارات مجهزة بحواجز تهوية وأرضيات غير زلقة تحمي الحيوان من الإجهاد وفقدان الوزن في الطريق.
              </p>
              <ul className="space-y-2 text-xs text-emerald-100/90">
                <li className="flex items-center gap-2">✓ توصيل من المزرعة إلى المنزل أو المسلخ</li>
                <li className="flex items-center gap-2">✓ سائقون خبراء في نقل المواشي بحذر</li>
                <li className="flex items-center gap-2">✓ تغطية شاملة بين المدن وداخلها</li>
              </ul>
            </div>
            <button
              type="button"
              onClick={() => setServiceType('نقل المواشي')}
              className="w-full bg-white text-[#0f4a36] font-bold py-3 rounded-xl text-xs hover:bg-emerald-50 transition-colors cursor-pointer"
            >
              طلب نقل مواشي
            </button>
          </div>

          {/* Service 2: Feed */}
          <div className="rounded-3xl p-8 bg-gradient-to-br from-[#8a6a1c] to-[#5c4410] text-white flex flex-col justify-between shadow-lg space-y-6">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-white/15 grid place-items-center mb-4">
                <Icon name="box" className="w-7 h-7 text-amber-300" />
              </div>
              <h3 className="text-2xl font-bold mb-2">الأعلاف والمستلزمات</h3>
              <p className="text-amber-100/80 text-xs sm:text-sm leading-relaxed mb-4">
                أعلاف ومكملات غذائية طبيعية معتمدة من وزارة البيئة والمياه والزراعة، لضمان صحة القطيع وزيادة وزنه.
              </p>
              <ul className="space-y-2 text-xs text-amber-100/90">
                <li className="flex items-center gap-2">✓ برسيم صافٍ، رودس، وتبن ممتاز</li>
                <li className="flex items-center gap-2">✓ شعير مركب ومكعبات تسمين غنية بالبروتين</li>
                <li className="flex items-center gap-2">✓ توصيل شحنات مباشرة للمزارع والحظائر</li>
              </ul>
            </div>
            <button
              type="button"
              onClick={() => setServiceType('توريد الأعلاف')}
              className="w-full bg-white text-[#8a6a1c] font-bold py-3 rounded-xl text-xs hover:bg-amber-50 transition-colors cursor-pointer"
            >
              طلب توريد أعلاف
            </button>
          </div>

          {/* Service 3: Vet */}
          <div className="rounded-3xl p-8 bg-gradient-to-br from-[#2c6a78] to-[#143f4a] text-white flex flex-col justify-between shadow-lg space-y-6">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-white/15 grid place-items-center mb-4">
                <Icon name="steth" className="w-7 h-7 text-sky-300" />
              </div>
              <h3 className="text-2xl font-bold mb-2">الخدمات البيطرية</h3>
              <p className="text-sky-100/80 text-xs sm:text-sm leading-relaxed mb-4">
                أطباء بيطريون مرخصون لفحص سلامة الرؤوس قبل إتمام الصفقة، وإصدار الشهادات الصحية والتطعيمات.
              </p>
              <ul className="space-y-2 text-xs text-sky-100/90">
                <li className="flex items-center gap-2">✓ فحص خلو من الأمراض التنفسية والجلدية</li>
                <li className="flex items-center gap-2">✓ شهادة صحية رسمية قبل النقل والذبح</li>
                <li className="flex items-center gap-2">✓ زيارات ميدانية لمعاينة المزارع والقطعان</li>
              </ul>
            </div>
            <button
              type="button"
              onClick={() => setServiceType('فحص بيطري')}
              className="w-full bg-white text-[#2c6a78] font-bold py-3 rounded-xl text-xs hover:bg-sky-50 transition-colors cursor-pointer"
            >
              طلب فحص بيطري
            </button>
          </div>
        </div>

        {/* Request Form */}
        <div className="max-w-2xl mx-auto bg-white dark:bg-[#122119] border border-gray-200/80 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">طلب خدمة من شريك معتمد</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              أدخل بياناتك وسيتواصل معك أقرب مزود خدمة مرخص في منطقتك لتقديم عرض سعر فوري.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">
                  نوع الخدمة المطلوبة:
                </label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full text-xs font-semibold bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/15 rounded-xl p-3 outline-none"
                >
                  <option value="نقل المواشي">نقل المواشي والأغنام</option>
                  <option value="توريد الأعلاف">توريد الأعلاف والمكملات</option>
                  <option value="فحص بيطري">فحص بيطري وشهادة صحية</option>
                  <option value="تجهيز ولائم">خدمة سلخ وتجهيز ولائم</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">المنطقة:</label>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full text-xs font-semibold bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/15 rounded-xl p-3 outline-none"
                >
                  {REGIONS.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">
                  الاسم الكريم:
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="مثال: فهد الدوسري"
                  required
                  className="w-full text-xs bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/15 rounded-xl p-3 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">
                  رقم الجوال:
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0512345678"
                  dir="ltr"
                  required
                  className="w-full text-xs bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/15 rounded-xl p-3 outline-none text-right"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">
                تفاصيل الطلب (عدد الرؤوس، العنوان، الموعد):
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="اكتب تفاصيل الرحلة أو الفحص المطلوب..."
                className="w-full text-xs bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/15 rounded-xl p-3 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#0f4a36] hover:bg-[#156047] text-white font-bold py-3.5 rounded-xl shadow transition-colors text-xs cursor-pointer"
            >
              إرسال طلب الخدمة الآن
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
