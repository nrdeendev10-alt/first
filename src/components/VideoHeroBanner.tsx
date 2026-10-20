import React, { useState, useRef, useEffect } from 'react';
import { REGIONS } from '../data/initialData';
import { Icon } from './Icons';

interface VideoHeroBannerProps {
  onSearch: (cat: string, region: string, q: string) => void;
  onTagClick: (breed: string) => void;
}

export const VideoHeroBanner: React.FC<VideoHeroBannerProps> = ({ onSearch, onTagClick }) => {
  const [cat, setCat] = useState('');
  const [region, setRegion] = useState('');
  const [query, setQuery] = useState('');
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isLooping, setIsLooping] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Auto-play ensuring browser autoplay policy compliance (muted)
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {
        // Fallback if needed
      });
    }
  }, []);

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
      const nextMuted = !isMuted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  const handleToggleLoop = () => {
    if (videoRef.current) {
      const nextLoop = !isLooping;
      videoRef.current.loop = nextLoop;
      setIsLooping(nextLoop);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(cat, region, query);
  };

  return (
    <div className="relative min-h-[640px] lg:min-h-[740px] flex items-center justify-center overflow-hidden bg-[#0a2318]">
      {/* 100% Real Livestock Video Background (Local Fast Assets with Direct Fallbacks) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          loop={isLooping}
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover opacity-60 scale-105 transition-all duration-700"
        >
          {/* Fast local high-res MP4 & WebM */}
          <source src="/videos/sheep-pasture.mp4" type="video/mp4" />
          <source src="/videos/sheep-pasture.webm" type="video/webm" />
          {/* Online Wikimedia fallback */}
          <source src="https://upload.wikimedia.org/wikipedia/commons/transcoded/2/27/Sheep_grazing_in_the_countryside.webm/Sheep_grazing_in_the_countryside.webm.720p.vp9.webm" type="video/webm" />
        </video>

        {/* Cinematic Vignette Overlay - Keeps video visible while giving text 100% readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07231a] via-[#072419]/45 to-[#051a12]/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#061b13]/30 to-[#04130d]/70" />
      </div>

      {/* Floating Video Control Widget (Autoplay, Mute, Loop, Play/Pause) */}
      <div className="absolute bottom-6 left-6 z-20 flex items-center gap-2 bg-black/65 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs text-white shadow-2xl">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse ml-1" />
        <span className="font-semibold text-white text-[11px] hidden sm:inline">فيديو حي من المراعي</span>
        <div className="h-3 w-px bg-white/20 mx-1 hidden sm:block" />

        {/* Play / Pause toggle */}
        <button
          type="button"
          onClick={handleTogglePlay}
          className="hover:text-emerald-300 transition-colors px-1 cursor-pointer flex items-center gap-1 font-medium text-xs"
          title={isPlaying ? 'إيقاف مؤقت' : 'تشغيل'}
        >
          <span>{isPlaying ? '⏸ إيقاف' : '▶ تشغيل'}</span>
        </button>

        {/* Mute / Unmute toggle */}
        <button
          type="button"
          onClick={handleToggleMute}
          className="hover:text-emerald-300 transition-colors px-1 cursor-pointer flex items-center gap-1 font-medium text-xs"
          title={isMuted ? 'تشغيل الصوت' : 'كتم الصوت'}
        >
          <Icon name={isMuted ? 'volume-x' : 'volume'} className="w-3.5 h-3.5" />
          <span>{isMuted ? 'مكتوم' : 'صوت'}</span>
        </button>

        {/* Loop toggle */}
        <button
          type="button"
          onClick={handleToggleLoop}
          className={`px-1 cursor-pointer transition-colors font-medium text-xs ${isLooping ? 'text-amber-300' : 'text-gray-400'}`}
          title="تكرار تلقائي"
        >
          🔁 تكرار
        </button>
      </div>

      {/* Foreground Content: Pure Real Video + Text & Search */}
      <div className="wrap max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 w-full text-center">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/25 text-emerald-300 text-xs sm:text-sm font-semibold mb-6 shadow-lg animate-fade-in">
          <Icon name="shield" className="w-4 h-4 text-[#58d39a]" />
          <span>سوق إلكتروني موثوق يربطك بأصحاب المزارع والمربين مباشرة</span>
          <span className="bg-[#b98425] text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
            معتمد بالمملكة
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.2] max-w-4xl mx-auto drop-shadow-lg">
          اكتشف أفضل <span className="text-[#e0b050] underline decoration-[#b98425]/60 decoration-wavy">الأغنام والماعز</span> في المملكة
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-base sm:text-lg md:text-xl text-emerald-100 font-medium max-w-2xl mx-auto leading-relaxed drop-shadow-md">
          عروض موثقة من كبار المربين والتجار المعتمدين. قارن الأسعار، احسب احتياج وليمتك، وتواصل مع البائع فورياً.
        </p>

        {/* Search Bar Container */}
        <form
          onSubmit={handleSubmit}
          className="mt-8 sm:mt-10 bg-white/95 dark:bg-[#122119]/95 backdrop-blur-xl p-2.5 sm:p-3 rounded-2xl sm:rounded-3xl shadow-2xl border border-white/40 dark:border-white/15 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-12 gap-2 text-right items-center"
        >
          {/* Category Selector */}
          <div className="sm:col-span-3 flex items-center gap-2 px-3 py-2 border-b sm:border-b-0 sm:border-l border-emerald-900/15 dark:border-white/15">
            <Icon name="grid" className="w-5 h-5 text-emerald-700 dark:text-emerald-400 shrink-0" />
            <select
              value={cat}
              onChange={(e) => setCat(e.target.value)}
              className="w-full bg-transparent border-0 outline-none text-sm font-semibold text-emerald-950 dark:text-white cursor-pointer"
              aria-label="النوع"
            >
              <option value="" className="text-gray-900">كل الأنواع (ضأن وماعز)</option>
              <option value="sheep" className="text-gray-900">الضأن (نعيمي، حري، نجدي، سواكني)</option>
              <option value="goat" className="text-gray-900">الماعز (شامي، حجازي، عارضي)</option>
            </select>
          </div>

          {/* Region Selector */}
          <div className="sm:col-span-3 flex items-center gap-2 px-3 py-2 border-b sm:border-b-0 sm:border-l border-emerald-900/15 dark:border-white/15">
            <Icon name="pin" className="w-5 h-5 text-emerald-700 dark:text-emerald-400 shrink-0" />
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full bg-transparent border-0 outline-none text-sm font-semibold text-emerald-950 dark:text-white cursor-pointer"
              aria-label="المنطقة"
            >
              <option value="" className="text-gray-900">كل المناطق</option>
              {REGIONS.map((r) => (
                <option key={r} value={r} className="text-gray-900">
                  {r}
                </option>
              ))}
            </select>
          </div>

          {/* Search Query Input */}
          <div className="sm:col-span-4 flex items-center gap-2 px-3 py-2">
            <Icon name="search" className="w-5 h-5 text-gray-400 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ابحث بالسلالة أو رقم الإعلان..."
              className="w-full bg-transparent border-0 outline-none text-sm font-medium text-emerald-950 dark:text-white placeholder:text-gray-500"
              aria-label="بحث"
            />
          </div>

          {/* Submit Button */}
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="w-full bg-[#0f4a36] hover:bg-[#146048] text-white font-bold py-3 px-4 rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
            >
              <Icon name="search" className="w-4 h-4" />
              <span>بحث</span>
            </button>
          </div>
        </form>

        {/* Quick Search Tags */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm text-emerald-100">
          <span className="font-semibold text-amber-300">الأكثر بحثاً:</span>
          {['نعيمي', 'حري', 'نجدي', 'سواكني', 'ماعز'].map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => onTagClick(tag)}
              className="px-3 py-1 rounded-full bg-black/35 hover:bg-black/50 backdrop-blur-md text-white border border-white/20 transition-all cursor-pointer font-medium"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <div className="flex items-center justify-center sm:justify-start gap-3 p-3.5 rounded-2xl bg-black/40 backdrop-blur-md border border-white/15 text-right">
            <div className="w-11 h-11 rounded-full bg-emerald-500/20 text-emerald-300 grid place-items-center shrink-0 border border-emerald-400/30">
              <Icon name="shield" className="w-5 h-5" />
            </div>
            <div>
              <b className="block text-white text-sm font-bold leading-tight">مربون موثّقون</b>
              <small className="text-emerald-100/75 text-xs">سجل تجاري وهوية مفحوصة</small>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3 p-3.5 rounded-2xl bg-black/40 backdrop-blur-md border border-white/15 text-right">
            <div className="w-11 h-11 rounded-full bg-amber-500/20 text-amber-300 grid place-items-center shrink-0 border border-amber-400/30">
              <Icon name="check" className="w-5 h-5" />
            </div>
            <div>
              <b className="block text-white text-sm font-bold leading-tight">دفع عند الاستلام</b>
              <small className="text-emerald-100/75 text-xs">عاين وتأكد ثم ادفع بأمان</small>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3 p-3.5 rounded-2xl bg-black/40 backdrop-blur-md border border-white/15 text-right">
            <div className="w-11 h-11 rounded-full bg-sky-500/20 text-sky-300 grid place-items-center shrink-0 border border-sky-400/30">
              <Icon name="truck" className="w-5 h-5" />
            </div>
            <div>
              <b className="block text-white text-sm font-bold leading-tight">خدمات مساندة</b>
              <small className="text-emerald-100/75 text-xs">نقل مرخّص وفحص بيطري</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
