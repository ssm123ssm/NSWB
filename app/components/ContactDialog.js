"use client";

import { useEffect, useRef, useState } from "react";
import { getProductByName } from "../data/site";
import { CheckIcon, CloseIcon } from "./Icons";
import ProductName from "./ProductName";

/**
 * The one contact form on the site. Opened without a subject it is a general
 * enquiry; opened from a product it takes on that product's identity — accent,
 * name and wording — all resolved from the product entry, so call sites only
 * ever have to name the product.
 */
export default function ContactDialog({ subject, intent = null, onClose }) {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [error, setError] = useState("");
  const cardRef = useRef(null);
  const firstFieldRef = useRef(null);

  const product = subject ? getProductByName(subject) : null;
  // Gated products lead with access and documentation; the rest are an open
  // conversation. An unrecognised subject is treated as gated, as before. A
  // call site can ask for either shape outright when its own wording implies
  // one, whatever the product's usual access model.
  const isAccessRequest = intent
    ? intent === "access"
    : product
      ? product.access === "request"
      : Boolean(subject);
  // "message" is the short form: just something to say, sent with no contact
  // details required. "contact" is its mirror: no message, just the details
  // to reach back on. Both skip the fuller general-enquiry shape below.
  const isMessageOnly = intent === "message";
  const isContactRequest = intent === "contact";
  const productName = product?.name ?? subject;

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab" || !cardRef.current) return;

      // Keep focus inside the dialog while it is open.
      const focusable = cardRef.current.querySelectorAll(
        'a[href], button:not([disabled]), input, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    firstFieldRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
      subject:
        subject ??
        (isMessageOnly ? "Message" : isContactRequest ? "Contact request" : "General enquiry"),
      // The honeypot below. Sent whatever it holds — the server decides what a
      // filled one means, and the form stays ignorant of the trick.
      company: String(formData.get("company") ?? ""),
    };

    if (!isMessageOnly && !payload.email && !payload.phone) {
      setError("Please give us an email address or a phone number.");
      return;
    }

    setError("");
    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error(`Request failed (${response.status})`);
      setStatus("sent");
    } catch {
      setStatus("error");
      setError(
        "We could not send that just now. Please email us directly at hello@neurasense.io."
      );
    }
  }

  return (
    <div
      className="dialog-overlay fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto p-4 sm:items-center sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      role="presentation"
    >
      <div
        ref={cardRef}
        className="dialog-card my-auto w-full max-w-md p-6 sm:p-7"
        data-brand={product?.accent}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-dialog-title"
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            {(productName || isMessageOnly || isContactRequest) && (
              <p className="eyebrow mb-1.5">
                {/* Once sent the heading turns into a status, so the eyebrow
                    takes over holding on to what the message was about. */}
                {status === "sent"
                  ? (productName ?? (isContactRequest ? "Request sent" : "Message sent"))
                  : isAccessRequest
                    ? "Request access"
                    : isMessageOnly
                      ? "Message us"
                      : isContactRequest
                        ? "Contact us"
                        : "Talk to us"}
              </p>
            )}
            <h2 id="contact-dialog-title" className="text-lg">
              {status === "sent" ? (
                "Message received"
              ) : product ? (
                <ProductName product={product} />
              ) : isMessageOnly ? (
                "Send us a message"
              ) : isContactRequest ? (
                "Have us contact you"
              ) : (
                productName ?? "Start a project"
              )}
            </h2>
          </div>
          <button
            className="icon-button -mr-1 -mt-1 shrink-0"
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <CloseIcon />
          </button>
        </div>

        {status === "sent" ? (
          <div>
            <span className="icon-tile mb-4">
              <CheckIcon className="h-6 w-6" />
            </span>
            <p className="text-base leading-[1.5] text-muted">
              {isMessageOnly
                ? "Thanks — we have your message and will come back to you shortly, usually within two working days."
                : "Thanks — we have your details and will come back to you shortly, usually within two working days."}
            </p>
            <button className="btn btn-bordered mt-6 w-full" type="button" onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          <form className="grid gap-4" onSubmit={handleSubmit}>
            {/* Not a field. It is taken out of the layout, out of the tab
                order and out of the accessibility tree, and the browser is
                told not to fill it — so nothing a person does can put a value
                in it, and a value in it is a bot. The label is plausible on
                purpose: "company" is what a scraper expects to find and fill.
                Left outside the grid gap flow by .honeypot's absolute
                positioning, so it cannot open a gap in the form either. */}
            <input
              className="honeypot"
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            <p className="text-base leading-[1.5] text-muted">
              {isAccessRequest
                ? `Tell us a little about your team and we'll send ${productName} documentation, onboarding steps, and timelines.`
                : isMessageOnly
                  ? "Type your message below and we'll get back to you."
                  : isContactRequest
                    ? "Share how to reach you and we'll get in touch."
                    : productName
                      ? `Tell us how you'd like to use ${productName} and we'll come back with the right next step.`
                      : "Share your idea or challenge and we'll help shape it into a clear plan with the right tech and timeline."}
            </p>

            {error && (
              <p
                className="rounded-lg border border-red-500/30 bg-red-500/5 px-3 py-2 text-sm text-red-500"
                role="alert"
              >
                {error}
              </p>
            )}

            {!isMessageOnly && (
              <div>
                <label className="field-label" htmlFor="contact-name">
                  Name
                </label>
                <input
                  ref={firstFieldRef}
                  className="field-input"
                  id="contact-name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  autoComplete="name"
                  required
                />
              </div>
            )}

            {!isMessageOnly && (
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="field-label" htmlFor="contact-email">
                    Email
                  </label>
                  <input
                    className="field-input"
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder="you@company.com"
                    autoComplete="email"
                  />
                </div>
                <div>
                  <label className="field-label" htmlFor="contact-phone">
                    Phone <span className="text-faint">(optional)</span>
                  </label>
                  <input
                    className="field-input"
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    placeholder="+94 00 000 0000"
                    autoComplete="tel"
                  />
                </div>
              </div>
            )}

            {!isAccessRequest && (
              <div>
                <label className="field-label" htmlFor="contact-message">
                  {isMessageOnly
                    ? "Your message"
                    : isContactRequest
                      ? (
                        <>
                          Message <span className="text-faint">(optional)</span>
                        </>
                      )
                      : productName
                        ? `What would you like to do with ${productName}?`
                        : "What would you like to build?"}
                </label>
                <textarea
                  ref={isMessageOnly ? firstFieldRef : undefined}
                  className="field-input field-textarea"
                  id="contact-message"
                  name="message"
                  placeholder={
                    isMessageOnly || isContactRequest
                      ? "Type your message here."
                      : "A short description is plenty to get started."
                  }
                  required={!isContactRequest}
                />
              </div>
            )}

            <button
              className="btn btn-gradient mt-1 w-full"
              type="submit"
              disabled={status === "sending"}
            >
              {status === "sending"
                ? "Sending…"
                : isAccessRequest
                  ? "Send request"
                  : isContactRequest
                    ? "Request contact"
                    : "Send message"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
