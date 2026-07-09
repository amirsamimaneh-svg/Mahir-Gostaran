import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") ?? "ماهیر — مشاور رشد کسب‌وکار";
  const sub = searchParams.get("sub") ?? "استراتژی · برندینگ · دیجیتال مارکتینگ · هوش مصنوعی";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#080E18",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background glow */}
        <div style={{
          position: "absolute",
          top: -100,
          left: "50%",
          transform: "translateX(-50%)",
          width: 800,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(91,156,246,0.15) 0%, transparent 70%)",
        }} />

        {/* Grid lines */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "linear-gradient(rgba(91,156,246,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(91,156,246,0.05) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />

        {/* Logo */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginBottom: 40,
        }}>
          <div style={{
            width: 56,
            height: 56,
            borderRadius: 14,
            background: "linear-gradient(135deg, #5B9CF6, #3B82F6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28,
            fontWeight: 900,
            color: "#03080F",
          }}>M</div>
          <span style={{ fontSize: 32, fontWeight: 900, color: "#5B9CF6", letterSpacing: 4 }}>Mahir</span>
        </div>

        {/* Title */}
        <div style={{
          fontSize: 48,
          fontWeight: 900,
          color: "#D8E5F5",
          textAlign: "center",
          maxWidth: 900,
          lineHeight: 1.2,
          marginBottom: 20,
          padding: "0 40px",
        }}>{title}</div>

        {/* Subtitle */}
        <div style={{
          fontSize: 22,
          color: "#6B84A8",
          textAlign: "center",
        }}>{sub}</div>

        {/* Bottom bar */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 4,
          background: "linear-gradient(90deg, #3B82F6, #5B9CF6, #93C5FD)",
        }} />
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
