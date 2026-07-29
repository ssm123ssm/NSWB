"use client";

import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { useConsent } from "./Consent";

/**
 * Vercel Web Analytics, mounted only once someone has said yes.
 *
 * It sets no cookies and keeps no persistent identifier — a returning visitor
 * is recognised by a hash of the incoming request that resets every 24 hours —
 * so consent for the measurement itself is not legally required. This gate is
 * deliberately stricter than the law, because the privacy notice claims the
 * site measures nothing until you say so and that claim should be literally
 * true.
 *
 * Only records on a Vercel deployment with Web Analytics enabled for the
 * project. Everywhere else the script has no intake to report to.
 */
export default function Analytics() {
  const { granted } = useConsent();

  if (!granted) return null;

  return <VercelAnalytics />;
}
