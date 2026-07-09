"use client";

import { useState, useEffect, useRef } from "react";

const CATEGORIES = {
  fa: ["کافه / رستوران", "فروشگاه آنلاین", "آموزشگاه", "کلینیک / پزشکی", "استارتاپ", "خدمات", "دیگر…"],
  en: ["Café / Restaurant", "Online Store", "Training Center", "Clinic / Medical", "Startup", "Services", "Other…"],
};

const labels = {
  fa: {
    title: "هوش رشد ماهیر",
    subtitle: "کسب‌وکارت را بنویس، ایده رشد بگیر",
    placeholder: "مثلاً: کافه محلی، فروشگاه لباس آنلاین…",
    categoryLabel: "یا از دسته‌بندی انتخاب کن:",
    btn: "دریافت ایده رشد ✦",
    thinking: "در حال تحلیل کسب‌وکار شما…",
    errorTitle: "پیام ماهیر",
    errorMsg: "در زودترین فرصت به شما پاسخ می‌دهیم.\nاگر می‌خواهید سریع‌تر با ما در ارتباط باشید، به آیدی تلگرام ما پیام بدید:",
    tg: "@Mahirofficalll",
    badge: "AI Powered",
  },
  en: {
    title: "Mahir Growth AI",
    subtitle: "Enter your business and get a growth idea",
    placeholder: "e.g. Local café, online clothing store…",
    categoryLabel: "Or pick a category:",
    btn: "Get Growth Idea ✦",
    thinking: "Analyzing your business…",
    errorTitle: "Mahir Message",
    errorMsg: "We'll get back to you as soon as possible.\nFor faster support, message us on Telegram:",
    tg: "@Mahirofficalll",
    badge: "AI Powered",
  },
};

export default function IdeaCard({ lang = "fa" }: { lang?: "fa" | "en" }) {
  const tx = labels[lang];
  const cats = CATEGORIES[lang];
  const [business, setBusiness] = useState("");
  const [loading, setLoading] = useState(false);
  const [displayed, setDisplayed] = useState("");
  const [fullText, setFullText] = useState("");
  const [hasError, setHasError] = useState(false);
  const [cursorOn, setCursorOn] = useState(false);
  const typeRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isRtl = lang === "fa";

  useEffect(() => {
    const id = setInterval(() => setCursorOn((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!fullText) return;
    setDisplayed("");
    let i = 0;
    function tick() {
      i++;
      setDisplayed(fullText.slice(0, i));
      if (i < fullText.length) typeRef.current = setTimeout(tick, 22);
    }
    typeRef.current = setTimeout(tick, 22);
    return () => { if (typeRef.current) clearTimeout(typeRef.current); };
  }, [fullText]);

  async function handleSubmit(biz?: string) {
    const trimmed = (biz ?? business).trim();
    if (!trimmed || loading) return;
    if (biz) setBusiness(biz);
    setLoading(true);
    setHasError(false);
    setFullText("");
    setDisplayed("");
    try {
      const res = await fetch("/api/idea", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ business: trimmed, lang }),
      });
      const data = await res.json();
      if (!res.ok || data.error) setHasError(true);
      else setFullText(data.idea ?? "");
    } catch {
      setHasError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div dir={isRtl ? "rtl" : "ltr"}
      className="relative w-full max-w-lg mx-auto rounded-3xl overflow-hidden"
      style={{
        background: "rgba(10,10,25,0.75)",
        backdropFilter: "blur(24px)",
        border: "1px solid rgba(0,229,160,0.2)",
        boxShadow: "0 8px 48px rgba(0,0,0,0.5), 0 0 80px rgba(0,229,160,0.06)",
      }}>

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.03)" }}>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00E5A0] animate-pulse" />
          <span className="text-xs font-bold text-[#00E5A0] tracking-widest">{tx.title}</span>
        </div>
        <span className="text-xs px-2 py-0.5 rounded-full font-bold"
          style={{ background: "rgba(0,229,160,0.12)", color: "#00E5A0", border: "1px solid rgba(0,229,160,0.2)" }}>
          {tx.badge}
        </span>
      </div>

      <div className="p-5 space-y-4">
        {/* Subtitle */}
        <p className="text-xs" style={{ color: "rgba(240,240,245,0.45)" }}>{tx.subtitle}</p>

        {/* Input row */}
        <div className="flex gap-2">
          <input
            type="text"
            value={business}
            onChange={e => setBusiness(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSubmit()}
            placeholder={tx.placeholder}
            disabled={loading}
            className="flex-1 rounded-xl px-4 py-2.5 text-sm transition focus:outline-none focus:ring-2 focus:ring-[#00E5A0]/50 disabled:opacity-50"
            style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", color: "#f0f0f5" }}
          />
          <button onClick={() => handleSubmit()} disabled={loading || !business.trim()}
            className="px-4 py-2.5 rounded-xl text-xs font-bold transition-all hover:scale-105 active:scale-95 disabled:opacity-40 whitespace-nowrap"
            style={{ background: "#00E5A0", color: "#111", boxShadow: "0 0 20px rgba(0,229,160,0.3)" }}>
            {tx.btn}
          </button>
        </div>

        {/* Category chips */}
        <div>
          <p className="text-xs mb-2" style={{ color: "rgba(240,240,245,0.35)" }}>{tx.categoryLabel}</p>
          <div className="flex flex-wrap gap-1.5">
            {cats.map(cat => (
              <button key={cat} onClick={() => handleSubmit(cat)}
                disabled={loading}
                className="text-xs px-3 py-1 rounded-full transition-all hover:border-[#00E5A0]/60 hover:text-[#00E5A0] disabled:opacity-40"
                style={{ border: "1px solid rgba(255,255,255,0.1)", color: "rgba(240,240,245,0.5)", background: "rgba(255,255,255,0.04)" }}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Output */}
        <div className="min-h-[90px]">
          {loading && (
            <div className="flex items-center gap-3 py-2">
              <svg className="animate-spin w-4 h-4 text-[#00E5A0] flex-shrink-0" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              <span className="text-sm animate-pulse" style={{ color: "rgba(240,240,245,0.5)" }}>{tx.thinking}</span>
            </div>
          )}

          {hasError && !loading && (
            <div className="rounded-2xl p-4"
              style={{ background: "rgba(0,229,160,0.06)", border: "1px solid rgba(0,229,160,0.2)" }}>
              <p className="text-xs font-bold text-[#00E5A0] mb-2">✦ {tx.errorTitle}</p>
              {tx.errorMsg.split("\n").map((line, i) => (
                <p key={i} className="text-sm leading-relaxed" style={{ color: "rgba(240,240,245,0.65)" }}>{line}</p>
              ))}
              <a href="https://t.me/Mahirofficalll" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-3 text-sm font-bold text-[#00E5A0] hover:underline">
                ✈ {tx.tg}
              </a>
            </div>
          )}

          {!loading && !hasError && displayed && (
            <div className={isRtl ? "text-right" : "text-left"} style={{ padding: "4px 0" }}>
              {displayed.split("\n").map((line, idx) =>
                idx === 0
                  ? <p key={idx} className="font-extrabold text-[#00E5A0] text-base mb-2">{line}</p>
                  : line.trim()
                    ? <p key={idx} className="text-sm leading-relaxed mb-1" style={{ color: "rgba(240,240,245,0.8)" }}>{line}</p>
                    : <br key={idx} />
              )}
              <span className="inline-block w-0.5 h-4 bg-[#00E5A0] align-middle ml-0.5"
                style={{ opacity: cursorOn ? 1 : 0, transition: "opacity 0.1s" }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
