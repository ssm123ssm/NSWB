import Link from "next/link";
import { ContactButton } from "./components/SiteChrome";
import {
  ActivityIcon,
  ArrowIcon,
  DocIcon,
  LayersIcon,
  UsersIcon,
  LockIcon,
  NeuralIcon,
  ShieldIcon,
} from "./components/Icons";
import ProductSequence from "./components/ProductSequence";
import ColabFeature from "./components/ColabFeature";
import ComingSoon from "./components/ComingSoon";
import { closing, designPrinciples, founders, hero } from "./data/site";

export const metadata = {
  alternates: { canonical: "/" },
};

const icons = {
  layers: LayersIcon,
  users: UsersIcon,
  lock: LockIcon,
  neural: NeuralIcon,
  shield: ShieldIcon,
  doc: DocIcon,
};

export default function HomePage() {
  return (
    <main id="main">
      <Hero />
      <FoundersNote />
      <ProductsIntro />
      <ColabFeature />
      <ProductSequence />
      <div className="shell flex justify-center py-10 md:hidden">
        <Link className="pill rise" href="/products">
          <span className="pill-icon-ecg">
            <ActivityIcon className="h-4 w-4" />
          </span>
          {hero.pill.text}
          <ArrowIcon className="h-3.5 w-3.5" />
        </Link>
      </div>
      <ComingSoon />
      <DesignPrinciples />
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
        <span className="pill-icon-ecg rise">
          <ActivityIcon className="h-5 w-5" />
        </span>

        <h1 className="rise mt-7 max-w-4xl text-[clamp(3rem,6.4vw,4.5rem)]">
          {hero.headlineHead}{" "}
          <span className="display-tone">{hero.headlineTail}</span>
        </h1>

        <p className="lead lead-center rise">
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
        <ProductBrands />
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------
   The founders' statement

   Type on the ground straight after the stats band — no card, no rule, no
   quotation mark. The reference has no quote component, so this is set as the
   32px sub-section size rather than borrowing an object that would have to be
   invented. Left-aligned, like every other section on the site.
   ------------------------------------------------------------------------- */
function FoundersNote() {
  return (
    <section className="section-tight">
      <div className="shell">
        <p className="statement">
          <span className="statement-opener">{founders.opener}</span>{" "}
          {founders.statement}
        </p>
        <p className="statement-coda">{founders.coda}</p>
        <p className="statement-sign">
          <span className="names">{founders.names}</span>
          <span className="role">{founders.role}</span>
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------
   The products section's own header — coLab's featured scene and the
   five-product sequence that follows it share no title of their own, so
   this is the one line that names the whole area, the way the bento's
   "What we build" eyebrow used to before both replaced it.
   ------------------------------------------------------------------------- */
function ProductsIntro() {
  return (
    <section className="pt-20" id="products">
      <div className="shell text-center">
        <p className="text-base font-medium text-[color:var(--accent-text)] max-md:text-sm">
          Products
        </p>
        <div className="text-5xl font-medium tracking-[-0.015em] max-md:text-4xl">
          <p className="mb-0">One standard.</p>
          <p className="text-[color:var(--display-muted)]">Many expressions</p>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------
   Capabilities, as a bento
   ------------------------------------------------------------------------- */
function DesignPrinciples() {
  return (
    <section className="section section-subtle" id="capabilities">
      <div className="shell">
        <h2 className="section-title max-w-3xl">{designPrinciples.title}</h2>

        <div className="bento mt-12">
          {designPrinciples.items.map((item) => {
            const Icon = icons[item.icon];
            return (
              <article
                className="card card-hover cloud"
                data-brand={item.accent}
                key={item.segments.map((seg) => seg.text).join("")}
              >
                <span className="icon-tile">
                  <Icon className="h-8 w-8" />
                </span>
                <p className="mt-5 text-base leading-[1.5] text-muted">
                  {item.segments.map((seg, i) =>
                    seg.mark ? (
                      <span className="mark" key={i}>
                        {seg.text}
                      </span>
                    ) : (
                      <span key={i}>{seg.text}</span>
                    )
                  )}
                </p>
              </article>
            );
          })}
        </div>

        <p className="principle-closing">{designPrinciples.closing}</p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------
   The closing call, on a full gradient plate
   ------------------------------------------------------------------------- */
function Closing() {
  return (
    <section className="py-20" id="closing">
      <div className="shell">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-5xl font-medium tracking-[-0.015em] max-md:text-4xl">
            <p className="mb-0">{closing.eyebrow}.</p>
            <p className="text-[color:var(--display-muted)]">
              {closing.title.replace(/today$/, "")}
              <span className="text-[color:var(--accent)]">today</span>.
            </p>
          </div>

          <div className="mt-8 inline-flex items-center gap-1 rounded-full border border-[color:var(--accent)]/70 bg-[color:var(--bg-subtle)] p-1">
            <ContactButton
              className="rounded-full px-6 py-2.5 text-[0.95rem] font-medium bg-[color:var(--surface)] text-[color:var(--text)] shadow-sm"
              intent="message"
            >
              Message us
            </ContactButton>
            <ContactButton
              className="rounded-full px-6 py-2.5 text-[0.95rem] font-medium text-muted hover:text-[color:var(--text)]"
              intent="contact"
            >
              Contact us
            </ContactButton>
          </div>

          <p className="mt-10 text-sm font-medium tracking-[0.02em] text-muted">
            Nothing here is assumed to work.
          </p>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------
   Product brands in the hero

   A muted-color grid of the six product brands, matching the stats band style.
   Displayed below the hero statistics, using faint text color like the stat labels.

   Marks are set exactly as given — nsqr, vault, coLab, presence, lipidhub, aes —
   not the capitalised/spaced `name` field from data/site.js.
   ------------------------------------------------------------------------- */
const brandMarks = ["nsqr", "vault", "coLab", "presence", "lipidhub", "aes"];

function ProductBrands() {
  return (
    <dl className="grid grid-cols-3 gap-6 border-y border-[color:var(--border)] py-10 md:grid-cols-6">
      {brandMarks.map((mark) => (
        <div className="text-center" key={mark}>
          <dt className="sr-only">{mark}</dt>
          <dd className="product-mark display-tone">{mark}</dd>
        </div>
      ))}
    </dl>
  );
}
