"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit() {
    setError("");
    if (!phone || !password) { setError("لطفاً همه فیلدها را پر کنید."); return; }
    if (mode === "register" && password !== confirm) { setError("رمز عبور و تکرار آن یکسان نیستند."); return; }

    setLoading(true);
    const url = mode === "login" ? "/api/auth/login" : "/api/auth/register";
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, password }),
    });
    const data = await res.json();
    setLoading(false);

    if (data.error) { setError(data.error); return; }
    router.push("/consult");
  }

  return (
    <div dir="rtl" className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "#05050f" }}>

      {/* bg blobs */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full blur-[120px]" style={{ background: "rgba(251,191,36,0.06)" }} />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-[120px]" style={{ background: "rgba(99,102,241,0.06)" }} />
      </div>

      <div className="relative w-full max-w-sm">
        {/* logo */}
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-extrabold text-amber-400 tracking-widest">ماهیر</Link>
          <p className="text-xs mt-2" style={{ color: "rgba(240,240,245,0.4)" }}>مشاور هوشمند رشد کسب‌وکار</p>
        </div>

        <div className="rounded-2xl p-8" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>

          {/* tabs */}
          <div className="flex rounded-xl overflow-hidden mb-7" style={{ background: "rgba(255,255,255,0.05)" }}>
            {(["login", "register"] as const).map(m => (
              <button key={m} onClick={() => { setMode(m); setError(""); }}
                className="flex-1 py-2.5 text-sm font-bold transition-all"
                style={{
                  background: mode === m ? "#fbbf24" : "transparent",
                  color: mode === m ? "#111" : "rgba(240,240,245,0.45)",
                }}>
                {m === "login" ? "ورود" : "ثبت‌نام"}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <label className="text-xs font-medium mb-1.5 block" style={{ color: "rgba(240,240,245,0.5)" }}>شماره موبایل</label>
              <input
                type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                placeholder="09123456789" dir="ltr"
                className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", color: "#f0f0f5" }}
              />
            </div>

            <div>
              <label className="text-xs font-medium mb-1.5 block" style={{ color: "rgba(240,240,245,0.5)" }}>رمز عبور</label>
              <input
                type="password" value={password} onChange={e => setPassword(e.target.value)}
                placeholder="حداقل ۶ کاراکتر" dir="ltr"
                onKeyDown={e => e.key === "Enter" && !confirm && submit()}
                className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", color: "#f0f0f5" }}
              />
            </div>

            {mode === "register" && (
              <div>
                <label className="text-xs font-medium mb-1.5 block" style={{ color: "rgba(240,240,245,0.5)" }}>تکرار رمز عبور</label>
                <input
                  type="password" value={confirm} onChange={e => setConfirm(e.target.value)}
                  placeholder="تکرار رمز" dir="ltr"
                  onKeyDown={e => e.key === "Enter" && submit()}
                  className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                  style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", color: "#f0f0f5" }}
                />
              </div>
            )}

            {error && (
              <p className="text-xs text-center py-2 rounded-lg" style={{ background: "rgba(239,68,68,0.1)", color: "#f87171", border: "1px solid rgba(239,68,68,0.2)" }}>
                {error}
              </p>
            )}

            <button onClick={submit} disabled={loading}
              className="w-full py-3.5 rounded-xl font-bold text-sm transition-all hover:scale-105 active:scale-95 disabled:opacity-50 mt-1"
              style={{ background: "#fbbf24", color: "#111" }}>
              {loading ? "در حال پردازش…" : mode === "login" ? "ورود به حساب" : "ثبت‌نام رایگان"}
            </button>
          </div>
        </div>

        <p className="text-center text-xs mt-4" style={{ color: "rgba(240,240,245,0.3)" }}>
          با ورود، <Link href="/" className="text-amber-400 hover:underline">شرایط استفاده</Link> را می‌پذیرید
        </p>
      </div>
    </div>
  );
}
