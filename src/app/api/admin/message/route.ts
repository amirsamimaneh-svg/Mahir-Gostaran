import { NextRequest, NextResponse } from "next/server";
import { sendMessage } from "@/lib/db";

const ADMIN_PASS = "Am-=1386";

export async function POST(req: NextRequest) {
  const { password, userPhone, text } = await req.json();
  if (password !== ADMIN_PASS) return NextResponse.json({ error: "رمز اشتباه است." }, { status: 401 });
  if (!userPhone || !text?.trim()) return NextResponse.json({ error: "اطلاعات ناقص است." }, { status: 400 });
  const msg = sendMessage("admin", userPhone, text.trim());
  return NextResponse.json({ message: msg });
}
