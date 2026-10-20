import React from 'react';
import { Listing } from '../types';
import { INITIAL_BREEDERS, fmt } from '../data/initialData';
import { AdImageTemplate } from './AdImageTemplate';
import { Icon } from './Icons';
import { useApp } from '../context/AppContext';

interface ListingCardProps {
  listing: Listing;
}

export const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  const { navigate, favorites, toggleFavorite, compareList, toggleCompare } = useApp();
  const breeder = INITIAL_BREEDERS[listing.b] || INITIAL_BREEDERS[0];
  const isFav = favorites.includes(listing.id);
  const isCmp = compareList.includes(listing.id);

  const handleClick = () => {
    navigate('ad', { id: listing.id });
  };

  return (
    <article
      onClick={handleClick}
      className="card group cursor-pointer bg-white dark:bg-[#122119] border border-gray-200/80 dark:border-emerald-900/40 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col text-right relative"
    >
      {/* Unified Image Template with Overlaid Information Frame */}
      <AdImageTemplate
        listing={listing}
        isFav={isFav}
        isCmp={isCmp}
        onToggleFav={() => toggleFavorite(listing.id)}
        onToggleCmp={() => toggleCompare(listing.id)}
      />

      {/* Card Details Body */}
      <div className="p-4 sm:p-5 flex flex-col gap-3 flex-1 justify-between">
        {/* Price and Breed Row */}
        <div className="flex items-center justify-between gap-2">
          <div className="price text-xl sm:text-2xl font-black text-[#0f4a36] dark:text-[#58d39a] font-['Readex_Pro',sans-serif]">
            {fmt(listing.price)}{' '}
            <small className="text-xs font-semibold text-gray-500 dark:text-gray-400">ر.س</small>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/70 text-[#0f4a36] dark:text-emerald-300 border border-emerald-100 dark:border-emerald-900/40">
            {listing.type}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-gray-900 dark:text-white leading-snug line-clamp-2 group-hover:text-[#0f4a36] dark:group-hover:text-[#58d39a] transition-colors">
          {listing.t}
        </h3>

        {/* Footer info: Breeder and Details Action */}
        <div className="mt-2 pt-3 border-t border-gray-100 dark:border-white/10 flex items-center justify-between gap-2 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-2 min-w-0">
            <span
              className="w-7 h-7 rounded-full text-white font-bold grid place-items-center shrink-0 text-xs shadow-sm"
              style={{ backgroundColor: breeder.c || '#0f4a36' }}
            >
              {breeder.n.charAt(0)}
            </span>
            <div className="truncate">
              <b className="block text-gray-800 dark:text-gray-200 font-semibold truncate text-xs">
                {breeder.n}
              </b>
              <span className="flex items-center gap-1 text-[11px] text-amber-500 font-bold">
                <Icon name="star" className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span>{breeder.rt.toFixed(1)}</span>
              </span>
            </div>
          </div>

          <span className="inline-flex items-center gap-1 font-bold text-[#0f4a36] dark:text-[#58d39a] group-hover:translate-x-[-2px] transition-transform">
            <span>التفاصيل</span>
            <Icon name="left" className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </article>
  );
};
