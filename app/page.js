import Link from "next/link";
import HeroReveal from "./components/HeroReveal";
import PrincipleTrack from "./components/PrincipleTrack";
import ProductName from "./components/ProductName";
import ProductShowcase from "./components/ProductShowcase";
import ProductTimeline from "./components/ProductTimeline";
import { ArrowIcon } from "./components/Icons";
import {
  featuredProducts,
  getProduct,
  overview,
  principles,
  productShowcase,
  products,
  publications,
} from "./data/site";

// Whichever product carries `featured` in the product data is the accent the
// page borrows wherever it needs one — the hero and the Overview statement —
// so both emphasise the same product the hero strip does, from one place. The
// closing showcase used to read it too, for the mark in its lead; that lead is
// gone and its panels carry their own accents.
const featured = featuredProducts[0];

/* The research card under Capabilities counts and names its own sources rather
   than restating them in prose. A paper added to `publications` changes the
   figure and, if it lands somewhere new, the list of venues — so the home page
   cannot end up claiming a number the /research page contradicts.

   `Set` over the venues keeps first-seen order, and the data is newest first,
   which puts the two journals ahead of the preprint server. Formatted rather
   than joined so the conjunction is right at any length. */
const paperCount = publications.length;
const paperVenues = new Intl.ListFormat("en-GB", {
  style: "long",
  type: "conjunction",
}).format([...new Set(publications.map((paper) => paper.venue))]);

// The showcase data holds capabilities against a slug and nothing else, so the
// product facts are resolved from the registry here rather than duplicated
// there. Done at module scope on the server, which keeps the whole `products`
// array out of the client island.
//
// `id` rather than the slug as the React key: NSQR appears twice on the track —
// once as its capability panel, once as the closing reel — so the slug is no
// longer unique across the list.
const showcaseItems = productShowcase.map((entry) => ({
  id: entry.feature ? `${entry.slug}-feature` : entry.slug,
  product: getProduct(entry.slug),
  capabilities: entry.capabilities,
  feature: entry.feature ?? false,
}));


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
          way the Overview and the closing showcase do. */}
      <section
        className="hero-screen screen relative overflow-hidden"
        data-brand={featured.accent}
      >
        <div
          className="glow left-1/2 top-[-10rem] h-[26rem] w-[36rem] -translate-x-1/2 bg-[color:var(--brand)]"
          aria-hidden="true"
        />
        {/* The hero's ground, in place of the grid: product surfaces held just
            under legibility, with a light that moves over them with the
            pointer. Decoration only — it restates the strip of names below and
            carries no information of its own, so it is hidden from assistive
            technology and absent entirely without a pointer. */}
        <HeroReveal products={live} />

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
          <div className="statement reveal mx-auto max-w-5xl">
            <p className="statement-body">
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

          Keeps id="capabilities", which the nav addresses by name.

          The heading moved inside PrincipleTrack, which holds it still on the
          left while the three principles pass it, so the centred heading that
          sat over a centred row is now ranged left with the column it belongs
          to. This was the last caller of the local SectionHeading helper, which
          went with it.

          .snap-edge is back here. The class belongs to whatever directly
          follows the last .screen, so that the scroll leaving the Overview
          commits to a section edge rather than releasing into the middle of
          one. The showcase held it while it sat in this slot; now that the
          showcase closes the page, this is the section that follows the
          screens again. */}
      <section className="snap-edge section section-subtle" id="capabilities">
        <div className="shell">
          <PrincipleTrack
            title="Everything we build on"
            lead="A focused set of disciplines built for secure, scalable intelligence — research depth paired with operational delivery."
            principles={principles}
          />

          {/* The lead directly above says "research depth", so the pointer to
              the papers sits here, at the line it refers to.

              A card rather than the line of fine print it was. That line named
              a count and three venues and then stopped, which told a reader the
              work existed without telling them anything about it — and set at
              --text-faint under a track of full-height plates, it read as a
              footnote to the section rather than as part of it. The card is
              deliberately small and ranged left under the heading column: it is
              a door to the research page, not a summary of the research.

              Kept off .card-hover: nothing lifts unless the whole card is the
              click target, and here the link inside it is. */}
          <div className="card mt-10 max-w-xl p-6">
            <div className="flex items-baseline justify-between gap-4">
              <p className="eyebrow">Research</p>
              {/* The count as a figure, in mono, where the papers themselves
                  are numbered on /research. */}
              <p className="font-[family-name:var(--font-mono)] text-xs text-faint">
                {String(paperCount).padStart(2, "0")} papers
              </p>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-muted">
              Peer-reviewed and preprint work in {paperVenues}: retrieval
              augmented generation, aligning language models for clinical tasks,
              and automated short answer marking measured against human
              examiners.
            </p>

            <Link className="link-arrow mt-5 inline-flex" href="/research">
              Read the publications
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- Products */}
      {/* Trimmed bottom padding: the showcase below has no heading of its own
          and opens straight onto its panels, so it reads as the continuation of
          this section rather than as a new one — and a full .section bottom
          here plus a full top there would have put a screen of nothing between
          the timeline and the reel it hands over to. The gap is the sum of the
          two, so it is set from both sides: 80px here, nothing there. */}
      <section className="section pb-20" id="products">
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

      {/* --------------------------------------------------------- Showcase */}
      {/* Four products, each as one app screen with its capabilities beside it,
          and a fifth panel that is NSQR again as the reel.

          This closes the page. It used to open the work, sitting directly under
          the Overview, and a separate "Featuring NSQR" banner closed instead —
          which meant the reel was reached twice, once as this section's fifth
          card and again as the banner a screen later. The banner is gone and
          this section took its slot: the page now argues before it shows, and
          the reel is the last thing on the page exactly once.

          The fifth card is a repeat on purpose. Four capability panels end on
          Presence, which is the quietest of them and the one with the least to
          show; ending on the featured product actually running is a better last
          thing to reach, and now that this section is the foot of the page it
          is also the note the whole page goes out on. Nothing announces that
          card any more — the lead used to promise it — so it is a thing found
          at the end of the sweep rather than a thing advertised before it.

          Four and not six: Lipd Hub and AES are by request and have no screen a
          stranger may see, so there is nothing here that could honestly be
          drawn for them. They keep their place in the timeline above.

          No heading and no lead. It had both — "Meet the products" over a
          sentence explaining the gesture — and they were the third centred
          heading block in a row, saying about the panels what the panels say
          themselves the moment they are looked at. Without them the section
          opens straight onto the work, which is the one thing here that is not
          a claim about the work.

          That is also why there is no top padding: with nothing to introduce,
          the reel is the continuation of the timeline above rather than a new
          section, and the whole seam is set by the trimmed bottom padding
          there. See the note on the Products section.

          Plain .section rather than .section-subtle: Products directly above is
          plain too, but the panels carry their own surface, which is what
          separates this section from the page without a band behind it.

          Swept sideways rather than stacked. Four panels this size made a very
          long section that argued the product line twice over, once here and
          again in the timeline; one panel at a time costs a quarter of
          the height and asks the reader for a gesture rather than a scroll. The
          horizontal axis snaps `mandatory` while the vertical screens above
          snap `proximity` — see .showcase-track in globals for why those two
          answers differ. */}
      <section className="section pb-16 pt-0" id="showcase">
        <div className="shell">
          <ProductShowcase items={showcaseItems} />
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
