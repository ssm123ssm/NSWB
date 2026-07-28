import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Contact + access-request intake.
 *
 * TODO(delivery): this validates and logs the submission but does not yet
 * deliver it anywhere. Wire one of the following before launch, otherwise
 * enquiries are only visible in server logs:
 *   - CONTACT_WEBHOOK_URL  — Slack / Teams incoming webhook (supported below)
 *   - or an email provider (Resend, Postmark, SES) in `deliver()`
 */
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const name = String(body?.name ?? "").trim();
  const email = String(body?.email ?? "").trim();
  const phone = String(body?.phone ?? "").trim();
  const message = String(body?.message ?? "").trim();
  const subject = String(body?.subject ?? "General enquiry").trim();

  if (!name) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }
  if (!email && !phone) {
    return NextResponse.json(
      { error: "An email address or phone number is required." },
      { status: 400 }
    );
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return NextResponse.json(
      { error: "That email address does not look valid." },
      { status: 400 }
    );
  }

  const submission = {
    subject,
    name,
    email,
    phone,
    message,
    receivedAt: new Date().toISOString(),
  };

  try {
    await deliver(submission);
  } catch (error) {
    console.error("[contact] delivery failed", error);
    return NextResponse.json(
      { error: "Could not deliver the message." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}

async function deliver(submission) {
  const webhook = process.env.CONTACT_WEBHOOK_URL;

  if (!webhook) {
    console.info("[contact] submission received", submission);
    return;
  }

  const response = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: [
        `*${submission.subject}* — new enquiry`,
        `Name: ${submission.name}`,
        submission.email && `Email: ${submission.email}`,
        submission.phone && `Phone: ${submission.phone}`,
        submission.message && `Message: ${submission.message}`,
      ]
        .filter(Boolean)
        .join("\n"),
    }),
  });

  if (!response.ok) {
    throw new Error(`Webhook responded ${response.status}`);
  }
}
