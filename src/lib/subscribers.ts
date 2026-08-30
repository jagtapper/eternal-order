import fs from "node:fs";
import path from "node:path";

export type Subscriber = {
  email: string;
  addedAt: string;
};

const FILE = path.join(process.cwd(), "data", "subscribers.json");

const EMAIL =
  /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/i;

export function normalizeEmail(raw: string) {
  return raw.trim().toLowerCase();
}

export function isValidEmail(email: string) {
  return email.length <= 254 && EMAIL.test(email);
}

function readAll(): Subscriber[] {
  if (!fs.existsSync(FILE)) return [];
  try {
    const parsed = JSON.parse(fs.readFileSync(FILE, "utf8")) as unknown;
    return Array.isArray(parsed) ? (parsed as Subscriber[]) : [];
  } catch {
    return [];
  }
}

function writeAll(rows: Subscriber[]) {
  const dir = path.dirname(FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(FILE, `${JSON.stringify(rows, null, 2)}\n`, "utf8");
}

export function addSubscriber(raw: string): { ok: true; created: boolean } {
  const email = normalizeEmail(raw);
  const rows = readAll();
  if (rows.some((row) => row.email === email)) {
    return { ok: true, created: false };
  }
  rows.push({ email, addedAt: new Date().toISOString() });
  writeAll(rows);
  return { ok: true, created: true };
}
