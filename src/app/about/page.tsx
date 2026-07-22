import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { IconArrow, IconRocket, IconTarget, IconShield, IconHandshake, IconSpark } from "@/components/icons";

export const metadata: Metadata = {
  title: "درباره ماهیر | داستان، مأموریت و ارزش‌ها",
  description:
    "ماهیر چگونه شکل گرفت، مأموریت و چشم‌انداز ما چیست و به چه ارزش‌هایی پایبندیم. آشنا شوید با تیمی که برای رشد کسب‌وکارهای کوچک ساخته شده است.",
  alternates: { canonical: "/about" },
};

const VALUES = [
  {
    icon: IconTarget,
    title: "نتیجه، نه حرف",
    text: "معیار موفقیت ما، رشد واقعی فروش و مشتری شماست؛ نه گزارش‌های پرزرق‌وبرق. اگر شما رشد نکنید، ما موفق نبوده‌ایم.",
  },
  {
    icon: IconShield,
    title: "صداقت و شفافیت",
    text: "از هزینه تا فرآیند، همه‌چیز را شفاف و بدون ابهام می‌گوییم. اعتماد شما با صداقت ساخته می‌شود، نه با وعده‌های غیرواقعی.",
  },
  {
    icon: IconHandshake,
    title: "شریک، نه پیمانکار",
    text: "ما خودمان را بخشی از تیم شما می‌دانیم و مثل صاحب کسب‌وکار به رشد آن فکر می‌کنیم، نه مثل یک ارائه‌دهنده‌ی بیرونی.",
  },
  {
    icon: IconSpark,
    title: "کیفیت بی‌قید و شرط",
    text: "کیفیت کار ما برای یک کسب‌وکار کوچک، هیچ فرقی با یک برند بزرگ ندارد. هر پروژه برای ما یک اثر است.",
  },
];

