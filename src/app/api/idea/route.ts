import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

// Simple in-memory rate limiter: max 10 requests per IP per minute
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

const SYSTEM_PROMPT = `تو یک مشاور رشد کسب‌وکار خلاق در شرکت ماهیر هستی. برای کسب‌وکاری که کاربر می‌نویسد، یک ایده‌ی رشد عملی، خلاقانه و کوتاه (حداکثر ۶۰ کلمه) به فارسی بده. فرمت: یک عنوان کوتاه و جذاب، سپس دو سه جمله توضیح عملی. لحن پرانرژی و حرفه‌ای.`;

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "تعداد درخواست‌های شما به حد مجاز رسیده. یک دقیقه صبر کنید." },
      { status: 429 }
    );
  }

  let business: string;
  try {
    const body = await req.json();
    business = String(body.business ?? "").trim();
  } catch {
    return NextResponse.json({ error: "درخواست نامعتبر است." }, { status: 400 });
  }

  if (!business) {
    return NextResponse.json(
      { error: "لطفاً کسب‌وکار خود را وارد کنید." },
      { status: 400 }
    );
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "سرویس هوش مصنوعی در حال حاضر در دسترس نیست." },
      { status: 503 }
    );
  }

  try {
    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 300,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: `کسب‌وکار: ${business}` }],
    });

    const text =
      message.content[0].type === "text" ? message.content[0].text : "";

    return NextResponse.json({ idea: text });
  } catch (err) {
    console.error("Anthropic API error:", err);
    return NextResponse.json(
      {
        error:
          "متأسفانه در حال حاضر نمی‌توانیم ایده تولید کنیم. لطفاً دوباره امتحان کنید.",
      },
      { status: 502 }
    );
  }
}
