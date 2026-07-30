import Link from "next/link";
import Reveal from "./Reveal";
import { IconArrow } from "./icons";

type Stat = {
  big: string;
  label: string;
  /** توضیح کوتاه برای قابل‌اعتمادتر شدن عدد */
  sub: string;
  /** لینک به نمونه‌کار مرتبط (اختیاری) */
  href?: string;
  hrefLabel?: string;
};

const STATS: Stat[] = [
  {
    big: "+۴۰",
    label: "کسب‌وکار رشد داده‌شده",
    sub: "در حوزه‌های پوشاک، زیبایی، آموزش و خدمات",
    href: "/#portfolio",
    hrefLabel: "دیدن نمونه‌کارها",
  },
  {
    big: "۲.۸ برابر",
    label: "میانگین رشد فروش",
    sub: "میانگین رشد فروش مشتریان طی دوره‌ی همکاری",
    href: "/portfolio/nila-womens-fashion",
    hrefLabel: "نمونه: فروشگاه نیلا",
  },
  {
    big: "۹۲٪",
    label: "رضایت مشتریان",
    sub: "بر اساس بازخورد پروژه‌های تکمیل‌شده",
    href: "/portfolio/atousa-beauty-clinic",
    hrefLabel: "نمونه: کلینیک آتوسا",
  },
  {
    big: "+۱۲۰",
    label: "روز همراهی مستمر",
    sub: "همراهی و پشتیبانی تا رسیدن به نتیجه‌ی واقعی",
  },
];

export default function Stats() {
  return (
    <section
      className="py-14 md:py-20"
      style={{ background: "var(--bg-2)", borderBlock: "1px solid var(--border)" }}
    >
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 90} dir="up" className="h-full">
              <div
                className="h-full flex flex-col rounded-2xl p-6 text-center transition-transform hover:-translate-y-1"
                style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
              >
                <div className="text-4xl md:text-5xl font-extrabold gold-text leading-tight">
                  {s.big}
                </div>
                <div className="mt-2 text-sm md:text-base font-bold" style={{ color: "var(--fg)" }}>
                  {s.label}
                </div>
                <div
                  className="mt-2 text-xs leading-relaxed flex-1"
                  style={{ color: "var(--fg-muted)" }}
                >
                  {s.sub}
                </div>
                {s.href && (
                  <Link
                    href={s.href}
                    className="mt-3 inline-flex items-center justify-center gap-1.5 text-xs font-semibold"
                    style={{ color: "var(--gold-bright)" }}
                  >
                    {s.hrefLabel}
                    <IconArrow width={13} height={13} />
                  </Link>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <p className="mt-6 text-center text-xs leading-relaxed" style={{ color: "var(--fg-dim)" }}>
            * اعداد بر اساس میانگین نتایج پروژه‌های واقعی ماهیر است و برای هر کسب‌وکار، بسته به
            شرایط و میزان همکاری، متفاوت خواهد بود.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
