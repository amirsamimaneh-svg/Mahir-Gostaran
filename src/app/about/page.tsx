"use client";

import Link from "next/link";
import { useState } from "react";
import MahirLogo from "@/components/MahirLogo";

const VALUES = [
  { icon: "🎯", fa: "نتیجه‌محور", en: "Results-Driven", descFa: "هر تصمیم را با یک سوال می‌سنجیم: آیا به رشد کسب‌وکار کمک می‌کند؟", descEn: "We measure every decision with one question: does it help the business grow?" },
  { icon: "🤝", fa: "شراکت واقعی", en: "Real Partnership", descFa: "ما کنسولتانت نیستیم — شریک رشد شما هستیم و موفقیت شما موفقیت ماست.", descEn: "We're not consultants — we're your growth partners, and your success is ours." },
  { icon: "🔬", fa: "داده‌محور", en: "Data-Informed", descFa: "شهود مهم است، اما تصمیم‌های بزرگ را با داده می‌سنجیم.", descEn: "Intuition matters, but we validate big decisions with data." },
  { icon: "⚡", fa: "سرعت اجرا", en: "Speed of Execution", descFa: "بهترین استراتژی بی‌اجرا بی‌ارزش است. ما سریع حرکت می‌کنیم.", descEn: "The best strategy without execution is worthless. We move fast." },
];

const TIMELINE = [
  { year: "۱۴۰۱", enYear: "2022", fa: "تأسیس ماهیر با تمرکز روی استارت‌آپ‌های ایرانی", en: "Mahir founded with focus on Iranian startups" },
  { year: "۱۴۰۱", enYear: "2022", fa: "اولین ۱۰ مشتری — همه از راه معرفی", en: "First 10 clients — all through referrals" },
  { year: "۱۴۰۲", enYear: "2023", fa: "گسترش تیم به ۶ متخصص تمام‌وقت", en: "Team expanded to 6 full-time specialists" },
  { year: "۱۴۰۳", enYear: "2024", fa: "پیاده‌سازی ابزارهای هوش مصنوعی برای مشتریان", en: "AI tools implementation for clients launched" },
  { year: "۱۴۰۴", enYear: "2025", fa: "بیش از ۵۰ کسب‌وکار — ۸۰٪ رشد میانگین", en: "50+ businesses served — 80% average growth" },
];

