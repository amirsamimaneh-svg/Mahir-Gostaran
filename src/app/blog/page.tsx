"use client";

import Link from "next/link";
import { posts } from "@/data/posts";
import { useLang } from "@/context/LangContext";

export default function BlogPage() {
  const { lang, setLang, isRtl } = useLang();

  return (
    <div dir={isRtl ? "rtl" : "ltr"} style={{ background: "var(--bg)", minHeight: "100vh", color: "var(--fg)" }}>

      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 z-50" style={{ background: "var(--nav-bg)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--nav-border)" }}>
        <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-extrabold text-[#5B9CF6] tracking-widest">
            {isRtl ? "ماهیر" : "Mahir"}
          </Link>
          <div className="flex items-center gap-3">
            <button onClick={() => setLang(lang === "fa" ? "en" : lang === "en" ? "ar" : "fa")}
              className="text-xs font-bold px-3 py-2 rounded-lg transition-all hover:text-[#5B9CF6]"
              style={{ background: "var(--surface)", color: "var(--fg2)", border: "1px solid var(--border)" }}>
              {lang === "fa" ? "EN" : lang === "en" ? "عر" : "فا"}
            </button>
            <Link href="/" className="text-sm font-medium px-4 py-2 rounded-xl hover:text-[#5B9CF6] transition-all"
              style={{ color: "var(--fg2)", border: "1px solid var(--border)" }}>
              {isRtl ? "← خانه" : "← Home"}
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 pt-20 md:pt-32 pb-24">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full px-5 py-2 mb-5"
            style={{ background: "rgba(91,156,246,0.08)", border: "1px solid rgba(91,156,246,0.2)" }}>
            <span className="w-2 h-2 rounded-full bg-[#5B9CF6] animate-pulse" />
            <span className="text-xs font-bold text-[#5B9CF6] tracking-widest">
              {isRtl ? "دانش و تجربه ماهیر" : "Mahir Knowledge Base"}
            </span>
          </div>
          <h1 className="font-extrabold mb-4" style={{ fontSize: "clamp(2rem,5vw,3.5rem)" }}>
            <span style={{ color: "var(--fg)" }}>{isRtl ? "مقالات " : "Our "}</span>
            <span className="text-shimmer">{isRtl ? "تخصصی" : "Blog"}</span>
          </h1>
          <p className="max-w-md mx-auto text-sm leading-relaxed" style={{ color: "var(--fg2)" }}>
            {isRtl
              ? "راهنماهای عملی رشد کسب‌وکار — از استراتژی تا اجرا"
              : "Practical business growth guides — from strategy to execution"}
          </p>
        </div>

        {/* Posts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post, i) => (
            <Link key={post.slug} href={`/blog/${post.slug}?lang=${lang}`}
              className="group rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
              style-hover={{ borderColor: "rgba(91,156,246,0.4)" }}>

              <div className="flex items-start justify-between gap-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: "rgba(91,156,246,0.1)", border: "1px solid rgba(91,156,246,0.15)" }}>
                  {post.emoji}
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full font-bold"
                  style={{ background: "rgba(91,156,246,0.1)", color: "#5B9CF6" }}>
                  {isRtl ? post.category_fa : post.category_en}
                </span>
              </div>

              <div className="flex-1">
                <h2 className="font-extrabold text-base mb-2 leading-snug group-hover:text-[#5B9CF6] transition-colors"
                  style={{ color: "var(--fg)" }}>
                  {isRtl ? post.title_fa : post.title_en}
                </h2>
                <p className="text-sm leading-relaxed" style={{ color: "var(--fg2)" }}>
                  {isRtl ? post.excerpt_fa : post.excerpt_en}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs" style={{ color: "var(--fg3)" }}>
                <span>{post.date}</span>
                <span>{isRtl ? `${post.readMin} دقیقه مطالعه` : `${post.readMin} min read`}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center rounded-2xl p-10"
          style={{ background: "rgba(91,156,246,0.06)", border: "1px solid rgba(91,156,246,0.15)" }}>
          <p className="font-extrabold text-xl mb-3" style={{ color: "var(--fg)" }}>
            {isRtl ? "سوال داری؟ مشاوره رایگان بگیر" : "Have questions? Get a free consultation"}
          </p>
          <p className="text-sm mb-6" style={{ color: "var(--fg2)" }}>
            {isRtl ? "تیم ماهیر کنارته تا یه مسیر واقعی برای رشدت بسازیم" : "The Mahir team is here to build a real growth path with you"}
          </p>
          <Link href="/consult"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm transition-all hover:scale-105"
            style={{ background: "#5B9CF6", color: "#03080F", boxShadow: "0 0 30px rgba(91,156,246,0.25)" }}>
            {isRtl ? "شروع مشاوره ←" : "Start Consultation →"}
          </Link>
        </div>
      </div>
    </div>
  );
}
