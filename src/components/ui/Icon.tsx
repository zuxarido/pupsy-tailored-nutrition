import React from "react";

const icons: Record<string, React.ReactNode> = {
  // Trust bar / general
  vet: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a4 4 0 0 0-4 4v2h8V6a4 4 0 0 0-4-4z" />
      <rect x="3" y="8" width="18" height="14" rx="2" />
      <path d="M12 12v4m-2-2h4" />
    </svg>
  ),
  sunrise: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v4m-7.07.93 2.83 2.83M2 16h4m12 0h4m-4.93-9.07 2.83-2.83" />
      <path d="M17 16a5 5 0 1 0-10 0" />
      <line x1="2" y1="20" x2="22" y2="20" />
    </svg>
  ),
  "no-preservatives": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
    </svg>
  ),
  scale: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v18" />
      <path d="M5 7l7-4 7 4" />
      <path d="M5 7l-2 8h6L5 7z" />
      <path d="M19 7l-2 8h6l-4-8z" />
    </svg>
  ),

  // How it works steps
  clipboard: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="4" width="12" height="17" rx="2" />
      <path d="M9 2h6v3H9z" />
      <line x1="10" y1="10" x2="14" y2="10" />
      <line x1="10" y1="14" x2="14" y2="14" />
    </svg>
  ),
  cook: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 6c-3 0-8 1-8 5v1h16v-1c0-4-5-5-8-5z" />
      <rect x="4" y="12" width="16" height="4" rx="1" />
      <path d="M8 16v3m8-3v3" />
      <path d="M9 6V4m3-1v3m3-2v2" />
    </svg>
  ),
  door: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="14" height="20" rx="2" />
      <circle cx="15" cy="12" r="1" fill="currentColor" />
      <path d="M2 22h20" />
    </svg>
  ),
  plan: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
      <polyline points="14,2 14,8 20,8" />
      <line x1="9" y1="13" x2="15" y2="13" />
      <line x1="9" y1="17" x2="13" y2="17" />
    </svg>
  ),

  // Recipes / food
  chicken: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 4c2.5 0 5 2 5 5s-2 4-3.5 5L13 17H8l-2 4H4l1-4c-1-1-2-3-2-5s2.5-5 5-5" />
      <circle cx="14" cy="8" r="1" fill="currentColor" />
    </svg>
  ),
  lamb: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="10" r="6" />
      <circle cx="9" cy="8" r="1.5" />
      <circle cx="15" cy="8" r="1.5" />
      <circle cx="7" cy="11" r="1.5" />
      <circle cx="17" cy="11" r="1.5" />
      <path d="M9 16v4m6-4v4" />
      <path d="M10 6c-1-2 0-4 2-4s3 2 2 4" />
    </svg>
  ),
  egg: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3C8 3 5 9 5 14a7 7 0 0 0 14 0c0-5-3-11-7-11z" />
    </svg>
  ),
  meat: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 15c-2-2-3-5-1-8s6-4 9-3 5 5 4 8-3 5-5 5-5 0-7-2z" />
      <path d="M15 15l4 5" />
      <circle cx="10" cy="10" r="1" fill="currentColor" />
    </svg>
  ),

  // Ingredients
  carrot: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2c-1 0-2 1-2 2l-4 14c0 2 3 4 6 4s6-2 6-4L14 4c0-1-1-2-2-2z" />
      <path d="M10 8l4 1m-5 3l6 1m-7 3l6 1" />
    </svg>
  ),
  leaf: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20c4 0 8.5-3 10-10" />
      <path d="M2 2s7 3 11 3c4 0 8 2 8 6" />
    </svg>
  ),
  spice: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 21h10l1-10H6l1 10z" />
      <path d="M12 2v5m-3-3l3 3 3-3" />
      <line x1="6" y1="11" x2="18" y2="11" />
    </svg>
  ),
  grain: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22V12" />
      <path d="M12 12C12 8 9 5 5 3c0 5 3 8 7 9" />
      <path d="M12 12c0-4 3-7 7-9-0 5-3 8-7 9" />
      <path d="M12 16c0-3 2-5 5-6 0 3-2 5-5 6" />
      <path d="M12 16c0-3-2-5-5-6 0 3 2 5 5 6" />
    </svg>
  ),
  bean: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3C7 3 4 7 4 12s3 9 8 9 8-4 8-9S17 3 12 3z" />
      <path d="M12 3c-2 3-2 6 0 9s2 6 0 9" />
    </svg>
  ),

  // Quiz — age/body
  puppy: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="10" r="6" />
      <circle cx="10" cy="9" r="0.75" fill="currentColor" />
      <circle cx="14" cy="9" r="0.75" fill="currentColor" />
      <path d="M10.5 12a1.5 1.5 0 0 0 3 0" />
      <path d="M6 6l-2-3m14-1l-2 3" />
      <path d="M9 16v4m6-4v4" />
    </svg>
  ),
  dog: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 5.172A4 4 0 0 1 14 2l1 3h2a3 3 0 0 1 3 3v3l-2 1v7a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-7L4 11V8a3 3 0 0 1 3-3h2l1-2z" />
      <circle cx="10" cy="10" r="0.75" fill="currentColor" />
      <circle cx="14" cy="10" r="0.75" fill="currentColor" />
    </svg>
  ),
  paw: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="8" cy="7" rx="2" ry="2.5" />
      <ellipse cx="16" cy="7" rx="2" ry="2.5" />
      <ellipse cx="5" cy="12" rx="1.8" ry="2.2" />
      <ellipse cx="19" cy="12" rx="1.8" ry="2.2" />
      <path d="M8 17c0-2 2-4 4-4s4 2 4 4-2 4-4 4-4-2-4-4z" />
    </svg>
  ),

  // Quiz — sex
  male: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="14" r="6" />
      <path d="M21 3l-6.5 6.5M21 3h-5m5 0v5" />
    </svg>
  ),
  female: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="9" r="6" />
      <path d="M12 15v7m-3-3h6" />
    </svg>
  ),

  // Quiz — activity
  couch: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4" />
      <path d="M2 12h2v6h16v-6h2v8H2v-8z" />
      <path d="M6 20v2m12-2v2" />
    </svg>
  ),
  walk: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="4" r="2" />
      <path d="M14 8l2 4-3 2 1 4 2 4" />
      <path d="M10 8L8 12l3 2-1 4-2 4" />
    </svg>
  ),
  run: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="14" cy="4" r="2" />
      <path d="M4 17l3-3 2 2 4-4 2 1 4-5" />
      <path d="M15 13l3 5m-8-5l-3 5" />
    </svg>
  ),

  // Food types
  kibble: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="6" width="16" height="14" rx="2" />
      <path d="M4 10h16" />
      <path d="M12 2v4" />
      <circle cx="9" cy="15" r="1" fill="currentColor" />
      <circle cx="15" cy="15" r="1" fill="currentColor" />
      <circle cx="12" cy="13" r="1" fill="currentColor" />
    </svg>
  ),
  "wet-food": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12a7 7 0 0 0 14 0" />
      <path d="M3 12h18" />
      <path d="M8 8c0-2 1-4 4-4s4 2 4 4" />
    </svg>
  ),
  "home-cook": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="14" r="7" />
      <path d="M12 7V3" />
      <path d="M8 14l2 2 4-4" />
    </svg>
  ),
  "raw-food": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 15c-2-2-3-5-1-8s6-4 9-3 5 5 4 8-3 5-5 5-5 0-7-2z" />
      <path d="M15 15l4 5" />
    </svg>
  ),
  mix: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 16a8 8 0 0 1 16 0" />
      <line x1="4" y1="16" x2="20" y2="16" />
      <path d="M8 16v5m8-5v5" />
      <path d="M12 4v4m-3 0h6" />
    </svg>
  ),
  shrug: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      <path d="M2 12l2-2 2 2m14-2l2-2 2 2" />
    </svg>
  ),

  // Values / about
  microscope: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2l-4 8 3 2-5 8" />
      <circle cx="12" cy="6" r="2" />
      <path d="M6 22h12" />
      <path d="M12 18v4" />
    </svg>
  ),
  transparency: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3v18" />
      <path d="M12 3a9 9 0 0 1 0 18" fill="currentColor" fillOpacity="0.1" />
    </svg>
  ),
  handshake: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 11l-3-3-5 3-3-2-5 5" />
      <path d="M4 14l5 5 3-2 5 3 3-4" />
    </svg>
  ),

  // Misc
  envelope: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M2 4l10 8 10-8" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20,6 9,17 4,12" />
    </svg>
  ),
  lock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
};

interface IconProps {
  name: string;
  size?: number;
  className?: string;
}

export function Icon({ name, size = 20, className = "" }: IconProps) {
  const icon = icons[name];
  if (!icon) return null;

  return (
    <span
      className={`inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {icon}
    </span>
  );
}