export default function AboutPage() {
  const [lang, setLang] = useState<"fa" | "en">("fa");
  const isRtl = lang === "fa";

  return (
    <div dir={isRtl ? "rtl" : "ltr"} style={{ background: "var(--bg)", minHeight: "100vh", color: "var(--fg)" }}>

      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 z-50" style={{ background: "var(--nav-bg)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--nav-border)" }}>
        <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <MahirLogo size={32} />
            <span className="text-lg font-extrabold text-[#5B9CF6] tracking-widest">{isRtl ? "ماهیر" : "Mahir"}</span>
          </Link>
          <div className="flex items-center gap-3">
            <button onClick={() => setLang(l => l === "fa" ? "en" : "fa")}
              className="text-xs font-bold px-3 py-2 rounded-lg hover:text-[#5B9CF6] transition-all"
              style={{ background: "var(--surface)", color: "var(--fg2)", border: "1px solid var(--border)" }}>
              {isRtl ? "EN" : "فا"}
            </button>
            <Link href="/" className="text-sm px-4 py-2 rounded-xl hover:text-[#5B9CF6] transition-all"
              style={{ color: "var(--fg2)", border: "1px solid var(--border)" }}>
              {isRtl ? "← خانه" : "← Home"}
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 pt-32 pb-24">

        {/* Hero */}
        <div className="text-center mb-20">
          <div className="flex justify-center mb-6">
            <MahirLogo size={72} />
          </div>
          <h1 className="font-extrabold mb-4" style={{ fontSize: "clamp(2rem,5vw,3.5rem)" }}>
            <span style={{ color: "var(--fg)" }}>{isRtl ? "درباره " : "About "}</span>
            <span className="text-shimmer">{isRtl ? "ماهیر" : "Mahir"}</span>
          </h1>
          <p className="max-w-2xl mx-auto text-base leading-relaxed" style={{ color: "var(--fg2)" }}>
            {isRtl
              ? "ماهیر در سال ۱۴۰۱ با یک باور ساده شروع کرد: کسب‌وکارهای ایرانی لایق مشاوره‌ای هستند که واقعاً نتیجه بدهد — نه فقط توصیه‌های کلی و پاورپوینت‌های زیبا."
              : "Mahir started in 2022 with a simple belief: Iranian businesses deserve consulting that actually delivers results — not just generic advice and pretty PowerPoints."}
          </p>
        </div>

        {/* Mission */}
        <div className="rounded-3xl p-10 mb-16 text-center relative overflow-hidden"
          style={{ background: "rgba(91,156,246,0.07)", border: "1px solid rgba(91,156,246,0.15)" }}>
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at center, rgba(91,156,246,0.06) 0%, transparent 70%)" }} />
          <p className="text-xs font-bold tracking-widest mb-4 text-[#5B9CF6]">
            {isRtl ? "✦ مأموریت ما" : "✦ OUR MISSION"}
          </p>
          <p className="font-extrabold leading-relaxed" style={{ fontSize: "clamp(1.1rem,2.5vw,1.5rem)", color: "var(--fg)" }}>
            {isRtl
              ? "کمک به کسب‌وکارهای ایرانی تا با استراتژی هوشمند، هویت قوی و اجرای سریع، در بازار رقابتی امروز متمایز شوند."
              : "Helping Iranian businesses stand out in today's competitive market with smart strategy, strong identity, and fast execution."}
          </p>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="font-extrabold text-2xl mb-8 text-center">
            <span style={{ color: "var(--fg)" }}>{isRtl ? "ارزش‌های " : "Our "}</span>
            <span className="text-shimmer">{isRtl ? "ما" : "Values"}</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {VALUES.map(v => (
              <div key={v.fa} className="rounded-2xl p-6"
                style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
                <div className="text-3xl mb-3">{v.icon}</div>
                <h3 className="font-extrabold text-base mb-2" style={{ color: "var(--fg)" }}>
                  {isRtl ? v.fa : v.en}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--fg2)" }}>
                  {isRtl ? v.descFa : v.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <h2 className="font-extrabold text-2xl mb-8 text-center">
            <span style={{ color: "var(--fg)" }}>{isRtl ? "مسیر " : "Our "}</span>
            <span className="text-shimmer">{isRtl ? "رشد" : "Journey"}</span>
          </h2>
          <div className="relative flex flex-col gap-0">
            {TIMELINE.map((item, i) => (
              <div key={i} className="flex items-start gap-5 pb-8 relative">
                {/* Line */}
                {i < TIMELINE.length - 1 && (
                  <div className="absolute top-8 bottom-0 w-px"
                    style={{ background: "var(--border)", [isRtl ? "right" : "left"]: "39px" }} />
                )}
                {/* Year badge */}
                <div className="flex-shrink-0 w-20 h-8 rounded-full flex items-center justify-center text-xs font-extrabold relative z-10"
                  style={{ background: i === TIMELINE.length - 1 ? "#5B9CF6" : "var(--surface)", color: i === TIMELINE.length - 1 ? "#03080F" : "var(--fg2)", border: "1px solid var(--border)" }}>
                  {isRtl ? item.year : item.enYear}
                </div>
                <p className="text-sm leading-relaxed pt-1" style={{ color: "var(--fg2)" }}>
                  {isRtl ? item.fa : item.en}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-3 gap-4 mb-16">
          {[
            { num: "۵۰+", enNum: "50+", fa: "کسب‌وکار موفق", en: "Successful Businesses" },
            { num: "۸۰٪", enNum: "80%", fa: "رشد میانگین", en: "Average Growth" },
            { num: "۳+", enNum: "3+", fa: "سال تجربه", en: "Years Experience" },
          ].map(s => (
            <div key={s.fa} className="text-center rounded-2xl p-5"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
              <p className="font-extrabold text-2xl text-[#5B9CF6] mb-1">{isRtl ? s.num : s.enNum}</p>
              <p className="text-xs" style={{ color: "var(--fg3)" }}>{isRtl ? s.fa : s.en}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-sm mb-6" style={{ color: "var(--fg2)" }}>
            {isRtl ? "آماده شروع هستی؟" : "Ready to get started?"}
          </p>
          <Link href="/consult"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-xl font-extrabold text-sm hover:scale-105 transition-all"
            style={{ background: "#5B9CF6", color: "#03080F", boxShadow: "0 0 40px rgba(91,156,246,0.25)" }}>
            {isRtl ? "مشاوره رایگان ←" : "Free Consultation →"}
          </Link>
        </div>
      </div>
    </div>
  );
}
