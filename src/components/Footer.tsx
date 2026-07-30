import Link from "next/link";
import Logo from "./Logo";
import { CONTACT } from "@/data/contact";
import { BADGES } from "@/data/trust";
import {
  IconInstagram,
  IconWhatsApp,
  IconMail,
  IconPhone,
  IconTelegram,
  IconRubika,
  IconChat,
} from "./icons";

const NAV = [
  { href: "/#services", label: "خدمات" },
  { href: "/#portfolio", label: "نمونه‌کارها" },
  { href: "/#pricing", label: "قیمت‌ها" },
  { href: "/why-mahir", label: "چرا ماهیر؟" },
  { href: "/blog", label: "مقالات" },
  { href: "/about", label: "درباره ما" },
  { href: "/submit", label: "ثبت پروژه" },
];

const CONTACTS = [
  { Icon: IconPhone, label: CONTACT.phoneDisplay, href: CONTACT.phoneHref, external: false },
  { Icon: IconWhatsApp, label: "واتساپ", href: CONTACT.whatsapp, external: true },
  { Icon: IconTelegram, label: CONTACT.telegramId, href: CONTACT.telegram, external: true },
  { Icon: IconRubika, label: "روبیکا", href: CONTACT.rubika, external: true },
  { Icon: IconChat, label: "بله", href: CONTACT.bale, external: true },
  { Icon: IconMail, label: CONTACT.email, href: CONTACT.emailHref, external: false },
];

const SOCIAL = [
  { href: CONTACT.instagram, label: "اینستاگرام", Icon: IconInstagram },
  { href: CONTACT.telegram, label: "تلگرام", Icon: IconTelegram },
  { href: CONTACT.rubika, label: "روبیکا", Icon: IconRubika },
  { href: CONTACT.whatsapp, label: "واتساپ", Icon: IconWhatsApp },
];

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)", background: "var(--bg-2)" }}>
      <div className="container py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1.2fr]">
          {/* brand */}
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-loose" style={{ color: "var(--fg-muted)" }}>
              ماهیر، شریک رشد کسب‌وکارهای کوچک. از صفر تا صد، برندت را می‌سازیم و
              فروشت را بالا می‌بریم.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {SOCIAL.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    color: "var(--fg-muted)",
                  }}
                >
                  <Icon width={19} height={19} />
                </a>
              ))}
            </div>
          </div>

          {/* quick links */}
          <nav>
            <h4 className="text-sm font-bold mb-4" style={{ color: "var(--fg)" }}>
              لینک‌های سریع
            </h4>
            <ul className="space-y-2.5">
              {NAV.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm transition-colors"
                    style={{ color: "var(--fg-muted)" }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* direct contact */}
          <div>
            <h4 className="text-sm font-bold mb-4" style={{ color: "var(--fg)" }}>
              ارتباط مستقیم
            </h4>
            <ul className="space-y-3">
              {CONTACTS.map(({ Icon, label, href, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noreferrer" : undefined}
                    dir="ltr"
                    className="inline-flex items-center gap-2.5 text-sm transition-colors"
                    style={{ color: "var(--fg-muted)" }}
                  >
                    <span style={{ color: "var(--gold)" }}>
                      <Icon width={17} height={17} />
                    </span>
                    <span>{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* نمادهای اعتماد / مجوزها */}
        <div className="mt-10">
          <h4 className="text-xs font-bold mb-3" style={{ color: "var(--fg-muted)" }}>
            نمادها و مجوزها
          </h4>
          <div className="flex flex-wrap items-center gap-3">
            {BADGES.map((b) => {
              const chip = (
                <span
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold"
                  style={{
                    background: "var(--surface)",
                    border: `1px solid ${b.active ? "var(--border-strong)" : "var(--border)"}`,
                    color: b.active ? "var(--fg)" : "var(--fg-dim)",
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: b.active ? "var(--gold-bright)" : "var(--fg-dim)" }}
                    aria-hidden
                  />
                  {b.subtitle}
                  {!b.active && <span style={{ color: "var(--fg-dim)" }}>(به‌زودی)</span>}
                </span>
              );
              return b.active && b.href ? (
                <a key={b.title} href={b.href} target="_blank" rel="noreferrer" referrerPolicy="origin">
                  {chip}
                </a>
              ) : (
                <span key={b.title}>{chip}</span>
              );
            })}
          </div>
        </div>

        <div className="divider my-9" />

        <div
          className="flex flex-col sm:flex-row gap-3 items-center justify-between text-xs"
          style={{ color: "var(--fg-dim)" }}
        >
          <p>© {new Date().getFullYear()} ماهیر — تمامی حقوق محفوظ است.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="transition-colors" style={{ color: "var(--fg-muted)" }}>
              حریم خصوصی
            </Link>
            <Link href="/terms" className="transition-colors" style={{ color: "var(--fg-muted)" }}>
              قوانین و شرایط
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
