"use client";

import { useState } from "react";
import Link from "next/link";
import { useLang } from "@/context/LangContext";
import MahirLogo from "@/components/MahirLogo";

const SERVICES = {
  fa: ["استراتژی رشد", "هویت برند", "بازاریابی دیجیتال", "هوش مصنوعی", "سئو و محتوا", "ترکیب چند خدمت"],
  en: ["Growth Strategy", "Brand Identity", "Digital Marketing", "AI Solutions", "SEO & Content", "Multiple Services"],
};

const BUDGETS = {
  fa: ["زیر ۵ میلیون", "۵ تا ۲۰ میلیون", "۲۰ تا ۵۰ میلیون", "بالای ۵۰ میلیون", "هنوز مطمئن نیستم"],
  en: ["Under $500", "$500–$2k", "$2k–$5k", "Above $5k", "Not sure yet"],
};

const TIMELINES = {
  fa: ["فوری (کمتر از ۲ هفته)", "۱ ماه", "۲ تا ۳ ماه", "بلندمدت"],
  en: ["Urgent (under 2 weeks)", "1 month", "2–3 months", "Long-term"],
};

const tx = {
  fa: {
    title: "ثبت درخواست پروژه",
    sub: "اطلاعات پروژه‌ات را کامل وارد کن — ظرف ۲۴ ساعت با تو تماس می‌گیریم.",
    name: "نام کامل", namePh: "مثلاً: علی رضایی",
    phone: "شماره موبایل", phonePh: "09xxxxxxxxx",
    business: "نام کسب‌وکار", businessPh: "مثلاً: کافه رزتا (اختیاری)",
    service: "خدمت مورد نیاز",
    budget: "بودجه تقریبی",
    timeline: "زمان‌بندی مورد نظر",
    goal: "هدف اصلی پروژه", goalPh: "مثلاً: افزایش فروش، جذب مشتری جدید، راه‌اندازی برند…",
    desc: "توضیحات پروژه", descPh: "هر چه بیشتر توضیح بدی، بهتر می‌تونیم کمک کنیم...",
    submit: "ارسال درخواست ←",
    sending: "در حال ارسال…",
    successTitle: "درخواست شما ثبت شد!",
    successSub: "تیم ماهیر ظرف ۲۴ ساعت با شما تماس می‌گیرد.",
    back: "← برگشت به خانه",
    required: "این فیلد اجباری است",
  },
  en: {
    title: "Submit Project Request",
    sub: "Fill in your project details — we'll get back to you within 24 hours.",
    name: "Full Name", namePh: "e.g. John Smith",
    phone: "Phone Number", phonePh: "09xxxxxxxxx",
    business: "Business Name", businessPh: "e.g. Rosetta Café (optional)",
    service: "Service Needed",
    budget: "Approximate Budget",
    timeline: "Preferred Timeline",
    goal: "Main Project Goal", goalPh: "e.g. Increase sales, attract new customers, launch a brand…",
    desc: "Project Description", descPh: "The more detail you give, the better we can help…",
    submit: "Submit Request →",
    sending: "Sending…",
    successTitle: "Request Submitted!",
    successSub: "The Mahir team will contact you within 24 hours.",
    back: "← Back to Home",
    required: "This field is required",
  },
};

