import React from 'react';
import { Listing } from '../types';
import { PAL, HILL, SKY, pv, ageText, sexLabel } from '../data/initialData';
import { Icon } from './Icons';

interface AdImageTemplateProps {
  listing: Listing;
  isFav?: boolean;
  isCmp?: boolean;
  onToggleFav?: (e: React.MouseEvent) => void;
  onToggleCmp?: (e: React.MouseEvent) => void;
  compact?: boolean;
  showBadges?: boolean;
}

export const AdImageTemplate: React.FC<AdImageTemplateProps> = ({
  listing,
  isFav = false,
  isCmp = false,
  onToggleFav,
  onToggleCmp,
  compact = false,
  showBadges = true,
}) => {
  const p = PAL[listing.pal] || PAL.cream;
  const h = HILL[listing.sk % HILL.length];
  const s = SKY[listing.sk % SKY.length];
  const sym = listing.goat ? 'goat' : listing.horns ? 'ram' : 'sheep';

  return (
    <div
      className="ad-template-frame relative w-full aspect-[16/10] overflow-hidden select-none"
      style={{
        background: `linear-gradient(175deg, ${s[0]} 0%, ${s[1]} 100%)`,
        borderTopLeftRadius: 'inherit',
        borderTopRightRadius: 'inherit',
      }}
    >
      {/* Background artwork SVG */}
      <svg
        className="scene absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 400 250"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        {/* Soft sun / ambient light */}
        <circle cx={300 + listing.sk * 8} cy="52" r="54" fill="#ffffff" opacity="0.4" />
        <circle cx={300 + listing.sk * 8} cy="52" r="80" fill="#ffffff" opacity="0.15" />

        {/* Desert/pastoral hills */}
        <path d="M0 138Q90 100 190 130T400 118V250H0Z" fill={h[0]} />
        <path d="M0 176Q120 140 230 170T400 160V250H0Z" fill={h[1]} />

        {/* Twin sheep if applicable */}
        {listing.twin && (
          <use
            href="#sheep"
            x="40"
            y="128"
            width="104"
            height="71"
            style={{ ...pv(PAL.white), opacity: 0.95 }}
          />
        )}

        {/* Foreground hill */}
        <path d="M0 214Q150 186 400 206V250H0Z" fill={h[2]} />

        {/* Ground shadow */}
        <ellipse cx="205" cy="222" rx="82" ry="9" fill="#0d2a1b" opacity="0.28" />

        {/* Main livestock animal */}
        <use
          href={`#${sym}`}
          x={listing.twin ? 118 : 84}
          y="58"
          width="234"
          height="162"
          style={pv(p, listing.goat)}
        />
      </svg>

      {/* Decorative luxury template top gradient vignette */}
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/55 via-black/20 to-transparent pointer-events-none z-[1]" />

      {/* Decorative luxury template bottom gradient vignette */}
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none z-[1]" />

      {/* Template Header Bar */}
      {showBadges && (
        <div className="absolute top-2.5 inset-x-3 flex items-center justify-between z-[3]">
          {/* Verification / status seal */}
          <div className="flex items-center gap-1.5">
            {listing.v ? (
              <span className="inline-flex items-center gap-1 bg-[#0f4a36]/95 backdrop-blur-md text-white text-[11.5px] font-bold px-2.5 py-1 rounded-full border border-white/20 shadow-md">
                <Icon name="shield" className="w-3.5 h-3.5 text-[#58d39a]" />
                <span>معتمد وموثّق</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 bg-[#b98425]/95 backdrop-blur-md text-white text-[11.5px] font-bold px-2.5 py-1 rounded-full border border-white/20 shadow-md">
                <Icon name="star" className="w-3.5 h-3.5 text-[#ffe9a8]" />
                <span>إعلان جديد</span>
              </span>
            )}

            {/* Breed tag emblem inside template header */}
            <span className="bg-black/40 backdrop-blur-md text-white/90 text-[11px] font-semibold px-2 py-0.5 rounded-md border border-white/10 hidden sm:inline-block">
              {listing.type}
            </span>
          </div>

          {/* Quick Favorite Button */}
          {onToggleFav && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleFav(e);
              }}
              className={`w-9 h-9 rounded-full grid place-items-center transition-all duration-200 backdrop-blur-md shadow-md border ${
                isFav
                  ? 'bg-white text-[#d2402e] border-white scale-105'
                  : 'bg-white/85 hover:bg-white text-[#0f4a36] border-white/40 hover:scale-105'
              }`}
              title={isFav ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}
              aria-label="المفضلة"
            >
              <Icon name="heart" className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
            </button>
          )}
        </div>
      )}

      {/* Compare button overlay */}
      {onToggleCmp && (
        <div className="absolute top-12 inset-inline-end-3 z-[3]">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleCmp(e);
            }}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11.5px] font-bold backdrop-blur-md border transition-all ${
              isCmp
                ? 'bg-[#0f4a36] text-white border-white/30'
                : 'bg-white/80 hover:bg-white text-[#0f4a36] border-white/30 hover:scale-105'
            }`}
          >
            <Icon name="layers" className="w-3.5 h-3.5" />
            <span>قارن</span>
          </button>
        </div>
      )}

      {/* Template Watermark / Official Badge in Center Corner */}
      <div className="absolute bottom-10 inset-inline-start-3 z-[2] pointer-events-none opacity-80">
        <span className="text-[10px] tracking-wider font-semibold text-white/90 bg-black/45 backdrop-blur-sm px-2 py-0.5 rounded border border-white/15">
          سوق الغنم المعتمد #{listing.id}
        </span>
      </div>

      {/* OVERLAID TEMPLATE INFO RIBBON (Directly inside the image template!) */}
      <div className="absolute inset-x-2.5 bottom-2 z-[3] flex items-center justify-between gap-1 text-[11px] text-white font-medium bg-black/55 backdrop-blur-md px-2.5 py-1.5 rounded-xl border border-white/20 shadow-md">
        <span className="inline-flex items-center gap-1 text-emerald-300">
          <Icon name="pin" className="w-3 h-3 text-emerald-400" />
          <span className="truncate max-w-[70px]">{listing.reg}</span>
        </span>
        <span className="text-white/40">•</span>
        <span className="inline-flex items-center gap-1 text-amber-200">
          <Icon name="cal" className="w-3 h-3 text-amber-300" />
          <span>{ageText(listing.age)}</span>
        </span>
        <span className="text-white/40">•</span>
        <span className="inline-flex items-center gap-1 text-sky-200">
          <Icon name="weight" className="w-3 h-3 text-sky-300" />
          <span>~{listing.kg} كجم</span>
        </span>
        <span className="text-white/40 hidden sm:inline">•</span>
        <span className="hidden sm:inline-flex items-center gap-1 text-white/90">
          <Icon name="eye" className="w-3 h-3 text-white/80" />
          <span>{sexLabel(listing)}</span>
        </span>
      </div>
    </div>
  );
};
