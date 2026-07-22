import Link from "next/link";
import Reveal from "./Reveal";
import { IconArrowDown, IconSpark, IconPlay } from "./icons";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      {/* background decor */}
      <div className="absolute inset-0 grid-lines opacity-70" aria-hidden />
      <div
        className="glow-orb anim-pulse"
        style={{
          width: 520,
          height: 520,
          top: -180,
          insetInlineStart: "50%",
          transform: "translateX(-50%)",
          background: "radial-gradient(circle, rgba(214,178,94,0.20), transparent 70%)",
        }}
        aria-hidden
      />

      <div className="container relative z-10 text-center">
        <Reveal dir="scale">
          <span className="eyebrow mx-auto">
            <IconSpark width={15} height={15} />
            آژانس رشد کسب‌وکار
          </span>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="mt-7 mx-auto max-w-4xl text-4xl md:text-6xl lg:text-[4.2rem] font-extrabold leading-[1.25] tracking-tight">
            کسب‌وکارت را{" "}
            <span className="gold-text">از صفر تا صد</span>
            <br className="hidden md:block" /> رشد می‌دهیم
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p
            className="mt-6 mx-auto max-w-2xl text-base md:text-xl leading-loose"
            style={{ color: "var(--fg-muted)" }}
          >
            ماهیر کسب‌وکارهایی که مشتری کم، فروش ضعیف یا تبلیغات ندارند را پیدا می‌کند و با
            برندینگ، طراحی، محتوا و جذب کاربر واقعی، آن‌ها را به یک برند فروشنده تبدیل می‌کند.
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3.5">
            <Link href="/submit" className="btn btn-gold">
              شروع همکاری
            </Link>
            <a href="#services" className="btn btn-ghost">
              مشاهده خدمات
            </a>
          </div>
        </Reveal>

        {/* intro video placeholder */}
        <Reveal delay={300} dir="scale">
          <div className="mt-14 mx-auto max-w-3xl">
            <button
              type="button"
              className="group relative w-full overflow-hidden rounded-3xl block"
              style={{
                aspectRatio: "16 / 9",
                background:
                  "radial-gradient(120% 120% at 50% 0%, rgba(214,178,94,0.16), transparent 55%), linear-gradient(160deg, var(--surface-2), var(--bg))",
                border: "1px solid var(--border-strong)",
              }}
              aria-label="پخش ویدیو معرفی ماهیر"
            >
              <span className="absolute inset-0 grid-lines opacity-40" aria-hidden />
              <span className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <span
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: "linear-gradient(140deg, var(--gold-deep), var(--gold-bright))",
                    color: "#14100A",
                    boxShadow: "0 12px 40px -8px var(--gold-glow)",
                  }}
                >
                  <IconPlay width={34} height={34} />
                </span>
                <span className="text-sm md:text-base font-semibold" style={{ color: "var(--fg)" }}>
                  ویدیو معرفی ماهیر
                </span>
                <span className="text-xs" style={{ color: "var(--fg-dim)" }}>
                  به‌زودی
                </span>
              </span>
            </button>
          </div>
        </Reveal>
      </div>

      <a
        href="#problem"
        aria-label="اسکرول به پایین"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 anim-float"
        style={{ color: "var(--fg-dim)" }}
      >
        <IconArrowDown width={22} height={22} />
      </a>
    </section>
  );
}
