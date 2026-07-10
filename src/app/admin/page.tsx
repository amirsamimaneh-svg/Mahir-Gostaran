"use client";

import { useState } from "react";
import Link from "next/link";
import ChatWindow, { ChatMessage } from "@/components/ChatWindow";

type User = { id: string; phone: string; name: string; createdAt: string; consultCount: number };
type ProjectReq = {
  id: string; name: string; phone: string; business: string; service: string;
  budget: string; timeline: string; goal: string; description: string;
  createdAt: string; status: "new" | "reviewing" | "done";
};
type Contact = { id: string; name: string; phone: string; message: string; createdAt: string; read: boolean };
type RawMessage = { id: string; from: "admin" | "user"; userPhone: string; type: "text" | "image" | "voice"; text: string; fileUrl?: string; duration?: number; createdAt: string; read: boolean };

const PASS = "Am-=1386";
const STATUS_LABEL: Record<string, string> = { new: "جدید", reviewing: "در بررسی", done: "انجام شد" };
const STATUS_COLOR: Record<string, string> = { new: "#5B9CF6", reviewing: "#fb923c", done: "#34d399" };

function fmt(iso: string) { return new Date(iso).toLocaleDateString("fa-IR", { year: "numeric", month: "short", day: "numeric" }); }
function fmtTime(iso: string) { return new Date(iso).toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" }); }

/* ─── Login ─────────────────────────────────────────────────── */
function LoginScreen({ onLogin }: { onLogin: (pass: string) => Promise<string> }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handle() {
    if (!password.trim()) return;
    setLoading(true); setError("");
    const err = await onLogin(password);
    setLoading(false);
    if (err) setError(err);
  }

  return (
    <div dir="rtl" className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden" style={{ background: "#05050f" }}>
      {/* Decorative glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle,rgba(91,156,246,0.06) 0%,transparent 70%)" }} />

      <div className="w-full max-w-[400px] relative">
        {/* Logo area */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-5 relative"
            style={{ background: "linear-gradient(135deg,rgba(91,156,246,0.15),rgba(37,99,235,0.08))", border: "1.5px solid rgba(91,156,246,0.3)", boxShadow: "0 0 60px rgba(91,156,246,0.12)" }}>
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <rect x="2" y="2" width="32" height="32" rx="10" stroke="#5B9CF6" strokeWidth="1.5" strokeOpacity="0.4" />
              <path d="M10 26V12l8 8 8-8v14" stroke="#5B9CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="absolute -top-1.5 -right-1.5 w-3 h-3 rounded-full bg-[#34d399]" style={{ boxShadow: "0 0 8px #34d399" }} />
          </div>
          <h1 className="text-2xl font-black text-white mb-1">پنل مدیریت</h1>
          <p className="text-sm font-bold tracking-widest" style={{ color: "#5B9CF6" }}>MAHIR ADMIN</p>
        </div>

        {/* Card */}
        <div className="rounded-3xl p-8" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(20px)", boxShadow: "0 40px 80px rgba(0,0,0,0.4)" }}>
          <label className="text-xs font-bold tracking-widest uppercase block mb-3" style={{ color: "rgba(91,156,246,0.7)" }}>
            رمز عبور
          </label>
          <div className="relative mb-5">
            <input
              type="password" value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handle()}
              placeholder="••••••••" dir="ltr"
              className="w-full rounded-2xl px-5 py-4 text-sm focus:outline-none transition-all"
              style={{ background: "rgba(255,255,255,0.06)", border: `1px solid ${error ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.1)"}`, color: "#f0f0f5", letterSpacing: "0.15em" }} />
          </div>
          {error && (
            <div className="mb-4 px-4 py-2.5 rounded-xl text-xs text-center font-medium" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "#f87171" }}>
              {error}
            </div>
          )}
          <button onClick={handle} disabled={loading}
            className="w-full py-4 rounded-2xl font-extrabold text-sm transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
            style={{ background: "linear-gradient(135deg,#5B9CF6,#2563EB)", color: "#fff", boxShadow: "0 0 40px rgba(91,156,246,0.3)" }}>
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                در حال بررسی…
              </span>
            ) : "ورود به پنل ←"}
          </button>
        </div>

        <p className="text-center text-xs mt-6" style={{ color: "rgba(240,240,245,0.2)" }}>
          دسترسی فقط برای مدیران مجاز
        </p>
      </div>
    </div>
  );
}

