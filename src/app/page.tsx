"use client";

import Link from "next/link";
import MahirLogo from "@/components/MahirLogo";
import { useEffect, useState, useRef } from "react";
import IdeaCard from "@/components/IdeaCard";
import ScrollToTop from "@/components/ScrollToTop";
import Marquee from "@/components/Marquee";
import Counter from "@/components/Counter";
import { useLang } from "@/context/LangContext";

const TEAM = {
  fa: [
    {
      role: "استراتژیست رشد",
      desc: "تحلیل بازار، تعریف مسیر رشد و طراحی نقشه‌راه کسب‌وکار",
      icon: "🎯",
      tags: ["استراتژی", "بازار", "رشد"],
    },
    {
      role: "طراح هویت برند",
      desc: "خلق هویت بصری منسجم از لوگو تا سیستم رنگ و تایپوگرافی",
      icon: "✦",
      tags: ["لوگو", "UI/UX", "برندینگ"],
    },
    {
      role: "متخصص بازاریابی دیجیتال",
      desc: "اجرای کمپین‌های هدفمند در شبکه‌های اجتماعی و تبلیغات آنلاین",
      icon: "📱",
      tags: ["اینستاگرام", "SEO", "تبلیغات"],
    },
    {
      role: "توسعه‌دهنده هوش مصنوعی",
      desc: "پیاده‌سازی ابزارهای AI برای اتوماسیون و شخصی‌سازی تجربه مشتری",
      icon: "🤖",
      tags: ["AI", "اتوماسیون", "چت‌بات"],
    },
    {
      role: "متخصص محتوا و سئو",
      desc: "تولید محتوای تخصصی و بهینه‌سازی موتور جستجو برای جذب ارگانیک",
      icon: "📝",
      tags: ["محتوا", "SEO", "کپی‌رایتینگ"],
    },
    {
      role: "مدیر پروژه",
      desc: "هماهنگی تیم، پیگیری اهداف و تضمین تحویل به‌موقع پروژه‌ها",
      icon: "📊",
      tags: ["مدیریت", "پیگیری", "تیم"],
    },
  ],
  en: [
    {
      role: "Growth Strategist",
      desc: "Market analysis, growth path definition, and business roadmap design",
      icon: "🎯",
      tags: ["Strategy", "Market", "Growth"],
    },
    {
      role: "Brand Identity Designer",
      desc: "Creating cohesive visual identity from logo to color system and typography",
      icon: "✦",
      tags: ["Logo", "UI/UX", "Branding"],
    },
    {
      role: "Digital Marketing Specialist",
      desc: "Running targeted campaigns on social media and online advertising platforms",
      icon: "📱",
      tags: ["Instagram", "SEO", "Ads"],
    },
    {
      role: "AI Developer",
      desc: "Implementing AI tools for automation and personalizing customer experience",
      icon: "🤖",
      tags: ["AI", "Automation", "Chatbot"],
    },
    {
      role: "Content & SEO Specialist",
      desc: "Producing expert content and search engine optimization for organic growth",
      icon: "📝",
      tags: ["Content", "SEO", "Copywriting"],
    },
    {
      role: "Project Manager",
      desc: "Team coordination, goal tracking, and ensuring timely project delivery",
      icon: "📊",
      tags: ["Management", "Tracking", "Team"],
    },
  ],
};

const t = {
  fa: {
    brand: "ماهیر",
    nav: [
      { label: "خدمات",      href: "#services" },
      { label: "نمونه‌کارها", href: "#portfolio" },
      { label: "درباره ما",   href: "#about" },
      { label: "تماس",       href: "#contact" },
    ],
    consultBtn: "مشاوره رایگان",
    badge: "شریک هوشمند رشد کسب‌وکار شما",
    h1: "از ایده تا",
    h1b: "رشد واقعی",
    sub: "ماهیر کنار شماست — از طراحی استراتژی رشد و ساخت هویت برند تا اجرای بازاریابی دیجیتال و پیاده‌سازی هوش مصنوعی. ما کسب‌وکار شما را تحلیل می‌کنیم و یک مسیر واقعی برای رشد می‌سازیم.",
    cta1: "خدمات ما", cta2: "مشاوره هوشمند",
    servTitle: "خدمات", servBrand: "ماهیر",
    servSub: "راه‌حل‌های جامع برای هر مرحله از مسیر رشد",
    services: [
      { icon: "🎯", title: "استراتژی رشد",      desc: "تحلیل بازار، شناخت رقبا و طراحی نقشه‌راه رشد متناسب با کسب‌وکار شما." },
      { icon: "✦",  title: "هویت برند",          desc: "خلق هویت بصری و کلامی منسجم که در ذهن مخاطبان ماندگار می‌شود." },
      { icon: "📱", title: "بازاریابی دیجیتال", desc: "کمپین‌های هدفمند در شبکه‌های اجتماعی، SEO و تبلیغات آنلاین." },
      { icon: "🤖", title: "هوش مصنوعی",       desc: "پیاده‌سازی ابزارهای AI برای خودکارسازی فرآیندها و شخصی‌سازی تجربه مشتری." },
    ],
    stats: [
      { target: 50,  suffix: "+",  label: "کسب‌وکار موفق" },
      { target: 80,  suffix: "%+", label: "رشد میانگین" },
      { target: 3,   suffix: "",   label: "سال تجربه" },
      { target: 120, suffix: "+",  label: "پروژه تحویل‌شده" },
    ],
    consultTitle: "مشاوره", consultBrand: "اختصاصی",
    consultDesc: "با پاسخ به ۳ سوال کوتاه، یک راهکار رشد کاملاً شخصی‌سازی‌شده دریافت کن.",
    consultCta: "شروع مشاوره رایگان ←",
    teamTitle: "تیم", teamBrand: "ماهیر",
    teamSub: "متخصصانی که هر روز برای رشد کسب‌وکار شما کار می‌کنند",
    aboutTitle: "چرا", aboutBrand: "ماهیر؟",
    aboutDesc: "ماهیر با تیمی از متخصصان استراتژی، طراحی و فناوری، به کسب‌وکارهای ایرانی کمک می‌کند تا با هویتی قوی و استراتژی هوشمند، در بازار رقابتی امروز متمایز شوند.",
    footerIg: "اینستاگرام", footerLi: "لینکدین",
    footerR: "© ۱۴۰۴ ماهیر. تمامی حقوق محفوظ است.",
    langBtn: "EN",
  },
  en: {
    brand: "Mahir",
    nav: [
      { label: "Services",  href: "#services" },
      { label: "Portfolio", href: "#portfolio" },
      { label: "About",     href: "#about" },
      { label: "Contact",   href: "#contact" },
    ],
    consultBtn: "Free Consultation",
    badge: "Your Smart Business Growth Partner",
    h1: "From Idea to",
    h1b: "Real Growth",
    sub: "Mahir is by your side — from growth strategy and brand identity to digital marketing and AI implementation. We analyze your business and build a real roadmap to grow.",
    cta1: "Our Services", cta2: "AI Consultation",
    servTitle: "Our", servBrand: "Services",
    servSub: "Comprehensive solutions for every stage of your growth journey",
    services: [
      { icon: "🎯", title: "Growth Strategy",   desc: "Market analysis, competitor research, and a tailored growth roadmap." },
      { icon: "✦",  title: "Brand Identity",    desc: "A cohesive visual and verbal identity that stays in your audience's memory." },
      { icon: "📱", title: "Digital Marketing", desc: "Targeted campaigns on social media, SEO, and online ads with clear ROI." },
      { icon: "🤖", title: "AI Solutions",      desc: "Implementing AI tools to automate processes and personalize experience." },
    ],
    stats: [
      { target: 50,  suffix: "+",  label: "Businesses Served" },
      { target: 80,  suffix: "%+", label: "Avg. Growth" },
      { target: 3,   suffix: "",   label: "Years Experience" },
      { target: 120, suffix: "+",  label: "Projects Delivered" },
    ],
    consultTitle: "Personalized", consultBrand: "Consultation",
    consultDesc: "Answer 3 quick questions and receive a fully personalized growth strategy.",
    consultCta: "Start Free Consultation →",
    teamTitle: "The", teamBrand: "Team",
    teamSub: "Specialists who work every day to grow your business",
    aboutTitle: "Why", aboutBrand: "Mahir?",
    aboutDesc: "Mahir's team of strategy, design, and tech experts helps businesses stand out in today's competitive market with a strong identity and smart strategy.",
    footerIg: "Instagram", footerLi: "LinkedIn",
    footerR: "© 2025 Mahir. All rights reserved.",
    langBtn: "فا",
  },
};

