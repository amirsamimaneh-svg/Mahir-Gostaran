import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import crypto from "crypto";

const FILE = path.join(process.cwd(), "data", "project-requests.json");
const ADMIN_PASS = process.env.ADMIN_PASSWORD ?? "Am-=1386";

export type ProjectRequest = {
  id: string;
  name: string;
  phone: string;
  business: string;
  service: string;
  budget: string;
  timeline: string;
  goal: string;
  description: string;
  createdAt: string;
  status: "new" | "reviewing" | "done";
};

function read(): ProjectRequest[] {
  try {
    const dir = path.dirname(FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    if (!fs.existsSync(FILE)) return [];
    return JSON.parse(fs.readFileSync(FILE, "utf-8"));
  } catch { return []; }
}

function write(data: ProjectRequest[]) {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  // Admin fetch
  if (body.password) {
    if (body.password !== ADMIN_PASS) return NextResponse.json({ error: "رمز اشتباه است." }, { status: 401 });
    if (body.id && body.status) {
      const items = read();
      const item = items.find(i => i.id === body.id);
      if (item) { item.status = body.status; write(items); }
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ requests: read().reverse() });
  }

  // Client submission
  const { name, phone, business, service, budget, timeline, goal, description } = body;
  if (!name?.trim() || !phone?.trim() || !service || !description?.trim()) {
    return NextResponse.json({ error: "فیلدهای اجباری را پر کنید." }, { status: 400 });
  }

  const entry: ProjectRequest = {
    id: crypto.randomUUID(),
    name: name.trim(), phone: phone.trim(),
    business: business?.trim() ?? "",
    service, budget: budget ?? "",
    timeline: timeline ?? "",
    goal: goal?.trim() ?? "",
    description: description.trim(),
    createdAt: new Date().toISOString(),
    status: "new",
  };

  const items = read();
  items.push(entry);
  write(items);

  return NextResponse.json({ ok: true });
}
