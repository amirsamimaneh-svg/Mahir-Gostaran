"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import IdeaCard from "@/components/IdeaCard";
import ScrollToTop from "@/components/ScrollToTop";
import Marquee from "@/components/Marquee";
import Counter from "@/components/Counter";
import { LangProvider, useLang } from "@/context/LangContext";

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
    sub: "ماهیر با ترکیب استراتژی، هویت برند و هوش مصنوعی، مسیر رشد کسب‌وکار شما را هموار می‌کند.",
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
    sub: "Mahir combines strategy, brand identity, and AI to pave the way for your business growth.",
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
function ThemeToggle({ dark, setDark }: { dark: boolean; setDark: (v: boolean) => void }) {
  return (
    <button onClick={() => setDark(!dark)}
      className="w-9 h-9 rounded-lg flex items-center justify-center text-base transition-all hover:scale-110 bg-card"
      title={dark ? "حالت روشن" : "حالت تاریک"}>
      {dark ? "🌙" : "☀️"}
    </button>
  );
}

// ── Navbar ────────────────────────────────────────────────
function Navbar({ dark, setDark }: { dark: boolean; setDark: (v: boolean) => void }) {
  const { lang, toggle } = useLang();
  const tx = t[lang];
  const [user, setUser] = useState<{ name: string; unread: number } | null>(null);

  useEffect(() => {
    fetch("/api/auth/me").then(r => r.json()).then(d => {
      if (d.user) setUser({ name: d.user.name, unread: d.user.unread ?? 0 });
    }).catch(() => {});
  }, []);

  return (
    <nav className="fixed top-0 inset-x-0 z-50 anim-slide-down"
      style={{ background: "var(--nav-bg)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--nav-border)" }}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12 py-4">
        <span className="text-xl font-extrabold text-amber-400 tracking-widest">{tx.brand}</span>
        <ul className="hidden md:flex gap-10 text-sm">
          {tx.nav.map(item => (
            <li key={item.label}>
              <a href={item.href} onClick={e => { e.preventDefault(); go(item.href); }}
                className="c-fg2 hover:text-amber-400 transition-colors relative group">
                {item.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-amber-400 group-hover:w-full transition-all duration-300" />
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <ThemeToggle dark={dark} setDark={setDark} />
          <button onClick={toggle}
            className="text-xs font-bold px-3 py-2 rounded-lg bg-card c-fg3 hover:text-amber-400 transition-all">
            {tx.langBtn}
          </button>
          {user ? (
            <Link href="/profile"
              className="relative flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-xl transition-all hover:scale-105"
              style={{ background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.3)", color: "#fbbf24" }}>
              <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-extrabold"
                style={{ background: "rgba(251,191,36,0.25)" }}>{user.name.charAt(0)}</span>
              {user.name}
              {user.unread > 0 && (
                <span className="absolute -top-1 -left-1 w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: "#ef4444", color: "#fff" }}>{user.unread}</span>
              )}
            </Link>
          ) : (
            <Link href="/login"
              className="text-sm font-bold px-5 py-2 rounded-xl transition-all hover:scale-105"
              style={{ background: "#fbbf24", color: "#111" }}>
              {tx.consultBtn}
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

// ── Hero ──────────────────────────────────────────────────
function Hero() {
  const { lang } = useLang();
  const tx = t[lang];
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center
      overflow-hidden pt-20 pb-0 text-center">
      {/* blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="anim-blob d1 absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full blur-[160px]"
          style={{ background: "rgba(251,191,36,0.08)" }} />
        <div className="anim-blob d5 absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full blur-[160px]"
          style={{ background: "rgba(99,102,241,0.08)" }} />
        <div className="anim-blob d3 absolute top-1/2 left-1/3 w-[500px] h-[500px] rounded-full blur-[140px]"
          style={{ background: "rgba(139,92,246,0.06)" }} />
      </div>
      {/* particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 18 }).map((_, i) => (
          <span key={i} className="absolute rounded-full anim-blob"
            style={{ width: `${2+(i%4)}px`, height: `${2+(i%4)}px`,
              top: `${5+(i*4.7)%88}%`, left: `${3+(i*5.1)%94}%`,
              background: "rgba(251,191,36,0.2)",
              animationDelay: `${i*0.4}s`, animationDuration: `${5+(i%5)*1.5}s` }} />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 flex flex-col items-center">
        {/* badge */}
        <div className="anim-fade-up d1 mb-8 inline-flex items-center gap-2 rounded-full px-5 py-2"
          style={{ background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.25)" }}>
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-xs font-medium text-amber-300 tracking-widest">{tx.badge}</span>
        </div>

        {/* headline */}
        <h1 className="anim-fade-up d2 font-extrabold tracking-tight mb-6"
          style={{ fontSize: "clamp(2.2rem,6vw,5rem)", lineHeight: 1.15 }}>
          <span className="c-fg">{tx.h1} </span>
          <span className="text-shimmer">{tx.h1b}</span>
        </h1>

        <p className="anim-fade-up d3 c-fg2 text-base md:text-lg max-w-xl mb-10 leading-relaxed">{tx.sub}</p>

        {/* CTAs */}
        <div className="anim-fade-up d4 flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <a href="#services" onClick={e => { e.preventDefault(); go("#services"); }}
            className="px-8 py-4 rounded-xl font-bold text-sm transition-all hover:scale-105"
            style={{ background: "#fbbf24", color: "#111", boxShadow: "0 0 40px rgba(251,191,36,0.3)" }}>
            {tx.cta1}
          </a>
          <Link href="/consult"
            className="px-8 py-4 rounded-xl font-bold text-sm transition-all hover:scale-105 bg-card"
            style={{ color: "#fbbf24", border: "1px solid rgba(251,191,36,0.3)" }}>
            {tx.cta2}
          </Link>
        </div>

        {/* AI card */}
        <div className="anim-scale-in d5 anim-float w-full max-w-lg mx-auto">
          <IdeaCard lang={lang} />
        </div>

        {/* scroll hint */}
        <div className="anim-fade-in d9 mt-10 flex flex-col items-center gap-1 c-fg3">
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
function Stats() {
  const { lang } = useLang();
  const tx = t[lang];
  return (
    <section className="py-20 px-6 w-full max-w-6xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {tx.stats.map(s => (
          <div key={s.label} className="card-glow rounded-2xl p-7 text-center">
            <Counter target={s.target} suffix={s.suffix} />
            <p className="text-xs mt-2 c-fg3">{s.label}</p>
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
    <section id="services" className="py-24 px-6 w-full max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="font-extrabold mb-3" style={{ fontSize: "clamp(2rem,5vw,3.5rem)" }}>
          <span className="c-fg">{tx.servTitle} </span>
          <span className="text-shimmer">{tx.servBrand}</span>
        </h2>
        <p className="max-w-sm mx-auto text-sm c-fg3">{tx.servSub}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {tx.services.map(s => (
          <div key={s.title} className="card-glow rounded-2xl p-8 text-center group">
            <div className="text-4xl mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
              {s.icon}
            </div>
            <h3 className="font-bold mb-2 c-fg">{s.title}</h3>
            <p className="text-sm leading-relaxed c-fg2">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Portfolio ─────────────────────────────────────────────
function Portfolio() {
  const { lang } = useLang();
  const isRtl = lang === "fa";
  // import inline to keep page.tsx self-contained
  const items = [
    { slug: "brand-identity-cafe",      emoji: "☕", color: "#d97706", category_fa: "هویت برند",        category_en: "Brand Identity",     title_fa: "کافه رزتا",        title_en: "Rosetta Café",      result_fa: "۴۰٪ رشد مشتری",       result_en: "40% growth" },
    { slug: "growth-strategy-ecommerce",emoji: "📈", color: "#7c3aed", category_fa: "استراتژی رشد",     category_en: "Growth Strategy",    title_fa: "دیجی‌استایل",      title_en: "DigiStyle",         result_fa: "۱۱۵٪ رشد فروش",      result_en: "115% sales growth" },
    { slug: "ai-automation-clinic",     emoji: "🤖", color: "#0891b2", category_fa: "هوش مصنوعی",       category_en: "AI Solutions",       title_fa: "کلینیک دکتر سپهری",title_en: "Dr. Sepehri Clinic",result_fa: "۶۵٪ کاهش تماس",      result_en: "65% fewer calls" },
    { slug: "digital-marketing-restaurant",emoji:"🍽️",color:"#dc2626",category_fa:"بازاریابی دیجیتال",category_en:"Digital Marketing",   title_fa: "رستوران آرارات",   title_en: "Ararat Restaurant", result_fa: "از ۸۰۰ به ۱۲k فالوور",result_en: "800→12k followers" },
    { slug: "brand-strategy-startup",   emoji: "💳", color: "#059669", category_fa: "استراتژی برند",    category_en: "Brand Strategy",     title_fa: "استارتاپ فین‌پی",  title_en: "FinPay Startup",    result_fa: "۵,۰۰۰ کاربر هفته اول",result_en: "5k users week 1" },
    { slug: "seo-real-estate",          emoji: "🏠", color: "#ea580c", category_fa: "سئو و محتوا",      category_en: "SEO & Content",      title_fa: "مشاور املاک آریا", title_en: "Arya Real Estate",  result_fa: "صفحه اول گوگل ۳۸ کلمه",result_en: "38 keywords page 1" },
  ];

  return (
    <section id="portfolio" className="py-24 px-6 w-full max-w-6xl mx-auto">
      <div className="text-center mb-14">
        <h2 className="font-extrabold mb-3" style={{ fontSize: "clamp(2rem,5vw,3.5rem)" }}>
          <span className="c-fg">{isRtl ? "نمونه‌" : "Our "}</span>
          <span className="text-shimmer">{isRtl ? "کارها" : "Portfolio"}</span>
        </h2>
        <p className="max-w-sm mx-auto text-sm c-fg3">
          {isRtl ? "پروژه‌هایی که نتیجه واقعی ساختند" : "Projects that delivered real results"}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        {items.map(p => (
          <Link key={p.slug} href={`/portfolio/${p.slug}?lang=${lang}`}
            className="group relative rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <div className="h-1" style={{ background: p.color }} />
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <span className="text-3xl">{p.emoji}</span>
                <span className="text-xs px-2 py-1 rounded-full font-medium"
                  style={{ background: `${p.color}18`, color: p.color, border: `1px solid ${p.color}30` }}>
                  {isRtl ? p.category_fa : p.category_en}
                </span>
              </div>
              <h3 className="font-bold mb-3 c-fg">{isRtl ? p.title_fa : p.title_en}</h3>
              <div className="flex items-center justify-between pt-3" style={{ borderTop: "1px solid var(--border)" }}>
                <span className="text-xs font-bold" style={{ color: p.color }}>
                  ✦ {isRtl ? p.result_fa : p.result_en}
                </span>
                <span className="text-xs c-fg3 transition-transform group-hover:translate-x-1">{isRtl ? "←" : "→"}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center">
        <Link href="/portfolio"
          className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-bold text-sm transition-all hover:scale-105"
          style={{ border: "1px solid rgba(251,191,36,0.35)", color: "#fbbf24" }}>
          {isRtl ? "مشاهده همه پروژه‌ها ←" : "View All Projects →"}
        </Link>
      </div>
    </section>
  );
}

// ── Consult CTA ───────────────────────────────────────────
function ConsultCTA() {
  const { lang } = useLang();
  const tx = t[lang];
  return (
    <section className="py-20 px-6 w-full max-w-5xl mx-auto">
      <div className="relative rounded-3xl overflow-hidden text-center p-12 md:p-20 card-glow">
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-[100px]"
          style={{ background: "rgba(251,191,36,0.1)" }} />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6"
            style={{ background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.25)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-xs text-amber-300 tracking-widest">AI Powered</span>
          </div>
          <h2 className="font-extrabold mb-4" style={{ fontSize: "clamp(1.8rem,4vw,3rem)" }}>
            <span className="c-fg">{tx.consultTitle} </span>
            <span className="text-shimmer">{tx.consultBrand}</span>
          </h2>
          <p className="max-w-md mx-auto text-sm leading-relaxed mb-8 c-fg2">{tx.consultDesc}</p>
          <Link href="/consult"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-xl font-bold text-sm
              transition-all hover:scale-105"
            style={{ background: "#fbbf24", color: "#111", boxShadow: "0 0 50px rgba(251,191,36,0.35)" }}>
            {tx.consultCta}
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

// ── Footer ────────────────────────────────────────────────
function Footer() {
  const { lang } = useLang();
  const tx = t[lang];
  return (
    <footer id="contact" className="py-10 px-6 w-full max-w-6xl mx-auto"
      style={{ borderTop: "1px solid var(--border)" }}>
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm c-fg3">
        <span className="font-extrabold text-amber-400 text-lg tracking-widest">{tx.brand}</span>
        <div className="flex gap-6">
          <a href="mailto:hello@mahir.ir" className="hover:text-amber-400 transition-colors">hello@mahir.ir</a>
          <a href="#" className="hover:text-amber-400 transition-colors">{tx.footerIg}</a>
          <a href="#" className="hover:text-amber-400 transition-colors">{tx.footerLi}</a>
        </div>
        <span>{tx.footerR}</span>
      </div>
    </footer>
  );
}

// ── Root ──────────────────────────────────────────────────
function PageContent() {
  const [dark, setDark] = useState(true);
  const { setLang } = useLang();

  useEffect(() => {
    document.body.classList.toggle("light", !dark);
  }, [dark]);

  function handlePrefs(prefs: { theme: "dark" | "light"; lang: "fa" | "en" }) {
    setDark(prefs.theme === "dark");
    setLang(prefs.lang);
  }

  return (
    <div className="min-h-screen flex flex-col items-center grid-bg" style={{ background: "var(--bg)" }}>
      <Navbar dark={dark} setDark={setDark} />
      <Hero />
      <Stats />
      <Services />
      <Portfolio />
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
