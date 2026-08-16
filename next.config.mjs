/**
 * The Content-Security-Policy, and why it ships report-only first.
 *
 * The site needs three things a strict policy would otherwise block: the inline
 * theme script in the root layout, which has to run before first paint or a
 * dark-theme visitor gets a white flash; Tailwind's injected styles; and Vercel
 * Analytics, which loads from the deployment's own origin but reports to
 * vitals.vercel-insights.com. All three are named below.
 *
 * `unsafe-inline` on script-src is the one real compromise, and it is there for
 * the theme script alone. The honest fix is a nonce, which needs the response
 * to stop being static — a real cost on a site that is entirely prerendered, to
 * close a hole in a page that renders no user input. Worth revisiting if the
 * site ever gains a route that echoes something a visitor typed.
 *
 * Report-only means violations are logged to the browser console and enforced
 * on nothing. Watch it for a few days on the live domain, confirm the console
 * is quiet, then rename the header to `Content-Security-Policy` to turn it on.
 * Shipping straight to enforcing risks a blank page for visitors and silence
 * for us, which is the failure this ordering avoids.
 */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self' https://vitals.vercel-insights.com",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
  // `upgrade-insecure-requests` belongs here too, but a browser ignores it in a
  // report-only policy and logs a warning saying so on every page load. Add it
  // back in the same commit that renames the header to the enforcing one.
].join("; ");

const securityHeaders = [
  // Two years, with subdomains: nsqr, vault and presence all run under
  // neurasense.io and are covered by this. `preload` is deliberately omitted —
  // it is a one-way door that is slow to undo, and it should be a decision made
  // once HSTS has been running here without incident.
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains",
  },
  // Stops a browser second-guessing a declared Content-Type, which is how a
  // served file talks its way into being executed as a script.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // frame-ancestors in the CSP is the modern form of this and covers it, but
  // the CSP is report-only for now and this is not. Clickjacking cover from the
  // first deploy rather than from whenever the CSP is switched on.
  { key: "X-Frame-Options", value: "DENY" },
  // Send the full URL within the site, only the origin when leaving it. Outward
  // links go to our own product apps and to LinkedIn/GitHub, and none of them
  // need to know which page someone left from.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // The site asks for none of these, so nothing embedded in it can either.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
  { key: "Content-Security-Policy-Report-Only", value: csp },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  // `next dev` and `next build` both own `.next` by default, so a verification
  // build silently replaces the running dev server's working directory with a
  // production one and every route starts failing. `npm run build:check` sets
  // NEXT_DIST_DIR so that build lands somewhere else and leaves dev alone.
  distDir: process.env.NEXT_DIST_DIR || ".next",

  // Removes the header that announces which framework and version this is.
  poweredByHeader: false,

  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
