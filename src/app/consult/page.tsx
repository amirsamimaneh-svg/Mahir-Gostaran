"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

interface Message {
  role: "user" | "ai";
  text: string;
}

const STEPS = [
  { key: "business", q_fa: "کسب‌وکار شما چیست؟", q_en: "What is your business?", ph_fa: "مثلاً: فروشگاه آنلاین لباس، کافه، استارتاپ فین‌تک…", ph_en: "e.g. Online clothing store, café, fintech startup…" },
  { key: "challenge", q_fa: "بزرگ‌ترین چالش شما الان چیست؟", q_en: "What is your biggest challenge right now?", ph_fa: "مثلاً: جذب مشتری، برندینگ، رقبا…", ph_en: "e.g. Customer acquisition, branding, competition…" },
  { key: "goal", q_fa: "هدف شما در ۶ ماه آینده چیست؟", q_en: "What is your goal for the next 6 months?", ph_fa: "مثلاً: ۲ برابر کردن فروش، ورود به بازار جدید…", ph_en: "e.g. Double sales, enter a new market…" },
];

export default function ConsultPage() {
  const [lang, setLang] = useState<"fa" | "en">("fa");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>(["", "", ""]);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const currentStep = STEPS[step];

  async function handleNext() {
    const val = input.trim();
    if (!val) return;

    const newAnswers = [...answers];
    newAnswers[step] = val;
    setAnswers(newAnswers);

    setMessages((m) => [...m, { role: "user", text: val }]);
    setInput("");

    if (step < STEPS.length - 1) {
      setStep((s) => s + 1);
    } else {
      // all answered — call AI
      setDone(true);
      setLoading(true);
      try {
        const res = await fetch("/api/consult", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answers: newAnswers, lang }),
        });
        const data = await res.json();
        setMessages((m) => [...m, { role: "ai", text: data.advice ?? data.error ?? "خطا" }]);
      } catch {
        setMessages((m) => [...m, { role: "ai", text: lang === "fa" ? "خطا در اتصال." : "Connection error." }]);
      } finally {
        setLoading(false);
      }
    }
  }

  function restart() {
    setStep(0);
    setAnswers(["", "", ""]);
    setInput("");
    setMessages([]);
    setDone(false);
    setLoading(false);
  }

  const isRtl = lang === "fa";

  return (
    <div className="min-h-screen bg-[#07071a] flex flex-col" dir={isRtl ? "rtl" : "ltr"}>

      {/* top bar */}
      <header className="flex items-center justify-between px-6 md:px-12 py-4
        border-b border-white/5 bg-[#07071a]/80 backdrop-blur-xl sticky top-0 z-40">
        <Link href="/" className="text-amber-400 font-extrabold text-lg tracking-widest">
          {lang === "fa" ? "ماهیر" : "Mahir"}
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-white/40 text-sm hidden md:block">
            {lang === "fa" ? "مشاوره هوشمند" : "AI Consultation"}
          </span>
          <button onClick={() => setLang(l => l === "fa" ? "en" : "fa")}
            className="text-xs font-bold px-3 py-1.5 rounded-lg border border-white/15
              text-white/50 hover:border-amber-400/50 hover:text-amber-400 transition-all">
            {lang === "fa" ? "EN" : "فا"}
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col max-w-2xl w-full mx-auto px-4 py-8">

        {/* intro */}
        {messages.length === 0 && (
          <div className="text-center mb-10 animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-400/10
              border border-amber-400/25 px-4 py-1.5 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-xs text-amber-300 tracking-wider">
                {lang === "fa" ? "مشاور هوش مصنوعی ماهیر" : "Mahir AI Consultant"}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
              {lang === "fa" ? "مشاوره رشد" : "Growth"}{" "}
              <span className="text-shimmer">{lang === "fa" ? "کسب‌وکار" : "Consultation"}</span>
            </h1>
            <p className="text-white/45 text-sm max-w-md mx-auto leading-relaxed">
              {lang === "fa"
                ? "به ۳ سوال کوتاه جواب بده تا یک راهکار رشد اختصاصی برات بسازیم."
                : "Answer 3 quick questions and we'll build a personalized growth plan for you."}
            </p>
          </div>
        )}

        {/* chat messages */}
        <div className="flex flex-col gap-4 flex-1">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user"
              ? (isRtl ? "justify-end" : "justify-end")
              : (isRtl ? "justify-start" : "justify-start")}`}>
              {msg.role === "ai" && (
                <div className="w-7 h-7 rounded-full bg-amber-400/20 border border-amber-400/40
                  flex items-center justify-center text-xs text-amber-400 font-bold flex-shrink-0 mt-1 mx-2">
                  M
                </div>
              )}
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap
                ${msg.role === "user"
                  ? "bg-amber-400/15 border border-amber-400/25 text-white"
                  : "bg-white/5 border border-white/10 text-white/85"
                }`}>
                {msg.role === "ai" ? renderAI(msg.text) : msg.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className={`flex ${isRtl ? "justify-start" : "justify-start"}`}>
              <div className="w-7 h-7 rounded-full bg-amber-400/20 border border-amber-400/40
                flex items-center justify-center text-xs text-amber-400 font-bold flex-shrink-0 mt-1 mx-2">
                M
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3">
                <div className="flex gap-1.5 items-center">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="w-2 h-2 rounded-full bg-amber-400/60 animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* question + input */}
        {!done && (
          <div className="mt-6 sticky bottom-0 pb-4">
            {/* step indicator */}
            <div className="flex gap-2 justify-center mb-4">
              {STEPS.map((_, i) => (
                <div key={i} className={`h-1 rounded-full transition-all duration-500
                  ${i <= step ? "bg-amber-400 w-8" : "bg-white/15 w-4"}`} />
              ))}
            </div>

            {/* question bubble */}
            <div className="mb-3 rounded-2xl bg-white/5 border border-white/10 px-4 py-3
              text-sm text-white/70 text-center">
              {lang === "fa" ? currentStep.q_fa : currentStep.q_en}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleNext()}
                placeholder={lang === "fa" ? currentStep.ph_fa : currentStep.ph_en}
                className="flex-1 bg-white/8 border border-white/15 rounded-xl px-4 py-3
                  text-white text-sm placeholder:text-white/30 focus:outline-none
                  focus:ring-2 focus:ring-amber-400/50 transition"
              />
              <button onClick={handleNext} disabled={!input.trim()}
                className="px-5 py-3 rounded-xl bg-amber-400 text-gray-900 font-bold text-sm
                  hover:bg-amber-300 disabled:opacity-40 transition-all active:scale-95">
                {step < STEPS.length - 1
                  ? (lang === "fa" ? "بعدی" : "Next")
                  : (lang === "fa" ? "دریافت مشاوره" : "Get Advice")}
              </button>
            </div>
          </div>
        )}

        {/* restart */}
        {done && !loading && (
          <div className="mt-6 text-center">
            <button onClick={restart}
              className="px-6 py-2.5 rounded-xl border border-white/15 text-white/50
                hover:border-amber-400/40 hover:text-amber-400 transition-all text-sm">
              {lang === "fa" ? "شروع دوباره" : "Start Over"}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

function renderAI(text: string) {
  const lines = text.split("\n");
  return (
    <div>
      {lines.map((line, i) =>
        i === 0
          ? <p key={i} className="font-bold text-amber-400 mb-1">{line}</p>
          : <p key={i} className="text-white/80">{line}</p>
      )}
    </div>
  );
}
