import { cookies } from "next/headers";
import crypto from "crypto";

const SECRET = process.env.SESSION_SECRET ?? "mahir-secret-2024";
const COOKIE = "mahir_session";

export function signToken(phone: string): string {
  const payload = Buffer.from(JSON.stringify({ phone, exp: Date.now() + 7 * 86400_000 })).toString("base64url");
  const sig = crypto.createHmac("sha256", SECRET).update(payload).digest("base64url");
  return `${payload}.${sig}`;
}

export function verifyToken(token: string): string | null {
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;
  const expected = crypto.createHmac("sha256", SECRET).update(payload).digest("base64url");
  if (expected !== sig) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString());
    if (Date.now() > data.exp) return null;
    return data.phone;
  } catch { return null; }
}

export async function getSession(): Promise<string | null> {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (!token) return null;
  return verifyToken(token);
}

export async function setSession(phone: string) {
  const jar = await cookies();
  jar.set(COOKIE, signToken(phone), {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 7 * 86400,
    path: "/",
  });
}

export async function clearSession() {
  const jar = await cookies();
  jar.delete(COOKIE);
}
