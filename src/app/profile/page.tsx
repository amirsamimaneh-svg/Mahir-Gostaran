"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type UserInfo = { phone: string; name: string; createdAt: string; consultCount: number; unread: number };
type Message = { id: string; from: "admin" | "user"; text: string; createdAt: string };

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserInfo | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [tab, setTab] = useState<"info" | "chat">("info");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/auth/me").then(r => r.json()).then(d => {
      if (!d.user) { router.replace("/login"); return; }
      setUser(d.user);
    });
  }, [router]);

  useEffect(() => {
    if (tab === "chat") loadMessages();
  }, [tab]);

  async function loadMessages() {
    const res = await fetch("/api/messages");
    const data = await res.json();
    if (data.messages) { setMessages(data.messages); setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 100); }
  }

  async function sendMsg() {
    if (!input.trim() || sending) return;
    setSending(true);
    await fetch("/api/messages", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: input.trim() }),
    });
    setInput("");
    setSending(false);
    loadMessages();
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
  }

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("fa-IR", { year: "numeric", month: "long", day: "numeric" });
  }
  function formatTime(iso: string) {
    return new Date(iso).toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" });
  }

  if (!user) return (
    <div style={{ background: "#05050f", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="w-8 h-8 rounded-full border-2 border-[#00E5A0] border-t-transparent animate-spin" />
    </div>
  );

  return (
    <div dir="rtl" className="min-h-screen" style={{ background: "#05050f", color: "#f0f0f5" }}>
      {/* Navbar */}
      <nav style={{ background: "rgba(5,5,15,0.9)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        className="fixed top-0 inset-x-0 z-50">
        <div className="max-w-3xl mx-auto flex items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-extrabold text-[#00E5A0] tracking-widest">ماهیر</Link>
          <button onClick={logout} className="text-xs px-3 py-2 rounded-lg transition-all hover:text-red-400"
            style={{ color: "rgba(240,240,245,0.4)", border: "1px solid rgba(255,255,255,0.08)" }}>
            خروج
          </button>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 pt-28 pb-20">
        {/* Avatar */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-2xl mx-auto mb-4 flex items-center justify-center text-3xl font-extrabold"
            style={{ background: "rgba(0,229,160,0.12)", border: "1px solid rgba(0,229,160,0.3)", color: "#00E5A0" }}>
            {user.name.charAt(0)}
          </div>
          <h1 className="text-2xl font-extrabold mb-1">{user.name}</h1>
          <p className="text-sm font-mono" style={{ color: "rgba(240,240,245,0.4)" }} dir="ltr">{user.phone}</p>
        </div>

        {/* Tabs */}
        <div className="flex rounded-xl overflow-hidden mb-7" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
          {([["info", "اطلاعات من"], ["chat", `پیام‌ها${user.unread > 0 ? ` (${user.unread})` : ""}`]] as const).map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)}
              className="flex-1 py-3 text-sm font-bold transition-all"
              style={{ background: tab === key ? "#00E5A0" : "transparent", color: tab === key ? "#111" : "rgba(240,240,245,0.45)" }}>
              {label}
            </button>
          ))}
        </div>

        {/* Info Tab */}
        {tab === "info" && (
          <div className="flex flex-col gap-4">
            {[
              { label: "نام", value: user.name, icon: "👤" },
              { label: "شماره موبایل", value: user.phone, icon: "📱", ltr: true },
              { label: "تاریخ عضویت", value: formatDate(user.createdAt), icon: "📅" },
              { label: "تعداد مشاوره‌های دریافتی", value: `${user.consultCount} مشاوره`, icon: "💬" },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-4 rounded-2xl px-5 py-4"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <p className="text-xs mb-0.5" style={{ color: "rgba(240,240,245,0.4)" }}>{item.label}</p>
                  <p className="font-bold text-sm" dir={item.ltr ? "ltr" : "rtl"}>{item.value}</p>
                </div>
              </div>
            ))}

            <Link href="/consult"
              className="w-full text-center py-3.5 rounded-xl font-bold text-sm mt-2 transition-all hover:scale-105 block"
              style={{ background: "#00E5A0", color: "#111" }}>
              دریافت مشاوره جدید ←
            </Link>
          </div>
        )}

        {/* Chat Tab */}
        {tab === "chat" && (
          <div className="flex flex-col">
            <div className="rounded-2xl overflow-hidden mb-4" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="px-4 py-3 text-xs" style={{ background: "rgba(0,229,160,0.07)", borderBottom: "1px solid rgba(255,255,255,0.06)", color: "rgba(240,240,245,0.5)" }}>
                پیام‌های شما با تیم ماهیر
              </div>

              <div className="flex flex-col gap-3 p-4 min-h-[300px] max-h-[400px] overflow-y-auto">
                {messages.length === 0 ? (
                  <div className="flex-1 flex items-center justify-center py-12 text-center">
                    <div>
                      <div className="text-4xl mb-3">💬</div>
                      <p className="text-sm" style={{ color: "rgba(240,240,245,0.3)" }}>هنوز پیامی وجود ندارد</p>
                      <p className="text-xs mt-1" style={{ color: "rgba(240,240,245,0.2)" }}>سوال یا پیامی دارید؟ بنویسید!</p>
                    </div>
                  </div>
                ) : messages.map(msg => (
                  <div key={msg.id} className={`flex ${msg.from === "user" ? "justify-start" : "justify-end"}`}>
                    <div className="max-w-[75%] rounded-2xl px-4 py-2.5"
                      style={{
                        background: msg.from === "user" ? "rgba(255,255,255,0.07)" : "rgba(0,229,160,0.15)",
                        border: msg.from === "user" ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,229,160,0.25)",
                      }}>
                      <p className="text-xs font-bold mb-1" style={{ color: msg.from === "admin" ? "#00E5A0" : "rgba(240,240,245,0.5)" }}>
                        {msg.from === "admin" ? "تیم ماهیر" : "شما"}
                      </p>
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                      <p className="text-xs mt-1 text-right" style={{ color: "rgba(240,240,245,0.3)" }}>{formatTime(msg.createdAt)}</p>
                    </div>
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>
            </div>

            {/* Input */}
            <div className="flex gap-2">
              <input value={input} onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && sendMsg()}
                placeholder="پیام خود را بنویسید…"
                className="flex-1 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00E5A0]/50"
                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", color: "#f0f0f5" }} />
              <button onClick={sendMsg} disabled={sending || !input.trim()}
                className="px-5 rounded-xl font-bold text-sm transition-all hover:scale-105 disabled:opacity-40"
                style={{ background: "#00E5A0", color: "#111" }}>
                ارسال
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
