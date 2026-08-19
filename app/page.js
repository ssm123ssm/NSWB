import Link from "next/link";
import { ContactButton } from "./components/SiteChrome";
import {
  ArrowIcon,
  DocIcon,
  LayersIcon,
  UsersIcon,
  LockIcon,
  NeuralIcon,
  ShieldIcon,
} from "./components/Icons";
import ProductBento from "./components/ProductBento";
import {
  closing,
  designPrinciples,
  founders,
  hero,
  principleWords,
} from "./data/site";

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
      <DesignPrinciples />
      <ProductBento />
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
   Principles

   A cloud and a card grid were both tried here and both dropped — the cloud
   read as decorative noise and the cards were four fixed slots for a list
   that is really just words. This is one centred line instead: the words
   themselves, "·" between them, flat muted grey like the product marks row
   in the hero, lighting up green/yellow/red under the pointer (see
   `.principle-word` in globals.css). */
/* The site's signal-green / signal-amber / signal-red `--brand-text` values
   (globals.css), copied here since they're set per word via inline style
   rather than the `data-brand` attribute those tokens normally key off. */
const principleHoverColors = ["#2a7020", "#7d5a00", "#b3352b"];

function Principles() {
  return (
    <section className="section section-subtle">
      <div className="shell text-center">
        <p className="eyebrow">How we work</p>
        <h2 className="section-title mx-auto max-w-2xl">
          Things we do not
          <br />
          negotiate
        </h2>

        <p className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-x-3 gap-y-3 text-[1.375rem] font-semibold md:text-2xl">
          {principleWords.map((word, index) => (
            <span className="contents" key={word}>
              {index > 0 && (
                <span aria-hidden="true" className="text-faint">
                  ·
                </span>
              )}
              <span
                className="principle-word"
                style={{
                  "--word-hover":
                    principleHoverColors[index % principleHoverColors.length],
                }}
              >
                {word}
              </span>
            </span>
          ))}
        </p>
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
            <h2 className="text-[clamp(2.25rem,3.6vw,3rem)]">
              {closing.title}
            </h2>
            <p className="mt-4 text-base leading-[1.5] text-white/85">
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
