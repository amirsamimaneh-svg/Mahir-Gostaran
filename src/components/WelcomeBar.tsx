"use client";

import { useEffect, useState } from "react";

interface Prefs {
  theme: "dark" | "light";
  lang: "fa" | "en";
}

export default function WelcomeBar({
  onApply,
}: {
  onApply: (prefs: Prefs) => void;
}) {
  const [visible, setVisible] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [lang, setLang] = useState<"fa" | "en">("fa");

  useEffect(() => {
    // فقط دفعه اول نشون بده
    const saved = localStorage.getItem("mahir-prefs");
    if (!saved) {
      setTimeout(() => setVisible(true), 800);
    } else {
      const p: Prefs = JSON.parse(saved);
      onApply(p);
    }
  }, []);

  function apply() {
    const prefs: Prefs = { theme, lang };
    localStorage.setItem("mahir-prefs", JSON.stringify(prefs));
    onApply(prefs);
    setVisible(false);
  }

  if (!visible) return null;

  const isRtl = lang === "fa";

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className="fixed bottom-4 left-1/2 z-[100] w-[calc(100%-2rem)] max-w-xl
        -translate-x-1/2 rounded-2xl px-5 py-4
        shadow-[0_8px_40px_rgba(0,0,0,0.5)]"
      style={{
        background: "rgba(15,15,30,0.92)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(251,191,36,0.25)",
        animation: "slideUpBar 0.5s cubic-bezier(.22,.68,0,1.2) both",
      }}
    >
      <style>{`
        @keyframes slideUpBar {
          from { opacity:0; transform:translate(-50%,24px); }
          to   { opacity:1; transform:translate(-50%,0); }
        }
      `}</style>

      {/* Title */}
      <p className="text-xs font-bold text-amber-400 tracking-widest mb-3 text-center">
        {isRtl ? "⚙️ تنظیمات نمایش" : "⚙️ Display Settings"}
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-3">

        {/* Theme */}
        <div className="flex items-center gap-1.5 rounded-xl p-1"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <button
            onClick={() => setTheme("dark")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
            style={{
              background: theme === "dark" ? "#fbbf24" : "transparent",
              color: theme === "dark" ? "#111" : "rgba(255,255,255,0.55)",
            }}>
            🌙 {isRtl ? "تاریک" : "Dark"}
          </button>
          <button
            onClick={() => setTheme("light")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
            style={{
              background: theme === "light" ? "#fbbf24" : "transparent",
              color: theme === "light" ? "#111" : "rgba(255,255,255,0.55)",
            }}>
            ☀️ {isRtl ? "روشن" : "Light"}
          </button>
        </div>

        {/* Language */}
        <div className="flex items-center gap-1.5 rounded-xl p-1"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <button
            onClick={() => setLang("fa")}
            className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
            style={{
              background: lang === "fa" ? "#fbbf24" : "transparent",
              color: lang === "fa" ? "#111" : "rgba(255,255,255,0.55)",
            }}>
            🇮🇷 فارسی
          </button>
          <button
            onClick={() => setLang("en")}
            className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
            style={{
              background: lang === "en" ? "#fbbf24" : "transparent",
              color: lang === "en" ? "#111" : "rgba(255,255,255,0.55)",
            }}>
            🇬🇧 English
          </button>
        </div>

        {/* Confirm */}
        <button
          onClick={apply}
          className="px-5 py-2 rounded-xl text-xs font-bold transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
          style={{ background: "#fbbf24", color: "#111" }}>
          {isRtl ? "تأیید ✓" : "Confirm ✓"}
        </button>
      </div>

      {/* skip */}
      <button
        onClick={apply}
        className="absolute top-3 text-xs transition-colors hover:text-amber-400"
        style={{ [isRtl ? "left" : "right"]: "12px", color: "rgba(255,255,255,0.25)" }}>
        ✕
      </button>
    </div>
  );
}
