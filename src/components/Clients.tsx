import Image from "next/image";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import { IconCheck } from "./icons";
import { CLIENTS, BADGES, type Client, type TrustBadge } from "@/data/trust";

/**
 * بخش «همکاران و مشتریان ما» + «نمادهای اعتماد».
 * لوگوها و نمادها از src/data/trust.ts خوانده می‌شوند و به‌راحتی قابل جایگزینی‌اند.
 */
export default function Clients() {
  return (
    <section id="clients" className="section" style={{ background: "var(--bg-2)" }}>
      <div className="container">
        <SectionHeader
          eyebrow="همکاران و مشتریان ما"
          title={
            <>
              کسب‌وکارهایی که به <span className="gold-text">ماهیر</span> اعتماد کرده‌اند
            </>
          }
          subtitle="افتخار ما همراهی برندهایی است که برای رشد، ماهیر را انتخاب کرده‌اند. جای شما این‌جا خالی است."
        />

        {/* client logos */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {CLIENTS.map((c, i) => (
            <Reveal key={`${c.name}-${i}`} delay={(i % 6) * 70} dir="up">
              <ClientLogo client={c} />
            </Reveal>
          ))}
        </div>

        {/* trust badges */}
        <Reveal delay={100}>
          <div className="mt-14">
            <h3 className="text-center text-base font-bold" style={{ color: "var(--fg)" }}>
              نمادها و مجوزها
            </h3>
            <p className="mt-1.5 text-center text-xs" style={{ color: "var(--fg-dim)" }}>
              اعتماد شما برای ما مهم است؛ ماهیر در مسیر دریافت نمادهای رسمی زیر است.
            </p>
            <div className="mt-6 flex flex-wrap items-stretch justify-center gap-4">
              {BADGES.map((b) => (
                <TrustBadgeCard key={b.title} badge={b} />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ClientLogo({ client }: { client: Client }) {
  return (
    <div
      className="h-24 rounded-2xl flex items-center justify-center px-3 transition-transform hover:-translate-y-0.5"
      style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
    >
      {client.logo ? (
        <span className="relative w-full h-12">
          <Image src={client.logo} alt={client.name} fill sizes="160px" style={{ objectFit: "contain" }} />
        </span>
      ) : (
        <span className="text-sm font-bold" style={{ color: "var(--fg-dim)" }}>
          {client.name}
        </span>
      )}
    </div>
  );
}

function TrustBadgeCard({ badge }: { badge: TrustBadge }) {
  const inner = (
    <div
      className="relative w-44 rounded-2xl flex flex-col items-center justify-center gap-2 text-center px-4 py-6 transition-transform hover:-translate-y-0.5"
      style={{
        background: "linear-gradient(180deg, var(--surface), var(--bg-2))",
        border: `1px solid ${badge.active ? "var(--border-strong)" : "var(--border)"}`,
      }}
    >
      {/* وضعیت گوشه */}
      <span
        className="absolute top-2.5 end-2.5 inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full"
        style={{
          background: badge.active ? "var(--gold-soft)" : "var(--bg)",
          border: "1px solid var(--border)",
          color: badge.active ? "var(--gold-bright)" : "var(--fg-dim)",
        }}
      >
        {badge.active ? (
          <>
            <IconCheck width={11} height={11} /> فعال
          </>
        ) : (
          "در حال دریافت"
        )}
      </span>

      <span
        className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
        style={{
          background: "var(--gold-soft)",
          border: "1px solid var(--border-strong)",
        }}
        aria-hidden
      >
        {badge.icon}
      </span>
      <span className="mt-1 text-sm font-extrabold" style={{ color: "var(--fg)" }}>
        {badge.subtitle}
      </span>
      <span className="text-[11px] leading-snug" style={{ color: "var(--fg-muted)" }}>
        {badge.title}
      </span>
    </div>
  );

  if (badge.active && badge.href) {
    return (
      <a href={badge.href} target="_blank" rel="noreferrer" referrerPolicy="origin">
        {inner}
      </a>
    );
  }
  return inner;
}
