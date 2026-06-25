import { NextRequest, NextResponse } from "next/server";
import { findUserByPhone, hashPassword } from "@/lib/db";
import { setSession } from "@/lib/session";

export async function POST(req: NextRequest) {
  const { phone, password } = await req.json();
  if (!phone || !password) return NextResponse.json({ error: "اطلاعات ناقص است." }, { status: 400 });

  const user = findUserByPhone(phone);
  if (!user || user.passwordHash !== hashPassword(password)) {
    return NextResponse.json({ error: "شماره یا رمز اشتباه است." }, { status: 401 });
  }

  await setSession(phone);
  return NextResponse.json({ ok: true });
}
