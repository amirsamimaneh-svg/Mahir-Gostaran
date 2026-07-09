import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import crypto from "crypto";

const CONTACT_PATH = path.join(process.cwd(), "data", "contacts.json");

type ContactEntry = {
  id: string;
  name: string;
  phone: string;
  business: string;
  message: string;
  createdAt: string;
  read: boolean;
};

function readContacts(): ContactEntry[] {
  try {
    if (!fs.existsSync(path.dirname(CONTACT_PATH)))
      fs.mkdirSync(path.dirname(CONTACT_PATH), { recursive: true });
    if (!fs.existsSync(CONTACT_PATH)) return [];
    return JSON.parse(fs.readFileSync(CONTACT_PATH, "utf-8"));
  } catch { return []; }
}

function writeContacts(entries: ContactEntry[]) {
  fs.writeFileSync(CONTACT_PATH, JSON.stringify(entries, null, 2));
}

export async function POST(req: NextRequest) {
  const { name, phone, business, message } = await req.json();

  if (!name?.trim() || !phone?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "فیلدهای اجباری را پر کنید." }, { status: 400 });
  }

  const entry: ContactEntry = {
    id: crypto.randomUUID(),
    name: name.trim(),
    phone: phone.trim(),
    business: business?.trim() ?? "",
    message: message.trim(),
    createdAt: new Date().toISOString(),
    read: false,
  };

  const entries = readContacts();
  entries.push(entry);
  writeContacts(entries);

  return NextResponse.json({ ok: true });
}

export async function GET() {
  return NextResponse.json({ contacts: readContacts().reverse() });
}
