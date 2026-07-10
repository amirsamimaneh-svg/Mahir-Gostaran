import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { findUserByIdentifier, getUnreadCount } from "@/lib/db";

export async function GET() {
  const identifier = await getSession();
  if (!identifier) return NextResponse.json({ user: null });
  const result = findUserByIdentifier(identifier);
  if (!result) return NextResponse.json({ user: null });
  const { user } = result;
  return NextResponse.json({
    user: {
      phone: user.phone,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
      consultCount: user.consultCount,
      unread: getUnreadCount(identifier),
    }
  });
}
