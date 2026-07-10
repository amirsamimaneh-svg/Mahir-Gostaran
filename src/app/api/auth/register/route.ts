import { NextRequest, NextResponse } from "next/server";
import { findUserByPhone, findUserByEmail, createUser, hashPassword } from "@/lib/db";
import { setSession } from "@/lib/session";

export async function POST(req: NextRequest) {
  const { phone, email, name, password } = await req.json();

  if (!name?.trim()) return NextResponse.json({ error: "نام الزامی است." }, { status: 400 });
  if (!password || password.length < 6) return NextResponse.json({ error: "رمز عبور باید حداقل ۶ کاراکتر باشد." }, { status: 400 });
  if (!phone && !email) return NextResponse.json({ error: "شماره موبایل یا ایمیل الزامی است." }, { status: 400 });

  if (phone) {
    if (!/^09\d{9}$/.test(phone)) return NextResponse.json({ error: "شماره موبایل معتبر نیست." }, { status: 400 });
    if (findUserByPhone(phone)) return NextResponse.json({ error: "این شماره قبلاً ثبت شده است." }, { status: 409 });
  }

  if (email) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: "ایمیل معتبر نیست." }, { status: 400 });
    if (findUserByEmail(email)) return NextResponse.json({ error: "این ایمیل قبلاً ثبت شده است." }, { status: 409 });
  }

  createUser(phone ?? "", name.trim(), password, email ?? undefined);
  const sessionKey = phone || email;
  await setSession(sessionKey);
  return NextResponse.json({ ok: true });
}
