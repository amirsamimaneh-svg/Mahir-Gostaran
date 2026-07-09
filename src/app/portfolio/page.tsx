"use client";

import { useState } from "react";
import Link from "next/link";
import { projects } from "@/data/projects";
import { useLang } from "@/context/LangContext";

export default function PortfolioPage() {
  const { lang, setLang, isRtl } = useLang();

  const categories = Array.from(
    new Set(projects.map(p => isRtl ? p.category_fa : p.category_en))
  );
  const [active, setActive] = useState<string | null>(null);

  const filtered = active
    ? projects.filter(p => (isRtl ? p.category_fa : p.category_en) === active)
    : projects;

  return (
    <div dir={isRtl ? "rtl" : "ltr"} lang={lang}
      style={{ background: "var(--bg)", minHeight: "100vh" }}
      className="[--bg:#05050f] [--fg:#f0f0f5] [--fg2:rgba(240,240,245,0.5)] [--fg3:rgba(240,240,245,0.35)] [--card:rgba(255,255,255,0.04)] [--border:rgba(255,255,255,0.08)]">

      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 z-50"
        style={{ background: "rgba(5,5,15,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-extrabold text-[#2563EB] tracking-widest">
            {isRtl ? "ماهیر" : "Mahir"}
          </Link>
          <div className="flex items-center gap-3">
            <button onClick={() => setLang(lang === "fa" ? "en" : lang === "en" ? "ar" : "fa")}
              className="text-xs font-bold px-3 py-2 rounded-lg transition-all hover:text-[#2563EB]"
              style={{ background: "rgba(255,255,255,0.06)", color: "rgba(240,240,245,0.5)" }}>
              {lang === "fa" ? "EN" : lang === "en" ? "عر" : "فا"}
            </button>
            <Link href="/consult"
              className="text-sm font-bold px-5 py-2 rounded-xl transition-all hover:scale-105"
              style={{ background: "#2563EB", color: "#111" }}>
              {isRtl ? "مشاوره رایگان" : "Free Consultation"}
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 pt-20 md:pt-32 pb-20">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5"
            style={{ background: "rgba(79,110,255,0.08)", border: "1px solid rgba(79,110,255,0.2)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-pulse" />
            <span className="text-xs text-[#3B82F6] tracking-widest">
              {isRtl ? "نمونه‌کارهای ماهیر" : "Mahir Portfolio"}
            </span>
          </div>
          <h1 className="font-extrabold mb-4" style={{ fontSize: "clamp(2rem,5vw,3.5rem)", color: "#f0f0f5" }}>
            {isRtl ? "پروژه‌هایی که " : "Projects That "}
            <span style={{ background: "linear-gradient(135deg,#2563EB,#3D5AE8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              {isRtl ? "نتیجه می‌دهند" : "Deliver Results"}
            </span>
          </h1>
          <p className="text-sm max-w-md mx-auto" style={{ color: "rgba(240,240,245,0.5)" }}>
            {isRtl
              ? "نمونه‌ای از پروژه‌های موفقی که با مشتریان ماهیر اجرا کرده‌ایم"
              : "A selection of successful projects delivered with Mahir clients"}
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          <button
            onClick={() => setActive(null)}
            className="px-4 py-1.5 rounded-full text-xs font-bold transition-all"
            style={{
              background: !active ? "#2563EB" : "rgba(255,255,255,0.06)",
              color: !active ? "#111" : "rgba(240,240,245,0.5)",
              border: !active ? "none" : "1px solid rgba(255,255,255,0.1)",
            }}>
            {isRtl ? "همه" : "All"}
          </button>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActive(cat)}
              className="px-4 py-1.5 rounded-full text-xs font-bold transition-all"
              style={{
                background: active === cat ? "#2563EB" : "rgba(255,255,255,0.06)",
                color: active === cat ? "#111" : "rgba(240,240,245,0.5)",
                border: active === cat ? "none" : "1px solid rgba(255,255,255,0.1)",
              }}>
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(p => (
            <Link key={p.slug} href={`/portfolio/${p.slug}?lang=${lang}`}
              className="group relative rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>

              {/* color strip */}
              <div className="h-1.5 w-full" style={{ background: p.color }} />

              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl">{p.emoji}</span>
                  <span className="text-xs px-2.5 py-1 rounded-full font-medium"
                    style={{ background: `${p.color}18`, color: p.color, border: `1px solid ${p.color}30` }}>
                    {isRtl ? p.category_fa : p.category_en}
                  </span>
                </div>

                <h3 className="font-bold text-lg mb-2" style={{ color: "#f0f0f5" }}>
                  {isRtl ? p.title_fa : p.title_en}
                </h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(240,240,245,0.5)" }}>
                  {isRtl ? p.desc_fa : p.desc_en}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {p.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded-md"
                      style={{ background: "rgba(255,255,255,0.06)", color: "rgba(240,240,245,0.4)" }}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                  <span className="text-xs font-bold" style={{ color: p.color }}>
                    ✦ {isRtl ? p.result_fa : p.result_en}
                  </span>
                  <span className="text-xs transition-all group-hover:translate-x-1"
                    style={{ color: "rgba(240,240,245,0.3)" }}>
                    {isRtl ? "←" : "→"}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-sm mb-4" style={{ color: "rgba(240,240,245,0.4)" }}>
            {isRtl ? "می‌خواهید پروژه‌ی بعدی از شما باشد؟" : "Want your project to be next?"}
          </p>
          <Link href="/consult"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm transition-all hover:scale-105"
            style={{ background: "#2563EB", color: "#111", boxShadow: "0 0 40px rgba(79,110,255,0.3)" }}>
            {isRtl ? "مشاوره رایگان ←" : "Start Free Consultation →"}
          </Link>
        </div>

      </div>
    </div>
  );
}
