import Link from "next/link";
import NsqrReel from "./components/NsqrReel";
import ProductName from "./components/ProductName";
import ProductTimeline from "./components/ProductTimeline";
import { ContactButton } from "./components/SiteChrome";
import { iconMap } from "./components/Icons";
import { capabilities, featuredProducts, principles, products } from "./data/site";

// The closing section leads with whatever carries `featured` in the product
// data, so the capsule names the same product the hero strip emphasises.
const featured = featuredProducts[0];

export default function HomePage() {
  const live = products.filter((p) => p.status === "live");
  const upcoming = products.filter((p) => p.status !== "live");
  // Timeline order: shipped first, then what is still being built.
  const ordered = [...live, ...upcoming];

  return (
    <main id="main">
      {/* ------------------------------------------------------------ Hero */}
      <section className="relative overflow-hidden">
        <div className="grid-field pointer-events-none absolute inset-0" aria-hidden="true" />
        <div
          className="glow left-1/2 top-[-10rem] h-[26rem] w-[36rem] -translate-x-1/2 bg-[color:var(--accent)]"
          aria-hidden="true"
        />

        <div className="shell relative flex flex-col items-center pb-20 pt-24 text-center sm:pt-32">
          <h1 className="display animate-rise max-w-4xl">
            Precision intelligence systems with a{" "}
            <span className="text-brand">cryptographic spine</span>
          </h1>

          <p
            className="lead animate-rise mt-6 max-w-2xl"
            style={{ animationDelay: "60ms" }}
          >
            Neurasense designs AI, data science, and secure software for teams who
            need high-confidence outcomes. We turn deep research into calm,
            production-grade systems.
          </p>

          <div
            className="animate-rise mt-9 flex flex-col items-stretch gap-3 sm:flex-row"
            style={{ animationDelay: "120ms" }}
          >
            <ContactButton>Start a project</ContactButton>
            <Link className="btn btn-secondary" href="/products">
              View products
            </Link>
          </div>

          <div
            className="animate-rise mt-16 w-full max-w-2xl border-t border-[color:var(--border)] pt-8"
            style={{ animationDelay: "180ms" }}
          >
            <p className="text-xs uppercase tracking-[0.14em] text-faint">
              Shipping today
            </p>
            <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              {live.map((product) => (
                <li key={product.slug} data-brand={product.accent}>
                  <HeroProductLink product={product} />
                </li>
              ))}
              {upcoming.length > 0 && (
                <li>
                  <Link
                    className="text-sm text-faint transition-colors hover:text-[color:var(--text-muted)]"
                    href="/#products"
                  >
                    +{upcoming.length} in development
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- Capabilities */}
      <section className="section section-subtle" id="capabilities">
        <div className="shell">
          <SectionHeading
            eyebrow="Capabilities"
            title="Everything we build on"
            lead="A focused set of disciplines built for secure, scalable intelligence — research depth paired with operational delivery."
          />

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {capabilities.map((capability) => {
              const Icon = iconMap[capability.icon];
              return (
                <article className="card card-hover p-7" key={capability.id}>
                  <span className="icon-tile">
                    <Icon />
                  </span>
                  <h3 className="mt-5 text-lg">{capability.title}</h3>
                  <p className="mt-2.5 text-[0.95rem] leading-relaxed text-muted">
                    {capability.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- Products */}
      <section className="section" id="products">
        <div className="shell">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Our products</p>
            <h2 className="section-title mt-3">
              A focused line for secure, modern intelligence
            </h2>
            <p className="lead mt-4">
              Each platform blends clean interaction design with research-grade
              engineering.
            </p>
          </div>

          <div className="mt-12">
            <ProductTimeline products={ordered} />
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- Approach */}
      <section className="section section-subtle" id="approach">
        <div className="shell">
          <SectionHeading
            eyebrow="How we work"
            title="Make the complex feel inevitable"
            lead="Our systems are built to be trusted by design — clear in behaviour, secure in data handling, refined in experience."
          />

          <ol className="mx-auto mt-12 grid max-w-4xl overflow-hidden rounded-[var(--radius)] border border-[color:var(--border)] sm:grid-cols-3">
            {principles.map((item, index) => (
              <li
                className={`bg-[color:var(--surface)] p-6 ${
                  index > 0
                    ? "border-t border-[color:var(--border)] sm:border-l sm:border-t-0"
                    : ""
                }`}
                key={item.label}
              >
                <p className="eyebrow">{item.label}</p>
                <h3 className="mt-3 text-base">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ------------------------------------------------------------ NSQR */}
      {/* The page closes on the featured product rather than a contact card.
          Deliberately not #contact: the anchor named a contact prompt, and this
          is a product banner. Contact now runs through the header button and
          the dialog it opens. */}
      {/* Reduced top padding: the principles section above already closes on its
          own full .section padding, so the default would stack two of them. */}
      <section className="section pb-16 pt-10">
        <div className="shell">
          {/* The capsule is what marks this as a feature rather than one more
              card: it wears the product's own accent and names it from the
              data, so it follows whichever product carries `featured`. */}
          <div
            className="mb-5 flex justify-center"
            data-brand={featured.accent}
          >
            <p className="badge">Featuring {featured.name}</p>
          </div>

          <NsqrReel />
        </div>
      </section>
    </main>
  );
}

/**
 * One lockup in the hero strip. Every product sets its own accent through the
 * wordmark, so hierarchy comes from opacity rather than colour: the featured
 * product sits at full strength in a tinted chip, the rest sit back until
 * hovered.
 *
 * Links to the detail page where there is one, otherwise straight out to the
 * app. Proprietary products have no public URL, so they stay plain text rather
 * than inviting a click that goes nowhere.
 */
function HeroProductLink({ product }) {
  const href =
    product.access === "request" ? null : product.detail ?? product.app;
  const base = "inline-flex items-center rounded-full text-sm transition-opacity";
  const className = product.featured
    ? `${base} bg-[color:var(--brand-soft)] px-3 py-1`
    : `${base} opacity-70 ${href ? "hover:opacity-100" : ""}`;

  const label = <ProductName product={product} />;

  if (!href) {
    return <span className={className}>{label}</span>;
  }

  if (product.detail) {
    return (
      <Link className={className} href={href}>
        {label}
      </Link>
    );
  }

  return (
    <a className={className} href={href} target="_blank" rel="noreferrer">
      {label}
    </a>
  );
}

function SectionHeading({ eyebrow, title, lead }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="section-title mt-3">{title}</h2>
      <p className="lead mt-4">{lead}</p>
    </div>
  );
}
