"use client";

import { useState, useRef, useEffect } from "react";

export type ChatMessage = {
  id: string;
  from: "admin" | "user";
  type: "text" | "image" | "voice";
  text: string;
  fileUrl?: string;
  duration?: number;
  createdAt: string;
};

type Props = {
  messages: ChatMessage[];
  myRole: "admin" | "user";
  myName: string;
  otherName: string;
  onSendText: (text: string) => Promise<void>;
  onSendMedia: (url: string, type: "image" | "voice", duration?: number) => Promise<void>;
  onRefresh: () => void;
  uploadUrl?: string;
};

const BLUE = "#5B9CF6";
const BLUE2 = "#2563EB";

function fmtTime(iso: string) {
  return new Date(iso).toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" });
}

function fmtDur(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

/* ── Voice Player ─────────────────────────────────────── */
function VoicePlayer({ url, duration }: { url: string; duration?: number }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [current, setCurrent] = useState(0);
  const [total, setTotal] = useState(duration ?? 0);

  function toggle() {
    const a = audioRef.current;
    if (!a) return;
    if (playing) { a.pause(); setPlaying(false); }
    else { a.play(); setPlaying(true); }
  }

  const BARS = [3, 5, 8, 12, 16, 20, 24, 20, 16, 12, 8, 14, 20, 24, 20, 14, 8, 12, 16, 20, 16, 12, 8, 5, 10, 16, 10, 5];

  return (
    <div className="flex items-center gap-3" style={{ minWidth: "200px" }}>
      <audio ref={audioRef} src={url} preload="metadata"
        onTimeUpdate={e => { const a = e.currentTarget; setCurrent(a.currentTime); setProgress(a.duration ? a.currentTime / a.duration : 0); }}
        onLoadedMetadata={e => setTotal(Math.round(e.currentTarget.duration))}
        onEnded={() => { setPlaying(false); setProgress(0); setCurrent(0); if (audioRef.current) audioRef.current.currentTime = 0; }} />
      <button onClick={toggle}
        className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all hover:scale-110"
        style={{ background: `linear-gradient(135deg,${BLUE},${BLUE2})`, boxShadow: `0 4px 16px rgba(91,156,246,0.4)` }}>
        {playing
          ? <svg width="10" height="12" viewBox="0 0 10 12" fill="white"><rect x="0" y="0" width="3.5" height="12" rx="1"/><rect x="6.5" y="0" width="3.5" height="12" rx="1"/></svg>
          : <svg width="10" height="12" viewBox="0 0 10 12" fill="white"><path d="M1 0l9 6-9 6V0z"/></svg>
        }
      </button>
      <div className="flex-1">
        <div className="flex items-center gap-[2px] h-8 cursor-pointer"
          onClick={e => {
            const rect = e.currentTarget.getBoundingClientRect();
            const r = (e.clientX - rect.left) / rect.width;
            if (audioRef.current?.duration) audioRef.current.currentTime = r * audioRef.current.duration;
          }}>
          {BARS.map((h, i) => (
            <div key={i} className="flex-1 rounded-full transition-colors duration-150"
              style={{ height: `${h}px`, background: i / BARS.length < progress ? BLUE : "rgba(255,255,255,0.18)", minWidth: "2px" }} />
          ))}
        </div>
        <p className="text-[10px] mt-0.5" style={{ color: "rgba(240,240,245,0.4)" }}>{fmtDur(Math.round(current))} / {fmtDur(total)}</p>
      </div>
    </div>
  );
}

/* ── Image Bubble ─────────────────────────────────────── */
function ImageBubble({ url, caption }: { url: string; caption?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="rounded-xl overflow-hidden cursor-pointer" style={{ maxWidth: "260px" }} onClick={() => setOpen(true)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={url} alt="" className="w-full object-cover transition-transform hover:scale-[1.02]" style={{ maxHeight: "220px" }} />
        {caption && <p className="text-sm px-1 pt-1.5" style={{ color: "rgba(240,240,245,0.8)" }}>{caption}</p>}
      </div>
      {open && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/85 backdrop-blur-sm cursor-pointer" onClick={() => setOpen(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt="" className="max-w-[92vw] max-h-[92vh] rounded-2xl object-contain" onClick={e => e.stopPropagation()} />
          <button className="absolute top-5 left-5 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white text-xl hover:bg-white/20">✕</button>
        </div>
      )}
    </>
  );
}

/* ── Input Bar ────────────────────────────────────────── */
function InputBar({ onSendText, onSendMedia, uploadUrl }: { onSendText: (t: string) => Promise<void>; onSendMedia: (url: string, type: "image" | "voice", dur?: number) => Promise<void>; uploadUrl: string }) {
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [recording, setRecording] = useState(false);
  const [recSec, setRecSec] = useState(0);
  const [status, setStatus] = useState("");
  const mediaRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const taRef = useRef<HTMLTextAreaElement>(null);

  async function upload(file: File): Promise<string | null> {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch(uploadUrl, { method: "POST", body: fd });
    const data = await res.json();
    return data.url ?? null;
  }

  async function sendText() {
    if (!text.trim() || busy) return;
    setBusy(true);
    await onSendText(text.trim());
    setText(""); setBusy(false);
    if (taRef.current) { taRef.current.style.height = "auto"; }
  }

  async function handleImagePick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true); setStatus("در حال آپلود تصویر…");
    const url = await upload(file);
    if (url) await onSendMedia(url, "image");
    setBusy(false); setStatus("");
    if (fileRef.current) fileRef.current.value = "";
  }

  async function startRec() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      chunksRef.current = [];
      const mr = new MediaRecorder(stream);
      mr.ondataavailable = e => { if (e.data.size > 0) chunksRef.current.push(e.data); };
      mr.onstop = async () => {
        stream.getTracks().forEach(t => t.stop());
        const dur = recSec;
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        const file = new File([blob], "voice.webm", { type: "audio/webm" });
        setBusy(true); setStatus("در حال آپلود ویس…");
        const url = await upload(file);
        if (url) await onSendMedia(url, "voice", dur);
        setBusy(false); setStatus(""); setRecSec(0);
      };
      mr.start();
      mediaRef.current = mr;
      setRecording(true);
      timerRef.current = setInterval(() => setRecSec(s => s + 1), 1000);
    } catch { alert("دسترسی به میکروفون رد شد."); }
  }

  function stopRec() {
    mediaRef.current?.stop();
    if (timerRef.current) clearInterval(timerRef.current);
    setRecording(false);
  }

  function cancelRec() {
    if (mediaRef.current?.state === "recording") {
      mediaRef.current.ondataavailable = null;
      mediaRef.current.onstop = null;
      mediaRef.current.stop();
    }
    if (timerRef.current) clearInterval(timerRef.current);
    chunksRef.current = [];
    setRecording(false); setRecSec(0);
  }

  return (
    <div className="flex flex-col gap-2 p-3 flex-shrink-0" style={{ background: "rgba(5,5,15,0.95)", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
      {status && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium" style={{ background: "rgba(91,156,246,0.08)", border: "1px solid rgba(91,156,246,0.2)", color: "#5B9CF6" }}>
          <span className="w-3 h-3 border border-[#5B9CF6] border-t-transparent rounded-full animate-spin flex-shrink-0" />
          {status}
        </div>
      )}

      {recording ? (
        <div className="flex items-center gap-2">
          <button onClick={cancelRec}
            className="w-10 h-10 rounded-2xl flex items-center justify-center transition-all hover:scale-110 flex-shrink-0"
            style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#f87171" }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><path d="M1.5 1.5l9 9M10.5 1.5l-9 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
          <div className="flex-1 flex items-center gap-3 px-4 py-2.5 rounded-2xl" style={{ background: "rgba(91,156,246,0.07)", border: "1px solid rgba(91,156,246,0.2)" }}>
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse flex-shrink-0" />
            <span className="text-sm font-bold" style={{ color: "#5B9CF6" }}>در حال ضبط…</span>
            <span className="font-mono text-sm mr-auto" style={{ color: "rgba(240,240,245,0.5)" }}>{fmtDur(recSec)}</span>
          </div>
          <button onClick={stopRec}
            className="w-10 h-10 rounded-2xl flex items-center justify-center transition-all hover:scale-110 flex-shrink-0"
            style={{ background: `linear-gradient(135deg,${BLUE},${BLUE2})`, boxShadow: `0 4px 16px rgba(91,156,246,0.4)` }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="white"><rect x="1" y="1" width="10" height="10" rx="2"/></svg>
          </button>
        </div>
      ) : (
        <div className="flex items-end gap-2">
          {/* Image picker */}
          <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/gif,image/webp" className="hidden" onChange={handleImagePick} />
          <button onClick={() => fileRef.current?.click()} disabled={busy}
            className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all hover:scale-110 disabled:opacity-40"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect x="2" y="3" width="14" height="12" rx="2.5" stroke="rgba(240,240,245,0.45)" strokeWidth="1.4"/>
              <circle cx="6.5" cy="7.5" r="1.5" stroke="rgba(240,240,245,0.45)" strokeWidth="1.4"/>
              <path d="M2 13l4-4 3 3 2-2 5 5" stroke="rgba(240,240,245,0.45)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Text */}
          <textarea ref={taRef} value={text}
            onChange={e => { setText(e.target.value); e.target.style.height = "auto"; e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px"; }}
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendText(); } }}
            placeholder="پیام بنویسید…" rows={1} disabled={busy}
            className="flex-1 rounded-2xl px-4 py-2.5 text-sm focus:outline-none resize-none"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.09)", color: "#f0f0f5", lineHeight: "1.6", maxHeight: "120px", overflowY: "auto" }} />

          {/* Send / Mic */}
          {text.trim() ? (
            <button onClick={sendText} disabled={busy}
              className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all hover:scale-110 disabled:opacity-40"
              style={{ background: `linear-gradient(135deg,${BLUE},${BLUE2})`, boxShadow: `0 4px 16px rgba(91,156,246,0.3)` }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2L7 9M14 2l-4 12-3-5-5-3 12-4z"/>
              </svg>
            </button>
          ) : (
            <button onClick={startRec} disabled={busy}
              className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all hover:scale-110 disabled:opacity-40"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="rgba(240,240,245,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="1" width="6" height="9" rx="3"/>
                <path d="M2 8c0 3.3 2.7 6 6 6s6-2.7 6-6M8 14v1.5"/>
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
}

/* ── ChatWindow ───────────────────────────────────────── */
export default function ChatWindow({ messages, myRole, myName, otherName, onSendText, onSendMedia, onRefresh, uploadUrl = "/api/upload" }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 80);
  }, [messages]);

  return (
    <div className="flex flex-col h-full" style={{ background: "#05050f" }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-3.5 flex-shrink-0"
        style={{ background: "rgba(91,156,246,0.04)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-base"
          style={{ background: `linear-gradient(135deg,${BLUE},${BLUE2})`, color: "#fff", boxShadow: `0 4px 16px rgba(91,156,246,0.3)` }}>
          {otherName.charAt(0)}
        </div>
        <div>
          <p className="font-bold text-sm text-white">{otherName}</p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-bold text-emerald-400">آنلاین</span>
          </div>
        </div>
        <button onClick={onRefresh}
          className="mr-auto text-xs px-3 py-1.5 rounded-xl transition-all hover:text-[#5B9CF6]"
          style={{ border: "1px solid rgba(255,255,255,0.08)", color: "rgba(240,240,245,0.3)" }}>↻</button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-5 flex flex-col gap-1">
        {messages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 py-16 text-center">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ background: "rgba(91,156,246,0.07)", border: "1px solid rgba(91,156,246,0.12)" }}>
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="rgba(91,156,246,0.5)" strokeWidth="1.5">
                <path d="M3 5A2.5 2.5 0 015.5 2.5h17A2.5 2.5 0 0125 5v11a2.5 2.5 0 01-2.5 2.5H16l-5 5v-5H5.5A2.5 2.5 0 013 16V5z" strokeLinejoin="round"/>
              </svg>
            </div>
            <p className="font-bold text-white">هنوز پیامی نیست</p>
            <p className="text-sm" style={{ color: "rgba(240,240,245,0.3)" }}>سوال یا درخواستی دارید؟ بنویسید!</p>
          </div>
        ) : messages.map((msg, i) => {
          const isMe = msg.from === myRole;
          const prev = messages[i - 1];
          const next = messages[i + 1];
          const sameGroup = prev?.from === msg.from;
          const lastInGroup = !next || next.from !== msg.from ||
            new Date(next.createdAt).getTime() - new Date(msg.createdAt).getTime() > 120_000;

          return (
            <div key={msg.id} className={`flex gap-2 ${isMe ? "flex-row-reverse" : "flex-row"} ${sameGroup ? "mt-0.5" : "mt-3"}`}>
              {/* Avatar col */}
              <div className="w-8 flex-shrink-0 flex items-end">
                {lastInGroup && (
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black"
                    style={isMe
                      ? { background: "rgba(255,255,255,0.07)", color: "rgba(240,240,245,0.4)" }
                      : { background: `linear-gradient(135deg,${BLUE},${BLUE2})`, color: "#fff" }}>
                    {isMe ? myName.charAt(0) : otherName.charAt(0)}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className={`flex flex-col ${isMe ? "items-end" : "items-start"}`} style={{ maxWidth: "72%" }}>
                <div className="rounded-2xl px-3.5 py-2.5 transition-all"
                  style={{
                    background: isMe ? "rgba(255,255,255,0.07)" : "rgba(91,156,246,0.11)",
                    border: isMe ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(91,156,246,0.22)",
                    borderBottomRightRadius: isMe && lastInGroup ? "6px" : undefined,
                    borderBottomLeftRadius: !isMe && lastInGroup ? "6px" : undefined,
                  }}>
                  {msg.type === "image" && msg.fileUrl
                    ? <ImageBubble url={msg.fileUrl} caption={msg.text || undefined} />
                    : msg.type === "voice" && msg.fileUrl
                    ? <VoicePlayer url={msg.fileUrl} duration={msg.duration} />
                    : <p className="text-sm leading-relaxed text-white whitespace-pre-wrap">{msg.text}</p>
                  }
                </div>
                {lastInGroup && (
                  <p className="text-[10px] mt-1 px-0.5" style={{ color: "rgba(240,240,245,0.2)" }}>{fmtTime(msg.createdAt)}</p>
                )}
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      <InputBar onSendText={onSendText} onSendMedia={onSendMedia} uploadUrl={uploadUrl} />
    </div>
  );
}
