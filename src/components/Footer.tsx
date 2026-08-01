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
  IconLinkedIn,
} from "./icons";

const NAV = [
  { href: "/about", label: "درباره ما" },
  { href: "/#portfolio", label: "نمونه‌کارها" },
  { href: "/#pricing", label: "قیمت‌ها" },
  { href: "/why-mahir", label: "چرا ماهیر؟" },
  { href: "/blog", label: "بلاگ" },
  { href: "/submit", label: "ثبت پروژه" },
  { href: "/#contact", label: "تماس با ما" },
];

const CONTACTS = [
  { Icon: IconPhone, label: CONTACT.phoneDisplay, href: CONTACT.phoneHref, external: false },
  { Icon: IconWhatsApp, label: "واتساپ", href: CONTACT.whatsapp, external: true },
  { Icon: IconTelegram, label: CONTACT.telegramId, href: CONTACT.telegram, external: true },
  { Icon: IconRubika, label: "روبیکا", href: CONTACT.rubika, external: true },
  { Icon: IconChat, label: "بله", href: CONTACT.bale, external: true },
  { Icon: IconMail, label: CONTACT.email, href: CONTACT.emailHref, external: false },
];

// اگر لینک واقعی ندارید، همین‌ها را نگه دارید تا بعداً جایگزین شود.
const SOCIAL = [
  { href: CONTACT.instagram, label: "اینستاگرام", Icon: IconInstagram },
  { href: CONTACT.telegram, label: "تلگرام", Icon: IconTelegram },
  { href: CONTACT.linkedin, label: "لینکدین", Icon: IconLinkedIn },
  { href: CONTACT.rubika, label: "روبیکا", Icon: IconRubika },
];

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)", background: "var(--bg-2)" }}>
      <div className="container py-14">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1.3fr]">
          {/* brand + prominent direct contact */}
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-loose" style={{ color: "var(--fg-muted)" }}>
              ماهیر، شریک رشد کسب‌وکارهای کوچک. از صفر تا صد، برندت را می‌سازیم و
              فروشت را بالا می‌بریم.
            </p>

            {/* phone — برجسته */}
            <a
              href={CONTACT.phoneHref}
              dir="ltr"
              className="mt-5 flex items-center justify-center gap-2.5 rounded-xl py-3 font-extrabold text-lg transition-transform hover:-translate-y-0.5"
              style={{
                background: "var(--gold-soft)",
                border: "1px solid var(--border-strong)",
                color: "var(--gold-bright)",
              }}
            >
              <IconPhone width={20} height={20} />
              {CONTACT.phoneDisplay}
            </a>
            {/* whatsapp */}
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="mt-3 flex items-center justify-center gap-2.5 rounded-xl py-2.5 text-sm font-bold transition-transform hover:-translate-y-0.5"
              style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--fg)" }}
            >
              <span style={{ color: "#22B573" }}>
                <IconWhatsApp width={18} height={18} />
              </span>
              گفت‌وگو در واتساپ
            </a>
          </div>

          {/* quick links */}
          <nav>
            <h4 className="text-sm font-bold mb-4" style={{ color: "var(--fg)" }}>
              لینک‌های سریع
            </h4>
            <ul className="space-y-2.5">
              {NAV.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm transition-colors" style={{ color: "var(--fg-muted)" }}>
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/privacy" className="text-sm transition-colors" style={{ color: "var(--fg-muted)" }}>
                  حریم خصوصی
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm transition-colors" style={{ color: "var(--fg-muted)" }}>
                  قوانین و شرایط
                </Link>
              </li>
            </ul>
          </nav>

          {/* direct contact + social */}
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

            {/* follow us */}
            <h4 className="text-sm font-bold mt-7 mb-3" style={{ color: "var(--fg)" }}>
              ما را در شبکه‌های اجتماعی دنبال کنید
            </h4>
            <div className="flex items-center gap-3">
              {SOCIAL.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
                  style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--fg-muted)" }}
                >
                  <Icon width={19} height={19} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* نمادها و مجوزها */}
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
                    color: b.active ? "var(--fg)" : "var(--fg-muted)",
                  }}
                >
                  <span aria-hidden>{b.icon}</span>
                  {b.subtitle}
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
