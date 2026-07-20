"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";
import { IconMenu, IconClose } from "./icons";

const LINKS = [
  { href: "#services", label: "خدمات" },
  { href: "#process", label: "فرآیند کار" },
  { href: "#results", label: "نتایج" },
  { href: "#why", label: "درباره ما" },
  { href: "#contact", label: "تماس" },
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
        <a href="#top" aria-label="ماهیر" className="z-50">
          <Logo />
        </a>

        {/* desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="px-3.5 py-2 rounded-lg text-sm font-medium transition-colors"
                style={{ color: "var(--fg-muted)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold-bright)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--fg-muted)")}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <a href="#contact" className="btn btn-gold text-sm">
            درخواست بررسی رایگان
          </a>
        </div>

        {/* mobile toggle */}
        <button
          className="md:hidden z-50 p-2 rounded-lg"
          style={{ color: "var(--fg)" }}
          aria-label={open ? "بستن منو" : "باز کردن منو"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <IconClose /> : <IconMenu />}
        </button>
      </nav>

      {/* mobile drawer */}
      <div
        className="md:hidden fixed inset-0 top-0 z-40 transition-all duration-300"
        style={{
          background: "rgba(7,7,10,0.97)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
        }}
      >
        <ul className="flex flex-col gap-2 px-8 pt-28">
          {LINKS.map((l, i) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-lg font-semibold border-b transition-transform"
                style={{
                  color: "var(--fg)",
                  borderColor: "var(--border)",
                  transform: open ? "translateX(0)" : "translateX(20px)",
                  opacity: open ? 1 : 0,
                  transition: `all 0.4s ${0.05 * i + 0.1}s`,
                }}
              >
                {l.label}
              </a>
            </li>
          ))}
          <li className="pt-6">
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="btn btn-gold w-full"
            >
              درخواست بررسی رایگان
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
