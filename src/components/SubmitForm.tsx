"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { TextField, TextArea, SelectField } from "./FormFields";
import { IconArrow, IconChat, IconCheck } from "./icons";
import { CONTACT } from "@/data/contact";

const BUSINESS_FIELDS = [
  "فروشگاهی",
  "خدماتی",
  "آموزشی",
  "زیبایی و سلامت",
  "غذایی",
  "سایر",
];

const BUDGETS = [
  "زیر ۵ میلیون تومان",
  "۵ تا ۱۵ میلیون تومان",
  "۱۵ تا ۳۰ میلیون تومان",
  "۳۰ تا ۶۰ میلیون تومان",
  "بالای ۶۰ میلیون تومان",
  "هنوز مشخص نیست",
];

const IR_MOBILE = /^0?9\d{9}$/;

type Errors = Partial<Record<string, string>>;

const FIELD_LABELS: Record<string, string> = {
  fullName: "نام و نام خانوادگی",
  mobile: "شماره موبایل",
  instagram: "اینستاگرام / پیج",
  website: "وب‌سایت",
  businessField: "حوزه فعالیت",
  currentStatus: "وضعیت فعلی",
  biggestProblem: "بزرگ‌ترین مشکل",
  goal: "هدف از همکاری",
  budget: "بودجه ماهانه",
};

/** اطلاعات فرم را به یک متن مرتب و خوانا تبدیل می‌کند. */
function buildMessage(data: Record<string, string>): string {
  const lines = ["📌 درخواست پروژه‌ی جدید از سایت ماهیر", ""];
  for (const key of Object.keys(FIELD_LABELS)) {
    const v = data[key]?.trim();
    if (v) lines.push(`• ${FIELD_LABELS[key]}: ${v}`);
  }
  return lines.join("\n");
}

const MESSENGERS = [
  { key: "rubika", label: "روبیکا", href: CONTACT.rubika, accent: "#7C4DFF" },
  { key: "bale", label: "بله", href: CONTACT.bale, accent: "#22B573" },
  { key: "soroush", label: "سروش", href: CONTACT.soroush, accent: "#1E9BE9" },
] as const;

/** کپی متن در کلیپبورد با fallback برای مرورگرهای قدیمی‌تر. */
async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* به fallback می‌رویم */
  }
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

