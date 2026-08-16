import { site } from "./data/site";

/**
 * Everything public is crawlable. The only exclusion is the contact endpoint —
 * it accepts POSTs, there is nothing at it to index, and keeping crawlers off
 * it keeps the rate limiter's counters about real visitors.
 */
export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
