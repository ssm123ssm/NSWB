"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useConsent } from "./Consent";

/**
 * Deliberately not a modal. Nothing on this site is withheld pending an
 * answer, so the banner does not trap focus, does not dim the page, and does
 * not close on Escape — dismissing by keystroke would have to be recorded as
 * one answer or the other, and neither is what the person meant.
 */
export default function CookieBanner() {
  const { consent, decide, visible } = useConsent();
  const bannerRef = useRef(null);

  /* The banner floats over the page, and on a phone it floats over the bottom
     of the hero — where the product marks sit. Nothing is unreachable, but the
     first screen someone sees is the one with a panel across the end of it.

     So it publishes its own height, and the hero subtracts it (see
     --consent-height in globals.css). Measured rather than assumed: the card's
     height moves with the text, the font and the "Currently accepted" line that
     only appears on a reopen, and every guessed constant here would be wrong
     for one of those. Observed rather than read once, because the card reflows
     when the viewport is rotated or resized.

     Cleared on unmount, which is what returns the hero to full height the
     moment the question is answered. */
  useEffect(() => {
    const el = bannerRef.current;
    const root = document.documentElement;
    if (!visible || !el) {
      root.style.removeProperty("--consent-height");
      return;
    }

    const publish = () => {
      // The 1rem the banner is inset from the bottom edge is part of what it
      // occupies, so it is part of what the hero has to clear.
      root.style.setProperty(
        "--consent-height",
        `${Math.ceil(el.getBoundingClientRect().height) + 16}px`
      );
    };

    publish();
    const observer = new ResizeObserver(publish);
    observer.observe(el);
    return () => {
      observer.disconnect();
      root.style.removeProperty("--consent-height");
    };
  }, [visible, consent]);

  if (!visible) return null;

  return (
    <div
      ref={bannerRef}
      className="consent-banner"
      role="region"
      aria-labelledby="consent-banner-title"
    >
      <p className="eyebrow">Cookies</p>
      <h2 id="consent-banner-title" className="mt-1.5 text-[0.95rem]">
        This website uses cookies
      </h2>
      <p className="mt-2 text-[0.85rem] leading-relaxed text-muted">
        One cookie remembers your choice, and we count page views only if you
        accept. No advertising, nothing sold.{" "}
        <Link className="link-muted" href="/legal/website-privacy">
          What we collect
        </Link>
      </p>

      {/* Only shown on a reopen, where the useful information is what the
          current answer is rather than what the question is. */}
      {consent && (
        <p className="mt-2 font-[family-name:var(--font-mono)] text-xs text-faint">
          Currently {consent === "granted" ? "accepted" : "declined"}.
        </p>
      )}

      {/* Equal weight on both, by design: refusing has to be exactly as easy
          as agreeing, and a greyed-out decline is the usual way that fails. */}
      <div className="mt-4 flex gap-2">
        <button
          className="btn btn-bordered btn-sm flex-1"
          type="button"
          onClick={() => decide("granted")}
        >
          Accept
        </button>
        <button
          className="btn btn-bordered btn-sm flex-1"
          type="button"
          onClick={() => decide("denied")}
        >
          Decline
        </button>
      </div>
    </div>
  );
}

/** Footer trigger, so a decision is never one you are stuck with. */
export function CookieSettingsButton() {
  const { reopen } = useConsent();

  return (
    <button className="link-muted cursor-pointer" type="button" onClick={reopen}>
      Cookies
    </button>
  );
}
