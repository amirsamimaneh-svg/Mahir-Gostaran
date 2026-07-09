"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Step = "form" | "success";
type Mode = "login" | "register";

const FEATURES = [
  { icon: "🤖", text: "مشاوره هوش مصنوعی" },
  { icon: "📈", text: "استراتژی رشد" },
  { icon: "✦",  text: "هویت برند" },
  { icon: "📱", text: "بازاریابی دیجیتال" },
];

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("login");
  const [step, setStep] = useState<Step>("form");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 3000);
    return () => clearInterval(id);
  }, []);

  async function submit() {
    setError("");
    if (!phone || !password) { setError("لطفاً همه فیلدها را پر کنید."); return; }
    if (mode === "register") {
      if (!name.trim()) { setError("لطفاً نام خود را وارد کنید."); return; }
      if (password !== confirm) { setError("رمز عبور و تکرار آن یکسان نیستند."); return; }
    }
    setLoading(true);
    const url = mode === "login" ? "/api/auth/login" : "/api/auth/register";
    const body = mode === "login" ? { phone, password } : { phone, name: name.trim(), password };
    const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    const data = await res.json();
    setLoading(false);
    if (data.error) { setError(data.error); return; }
    if (mode === "register") { setUserName(name.trim()); setStep("success"); }
    else router.push("/consult");
  }

  /* ─── Success ─── */
  if (step === "success") return (
    <div dir="rtl" className="min-h-screen flex items-center justify-center px-4" style={{ background: "#05050f" }}>
      <Glow />
      <div className="relative w-full max-w-sm text-center">
        <div className="mb-6">
          <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center text-4xl mb-4"
            style={{ background: "linear-gradient(135deg,rgba(124,111,255,0.2),rgba(124,111,255,0.05))", border: "2px solid rgba(124,111,255,0.3)", boxShadow: "0 0 40px rgba(124,111,255,0.15)" }}>
            🎉
          </div>
          <h2 className="text-2xl font-extrabold text-[#7C6FFF] mb-1">خوش اومدی!</h2>
          <p className="text-sm" style={{ color: "rgba(240,240,245,0.45)" }}>حساب شما با موفقیت ساخته شد</p>
        </div>

        <div className="rounded-2xl p-6 mb-4"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(124,111,255,0.15)", backdropFilter: "blur(20px)" }}>
          <div className="flex items-center gap-3 mb-4 p-3 rounded-xl" style={{ background: "rgba(124,111,255,0.06)" }}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-extrabold text-lg"
              style={{ background: "linear-gradient(135deg,#7C6FFF,#6A5EE8)", color: "#111" }}>
              {userName.charAt(0)}
            </div>
            <div className="text-right">
              <p className="font-bold text-sm" style={{ color: "#f0f0f5" }}>{userName}</p>
              <p className="text-xs font-mono" dir="ltr" style={{ color: "rgba(240,240,245,0.4)" }}>{phone}</p>
            </div>
          </div>
          <button onClick={() => router.push("/consult")}
            className="w-full py-3.5 rounded-xl font-bold text-sm transition-all hover:scale-105 active:scale-95"
            style={{ background: "linear-gradient(135deg,#7C6FFF,#6A5EE8)", color: "#111", boxShadow: "0 0 30px rgba(124,111,255,0.3)" }}>
            شروع مشاوره رایگان ✦
          </button>
        </div>
        <Link href="/" className="text-xs" style={{ color: "rgba(240,240,245,0.3)" }}>بازگشت به خانه</Link>
      </div>
    </div>
  );

  /* ─── Main Form ─── */
  return (
    <div dir="rtl" className="min-h-screen flex" style={{ background: "#05050f" }}>
      <Glow />

      {/* Left panel — branding (hidden on mobile) */}
      <div className="hidden lg:flex flex-col justify-between w-[42%] flex-shrink-0 p-12 relative overflow-hidden"
        style={{ borderLeft: "1px solid rgba(255,255,255,0.05)" }}>

        {/* animated ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          {[260, 340, 420].map((s, i) => (
            <div key={i} className="absolute rounded-full"
              style={{
                width: s, height: s,
                top: -s / 2, left: -s / 2,
                border: `1px solid rgba(124,111,255,${0.07 - i * 0.02})`,
                animation: `spin ${18 + i * 6}s linear infinite`,
              }} />
          ))}
          <div className="w-24 h-24 rounded-full flex items-center justify-center font-extrabold text-3xl"
            style={{ background: "linear-gradient(135deg,#7C6FFF,#6A5EE8)", color: "#111", boxShadow: "0 0 60px rgba(124,111,255,0.25)" }}>
            M
          </div>
        </div>

        <Link href="/" className="text-2xl font-extrabold text-[#7C6FFF] relative z-10">ماهیر</Link>

        <div className="relative z-10">
          <p className="text-xs font-bold tracking-widest mb-3" style={{ color: "rgba(124,111,255,0.5)" }}>امکانات</p>
          <div className="flex flex-col gap-3">
            {FEATURES.map((f, i) => (
              <div key={i} className="flex items-center gap-3 transition-all duration-500"
                style={{ opacity: tick % FEATURES.length === i ? 1 : 0.35, transform: `translateX(${tick % FEATURES.length === i ? "0" : "6px"})` }}>
                <span className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
                  style={{ background: tick % FEATURES.length === i ? "rgba(124,111,255,0.15)" : "rgba(255,255,255,0.04)", border: "1px solid rgba(124,111,255,0.15)" }}>
                  {f.icon}
                </span>
                <span className="text-sm font-medium" style={{ color: tick % FEATURES.length === i ? "#7C6FFF" : "rgba(240,240,245,0.4)" }}>{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative z-10">

        {/* Mobile logo */}
        <Link href="/" className="lg:hidden text-2xl font-extrabold text-[#7C6FFF] mb-8">ماهیر</Link>

        <div className="w-full max-w-[380px]">

          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-2xl font-extrabold mb-1" style={{ color: "#f0f0f5" }}>
              {mode === "login" ? "خوش برگشتی 👋" : "شروع کن رایگان ✦"}
            </h1>
            <p className="text-sm" style={{ color: "rgba(240,240,245,0.4)" }}>
              {mode === "login"
                ? "وارد حساب خود شو و مشاوره بگیر"
                : "در چند ثانیه حساب بساز و رشد کن"}
            </p>
          </div>

          {/* Tab switcher */}
          <div className="flex gap-1 p-1 rounded-xl mb-7"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}>
            {(["login", "register"] as const).map(m => (
              <button key={m} onClick={() => { setMode(m); setError(""); }}
                className="flex-1 py-2.5 text-sm font-bold rounded-lg transition-all"
                style={{
                  background: mode === m ? "#7C6FFF" : "transparent",
                  color: mode === m ? "#111" : "rgba(240,240,245,0.4)",
                  boxShadow: mode === m ? "0 2px 12px rgba(124,111,255,0.25)" : "none",
                }}>
                {m === "login" ? "ورود" : "ثبت‌نام"}
              </button>
            ))}
          </div>

          {/* Fields */}
          <div className="flex flex-col gap-4">
            {mode === "register" && (
              <Field label="نام شما">
                <input type="text" value={name} onChange={e => setName(e.target.value)}
                  placeholder="مثلاً: علی محمدی" autoFocus
                  className="w-full rounded-xl px-4 py-3.5 text-sm focus:outline-none transition-all"
                  style={inputStyle} />
              </Field>
            )}

            <Field label="شماره موبایل">
              <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                placeholder="09123456789" dir="ltr"
                autoFocus={mode === "login"}
                className="w-full rounded-xl px-4 py-3.5 text-sm focus:outline-none transition-all"
                style={inputStyle} />
            </Field>

            <Field label="رمز عبور">
              <div className="relative">
                <input type={showPass ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="حداقل ۶ کاراکتر" dir="ltr"
                  onKeyDown={e => e.key === "Enter" && !confirm && submit()}
                  className="w-full rounded-xl px-4 py-3.5 text-sm focus:outline-none transition-all"
                  style={inputStyle} />
                <button type="button" onClick={() => setShowPass(v => !v)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-xs px-2 py-1 rounded-lg transition-all"
                  style={{ color: "rgba(240,240,245,0.35)", background: "rgba(255,255,255,0.05)" }}>
                  {showPass ? "پنهان" : "نمایش"}
                </button>
              </div>
            </Field>

            {mode === "register" && (
              <Field label="تکرار رمز عبور">
                <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)}
                  placeholder="تکرار رمز" dir="ltr"
                  onKeyDown={e => e.key === "Enter" && submit()}
                  className="w-full rounded-xl px-4 py-3.5 text-sm focus:outline-none transition-all"
                  style={inputStyle} />
              </Field>
            )}

            {error && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl text-xs"
                style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "#f87171" }}>
                <span>⚠</span> {error}
              </div>
            )}

            <button onClick={submit} disabled={loading}
              className="w-full py-4 rounded-xl font-extrabold text-sm transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 mt-1 relative overflow-hidden"
              style={{ background: "linear-gradient(135deg,#7C6FFF,#6A5EE8)", color: "#111", boxShadow: "0 0 30px rgba(124,111,255,0.25)" }}>
              {loading
                ? <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                    </svg>
                    در حال پردازش…
                  </span>
                : mode === "login" ? "ورود به حساب ←" : "ساخت حساب رایگان ✦"
              }
            </button>
          </div>

          <p className="text-xs text-center mt-6" style={{ color: "rgba(240,240,245,0.25)" }}>
            {mode === "login"
              ? <>حساب نداری؟ <button onClick={() => setMode("register")} className="text-[#7C6FFF] font-bold hover:underline">ثبت‌نام کن</button></>
              : <>حساب داری؟ <button onClick={() => setMode("login")} className="text-[#7C6FFF] font-bold hover:underline">وارد شو</button></>
            }
          </p>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.09)",
  color: "#f0f0f5",
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-semibold mb-2 block" style={{ color: "rgba(240,240,245,0.45)" }}>{label}</label>
      {children}
    </div>
  );
}

function Glow() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute -top-60 -right-60 w-[500px] h-[500px] rounded-full blur-[140px]"
        style={{ background: "rgba(124,111,255,0.06)" }} />
      <div className="absolute -bottom-60 -left-60 w-[500px] h-[500px] rounded-full blur-[140px]"
        style={{ background: "rgba(124,111,255,0.05)" }} />
    </div>
  );
}
