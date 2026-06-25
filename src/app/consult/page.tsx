"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

const STEPS = [
  {
    key: "business",
    icon: "🏢",
    q_fa: "کسب‌وکار شما چیست؟",
    q_en: "What is your business?",
    ph_fa: "مثلاً: فروشگاه آنلاین لباس، کافه، آموزشگاه زبان…",
    ph_en: "e.g. Online clothing store, café, language school…",
    hint_fa: "هرچقدر دقیق‌تر بنویسید، مشاوره بهتری می‌گیرید",
    hint_en: "The more specific you are, the better advice you'll get",
  },
  {
    key: "challenge",
    icon: "⚡",
    q_fa: "بزرگ‌ترین چالش شما الان چیست؟",
    q_en: "What is your biggest challenge right now?",
    ph_fa: "مثلاً: مشتری کم، برند ضعیف، رقبای زیاد…",
    ph_en: "e.g. Low customers, weak brand, too many competitors…",
    hint_fa: "چه چیزی شب‌ها نمی‌گذارد بخوابید؟",
    hint_en: "What keeps you up at night?",
  },
  {
    key: "goal",
    icon: "🎯",
    q_fa: "هدف شما در ۶ ماه آینده چیست؟",
    q_en: "What is your goal for the next 6 months?",
    ph_fa: "مثلاً: ۲ برابر کردن فروش، ورود به بازار جدید…",
    ph_en: "e.g. Double sales, enter a new market, get 1000 customers…",
    hint_fa: "یک هدف مشخص و قابل اندازه‌گیری بنویسید",
    hint_en: "Write one specific and measurable goal",
  },
];

const FEATURES = [
  { icon: "⚡", fa: "در کمتر از ۳۰ ثانیه", en: "In less than 30 seconds" },
  { icon: "🎯", fa: "کاملاً اختصاصی", en: "Fully personalized" },
  { icon: "🔒", fa: "کاملاً رایگان", en: "Completely free" },
];