/* ─── Stat Card ─────────────────────────────────────────────── */
function StatCard({ label, value, icon, color, badge }: { label: string; value: number; icon: string; color: string; badge?: number | null }) {
  return (
    <div className="relative rounded-2xl p-5 overflow-hidden group"
      style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${color}20`, transition: "border-color 0.3s" }}>
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at top right,${color}10,transparent 70%)` }} />
      {badge != null && badge > 0 && (
        <span className="absolute top-3 left-3 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-extrabold z-10"
          style={{ background: "#ef4444", color: "#fff", boxShadow: "0 0 12px rgba(239,68,68,0.6)" }}>{badge}</span>
      )}
      <div className="flex items-start justify-between mb-4">
        <span className="text-xl">{icon}</span>
        <span className="text-[10px] font-black tracking-widest px-2 py-0.5 rounded-full"
          style={{ background: `${color}15`, color }}>LIVE</span>
      </div>
      <div className="text-3xl font-black mb-1" style={{ color }}>{value}</div>
      <div className="text-xs font-medium" style={{ color: "rgba(240,240,245,0.4)" }}>{label}</div>
    </div>
  );
}

/* ─── Main Dashboard ─────────────────────────────────────────── */
export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [allMessages, setAllMessages] = useState<RawMessage[]>([]);
  const [projects, setProjects] = useState<ProjectReq[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [tab, setTab] = useState<"projects" | "contacts" | "users" | "chat">("projects");
  const [selectedPhone, setSelectedPhone] = useState<string | null>(null);
  const [msgText, setMsgText] = useState("");
  const [sending, setSending] = useState(false);
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  async function login(pass: string): Promise<string> {
    const [uRes, pRes, cRes] = await Promise.all([
      fetch("/api/admin/users", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password: pass }) }),
      fetch("/api/project", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password: pass }) }),
      fetch("/api/contact"),
    ]);
    const uData = await uRes.json();
    if (uData.error) return uData.error;
    setUsers(uData.users ?? []);
    setProjects((await pRes.json()).requests ?? []);
    setContacts((await cRes.json()).contacts ?? []);
    setPassword(pass);
    setAuthed(true);
    return "";
  }

  async function fetchMessages() {
    const res = await fetch("/api/admin/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password: PASS }) });
    const data = await res.json();
    if (data.messages) setAllMessages(data.messages);
  }

  async function sendMsg() {
    if (!selectedPhone || !msgText.trim() || sending) return;
    setSending(true);
    await fetch("/api/admin/message", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password: PASS, userPhone: selectedPhone, text: msgText.trim() }) });
    setMsgText(""); setSending(false); fetchMessages();
  }

  async function adminSendText(text: string) {
    if (!selectedPhone) return;
    await fetch("/api/admin/message", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password: PASS, userPhone: selectedPhone, text, type: "text" }) });
    await fetchMessages();
  }

  async function adminSendMedia(url: string, type: "image" | "voice", duration?: number) {
    if (!selectedPhone) return;
    await fetch("/api/admin/message", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password: PASS, userPhone: selectedPhone, text: "", type, fileUrl: url, duration }) });
    await fetchMessages();
  }

  async function updateStatus(id: string, status: string) {
    await fetch("/api/project", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password: PASS, id, status }) });
    setProjects(ps => ps.map(p => p.id === id ? { ...p, status: status as ProjectReq["status"] } : p));
  }

  if (!authed) return <LoginScreen onLogin={login} />;

  const newProjects = projects.filter(p => p.status === "new").length;
  const chatMessages: ChatMessage[] = allMessages
    .filter(m => m.userPhone === selectedPhone)
    .map(m => ({ id: m.id, from: m.from, type: m.type, text: m.text, fileUrl: m.fileUrl, duration: m.duration, createdAt: m.createdAt }));
  const selectedUser = users.find(u => u.phone === selectedPhone);

  const TABS = [
    { key: "projects" as const, label: "پروژه‌ها", icon: "◈", badge: newProjects },
    { key: "contacts" as const, label: "تماس‌ها", icon: "✉", badge: 0 },
    { key: "users" as const, label: "کاربران", icon: "◎", badge: 0 },
    { key: "chat" as const, label: "پیام‌رسانی", icon: "◇", badge: 0 },
  ];

  return (
    <div dir="rtl" className="min-h-screen" style={{ background: "#05050f", color: "#f0f0f5" }}>

      {/* Top nav */}
      <nav className="fixed top-0 inset-x-0 z-50" style={{ background: "rgba(5,5,15,0.9)", backdropFilter: "blur(24px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg,#5B9CF6,#2563EB)" }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 12V5l5 5 5-5v7" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <span className="font-black text-sm text-white">ماهیر</span>
              <span className="text-xs mr-2" style={{ color: "rgba(91,156,246,0.6)" }}>/ پنل مدیریت</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Live indicator */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.2)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] animate-pulse" />
              <span className="text-xs font-bold" style={{ color: "#34d399" }}>آنلاین</span>
            </div>
            <Link href="/project" target="_blank"
              className="text-xs px-3 py-1.5 rounded-xl font-bold transition-all hover:bg-white/[0.06]"
              style={{ border: "1px solid rgba(255,255,255,0.08)", color: "rgba(240,240,245,0.4)" }}>
              فرم پروژه ↗
            </Link>
            <Link href="/"
              className="text-xs px-3 py-1.5 rounded-xl font-bold transition-all hover:bg-white/[0.06]"
              style={{ border: "1px solid rgba(255,255,255,0.08)", color: "rgba(240,240,245,0.4)" }}>
              سایت ↗
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-20">

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard label="درخواست پروژه" value={projects.length} icon="◈" color="#5B9CF6" badge={newProjects} />
          <StatCard label="کاربران ثبت‌نام" value={users.length} icon="◎" color="#a78bfa" />
          <StatCard label="پیام‌های تماس" value={contacts.length} icon="✉" color="#34d399" />
          <StatCard label="جلسات مشاوره" value={users.reduce((s, u) => s + u.consultCount, 0)} icon="◇" color="#fb923c" />
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 p-1 rounded-2xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
          {TABS.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className="relative flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold rounded-xl transition-all duration-200"
              style={{
                background: tab === t.key ? "linear-gradient(135deg,#5B9CF6,#2563EB)" : "transparent",
                color: tab === t.key ? "#fff" : "rgba(240,240,245,0.4)",
                boxShadow: tab === t.key ? "0 4px 20px rgba(91,156,246,0.3)" : "none",
              }}>
              <span className="hidden sm:inline">{t.icon}</span>
              {t.label}
              {t.badge > 0 && (
                <span className="w-4 h-4 rounded-full text-[9px] font-extrabold flex items-center justify-center"
                  style={{ background: tab === t.key ? "rgba(255,255,255,0.25)" : "#ef4444", color: "#fff" }}>
                  {t.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ── Projects Tab ── */}
        {tab === "projects" && (
          <div className="flex flex-col gap-3">
            {projects.length === 0 ? (
              <EmptyState icon="◈" text="هنوز درخواست پروژه‌ای ثبت نشده" />
            ) : projects.map(p => {
              const isOpen = expandedProject === p.id;
              return (
                <div key={p.id}
                  className="rounded-2xl overflow-hidden transition-all duration-300"
                  style={{ background: isOpen ? "rgba(91,156,246,0.04)" : "rgba(255,255,255,0.025)", border: `1px solid ${isOpen ? "rgba(91,156,246,0.2)" : p.status === "new" ? "rgba(91,156,246,0.15)" : "rgba(255,255,255,0.07)"}` }}>

                  <button className="w-full flex items-center justify-between px-5 py-4 text-right"
                    onClick={() => setExpandedProject(isOpen ? null : p.id)}>
                    <div className="flex items-center gap-4 min-w-0">
                      <StatusDot color={STATUS_COLOR[p.status]} />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-sm text-white">{p.name}</span>
                          {p.business && <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(240,240,245,0.4)" }}>{p.business}</span>}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                          <span className="text-xs font-mono" dir="ltr" style={{ color: "rgba(240,240,245,0.35)" }}>{p.phone}</span>
                          <span style={{ color: "rgba(255,255,255,0.1)" }}>·</span>
                          <span className="text-xs" style={{ color: "rgba(240,240,245,0.35)" }}>{p.service}</span>
                          <span style={{ color: "rgba(255,255,255,0.1)" }}>·</span>
                          <span className="text-xs" style={{ color: "rgba(240,240,245,0.25)" }}>{fmt(p.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0 mr-4">
                      <span className="hidden sm:inline text-xs px-3 py-1 rounded-full font-bold"
                        style={{ background: `${STATUS_COLOR[p.status]}15`, color: STATUS_COLOR[p.status], border: `1px solid ${STATUS_COLOR[p.status]}30` }}>
                        {STATUS_LABEL[p.status]}
                      </span>
                      <span className="text-xs" style={{ color: "rgba(240,240,245,0.25)", transform: isOpen ? "rotate(180deg)" : "none", display: "inline-block", transition: "transform 0.3s" }}>▼</span>
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-6" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
                        {[
                          { label: "بودجه", value: p.budget, color: "#5B9CF6" },
                          { label: "زمان‌بندی", value: p.timeline, color: "#a78bfa" },
                          { label: "هدف", value: p.goal, color: "#34d399" },
                        ].filter(i => i.value).map(i => (
                          <div key={i.label} className="rounded-xl px-4 py-3" style={{ background: `${i.color}08`, border: `1px solid ${i.color}18` }}>
                            <p className="text-[10px] font-black mb-1.5 tracking-widest uppercase" style={{ color: `${i.color}80` }}>{i.label}</p>
                            <p className="text-sm font-medium text-white">{i.value}</p>
                          </div>
                        ))}
                      </div>

                      <div className="mt-3 rounded-xl px-5 py-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                        <p className="text-[10px] font-black mb-2 tracking-widest uppercase" style={{ color: "rgba(91,156,246,0.5)" }}>توضیحات پروژه</p>
                        <p className="text-sm leading-relaxed" style={{ color: "rgba(240,240,245,0.7)" }}>{p.description}</p>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 mt-4">
                        <p className="text-xs font-bold w-full sm:w-auto" style={{ color: "rgba(240,240,245,0.3)" }}>تغییر وضعیت:</p>
                        {(["new", "reviewing", "done"] as const).map(s => (
                          <button key={s} onClick={() => updateStatus(p.id, s)}
                            className="text-xs px-4 py-2 rounded-xl font-bold transition-all hover:scale-105"
                            style={{
                              background: p.status === s ? STATUS_COLOR[s] : `${STATUS_COLOR[s]}10`,
                              color: p.status === s ? "#fff" : STATUS_COLOR[s],
                              border: `1px solid ${STATUS_COLOR[s]}35`,
                              boxShadow: p.status === s ? `0 0 20px ${STATUS_COLOR[s]}40` : "none",
                            }}>
                            {p.status === s && "✓ "}{STATUS_LABEL[s]}
                          </button>
                        ))}
                        <div className="flex-1" />
                        <a href={`tel:${p.phone}`}
                          className="flex items-center gap-2 text-xs px-4 py-2 rounded-xl font-bold transition-all hover:scale-105"
                          style={{ background: "rgba(52,211,153,0.1)", color: "#34d399", border: "1px solid rgba(52,211,153,0.25)" }}>
                          <span>📞</span> تماس با مشتری
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ── Contacts Tab ── */}
        {tab === "contacts" && (
          <div className="flex flex-col gap-3">
            {contacts.length === 0 ? (
              <EmptyState icon="✉" text="هنوز پیام تماسی دریافت نشده" />
            ) : contacts.map((c, i) => (
              <div key={c.id} className="rounded-2xl px-5 py-5 transition-all hover:bg-white/[0.02]"
                style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black flex-shrink-0"
                      style={{ background: "rgba(91,156,246,0.1)", color: "#5B9CF6", border: "1px solid rgba(91,156,246,0.2)" }}>
                      {i + 1}
                    </div>
                    <div>
                      <p className="font-bold text-sm text-white">{c.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <p className="text-xs font-mono" dir="ltr" style={{ color: "rgba(240,240,245,0.4)" }}>{c.phone}</p>
                        <span style={{ color: "rgba(255,255,255,0.1)" }}>·</span>
                        <p className="text-xs" style={{ color: "rgba(240,240,245,0.3)" }}>{fmt(c.createdAt)}</p>
                      </div>
                    </div>
                  </div>
                  <a href={`tel:${c.phone}`}
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl font-bold flex-shrink-0 transition-all hover:scale-105"
                    style={{ background: "rgba(52,211,153,0.1)", color: "#34d399", border: "1px solid rgba(52,211,153,0.2)" }}>
                    📞 تماس
                  </a>
                </div>
                <p className="text-sm leading-relaxed pr-13" style={{ color: "rgba(240,240,245,0.6)", paddingRight: "52px" }}>{c.message}</p>
              </div>
            ))}
          </div>
        )}

        {/* ── Users Tab ── */}
        {tab === "users" && (
          <div className="flex flex-col gap-3">
            {users.length === 0 ? (
              <EmptyState icon="◎" text="هنوز کاربری ثبت‌نام نکرده" />
            ) : users.map((u, i) => (
              <div key={u.id} className="flex items-center justify-between px-5 py-4 rounded-2xl transition-all hover:bg-white/[0.02]"
                style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black"
                    style={{ background: "rgba(167,139,250,0.1)", color: "#a78bfa", border: "1px solid rgba(167,139,250,0.2)" }}>
                    {i + 1}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-white">{u.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <p className="text-xs font-mono" dir="ltr" style={{ color: "rgba(240,240,245,0.4)" }}>{u.phone}</p>
                      <span style={{ color: "rgba(255,255,255,0.1)" }}>·</span>
                      <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ background: "rgba(91,156,246,0.1)", color: "#5B9CF6" }}>
                        {u.consultCount} مشاوره
                      </span>
                    </div>
                    <p className="text-xs mt-0.5" style={{ color: "rgba(240,240,245,0.25)" }}>{fmt(u.createdAt)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => { setSelectedPhone(u.phone); setTab("chat"); fetchMessages(); }}
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-sm transition-all hover:scale-110"
                    style={{ background: "rgba(91,156,246,0.1)", border: "1px solid rgba(91,156,246,0.2)" }}>
                    💬
                  </button>
                  <a href={`tel:${u.phone}`}
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-sm transition-all hover:scale-110"
                    style={{ background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.2)" }}>
                    📞
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Chat Tab ── */}
        {tab === "chat" && (
          <div className="flex gap-4" style={{ height: "calc(100vh - 280px)", minHeight: "460px" }}>
            {/* User list */}
            <div className="w-52 flex-shrink-0 rounded-2xl flex flex-col overflow-hidden" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="px-4 py-3 text-xs font-black tracking-widest uppercase" style={{ color: "rgba(91,156,246,0.6)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                کاربران
              </div>
              <div className="flex-1 overflow-y-auto">
                {users.length === 0 && (
                  <p className="text-xs p-4 text-center" style={{ color: "rgba(240,240,245,0.25)" }}>کاربری وجود ندارد</p>
                )}
                {users.map(u => (
                  <button key={u.phone} onClick={() => { setSelectedPhone(u.phone); fetchMessages(); }}
                    className="w-full text-right px-4 py-3.5 transition-all hover:bg-white/[0.04]"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", background: selectedPhone === u.phone ? "rgba(91,156,246,0.08)" : "transparent" }}>
                    <p className="font-bold text-xs truncate" style={{ color: selectedPhone === u.phone ? "#5B9CF6" : "rgba(240,240,245,0.7)" }}>{u.name}</p>
                    <p className="font-mono text-[10px] mt-0.5 truncate" dir="ltr" style={{ color: "rgba(240,240,245,0.3)" }}>{u.phone}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Chat window */}
            <div className="flex-1 rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
              {!selectedPhone ? (
                <div className="h-full flex items-center justify-center flex-col gap-3">
                  <div className="text-5xl opacity-10">💬</div>
                  <p className="text-sm" style={{ color: "rgba(240,240,245,0.3)" }}>یک کاربر از لیست انتخاب کنید</p>
                </div>
              ) : (
                <ChatWindow
                  messages={chatMessages}
                  myRole="admin"
                  myName="ادمین"
                  otherName={selectedUser?.name ?? selectedPhone}
                  onSendText={adminSendText}
                  onSendMedia={adminSendMedia}
                  onRefresh={fetchMessages}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StatusDot({ color }: { color: string }) {
  return (
    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0 mt-0.5"
      style={{ background: color, boxShadow: `0 0 8px ${color}` }} />
  );
}

function EmptyState({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="rounded-2xl p-16 text-center" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="text-4xl mb-4 opacity-20">{icon}</div>
      <p className="text-sm" style={{ color: "rgba(240,240,245,0.3)" }}>{text}</p>
    </div>
  );
}
