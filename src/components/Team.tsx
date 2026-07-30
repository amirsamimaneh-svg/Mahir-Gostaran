import Image from "next/image";
import Reveal from "./Reveal";
import { TEAM, type Member } from "@/data/team";

/**
 * بخش «تیم ماهیر» — معرفی افراد پشت برند برای ایجاد حس انسانی و اعتماد.
 */
export default function Team() {
  return (
    <section id="team" className="mt-20 md:mt-24 max-w-5xl mx-auto">
      {/* ما چه کسانی هستیم */}
      <div className="max-w-3xl mx-auto text-center">
        <Reveal>
          <span className="eyebrow mx-auto">تیم ماهیر</span>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-5 text-2xl md:text-4xl font-extrabold leading-tight tracking-tight">
            ما چه کسانی <span className="gold-text">هستیم</span>
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="mt-4 text-base md:text-lg leading-loose" style={{ color: "var(--fg-muted)" }}>
            پشت ماهیر آدم‌های واقعی‌اند؛ تیمی کوچک و هم‌دل که کنار هم نشسته‌اند تا کسب‌وکار شما را
            مثل کسب‌وکار خودشان بزرگ کنند. ما فقط یک ارائه‌دهنده‌ی خدمات نیستیم — شریک مسیر رشد شماییم و
            پای نتیجه‌ای که می‌گیریم می‌ایستیم.
          </p>
        </Reveal>
      </div>

      {/* اعضا */}
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {TEAM.map((m, i) => (
          <Reveal key={m.name} delay={i * 90} dir="up" className="h-full">
            <MemberCard member={m} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function MemberCard({ member }: { member: Member }) {
  return (
    <article
      className="group relative h-full flex flex-col items-center text-center rounded-3xl p-7 overflow-hidden transition-transform hover:-translate-y-1.5"
      style={{ background: "linear-gradient(180deg, var(--surface), var(--bg-2))", border: "1px solid var(--border)" }}
    >
      {/* top accent glow */}
      <span
        className="pointer-events-none absolute -top-16 start-1/2 -translate-x-1/2 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle, ${member.tint}33, transparent 70%)` }}
        aria-hidden
      />
      <span
        className="absolute inset-x-0 top-0 h-1"
        style={{ background: `linear-gradient(90deg, transparent, ${member.tint}, transparent)` }}
        aria-hidden
      />
      <Avatar member={member} />
      <h3 className="mt-5 text-lg font-extrabold">{member.name}</h3>
      <p
        className="mt-1.5 text-sm font-semibold px-3 py-1 rounded-full"
        style={{
          background: "var(--gold-soft)",
          border: "1px solid var(--border-strong)",
          color: "var(--gold-bright)",
        }}
      >
        {member.role}
      </p>
      <p className="mt-4 text-sm leading-loose" style={{ color: "var(--fg-muted)" }}>
        {member.bio}
      </p>
    </article>
  );
}

function Avatar({ member }: { member: Member }) {
  const size = 104;
  if (member.photo) {
    return (
      <span
        className="relative overflow-hidden rounded-full shrink-0"
        style={{ width: size, height: size, border: "2px solid var(--border-strong)" }}
      >
        <Image src={member.photo} alt={member.name} fill sizes="104px" style={{ objectFit: "cover" }} />
      </span>
    );
  }
  // آواتار پیش‌فرض حرفه‌ای تا وقتی عکس واقعی آماده شود — با حلقه‌ی گرادیانی
  return (
    <span
      className="relative flex items-center justify-center rounded-full shrink-0 p-[3px] transition-transform duration-300 group-hover:scale-105"
      style={{
        width: size,
        height: size,
        background: `linear-gradient(150deg, ${member.tint}, var(--gold-bright))`,
      }}
      role="img"
      aria-label={member.name}
    >
      <span
        className="relative flex items-center justify-center w-full h-full rounded-full overflow-hidden"
        style={{
          background: `radial-gradient(120% 120% at 30% 0%, ${member.tint}2e, transparent 60%), linear-gradient(160deg, var(--surface-2), var(--bg))`,
        }}
      >
        <span className="absolute -bottom-2 text-5xl opacity-20 select-none" aria-hidden>
          {member.emoji}
        </span>
        <span className="relative text-3xl font-extrabold" style={{ color: "var(--gold-bright)" }} aria-hidden>
          {member.name.trim().charAt(0)}
        </span>
      </span>
    </span>
  );
}
