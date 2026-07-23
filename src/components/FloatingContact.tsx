"use client";

import { useState } from "react";
import { CONTACT } from "@/data/contact";
import { IconChat, IconClose, IconPhone } from "./icons";

const OPTIONS = [
  { label: "روبیکا", href: CONTACT.rubika, Icon: IconChat, color: "#7C4DFF", external: true },
  { label: "بله", href: CONTACT.bale, Icon: IconChat, color: "#22B573", external: true },
  { label: "سروش", href: CONTACT.soroush, Icon: IconChat, color: "#1E9BE9", external: true },
  { label: "تماس تلفنی", href: CONTACT.phoneHref, Icon: IconPhone, color: "var(--gold)", external: false },
];

export default function FloatingContact() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="fixed bottom-5 z-50 flex flex-col items-end gap-3"
      style={{ insetInlineEnd: "1.1rem" }}
    >
      {/* options */}
      <ul className="flex flex-col items-end gap-2.5">
        {OPTIONS.map((o, i) => (
          <li
            key={o.label}
            style={{
              transform: open ? "translateY(0) scale(1)" : "translateY(14px) scale(0.9)",
              opacity: open ? 1 : 0,
              pointerEvents: open ? "auto" : "none",
              transition: `all 0.28s ${open ? i * 0.05 : 0}s cubic-bezier(.22,.68,0,1.2)`,
            }}
          >
            <a
              href={o.href}
              target={o.external ? "_blank" : undefined}
              rel={o.external ? "noreferrer" : undefined}
              className="flex items-center gap-2.5 ps-4 pe-2 py-2.5 rounded-full shadow-lg"
              style={{ background: "var(--surface)", border: "1px solid var(--border-strong)" }}
            >
              <span className="text-sm font-bold" style={{ color: "var(--fg)" }}>
                {o.label}
              </span>
              <span
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                style={{ background: `${o.color}22`, color: o.color }}
              >
                <o.Icon width={19} height={19} />
              </span>
            </a>
          </li>
        ))}
      </ul>

      {/* main toggle — larger on mobile */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "بستن راه‌های تماس" : "راه‌های تماس با ماهیر"}
        aria-expanded={open}
        className="w-16 h-16 rounded-full flex items-center justify-center transition-transform hover:scale-105 active:scale-95 relative"
        style={{
          background: "linear-gradient(140deg, var(--gold-deep), var(--gold) 55%, var(--gold-bright))",
          color: "#14100A",
          boxShadow: "0 12px 34px -6px var(--gold-glow)",
        }}
      >
        {/* subtle pulse ring when closed */}
        {!open && (
          <span
            className="absolute inset-0 rounded-full anim-pulse"
            style={{ boxShadow: "0 0 0 6px var(--gold-soft)" }}
            aria-hidden
          />
        )}
        <span
          className="relative"
          style={{
            transform: open ? "rotate(90deg)" : "rotate(0)",
            transition: "transform 0.3s",
            display: "inline-flex",
          }}
        >
          {open ? <IconClose width={26} height={26} /> : <IconChat width={27} height={27} />}
        </span>
      </button>
    </div>
  );
}
