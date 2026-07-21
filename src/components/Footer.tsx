import Link from "next/link";
import Logo from "./Logo";
import { IconInstagram, IconWhatsApp, IconMail } from "./icons";

const NAV = [
  { href: "/#services", label: "خدمات" },
  { href: "/#process", label: "فرآیند کار" },
  { href: "/#portfolio", label: "نمونه‌کارها" },
  { href: "/#why", label: "درباره ما" },
  { href: "/submit", label: "ثبت پروژه" },
  { href: "/#contact", label: "تماس" },
];

const SOCIAL = [
  { href: "https://instagram.com", label: "اینستاگرام", Icon: IconInstagram },
  { href: "https://wa.me/", label: "واتساپ", Icon: IconWhatsApp },
  { href: "mailto:hello@mahir.ir", label: "ایمیل", Icon: IconMail },
];

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)", background: "var(--bg-2)" }}>
      <div className="container py-14">
        <div className="flex flex-col md:flex-row gap-10 md:items-start justify-between">
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

          <div className="flex gap-16">
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
            <div>
              <h4 className="text-sm font-bold mb-4" style={{ color: "var(--fg)" }}>
                ارتباط با ما
              </h4>
              <ul className="space-y-2.5 text-sm" style={{ color: "var(--fg-muted)" }}>
                <li>
                  <a href="mailto:hello@mahir.ir">hello@mahir.ir</a>
                </li>
                <li>ایران</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="divider my-9" />

        <div className="flex flex-col sm:flex-row gap-2 items-center justify-between text-xs" style={{ color: "var(--fg-dim)" }}>
          <p>© {new Date().getFullYear()} ماهیر — تمامی حقوق محفوظ است.</p>
          <p>
            ساخته‌شده با <span style={{ color: "var(--gold)" }}>♦</span> برای رشد کسب‌وکار شما
          </p>
        </div>
      </div>
    </footer>
  );
}
