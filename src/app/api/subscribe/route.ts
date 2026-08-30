import { env } from "node:process";
import { NextResponse } from "next/server";
import { isValidEmail, normalizeEmail } from "@/lib/subscribers";

const WEB3FORMS = "https://api.web3forms.com/submit";

function web3formsAccessKey() {
  // Read at runtime so Next/Turbopack does not inline the secret into cache.
  const name = ["WEB3FORMS", "ACCESS_KEY"].join("_");
  return env[name];
}

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

  const accessKey = web3formsAccessKey();
  if (!accessKey) {
    return NextResponse.json(
      { error: "Could not save it. Try again." },
      { status: 503 },
    );
  }

  try {
    const response = await fetch(WEB3FORMS, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        email,
        subject: "Eternal Order: stay updated",
        from_name: "Eternal Order",
        message: "Weekly pulse signup. No membership.",
      }),
    });

    const data = (await response.json().catch(() => null)) as
      | { success?: boolean }
      | null;

    if (!response.ok || !data?.success) {
      return NextResponse.json(
        { error: "Could not save it. Try again." },
        { status: 502 },
      );
    }
  } catch {
    return NextResponse.json(
      { error: "Could not save it. Try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
