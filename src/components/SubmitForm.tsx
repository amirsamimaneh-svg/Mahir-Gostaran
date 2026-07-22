"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { TextField, TextArea, SelectField } from "./FormFields";
import { IconArrow, IconWhatsApp } from "./icons";
import { CONTACT } from "@/data/contact";
import { FORMSPREE_ENDPOINT, isFormspreeConfigured } from "@/data/form";

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

/** پیام آماده برای ارسال از طریق واتساپ می‌سازد. */
function buildMessage(data: Record<string, string>): string {
  const lines = ["📌 درخواست پروژه‌ی جدید از سایت ماهیر", ""];
  for (const key of Object.keys(FIELD_LABELS)) {
    const v = data[key]?.trim();
    if (v) lines.push(`${FIELD_LABELS[key]}: ${v}`);
  }
  return lines.join("\n");
}

function whatsappUrl(data: Record<string, string>): string {
  return `${CONTACT.whatsapp}?text=${encodeURIComponent(buildMessage(data))}`;
}

export default function SubmitForm() {
  const router = useRouter();
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  // لینک واتساپ برای حالت پشتیبان (اگر ارسال Formspree ناموفق بود)
  const [waFallback, setWaFallback] = useState("");

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

  const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setWaFallback("");
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

    // اگر Formspree هنوز تنظیم نشده، مستقیماً از واتساپ استفاده کن
    // (در همان کلیک کاربر تا پاپ‌آپ مسدود نشود).
    if (!isFormspreeConfigured()) {
      setSubmitting(true);
      window.open(whatsappUrl(data), "_blank", "noopener,noreferrer");
      router.push("/thank-you");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...data, _subject: "درخواست پروژه‌ی جدید — ماهیر" }),
      });
      if (res.ok) {
        router.push("/thank-you");
        return;
      }
      setWaFallback(whatsappUrl(data));
    } catch {
      setWaFallback(whatsappUrl(data));
    }
    setSubmitting(false);
  };

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-3xl p-6 md:p-9 space-y-5"
      style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
    >
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

      {/* honeypot ضدّاسپم — کاربر واقعی آن را نمی‌بیند */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
      />

      {waFallback && (
        <div
          className="rounded-xl px-4 py-3 text-sm text-center space-y-2"
          style={{ background: "rgba(240,120,120,0.08)", border: "1px solid rgba(240,120,120,0.3)" }}
        >
          <p style={{ color: "#F0A6A6" }}>
            ارسال با مشکل مواجه شد. می‌توانید همین درخواست را مستقیماً در واتساپ برای ما بفرستید:
          </p>
          <a
            href={waFallback}
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost w-full"
            onClick={() => router.push("/thank-you")}
          >
            ارسال در واتساپ
            <IconWhatsApp width={18} height={18} />
          </a>
        </div>
      )}

      <button type="submit" className="btn btn-gold w-full text-base py-4" disabled={submitting}>
        {submitting ? (
          "در حال ارسال…"
        ) : (
          <>
            ثبت درخواست و دریافت مشاوره
            <IconArrow width={18} height={18} />
          </>
        )}
      </button>
      <p className="text-xs text-center leading-relaxed" style={{ color: "var(--fg-dim)" }}>
        اطلاعات شما نزد ماهیر محفوظ است و فقط برای بررسی پروژه استفاده می‌شود.
      </p>
    </form>
  );
}
