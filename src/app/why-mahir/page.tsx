import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import {
  IconArrow,
  IconRocket,
  IconShield,
  IconHandshake,
  IconSpark,
  IconTarget,
  IconChart,
  IconCheck,
  IconClose,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "چرا ماهیر؟ | تفاوت ماهیر با آژانس‌های معمولی",
  description:
    "چرا کسب‌وکارها به‌جای یک آژانس تبلیغاتی معمولی، ماهیر را انتخاب می‌کنند؟ مقایسه‌ی شفاف مزیت‌های ماهیر: مسئولیت نتیجه، خدمات یکپارچه و پرداخت نتیجه‌محور.",
  alternates: { canonical: "/why-mahir" },
};

const REASONS = [
  {
    icon: IconRocket,
    title: "از صفر تا صد، یکجا",
    text: "لازم نیست چند تیم مختلف (طراح، تبلیغات‌چی، تولیدکننده‌ی محتوا) را جداگانه پیدا و هماهنگ کنید. ماهیر کل مسیر را یکپارچه انجام می‌دهد.",
  },
  {
    icon: IconTarget,
    title: "تمرکز روی نتیجه واقعی",
    text: "معیار ما زیبایی صرف نیست؛ رشد فروش و جذب مشتری واقعی است. هر تصمیم با این سؤال گرفته می‌شود: آیا این به فروش شما کمک می‌کند؟",
  },
  {
    icon: IconShield,
    title: "پرداخت نتیجه‌محور",
    text: "بخش قابل‌توجهی از هزینه تنها پس از رسیدن به نتایج توافق‌شده دریافت می‌شود. ریسک رشد را با شما تقسیم می‌کنیم.",
  },
  {
    icon: IconHandshake,
    title: "شریک، نه پیمانکار",
    text: "ما خودمان را بخشی از تیم شما می‌دانیم و مثل صاحب کسب‌وکار به رشد آن فکر می‌کنیم، نه مثل یک ارائه‌دهنده‌ی بیرونی.",
  },
  {
    icon: IconChart,
    title: "گزارش‌دهی شفاف",
    text: "در هر مرحله دقیقاً می‌دانید پروژه کجاست و چه نتیجه‌ای گرفته‌اید. همه‌چیز شفاف، مکتوب و قابل‌پیگیری است.",
  },
  {
    icon: IconSpark,
    title: "کیفیت پریمیوم، مقیاس شما",
    text: "طراحی و محتوایی در سطح برندهای بزرگ، اما متناسب با بودجه و اندازه‌ی کسب‌وکار کوچک شما.",
  },
];

const COMPARE: { label: string; mahir: string; agency: string }[] = [
  { label: "مسئولیت نتیجه", mahir: "بله؛ متعهد به رشد واقعی", agency: "معمولاً فقط تحویل کار" },
  { label: "دامنه‌ی خدمات", mahir: "یکپارچه: برندینگ تا فروش", agency: "اغلب فقط یک بخش" },
  { label: "مدل پرداخت", mahir: "بخشی پس از نتیجه", agency: "پرداخت کامل صرف‌نظر از نتیجه" },
  { label: "نگاه به همکاری", mahir: "شریک بلندمدت رشد", agency: "پیمانکار پروژه‌ای" },
  { label: "تمرکز اصلی", mahir: "فروش و مشتری واقعی", agency: "تحویل خروجی و گزارش" },
  { label: "شفافیت گزارش", mahir: "کامل و مرحله‌به‌مرحله", agency: "متغیر و اغلب مبهم" },
  { label: "مناسب کسب‌وکار کوچک", mahir: "بله؛ تخصص ماست", agency: "اغلب مناسب برندهای بزرگ" },
];

