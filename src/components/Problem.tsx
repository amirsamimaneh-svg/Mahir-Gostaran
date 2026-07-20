import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

const PROBLEMS = [
  {
    n: "۰۱",
    title: "دیده نمی‌شوید",
    text: "محصول یا خدمت خوبی دارید، اما کسی شما را نمی‌شناسد و در فضای آنلاین حضوری ندارید.",
  },
  {
    n: "۰۲",
    title: "مشتری کم دارید",
    text: "ورودی ثابت و قابل‌اتکایی از مشتری ندارید و فروش‌تان به شانس و معرفی وابسته است.",
  },
  {
    n: "۰۳",
    title: "برندتان حرفه‌ای نیست",
    text: "هویت بصری، لوگو و محتوای شما ضعیف است و حس اعتماد لازم را در مشتری ایجاد نمی‌کند.",
  },
  {
    n: "۰۴",
    title: "تبلیغات بی‌نتیجه",
    text: "برای تبلیغات هزینه می‌کنید ولی بازگشتی نمی‌بینید، چون استراتژی و مسیر فروش مشخصی ندارید.",
  },
];

export default function Problem() {
  return (
    <section id="problem" className="section">
      <div className="container">
        <SectionHeader
          eyebrow="مشکل کجاست؟"
          title={
            <>
              کسب‌وکارت <span className="gold-text">دیده نمی‌شه؟</span>
            </>
          }
          subtitle="بیشتر کسب‌وکارهای کوچک محصول خوبی دارند، اما در یکی از این چهار نقطه گیر می‌کنند."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PROBLEMS.map((p, i) => (
            <Reveal key={p.n} delay={i * 90} dir="up">
              <article className="card h-full">
                <span
                  className="text-4xl font-extrabold"
                  style={{ color: "var(--surface-2)", WebkitTextStroke: "1px var(--border-strong)" }}
                >
                  {p.n}
                </span>
                <h3 className="mt-3 text-lg font-bold">{p.title}</h3>
                <p className="mt-2.5 text-sm leading-loose" style={{ color: "var(--fg-muted)" }}>
                  {p.text}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