function go(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
}

// ── Theme toggle ──────────────────────────────────────────

// ── Navbar ────────────────────────────────────────────────
const NAV_FEATURES = {
  fa: [
    { icon: "🤖", label: "مشاوره AI", href: "/consult" },
    { icon: "📁", label: "نمونه‌کارها", href: "#portfolio" },
    { icon: "📝", label: "بلاگ", href: "/blog" },
    { icon: "💰", label: "قیمت‌ها", href: "/pricing" },
    { icon: "ℹ️", label: "درباره ما", href: "/about" },
    { icon: "💬", label: "تماس", href: "#contact" },
  ],
  en: [
    { icon: "🤖", label: "AI Consult", href: "/consult" },
    { icon: "📁", label: "Portfolio", href: "#portfolio" },
    { icon: "📝", label: "Blog", href: "/blog" },
    { icon: "💰", label: "Pricing", href: "/pricing" },
    { icon: "ℹ️", label: "About", href: "/about" },
    { icon: "💬", label: "Contact", href: "#contact" },
  ],
};

function Navbar() {
  const { lang, cycle, isRtl } = useLang();
  const tx = t[lang as keyof typeof t] ?? t.fa;
  const features = NAV_FEATURES[lang as keyof typeof NAV_FEATURES] ?? NAV_FEATURES.fa;
  const [user, setUser] = useState<{ name: string; unread: number } | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me").then(r => r.json()).then(d => {
      if (d.user) setUser({ name: d.user.name, unread: d.user.unread ?? 0 });
    }).catch(() => {});
  }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <nav
        className="fixed top-0 inset-x-0 z-50"
        style={{
          background: scrolled ? "rgba(6,10,20,0.96)" : "transparent",
          backdropFilter: scrolled ? "blur(24px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(91,156,246,0.1)" : "1px solid transparent",
          transition: "background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease",
        }}>

        <div className="max-w-7xl mx-auto flex items-center justify-between px-5 md:px-10 h-[72px]" dir={isRtl ? "rtl" : "ltr"}>

          {/* ── LOGO ── */}
          <Link href="/" className="group flex items-center gap-3 flex-shrink-0">
            {/* Icon box */}
            <div className="relative w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
              style={{
                background: "linear-gradient(135deg,rgba(91,156,246,0.25),rgba(59,130,246,0.12))",
                border: "1.5px solid rgba(91,156,246,0.4)",
                boxShadow: "0 0 20px rgba(91,156,246,0.2), inset 0 1px 0 rgba(255,255,255,0.08)",
              }}>
              <MahirLogo size={26} />
              {/* glow on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "rgba(91,156,246,0.15)", filter: "blur(12px)" }} />
            </div>

            {/* Brand text */}
            <div className="leading-none">
              <span className="block font-black tracking-widest transition-colors duration-200"
                style={{ fontSize: "1.35rem", color: "#5B9CF6", letterSpacing: "0.12em" }}>
                {tx.brand}
              </span>
              <span className="hidden sm:block text-[10px] font-semibold tracking-widest mt-0.5 uppercase"
                style={{ color: "rgba(91,156,246,0.5)" }}>
                {isRtl ? "مشاوره رشد" : "Growth Partner"}
              </span>
            </div>
          </Link>

          {/* ── Desktop nav links ── */}
          <ul className="hidden md:flex items-center gap-1">
            {features.map(item => (
              <li key={item.label}>
                {item.href.startsWith("#") ? (
                  <button onClick={() => go(item.href)}
                    className="group relative px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 hover:text-[#5B9CF6]"
                    style={{ color: "rgba(216,229,245,0.6)" }}>
                    <span className="relative z-10">{item.label}</span>
                    <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ background: "rgba(91,156,246,0.07)" }} />
                  </button>
                ) : (
                  <Link href={item.href}
                    className="group relative px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 hover:text-[#5B9CF6] inline-block"
                    style={{ color: "rgba(216,229,245,0.6)" }}>
                    <span className="relative z-10">{item.label}</span>
                    <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ background: "rgba(91,156,246,0.07)" }} />
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* ── Right actions ── */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Lang pill */}
            <button onClick={cycle}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 hover:border-[rgba(91,156,246,0.4)] hover:text-[#5B9CF6]"
              style={{ border: "1px solid rgba(255,255,255,0.1)", color: "rgba(216,229,245,0.45)" }}>
              <span className="text-sm">{lang === "fa" ? "🇬🇧" : "🇮🇷"}</span>
              <span>{lang === "fa" ? "EN" : "فا"}</span>
            </button>

            {/* CTA */}
            {user ? (
              <Link href="/profile"
                className="relative hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all hover:scale-105"
                style={{ background: "rgba(91,156,246,0.12)", border: "1px solid rgba(91,156,246,0.3)", color: "#5B9CF6" }}>
                <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-extrabold"
                  style={{ background: "rgba(91,156,246,0.25)" }}>{user.name.charAt(0)}</span>
                <span>{user.name}</span>
                {user.unread > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold"
                    style={{ background: "#ef4444", color: "#fff" }}>{user.unread}</span>
                )}
              </Link>
            ) : (
              <Link href="/consult"
                className="hidden sm:flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-extrabold transition-all hover:scale-105 hover:shadow-[0_0_32px_rgba(91,156,246,0.55)]"
                style={{ background: "linear-gradient(135deg,#5B9CF6,#2563EB)", color: "#fff", boxShadow: "0 0 20px rgba(91,156,246,0.3)" }}>
                {isRtl ? "مشاوره رایگان" : "Free Consult"}
                <span className="font-black">{isRtl ? "←" : "→"}</span>
              </Link>
            )}

            {/* Hamburger */}
            <button
              aria-label="Toggle menu"
              onClick={() => setMenuOpen(v => !v)}
              className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-[5px] rounded-xl transition-all"
              style={{ border: "1px solid rgba(91,156,246,0.2)", background: menuOpen ? "rgba(91,156,246,0.1)" : "transparent" }}>
              <span className="w-5 h-[2px] rounded-full transition-all duration-300"
                style={{ background: "#5B9CF6", transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none" }} />
              <span className="w-5 h-[2px] rounded-full transition-all duration-300"
                style={{ background: "#5B9CF6", opacity: menuOpen ? 0 : 1, transform: menuOpen ? "scaleX(0)" : "scaleX(1)" }} />
              <span className="w-5 h-[2px] rounded-full transition-all duration-300"
                style={{ background: "#5B9CF6", transform: menuOpen ? "translateY(-7px) rotate(-45deg)" : "none" }} />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile menu overlay ── */}
      <div
        className="md:hidden fixed inset-0 z-40 transition-all duration-300"
        style={{
          pointerEvents: menuOpen ? "auto" : "none",
          opacity: menuOpen ? 1 : 0,
          background: "rgba(4,8,16,0.98)",
          backdropFilter: "blur(24px)",
        }}
        dir={isRtl ? "rtl" : "ltr"}>

        {/* Top bar with logo + close */}
        <div className="flex items-center justify-between px-6 h-[72px]">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,rgba(91,156,246,0.25),rgba(59,130,246,0.12))", border: "1.5px solid rgba(91,156,246,0.4)" }}>
              <MahirLogo size={26} />
            </div>
            <span className="font-black tracking-widest text-xl" style={{ color: "#5B9CF6" }}>{tx.brand}</span>
          </div>
          <button onClick={() => setMenuOpen(false)}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-lg font-bold transition-all active:scale-90"
            style={{ border: "1px solid rgba(91,156,246,0.2)", color: "#5B9CF6" }}>
            ✕
          </button>
        </div>

        {/* Links list */}
        <div className="px-5 pt-4 flex flex-col gap-2 overflow-y-auto"
          style={{ maxHeight: "calc(100dvh - 72px - 160px)" }}>
          {features.map((item, i) => (
            item.href.startsWith("#") ? (
              <button key={item.label}
                onClick={() => { go(item.href); setMenuOpen(false); }}
                className="flex items-center gap-4 px-5 py-4 rounded-2xl w-full text-start font-semibold text-base transition-all active:scale-[0.97]"
                style={{
                  background: "rgba(91,156,246,0.04)",
                  border: "1px solid rgba(91,156,246,0.1)",
                  color: "rgba(216,229,245,0.85)",
                  transitionDelay: menuOpen ? `${i * 35}ms` : "0ms",
                }}>
                <span className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: "rgba(91,156,246,0.1)" }}>{item.icon}</span>
                {item.label}
                <span className="mr-auto ml-auto" />
                <span className="text-xs opacity-30">{isRtl ? "←" : "→"}</span>
              </button>
            ) : (
              <Link key={item.label} href={item.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-4 px-5 py-4 rounded-2xl font-semibold text-base transition-all active:scale-[0.97]"
                style={{
                  background: "rgba(91,156,246,0.04)",
                  border: "1px solid rgba(91,156,246,0.1)",
                  color: "rgba(216,229,245,0.85)",
                }}>
                <span className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: "rgba(91,156,246,0.1)" }}>{item.icon}</span>
                {item.label}
                <span className="mr-auto ml-auto" />
                <span className="text-xs opacity-30">{isRtl ? "←" : "→"}</span>
              </Link>
            )
          ))}
        </div>

        {/* Bottom CTA area */}
        <div className="absolute bottom-0 inset-x-0 px-5 pb-10 flex flex-col gap-3"
          style={{ background: "linear-gradient(to top,rgba(4,8,16,1) 60%,transparent)" }}>
          {!user && (
            <Link href="/consult" onClick={() => setMenuOpen(false)}
              className="w-full text-center font-extrabold py-4 rounded-2xl text-base transition-all active:scale-[0.97]"
              style={{ background: "linear-gradient(135deg,#5B9CF6,#2563EB)", color: "#fff", boxShadow: "0 0 40px rgba(91,156,246,0.4)" }}>
              {isRtl ? "✦ مشاوره رایگان" : "✦ Free Consultation"}
            </Link>
          )}
          <button onClick={() => { cycle(); }}
            className="w-full flex items-center justify-center gap-2.5 font-bold py-3.5 rounded-2xl text-sm transition-all active:scale-[0.97]"
            style={{ border: "1px solid rgba(91,156,246,0.2)", color: "rgba(216,229,245,0.6)", background: "rgba(91,156,246,0.05)" }}>
            <span className="text-base">{lang === "fa" ? "🇬🇧" : "🇮🇷"}</span>
            <span>{lang === "fa" ? "Switch to English" : "تغییر به فارسی"}</span>
          </button>
        </div>
      </div>
    </>
  );
}