export default function WhyMahirPage() {
  return (
    <main className="pt-28 pb-20 md:pt-32 relative overflow-hidden">
      <div className="absolute inset-0 grid-lines opacity-40" aria-hidden />
      <div
        className="glow-orb anim-pulse"
        style={{
          width: 520,
          height: 520,
          top: -180,
          insetInlineStart: "50%",
          transform: "translateX(-50%)",
          background: "radial-gradient(circle, var(--gold-glow), transparent 70%)",
        }}
        aria-hidden
      />

      <div className="container relative z-10">
        {/* hero */}
        <div className="text-center max-w-3xl mx-auto">
          <Reveal dir="scale">
            <span className="eyebrow mx-auto">چرا ماهیر؟</span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-6 text-3xl md:text-5xl font-extrabold leading-tight tracking-tight">
              چرا کسب‌وکارها ماهیر را به یک{" "}
              <span className="gold-text">آژانس معمولی</span> ترجیح می‌دهند
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-5 text-base md:text-lg leading-loose" style={{ color: "var(--fg-muted)" }}>
              ماهیر فقط یک آژانس تبلیغاتی نیست؛ یک شریک رشد است که مسیر کامل را با شما طی می‌کند و
              پای نتیجه‌ای که می‌گیرد می‌ایستد. تفاوت دقیقاً همین‌جاست.
            </p>
          </Reveal>
        </div>

        {/* reasons */}
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {REASONS.map((r, i) => {
            const Icon = r.icon;
            return (
              <Reveal key={r.title} delay={i * 80} dir="up" className="h-full">
                <article className="card h-full">
                  <span style={{ color: "var(--gold-bright)" }}>
                    <Icon width={28} height={28} />
                  </span>
                  <h3 className="mt-4 text-base font-bold">{r.title}</h3>
                  <p className="mt-2 text-sm leading-loose" style={{ color: "var(--fg-muted)" }}>
                    {r.text}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* comparison table */}
        <div className="mt-20 max-w-4xl mx-auto">
          <Reveal>
            <h2 className="text-center text-2xl md:text-3xl font-extrabold">
              ماهیر در برابر <span className="gold-text">آژانس معمولی</span>
            </h2>
          </Reveal>

          <Reveal delay={80}>
            <div
              className="mt-8 overflow-x-auto rounded-3xl"
              style={{ border: "1px solid var(--border)" }}
            >
              <table className="w-full border-collapse" style={{ minWidth: 620 }}>
                <thead>
                  <tr>
                    <th
                      className="text-start p-4 text-sm font-bold sticky start-0 z-10"
                      style={{ background: "var(--bg-2)", color: "var(--fg-muted)" }}
                    >
                      معیار
                    </th>
                    <th
                      className="p-4 text-center text-base font-extrabold"
                      style={{
                        background: "linear-gradient(180deg, rgba(212, 175, 55,0.14), var(--bg-2))",
                        color: "var(--gold-bright)",
                        borderInline: "1px solid var(--border-strong)",
                      }}
                    >
                      ماهیر
                    </th>
                    <th
                      className="p-4 text-center text-base font-bold"
                      style={{ background: "var(--bg-2)", color: "var(--fg-muted)" }}
                    >
                      آژانس معمولی
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARE.map((row, ri) => (
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
                      <td
                        className="p-4 text-center align-middle"
                        style={{
                          borderTop: "1px solid var(--border)",
                          borderInline: "1px solid var(--border-strong)",
                          background: "var(--gold-soft)",
                        }}
                      >
                        <span className="inline-flex items-start gap-2 text-sm font-semibold text-start" style={{ color: "var(--fg)" }}>
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
                          {row.mahir}
                        </span>
                      </td>
                      <td
                        className="p-4 text-center align-middle text-sm"
                        style={{ borderTop: "1px solid var(--border)", color: "var(--fg-muted)" }}
                      >
                        <span className="inline-flex items-start gap-2 text-start">
                          <span
                            className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                            style={{ background: "var(--surface-2)", color: "var(--fg-dim)" }}
                          >
                            <IconClose width={12} height={12} />
                          </span>
                          {row.agency}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>

        {/* CTA */}
        <Reveal>
          <div
            className="mt-16 rounded-3xl p-8 md:p-12 text-center max-w-3xl mx-auto relative overflow-hidden"
            style={{
              background: "linear-gradient(160deg, rgba(212, 175, 55,0.12), var(--surface))",
              border: "1px solid var(--border-strong)",
            }}
          >
            <h2 className="text-2xl md:text-3xl font-extrabold leading-tight">
              تفاوت را در <span className="gold-text">کسب‌وکار خودتان</span> ببینید
            </h2>
            <p className="mt-3 leading-loose" style={{ color: "var(--fg-muted)" }}>
              اولین قدم یک بررسی رایگان است؛ بدون تعهد و بدون هزینه.
            </p>
            <div className="mt-7">
              <Link href="/submit" className="btn btn-gold">
                ثبت پروژه و دریافت مشاوره
                <IconArrow width={18} height={18} />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
