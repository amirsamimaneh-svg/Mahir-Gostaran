"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { CONTACT } from "@/data/contact";
import {
  IconMenu,
  IconClose,
  IconPhone,
  IconInstagram,
  IconTelegram,
  IconRubika,
} from "./icons";

const LINKS = [
  { href: "/", label: "صفحه اصلی" },
  { href: "/#services", label: "خدمات" },
  { href: "/#portfolio", label: "نمونه‌کارها" },
  { href: "/#pricing", label: "قیمت‌ها" },
  { href: "/#blog", label: "مقالات" },
  { href: "/about", label: "درباره ما" },
  { href: "/#faq", label: "سوالات متداول" },
  { href: "/#contact", label: "تماس" },
];

const SOCIAL = [
  { href: CONTACT.instagram, label: "اینستاگرام", Icon: IconInstagram },
  { href: CONTACT.telegram, label: "تلگرام", Icon: IconTelegram },
  { href: CONTACT.rubika, label: "روبیکا", Icon: IconRubika },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(15,23,42,0.82)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        height: "var(--nav-h)",
      }}
    >
      <nav className="container h-full flex items-center justify-between gap-4">
        <Link href="/" aria-label="ماهیر" className="z-50 shrink-0">
          <Logo />
        </Link>

        {/* desktop links */}
        <ul className="hidden lg:flex items-center gap-0.5">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="px-2.5 py-2 rounded-lg text-[13px] font-medium transition-colors block whitespace-nowrap"
                style={{ color: "var(--fg-muted)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold-bright)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--fg-muted)")}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* desktop right cluster: social + direct call + CTA */}
        <div className="hidden lg:flex items-center gap-2 shrink-0">
          {/* social icons (wider screens) */}
          <div className="hidden xl:flex items-center gap-1">
            {SOCIAL.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
                style={{ color: "var(--fg-muted)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold-bright)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--fg-muted)")}
              >
                <Icon width={18} height={18} />
              </a>
            ))}
            <span className="w-px h-5 mx-1" style={{ background: "var(--border)" }} aria-hidden />
          </div>

          {/* direct call — shows the phone number */}
          <a
            href={CONTACT.phoneHref}
            dir="ltr"
            aria-label="تماس مستقیم با ماهیر"
            className="btn btn-ghost text-sm gap-2"
          >
            <IconPhone width={16} height={16} />
            {CONTACT.phoneDisplay}
          </a>

          <Link href="/submit" className="btn btn-gold text-sm">
            ثبت پروژه
          </Link>
        </div>

        {/* mobile toggle */}
        <button
          className="lg:hidden z-50 p-2 rounded-lg"
          style={{ color: "var(--fg)" }}
          aria-label={open ? "بستن منو" : "باز کردن منو"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <IconClose /> : <IconMenu />}
        </button>
      </nav>

      {/* mobile drawer */}
      <div
        className="lg:hidden fixed inset-0 top-0 z-40 transition-all duration-300 overflow-y-auto"
        style={{
          background: "rgba(15,23,42,0.98)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
        }}
      >
        <ul className="flex flex-col gap-1.5 px-8 pt-28 pb-10">
          {LINKS.map((l, i) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-lg font-semibold border-b"
                style={{
                  color: "var(--fg)",
                  borderColor: "var(--border)",
                  transform: open ? "translateX(0)" : "translateX(20px)",
                  opacity: open ? 1 : 0,
                  transition: `all 0.4s ${0.04 * i + 0.1}s`,
                }}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li className="pt-6 space-y-3">
            <a
              href={CONTACT.phoneHref}
              dir="ltr"
              className="btn btn-ghost w-full gap-2.5"
              aria-label="تماس مستقیم با ماهیر"
            >
              <IconPhone width={18} height={18} />
              {CONTACT.phoneDisplay}
            </a>
            <Link href="/submit" onClick={() => setOpen(false)} className="btn btn-gold w-full">
              ثبت پروژه
            </Link>
          </li>

          {/* social icons */}
          <li className="pt-6 flex items-center justify-center gap-3">
            {SOCIAL.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noreferrer"
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  color: "var(--fg-muted)",
                }}
              >
                <Icon width={20} height={20} />
              </a>
            ))}
          </li>
        </ul>
      </div>
    </header>
  );
}
