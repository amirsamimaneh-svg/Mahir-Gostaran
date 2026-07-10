"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Lang = "fa" | "en";

interface LangContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  cycle: () => void;
  isRtl: boolean;
}

const LangContext = createContext<LangContextType>({
  lang: "fa", setLang: () => {}, cycle: () => {}, isRtl: true,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fa");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("mahir-lang") as Lang | null;
    if (saved && ["fa", "en"].includes(saved)) setLangState(saved);
    setReady(true);
  }, []);

  function setLang(l: Lang) {
    setLangState(l);
    localStorage.setItem("mahir-lang", l);
  }

  function cycle() {
    setLang(lang === "fa" ? "en" : "fa");
  }

  const isRtl = lang === "fa";

  if (!ready) return null;

  return (
    <LangContext.Provider value={{ lang, setLang, cycle, isRtl }}>
      <div dir={isRtl ? "rtl" : "ltr"} lang={lang}>
        {children}
      </div>
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