// ── Hero ──────────────────────────────────────────────────
function Hero() {
  const { lang } = useLang();
  const tx = (t as Record<string, typeof t.fa>)[lang] ?? t.fa;
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center
      overflow-hidden pt-20 pb-16 text-center">
      {/* blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="anim-blob d1 absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full blur-[160px]"
          style={{ background: "rgba(79,110,255,0.08)" }} />
        <div className="anim-blob d5 absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full blur-[160px]"
          style={{ background: "rgba(79,110,255,0.08)" }} />
        <div className="anim-blob d3 absolute top-1/2 left-1/3 w-[500px] h-[500px] rounded-full blur-[140px]"
          style={{ background: "rgba(139,92,246,0.06)" }} />
      </div>
      {/* particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 18 }).map((_, i) => (
          <span key={i} className="absolute rounded-full anim-blob"
            style={{ width: `${2+(i%4)}px`, height: `${2+(i%4)}px`,
              top: `${5+(i*4.7)%88}%`, left: `${3+(i*5.1)%94}%`,
              background: "rgba(79,110,255,0.2)",
              animationDelay: `${i*0.4}s`, animationDuration: `${5+(i%5)*1.5}s` }} />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 flex flex-col items-center">
        {/* badge */}
        <div className="anim-fade-up d1 mb-4 inline-flex items-center gap-2 rounded-full px-5 py-2"
          style={{ background: "rgba(79,110,255,0.08)", border: "1px solid rgba(79,110,255,0.25)" }}>
          <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse" />
          <span className="text-xs font-medium text-[#3B82F6] tracking-widest">{tx.badge}</span>
        </div>

        {/* headline */}
        <h1 className="anim-fade-up d2 font-extrabold tracking-tight mb-3"
          style={{ fontSize: "clamp(1.9rem,5vw,4rem)", lineHeight: 1.15 }}>
          <span className="c-fg">{tx.h1} </span>
          <span className="text-shimmer">{tx.h1b}</span>
        </h1>

        <p className="anim-fade-up d3 c-fg2 text-sm md:text-base max-w-xl mb-6 leading-relaxed">{tx.sub}</p>

        {/* CTAs */}
        <div className="anim-fade-up d4 flex flex-col sm:flex-row gap-3 justify-center mb-8">
          <a href="#services" onClick={e => { e.preventDefault(); go("#services"); }}
            className="px-7 py-3 rounded-xl font-bold text-sm transition-all hover:scale-105"
            style={{ background: "#2563EB", color: "#111", boxShadow: "0 0 40px rgba(79,110,255,0.3)" }}>
            {tx.cta1}
          </a>
          <Link href="/consult"
            className="px-7 py-3 rounded-xl font-bold text-sm transition-all hover:scale-105 bg-card"
            style={{ color: "#2563EB", border: "1px solid rgba(79,110,255,0.3)" }}>
            {tx.cta2}
          </Link>
        </div>

        {/* AI card */}
        <div className="anim-scale-in d5 w-full max-w-lg mx-auto">
          <IdeaCard lang={lang} />
        </div>

        {/* scroll hint */}
        <div className="anim-fade-in d9 mt-6 flex flex-col items-center gap-1 c-fg3">
          <span style={{ fontSize: "10px", letterSpacing: "0.3em" }}>SCROLL</span>
          <svg className="animate-bounce w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10"><Marquee /></div>
    </section>
  );
}

// ── Stats ─────────────────────────────────────────────────
const STAT_COLORS = ["#5B9CF6", "#34d399", "#a78bfa", "#fb923c"];
const STAT_BAR_PCT = [96, 80, 55, 42];

function useCountUp(target: number, started: boolean, delay: number) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    const t = setTimeout(() => {
      const dur = 2400, step = 12, steps = dur / step;
      let cur = 0; const inc = target / steps;
      const id = setInterval(() => {
        cur = Math.min(cur + inc, target);
        setCount(Math.floor(cur));
        if (cur >= target) clearInterval(id);
      }, step);
      return () => clearInterval(id);
    }, delay);
    return () => clearTimeout(t);
  }, [started, target, delay]);
  return count;
}

