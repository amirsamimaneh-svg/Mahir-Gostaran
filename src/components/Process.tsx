import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

const STEPS = [
  {
    n: "۱",
    title: "بررسی رایگان",
    text: "فرم را پر می‌کنید و ما کسب‌وکارتان را بررسی می‌کنیم و نقاط رشد را به شما می‌گوییم.",
  },
  {
    n: "۲",
    title: "استراتژی و برنامه",
    text: "یک نقشه‌راه شفاف برای برندینگ، محتوا و جذب مشتری طراحی و با شما هماهنگ می‌کنیم.",
  },
  {
    n: "۳",
    title: "اجرا و تولید",
    text: "برند، محتوا، ویدیو و کمپین‌های تبلیغاتی را تیم ماهیر به‌طور کامل اجرا می‌کند.",
  },
  {
    n: "۴",
    title: "جذب و فروش",
    text: "کاربر واقعی جذب می‌شود، قیف فروش فعال می‌شود و فروش شما به‌صورت پیوسته رشد می‌کند.",
  },
  {
    n: "۵",
    title: "تحویل و رشد پایدار",
    text: "برند رشدکرده را با گزارش کامل تحویل می‌گیرید و مسیر ادامه رشد روشن است.",
  },
];

export default function Process() {
  return (
    <section id="process" className="section" style={{ background: "var(--bg-2)" }}>
      <div className="container">
        <SectionHeader
          eyebrow="فرآیند کار"
          title={
            <>
              مسیر همکاری با ماهیر، <span className="gold-text">قدم به قدم</span>
            </>
          }
          subtitle="یک فرآیند شفاف و بدون ابهام؛ از اولین تماس تا تحویل نهایی، دقیقاً می‌دانید در چه مرحله‌ای هستید."
        />

        <div className="mt-14 max-w-3xl mx-auto">
          <div className="relative">
            {/* vertical timeline line */}
            <div
              className="absolute top-2 bottom-2 w-px"
              style={{
                insetInlineStart: "1.6rem",
                background:
                  "linear-gradient(var(--gold-deep), var(--gold), transparent)",
              }}
              aria-hidden
            />
            <ul className="space-y-7">
              {STEPS.map((s, i) => (
                <li key={s.n}>
                  <Reveal delay={i * 80} dir="right">
                    <div className="flex items-start gap-5">
                      <span
                        className="relative z-10 shrink-0 w-[52px] h-[52px] rounded-full flex items-center justify-center text-lg font-extrabold"
                        style={{
                          background: "linear-gradient(150deg, var(--gold-deep), var(--gold-bright))",
                          color: "#14100A",
                          boxShadow: "0 8px 24px -10px var(--gold-glow)",
                        }}
                      >
                        {s.n}
                      </span>
                      <div
                        className="flex-1 rounded-2xl p-5"
                        style={{
                          background: "var(--surface)",
                          border: "1px solid var(--border)",
                        }}
                      >
                        <h3 className="text-lg font-bold">{s.title}</h3>
                        <p
                          className="mt-1.5 text-sm leading-loose"
                          style={{ color: "var(--fg-muted)" }}
                        >
                          {s.text}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
