import Link from "next/link";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import { IconRocket, IconShield, IconHandshake, IconSpark, IconArrow, IconCheck, IconClose } from "./icons";

const MINI_COMPARE = [
  { label: "مسئولیت نتیجه", mahir: "متعهد به رشد واقعی", agency: "فقط تحویل کار" },
  { label: "دامنه‌ی خدمات", mahir: "یکپارچه: برندینگ تا فروش", agency: "اغلب فقط یک بخش" },
  { label: "مدل پرداخت", mahir: "بخشی پس از نتیجه", agency: "پرداخت کامل بدون تضمین" },
];

const REASONS = [
  {
    icon: IconRocket,
    title: "از صفر تا صد، یکجا",
    text: "لازم نیست چند تیم مختلف را هماهنگ کنید. برندینگ، محتوا، تبلیغات و فروش را کامل انجام می‌دهیم.",
  },
  {
    icon: IconShield,
    title: "تمرکز روی نتیجه واقعی",
    text: "هدف ما فقط زیبایی نیست؛ رشد فروش و جذب مشتری واقعی، معیار موفقیت ماست.",
  },
  {
    icon: IconHandshake,
    title: "شریک رشد شما",
    text: "ما مثل یک پیمانکار بیرونی رفتار نمی‌کنیم؛ کنار شما و درگیر موفقیت کسب‌وکارتان هستیم.",
  },
  {
    icon: IconSpark,
    title: "خلاقیت و کیفیت پریمیوم",
    text: "طراحی و محتوایی در سطح برندهای بزرگ، متناسب با بودجه و مقیاس کسب‌وکار شما.",
  },
];

export default function WhyMahir() {
  return (
    <section id="why" className="section">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <SectionHeader
              align="start"
              eyebrow="چرا ماهیر؟"
              title={
                <>
                  چرا کسب‌وکارها <span className="gold-text">ماهیر</span> را انتخاب می‌کنند
                </>
              }
              subtitle="ماهیر فقط یک آژانس تبلیغاتی نیست؛ یک شریک رشد است که مسیر کامل را با شما طی می‌کند."
            />
            <Reveal delay={200}>
              <div className="mt-8 hidden lg:flex items-center gap-3 flex-wrap">
                {["برندینگ", "محتوا", "تبلیغات", "فروش", "طراحی"].map((t) => (
                  <span
                    key={t}
                    className="text-sm font-medium px-3.5 py-1.5 rounded-full"
                    style={{
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      color: "var(--fg-muted)",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>
            <Reveal delay={260}>
              <Link href="/why-mahir" className="btn btn-ghost mt-8">
                مقایسه‌ی کامل ماهیر با آژانس معمولی
                <IconArrow width={18} height={18} />
              </Link>
            </Reveal>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {REASONS.map((r, i) => {
              const Icon = r.icon;
              return (
                <Reveal key={r.title} delay={i * 100} dir="left">
                  <article className="card h-full">
                    <div style={{ color: "var(--gold-bright)" }}>
                      <Icon width={28} height={28} />
                    </div>
                    <h3 className="mt-4 text-base font-bold">{r.title}</h3>
                    <p
                      className="mt-2 text-sm leading-loose"
                      style={{ color: "var(--fg-muted)" }}
                    >
                      {r.text}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* compact ماهیر vs آژانس معمولی */}
        <Reveal dir="scale" delay={80}>
          <div
            className="mt-14 rounded-3xl overflow-hidden max-w-4xl mx-auto"
            style={{ border: "1px solid var(--border)" }}
          >
            <div className="grid grid-cols-[1.2fr_1fr_1fr]">
              {/* header row */}
              <div className="p-4 text-sm font-bold" style={{ background: "var(--bg-2)", color: "var(--fg-muted)" }}>
                تفاوت در یک نگاه
              </div>
              <div
                className="p-4 text-center text-sm font-extrabold"
                style={{
                  background: "linear-gradient(180deg, rgba(212, 175, 55,0.14), var(--bg-2))",
                  color: "var(--gold-bright)",
                  borderInline: "1px solid var(--border-strong)",
                }}
              >
                ماهیر
              </div>
              <div className="p-4 text-center text-sm font-bold" style={{ background: "var(--bg-2)", color: "var(--fg-muted)" }}>
                آژانس معمولی
              </div>

              {/* rows */}
              {MINI_COMPARE.map((row, i) => (
                <div key={row.label} className="contents">
                  <div
                    className="p-4 text-sm font-medium"
                    style={{ background: i % 2 ? "var(--surface)" : "var(--bg)", borderTop: "1px solid var(--border)", color: "var(--fg)" }}
                  >
                    {row.label}
                  </div>
                  <div
                    className="p-4 text-center"
                    style={{
                      background: "var(--gold-soft)",
                      borderTop: "1px solid var(--border)",
                      borderInline: "1px solid var(--border-strong)",
                    }}
                  >
                    <span className="inline-flex items-center gap-1.5 text-xs md:text-sm font-semibold" style={{ color: "var(--fg)" }}>
                      <span style={{ color: "var(--gold-bright)" }}>
                        <IconCheck width={14} height={14} />
                      </span>
                      {row.mahir}
                    </span>
                  </div>
                  <div
                    className="p-4 text-center text-xs md:text-sm"
                    style={{ background: i % 2 ? "var(--surface)" : "var(--bg)", borderTop: "1px solid var(--border)", color: "var(--fg-muted)" }}
                  >
                    <span className="inline-flex items-center gap-1.5">
                      <span style={{ color: "var(--fg-dim)" }}>
                        <IconClose width={14} height={14} />
                      </span>
                      {row.agency}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
