import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { ArticleCard } from "@/components/Blog";
import { ARTICLES } from "@/data/blog";

export const metadata: Metadata = {
  title: "بلاگ ماهیر | مقالات رشد کسب‌وکار، برندینگ و فروش",
  description:
    "مقالات آموزشی و کاربردی ماهیر درباره‌ی رشد فروش، جذب مشتری واقعی، برندینگ کسب‌وکارهای کوچک و بازاریابی اینستاگرام.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <main className="pt-28 pb-20 md:pt-32 relative overflow-hidden">
      <div className="absolute inset-0 grid-lines opacity-40" aria-hidden />
      <div
        className="glow-orb anim-pulse"
        style={{
          width: 480,
          height: 480,
          top: -180,
          insetInlineStart: "50%",
          transform: "translateX(-50%)",
          background: "radial-gradient(circle, var(--gold-glow), transparent 70%)",
        }}
        aria-hidden
      />

      <div className="container relative z-10">
        {/* header */}
        <div className="text-center max-w-2xl mx-auto">
          <Reveal dir="scale">
            <span className="eyebrow mx-auto">بلاگ ماهیر</span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-6 text-3xl md:text-5xl font-extrabold leading-tight tracking-tight">
              آموخته‌های ما برای <span className="gold-text">رشد شما</span>
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-5 text-base md:text-lg leading-loose" style={{ color: "var(--fg-muted)" }}>
              تجربه‌ها و نکات کاربردی درباره‌ی رشد فروش، جذب مشتری واقعی، برندینگ و بازاریابی؛
              نوشته‌شده برای صاحبان کسب‌وکارهای کوچک.
            </p>
          </Reveal>
        </div>

        {/* grid */}
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ARTICLES.map((a, i) => (
            <Reveal key={a.slug} delay={(i % 3) * 100} dir="up">
              <ArticleCard article={a} />
            </Reveal>
          ))}
        </div>
      </div>
    </main>
  );
}
