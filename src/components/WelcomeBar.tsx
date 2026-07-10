"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/context/LangContext";

export default function WelcomeBar() {
  const { lang, setLang } = useLang();
  const [visible, setVisible] = useState(false);
  const [local, setLocal] = useState(lang);

  useEffect(() => {
    const saved = localStorage.getItem("mahir-lang");
    if (!saved) setTimeout(() => setVisible(true), 800);
  }, []);

  function apply() {
    setLang(local);
    localStorage.setItem("mahir-lang", local);
    setVisible(false);
  }

  if (!visible) return null;

  const isRtl = local === "fa";

  return (
    <div dir={isRtl ? "rtl" : "ltr"}
      className="fixed bottom-24 md:bottom-6 left-1/2 z-[100] w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 rounded-2xl px-5 py-4"
      style={{
        background: "rgba(8,14,24,0.95)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(91,156,246,0.2)",
        boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
        animation: "slideUpBar 0.5s cubic-bezier(.22,.68,0,1.2) both",
      }}>
      <style>{`@keyframes slideUpBar{from{opacity:0;transform:translate(-50%,20px)}to{opacity:1;transform:translate(-50%,0)}}`}</style>

      <p className="text-xs font-bold text-[#5B9CF6] mb-3 text-center tracking-widest">
        🌐 {isRtl ? "زبان سایت رو انتخاب کن" : "Choose your language"}
      </p>

      <div className="flex items-center gap-2 justify-center">
        <button onClick={() => setLocal("fa")}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all"
          style={{
            background: local === "fa" ? "#5B9CF6" : "rgba(255,255,255,0.06)",
            color: local === "fa" ? "#03080F" : "rgba(255,255,255,0.5)",
            border: local === "fa" ? "none" : "1px solid rgba(255,255,255,0.1)",
          }}>
          🇮🇷 فارسی
        </button>
        <button onClick={() => setLocal("en")}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all"
          style={{
            background: local === "en" ? "#5B9CF6" : "rgba(255,255,255,0.06)",
            color: local === "en" ? "#03080F" : "rgba(255,255,255,0.5)",
            border: local === "en" ? "none" : "1px solid rgba(255,255,255,0.1)",
          }}>
          🇬🇧 English
        </button>
        <button onClick={apply}
          className="px-4 py-2 rounded-xl text-sm font-extrabold transition-all hover:scale-105"
          style={{ background: "rgba(91,156,246,0.15)", color: "#5B9CF6", border: "1px solid rgba(91,156,246,0.3)" }}>
          {isRtl ? "تأیید ✓" : "OK ✓"}
        </button>
      </div>

      <button onClick={apply}
        className="absolute top-3 text-xs hover:text-[#5B9CF6] transition-colors"
        style={{ [isRtl ? "left" : "right"]: "12px", color: "rgba(255,255,255,0.2)" }}>✕</button>
    </div>
  );
}
