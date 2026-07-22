import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import PlaceholderImage from "@/components/PlaceholderImage";
import CopyButton from "@/components/CopyButton";
import { IconArrow, IconCheck } from "@/components/icons";
import { CASES, getCase } from "@/data/portfolio";

export function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) return { title: "نمونه‌کار پیدا نشد | ماهیر" };
  return {
    title: `${c.name} | نمونه‌کار ماهیر`,
    description: c.shortDesc,
    alternates: { canonical: `/portfolio/${c.slug}` },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) notFound();

  return (
    <main className="pt-28 pb-20 md:pt-32 relative overflow-hidden">
      <div className="absolute inset-0 grid-lines opacity-40" aria-hidden />
      <div
        className="glow-orb anim-pulse"
        style={{
          width: 460,
          height: 460,
          top: -180,
          insetInlineEnd: -120,
          background: `radial-gradient(circle, ${c.tint}33, transparent 70%)`,
        }}
        aria-hidden
      />

      <article className="container relative z-10 max-w-4xl">
        <Reveal>
          <Link
            href="/#portfolio"
            className="inline-flex items-center gap-2 text-sm font-medium mb-8"
            style={{ color: "var(--fg-muted)" }}
          >
            <IconArrow width={16} height={16} />
            بازگشت به نمونه‌کارها
          </Link>
        </Reveal>

        {/* header */}
        <Reveal delay={60}>
          <span className="eyebrow">{c.category}</span>
        </Reveal>
        <Reveal delay={120}>
          <h1 className="mt-5 text-3xl md:text-5xl font-extrabold leading-tight tracking-tight">
            {c.name}
          </h1>
        </Reveal>
        <Reveal delay={180}>
          <p className="mt-3 text-lg md:text-xl gold-text font-bold">{c.tagline}</p>
        </Reveal>
        <Reveal delay={220}>
          <p className="mt-4 text-base md:text-lg leading-loose" style={{ color: "var(--fg-muted)" }}>
            {c.shortDesc}
          </p>
        </Reveal>

        {/* big stats */}
        <Reveal delay={260} dir="scale">
          <div className="mt-9 grid sm:grid-cols-3 gap-4">
            {c.stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl p-5 text-center"
                style={{ background: "var(--surface)", border: "1px solid var(--border-strong)" }}
              >
                <div className="text-2xl md:text-3xl font-extrabold gold-text leading-tight">
                  {s.big}
                </div>
                <div className="mt-1.5 text-sm font-medium" style={{ color: "var(--fg)" }}>
                  {s.label}
                </div>
                {s.note && (
                  <div className="mt-0.5 text-xs" style={{ color: "var(--fg-dim)" }}>
                    {s.note}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Reveal>

        {/* main visual */}
        <Reveal delay={120}>
          <div className="mt-10 flex items-center gap-3 text-sm" style={{ color: "var(--fg-dim)" }}>
            <span
              className="px-3 py-1 rounded-full"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            >
              مدت پروژه: {c.duration}
            </span>
          </div>
          <div className="mt-4">
            <PlaceholderImage emoji={c.emoji} tint={c.tint} label="تصویر شاخص پروژه" ratio="16 / 8" />
          </div>
        </Reveal>

        {/* challenge */}
        <Section title="چالش">
          <p className="leading-loose" style={{ color: "var(--fg-muted)" }}>
            {c.challenge}
          </p>
        </Section>

        {/* approach */}
        <Section title="راهکار ماهیر">
          <ul className="space-y-3">
            {c.approach.map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span
                  className="mt-1 w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold"
                  style={{
                    background: "var(--gold-soft)",
                    border: "1px solid var(--border-strong)",
                    color: "var(--gold-bright)",
                  }}
                >
                  <IconCheck width={13} height={13} />
                </span>
                <span className="leading-loose" style={{ color: "var(--fg)" }}>
                  {step}
                </span>
              </li>
            ))}
          </ul>
        </Section>

        {/* outcome */}
        <Section title="نتیجه">
          <p
            className="leading-loose text-lg rounded-2xl p-6"
            style={{
              background: "var(--bg-2)",
              border: "1px solid var(--border)",
              color: "var(--fg)",
            }}
          >
            {c.outcome}
          </p>
        </Section>

        {/* image placeholders + AI prompts */}
        <Section title="تصاویر پروژه">
          <p className="text-sm leading-loose mb-6" style={{ color: "var(--fg-dim)" }}>
            تصاویر واقعی این پروژه به‌زودی جایگزین می‌شوند. برای هر تصویر، توضیح دقیق و یک
            پرامپت آماده تولید با هوش مصنوعی قرار داده‌ایم (پرامپت‌ها به انگلیسی هستند تا بهترین
            کیفیت را از مدل‌های تصویرساز بگیرید).
          </p>
          <div className="space-y-5">
            {c.images.map((img, i) => (
              <Reveal key={i} delay={i * 80}>
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{ border: "1px solid var(--border)" }}
                >
                  <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
                    <PlaceholderImage
                      emoji={c.emoji}
                      tint={c.tint}
                      label={`تصویر ${i + 1}`}
                      ratio="4 / 3"
                      className="!rounded-none border-0"
                    />
                    <div className="p-5" style={{ background: "var(--surface)" }}>
                      <h4 className="font-bold text-base">{img.title}</h4>
                      <p
                        className="mt-2 text-sm leading-loose"
                        style={{ color: "var(--fg-muted)" }}
                      >
                        {img.description}
                      </p>
                      <div className="mt-4">
                        <div className="flex items-center justify-between gap-3 mb-2">
                          <span
                            className="text-xs font-semibold"
                            style={{ color: "var(--gold)" }}
                          >
                            پرامپت تولید عکس
                          </span>
                          <CopyButton text={img.prompt} />
                        </div>
                        <pre
                          className="text-xs leading-relaxed rounded-xl p-3 overflow-x-auto whitespace-pre-wrap"
                          dir="ltr"
                          style={{
                            background: "var(--bg)",
                            border: "1px solid var(--border)",
                            color: "var(--fg-muted)",
                          }}
                        >
                          {img.prompt}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* CTA */}
        <Reveal>
          <div
            className="mt-14 rounded-3xl p-8 md:p-10 text-center relative overflow-hidden"
            style={{
              background: "linear-gradient(160deg, var(--surface), var(--bg-2))",
              border: "1px solid var(--border-strong)",
            }}
          >
            <h3 className="text-2xl md:text-3xl font-extrabold leading-tight">
              می‌خواهید کسب‌وکار شما{" "}
              <span className="gold-text">پروژه بعدی ما</span> باشد؟
            </h3>
            <p className="mt-3 text-base leading-loose" style={{ color: "var(--fg-muted)" }}>
              همین حالا پروژه‌تان را ثبت کنید تا مسیر رشد شما را رایگان بررسی کنیم.
            </p>
            <div className="mt-7">
              <Link href="/submit" className="btn btn-gold">
                ثبت پروژه و دریافت مشاوره
                <IconArrow width={18} height={18} />
              </Link>
            </div>
          </div>
        </Reveal>
      </article>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Reveal>
      <section className="mt-12">
        <h2 className="text-xl md:text-2xl font-extrabold mb-4 flex items-center gap-3">
          <span
            className="inline-block w-1.5 h-6 rounded-full"
            style={{ background: "linear-gradient(var(--gold-bright), var(--gold-deep))" }}
          />
          {title}
        </h2>
        {children}
      </section>
    </Reveal>
  );
}
