"use client";

import { useState } from "react";
import Link from "next/link";

type User = { id: string; phone: string; createdAt: string; consultCount: number };

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function login() {
    setLoading(true); setError("");
    const res = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = await res.json();
    setLoading(false);
    if (data.error) { setError(data.error); return; }
    setUsers(data.users);
    setAuthed(true);
  }

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("fa-IR", { year: "numeric", month: "long", day: "numeric" });
  }

  if (!authed) return (
    <div dir="rtl" className="min-h-screen flex items-center justify-center px-4" style={{ background: "#05050f" }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🔐</div>
          <h1 className="text-xl font-extrabold text-amber-400">پنل مدیریت ماهیر</h1>
          <p className="text-xs mt-1" style={{ color: "rgba(240,240,245,0.35)" }}>دسترسی محدود به ادمین</p>
        </div>

        <div className="rounded-2xl p-7" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <label className="text-xs font-medium mb-2 block" style={{ color: "rgba(240,240,245,0.5)" }}>رمز عبور ادمین</label>
          <input
            type="password" value={password} onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === "Enter" && login()}
            placeholder="رمز ادمین را وارد کنید" dir="ltr"
            className="w-full rounded-xl px-4 py-3 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-amber-400/50"
            style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", color: "#f0f0f5" }}
          />
          {error && <p className="text-xs text-red-400 mb-3 text-center">{error}</p>}
          <button onClick={login} disabled={loading}
            className="w-full py-3 rounded-xl font-bold text-sm transition-all hover:scale-105"
            style={{ background: "#fbbf24", color: "#111" }}>
            {loading ? "در حال بررسی…" : "ورود به پنل"}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div dir="rtl" className="min-h-screen px-6 py-10" style={{ background: "#05050f", color: "#f0f0f5" }}>
      <div className="max-w-4xl mx-auto">

        {/* header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-2xl font-extrabold text-amber-400">پنل مدیریت ماهیر</h1>
            <p className="text-sm mt-1" style={{ color: "rgba(240,240,245,0.4)" }}>
              مجموع کاربران: <span className="text-amber-400 font-bold">{users.length}</span>
            </p>
          </div>
          <Link href="/" className="text-sm px-4 py-2 rounded-xl" style={{ border: "1px solid rgba(255,255,255,0.1)", color: "rgba(240,240,245,0.5)" }}>
            بازگشت به سایت
          </Link>
        </div>

        {/* stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: "کل کاربران", value: users.length, icon: "👥" },
            { label: "مشاوره‌های دریافتی", value: users.reduce((s, u) => s + u.consultCount, 0), icon: "💬" },
            { label: "کاربران امروز", value: users.filter(u => new Date(u.createdAt).toDateString() === new Date().toDateString()).length, icon: "✨" },
          ].map(s => (
            <div key={s.label} className="rounded-2xl p-5 text-center" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="text-3xl mb-2">{s.icon}</div>
              <div className="text-2xl font-extrabold text-amber-400">{s.value}</div>
              <div className="text-xs mt-1" style={{ color: "rgba(240,240,245,0.4)" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* users table */}
        <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="px-6 py-4" style={{ background: "rgba(251,191,36,0.08)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
            <h2 className="font-bold text-amber-400">لیست کاربران ثبت‌نام‌شده</h2>
          </div>

          {users.length === 0 ? (
            <div className="p-12 text-center" style={{ color: "rgba(240,240,245,0.3)" }}>
              هنوز کاربری ثبت‌نام نکرده است
            </div>
          ) : (
            <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              {users.map((u, i) => (
                <div key={u.id} className="flex items-center justify-between px-6 py-4 hover:bg-white/[0.02] transition-colors">
                  <div className="flex items-center gap-4">
                    <span className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{ background: "rgba(251,191,36,0.12)", color: "#fbbf24" }}>
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-bold text-sm" dir="ltr">{u.phone}</p>
                      <p className="text-xs mt-0.5" style={{ color: "rgba(240,240,245,0.4)" }}>{formatDate(u.createdAt)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs px-2.5 py-1 rounded-full" style={{ background: "rgba(251,191,36,0.1)", color: "#fbbf24" }}>
                      {u.consultCount} مشاوره
                    </span>
                    <a href={`tel:${u.phone}`}
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-lg transition-all hover:scale-110"
                      style={{ background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.25)" }}
                      title="تماس">
                      📞
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
