import React from 'react';

interface IconProps {
  name: string;
  className?: string;
  size?: number | string;
}

export const Icon: React.FC<IconProps> = ({ name, className = '', size }) => {
  const style = size ? { width: size, height: size } : undefined;
  return (
    <svg className={`i ${className}`} style={style} aria-hidden="true">
      <use href={`#i-${name}`} />
    </svg>
  );
};

export const SvgSymbols: React.FC = () => {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        {/* Sheep symbol */}
        <symbol id="sheep" viewBox="0 0 220 150">
          <g fill="var(--leg, #3b2f2a)">
            <rect x="90" y="108" width="9" height="36" rx="3" />
            <rect x="108" y="110" width="9" height="34" rx="3" />
            <rect x="146" y="108" width="9" height="36" rx="3" />
            <rect x="164" y="106" width="9" height="36" rx="3" />
          </g>
          <g fill="var(--wool-shade, #c9bfa6)">
            <circle cx="82" cy="78" r="30" />
            <circle cx="108" cy="58" r="34" />
            <circle cx="142" cy="64" r="32" />
            <circle cx="168" cy="86" r="27" />
            <circle cx="150" cy="104" r="30" />
            <circle cx="118" cy="106" r="32" />
            <circle cx="88" cy="104" r="26" />
          </g>
          <g fill="var(--wool, #f3ecdc)">
            <circle cx="82" cy="72" r="30" />
            <circle cx="108" cy="52" r="34" />
            <circle cx="142" cy="58" r="32" />
            <circle cx="168" cy="80" r="27" />
            <circle cx="150" cy="96" r="30" />
            <circle cx="118" cy="98" r="32" />
            <circle cx="88" cy="96" r="26" />
            <circle cx="122" cy="76" r="38" />
            <circle cx="190" cy="84" r="10" />
          </g>
          <g fill="var(--wool-hi, #fffdf6)" opacity=".7">
            <circle cx="100" cy="42" r="14" />
            <circle cx="138" cy="48" r="12" />
            <circle cx="74" cy="62" r="11" />
          </g>
          <path className="horns" d="" fill="none" />
          <ellipse cx="56" cy="70" rx="14" ry="6.5" transform="rotate(24 56 70)" fill="var(--face-dk, #a88861)" />
          <ellipse cx="38" cy="84" rx="19" ry="27" transform="rotate(-10 38 84)" fill="var(--face, #c9a77d)" />
          <circle cx="51" cy="60" r="13" fill="var(--wool, #f3ecdc)" />
          <circle cx="32" cy="76" r="2.6" fill="#17110e" />
          <ellipse cx="26" cy="100" rx="6" ry="4" fill="var(--nose, #5a463a)" />
        </symbol>

        {/* Ram with curved horns */}
        <symbol id="ram" viewBox="0 0 220 150">
          <path d="M58 60C70 28 112 26 108 60C106 78 88 78 90 64" fill="none" stroke="var(--horn, #8a7a5a)" strokeWidth="10" strokeLinecap="round" />
          <path d="M58 60C70 28 112 26 108 60C106 78 88 78 90 64" fill="none" stroke="rgba(255,255,255,.22)" strokeWidth="3" strokeLinecap="round" transform="translate(-1 -2)" />
          <use href="#sheep" />
        </symbol>

        {/* Goat symbol */}
        <symbol id="goat" viewBox="0 0 220 150">
          <g fill="var(--leg, #3b2f2a)">
            <rect x="84" y="96" width="6" height="48" rx="2.5" />
            <rect x="98" y="98" width="6" height="46" rx="2.5" />
            <rect x="148" y="96" width="6" height="48" rx="2.5" />
            <rect x="162" y="94" width="6" height="50" rx="2.5" />
          </g>
          <path d="M176 72l14-22 6 26z" fill="var(--wool, #8a5a3a)" />
          <ellipse cx="126" cy="88" rx="58" ry="26" fill="var(--wool-shade, #6a4128)" />
          <ellipse cx="126" cy="82" rx="58" ry="26" fill="var(--wool, #8a5a3a)" />
          <path d="M70 74L50 34L74 28L96 76Z" fill="var(--wool, #8a5a3a)" />
          <path d="M54 22Q68 -2 92 4" fill="none" stroke="var(--horn, #4a3a2a)" strokeWidth="5" strokeLinecap="round" />
          <ellipse cx="60" cy="36" rx="11" ry="4.5" transform="rotate(-18 60 36)" fill="var(--face-dk, #2f1f14)" />
          <ellipse cx="46" cy="40" rx="14" ry="10" transform="rotate(28 46 40)" fill="var(--face, #6a4128)" />
          <circle cx="48" cy="34" r="2.3" fill="#fff" />
          <circle cx="48" cy="34" r="1.2" fill="#17110e" />
          <path d="M36 48q-3 12 3 15q4-5 2-14z" fill="var(--face-dk, #2f1f14)" />
        </symbol>

        {/* UI Icons */}
        <symbol id="i-search" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></symbol>
        <symbol id="i-heart" viewBox="0 0 24 24"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></symbol>
        <symbol id="i-bell" viewBox="0 0 24 24"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></symbol>
        <symbol id="i-user" viewBox="0 0 24 24"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></symbol>
        <symbol id="i-plus" viewBox="0 0 24 24"><path d="M5 12h14M12 5v14" /></symbol>
        <symbol id="i-shield" viewBox="0 0 24 24"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /><path d="m9 12 2 2 4-4" /></symbol>
        <symbol id="i-check" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5" /></symbol>
        <symbol id="i-pin" viewBox="0 0 24 24"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></symbol>
        <symbol id="i-star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></symbol>
        <symbol id="i-sliders" viewBox="0 0 24 24"><path d="M21 4h-7M10 4H3M21 12h-9M8 12H3M21 20h-5M12 20H3M14 2v4M8 10v4M16 18v4" /></symbol>
        <symbol id="i-down" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6" /></symbol>
        <symbol id="i-left" viewBox="0 0 24 24"><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></symbol>
        <symbol id="i-right" viewBox="0 0 24 24"><path d="m12 5 7 7-7 7" /><path d="M5 12h14" /></symbol>
        <symbol id="i-truck" viewBox="0 0 24 24"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" /><path d="M15 18H9" /><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" /><circle cx="17" cy="18" r="2" /><circle cx="7" cy="18" r="2" /></symbol>
        <symbol id="i-box" viewBox="0 0 24 24"><path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z" /><path d="M12 22V12" /><path d="m3.3 7 8.7 5 8.7-5" /><path d="m7.5 4.27 9 5.15" /></symbol>
        <symbol id="i-steth" viewBox="0 0 24 24"><path d="M11 2v2M5 2v2M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1" /><path d="M8 15a6 6 0 0 0 12 0v-3" /><circle cx="20" cy="10" r="2" /></symbol>
        <symbol id="i-phone" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></symbol>
        <symbol id="i-mail" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></symbol>
        <symbol id="i-grid" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /></symbol>
        <symbol id="i-menu" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16" /></symbol>
        <symbol id="i-x" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12" /></symbol>
        <symbol id="i-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></symbol>
        <symbol id="i-chat" viewBox="0 0 24 24"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /></symbol>
        <symbol id="i-file" viewBox="0 0 24 24"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="m9 15 2 2 4-4" /></symbol>
        <symbol id="i-users" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></symbol>
        <symbol id="i-trend" viewBox="0 0 24 24"><path d="m22 7-8.5 8.5-5-5L2 17" /><path d="M16 7h6v6" /></symbol>
        <symbol id="i-eye" viewBox="0 0 24 24"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></symbol>
        <symbol id="i-weight" viewBox="0 0 24 24"><circle cx="12" cy="5" r="3" /><path d="M6.5 8h11l2.5 13H4Z" /></symbol>
        <symbol id="i-cal" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></symbol>
        <symbol id="i-layers" viewBox="0 0 24 24"><path d="M12 3 3 8l9 5 9-5-9-5Z" /><path d="m3 13 9 5 9-5" /></symbol>
        <symbol id="i-book" viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></symbol>
        <symbol id="i-clip" viewBox="0 0 24 24"><rect x="8" y="2" width="8" height="4" rx="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><path d="m9 14 2 2 4-4" /></symbol>
        <symbol id="i-sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" /></symbol>
        <symbol id="i-moon" viewBox="0 0 24 24"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></symbol>
        <symbol id="i-calc" viewBox="0 0 24 24"><rect x="4" y="2" width="16" height="20" rx="2" /><path d="M8 6h8M16 14v4M16 10h.01M12 10h.01M8 10h.01M12 14h.01M8 14h.01M12 18h.01M8 18h.01" /></symbol>
        <symbol id="i-chart" viewBox="0 0 24 24"><path d="M3 3v18h18" /><path d="M7 16v-5M12 16V8M17 16v-8" /></symbol>
        <symbol id="i-info" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></symbol>
        <symbol id="i-share" viewBox="0 0 24 24"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="m8.59 13.51 6.83 3.98M15.41 6.51l-6.82 3.98" /></symbol>
        <symbol id="i-print" viewBox="0 0 24 24"><path d="M6 9V2h12v7" /><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><rect x="6" y="14" width="12" height="8" /></symbol>
        <symbol id="i-warn" viewBox="0 0 24 24"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" /><path d="M12 9v4M12 17h.01" /></symbol>
        <symbol id="i-send" viewBox="0 0 24 24"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></symbol>
        <symbol id="i-video" viewBox="0 0 24 24"><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" /></symbol>
        <symbol id="i-volume" viewBox="0 0 24 24"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" /></symbol>
        <symbol id="i-volume-x" viewBox="0 0 24 24"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" /></symbol>
        <symbol id="i-badge" viewBox="0 0 24 24"><path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" /></symbol>
      </defs>
    </svg>
  );
};
