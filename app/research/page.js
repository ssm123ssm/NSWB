import Link from "next/link";
import { ExternalIcon } from "../components/Icons";
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
        <div className="shell pb-14 pt-20 md:pt-24">
          <p className="eyebrow">Research</p>
          <h1 className="section-title max-w-3xl text-[clamp(2.25rem,5vw,3.5rem)]">
            The part you can check for yourself
          </h1>
          <p className="lead">
            What we ship starts as published work. These are the papers — with
            DOIs and arXiv links, so you can read them rather than take our word
            for it.
          </p>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-[22rem] items-center justify-end pr-12 xl:flex"
        >
          <VenueLogos />
        </div>
      </section>

      <section className="section-tight pb-20">
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
              See what came out of it
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
          <span className="chip chip-neutral">{paper.venue}</span>
          <span className="pub-venue">{paper.detail}</span>
          <span className="pub-venue">{paper.date}</span>
          {paper.affiliation && (
            <span className="pub-venue">{paper.affiliation}</span>
          )}
        </div>

        <p className="mt-3 text-base leading-[1.5] text-muted">
          {paper.summary}
        </p>

        <ResearchGraphic paperId={paper.id} />

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
