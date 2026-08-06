import Link from "next/link";
import { Fragment } from "react";
import {
  ArrowIcon,
  CheckIcon,
  CloseIcon,
  contentIconMap,
  ExternalIcon,
  featureIconMap,
} from "../components/Icons";
import NsqrScene from "../components/NsqrScene";
import ProductName from "../components/ProductName";
import { ContactButton } from "../components/SiteChrome";
import {
  getProduct,
  nsqrCapabilities,
  nsqrComparison,
  nsqrContentTypes,
  nsqrFaqs,
  nsqrLinks,
  nsqrPlans,
} from "../data/site";

const nsqr = getProduct("nsqr");

export const metadata = {
  title: "NSQR — QR codes you can edit, track and brand",
  description:
    "Print a QR code once and keep changing where it goes. Scan analytics by day, country and device, passcode protection, Lost & Found recovery tags, and static codes free forever.",
  openGraph: {
    title: "NSQR — QR codes you can edit, track and brand | Neurasense",
    description:
      "One printed code, re-pointed as often as you like. Watch the whole thing happen in thirteen seconds.",
    type: "website",
  },
};

/**
 * Five short sections on one rhythm.
 *
 * /vault is the long-form page in this product line: gated by request, bought
 * by someone running a security review, every section answering an objection.
 * NSQR is the opposite purchase — self-serve, $2.99, decided in about a minute
 * — so the cartoon carries the explanation and the prose stays out of its way.
 *
 * Two rules hold the page together. Every section uses `.section-tight`, so the
 * spacing down the page is even; and every section opens with its title at the
 * same left edge, so the eye never has to re-find the start of a section.
 * Breaking either one is what made earlier drafts feel like separate pages
 * stapled together.
 */
