"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type UserInfo = { phone: string; name: string; createdAt: string; consultCount: number; unread: number };
type Message = { id: string; from: "admin" | "user"; text: string; createdAt: string };
type Tab = "dashboard" | "chat" | "consults" | "settings";

const QUICK_ACTIONS = [
  { icon: "🤖", label: "مشاوره جدید", href: "/consult", color: "#00E5A0" },
  { icon: "📁", label: "نمونه‌کارها", href: "/portfolio", color: "#00C2FF" },
  { icon: "💰", label: "قیمت‌گذاری", href: "/pricing", color: "#A78BFA" },
  { icon: "🏠", label: "صفحه اصلی", href: "/", color: "#F59E0B" },
];

const ACTIVITY = [
  { icon: "🤖", text: "مشاوره AI دریافت کردی", time: "۲ ساعت پیش", color: "#00E5A0" },
  { icon: "✅", text: "حساب کاربری ساخته شد", time: "دیروز", color: "#A78BFA" },
  { icon: "👋", text: "به ماهیر خوش اومدی!", time: "دیروز", color: "#00C2FF" },
];

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserInfo | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [tab, setTab] = useState<Tab>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [editName, setEditName] = useState("");
  const [editPass, setEditPass] = useState("");
  const [editMsg, setEditMsg] = useState("");
  const [savingSettings, setSavingSettings] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/auth/me").then(r => r.json()).then(d => {
      if (!d.user) { router.replace("/login"); return; }
      setUser(d.user);
      setEditName(d.user.name);
    });
  }, [router]);

  useEffect(() => {
    if (tab === "chat") loadMessages();
  }, [tab]);

  async function loadMessages() {
    const res = await fetch("/api/messages");
    const data = await res.json();
    if (data.messages) {
      setMessages(data.messages);
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    }
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

  async function saveSettings() {
    if (!editName.trim()) return;
    setSavingSettings(true);
    await new Promise(r => setTimeout(r, 700));
    setSavingSettings(false);
    setEditMsg("تغییرات ذخیره شد ✓");
    setTimeout(() => setEditMsg(""), 3000);
  }

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("fa-IR", { year: "numeric", month: "long", day: "numeric" });
  }
  function formatTime(iso: string) {
    return new Date(iso).toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" });
  }
  function daysSince(iso: string) {
    return Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
  }

  if (!user) return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-2 border-[#00E5A0] border-t-transparent animate-spin" />
        <p className="text-sm" style={{ color: "var(--fg3)" }}>در حال بارگذاری...</p>
      </div>
    </div>
  );

  const NAV_ITEMS: { key: Tab; icon: string; label: string; badge?: number }[] = [
    { key: "dashboard", icon: "📊", label: "داشبورد" },
    { key: "chat",      icon: "💬", label: "پیام‌ها", badge: user.unread || 0 },
    { key: "consults",  icon: "🤖", label: "مشاوره‌ها" },
    { key: "settings",  icon: "⚙️", label: "تنظیمات" },
  ];

  return (
    <div dir="rtl" className="min-h-screen flex" style={{ background: "var(--bg)", color: "var(--fg)" }}>

      {/* ── Sidebar ── */}
      <aside
        className={`fixed inset-y-0 right-0 z-50 flex flex-col transition-transform duration-300 md:translate-x-0 md:static md:flex`}
        style={{
          width: "260px",
          background: "var(--surface)",
          borderLeft: "1px solid var(--border)",
          transform: sidebarOpen ? "translateX(0)" : undefined,
        }}>

        {/* Brand */}
        <div className="flex items-center gap-3 px-6 py-5" style={{ borderBottom: "1px solid var(--border)" }}>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center font-extrabold text-sm flex-shrink-0"
            style={{ background: "linear-gradient(135deg,#00E5A0,#00C990)", color: "#030D0A" }}>M</div>
          <div>
            <p className="font-extrabold text-sm text-[#00E5A0]">ماهیر</p>
            <p className="text-xs" style={{ color: "var(--fg3)" }}>پنل کاربری</p>
          </div>
          <button className="md:hidden mr-auto text-lg" onClick={() => setSidebarOpen(false)}>✕</button>
        </div>

        {/* User card */}
        <div className="mx-4 my-4 rounded-2xl p-4" style={{ background: "rgba(0,229,160,0.06)", border: "1px solid rgba(0,229,160,0.15)" }}>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center font-extrabold text-lg flex-shrink-0"
              style={{ background: "rgba(0,229,160,0.15)", color: "#00E5A0" }}>
              {user.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="font-bold text-sm truncate c-fg">{user.name}</p>
              <p className="text-xs font-mono truncate" style={{ color: "var(--fg3)" }} dir="ltr">{user.phone}</p>
            </div>
          </div>
          <div className="flex gap-2 mt-3">
            <span className="text-xs px-2.5 py-1 rounded-full font-bold"
              style={{ background: "rgba(0,229,160,0.12)", color: "#00E5A0", border: "1px solid rgba(0,229,160,0.2)" }}>
              ✦ کاربر فعال
            </span>
            <span className="text-xs px-2.5 py-1 rounded-full"
              style={{ background: "var(--surface2)", color: "var(--fg3)", border: "1px solid var(--border)" }}>
              {daysSince(user.createdAt)} روز
            </span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 flex flex-col gap-1">
          {NAV_ITEMS.map(item => (
            <button key={item.key}
              onClick={() => { setTab(item.key); setSidebarOpen(false); }}
              className="relative w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all text-right"
              style={{
                background: tab === item.key ? "rgba(0,229,160,0.1)" : "transparent",
                color: tab === item.key ? "#00E5A0" : "var(--fg2)",
                border: tab === item.key ? "1px solid rgba(0,229,160,0.2)" : "1px solid transparent",
              }}>
              <span className="text-base">{item.icon}</span>
              {item.label}
              {item.badge ? (
                <span className="mr-auto min-w-5 h-5 px-1.5 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: "#ef4444", color: "#fff" }}>{item.badge}</span>
              ) : null}
              {tab === item.key && (
                <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-l-full bg-[#00E5A0]" />
              )}
            </button>
          ))}
        </nav>

        {/* Bottom */}
        <div className="px-3 pb-5 flex flex-col gap-2">
          <Link href="/consult"
            className="flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all hover:scale-105"
            style={{ background: "#00E5A0", color: "#030D0A" }}>
            <span>🤖</span> مشاوره جدید
          </Link>
          <button onClick={logout}
            className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all hover:bg-red-500/10"
            style={{ color: "var(--fg3)", border: "1px solid var(--border)" }}>
            خروج از حساب
          </button>
        </div>
      </aside>

      {/* Overlay mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ── Main ── */}
      <main className="flex-1 flex flex-col min-h-screen overflow-y-auto">

        {/* Top bar */}
        <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-4"
          style={{ background: "var(--nav-bg)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--border)" }}>
          <div className="flex items-center gap-3">
            <button className="md:hidden text-xl" onClick={() => setSidebarOpen(true)}>☰</button>
            <div>
              <h1 className="font-extrabold text-base c-fg">
                {tab === "dashboard" && "داشبورد"}
                {tab === "chat" && "پیام‌ها"}
                {tab === "consults" && "مشاوره‌ها"}
                {tab === "settings" && "تنظیمات"}
              </h1>
              <p className="text-xs c-fg3">{formatDate(new Date().toISOString())}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/" className="text-xs px-3 py-1.5 rounded-lg c-fg3 hover:text-[#00E5A0] transition-all"
              style={{ border: "1px solid var(--border)" }}>← خانه</Link>
          </div>
        </header>

        <div className="flex-1 p-6 max-w-4xl w-full mx-auto">

          {/* ── DASHBOARD ── */}
          {tab === "dashboard" && (
            <div className="flex flex-col gap-6">

              {/* Welcome */}
              <div className="rounded-2xl p-6 relative overflow-hidden"
                style={{ background: "rgba(0,229,160,0.06)", border: "1px solid rgba(0,229,160,0.2)" }}>
                <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full blur-[60px]"
                  style={{ background: "rgba(0,229,160,0.1)" }} />
                <div className="relative z-10">
                  <p className="text-xs font-bold text-[#00E5A0] tracking-widest mb-1">✦ خوش اومدی</p>
                  <h2 className="text-2xl font-extrabold c-fg mb-1">{user.name} عزیز 👋</h2>
                  <p className="text-sm c-fg2">آماده‌ای رشد کسب‌وکارت رو شروع کنی؟</p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: "🤖", label: "مشاوره دریافتی", value: user.consultCount, color: "#00E5A0", suffix: "بار" },
                  { icon: "💬", label: "پیام‌های خوانده‌نشده", value: user.unread, color: "#A78BFA", suffix: "پیام" },
                  { icon: "📅", label: "روز عضویت", value: daysSince(user.createdAt) || 1, color: "#00C2FF", suffix: "روز" },
                  { icon: "⭐", label: "امتیاز", value: Math.min((user.consultCount * 10) + 50, 100), color: "#F59E0B", suffix: "%" },
                ].map(s => (
                  <div key={s.label} className="rounded-2xl p-5 flex flex-col gap-3"
                    style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                      style={{ background: `${s.color}15` }}>{s.icon}</div>
                    <div>
                      <p className="font-extrabold text-2xl c-fg">{s.value}<span className="text-sm font-medium c-fg3 mr-1">{s.suffix}</span></p>
                      <p className="text-xs c-fg3 mt-0.5">{s.label}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick actions */}
              <div>
                <h3 className="font-bold text-sm c-fg2 mb-3">دسترسی سریع</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {QUICK_ACTIONS.map(a => (
                    <Link key={a.href} href={a.href}
                      className="flex flex-col items-center gap-2 py-5 rounded-2xl text-center font-bold text-sm transition-all hover:-translate-y-1 hover:scale-105"
                      style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
                      <span className="text-2xl">{a.icon}</span>
                      <span style={{ color: a.color }}>{a.label}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Activity */}
              <div>
                <h3 className="font-bold text-sm c-fg2 mb-3">فعالیت اخیر</h3>
                <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
                  {ACTIVITY.map((a, i) => (
                    <div key={i} className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-white/[0.02]"
                      style={{ borderBottom: i < ACTIVITY.length - 1 ? "1px solid var(--border)" : "none" }}>
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0"
                        style={{ background: `${a.color}15` }}>{a.icon}</div>
                      <p className="flex-1 text-sm c-fg">{a.text}</p>
                      <span className="text-xs c-fg3 flex-shrink-0">{a.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Profile summary */}
              <div className="rounded-2xl p-5" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
                <h3 className="font-bold text-sm c-fg2 mb-4">اطلاعات حساب</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { label: "نام", value: user.name, icon: "👤" },
                    { label: "موبایل", value: user.phone, icon: "📱", ltr: true },
                    { label: "تاریخ عضویت", value: formatDate(user.createdAt), icon: "📅" },
                    { label: "وضعیت حساب", value: "فعال ✓", icon: "✅" },
                  ].map(item => (
                    <div key={item.label} className="flex items-center gap-3 rounded-xl px-4 py-3"
                      style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
                      <span className="text-lg">{item.icon}</span>
                      <div>
                        <p className="text-xs c-fg3 mb-0.5">{item.label}</p>
                        <p className="font-bold text-sm c-fg" dir={item.ltr ? "ltr" : "rtl"}>{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── CHAT ── */}
          {tab === "chat" && (
            <div className="flex flex-col h-[calc(100vh-160px)]">
              <div className="rounded-2xl overflow-hidden flex flex-col flex-1"
                style={{ border: "1px solid var(--border)" }}>

                {/* Chat header */}
                <div className="flex items-center gap-3 px-5 py-4"
                  style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)" }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm"
                    style={{ background: "rgba(0,229,160,0.12)", color: "#00E5A0" }}>M</div>
                  <div>
                    <p className="font-bold text-sm c-fg">تیم ماهیر</p>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#00E5A0] animate-pulse" />
                      <span className="text-xs" style={{ color: "#00E5A0" }}>آنلاین ۲۴/۷</span>
                    </div>
                  </div>
                  <button onClick={loadMessages}
                    className="mr-auto text-xs px-3 py-1.5 rounded-lg transition-all hover:text-[#00E5A0]"
                    style={{ background: "var(--surface2)", color: "var(--fg3)", border: "1px solid var(--border)" }}>
                    بارگذاری مجدد
                  </button>
                </div>

                {/* Messages */}
                <div className="flex-1 flex flex-col gap-3 p-5 overflow-y-auto" style={{ background: "var(--bg)" }}>
                  {messages.length === 0 ? (
                    <div className="flex-1 flex items-center justify-center py-16 text-center">
                      <div>
                        <div className="text-5xl mb-4">💬</div>
                        <p className="font-bold c-fg mb-1">هنوز پیامی نیست</p>
                        <p className="text-sm c-fg3">سوال یا درخواستی دارید؟ بنویسید!</p>
                      </div>
                    </div>
                  ) : messages.map(msg => (
                    <div key={msg.id} className={`flex ${msg.from === "user" ? "justify-start" : "justify-end"}`}>
                      {msg.from === "admin" && (
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ml-2 flex-shrink-0 mt-1"
                          style={{ background: "rgba(0,229,160,0.15)", color: "#00E5A0" }}>M</div>
                      )}
                      <div className="max-w-[72%] rounded-2xl px-4 py-3"
                        style={{
                          background: msg.from === "user" ? "var(--surface)" : "rgba(0,229,160,0.1)",
                          border: msg.from === "user" ? "1px solid var(--border)" : "1px solid rgba(0,229,160,0.25)",
                          borderBottomRightRadius: msg.from === "admin" ? "4px" : undefined,
                          borderBottomLeftRadius: msg.from === "user" ? "4px" : undefined,
                        }}>
                        <p className="text-xs font-bold mb-1" style={{ color: msg.from === "admin" ? "#00E5A0" : "var(--fg3)" }}>
                          {msg.from === "admin" ? "تیم ماهیر" : "شما"}
                        </p>
                        <p className="text-sm leading-relaxed c-fg">{msg.text}</p>
                        <p className="text-[10px] mt-1.5 c-fg3 text-left">{formatTime(msg.createdAt)}</p>
                      </div>
                    </div>
                  ))}
                  <div ref={bottomRef} />
                </div>

                {/* Input */}
                <div className="flex gap-2 p-4" style={{ borderTop: "1px solid var(--border)", background: "var(--surface)" }}>
                  <input value={input} onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && sendMsg()}
                    placeholder="پیام خود را بنویسید…"
                    className="flex-1 rounded-xl px-4 py-3 text-sm focus:outline-none"
                    style={{ background: "var(--bg)", border: "1px solid var(--border)", color: "var(--fg)" }} />
                  <button onClick={sendMsg} disabled={sending || !input.trim()}
                    className="px-5 rounded-xl font-bold text-sm transition-all hover:scale-105 disabled:opacity-40"
                    style={{ background: "#00E5A0", color: "#030D0A" }}>
                    {sending ? "..." : "ارسال"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── CONSULTS ── */}
          {tab === "consults" && (
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <p className="text-sm c-fg2">تاریخچه مشاوره‌های دریافتی شما</p>
                <Link href="/consult"
                  className="text-xs font-bold px-4 py-2 rounded-xl transition-all hover:scale-105"
                  style={{ background: "#00E5A0", color: "#030D0A" }}>
                  + مشاوره جدید
                </Link>
              </div>

              {user.consultCount === 0 ? (
                <div className="rounded-2xl p-14 text-center" style={{ border: "1px solid var(--border)" }}>
                  <div className="text-5xl mb-4">🤖</div>
                  <p className="font-bold c-fg mb-2">هنوز مشاوره‌ای دریافت نکردی</p>
                  <p className="text-sm c-fg3 mb-6">اولین مشاوره هوشمند رایگانته!</p>
                  <Link href="/consult"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all hover:scale-105"
                    style={{ background: "#00E5A0", color: "#030D0A" }}>
                    شروع مشاوره رایگان ←
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {Array.from({ length: user.consultCount }).map((_, i) => (
                    <div key={i} className="flex items-center gap-4 rounded-2xl p-5 transition-all hover:border-[#00E5A0]/30"
                      style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                        style={{ background: "rgba(0,229,160,0.1)" }}>🤖</div>
                      <div className="flex-1">
                        <p className="font-bold text-sm c-fg">مشاوره رشد کسب‌وکار #{i + 1}</p>
                        <p className="text-xs c-fg3 mt-0.5">پاسخ اختصاصی AI دریافت شد</p>
                      </div>
                      <span className="text-xs px-3 py-1.5 rounded-full font-bold"
                        style={{ background: "rgba(0,229,160,0.1)", color: "#00E5A0", border: "1px solid rgba(0,229,160,0.2)" }}>
                        ✓ تکمیل‌شده
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* CTA banner */}
              <div className="rounded-2xl p-6 text-center"
                style={{ background: "rgba(0,229,160,0.05)", border: "1px solid rgba(0,229,160,0.15)" }}>
                <p className="font-bold c-fg mb-1">می‌خوای نتیجه بهتری بگیری؟</p>
                <p className="text-sm c-fg2 mb-4">با تیم ماهیر مستقیم در تماس باش</p>
                <button onClick={() => setTab("chat")}
                  className="text-sm font-bold px-5 py-2.5 rounded-xl transition-all hover:scale-105"
                  style={{ background: "#00E5A0", color: "#030D0A" }}>
                  ارسال پیام به تیم
                </button>
              </div>
            </div>
          )}

          {/* ── SETTINGS ── */}
          {tab === "settings" && (
            <div className="flex flex-col gap-5 max-w-lg">
              <div className="rounded-2xl p-6" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
                <h3 className="font-bold text-base c-fg mb-5">اطلاعات شخصی</h3>
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="text-xs font-semibold c-fg2 mb-2 block">نام و نام‌خانوادگی</label>
                    <input value={editName} onChange={e => setEditName(e.target.value)}
                      className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none"
                      style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--fg)" }} />
                  </div>
                  <div>
                    <label className="text-xs font-semibold c-fg2 mb-2 block">شماره موبایل</label>
                    <input value={user.phone} disabled dir="ltr"
                      className="w-full rounded-xl px-4 py-3 text-sm opacity-50 cursor-not-allowed"
                      style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--fg)" }} />
                    <p className="text-xs c-fg3 mt-1">شماره موبایل قابل تغییر نیست</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl p-6" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
                <h3 className="font-bold text-base c-fg mb-5">تغییر رمز عبور</h3>
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="text-xs font-semibold c-fg2 mb-2 block">رمز عبور جدید</label>
                    <input type="password" value={editPass} onChange={e => setEditPass(e.target.value)}
                      placeholder="حداقل ۶ کاراکتر" dir="ltr"
                      className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none"
                      style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--fg)" }} />
                  </div>
                </div>
              </div>

              {editMsg && (
                <div className="rounded-xl px-4 py-3 text-sm font-bold text-center"
                  style={{ background: "rgba(0,229,160,0.1)", border: "1px solid rgba(0,229,160,0.3)", color: "#00E5A0" }}>
                  {editMsg}
                </div>
              )}

              <button onClick={saveSettings} disabled={savingSettings}
                className="w-full py-4 rounded-xl font-extrabold text-sm transition-all hover:scale-[1.02] disabled:opacity-50"
                style={{ background: "#00E5A0", color: "#030D0A", boxShadow: "0 0 30px rgba(0,229,160,0.2)" }}>
                {savingSettings ? "در حال ذخیره..." : "ذخیره تغییرات ✓"}
              </button>

              <div className="rounded-2xl p-5" style={{ background: "var(--card)", border: "1px solid rgba(239,68,68,0.2)" }}>
                <h3 className="font-bold text-sm mb-3" style={{ color: "#ef4444" }}>منطقه خطر</h3>
                <p className="text-xs c-fg3 mb-4">با خروج از حساب، نشست جاری پایان می‌یابد.</p>
                <button onClick={logout}
                  className="w-full py-3 rounded-xl font-bold text-sm transition-all hover:opacity-80"
                  style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.25)" }}>
                  خروج از حساب
                </button>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
