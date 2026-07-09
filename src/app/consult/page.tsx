"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const STEPS = [
  {
    icon: "🏢",
    q_fa: "کسب‌وکار شما چیست؟",
    q_en: "What is your business?",
    ph_fa: "مثلاً: فروشگاه آنلاین لباس، کافه، آموزشگاه زبان…",
    ph_en: "e.g. Online clothing store, café, language school…",
    hint_fa: "یک عکس از کسب‌وکارتان هم می‌توانید بفرستید",
    hint_en: "You can also send a photo of your business",
    showImage: true,
  },
  {
    icon: "⚡",
    q_fa: "بزرگ‌ترین چالش شما الان چیست؟",
    q_en: "What is your biggest challenge right now?",
    ph_fa: "مثلاً: مشتری کم، برند ضعیف، رقبای زیاد…",
    ph_en: "e.g. Low customers, weak brand, too many competitors…",
    hint_fa: "چه چیزی بیشتر نگرانتان می‌کند؟",
    hint_en: "What worries you the most?",
    showImage: false,
  },
  {
    icon: "🎯",
    q_fa: "هدف شما در ۶ ماه آینده چیست؟",
    q_en: "What is your goal for the next 6 months?",
    ph_fa: "مثلاً: ۲ برابر کردن فروش، ورود به بازار جدید…",
    ph_en: "e.g. Double sales, enter a new market, 1000 customers…",
    hint_fa: "یک هدف مشخص بنویسید",
    hint_en: "Write one specific goal",
    showImage: false,
  },
];

