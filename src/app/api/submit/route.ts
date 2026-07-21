import { NextResponse } from "next/server";

export type ProjectLead = {
  fullName: string;
  mobile: string;
  instagram: string;
  website?: string;
  businessField: string;
  currentStatus?: string;
  biggestProblem?: string;
  goal?: string;
  budget?: string;
};

const IR_MOBILE = /^0?9\d{9}$/;

function isNonEmpty(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

export async function POST(request: Request) {
  let body: Partial<ProjectLead>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Server-side validation of required fields.
  const errors: Record<string, string> = {};
  if (!isNonEmpty(body.fullName)) errors.fullName = "نام و نام خانوادگی الزامی است.";
  if (!isNonEmpty(body.mobile)) errors.mobile = "شماره موبایل الزامی است.";
  else if (!IR_MOBILE.test(body.mobile.trim().replace(/[\s-]/g, "")))
    errors.mobile = "شماره موبایل معتبر نیست.";
  if (!isNonEmpty(body.instagram)) errors.instagram = "آیدی اینستاگرام یا لینک پیج الزامی است.";
  if (!isNonEmpty(body.businessField)) errors.businessField = "حوزه فعالیت را انتخاب کنید.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const lead: ProjectLead = {
    fullName: body.fullName!.trim(),
    mobile: body.mobile!.trim(),
    instagram: body.instagram!.trim(),
    website: body.website?.trim() || undefined,
    businessField: body.businessField!.trim(),
    currentStatus: body.currentStatus?.trim() || undefined,
    biggestProblem: body.biggestProblem?.trim() || undefined,
    goal: body.goal?.trim() || undefined,
    budget: body.budget?.trim() || undefined,
  };

  // TODO: wire this to Telegram / email / CRM.
  // For now we log the lead server-side so it can be picked up later.
  console.log("[ماهیر] درخواست پروژه جدید:", {
    ...lead,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
