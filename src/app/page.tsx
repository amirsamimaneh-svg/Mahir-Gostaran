"use client";

import IdeaCard from "@/components/IdeaCard";
import { LangProvider, useLang } from "@/context/LangContext";

// ————————————————————————————————
// Translations
// ————————————————————————————————
const t = {
  fa: {
    brand: "ماهیر",
    nav: [
      { label: "خدمات", href: "#services" },
      { label: "نمونه‌کارها", href: "#portfolio" },
      { label: "درباره ما", href: "#about" },
      { label: "تماس", href: "#contact" },
    ],
    cta: "مشاوره رایگان",
    badge: "✦ شریک هوشمند رشد کسب‌وکار شما",
    heroTitle1: "از ایده تا",
    heroTitle2: "رشد واقعی",
    heroSub:
      "ماهیر با ترکیب استراتژی، هویت برند و هوش مصنوعی، مسیر رشد کسب‌وکار شما را هموار می‌کند.",
    heroCta1: "خدمات ما را ببینید",
    heroCta2: "مشاوره رایگان بگیرید",
    servicesTitle: "خدمات",
    servicesBrand: "ماهیر",
    servicesSub: "راه‌حل‌های جامع برای هر مرحله از مسیر رشد کسب‌وکار شما",
    services: [
      { icon: "🎯", title: "استراتژی رشد", desc: "تحلیل بازار، شناخت رقبا و طراحی نقشه‌راه رشد متناسب با کسب‌وکار شما." },
      { icon: "✦", title: "هویت برند", desc: "خلق هویت بصری و کلامی منسجم که در ذهن مخاطبان ماندگار می‌شود." },
      { icon: "📱", title: "بازاریابی دیجیتال", desc: "کمپین‌های هدفمند در شبکه‌های اجتماعی، SEO و تبلیغات آنلاین با بازگشت سرمایه شفاف." },
      { icon: "🤖", title: "راه‌حل‌های هوش مصنوعی", desc: "پیاده‌سازی ابزارهای AI برای خودکارسازی فرآیندها و شخصی‌سازی تجربه مشتری." },
    ],
    aboutTitle: "چرا",
    aboutBrand: "ماهیر",
    aboutDesc:
      "ماهیر با تیمی از متخصصان استراتژی، طراحی و فناوری، به کسب‌وکارهای ایرانی کمک می‌کند تا با هویتی قوی و استراتژی هوشمند، در بازار رقابتی امروز متمایز شوند. ما به نتیجه اعتقاد داریم، نه فقط به فرآیند.",
    stats: [
      { num: "+۵۰", label: "کسب‌وکار موفق" },
      { num: "+۸۰٪", label: "رشد میانگین" },
      { num: "۳ سال", label: "تجربه" },
    ],
    footerInstagram: "اینستاگرام",
    footerLinkedin: "لینکدین",
    footerRights: "© ۱۴۰۴ ماهیر. تمامی حقوق محفوظ است.",
    langBtn: "EN",
  },
  en: {
    brand: "Mahir",
    nav: [
      { label: "Services", href: "#services" },
      { label: "Portfolio", href: "#portfolio" },
      { label: "About", href: "#about" },
      { label: "Contact", href: "#contact" },
    ],
    cta: "Free Consultation",
    badge: "✦ Your Smart Business Growth Partner",
    heroTitle1: "From Idea to",
    heroTitle2: "Real Growth",
    heroSub:
      "Mahir combines strategy, brand identity, and AI to pave the way for your business growth.",
    heroCta1: "See Our Services",
    heroCta2: "Get Free Consultation",
    servicesTitle: "Our",
    servicesBrand: "Services",
    servicesSub: "Comprehensive solutions for every stage of your business growth journey",
    services: [
      { icon: "🎯", title: "Growth Strategy", desc: "Market analysis, competitor research, and a tailored growth roadmap for your business." },
      { icon: "✦", title: "Brand Identity", desc: "Creating a cohesive visual and verbal identity that stays in your audience's memory." },
      { icon: "📱", title: "Digital Marketing", desc: "Targeted campaigns on social media, SEO, and online ads with transparent ROI." },
      { icon: "🤖", title: "AI Solutions", desc: "Implementing AI tools to automate processes and personalize customer experience." },
    ],
    aboutTitle: "Why",
    aboutBrand: "Mahir?",
    aboutDesc:
      "Mahir's team of strategy, design, and technology experts helps Iranian businesses stand out in today's competitive market with a strong identity and smart strategy. We believe in results, not just process.",
    stats: [
      { num: "50+", label: "Successful Businesses" },
      { num: "80%+", label: "Average Growth" },
      { num: "3 Years", label: "Experience" },
    ],
    footerInstagram: "Instagram",
    footerLinkedin: "LinkedIn",
    footerRights: "© 2025 Mahir. All rights reserved.",
    langBtn: "فا",
  },
};