function Stats() {
  const { lang, isRtl } = useLang();
  const tx = (t as Record<string, typeof t.fa>)[lang] ?? t.fa;
  const ref = useRef<HTMLElement>(null);
  const [started, setStarted] = useState(false);
  const [barPcts, setBarPcts] = useState(STAT_BAR_PCT.map(() => 0));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setStarted(true);
        STAT_BAR_PCT.forEach((target, i) => {
          setTimeout(() => {
            const dur = 1800, step = 12, steps = dur / step;
            let cur = 0; const inc = target / steps;
            const id = setInterval(() => {
              cur = Math.min(cur + inc, target);
              setBarPcts(prev => { const n = [...prev]; n[i] = cur; return n; });
              if (cur >= target) clearInterval(id);
            }, step);
          }, 200 + i * 120);
        });
      }
    }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative w-full overflow-hidden py-4">
      {/* full-bleed dark band */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(180deg, transparent 0%, rgba(6,10,20,0.6) 30%, rgba(6,10,20,0.6) 70%, transparent 100%)" }} />

      {/* Grid lines decoration */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: "repeating-linear-gradient(90deg,#5B9CF6 0,#5B9CF6 1px,transparent 0,transparent 25%)", backgroundSize: "25% 100%" }} />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* 4 stat rows */}
        <div className="flex flex-col gap-0">
          {tx.stats.map((s, i) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const count = useCountUp(s.target, started, 150 + i * 130);
            const color = STAT_COLORS[i];
            const bar   = barPcts[i];

            return (
              <div key={s.label}
                className="group relative flex items-center gap-5 py-6 md:py-8 transition-all duration-500 cursor-default"
                style={{
                  opacity: started ? 1 : 0,
                  transform: started ? "translateX(0)" : isRtl ? "translateX(40px)" : "translateX(-40px)",
                  transitionDelay: `${i * 100}ms`,
                  borderTop: i === 0 ? "1px solid rgba(255,255,255,0.05)" : undefined,
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                }}>

                {/* Left: big number */}
                <div className="flex-shrink-0 w-28 md:w-40 text-right" dir="ltr">
                  <span className="font-black tabular-nums leading-none transition-all duration-300"
                    style={{
                      fontSize: "clamp(2.4rem,6vw,4rem)",
                      color,
                      textShadow: `0 0 40px ${color}80, 0 0 80px ${color}30`,
                      letterSpacing: "-0.02em",
                    }}>
                    {count}{s.suffix}
                  </span>
                </div>

                {/* Right: label + bar */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm md:text-base font-semibold mb-3 transition-colors duration-300"
                    style={{ color: "rgba(216,229,245,0.55)" }}>
                    {s.label}
                  </p>
                  {/* Animated bar */}
                  <div className="h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
                    <div className="h-full rounded-full transition-all duration-[1800ms] ease-out"
                      style={{
                        width: `${bar}%`,
                        background: `linear-gradient(90deg, ${color}80, ${color})`,
                        boxShadow: `0 0 12px ${color}80`,
                        transitionDelay: `${200 + i * 120}ms`,
                      }} />
                  </div>
                </div>

                {/* Hover glow bg */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{ background: `radial-gradient(ellipse at ${isRtl ? "right" : "left"} center, ${color}06, transparent 60%)` }} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── Services ──────────────────────────────────────────────
const SVC_COLORS = ["#5B9CF6", "#a78bfa", "#34d399", "#fb923c"];
const SVC_TAGS = {
  fa: [
    ["تحلیل بازار", "نقشه‌راه", "رقبا"],
    ["لوگو", "UI/UX", "برندینگ"],
    ["اینستاگرام", "SEO", "تبلیغات"],
    ["چت‌بات", "اتوماسیون", "AI"],
  ],
  en: [
    ["Market Analysis", "Roadmap", "Competitors"],
    ["Logo", "UI/UX", "Branding"],
    ["Instagram", "SEO", "Ads"],
    ["Chatbot", "Automation", "AI"],
  ],
};

function Services() {
  const { lang, isRtl } = useLang();
  const tx = (t as Record<string, typeof t.fa>)[lang] ?? t.fa;
  const tags = (SVC_TAGS as Record<string, string[][]>)[lang] ?? SVC_TAGS.fa;
  const [hovered, setHovered] = useState<number | null>(null);
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} id="services" className="py-28 px-6 w-full max-w-6xl mx-auto" dir={isRtl ? "rtl" : "ltr"}>

      {/* Header */}
      <div className="mb-16 text-center transition-all duration-700"
        style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)" }}>
        <p className="text-xs font-extrabold tracking-[0.3em] mb-4" style={{ color: "rgba(91,156,246,0.5)" }}>
          ✦ {isRtl ? "خدمات" : "SERVICES"}
        </p>
        <h2 className="font-extrabold leading-none" style={{ fontSize: "clamp(2.2rem,5vw,4rem)" }}>
          <span className="c-fg">{tx.servTitle} </span>
          <span className="text-shimmer">{tx.servBrand}</span>
        </h2>
        <p className="mt-4 max-w-md mx-auto text-sm leading-relaxed c-fg3">{tx.servSub}</p>
      </div>

      {/* 2×2 glass cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {tx.services.map((s, i) => {
          const color = SVC_COLORS[i];
          const isHov = hovered === i;
          return (
            <div
              key={s.title}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="relative rounded-3xl p-8 overflow-hidden cursor-default transition-all duration-500"
              style={{
                background: isHov
                  ? `linear-gradient(145deg, ${color}14 0%, rgba(8,14,32,0.97) 100%)`
                  : "rgba(255,255,255,0.03)",
                border: `1px solid ${isHov ? color + "45" : "rgba(255,255,255,0.07)"}`,
                boxShadow: isHov ? `0 24px 64px ${color}1A, 0 0 0 1px ${color}18` : "none",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0) scale(1)" : "translateY(28px) scale(0.96)",
                transitionDelay: `${i * 75}ms`,
              }}>

              {/* Decorative big number */}
              <span className="absolute font-black select-none pointer-events-none leading-none"
                style={{
                  fontSize: "10rem",
                  color,
                  opacity: isHov ? 0.08 : 0.03,
                  top: "-2rem",
                  right: isRtl ? "auto" : "-1.5rem",
                  left: isRtl ? "-1.5rem" : "auto",
                  transition: "opacity 0.5s",
                  lineHeight: 1,
                }}>
                {i + 1}
              </span>

              {/* Color glow blob */}
              <div className="absolute pointer-events-none transition-all duration-700"
                style={{
                  width: 240, height: 240,
                  borderRadius: "50%",
                  background: color,
                  filter: "blur(90px)",
                  opacity: isHov ? 0.13 : 0,
                  top: -80,
                  right: isRtl ? "auto" : -80,
                  left: isRtl ? -80 : "auto",
                }} />

              {/* Top color stripe */}
              <div className="absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-500"
                style={{
                  background: `linear-gradient(${isRtl ? "to left" : "to right"}, ${color}, transparent)`,
                  opacity: isHov ? 0.8 : 0.25,
                }} />

              <div className="relative z-10 flex flex-col h-full">

                {/* Icon */}
                <div className="mb-6 w-16 h-16 rounded-2xl flex items-center justify-center text-3xl transition-all duration-500"
                  style={{
                    background: isHov ? `${color}22` : "rgba(255,255,255,0.05)",
                    border: `1.5px solid ${isHov ? color + "55" : "rgba(255,255,255,0.1)"}`,
                    boxShadow: isHov ? `0 0 28px ${color}50` : "none",
                    transform: isHov ? "scale(1.12) rotate(-6deg)" : "scale(1)",
                  }}>
                  {s.icon}
                </div>

                {/* Title */}
                <h3 className="font-extrabold mb-3 leading-tight transition-colors duration-300"
                  style={{
                    fontSize: "clamp(1.2rem,2.5vw,1.55rem)",
                    color: isHov ? "#fff" : "rgba(216,229,245,0.88)",
                  }}>
                  {s.title}
                </h3>

                {/* Desc */}
                <p className="text-sm leading-relaxed mb-6 transition-colors duration-300 flex-1"
                  style={{ color: isHov ? "rgba(216,229,245,0.65)" : "rgba(216,229,245,0.38)" }}>
                  {s.desc}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {tags[i].map(tag => (
                    <span key={tag} className="text-xs px-3 py-1 rounded-full font-bold transition-all duration-400"
                      style={{
                        background: isHov ? `${color}18` : "rgba(255,255,255,0.05)",
                        color: isHov ? color : "rgba(216,229,245,0.32)",
                        border: `1px solid ${isHov ? color + "38" : "rgba(255,255,255,0.07)"}`,
                      }}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 transition-all duration-300"
                  style={{ borderTop: `1px solid ${isHov ? color + "28" : "rgba(255,255,255,0.05)"}` }}>
                  <span className="text-xs font-bold transition-colors duration-300"
                    style={{ color: isHov ? color : "rgba(255,255,255,0.2)" }}>
                    {isRtl ? "بیشتر بدانید" : "Learn more"}
                  </span>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-400"
                    style={{
                      background: isHov ? color : "rgba(255,255,255,0.05)",
                      border: `1px solid ${isHov ? color : "rgba(255,255,255,0.08)"}`,
                      transform: isHov ? "scale(1.15)" : "scale(1)",
                    }}>
                    <span className="text-xs font-bold" style={{ color: isHov ? "#fff" : "rgba(255,255,255,0.22)" }}>
                      {isRtl ? "←" : "→"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ── Portfolio ─────────────────────────────────────────────
const PORT_ITEMS = [
  { slug: "brand-identity-cafe",          emoji: "☕", color: "#d97706", category_fa: "هویت برند",        category_en: "Brand Identity",    title_fa: "کافه رزتا",         title_en: "Rosetta Café",       result_fa: "۴۰٪ رشد مشتری",         result_en: "40% customer growth",  desc_fa: "بازطراحی کامل هویت بصری و تجربه برند برای یک کافه محلی در تهران", desc_en: "Full visual identity redesign and brand experience for a local Tehran café" },
  { slug: "growth-strategy-ecommerce",    emoji: "📈", color: "#7c3aed", category_fa: "استراتژی رشد",    category_en: "Growth Strategy",   title_fa: "دیجی‌استایل",       title_en: "DigiStyle",          result_fa: "۱۱۵٪ رشد فروش",         result_en: "115% sales growth",    desc_fa: "طراحی نقشه‌راه رشد و اجرای کمپین‌های هدفمند برای فروشگاه آنلاین", desc_en: "Growth roadmap and targeted campaigns for an online fashion store" },
  { slug: "ai-automation-clinic",         emoji: "🤖", color: "#0891b2", category_fa: "هوش مصنوعی",      category_en: "AI Solutions",      title_fa: "کلینیک دکتر سپهری", title_en: "Dr. Sepehri Clinic", result_fa: "۶۵٪ کاهش تماس",         result_en: "65% fewer calls",      desc_fa: "پیاده‌سازی چت‌بات هوشمند برای خودکارسازی نوبت‌دهی و پشتیبانی", desc_en: "Smart chatbot for automated scheduling and patient support" },
  { slug: "digital-marketing-restaurant", emoji: "🍽️", color: "#dc2626", category_fa: "بازاریابی دیجیتال",category_en: "Digital Marketing", title_fa: "رستوران آرارات",    title_en: "Ararat Restaurant",  result_fa: "از ۸۰۰ به ۱۲k فالوور",  result_en: "800→12k followers",    desc_fa: "کمپین محتوایی و تبلیغات هدفمند در اینستاگرام برای رستوران", desc_en: "Content campaign and targeted Instagram ads for a restaurant" },
  { slug: "brand-strategy-startup",       emoji: "💳", color: "#059669", category_fa: "استراتژی برند",   category_en: "Brand Strategy",   title_fa: "استارتاپ فین‌پی",   title_en: "FinPay Startup",     result_fa: "۵,۰۰۰ کاربر هفته اول", result_en: "5k users in week 1",   desc_fa: "پوزیشنینگ برند و استراتژی لانچ برای یک استارتاپ فین‌تک", desc_en: "Brand positioning and launch strategy for a fintech startup" },
  { slug: "seo-real-estate",              emoji: "🏠", color: "#ea580c", category_fa: "سئو و محتوا",     category_en: "SEO & Content",    title_fa: "مشاور املاک آریا",  title_en: "Arya Real Estate",   result_fa: "صفحه اول گوگل ۳۸ کلمه", result_en: "38 keywords page 1",   desc_fa: "سئو تخصصی و تولید محتوا برای جذب ارگانیک در حوزه مشاوره املاک", desc_en: "SEO and content production for organic growth in real estate" },
];

function Portfolio() {
  const { lang, isRtl } = useLang();
  const [hovered, setHovered] = useState<number | null>(null);
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.08 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const featured = PORT_ITEMS[0];
  const rest = PORT_ITEMS.slice(1);

  return (
    <section ref={ref} id="portfolio" className="py-24 w-full max-w-6xl mx-auto px-6" dir={isRtl ? "rtl" : "ltr"}>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 transition-all duration-700"
        style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)" }}>
        <div>
          <p className="text-xs font-bold tracking-[0.25em] mb-3" style={{ color: "rgba(79,110,255,0.55)" }}>✦ PORTFOLIO</p>
          <h2 className="font-extrabold leading-none" style={{ fontSize: "clamp(1.8rem,4vw,3rem)" }}>
            {isRtl ? "نمونه‌کارها " : "Selected "}
            <span className="text-shimmer">{isRtl ? "برتر ما" : "Works"}</span>
          </h2>
        </div>
        <Link href="/portfolio"
          className="group self-start md:self-end inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all hover:gap-4"
          style={{ border: "1px solid rgba(79,110,255,0.3)", color: "#2563EB" }}>
          {isRtl ? "همه پروژه‌ها" : "All Projects"}
          <span className="transition-transform group-hover:translate-x-1">{isRtl ? "←" : "→"}</span>
        </Link>
      </div>

      {/* Bento grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        {/* Featured card — spans 2 cols */}
        <Link href={`/portfolio/${featured.slug}?lang=${lang}`}
          onMouseEnter={() => setHovered(-1)}
          onMouseLeave={() => setHovered(null)}
          className="sm:col-span-2 relative rounded-3xl overflow-hidden cursor-pointer group transition-all duration-500"
          style={{
            background: hovered === -1
              ? `linear-gradient(145deg, ${featured.color}18, rgba(8,14,32,0.97))`
              : "rgba(255,255,255,0.04)",
            border: `1px solid ${hovered === -1 ? featured.color + "50" : "rgba(255,255,255,0.07)"}`,
            boxShadow: hovered === -1 ? `0 24px 70px ${featured.color}20` : "none",
            minHeight: 220,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.5s ease",
          }}>

          {/* Color top stripe */}
          <div className="absolute top-0 left-0 right-0 h-[3px]"
            style={{ background: `linear-gradient(${isRtl ? "to left" : "to right"}, ${featured.color}, transparent)` }} />

          {/* Glow blob */}
          <div className="absolute pointer-events-none transition-all duration-700"
            style={{ width: 300, height: 300, borderRadius: "50%", background: featured.color, filter: "blur(100px)", opacity: hovered === -1 ? 0.12 : 0.04, top: -100, right: isRtl ? "auto" : -100, left: isRtl ? -100 : "auto" }} />

          {/* Big decorative emoji */}
          <div className="absolute text-[8rem] leading-none select-none pointer-events-none transition-all duration-500"
            style={{ opacity: hovered === -1 ? 0.12 : 0.06, bottom: "-1rem", left: isRtl ? "auto" : "1.5rem", right: isRtl ? "1.5rem" : "auto", transform: hovered === -1 ? "scale(1.15) rotate(-8deg)" : "scale(1)" }}>
            {featured.emoji}
          </div>

          <div className="relative z-10 p-8 flex flex-col h-full gap-3">
            {/* Category */}
            <span className="self-start text-xs px-3 py-1 rounded-full font-bold"
              style={{ background: `${featured.color}18`, color: featured.color, border: `1px solid ${featured.color}35` }}>
              {isRtl ? featured.category_fa : featured.category_en}
            </span>

            {/* Title */}
            <h3 className="font-extrabold transition-colors duration-300" style={{ fontSize: "clamp(1.5rem,3vw,2.2rem)", color: hovered === -1 ? "#fff" : "rgba(216,229,245,0.9)" }}>
              {isRtl ? featured.title_fa : featured.title_en}
            </h3>

            {/* Desc */}
            <p className="text-sm leading-relaxed max-w-sm transition-colors duration-300"
              style={{ color: hovered === -1 ? "rgba(216,229,245,0.6)" : "rgba(216,229,245,0.38)" }}>
              {isRtl ? featured.desc_fa : featured.desc_en}
            </p>

            {/* Result */}
            <div className="mt-auto flex items-center justify-between pt-5"
              style={{ borderTop: `1px solid ${hovered === -1 ? featured.color + "28" : "rgba(255,255,255,0.05)"}` }}>
              <span className="text-sm font-extrabold" style={{ color: featured.color }}>
                ✦ {isRtl ? featured.result_fa : featured.result_en}
              </span>
              <div className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-400"
                style={{ background: hovered === -1 ? featured.color : "rgba(255,255,255,0.06)", border: `1px solid ${hovered === -1 ? featured.color : "rgba(255,255,255,0.1)"}`, transform: hovered === -1 ? "scale(1.15)" : "scale(1)" }}>
                <span className="text-sm font-bold" style={{ color: hovered === -1 ? "#fff" : "rgba(255,255,255,0.3)" }}>{isRtl ? "←" : "→"}</span>
              </div>
            </div>
          </div>
        </Link>

        {/* Remaining 5 cards */}
        {rest.map((p, i) => (
          <Link key={p.slug} href={`/portfolio/${p.slug}?lang=${lang}`}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className="relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-500"
            style={{
              background: hovered === i
                ? `linear-gradient(145deg, ${p.color}14, rgba(8,14,32,0.97))`
                : "rgba(255,255,255,0.03)",
              border: `1px solid ${hovered === i ? p.color + "45" : "rgba(255,255,255,0.06)"}`,
              boxShadow: hovered === i ? `0 16px 50px ${p.color}1A` : "none",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0) scale(1)" : "translateY(28px) scale(0.96)",
              transitionDelay: `${(i + 1) * 70}ms`,
            }}>

            {/* Color top stripe */}
            <div className="absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-500"
              style={{ background: `linear-gradient(${isRtl ? "to left" : "to right"}, ${p.color}, transparent)`, opacity: hovered === i ? 0.9 : 0.3 }} />

            {/* Glow */}
            <div className="absolute pointer-events-none transition-all duration-700"
              style={{ width: 180, height: 180, borderRadius: "50%", background: p.color, filter: "blur(70px)", opacity: hovered === i ? 0.12 : 0, top: -60, right: isRtl ? "auto" : -60, left: isRtl ? -60 : "auto" }} />

            <div className="relative z-10 p-6 flex flex-col gap-3 h-full">
              {/* Icon + category */}
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl transition-all duration-400"
                  style={{ background: hovered === i ? `${p.color}20` : "rgba(255,255,255,0.05)", border: `1px solid ${hovered === i ? p.color + "50" : "rgba(255,255,255,0.08)"}`, transform: hovered === i ? "scale(1.1) rotate(-5deg)" : "scale(1)" }}>
                  {p.emoji}
                </div>
                <span className="text-[10px] px-2.5 py-1 rounded-full font-bold"
                  style={{ background: `${p.color}12`, color: p.color, border: `1px solid ${p.color}25` }}>
                  {isRtl ? p.category_fa : p.category_en}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-extrabold text-base leading-snug transition-colors duration-300"
                style={{ color: hovered === i ? "#fff" : "rgba(216,229,245,0.85)" }}>
                {isRtl ? p.title_fa : p.title_en}
              </h3>

              {/* Desc — hidden on mobile, shown md+ */}
              <p className="hidden md:block text-xs leading-relaxed flex-1 transition-colors duration-300"
                style={{ color: hovered === i ? "rgba(216,229,245,0.55)" : "rgba(216,229,245,0.32)" }}>
                {isRtl ? p.desc_fa : p.desc_en}
              </p>

              {/* Result */}
              <div className="flex items-center justify-between pt-3 mt-auto"
                style={{ borderTop: `1px solid ${hovered === i ? p.color + "28" : "rgba(255,255,255,0.05)"}` }}>
                <span className="text-xs font-bold transition-colors duration-300" style={{ color: hovered === i ? p.color : "rgba(255,255,255,0.25)" }}>
                  ✦ {isRtl ? p.result_fa : p.result_en}
                </span>
                <div className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{ background: hovered === i ? p.color : "transparent", border: `1px solid ${hovered === i ? p.color : "rgba(255,255,255,0.1)"}` }}>
                  <span className="text-xs font-bold" style={{ color: hovered === i ? "#fff" : "rgba(255,255,255,0.22)" }}>{isRtl ? "←" : "→"}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

// ── Consult CTA ───────────────────────────────────────────
function ConsultCTA() {
  const { lang } = useLang();
  const tx = (t as Record<string, typeof t.fa>)[lang] ?? t.fa;
  return (
    <section className="py-20 px-6 w-full max-w-5xl mx-auto">
      <div className="relative rounded-3xl overflow-hidden text-center p-12 md:p-20 card-glow">
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-[100px]"
          style={{ background: "rgba(79,110,255,0.1)" }} />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6"
            style={{ background: "rgba(79,110,255,0.1)", border: "1px solid rgba(79,110,255,0.25)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-pulse" />
            <span className="text-xs text-[#3B82F6] tracking-widest">AI Powered</span>
          </div>
          <h2 className="font-extrabold mb-4" style={{ fontSize: "clamp(1.8rem,4vw,3rem)" }}>
            <span className="c-fg">{tx.consultTitle} </span>
            <span className="text-shimmer">{tx.consultBrand}</span>
          </h2>
          <p className="max-w-md mx-auto text-sm leading-relaxed mb-8 c-fg2">{tx.consultDesc}</p>
          <Link href="/consult"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-xl font-bold text-sm
              transition-all hover:scale-105"
            style={{ background: "#2563EB", color: "#111", boxShadow: "0 0 50px rgba(79,110,255,0.35)" }}>
            {tx.consultCta}
          </Link>
        </div>
      </div>
    </section>
  );
}

// ── Team ──────────────────────────────────────────────────
function Team() {
  const { lang, isRtl } = useLang();
  const tx = (t as Record<string, typeof t.fa>)[lang] ?? t.fa;
  const members = (TEAM as Record<string, typeof TEAM.fa>)[lang] ?? TEAM.fa;
  const COLORS = ["#2563EB", "#a78bfa", "#34d399", "#60a5fa", "#f87171", "#fb923c"];

  return (
    <section id="team" className="py-24 px-6 w-full max-w-6xl mx-auto">

      {/* Header */}
      <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-xs font-bold tracking-[0.25em] mb-3" style={{ color: "rgba(79,110,255,0.55)" }}>✦ TEAM</p>
          <h2 className="font-extrabold leading-none whitespace-nowrap" style={{ fontSize: "clamp(1.8rem,4vw,3rem)" }}>
            {isRtl ? "متخصصان " : "The "}
            <span className="text-shimmer">{isRtl ? "تیم ما" : "Specialists"}</span>
          </h2>
        </div>
        <p className="max-w-xs text-sm leading-relaxed md:text-right" style={{ color: "var(--fg2)" }}>
          {tx.teamSub}
        </p>
      </div>

      {/* Bento grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-auto">
        {members.map((m, i) => {
          const color = COLORS[i];
          // first card is wider
          const isWide = i === 0;
          return (
            <div key={i}
              className={`group relative rounded-3xl p-7 overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl ${isWide ? "sm:col-span-2 lg:col-span-1" : ""}`}
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid var(--border)",
                backdropFilter: "blur(20px)",
              }}>

              {/* Big decorative number */}
              <span className="absolute -bottom-4 font-extrabold select-none pointer-events-none transition-all duration-500 group-hover:opacity-20"
                style={{
                  fontSize: "7rem",
                  lineHeight: 1,
                  color,
                  opacity: 0.06,
                  right: isRtl ? "auto" : "-8px",
                  left: isRtl ? "-8px" : "auto",
                }}>
                0{i + 1}
              </span>

              {/* Color accent top bar */}
              <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-3xl transition-all duration-500"
                style={{ background: `linear-gradient(90deg, ${color}, transparent)`, opacity: 0.6 }} />

              {/* Glow blob */}
              <div className="absolute pointer-events-none transition-all duration-500 opacity-0 group-hover:opacity-100"
                style={{
                  width: 200, height: 200,
                  borderRadius: "50%",
                  background: color,
                  filter: "blur(80px)",
                  opacity: 0,
                  top: -60, right: -60,
                }} />

              <div className="relative z-10 flex flex-col h-full">
                {/* Icon + role */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                    style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
                    {m.icon}
                  </div>
                  <div>
                    <h3 className="c-fg font-extrabold text-base leading-tight transition-colors duration-300 group-hover:text-[#2563EB]">
                      {m.role}
                    </h3>
                    <div className="flex gap-1 mt-1.5 flex-wrap">
                      {m.tags.map(tag => (
                        <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full font-bold"
                          style={{ background: `${color}12`, color, border: `1px solid ${color}25` }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px mb-4 transition-all duration-300"
                  style={{ background: `linear-gradient(90deg, ${color}30, transparent)` }} />

                {/* Desc */}
                <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--fg2)" }}>
                  {m.desc}
                </p>

                {/* Bottom arrow */}
                <div className="mt-5 flex justify-end">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:scale-110"
                    style={{ background: `${color}20`, border: `1px solid ${color}40` }}>
                    <span className="text-xs" style={{ color }}>✦</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ── About ─────────────────────────────────────────────────
function About() {
  const { lang } = useLang();
  const tx = (t as Record<string, typeof t.fa>)[lang] ?? t.fa;
  return (
    <section id="about" className="py-24 px-6 w-full max-w-4xl mx-auto">
      <div className="card-glow rounded-3xl p-12 md:p-16 text-center">
        <h2 className="font-extrabold mb-5" style={{ fontSize: "clamp(1.8rem,4vw,3rem)" }}>
          <span className="c-fg">{tx.aboutTitle} </span>
          <span className="text-shimmer">{tx.aboutBrand}</span>
        </h2>
        <p className="leading-relaxed text-base max-w-2xl mx-auto c-fg2">{tx.aboutDesc}</p>
      </div>
    </section>
  );
}

// ── Testimonials ─────────────────────────────────────────
const TESTIMONIALS = {
  fa: [
    { name: "سارا احمدی", role: "مدیر کافه رزتا", text: "بعد از همکاری با ماهیر، فروش ما ۴۰٪ رشد کرد. هویت برند جدیدمون کاملاً متمایز شد.", avatar: "س" },
    { name: "رضا کریمی", role: "بنیان‌گذار فین‌پی", text: "تیم ماهیر در کمتر از یک هفته اول لانچ، ۵۰۰۰ کاربر برامون جذب کرد.믿 믿으기가 힘들어요!", avatar: "ر" },
    { name: "مینا صادقی", role: "مدیر بازاریابی دیجی‌استایل", text: "استراتژی رشد ماهیر فروش ما رو در ۶ ماه ۱۱۵٪ افزایش داد. حرفه‌ای‌ترین تیمی بود که دیدم.", avatar: "م" },
  ],
  en: [
    { name: "Sara Ahmadi", role: "Manager, Rosetta Café", text: "After working with Mahir, our sales grew 40%. Our new brand identity became completely distinctive.", avatar: "S" },
    { name: "Reza Karimi", role: "Founder, FinPay", text: "Mahir's team acquired 5,000 users in our first launch week. Hard to believe but true!", avatar: "R" },
    { name: "Mina Sadeghi", role: "Marketing Director, DigiStyle", text: "Mahir's growth strategy increased our sales 115% in 6 months. The most professional team I've worked with.", avatar: "M" },
  ],
};

function Testimonials() {
  const { lang, isRtl } = useLang();
  const items = (TESTIMONIALS as Record<string, typeof TESTIMONIALS.fa>)[lang] ?? TESTIMONIALS.fa;
  return (
    <section className="py-24 px-6 w-full max-w-6xl mx-auto">
      <div className="text-center mb-14">
        <p className="text-xs font-bold tracking-[0.25em] mb-3" style={{ color: "rgba(79,110,255,0.6)" }}>✦ TESTIMONIALS</p>
        <h2 className="font-extrabold" style={{ fontSize: "clamp(1.8rem,4vw,3rem)" }}>
          <span className="c-fg">{isRtl ? "مشتریان " : "What Clients "}</span>
          <span className="text-shimmer">{isRtl ? "می‌گویند" : "Say"}</span>
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((t, i) => (
          <div key={i} className="card-glow rounded-2xl p-7 flex flex-col gap-4">
            <div className="flex gap-1 mb-1">
              {[...Array(5)].map((_, s) => <span key={s} className="text-[#2563EB] text-sm">★</span>)}
            </div>
            <p className="text-sm leading-relaxed c-fg2 flex-1">"{t.text}"</p>
            <div className="flex items-center gap-3 pt-3" style={{ borderTop: "1px solid var(--border)" }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center font-extrabold text-sm flex-shrink-0"
                style={{ background: "rgba(79,110,255,0.15)", color: "#2563EB" }}>{t.avatar}</div>
              <div>
                <p className="font-bold text-sm c-fg">{t.name}</p>
                <p className="text-xs c-fg3">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Contact Form ──────────────────────────────────────────
function ContactForm() {
  const { lang, isRtl } = useLang();
  const [form, setForm] = useState({ name: "", phone: "", msg: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function submit() {
    if (!form.name || !form.phone || !form.msg) return;
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, phone: form.phone, message: form.msg }),
      });
      if (res.ok) setSent(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="py-24 px-6 w-full max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <p className="text-xs font-bold tracking-[0.25em] mb-3" style={{ color: "rgba(79,110,255,0.6)" }}>✦ CONTACT</p>
        <h2 className="font-extrabold" style={{ fontSize: "clamp(1.8rem,4vw,3rem)" }}>
          <span className="c-fg">{isRtl ? "تماس " : "Get in "}</span>
          <span className="text-shimmer">{isRtl ? "با ما" : "Touch"}</span>
        </h2>
        <p className="text-sm c-fg2 mt-3">{isRtl ? "تیم ما در کمتر از ۲۴ ساعت پاسخ می‌دهد" : "Our team responds within 24 hours"}</p>
      </div>

      {sent ? (
        <div className="text-center rounded-2xl p-10 card-glow">
          <div className="text-5xl mb-4">🎉</div>
          <h3 className="font-extrabold text-xl text-[#2563EB] mb-2">{isRtl ? "پیام دریافت شد!" : "Message Received!"}</h3>
          <p className="text-sm c-fg2">{isRtl ? "به زودی با شما تماس می‌گیریم." : "We'll contact you shortly."}</p>
        </div>
      ) : (
        <div className="card-glow rounded-2xl p-8 flex flex-col gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="text-xs font-semibold c-fg2 mb-2 block">{isRtl ? "نام شما" : "Your Name"}</label>
              <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder={isRtl ? "مثلاً: علی محمدی" : "e.g. John Smith"}
                className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none transition-all"
                style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--fg)" }} />
            </div>
            <div>
              <label className="text-xs font-semibold c-fg2 mb-2 block">{isRtl ? "شماره موبایل" : "Phone Number"}</label>
              <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                placeholder="09123456789" dir="ltr"
                className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none transition-all"
                style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--fg)" }} />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold c-fg2 mb-2 block">{isRtl ? "پیام شما" : "Your Message"}</label>
            <textarea value={form.msg} onChange={e => setForm({ ...form, msg: e.target.value })}
              placeholder={isRtl ? "کسب‌وکار شما چیه و چه کمکی نیاز دارید؟" : "Tell us about your business..."}
              rows={4}
              className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none transition-all resize-none"
              style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--fg)" }} />
          </div>
          <button onClick={submit} disabled={loading}
            className="w-full py-4 rounded-xl font-extrabold text-sm transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
            style={{ background: "#2563EB", color: "#03050C", boxShadow: "0 0 30px rgba(79,110,255,0.25)" }}>
            {loading ? "در حال ارسال..." : isRtl ? "ارسال پیام ←" : "Send Message →"}
          </button>
        </div>
      )}
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────
function Footer() {
  const { lang, isRtl } = useLang();
  const tx = (t as Record<string, typeof t.fa>)[lang] ?? t.fa;

  const cols = isRtl
    ? [
        {
          title: "خدمات",
          items: [
            { label: "استراتژی رشد", href: "#services" },
            { label: "هویت برند", href: "#services" },
            { label: "بازاریابی دیجیتال", href: "#services" },
            { label: "هوش مصنوعی", href: "#services" },
          ],
        },
        {
          title: "شرکت",
          items: [
            { label: "درباره ما", href: "/about" },
            { label: "نمونه‌کارها", href: "/portfolio" },
            { label: "بلاگ", href: "/blog" },
            { label: "قیمت‌ها", href: "/pricing" },
          ],
        },
        {
          title: "تماس",
          items: [
            { label: "hello@mahir.ir", href: "mailto:hello@mahir.ir" },
            { label: "اینستاگرام", href: "#" },
            { label: "لینکدین", href: "#" },
            { label: "مشاوره رایگان", href: "/consult" },
          ],
        },
      ]
    : [
        {
          title: "Services",
          items: [
            { label: "Growth Strategy", href: "#services" },
            { label: "Brand Identity", href: "#services" },
            { label: "Digital Marketing", href: "#services" },
            { label: "AI Solutions", href: "#services" },
          ],
        },
        {
          title: "Company",
          items: [
            { label: "About Us", href: "/about" },
            { label: "Portfolio", href: "/portfolio" },
            { label: "Blog", href: "/blog" },
            { label: "Pricing", href: "/pricing" },
          ],
        },
        {
          title: "Contact",
          items: [
            { label: "hello@mahir.ir", href: "mailto:hello@mahir.ir" },
            { label: "Instagram", href: "#" },
            { label: "LinkedIn", href: "#" },
            { label: "Free Consult", href: "/consult" },
          ],
        },
      ];

  return (
    <footer className="w-full relative overflow-hidden" dir={isRtl ? "rtl" : "ltr"}
      style={{ background: "#040810" }}>

      {/* Big watermark text */}
      <div className="pointer-events-none absolute inset-0 flex items-end justify-center overflow-hidden select-none"
        aria-hidden>
        <span className="font-black leading-none"
          style={{
            fontSize: "clamp(6rem,22vw,18rem)",
            color: "rgba(91,156,246,0.025)",
            letterSpacing: "-0.04em",
            marginBottom: "-0.15em",
            fontFamily: "inherit",
          }}>
          {isRtl ? "ماهیر" : "MAHIR"}
        </span>
      </div>

      {/* Top CTA band */}
      <div className="relative border-b" style={{ borderColor: "rgba(91,156,246,0.08)" }}>
        <div className="max-w-6xl mx-auto px-6 py-14 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand mark */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{
                background: "linear-gradient(135deg,rgba(91,156,246,0.2),rgba(37,99,235,0.1))",
                border: "1.5px solid rgba(91,156,246,0.35)",
                boxShadow: "0 0 30px rgba(91,156,246,0.15)",
              }}>
              <MahirLogo size={32} />
            </div>
            <div>
              <div className="text-3xl font-black tracking-widest leading-none" style={{ color: "#5B9CF6" }}>
                {tx.brand}
              </div>
              <div className="text-xs font-semibold tracking-widest mt-1" style={{ color: "rgba(91,156,246,0.45)" }}>
                {isRtl ? "شریک رشد کسب‌وکار" : "Business Growth Partner"}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col items-center md:items-end gap-3">
            <p className="text-sm font-medium text-center md:text-end" style={{ color: "rgba(216,229,245,0.4)" }}>
              {isRtl ? "آماده شروع هستید؟" : "Ready to grow?"}
            </p>
            <Link href="/consult"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl font-extrabold text-sm transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(91,156,246,0.5)]"
              style={{ background: "linear-gradient(135deg,#5B9CF6,#2563EB)", color: "#fff", boxShadow: "0 0 24px rgba(91,156,246,0.3)" }}>
              {isRtl ? "مشاوره رایگان ←" : "Start Free Consultation →"}
            </Link>
          </div>
        </div>
      </div>

      {/* Link columns */}
      <div className="relative max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-3 gap-10 border-b"
        style={{ borderColor: "rgba(91,156,246,0.06)" }}>
        {cols.map(col => (
          <div key={col.title}>
            <h3 className="text-xs font-extrabold tracking-[0.2em] uppercase mb-5"
              style={{ color: "rgba(91,156,246,0.6)" }}>
              {col.title}
            </h3>
            <ul className="flex flex-col gap-3">
              {col.items.map(item => (
                <li key={item.label}>
                  {item.href.startsWith("#") ? (
                    <a href={item.href}
                      onClick={e => { e.preventDefault(); document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" }); }}
                      className="text-sm transition-colors duration-200 hover:text-[#5B9CF6] cursor-pointer"
                      style={{ color: "rgba(216,229,245,0.4)" }}>
                      {item.label}
                    </a>
                  ) : (
                    <Link href={item.href}
                      className="text-sm transition-colors duration-200 hover:text-[#5B9CF6]"
                      style={{ color: "rgba(216,229,245,0.4)" }}>
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="relative max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs"
        style={{ color: "rgba(216,229,245,0.22)" }}>
        <span>{tx.footerR}</span>
        <span>{isRtl ? "ساخته شده با ❤ در ایران" : "Made with ❤ in Iran"}</span>
      </div>
    </footer>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center grid-bg" style={{ background: "var(--bg)" }}>
      <Navbar />
      <Hero />
      <Stats />
      <Services />
      <Portfolio />
      <Testimonials />
      <Team />
      <ConsultCTA />
      <About />
      <ContactForm />
      <Footer />
      <ScrollToTop />
    </div>
  );
}
