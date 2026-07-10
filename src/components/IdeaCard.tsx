"use client";

import { useState, useEffect, useRef } from "react";

const CATEGORIES = {
  fa: ["کافه / رستوران", "فروشگاه آنلاین", "آموزشگاه", "کلینیک / پزشکی", "استارتاپ", "خدمات"],
  en: ["Café / Restaurant", "Online Store", "Training Center", "Clinic / Medical", "Startup", "Services"],
};

const labels = {
  fa: {
    title: "هوش رشد ماهیر",
    subtitle: "کسب‌وکارت را بنویس",
    placeholder: "مثلاً: کافه محلی، فروشگاه لباس…",
    categoryLabel: "یا سریع انتخاب کن",
    btn: "دریافت ایده ✦",
    thinking: "در حال تحلیل…",
    errorTitle: "پیام ماهیر",
    errorMsg: "به زودی پاسخ می‌دهیم. برای تماس سریع‌تر:",
    tg: "@Mahirofficalll",
    badge: "AI Powered",
  },
  en: {
    title: "Mahir Growth AI",
    subtitle: "Describe your business",
    placeholder: "e.g. Local café, online store…",
    categoryLabel: "Or pick one",
    btn: "Get Idea ✦",
    thinking: "Analyzing…",
    errorTitle: "Mahir Note",
    errorMsg: "We'll reply soon. For faster support:",
    tg: "@Mahirofficalll",
    badge: "AI Powered",
  },
};

