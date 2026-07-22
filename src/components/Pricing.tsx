import Link from "next/link";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import { IconCheck, IconArrow, IconShield } from "./icons";

type Plan = {
  name: string;
  ideal: string;
  duration: string;
  prepay: string;
  remaining: string;
  includes: string[];
  featured?: boolean;
};

const PLANS: Plan[] = [
  {
    name: "شروع رشد",
    ideal: "مناسب کسب‌وکارهای کوچک",
    duration: "۶۰ روز",
    prepay: "۳۰٪",
    remaining: "باقیمانده پس از رسیدن به اهداف توافق‌شده",
    includes: [
      "بررسی کامل کسب‌وکار و تحلیل وضعیت",
      "بازطراحی محتوا و هویت پیج",
      "جذب مشتری اولیه و راه‌اندازی مسیر فروش",
    ],
  },
  {
    name: "رشد حرفه‌ای",
    ideal: "محبوب‌ترین انتخاب کسب‌وکارها",
    duration: "۹۰ روز",
    prepay: "۳۵٪",
    remaining: "باقیمانده به‌صورت مرحله‌ای و بر اساس نتیجه",
    includes: [
      "همه موارد پکیج «شروع رشد»",
      "برندینگ کامل و هویت بصری حرفه‌ای",
      "طراحی و راه‌اندازی سیستم فروش",
      "کمپین تبلیغات هدفمند",
    ],
    featured: true,
  },
  {
    name: "رشد کامل و تحویل",
    ideal: "برای رشد جدی و بلندمدت",
    duration: "۱۲۰ روز",
    prepay: "۴۰٪",
    remaining: "باقیمانده پس از تحویل نهایی پروژه",
    includes: [
      "همه موارد پکیج «رشد حرفه‌ای»",
      "بهینه‌سازی و رشد بلندمدت",
      "آموزش تیم مشتری برای ادامه مسیر",
    ],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="section">
      <div className="container">
        <SectionHeader
          eyebrow="مدل همکاری با ماهیر"
          title={
            <>
              همکاری <span className="gold-text">شفاف و نتیجه‌محور</span>
            </>
          }
          subtitle="ماهیر نتیجه‌محور کار می‌کند؛ یعنی بخش قابل‌توجهی از هزینه، پس از دیدن نتیجه‌ی واقعی دریافت می‌شود. شما با خیال راحت شروع می‌کنید و بر اساس رشدی که می‌بینید، ادامه می‌دهید."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3 items-stretch">
          {PLANS.map((plan, i) => {
            const featured = plan.featured;
            return (
              <Reveal key={plan.name} delay={i * 100} dir="up" className="h-full">
                <article
                  className="relative h-full flex flex-col rounded-3xl p-7 transition-transform"
                  style={{
                    background: featured
                      ? "linear-gradient(170deg, rgba(214,178,94,0.12), var(--surface))"
                      : "linear-gradient(180deg, var(--surface), var(--bg-2))",
                    border: `1px solid ${featured ? "var(--gold)" : "var(--border)"}`,
                    boxShadow: featured ? "0 24px 60px -28px var(--gold-glow)" : "none",
                    transform: featured ? "translateY(-6px)" : "none",
                  }}
                >
                  {featured && (
                    <span
                      className="absolute -top-3 right-1/2 translate-x-1/2 text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap"
                      style={{
                        background: "linear-gradient(120deg, var(--gold-deep), var(--gold-bright))",
                        color: "#14100A",
                      }}
                    >
                      ✦ پیشنهادی ماهیر
                    </span>
                  )}

                  <h3 className="text-xl font-extrabold">{plan.name}</h3>
                  <p className="mt-1.5 text-sm" style={{ color: "var(--fg-muted)" }}>
                    {plan.ideal}
                  </p>

                  {/* duration + prepay */}
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <div
                      className="rounded-xl p-3 text-center"
                      style={{ background: "var(--bg)", border: "1px solid var(--border)" }}
                    >
                      <div className="text-lg font-extrabold gold-text">{plan.duration}</div>
                      <div className="mt-0.5 text-xs" style={{ color: "var(--fg-muted)" }}>
                        مدت همکاری
                      </div>
                    </div>
                    <div
                      className="rounded-xl p-3 text-center"
                      style={{ background: "var(--bg)", border: "1px solid var(--border)" }}
                    >
                      <div className="text-lg font-extrabold gold-text">{plan.prepay}</div>
                      <div className="mt-0.5 text-xs" style={{ color: "var(--fg-muted)" }}>
                        پیش‌پرداخت
                      </div>
                    </div>
                  </div>

                  <p
                    className="mt-3 text-xs leading-relaxed rounded-xl px-3 py-2.5"
                    style={{
                      background: "var(--gold-soft)",
                      border: "1px solid var(--border)",
                      color: "var(--gold-bright)",
                    }}
                  >
                    {plan.remaining}
                  </p>

                  {/* includes */}
                  <ul className="mt-5 space-y-2.5 flex-1">
                    {plan.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span
                          className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                          style={{
                            background: "var(--gold-soft)",
                            border: "1px solid var(--border-strong)",
                            color: "var(--gold-bright)",
                          }}
                        >
                          <IconCheck width={12} height={12} />
                        </span>
                        <span className="text-sm leading-relaxed" style={{ color: "var(--fg)" }}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/submit"
                    className={`mt-7 ${featured ? "btn btn-gold" : "btn btn-ghost"} w-full`}
                  >
                    درخواست این پکیج
                  </Link>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* trust box */}
        <Reveal dir="scale" delay={120}>
          <div
            className="mt-8 rounded-2xl p-6 md:p-7 flex items-center gap-4 md:gap-5 max-w-3xl mx-auto"
            style={{
              background: "linear-gradient(120deg, var(--gold-soft), var(--surface))",
              border: "1px solid var(--border-strong)",
            }}
          >
            <span
              className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
              style={{
                background: "var(--gold-soft)",
                border: "1px solid var(--border-strong)",
                color: "var(--gold-bright)",
              }}
            >
              <IconShield width={24} height={24} />
            </span>
            <p className="text-sm md:text-base leading-loose font-medium" style={{ color: "var(--fg)" }}>
              تعهد ماهیر: <span className="gold-text font-bold">اگر به نتایج توافق‌شده نرسیم،
              بخش باقیمانده‌ی هزینه دریافت نمی‌شود.</span> ریسک رشد با ماست، نه با شما.
            </p>
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal delay={160}>
          <div className="mt-10 text-center">
            <Link href="/submit" className="btn btn-gold text-base px-8 py-4">
              درخواست بررسی رایگان و دریافت پیشنهاد اختصاصی
              <IconArrow width={18} height={18} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
