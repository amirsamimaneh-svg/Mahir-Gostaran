import type { Metadata } from "next";
import Link from "next/link";
import { IconCheck, IconArrow } from "@/components/icons";

export const metadata: Metadata = {
  title: "درخواست ثبت شد | ماهیر",
  description: "درخواست شما با موفقیت ثبت شد. تیم ماهیر تا ۲۴ ساعت آینده با شما تماس می‌گیرد.",
  robots: { index: false, follow: true },
};

export default function ThankYouPage() {
  return (
    <main className="min-h-[100dvh] flex items-center justify-center relative overflow-hidden px-6 py-28">
      <div className="absolute inset-0 grid-lines opacity-50" aria-hidden />
      <div
        className="glow-orb anim-pulse"
        style={{
          width: 520,
          height: 520,
          top: -160,
          insetInlineStart: "50%",
          transform: "translateX(-50%)",
          background: "radial-gradient(circle, var(--gold-glow), transparent 70%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 text-center max-w-xl">
        <div
          className="mx-auto w-20 h-20 rounded-full flex items-center justify-center anim-float"
          style={{
            background: "linear-gradient(150deg, var(--gold-deep), var(--gold-bright))",
            color: "#14100A",
            boxShadow: "0 12px 40px -10px var(--gold-glow)",
          }}
        >
          <IconCheck width={40} height={40} />
        </div>

        <h1 className="mt-8 text-3xl md:text-4xl font-extrabold leading-tight tracking-tight">
          درخواست شما با موفقیت{" "}
          <span className="gold-text">ثبت شد</span>
        </h1>

        <p className="mt-5 text-base md:text-lg leading-loose" style={{ color: "var(--fg-muted)" }}>
          تیم ماهیر حداکثر تا <span style={{ color: "var(--gold-bright)" }}>۲۴ ساعت آینده</span> با
          شما تماس خواهد گرفت. تا آن زمان می‌توانید با خیال راحت به کسب‌وکارتان برسید — بقیه‌اش با ماست.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className="btn btn-gold">
            بازگشت به صفحه اصلی
            <IconArrow width={18} height={18} />
          </Link>
          <Link href="/#faq" className="btn btn-ghost">
            سوالات متداول
          </Link>
        </div>
      </div>
    </main>
  );
}
