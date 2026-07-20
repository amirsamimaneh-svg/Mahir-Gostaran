import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import { IconSearch, IconBrand, IconUsers, IconChart } from "./icons";

const STEPS = [
  {
    icon: IconSearch,
    title: "کشف و تحلیل",
    text: "کسب‌وکار شما را عمیق می‌شناسیم و نقاط ضعف و فرصت‌های رشد را پیدا می‌کنیم.",
  },
  {
    icon: IconBrand,
    title: "برندسازی",
    text: "هویت بصری، لوگو و لحن برند حرفه‌ای می‌سازیم تا اعتماد ایجاد شود.",
  },
  {
    icon: IconUsers,
    title: "جذب کاربر",
    text: "با محتوا و تبلیغات هدفمند، مخاطب واقعی و علاقه‌مند به سمت شما می‌آوریم.",
  },
  {
    icon: IconChart,
    title: "فروش و تحویل",
    text: "مسیر فروش را بهینه می‌کنیم و یک برند رشدکرده را تحویل شما می‌دهیم.",
  },
];

export default function Solution() {
  return (
    <section id="solution" className="section" style={{ background: "var(--bg-2)" }}>
      <div className="container">
        <SectionHeader
          eyebrow="راه‌حل ماهیر"
          title={
            <>
              ما از <span className="gold-text">صفر تا صد</span> رشدتان می‌دهیم
            </>
          }
          subtitle="یک تیم یکپارچه، یک مسیر مشخص. از اولین تحلیل تا تحویل نهایی، همه‌چیز را ما انجام می‌دهیم."
        />

        <div className="mt-16 relative">
          {/* connecting line */}
          <div
            className="hidden lg:block absolute top-8 inset-x-8 h-px shimmer-line"
            aria-hidden
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal key={s.title} delay={i * 110} dir="up">
                  <div className="text-center relative">
                    <div
                      className="mx-auto w-16 h-16 rounded-2xl flex items-center justify-center relative z-10"
                      style={{
                        background: "linear-gradient(150deg, var(--surface-2), var(--bg))",
                        border: "1px solid var(--border-strong)",
                        color: "var(--gold)",
                        boxShadow: "0 8px 30px -12px var(--gold-glow)",
                      }}
                    >
                      <Icon width={26} height={26} />
                    </div>
                    <div
                      className="mt-4 text-xs font-bold"
                      style={{ color: "var(--gold)" }}
                    >
                      مرحله {["اول", "دوم", "سوم", "چهارم"][i]}
                    </div>
                    <h3 className="mt-1.5 text-lg font-bold">{s.title}</h3>
                    <p
                      className="mt-2 text-sm leading-loose max-w-xs mx-auto"
                      style={{ color: "var(--fg-muted)" }}
                    >
                      {s.text}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
