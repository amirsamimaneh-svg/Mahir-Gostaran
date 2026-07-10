"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useLang } from "@/context/LangContext";

// SVG icons — no emoji
const Icons = {
  Home: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
      <path d="M9 21V12h6v9" />
    </svg>
  ),
  Target: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
    </svg>
  ),
  Bot: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="8" width="18" height="12" rx="2" />
      <path d="M12 8V4" /><circle cx="12" cy="4" r="1.5" />
      <path d="M8 13h.01M16 13h.01M9 17h6" />
    </svg>
  ),
  Grid: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  Menu: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="18" x2="20" y2="18" />
    </svg>
  ),
  Close: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  Blog: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
      <line x1="8" y1="7" x2="16" y2="7" /><line x1="8" y1="11" x2="16" y2="11" /><line x1="8" y1="15" x2="13" y2="15" />
    </svg>
  ),
  Tag: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  ),
  Info: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
  User: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  ),
  Mail: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
};

type NavItem = {
  Icon: () => React.ReactElement;
  label_fa: string;
  label_en: string;
  href: string;
  isLink?: boolean;
};

const MAIN: NavItem[] = [
  { Icon: Icons.Home,   label_fa: "خانه",     label_en: "Home",      href: "#hero" },
  { Icon: Icons.Target, label_fa: "خدمات",    label_en: "Services",  href: "#services" },
  { Icon: Icons.Bot,    label_fa: "مشاوره",   label_en: "Consult",   href: "/consult",   isLink: true },
  { Icon: Icons.Grid,   label_fa: "نمونه‌کار", label_en: "Portfolio", href: "/portfolio", isLink: true },
  { Icon: Icons.Menu,   label_fa: "بیشتر",    label_en: "More",      href: "#more" },
];

