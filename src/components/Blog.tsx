import Link from "next/link";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import PlaceholderImage from "./PlaceholderImage";
import { IconArrow, IconClock2 } from "./icons";
import { ARTICLES } from "@/data/blog";

export default function Blog() {
  return (
    <section id="blog" className="section" style={{ background: "var(--bg-2)" }}>
      <div className="container">
        <SectionHeader
          eyebrow="مقالات"
          title={
            <>
              از <span className="gold-text">بلاگ ماهیر</span>
            </>
          }
          subtitle="تجربه‌ها و نکات کاربردی درباره‌ی رشد کسب‌وکار، جذب مشتری، برندینگ و فروش."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {ARTICLES.map((a, i) => (
            <Reveal key={a.slug} delay={i * 110} dir="up">
              <Link
                href={`/blog/${a.slug}`}
                className="card h-full flex flex-col !p-5 group"
              >
                <PlaceholderImage emoji={a.emoji} tint={a.tint} label="مقاله" ratio="16 / 9" />

                <div className="mt-5 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 text-xs" style={{ color: "var(--gold)" }}>
                    <span className="font-semibold">{a.category}</span>
                    <span style={{ color: "var(--fg-dim)" }}>•</span>
                    <span className="inline-flex items-center gap-1" style={{ color: "var(--fg-muted)" }}>
                      <IconClock2 width={13} height={13} />
                      {a.readTime}
                    </span>
                  </div>

                  <h3 className="mt-2.5 text-lg font-bold leading-snug">{a.title}</h3>
                  <p className="mt-2.5 text-sm leading-loose flex-1" style={{ color: "var(--fg-muted)" }}>
                    {a.excerpt}
                  </p>

                  <span
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold transition-colors"
                    style={{ color: "var(--gold-bright)" }}
                  >
                    ادامه‌ی مطلب
                    <IconArrow width={16} height={16} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
