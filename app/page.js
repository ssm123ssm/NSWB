import Link from "next/link";
import NsqrReel from "./components/NsqrReel";
import ProductName from "./components/ProductName";
import ProductTimeline from "./components/ProductTimeline";
import { ArrowIcon } from "./components/Icons";
import { featuredProducts, overview, principles, products } from "./data/site";

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
      {/* ScreenPager is parked, not gone. It moved a whole screen per scroll
          gesture by taking the wheel event, and it was carefully scoped —
          desktop only, never under reduced motion, released at both ends. The
          objection is not to the implementation but to the pattern: cancelling
          a scroll gesture fights the reader's own hand, and on a trackpad with
          momentum it reads as the page misbehaving. That is a poor first
          impression for a studio whose claim is that it notices what breaks.

          What replaces it is what was already written as its fallback. The
          component was the only thing putting .screens-paged on <html>, and
          globals.css switches on CSS scroll-snap in its absence — so the two
          screens still hold together, using the browser's own snapping, which
          nothing has to fight.

          To bring it back: restore the import and render <ScreenPager /> here.
          The component file is untouched at app/components/ScreenPager.js. */}

      {/* ------------------------------------------------------------ Hero */}
      {/* The house colour is neutral, so the hero borrows the featured
          product's accent for its two coloured elements — the headline span and
          the glow. It follows whichever product carries `featured`, the same
          way the closing banner does. */}
      <section
        className="hero-screen screen relative overflow-hidden"
        data-brand={featured.accent}
      >
        <div className="grid-field pointer-events-none absolute inset-0" aria-hidden="true" />
        <div
          className="glow left-1/2 top-[-10rem] h-[26rem] w-[36rem] -translate-x-1/2 bg-[color:var(--brand)]"
          aria-hidden="true"
        />

        {/* .screen sets the one-viewport height; this fills it. Two bands, not
            one stack: the headline block takes the free space and centres
            inside it, and the strip of product marks sits near the bottom
            edge, so the marks are the last thing in the first screen and the
            thing it hands over to. That only reads as the floor of the screen
            because .hero-screen subtracts the header from its height — the
            header is sticky and therefore in flow, so a plain 100svh hero ends
            below the fold and takes this strip with it. The bottom padding is
            deliberately much smaller than the top one, so the strip sits low
            enough to read as a base rather than as a third block floating in
            the middle. */}
        {/* pt-20 on a phone rather than pt-24: the 1rem it gives back is part
            of what keeps the product strip above the consent card on a small
            screen. The fuller measure returns at sm, where the card is a
            floating panel off to one side and overlaps nothing. */}
        <div className="shell relative flex flex-1 flex-col pb-10 pt-20 text-center sm:pb-12 sm:pt-24">
          <div className="flex flex-1 flex-col items-center justify-center">
            <h1 className="display animate-rise max-w-4xl">
              We think about what breaks —{" "}
              <span className="text-brand">before it breaks</span>
            </h1>

            <p
              className="lead-mono animate-rise mt-7 max-w-xl"
              style={{ animationDelay: "60ms" }}
            >
              A studio for software, cryptography, and applied AI. Nothing here
              is assumed to work.
            </p>

            {/* The hero's single action, kept as a quiet link rather than a
                button: the headline already carries the fold, and a violet
                button here would be a second accent competing with it. */}
            <div
              className="animate-rise mt-10"
              style={{ animationDelay: "120ms" }}
            >
              <Link className="link-arrow link-muted" href="/products">
                View products
                <ArrowIcon />
              </Link>
            </div>
          </div>

          {/* The rule is set to max-w-3xl rather than the headline's max-w-4xl:
              both are centred in the same shell, and a rule slightly narrower
              than the text above it reads as a base under the block instead of
              a line crossing it. */}
          <div
            className="animate-rise mx-auto mt-8 w-full max-w-3xl border-t border-[color:var(--border)] pt-7 sm:mt-12"
            style={{ animationDelay: "180ms" }}
          >
            <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
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

      {/* ------------------------------------------------------- Overview */}
      {/* The second screen. Carries .screen so it is a full viewport of its
          own and the site opens as a pair of them — the hero states the claim,
          this one says who is making it — before the page settles into
          ordinary scrolling at Capabilities below.

          Sits between the hero and Capabilities so the conversational register
          lands once the reader is already oriented. Plain .section, because
          Capabilities below is .section-subtle and the two alternate.

          Set as a statement block rather than a centred paragraph: the sentence
          is the one spoken line on the site, and centred body copy of one line
          reads as a caption that got separated from its picture. Ranged left
          against a brand rule, with the middle clause marked, it reads as
          something said. Borrows the featured product's accent, as the hero
          does. */}
      <section
        className="screen section"
        id="overview"
        data-brand={featured.accent}
      >
        <div className="shell">
          <div className="statement reveal mx-auto max-w-4xl">
            <p className="eyebrow">{overview.eyebrow}</p>
            <p className="statement-body mt-6">
              {overview.parts.lead}{" "}
              <span className="mark-brand">{overview.parts.mark}</span>{" "}
              {overview.parts.tail}
            </p>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- Capabilities */}
      {/* One section where there were two. The three capability cards and the
          three principles were the same claim told twice — a card naming a
          discipline, then a numbered cell naming how it is practised — and read
          back to back they diluted each other. What survives is the
          capabilities heading over the principles row: the heading says what we
          build on, the row says what holds while we do.

          Keeps id="capabilities" and .snap-edge, both of which the nav and the
          screen sequence above address by name. */}
      <section className="snap-edge section section-subtle" id="capabilities">
        <div className="shell">
          <SectionHeading
            title="Everything we build on"
            lead="A focused set of disciplines built for secure, scalable intelligence — research depth paired with operational delivery."
          />

          {/* Same three cells as before, each in its own accent: the numeral is
              already .eyebrow and so takes --brand for free, and
              .principle-cell adds the bar along the leading edge. */}
          <ol className="mx-auto mt-12 grid max-w-4xl overflow-hidden rounded-[var(--radius)] border border-[color:var(--border)] sm:grid-cols-3">
            {principles.map((item, index) => (
              <li
                className={`principle-cell reveal p-6 ${
                  index > 0
                    ? "border-t border-[color:var(--border)] sm:border-l sm:border-t-0"
                    : ""
                }`}
                data-brand={item.accent}
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

      {/* --------------------------------------------------------- Products */}
      <section className="section" id="products">
        <div className="shell">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="section-title">
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
            <p className="badge">
              Featuring <ProductName product={featured} />
            </p>
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
 *
 * The chip is the strip's only emphasis, and it goes to the products carrying
 * `lead` — see the products data for why it is two of them and not five. The
 * others sit back at 70% and come up on hover, so the line still reads as one
 * row of the same kind of thing rather than two tiers of product.
 */
function HeroProductLink({ product }) {
  const href =
    product.access === "request" ? null : product.detail ?? product.app;
  const base = "inline-flex items-center rounded-full text-sm transition-opacity";
  const className = product.lead
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

function SectionHeading({ title, lead }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <h2 className="section-title">{title}</h2>
      <p className="lead mt-4">{lead}</p>
    </div>
  );
}
