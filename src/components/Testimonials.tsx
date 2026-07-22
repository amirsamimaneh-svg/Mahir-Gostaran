import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import { IconQuote, IconStar } from "./icons";

const REVIEWS = [
  {
    name: "نیلوفر احمدی",
    role: "مدیر فروشگاه لباس زنانه",
    initial: "ن",
    text: "قبل از ماهیر، پیج ما تقریباً مرده بود و فروش‌مان به چند سفارش در هفته محدود می‌شد. تیم ماهیر از هویت برند تا محتوا و تبلیغات، همه‌چیز را حرفه‌ای بازسازی کرد. حالا هر روز سفارش داریم و واقعاً فرق را حس می‌کنیم.",
  },
  {
    name: "دکتر سارا موسوی",
    role: "مؤسس کلینیک زیبایی",
    initial: "س",
    text: "چیزی که ماهیر را متفاوت می‌کند، تعهدشان به نتیجه است. برندینگ و محتوای تخصصی که ساختند باعث شد اعتماد مراجعان بیشتر شود و ظرفیت نوبت‌دهی ما خیلی زودتر از انتظار پر شد. کاملاً حرفه‌ای و قابل‌اعتماد بودند.",
  },
  {
    name: "رضا کریمی",
    role: "مدیر آموزشگاه زبان",
    initial: "ر",
    text: "ما کیفیت آموزشی خوبی داشتیم اما در جذب دانشجو ضعیف بودیم. ماهیر با یک استراتژی دقیق و کمپین هوشمند، ظرفیت کلاس‌هایمان را در کمتر از سه هفته پر کرد. همکاری با یک تیم که واقعاً دلسوز رشد کسب‌وکار است، ارزشش را داشت.",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="section" style={{ background: "var(--bg-2)" }}>
      <div className="container">
        <SectionHeader
          eyebrow="نظرات مشتریان"
          title={
            <>
              کسب‌وکارها درباره <span className="gold-text">ماهیر</span> چه می‌گویند
            </>
          }
          subtitle="اعتماد صاحبان کسب‌وکارها، بزرگ‌ترین سرمایه‌ی ماست."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={i * 110} dir="up">
              <article className="card h-full flex flex-col">
                <div className="flex items-center justify-between">
                  <span style={{ color: "var(--gold)" }}>
                    <IconQuote width={30} height={30} />
                  </span>
                  <span className="flex gap-0.5" style={{ color: "var(--gold-bright)" }} aria-label="۵ ستاره">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <IconStar key={s} width={15} height={15} />
                    ))}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-loose flex-1" style={{ color: "var(--fg)" }}>
                  «{r.text}»
                </p>

                <div className="mt-6 flex items-center gap-3 pt-5" style={{ borderTop: "1px solid var(--border)" }}>
                  <span
                    className="w-11 h-11 rounded-full flex items-center justify-center font-extrabold shrink-0"
                    style={{
                      background: "linear-gradient(150deg, var(--gold-deep), var(--gold-bright))",
                      color: "#14100A",
                    }}
                  >
                    {r.initial}
                  </span>
                  <span>
                    <span className="block text-sm font-bold" style={{ color: "var(--fg)" }}>
                      {r.name}
                    </span>
                    <span className="block text-xs" style={{ color: "var(--fg-muted)" }}>
                      {r.role}
                    </span>
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
