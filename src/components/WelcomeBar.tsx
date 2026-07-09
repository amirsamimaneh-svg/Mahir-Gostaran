"use client";

import { useEffect, useState } from "react";
import { useLang, Lang } from "@/context/LangContext";

export default function WelcomeBar() {
  const { lang, setLang } = useLang();
  const [visible, setVisible] = useState(false);
  const [localLang, setLocalLang] = useState<Lang>(lang);

  useEffect(() => {
    const saved = localStorage.getItem("mahir-lang");
    if (!saved) {
      setTimeout(() => setVisible(true), 800);
    }
  }, []);

  function apply() {
    setLang(localLang);
    localStorage.setItem("mahir-lang", localLang);
    setVisible(false);
  }

  if (!visible) return null;

  const isRtl = localLang !== "en";

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className="fixed bottom-4 left-1/2 z-[100] w-[calc(100%-2rem)] max-w-xl
        -translate-x-1/2 rounded-2xl px-5 py-4
        shadow-[0_8px_40px_rgba(0,0,0,0.5)]"
      style={{
        background: "rgba(15,15,30,0.92)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(79,110,255,0.25)",
        animation: "slideUpBar 0.5s cubic-bezier(.22,.68,0,1.2) both",
      }}
    >
      <style>{`
        @keyframes slideUpBar {
          from { opacity:0; transform:translate(-50%,24px); }
          to   { opacity:1; transform:translate(-50%,0); }
        }
      `}</style>

      <p className="text-xs font-bold text-[#5B9CF6] tracking-widest mb-3 text-center">
        {localLang === "fa" ? "🌐 زبان سایت" : localLang === "ar" ? "🌐 لغة الموقع" : "🌐 Site Language"}
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="flex items-center gap-1.5 rounded-xl p-1"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
          {(["fa", "en", "ar"] as Lang[]).map(l => (
            <button key={l}
              onClick={() => setLocalLang(l)}
              className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
              style={{
                background: localLang === l ? "#2563EB" : "transparent",
                color: localLang === l ? "#111" : "rgba(255,255,255,0.55)",
              }}>
              {l === "fa" ? "🇮🇷 فارسی" : l === "ar" ? "🇦🇪 العربية" : "🇬🇧 English"}
            </button>
          ))}
        </div>

        <button
          onClick={apply}
          className="px-5 py-2 rounded-xl text-xs font-bold transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
          style={{ background: "#2563EB", color: "#111" }}>
          {localLang === "fa" ? "تأیید ✓" : localLang === "ar" ? "تأكيد ✓" : "Confirm ✓"}
        </button>
      </div>

      <button
        onClick={apply}
        className="absolute top-3 text-xs transition-colors hover:text-[#2563EB]"
        style={{ [isRtl ? "left" : "right"]: "12px", color: "rgba(255,255,255,0.25)" }}>
        ✕
      </button>
    </div>
  );
}
