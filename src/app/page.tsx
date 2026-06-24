"use client";

import Link from "next/link";
import IdeaCard from "@/components/IdeaCard";
import ScrollToTop from "@/components/ScrollToTop";
import Marquee from "@/components/Marquee";
import Counter from "@/components/Counter";
import CustomCursor from "@/components/CustomCursor";
import { LangProvider, useLang } from "@/context/LangContext";

// ── translations ─────────────────────────────────────────
const t = {
  fa: {
    brand: "ماهیر",
    nav: [
      { label: "خدمات",      href: "#services" },
      { label: "نمونه‌کارها", href: "#portfolio" },
      { label: "درباره ما",   href: "#about" },
      { label: "تماس",       href: "#contact" },
    ],
    cta: "مشاوره رایگان",
    badge: "شریک هوشمند رشد کسب‌وکار شما",
    h1a: "از ایده",
    h1b: "تا رشد",
    h1c: "واقعی",
    sub: "ماهیر با ترکیب استراتژی، هویت برند و هوش مصنوعی، مسیر رشد کسب‌وکار شما را هموار می‌کند.",
    cta1: "خدمات ما",
    cta2: "مشاوره هوشمند",
    consultTitle: "مشاوره", consultBrand: "اختصاصی",
    consultDesc: "با پاسخ به ۳ سوال کوتاه، یک راهکار رشد کاملاً شخصی‌سازی‌شده برای کسب‌وکارت دریافت کن.",
    consultBtn: "شروع مشاوره رایگان ←",
    servTitle: "خدمات", servBrand: "ماهیر",
    servSub: "راه‌حل‌های جامع برای هر مرحله از مسیر رشد",
    services: [
      { icon: "🎯", title: "استراتژی رشد",           desc: "تحلیل بازار، شناخت رقبا و طراحی نقشه‌راه رشد متناسب با کسب‌وکار شما." },
      { icon: "✦",  title: "هویت برند",              desc: "خلق هویت بصری و کلامی منسجم که در ذهن مخاطبان ماندگار می‌شود." },
      { icon: "📱", title: "بازاریابی دیجیتال",      desc: "کمپین‌های هدفمند در شبکه‌های اجتماعی، SEO و تبلیغات آنلاین." },
      { icon: "🤖", title: "هوش مصنوعی",            desc: "پیاده‌سازی ابزارهای AI برای خودکارسازی فرآیندها و شخصی‌سازی تجربه مشتری." },
    ],
    stats: [
      { target: 50,  suffix: "+",  label: "کسب‌وکار موفق" },
      { target: 80,  suffix: "%+", label: "رشد میانگین" },
      { target: 3,   suffix: "",   label: "سال تجربه" },
      { target: 120, suffix: "+",  label: "پروژه تحویل‌شده" },
    ],
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
    cta: "Free Consultation",
    badge: "Your Smart Business Growth Partner",
    h1a: "From",
    h1b: "Idea to",
    h1c: "Real Growth",
    sub: "Mahir combines strategy, brand identity, and AI to pave the way for your business growth.",
    cta1: "Our Services",
    cta2: "AI Consultation",
    consultTitle: "Personalized", consultBrand: "Consultation",
    consultDesc: "Answer 3 quick questions and receive a fully personalized growth strategy for your business.",
    consultBtn: "Start Free Consultation →",
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

// ── Navbar ────────────────────────────────────────────────
function Navbar() {
  const { lang, toggle } = useLang();
  const tx = t[lang];
  return (
    <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between
      px-6 md:px-14 py-4 bg-[#07071a]/75 backdrop-blur-xl border-b border-white/5
      animate-slide-down">
      <span className="text-xl font-extrabold text-amber-400 tracking-widest">{tx.brand}</span>
      <ul className="hidden md:flex gap-10 text-sm text-white/60">
        {tx.nav.map((item) => (
          <li key={item.label}>
            <a href={item.href} onClick={(e) => { e.preventDefault(); go(item.href); }}
              className="hover:text-amber-400 transition-colors relative group">
              {item.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-amber-400
                group-hover:w-full transition-all duration-300" />
            </a>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-3">
        <button onClick={toggle}
          className="text-xs font-bold px-3 py-1.5 rounded-lg border border-white/15
            text-white/50 hover:border-amber-400/60 hover:text-amber-400 transition-all">
          {tx.langBtn}
        </button>
        <a href="mailto:hello@mahir.ir"
          className="text-sm font-bold px-5 py-2 rounded-xl bg-amber-400 text-gray-900
            hover:bg-amber-300 hover:scale-105 transition-all">
          {tx.cta}
        </a>
      </div>
    </nav>
  );
}

// ── Hero ──────────────────────────────────────────────────
function Hero() {
  const { lang } = useLang();
  const tx = t[lang];
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center
      overflow-hidden pt-24 pb-0 px-4 text-center">

      {/* animated blobs */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="animate-blob delay-100 absolute -top-32 -right-32 w-[600px] h-[600px]
          rounded-full bg-amber-500/10 blur-[140px]" />
        <div className="animate-blob delay-500 absolute -bottom-32 -left-32 w-[500px] h-[500px]
          rounded-full bg-indigo-600/10 blur-[140px]" />
        <div className="animate-blob delay-300 absolute top-1/3 left-1/4 w-[400px] h-[400px]
          rounded-full bg-purple-700/8 blur-[120px]" />
      </div>

      {/* floating dots */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {Array.from({ length: 16 }).map((_, i) => (
          <span key={i} className="absolute rounded-full bg-amber-400/20 animate-blob"
            style={{
              width: `${3 + (i % 3) * 2}px`,
              height: `${3 + (i % 3) * 2}px`,
              top: `${8 + (i * 5.7) % 82}%`,
              left: `${4 + (i * 6.3) % 92}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${5 + (i % 5) * 1.5}s`,
            }}
          />
        ))}
      </div>

      {/* badge */}
      <div className="animate-fade-up delay-100 mb-8 inline-flex items-center gap-2
        rounded-full bg-amber-400/8 border border-amber-400/25 px-5 py-2">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
        <span className="text-xs font-medium text-amber-300 tracking-wider">{tx.badge}</span>
      </div>

      {/* big headline */}
      <div className="animate-fade-up delay-200 mb-6">
        <p className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-none tracking-tight text-white">
          {tx.h1a}
        </p>
        <p className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-none tracking-tight text-white">
          {tx.h1b}
        </p>
        <p className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-none tracking-tight text-shimmer mt-1">
          {tx.h1c}
        </p>
      </div>

      <p className="animate-fade-up delay-300 text-white/50 text-base md:text-lg max-w-lg
        mb-10 leading-relaxed mx-auto">
        {tx.sub}
      </p>

      {/* CTA buttons */}
      <div className="animate-fade-up delay-400 flex flex-col sm:flex-row gap-4 justify-center mb-14">
        <a href="#services" onClick={(e) => { e.preventDefault(); go("#services"); }}
          className="px-8 py-3.5 rounded-xl bg-amber-400 text-gray-900 font-bold
            hover:bg-amber-300 hover:scale-105 transition-all text-sm shadow-[0_0_30px_rgba(251,191,36,0.3)]">
          {tx.cta1}
        </a>
        <Link href="/consult"
          className="px-8 py-3.5 rounded-xl border border-white/15 text-white/70
            hover:border-amber-400/50 hover:text-amber-400 transition-all text-sm">
          {tx.cta2}
        </Link>
      </div>

      {/* AI Card */}
      <div className="animate-scale-in delay-500 w-full max-w-xl mx-auto animate-float">
        <IdeaCard lang={lang} />
      </div>

      {/* scroll hint */}
      <div className="animate-fade-in delay-900 mt-12 mb-0 flex flex-col items-center gap-1 text-white/25">
        <span className="text-[10px] tracking-[0.3em] uppercase">scroll</span>
        <svg className="animate-bounce w-4 h-4" fill="none" viewBox="0 0 24 24"
          stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* marquee strip */}
      <div className="absolute bottom-0 left-0 right-0">
        <Marquee />
      </div>
    </section>
  );
}

// ── Stats ─────────────────────────────────────────────────
function Stats() {
  const { lang } = useLang();
  const tx = t[lang];
  return (
    <section className="py-20 px-4 max-w-5xl mx-auto w-full">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {tx.stats.map((s) => (
          <div key={s.label}
            className="card-glow rounded-2xl p-6 text-center">
            <Counter target={s.target} suffix={s.suffix} />
            <p className="text-white/50 text-xs mt-2">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Services ──────────────────────────────────────────────
function Services() {
  const { lang } = useLang();
  const tx = t[lang];
  return (
    <section id="services" className="py-24 px-4 md:px-12 max-w-6xl mx-auto w-full">
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-3">
          {tx.servTitle} <span className="text-shimmer">{tx.servBrand}</span>
        </h2>
        <p className="text-white/40 max-w-sm mx-auto text-sm">{tx.servSub}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {tx.services.map((s, i) => (
          <div key={s.title} className="card-glow rounded-2xl p-7 text-center"
            style={{ animationDelay: `${i * 0.08}s` }}>
            <div className="text-4xl mb-5 transition-transform duration-300 group-hover:scale-110">
              {s.icon}
            </div>
            <h3 className="font-bold text-white mb-2">{s.title}</h3>
            <p className="text-white/45 text-sm leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Consult CTA ───────────────────────────────────────────
function ConsultCTA() {
  const { lang } = useLang();
  const tx = t[lang];
  return (
    <section className="py-24 px-4 max-w-4xl mx-auto w-full">
      <div className="relative rounded-3xl overflow-hidden">
        {/* glow bg */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/15 via-amber-400/5 to-indigo-600/10" />
        <div className="absolute inset-0 border border-amber-400/20 rounded-3xl" />
        {/* blob */}
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-amber-400/10 blur-[80px]" />

        <div className="relative p-10 md:p-16 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-400/10
            border border-amber-400/25 px-4 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-xs text-amber-300 tracking-wider">AI Powered</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            {tx.consultTitle}{" "}
            <span className="text-shimmer">{tx.consultBrand}</span>
          </h2>
          <p className="text-white/50 max-w-md mx-auto text-sm leading-relaxed mb-8">
            {tx.consultDesc}
          </p>

          <Link href="/consult"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl
              bg-amber-400 text-gray-900 font-bold text-sm
              hover:bg-amber-300 hover:scale-105 transition-all
              shadow-[0_0_40px_rgba(251,191,36,0.35)]">
            {tx.consultBtn}
          </Link>
        </div>
      </div>
    </section>
  );
}

// ── About ─────────────────────────────────────────────────
function About() {
  const { lang } = useLang();
  const tx = t[lang];
  return (
    <section id="about" className="py-24 px-4 md:px-12 max-w-4xl mx-auto w-full">
      <div className="card-glow animate-glow rounded-3xl p-10 md:p-16 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-5">
          {tx.aboutTitle} <span className="text-shimmer">{tx.aboutBrand}</span>
        </h2>
        <p className="text-white/55 leading-relaxed text-base max-w-2xl mx-auto">
          {tx.aboutDesc}
        </p>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────
function Footer() {
  const { lang } = useLang();
  const tx = t[lang];
  return (
    <footer id="contact"
      className="border-t border-white/5 py-10 px-6 md:px-14 max-w-6xl mx-auto w-full">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4
        text-sm text-white/35">
        <span className="font-extrabold text-amber-400 text-lg tracking-widest">{tx.brand}</span>
        <div className="flex gap-6">
          <a href="mailto:hello@mahir.ir" className="hover:text-amber-400 transition-colors">
            hello@mahir.ir
          </a>
          <a href="#" className="hover:text-amber-400 transition-colors">{tx.footerIg}</a>
          <a href="#" className="hover:text-amber-400 transition-colors">{tx.footerLi}</a>
        </div>
        <span>{tx.footerR}</span>
      </div>
    </footer>
  );
}

// ── Page ──────────────────────────────────────────────────
function PageContent() {
  return (
    <div className="min-h-screen bg-[#07071a] flex flex-col items-center">
      <CustomCursor />
      <Navbar />
      <Hero />
      <Stats />
      <Services />
      <ConsultCTA />
      <About />
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default function HomePage() {
  return (
    <LangProvider>
      <PageContent />
    </LangProvider>
  );
}