export default function AboutPage() {
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
            <span className="eyebrow mx-auto">درباره ماهیر</span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-6 text-3xl md:text-5xl font-extrabold leading-tight tracking-tight">
              ما برای رشد کسب‌وکارهایی ساخته شدیم که{" "}
              <span className="gold-text">لیاقت دیده‌شدن دارند</span>
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-5 text-base md:text-lg leading-loose" style={{ color: "var(--fg-muted)" }}>
              ماهیر یک آژانس رشد است؛ اما بیش از آن، یک باور است. باور به اینکه هر کسب‌وکار کوچکی،
              با هدایت درست، می‌تواند به یک برند فروشنده تبدیل شود.
            </p>
          </Reveal>
        </div>

        {/* story */}
        <div className="mt-16 max-w-3xl mx-auto space-y-12">
          <Story title="داستان شکل‌گیری ماهیر">
            <p>
              ماهیر از یک مشاهده‌ی ساده متولد شد: کسب‌وکارهای کوچک زیادی را دیدیم که محصول یا خدمت
              فوق‌العاده‌ای داشتند، اما چون در دیده‌شدن، برندینگ و بازاریابی ضعیف بودند، در سکوت باقی
              می‌ماندند. صاحبان این کسب‌وکارها تلاش می‌کردند، اما نمی‌دانستند از کجا شروع کنند و به چه
              کسی اعتماد کنند.
            </p>
            <p>
              تصمیم گرفتیم تیمی بسازیم که این مسیر را کامل و یکپارچه طی کند؛ از اولین تحلیل تا تحویل
              نهایی. جایی که صاحب کسب‌وکار مجبور نباشد چند تیم مختلف را هماهنگ کند و نگران کیفیت و
              هزینه باشد. این‌گونه ماهیر شکل گرفت.
            </p>
          </Story>

          <Story title="چرا ماهیر به وجود آمد">
            <p>
              چون بازار پر بود از تبلیغاتی که فقط هزینه می‌گرفتند و نتیجه‌ای نمی‌دادند. ما خواستیم
              مدلی بسازیم که در آن ریسک رشد بر دوش ما باشد، نه فقط مشتری. به همین دلیل نتیجه‌محور کار
              می‌کنیم و بخش قابل‌توجهی از هزینه را تنها پس از دیدن نتیجه‌ی واقعی دریافت می‌کنیم.
            </p>
          </Story>
        </div>

        {/* mission / vision */}
        <div className="mt-16 grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Reveal dir="right">
            <div
              className="h-full rounded-3xl p-7"
              style={{ background: "var(--surface)", border: "1px solid var(--border-strong)" }}
            >
              <span style={{ color: "var(--gold-bright)" }}>
                <IconRocket width={30} height={30} />
              </span>
              <h3 className="mt-4 text-xl font-extrabold">مأموریت ما</h3>
              <p className="mt-3 leading-loose" style={{ color: "var(--fg-muted)" }}>
                کمک به کسب‌وکارهای کوچک و نوپا برای رشد واقعی؛ با ساختن برندی قوی، جذب مشتری واقعی و
                افزایش فروش، به‌شکلی که برایشان قابل‌اتکا و پایدار باشد.
              </p>
            </div>
          </Reveal>
          <Reveal dir="left" delay={80}>
            <div
              className="h-full rounded-3xl p-7"
              style={{ background: "var(--surface)", border: "1px solid var(--border-strong)" }}
            >
              <span style={{ color: "var(--gold-bright)" }}>
                <IconTarget width={30} height={30} />
              </span>
              <h3 className="mt-4 text-xl font-extrabold">چشم‌انداز ما</h3>
              <p className="mt-3 leading-loose" style={{ color: "var(--fg-muted)" }}>
                تبدیل‌شدن به معتمدترین شریک رشد کسب‌وکارهای کوچک ایران؛ جایی که هر صاحب کسب‌وکاری با
                خیال راحت، آینده‌ی برندش را به آن می‌سپارد.
              </p>
            </div>
          </Reveal>
        </div>

        {/* values */}
        <div className="mt-16 max-w-4xl mx-auto">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-extrabold text-center">
              ارزش‌هایی که به آن‌ها <span className="gold-text">پایبندیم</span>
            </h2>
          </Reveal>
          <div className="mt-8 grid sm:grid-cols-2 gap-5">
            {VALUES.map((v, i) => {
              const Icon = v.icon;
              return (
                <Reveal key={v.title} delay={i * 90} dir="up">
                  <article className="card h-full">
                    <span style={{ color: "var(--gold-bright)" }}>
                      <Icon width={26} height={26} />
                    </span>
                    <h3 className="mt-4 text-base font-bold">{v.title}</h3>
                    <p className="mt-2 text-sm leading-loose" style={{ color: "var(--fg-muted)" }}>
                      {v.text}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <Reveal>
          <div
            className="mt-16 rounded-3xl p-8 md:p-12 text-center max-w-3xl mx-auto relative overflow-hidden"
            style={{
              background: "linear-gradient(160deg, rgba(214,178,94,0.12), var(--surface))",
              border: "1px solid var(--border-strong)",
            }}
          >
            <h3 className="text-2xl md:text-3xl font-extrabold leading-tight">
              بیایید کسب‌وکار شما را با هم{" "}
              <span className="gold-text">بزرگ کنیم</span>
            </h3>
            <p className="mt-3 leading-loose" style={{ color: "var(--fg-muted)" }}>
              اولین قدم، یک بررسی رایگان است. بدون تعهد، بدون هزینه.
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

function Story({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Reveal>
      <section>
        <h2 className="text-xl md:text-2xl font-extrabold mb-4 flex items-center gap-3">
          <span
            className="inline-block w-1.5 h-6 rounded-full"
            style={{ background: "linear-gradient(var(--gold-bright), var(--gold-deep))" }}
          />
          {title}
        </h2>
        <div className="space-y-4 leading-loose" style={{ color: "var(--fg-muted)" }}>
          {children}
        </div>
      </section>
    </Reveal>
  );
}
