import Link from "next/link";
import { ContactButton } from "./components/SiteChrome";
import {
  ArrowIcon,
  CheckIcon,
  DocIcon,
  LayersIcon,
  LockIcon,
  NeuralIcon,
  ShieldIcon,
} from "./components/Icons";
import ProductName from "./components/ProductName";
import {
  capabilities,
  closing,
  hero,
  heroStats,
  principles,
  products,
} from "./data/site";

export const metadata = {
  alternates: { canonical: "/" },
};

const icons = {
  layers: LayersIcon,
  lock: LockIcon,
  neural: NeuralIcon,
  shield: ShieldIcon,
  doc: DocIcon,
};

export default function HomePage() {
  return (
    <main id="main">
      <Hero />
      <Capabilities />
      <Products />
      <Principles />
      <Closing />
    </main>
  );
}

/* -------------------------------------------------------------------------
   The hero

   Centred on the grey ground, with nothing behind it. The headline is the
   studio's own sentence and does not change; only its second tone moves, onto
   its own line.
   ------------------------------------------------------------------------- */
function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="shell flex flex-col items-center pb-16 pt-20 text-center md:pb-24 md:pt-28">
        <Link className="pill rise" href="/colab">
          <span className="pill-tag">{hero.pill.tag}</span>
          {hero.pill.text}
          <ArrowIcon className="h-3.5 w-3.5" />
        </Link>

        <h1 className="rise mt-7 max-w-4xl text-[clamp(2.5rem,6.4vw,4.75rem)]">
          {hero.headlineHead}{" "}
          <span className="display-tone">{hero.headlineTail}</span>
        </h1>

        <p className="lead lead-center rise text-[clamp(1.0625rem,1.7vw,1.25rem)]">
          {hero.lead}
        </p>

        <div className="rise mt-9 flex flex-wrap items-center justify-center gap-3">
          <a className="btn btn-gradient btn-lg" href={hero.actions.primary.href}>
            {hero.actions.primary.label}
            <ArrowIcon />
          </a>
          <Link className="btn btn-bordered btn-lg" href={hero.actions.secondary.href}>
            {hero.actions.secondary.label}
          </Link>
        </div>
      </div>

      <div className="shell pb-16 md:pb-24">
        <dl className="grid grid-cols-2 gap-6 border-y border-[color:var(--border)] py-10 md:grid-cols-4">
          {heroStats.map((stat) => (
            <div className="text-center" key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="stat-value display-tone block">{stat.value}</span>
                <span className="stat-label block">{stat.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------
   Capabilities, as a bento
   ------------------------------------------------------------------------- */
function Capabilities() {
  return (
    <section className="section section-subtle" id="capabilities">
      <div className="shell">
        <p className="eyebrow">What we do</p>
        <h2 className="section-title max-w-2xl">
          Three disciplines, kept in the same room
        </h2>
        <p className="lead">
          Most of what breaks in software breaks between the disciplines that
          built it. We keep them together and argue early instead.
        </p>

        <div className="bento mt-12">
          {capabilities.map((capability) => {
            const Icon = icons[capability.icon];
            return (
              <article
                className={`card card-hover card-tinted ${capability.wide ? "bento-wide" : ""}`}
                data-brand={capability.accent}
                key={capability.title}
              >
                <span className="icon-tile icon-tile-lg">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-xl">{capability.title}</h3>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-muted">
                  {capability.body}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {capability.points.map((point) => (
                    <li className="chip" key={point}>
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------
   Products

   Every product in the studio, as a card. The three with a page of their own
   link to it; the rest open the contact dialog, because sending someone to a
   page that does not exist is worse than saying so.
   ------------------------------------------------------------------------- */
function Products() {
  return (
    <section className="section" id="products">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">The studio</p>
            <h2 className="section-title max-w-2xl">What we build</h2>
          </div>
          <Link className="link-arrow" href="/products">
            All products
            <ArrowIcon />
          </Link>
        </div>

        <div className="bento mt-12">
          {products.map((product) => (
            <article
              className="card card-hover"
              data-brand={product.accent}
              key={product.slug}
            >
              <div className="flex items-start justify-between gap-4">
                <span className="icon-tile">
                  <LayersIcon className="h-5 w-5" />
                </span>
                <span
                  className={`chip ${product.status === "live" ? "chip-dot" : "chip-neutral"}`}
                >
                  {product.status === "live" ? "Live" : "In development"}
                </span>
              </div>

              <h3 className="mt-5 text-xl">
                <ProductName product={product} />
              </h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">
                {product.tagline}
              </p>

              <ul className="check-list">
                {product.highlights?.slice(0, 3).map((highlight) => (
                  <li key={highlight}>
                    <CheckIcon className="h-4 w-4" />
                    {highlight}
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-1">
                {product.detail ? (
                  <Link className="link-arrow" href={product.detail}>
                    Explore {product.name}
                    <ArrowIcon />
                  </Link>
                ) : (
                  <ContactButton
                    className="link-arrow"
                    subject={product.name}
                    intent="access"
                  >
                    Request access
                    <ArrowIcon />
                  </ContactButton>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------
   Principles
   ------------------------------------------------------------------------- */
function Principles() {
  return (
    <section className="section section-subtle">
      <div className="shell">
        <p className="eyebrow">How we work</p>
        <h2 className="section-title max-w-2xl">
          Four things we do not negotiate
        </h2>

        <div className="bento mt-12">
          {principles.map((principle) => {
            const Icon = icons[principle.icon] ?? ShieldIcon;
            return (
              <article
                className="card card-hover"
                data-brand={principle.accent}
                key={principle.title}
              >
                <div className="flex items-center gap-3">
                  <span className="icon-tile icon-tile-soft">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-sm text-faint">
                    {principle.label}
                  </span>
                </div>
                <h3 className="mt-5 text-lg">{principle.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">
                  {principle.description}
                </p>
                {principle.note && (
                  <Link className="link-arrow mt-5" href={principle.note.href}>
                    {principle.note.text}
                    <ArrowIcon />
                  </Link>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------
   The closing call, on a full gradient plate
   ------------------------------------------------------------------------- */
function Closing() {
  return (
    <section className="section-tight">
      <div className="shell">
        <div className="gradient-panel">
          <div className="relative z-10 mx-auto max-w-2xl">
            <h2 className="text-[clamp(1.75rem,3.6vw,2.75rem)] font-bold tracking-tight">
              {closing.title}
            </h2>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-white/85">
              {closing.body}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <ContactButton className="btn btn-lg bg-white text-[color:var(--text)] hover:opacity-90">
                Start a conversation
              </ContactButton>
              <Link
                className="btn btn-lg border-2 border-white/40 text-white hover:border-white"
                href="/products"
              >
                See the products
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