export default function ProjectPage() {
  const { lang, isRtl, cycle } = useLang();
  const l = tx[lang as keyof typeof tx] ?? tx.fa;
  const services = SERVICES[lang as keyof typeof SERVICES] ?? SERVICES.fa;
  const budgets = BUDGETS[lang as keyof typeof BUDGETS] ?? BUDGETS.fa;
  const timelines = TIMELINES[lang as keyof typeof TIMELINES] ?? TIMELINES.fa;

  const [form, setForm] = useState({ name: "", phone: "", business: "", service: "", budget: "", timeline: "", goal: "", description: "" });
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const set = (k: string, v: string) => {
    setForm(f => ({ ...f, [k]: v }));
    setErrors(e => ({ ...e, [k]: false }));
  };

  async function submit() {
    const errs: Record<string, boolean> = {};
    if (!form.name.trim()) errs.name = true;
    if (!form.phone.trim()) errs.phone = true;
    if (!form.service) errs.service = true;
    if (!form.description.trim()) errs.description = true;
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    try {
      const res = await fetch("/api/project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) setDone(true);
    } finally {
      setLoading(false);
    }
  }

  const inputStyle = (err?: boolean) => ({
    background: "rgba(255,255,255,0.05)",
    border: `1px solid ${err ? "rgba(239,68,68,0.6)" : "rgba(255,255,255,0.1)"}`,
    color: "#f0f0f5",
  });

  return (
    <div dir={isRtl ? "rtl" : "ltr"} lang={lang} className="min-h-screen" style={{ background: "#05050f" }}>

      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 z-50" style={{ background: "rgba(5,5,15,0.95)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(91,156,246,0.1)" }}>
        <div className="max-w-4xl mx-auto flex items-center justify-between px-6 h-[68px]">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg,rgba(91,156,246,0.2),rgba(37,99,235,0.1))", border: "1.5px solid rgba(91,156,246,0.35)" }}>
              <MahirLogo size={22} />
            </div>
            <span className="font-black tracking-widest" style={{ fontSize: "1.1rem", color: "#5B9CF6" }}>ماهیر</span>
          </Link>
          <button onClick={cycle} className="text-xs px-3 py-2 rounded-xl font-bold transition-all" style={{ border: "1px solid rgba(255,255,255,0.1)", color: "rgba(216,229,245,0.5)" }}>
            {lang === "fa" ? "EN" : "فا"}
          </button>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 pt-28 pb-20">

        {/* Header */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5" style={{ background: "rgba(91,156,246,0.08)", border: "1px solid rgba(91,156,246,0.2)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#5B9CF6] animate-pulse" />
            <span className="text-xs text-[#5B9CF6] tracking-widest font-bold">PROJECT REQUEST</span>
          </div>
          <h1 className="font-extrabold text-3xl mb-3" style={{ color: "#f0f0f5" }}>{l.title}</h1>
          <p className="text-sm leading-relaxed" style={{ color: "rgba(240,240,245,0.5)" }}>{l.sub}</p>
        </div>

        {done ? (
          <div className="text-center rounded-3xl p-12" style={{ background: "rgba(91,156,246,0.06)", border: "1px solid rgba(91,156,246,0.2)" }}>
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5 text-4xl" style={{ background: "rgba(91,156,246,0.15)" }}>✦</div>
            <h2 className="font-extrabold text-2xl text-[#5B9CF6] mb-3">{l.successTitle}</h2>
            <p className="text-sm mb-8" style={{ color: "rgba(240,240,245,0.55)" }}>{l.successSub}</p>
            <Link href="/" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm" style={{ background: "linear-gradient(135deg,#5B9CF6,#2563EB)", color: "#fff" }}>
              {l.back}
            </Link>
          </div>
        ) : (
          <div className="rounded-3xl p-8 flex flex-col gap-6" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>

            {/* Row 1: name + phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label={l.name} error={errors.name} hint={l.required}>
                <input value={form.name} onChange={e => set("name", e.target.value)} placeholder={l.namePh}
                  className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none"
                  style={inputStyle(errors.name)} />
              </Field>
              <Field label={l.phone} error={errors.phone} hint={l.required}>
                <input value={form.phone} onChange={e => set("phone", e.target.value)} placeholder={l.phonePh} dir="ltr"
                  className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none"
                  style={inputStyle(errors.phone)} />
              </Field>
            </div>

            {/* Business */}
            <Field label={l.business}>
              <input value={form.business} onChange={e => set("business", e.target.value)} placeholder={l.businessPh}
                className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none"
                style={inputStyle()} />
            </Field>

            {/* Service chips */}
            <Field label={l.service} error={errors.service} hint={l.required}>
              <div className="flex flex-wrap gap-2 mt-1">
                {services.map(s => (
                  <button key={s} type="button" onClick={() => set("service", s)}
                    className="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
                    style={{
                      background: form.service === s ? "linear-gradient(135deg,#5B9CF6,#2563EB)" : "rgba(255,255,255,0.05)",
                      color: form.service === s ? "#fff" : "rgba(240,240,245,0.55)",
                      border: `1px solid ${form.service === s ? "transparent" : "rgba(255,255,255,0.09)"}`,
                    }}>
                    {s}
                  </button>
                ))}
              </div>
            </Field>

            {/* Budget + Timeline */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label={l.budget}>
                <div className="flex flex-col gap-2 mt-1">
                  {budgets.map(b => (
                    <button key={b} type="button" onClick={() => set("budget", b)}
                      className="text-sm px-4 py-2.5 rounded-xl font-medium text-start transition-all"
                      style={{
                        background: form.budget === b ? "rgba(91,156,246,0.15)" : "rgba(255,255,255,0.04)",
                        color: form.budget === b ? "#5B9CF6" : "rgba(240,240,245,0.5)",
                        border: `1px solid ${form.budget === b ? "rgba(91,156,246,0.4)" : "rgba(255,255,255,0.07)"}`,
                      }}>
                      {form.budget === b ? "✦ " : ""}{b}
                    </button>
                  ))}
                </div>
              </Field>
              <Field label={l.timeline}>
                <div className="flex flex-col gap-2 mt-1">
                  {timelines.map(t => (
                    <button key={t} type="button" onClick={() => set("timeline", t)}
                      className="text-sm px-4 py-2.5 rounded-xl font-medium text-start transition-all"
                      style={{
                        background: form.timeline === t ? "rgba(91,156,246,0.15)" : "rgba(255,255,255,0.04)",
                        color: form.timeline === t ? "#5B9CF6" : "rgba(240,240,245,0.5)",
                        border: `1px solid ${form.timeline === t ? "rgba(91,156,246,0.4)" : "rgba(255,255,255,0.07)"}`,
                      }}>
                      {form.timeline === t ? "✦ " : ""}{t}
                    </button>
                  ))}
                </div>
              </Field>
            </div>

            {/* Goal */}
            <Field label={l.goal}>
              <input value={form.goal} onChange={e => set("goal", e.target.value)} placeholder={l.goalPh}
                className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none"
                style={inputStyle()} />
            </Field>

            {/* Description */}
            <Field label={l.desc} error={errors.description} hint={l.required}>
              <textarea value={form.description} onChange={e => set("description", e.target.value)}
                placeholder={l.descPh} rows={5}
                className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none resize-none"
                style={inputStyle(errors.description)} />
            </Field>

            <button onClick={submit} disabled={loading}
              className="w-full py-4 rounded-2xl font-extrabold text-sm transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
              style={{ background: "linear-gradient(135deg,#5B9CF6,#2563EB)", color: "#fff", boxShadow: "0 0 40px rgba(91,156,246,0.35)" }}>
              {loading ? l.sending : l.submit}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, error, hint, children }: { label: string; error?: boolean; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-bold mb-2 flex items-center gap-2" style={{ color: error ? "rgba(239,68,68,0.9)" : "rgba(216,229,245,0.6)" }}>
        {label}
        {error && hint && <span className="font-normal opacity-75">{hint}</span>}
      </label>
      {children}
    </div>
  );
}
