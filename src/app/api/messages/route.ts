import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { getMessages, sendMessage, markRead } from "@/lib/db";

export async function GET() {
  const phone = await getSession();
  if (!phone) return NextResponse.json({ error: "لاگین نشده‌اید." }, { status: 401 });
  markRead(phone);
  return NextResponse.json({ messages: getMessages(phone) });
}

export async function POST(req: NextRequest) {
  const phone = await getSession();
  if (!phone) return NextResponse.json({ error: "لاگین نشده‌اید." }, { status: 401 });
  const { text } = await req.json();
  if (!text?.trim()) return NextResponse.json({ error: "پیام خالی است." }, { status: 400 });
  const msg = sendMessage("user", phone, text.trim());
  return NextResponse.json({ message: msg });
}
