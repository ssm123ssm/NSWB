import Link from "next/link";
import { ColabScene } from "../components/ColabGraphics";
import {
  ArrowIcon,
  CheckIcon,
  colabIconMap,
  ContactIcon,
  ExternalIcon,
  GlobeIcon,
  LayersIcon,
  UsersIcon,
} from "../components/Icons";
import ProductName from "../components/ProductName";
import { ContactButton } from "../components/SiteChrome";
import StepRail from "../components/StepRail";
import {
  colabAccessModes,
  colabAudiences,
  colabCapabilities,
  colabComparison,
  colabFaqs,
  colabHowItWorks,
  colabLimits,
  colabLinks,
  getProduct,
} from "../data/site";
import { BreakNote } from "../components/BreakNote";

const colab = getProduct("colab");

/** The three access modes label themselves with a glyph from the shared sets. */
const accessIconMap = {
  users: UsersIcon,
  contact: ContactIcon,
  globe: GlobeIcon,
};

export const metadata = {
  title: "coLab — Project tracking that keeps the reasons",
  description:
    "A milestone timeline with the work planned against each date, tasks that carry their own thread, and a decision log signed by whoever settled it. Share a single project with a guest without opening the rest.",
  openGraph: {
    title: "coLab — Project tracking that keeps the reasons | Neurasense",
    description:
      "Dates, the work planned against them, and the record of what the team decided — in one place, shared per project.",
    type: "website",
  },
  alternates: { canonical: "/colab" },
};

/**
 * The long-form page in the line, alongside /vault.
 *
 * The purchase decides the shape. NSQR is a minute and a card, so its page
 * shows rather than argues. Vault is bought by someone running a security
 * review, so its page answers objections. coLab is decided by one person who
 * then has to bring a team with them — so this page is written to be forwarded:
 * the ledger is the case they will make in the meeting, and the access section
 * is the question they will be asked in it.
 */
