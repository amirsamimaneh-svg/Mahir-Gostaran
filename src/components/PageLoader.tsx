"use client";

import { useEffect, useState } from "react";

export default function PageLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 1400);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
      style={{
        background: "#030D0A",
        animation: "loaderFade 0.5s ease 0.9s both",
      }}
    >
      <div className="relative flex items-center justify-center mb-6">
        {/* spinning ring */}
        <div
          className="absolute w-20 h-20 rounded-full"
          style={{
            border: "2px solid transparent",
            borderTopColor: "#00E5A0",
            borderRightColor: "#00FFD1",
            animation: "spin 0.8s linear infinite",
          }}
        />
        {/* logo */}
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center font-extrabold text-xl"
          style={{ background: "linear-gradient(135deg,#00E5A0,#00C990)", color: "#030D0A" }}
        >
          M
        </div>
      </div>
      <p className="text-sm font-bold tracking-widest" style={{ color: "#00E5A0" }}>
        ماهیر
      </p>
      <style>{`
        @keyframes loaderFade { to { opacity:0; pointer-events:none; } }
        @keyframes spin { to { transform:rotate(360deg); } }
      `}</style>
    </div>
  );
}
