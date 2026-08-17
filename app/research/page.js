import { ExternalIcon } from "../components/Icons";
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
      <section className="relative overflow-hidden border-b border-[color:var(--border)]">
        <div className="grid-field pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="shell relative pb-10 pt-12">
          <div className="legal-measure">
            <h1 className="display text-[clamp(1.6rem,3.4vw,2.25rem)]">
              Publications
            </h1>
          </div>
        </div>
      </section>

      <section className="pb-20 pt-10">
        <div className="shell">
          <div className="legal-measure">
            <ol className="pub-list">
              {publications.map((paper, index) => (
                <PublicationEntry
                  index={index + 1}
                  key={paper.id}
                  paper={paper}
                />
              ))}
            </ol>

            <p className="mt-10 text-[0.8rem] leading-relaxed text-faint">
              Authors are listed in publication order. Entries marked with a
              university affiliation were carried out with collaborators at that
              institution.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

function PublicationEntry({ index, paper }) {
  return (
    <li className="pub-entry" id={paper.id}>
      <span className="pub-index">[{index}]</span>

      <div>
        <h2 className="pub-title">{paper.title}</h2>

        <p className="pub-authors">{paper.authors.join(", ")}</p>

        <p className="pub-meta">
          <span className="pub-venue">{paper.venue}</span>
          <span>{paper.detail}</span>
          <span>{paper.date}</span>
          {paper.affiliation && <span>{paper.affiliation}</span>}
        </p>

        <p className="pub-summary">{paper.summary}</p>

        <a
          className="pub-link"
          href={paper.href}
          rel="noreferrer"
          target="_blank"
        >
          Read the full article
          <ExternalIcon className="h-3 w-3 shrink-0" />
        </a>
      </div>
    </li>
  );
}
