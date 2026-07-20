import Reveal from "./Reveal";

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: "center" | "start";
};

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: Props) {
  const isCenter = align === "center";
  return (
    <div className={isCenter ? "text-center mx-auto max-w-2xl" : "max-w-2xl"}>
      <Reveal>
        <span className={`eyebrow ${isCenter ? "mx-auto" : ""}`}>{eyebrow}</span>
      </Reveal>
      <Reveal delay={80}>
        <h2 className="mt-5 text-3xl md:text-[2.7rem] font-extrabold leading-tight tracking-tight">
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={140}>
          <p
            className="mt-4 text-base md:text-lg leading-loose"
            style={{ color: "var(--fg-muted)" }}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