// ————————————————————————————————
// Navbar
// ————————————————————————————————
function Navbar() {
  const { lang, toggle } = useLang();
  const tx = t[lang];

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-12 py-4
        bg-[#07071a]/80 backdrop-blur-md border-b border-white/5"
    >
      <span className="text-xl font-bold text-amber-400 tracking-wide">{tx.brand}</span>

      <ul className="hidden md:flex gap-8 text-sm text-white/70">
        {tx.nav.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              onClick={(e) => handleNav(e, item.href)}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-3">
        {/* Language toggle */}
        <button
          onClick={toggle}
          className="text-xs font-bold px-3 py-1.5 rounded-lg border border-white/20
            text-white/60 hover:border-amber-400/50 hover:text-amber-400 transition-all"
        >
          {tx.langBtn}
        </button>

        <a
          href="mailto:hello@mahir.ir"
          className="text-sm font-semibold px-4 py-2 rounded-lg border border-amber-400/60
            text-amber-400 hover:bg-amber-400 hover:text-gray-900 transition-all"
        >
          {tx.cta}
        </a>
      </div>
    </nav>
  );
}

// ————————————————————————————————
// Hero
// ————————————————————————————————
function Hero() {
  const { lang } = useLang();
  const tx = t[lang];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center
      overflow-hidden pt-24 pb-16 px-4 text-center">

      {/* Ambient blobs */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full
          bg-amber-500/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full
          bg-indigo-600/10 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-[600px] h-[600px] rounded-full bg-purple-900/10 blur-[160px]" />
      </div>

      {/* Badge */}
      <span className="mb-6 inline-flex items-center gap-2 rounded-full
        bg-amber-400/10 border border-amber-400/30 px-4 py-1.5
        text-xs font-medium text-amber-300 tracking-wider">
        {tx.badge}
      </span>

      {/* Headline */}
      <h1 className="text-4xl md:text-6xl font-extrabold leading-tight
        tracking-tight text-white max-w-3xl mb-4 mx-auto">
        {tx.heroTitle1}{" "}
        <span className="text-amber-400">{tx.heroTitle2}</span>
      </h1>

      <p className="text-white/60 text-base md:text-lg max-w-xl mb-10 leading-relaxed mx-auto">
        {tx.heroSub}
      </p>

      {/* AI Card */}
      <IdeaCard lang={lang} />

      {/* CTA buttons */}
      <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href="#services"
          onClick={(e) => { e.preventDefault(); document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" }); }}
          className="px-6 py-3 rounded-xl bg-amber-400 text-gray-900 font-bold
            hover:bg-amber-300 transition-all text-sm"
        >
          {tx.heroCta1}
        </a>
        <a
          href="mailto:hello@mahir.ir"
          className="px-6 py-3 rounded-xl border border-white/20 text-white/80
            hover:border-amber-400/50 hover:text-amber-400 transition-all text-sm"
        >
          {tx.heroCta2}
        </a>
      </div>
    </section>
  );
}

// ————————————————————————————————
// Services
// ————————————————————————————————
function Services() {
  const { lang } = useLang();
  const tx = t[lang];

  return (
    <section id="services" className="py-24 px-4 md:px-12 max-w-6xl mx-auto w-full">
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
          {tx.servicesTitle} <span className="text-amber-400">{tx.servicesBrand}</span>
        </h2>
        <p className="text-white/50 max-w-md mx-auto text-sm">{tx.servicesSub}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {tx.services.map((s) => (
          <div
            key={s.title}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center
              hover:border-amber-400/40 hover:bg-white/8 transition-all duration-300"
          >
            <div className="text-3xl mb-4">{s.icon}</div>
            <h3 className="font-bold text-white mb-2 text-base">{s.title}</h3>
            <p className="text-white/50 text-sm leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ————————————————————————————————
// About
// ————————————————————————————————
function About() {
  const { lang } = useLang();
  const tx = t[lang];

  return (
    <section id="about" className="py-24 px-4 md:px-12 max-w-4xl mx-auto w-full">
      <div className="rounded-3xl bg-white/5 border border-white/10 p-10 md:p-14 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          {tx.aboutTitle} <span className="text-amber-400">{tx.aboutBrand}</span>
        </h2>
        <p className="text-white/60 leading-relaxed text-base max-w-2xl mx-auto">
          {tx.aboutDesc}
        </p>
        <div className="mt-10 grid grid-cols-3 gap-6">
          {tx.stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl md:text-3xl font-extrabold text-amber-400">{stat.num}</div>
              <div className="text-white/50 text-xs mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ————————————————————————————————
// Footer
// ————————————————————————————————
function Footer() {
  const { lang } = useLang();
  const tx = t[lang];

  return (
    <footer
      id="contact"
      className="border-t border-white/5 py-10 px-6 md:px-12 max-w-6xl mx-auto w-full"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40">
        <span className="font-bold text-amber-400 text-base">{tx.brand}</span>
        <div className="flex gap-6">
          <a href="mailto:hello@mahir.ir" className="hover:text-amber-400 transition-colors">
            hello@mahir.ir
          </a>
          <a href="#" className="hover:text-amber-400 transition-colors">{tx.footerInstagram}</a>
          <a href="#" className="hover:text-amber-400 transition-colors">{tx.footerLinkedin}</a>
        </div>
        <span>{tx.footerRights}</span>
      </div>
    </footer>
  );
}

// ————————————————————————————————
// Page
// ————————————————————————————————
function PageContent() {
  return (
    <div className="min-h-screen bg-[#07071a] flex flex-col items-center">
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Footer />
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
