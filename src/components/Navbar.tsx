"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { IconMenu, IconClose } from "./icons";

const LINKS = [
  { href: "/", label: "صفحه اصلی" },
  { href: "/#services", label: "خدمات" },
  { href: "/#process", label: "فرآیند کار" },
  { href: "/#portfolio", label: "نمونه‌کارها" },
  { href: "/#why", label: "درباره ما" },
  { href: "/#faq", label: "سوالات متداول" },
  { href: "/#contact", label: "تماس" },
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
        background: scrolled ? "rgba(7,7,10,0.82)" : "transparent",
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
                className="px-3 py-2 rounded-lg text-[13px] font-medium transition-colors block"
                style={{ color: "var(--fg-muted)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold-bright)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--fg-muted)")}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block shrink-0">
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
          background: "rgba(7,7,10,0.98)",
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
          <li className="pt-6">
            <Link href="/submit" onClick={() => setOpen(false)} className="btn btn-gold w-full">
              ثبت پروژه
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
