export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import crypto from "crypto";

const CONSULT_PATH = path.join(process.cwd(), "data", "consults.json");
function saveConsult(data: Record<string, unknown>) {
  try {
    if (!fs.existsSync(path.dirname(CONSULT_PATH)))
      fs.mkdirSync(path.dirname(CONSULT_PATH), { recursive: true });
    const list = fs.existsSync(CONSULT_PATH)
      ? JSON.parse(fs.readFileSync(CONSULT_PATH, "utf-8"))
      : [];
    list.push({ id: crypto.randomUUID(), createdAt: new Date().toISOString(), ...data });
    fs.writeFileSync(CONSULT_PATH, JSON.stringify(list, null, 2));
  } catch { /* non-critical */ }
}

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
function checkRateLimit(ip: string) {
  const now = Date.now();
  const e = rateLimitMap.get(ip);
  if (!e || now > e.resetAt) { rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 }); return true; }
  if (e.count >= 5) return false;
  e.count++; return true;
}

async function getClient() {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error("GROQ_API_KEY not set");
  const { default: Groq } = await import("groq-sdk");
  return new Groq({ apiKey });
}

const SYS_FA = `تو مشاور ارشد رشد کسب‌وکار در شرکت ماهیر هستی با تخصص در استراتژی، برندینگ، دیجیتال مارکتینگ و هوش مصنوعی.
بر اساس اطلاعات کسب‌وکار کاربر، یک مشاوره رشد جامع، عملی و اختصاصی ارائه بده.

فرمت پاسخ:
🚀 [عنوان اختصاصی برای این کسب‌وکار]

📊 تحلیل وضعیت: [۲ جمله درباره چالش اصلی]

🎯 راهکارهای عملی:
۱. [راهکار اول با جزئیات]
۲. [راهکار دوم با جزئیات]
۳. [راهکار سوم با جزئیات]
۴. [راهکار چهارم با جزئیات]
۵. [راهکار پنجم با جزئیات]

⚡ اولویت فوری: [مهم‌ترین کاری که باید این هفته انجام شود]

📈 هدف ۶ ماهه: [چه نتیجه‌ای قابل دسترس است]

✨ [یک جمله انگیزشی اختصاصی]

لحن: حرفه‌ای، گرم، انگیزه‌بخش. پاسخ باید کاملاً اختصاصی برای این کسب‌وکار باشد.`;

const SYS_AR = `أنت مستشار نمو أعمال أول في شركة ماهير متخصص في الاستراتيجية والعلامة التجارية والتسويق الرقمي والذكاء الاصطناعي.
بناءً على معلومات عمل المستخدم، قدّم استشارة نمو شاملة وعملية ومخصصة.

صيغة الإجابة:
🚀 [عنوان مخصص لهذا العمل]

📊 تحليل الوضع: [جملتان حول التحدي الرئيسي]

🎯 خطة العمل:
١. [خطوة تفصيلية]
٢. [خطوة تفصيلية]
٣. [خطوة تفصيلية]
٤. [خطوة تفصيلية]
٥. [خطوة تفصيلية]

⚡ الأولوية الفورية: [أهم شيء يجب فعله هذا الأسبوع]

📈 هدف ٦ أشهر: [النتيجة القابلة للتحقيق]

✨ [جملة تحفيزية مخصصة]

الأسلوب: احترافي، دافئ، محفز. الإجابة يجب أن تكون مخصصة تماماً لهذا العمل.`;

const SYS_EN = `You are a senior business growth consultant at Mahir with expertise in strategy, branding, digital marketing and AI.
Based on the user's business information, provide comprehensive, practical, personalized growth consulting.

Response format:
🚀 [Personalized title for this business]

📊 Situation Analysis: [2 sentences about the main challenge]

🎯 Action Plan:
1. [Detailed action step]
2. [Detailed action step]
3. [Detailed action step]
4. [Detailed action step]
5. [Detailed action step]

⚡ Immediate Priority: [Most important thing to do this week]

📈 6-Month Goal: [What result is achievable]

✨ [One personalized motivational sentence]

Tone: professional, warm, energizing. Response must be fully personalized for this business.`;

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "تعداد درخواست‌ها زیاد است. یک دقیقه صبر کنید." }, { status: 429 });
  }

  const { answers, lang, imageBase64, imageMime } = await req.json();
  if (!answers || !Array.isArray(answers)) {
    return NextResponse.json({ error: "درخواست نامعتبر." }, { status: 400 });
  }

  const [business, challenge, goal] = answers;
  const userText = lang === "en"
    ? `Business: ${business}\nBiggest challenge: ${challenge}\nGoal in 6 months: ${goal}`
    : lang === "ar"
    ? `العمل: ${business}\nأكبر تحدٍّ: ${challenge}\nالهدف في ٦ أشهر: ${goal}`
    : `کسب‌وکار: ${business}\nبزرگ‌ترین چالش: ${challenge}\nهدف در ۶ ماه آینده: ${goal}`;

  try {
    type MsgContent = string | { type: "text"; text: string }[] | { type: string; [k: string]: unknown }[];

    let userContent: MsgContent = userText;

    // Groq vision: llama-4 scout supports images
    if (imageBase64 && imageMime) {
      const mime = ["image/jpeg","image/png","image/gif","image/webp"].includes(imageMime) ? imageMime : "image/jpeg";
      userContent = [
        {
          type: "image_url",
          image_url: { url: `data:${mime};base64,${imageBase64}` },
        },
        { type: "text", text: (lang === "en" ? "This is an image of my business. " : "این تصویر کسب‌وکار من است. ") + userText },
      ];
    }

    const model = imageBase64 ? "meta-llama/llama-4-scout-17b-16e-instruct" : "llama-3.3-70b-versatile";

    const completion = await (await getClient()).chat.completions.create({
      model,
      max_tokens: 500,
      messages: [
        { role: "system", content: lang === "en" ? SYS_EN : lang === "ar" ? SYS_AR : SYS_FA },
        { role: "user", content: userContent as string },
      ],
    });

    const text = completion.choices[0]?.message?.content ?? "";
    saveConsult({ business, challenge, goal, lang, advice: text });
    return NextResponse.json({ advice: text });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: lang === "fa" ? "خطا در سرور. دوباره امتحان کنید." : lang === "ar" ? "خطأ في الخادم. حاول مجدداً." : "Server error. Please try again." },
      { status: 502 }
    );
  }
}
