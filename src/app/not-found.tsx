import type { Metadata } from "next";
import Link from "next/link";
import { IconArrow, IconSearch } from "@/components/icons";

export const metadata: Metadata = {
  title: "صفحه پیدا نشد | ماهیر",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="min-h-[100dvh] flex items-center justify-center relative overflow-hidden px-6 py-28">
      <div className="absolute inset-0 grid-lines opacity-40" aria-hidden />
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

      <div className="relative z-10 text-center max-w-lg">
        <span
          className="mx-auto w-16 h-16 rounded-2xl flex items-center justify-center anim-float"
          style={{
            background: "var(--gold-soft)",
            border: "1px solid var(--border-strong)",
            color: "var(--gold-bright)",
          }}
        >
          <IconSearch width={30} height={30} />
        </span>

        <div className="mt-6 text-6xl md:text-8xl font-extrabold gold-text leading-none">۴۰۴</div>

        <h1 className="mt-4 text-2xl md:text-3xl font-extrabold leading-tight">
          این صفحه پیدا نشد
        </h1>
        <p className="mt-4 text-base leading-loose" style={{ color: "var(--fg-muted)" }}>
          به نظر می‌رسد صفحه‌ای که دنبالش هستید وجود ندارد یا جابه‌جا شده است. نگران نباشید،
          شما را به مسیر درست برمی‌گردانیم.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className="btn btn-gold">
            بازگشت به صفحه اصلی
            <IconArrow width={18} height={18} />
          </Link>
          <Link href="/submit" className="btn btn-ghost">
            ثبت پروژه
          </Link>
        </div>
      </div>
    </main>
  );
}
