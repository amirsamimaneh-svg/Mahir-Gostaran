import { NextRequest, NextResponse } from "next/server";
import { findUserByIdentifier, hashPassword } from "@/lib/db";
import { setSession } from "@/lib/session";

export async function POST(req: NextRequest) {
  const { identifier, password } = await req.json();
  if (!identifier?.trim() || !password) return NextResponse.json({ error: "اطلاعات ناقص است." }, { status: 400 });

  const result = findUserByIdentifier(identifier.trim());
  if (!result || result.user.passwordHash !== hashPassword(password)) {
    return NextResponse.json({ error: "اطلاعات وارد شده اشتباه است." }, { status: 401 });
  }

  await setSession(result.sessionKey);
  return NextResponse.json({ ok: true });
}
