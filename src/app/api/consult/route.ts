import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
function checkRateLimit(ip: string) {
  const now = Date.now();
  const e = rateLimitMap.get(ip);
  if (!e || now > e.resetAt) { rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 }); return true; }
  if (e.count >= 5) return false;
  e.count++; return true;
}

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYS_FA = `تو مشاور ارشد رشد کسب‌وکار در شرکت ماهیر هستی. بر اساس اطلاعات کاربر، یک مشاوره رشد کامل، عملی و اختصاصی به فارسی بده. فرمت: عنوان جذاب، سپس ۳ تا ۵ راهکار عملی شماره‌گذاری‌شده، هر کدام یک جمله کوتاه. در آخر یک جمله انگیزشی. حداکثر ۱۵۰ کلمه. لحن پرانرژی و حرفه‌ای.`;
const SYS_EN = `You are a senior business growth consultant at Mahir. Based on the user's information, provide a complete, practical, and personalized growth consultation in English. Format: catchy title, then 3-5 numbered practical actions (one sentence each), ending with one motivational sentence. Max 150 words. Tone: energetic and professional.`;

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "تعداد درخواست‌ها زیاد است. یک دقیقه صبر کنید." }, { status: 429 });
  }

  const { answers, lang } = await req.json();
  if (!answers || !Array.isArray(answers)) {
    return NextResponse.json({ error: "درخواست نامعتبر." }, { status: 400 });
  }

  const [business, challenge, goal] = answers;
  const userMsg = lang === "en"
    ? `Business: ${business}\nBiggest challenge: ${challenge}\nGoal in 6 months: ${goal}`
    : `کسب‌وکار: ${business}\nبزرگ‌ترین چالش: ${challenge}\nهدف در ۶ ماه آینده: ${goal}`;

  try {
    const msg = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 500,
      system: lang === "en" ? SYS_EN : SYS_FA,
      messages: [{ role: "user", content: userMsg }],
    });
    const text = msg.content[0].type === "text" ? msg.content[0].text : "";
    return NextResponse.json({ advice: text });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "خطا در سرور. دوباره امتحان کنید." }, { status: 502 });
  }
}
