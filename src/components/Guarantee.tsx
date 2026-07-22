import Link from "next/link";
import Reveal from "./Reveal";
import { IconShield, IconArrow } from "./icons";

export default function Guarantee() {
  return (
    <section id="guarantee" className="section" style={{ background: "var(--bg-2)" }}>
      <div className="container">
        <Reveal dir="scale">
          <div
            className="relative overflow-hidden rounded-[28px] p-8 md:p-14 text-center max-w-4xl mx-auto"
            style={{
              background: "linear-gradient(160deg, rgba(214,178,94,0.12), var(--surface))",
              border: "1px solid var(--gold)",
              boxShadow: "0 30px 70px -34px var(--gold-glow)",
            }}
          >
            <div className="grid-lines absolute inset-0 opacity-30" aria-hidden />
            <div
              className="glow-orb anim-pulse"
              style={{
                width: 360,
                height: 360,
                top: -160,
                insetInlineStart: "50%",
                transform: "translateX(-50%)",
                background: "radial-gradient(circle, var(--gold-glow), transparent 70%)",
              }}
              aria-hidden
            />

            <div className="relative z-10">
              <span
                className="mx-auto w-16 h-16 rounded-2xl flex items-center justify-center anim-float"
                style={{
                  background: "linear-gradient(150deg, var(--gold-deep), var(--gold-bright))",
                  color: "#14100A",
                  boxShadow: "0 12px 36px -10px var(--gold-glow)",
                }}
              >
                <IconShield width={30} height={30} />
              </span>

              <span className="eyebrow mx-auto mt-6">ضمانت نتیجه</span>

              <h2 className="mt-4 text-2xl md:text-4xl font-extrabold leading-tight tracking-tight">
                تعهد ماهیر به{" "}
                <span className="gold-text">نتیجه‌ی واقعی</span>
              </h2>

              <p
                className="mt-5 mx-auto max-w-2xl text-base md:text-xl leading-loose font-medium"
                style={{ color: "var(--fg)" }}
              >
                اگر به نتایج توافق‌شده نرسیم،{" "}
                <span className="gold-text font-bold">بخش باقی‌مانده‌ی هزینه را دریافت نمی‌کنیم.</span>{" "}
                ما به توانایی‌مان در رشد کسب‌وکار شما ایمان داریم و ریسک را با شما تقسیم می‌کنیم.
              </p>

              <div className="mt-8">
                <Link href="/submit" className="btn btn-gold">
                  با خیال راحت شروع کنید
                  <IconArrow width={18} height={18} />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
