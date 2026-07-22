import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import { IconRocket, IconShield, IconHandshake, IconSpark } from "./icons";

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
      </div>
    </section>
  );
}
