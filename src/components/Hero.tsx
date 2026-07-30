import Link from "next/link";
import Reveal from "./Reveal";
import VideoIntro from "./VideoIntro";
import { IconArrowDown, IconSpark } from "./icons";

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
          background: "radial-gradient(circle, rgba(212, 175, 55,0.20), transparent 70%)",
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

        {/* intro video */}
        <Reveal delay={300} dir="scale">
          <VideoIntro className="mt-14" />
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
