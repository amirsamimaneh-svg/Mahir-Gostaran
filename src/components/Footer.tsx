import Link from "next/link";
import Logo from "./Logo";
import { CONTACT } from "@/data/contact";
import {
  IconInstagram,
  IconWhatsApp,
  IconMail,
  IconPhone,
  IconTelegram,
} from "./icons";

const NAV = [
  { href: "/#services", label: "خدمات" },
  { href: "/#process", label: "فرآیند کار" },
  { href: "/#portfolio", label: "نمونه‌کارها" },
  { href: "/#pricing", label: "قیمت‌ها" },
  { href: "/#blog", label: "مقالات" },
  { href: "/about", label: "درباره ما" },
  { href: "/submit", label: "ثبت پروژه" },
];

const CONTACTS = [
  { Icon: IconPhone, label: CONTACT.phoneDisplay, href: CONTACT.phoneHref, external: false },
  { Icon: IconWhatsApp, label: "واتساپ", href: CONTACT.whatsapp, external: true },
  { Icon: IconTelegram, label: CONTACT.telegramId, href: CONTACT.telegram, external: true },
  { Icon: IconMail, label: CONTACT.email, href: CONTACT.emailHref, external: false },
];

const SOCIAL = [
  { href: CONTACT.instagram, label: "اینستاگرام", Icon: IconInstagram },
  { href: CONTACT.whatsapp, label: "واتساپ", Icon: IconWhatsApp },
  { href: CONTACT.telegram, label: "تلگرام", Icon: IconTelegram },
  { href: CONTACT.emailHref, label: "ایمیل", Icon: IconMail },
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
