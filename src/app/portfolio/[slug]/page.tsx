"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { projects } from "@/data/projects";

export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const searchParams = useSearchParams();
  const initLang = (searchParams.get("lang") as "fa" | "en") ?? "fa";
  const [lang, setLang] = useState<"fa" | "en">(initLang);

  const project = projects.find(p => p.slug === slug);
  const isRtl = lang === "fa";

  useEffect(() => {
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
  }, [isRtl]);

  if (!project) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#05050f", color: "#f0f0f5" }}>
      <div className="text-center">
        <p className="text-6xl mb-4">404</p>
        <p className="mb-6 text-lg" style={{ color: "rgba(240,240,245,0.5)" }}>پروژه پیدا نشد</p>
        <Link href="/portfolio" className="px-6 py-3 rounded-xl font-bold text-sm" style={{ background: "#fbbf24", color: "#111" }}>
          بازگشت
        </Link>
      </div>
    </div>
  );

  return (
    <div dir={isRtl ? "rtl" : "ltr"} lang={lang}
      style={{ background: "#05050f", minHeight: "100vh", color: "#f0f0f5" }}>

      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 z-50"
        style={{ background: "rgba(5,5,15,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-extrabold text-amber-400 tracking-widest">
            {isRtl ? "ماهیر" : "Mahir"}
          </Link>
          <div className="flex items-center gap-3">
            <button onClick={() => setLang(l => l === "fa" ? "en" : "fa")}
              className="text-xs font-bold px-3 py-2 rounded-lg transition-all hover:text-amber-400"
              style={{ background: "rgba(255,255,255,0.06)", color: "rgba(240,240,245,0.5)" }}>
              {isRtl ? "EN" : "فا"}
            </button>
            <Link href="/portfolio"
              className="text-sm font-medium px-4 py-2 rounded-xl transition-all hover:text-amber-400"
              style={{ color: "rgba(240,240,245,0.5)", border: "1px solid rgba(255,255,255,0.08)" }}>
              {isRtl ? "← نمونه‌کارها" : "← Portfolio"}
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 pt-32 pb-20">

        {/* Category badge */}
        <div className="mb-6">
          <span className="text-xs px-3 py-1.5 rounded-full font-bold"
            style={{ background: `${project.color}18`, color: project.color, border: `1px solid ${project.color}35` }}>
            {isRtl ? project.category_fa : project.category_en}
          </span>
        </div>

        {/* Title */}
        <div className="flex items-center gap-4 mb-4">
          <span className="text-5xl">{project.emoji}</span>
          <h1 className="font-extrabold" style={{ fontSize: "clamp(1.8rem,5vw,3rem)" }}>
            {isRtl ? project.title_fa : project.title_en}
          </h1>
        </div>

        <p className="text-base leading-relaxed mb-8" style={{ color: "rgba(240,240,245,0.55)" }}>
          {isRtl ? project.desc_fa : project.desc_en}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-10">
          {project.tags.map(tag => (
            <span key={tag} className="text-xs px-3 py-1.5 rounded-lg font-medium"
              style={{ background: "rgba(255,255,255,0.06)", color: "rgba(240,240,245,0.45)", border: "1px solid rgba(255,255,255,0.08)" }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px mb-10" style={{ background: "rgba(255,255,255,0.08)" }} />

        {/* What we did */}
        <div className="mb-10">
          <h2 className="font-bold text-lg mb-5 text-amber-400">
            {isRtl ? "چه کاری انجام دادیم؟" : "What We Did"}
          </h2>
          <ul className="flex flex-col gap-3">
            {(isRtl ? project.details_fa : project.details_en).map((d, i) => (
              <li key={i} className="flex items-start gap-3 text-sm leading-relaxed"
                style={{ color: "rgba(240,240,245,0.65)" }}>
                <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: `${project.color}20`, color: project.color }}>
                  {i + 1}
                </span>
                {d}
              </li>
            ))}
          </ul>
        </div>

        {/* Result */}
        <div className="rounded-2xl p-6 mb-12"
          style={{ background: `${project.color}10`, border: `1px solid ${project.color}30` }}>
          <p className="text-xs font-bold tracking-widest mb-2" style={{ color: project.color }}>
            {isRtl ? "✦ نتیجه" : "✦ RESULT"}
          </p>
          <p className="font-bold text-lg" style={{ color: "#f0f0f5" }}>
            {isRtl ? project.result_fa : project.result_en}
          </p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-sm mb-5" style={{ color: "rgba(240,240,245,0.4)" }}>
            {isRtl ? "می‌خواهید نتیجه‌ای مشابه برای کسب‌وکار شما؟" : "Want similar results for your business?"}
          </p>
          <Link href="/consult"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm transition-all hover:scale-105"
            style={{ background: "#fbbf24", color: "#111", boxShadow: "0 0 40px rgba(251,191,36,0.3)" }}>
            {isRtl ? "مشاوره رایگان ←" : "Get Free Consultation →"}
          </Link>
        </div>

      </div>
    </div>
  );
}
