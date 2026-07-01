// POST /api/contact — validate, drop bots (honeypot), rate-limit, send via Resend.
// No persistence (docs/SA_BLUEPRINT.md §3-4). Contact target address comes from env.
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/contact-schema";
import { rateLimit } from "@/lib/rate-limit";

const CONTACT_TO = process.env.CONTACT_TO_EMAIL ?? "james.b@example.com";
const CONTACT_FROM = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "validation" },
      { status: 400 }
    );
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (typeof field === "string" && !fields[field]) {
        fields[field] = issue.message;
      }
    }
    return NextResponse.json(
      { ok: false, error: "validation", fields },
      { status: 400 }
    );
  }

  const { name, email, message, honeypot } = parsed.data;

  // Honeypot: pretend success so bots don't learn they were caught.
  if (honeypot && honeypot.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  // Rate limit by client IP (best-effort behind proxies).
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  if (!rateLimit(ip).allowed) {
    return NextResponse.json(
      { ok: false, error: "rate_limited" },
      { status: 429 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set — cannot send contact email.");
    return NextResponse.json(
      { ok: false, error: "delivery_failed" },
      { status: 502 }
    );
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: CONTACT_FROM,
      to: CONTACT_TO,
      replyTo: email,
      subject: `Portfolio contact from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `<p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(
        email
      )}&gt;</p><p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>`,
    });

    if (error) {
      console.error("Resend send failed:", error);
      return NextResponse.json(
        { ok: false, error: "delivery_failed" },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json(
      { ok: false, error: "delivery_failed" },
      { status: 502 }
    );
  }
}
