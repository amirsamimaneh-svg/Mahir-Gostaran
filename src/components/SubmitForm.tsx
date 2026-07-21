"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { TextField, TextArea, SelectField } from "./FormFields";
import { IconArrow } from "./icons";

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

export default function SubmitForm() {
  const router = useRouter();
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

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
    setServerError("");
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
    setSubmitting(true);
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        router.push("/thank-you");
        return;
      }
      const json = await res.json().catch(() => ({}));
      if (json?.errors) setErrors(json.errors);
      else setServerError("ارسال با خطا مواجه شد. لطفاً دوباره تلاش کنید.");
      setSubmitting(false);
    } catch {
      setServerError("ارتباط با سرور برقرار نشد. اتصال اینترنت را بررسی کنید.");
      setSubmitting(false);
    }
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

      {serverError && (
        <p
          className="text-sm rounded-xl px-4 py-3"
          style={{ background: "rgba(240,120,120,0.08)", border: "1px solid rgba(240,120,120,0.3)", color: "#F0A6A6" }}
        >
          {serverError}
        </p>
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
      <p className="text-xs text-center" style={{ color: "var(--fg-dim)" }}>
        اطلاعات شما نزد ماهیر محفوظ است و فقط برای بررسی پروژه استفاده می‌شود.
      </p>
    </form>
  );
}
