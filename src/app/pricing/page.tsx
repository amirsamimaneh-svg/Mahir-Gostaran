"use client";

import Link from "next/link";
import { useState } from "react";

const PLANS = {
  fa: [
    {
      name: "استارتر",
      price: "۲,۹۰۰,۰۰۰",
      period: "تومان / ماه",
      desc: "برای کسب‌وکارهای تازه‌کار",
      color: "#2563EB",
      features: [
        "مشاوره استراتژی رشد ماهانه",
        "مدیریت اینستاگرام (۱۲ پست)",
        "گزارش ماهانه عملکرد",
        "پشتیبانی واتساپ",
      ],
      cta: "شروع کن",
      popular: false,
    },
    {
      name: "حرفه‌ای",
      price: "۶,۵۰۰,۰۰۰",
      period: "تومان / ماه",
      desc: "محبوب‌ترین پلن برای رشد سریع",
      color: "#2563EB",
      features: [
        "همه امکانات استارتر",
        "طراحی هویت برند کامل",
        "مدیریت کامل شبکه‌های اجتماعی",
        "کمپین تبلیغاتی هدفمند",
        "SEO و تولید محتوا (۸ مقاله)",
        "داشبورد آنالیتیکس اختصاصی",
        "پشتیبانی ۲۴/۷",
      ],
      cta: "انتخاب کن",
      popular: true,
    },
    {
      name: "سازمانی",
      price: "سفارشی",
      period: "",
      desc: "برای کسب‌وکارهای بزرگ",
      color: "#3B82F6",
      features: [
        "همه امکانات حرفه‌ای",
        "پیاده‌سازی هوش مصنوعی اختصاصی",
        "تیم اختصاصی ۳ نفره",
        "استراتژی ۶ ماهه کامل",
        "نمونه‌کار اختصاصی",
        "جلسات حضوری هفتگی",
        "SLA تضمین‌شده",
      ],
      cta: "تماس بگیر",
      popular: false,
    },
  ],
  en: [
    {
      name: "Starter",
      price: "$99",
      period: "/ month",
      desc: "For new businesses getting started",
      color: "#2563EB",
      features: [
        "Monthly growth strategy session",
        "Instagram management (12 posts)",
        "Monthly performance report",
        "WhatsApp support",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Professional",
      price: "$249",
      period: "/ month",
      desc: "Most popular plan for rapid growth",
      color: "#2563EB",
      features: [
        "Everything in Starter",
        "Full brand identity design",
        "Complete social media management",
        "Targeted ad campaigns",
        "SEO & content (8 articles)",
        "Dedicated analytics dashboard",
        "24/7 support",
      ],
      cta: "Choose Plan",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      desc: "For large-scale businesses",
      color: "#3B82F6",
      features: [
        "Everything in Professional",
        "Custom AI implementation",
        "Dedicated 3-person team",
        "Complete 6-month strategy",
        "Custom portfolio",
        "Weekly in-person meetings",
        "Guaranteed SLA",
      ],
      cta: "Contact Us",
      popular: false,
    },
  ],
};

export default function PricingPage() {
  const [lang, setLang] = useState<"fa" | "en">("fa");
  const isRtl = lang === "fa";
  const plans = PLANS[lang];

  return (
    <div dir={isRtl ? "rtl" : "ltr"} style={{ background: "var(--bg)", minHeight: "100vh", color: "var(--fg)" }}>

      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 z-50" style={{ background: "var(--nav-bg)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--nav-border)" }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-extrabold text-[#2563EB] tracking-widest">
            {isRtl ? "ماهیر" : "Mahir"}
          </Link>
          <div className="flex items-center gap-3">
            <button onClick={() => setLang(l => l === "fa" ? "en" : "fa")}
              className="text-xs font-bold px-3 py-2 rounded-lg transition-all hover:text-[#2563EB]"
              style={{ background: "var(--surface)", color: "var(--fg2)", border: "1px solid var(--border)" }}>
              {isRtl ? "EN" : "فا"}
            </button>
            <Link href="/" className="text-sm font-medium px-4 py-2 rounded-xl c-fg2 hover:text-[#2563EB] transition-all"
              style={{ border: "1px solid var(--border)" }}>
              {isRtl ? "← خانه" : "← Home"}
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 pt-20 md:pt-32 pb-24">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full px-5 py-2 mb-5"
            style={{ background: "rgba(79,110,255,0.08)", border: "1px solid rgba(79,110,255,0.2)" }}>
            <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse" />
            <span className="text-xs font-bold text-[#2563EB] tracking-widest">
              {isRtl ? "شفاف و بدون هزینه پنهان" : "Transparent Pricing"}
            </span>
          </div>
          <h1 className="font-extrabold mb-4" style={{ fontSize: "clamp(2rem,5vw,3.5rem)" }}>
            <span className="c-fg">{isRtl ? "پلن‌های " : "Our "}</span>
            <span className="text-shimmer">{isRtl ? "ماهیر" : "Plans"}</span>
          </h1>
          <p className="max-w-md mx-auto text-sm c-fg2 leading-relaxed">
            {isRtl
              ? "قیمت‌گذاری شفاف — بدون هزینه پنهان. با هر بودجه‌ای شروع کن."
              : "Transparent pricing — no hidden fees. Start with any budget."}
          </p>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div key={plan.name}
              className="relative rounded-3xl p-8 flex flex-col transition-all duration-300 hover:-translate-y-2"
              style={{
                background: plan.popular ? "rgba(79,110,255,0.06)" : "var(--card)",
                border: plan.popular ? "1px solid rgba(79,110,255,0.4)" : "1px solid var(--border)",
                boxShadow: plan.popular ? "0 0 40px rgba(79,110,255,0.12)" : "none",
              }}>

              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="text-xs font-bold px-4 py-1.5 rounded-full"
                    style={{ background: "#2563EB", color: "#03050C" }}>
                    {isRtl ? "✦ محبوب‌ترین" : "✦ Most Popular"}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h2 className="font-extrabold text-xl mb-1 c-fg">{plan.name}</h2>
                <p className="text-xs c-fg3">{plan.desc}</p>
              </div>

              <div className="mb-8">
                <span className="font-extrabold" style={{ fontSize: "2.2rem", color: plan.color }}>{plan.price}</span>
                {plan.period && <span className="text-sm c-fg3 mr-1">{plan.period}</span>}
              </div>

              <ul className="flex flex-col gap-3 mb-8 flex-1">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-sm c-fg2">
                    <span className="mt-0.5 flex-shrink-0 text-[#2563EB] font-bold">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <Link href="/consult"
                className="w-full py-3.5 rounded-xl font-bold text-sm text-center transition-all hover:scale-105 block"
                style={plan.popular
                  ? { background: "#2563EB", color: "#03050C", boxShadow: "0 0 30px rgba(79,110,255,0.3)" }
                  : { background: "var(--surface)", color: "var(--fg)", border: "1px solid var(--border)" }
                }>
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* FAQ teaser */}
        <div className="mt-16 text-center">
          <p className="text-sm c-fg3">
            {isRtl ? "سوال داری؟ " : "Have questions? "}
            <Link href="/consult" className="text-[#2563EB] font-bold hover:underline">
              {isRtl ? "مشاوره رایگان بگیر" : "Get free consultation"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
