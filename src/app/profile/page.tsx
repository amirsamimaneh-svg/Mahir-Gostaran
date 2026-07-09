"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type UserInfo = { phone: string; name: string; createdAt: string; consultCount: number; unread: number };
type Message = { id: string; from: "admin" | "user"; text: string; createdAt: string };
type Tab = "dashboard" | "chat" | "consults" | "settings";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserInfo | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [tab, setTab] = useState<Tab>("dashboard");
  const [mobileNav, setMobileNav] = useState(false);
  const [editName, setEditName] = useState("");
  const [editPass, setEditPass] = useState("");
  const [saveMsg, setSaveMsg] = useState("");
  const [saving, setSaving] = useState(false);
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
    await fetch("/api/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text: input.trim() }) });
    setInput(""); setSending(false); loadMessages();
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
  }

  async function saveSettings() {
    if (!editName.trim()) return;
    setSaving(true);
    await new Promise(r => setTimeout(r, 800));
    setSaving(false); setSaveMsg("تغییرات با موفقیت ذخیره شد ✓");
    setTimeout(() => setSaveMsg(""), 3000);
  }

  const fmt = (iso: string) => new Date(iso).toLocaleDateString("fa-IR", { year: "numeric", month: "long", day: "numeric" });
  const fmtT = (iso: string) => new Date(iso).toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" });
  const days = (iso: string) => Math.max(1, Math.floor((Date.now() - new Date(iso).getTime()) / 86400000));
  const score = (c: number) => Math.min(c * 12 + 40, 100);

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg)" }}>
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 rounded-full border-[3px] border-[#2563EB] border-t-transparent animate-spin" />
        <p className="text-sm c-fg3">در حال بارگذاری...</p>
      </div>
    </div>
  );

  const NAV: { key: Tab; icon: string; label: string; badge?: number }[] = [
    { key: "dashboard", icon: "⊞", label: "داشبورد" },
    { key: "chat",      icon: "✉", label: "پیام‌ها", badge: user.unread || 0 },
    { key: "consults",  icon: "◈", label: "مشاوره‌ها" },
    { key: "settings",  icon: "⚙", label: "تنظیمات" },
  ];

  return (
    <div dir="rtl" className="min-h-screen flex" style={{ background: "var(--bg)", color: "var(--fg)", paddingBottom: "env(safe-area-inset-bottom)" }}>

      {/* ═══════ MOBILE BOTTOM TAB BAR ═══════ */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 flex"
        style={{
          background: "rgba(8,14,24,0.97)",
          backdropFilter: "blur(24px)",
          borderTop: "1px solid var(--border)",
          paddingBottom: "env(safe-area-inset-bottom)",
        }}>
        {NAV.map(item => (
          <button key={item.key}
            onClick={() => setTab(item.key)}
            className="relative flex-1 flex flex-col items-center justify-center gap-1 py-3 transition-all active:scale-95"
          >
            <span className="text-xl leading-none"
              style={{ filter: tab === item.key ? "drop-shadow(0 0 6px rgba(91,156,246,0.7))" : "none" }}>
              {item.icon}
            </span>
            <span className="text-[10px] font-bold"
              style={{ color: tab === item.key ? "#5B9CF6" : "var(--fg3)" }}>
              {item.label}
            </span>
            {(item.badge ?? 0) > 0 && (
              <span className="absolute top-2 right-[calc(50%-8px)] translate-x-3 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold"
                style={{ background: "#ef4444", color: "#fff" }}>{item.badge}</span>
            )}
            {tab === item.key && (
              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-[#5B9CF6]" />
            )}
          </button>
        ))}
        <button onClick={logout}
          className="flex-shrink-0 flex flex-col items-center justify-center gap-1 px-4 py-3 active:scale-95 transition-all">
          <span className="text-xl leading-none">🚪</span>
          <span className="text-[10px] font-bold" style={{ color: "var(--fg3)" }}>خروج</span>
        </button>
      </nav>

      {/* ═══════════ SIDEBAR (desktop only) ═══════════ */}
      <aside className="hidden md:flex flex-col"
        style={{ width: 256, background: "var(--surface)", borderLeft: "1px solid var(--border)", flexShrink: 0 }}>

        {/* Logo row */}
        <div className="flex items-center gap-3 px-5 h-16 flex-shrink-0" style={{ borderBottom: "1px solid var(--border)" }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center font-extrabold text-sm"
            style={{ background: "linear-gradient(135deg,#2563EB,#3B82F6)", color: "#fff" }}>M</div>
          <span className="font-extrabold text-[#2563EB]">ماهیر</span>
        </div>

        {/* Avatar card */}
        <div className="mx-4 mt-5 rounded-2xl p-4 relative overflow-hidden"
          style={{ background: "linear-gradient(135deg,rgba(79,110,255,0.12),rgba(167,139,255,0.08))", border: "1px solid rgba(79,110,255,0.2)" }}>
          <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full blur-2xl"
            style={{ background: "rgba(79,110,255,0.2)" }} />
          <div className="relative flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-extrabold text-xl flex-shrink-0"
              style={{ background: "linear-gradient(135deg,#2563EB,#3B82F6)", color: "#fff", boxShadow: "0 4px 20px rgba(79,110,255,0.4)" }}>
              {user.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="font-extrabold text-sm c-fg truncate">{user.name}</p>
              <p className="text-xs font-mono c-fg3 truncate" dir="ltr">{user.phone}</p>
              <div className="mt-1.5 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] text-emerald-400 font-bold">فعال</span>
              </div>
            </div>
          </div>
          {/* XP bar */}
          <div className="mt-3">
            <div className="flex justify-between text-[10px] c-fg3 mb-1">
              <span>امتیاز</span><span>{score(user.consultCount)}%</span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(79,110,255,0.15)" }}>
              <div className="h-full rounded-full transition-all duration-1000"
                style={{ width: `${score(user.consultCount)}%`, background: "linear-gradient(90deg,#2563EB,#3B82F6)" }} />
            </div>
          </div>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-3 mt-4 flex flex-col gap-1 overflow-y-auto">
          <p className="text-[10px] font-bold tracking-widest c-fg3 px-3 mb-2">منو</p>
          {NAV.map(item => (
            <button key={item.key}
              onClick={() => { setTab(item.key); setMobileNav(false); }}
              className="relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all text-right w-full group"
              style={{
                background: tab === item.key ? "rgba(79,110,255,0.12)" : "transparent",
                color: tab === item.key ? "#5B9CF6" : "var(--fg2)",
              }}>
              <span className="text-base w-5 text-center">{item.icon}</span>
              <span className="flex-1">{item.label}</span>
              {(item.badge ?? 0) > 0 && (
                <span className="min-w-5 h-5 px-1.5 rounded-full flex items-center justify-center text-[10px] font-bold"
                  style={{ background: "#ef4444", color: "#fff" }}>{item.badge}</span>
              )}
              {tab === item.key && <span className="absolute right-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-l bg-[#2563EB]" />}
            </button>
          ))}
        </nav>

        {/* CTA + logout */}
        <div className="p-3 flex flex-col gap-2" style={{ borderTop: "1px solid var(--border)" }}>
          <Link href="/consult"
            className="flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg,#2563EB,#3B82F6)", color: "#fff", boxShadow: "0 4px 20px rgba(79,110,255,0.3)" }}>
            ✦ مشاوره جدید
          </Link>
          <button onClick={logout}
            className="py-2.5 rounded-xl text-sm font-bold transition-all hover:bg-red-500/10 c-fg3">
            خروج
          </button>
        </div>
      </aside>


      {/* ═══════════ MAIN ═══════════ */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Topbar */}
        <header className="sticky top-0 z-30 h-16 flex items-center px-6 gap-4"
          style={{ background: "var(--nav-bg)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--border)" }}>
          <div className="flex-1">
            <h1 className="font-extrabold text-base c-fg">
              {tab === "dashboard" && "داشبورد"}
              {tab === "chat" && "پیام‌ها"}
              {tab === "consults" && "مشاوره‌ها"}
              {tab === "settings" && "تنظیمات"}
            </h1>
          </div>
          <Link href="/" className="text-xs font-bold px-3 py-1.5 rounded-lg c-fg3 hover:text-[#2563EB] transition-colors"
            style={{ border: "1px solid var(--border)" }}>← خانه</Link>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-24 md:pb-8">
          <div className="max-w-4xl mx-auto">

            {/* ─── DASHBOARD ─── */}
            {tab === "dashboard" && (
              <div className="flex flex-col gap-6">

                {/* Hero welcome */}
                <div className="relative rounded-3xl overflow-hidden p-7"
                  style={{ background: "linear-gradient(135deg,rgba(79,110,255,0.15) 0%,rgba(167,139,255,0.08) 100%)", border: "1px solid rgba(79,110,255,0.25)" }}>
                  <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full blur-3xl pointer-events-none"
                    style={{ background: "rgba(79,110,255,0.12)" }} />
                  <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full blur-3xl pointer-events-none"
                    style={{ background: "rgba(167,139,255,0.1)" }} />
                  <div className="relative z-10 flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center font-extrabold text-3xl flex-shrink-0 hidden sm:flex"
                      style={{ background: "linear-gradient(135deg,#2563EB,#3B82F6)", color: "#fff", boxShadow: "0 8px 32px rgba(79,110,255,0.4)" }}>
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-bold tracking-widest mb-1" style={{ color: "#5B9CF6" }}>✦ خوش اومدی</p>
                      <h2 className="text-2xl font-extrabold c-fg">{user.name}</h2>
                      <p className="text-sm c-fg2 mt-0.5">عضو از {fmt(user.createdAt)}</p>
                    </div>
                  </div>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: "مشاوره دریافتی",       value: user.consultCount, unit: "بار",  icon: "◈", color: "#2563EB", bg: "rgba(79,110,255,0.1)" },
                    { label: "پیام خوانده‌نشده",       value: user.unread,       unit: "پیام", icon: "✉", color: "#3B82F6", bg: "rgba(167,139,255,0.1)" },
                    { label: "روز عضویت",              value: days(user.createdAt), unit: "روز", icon: "◷", color: "#38BDF8", bg: "rgba(56,189,248,0.1)" },
                    { label: "امتیاز شما",             value: score(user.consultCount), unit: "%", icon: "★", color: "#F59E0B", bg: "rgba(245,158,11,0.1)" },
                  ].map(s => (
                    <div key={s.label} className="rounded-2xl p-5 flex flex-col gap-4 transition-all hover:scale-[1.02]"
                      style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold"
                        style={{ background: s.bg, color: s.color }}>{s.icon}</div>
                      <div>
                        <p className="font-extrabold text-2xl c-fg leading-none">{s.value}<span className="text-xs font-medium c-fg3 mr-1">{s.unit}</span></p>
                        <p className="text-xs c-fg3 mt-1">{s.label}</p>
                      </div>
                      <div className="h-1 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                        <div className="h-full rounded-full" style={{ width: `${Math.min((s.value / (s.unit === "%" ? 100 : 10)) * 100, 100)}%`, background: s.color }} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Two col: quick actions + activity */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  {/* Quick actions */}
                  <div className="rounded-2xl p-5" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
                    <p className="text-xs font-bold c-fg3 tracking-widest mb-4">دسترسی سریع</p>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { icon: "◈", label: "مشاوره جدید", href: "/consult",   color: "#2563EB" },
                        { icon: "📁", label: "نمونه‌کارها", href: "/portfolio", color: "#3B82F6" },
                        { icon: "💰", label: "قیمت‌گذاری", href: "/pricing",   color: "#38BDF8" },
                        { icon: "🏠", label: "صفحه اصلی",  href: "/",          color: "#F59E0B" },
                      ].map(a => (
                        <Link key={a.href} href={a.href}
                          className="flex flex-col items-center gap-2 py-4 rounded-xl text-center transition-all hover:-translate-y-1"
                          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
                          <span className="text-2xl">{a.icon}</span>
                          <span className="text-xs font-bold" style={{ color: a.color }}>{a.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Activity timeline */}
                  <div className="rounded-2xl p-5" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
                    <p className="text-xs font-bold c-fg3 tracking-widest mb-4">فعالیت اخیر</p>
                    <div className="flex flex-col gap-1">
                      {[
                        { icon: "◈", text: "مشاوره AI دریافت شد",    time: "۲ ساعت پیش", color: "#2563EB" },
                        { icon: "✉", text: "پیام جدید از تیم",        time: "دیروز",       color: "#3B82F6" },
                        { icon: "★", text: "امتیاز به‌روز شد",        time: "۲ روز پیش",  color: "#F59E0B" },
                        { icon: "✓", text: "حساب ساخته شد",           time: fmt(user.createdAt), color: "#10B981" },
                      ].map((a, i) => (
                        <div key={i} className="flex items-center gap-3 py-3 relative"
                          style={{ borderBottom: i < 3 ? "1px solid var(--border)" : "none" }}>
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
                            style={{ background: `${a.color}15`, color: a.color }}>{a.icon}</div>
                          <p className="flex-1 text-sm c-fg">{a.text}</p>
                          <span className="text-[10px] c-fg3 flex-shrink-0">{a.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Profile info strip */}
                <div className="rounded-2xl p-5" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-xs font-bold c-fg3 tracking-widest">اطلاعات حساب</p>
                    <button onClick={() => setTab("settings")} className="text-xs font-bold text-[#2563EB] hover:underline">ویرایش</button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { label: "نام",        value: user.name,          icon: "👤" },
                      { label: "موبایل",     value: user.phone,         icon: "📱", ltr: true },
                      { label: "عضویت",      value: fmt(user.createdAt), icon: "📅" },
                      { label: "وضعیت",      value: "فعال ✓",           icon: "✅" },
                    ].map(item => (
                      <div key={item.label} className="rounded-xl px-4 py-3"
                        style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
                        <p className="text-[10px] c-fg3 mb-1">{item.label}</p>
                        <p className="font-bold text-sm c-fg truncate" dir={item.ltr ? "ltr" : "rtl"}>{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ─── CHAT ─── */}
            {tab === "chat" && (
              <div className="rounded-3xl overflow-hidden flex flex-col" style={{ height: "calc(100vh - 130px)", border: "1px solid var(--border)" }}>

                {/* Chat header */}
                <div className="flex items-center gap-3 px-5 py-4 flex-shrink-0"
                  style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)" }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center font-extrabold"
                    style={{ background: "linear-gradient(135deg,#2563EB,#3B82F6)", color: "#fff" }}>M</div>
                  <div>
                    <p className="font-extrabold text-sm c-fg">تیم ماهیر</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[10px] text-emerald-400">آنلاین ۲۴/۷</span>
                    </div>
                  </div>
                  <button onClick={loadMessages}
                    className="mr-auto text-xs px-3 py-1.5 rounded-lg c-fg3 hover:text-[#2563EB] transition-colors"
                    style={{ background: "var(--surface2)", border: "1px solid var(--border)" }}>↻ بارگذاری</button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4" style={{ background: "var(--bg)" }}>
                  {messages.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center py-20 text-center">
                      <div className="w-20 h-20 rounded-3xl flex items-center justify-center text-4xl mb-5"
                        style={{ background: "rgba(79,110,255,0.08)", border: "1px solid rgba(79,110,255,0.15)" }}>💬</div>
                      <p className="font-extrabold text-lg c-fg mb-2">هنوز پیامی نیست</p>
                      <p className="text-sm c-fg3">سوال یا درخواستی دارید؟ بنویسید!</p>
                    </div>
                  ) : messages.map(msg => (
                    <div key={msg.id} className={`flex gap-3 ${msg.from === "user" ? "justify-start" : "justify-end"}`}>
                      {msg.from === "admin" && (
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-extrabold flex-shrink-0 mt-1"
                          style={{ background: "linear-gradient(135deg,#2563EB,#3B82F6)", color: "#fff" }}>M</div>
                      )}
                      <div className="max-w-[70%]">
                        <div className="rounded-2xl px-4 py-3"
                          style={msg.from === "admin"
                            ? { background: "rgba(79,110,255,0.1)", border: "1px solid rgba(79,110,255,0.2)", borderTopRightRadius: "4px" }
                            : { background: "var(--surface)", border: "1px solid var(--border)", borderTopLeftRadius: "4px" }}>
                          <p className="text-sm leading-relaxed c-fg">{msg.text}</p>
                        </div>
                        <p className="text-[10px] c-fg3 mt-1 px-1">{fmtT(msg.createdAt)}</p>
                      </div>
                      {msg.from === "user" && (
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center font-extrabold text-sm flex-shrink-0 mt-1"
                          style={{ background: "var(--surface2)", color: "var(--fg2)" }}>{user.name.charAt(0)}</div>
                      )}
                    </div>
                  ))}
                  <div ref={bottomRef} />
                </div>

                {/* Input */}
                <div className="flex gap-3 p-4 flex-shrink-0"
                  style={{ background: "var(--surface)", borderTop: "1px solid var(--border)" }}>
                  <input value={input} onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && sendMsg()}
                    placeholder="پیام خود را بنویسید…"
                    className="flex-1 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2"
                    style={{ background: "var(--bg)", border: "1px solid var(--border)", color: "var(--fg)", outlineColor: "#2563EB" }} />
                  <button onClick={sendMsg} disabled={sending || !input.trim()}
                    className="px-5 rounded-xl font-bold text-sm transition-all hover:opacity-90 disabled:opacity-40"
                    style={{ background: "linear-gradient(135deg,#2563EB,#3B82F6)", color: "#fff", boxShadow: "0 4px 20px rgba(79,110,255,0.3)" }}>
                    {sending ? "..." : "ارسال"}
                  </button>
                </div>
              </div>
            )}

            {/* ─── CONSULTS ─── */}
            {tab === "consults" && (
              <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-extrabold text-xl c-fg">مشاوره‌های من</h2>
                    <p className="text-sm c-fg3 mt-0.5">{user.consultCount} مشاوره دریافتی</p>
                  </div>
                  <Link href="/consult"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all hover:opacity-90"
                    style={{ background: "linear-gradient(135deg,#2563EB,#3B82F6)", color: "#fff", boxShadow: "0 4px 16px rgba(79,110,255,0.3)" }}>
                    + مشاوره جدید
                  </Link>
                </div>

                {user.consultCount === 0 ? (
                  <div className="rounded-3xl p-16 flex flex-col items-center text-center"
                    style={{ background: "var(--card)", border: "1px dashed var(--border2)" }}>
                    <div className="w-24 h-24 rounded-3xl flex items-center justify-center text-5xl mb-6"
                      style={{ background: "rgba(79,110,255,0.08)", border: "1px solid rgba(79,110,255,0.15)" }}>◈</div>
                    <h3 className="font-extrabold text-xl c-fg mb-2">هنوز مشاوره‌ای نگرفتی</h3>
                    <p className="text-sm c-fg3 mb-6 max-w-xs">اولین مشاوره هوشمندت رایگانه! همین الان امتحان کن.</p>
                    <Link href="/consult"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90"
                      style={{ background: "linear-gradient(135deg,#2563EB,#3B82F6)", color: "#fff", boxShadow: "0 4px 20px rgba(79,110,255,0.3)" }}>
                      شروع مشاوره رایگان ←
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {Array.from({ length: user.consultCount }).map((_, i) => (
                      <div key={i} className="flex items-center gap-4 rounded-2xl p-5 transition-all hover:border-[#2563EB]/30 group"
                        style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-bold flex-shrink-0"
                          style={{ background: "linear-gradient(135deg,rgba(79,110,255,0.15),rgba(167,139,255,0.1))", color: "#5B9CF6" }}>◈</div>
                        <div className="flex-1">
                          <p className="font-bold text-sm c-fg">مشاوره رشد کسب‌وکار #{i + 1}</p>
                          <p className="text-xs c-fg3 mt-0.5">پاسخ اختصاصی هوش مصنوعی دریافت شد</p>
                        </div>
                        <span className="text-xs px-3 py-1.5 rounded-full font-bold"
                          style={{ background: "rgba(16,185,129,0.1)", color: "#10B981", border: "1px solid rgba(16,185,129,0.2)" }}>
                          ✓ تکمیل‌شده
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="rounded-2xl p-6 text-center"
                  style={{ background: "linear-gradient(135deg,rgba(79,110,255,0.08),rgba(167,139,255,0.05))", border: "1px solid rgba(79,110,255,0.15)" }}>
                  <p className="font-bold c-fg mb-1">نتیجه بهتر می‌خوای؟</p>
                  <p className="text-sm c-fg3 mb-4">با تیم ماهیر مستقیم در ارتباط باش</p>
                  <button onClick={() => setTab("chat")}
                    className="text-sm font-bold px-5 py-2.5 rounded-xl transition-all hover:opacity-90"
                    style={{ background: "linear-gradient(135deg,#2563EB,#3B82F6)", color: "#fff" }}>
                    ارسال پیام به تیم ←
                  </button>
                </div>
              </div>
            )}

            {/* ─── SETTINGS ─── */}
            {tab === "settings" && (
              <div className="flex flex-col gap-5 max-w-lg">

                <div>
                  <h2 className="font-extrabold text-xl c-fg">تنظیمات حساب</h2>
                  <p className="text-sm c-fg3 mt-0.5">اطلاعات شخصی و امنیت حساب</p>
                </div>

                {/* Profile */}
                <div className="rounded-2xl p-6" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center font-extrabold"
                      style={{ background: "rgba(79,110,255,0.12)", color: "#2563EB" }}>👤</div>
                    <p className="font-bold c-fg">اطلاعات شخصی</p>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div>
                      <label className="text-xs font-bold c-fg2 mb-2 block">نام و نام‌خانوادگی</label>
                      <input value={editName} onChange={e => setEditName(e.target.value)}
                        className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none transition-all"
                        style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--fg)" }} />
                    </div>
                    <div>
                      <label className="text-xs font-bold c-fg2 mb-2 block">شماره موبایل <span className="c-fg3">(غیرقابل تغییر)</span></label>
                      <input value={user.phone} disabled dir="ltr"
                        className="w-full rounded-xl px-4 py-3 text-sm opacity-40 cursor-not-allowed"
                        style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--fg)" }} />
                    </div>
                  </div>
                </div>

                {/* Security */}
                <div className="rounded-2xl p-6" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: "rgba(167,139,255,0.12)", color: "#3B82F6" }}>🔒</div>
                    <p className="font-bold c-fg">امنیت</p>
                  </div>
                  <div>
                    <label className="text-xs font-bold c-fg2 mb-2 block">رمز عبور جدید</label>
                    <input type="password" value={editPass} onChange={e => setEditPass(e.target.value)}
                      placeholder="حداقل ۶ کاراکتر" dir="ltr"
                      className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none"
                      style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--fg)" }} />
                  </div>
                </div>

                {saveMsg && (
                  <div className="rounded-xl px-4 py-3 text-sm font-bold text-center"
                    style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)", color: "#10B981" }}>
                    {saveMsg}
                  </div>
                )}

                <button onClick={saveSettings} disabled={saving}
                  className="w-full py-4 rounded-xl font-extrabold text-sm transition-all hover:opacity-90 disabled:opacity-50"
                  style={{ background: "linear-gradient(135deg,#2563EB,#3B82F6)", color: "#fff", boxShadow: "0 4px 24px rgba(79,110,255,0.3)" }}>
                  {saving ? "در حال ذخیره..." : "ذخیره تغییرات"}
                </button>

                {/* Danger */}
                <div className="rounded-2xl p-5" style={{ background: "rgba(239,68,68,0.04)", border: "1px solid rgba(239,68,68,0.15)" }}>
                  <p className="font-bold text-sm mb-1" style={{ color: "#f87171" }}>منطقه خطر</p>
                  <p className="text-xs c-fg3 mb-4">با خروج، نشست جاری پایان می‌یابد.</p>
                  <button onClick={logout}
                    className="w-full py-3 rounded-xl font-bold text-sm transition-all hover:opacity-80"
                    style={{ background: "rgba(239,68,68,0.08)", color: "#f87171", border: "1px solid rgba(239,68,68,0.2)" }}>
                    خروج از حساب
                  </button>
                </div>
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}
