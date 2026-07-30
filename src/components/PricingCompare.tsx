import Link from "next/link";
import Reveal from "./Reveal";
import { IconCheck, IconArrow } from "./icons";

const PLANS = [
  { key: "start", name: "شروع رشد", featured: false },
  { key: "pro", name: "رشد حرفه‌ای", featured: true },
  { key: "full", name: "رشد کامل", featured: false },
] as const;

type Val = boolean | string;

const ROWS: { label: string; values: [Val, Val, Val] }[] = [
  { label: "مدت همکاری", values: ["۶۰ روز", "۹۰ روز", "۱۲۰ روز"] },
  { label: "پیش‌پرداخت", values: ["۳۰٪", "۳۵٪", "۴۰٪"] },
  { label: "تحلیل و بررسی کامل کسب‌وکار", values: [true, true, true] },
  { label: "بازطراحی محتوا و هویت پیج", values: [true, true, true] },
  { label: "جذب مشتری اولیه و مسیر فروش", values: [true, true, true] },
  { label: "برندینگ کامل و هویت بصری حرفه‌ای", values: [false, true, true] },
  { label: "طراحی و راه‌اندازی سیستم فروش", values: [false, true, true] },
  { label: "کمپین تبلیغات هدفمند", values: [false, true, true] },
  { label: "بهینه‌سازی و رشد بلندمدت", values: [false, false, true] },
  { label: "آموزش تیم شما برای ادامه مسیر", values: [false, false, true] },
  { label: "پرداخت نتیجه‌محور", values: [true, true, true] },
];

function Cell({ v, featured }: { v: Val; featured: boolean }) {
  if (typeof v === "string") {
    return (
      <span className="text-sm font-bold" style={{ color: featured ? "var(--gold-bright)" : "var(--fg)" }}>
        {v}
      </span>
    );
  }
  if (v) {
    return (
      <span
        className="inline-flex w-6 h-6 rounded-full items-center justify-center"
        style={{
          background: "var(--gold-soft)",
          border: "1px solid var(--border-strong)",
          color: "var(--gold-bright)",
        }}
        aria-label="دارد"
      >
        <IconCheck width={13} height={13} />
      </span>
    );
  }
  return (
    <span className="text-lg leading-none" style={{ color: "var(--fg-dim)" }} aria-label="ندارد">
      —
    </span>
  );
}

/** جدول مقایسه‌ی پکیج‌ها — کنار هم برای تصمیم‌گیری سریع کاربر. */
export default function PricingCompare() {
  return (
    <Reveal delay={80}>
      <div className="mt-16">
        <h3 className="text-center text-xl md:text-2xl font-extrabold">
          مقایسه‌ی <span className="gold-text">پکیج‌ها</span> در یک نگاه
        </h3>

        <div className="mt-8 overflow-x-auto rounded-3xl" style={{ border: "1px solid var(--border)" }}>
          <table className="w-full border-collapse" style={{ minWidth: 640 }}>
            <thead>
              <tr>
                <th
                  className="text-start p-4 text-sm font-bold sticky start-0 z-10"
                  style={{ background: "var(--bg-2)", color: "var(--fg-muted)" }}
                >
                  ویژگی‌ها
                </th>
                {PLANS.map((p) => (
                  <th
                    key={p.key}
                    className="p-4 text-center text-base font-extrabold"
                    style={{
                      background: p.featured
                        ? "linear-gradient(180deg, rgba(212, 175, 55,0.14), var(--bg-2))"
                        : "var(--bg-2)",
                      color: p.featured ? "var(--gold-bright)" : "var(--fg)",
                      borderInline: p.featured ? "1px solid var(--border-strong)" : "1px solid var(--border)",
                    }}
                  >
                    {p.name}
                    {p.featured && (
                      <span className="block mt-1 text-[11px] font-bold" style={{ color: "var(--gold)" }}>
                        ✦ پیشنهادی
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, ri) => (
                <tr key={row.label} style={{ background: ri % 2 ? "var(--surface)" : "var(--bg)" }}>
                  <th
                    scope="row"
                    className="text-start p-4 text-sm font-medium sticky start-0 z-10"
                    style={{
                      color: "var(--fg)",
                      background: ri % 2 ? "var(--surface)" : "var(--bg)",
                      borderTop: "1px solid var(--border)",
                    }}
                  >
                    {row.label}
                  </th>
                  {row.values.map((v, ci) => (
                    <td
                      key={ci}
                      className="p-4 text-center"
                      style={{
                        borderTop: "1px solid var(--border)",
                        borderInline: PLANS[ci].featured ? "1px solid var(--border-strong)" : "none",
                        background: PLANS[ci].featured ? "var(--gold-soft)" : "transparent",
                      }}
                    >
                      <Cell v={v} featured={PLANS[ci].featured} />
                    </td>
                  ))}
                </tr>
              ))}

              {/* CTA row */}
              <tr>
                <th
                  scope="row"
                  className="sticky start-0 z-10 p-4"
                  style={{ background: "var(--bg-2)", borderTop: "1px solid var(--border)" }}
                  aria-hidden
                />
                {PLANS.map((p) => (
                  <td
                    key={p.key}
                    className="p-4 text-center align-middle"
                    style={{
                      background: p.featured ? "var(--gold-soft)" : "var(--bg-2)",
                      borderTop: "1px solid var(--border)",
                      borderInline: p.featured ? "1px solid var(--border-strong)" : "none",
                    }}
                  >
                    <Link
                      href="/submit"
                      className={`${p.featured ? "btn btn-gold" : "btn btn-ghost"} w-full text-sm`}
                    >
                      انتخاب
                      <IconArrow width={15} height={15} />
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Reveal>
  );
}
