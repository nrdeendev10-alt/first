import React, { useState } from 'react';
import { PageBanner } from '../components/PageBanner';
import { useApp } from '../context/AppContext';
import { Icon } from '../components/Icons';

export const ContactPage: React.FC = () => {
  const { params, showToast, addReport, settings } = useApp();

  const [subject, setSubject] = useState(params.sub === 'report' ? 'الإبلاغ عن إعلان' : 'استفسار عام');
  const [adId, setAdId] = useState(params.ad || '');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      showToast('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    if (subject === 'الإبلاغ عن إعلان' || params.sub === 'report') {
      addReport({
        adId: adId ? Number(adId) : undefined,
        reporterName: name.trim(),
        reporterPhone: email.trim(),
        reason: subject,
        details: message.trim()
      });
    } else {
      showToast('تم إرسال رسالتك بنجاح! سيتواصل معك فريق خدمة العملاء قريباً.');
    }

    setName('');
    setEmail('');
    setMessage('');
    setAdId('');
  };

  return (
    <div className="space-y-10">
      <PageBanner
        title="تواصل مع إدارة سوق الغنم"
        subtitle="فريق الدعم الفني جاهز للإجابة على استفساراتك ومراجعة طلبات التوثيق والإبلاغ عن أي مخالفات"
        badge="خدمة العملاء"
        icon="chat"
        crumbs={[{ label: 'تواصل معنا' }]}
        tone="teal"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-right space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Contact Information Cards */}
          <div className="md:col-span-5 space-y-4">
            <div className="bg-white dark:bg-[#122119] border border-gray-200/80 dark:border-white/10 rounded-2xl p-6 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-[#0f4a36] dark:text-[#58d39a] grid place-items-center">
                <Icon name="phone" className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-gray-900 dark:text-white">الاتصال المباشر</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                متاح يومياً من 8 صباحاً حتى 10 مساءً للإجابة على استفسارات المشترين والمربين.
              </p>
              <b className="font-['Readex_Pro',sans-serif] text-sm text-[#0f4a36] dark:text-[#58d39a] block dir-ltr text-right">
                {settings.supportPhone}
              </b>
            </div>

            <div className="bg-white dark:bg-[#122119] border border-gray-200/80 dark:border-white/10 rounded-2xl p-6 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-[#b98425] grid place-items-center">
                <Icon name="mail" className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-gray-900 dark:text-white">البريد الإلكتروني</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                لطلبات التوثيق الرسمي للمزارع والشراكات والشكاوى التجارية.
              </p>
              <b className="text-xs text-gray-800 dark:text-gray-200 block dir-ltr text-right">
                {settings.supportEmail}
              </b>
            </div>

            <div className="bg-white dark:bg-[#122119] border border-gray-200/80 dark:border-white/10 rounded-2xl p-6 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-950/60 text-[#2c6a78] grid place-items-center">
                <Icon name="shield" className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-gray-900 dark:text-white">توثيق المربين</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                أرسل صورة الهوية وسجل المزرعة للحصول على شارة «معتمد وموثّق».
              </p>
            </div>
          </div>

          {/* Contact / Report Form */}
          <form
            onSubmit={handleSubmit}
            className="md:col-span-7 bg-white dark:bg-[#122119] border border-gray-200/80 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4"
          >
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">أرسل استفسارك أو طلبك</h3>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">
                موضوع الرسالة:
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full text-xs font-semibold bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/15 rounded-xl p-3 outline-none"
              >
                <option value="استفسار عام">استفسار عام عن السوق</option>
                <option value="توثيق حساب مربٍّ">طلب توثيق حساب مربٍّ رسمي</option>
                <option value="الإبلاغ عن إعلان">الإبلاغ عن إعلان مخالف أو غير دقيق</option>
                <option value="اقتراح أو شكوى">اقتراح تطويري أو شكوى</option>
              </select>
            </div>

            {subject === 'الإبلاغ عن إعلان' && (
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">
                  رقم الإعلان المخالف:
                </label>
                <input
                  type="text"
                  value={adId}
                  onChange={(e) => setAdId(e.target.value)}
                  placeholder="مثال: 1004"
                  className="w-full text-xs bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/15 rounded-xl p-3 outline-none"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">
                الاسم الكريم: <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="أدخل اسمك الكريم"
                className="w-full text-xs bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/15 rounded-xl p-3 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">
                البريد الإلكتروني: <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="example@mail.com"
                dir="ltr"
                className="w-full text-xs bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/15 rounded-xl p-3 outline-none text-right"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">
                نص الرسالة أو تفاصيل البلاغ: <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                placeholder="اكتب استفسارك بالتفصيل..."
                className="w-full text-xs bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/15 rounded-xl p-3 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#0f4a36] hover:bg-[#156047] text-white font-bold py-3.5 rounded-xl text-xs shadow transition-colors cursor-pointer"
            >
              إرسال الرسالة للإدارة
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
