import Link from "next/link";
import Reveal from "./Reveal";
import { IconArrow, IconClock } from "./icons";

export default function Urgency() {
  return (
    <section className="py-10 md:py-14">
      <div className="container">
        <Reveal dir="scale">
          <div
            className="relative overflow-hidden rounded-[24px] p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-8"
            style={{
              background: "linear-gradient(120deg, rgba(214,178,94,0.14), var(--surface))",
              border: "1px solid var(--gold)",
              boxShadow: "0 24px 60px -32px var(--gold-glow)",
            }}
          >
            <div
              className="glow-orb anim-pulse"
              style={{
                width: 300,
                height: 300,
                top: -140,
                insetInlineStart: -80,
                background: "radial-gradient(circle, var(--gold-glow), transparent 70%)",
              }}
              aria-hidden
            />

            <div className="relative z-10 flex items-center gap-4 flex-1 text-center md:text-start">
              <span
                className="hidden sm:flex w-14 h-14 rounded-2xl items-center justify-center shrink-0 anim-float"
                style={{
                  background: "linear-gradient(150deg, var(--gold-deep), var(--gold-bright))",
                  color: "#14100A",
                }}
              >
                <IconClock width={26} height={26} />
              </span>
              <div>
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <span className="relative flex w-2.5 h-2.5">
                    <span
                      className="absolute inline-flex w-full h-full rounded-full opacity-70 anim-pulse"
                      style={{ background: "var(--gold)" }}
                    />
                    <span
                      className="relative inline-flex rounded-full w-2.5 h-2.5"
                      style={{ background: "var(--gold-bright)" }}
                    />
                  </span>
                  <span className="text-sm font-bold" style={{ color: "var(--gold-bright)" }}>
                    ظرفیت پذیرش این ماه محدود است
                  </span>
                </div>
                <h3 className="mt-1.5 text-xl md:text-2xl font-extrabold leading-tight">
                  فقط <span className="gold-text">۳ جای خالی</span> برای پروژه‌های جدید باقی مانده
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                  برای حفظ کیفیت، ماهیر در هر ماه تعداد محدودی پروژه می‌پذیرد. جای خودتان را رزرو کنید.
                </p>
              </div>
            </div>

            <div className="relative z-10 shrink-0 w-full md:w-auto">
              <Link href="/submit" className="btn btn-gold w-full md:w-auto">
                رزرو جای خالی
                <IconArrow width={18} height={18} />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
