"use client";

import { use, useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import { useLang } from "@/context/LangContext";

function ProjectPageInner({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { lang, setLang, isRtl } = useLang();
  const [lightbox, setLightbox] = useState<number | null>(null);

  const project = projects.find(p => p.slug === slug);

  if (!project) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#05050f", color: "#f0f0f5" }}>
      <div className="text-center">
        <p className="text-6xl mb-4">404</p>
        <p className="mb-6 text-lg" style={{ color: "rgba(240,240,245,0.5)" }}>پروژه پیدا نشد</p>
        <Link href="/portfolio" className="px-6 py-3 rounded-xl font-bold text-sm" style={{ background: "#2563EB", color: "#111" }}>
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
          <Link href="/" className="text-xl font-extrabold text-[#2563EB] tracking-widest">
            {isRtl ? "ماهیر" : "Mahir"}
          </Link>
          <div className="flex items-center gap-3">
            <button onClick={() => setLang(lang === "fa" ? "en" : "fa")}
              className="text-xs font-bold px-3 py-2 rounded-lg transition-all hover:text-[#2563EB]"
              style={{ background: "rgba(255,255,255,0.06)", color: "rgba(240,240,245,0.5)" }}>
              {lang === "fa" ? "EN" : "فا"}
            </button>
            <Link href="/portfolio"
              className="text-sm font-medium px-4 py-2 rounded-xl transition-all hover:text-[#2563EB]"
              style={{ color: "rgba(240,240,245,0.5)", border: "1px solid rgba(255,255,255,0.08)" }}>
              {isRtl ? "← نمونه‌کارها" : "← Portfolio"}
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 pt-20 md:pt-32 pb-20">

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

        {/* Gallery */}
        {project.images?.length > 0 && (
          <div className="mb-10">
            <h2 className="font-bold text-lg mb-4 text-[#2563EB]">
              {isRtl ? "تصاویر پروژه" : "Project Gallery"}
            </h2>
            <div className="grid grid-cols-3 gap-2">
              {project.images.map((src, i) => (
                <button key={i} onClick={() => setLightbox(i)}
                  className="relative overflow-hidden rounded-xl aspect-video transition-all hover:scale-[1.03] hover:brightness-110"
                  style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
                  <Image src={src} alt={`${project.title_fa} - ${i + 1}`}
                    fill className="object-cover" unoptimized />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Divider */}
        <div className="h-px mb-10" style={{ background: "rgba(255,255,255,0.08)" }} />

        {/* What we did */}
        <div className="mb-10">
          <h2 className="font-bold text-lg mb-5 text-[#2563EB]">
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
            style={{ background: "#2563EB", color: "#111", boxShadow: "0 0 40px rgba(79,110,255,0.3)" }}>
            {isRtl ? "مشاوره رایگان ←" : "Get Free Consultation →"}
          </Link>
        </div>

      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(8px)" }}
          onClick={() => setLightbox(null)}>
          <button className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center text-xl"
            style={{ background: "rgba(255,255,255,0.1)", color: "#f0f0f5" }}
            onClick={() => setLightbox(null)}>✕</button>

          {/* prev */}
          {lightbox > 0 && (
            <button className="absolute left-5 w-11 h-11 rounded-full flex items-center justify-center text-xl"
              style={{ background: "rgba(255,255,255,0.1)", color: "#f0f0f5" }}
              onClick={e => { e.stopPropagation(); setLightbox(lightbox - 1); }}>‹</button>
          )}

          <div className="relative w-full max-w-3xl rounded-2xl overflow-hidden" style={{ aspectRatio: "16/10" }}
            onClick={e => e.stopPropagation()}>
            <Image src={project.images[lightbox]} alt="" fill className="object-cover" unoptimized />
          </div>

          {/* next */}
          {lightbox < project.images.length - 1 && (
            <button className="absolute right-5 w-11 h-11 rounded-full flex items-center justify-center text-xl"
              style={{ background: "rgba(255,255,255,0.1)", color: "#f0f0f5" }}
              onClick={e => { e.stopPropagation(); setLightbox(lightbox + 1); }}>›</button>
          )}

          <p className="absolute bottom-6 text-xs" style={{ color: "rgba(240,240,245,0.4)" }}>
            {lightbox + 1} / {project.images.length}
          </p>
        </div>
      )}
    </div>
  );
}

export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<div style={{ background: "#07080F", minHeight: "100vh" }} />}>
      <ProjectPageInner params={params} />
    </Suspense>
  );
}
