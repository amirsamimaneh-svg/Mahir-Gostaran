import type { SVGProps } from "react";

/**
 * Minimal, consistent line-icon set (24×24, currentColor stroke).
 * Kept inline & dependency-free.
 */
type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const IconSearch = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.2-3.2" />
  </svg>
);

export const IconBrand = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 2 4 6v6c0 5 3.5 8 8 10 4.5-2 8-5 8-10V6l-8-4Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const IconVideo = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="2.5" y="6" width="13" height="12" rx="2.5" />
    <path d="m15.5 10 6-3v10l-6-3" />
  </svg>
);

export const IconUsers = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="9" cy="8" r="3.2" />
    <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
    <path d="M16 5.2a3.2 3.2 0 0 1 0 6" />
    <path d="M17.5 13.5A5.5 5.5 0 0 1 20.5 18.5" />
  </svg>
);

export const IconChart = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 4v15a1 1 0 0 0 1 1h15" />
    <path d="m7 15 3.5-4 3 2.5L20 7" />
  </svg>
);

export const IconTarget = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
  </svg>
);

export const IconSpark = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
    <path d="M12 8.5 13.4 12 12 15.5 10.6 12 12 8.5Z" fill="currentColor" stroke="none" />
  </svg>
);

export const IconRocket = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2" />
    <path d="M9 12c-1 0-3 .5-4 1.5C7 15 9 17 10.5 19c1-1 1.5-3 1.5-4" />
    <path d="M14 4c3-1 6 0 6 0s1 3 0 6c-1.2 3.2-4 6-9 8-2-2-4-4-6-6 2-5 4.8-7.8 8-9Z" />
    <circle cx="15" cy="9" r="1.6" />
  </svg>
);

export const IconShield = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 2 4 6v6c0 5 3.5 8 8 10 4.5-2 8-5 8-10V6l-8-4Z" />
  </svg>
);

export const IconClock = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);

export const IconHandshake = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="m11 17 2 2a1.4 1.4 0 0 0 2-2" />
    <path d="m13 15 2.5 2.5a1.4 1.4 0 0 0 2-2L13 11l-1.5.5a2 2 0 0 1-2.4-3l2-2.2A3 3 0 0 1 15.4 4H18l3.5 3.5" />
    <path d="M2.5 7.5 6 4h2.5" />
    <path d="M2.5 12.5 8 18" />
  </svg>
);

export const IconArrow = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M19 12H5" />
    <path d="m12 5-7 7 7 7" />
  </svg>
);

export const IconArrowDown = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 5v14" />
    <path d="m19 12-7 7-7-7" />
  </svg>
);

export const IconCheck = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="m5 13 4 4L19 7" />
  </svg>
);

export const IconMenu = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const IconClose = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const IconWhatsApp = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M3 21l1.6-5A8.5 8.5 0 1 1 8 19.4L3 21Z" />
    <path d="M8.5 8.5c-.3.7 0 1.7.7 2.7s1.6 1.8 2.6 2.2c.7.3 1.3.2 1.8-.3l.6-.6-1.7-1.1-.7.5c-.6-.3-1.2-.9-1.5-1.5l.5-.7-1.1-1.7-.5.5Z" fill="currentColor" stroke="none" />
  </svg>
);

export const IconInstagram = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="3.8" />
    <circle cx="16.8" cy="7.2" r="1" fill="currentColor" stroke="none" />
  </svg>
);

export const IconMail = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="m4 7 8 5 8-5" />
  </svg>
);
