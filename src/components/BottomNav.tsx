"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Item = { icon: string; label: string; href: string; isLink?: boolean };

const ITEMS: { fa: Item[]; en: Item[] } = {
  fa: [
    { icon: "🏠", label: "خانه",       href: "#hero" },
    { icon: "🎯", label: "خدمات",      href: "#services" },
    { icon: "📁", label: "نمونه‌کارها", href: "#portfolio" },
    { icon: "🤖", label: "مشاوره",     href: "/consult", isLink: true },
    { icon: "💬", label: "تماس",       href: "#contact" },
  ],
  en: [
    { icon: "🏠", label: "Home",      href: "#hero" },
    { icon: "🎯", label: "Services",  href: "#services" },
    { icon: "📁", label: "Portfolio", href: "#portfolio" },
    { icon: "🤖", label: "Consult",   href: "/consult", isLink: true },
    { icon: "💬", label: "Contact",   href: "#contact" },
  ],
};

function scrollTo(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
}

export default function BottomNav({ lang = "fa" }: { lang?: "fa" | "en" }) {
  const items = ITEMS[lang];
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <nav
      className="md:hidden fixed z-50"
      style={{
        bottom: "5px",
        left: "12px",
        right: "12px",
        background: "rgba(5,5,20,0.55)",
        backdropFilter: "blur(24px)",
        border: "1px solid rgba(251,191,36,0.12)",
        borderRadius: "20px",
        boxShadow: "0 4px 32px rgba(0,0,0,0.35)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <div className="flex items-stretch justify-around">
        {items.map((item) => {
          const isConsult = item.isLink;

          const inner = (
            <div className="flex flex-col items-center justify-center gap-1 py-2.5 px-2 min-w-0 w-full">
              <span className={`text-xl leading-none transition-transform ${isConsult ? "scale-110" : ""}`}>
                {item.icon}
              </span>
              <span
                className="text-[10px] font-bold truncate"
                style={{ color: isConsult ? "#fbbf24" : "rgba(240,240,245,0.5)" }}
              >
                {item.label}
              </span>
              {isConsult && (
                <span
                  className="absolute -top-1 w-1 h-1 rounded-full bg-amber-400"
                  style={{ boxShadow: "0 0 6px #fbbf24" }}
                />
              )}
            </div>
          );

          if (isConsult) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative flex-1 flex items-center justify-center transition-all active:scale-95"
                style={{ background: "rgba(251,191,36,0.07)" }}
              >
                {inner}
              </Link>
            );
          }

          return (
            <button
              key={item.href}
              onClick={() => isHome && scrollTo(item.href)}
              className="relative flex-1 flex items-center justify-center transition-all active:scale-95 hover:bg-white/[0.03]"
              aria-label={item.label}
            >
              {inner}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
