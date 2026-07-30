import Link from "next/link";
import { ArrowIcon, ExternalIcon } from "../components/Icons";
import { ContactButton } from "../components/SiteChrome";
import ProductName from "../components/ProductName";
import RequestAccessLink from "../components/RequestAccessLink";
import { principles, products } from "../data/site";

export const metadata = {
  title: "Products",
  description:
    "Vault, NSQR, Presence, Lipd Hub and AES — a focused product line for secure, modern intelligence.",
};

export default function ProductsPage() {
  const live = products.filter((p) => p.status === "live");
  const upcoming = products.filter((p) => p.status !== "live");

  return (
    <main id="main">
      <section className="relative overflow-hidden border-b border-[color:var(--border)]">
        <div className="grid-field pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="shell relative grid gap-12 pb-16 pt-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <p className="eyebrow">Products</p>
            <h1 className="display mt-4 max-w-2xl text-[clamp(2rem,4.6vw,3.25rem)]">
              A focused product line for secure, modern intelligence.
            </h1>
            <p className="lead mt-5 max-w-xl">
              Each platform blends clean interaction design with research-grade
              engineering. Built to feel calm, precise, and dependable.
            </p>
          </div>

          <dl className="card p-6">
            <dt className="text-xs uppercase tracking-[0.14em] text-faint">
              Core themes
            </dt>
            <dd className="mt-5 space-y-3.5">
              {principles.map((item, index) => (
                <div
                  className={`flex items-center justify-between gap-4 text-sm ${
                    index < principles.length - 1
                      ? "border-b border-[color:var(--border)] pb-3.5"
                      : ""
                  }`}
                  key={item.label}
                >
                  <span className="text-muted">{item.title}</span>
                  <span className="font-[family-name:var(--font-mono)] text-xs text-faint">
                    {item.label}
                  </span>
                </div>
              ))}
            </dd>
          </dl>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <h2 className="text-xs uppercase tracking-[0.14em] text-faint">
            Available now
          </h2>
          <div className="mt-6 space-y-5">
            {live.map((product) => (
              <ProductRow key={product.slug} product={product} />
            ))}
          </div>

          {upcoming.length > 0 && (
            <>
              <h2 className="mt-16 text-xs uppercase tracking-[0.14em] text-faint">
                In development
              </h2>
              <div className="mt-6 space-y-5">
                {upcoming.map((product) => (
                  <ProductRow key={product.slug} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <section className="section section-subtle">
        <div className="shell text-center">
          <p className="eyebrow">Start a project</p>
          <h2 className="section-title mt-3">
            Tell us what you want to build next.
          </h2>
          <p className="lead mx-auto mt-4 max-w-xl">
            From AI tooling to secure platforms, we help you design and ship
            products that feel refined and trustworthy from day one.
          </p>
          <div className="mt-8">
            <ContactButton>Start a project</ContactButton>
          </div>
        </div>
      </section>
    </main>
  );
}

function ProductRow({ product }) {
  const isLive = product.status === "live";
  // Proprietary products are shipped but gated, so asking for access is the
  // primary action rather than an afterthought.
  const byRequest = product.access === "request";

  return (
    <article
      className="card card-hover card-accent grid gap-6 p-6 sm:p-8 lg:grid-cols-[0.9fr_1.1fr]"
      data-brand={product.accent}
    >
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="text-2xl">
            <ProductName product={product} />
          </h3>
          <span className={`badge ${isLive ? "" : "badge-outline"}`}>
            {isLive ? (
              <>
                <span className="dot" aria-hidden="true" />
                {byRequest ? "Live · by request" : "Live"}
              </>
            ) : (
              "In development"
            )}
          </span>
        </div>
        <p className="mt-3 text-[0.95rem] font-medium">{product.tagline}</p>
        <p className="mt-2 text-sm text-faint">{product.discipline}</p>
      </div>

      <div className="flex flex-col">
        <p className="text-[0.95rem] leading-relaxed text-muted">
          {product.description}
        </p>

        <ul className="mt-5 flex flex-wrap gap-1.5">
          {product.highlights.map((highlight) => (
            <li
              key={highlight}
              className="rounded-md border border-[color:var(--border)] px-2 py-1 text-[0.7rem] text-faint"
            >
              {highlight}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-6">
          {product.detail && (
            <Link className="link-arrow" href={product.detail}>
              Explore <ProductName product={product} />
              <ArrowIcon />
            </Link>
          )}
          {/* Products with a detail page send people there first; the app link
              lives on that page, so the card does not duplicate it. */}
          {product.app && !product.detail && (
            <a
              className="link-arrow"
              href={product.app}
              target="_blank"
              rel="noreferrer"
            >
              Visit <ProductName product={product} />
              <ExternalIcon className="h-3.5 w-3.5" />
            </a>
          )}
          <RequestAccessLink
            product={product.name}
            label={isLive && !byRequest ? "Talk to us" : "Request access"}
            className={isLive && !byRequest ? "link-muted" : "link-arrow"}
            withArrow={!isLive || byRequest}
          />
        </div>
      </div>
    </article>
  );
}
