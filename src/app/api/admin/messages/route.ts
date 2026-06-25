import { NextRequest, NextResponse } from "next/server";
import { getAllMessages } from "@/lib/db";

const ADMIN_PASS = "Am-=1386";

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  if (password !== ADMIN_PASS) return NextResponse.json({ error: "رمز اشتباه است." }, { status: 401 });
  return NextResponse.json({ messages: getAllMessages() });
}