export default function ConsultPage() {
  const router = useRouter();
  const [lang, setLang] = useState<"fa" | "en">("fa");
  const [step, setStep] = useState(-1);
  const [authChecked, setAuthChecked] = useState(false);
  const [userName, setUserName] = useState("");
  const [answers, setAnswers] = useState(["", "", ""]);
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [image, setImage] = useState<{ base64: string; mime: string; preview: string } | null>(null);
  const [listening, setListening] = useState(false);
  const [interimText, setInterimText] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);

  const isRtl = lang === "fa";

  useEffect(() => {
    fetch("/api/auth/me").then(r => r.json()).then(d => {
      if (!d.user) router.replace("/login");
      else { setAuthChecked(true); setUserName(d.user.name || ""); }
    });
  }, [router]);

  useEffect(() => {
    if (step >= 0 && step < STEPS.length) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [step]);

  useEffect(() => {
    if (result) resultRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [result]);

  if (!authChecked) return (
    <div style={{ background: "#05050f", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="w-8 h-8 rounded-full border-2 border-[#4F6EFF] border-t-transparent animate-spin" />
    </div>
  );

  // voice input
  function toggleVoice() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    const SR = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!SR) {
      alert(isRtl ? "مرورگر شما از میکروفون پشتیبانی نمی‌کند. از Chrome استفاده کنید." : "Your browser doesn't support voice. Use Chrome.");
      return;
    }

    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      setInterimText("");
      return;
    }

    const rec = new SR();
    rec.lang = lang === "fa" ? "fa-IR" : "en-US";
    rec.continuous = true;
    rec.interimResults = true;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rec.onresult = (e: any) => {
      let interim = "";
      let final = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) final += e.results[i][0].transcript;
        else interim += e.results[i][0].transcript;
      }
      if (final) {
        setInput(prev => (prev ? prev + " " : "") + final.trim());
        setInterimText("");
      } else {
        setInterimText(interim);
      }
    };
    rec.onerror = () => { setListening(false); setInterimText(""); };
    rec.onend = () => { setListening(false); setInterimText(""); };
    rec.start();
    recognitionRef.current = rec;
    setListening(true);
  }

  // image upload
  function handleImageFile(file: File) {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      const base64 = dataUrl.split(",")[1];
      setImage({ base64, mime: file.type, preview: dataUrl });
    };
    reader.readAsDataURL(file);
  }

  async function handleNext() {
    const val = input.trim();
    if (!val) return;
    const newAnswers = [...answers];
    newAnswers[step] = val;
    setAnswers(newAnswers);
    setInput("");

    if (step < STEPS.length - 1) {
      setStep(s => s + 1);
    } else {
      setStep(STEPS.length);
      setLoading(true);
      setError("");
      try {
        const res = await fetch("/api/consult", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            answers: newAnswers, lang,
            imageBase64: image?.base64 ?? null,
            imageMime: image?.mime ?? null,
          }),
        });
        const data = await res.json();
        if (data.error) setError(data.error);
        else setResult(data.advice ?? "");
      } catch {
        setError(isRtl ? "خطا در اتصال." : "Connection error.");
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
    setImage(null);
  }

  // ── Landing ──────────────────────────────────────────────
  if (step === -1) return (
    <Page lang={lang} setLang={setLang} isRtl={isRtl} userName={userName}>
      <div className="flex flex-col items-center text-center max-w-lg mx-auto px-4 py-12 anim-fade-up">
        <div className="w-20 h-20 rounded-2xl mb-6 flex items-center justify-center text-4xl anim-float"
          style={{ background: "rgba(79,110,255,0.12)", border: "1px solid rgba(79,110,255,0.3)" }}>
          🤖
        </div>
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5"
          style={{ background: "rgba(79,110,255,0.08)", border: "1px solid rgba(79,110,255,0.2)" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#4F6EFF] animate-pulse" />
          <span className="text-xs text-[#A78BFF] tracking-wider">
            {isRtl ? "مشاور هوش مصنوعی ماهیر" : "Mahir AI Consultant"}
          </span>
        </div>
        <h1 className="font-extrabold mb-3" style={{ fontSize: "clamp(1.6rem,5vw,2.8rem)", color: "var(--fg)" }}>
          {isRtl ? "مشاوره رشد " : "Free Growth "}
          <span className="text-shimmer">{isRtl ? "رایگان" : "Consultation"}</span>
        </h1>
        <p className="text-sm leading-relaxed mb-8 max-w-sm" style={{ color: "var(--fg2)" }}>
          {isRtl
            ? "به ۳ سوال کوتاه جواب بده — متن، صدا یا عکس — تا ماهیر یک راهکار رشد اختصاصی برات بسازه."
            : "Answer 3 quick questions — text, voice or photo — and get a personalized growth plan."}
        </p>

        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {[
            { icon: "⌨️", fa: "متن", en: "Text" },
            { icon: "🎤", fa: "صدا", en: "Voice" },
            { icon: "📸", fa: "عکس", en: "Photo" },
          ].map(f => (
            <div key={f.icon} className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "var(--fg2)" }}>
              {f.icon} {isRtl ? f.fa : f.en}
            </div>
          ))}
        </div>

        <button onClick={() => setStep(0)}
          className="w-full max-w-xs px-8 py-4 rounded-xl font-bold text-base transition-all hover:scale-105 active:scale-95"
          style={{ background: "#4F6EFF", color: "#111", boxShadow: "0 0 40px rgba(79,110,255,0.35)" }}>
          {isRtl ? "شروع مشاوره رایگان ←" : "Start Free Consultation →"}
        </button>
        <p className="mt-3 text-xs" style={{ color: "var(--fg3)" }}>
          {isRtl ? "بدون ثبت‌نام • بدون پرداخت" : "No signup • No payment"}
        </p>
      </div>
    </Page>
  );

  // ── Steps ─────────────────────────────────────────────────
  if (step < STEPS.length) {
    const cur = STEPS[step];
    return (
      <Page lang={lang} setLang={setLang} isRtl={isRtl} userName={userName}>
        <div className="w-full max-w-lg mx-auto px-4 py-8 flex flex-col items-center">

          {/* progress */}
          <div className="flex gap-2 mb-8">
            {STEPS.map((_, i) => (
              <div key={i} className="h-1.5 rounded-full transition-all duration-500"
                style={{ width: i <= step ? "48px" : "18px", background: i <= step ? "#4F6EFF" : "rgba(255,255,255,0.12)" }} />
            ))}
          </div>

          {/* card */}
          <div className="w-full rounded-3xl p-6 md:p-8 anim-scale-in"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}>

            <div className="text-4xl mb-3 text-center">{cur.icon}</div>
            <p className="text-xs text-[#4F6EFF] tracking-widest text-center mb-2 font-medium">
              {isRtl ? `سوال ${step + 1} از ${STEPS.length}` : `Question ${step + 1} of ${STEPS.length}`}
            </p>
            <h2 className="font-bold text-center mb-5 text-lg" style={{ color: "var(--fg)" }}>
              {isRtl ? cur.q_fa : cur.q_en}
            </h2>

            {/* voice button — prominent */}
            <button onClick={toggleVoice}
              className="w-full flex items-center justify-center gap-2 rounded-xl py-3 mb-3 text-sm font-bold transition-all hover:scale-105 active:scale-95"
              style={{
                background: listening ? "rgba(79,110,255,0.18)" : "rgba(79,110,255,0.08)",
                border: listening ? "1.5px solid #4F6EFF" : "1.5px solid rgba(79,110,255,0.35)",
                color: listening ? "#4F6EFF" : "rgba(79,110,255,0.8)",
                boxShadow: listening ? "0 0 20px rgba(79,110,255,0.2)" : "none",
              }}>
              <span className={listening ? "animate-pulse" : ""} style={{ fontSize: "1.2rem" }}>🎤</span>
              {listening
                ? (isRtl ? "در حال ضبط… (کلیک برای توقف)" : "Recording… (click to stop)")
                : (isRtl ? "ضبط صدا — بگو جواب رو" : "Record Voice — speak your answer")}
            </button>

            {/* interim live text */}
            {(listening && interimText) && (
              <div className="rounded-xl px-4 py-2 mb-3 text-sm italic" dir={isRtl ? "rtl" : "ltr"}
                style={{ background: "rgba(79,110,255,0.06)", border: "1px dashed rgba(79,110,255,0.3)", color: "rgba(79,110,255,0.7)" }}>
                {interimText}
              </div>
            )}

            {/* input row */}
            <div className="flex gap-2 mb-3">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleNext()}
                placeholder={isRtl ? cur.ph_fa : cur.ph_en}
                dir={isRtl ? "rtl" : "ltr"}
                className="flex-1 rounded-xl px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#4F6EFF]/50"
                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", color: "var(--fg)" }}
              />
            </div>

            {/* image upload — only step 0 */}
            {cur.showImage && (
              <div className="mb-4">
                <input ref={fileRef} type="file" accept="image/*" capture="environment" className="hidden"
                  onChange={e => e.target.files?.[0] && handleImageFile(e.target.files[0])} />

                {image ? (
                  <div className="relative rounded-xl overflow-hidden h-36">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={image.preview} alt="business" className="w-full h-full object-cover" />
                    <button onClick={() => setImage(null)}
                      className="absolute top-2 left-2 w-7 h-7 rounded-full bg-black/60 text-white text-sm flex items-center justify-center">
                      ✕
                    </button>
                  </div>
                ) : (
                  <button onClick={() => fileRef.current?.click()}
                    className="w-full h-24 rounded-xl flex flex-col items-center justify-center gap-1 text-sm transition-all hover:border-[#4F6EFF]/50 hover:text-[#4F6EFF]"
                    style={{ border: "1.5px dashed rgba(255,255,255,0.18)", color: "var(--fg3)" }}>
                    <span className="text-2xl">📸</span>
                    <span className="text-xs">{isRtl ? "عکس کسب‌وکار (اختیاری)" : "Business photo (optional)"}</span>
                  </button>
                )}
              </div>
            )}

            <p className="text-xs text-center mb-5" style={{ color: "var(--fg3)" }}>
              💡 {isRtl ? cur.hint_fa : cur.hint_en}
            </p>

            <button onClick={handleNext} disabled={!input.trim()}
              className="w-full py-3.5 rounded-xl font-bold text-sm transition-all hover:scale-105 active:scale-95 disabled:opacity-40"
              style={{ background: "#4F6EFF", color: "#111" }}>
              {step < STEPS.length - 1
                ? (isRtl ? "بعدی ←" : "Next →")
                : (isRtl ? "دریافت مشاوره 🚀" : "Get My Advice 🚀")}
            </button>
          </div>

          {/* prev answers */}
          {step > 0 && (
            <div className="w-full mt-4 space-y-2">
              {answers.slice(0, step).map((a, i) => a && (
                <div key={i} className="flex items-start gap-3 rounded-xl px-4 py-3 text-sm"
                  style={{ background: "rgba(79,110,255,0.06)", border: "1px solid rgba(79,110,255,0.15)" }}>
                  <span className="text-[#4F6EFF] flex-shrink-0">{STEPS[i].icon}</span>
                  <span style={{ color: "var(--fg2)" }}>{a}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </Page>
    );
  }

  // ── Result ────────────────────────────────────────────────
  return (
    <Page lang={lang} setLang={setLang} isRtl={isRtl} userName={userName}>
      <div className="w-full max-w-lg mx-auto px-4 py-8 flex flex-col items-center">
        {loading ? (
          <div className="flex flex-col items-center gap-5 py-20">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl anim-float"
              style={{ background: "rgba(79,110,255,0.1)", border: "1px solid rgba(79,110,255,0.3)" }}>
              🤖
            </div>
            <div className="flex gap-1.5">
              {[0,1,2].map(i => (
                <span key={i} className="w-2.5 h-2.5 rounded-full bg-[#4F6EFF] animate-bounce"
                  style={{ animationDelay: `${i*0.15}s` }} />
              ))}
            </div>
            <p className="text-sm" style={{ color: "var(--fg3)" }}>
              {isRtl ? "در حال تحلیل کسب‌وکار شما…" : "Analyzing your business…"}
            </p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-400 mb-4">{error}</p>
            <button onClick={restart} className="px-6 py-2.5 rounded-xl border border-[#4F6EFF]/30 text-[#4F6EFF] text-sm">
              {isRtl ? "دوباره امتحان" : "Try Again"}
            </button>
          </div>
        ) : (
          <div ref={resultRef} className="w-full anim-fade-up">
            <div className="text-center mb-6">
              <div className="text-5xl mb-3">🎉</div>
              <h2 className="font-extrabold text-xl mb-1" style={{ color: "var(--fg)" }}>
                {isRtl ? "راهکار رشد شما آماده است!" : "Your Growth Plan is Ready!"}
              </h2>
              <p className="text-xs" style={{ color: "var(--fg3)" }}>
                {isRtl ? "بر اساس اطلاعات شما طراحی شد" : "Designed based on your inputs"}
              </p>
            </div>

            {image && (
              <div className="w-full rounded-2xl overflow-hidden h-40 mb-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image.preview} alt="business" className="w-full h-full object-cover" />
              </div>
            )}

            <div className="w-full rounded-3xl p-6 mb-5"
              style={{ background: "rgba(79,110,255,0.06)", border: "1px solid rgba(79,110,255,0.2)" }}>
              {result.split("\n").map((line, i) =>
                i === 0
                  ? <p key={i} className="font-extrabold text-[#4F6EFF] text-lg mb-3">{line}</p>
                  : line.trim()
                    ? <p key={i} className="text-sm leading-relaxed mb-1.5" style={{ color: "var(--fg2)" }}>{line}</p>
                    : <br key={i} />
              )}
            </div>

            <div className="flex gap-3">
              <button onClick={restart}
                className="flex-1 py-3 rounded-xl font-bold text-sm transition-all hover:scale-105"
                style={{ background: "#4F6EFF", color: "#111" }}>
                {isRtl ? "مشاوره جدید" : "New Consultation"}
              </button>
              <Link href="/"
                className="flex-1 py-3 rounded-xl font-bold text-sm text-center transition-all hover:scale-105"
                style={{ border: "1px solid var(--border)", color: "var(--fg2)" }}>
                {isRtl ? "بازگشت" : "Back"}
              </Link>
            </div>
          </div>
        )}
      </div>
    </Page>
  );
}

// ── Layout ────────────────────────────────────────────────
function Page({ children, lang, setLang, isRtl, userName }: {
  children: React.ReactNode;
  lang: "fa" | "en";
  setLang: (l: "fa" | "en") => void;
  isRtl: boolean;
  userName?: string;
}) {
  return (
    <div className="min-h-screen grid-bg" dir={isRtl ? "rtl" : "ltr"}
      style={{ background: "var(--bg)", color: "var(--fg)" }}>
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="anim-blob absolute -top-40 -right-40 w-96 h-96 rounded-full blur-[130px]"
          style={{ background: "rgba(79,110,255,0.07)" }} />
        <div className="anim-blob d5 absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-[130px]"
          style={{ background: "rgba(79,110,255,0.07)" }} />
      </div>

      <header className="sticky top-0 z-40 flex items-center justify-between px-5 py-3.5"
        style={{ background: "var(--nav-bg)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--nav-border)" }}>
        <Link href="/" className="font-extrabold text-[#4F6EFF] text-lg tracking-widest">
          {isRtl ? "ماهیر" : "Mahir"}
        </Link>
        <div className="flex items-center gap-2">
          {userName && (
            <Link href="/profile"
              className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-all hover:text-[#4F6EFF]"
              style={{ border: "1px solid rgba(79,110,255,0.25)", color: "#4F6EFF", background: "rgba(79,110,255,0.07)" }}>
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs"
                style={{ background: "rgba(79,110,255,0.2)" }}>{userName.charAt(0)}</span>
              {userName}
            </Link>
          )}
          <button onClick={() => setLang(lang === "fa" ? "en" : "fa")}
            className="text-xs font-bold px-3 py-1.5 rounded-lg transition-all"
            style={{ border: "1px solid var(--border)", color: "var(--fg3)" }}>
            {lang === "fa" ? "EN" : "فا"}
          </button>
        </div>
      </header>

      <main className="relative z-10">{children}</main>
    </div>
  );
}
