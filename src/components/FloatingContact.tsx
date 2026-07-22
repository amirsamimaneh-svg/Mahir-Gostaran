"use client";

import { useState } from "react";
import { CONTACT } from "@/data/contact";
import { IconChat, IconClose, IconWhatsApp, IconPhone, IconTelegram } from "./icons";

const OPTIONS = [
  {
    label: "واتساپ",
    href: CONTACT.whatsapp,
    Icon: IconWhatsApp,
    color: "#25D366",
    external: true,
  },
  {
    label: "تماس تلفنی",
    href: CONTACT.phoneHref,
    Icon: IconPhone,
    color: "var(--gold)",
    external: false,
  },
  {
    label: "تلگرام",
    href: CONTACT.telegram,
    Icon: IconTelegram,
    color: "#2AABEE",
    external: true,
  },
];

export default function FloatingContact() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="fixed bottom-5 z-50 flex flex-col items-end gap-3"
      style={{ insetInlineEnd: "1.25rem" }}
    >
      {/* options */}
      <ul className="flex flex-col items-end gap-2.5">
        {OPTIONS.map((o, i) => (
          <li
            key={o.label}
            style={{
              transform: open ? "translateY(0) scale(1)" : "translateY(12px) scale(0.9)",
              opacity: open ? 1 : 0,
              pointerEvents: open ? "auto" : "none",
              transition: `all 0.28s ${open ? i * 0.05 : 0}s cubic-bezier(.22,.68,0,1.2)`,
            }}
          >
            <a
              href={o.href}
              target={o.external ? "_blank" : undefined}
              rel={o.external ? "noreferrer" : undefined}
              className="flex items-center gap-2.5 ps-4 pe-2 py-2 rounded-full shadow-lg"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border-strong)",
              }}
            >
              <span className="text-sm font-semibold" style={{ color: "var(--fg)" }}>
                {o.label}
              </span>
              <span
                className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                style={{ background: `${o.color}22`, color: o.color }}
              >
                <o.Icon width={18} height={18} />
              </span>
            </a>
          </li>
        ))}
      </ul>

      {/* main toggle */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "بستن راه‌های تماس" : "راه‌های تماس"}
        aria-expanded={open}
        className="w-14 h-14 rounded-full flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
        style={{
          background: "linear-gradient(140deg, var(--gold-deep), var(--gold) 55%, var(--gold-bright))",
          color: "#14100A",
          boxShadow: "0 10px 30px -6px var(--gold-glow)",
        }}
      >
        <span
          style={{
            transform: open ? "rotate(90deg)" : "rotate(0)",
            transition: "transform 0.3s",
            display: "inline-flex",
          }}
        >
          {open ? <IconClose width={24} height={24} /> : <IconChat width={24} height={24} />}
        </span>
      </button>
    </div>
  );
}
