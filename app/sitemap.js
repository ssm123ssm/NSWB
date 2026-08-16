import { legalDocs, products, site } from "./data/site";

/**
 * Built from the product and legal data rather than a hand-kept list, so a new
 * product page with a `detail` route joins the sitemap by existing. The one
 * thing to remember is the static list below — it is short, and it is only the
 * pages that are not derived from data.
 *
 * `priority` is a hint and search engines mostly ignore it; it is set here only
 * to say which pages we would rather have crawled first, which is the home page
 * and the two products with public detail pages.
 */
export default function sitemap() {
  const now = new Date();

  const staticRoutes = [
    { path: "", priority: 1 },
    { path: "/products", priority: 0.9 },
    { path: "/legal", priority: 0.3 },
  ];

  const productRoutes = products
    .filter((product) => product.detail)
    .map((product) => ({ path: product.detail, priority: 0.9 }));

  const legalRoutes = legalDocs.map((doc) => ({
    path: doc.href,
    priority: 0.3,
  }));

  return [...staticRoutes, ...productRoutes, ...legalRoutes].map(
    ({ path, priority }) => ({
      url: `${site.url}${path}`,
      lastModified: now,
      changeFrequency: priority >= 0.9 ? "weekly" : "yearly",
      priority,
    })
  );
}