export default function SubmitForm() {
  const [mode, setMode] = useState<"form" | "choose">("form");
  const [errors, setErrors] = useState<Errors>({});
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [sentVia, setSentVia] = useState<string | null>(null);

  const validate = (data: Record<string, string>): Errors => {
    const e: Errors = {};
    if (!data.fullName?.trim()) e.fullName = "نام و نام خانوادگی الزامی است.";
    if (!data.mobile?.trim()) e.mobile = "شماره موبایل الزامی است.";
    else if (!IR_MOBILE.test(data.mobile.trim().replace(/[\s-]/g, "")))
      e.mobile = "شماره موبایل معتبر نیست (مثال: ۰۹۱۲۰۰۰۰۰۰۰).";
    if (!data.instagram?.trim()) e.instagram = "آیدی اینستاگرام یا لینک پیج الزامی است.";
    if (!data.businessField?.trim()) e.businessField = "حوزه فعالیت را انتخاب کنید.";
    return e;
  };

  const onSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const fd = new FormData(ev.currentTarget);
    const data = Object.fromEntries(
      Array.from(fd.entries()).map(([k, v]) => [k, String(v)])
    ) as Record<string, string>;

    const clientErrors = validate(data);
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      const firstKey = Object.keys(clientErrors)[0];
      document.getElementById(firstKey)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setErrors({});
    setMessage(buildMessage(data));
    setCopied(false);
    setSentVia(null);
    setMode("choose");
    document.getElementById("submit-card")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const pickMessenger = async (m: (typeof MESSENGERS)[number]) => {
    const ok = await copyText(message);
    setCopied(ok);
    setSentVia(m.label);
    window.open(m.href, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      id="submit-card"
      className="rounded-3xl p-6 md:p-9"
      style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
    >
      {/* مرحله‌ی اول: فرم — همیشه mount می‌ماند تا مقادیر با «بازگشت» حفظ شوند */}
      <form onSubmit={onSubmit} noValidate className="space-y-5" hidden={mode !== "form"}>
        <div className="grid sm:grid-cols-2 gap-5">
          <TextField
            id="fullName"
            name="fullName"
            label="نام و نام خانوادگی"
            placeholder="مثلاً امیر رضایی"
            required
            error={errors.fullName}
          />
          <TextField
            id="mobile"
            name="mobile"
            label="شماره موبایل"
            type="tel"
            inputMode="numeric"
            placeholder="۰۹۱۲۰۰۰۰۰۰۰"
            required
            error={errors.mobile}
          />
          <TextField
            id="instagram"
            name="instagram"
            label="آیدی اینستاگرام یا لینک پیج"
            placeholder="@yourbrand یا instagram.com/yourbrand"
            required
            error={errors.instagram}
          />
          <TextField
            id="website"
            name="website"
            label="لینک وب‌سایت (اختیاری)"
            placeholder="https://example.com"
            error={errors.website}
          />
        </div>

        <SelectField
          id="businessField"
          name="businessField"
          label="حوزه فعالیت کسب‌وکار"
          placeholder="یک گزینه را انتخاب کنید"
          options={BUSINESS_FIELDS}
          required
          error={errors.businessField}
        />

        <TextArea
          id="currentStatus"
          name="currentStatus"
          label="وضعیت فعلی کسب‌وکارتان را توضیح دهید"
          placeholder="چند وقت است فعالیت می‌کنید؟ الان در چه وضعیتی هستید؟"
        />
        <TextArea
          id="biggestProblem"
          name="biggestProblem"
          label="بزرگ‌ترین مشکل فعلی کسب‌وکار شما چیست؟"
          placeholder="مثلاً مشتری کم، فروش پایین، نبود هویت برند…"
        />
        <TextArea
          id="goal"
          name="goal"
          label="هدف شما از همکاری با ماهیر چیست؟"
          placeholder="به کجا می‌خواهید برسید؟"
        />

        <SelectField
          id="budget"
          name="budget"
          label="بودجه تقریبی ماهانه برای رشد (اختیاری)"
          placeholder="یک بازه را انتخاب کنید"
          options={BUDGETS}
        />

        <button type="submit" className="btn btn-gold w-full text-base py-4">
          ثبت درخواست و انتخاب پیام‌رسان
          <IconArrow width={18} height={18} />
        </button>
        <p className="text-xs text-center leading-relaxed" style={{ color: "var(--fg-dim)" }}>
          در مرحله‌ی بعد، پیام‌رسان دلخواه‌تان (روبیکا، بله یا سروش) را انتخاب می‌کنید. اطلاعات شما محفوظ است.
        </p>
      </form>

      {/* مرحله‌ی دوم: انتخاب پیام‌رسان */}
      {mode === "choose" && (
        <div>
          <div className="text-center">
            <span
              className="mx-auto w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{
                background: "var(--gold-soft)",
                border: "1px solid var(--border-strong)",
                color: "var(--gold-bright)",
              }}
            >
              <IconChat width={26} height={26} />
            </span>
            <h3 className="mt-4 text-xl md:text-2xl font-extrabold leading-tight">
              از طریق کدام پیام‌رسان می‌خواهید پروژه را ارسال کنید؟
            </h3>
            <p className="mt-2 text-sm leading-loose" style={{ color: "var(--fg-muted)" }}>
              متن درخواست شما آماده است. یک پیام‌رسان را انتخاب کنید؛ متن به‌صورت خودکار{" "}
              <span style={{ color: "var(--gold-bright)" }}>کپی</span> می‌شود و کافی است در چت آن را
              جای‌گذاری (Paste) و ارسال کنید.
            </p>
          </div>

          {/* پیش‌نمایش متن */}
          <div className="mt-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold" style={{ color: "var(--fg-muted)" }}>
                متن درخواست شما
              </span>
              <button
                type="button"
                onClick={async () => setCopied(await copyText(message))}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
                style={{
                  border: "1px solid var(--border-strong)",
                  color: copied ? "#8FD9A8" : "var(--gold-bright)",
                  background: "var(--gold-soft)",
                }}
              >
                {copied ? "کپی شد ✓" : "کپی متن"}
              </button>
            </div>
            <pre
              dir="rtl"
              className="text-xs leading-relaxed rounded-xl p-3 max-h-40 overflow-y-auto whitespace-pre-wrap"
              style={{ background: "var(--bg)", border: "1px solid var(--border)", color: "var(--fg-muted)" }}
            >
              {message}
            </pre>
          </div>

          {/* دکمه‌های پیام‌رسان */}
          <div className="mt-5 space-y-3">
            {MESSENGERS.map((m) => (
              <button
                key={m.key}
                type="button"
                onClick={() => pickMessenger(m)}
                className="w-full flex items-center gap-3.5 rounded-2xl px-5 py-4 transition-transform hover:-translate-y-0.5"
                style={{ background: "var(--bg)", border: "1px solid var(--border-strong)" }}
              >
                <span
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${m.accent}22`, color: m.accent }}
                >
                  <IconChat width={20} height={20} />
                </span>
                <span className="font-bold text-base" style={{ color: "var(--fg)" }}>
                  ارسال از طریق {m.label}
                </span>
                <span className="ms-auto" style={{ color: "var(--fg-dim)" }}>
                  <IconArrow width={18} height={18} />
                </span>
              </button>
            ))}
          </div>

          {/* تأیید بعد از انتخاب */}
          {sentVia && (
            <div
              className="mt-5 rounded-2xl p-4 text-center"
              style={{ background: "var(--gold-soft)", border: "1px solid var(--border-strong)" }}
            >
              <p className="text-sm font-semibold flex items-center justify-center gap-2" style={{ color: "var(--fg)" }}>
                <IconCheck width={16} height={16} />
                {sentVia} باز شد{copied ? " و متن کپی شد" : ""}
              </p>
              <p className="mt-1.5 text-xs leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                {copied
                  ? "در چت پیام‌رسان، متن را جای‌گذاری (Paste) و ارسال کنید."
                  : "متن کپی نشد؛ با دکمه‌ی «کپی متن» بالا آن را کپی و در چت جای‌گذاری کنید."}
              </p>
              <Link href="/" className="btn btn-ghost mt-4 text-sm">
                بازگشت به صفحه اصلی
              </Link>
            </div>
          )}

          <button
            type="button"
            onClick={() => setMode("form")}
            className="mt-5 w-full text-sm font-medium py-2 transition-colors"
            style={{ color: "var(--fg-muted)" }}
          >
            ← بازگشت و ویرایش فرم
          </button>
        </div>
      )}
    </div>
  );
}
