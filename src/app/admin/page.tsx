"use client";

import { useState } from "react";
import Link from "next/link";

type User = { id: string; phone: string; name: string; createdAt: string; consultCount: number };
type Message = { id: string; from: "admin" | "user"; userPhone: string; text: string; createdAt: string };
type ProjectReq = {
  id: string; name: string; phone: string; business: string; service: string;
  budget: string; timeline: string; goal: string; description: string;
  createdAt: string; status: "new" | "reviewing" | "done";
};

const PASS = "Am-=1386";

const STATUS_LABEL: Record<string, string> = { new: "جدید", reviewing: "در بررسی", done: "انجام شد" };
const STATUS_COLOR: Record<string, string> = { new: "#5B9CF6", reviewing: "#fb923c", done: "#34d399" };

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [projects, setProjects] = useState<ProjectReq[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<"projects" | "users" | "chat" | "contacts">("projects");
  const [selectedPhone, setSelectedPhone] = useState<string | null>(null);
  const [msgText, setMsgText] = useState("");
  const [sending, setSending] = useState(false);
  const [contacts, setContacts] = useState<{ id: string; name: string; phone: string; message: string; createdAt: string; read: boolean }[]>([]);
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  async function login() {
    setLoading(true); setError("");
    const [uRes, pRes, cRes] = await Promise.all([
      fetch("/api/admin/users", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) }),
      fetch("/api/project", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) }),
      fetch("/api/contact"),
    ]);
    setLoading(false);
    const uData = await uRes.json();
    if (uData.error) { setError(uData.error); return; }
    setUsers(uData.users ?? []);
    const pData = await pRes.json();
    setProjects(pData.requests ?? []);
    const cData = await cRes.json();
    setContacts(cData.contacts ?? []);
    setAuthed(true);
  }

  async function fetchMessages() {
    const res = await fetch("/api/admin/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password: PASS }) });
    const data = await res.json();
    if (data.messages) setMessages(data.messages);
  }

  async function sendMsg() {
    if (!selectedPhone || !msgText.trim() || sending) return;
    setSending(true);
    await fetch("/api/admin/message", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password: PASS, userPhone: selectedPhone, text: msgText.trim() }) });
    setMsgText(""); setSending(false); fetchMessages();
  }

  async function updateStatus(id: string, status: string) {
    await fetch("/api/project", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password: PASS, id, status }) });
    setProjects(ps => ps.map(p => p.id === id ? { ...p, status: status as ProjectReq["status"] } : p));
  }

  function openChat(phone: string) { setSelectedPhone(phone); setTab("chat"); fetchMessages(); }
  function fmt(iso: string) { return new Date(iso).toLocaleDateString("fa-IR", { year: "numeric", month: "short", day: "numeric" }); }
  function fmtTime(iso: string) { return new Date(iso).toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" }); }

  const chatMessages = messages.filter(m => m.userPhone === selectedPhone);
  const selectedUser = users.find(u => u.phone === selectedPhone);
  const newProjects = projects.filter(p => p.status === "new").length;

  if (!authed) return (
    <div dir="rtl" className="min-h-screen flex items-center justify-center px-4" style={{ background: "#05050f" }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl"
            style={{ background: "linear-gradient(135deg,rgba(91,156,246,0.2),rgba(37,99,235,0.1))", border: "1.5px solid rgba(91,156,246,0.35)" }}>
            🔐
          </div>
          <h1 className="text-xl font-extrabold text-[#5B9CF6]">پنل مدیریت ماهیر</h1>
          <p className="text-xs mt-1" style={{ color: "rgba(240,240,245,0.4)" }}>فقط برای ادمین سایت</p>
        </div>
        <div className="rounded-2xl p-7" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(91,156,246,0.15)" }}>
          <label className="text-xs font-bold mb-2 block" style={{ color: "rgba(216,229,245,0.5)" }}>رمز عبور ادمین</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === "Enter" && login()}
            placeholder="••••••••" dir="ltr"
            className="w-full rounded-xl px-4 py-3 text-sm mb-4 focus:outline-none"
            style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", color: "#f0f0f5" }} />
          {error && <p className="text-xs text-red-400 mb-3 text-center">{error}</p>}
          <button onClick={login} disabled={loading}
            className="w-full py-3.5 rounded-xl font-bold text-sm transition-all hover:scale-[1.02]"
            style={{ background: "linear-gradient(135deg,#5B9CF6,#2563EB)", color: "#fff", boxShadow: "0 0 30px rgba(91,156,246,0.35)" }}>
            {loading ? "در حال بررسی…" : "ورود به پنل ←"}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div dir="rtl" className="min-h-screen" style={{ background: "#05050f", color: "#f0f0f5" }}>
      {/* Topbar */}
      <nav style={{ background: "rgba(5,5,15,0.95)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(91,156,246,0.1)" }}
        className="fixed top-0 inset-x-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(91,156,246,0.15)", border: "1px solid rgba(91,156,246,0.3)" }}>
              🔐
            </div>
            <h1 className="text-base font-extrabold text-[#5B9CF6]">پنل ادمین ماهیر</h1>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/project" target="_blank" className="text-xs px-3 py-2 rounded-lg font-medium transition-all hover:text-[#5B9CF6]"
              style={{ border: "1px solid rgba(255,255,255,0.08)", color: "rgba(240,240,245,0.4)" }}>
              فرم پروژه
            </Link>
            <Link href="/" className="text-xs px-3 py-2 rounded-lg font-medium transition-all hover:text-[#5B9CF6]"
              style={{ border: "1px solid rgba(255,255,255,0.08)", color: "rgba(240,240,245,0.4)" }}>
              سایت
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 pt-24 pb-20">

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "درخواست پروژه", value: projects.length, badge: newProjects > 0 ? newProjects : null, color: "#5B9CF6" },
            { label: "کاربران ثبت‌نام", value: users.length, badge: null, color: "#a78bfa" },
            { label: "پیام‌های تماس", value: contacts.length, badge: null, color: "#34d399" },
            { label: "مشاوره‌ها", value: users.reduce((s, u) => s + u.consultCount, 0), badge: null, color: "#fb923c" },
          ].map(s => (
            <div key={s.label} className="relative rounded-2xl p-5 text-center" style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${s.color}25` }}>
              {s.badge && (
                <span className="absolute -top-2 -left-2 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-extrabold"
                  style={{ background: "#ef4444", color: "#fff" }}>{s.badge}</span>
              )}
              <div className="text-2xl font-extrabold mb-1" style={{ color: s.color }}>{s.value}</div>
              <div className="text-xs" style={{ color: "rgba(240,240,245,0.4)" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex rounded-2xl overflow-hidden mb-6 p-1 gap-1" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
          {([
            ["projects", `درخواست پروژه${newProjects > 0 ? ` (${newProjects})` : ""}`],
            ["contacts", "پیام‌های تماس"],
            ["users", "کاربران"],
            ["chat", "پیام‌رسانی"],
          ] as const).map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)}
              className="flex-1 py-2.5 text-sm font-bold rounded-xl transition-all"
              style={{
                background: tab === key ? "linear-gradient(135deg,#5B9CF6,#2563EB)" : "transparent",
                color: tab === key ? "#fff" : "rgba(240,240,245,0.45)",
              }}>
              {label}
            </button>
          ))}
        </div>

        {/* ── Projects Tab ── */}
        {tab === "projects" && (
          <div className="flex flex-col gap-3">
            {projects.length === 0 ? (
              <div className="rounded-2xl p-16 text-center" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="text-4xl mb-3">📋</div>
                <p style={{ color: "rgba(240,240,245,0.3)" }}>هنوز درخواست پروژه‌ای ثبت نشده</p>
              </div>
            ) : projects.map(p => (
              <div key={p.id} className="rounded-2xl overflow-hidden transition-all duration-300"
                style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${p.status === "new" ? "rgba(91,156,246,0.25)" : "rgba(255,255,255,0.07)"}` }}>

                {/* Card header */}
                <div className="flex items-center justify-between px-5 py-4 cursor-pointer"
                  onClick={() => setExpandedProject(expandedProject === p.id ? null : p.id)}>
                  <div className="flex items-center gap-4">
                    {/* Status dot */}
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ background: STATUS_COLOR[p.status], boxShadow: `0 0 8px ${STATUS_COLOR[p.status]}` }} />
                    <div>
                      <p className="font-bold text-sm">{p.name}
                        <span className="mx-2 font-normal text-xs" style={{ color: "rgba(240,240,245,0.35)" }}>·</span>
                        <span className="font-mono text-xs" dir="ltr" style={{ color: "rgba(240,240,245,0.4)" }}>{p.phone}</span>
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: "rgba(240,240,245,0.4)" }}>
                        {p.service}{p.business ? ` · ${p.business}` : ""} · {fmt(p.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs px-3 py-1 rounded-full font-bold"
                      style={{ background: `${STATUS_COLOR[p.status]}18`, color: STATUS_COLOR[p.status], border: `1px solid ${STATUS_COLOR[p.status]}35` }}>
                      {STATUS_LABEL[p.status]}
                    </span>
                    <span className="text-xs" style={{ color: "rgba(240,240,245,0.3)" }}>
                      {expandedProject === p.id ? "▲" : "▼"}
                    </span>
                  </div>
                </div>

                {/* Expanded details */}
                {expandedProject === p.id && (
                  <div className="px-5 pb-5 flex flex-col gap-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
                      {[
                        { k: "بودجه", v: p.budget },
                        { k: "زمان‌بندی", v: p.timeline },
                        { k: "هدف", v: p.goal },
                      ].filter(i => i.v).map(i => (
                        <div key={i.k} className="rounded-xl px-4 py-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                          <p className="text-[10px] font-bold mb-1 uppercase tracking-wider" style={{ color: "rgba(91,156,246,0.6)" }}>{i.k}</p>
                          <p className="text-sm">{i.v}</p>
                        </div>
                      ))}
                    </div>

                    <div className="rounded-xl px-4 py-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                      <p className="text-[10px] font-bold mb-2 uppercase tracking-wider" style={{ color: "rgba(91,156,246,0.6)" }}>توضیحات پروژه</p>
                      <p className="text-sm leading-relaxed" style={{ color: "rgba(240,240,245,0.75)" }}>{p.description}</p>
                    </div>

                    {/* Status buttons + contact */}
                    <div className="flex flex-wrap items-center gap-2">
                      {(["new", "reviewing", "done"] as const).map(s => (
                        <button key={s} onClick={() => updateStatus(p.id, s)}
                          className="text-xs px-4 py-2 rounded-xl font-bold transition-all hover:scale-105"
                          style={{
                            background: p.status === s ? STATUS_COLOR[s] : `${STATUS_COLOR[s]}15`,
                            color: p.status === s ? "#fff" : STATUS_COLOR[s],
                            border: `1px solid ${STATUS_COLOR[s]}40`,
                          }}>
                          {STATUS_LABEL[s]}
                        </button>
                      ))}
                      <div className="flex-1" />
                      <a href={`tel:${p.phone}`} className="text-xs px-4 py-2 rounded-xl font-bold flex items-center gap-1.5 transition-all hover:scale-105"
                        style={{ background: "rgba(34,197,94,0.12)", color: "#34d399", border: "1px solid rgba(34,197,94,0.25)" }}>
                        📞 تماس
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ── Contacts Tab ── */}
        {tab === "contacts" && (
          <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
            {contacts.length === 0 ? (
              <div className="p-12 text-center" style={{ color: "rgba(240,240,245,0.3)" }}>هنوز پیامی دریافت نشده</div>
            ) : (
              <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                {contacts.map((c, i) => (
                  <div key={c.id} className="px-6 py-5 hover:bg-white/[0.02] transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                          style={{ background: "rgba(91,156,246,0.12)", color: "#5B9CF6" }}>{i + 1}</span>
                        <div>
                          <p className="font-bold text-sm">{c.name}
                            <span className="mx-2 text-xs font-normal" style={{ color: "rgba(240,240,245,0.3)" }}>·</span>
                            <span className="font-mono text-xs" dir="ltr" style={{ color: "rgba(240,240,245,0.4)" }}>{c.phone}</span>
                          </p>
                          <p className="text-xs mt-0.5" style={{ color: "rgba(240,240,245,0.35)" }}>{fmt(c.createdAt)}</p>
                        </div>
                      </div>
                      <a href={`tel:${c.phone}`} className="text-xs px-3 py-1.5 rounded-lg font-bold flex-shrink-0"
                        style={{ background: "rgba(34,197,94,0.1)", color: "#34d399", border: "1px solid rgba(34,197,94,0.2)" }}>
                        📞
                      </a>
                    </div>
                    <p className="text-sm mt-3 leading-relaxed pr-11" style={{ color: "rgba(240,240,245,0.6)" }}>{c.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Users Tab ── */}
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
                        style={{ background: "rgba(91,156,246,0.12)", color: "#5B9CF6" }}>{i + 1}</span>
                      <div>
                        <p className="font-bold text-sm">{u.name}</p>
                        <p className="text-xs font-mono mt-0.5" dir="ltr" style={{ color: "rgba(240,240,245,0.4)" }}>{u.phone}</p>
                        <p className="text-xs mt-0.5" style={{ color: "rgba(240,240,245,0.3)" }}>{fmt(u.createdAt)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-1 rounded-full" style={{ background: "rgba(91,156,246,0.1)", color: "#5B9CF6" }}>
                        {u.consultCount} مشاوره
                      </span>
                      <button onClick={() => openChat(u.phone)} title="پیام"
                        className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                        style={{ background: "rgba(91,156,246,0.12)", border: "1px solid rgba(91,156,246,0.25)" }}>💬</button>
                      <a href={`tel:${u.phone}`} title="تماس"
                        className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                        style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)" }}>📞</a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Chat Tab ── */}
        {tab === "chat" && (
          <div className="flex gap-4 h-[520px]">
            <div className="w-52 flex-shrink-0 rounded-2xl overflow-hidden flex flex-col" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="px-3 py-2.5 text-xs font-bold text-[#5B9CF6]" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>کاربران</div>
              <div className="overflow-y-auto flex-1">
                {users.map(u => (
                  <button key={u.phone} onClick={() => { setSelectedPhone(u.phone); fetchMessages(); }}
                    className="w-full text-right px-3 py-3 text-xs transition-all hover:bg-white/[0.04]"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", background: selectedPhone === u.phone ? "rgba(91,156,246,0.08)" : "transparent", color: selectedPhone === u.phone ? "#5B9CF6" : "rgba(240,240,245,0.6)" }}>
                    <p className="font-bold truncate">{u.name}</p>
                    <p className="font-mono mt-0.5 opacity-60 truncate" dir="ltr">{u.phone}</p>
                  </button>
                ))}
              </div>
            </div>
            <div className="flex-1 flex flex-col rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              {!selectedPhone ? (
                <div className="flex-1 flex items-center justify-center" style={{ color: "rgba(240,240,245,0.3)" }}>
                  <div className="text-center"><div className="text-4xl mb-3">💬</div><p className="text-sm">یک کاربر انتخاب کنید</p></div>
                </div>
              ) : (
                <>
                  <div className="px-4 py-3 flex items-center gap-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", background: "rgba(91,156,246,0.05)" }}>
                    <span className="font-bold text-sm">{selectedUser?.name}</span>
                    <span className="font-mono text-xs" dir="ltr" style={{ color: "rgba(240,240,245,0.4)" }}>{selectedPhone}</span>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
                    {chatMessages.length === 0 ? (
                      <div className="flex-1 flex items-center justify-center" style={{ color: "rgba(240,240,245,0.3)" }}><p className="text-sm">هنوز پیامی نیست</p></div>
                    ) : chatMessages.map(msg => (
                      <div key={msg.id} className={`flex ${msg.from === "admin" ? "justify-start" : "justify-end"}`}>
                        <div className="max-w-[70%] rounded-2xl px-4 py-2.5"
                          style={{ background: msg.from === "admin" ? "rgba(91,156,246,0.12)" : "rgba(255,255,255,0.07)", border: msg.from === "admin" ? "1px solid rgba(91,156,246,0.2)" : "1px solid rgba(255,255,255,0.1)" }}>
                          <p className="text-xs font-bold mb-1" style={{ color: msg.from === "admin" ? "#5B9CF6" : "rgba(240,240,245,0.5)" }}>
                            {msg.from === "admin" ? "شما (ادمین)" : selectedUser?.name}
                          </p>
                          <p className="text-sm">{msg.text}</p>
                          <p className="text-xs mt-1 opacity-50">{fmtTime(msg.createdAt)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 flex gap-2" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                    <input value={msgText} onChange={e => setMsgText(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMsg()}
                      placeholder="پیام به کاربر…"
                      className="flex-1 rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                      style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", color: "#f0f0f5" }} />
                    <button onClick={sendMsg} disabled={sending || !msgText.trim()}
                      className="px-5 rounded-xl font-bold text-sm transition-all hover:scale-105 disabled:opacity-40"
                      style={{ background: "linear-gradient(135deg,#5B9CF6,#2563EB)", color: "#fff" }}>
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
