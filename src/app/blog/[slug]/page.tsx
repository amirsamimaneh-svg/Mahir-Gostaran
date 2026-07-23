import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import PlaceholderImage from "@/components/PlaceholderImage";
import { IconArrow, IconClock2 } from "@/components/icons";
import { ARTICLES, getArticle } from "@/data/blog";

const SITE_URL = "https://mahir.ir";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return { title: "مقاله پیدا نشد | ماهیر" };
  return {
    title: `${a.title} | بلاگ ماهیر`,
    description: a.excerpt,
    alternates: { canonical: `/blog/${a.slug}` },
    openGraph: {
      title: a.title,
      description: a.excerpt,
      url: `${SITE_URL}/blog/${a.slug}`,
      siteName: "ماهیر",
      locale: "fa_IR",
      type: "article",
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: a.title,
    description: a.excerpt,
    articleSection: a.category,
    inLanguage: "fa-IR",
    url: `${SITE_URL}/blog/${a.slug}`,
    publisher: { "@type": "Organization", name: "ماهیر" },
  };

  return (
    <main className="pt-28 pb-20 md:pt-32 relative overflow-hidden">
      <div className="absolute inset-0 grid-lines opacity-40" aria-hidden />
      <div
        className="glow-orb anim-pulse"
        style={{
          width: 440,
          height: 440,
          top: -180,
          insetInlineEnd: -120,
          background: `radial-gradient(circle, ${a.tint}33, transparent 70%)`,
        }}
        aria-hidden
      />

      <article className="container relative z-10 max-w-3xl">
        <Reveal>
          <Link
            href="/#blog"
            className="inline-flex items-center gap-2 text-sm font-medium mb-8"
            style={{ color: "var(--fg-muted)" }}
          >
            <IconArrow width={16} height={16} />
            بازگشت به مقالات
          </Link>
        </Reveal>

        <Reveal delay={60}>
          <span className="eyebrow">{a.category}</span>
        </Reveal>
        <Reveal delay={120}>
          <h1 className="mt-5 text-3xl md:text-5xl font-extrabold leading-tight tracking-tight">
            {a.title}
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <div className="mt-4 flex items-center gap-3 text-sm" style={{ color: "var(--fg-muted)" }}>
            <span>{a.date}</span>
            <span style={{ color: "var(--fg-dim)" }}>•</span>
            <span className="inline-flex items-center gap-1.5">
              <IconClock2 width={15} height={15} />
              {a.readTime}
            </span>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-8">
            <PlaceholderImage emoji={a.emoji} tint={a.tint} label="تصویر مقاله" ratio="16 / 8" />
          </div>
        </Reveal>

        <Reveal delay={80}>
          <p className="mt-8 text-lg leading-loose" style={{ color: "var(--fg)" }}>
            {a.intro}
          </p>
        </Reveal>

        {a.sections.map((s, i) => (
          <Reveal key={i}>
            <section className="mt-10">
              <h2 className="text-xl md:text-2xl font-extrabold mb-4 flex items-center gap-3">
                <span
                  className="inline-block w-1.5 h-6 rounded-full"
                  style={{ background: "linear-gradient(var(--gold-bright), var(--gold-deep))" }}
                />
                {s.heading}
              </h2>
              <div className="space-y-4 leading-loose" style={{ color: "var(--fg-muted)" }}>
                {s.body.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>
            </section>
          </Reveal>
        ))}

        <Reveal>
          <div
            className="mt-10 rounded-2xl p-6 leading-loose text-lg"
            style={{ background: "var(--bg-2)", border: "1px solid var(--border-strong)", color: "var(--fg)" }}
          >
            <span className="font-bold gold-text">جمع‌بندی: </span>
            {a.takeaway}
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal>
          <div
            className="mt-12 rounded-3xl p-8 md:p-10 text-center relative overflow-hidden"
            style={{
              background: "linear-gradient(160deg, rgba(214,178,94,0.12), var(--surface))",
              border: "1px solid var(--border-strong)",
            }}
          >
            <h2 className="text-2xl md:text-3xl font-extrabold leading-tight">
              آماده‌اید همین مسیر را برای{" "}
              <span className="gold-text">کسب‌وکار خودتان</span> اجرا کنید؟
            </h2>
            <p className="mt-3 leading-loose" style={{ color: "var(--fg-muted)" }}>
              ماهیر این کار را از صفر تا صد برای شما انجام می‌دهد. اولین قدم، یک بررسی رایگان است.
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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
