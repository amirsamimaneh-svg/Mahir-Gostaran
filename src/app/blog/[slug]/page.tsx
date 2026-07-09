"use client";

import { use, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { posts } from "@/data/posts";

function BlogPostInner({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const searchParams = useSearchParams();
  const [lang, setLang] = useState<"fa" | "en">((searchParams.get("lang") as "fa" | "en") ?? "fa");
  const isRtl = lang === "fa";

  const post = posts.find(p => p.slug === slug);

  if (!post) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg)", color: "var(--fg)" }}>
      <div className="text-center">
        <p className="text-6xl mb-4">404</p>
        <p className="mb-6" style={{ color: "var(--fg2)" }}>مقاله پیدا نشد</p>
        <Link href="/blog" className="px-6 py-3 rounded-xl font-bold text-sm"
          style={{ background: "#5B9CF6", color: "#03080F" }}>بازگشت</Link>
      </div>
    </div>
  );

  return (
    <div dir={isRtl ? "rtl" : "ltr"} style={{ background: "var(--bg)", minHeight: "100vh", color: "var(--fg)" }}>

      <nav className="fixed top-0 inset-x-0 z-50" style={{ background: "var(--nav-bg)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--nav-border)" }}>
        <div className="max-w-3xl mx-auto flex items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-extrabold text-[#5B9CF6] tracking-widest">
            {isRtl ? "ماهیر" : "Mahir"}
          </Link>
          <div className="flex items-center gap-3">
            <button onClick={() => setLang(l => l === "fa" ? "en" : "fa")}
              className="text-xs font-bold px-3 py-2 rounded-lg hover:text-[#5B9CF6] transition-all"
              style={{ background: "var(--surface)", color: "var(--fg2)", border: "1px solid var(--border)" }}>
              {isRtl ? "EN" : "فا"}
            </button>
            <Link href="/blog" className="text-sm px-4 py-2 rounded-xl hover:text-[#5B9CF6] transition-all"
              style={{ color: "var(--fg2)", border: "1px solid var(--border)" }}>
              {isRtl ? "← بلاگ" : "← Blog"}
            </Link>
          </div>
        </div>
      </nav>

      <article className="max-w-3xl mx-auto px-6 pt-20 md:pt-32 pb-24">

        {/* Category */}
        <div className="mb-6">
          <span className="text-xs px-3 py-1.5 rounded-full font-bold"
            style={{ background: "rgba(91,156,246,0.1)", color: "#5B9CF6", border: "1px solid rgba(91,156,246,0.2)" }}>
            {isRtl ? post.category_fa : post.category_en}
          </span>
        </div>

        {/* Title */}
        <div className="flex items-start gap-4 mb-6">
          <span className="text-5xl flex-shrink-0">{post.emoji}</span>
          <h1 className="font-extrabold leading-snug" style={{ fontSize: "clamp(1.6rem,4vw,2.5rem)" }}>
            {isRtl ? post.title_fa : post.title_en}
          </h1>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-4 mb-10 text-xs" style={{ color: "var(--fg3)" }}>
          <span>📅 {post.date}</span>
          <span>⏱ {isRtl ? `${post.readMin} دقیقه` : `${post.readMin} min read`}</span>
        </div>

        <div className="h-px mb-10" style={{ background: "var(--border)" }} />

        {/* Body */}
        <div className="flex flex-col gap-6">
          {(isRtl ? post.body_fa : post.body_en).map((para, i) => (
            <p key={i} className="text-base leading-8" style={{ color: "var(--fg2)" }}>
              {para}
            </p>
          ))}
        </div>

        <div className="h-px my-12" style={{ background: "var(--border)" }} />

        {/* CTA */}
        <div className="rounded-2xl p-8 text-center"
          style={{ background: "rgba(91,156,246,0.07)", border: "1px solid rgba(91,156,246,0.15)" }}>
          <p className="font-extrabold text-lg mb-2" style={{ color: "var(--fg)" }}>
            {isRtl ? "می‌خوای این استراتژی‌ها رو برای کسب‌وکارت اجرا کنی؟" : "Want to apply these strategies to your business?"}
          </p>
          <p className="text-sm mb-6" style={{ color: "var(--fg2)" }}>
            {isRtl ? "یه مشاوره رایگان با تیم ماهیر بگیر" : "Get a free consultation with the Mahir team"}
          </p>
          <Link href="/consult"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm hover:scale-105 transition-all"
            style={{ background: "#5B9CF6", color: "#03080F", boxShadow: "0 0 30px rgba(91,156,246,0.25)" }}>
            {isRtl ? "مشاوره رایگان ←" : "Free Consultation →"}
          </Link>
        </div>

      </article>
    </div>
  );
}

export default function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<div style={{ background: "var(--bg)", minHeight: "100vh" }} />}>
      <BlogPostInner params={params} />
    </Suspense>
  );
}
