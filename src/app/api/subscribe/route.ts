import { NextResponse } from "next/server";
import { addSubscriber, isValidEmail, normalizeEmail } from "@/lib/subscribers";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Send a JSON body." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Send a JSON body." }, { status: 400 });
  }

  const record = body as { email?: unknown; company?: unknown };

  // Honeypot: bots fill hidden fields. Pretend it worked.
  if (typeof record.company === "string" && record.company.trim()) {
    return NextResponse.json({ ok: true });
  }

  if (typeof record.email !== "string") {
    return NextResponse.json(
      { error: "Leave an email so we know where to send it." },
      { status: 400 },
    );
  }

  const email = normalizeEmail(record.email);
  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "That email does not look usable." },
      { status: 400 },
    );
  }

  addSubscriber(email);
  return NextResponse.json({ ok: true });
}
