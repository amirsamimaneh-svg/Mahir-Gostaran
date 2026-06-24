import IdeaCard from "@/components/IdeaCard";

// ————————————————————————————————
// Nav
// ————————————————————————————————
function Navbar() {
  return (
    <nav
      dir="rtl"
      className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-12 py-4
        bg-[#07071a]/80 backdrop-blur-md border-b border-white/5"
    >
      <span className="text-xl font-bold text-amber-400 tracking-wide">ماهیر</span>
      <ul className="hidden md:flex gap-8 text-sm text-white/70">
        {["خدمات", "نمونه‌کارها", "درباره ما", "تماس"].map((item) => (
          <li key={item}>
            <a href={`#${item}`} className="hover:text-amber-400 transition-colors">
              {item}
            </a>
          </li>
        ))}
      </ul>
      <a
        href="mailto:hello@mahir.ir"
        className="text-sm font-semibold px-4 py-2 rounded-lg border border-amber-400/60
          text-amber-400 hover:bg-amber-400 hover:text-gray-900 transition-all"
      >
        مشاوره رایگان
      </a>
    </nav>
  );
}

// ————————————————————————————————
// Hero
// ————————————————————————————————
function Hero() {
  return (
    <section
      dir="rtl"
      className="relative min-h-screen flex flex-col items-center justify-center
        overflow-hidden pt-20 pb-16 px-4"
    >
      {/* Ambient background blobs */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
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
        ✦ شریک هوشمند رشد کسب‌وکار شما
      </span>

      {/* Headline */}
      <h1 className="text-center text-4xl md:text-6xl font-extrabold leading-tight
        tracking-tight text-white max-w-3xl mb-4">
        از ایده تا{" "}
        <span className="text-amber-400">رشد واقعی</span>
      </h1>

      <p className="text-center text-white/60 text-base md:text-lg max-w-xl mb-10 leading-relaxed">
        ماهیر با ترکیب استراتژی، هویت برند و هوش مصنوعی، مسیر رشد کسب‌وکار شما را
        هموار می‌کند.
      </p>

      {/* AI Idea Card */}
      <IdeaCard />

      {/* CTA buttons */}
      <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href="#services"
          className="px-6 py-3 rounded-xl bg-amber-400 text-gray-900 font-bold
            hover:bg-amber-300 transition-all text-sm text-center"
        >
          خدمات ما را ببینید
        </a>
        <a
          href="mailto:hello@mahir.ir"
          className="px-6 py-3 rounded-xl border border-white/20 text-white/80
            hover:border-amber-400/50 hover:text-amber-400 transition-all text-sm text-center"
        >
          مشاوره رایگان بگیرید
        </a>
      </div>
    </section>
  );
}

// ————————————————————————————————
// Services Section
// ————————————————————————————————
const services = [
  {
    icon: "🎯",
    title: "استراتژی رشد",
    desc: "تحلیل بازار، شناخت رقبا و طراحی نقشه‌راه رشد متناسب با کسب‌وکار شما.",
  },
  {
    icon: "✦",
    title: "هویت برند",
    desc: "خلق هویت بصری و کلامی منسجم که در ذهن مخاطبان ماندگار می‌شود.",
  },
  {
    icon: "📱",
    title: "بازاریابی دیجیتال",
    desc: "کمپین‌های هدفمند در شبکه‌های اجتماعی، SEO و تبلیغات آنلاین با بازگشت سرمایه شفاف.",
  },
  {
    icon: "🤖",
    title: "راه‌حل‌های هوش مصنوعی",
    desc: "پیاده‌سازی ابزارهای AI برای خودکارسازی فرآیندها و شخصی‌سازی تجربه مشتری.",
  },
];

function Services() {
  return (
    <section id="services" dir="rtl" className="py-24 px-4 md:px-12 max-w-6xl mx-auto">
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
          خدمات <span className="text-amber-400">ماهیر</span>
        </h2>
        <p className="text-white/50 max-w-md mx-auto text-sm">
          راه‌حل‌های جامع برای هر مرحله از مسیر رشد کسب‌وکار شما
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((s) => (
          <div
            key={s.title}
            className="group p-6 rounded-2xl bg-white/5 border border-white/10
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
// About Section
// ————————————————————————————————
function About() {
  return (
    <section id="about" dir="rtl" className="py-24 px-4 md:px-12 max-w-4xl mx-auto">
      <div className="rounded-3xl bg-white/5 border border-white/10 p-10 md:p-14 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          چرا <span className="text-amber-400">ماهیر</span>؟
        </h2>
        <p className="text-white/60 leading-relaxed text-base max-w-2xl mx-auto">
          ماهیر با تیمی از متخصصان استراتژی، طراحی و فناوری، به کسب‌وکارهای ایرانی کمک
          می‌کند تا با هویتی قوی و استراتژی هوشمند، در بازار رقابتی امروز متمایز شوند.
          ما به نتیجه اعتقاد داریم، نه فقط به فرآیند.
        </p>
        <div className="mt-10 grid grid-cols-3 gap-6">
          {[
            { num: "+۵۰", label: "کسب‌وکار موفق" },
            { num: "+۸۰٪", label: "رشد میانگین" },
            { num: "۳ سال", label: "تجربه" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl md:text-3xl font-extrabold text-amber-400">
                {stat.num}
              </div>
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
  return (
    <footer
      dir="rtl"
      className="border-t border-white/5 py-10 px-6 md:px-12 max-w-6xl mx-auto w-full"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40">
        <span className="font-bold text-amber-400 text-base">ماهیر</span>
        <div className="flex gap-6">
          <a href="mailto:hello@mahir.ir" className="hover:text-amber-400 transition-colors">
            hello@mahir.ir
          </a>
          <a href="#" className="hover:text-amber-400 transition-colors">اینستاگرام</a>
          <a href="#" className="hover:text-amber-400 transition-colors">لینکدین</a>
        </div>
        <span>© ۱۴۰۴ ماهیر. تمامی حقوق محفوظ است.</span>
      </div>
    </footer>
  );
}

// ————————————————————————————————
// Page
// ————————————————————————————————
export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#07071a]">
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Footer />
    </div>
  );
}
