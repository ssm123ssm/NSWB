"use client";

import Script from "next/script";
import { site } from "../data/site";
import { useConsent } from "./Consent";

/**
 * Plausible, loaded only once someone has said yes.
 *
 * Plausible sets no cookies and keeps no persistent identifier, so consent is
 * not legally required for it — this gate is deliberately stricter than the
 * law, because the privacy notice claims the site does nothing until you say
 * so and that claim should be literally true.
 */
export default function Analytics() {
  const { granted } = useConsent();

  if (!granted) return null;

  return (
    <Script
      data-domain={new URL(site.url).hostname}
      src="https://plausible.io/js/script.js"
      strategy="afterInteractive"
    />
  );
}
