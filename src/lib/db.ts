import fs from "fs";
import path from "path";
import crypto from "crypto";

const DB_PATH = path.join(process.cwd(), "data", "users.json");

export type User = {
  id: string;
  phone: string;
  passwordHash: string;
  createdAt: string;
  consultCount: number;
};

function readDB(): User[] {
  try {
    if (!fs.existsSync(path.dirname(DB_PATH))) {
      fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
    }
    if (!fs.existsSync(DB_PATH)) return [];
    return JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
  } catch {
    return [];
  }
}

function writeDB(users: User[]) {
  fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2));
}

export function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password + "mahir-salt-2024").digest("hex");
}

export function findUserByPhone(phone: string): User | undefined {
  return readDB().find(u => u.phone === phone);
}

export function createUser(phone: string, password: string): User {
  const users = readDB();
  const user: User = {
    id: crypto.randomUUID(),
    phone,
    passwordHash: hashPassword(password),
    createdAt: new Date().toISOString(),
    consultCount: 0,
  };
  users.push(user);
  writeDB(users);
  return user;
}

export function getAllUsers(): Omit<User, "passwordHash">[] {
  return readDB().map(({ passwordHash: _, ...u }) => u);
}

export function incrementConsult(phone: string) {
  const users = readDB();
  const u = users.find(u => u.phone === phone);
  if (u) { u.consultCount++; writeDB(users); }
}