export default function ColabPage() {
  return (
    <main id="main" data-brand={colab.accent} data-temper="structured">
      {/* Read position. Inside main so it picks up the product accent, and
          invisible until a browser that supports scroll timelines scales it. */}
      <div className="scroll-progress" aria-hidden="true" />

      {/* ------------------------------------------------------------ Hero */}
      <section className="relative overflow-hidden border-b border-[color:var(--border)]">
        <div className="grid-field pointer-events-none absolute inset-0" aria-hidden="true" />
        <div
          className="glow left-1/2 top-[-12rem] h-[26rem] w-[34rem] -translate-x-1/2 bg-[color:var(--brand)]"
          aria-hidden="true"
        />

        <div className="shell relative grid gap-12 pb-20 pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="brand-tag text-base">
                <ProductName product={colab} />
              </span>
              <span className="badge">
                <span className="dot" aria-hidden="true" />
                Live
              </span>
            </div>

            <h1 className="display mt-6 max-w-2xl text-[clamp(1.95rem,4.4vw,3.15rem)]">
              Every project remembers what it is for.
            </h1>

            <p className="lead mt-5 max-w-xl">
              coLab holds the dates you are working towards, the work planned
              against each of them, and the record of what the team decided —
              in the words of whoever decided it.
            </p>
            <p className="mt-4 max-w-xl leading-relaxed text-muted">
              The dashboard opens on what needs a decision today. Everything
              else waits where you left it, and a collaborator from outside the
              team can be given one project without being given the rest.
            </p>

            {/* The header already carries Create an account, so the hero's
                primary action is the app itself and the second is a person to
                talk to. Two buttons, one accent between them. */}
            <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row">
              <a
                className="btn btn-brand-soft"
                href={colabLinks.app}
                target="_blank"
                rel="noreferrer"
              >
                Open <ProductName product={colab} />
              </a>
              <ContactButton className="btn btn-secondary" subject="coLab">
                Talk to the team
              </ContactButton>
            </div>

            <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-2.5">
              {colab.highlights.map((highlight) => (
                <li className="flex items-center gap-2 text-sm text-muted" key={highlight}>
                  <CheckIcon className="h-3.5 w-3.5 text-[color:var(--brand)]" />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>

          {/* The milestones are buttons, and the Edit button is meant to fail.
              Both need saying, or the reader watches a still image of the one
              thing a shared to-do list cannot do. */}
          <div>
            <ColabScene />
            <p className="mt-4 text-center text-[0.82rem] leading-relaxed text-faint">
              Open any milestone to read what was settled that day. Then try to
              edit it.
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ Comparison */}
      <section className="section section-subtle">
        <div className="shell">
          <div className="reveal max-w-2xl">
            <h2 className="section-title">
              The questions a project asks every week
            </h2>
            <p className="lead mt-4">
              None of them are hard. They are just answered in five different
              places, by whoever happens to remember.
            </p>
          </div>

          {/* No overflow-hidden here: the rows drive their own reveal from
              view(), which would resolve against this box instead of the page
              if it became a scroll container. The heading row rounds its own
              top corners instead. */}
          <div className="mt-10 rounded-[var(--radius)] border border-[color:var(--border)] bg-[color:var(--surface)]">
            <div className="reveal ledger-row ledger-head">
              <span className="text-[0.7rem] uppercase tracking-[0.14em] text-faint">
                Question
              </span>
              <span className="text-[0.7rem] uppercase tracking-[0.14em] text-faint">
                Spread across your tools
              </span>
              <span className="text-[0.7rem] uppercase tracking-[0.14em] text-brand">
                With coLab
              </span>
            </div>

            {colabComparison.map((row) => (
              <div className="reveal ledger-row" key={row.question}>
                <p className="text-[0.95rem]">{row.question}</p>
                <p className="ledger-answer text-[0.9rem] leading-relaxed text-muted">
                  <span className="ledger-label">Usually</span>
                  <span>{row.ordinary}</span>
                </p>
                <p className="ledger-answer text-[0.9rem] leading-relaxed">
                  <span className="ledger-label">With coLab</span>
                  <span className="flex items-start gap-2">
                    <CheckIcon className="mt-1 h-3.5 w-3.5 shrink-0 text-[color:var(--brand)]" />
                    {row.colab}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------- How it works */}
      <section className="section">
        <div className="shell grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          {/* This column pins while the rail scrolls past it, so the reveal
              below goes on the card inside rather than on the wrapper: a
              translate on an ancestor stops sticky from sticking. */}
          <div className="lg:sticky lg:top-24">
            <h2 className="section-title">Three things, in order</h2>
            <p className="lead mt-4">
              A project is set up in about five minutes, and nothing has to be
              configured before it is useful.
            </p>

            <div className="reveal card mt-8 p-6">
              <span className="icon-tile">
                <LayersIcon />
              </span>
              <h3 className="mt-4 text-base">Where coLab stops</h3>
              <p className="mt-2 text-[0.9rem] leading-relaxed text-muted">
                Worth knowing before you move a team across, rather than after:
              </p>
              <ul className="mt-4 space-y-2.5">
                {colabLimits.map((limit) => (
                  <li className="text-[0.875rem] leading-relaxed text-muted" key={limit}>
                    {limit}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <StepRail steps={colabHowItWorks} />
        </div>
      </section>

      {/* ----------------------------------------------------- Capabilities */}
      <section className="section section-subtle">
        <div className="shell">
          <div className="reveal max-w-2xl">
            <h2 className="section-title">What is in a project</h2>
            <p className="lead mt-4">
              Six things, and you would notice any of them missing by the end of
              the first week.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {colabCapabilities.map((capability) => {
              const Icon = colabIconMap[capability.icon];
              return (
                <article
                  className="reveal card card-hover card-accent flex flex-col p-7"
                  key={capability.title}
                >
                  <span className="icon-tile">
                    <Icon className="h-4 w-4" />
                  </span>
                  <h3 className="mt-4 text-lg leading-snug">{capability.title}</h3>
                  <p className="mt-3 text-[0.925rem] leading-relaxed text-muted">
                    {capability.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------- Access modes */}
      <section className="section">
        <div className="shell">
          <div className="reveal max-w-2xl">
            <h2 className="section-title">Three ways into a project</h2>
            <p className="lead mt-4">
              Most trackers make this a choice between your whole workspace and
              nothing at all. coLab resolves it per project, in that order of
              authority, and checks it again on the server for every change.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {colabAccessModes.map((mode) => {
              const Icon = accessIconMap[mode.icon];
              return (
                <article
                  className="reveal card card-hover flex flex-col p-7"
                  key={mode.name}
                >
                  <div className="flex items-start justify-between gap-3">
                    {/* Sized here rather than left to each glyph's default:
                        the three come from different sets, whose defaults are
                        not the same. */}
                    <span className="icon-tile">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="badge badge-outline">{mode.tag}</span>
                  </div>
                  <h3 className="mt-5 text-lg">{mode.name}</h3>
                  <p className="mt-3 text-[0.925rem] leading-relaxed text-muted">
                    {mode.summary}
                  </p>
                  <div className="mt-auto border-t border-[color:var(--border)] pt-4">
                    <p className="text-[0.7rem] uppercase tracking-[0.14em] text-faint">
                      Best for
                    </p>
                    <p className="mt-2 text-[0.85rem] leading-relaxed text-muted">
                      {mode.bestFor}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- Audience */}
      <section className="section section-subtle">
        <div className="shell">
          <div className="reveal max-w-2xl">
            <h2 className="section-title">
              Built for teams that hand work to each other
            </h2>
          </div>

          {/* Revealed whole rather than row by row: this box does clip its
              corners, which would leave a view() timeline on the rows inside
              resolving against the box instead of the page. */}
          <div className="reveal mt-10 overflow-hidden rounded-[var(--radius)] border border-[color:var(--border)]">
            {colabAudiences.map((item, index) => (
              <div
                className={`flex flex-col gap-3 bg-[color:var(--surface)] p-6 sm:flex-row sm:items-center sm:justify-between ${
                  index > 0 ? "border-t border-[color:var(--border)]" : ""
                }`}
                key={item.audience}
              >
                <div>
                  <h3 className="text-base">{item.audience}</h3>
                  <p className="mt-1.5 text-sm text-muted">
                    {item.capabilities.join(" · ")}
                  </p>
                </div>
                <span className="shrink-0 font-[family-name:var(--font-mono)] text-xs text-faint">
                  {item.capabilities.length} that matter most
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- FAQ */}
      <section className="section">
        <div className="shell">
          <div className="reveal max-w-2xl">
            <h2 className="section-title">The ones people ask first</h2>
          </div>

          <div className="mt-10 grid gap-x-12 gap-y-9 md:grid-cols-2">
            {colabFaqs.map((faq) => (
              <div className="reveal" key={faq.question}>
                <h3 className="text-base">{faq.question}</h3>
                <p className="mt-2.5 text-[0.925rem] leading-relaxed text-muted">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- Closing */}
      {/* ------------------------------------------ What would break */}
      <BreakNote slug="colab" />

      <section className="section section-subtle">
        <div className="shell">
          <div className="reveal card px-6 py-14 text-center sm:px-12">
            <h2 className="section-title">Start with one project</h2>
            <p className="lead mx-auto mt-4 max-w-xl">
              Creating an account creates a workspace with you as its owner.
              Put a real project in it, invite the two people who care about it
              most, and see whether the decision log gets used.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                className="btn btn-brand-soft"
                href={colabLinks.signup}
                target="_blank"
                rel="noreferrer"
              >
                Create an account
              </a>
              <ContactButton className="btn btn-secondary" subject="coLab">
                Talk to the team
              </ContactButton>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              <Link className="link-arrow" href="/products">
                All products
                <ArrowIcon />
              </Link>
              <a
                className="link-muted inline-flex items-center gap-1.5"
                href={colabLinks.app}
                target="_blank"
                rel="noreferrer"
              >
                Open <ProductName product={colab} />
                <ExternalIcon className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
