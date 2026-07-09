"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function NotFound() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", color: "var(--fg)" }}
      className="flex flex-col items-center justify-center px-6 text-center">

      <style>{`
        @keyframes float404 {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .float404 { animation: float404 3s ease-in-out infinite; }
      `}</style>

      {/* Glow blob */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div style={{
          position: "absolute", top: "30%", left: "50%", transform: "translate(-50%,-50%)",
          width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(91,156,246,0.08) 0%, transparent 70%)",
        }} />
      </div>

      {/* 404 number */}
      <div className={`float404 font-extrabold select-none ${mounted ? "opacity-100" : "opacity-0"}`}
        style={{
          fontSize: "clamp(7rem,20vw,14rem)",
          lineHeight: 1,
          background: "linear-gradient(135deg,#5B9CF6,#3B82F6,#93C5FD)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          filter: "drop-shadow(0 0 60px rgba(91,156,246,0.25))",
          transition: "opacity .6s",
        }}>
        404
      </div>

      <h1 className="font-extrabold mt-4 mb-3" style={{ fontSize: "clamp(1.3rem,3vw,2rem)" }}>
        صفحه پیدا نشد
      </h1>
      <p className="text-sm mb-8 max-w-xs leading-relaxed" style={{ color: "var(--fg2)" }}>
        آدرسی که دنبالش بودی وجود نداره یا جابجا شده.
      </p>

      <div className="flex items-center gap-3 flex-wrap justify-center">
        <Link href="/"
          className="px-6 py-3 rounded-xl font-bold text-sm transition-all hover:scale-105"
          style={{ background: "#5B9CF6", color: "#03080F", boxShadow: "0 0 30px rgba(91,156,246,0.3)" }}>
          ← برگشت به خانه
        </Link>
        <Link href="/consult"
          className="px-6 py-3 rounded-xl font-bold text-sm transition-all hover:scale-105"
          style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--fg)" }}>
          مشاوره رایگان
        </Link>
      </div>
    </div>
  );
}