export default function NsqrPage() {
  return (
    <main id="main" data-brand={nsqr.accent}>
      {/* Read position. Inside main so it picks up the product accent, and
          invisible until a browser that supports scroll timelines scales it. */}
      <div className="scroll-progress" aria-hidden="true" />

      {/* ------------------------------------------------- Hero + the scene */}
      <section className="relative overflow-hidden border-b border-[color:var(--border)]">
        <div className="grid-field pointer-events-none absolute inset-0" aria-hidden="true" />
        <div
          className="glow left-1/2 top-[-14rem] h-[26rem] w-[38rem] -translate-x-1/2 bg-[color:var(--brand)]"
          aria-hidden="true"
        />

        <div className="shell relative pb-14 pt-12">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="display text-[clamp(2rem,5vw,3.4rem)]">
              Print the code once. Change it forever.
            </h1>

            <p className="lead mx-auto mt-5 max-w-xl">
              A QR code that stays yours after it goes to print — re-point it,
              lock it, pause it, and watch every scan arrive.
            </p>
          </div>

          {/* Thirteen seconds, six beats, and the page's whole explanation of
              what NSQR does. Everything below is a caption on it.

              The hero carries no buttons: the header's Start free sits directly
              above this, and a second copy of it here would have been two calls
              to action inside one screen. */}
          <div className="mx-auto mt-10 max-w-3xl">
            <NsqrScene />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ Comparison */}
      <section className="section-tight section-subtle">
        <div className="shell">
          <div className="reveal max-w-2xl">
            <h2 className="section-title">Static code vs dynamic code</h2>
          </div>

          {/* Three columns on desktop — what you are comparing, then the two
              answers — collapsing to the label on its own line above a pair of
              cells on mobile, where three columns of prose would be unreadable.

              Separators are the container's own background showing through a
              1px gap, which avoids a border per cell doubling up at the outer
              edge. The header cells drop out with the third column. */}
          <div className="reveal mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius)] border border-[color:var(--border)] bg-[color:var(--border)] sm:grid-cols-[0.7fr_1fr_1fr]">
            <div className="hidden bg-[color:var(--bg-subtle)] px-5 py-3 sm:block" />
            <div className="hidden bg-[color:var(--bg-subtle)] px-5 py-3 sm:block">
              <p className="text-[0.7rem] uppercase tracking-[0.14em] text-faint">
                An ordinary static code
              </p>
            </div>
            <div className="hidden bg-[color:var(--bg-subtle)] px-5 py-3 sm:block">
              <p className="text-[0.7rem] uppercase tracking-[0.14em] text-brand">
                A dynamic code with NSQR
              </p>
            </div>

            {nsqrComparison.map((row) => (
              <Fragment key={row.label}>
                <div className="col-span-2 bg-[color:var(--bg-subtle)] px-4 py-2.5 sm:col-span-1 sm:bg-[color:var(--surface)] sm:px-5 sm:py-4">
                  <p className="font-[family-name:var(--font-mono)] text-[0.65rem] uppercase tracking-[0.12em] text-faint">
                    {row.label}
                  </p>
                </div>
                <div className="flex items-start gap-2.5 bg-[color:var(--surface)] px-4 py-4 sm:px-5">
                  <CloseIcon className="mt-1 h-3.5 w-3.5 shrink-0 text-faint" />
                  <p className="text-[0.875rem] leading-relaxed text-muted">{row.staticCode}</p>
                </div>
                <div className="flex items-start gap-2.5 bg-[color:var(--surface)] px-4 py-4 sm:px-5">
                  <CheckIcon className="mt-1 h-3.5 w-3.5 shrink-0 text-[color:var(--brand)]" />
                  <p className="text-[0.875rem] leading-relaxed">{row.dynamic}</p>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------- Capabilities */}
      {/* Two questions, side by side: what a code can do, and what kind of code
          you can make. They used to be stacked, which read as one long list of
          fourteen things rather than as two lists of six and eight. */}
      <section className="section-tight">
        <div className="shell grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-14">
          <div>
            <div className="reveal">
              <h2 className="section-title">Six things, one code</h2>
            </div>

            <div className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {nsqrCapabilities.map((capability) => {
                const Icon = featureIconMap[capability.icon];
                return (
                  <div className="reveal flex gap-3.5" key={capability.title}>
                    <span className="icon-tile h-9 w-9 shrink-0 rounded-lg">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div>
                      <h3 className="text-[0.95rem] leading-snug">{capability.title}</h3>
                      <p className="mt-1 text-[0.875rem] leading-relaxed text-muted">
                        {capability.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Separators are the container's own background showing through a
              1px gap, rather than a border per cell doubling up at the edge. */}
          <aside className="reveal self-start rounded-[var(--radius)] border border-[color:var(--border)] bg-[color:var(--surface)] p-5 sm:p-6">
            <h3 className="text-base">What a code can hold</h3>
            <p className="mt-2 text-[0.85rem] leading-relaxed text-muted">
              Most resolve on the scanner&rsquo;s own phone, so they work with no
              connection at all.
            </p>

            <ul className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-[calc(var(--radius)-0.35rem)] border border-[color:var(--border)] bg-[color:var(--border)]">
              {nsqrContentTypes.map((type) => {
                const Icon = contentIconMap[type.icon];
                return (
                  <li
                    className="flex items-center gap-2.5 bg-[color:var(--surface)] px-3 py-3"
                    key={type.name}
                  >
                    <Icon className="h-4 w-4 shrink-0 text-[color:var(--brand)]" />
                    <span className="text-[0.82rem] leading-tight">{type.name}</span>
                  </li>
                );
              })}
            </ul>
          </aside>
        </div>
      </section>

      {/* ----------------------------------------------------------- Price */}
      <section className="section-tight section-subtle">
        <div className="shell">
          <div className="reveal max-w-2xl">
            <h2 className="section-title">Free, or the price of a coffee</h2>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {nsqrPlans.map((plan) => (
              <article className="reveal card card-hover flex flex-col p-6" key={plan.name}>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg">{plan.name}</h3>
                  <span className={`badge shrink-0 ${plan.featured ? "" : "badge-outline"}`}>
                    {plan.tag}
                  </span>
                </div>

                <p className="mt-4 flex items-baseline gap-2">
                  <span className="display text-[1.9rem]">{plan.price}</span>
                  {plan.was && (
                    <s className="font-[family-name:var(--font-mono)] text-sm text-faint">
                      {plan.was}
                    </s>
                  )}
                  <span className="text-sm text-faint">{plan.period}</span>
                </p>

                <ul className="mt-5 space-y-2 border-t border-[color:var(--border)] pt-5">
                  {plan.features.map((feature) => (
                    <li
                      className="flex items-start gap-2.5 text-[0.875rem] leading-relaxed"
                      key={feature}
                    >
                      <CheckIcon className="mt-1 h-3.5 w-3.5 shrink-0 text-[color:var(--brand)]" />
                      <span className="text-muted">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-6">
                  <a
                    className={`btn btn-sm ${plan.featured ? "btn-brand-soft" : "btn-secondary"}`}
                    href={nsqrLinks.register}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {plan.cta}
                  </a>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-9 grid gap-x-10 gap-y-6 md:grid-cols-3">
            {nsqrFaqs.map((faq) => (
              <div className="reveal" key={faq.question}>
                <h3 className="text-[0.9rem]">{faq.question}</h3>
                <p className="mt-1.5 text-[0.85rem] leading-relaxed text-muted">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- Closing */}
      <section className="section-tight">
        <div className="shell">
          <div className="reveal card flex flex-col items-start gap-6 p-7 sm:flex-row sm:items-center sm:justify-between sm:p-9">
            <div>
              <h2 className="text-2xl">Make one and print it</h2>
              <p className="mt-2 max-w-md text-[0.925rem] leading-relaxed text-muted">
                Static codes are free forever and need no card. Rolling them out
                across a fleet or a campus? Talk to us first.
              </p>
            </div>
            <div className="flex shrink-0 flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              <a
                className="btn btn-brand-soft"
                href={nsqrLinks.register}
                target="_blank"
                rel="noreferrer"
              >
                Start free
              </a>
              <ContactButton className="btn btn-secondary" subject="NSQR">
                Talk to the team
              </ContactButton>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link className="link-arrow" href="/products">
              All products
              <ArrowIcon />
            </Link>
            <a
              className="link-muted inline-flex items-center gap-1.5"
              href={nsqr.app}
              target="_blank"
              rel="noreferrer"
            >
              Open <ProductName product={nsqr} />
              <ExternalIcon className="h-3.5 w-3.5" />
            </a>
            <Link className="link-muted" href="/legal">
              Terms &amp; privacy
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
