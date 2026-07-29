"use client";

import Link from "next/link";
import { useConsent } from "./Consent";

/**
 * Deliberately not a modal. Nothing on this site is withheld pending an
 * answer, so the banner does not trap focus, does not dim the page, and does
 * not close on Escape — dismissing by keystroke would have to be recorded as
 * one answer or the other, and neither is what the person meant.
 */
export default function CookieBanner() {
  const { consent, decide, visible } = useConsent();

  if (!visible) return null;

  return (
    <div
      className="consent-banner"
      role="region"
      aria-labelledby="consent-banner-title"
    >
      <p className="eyebrow">Analytics</p>
      <h2 id="consent-banner-title" className="mt-1.5 text-[0.95rem]">
        May we count this visit?
      </h2>
      <p className="mt-2 text-[0.85rem] leading-relaxed text-muted">
        We use Plausible to count visits — no cookies, no identifier that
        follows you, and nothing shared with advertisers. It stays off unless
        you allow it, and you can change your mind from the footer.{" "}
        <Link className="link-faint" href="/legal/website-privacy">
          What we collect
        </Link>
      </p>

      {/* Only shown on a reopen, where the useful information is what the
          current answer is rather than what the question is. */}
      {consent && (
        <p className="mt-2 font-[family-name:var(--font-mono)] text-xs text-faint">
          Currently {consent === "granted" ? "allowed" : "declined"}.
        </p>
      )}

      {/* Equal weight on both, by design: refusing has to be exactly as easy
          as agreeing, and a greyed-out decline is the usual way that fails. */}
      <div className="mt-4 flex gap-2">
        <button
          className="btn btn-secondary btn-sm flex-1"
          type="button"
          onClick={() => decide("granted")}
        >
          Allow
        </button>
        <button
          className="btn btn-secondary btn-sm flex-1"
          type="button"
          onClick={() => decide("denied")}
        >
          No thanks
        </button>
      </div>
    </div>
  );
}

/** Footer trigger, so a decision is never one you are stuck with. */
export function CookieSettingsButton() {
  const { reopen } = useConsent();

  return (
    <button className="link-faint cursor-pointer" type="button" onClick={reopen}>
      Cookies
    </button>
  );
}
