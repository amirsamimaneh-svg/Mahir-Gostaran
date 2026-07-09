"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useLang } from "@/context/LangContext";

type Item = { icon: string; label_fa: string; label_en: string; label_ar: string; href: string; isLink?: boolean };

const MAIN: Item[] = [
  { icon: "🏠", label_fa: "خانه",    label_en: "Home",      label_ar: "الرئيسية", href: "#hero" },
  { icon: "🎯", label_fa: "خدمات",   label_en: "Services",  label_ar: "الخدمات",  href: "#services" },
  { icon: "🤖", label_fa: "مشاوره",  label_en: "Consult",   label_ar: "استشارة",  href: "/consult",   isLink: true },
  { icon: "📁", label_fa: "نمونه‌کار", label_en: "Portfolio", label_ar: "أعمالنا",  href: "/portfolio", isLink: true },
  { icon: "☰",  label_fa: "بیشتر",   label_en: "More",      label_ar: "المزيد",   href: "#more" },
];

const MORE: Item[] = [
  { icon: "📝", label_fa: "بلاگ",      label_en: "Blog",    label_ar: "المدونة",   href: "/blog",    isLink: true },
  { icon: "💰", label_fa: "قیمت‌ها",   label_en: "Pricing", label_ar: "الأسعار",   href: "/pricing", isLink: true },
  { icon: "ℹ️", label_fa: "درباره ما", label_en: "About",   label_ar: "عن ماهير",  href: "/about",   isLink: true },
  { icon: "👤", label_fa: "پروفایل",   label_en: "Profile", label_ar: "الملف",     href: "/profile", isLink: true },
  { icon: "💬", label_fa: "تماس",      label_en: "Contact", label_ar: "تواصل",     href: "#contact" },
];

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { lang, isRtl } = useLang();
  const isHome = pathname === "/";
  const [more, setMore] = useState(false);

  // Close drawer on route change
  useEffect(() => { setMore(false); }, [pathname]);

  // Close on outside tap
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

  function isActive(item: Item) {
    if (item.href.startsWith("/")) return pathname.startsWith(item.href);
    return false;
  }

  const label = (item: Item) => lang === "fa" ? item.label_fa : lang === "ar" ? item.label_ar : item.label_en;

  return (
    <>
      {/* More drawer backdrop */}
      {more && (
        <div
          className="md:hidden fixed inset-0 z-40"
          style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
          onClick={() => setMore(false)}
        />
      )}

      {/* More drawer — slides up */}
      <div
        data-nav
        className="md:hidden fixed z-50 transition-all duration-300"
        style={{
          bottom: more ? 82 : 20,
          left: 12,
          right: 12,
          opacity: more ? 1 : 0,
          pointerEvents: more ? "auto" : "none",
          transform: more ? "translateY(0)" : "translateY(16px)",
        }}
      >
        <div
          dir={isRtl ? "rtl" : "ltr"}
          className="rounded-2xl overflow-hidden"
          style={{
            background: "rgba(9,15,32,0.97)",
            border: "1px solid var(--border2)",
            backdropFilter: "blur(24px)",
            boxShadow: "0 -8px 40px rgba(0,0,0,0.5)",
          }}
        >
          <div className="px-4 pt-3 pb-1">
            <p className="text-xs font-bold tracking-widest" style={{ color: "var(--fg3)" }}>
              {isRtl ? "صفحات بیشتر" : "More Pages"}
            </p>
          </div>
          <div className="grid grid-cols-5 gap-0 px-2 pb-3 pt-1">
            {MORE.map(item => {
              const active = isActive(item);
              const inner = (
                <div
                  className="flex flex-col items-center gap-1.5 py-3 rounded-xl transition-all active:scale-95"
                  style={{ background: active ? "rgba(91,156,246,0.12)" : "transparent" }}
                >
                  <span className="text-xl leading-none">{item.icon}</span>
                  <span
                    className="text-[9px] font-bold text-center leading-tight"
                    style={{ color: active ? "#5B9CF6" : "var(--fg2)" }}
                  >
                    {label(item)}
                  </span>
                </div>
              );
              if (item.isLink) {
                return <Link key={item.href} href={item.href} onClick={() => setMore(false)}>{inner}</Link>;
              }
              return (
                <button key={item.href} onClick={() => handleAnchor(item.href)}>{inner}</button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Tab Bar */}
      <nav
        data-nav
        className="md:hidden fixed z-50"
        style={{
          bottom: 12,
          left: 12,
          right: 12,
          background: "rgba(8,14,24,0.92)",
          backdropFilter: "blur(28px)",
          border: "1px solid var(--border2)",
          borderRadius: 22,
          boxShadow: "0 4px 40px rgba(0,0,0,0.45)",
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        <div className="flex items-stretch" dir={isRtl ? "rtl" : "ltr"}>
          {MAIN.map((item) => {
            const isMore = item.href === "#more";
            const active = isMore ? more : isActive(item);
            const isConsult = item.href === "/consult";

            const inner = (
              <div className="flex flex-col items-center justify-center gap-1 py-3 px-1 w-full transition-all">
                {/* Consult: pill button style */}
                {isConsult ? (
                  <div
                    className="flex items-center justify-center w-10 h-7 rounded-full text-base leading-none transition-all"
                    style={{
                      background: "linear-gradient(135deg,#5B9CF6,#3B82F6)",
                      boxShadow: "0 0 14px rgba(91,156,246,0.4)",
                    }}
                  >
                    {item.icon}
                  </div>
                ) : (
                  <span
                    className="text-xl leading-none transition-all"
                    style={{ filter: active ? "drop-shadow(0 0 6px rgba(91,156,246,0.6))" : "none" }}
                  >
                    {item.icon}
                  </span>
                )}
                <span
                  className="text-[10px] font-bold tracking-tight"
                  style={{ color: active || isConsult ? "#5B9CF6" : "var(--fg3)" }}
                >
                  {label(item)}
                </span>
                {/* Active dot */}
                {active && !isConsult && (
                  <span
                    className="absolute top-1.5 w-1 h-1 rounded-full"
                    style={{ background: "#5B9CF6", boxShadow: "0 0 5px #5B9CF6" }}
                  />
                )}
              </div>
            );

            if (isMore) {
              return (
                <button
                  key="more"
                  onClick={() => setMore(v => !v)}
                  className="relative flex-1 flex items-center justify-center active:scale-95 transition-all"
                >
                  {inner}
                </button>
              );
            }

            if (item.isLink) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative flex-1 flex items-center justify-center active:scale-95 transition-all"
                >
                  {inner}
                </Link>
              );
            }

            return (
              <button
                key={item.href}
                onClick={() => handleAnchor(item.href)}
                className="relative flex-1 flex items-center justify-center active:scale-95 transition-all"
                aria-label={label(item)}
              >
                {inner}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
