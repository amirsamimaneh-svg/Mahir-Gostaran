"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Mode = "login" | "register";
type Method = "phone" | "email";

const FEATURES = [
  { icon: "🤖", text: "مشاوره هوش مصنوعی" },
  { icon: "📈", text: "استراتژی رشد" },
  { icon: "✦", text: "هویت برند" },
  { icon: "📱", text: "بازاریابی دیجیتال" },
];

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("login");
  const [method, setMethod] = useState<Method>("phone");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [userName, setUserName] = useState("");
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 3000);
    return () => clearInterval(id);
  }, []);

  const identifier = method === "phone" ? phone : email;

  function resetFields() {
    setPhone(""); setEmail(""); setName(""); setPassword(""); setConfirm(""); setError("");
  }

  async function submit() {
    setError("");
    const id = identifier.trim();
    if (!id || !password) { setError("لطفاً همه فیلدهای اجباری را پر کنید."); return; }

    if (method === "phone" && !/^09\d{9}$/.test(id)) {
      setError("شماره موبایل باید با ۰۹ شروع شود و ۱۱ رقم باشد."); return;
    }
    if (method === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(id)) {
      setError("فرمت ایمیل صحیح نیست."); return;
    }
    if (mode === "register") {
      if (!name.trim()) { setError("نام الزامی است."); return; }
      if (password.length < 6) { setError("رمز عبور باید حداقل ۶ کاراکتر باشد."); return; }
      if (password !== confirm) { setError("رمز عبور و تکرار آن یکسان نیستند."); return; }
    }

    setLoading(true);
    if (mode === "register") {
      const body: Record<string, string> = { name: name.trim(), password };
      if (method === "phone") body.phone = id; else body.email = id;
      const res = await fetch("/api/auth/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const data = await res.json();
      setLoading(false);
      if (data.error) { setError(data.error); return; }
      setUserName(name.trim()); setSuccess(true);
    } else {
      const res = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ identifier: id, password }) });
      const data = await res.json();
      setLoading(false);
      if (data.error) { setError(data.error); return; }
      router.push("/consult");
    }
  }

  /* ── Success screen ── */
  if (success) return (
    <div dir="rtl" className="min-h-screen flex items-center justify-center px-4" style={{ background: "#05050f" }}>
      <Glow />
      <div className="relative w-full max-w-sm text-center">
        <div className="w-24 h-24 rounded-full mx-auto flex items-center justify-center text-5xl mb-6"
          style={{ background: "linear-gradient(135deg,rgba(91,156,246,0.2),rgba(37,99,235,0.08))", border: "2px solid rgba(91,156,246,0.3)", boxShadow: "0 0 60px rgba(91,156,246,0.15)" }}>
          🎉
        </div>
        <h2 className="text-2xl font-black text-white mb-2">خوش اومدی!</h2>
        <p className="text-sm mb-8" style={{ color: "rgba(240,240,245,0.4)" }}>حساب <span className="text-[#5B9CF6] font-bold">{userName}</span> با موفقیت ساخته شد</p>
        <div className="rounded-2xl p-6 mb-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(91,156,246,0.15)" }}>
          <div className="flex items-center gap-3 p-3 rounded-xl mb-4" style={{ background: "rgba(91,156,246,0.06)" }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg" style={{ background: "linear-gradient(135deg,#5B9CF6,#2563EB)", color: "#fff" }}>
              {userName.charAt(0)}
            </div>
            <div className="text-right">
              <p className="font-bold text-sm text-white">{userName}</p>
              <p className="text-xs" dir="ltr" style={{ color: "rgba(240,240,245,0.4)" }}>{identifier}</p>
            </div>
          </div>
          <button onClick={() => router.push("/consult")}
            className="w-full py-3.5 rounded-xl font-extrabold text-sm transition-all hover:scale-[1.02]"
            style={{ background: "linear-gradient(135deg,#5B9CF6,#2563EB)", color: "#fff", boxShadow: "0 0 30px rgba(91,156,246,0.3)" }}>
            شروع مشاوره رایگان ✦
          </button>
        </div>
        <Link href="/" className="text-xs" style={{ color: "rgba(240,240,245,0.25)" }}>بازگشت به خانه</Link>
      </div>
    </div>
  );

  /* ── Main ── */
  return (
    <div dir="rtl" className="min-h-screen flex" style={{ background: "#05050f" }}>
      <Glow />

      {/* Left branding panel */}
      <div className="hidden lg:flex flex-col justify-between w-[42%] flex-shrink-0 p-12 relative overflow-hidden"
        style={{ borderLeft: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          {[260, 340, 420].map((s, i) => (
            <div key={i} className="absolute rounded-full"
              style={{ width: s, height: s, top: -s / 2, left: -s / 2, border: `1px solid rgba(91,156,246,${0.07 - i * 0.02})`, animation: `spin ${18 + i * 6}s linear infinite` }} />
          ))}
          <div className="w-24 h-24 rounded-full flex items-center justify-center font-black text-3xl"
            style={{ background: "linear-gradient(135deg,#5B9CF6,#2563EB)", color: "#fff", boxShadow: "0 0 60px rgba(91,156,246,0.3)" }}>
            M
          </div>
        </div>
        <Link href="/" className="text-2xl font-black text-[#5B9CF6] relative z-10">ماهیر</Link>
        <div className="relative z-10">
          <p className="text-xs font-black tracking-widest mb-4 uppercase" style={{ color: "rgba(91,156,246,0.4)" }}>امکانات</p>
          <div className="flex flex-col gap-3">
            {FEATURES.map((f, i) => (
              <div key={i} className="flex items-center gap-3 transition-all duration-500"
                style={{ opacity: tick % FEATURES.length === i ? 1 : 0.3, transform: `translateX(${tick % FEATURES.length === i ? "0" : "8px"})` }}>
                <span className="w-9 h-9 rounded-xl flex items-center justify-center text-base"
                  style={{ background: tick % FEATURES.length === i ? "rgba(91,156,246,0.15)" : "rgba(255,255,255,0.04)", border: "1px solid rgba(91,156,246,0.15)" }}>
                  {f.icon}
                </span>
                <span className="text-sm font-medium" style={{ color: tick % FEATURES.length === i ? "#5B9CF6" : "rgba(240,240,245,0.35)" }}>{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative z-10">
        <Link href="/" className="lg:hidden text-2xl font-black text-[#5B9CF6] mb-8">ماهیر</Link>

        <div className="w-full max-w-[400px]">

          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-2xl font-black mb-1.5" style={{ color: "#f0f0f5" }}>
              {mode === "login" ? "خوش برگشتی 👋" : "شروع کن رایگان ✦"}
            </h1>
            <p className="text-sm" style={{ color: "rgba(240,240,245,0.4)" }}>
              {mode === "login" ? "وارد حساب خود شو و مشاوره بگیر" : "در چند ثانیه حساب بساز و رشد کن"}
            </p>
          </div>

          {/* Mode switcher */}
          <div className="flex gap-1 p-1 rounded-2xl mb-6" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
            {(["login", "register"] as const).map(m => (
              <button key={m} onClick={() => { setMode(m); resetFields(); }}
                className="flex-1 py-2.5 text-sm font-bold rounded-xl transition-all duration-200"
                style={{
                  background: mode === m ? "linear-gradient(135deg,#5B9CF6,#2563EB)" : "transparent",
                  color: mode === m ? "#fff" : "rgba(240,240,245,0.4)",
                  boxShadow: mode === m ? "0 4px 20px rgba(91,156,246,0.3)" : "none",
                }}>
                {m === "login" ? "ورود" : "ثبت‌نام"}
              </button>
            ))}
          </div>

          {/* Method selector */}
          <div className="mb-5">
            <p className="text-xs font-black tracking-widest uppercase mb-3" style={{ color: "rgba(240,240,245,0.3)" }}>
              روش {mode === "login" ? "ورود" : "ثبت‌نام"}
            </p>
            <div className="grid grid-cols-2 gap-2">
              {([
                { key: "phone", label: "شماره موبایل", icon: "📱" },
                { key: "email", label: "ایمیل", icon: "✉️" },
              ] as const).map(opt => (
                <button key={opt.key} onClick={() => { setMethod(opt.key); setError(""); }}
                  className="flex items-center gap-2.5 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all"
                  style={{
                    background: method === opt.key ? "rgba(91,156,246,0.1)" : "rgba(255,255,255,0.03)",
                    border: `1.5px solid ${method === opt.key ? "rgba(91,156,246,0.5)" : "rgba(255,255,255,0.08)"}`,
                    color: method === opt.key ? "#5B9CF6" : "rgba(240,240,245,0.4)",
                    boxShadow: method === opt.key ? "0 0 20px rgba(91,156,246,0.1)" : "none",
                  }}>
                  <span>{opt.icon}</span>
                  <span>{opt.label}</span>
                  {method === opt.key && <span className="mr-auto text-xs">✓</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Fields */}
          <div className="flex flex-col gap-4">

            {mode === "register" && (
              <Field label="نام کامل">
                <input type="text" value={name} onChange={e => setName(e.target.value)}
                  placeholder="مثلاً: علی محمدی"
                  className="w-full rounded-xl px-4 py-3.5 text-sm focus:outline-none transition-all"
                  style={iStyle} />
              </Field>
            )}

            {method === "phone" ? (
              <Field label="شماره موبایل">
                <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                  placeholder="09123456789" dir="ltr"
                  className="w-full rounded-xl px-4 py-3.5 text-sm focus:outline-none transition-all"
                  style={iStyle} />
              </Field>
            ) : (
              <Field label="آدرس ایمیل">
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="example@gmail.com" dir="ltr"
                  className="w-full rounded-xl px-4 py-3.5 text-sm focus:outline-none transition-all"
                  style={iStyle} />
              </Field>
            )}

            <Field label="رمز عبور">
              <div className="relative">
                <input type={showPass ? "text" : "password"} value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="حداقل ۶ کاراکتر" dir="ltr"
                  onKeyDown={e => e.key === "Enter" && !confirm && submit()}
                  className="w-full rounded-xl px-4 py-3.5 text-sm focus:outline-none transition-all"
                  style={iStyle} />
                <button type="button" onClick={() => setShowPass(v => !v)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-xs px-2.5 py-1 rounded-lg transition-all"
                  style={{ color: "rgba(240,240,245,0.35)", background: "rgba(255,255,255,0.06)" }}>
                  {showPass ? "پنهان" : "نمایش"}
                </button>
              </div>
            </Field>

            {mode === "register" && (
              <Field label="تکرار رمز عبور">
                <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)}
                  placeholder="رمز عبور را دوباره وارد کنید" dir="ltr"
                  onKeyDown={e => e.key === "Enter" && submit()}
                  className="w-full rounded-xl px-4 py-3.5 text-sm focus:outline-none transition-all"
                  style={iStyle} />
              </Field>
            )}

            {/* Strength indicator (register only) */}
            {mode === "register" && password.length > 0 && (
              <PasswordStrength password={password} />
            )}

            {error && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl text-xs"
                style={{ background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.2)", color: "#f87171" }}>
                ⚠ {error}
              </div>
            )}

            <button onClick={submit} disabled={loading}
              className="w-full py-4 rounded-xl font-extrabold text-sm transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 mt-1"
              style={{ background: "linear-gradient(135deg,#5B9CF6,#2563EB)", color: "#fff", boxShadow: "0 0 30px rgba(91,156,246,0.25)" }}>
              {loading
                ? <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    در حال پردازش…
                  </span>
                : mode === "login" ? "ورود به حساب ←" : "ساخت حساب رایگان ✦"
              }
            </button>
          </div>

          <p className="text-xs text-center mt-6" style={{ color: "rgba(240,240,245,0.25)" }}>
            {mode === "login"
              ? <>حساب نداری؟ <button onClick={() => { setMode("register"); resetFields(); }} className="text-[#5B9CF6] font-bold hover:underline">ثبت‌نام کن</button></>
              : <>حساب داری؟ <button onClick={() => { setMode("login"); resetFields(); }} className="text-[#5B9CF6] font-bold hover:underline">وارد شو</button></>
            }
          </p>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

const iStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.09)",
  color: "#f0f0f5",
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-bold mb-2 block tracking-wide" style={{ color: "rgba(216,229,245,0.45)" }}>{label}</label>
      {children}
    </div>
  );
}

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    password.length >= 6,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ];
  const score = checks.filter(Boolean).length;
  const colors = ["#ef4444", "#fb923c", "#facc15", "#34d399"];
  const labels = ["ضعیف", "متوسط", "خوب", "قوی"];

  return (
    <div>
      <div className="flex gap-1 mb-1">
        {[0, 1, 2, 3].map(i => (
          <div key={i} className="flex-1 h-1 rounded-full transition-all duration-300"
            style={{ background: i < score ? colors[score - 1] : "rgba(255,255,255,0.08)" }} />
        ))}
      </div>
      <p className="text-[10px] font-bold" style={{ color: score > 0 ? colors[score - 1] : "rgba(240,240,245,0.3)" }}>
        قدرت رمز: {score > 0 ? labels[score - 1] : "—"}
      </p>
    </div>
  );
}

function Glow() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute -top-60 -right-60 w-[500px] h-[500px] rounded-full blur-[140px]"
        style={{ background: "rgba(91,156,246,0.06)" }} />
      <div className="absolute -bottom-60 -left-60 w-[500px] h-[500px] rounded-full blur-[140px]"
        style={{ background: "rgba(37,99,235,0.05)" }} />
    </div>
  );
}
