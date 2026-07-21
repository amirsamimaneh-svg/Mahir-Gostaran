import type { Metadata } from "next";
import SubmitForm from "@/components/SubmitForm";
import Reveal from "@/components/Reveal";
import { IconCheck } from "@/components/icons";

export const metadata: Metadata = {
  title: "ثبت پروژه | ماهیر",
  description:
    "کسب‌وکارتان را به ماهیر بسپارید. فرم ثبت پروژه را پر کنید تا تیم ماهیر مسیر رشد شما را بررسی کند.",
  alternates: { canonical: "/submit" },
};

const PROMISES = [
  "بررسی رایگان و بدون تعهد",
  "پاسخ حداکثر تا ۲۴ ساعت",
  "مسیر رشد اختصاصی برای کسب‌وکار شما",
];

export default function SubmitPage() {
  return (
    <main className="pt-28 pb-20 md:pt-32 relative overflow-hidden">
      <div className="absolute inset-0 grid-lines opacity-50" aria-hidden />
      <div
        className="glow-orb anim-pulse"
        style={{
          width: 460,
          height: 460,
          top: -180,
          insetInlineEnd: -120,
          background: "radial-gradient(circle, var(--gold-glow), transparent 70%)",
        }}
        aria-hidden
      />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] gap-10 lg:gap-14 items-start">
          {/* intro column */}
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <span className="eyebrow">ثبت پروژه</span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-5 text-3xl md:text-5xl font-extrabold leading-tight tracking-tight">
                کسب‌وکارتون رو بسپارید به{" "}
                <span className="gold-text">ماهیر</span>
              </h1>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-5 text-base md:text-lg leading-loose" style={{ color: "var(--fg-muted)" }}>
                فقط چند دقیقه وقت بگذارید و اطلاعات کسب‌وکارتان را کامل کنید. تیم ماهیر آن را
                دقیق بررسی می‌کند و یک مسیر رشد واقعی و اختصاصی به شما پیشنهاد می‌دهد — از
                برندینگ تا جذب مشتری و فروش.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <ul className="mt-8 space-y-3">
                {PROMISES.map((p) => (
                  <li key={p} className="flex items-center gap-3">
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                      style={{
                        background: "var(--gold-soft)",
                        border: "1px solid var(--border-strong)",
                        color: "var(--gold-bright)",
                      }}
                    >
                      <IconCheck width={14} height={14} />
                    </span>
                    <span className="text-sm md:text-base" style={{ color: "var(--fg)" }}>
                      {p}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* form column */}
          <Reveal delay={120} dir="left">
            <SubmitForm />
          </Reveal>
        </div>
      </div>
    </main>
  );
}
