import React from 'react';
import { PageBanner } from '../components/PageBanner';
import { useApp } from '../context/AppContext';
import { ListingCard } from '../components/ListingCard';
import { Icon } from '../components/Icons';

export const FavoritesPage: React.FC = () => {
  const { listings, favorites, clearFavorites, navigate } = useApp();

  const favListings = favorites.map((id) => listings.find((a) => a.id === id)).filter(Boolean);

  return (
    <div className="space-y-10">
      <PageBanner
        title="قائمة الإعلانات المحفوظة"
        subtitle="الإعلانات التي أضفتها إلى مفضلتك للرجوع إليها ومقارنتها ومتابعة أسعارها"
        badge="المفضلة"
        icon="heart"
        crumbs={[{ label: 'المفضلة' }]}
        tone="gold"
        chips={[{ label: `${favListings.length} إعلان محفوظ`, icon: 'heart' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-right space-y-6">
        {favListings.length > 0 ? (
          <>
            <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-white/10">
              <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                لديك {favListings.length} إعلان في قائمتك المفضلة
              </span>
              <button
                type="button"
                onClick={clearFavorites}
                className="text-xs font-bold text-rose-500 hover:underline cursor-pointer"
              >
                مسح المفضلة بالكامل
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {favListings.map((ad) => (
                <ListingCard key={ad!.id} listing={ad!} />
              ))}
            </div>
          </>
        ) : (
          <div className="bg-white dark:bg-[#122119] border border-dashed border-gray-300 dark:border-white/15 rounded-3xl p-16 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-500 grid place-items-center mx-auto text-2xl">
              ❤️
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">قائمة المفضلة فارغة حالياً</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
              اضغط على رمز القلب في أي إعلان أثناء التصفح لحفظه والرجوع إليه لاحقاً.
            </p>
            <button
              type="button"
              onClick={() => navigate('listings')}
              className="bg-[#0f4a36] text-white font-bold py-2.5 px-6 rounded-xl text-xs shadow-md cursor-pointer"
            >
              استكشف الإعلانات الآن
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