export default function IdeaCard({ lang = "fa" }: { lang?: "fa" | "en" | "ar" }) {
  const tx = (labels as Record<string, typeof labels.fa>)[lang] ?? labels.fa;
  const cats = (CATEGORIES as Record<string, typeof CATEGORIES.fa>)[lang] ?? CATEGORIES.fa;
  const [business, setBusiness] = useState("");
  const [loading, setLoading] = useState(false);
  const [displayed, setDisplayed] = useState("");
  const [fullText, setFullText] = useState("");
  const [hasError, setHasError] = useState(false);
  const [cursorOn, setCursorOn] = useState(false);
  const [focused, setFocused] = useState(false);
  const typeRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isRtl = lang === "fa";

  useEffect(() => {
    const id = setInterval(() => setCursorOn(v => !v), 530);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!fullText) return;
    setDisplayed("");
    let i = 0;
    function tick() {
      i++;
      setDisplayed(fullText.slice(0, i));
      if (i < fullText.length) typeRef.current = setTimeout(tick, 20);
    }
    typeRef.current = setTimeout(tick, 20);
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

  const hasOutput = loading || hasError || displayed;

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className="relative w-full max-w-lg mx-auto rounded-3xl overflow-hidden"
      style={{
        background: "linear-gradient(160deg, rgba(14,20,40,0.95) 0%, rgba(8,12,28,0.98) 100%)",
        border: "1px solid rgba(91,156,246,0.18)",
        boxShadow: "0 24px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.03), inset 0 1px 0 rgba(255,255,255,0.05)",
        backdropFilter: "blur(32px)",
      }}>

      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
        <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full"
          style={{ background: "rgba(91,156,246,0.08)", filter: "blur(40px)" }} />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full"
          style={{ background: "rgba(59,130,246,0.06)", filter: "blur(32px)" }} />
      </div>

      {/* Header strip */}
      <div className="relative flex items-center justify-between px-5 pt-5 pb-4">
        {/* Left: icon + title */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(91,156,246,0.15)", border: "1px solid rgba(91,156,246,0.25)" }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#5B9CF6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a10 10 0 0110 10c0 4-2.5 7.5-6 9.3V22H8v-.7A10 10 0 0112 2z" />
              <line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-extrabold leading-none tracking-wide" style={{ color: "#D8E5F5" }}>
              {tx.title}
            </p>
            <p className="text-[10px] mt-0.5 font-medium" style={{ color: "rgba(91,156,246,0.55)" }}>
              {tx.subtitle}
            </p>
          </div>
        </div>

        {/* Right: AI Powered badge */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
          style={{ background: "rgba(91,156,246,0.08)", border: "1px solid rgba(91,156,246,0.2)" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#5B9CF6] animate-pulse" />
          <span className="text-[10px] font-bold text-[#5B9CF6] tracking-widest">{tx.badge}</span>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-5 h-px" style={{ background: "rgba(255,255,255,0.05)" }} />

      <div className="relative px-5 py-4 space-y-3">

        {/* Input + button */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={business}
              onChange={e => setBusiness(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSubmit()}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder={tx.placeholder}
              disabled={loading}
              className="w-full rounded-2xl px-4 py-3 text-sm transition-all duration-200 focus:outline-none disabled:opacity-50"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: focused ? "1px solid rgba(91,156,246,0.5)" : "1px solid rgba(255,255,255,0.08)",
                color: "#D8E5F5",
                boxShadow: focused ? "0 0 0 3px rgba(91,156,246,0.08)" : "none",
              }}
            />
          </div>
          <button
            onClick={() => handleSubmit()}
            disabled={loading || !business.trim()}
            className="px-4 py-3 rounded-2xl text-xs font-extrabold transition-all hover:scale-105 active:scale-95 disabled:opacity-35 flex-shrink-0"
            style={{
              background: business.trim() && !loading
                ? "linear-gradient(135deg,#5B9CF6,#2563EB)"
                : "rgba(91,156,246,0.15)",
              color: business.trim() && !loading ? "#fff" : "rgba(91,156,246,0.5)",
              boxShadow: business.trim() ? "0 0 20px rgba(91,156,246,0.3)" : "none",
              border: "1px solid rgba(91,156,246,0.2)",
            }}>
            {tx.btn}
          </button>
        </div>

        {/* Category chips */}
        <div>
          <p className="text-[10px] mb-2 font-semibold tracking-wide" style={{ color: "rgba(216,229,245,0.3)" }}>
            {tx.categoryLabel}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {cats.map(cat => (
              <button key={cat} onClick={() => handleSubmit(cat)} disabled={loading}
                className="text-[11px] px-3 py-1.5 rounded-xl font-medium transition-all hover:scale-105 active:scale-95 disabled:opacity-40"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "rgba(216,229,245,0.55)",
                }}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Output area */}
        {hasOutput && (
          <div className="rounded-2xl overflow-hidden transition-all"
            style={{
              background: "rgba(91,156,246,0.05)",
              border: "1px solid rgba(91,156,246,0.15)",
            }}>

            {loading && (
              <div className="flex items-center gap-3 px-4 py-4">
                <div className="flex gap-1">
                  {[0, 1, 2].map(i => (
                    <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#5B9CF6]"
                      style={{ animation: `bounce 1.2s ease infinite`, animationDelay: `${i * 0.2}s`, opacity: 0.7 }} />
                  ))}
                </div>
                <span className="text-xs font-medium" style={{ color: "rgba(91,156,246,0.7)" }}>{tx.thinking}</span>
              </div>
            )}

            {hasError && !loading && (
              <div className="px-4 py-4">
                <p className="text-xs font-extrabold text-[#5B9CF6] mb-2">✦ {tx.errorTitle}</p>
                <p className="text-sm leading-relaxed mb-3" style={{ color: "rgba(216,229,245,0.65)" }}>{tx.errorMsg}</p>
                <a href="https://t.me/Mahirofficalll" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-[#5B9CF6] hover:underline">
                  ✈ {tx.tg}
                </a>
              </div>
            )}

            {!loading && !hasError && displayed && (
              <div className={`px-4 py-4 ${isRtl ? "text-right" : "text-left"}`}>
                {displayed.split("\n").map((line, idx) =>
                  idx === 0
                    ? <p key={idx} className="font-extrabold text-sm text-[#5B9CF6] mb-2 leading-snug">{line}</p>
                    : line.trim()
                      ? <p key={idx} className="text-sm leading-relaxed mb-1" style={{ color: "rgba(216,229,245,0.78)" }}>{line}</p>
                      : <br key={idx} />
                )}
                <span className="inline-block w-px h-4 bg-[#5B9CF6] align-middle ml-0.5"
                  style={{ opacity: cursorOn ? 1 : 0, transition: "opacity 0.1s" }} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
