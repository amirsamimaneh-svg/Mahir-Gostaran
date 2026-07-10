import fs from "fs";
import path from "path";
import crypto from "crypto";

const DB_PATH = path.join(process.cwd(), "data", "users.json");
const MSG_PATH = path.join(process.cwd(), "data", "messages.json");

export type User = {
  id: string;
  phone: string;
  email?: string;
  name: string;
  passwordHash: string;
  createdAt: string;
  consultCount: number;
};

export type Message = {
  id: string;
  from: "admin" | "user";
  userPhone: string;
  type: "text" | "image" | "voice";
  text: string;
  fileUrl?: string;
  duration?: number;
  createdAt: string;
  read: boolean;
};

function readDB(): User[] {
  try {
    if (!fs.existsSync(path.dirname(DB_PATH))) fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
    if (!fs.existsSync(DB_PATH)) return [];
    return JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
  } catch { return []; }
}

function writeDB(users: User[]) {
  fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2));
}

function readMessages(): Message[] {
  try {
    if (!fs.existsSync(MSG_PATH)) return [];
    return JSON.parse(fs.readFileSync(MSG_PATH, "utf-8"));
  } catch { return []; }
}

function writeMessages(msgs: Message[]) {
  fs.writeFileSync(MSG_PATH, JSON.stringify(msgs, null, 2));
}

export function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password + "mahir-salt-2024").digest("hex");
}

export function findUserByPhone(phone: string): User | undefined {
  return readDB().find(u => u.phone === phone);
}

export function findUserByEmail(email: string): User | undefined {
  return readDB().find(u => u.email?.toLowerCase() === email.toLowerCase());
}

/** Find by phone or email — returns user + the identifier used for session */
export function findUserByIdentifier(identifier: string): { user: User; sessionKey: string } | undefined {
  const isEmail = identifier.includes("@");
  const user = isEmail
    ? readDB().find(u => u.email?.toLowerCase() === identifier.toLowerCase())
    : readDB().find(u => u.phone === identifier);
  if (!user) return undefined;
  return { user, sessionKey: isEmail ? user.email! : user.phone };
}

export function createUser(phone: string, name: string, password: string, email?: string): User {
  const users = readDB();
  const user: User = {
    id: crypto.randomUUID(),
    phone,
    ...(email ? { email: email.toLowerCase() } : {}),
    name,
    passwordHash: hashPassword(password),
    createdAt: new Date().toISOString(),
    consultCount: 0,
  };
  users.push(user);
  writeDB(users);
  return user;
}

export function updateUserName(phone: string, name: string) {
  const users = readDB();
  const u = users.find(u => u.phone === phone);
  if (u) { u.name = name; writeDB(users); }
}

export function getAllUsers(): Omit<User, "passwordHash">[] {
  return readDB().map(({ passwordHash: _, ...u }) => u);
}

export function incrementConsult(phone: string) {
  const users = readDB();
  const u = users.find(u => u.phone === phone);
  if (u) { u.consultCount++; writeDB(users); }
}

export function sendMessage(
  from: "admin" | "user",
  userPhone: string,
  text: string,
  opts?: { type?: Message["type"]; fileUrl?: string; duration?: number }
): Message {
  const msgs = readMessages();
  const msg: Message = {
    id: crypto.randomUUID(),
    from, userPhone,
    type: opts?.type ?? "text",
    text,
    ...(opts?.fileUrl ? { fileUrl: opts.fileUrl } : {}),
    ...(opts?.duration != null ? { duration: opts.duration } : {}),
    createdAt: new Date().toISOString(),
    read: false,
  };
  msgs.push(msg);
  writeMessages(msgs);
  return msg;
}

export function getMessages(userPhone: string): Message[] {
  return readMessages().filter(m => m.userPhone === userPhone).sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}

export function markRead(userPhone: string) {
  const msgs = readMessages();
  msgs.filter(m => m.userPhone === userPhone && m.from === "admin").forEach(m => m.read = true);
  writeMessages(msgs);
}

export function getAllMessages(): Message[] {
  return readMessages().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function getUnreadCount(userPhone: string): number {
  return readMessages().filter(m => m.userPhone === userPhone && m.from === "admin" && !m.read).length;
}
