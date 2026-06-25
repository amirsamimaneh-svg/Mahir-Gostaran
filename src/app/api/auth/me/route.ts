import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { findUserByPhone } from "@/lib/db";

export async function GET() {
  const phone = await getSession();
  if (!phone) return NextResponse.json({ user: null });
  const user = findUserByPhone(phone);
  if (!user) return NextResponse.json({ user: null });
  return NextResponse.json({ user: { phone: user.phone, createdAt: user.createdAt } });
}
