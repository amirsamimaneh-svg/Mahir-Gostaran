"use client";

import { useState } from "react";
import { IconCheck } from "./icons";

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — ignore */
    }
  };

  return (
    <button
      type="button"
      onClick={onCopy}
      className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors shrink-0"
      style={{
        border: "1px solid var(--border-strong)",
        color: copied ? "#8FD9A8" : "var(--gold-bright)",
        background: "var(--gold-soft)",
      }}
      aria-label="کپی پرامپت"
    >
      {copied ? (
        <>
          <IconCheck width={14} height={14} />
          کپی شد
        </>
      ) : (
        "کپی پرامپت"
      )}
    </button>
  );
}
