import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 });
    return true;
  }
  if (entry.count >= 10) return false;
  entry.count++;
  return true;
}

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_FA = `تو یک مشاور رشد کسب‌وکار خلاق در شرکت ماهیر هستی. برای کسب‌وکاری که کاربر می‌نویسد، یک ایده‌ی رشد عملی، خلاقانه و کوتاه (حداکثر ۶۰ کلمه) به فارسی بده. فرمت: یک عنوان کوتاه و جذاب، سپس دو سه جمله توضیح عملی. لحن پرانرژی و حرفه‌ای.`;

const SYSTEM_EN = `You are a creative business growth consultant at Mahir. For the business the user describes, provide one practical, creative, and concise growth idea (max 60 words) in English. Format: one short catchy title, then 2-3 sentences of practical explanation. Tone: energetic and professional.`;

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a minute. / تعداد درخواست‌ها زیاد است." },
      { status: 429 }
    );
  }

  let business: string;
  let lang: string = "fa";

  try {
    const body = await req.json();
    business = String(body.business ?? "").trim();
    lang = body.lang === "en" ? "en" : "fa";
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!business) {
    return NextResponse.json(
      { error: lang === "fa" ? "لطفاً کسب‌وکار خود را وارد کنید." : "Please enter your business." },
      { status: 400 }
    );
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: lang === "fa" ? "سرویس در حال حاضر در دسترس نیست." : "Service unavailable." },
      { status: 503 }
    );
  }

  try {
    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 300,
      system: lang === "en" ? SYSTEM_EN : SYSTEM_FA,
      messages: [{ role: "user", content: `Business: ${business}` }],
    });

    const text = message.content[0].type === "text" ? message.content[0].text : "";
    return NextResponse.json({ idea: text });
  } catch (err) {
    console.error("Anthropic API error:", err);
    return NextResponse.json(
      {
        error:
          lang === "fa"
            ? "متأسفانه در حال حاضر نمی‌توانیم ایده تولید کنیم. دوباره امتحان کنید."
            : "Could not generate idea right now. Please try again.",
      },
      { status: 502 }
    );
  }
}
