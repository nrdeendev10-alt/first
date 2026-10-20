import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PageBanner } from '../components/PageBanner';
import { ListingCard } from '../components/ListingCard';
import { REGIONS, PALMAP } from '../data/initialData';
import { Listing, CategoryType, SexType } from '../types';
import { Icon } from '../components/Icons';

export const AddAdPage: React.FC = () => {
  const { addUserListing, navigate, showToast } = useApp();

  const [title, setTitle] = useState('');
  const [cat, setCat] = useState<CategoryType>('sheep');
  const [type, setType] = useState('نعيمي');
  const [sex, setSex] = useState<SexType>('y');
  const [age, setAge] = useState<number>(8);
  const [kg, setKg] = useState<number>(45);
  const [price, setPrice] = useState<number>(4200);
  const [region, setRegion] = useState(REGIONS[0]);
  const [horns, setHorns] = useState(false);
  const [phone, setPhone] = useState('0512345678');
  const [desc, setDesc] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const breedOptions = cat === 'sheep' ? ['نعيمي', 'حري', 'نجدي', 'سواكني'] : ['ماعز'];
  const sexOptions =
    cat === 'sheep'
      ? [
          { val: 'm', label: 'كبش (ذكر بالغ)' },
          { val: 'f', label: 'نعجة (أنثى)' },
          { val: 'y', label: 'خروف (صغير)' },
        ]
      : [
          { val: 'm', label: 'تيس (ذكر بالغ)' },
          { val: 'f', label: 'عنزة (أنثى)' },
          { val: 'y', label: 'جدي (صغير)' },
        ];

  // Temporary live preview ad
  const previewListing: Listing = {
    id: 9999,
    t: title.trim() || 'خروف نعيمي سمين وجاهز للمعاينة',
    cat,
    type,
    sex,
    age: age || 8,
    kg: kg || 45,
    price: price || 0,
    reg: region,
    b: 6, // 'إعلانك'
    pal: PALMAP[type] || 'cream',
    sk: 1,
    v: 0,
    fl: 0,
    d: desc.trim() || 'وصف إعلانك ومواصفات التغذية والصحة ستظهر هنا.',
    horns: horns ? 1 : 0,
    goat: cat === 'goat' ? 1 : 0,
    phone,
    user: 1,
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!title.trim()) errs.title = 'يرجى كتابة عنوان واضح للإعلان';
    if (!price || price < 100 || price > 100000) errs.price = 'السعر يجب أن يكون بين 100 و 100,000 ر.س';
    if (!kg || kg < 5 || kg > 200) errs.kg = 'الوزن يجب أن يكون بين 5 و 200 كجم';
    if (!age || age < 1 || age > 120) errs.age = 'العمر يجب أن يكون بين 1 و 120 شهراً';
    const cleanPhone = phone.replace(/[\s-]/g, '');
    if (!/^(05\d{8}|\+9665\d{8})$/.test(cleanPhone)) {
      errs.phone = 'أدخل رقم جوال سعودي صحيح (مثال: 0512345678)';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      showToast('يرجى تصحيح الأخطاء في النموذج');
      return;
    }

    const newId = (Date.now() % 1000000) + 1000;
    const finalAd: Listing = {
      ...previewListing,
      id: newId,
    };

    addUserListing(finalAd);
    navigate('ad', { id: newId });
  };

  return (
    <div className="space-y-10">
      <PageBanner
        title="أضف إعلانك في سوق الغنم"
        subtitle="انشر مواصفات ذبيحتك أو ماشيتك وتصل لأكثر من 25,000 مشترٍ مسجل في كافة أنحاء المملكة"
        badge="نشر مجاني مباشر"
        icon="plus"
        crumbs={[{ label: 'سوق الإعلانات', onClick: () => navigate('listings') }, { label: 'إضافة إعلان' }]}
        tone="gold"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-right">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Column */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-7 bg-white dark:bg-[#122119] border border-gray-200/80 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6"
          >
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">بيانات الرأس المعروض</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                أدخل مواصفات حقيقية للمعاينة لتزيد ثقة المشترين وسرعة إتمام البيع.
              </p>
            </div>

            {/* Title */}
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">
                عنوان الإعلان <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="مثال: خروف نعيمي سمين محصن ومغذا على الشعير"
                className="w-full text-sm bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/15 rounded-xl p-3 outline-none focus:border-[#0f4a36]"
              />
              {errors.title && <small className="text-rose-500 text-xs block mt-1">{errors.title}</small>}
            </div>

            {/* Category and Breed */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">
                  النوع العام <span className="text-rose-500">*</span>
                </label>
                <select
                  value={cat}
                  onChange={(e) => {
                    const c = e.target.value as CategoryType;
                    setCat(c);
                    setType(c === 'sheep' ? 'نعيمي' : 'ماعز');
                  }}
                  className="w-full text-sm bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/15 rounded-xl p-3 outline-none"
                >
                  <option value="sheep">الضأن (أغنام)</option>
                  <option value="goat">الماعز</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">
                  السلالة <span className="text-rose-500">*</span>
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full text-sm bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/15 rounded-xl p-3 outline-none"
                >
                  {breedOptions.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Sex and Horns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">
                  الجنس والمرحلة <span className="text-rose-500">*</span>
                </label>
                <select
                  value={sex}
                  onChange={(e) => setSex(e.target.value as SexType)}
                  className="w-full text-sm bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/15 rounded-xl p-3 outline-none"
                >
                  {sexOptions.map((s) => (
                    <option key={s.val} value={s.val}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">
                  المنطقة / المدينة <span className="text-rose-500">*</span>
                </label>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full text-sm bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/15 rounded-xl p-3 outline-none"
                >
                  {REGIONS.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Age, Weight, Price */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">
                  العمر (بالأشهر) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  min={1}
                  max={120}
                  className="w-full text-sm bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/15 rounded-xl p-3 outline-none"
                />
                {errors.age && <small className="text-rose-500 text-xs block mt-1">{errors.age}</small>}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">
                  الوزن الحي (~كجم) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  value={kg}
                  onChange={(e) => setKg(Number(e.target.value))}
                  min={5}
                  max={200}
                  className="w-full text-sm bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/15 rounded-xl p-3 outline-none"
                />
                {errors.kg && <small className="text-rose-500 text-xs block mt-1">{errors.kg}</small>}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">
                  السعر المطلوب (ر.س) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  min={100}
                  className="w-full text-sm bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/15 rounded-xl p-3 outline-none font-bold text-[#0f4a36] dark:text-[#58d39a]"
                />
                {errors.price && <small className="text-rose-500 text-xs block mt-1">{errors.price}</small>}
              </div>
            </div>

            {/* Horns Checkbox */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="hornsCheck"
                checked={horns}
                onChange={(e) => setHorns(e.target.checked)}
                className="w-4 h-4 accent-[#0f4a36] rounded"
              />
              <label htmlFor="hornsCheck" className="text-xs font-bold text-gray-700 dark:text-gray-300 cursor-pointer">
                الرأس مقرّن بقرون واضحة
              </label>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">
                رقم جوال التواصل (سعودي) <span className="text-rose-500">*</span>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0512345678"
                dir="ltr"
                className="w-full text-sm bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/15 rounded-xl p-3 outline-none text-right"
              />
              {errors.phone && <small className="text-rose-500 text-xs block mt-1">{errors.phone}</small>}
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">
                وصف إضافي وحالة التطعيمات
              </label>
              <textarea
                rows={4}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="اذكر نوع العلف، تاريخ آخر تطعيم، جاهزية الذبح، وإمكانية المعاينة في المزرعة..."
                className="w-full text-sm bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/15 rounded-xl p-3 outline-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#0f4a36] hover:bg-[#156047] text-white font-bold py-4 px-6 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 text-base cursor-pointer"
            >
              <Icon name="plus" className="w-5 h-5" />
              <span>نشر الإعلان الآن فورياً</span>
            </button>
          </form>

          {/* Live Preview Column with Branded Template */}
          <aside className="lg:col-span-5 space-y-4 lg:sticky lg:top-28">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#b98425] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>معاينة البطاقة في قالب الموقع الموحد:</span>
              </span>
              <span className="text-[11px] text-gray-400">تتحدث تلقائياً</span>
            </div>

            {/* Card Preview */}
            <div className="scale-95 sm:scale-100 origin-top">
              <ListingCard listing={previewListing} />
            </div>

            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-white/10 rounded-2xl p-4 text-xs text-amber-950 dark:text-amber-200 leading-relaxed">
              💡 <b>ملاحظة:</b> صورتك وقالب الإعلان سيظهر للمشترين بهذا الشكل الاحترافي الموحد مع شارة المنطقة والوزن
              والعمر مدمجة تلقائياً داخل القالب.
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
