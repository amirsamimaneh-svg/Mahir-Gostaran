"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ChatWindow, { ChatMessage } from "@/components/ChatWindow";

type UserInfo = { phone: string; email?: string; name: string; createdAt: string; consultCount: number; unread: number };
type Tab = "dashboard" | "chat" | "consults" | "settings";

const BG = "#05050f";
const SURFACE = "rgba(255,255,255,0.03)";
const BORDER = "rgba(255,255,255,0.07)";
const BLUE = "#5B9CF6";
const BLUE2 = "#2563EB";

const fmt = (iso: string) => new Date(iso).toLocaleDateString("fa-IR", { year: "numeric", month: "long", day: "numeric" });
const fmtT = (iso: string) => new Date(iso).toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" });
const days = (iso: string) => Math.max(1, Math.floor((Date.now() - new Date(iso).getTime()) / 86400000));
const score = (c: number) => Math.min(c * 12 + 40, 100);

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserInfo | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const [tab, setTab] = useState<Tab>("dashboard");
  const [editName, setEditName] = useState("");
  const [editPass, setEditPass] = useState("");
  const [saveMsg, setSaveMsg] = useState("");
  const [saving, setSaving] = useState(false);

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
    if (data.messages) setMessages(data.messages);
  }

  async function sendText(text: string) {
    await fetch("/api/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text, type: "text" }) });
    await loadMessages();
  }

  async function sendMedia(url: string, type: "image" | "voice", duration?: number) {
    await fetch("/api/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text: "", type, fileUrl: url, duration }) });
    await loadMessages();
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
  }

  async function saveSettings() {
    if (!editName.trim()) return;
    setSaving(true);
    await new Promise(r => setTimeout(r, 800));
    setSaving(false);
    setSaveMsg("تغییرات با موفقیت ذخیره شد");
    setTimeout(() => setSaveMsg(""), 3000);
  }

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: BG }}>
      <div className="flex flex-col items-center gap-4">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-black text-2xl"
          style={{ background: `linear-gradient(135deg,${BLUE},${BLUE2})`, boxShadow: `0 0 40px rgba(91,156,246,0.3)` }}>
          M
        </div>
        <div className="w-8 h-8 border-2 rounded-full animate-spin" style={{ borderColor: `${BLUE}30`, borderTopColor: BLUE }} />
        <p className="text-sm" style={{ color: "rgba(240,240,245,0.4)" }}>در حال بارگذاری…</p>
      </div>
    </div>
  );

  const NAV: { key: Tab; label: string; icon: React.ReactNode; badge?: number }[] = [
    { key: "dashboard", label: "داشبورد",    icon: <GridIcon /> },
    { key: "chat",      label: "پیام‌ها",    icon: <ChatIcon />, badge: user.unread || 0 },
    { key: "consults",  label: "مشاوره‌ها",  icon: <StarIcon /> },
    { key: "settings",  label: "تنظیمات",    icon: <GearIcon /> },
  ];

  const userScore = score(user.consultCount);

  return (
    <div dir="rtl" className="min-h-screen flex" style={{ background: BG, color: "#f0f0f5" }}>

      {/* ── Sidebar ── */}
      <aside className="hidden md:flex flex-col w-64 flex-shrink-0 fixed top-0 right-0 h-full z-40"
        style={{ background: "rgba(5,5,15,0.95)", backdropFilter: "blur(24px)", borderLeft: `1px solid ${BORDER}` }}>

        {/* Logo */}
        <div className="flex items-center gap-3 px-5 h-16 flex-shrink-0" style={{ borderBottom: `1px solid ${BORDER}` }}>
          <div className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm"
            style={{ background: `linear-gradient(135deg,${BLUE},${BLUE2})`, color: "#fff" }}>M</div>
          <span className="font-black text-sm" style={{ color: BLUE }}>ماهیر</span>
          <span className="text-xs mr-auto" style={{ color: "rgba(240,240,245,0.2)" }}>/ پروفایل</span>
        </div>

        {/* User card */}
        <div className="mx-4 mt-5">
          <div className="relative rounded-2xl p-4 overflow-hidden"
            style={{ background: `linear-gradient(135deg,rgba(91,156,246,0.1),rgba(37,99,235,0.06))`, border: `1px solid rgba(91,156,246,0.2)` }}>
            <div className="absolute -top-8 -left-8 w-28 h-28 rounded-full blur-3xl pointer-events-none"
              style={{ background: "rgba(91,156,246,0.15)" }} />
            <div className="relative flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl flex-shrink-0"
                style={{ background: `linear-gradient(135deg,${BLUE},${BLUE2})`, color: "#fff", boxShadow: `0 6px 24px rgba(91,156,246,0.4)` }}>
                {user.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <p className="font-bold text-sm text-white truncate">{user.name}</p>
                <p className="text-xs mt-0.5 truncate" dir="ltr" style={{ color: "rgba(240,240,245,0.4)" }}>
                  {user.email || user.phone}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-bold text-emerald-400">فعال</span>
                </div>
              </div>
            </div>
            {/* Score bar */}
            <div>
              <div className="flex justify-between text-[10px] mb-1.5" style={{ color: "rgba(240,240,245,0.4)" }}>
                <span>امتیاز</span><span style={{ color: BLUE }}>{userScore}%</span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(91,156,246,0.12)" }}>
                <div className="h-full rounded-full transition-all duration-1000"
                  style={{ width: `${userScore}%`, background: `linear-gradient(90deg,${BLUE},${BLUE2})`, boxShadow: `0 0 8px ${BLUE}` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 mt-5 flex flex-col gap-1 overflow-y-auto">
          <p className="text-[10px] font-black tracking-widest uppercase px-3 mb-2" style={{ color: "rgba(240,240,245,0.2)" }}>منو</p>
          {NAV.map(item => (
            <button key={item.key} onClick={() => setTab(item.key)}
              className="relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all text-right w-full"
              style={{
                background: tab === item.key ? "rgba(91,156,246,0.1)" : "transparent",
                color: tab === item.key ? BLUE : "rgba(240,240,245,0.45)",
                borderRight: tab === item.key ? `2px solid ${BLUE}` : "2px solid transparent",
              }}>
              <span className="w-5 h-5 flex items-center justify-center flex-shrink-0">{item.icon}</span>
              <span className="flex-1">{item.label}</span>
              {(item.badge ?? 0) > 0 && (
                <span className="min-w-5 h-5 px-1.5 rounded-full flex items-center justify-center text-[10px] font-black"
                  style={{ background: "#ef4444", color: "#fff", boxShadow: "0 0 12px rgba(239,68,68,0.5)" }}>{item.badge}</span>
              )}
            </button>
          ))}
        </nav>

        {/* Bottom actions */}
        <div className="p-3 flex flex-col gap-2" style={{ borderTop: `1px solid ${BORDER}` }}>
          <Link href="/consult"
            className="flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all hover:scale-[1.02]"
            style={{ background: `linear-gradient(135deg,${BLUE},${BLUE2})`, color: "#fff", boxShadow: `0 4px 20px rgba(91,156,246,0.3)` }}>
            ✦ مشاوره جدید
          </Link>
          <button onClick={logout}
            className="py-2.5 rounded-xl text-sm font-bold transition-all hover:bg-red-500/10"
            style={{ color: "rgba(240,240,245,0.3)" }}>
            خروج از حساب
          </button>
        </div>
      </aside>

      {/* ── Mobile bottom nav ── */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 flex"
        style={{ background: "rgba(5,5,15,0.97)", backdropFilter: "blur(24px)", borderTop: `1px solid ${BORDER}`, paddingBottom: "env(safe-area-inset-bottom)" }}>
        {NAV.map(item => (
          <button key={item.key} onClick={() => setTab(item.key)}
            className="relative flex-1 flex flex-col items-center justify-center gap-1 py-3 transition-all active:scale-95">
            <span className="w-5 h-5 flex items-center justify-center"
              style={{ color: tab === item.key ? BLUE : "rgba(240,240,245,0.35)", filter: tab === item.key ? `drop-shadow(0 0 6px ${BLUE})` : "none" }}>
              {item.icon}
            </span>
            <span className="text-[10px] font-bold" style={{ color: tab === item.key ? BLUE : "rgba(240,240,245,0.3)" }}>{item.label}</span>
            {(item.badge ?? 0) > 0 && (
              <span className="absolute top-2 right-[calc(50%-6px)] translate-x-3 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black"
                style={{ background: "#ef4444", color: "#fff" }}>{item.badge}</span>
            )}
            {tab === item.key && <span className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full" style={{ background: BLUE }} />}
          </button>
        ))}
        <button onClick={logout} className="flex-shrink-0 flex flex-col items-center justify-center gap-1 px-4 py-3 active:scale-95 transition-all">
          <span className="text-lg">🚪</span>
          <span className="text-[10px] font-bold" style={{ color: "rgba(240,240,245,0.3)" }}>خروج</span>
        </button>
      </nav>

      {/* ── Main content ── */}
      <div className="flex-1 flex flex-col md:mr-64">

        {/* Topbar */}
        <header className="sticky top-0 z-30 h-16 flex items-center px-6 gap-4"
          style={{ background: "rgba(5,5,15,0.9)", backdropFilter: "blur(20px)", borderBottom: `1px solid ${BORDER}` }}>
          <h1 className="font-black text-base flex-1">
            {tab === "dashboard" && "داشبورد"}
            {tab === "chat" && "پیام‌ها"}
            {tab === "consults" && "مشاوره‌های من"}
            {tab === "settings" && "تنظیمات حساب"}
          </h1>
          <Link href="/" className="text-xs font-bold px-3 py-1.5 rounded-xl transition-all hover:text-[#5B9CF6]"
            style={{ border: `1px solid ${BORDER}`, color: "rgba(240,240,245,0.3)" }}>
            ← خانه
          </Link>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-28 md:pb-10">
          <div className="max-w-4xl mx-auto">

            {/* ─── DASHBOARD ─── */}
            {tab === "dashboard" && (
              <div className="flex flex-col gap-6">

                {/* Hero */}
                <div className="relative rounded-3xl overflow-hidden p-7 md:p-9"
                  style={{ background: `linear-gradient(135deg,rgba(91,156,246,0.12),rgba(37,99,235,0.06))`, border: "1px solid rgba(91,156,246,0.2)" }}>
                  <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-[80px] pointer-events-none"
                    style={{ background: "rgba(91,156,246,0.1)" }} />
                  <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full blur-[60px] pointer-events-none"
                    style={{ background: "rgba(167,139,250,0.08)" }} />
                  <div className="relative z-10 flex items-center gap-5">
                    <div className="w-16 h-16 rounded-2xl items-center justify-center font-black text-3xl flex-shrink-0 hidden sm:flex"
                      style={{ background: `linear-gradient(135deg,${BLUE},${BLUE2})`, color: "#fff", boxShadow: `0 8px 32px rgba(91,156,246,0.4)` }}>
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-black tracking-widest uppercase" style={{ color: BLUE }}>✦ خوش اومدی</span>
                        <span className="w-1 h-1 rounded-full" style={{ background: BLUE }} />
                        <span className="text-xs" style={{ color: "rgba(240,240,245,0.35)" }}>عضو از {fmt(user.createdAt)}</span>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-black text-white">{user.name}</h2>
                      <p className="text-sm mt-1" style={{ color: "rgba(240,240,245,0.45)" }}>
                        {user.consultCount} مشاوره دریافتی · {days(user.createdAt)} روز عضویت
                      </p>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: "مشاوره",       value: user.consultCount, unit: "بار",   color: BLUE,        icon: <StarIcon /> },
                    { label: "پیام‌نخوانده", value: user.unread,       unit: "پیام",  color: "#a78bfa",   icon: <ChatIcon /> },
                    { label: "روز عضویت",    value: days(user.createdAt), unit: "روز", color: "#34d399",   icon: <CalIcon /> },
                    { label: "امتیاز",       value: userScore,         unit: "%",     color: "#fb923c",   icon: <TrophyIcon /> },
                  ].map(s => (
                    <div key={s.label} className="relative rounded-2xl p-5 overflow-hidden group transition-all hover:-translate-y-0.5"
                      style={{ background: SURFACE, border: `1px solid ${s.color}18` }}>
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{ background: `radial-gradient(ellipse at top right,${s.color}0a,transparent 70%)` }} />
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-4"
                        style={{ background: `${s.color}12`, color: s.color }}>
                        {s.icon}
                      </div>
                      <div className="text-3xl font-black mb-0.5 leading-none" style={{ color: s.color }}>
                        {s.value}<span className="text-xs font-medium ml-1" style={{ color: "rgba(240,240,245,0.3)" }}>{s.unit}</span>
                      </div>
                      <p className="text-xs mt-1" style={{ color: "rgba(240,240,245,0.4)" }}>{s.label}</p>
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full" style={{ background: `${s.color}20` }}>
                        <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${Math.min((s.value / 10) * 100, 100)}%`, background: s.color }} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick actions + Activity */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  {/* Quick actions */}
                  <div className="rounded-2xl p-5" style={{ background: SURFACE, border: `1px solid ${BORDER}` }}>
                    <p className="text-[10px] font-black tracking-widest uppercase mb-4" style={{ color: "rgba(240,240,245,0.25)" }}>دسترسی سریع</p>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { icon: "◈", label: "مشاوره جدید",  href: "/consult",   color: BLUE,      bg: `rgba(91,156,246,0.1)` },
                        { icon: "📁", label: "نمونه‌کارها",  href: "/",          color: "#a78bfa", bg: "rgba(167,139,250,0.1)" },
                        { icon: "💰", label: "قیمت‌گذاری",  href: "/pricing",   color: "#34d399", bg: "rgba(52,211,153,0.1)" },
                        { icon: "📋", label: "درخواست پروژه", href: "/project", color: "#fb923c", bg: "rgba(251,146,60,0.1)" },
                      ].map(a => (
                        <Link key={a.href} href={a.href}
                          className="flex flex-col items-center gap-2.5 py-5 rounded-2xl text-center transition-all hover:-translate-y-1 hover:border-opacity-50"
                          style={{ background: a.bg, border: `1px solid ${a.color}25` }}>
                          <span className="text-2xl">{a.icon}</span>
                          <span className="text-xs font-bold" style={{ color: a.color }}>{a.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Activity */}
                  <div className="rounded-2xl p-5" style={{ background: SURFACE, border: `1px solid ${BORDER}` }}>
                    <p className="text-[10px] font-black tracking-widest uppercase mb-4" style={{ color: "rgba(240,240,245,0.25)" }}>فعالیت اخیر</p>
                    <div className="flex flex-col gap-0">
                      {[
                        { icon: "◈", text: "مشاوره AI دریافت شد",  time: "امروز",             color: BLUE },
                        { icon: "✉", text: "پیام از تیم ماهیر",     time: "دیروز",             color: "#a78bfa" },
                        { icon: "★", text: "امتیاز به‌روز شد",       time: "۲ روز پیش",         color: "#fb923c" },
                        { icon: "✓", text: "حساب کاربری ساخته شد",  time: fmt(user.createdAt), color: "#34d399" },
                      ].map((a, i) => (
                        <div key={i} className="flex items-center gap-3 py-3"
                          style={{ borderBottom: i < 3 ? `1px solid ${BORDER}` : "none" }}>
                          <div className="w-8 h-8 rounded-xl flex items-center justify-center text-sm flex-shrink-0"
                            style={{ background: `${a.color}12`, color: a.color }}>{a.icon}</div>
                          <p className="flex-1 text-sm" style={{ color: "rgba(240,240,245,0.7)" }}>{a.text}</p>
                          <span className="text-[10px] flex-shrink-0" style={{ color: "rgba(240,240,245,0.25)" }}>{a.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Account info */}
                <div className="rounded-2xl p-5" style={{ background: SURFACE, border: `1px solid ${BORDER}` }}>
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-[10px] font-black tracking-widest uppercase" style={{ color: "rgba(240,240,245,0.25)" }}>اطلاعات حساب</p>
                    <button onClick={() => setTab("settings")} className="text-xs font-bold transition-all hover:underline" style={{ color: BLUE }}>ویرایش</button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { label: "نام",      value: user.name,                          ltr: false },
                      { label: "موبایل",   value: user.phone || "—",                  ltr: true },
                      { label: "ایمیل",    value: user.email || "—",                  ltr: true },
                      { label: "وضعیت",    value: "فعال ✓",                           ltr: false },
                    ].map(item => (
                      <div key={item.label} className="rounded-xl px-4 py-3" style={{ background: "rgba(255,255,255,0.025)", border: `1px solid ${BORDER}` }}>
                        <p className="text-[10px] font-bold mb-1.5 uppercase tracking-wider" style={{ color: "rgba(91,156,246,0.5)" }}>{item.label}</p>
                        <p className="font-bold text-sm text-white truncate" dir={item.ltr ? "ltr" : "rtl"}>{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* ─── CHAT ─── */}
            {tab === "chat" && (
              <div className="rounded-3xl overflow-hidden" style={{ height: "calc(100vh - 140px)", minHeight: "480px", border: `1px solid ${BORDER}` }}>
                <ChatWindow
                  messages={messages}
                  myRole="user"
                  myName={user.name}
                  otherName="تیم ماهیر"
                  onSendText={sendText}
                  onSendMedia={sendMedia}
                  onRefresh={loadMessages}
                />
              </div>
            )}

            {/* ─── CONSULTS ─── */}
            {tab === "consults" && (
              <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-black text-xl text-white">مشاوره‌های من</h2>
                    <p className="text-sm mt-0.5" style={{ color: "rgba(240,240,245,0.4)" }}>{user.consultCount} مشاوره دریافتی</p>
                  </div>
                  <Link href="/consult"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all hover:scale-[1.02]"
                    style={{ background: `linear-gradient(135deg,${BLUE},${BLUE2})`, color: "#fff", boxShadow: `0 4px 16px rgba(91,156,246,0.3)` }}>
                    + مشاوره جدید
                  </Link>
                </div>

                {user.consultCount === 0 ? (
                  <div className="rounded-3xl p-16 flex flex-col items-center text-center"
                    style={{ background: SURFACE, border: `1px dashed rgba(91,156,246,0.2)` }}>
                    <div className="w-24 h-24 rounded-3xl flex items-center justify-center text-5xl mb-6"
                      style={{ background: "rgba(91,156,246,0.08)", border: "1px solid rgba(91,156,246,0.15)" }}>◈</div>
                    <h3 className="font-black text-xl text-white mb-2">هنوز مشاوره‌ای نگرفتی</h3>
                    <p className="text-sm mb-8 max-w-xs" style={{ color: "rgba(240,240,245,0.4)" }}>اولین مشاوره هوشمندت رایگانه! همین الان امتحان کن.</p>
                    <Link href="/consult"
                      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm transition-all hover:scale-[1.02]"
                      style={{ background: `linear-gradient(135deg,${BLUE},${BLUE2})`, color: "#fff", boxShadow: `0 4px 20px rgba(91,156,246,0.3)` }}>
                      شروع مشاوره رایگان ←
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {Array.from({ length: user.consultCount }).map((_, i) => (
                      <div key={i} className="flex items-center gap-4 rounded-2xl p-5 transition-all hover:border-[rgba(91,156,246,0.25)]"
                        style={{ background: SURFACE, border: `1px solid ${BORDER}` }}>
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ background: "rgba(91,156,246,0.1)", color: BLUE, border: "1px solid rgba(91,156,246,0.2)" }}>
                          <StarIcon />
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-sm text-white">مشاوره رشد کسب‌وکار #{i + 1}</p>
                          <p className="text-xs mt-0.5" style={{ color: "rgba(240,240,245,0.4)" }}>پاسخ اختصاصی هوش مصنوعی دریافت شد</p>
                        </div>
                        <span className="text-xs px-3 py-1.5 rounded-full font-bold"
                          style={{ background: "rgba(52,211,153,0.1)", color: "#34d399", border: "1px solid rgba(52,211,153,0.2)" }}>
                          ✓ تکمیل‌شده
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="rounded-2xl p-6 text-center"
                  style={{ background: `linear-gradient(135deg,rgba(91,156,246,0.07),rgba(37,99,235,0.04))`, border: "1px solid rgba(91,156,246,0.15)" }}>
                  <p className="font-bold text-white mb-1">نتیجه بهتر می‌خوای؟</p>
                  <p className="text-sm mb-4" style={{ color: "rgba(240,240,245,0.4)" }}>با تیم ماهیر مستقیم در ارتباط باش</p>
                  <button onClick={() => setTab("chat")}
                    className="text-sm font-bold px-6 py-2.5 rounded-xl transition-all hover:scale-[1.02]"
                    style={{ background: `linear-gradient(135deg,${BLUE},${BLUE2})`, color: "#fff" }}>
                    ارسال پیام به تیم ←
                  </button>
                </div>
              </div>
            )}

            {/* ─── SETTINGS ─── */}
            {tab === "settings" && (
              <div className="flex flex-col gap-5 max-w-lg">
                <div>
                  <h2 className="font-black text-xl text-white">تنظیمات حساب</h2>
                  <p className="text-sm mt-0.5" style={{ color: "rgba(240,240,245,0.4)" }}>اطلاعات شخصی و امنیت</p>
                </div>

                {/* Profile */}
                <div className="rounded-2xl p-6" style={{ background: SURFACE, border: `1px solid ${BORDER}` }}>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(91,156,246,0.1)", color: BLUE }}>👤</div>
                    <p className="font-bold text-white">اطلاعات شخصی</p>
                  </div>
                  <div className="flex flex-col gap-4">
                    <SettingsField label="نام و نام‌خانوادگی">
                      <input value={editName} onChange={e => setEditName(e.target.value)}
                        className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none transition-all"
                        style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${BORDER}`, color: "#f0f0f5" }} />
                    </SettingsField>
                    <SettingsField label="شماره موبایل" sub="(غیرقابل تغییر)">
                      <input value={user.phone || "ثبت‌نشده"} disabled dir="ltr"
                        className="w-full rounded-xl px-4 py-3 text-sm opacity-40 cursor-not-allowed"
                        style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${BORDER}`, color: "#f0f0f5" }} />
                    </SettingsField>
                    {user.email && (
                      <SettingsField label="ایمیل" sub="(غیرقابل تغییر)">
                        <input value={user.email} disabled dir="ltr"
                          className="w-full rounded-xl px-4 py-3 text-sm opacity-40 cursor-not-allowed"
                          style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${BORDER}`, color: "#f0f0f5" }} />
                      </SettingsField>
                    )}
                  </div>
                </div>

                {/* Security */}
                <div className="rounded-2xl p-6" style={{ background: SURFACE, border: `1px solid ${BORDER}` }}>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(167,139,250,0.1)", color: "#a78bfa" }}>🔒</div>
                    <p className="font-bold text-white">امنیت</p>
                  </div>
                  <SettingsField label="رمز عبور جدید">
                    <input type="password" value={editPass} onChange={e => setEditPass(e.target.value)}
                      placeholder="حداقل ۶ کاراکتر" dir="ltr"
                      className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none"
                      style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${BORDER}`, color: "#f0f0f5" }} />
                  </SettingsField>
                </div>

                {saveMsg && (
                  <div className="rounded-xl px-4 py-3 text-sm font-bold text-center"
                    style={{ background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.2)", color: "#34d399" }}>
                    ✓ {saveMsg}
                  </div>
                )}

                <button onClick={saveSettings} disabled={saving}
                  className="w-full py-4 rounded-xl font-black text-sm transition-all hover:scale-[1.02] disabled:opacity-50"
                  style={{ background: `linear-gradient(135deg,${BLUE},${BLUE2})`, color: "#fff", boxShadow: `0 4px 24px rgba(91,156,246,0.3)` }}>
                  {saving ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      در حال ذخیره…
                    </span>
                  ) : "ذخیره تغییرات"}
                </button>

                {/* Danger zone */}
                <div className="rounded-2xl p-5" style={{ background: "rgba(239,68,68,0.04)", border: "1px solid rgba(239,68,68,0.15)" }}>
                  <p className="font-bold text-sm mb-1" style={{ color: "#f87171" }}>منطقه خطر</p>
                  <p className="text-xs mb-4" style={{ color: "rgba(240,240,245,0.3)" }}>با خروج، نشست جاری پایان می‌یابد.</p>
                  <button onClick={logout}
                    className="w-full py-3 rounded-xl font-bold text-sm transition-all hover:bg-red-500/10"
                    style={{ background: "rgba(239,68,68,0.07)", color: "#f87171", border: "1px solid rgba(239,68,68,0.2)" }}>
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

function SettingsField({ label, sub, children }: { label: string; sub?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-bold mb-2 flex items-center gap-1.5 block" style={{ color: "rgba(216,229,245,0.45)" }}>
        {label}
        {sub && <span className="font-normal" style={{ color: "rgba(240,240,245,0.25)" }}>{sub}</span>}
      </label>
      {children}
    </div>
  );
}

function GridIcon() { return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><rect x="9" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><rect x="1" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><rect x="9" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4"/></svg>; }
function ChatIcon() { return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 3.5A1.5 1.5 0 013.5 2h9A1.5 1.5 0 0114 3.5v6A1.5 1.5 0 0112.5 11H9l-3 3v-3H3.5A1.5 1.5 0 012 9.5v-6z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>; }
function StarIcon() { return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2l1.545 3.13L13 5.635l-2.5 2.435.59 3.44L8 9.77l-3.09 1.74.59-3.44L3 5.635l3.455-.505L8 2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>; }
function GearIcon() { return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.4"/><path d="M8 1.5v1M8 13.5v1M1.5 8h1M13.5 8h1M3.4 3.4l.7.7M11.9 11.9l.7.7M11.9 4.1l-.7.7M4.1 11.9l-.7.7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>; }
function CalIcon() { return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><path d="M2 7h12M5 2v2M11 2v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>; }
function TrophyIcon() { return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 11c-2.2 0-4-1.8-4-4V3h8v4c0 2.2-1.8 4-4 4zM5 14h6M8 11v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><path d="M4 5H2a2 2 0 002 2M12 5h2a2 2 0 01-2 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>; }
