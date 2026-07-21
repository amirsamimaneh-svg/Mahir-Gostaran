import Link from "next/link";
import Reveal from "./Reveal";
import { IconArrow, IconInstagram, IconWhatsApp, IconMail } from "./icons";

const CHANNELS = [
  { Icon: IconInstagram, label: "اینستاگرام", value: "@mahir", href: "https://instagram.com" },
  { Icon: IconWhatsApp, label: "واتساپ", value: "پیام مستقیم", href: "https://wa.me/" },
  { Icon: IconMail, label: "ایمیل", value: "hello@mahir.ir", href: "mailto:hello@mahir.ir" },
];

export default function ContactCTA() {
  return (
    <section id="contact" className="section">
      <div className="container">
        <div
          className="relative rounded-[28px] overflow-hidden p-8 md:p-14"
          style={{
            background: "linear-gradient(160deg, var(--surface), var(--bg-2))",
            border: "1px solid var(--border-strong)",
          }}
        >
          <div className="grid-lines absolute inset-0 opacity-40" aria-hidden />
          <div
            className="glow-orb anim-pulse"
            style={{
              width: 380,
              height: 380,
              top: -160,
              insetInlineEnd: -120,
              background: "radial-gradient(circle, var(--gold-glow), transparent 70%)",
            }}
            aria-hidden
          />

          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <Reveal>
              <span className="eyebrow mx-auto">تماس با ماهیر</span>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 text-3xl md:text-[2.6rem] font-extrabold leading-tight tracking-tight">
                آماده‌ای کسب‌وکارت را{" "}
                <span className="gold-text">متحول کنی؟</span>
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-4 text-base md:text-lg leading-loose" style={{ color: "var(--fg-muted)" }}>
                همین حالا پروژه‌ات را ثبت کن تا کارشناسان ماهیر کسب‌وکارت را رایگان بررسی کنند و
                مسیر رشدت را برایت مشخص کنند. بدون تعهد، بدون هزینه.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <div className="mt-8">
                <Link href="/submit" className="btn btn-gold text-base px-8 py-4">
                  ثبت پروژه و دریافت مشاوره
                  <IconArrow width={18} height={18} />
                </Link>
              </div>
            </Reveal>
          </div>

          {/* contact channels */}
          <div className="relative z-10 mt-10 grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {CHANNELS.map(({ Icon, label, value, href }, i) => (
              <Reveal key={label} delay={i * 90} dir="up">
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="card flex items-center gap-3.5 !p-4"
                >
                  <span
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background: "var(--gold-soft)",
                      border: "1px solid var(--border-strong)",
                      color: "var(--gold-bright)",
                    }}
                  >
                    <Icon width={20} height={20} />
                  </span>
                  <span className="text-start">
                    <span className="block text-xs" style={{ color: "var(--fg-dim)" }}>
                      {label}
                    </span>
                    <span className="block text-sm font-semibold" style={{ color: "var(--fg)" }}>
                      {value}
                    </span>
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
