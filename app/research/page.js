import Link from "next/link";
import { ArrowIcon, ExternalIcon } from "../components/Icons";
import ResearchGraphic from "../components/ResearchGraphic";
import VenueLogos from "../components/VenueLogos";
import { publications } from "../data/site";

export const metadata = {
  title: "Research",
  description:
    "Published research on retrieval augmented generation, model alignment and automated assessment for clinical and medical education tasks, in PLOS One, BMC Medical Education and on arXiv.",
  alternates: { canonical: "/research" },
};

export default function ResearchPage() {
  return (
    <main id="main">
      <section className="relative isolate overflow-hidden">
        <div className="shell pb-10 pt-10 md:pt-14">
          <Link className="icon-button -ml-2 mb-4" href="/" aria-label="Back to home">
            <ArrowIcon className="h-5 w-5 rotate-180" />
          </Link>
          <p className="eyebrow">Research</p>
          <h1 className="section-title max-w-3xl text-[clamp(2.25rem,5vw,3.5rem)]">
            Published research
          </h1>
          <p className="lead">
            Peer-reviewed articles and preprints from Neurasense and its
            research collaborators, with direct DOI and arXiv links.
          </p>
        </div>

        <div
          aria-label="Publication venues"
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-[22rem] items-center justify-end pr-12 xl:flex"
        >
          <div>
            <p className="mb-6 text-right text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-faint">
              Published in
            </p>
            <VenueLogos />
          </div>
        </div>
      </section>

      <section className="pb-20 pt-4 md:pt-6">
        <div className="shell">
          <ol className="pub-list">
            {publications.map((paper) => (
              <PublicationEntry key={paper.id} paper={paper} />
            ))}
          </ol>

          <p className="mt-10 max-w-2xl text-sm leading-[1.43] text-faint">
            Authors are listed in publication order. Entries marked with a
            university affiliation were carried out with collaborators at that
            institution.
          </p>

          <div className="mt-12">
            <Link className="link-arrow" href="/products">
              Explore related products
              <ExternalIcon className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

/* One product hue per paper, so the four findings read as four distinct
   colours rather than one repeated accent blue — the same `data-brand`
   scoping the product cards use, borrowing hues already in the palette
   rather than adding new ones. */
const PAPER_BRAND = {
  "sisu-athwala": "emerald",
  "saq-scoring": "violet",
  "clinical-alignment": "amber",
  "rag-summarization": "cyan",
};

function PublicationEntry({ paper }) {
  return (
    <li className="pub-entry" data-brand={PAPER_BRAND[paper.id]} id={paper.id}>
      <span className="pub-index" aria-hidden="true" />

      <div>
        <h2 className="pub-title">{paper.title}</h2>

        <p className="pub-authors mt-1.5">{paper.authors.join(", ")}</p>

        <div className="pub-meta">
          <span className="chip chip-neutral">{paper.publicationType}</span>
          <span className="pub-meta-item">
            <strong>Publication</strong>
            {paper.venue} · {paper.detail}
          </span>
          <span className="pub-meta-item">
            <strong>Published</strong>
            {paper.date}
          </span>
          {paper.affiliation && (
            <span className="pub-meta-item">
              <strong>Institution</strong>
              {paper.affiliation}
            </span>
          )}
          <span className="pub-meta-item">
            <strong>{paper.venue === "arXiv" ? "Preprint" : "DOI"}</strong>
            <span className="font-mono">{paper.ref}</span>
          </span>
        </div>

        <p className="mt-3 text-base leading-[1.5] text-muted">
          {paper.summary}
        </p>

        <ResearchGraphic paperId={paper.id} />

        {paper.related && (
          <p className="mt-4 text-sm text-muted">
            <span className="font-semibold text-ink">{paper.related.label}:</span>{" "}
            {paper.related.href ? (
              <Link className="link-inline" href={paper.related.href}>
                {paper.related.text}
              </Link>
            ) : (
              paper.related.text
            )}
          </p>
        )}

        <a
          className="link-arrow mt-4"
          href={paper.href}
          rel="noreferrer"
          target="_blank"
        >
          Read the full article
          <ExternalIcon className="h-3.5 w-3.5 shrink-0" />
        </a>
      </div>
    </li>
  );
}
