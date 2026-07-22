import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import {
  IconTarget,
  IconBrand,
  IconVideo,
  IconUsers,
  IconChart,
} from "./icons";

const SERVICES = [
  {
    icon: IconTarget,
    title: "شناسایی و جذب کسب‌وکار",
    text: "کسب‌وکارهای دارای پتانسیل رشد را پیدا می‌کنیم و مسیر توسعه‌شان را طراحی می‌کنیم.",
    span: "lg:col-span-2",
  },
  {
    icon: IconBrand,
    title: "بازطراحی برند و هویت بصری",
    text: "لوگو، رنگ، تایپوگرافی و هویت کامل برندتان را حرفه‌ای و منسجم می‌سازیم.",
  },
  {
    icon: IconVideo,
    title: "تولید محتوا و ویدیو تبلیغاتی",
    text: "محتوای متنی، تصویری و ویدیویی جذاب که مخاطب را درگیر و به مشتری تبدیل می‌کند.",
  },
  {
    icon: IconUsers,
    title: "جذب کاربر و مشتری واقعی",
    text: "با کمپین‌های هدفمند، ترافیک و مشتری واقعی و علاقه‌مند به کسب‌وکارتان می‌آوریم.",
  },
  {
    icon: IconChart,
    title: "بهینه‌سازی فروش و تحویل نهایی",
    text: "قیف فروش را می‌سازیم و بهینه می‌کنیم تا بازدیدکننده به خریدار وفادار تبدیل شود.",
    span: "lg:col-span-2",
  },
];

export default function Services() {
  return (
    <section id="services" className="section">
      <div className="container">
        <SectionHeader
          eyebrow="خدمات ماهیر"
          title={
            <>
              هر چیزی که برای <span className="gold-text">رشد</span> نیاز دارید
            </>
          }
          subtitle="پنج سرویس یکپارچه که با هم، کسب‌وکار شما را از ناشناخته به یک برند فروشنده تبدیل می‌کنند."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.title} delay={(i % 3) * 90} dir="up" className={s.span ?? ""}>
                <article className="card h-full flex flex-col">
                  <div
                    className="w-[52px] h-[52px] rounded-xl flex items-center justify-center"
                    style={{
                      background: "var(--gold-soft)",
                      border: "1px solid var(--border-strong)",
                      color: "var(--gold-bright)",
                    }}
                  >
                    <Icon width={24} height={24} />
                  </div>
                  <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
                  <p
                    className="mt-2.5 text-sm leading-loose"
                    style={{ color: "var(--fg-muted)" }}
                  >
                    {s.text}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
