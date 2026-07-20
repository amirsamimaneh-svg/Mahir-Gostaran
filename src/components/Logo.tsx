type LogoProps = {
  className?: string;
  withWordmark?: boolean;
};

/**
 * ماهیر wordmark: a stylised gold "م"-inspired mark + Persian wordmark.
 */
export default function Logo({ className = "", withWordmark = true }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width="34"
        height="34"
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <defs>
          <linearGradient id="mahirGold" x1="0" y1="0" x2="40" y2="40">
            <stop offset="0" stopColor="#A9812F" />
            <stop offset="0.55" stopColor="#D6B25E" />
            <stop offset="1" stopColor="#F2D68C" />
          </linearGradient>
        </defs>
        <rect
          x="1.5"
          y="1.5"
          width="37"
          height="37"
          rx="11"
          stroke="url(#mahirGold)"
          strokeWidth="1.6"
        />
        <path
          d="M11 27V16.5c0-2 1.4-3.5 3.3-3.5 1.7 0 3 1.2 3.2 3l.8 6.2.8-6.2c.2-1.8 1.5-3 3.2-3 1.9 0 3.4 1.5 3.4 3.5V27"
          stroke="url(#mahirGold)"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="20" cy="30.5" r="1.5" fill="url(#mahirGold)" />
      </svg>
      {withWordmark && (
        <span className="text-[1.35rem] font-extrabold tracking-tight gold-text leading-none">
          ماهیر
        </span>
      )}
    </span>
  );
}
