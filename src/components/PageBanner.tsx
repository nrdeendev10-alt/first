import React, { useState, useRef } from 'react';
import { Icon } from './Icons';

interface Crumb {
  label: string;
  onClick?: () => void;
}

interface PageBannerProps {
  title: string;
  subtitle?: string;
  badge?: string;
  icon?: string;
  crumbs?: Crumb[];
  chips?: { label: string; icon?: string }[];
  tone?: 'green' | 'gold' | 'teal' | 'sand' | 'clay';
  actions?: React.ReactNode;
  videoUrl?: string;
}

export const PageBanner: React.FC<PageBannerProps> = ({
  title,
  subtitle,
  badge,
  icon,
  crumbs = [],
  chips = [],
  tone = 'green',
  actions,
  videoUrl,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isLooping, setIsLooping] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Reliable, high quality real footage video of sheep grazing in green pastures
  const defaultVideo = "https://assets.mixkit.co/videos/preview/mixkit-flock-of-sheep-grazing-in-the-field-11725-large.mp4";
  const activeVideo = videoUrl || defaultVideo;

  const handleTogglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleToggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleToggleLoop = () => {
    if (videoRef.current) {
      videoRef.current.loop = !isLooping;
      setIsLooping(!isLooping);
    }
  };

  // Tone gradients matching brand aesthetic
  const toneClasses: Record<string, string> = {
    green: 'from-[#072419] via-[#0f4a36] to-[#0b2b20]',
    gold: 'from-[#2e2105] via-[#755214] to-[#3b2b0a]',
    teal: 'from-[#07252d] via-[#1b5b69] to-[#0f363f]',
    sand: 'from-[#2a1c0d] via-[#6d4d29] to-[#332210]',
    clay: 'from-[#29130d] via-[#6e3725] to-[#3b1c12]',
  };

  return (
    <div className="relative overflow-hidden bg-[#072419] text-white pt-8 pb-16 px-4 md:px-8 border-b border-white/10 shadow-lg">
      {/* Background Subtle Gradient & Pattern Layer */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <div className={`absolute inset-0 bg-gradient-to-l ${toneClasses[tone]} opacity-95`} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-400/10 via-transparent to-black/40" />
      </div>

      {/* Sadu Traditional Top Line */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-500 via-emerald-400 to-amber-500 opacity-70 z-10" />

      {/* Video Interactive Controls Widget in Top-Left / Bottom-Left */}
      <div className="absolute bottom-4 left-4 z-20 hidden sm:flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 text-[11px] text-white">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-1" />
        <span className="font-semibold text-white/90">فيديو حقيقي</span>
        <div className="h-3 w-px bg-white/20 mx-1" />

        {/* Play / Pause button */}
        <button
          type="button"
          onClick={handleTogglePlay}
          className="hover:text-emerald-300 transition-colors px-1 cursor-pointer"
          title={isPlaying ? 'إيقاف الفيديو مؤقتاً' : 'تشغيل الفيديو'}
        >
          {isPlaying ? '⏸ إيقاف' : '▶ تشغيل'}
        </button>

        {/* Mute / Unmute button */}
        <button
          type="button"
          onClick={handleToggleMute}
          className="hover:text-emerald-300 transition-colors px-1 cursor-pointer flex items-center gap-1"
          title={isMuted ? 'تشغيل الصوت' : 'كتم الصوت'}
        >
          <Icon name={isMuted ? 'volume-x' : 'volume'} className="w-3 h-3" />
          <span>{isMuted ? 'مكتوم' : 'صوت'}</span>
        </button>

        {/* Loop toggle */}
        <button
          type="button"
          onClick={handleToggleLoop}
          className={`px-1 cursor-pointer transition-colors ${isLooping ? 'text-amber-300' : 'text-gray-400'}`}
          title="تكرار الفيديو"
        >
          🔁 تكرار
        </button>
      </div>

      <div className="wrap max-w-6xl mx-auto relative z-10">
        {/* Breadcrumbs */}
        {crumbs.length > 0 && (
          <nav className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs text-white/80 mb-4 shadow-sm">
            <button
              type="button"
              onClick={crumbs[0].onClick}
              className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
            >
              <Icon name="home" className="w-3.5 h-3.5" />
              <span>الرئيسية</span>
            </button>
            {crumbs.map((c, i) => (
              <React.Fragment key={i}>
                <span className="text-white/40">/</span>
                {c.onClick ? (
                  <button
                    type="button"
                    onClick={c.onClick}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    {c.label}
                  </button>
                ) : (
                  <span className="text-white font-semibold">{c.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-3xl">
            {/* Badge */}
            {badge && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold mb-3 shadow-sm backdrop-blur-sm">
                {icon ? <Icon name={icon} className="w-3.5 h-3.5" /> : <Icon name="shield" className="w-3.5 h-3.5" />}
                <span>{badge}</span>
              </div>
            )}

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-snug drop-shadow-sm">
              {title}
            </h1>

            {/* Subtitle */}
            {subtitle && (
              <p className="mt-2.5 text-sm sm:text-base md:text-lg text-emerald-100/90 leading-relaxed max-w-2xl drop-shadow-xs">
                {subtitle}
              </p>
            )}

            {/* Feature chips */}
            {chips.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {chips.map((ch, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/35 backdrop-blur-sm border border-white/15 text-xs text-white/95 font-medium"
                  >
                    {ch.icon && <Icon name={ch.icon} className="w-3.5 h-3.5 text-amber-300" />}
                    <span>{ch.label}</span>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Action buttons if provided */}
          {actions && <div className="flex items-center gap-3 shrink-0">{actions}</div>}
        </div>
      </div>
    </div>
  );
};
