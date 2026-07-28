import Link from "next/link";
import ProductTimeline from "./components/ProductTimeline";
import { ContactButton } from "./components/SiteChrome";
import { iconMap } from "./components/Icons";
import { capabilities, principles, products } from "./data/site";

export default function HomePage() {
  // Timeline order: shipped first, then what is still being built.
  const ordered = [
    ...products.filter((p) => p.status === "live"),
    ...products.filter((p) => p.status !== "live"),
  ];

  return (
    <main id="main">
      {/* ------------------------------------------------------------ Hero */}
      <section className="relative overflow-hidden">
        <div className="grid-field pointer-events-none absolute inset-0" aria-hidden="true" />
        <div
          className="glow left-1/2 top-[-10rem] h-[26rem] w-[36rem] -translate-x-1/2 bg-[color:var(--accent)]"
          aria-hidden="true"
        />

        <div className="shell relative flex flex-col items-center pb-20 pt-16 text-center sm:pt-24">
          <span className="pill animate-rise">
            Applied AI
            <span className="text-faint" aria-hidden="true">·</span>
            Cryptography
            <span className="text-faint" aria-hidden="true">·</span>
            Software
          </span>

          <h1 className="display animate-rise mt-7 max-w-4xl" style={{ animationDelay: "60ms" }}>
            Precision intelligence systems with a{" "}
            <span className="text-brand">cryptographic spine</span>
          </h1>

          <p
            className="lead animate-rise mt-6 max-w-2xl"
            style={{ animationDelay: "120ms" }}
          >
            Neurasense designs AI, data science, and secure software for teams who
            need high-confidence outcomes. We turn deep research into calm,
            production-grade systems.
          </p>

          <div
            className="animate-rise mt-9 flex flex-col items-stretch gap-3 sm:flex-row"
            style={{ animationDelay: "180ms" }}
          >
            <ContactButton>Start a project</ContactButton>
            <Link className="btn btn-secondary" href="/products">
              View products
            </Link>
          </div>

          <div
            className="animate-rise mt-16 w-full max-w-3xl"
            style={{ animationDelay: "240ms" }}
          >
            <p className="text-xs uppercase tracking-[0.14em] text-faint">
              Shipping today
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {products.map((product) => (
                <span
                  key={product.slug}
                  className="text-sm font-medium text-muted"
                  data-brand={product.accent}
                >
                  {product.name}
                </span>
              ))}
            </div>
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

      {/* ---------------------------------------------------------- Contact */}
      <section className="section" id="contact">
        <div className="shell">
          <div className="card relative overflow-hidden px-6 py-14 text-center sm:px-12">
            <div
              className="glow left-1/2 top-full h-[20rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 bg-[color:var(--accent)]"
              aria-hidden="true"
            />
            <div className="relative">
              <h2 className="section-title">Tell us what you&apos;d like to build</h2>
              <p className="lead mx-auto mt-4 max-w-xl">
                Share your idea or challenge, and we will help shape it into a
                clear plan with the right tech and timeline.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <ContactButton>Start a project</ContactButton>
                <Link className="btn btn-secondary" href="/vault">
                  Explore Vault
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
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
