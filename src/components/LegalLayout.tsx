import Link from "next/link";
import Reveal from "./Reveal";
import { IconArrow } from "./icons";

export type LegalSection = { heading: string; body: string[] };

export default function LegalLayout({
  title,
  intro,
  updated,
  sections,
}: {
  title: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <main className="pt-28 pb-20 md:pt-32 relative overflow-hidden">
      <div className="absolute inset-0 grid-lines opacity-30" aria-hidden />
      <article className="container relative z-10 max-w-3xl">
        <Reveal>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium mb-8"
            style={{ color: "var(--fg-muted)" }}
          >
            <IconArrow width={16} height={16} />
            بازگشت به صفحه اصلی
          </Link>
        </Reveal>

        <Reveal delay={60}>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">{title}</h1>
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-2 text-xs" style={{ color: "var(--fg-dim)" }}>
            آخرین به‌روزرسانی: {updated}
          </p>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-5 leading-loose" style={{ color: "var(--fg-muted)" }}>
            {intro}
          </p>
        </Reveal>

        <div className="mt-10 space-y-9">
          {sections.map((s, i) => (
            <Reveal key={s.heading} delay={i * 40}>
              <section>
                <h2 className="text-lg md:text-xl font-bold mb-3 flex items-center gap-3">
                  <span
                    className="inline-block w-1.5 h-5 rounded-full"
                    style={{ background: "linear-gradient(var(--gold-bright), var(--gold-deep))" }}
                  />
                  {s.heading}
                </h2>
                <div className="space-y-3 leading-loose" style={{ color: "var(--fg-muted)" }}>
                  {s.body.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
              </section>
            </Reveal>
          ))}
        </div>
      </article>
    </main>
  );
}
