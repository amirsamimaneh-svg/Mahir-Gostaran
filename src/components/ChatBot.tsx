"use client";

import { useState, useRef, useEffect } from "react";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS_FA = [
  "چطور فروشم رو بیشتر کنم؟",
  "برای برندینگ از کجا شروع کنم؟",
  "هوش مصنوعی چه کمکی به کسب‌وکارم می‌کنه؟",
  "چطور مشتری بیشتر جذب کنم؟",
];

const SUGGESTIONS_EN = [
  "How can I increase my sales?",
  "Where to start with branding?",
  "How can AI help my business?",
  "How to attract more customers?",
];

export default function ChatBot({ lang = "fa" }: { lang?: "fa" | "en" }) {
  const isRtl = lang === "fa";
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [unread, setUnread] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestions = isRtl ? SUGGESTIONS_FA : SUGGESTIONS_EN;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, loading]);

  useEffect(() => {
    if (open) {
      setUnread(false);
      setTimeout(() => inputRef.current?.focus(), 100);
      if (msgs.length === 0) {
        setMsgs([{
          role: "assistant",
          content: isRtl
            ? "سلام! 👋 من دستیار هوشمند ماهیر هستم. هر سوالی درباره رشد کسب‌وکارت داری، اینجام — ۲۴ ساعته، ۷ روز هفته! 🚀"
            : "Hi! 👋 I'm Mahir's AI assistant. Any questions about growing your business? I'm here 24/7! 🚀",
        }]);
      }
    }
  }, [open]);

  async function send(text?: string) {
    const content = (text ?? input).trim();
    if (!content || loading) return;
    setInput("");

    const newMsgs: Msg[] = [...msgs, { role: "user", content }];
    setMsgs(newMsgs);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lang,
          messages: newMsgs.map(m => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      setMsgs(prev => [...prev, { role: "assistant", content: data.reply ?? "خطا در پاسخ." }]);
    } catch {
      setMsgs(prev => [...prev, { role: "assistant", content: isRtl ? "خطا در اتصال. دوباره تلاش کن." : "Connection error. Please try again." }]);
    } finally {
      setLoading(false);
    }
  }

  function formatText(text: string) {
    return text.split("\n").map((line, i) => {
      if (!line.trim()) return <br key={i} />;
      const bold = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
      return <p key={i} className="mb-1 leading-relaxed" dangerouslySetInnerHTML={{ __html: bold }} />;
    });
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => { setOpen(v => !v); }}
        className="fixed z-[60] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
        style={{
          bottom: "90px",
          right: "20px",
          width: 56, height: 56,
          borderRadius: "50%",
          background: open ? "rgba(30,30,50,0.9)" : "linear-gradient(135deg,#2563EB,#3D5AE8)",
          boxShadow: open ? "0 4px 20px rgba(0,0,0,0.4)" : "0 4px 24px rgba(79,110,255,0.5)",
          border: open ? "1px solid rgba(255,255,255,0.1)" : "none",
        }}>
        {open
          ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f0f0f5" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
          : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
        }
        {unread && !open && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 flex items-center justify-center text-[9px] text-white font-bold">!</span>
        )}
      </button>

      {/* Chat panel */}
      <div
        className="fixed z-[59] transition-all duration-300"
        style={{
          bottom: "158px",
          right: "16px",
          width: "min(380px, calc(100vw - 32px))",
          height: open ? "500px" : "0px",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transform: open ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
          transformOrigin: "bottom right",
        }}>
        <div className="flex flex-col h-full rounded-2xl overflow-hidden"
          style={{
            background: "rgba(8,8,22,0.96)",
            backdropFilter: "blur(24px)",
            border: "1px solid rgba(79,110,255,0.15)",
            boxShadow: "0 8px 48px rgba(0,0,0,0.6)",
          }}
          dir={isRtl ? "rtl" : "ltr"}>

          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", background: "rgba(79,110,255,0.05)" }}>
            <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: "linear-gradient(135deg,#2563EB,#3D5AE8)" }}>
              <span className="text-base font-extrabold text-gray-900">M</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm text-[#2563EB] leading-none">
                {isRtl ? "دستیار ماهیر" : "Mahir Assistant"}
              </p>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[10px]" style={{ color: "rgba(240,240,245,0.4)" }}>
                  {isRtl ? "آنلاین — ۲۴/۷" : "Online — 24/7"}
                </span>
              </div>
            </div>
            <button onClick={() => setMsgs([])}
              className="text-xs px-2 py-1 rounded-lg transition-all hover:bg-white/10"
              style={{ color: "rgba(240,240,245,0.3)" }}>
              {isRtl ? "پاک" : "Clear"}
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-3">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? (isRtl ? "justify-start" : "justify-end") : (isRtl ? "justify-end" : "justify-start")}`}>
                <div
                  className="max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed"
                  style={m.role === "user"
                    ? { background: "rgba(79,110,255,0.15)", border: "1px solid rgba(79,110,255,0.2)", color: "#f0f0f5" }
                    : { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(240,240,245,0.85)" }
                  }>
                  {m.role === "assistant"
                    ? <div className="text-xs">{formatText(m.content)}</div>
                    : <p>{m.content}</p>
                  }
                </div>
              </div>
            ))}

            {/* Suggestions */}
            {msgs.length <= 1 && !loading && (
              <div className="flex flex-col gap-1.5 mt-1">
                {suggestions.map(s => (
                  <button key={s} onClick={() => send(s)}
                    className="text-right text-xs px-3 py-2 rounded-xl transition-all hover:border-[#2563EB]/40 hover:text-[#2563EB] text-start"
                    style={{ border: "1px solid rgba(255,255,255,0.08)", color: "rgba(240,240,245,0.5)", background: "rgba(255,255,255,0.03)" }}>
                    {s}
                  </button>
                ))}
              </div>
            )}

            {loading && (
              <div className={`flex ${isRtl ? "justify-end" : "justify-start"}`}>
                <div className="rounded-2xl px-4 py-3 flex gap-1.5 items-center"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  {[0,1,2].map(i => (
                    <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#2563EB]"
                      style={{ animation: `bounce 1s ${i*0.15}s infinite` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="px-3 py-3 flex-shrink-0" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="flex gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && send()}
                placeholder={isRtl ? "پیام خود را بنویس…" : "Type your message…"}
                disabled={loading}
                className="flex-1 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#2563EB]/50 disabled:opacity-50"
                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", color: "#f0f0f5" }}
              />
              <button onClick={() => send()} disabled={loading || !input.trim()}
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all hover:scale-105 active:scale-95 disabled:opacity-40"
                style={{ background: "#2563EB" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5">
                  <path d={isRtl ? "M5 12h14M12 5l7 7-7 7" : "M5 12h14M12 5l7 7-7 7"} strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`@keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }`}</style>
    </>
  );
}
