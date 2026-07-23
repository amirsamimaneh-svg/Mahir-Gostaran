type Props = {
  emoji: string;
  label?: string;
  tint?: string;
  className?: string;
  ratio?: string;
};

/**
 * Branded placeholder for not-yet-produced imagery.
 * Keeps the premium dark/gold look while real photos are pending.
 */
export default function PlaceholderImage({
  emoji,
  label = "تصویر نمونه",
  tint = "var(--gold)",
  className = "",
  ratio = "16 / 10",
}: Props) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`relative overflow-hidden rounded-2xl ${className}`}
      style={{
        aspectRatio: ratio,
        background: `radial-gradient(120% 100% at 100% 0%, ${tint}22, transparent 55%), linear-gradient(160deg, var(--surface-2), var(--bg))`,
        border: "1px solid var(--border)",
      }}
    >
      <div className="absolute inset-0 grid-lines opacity-40" aria-hidden />
      <span
        className="absolute -bottom-4 -start-3 text-[7rem] leading-none select-none opacity-[0.12]"
        aria-hidden
      >
        {emoji}
      </span>
      <span
        className="absolute top-3 end-3 text-[11px] font-medium px-2.5 py-1 rounded-full"
        style={{
          background: "rgba(7,7,10,0.55)",
          border: "1px solid var(--border)",
          color: "var(--fg-muted)",
        }}
      >
        {label}
      </span>
    </div>
  );
}