const MORE: NavItem[] = [
  { Icon: Icons.Blog, label_fa: "بلاگ",      label_en: "Blog",    href: "/blog",    isLink: true },
  { Icon: Icons.Tag,  label_fa: "قیمت‌ها",   label_en: "Pricing", href: "/pricing", isLink: true },
  { Icon: Icons.Info, label_fa: "درباره ما", label_en: "About",   href: "/about",   isLink: true },
  { Icon: Icons.User, label_fa: "پروفایل",   label_en: "Profile", href: "/profile", isLink: true },
  { Icon: Icons.Mail, label_fa: "تماس",      label_en: "Contact", href: "#contact" },
];

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { lang, isRtl } = useLang();
  const isHome = pathname === "/";
  const [more, setMore] = useState(false);

  useEffect(() => { setMore(false); }, [pathname]);

  useEffect(() => {
    if (!more) return;
    const fn = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-nav]")) setMore(false);
    };
    document.addEventListener("touchstart", fn);
    return () => document.removeEventListener("touchstart", fn);
  }, [more]);

  function handleAnchor(href: string) {
    if (isHome) {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push("/" + href);
    }
    setMore(false);
  }

  function isActive(item: NavItem) {
    if (item.href.startsWith("/")) return pathname === item.href || pathname.startsWith(item.href + "/");
    return false;
  }

  const label = (item: NavItem) => lang === "fa" ? item.label_fa : item.label_en;

  return (
    <>
      {/* Backdrop */}
      {more && (
        <div className="md:hidden fixed inset-0 z-40"
          style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)" }}
          onClick={() => setMore(false)} />
      )}

      {/* More drawer */}
      <div data-nav className="md:hidden fixed z-50 transition-all duration-300 ease-out"
        style={{
          bottom: more ? 90 : 60,
          left: 14,
          right: 14,
          opacity: more ? 1 : 0,
          pointerEvents: more ? "auto" : "none",
          transform: more ? "translateY(0) scale(1)" : "translateY(12px) scale(0.97)",
        }}>
        <div dir={isRtl ? "rtl" : "ltr"} className="rounded-3xl overflow-hidden"
          style={{
            background: "rgba(6,10,20,0.98)",
            border: "1px solid rgba(91,156,246,0.15)",
            backdropFilter: "blur(32px)",
            boxShadow: "0 -8px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.03)",
          }}>

          {/* Drawer header */}
          <div className="flex items-center justify-between px-5 pt-4 pb-3"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <span className="text-xs font-extrabold tracking-[0.2em] uppercase"
              style={{ color: "rgba(91,156,246,0.5)" }}>
              {isRtl ? "صفحات" : "Pages"}
            </span>
            <button onClick={() => setMore(false)}
              className="w-7 h-7 rounded-full flex items-center justify-center transition-all active:scale-90"
              style={{ background: "rgba(255,255,255,0.06)", color: "rgba(216,229,245,0.4)" }}>
              <Icons.Close />
            </button>
          </div>

          {/* Drawer items — 2 column grid */}
          <div className="grid grid-cols-2 gap-2 p-3">
            {MORE.map(item => {
              const active = isActive(item);
              const inner = (
                <div className="flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all active:scale-[0.97]"
                  style={{
                    background: active ? "rgba(91,156,246,0.12)" : "rgba(255,255,255,0.03)",
                    border: active ? "1px solid rgba(91,156,246,0.25)" : "1px solid rgba(255,255,255,0.05)",
                    color: active ? "#5B9CF6" : "rgba(216,229,245,0.55)",
                  }}>
                  <item.Icon />
                  <span className="text-sm font-semibold">{label(item)}</span>
                </div>
              );
              if (item.isLink) return <Link key={item.href} href={item.href} onClick={() => setMore(false)}>{inner}</Link>;
              return <button key={item.href} className="text-start" onClick={() => handleAnchor(item.href)}>{inner}</button>;
            })}
          </div>
        </div>
      </div>

      {/* Main tab bar */}
      <nav data-nav className="md:hidden fixed z-50"
        style={{
          bottom: 14,
          left: 14,
          right: 14,
          background: "rgba(6,10,20,0.95)",
          backdropFilter: "blur(32px)",
          border: "1px solid rgba(91,156,246,0.12)",
          borderRadius: 24,
          boxShadow: "0 8px 40px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.03), 0 -2px 12px rgba(91,156,246,0.06)",
          paddingBottom: "env(safe-area-inset-bottom)",
        }}>
        <div className="flex items-stretch px-2 py-1" dir={isRtl ? "rtl" : "ltr"}>
          {MAIN.map((item) => {
            const isMoreBtn = item.href === "#more";
            const isConsult = item.href === "/consult";
            const active = isMoreBtn ? more : isActive(item);

            const inner = (
              <div className="relative flex flex-col items-center justify-center gap-1 py-2.5 w-full rounded-2xl transition-all duration-200"
                style={{
                  color: active ? "#5B9CF6" : isConsult ? "#fff" : "rgba(216,229,245,0.38)",
                  background: isConsult
                    ? "linear-gradient(135deg,#5B9CF6,#2563EB)"
                    : active
                      ? "rgba(91,156,246,0.1)"
                      : "transparent",
                  boxShadow: isConsult ? "0 0 20px rgba(91,156,246,0.35)" : "none",
                }}>
                {/* Active indicator */}
                {active && !isConsult && (
                  <span className="absolute top-1 w-4 h-0.5 rounded-full"
                    style={{ background: "#5B9CF6", boxShadow: "0 0 8px #5B9CF6" }} />
                )}
                <item.Icon />
                <span className="text-[9px] font-bold tracking-tight">{label(item)}</span>
              </div>
            );

            if (isMoreBtn) {
              return (
                <button key="more" onClick={() => setMore(v => !v)}
                  className="flex-1 flex items-center justify-center transition-all active:scale-90">
                  {more
                    ? <div className="flex flex-col items-center gap-1 py-2.5 w-full rounded-2xl"
                        style={{ color: "rgba(216,229,245,0.38)" }}>
                        <Icons.Close />
                        <span className="text-[9px] font-bold tracking-tight">{isRtl ? "بستن" : "Close"}</span>
                      </div>
                    : inner}
                </button>
              );
            }

            if (item.isLink) {
              return (
                <Link key={item.href} href={item.href}
                  className="flex-1 flex items-center justify-center transition-all active:scale-90">
                  {inner}
                </Link>
              );
            }

            return (
              <button key={item.href}
                onClick={() => handleAnchor(item.href)}
                className="flex-1 flex items-center justify-center transition-all active:scale-90">
                {inner}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
