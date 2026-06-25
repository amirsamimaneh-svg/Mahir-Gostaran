import { NextRequest, NextResponse } from "next/server";
import { findUserByPhone, createUser, hashPassword } from "@/lib/db";
import { setSession } from "@/lib/session";

export async function POST(req: NextRequest) {
  const { phone, name, password } = await req.json();

  if (!phone || !password || !name) return NextResponse.json({ error: "همه فیلدها الزامی است." }, { status: 400 });
  if (!/^09\d{9}$/.test(phone)) return NextResponse.json({ error: "شماره موبایل معتبر نیست." }, { status: 400 });
  if (password.length < 6) return NextResponse.json({ error: "رمز عبور باید حداقل ۶ کاراکتر باشد." }, { status: 400 });

  const existing = findUserByPhone(phone);
  if (existing) return NextResponse.json({ error: "این شماره قبلاً ثبت شده است." }, { status: 409 });

  createUser(phone, name.trim(), password);
  await setSession(phone);
  return NextResponse.json({ ok: true });
}
