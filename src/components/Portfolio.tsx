import Link from "next/link";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import PlaceholderImage from "./PlaceholderImage";
import { IconArrow } from "./icons";
import { CASES } from "@/data/portfolio";

export default function Portfolio() {
  return (
    <section id="portfolio" className="section">
      <div className="container">
        <SectionHeader
          eyebrow="نمونه‌کارها"
          title={
            <>
              پروژه‌های <span className="gold-text">موفق ماهیر</span>
            </>
          }
          subtitle="نتایج واقعی برای کسب‌وکارهایی مثل شما. هر پروژه، یک مسیر رشد از صفر تا صد."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {CASES.map((c, i) => (
            <Reveal key={c.slug} delay={i * 110} dir="up">
              <article className="card h-full flex flex-col !p-5">
                <PlaceholderImage emoji={c.emoji} tint={c.tint} label="نمونه بصری" />

                <div className="mt-5 flex-1 flex flex-col">
                  <span className="text-xs font-semibold" style={{ color: "var(--gold)" }}>
                    {c.category}
                  </span>
                  <h3 className="mt-2 text-lg font-bold leading-snug">{c.name}</h3>
                  <p
                    className="mt-2.5 text-sm leading-loose"
                    style={{ color: "var(--fg-muted)" }}
                  >
                    {c.shortDesc}
                  </p>

                  {/* numeric results */}
                  <div className="mt-5 grid grid-cols-3 gap-2">
                    {c.stats.map((s) => (
                      <div
                        key={s.label}
                        className="rounded-xl px-2 py-3 text-center"
                        style={{ background: "var(--bg)", border: "1px solid var(--border)" }}
                      >
                        <div className="text-base font-extrabold gold-text leading-tight">
                          {s.big}
                        </div>
                        <div
                          className="mt-1 text-[10.5px] leading-tight"
                          style={{ color: "var(--fg-muted)" }}
                        >
                          {s.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={`/portfolio/${c.slug}`}
                    className="mt-5 inline-flex items-center justify-center gap-2 text-sm font-semibold py-3 rounded-xl transition-colors"
                    style={{
                      border: "1px solid var(--border-strong)",
                      color: "var(--gold-bright)",
                      background: "var(--gold-soft)",
                    }}
                  >
                    مشاهده جزئیات
                    <IconArrow width={16} height={16} />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
