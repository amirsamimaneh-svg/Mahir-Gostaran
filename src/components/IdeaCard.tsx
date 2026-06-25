"use client";

import { useState, useEffect, useRef } from "react";

const labels = {
  fa: {
    title: "هوش رشد ماهیر",
    placeholder: "مثلاً: کافه‌ی محلی، فروشگاه لباس آنلاین…",
    btn: "تولید ایده",
    thinking: "در حال فکر کردن…",
  },
  en: {
    title: "Mahir Growth AI",
    placeholder: "e.g. Local café, online clothing store…",
    btn: "Generate Idea",
    thinking: "Thinking…",
  },
};

export default function IdeaCard({ lang = "fa" }: { lang?: "fa" | "en" }) {
  const tx = labels[lang];
  const [business, setBusiness] = useState("");
  const [loading, setLoading] = useState(false);
  const [displayed, setDisplayed] = useState("");
  const [fullText, setFullText] = useState("");
  const [error, setError] = useState("");
  const [cursorOn, setCursorOn] = useState(false);
  const typeRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // blinking cursor
  useEffect(() => {
    const id = setInterval(() => setCursorOn((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  // typewriter
  useEffect(() => {
    if (!fullText) return;
    setDisplayed("");
    let i = 0;
    function tick() {
      i++;
      setDisplayed(fullText.slice(0, i));
      if (i < fullText.length) typeRef.current = setTimeout(tick, 28);
    }
    typeRef.current = setTimeout(tick, 28);
    return () => { if (typeRef.current) clearTimeout(typeRef.current); };
  }, [fullText]);

  async function handleSubmit() {
    const trimmed = business.trim();
    if (!trimmed || loading) return;
    setLoading(true);
    setError("");
    setFullText("");
    setDisplayed("");
    try {
      const res = await fetch("/api/idea", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ business: trimmed, lang }),
      });
      const data = await res.json();
      if (!res.ok || data.error) setError(data.error ?? "خطا");
      else setFullText(data.idea ?? "");
    } catch {
      setError(
        lang === "fa"
          ? "اتصال به سرور برقرار نشد."
          : "Could not connect to server."
      );
    } finally {
      setLoading(false);
    }
  }

  function renderIdea() {
    if (!displayed) return null;
    const lines = displayed.split("\n");
    return (
      <div className={lang === "fa" ? "text-right" : "text-left"}>
        {lines.map((line, idx) =>
          idx === 0 ? (
            <p key={idx} className="font-bold text-amber-400 text-base mb-1">{line}</p>
          ) : (
            <p key={idx} className="text-white/85 text-sm leading-relaxed">{line}</p>
          )
        )}
        <span
          className="inline-block w-0.5 h-4 bg-amber-400 align-middle ml-0.5"
          style={{ opacity: cursorOn ? 1 : 0, transition: "opacity 0.1s" }}
        />
      </div>
    );
  }

  return (
    <div
      dir={lang === "fa" ? "rtl" : "ltr"}
      className="relative w-full max-w-lg mx-auto rounded-2xl overflow-hidden
        bg-white/10 backdrop-blur-xl border border-white/20
        shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
    >
      {/* Terminal top bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5">
        <span className="w-3 h-3 rounded-full bg-red-400" />
        <span className="w-3 h-3 rounded-full bg-yellow-400" />
        <span className="w-3 h-3 rounded-full bg-green-400" />
        <span className={`text-white/70 text-sm font-medium tracking-wide ${lang === "fa" ? "mr-3" : "ml-3"}`}>
          {tx.title}
        </span>
      </div>

      <div className="p-6 space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={business}
            onChange={(e) => setBusiness(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder={tx.placeholder}
            disabled={loading}
            className="flex-1 bg-white/10 border border-white/20 rounded-lg
              px-4 py-2.5 text-white text-sm placeholder:text-white/40
              focus:outline-none focus:ring-2 focus:ring-amber-400/60
              disabled:opacity-50 transition"
          />
          <button
            onClick={handleSubmit}
            disabled={loading || !business.trim()}
            className="px-4 py-2.5 rounded-lg text-sm font-semibold
              bg-amber-400 text-gray-900 hover:bg-amber-300
              disabled:opacity-40 disabled:cursor-not-allowed
              transition-all active:scale-95 whitespace-nowrap"
          >
            {tx.btn}
          </button>
        </div>

        <div className="min-h-[80px]">
          {loading && (
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <svg className="animate-spin w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              {tx.thinking}
            </div>
          )}
          {error && !loading && (
            <p className={`text-red-400 text-sm ${lang === "fa" ? "text-right" : "text-left"}`}>{error}</p>
          )}
          {!loading && !error && displayed && renderIdea()}
        </div>
      </div>
    </div>
  );
}
