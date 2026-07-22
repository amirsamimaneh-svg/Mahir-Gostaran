import Reveal from "./Reveal";

const STATS = [
  { big: "+۴۰", label: "کسب‌وکار رشد داده‌شده" },
  { big: "۲.۸ برابر", label: "متوسط رشد فروش" },
  { big: "۹۲٪", label: "رضایت مشتریان" },
  { big: "+۱۲۰", label: "روز فعالیت مستمر" },
];

export default function Stats() {
  return (
    <section className="py-12 md:py-16" style={{ background: "var(--bg-2)", borderBlock: "1px solid var(--border)" }}>
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 90} dir="up">
              <div className="text-center px-2">
                <div className="text-3xl md:text-5xl font-extrabold gold-text leading-tight">
                  {s.big}
                </div>
                <div
                  className="mt-2 text-xs md:text-sm leading-snug"
                  style={{ color: "var(--fg-muted)" }}
                >
                  {s.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
