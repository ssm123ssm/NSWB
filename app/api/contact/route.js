import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Contact + access-request intake.
 *
 * A submission goes to every channel that is configured — email for the record
 * that can be replied to, the webhook for the notification that gets noticed —
 * and the request succeeds if any one of them accepts it. Configure with:
 *   - RESEND_API_KEY + CONTACT_FROM_EMAIL  — email delivery (CONTACT_TO_EMAIL
 *     picks the recipient; it defaults to the address published in the privacy
 *     notice)
 *   - CONTACT_WEBHOOK_URL                  — Slack / Teams incoming webhook
 * With neither set the submission is written to the server log, which is the
 * honest outcome in local development rather than a failure.
 */

// A provider that hangs would otherwise hold the request open until the
// platform kills it, taking the visitor's browser with it, so every outbound
// call gets the same short budget.
const DELIVERY_TIMEOUT_MS = 8000;

const DEFAULT_TO_EMAIL = "hello@neurasense.io";

/* Everything below this line is about the fact that this endpoint is public,
   costs money per submission (Resend bills per email) and posts into a room
   people are watching. Three independent defences, because each one fails
   differently:

     - the honeypot stops the naive bots, which is most of them
     - the length caps stop one request being expensive
     - the rate limit stops a determined one being repeated

   Deliberately no CAPTCHA. It would tax every real visitor to stop a class of
   attacker that a business enquiry form does not attract, and the three
   measures here cost an honest sender nothing. */

/** Field ceilings. Anything longer is a payload, not an enquiry. */
const LIMITS = {
  name: 120,
  email: 254, // the maximum length of an address per RFC 5321
  phone: 40,
  subject: 120,
  message: 4000,
};

/* Refused before the body is read at all, so an oversized request is never
   parsed into memory. Generous next to the field caps above — this is the
   backstop for something pathological, not the real limit. */
const MAX_BODY_BYTES = 16 * 1024;

const RATE_LIMIT = { windowMs: 10 * 60 * 1000, max: 5 };

/* In memory, and therefore per instance: a serverless platform runs several,
   and a cold start begins with an empty map, so a determined attacker spread
   across instances gets more than `max` through. That is understood and it is
   still worth having — it turns an unbounded flood into a trickle, which is the
   difference that matters for a form this size. Move to a shared store (Vercel
   KV, Upstash) if this ever stops being enough; the shape of `allow` is what
   would change, and nothing else. */
const hits = new Map();

function allow(key, now = Date.now()) {
  const cutoff = now - RATE_LIMIT.windowMs;
  const recent = (hits.get(key) ?? []).filter((time) => time > cutoff);

  // Swept on write rather than on a timer: the map only grows when someone
  // submits, so the work belongs on the same path.
  if (hits.size > 5000) {
    for (const [id, times] of hits) {
      if (times.every((time) => time <= cutoff)) hits.delete(id);
    }
  }

  if (recent.length >= RATE_LIMIT.max) {
    hits.set(key, recent);
    return { ok: false, retryAfter: Math.ceil((recent[0] - cutoff) / 1000) };
  }

  recent.push(now);
  hits.set(key, recent);
  return { ok: true };
}

/* The left-most entry is the client as the first proxy saw it. The rest of the
   chain is appended by the hops after it and is trivially spoofable, so only
   the first is used. */
function clientKey(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request) {
  const declared = Number(request.headers.get("content-length") ?? 0);
  if (declared > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "That message is too long." }, { status: 413 });
  }

  const limit = allow(clientKey(request));
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Too many messages from this connection. Please try again later." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  /* The honeypot. `company` is rendered off-screen and hidden from assistive
     technology, so a person never sees it and an autofilling browser is told
     not to touch it — anything in it came from something reading the DOM.

     Answered with a plain 200 rather than an error. A bot that is told it
     failed learns to try again differently; one that is told it succeeded goes
     away. Nothing is delivered. */
  if (String(body?.company ?? "").trim()) {
    return NextResponse.json({ ok: true });
  }

  const field = (key, fallback = "") =>
    String(body?.[key] ?? fallback)
      .trim()
      .slice(0, LIMITS[key]);

  const name = field("name");
  const email = field("email");
  const phone = field("phone");
  const message = field("message");
  const subject = field("subject", "General enquiry");

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
  const channels = [];
  if (process.env.RESEND_API_KEY) channels.push(["email", sendEmail]);
  if (process.env.CONTACT_WEBHOOK_URL) channels.push(["webhook", sendWebhook]);

  if (channels.length === 0) {
    console.info(
      "[contact] no delivery channel configured — submission received",
      submission
    );
    return;
  }

  const results = await Promise.allSettled(
    channels.map(([, send]) => send(submission))
  );

  // Each channel carries the whole submission, so one arriving is enough to
  // tell the visitor it was sent. A partial failure is still logged loudly —
  // it means a channel needs attention even though nothing was lost.
  const failed = results
    .map((result, index) => [channels[index][0], result])
    .filter(([, result]) => result.status === "rejected");

  for (const [name, result] of failed) {
    console.error(`[contact] ${name} delivery failed`, result.reason);
  }

  if (failed.length === results.length) {
    throw new Error(
      `every delivery channel failed (${failed.map(([name]) => name).join(", ")})`
    );
  }
}

async function sendEmail(submission) {
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!from) {
    throw new Error(
      "RESEND_API_KEY is set but CONTACT_FROM_EMAIL is not — Resend needs a sender on a verified domain."
    );
  }
  const to = process.env.CONTACT_TO_EMAIL || DEFAULT_TO_EMAIL;

  const lines = [
    ["Name", submission.name],
    ["Email", submission.email],
    ["Phone", submission.phone],
    ["Subject", submission.subject],
    ["Received", submission.receivedAt],
  ].filter(([, value]) => value);

  const text = [
    ...lines.map(([label, value]) => `${label}: ${value}`),
    submission.message && `\n${submission.message}`,
  ]
    .filter(Boolean)
    .join("\n");

  const html = [
    "<table>",
    ...lines.map(
      ([label, value]) =>
        `<tr><td><strong>${escapeHtml(label)}</strong></td><td>${escapeHtml(value)}</td></tr>`
    ),
    "</table>",
    submission.message && `<p>${escapeHtml(submission.message)}</p>`,
  ]
    .filter(Boolean)
    .join("");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    // Replying to the notification reaches the person who wrote in, rather
    // than the no-reply sender the provider requires us to send from.
    body: JSON.stringify({
      from,
      to: [to],
      subject: `[${submission.subject}] ${submission.name}`,
      text,
      html,
      ...(submission.email ? { reply_to: submission.email } : {}),
    }),
    signal: AbortSignal.timeout(DELIVERY_TIMEOUT_MS),
  });

  if (!response.ok) {
    throw new Error(
      `Resend responded ${response.status}: ${await response.text().catch(() => "")}`
    );
  }
}

async function sendWebhook(submission) {
  const response = await fetch(process.env.CONTACT_WEBHOOK_URL, {
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
    signal: AbortSignal.timeout(DELIVERY_TIMEOUT_MS),
  });

  if (!response.ok) {
    throw new Error(`Webhook responded ${response.status}`);
  }
}

// The message is whatever the visitor typed, so it is escaped before it is
// dropped into the HTML part of the notification.
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
