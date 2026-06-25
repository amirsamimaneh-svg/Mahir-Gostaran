"use client";

import { useState } from "react";
import Link from "next/link";

type User = { id: string; phone: string; name: string; createdAt: string; consultCount: number };
type Message = { id: string; from: "admin" | "user"; userPhone: string; text: string; createdAt: string };

const PASS = "Am-=1386";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<"users" | "chat">("users");
  const [selectedPhone, setSelectedPhone] = useState<string | null>(null);
  const [msgText, setMsgText] = useState("");
  const [sending, setSending] = useState(false);

  async function login() {
    setLoading(true); setError("");
    const res = await fetch("/api/admin/users", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = await res.json();
    setLoading(false);
    if (data.error) { setError(data.error); return; }
    setUsers(data.users);
    setAuthed(true);
    loadMessages();
  }

  async function loadMessages() {
    const res = await fetch("/api/admin/users", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: PASS }),
    });
    // reuse users endpoint just for auth; fetch messages separately
    const mRes = await fetch("/api/admin/message", {
      method: "GET",
    }).catch(() => null);
    // messages loaded via admin messages API
    void mRes;
  }

  async function fetchMessages() {
    const res = await fetch("/api/admin/messages", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: PASS }),
    });
    const data = await res.json();
    if (data.messages) setMessages(data.messages);
  }

  async function sendMsg() {
    if (!selectedPhone || !msgText.trim() || sending) return;
    setSending(true);
    await fetch("/api/admin/message", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: PASS, userPhone: selectedPhone, text: msgText.trim() }),
    });
    setMsgText("");
    setSending(false);
    fetchMessages();
  }

  function openChat(phone: string) {
    setSelectedPhone(phone);
    setTab("chat");
    fetchMessages();
  }

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("fa-IR", { year: "numeric", month: "long", day: "numeric" });
  }
  function formatTime(iso: string) {
    return new Date(iso).toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" });
  }

  const chatMessages = messages.filter(m => m.userPhone === selectedPhone);
  const selectedUser = users.find(u => u.phone === selectedPhone);

  if (!authed) return (
    <div dir="rtl" className="min-h-screen flex items-center justify-center px-4" style={{ background: "#05050f" }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🔐</div>
          <h1 className="text-xl font-extrabold text-amber-400">پنل مدیریت ماهیر</h1>
        </div>
        <div className="rounded-2xl p-7" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <label className="text-xs font-medium mb-2 block" style={{ color: "rgba(240,240,245,0.5)" }}>رمز عبور ادمین</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === "Enter" && login()}
            placeholder="رمز ادمین" dir="ltr"
            className="w-full rounded-xl px-4 py-3 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-amber-400/50"
            style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", color: "#f0f0f5" }} />
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
    <div dir="rtl" className="min-h-screen" style={{ background: "#05050f", color: "#f0f0f5" }}>
      <nav style={{ background: "rgba(5,5,15,0.9)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        className="fixed top-0 inset-x-0 z-50">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
          <h1 className="text-lg font-extrabold text-amber-400">🔐 پنل ادمین ماهیر</h1>
          <Link href="/" className="text-xs px-3 py-2 rounded-lg" style={{ border: "1px solid rgba(255,255,255,0.1)", color: "rgba(240,240,245,0.4)" }}>
            سایت
          </Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 pt-24 pb-20">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "کل کاربران", value: users.length, icon: "👥" },
            { label: "مشاوره‌ها", value: users.reduce((s, u) => s + u.consultCount, 0), icon: "💬" },
            { label: "امروز", value: users.filter(u => new Date(u.createdAt).toDateString() === new Date().toDateString()).length, icon: "✨" },
          ].map(s => (
            <div key={s.label} className="rounded-2xl p-5 text-center" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="text-2xl font-extrabold text-amber-400">{s.value}</div>
              <div className="text-xs mt-1" style={{ color: "rgba(240,240,245,0.4)" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex rounded-xl overflow-hidden mb-6" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
          {([["users", "کاربران"], ["chat", "پیام‌رسانی"]] as const).map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)}
              className="flex-1 py-3 text-sm font-bold transition-all"
              style={{ background: tab === key ? "#fbbf24" : "transparent", color: tab === key ? "#111" : "rgba(240,240,245,0.45)" }}>
              {label}
            </button>
          ))}
        </div>

        {/* Users Tab */}
        {tab === "users" && (
          <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
            {users.length === 0 ? (
              <div className="p-12 text-center" style={{ color: "rgba(240,240,245,0.3)" }}>هنوز کاربری ثبت‌نام نکرده</div>
            ) : (
              <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                {users.map((u, i) => (
                  <div key={u.id} className="flex items-center justify-between px-6 py-4 hover:bg-white/[0.02] transition-colors">
                    <div className="flex items-center gap-4">
                      <span className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{ background: "rgba(251,191,36,0.12)", color: "#fbbf24" }}>{i + 1}</span>
                      <div>
                        <p className="font-bold text-sm">{u.name}</p>
                        <p className="text-xs font-mono mt-0.5" dir="ltr" style={{ color: "rgba(240,240,245,0.4)" }}>{u.phone}</p>
                        <p className="text-xs mt-0.5" style={{ color: "rgba(240,240,245,0.3)" }}>{formatDate(u.createdAt)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-1 rounded-full" style={{ background: "rgba(251,191,36,0.1)", color: "#fbbf24" }}>
                        {u.consultCount} مشاوره
                      </span>
                      <button onClick={() => openChat(u.phone)}
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-base transition-all hover:scale-110"
                        style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)" }}
                        title="ارسال پیام">💬</button>
                      <a href={`tel:${u.phone}`}
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-base transition-all hover:scale-110"
                        style={{ background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.25)" }}
                        title="تماس">📞</a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Chat Tab */}
        {tab === "chat" && (
          <div className="flex gap-4 h-[500px]">
            {/* user list */}
            <div className="w-48 flex-shrink-0 rounded-2xl overflow-hidden flex flex-col" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="px-3 py-2.5 text-xs font-bold text-amber-400" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>کاربران</div>
              <div className="overflow-y-auto flex-1">
                {users.map(u => (
                  <button key={u.phone} onClick={() => { setSelectedPhone(u.phone); fetchMessages(); }}
                    className="w-full text-right px-3 py-3 text-xs transition-all hover:bg-white/[0.04]"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", background: selectedPhone === u.phone ? "rgba(251,191,36,0.08)" : "transparent", color: selectedPhone === u.phone ? "#fbbf24" : "rgba(240,240,245,0.6)" }}>
                    <p className="font-bold truncate">{u.name}</p>
                    <p className="font-mono mt-0.5 opacity-60 truncate" dir="ltr">{u.phone}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* chat area */}
            <div className="flex-1 flex flex-col rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              {!selectedPhone ? (
                <div className="flex-1 flex items-center justify-center" style={{ color: "rgba(240,240,245,0.3)" }}>
                  <div className="text-center"><div className="text-4xl mb-3">💬</div><p className="text-sm">یک کاربر انتخاب کنید</p></div>
                </div>
              ) : (
                <>
                  <div className="px-4 py-3 flex items-center gap-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", background: "rgba(251,191,36,0.05)" }}>
                    <span className="font-bold text-sm">{selectedUser?.name}</span>
                    <span className="font-mono text-xs" dir="ltr" style={{ color: "rgba(240,240,245,0.4)" }}>{selectedPhone}</span>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
                    {chatMessages.length === 0 ? (
                      <div className="flex-1 flex items-center justify-center" style={{ color: "rgba(240,240,245,0.3)" }}>
                        <p className="text-sm">هنوز پیامی نیست</p>
                      </div>
                    ) : chatMessages.map(msg => (
                      <div key={msg.id} className={`flex ${msg.from === "admin" ? "justify-start" : "justify-end"}`}>
                        <div className="max-w-[70%] rounded-2xl px-4 py-2.5"
                          style={{
                            background: msg.from === "admin" ? "rgba(251,191,36,0.12)" : "rgba(255,255,255,0.07)",
                            border: msg.from === "admin" ? "1px solid rgba(251,191,36,0.2)" : "1px solid rgba(255,255,255,0.1)",
                          }}>
                          <p className="text-xs font-bold mb-1" style={{ color: msg.from === "admin" ? "#fbbf24" : "rgba(240,240,245,0.5)" }}>
                            {msg.from === "admin" ? "شما (ادمین)" : selectedUser?.name}
                          </p>
                          <p className="text-sm">{msg.text}</p>
                          <p className="text-xs mt-1 opacity-50">{formatTime(msg.createdAt)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 flex gap-2" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                    <input value={msgText} onChange={e => setMsgText(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && sendMsg()}
                      placeholder="پیام به کاربر…"
                      className="flex-1 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                      style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", color: "#f0f0f5" }} />
                    <button onClick={sendMsg} disabled={sending || !msgText.trim()}
                      className="px-5 rounded-xl font-bold text-sm transition-all hover:scale-105 disabled:opacity-40"
                      style={{ background: "#fbbf24", color: "#111" }}>
                      ارسال
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
