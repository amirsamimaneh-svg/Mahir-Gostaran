import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { getMessages, sendMessage, markRead } from "@/lib/db";

export async function GET() {
  const identifier = await getSession();
  if (!identifier) return NextResponse.json({ error: "لاگین نشده‌اید." }, { status: 401 });
  markRead(identifier);
  return NextResponse.json({ messages: getMessages(identifier) });
}

export async function POST(req: NextRequest) {
  const identifier = await getSession();
  if (!identifier) return NextResponse.json({ error: "لاگین نشده‌اید." }, { status: 401 });
  const { text, type, fileUrl, duration } = await req.json();
  if (!text?.trim() && !fileUrl) return NextResponse.json({ error: "پیام خالی است." }, { status: 400 });
  const msg = sendMessage("user", identifier, text?.trim() ?? "", { type: type ?? "text", fileUrl, duration });
  return NextResponse.json({ message: msg });
}
