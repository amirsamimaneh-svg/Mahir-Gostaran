import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
function checkRateLimit(ip: string) {
  const now = Date.now();
  const e = rateLimitMap.get(ip);
  if (!e || now > e.resetAt) { rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 }); return true; }
  if (e.count >= 20) return false;
  e.count++; return true;
}

function getClient() {
  return new Groq({ apiKey: process.env.GROQ_API_KEY });
}

const SYSTEM_FA = `تو دستیار هوشمند شرکت ماهیر هستی — یک شرکت مشاوره رشد کسب‌وکار ایرانی.

⚠️ قانون مطلق: فقط و فقط به زبان فارسی خالص پاسخ بده. هیچ کلمه‌ای به زبان‌های دیگر (انگلیسی، روسی، عربی، هندی و غیره) استفاده نکن. اگر کلمه‌ای معادل فارسی ندارد، معادل رایج فارسی آن را بنویس.

وظایف:
- پاسخ به سوالات درباره رشد کسب‌وکار، بازاریابی، برندینگ، هوش مصنوعی و استراتژی
- ارائه راهکارهای عملی، دقیق و کاربردی
- راهنمایی برای خدمات ماهیر (مشاوره، طراحی برند، دیجیتال مارکتینگ، هوش مصنوعی)

قوانین:
- فقط فارسی — هیچ کلمه خارجی در متن نباشد
- پاسخ کامل، راهکارمحور و عملی
- اگر نیاز به مشاوره تخصصی بود، به /consult هدایت کن
- لحن: حرفه‌ای، گرم، انگیزه‌بخش
- از شماره‌گذاری برای راهکارها استفاده کن`;

const SYSTEM_EN = `You are the intelligent assistant of Mahir — an Iranian business growth consulting company.
Your role:
- Answer questions about business growth, marketing, branding, AI, and strategy
- Provide practical, detailed, and actionable solutions
- Guide users about Mahir's services (consulting, brand design, digital marketing, AI)
- Available 24/7 to help users

Rules:
- Reply in English when user writes in English, otherwise use Persian
- Answers must be complete, solution-oriented and practical
- If user needs specialized consulting, direct them to /consult page
- Tone: professional, warm, motivating
- Use bullet points and numbering for clarity
- Never say "I don't know" — always provide useful guidance`;

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "تعداد پیام‌ها زیاد است. کمی صبر کنید." }, { status: 429 });
  }

  const { messages, lang } = await req.json();
  if (!messages || !Array.isArray(messages)) {
    return NextResponse.json({ error: "درخواست نامعتبر." }, { status: 400 });
  }

  try {
    const completion = await getClient().chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 800,
      temperature: 0.7,
      messages: [
        { role: "system", content: lang === "en" ? SYSTEM_EN : SYSTEM_FA },
        ...messages.slice(-10),
        ...(lang !== "en" ? [{ role: "system" as const, content: "یادآوری: فقط فارسی خالص بنویس. هیچ کلمه انگلیسی، روسی یا زبان دیگری نباشد." }] : []),
      ],
    });

    const reply = completion.choices[0]?.message?.content ?? "";
    return NextResponse.json({ reply });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "خطا در سرور. دوباره امتحان کنید." }, { status: 502 });
  }
}
