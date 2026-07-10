"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLang } from "@/context/LangContext";
import MahirLogo from "@/components/MahirLogo";

type NavLink = { label: string; href: string };

interface PageNavProps {
  /** Override the right-side action button. Defaults to "← Back" → "/" */
  backHref?: string;
  backLabel?: string;
  /** Extra links shown in the middle (desktop only) */
  links?: NavLink[];
}

export default function PageNav({ backHref = "/", backLabel, links }: PageNavProps) {
  const { lang, cycle, isRtl } = useLang();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const defaultBack = isRtl ? "← خانه" : "← Home";

  return (
    <nav
      className="fixed top-0 inset-x-0 z-50"
      style={{
        background: scrolled ? "rgba(4,8,16,0.96)" : "rgba(4,8,16,0.6)",
        backdropFilter: "blur(24px)",
        borderBottom: scrolled ? "1px solid rgba(91,156,246,0.1)" : "1px solid transparent",
        transition: "all 0.35s ease",
      }}>
      <div
        className="max-w-6xl mx-auto flex items-center justify-between gap-4 px-5 md:px-10 h-[68px]"
        dir={isRtl ? "rtl" : "ltr"}>

        {/* Logo */}
        <Link href="/" className="group flex items-center gap-3 flex-shrink-0">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
            style={{
              background: "linear-gradient(135deg,rgba(91,156,246,0.22),rgba(37,99,235,0.1))",
              border: "1.5px solid rgba(91,156,246,0.35)",
              boxShadow: "0 0 16px rgba(91,156,246,0.15)",
            }}>
            <MahirLogo size={22} />
          </div>
          <span
            className="font-black tracking-widest text-lg"
            style={{ color: "#5B9CF6", letterSpacing: "0.1em" }}>
            {isRtl ? "ماهیر" : "Mahir"}
          </span>
        </Link>

        {/* Middle links — desktop */}
        {links && links.length > 0 && (
          <ul className="hidden md:flex items-center gap-1">
            {links.map(l => (
              <li key={l.href}>
                <Link href={l.href}
                  className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:text-[#5B9CF6]"
                  style={{ color: "rgba(216,229,245,0.5)" }}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        )}

        {/* Right side */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Lang toggle */}
          <button
            onClick={cycle}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 hover:text-[#5B9CF6] hover:border-[rgba(91,156,246,0.3)]"
            style={{ border: "1px solid rgba(255,255,255,0.1)", color: "rgba(216,229,245,0.4)" }}>
            <span>{lang === "fa" ? "🇬🇧" : "🇮🇷"}</span>
            <span>{lang === "fa" ? "EN" : "فا"}</span>
          </button>

          {/* Back / CTA */}
          <Link
            href={backHref}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 hover:text-[#5B9CF6]"
            style={{ border: "1px solid rgba(255,255,255,0.1)", color: "rgba(216,229,245,0.5)" }}>
            {backLabel ?? defaultBack}
          </Link>
        </div>
      </div>
    </nav>
  );
}
