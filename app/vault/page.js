import Link from "next/link";
import { ArrowIcon, CheckIcon, DocIcon, LockIcon, ShieldIcon } from "../components/Icons";
import ProductName from "../components/ProductName";
import RequestAccessLink from "../components/RequestAccessLink";
import { ContactButton } from "../components/SiteChrome";
import { VaultFlow, VaultScene } from "../components/VaultGraphics";
import {
  getProduct,
  vaultAccessModes,
  vaultAudiences,
  vaultBenefits,
  vaultCapabilities,
  vaultComparison,
  vaultFaqs,
  vaultLimits,
} from "../data/site";

const vault = getProduct("vault");

export const metadata = {
  title: "Vault — Encrypted storage only you can open",
  description:
    "Vault locks your files on your own device before they are sent, so file contents, names and folders stay unreadable to everyone else — including us. Built by the Neurasense research team.",
  openGraph: {
    title: "Vault — Encrypted storage only you can open | Neurasense",
    description:
      "Encrypted file sharing, private research snapshots, protected repositories, synced folders and policy-based app access — on one protection model where plaintext never leaves your device.",
    type: "website",
  },
};

export default function VaultPage() {
  return (
    <main id="main" data-brand="cyan">
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
                <ProductName product={vault} hero />
              </span>
              <span className="badge">
                <span className="dot" aria-hidden="true" />
                Live
              </span>
            </div>

            <h1 className="display mt-6 max-w-2xl text-[clamp(1.95rem,4.4vw,3.15rem)]">
              Storage that cannot read what you put in it.
            </h1>

            <p className="lead mt-5 max-w-xl">
              Vault locks your files on your own device, before anything is
              sent. What reaches our servers is unreadable — the contents, the
              file names, the folder structure, all of it.
            </p>
            <p className="mt-4 max-w-xl leading-relaxed text-muted">
              That one idea covers a lot of ground: sharing confidential files,
              holding unpublished research, protecting a codebase, syncing a
              working folder across machines, and deciding who may open a hosted
              app.
            </p>

            <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row">
              {/* Vault is reachable only once we grant access, so opening it
                  starts with the request form rather than the app URL.

                  The white paper is confidential and is deliberately not served
                  from this site. It goes out through a passcode-gated NSQR
                  link, so this navigates there and the gate lives on that page
                  rather than this one. Do not restore a direct file link. */}
              <ContactButton className="btn btn-brand" subject="Vault" intent="access">
                Request access
              </ContactButton>
              <a
                className="btn btn-secondary"
                href="https://nsqr.neurasense.io/r/yfnxruz5"
                target="_blank"
                rel="noreferrer"
              >
                <DocIcon className="h-4 w-4" />
                Request the white paper
              </a>
            </div>

            <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-2.5">
              {vault.highlights.map((highlight) => (
                <li className="flex items-center gap-2 text-sm text-muted" key={highlight}>
                  <CheckIcon className="h-3.5 w-3.5 text-[color:var(--brand)]" />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>

          {/* The scene runs on a loop: the list is readable, a sweep passes
              over it, and everything after that is what we would receive. */}
          <div>
            <VaultScene />
            <p className="mt-4 text-center text-[0.82rem] leading-relaxed text-faint">
              The same project, before and after it leaves your device. The
              second state is the only one anybody else ever sees.
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ Comparison */}
      <section className="section section-subtle">
        <div className="shell">
          <div className="reveal max-w-2xl">
            <p className="eyebrow">The difference</p>
            <h2 className="section-title mt-3">
              The questions a security review will ask
            </h2>
            <p className="lead mt-4">
              Most storage answers these with policy — who is allowed to look,
              and who promises not to. Vault answers them with arithmetic.
            </p>
          </div>

          {/* No overflow-hidden here: the rows drive their own reveal from
              view(), which would resolve against this box instead of the page
              if it became a scroll container. The heading row rounds its own
              top corners instead. */}
          <div className="mt-10 rounded-[var(--radius)] border border-[color:var(--border)] bg-[color:var(--surface)]">
            <div className="reveal vault-ledger-row vault-ledger-head">
              <span className="text-[0.7rem] uppercase tracking-[0.14em] text-faint">
                Question
              </span>
              <span className="text-[0.7rem] uppercase tracking-[0.14em] text-faint">
                Ordinary cloud storage
              </span>
              <span className="text-[0.7rem] uppercase tracking-[0.14em] text-brand">
                With Vault
              </span>
            </div>

            {vaultComparison.map((row) => (
              <div className="reveal vault-ledger-row" key={row.question}>
                <p className="text-[0.95rem] font-medium">{row.question}</p>
                <p className="vault-ledger-answer text-[0.9rem] leading-relaxed text-muted">
                  <span className="vault-ledger-label">Usually</span>
                  <span>{row.ordinary}</span>
                </p>
                <p className="vault-ledger-answer text-[0.9rem] leading-relaxed">
                  <span className="vault-ledger-label">With Vault</span>
                  <span className="flex items-start gap-2">
                    <CheckIcon className="mt-1 h-3.5 w-3.5 shrink-0 text-[color:var(--brand)]" />
                    {row.vault}
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
            <p className="eyebrow">How it works</p>
            <h2 className="section-title mt-3">Three things happen, in order</h2>
            <p className="lead mt-4">
              No plugins to install for your recipients, and nothing for your
              team to remember beyond a passphrase.
            </p>

            <div className="reveal card mt-8 p-6">
              <span className="icon-tile">
                <ShieldIcon />
              </span>
              <h3 className="mt-4 text-base">Where Vault stops</h3>
              <p className="mt-2 text-[0.9rem] leading-relaxed text-muted">
                Worth knowing before you adopt it, rather than after:
              </p>
              <ul className="mt-4 space-y-2.5">
                {vaultLimits.map((limit) => (
                  <li className="text-[0.875rem] leading-relaxed text-muted" key={limit}>
                    {limit}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <VaultFlow />
        </div>
      </section>

      {/* ----------------------------------------------------- Capabilities */}
      <section className="section section-subtle">
        <div className="shell">
          <div className="reveal max-w-2xl">
            <p className="eyebrow">Capabilities</p>
            <h2 className="section-title mt-3">
              Five ways teams put Vault to work
            </h2>
            <p className="lead mt-4">
              One encryption model, applied across the places sensitive work
              actually lives.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {vaultCapabilities.map((capability, index) => (
              <article
                className="reveal card card-hover card-accent flex flex-col p-7"
                key={capability.title}
              >
                <span className="font-[family-name:var(--font-mono)] text-xs text-faint">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-lg leading-snug">{capability.title}</h3>
                <p className="mt-3 text-[0.925rem] leading-relaxed text-muted">
                  {capability.description}
                </p>
                <p className="mt-4 border-l-2 border-[color:var(--brand)] pl-3 text-[0.875rem] leading-relaxed text-muted">
                  {capability.scenario}
                </p>
                <div className="mt-auto border-t border-[color:var(--border)] pt-4">
                  <p className="text-[0.7rem] uppercase tracking-[0.14em] text-faint">
                    Who is it for
                  </p>
                  <p className="mt-2 text-[0.85rem] leading-relaxed text-muted">
                    {capability.whoFor}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- Audience */}
      <section className="section">
        <div className="shell">
          <div className="reveal max-w-2xl">
            <p className="eyebrow">Who is it for</p>
            <h2 className="section-title mt-3">
              Built for teams that cannot leak
            </h2>
          </div>

          {/* Revealed whole rather than row by row: this box does clip its
              corners, which would leave a view() timeline on the rows inside
              resolving against the box instead of the page. */}
          <div className="reveal mt-10 overflow-hidden rounded-[var(--radius)] border border-[color:var(--border)]">
            {vaultAudiences.map((item, index) => (
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
                  {item.capabilities.length} relevant{" "}
                  {item.capabilities.length === 1 ? "capability" : "capabilities"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------- Access modes */}
      <section className="section section-subtle">
        <div className="shell">
          <div className="reveal max-w-2xl">
            <p className="eyebrow">Who holds the key</p>
            <h2 className="section-title mt-3">
              Four answers, chosen per project
            </h2>
            <p className="lead mt-4">
              Convenience and confidentiality pull against each other, so Vault
              makes it an explicit choice rather than a default you never saw.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {vaultAccessModes.map((mode) => (
              <article
                className="reveal card card-hover flex flex-col p-7"
                key={mode.name}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="icon-tile">
                    <LockIcon />
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
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- Benefits */}
      <section className="section">
        <div className="shell">
          <div className="reveal max-w-2xl">
            <p className="eyebrow">Why enrol</p>
            <h2 className="section-title mt-3">
              What you get on the day access opens
            </h2>
          </div>

          <div className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
            {vaultBenefits.map((benefit) => (
              <div className="reveal" key={benefit.title}>
                <span className="icon-tile">
                  <CheckIcon className="h-4 w-4" />
                </span>
                <h3 className="mt-4 text-base">{benefit.title}</h3>
                <p className="mt-2 text-[0.925rem] leading-relaxed text-muted">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- FAQ */}
      <section className="section section-subtle">
        <div className="shell">
          <div className="reveal max-w-2xl">
            <p className="eyebrow">Questions</p>
            <h2 className="section-title mt-3">The ones people ask first</h2>
          </div>

          <div className="mt-10 grid gap-x-12 gap-y-9 md:grid-cols-2">
            {vaultFaqs.map((faq) => (
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
      <section className="section">
        <div className="shell">
          <div className="reveal card px-6 py-14 text-center sm:px-12">
            <h2 className="section-title">
              Put Vault behind your most sensitive work
            </h2>
            <p className="lead mx-auto mt-4 max-w-xl">
              Access is granted by request. Tell us what you need to protect and
              we will set up the first project with you, or walk your security
              team through the design.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ContactButton className="btn btn-brand" subject="Vault" intent="access">
                Request access
              </ContactButton>
              <ContactButton className="btn btn-secondary" subject="Vault">
                Talk to the team
              </ContactButton>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              <Link className="link-arrow" href="/products">
                All products
                <ArrowIcon />
              </Link>
              <RequestAccessLink
                product="Vault"
                label="Request a walkthrough"
                className="link-muted"
                withArrow={false}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