export default function ConsultPage() {
  const [lang, setLang] = useState<"fa" | "en">("fa");
  const [step, setStep] = useState(-1); // -1 = landing
  const [answers, setAnswers] = useState(["", "", ""]);
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const isRtl = lang === "fa";

  useEffect(() => {
    if (step >= 0 && step < STEPS.length) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [step]);

  useEffect(() => {
    if (result) resultRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [result]);

  async function handleNext() {
    const val = input.trim();
    if (!val) return;

    const newAnswers = [...answers];
    newAnswers[step] = val;
    setAnswers(newAnswers);
    setInput("");

    if (step < STEPS.length - 1) {
      setStep((s) => s + 1);
    } else {
      setStep(STEPS.length); // done
      setLoading(true);
      setError("");
      try {
        const res = await fetch("/api/consult", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answers: newAnswers, lang }),
        });
        const data = await res.json();
        if (data.error) setError(data.error);
        else setResult(data.advice ?? "");
      } catch {
        setError(isRtl ? "خطا در اتصال. دوباره امتحان کنید." : "Connection error. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  }

  function restart() {
    setStep(-1);
    setAnswers(["", "", ""]);
    setInput("");
    setResult("");
    setError("");
    setLoading(false);
  }

  // ── Landing ──
  if (step === -1) return (
    <Page lang={lang} setLang={setLang} isRtl={isRtl}>
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto px-4 py-16 anim-fade-up">

        {/* icon */}
        <div className="w-20 h-20 rounded-2xl mb-8 flex items-center justify-center text-4xl anim-float"
          style={{ background: "rgba(251,191,36,0.12)", border: "1px solid rgba(251,191,36,0.3)" }}>
          🤖
        </div>

        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5"
          style={{ background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.2)" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-xs text-amber-300 tracking-wider">
            {isRtl ? "مشاور هوش مصنوعی ماهیر" : "Mahir AI Consultant"}
          </span>
        </div>

        <h1 className="font-extrabold text-white mb-4" style={{ fontSize: "clamp(1.8rem,5vw,3.2rem)" }}>
          {isRtl ? "مشاوره رشد" : "Growth"}{" "}
          <span className="text-shimmer">{isRtl ? "رایگان کسب‌وکار" : "Consultation"}</span>
        </h1>

        <p className="text-base leading-relaxed mb-10 max-w-md"
          style={{ color: "rgba(255,255,255,0.55)" }}>
          {isRtl
            ? "به ۳ سوال کوتاه جواب بده تا هوش مصنوعی ماهیر یک راهکار رشد کاملاً شخصی و عملی برات بسازه."
            : "Answer 3 quick questions and Mahir's AI will build a fully personalized, actionable growth plan for you."}
        </p>

        {/* features */}
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {FEATURES.map((f) => (
            <div key={f.icon} className="flex items-center gap-2 rounded-full px-4 py-2 text-sm"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)" }}>
              <span>{f.icon}</span>
              <span>{isRtl ? f.fa : f.en}</span>
            </div>
          ))}
        </div>

        <button onClick={() => setStep(0)}
          className="px-10 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 active:scale-95"
          style={{ background: "#fbbf24", color: "#111", boxShadow: "0 0 50px rgba(251,191,36,0.4)" }}>
          {isRtl ? "شروع مشاوره رایگان ←" : "Start Free Consultation →"}
        </button>

        <p className="mt-4 text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
          {isRtl ? "بدون ثبت‌نام • بدون پرداخت" : "No signup • No payment"}
        </p>
      </div>
    </Page>
  );

  // ── Steps ──
  if (step < STEPS.length) {
    const current = STEPS[step];
    return (
      <Page lang={lang} setLang={setLang} isRtl={isRtl}>
        <div className="w-full max-w-xl mx-auto px-4 py-12 flex flex-col items-center">

          {/* progress */}
          <div className="flex gap-2 mb-10">
            {STEPS.map((_, i) => (
              <div key={i} className="h-1.5 rounded-full transition-all duration-500"
                style={{ width: i <= step ? "48px" : "20px", background: i <= step ? "#fbbf24" : "rgba(255,255,255,0.12)" }} />
            ))}
          </div>

          {/* step card */}
          <div className="w-full rounded-3xl p-8 md:p-10 anim-scale-in"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>

            <div className="text-5xl mb-5 text-center">{current.icon}</div>

            <p className="text-xs text-amber-400 tracking-widest text-center mb-2 font-medium">
              {isRtl ? `سوال ${step + 1} از ${STEPS.length}` : `Question ${step + 1} of ${STEPS.length}`}
            </p>

            <h2 className="font-bold text-white text-center mb-6 text-xl md:text-2xl">
              {isRtl ? current.q_fa : current.q_en}
            </h2>

            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleNext()}
              placeholder={isRtl ? current.ph_fa : current.ph_en}
              className="w-full rounded-xl px-4 py-3.5 text-sm mb-3 transition-all
                focus:outline-none focus:ring-2 focus:ring-amber-400/50"
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "white",
              }}
              dir={isRtl ? "rtl" : "ltr"}
            />

            <p className="text-xs text-center mb-6" style={{ color: "rgba(255,255,255,0.35)" }}>
              💡 {isRtl ? current.hint_fa : current.hint_en}
            </p>

            <button onClick={handleNext} disabled={!input.trim()}
              className="w-full py-3.5 rounded-xl font-bold text-sm transition-all
                hover:scale-105 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: "#fbbf24", color: "#111" }}>
              {step < STEPS.length - 1
                ? (isRtl ? "بعدی ←" : "Next →")
                : (isRtl ? "دریافت مشاوره 🚀" : "Get My Advice 🚀")}
            </button>
          </div>

          {/* previous answers */}
          {step > 0 && (
            <div className="w-full mt-6 space-y-2">
              {answers.slice(0, step).map((a, i) => a && (
                <div key={i} className="flex items-start gap-3 rounded-xl px-4 py-3 text-sm"
                  style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.15)" }}>
                  <span className="text-amber-400 font-bold flex-shrink-0">{STEPS[i].icon}</span>
                  <span style={{ color: "rgba(255,255,255,0.6)" }}>{a}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </Page>
    );
  }

  // ── Result ──
  return (
    <Page lang={lang} setLang={setLang} isRtl={isRtl}>
      <div className="w-full max-w-2xl mx-auto px-4 py-12 flex flex-col items-center">

        {loading ? (
          <div className="flex flex-col items-center gap-5 py-20">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl anim-float"
              style={{ background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.3)" }}>
              🤖
            </div>
            <div className="flex gap-1.5">
              {[0,1,2].map(i => (
                <span key={i} className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-bounce"
                  style={{ animationDelay: `${i*0.15}s` }} />
              ))}
            </div>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
              {isRtl ? "در حال تحلیل کسب‌وکار شما…" : "Analyzing your business…"}
            </p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-400 mb-4">{error}</p>
            <button onClick={restart} className="px-6 py-2.5 rounded-xl border border-amber-400/30
              text-amber-400 hover:bg-amber-400/10 transition-all text-sm">
              {isRtl ? "دوباره امتحان" : "Try Again"}
            </button>
          </div>
        ) : (
          <div ref={resultRef} className="w-full anim-fade-up">

            {/* success header */}
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">🎉</div>
              <h2 className="font-extrabold text-white text-2xl mb-2">
                {isRtl ? "راهکار رشد شما آماده است!" : "Your Growth Plan is Ready!"}
              </h2>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
                {isRtl ? "بر اساس اطلاعاتی که دادید، ماهیر این راهکار را برای شما طراحی کرد" : "Based on your answers, Mahir designed this plan just for you"}
              </p>
            </div>

            {/* result card */}
            <div className="w-full rounded-3xl p-8 mb-6"
              style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)" }}>
              {result.split("\n").map((line, i) =>
                i === 0 ? (
                  <p key={i} className="font-extrabold text-amber-400 text-xl mb-4">{line}</p>
                ) : line.trim() ? (
                  <p key={i} className="text-sm leading-relaxed mb-2" style={{ color: "rgba(255,255,255,0.8)" }}>{line}</p>
                ) : <br key={i} />
              )}
            </div>

            {/* summary of answers */}
            <div className="w-full rounded-2xl p-5 mb-8 space-y-3"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <p className="text-xs text-amber-400 font-bold tracking-widest mb-3">
                {isRtl ? "اطلاعات شما" : "YOUR INPUTS"}
              </p>
              {STEPS.map((s, i) => (
                <div key={i} className="flex items-start gap-3 text-sm">
                  <span>{s.icon}</span>
                  <span style={{ color: "rgba(255,255,255,0.5)" }}>{answers[i]}</span>
                </div>
              ))}
            </div>

            {/* actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button onClick={restart}
                className="px-6 py-3 rounded-xl font-bold text-sm transition-all hover:scale-105"
                style={{ background: "#fbbf24", color: "#111" }}>
                {isRtl ? "مشاوره جدید ←" : "New Consultation →"}
              </button>
              <Link href="/"
                className="px-6 py-3 rounded-xl font-bold text-sm transition-all hover:scale-105 text-center"
                style={{ border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.6)" }}>
                {isRtl ? "بازگشت به سایت" : "Back to Site"}
              </Link>
            </div>
          </div>
        )}
      </div>
    </Page>
  );
}

// ── Layout wrapper ────────────────────────────────────────
function Page({ children, lang, setLang, isRtl }: {
  children: React.ReactNode;
  lang: "fa" | "en";
  setLang: (l: "fa" | "en") => void;
  isRtl: boolean;
}) {
  return (
    <div className="min-h-screen grid-bg" dir={isRtl ? "rtl" : "ltr"}
      style={{ background: "#05050f", color: "#f0f0f5" }}>

      {/* blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="anim-blob absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full blur-[140px]"
          style={{ background: "rgba(251,191,36,0.07)" }} />
        <div className="anim-blob d5 absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full blur-[140px]"
          style={{ background: "rgba(99,102,241,0.07)" }} />
      </div>

      {/* header */}
      <header className="sticky top-0 z-40 flex items-center justify-between px-6 md:px-12 py-4"
        style={{ background: "rgba(5,5,15,0.8)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <Link href="/" className="font-extrabold text-amber-400 text-lg tracking-widest">
          {isRtl ? "ماهیر" : "Mahir"}
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-xs hidden md:block" style={{ color: "rgba(255,255,255,0.35)" }}>
            {isRtl ? "مشاوره هوشمند" : "AI Consultation"}
          </span>
          <button onClick={() => setLang(lang === "fa" ? "en" : "fa")}
            className="text-xs font-bold px-3 py-1.5 rounded-lg transition-all"
            style={{ border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.5)" }}>
            {lang === "fa" ? "EN" : "فا"}
          </button>
        </div>
      </header>

      <main className="relative z-10">{children}</main>
    </div>
  );
}
