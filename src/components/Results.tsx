import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import { IconClock } from "./icons";

export default function Results() {
  return (
    <section id="results" className="section">
      <div className="container">
        <SectionHeader
          eyebrow="نتایج"
          title={
            <>
              داستان‌های <span className="gold-text">موفقیت</span> در راه است
            </>
          }
        />

        <Reveal dir="scale" delay={120}>
          <div
            className="mt-12 mx-auto max-w-3xl rounded-3xl p-10 md:p-14 text-center relative overflow-hidden"
            style={{
              background: "linear-gradient(160deg, var(--surface), var(--bg-2))",
              border: "1px solid var(--border)",
            }}
          >
            <div
              className="glow-orb anim-pulse"
              style={{
                width: 340,
                height: 340,
                top: -120,
                insetInlineStart: "50%",
                transform: "translateX(-50%)",
                background: "radial-gradient(circle, var(--gold-glow), transparent 70%)",
              }}
              aria-hidden
            />
            <div className="relative z-10">
              <div
                className="mx-auto w-16 h-16 rounded-2xl flex items-center justify-center anim-float"
                style={{
                  background: "var(--gold-soft)",
                  border: "1px solid var(--border-strong)",
                  color: "var(--gold-bright)",
                }}
              >
                <IconClock width={30} height={30} />
              </div>
              <p className="mt-6 text-xl md:text-2xl font-bold leading-relaxed">
                به‌زودی نتایج واقعی مشتریان ماهیر اینجا نمایش داده می‌شود
              </p>
              <p
                className="mt-3 text-sm md:text-base leading-loose max-w-xl mx-auto"
                style={{ color: "var(--fg-muted)" }}
              >
                ما تازه شروع کرده‌ایم و روی اولین پروژه‌های رشد کار می‌کنیم. می‌خواهید کسب‌وکار
                شما یکی از اولین داستان‌های موفقیت ماهیر باشد؟
              </p>
              <div className="mt-8">
                <a href="#contact" className="btn btn-gold">
                  همین حالا شروع کنید
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
