"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "fa" | "en";

interface LangContextType {
  lang: Lang;
  toggle: () => void;
  setLang: (l: Lang) => void;
}

const LangContext = createContext<LangContextType>({ lang: "fa", toggle: () => {}, setLang: () => {} });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("fa");
  const toggle = () => setLang(l => l === "fa" ? "en" : "fa");
  return (
    <LangContext.Provider value={{ lang, toggle, setLang }}>
      <div dir={lang === "fa" ? "rtl" : "ltr"} lang={lang}>
        {children}
      </div>
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
