"use client";

import { useState, type FormEvent } from "react";
import Reveal from "./Reveal";
import { IconCheck, IconArrow } from "./icons";

type Status = "idle" | "submitting" | "done";

export default function ContactCTA() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", phone: "", link: "" });

  const update = (k: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) return;
    setStatus("submitting");
    // No backend required to run — resolves locally so the page is deploy-ready.
    // Wire this to an API route / CRM when you have one.
    setTimeout(() => setStatus("done"), 700);
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <div
          className="relative rounded-[28px] overflow-hidden p-8 md:p-14"
          style={{
            background: "linear-gradient(160deg, var(--surface), var(--bg-2))",
            border: "1px solid var(--border-strong)",
          }}
        >
          <div className="grid-lines absolute inset-0 opacity-40" aria-hidden />
          <div
            className="glow-orb anim-pulse"
            style={{
              width: 380,
              height: 380,
              top: -160,
              insetInlineEnd: -120,
              background: "radial-gradient(circle, var(--gold-glow), transparent 70%)",
            }}
            aria-hidden
          />

          <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <Reveal>
                <span className="eyebrow">درخواست بررسی رایگان</span>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="mt-5 text-3xl md:text-[2.6rem] font-extrabold leading-tight tracking-tight">
                  آماده‌ای کسب‌وکارت را{" "}
                  <span className="gold-text">متحول کنی؟</span>
                </h2>
              </Reveal>
              <Reveal delay={140}>
                <p
                  className="mt-4 text-base md:text-lg leading-loose"
                  style={{ color: "var(--fg-muted)" }}
                >
                  اطلاعاتت را بگذار تا کارشناسان ماهیر کسب‌وکارت را رایگان بررسی کنند و مسیر
                  رشدت را برایت مشخص کنند. بدون تعهد، بدون هزینه.
                </p>
              </Reveal>
            </div>

            <Reveal dir="left" delay={120}>
              {status === "done" ? (
                <div
                  className="rounded-2xl p-8 text-center"
                  style={{ background: "var(--surface)", border: "1px solid var(--border-strong)" }}
                >
                  <div
                    className="mx-auto w-14 h-14 rounded-full flex items-center justify-center"
                    style={{
                      background: "linear-gradient(150deg, var(--gold-deep), var(--gold-bright))",
                      color: "#14100A",
                    }}
                  >
                    <IconCheck width={28} height={28} />
                  </div>
                  <h3 className="mt-4 text-xl font-bold">درخواستت ثبت شد!</h3>
                  <p className="mt-2 text-sm leading-loose" style={{ color: "var(--fg-muted)" }}>
                    ممنون {form.name.trim()} عزیز. تیم ماهیر به‌زودی با شماره‌ی{" "}
                    <span style={{ color: "var(--gold-bright)" }}>{form.phone.trim()}</span> با تو
                    تماس می‌گیرد.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={onSubmit}
                  className="rounded-2xl p-6 md:p-7 space-y-4"
                  style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
                >
                  <Field
                    label="نام و نام خانوادگی"
                    placeholder="مثلاً امیر رضایی"
                    value={form.name}
                    onChange={update("name")}
                    required
                  />
                  <Field
                    label="شماره تماس"
                    placeholder="۰۹۱۲۰۰۰۰۰۰۰"
                    type="tel"
                    inputMode="numeric"
                    value={form.phone}
                    onChange={update("phone")}
                    required
                  />
                  <Field
                    label="لینک کسب‌وکار یا اینستاگرام"
                    placeholder="instagram.com/yourbrand"
                    value={form.link}
                    onChange={update("link")}
                  />
                  <button
                    type="submit"
                    className="btn btn-gold w-full mt-2"
                    disabled={status === "submitting"}
                  >
                    {status === "submitting" ? (
                      "در حال ارسال…"
                    ) : (
                      <>
                        ارسال درخواست
                        <IconArrow width={18} height={18} />
                      </>
                    )}
                  </button>
                  <p className="text-xs text-center" style={{ color: "var(--fg-dim)" }}>
                    اطلاعات شما نزد ماهیر محفوظ است و در اختیار کسی قرار نمی‌گیرد.
                  </p>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="block mb-1.5 text-sm font-medium" style={{ color: "var(--fg)" }}>
        {label}
        {props.required && <span style={{ color: "var(--gold)" }}> *</span>}
      </span>
      <input
        {...props}
        dir="auto"
        className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-colors"
        style={{
          background: "var(--bg)",
          border: "1px solid var(--border)",
          color: "var(--fg)",
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "var(--gold)")}
        onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
      />
    </label>
  );
}
