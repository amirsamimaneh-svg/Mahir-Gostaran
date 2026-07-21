"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

const ITEMS = [
  {
    q: "ماهیر دقیقاً چه کاری انجام می‌دهد؟",
    a: "ماهیر کسب‌وکارهای کوچک و نوپا را از صفر تا صد رشد می‌دهد؛ یعنی برندینگ و هویت بصری، تولید محتوا و ویدیو، جذب کاربر و مشتری واقعی و بهینه‌سازی فروش را به‌صورت یکپارچه و در قالب یک تیم انجام می‌دهیم.",
  },
  {
    q: "هزینه همکاری با ماهیر چقدر است؟",
    a: "هزینه به نوع کسب‌وکار، وضعیت فعلی و اهداف شما بستگی دارد. بعد از ثبت پروژه و بررسی رایگان، یک پیشنهاد اختصاصی و شفاف متناسب با بودجه شما ارائه می‌دهیم.",
  },
  {
    q: "بررسی اولیه واقعاً رایگان است؟",
    a: "بله. ثبت پروژه و بررسی اولیه کاملاً رایگان و بدون هیچ تعهدی است. اگر به این نتیجه برسیم که می‌توانیم کمکتان کنیم، مسیر و هزینه را با شما در میان می‌گذاریم.",
  },
  {
    q: "چقدر طول می‌کشد تا نتیجه بگیرم؟",
    a: "رشد پایدار یک فرآیند است، نه یک اتفاق یک‌شبه. معمولاً از همان هفته‌های اول بهبود در برند و حضور آنلاین دیده می‌شود، اما نتایج فروش به مقیاس و همکاری شما بستگی دارد.",
  },
  {
    q: "اگر کسب‌وکار من کوچک یا تازه‌کار باشد چطور؟",
    a: "دقیقاً تخصص ماهیر همین است. ما برای کسب‌وکارهایی ساخته شده‌ایم که مشتری کم، فروش ضعیف یا نبود تبلیغات دارند و می‌خواهند از نقطه صفر شروع به رشد کنند.",
  },
  {
    q: "بعد از ثبت پروژه چه اتفاقی می‌افتد؟",
    a: "بعد از ارسال فرم، اطلاعات شما برای تیم ماهیر ثبت می‌شود و کارشناسان ما حداکثر تا ۲۴ ساعت با شما تماس می‌گیرند تا جزئیات را بررسی و مسیر همکاری را مشخص کنند.",
  },
];

function Item({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-2xl overflow-hidden transition-colors"
      style={{
        background: "var(--surface)",
        border: `1px solid ${open ? "var(--border-strong)" : "var(--border)"}`,
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 text-start px-5 py-4"
      >
        <span className="font-bold text-sm md:text-base" style={{ color: "var(--fg)" }}>
          {q}
        </span>
        <span
          className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-lg leading-none transition-transform duration-300"
          style={{
            background: "var(--gold-soft)",
            border: "1px solid var(--border-strong)",
            color: "var(--gold-bright)",
            transform: open ? "rotate(45deg)" : "none",
          }}
        >
          +
        </span>
      </button>
      <div
        className="grid transition-all duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-5 text-sm leading-loose" style={{ color: "var(--fg-muted)" }}>
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="section">
      <div className="container">
        <SectionHeader
          eyebrow="سوالات متداول"
          title={
            <>
              پاسخ به <span className="gold-text">سوال‌های شما</span>
            </>
          }
          subtitle="اگر باز هم سوالی داشتید، از طریق فرم ثبت پروژه یا راه‌های ارتباطی با ما در تماس باشید."
        />

        <div className="mt-12 max-w-3xl mx-auto space-y-3.5">
          {ITEMS.map((item, i) => (
            <Reveal key={item.q} delay={i * 60}>
              <Item {...item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
