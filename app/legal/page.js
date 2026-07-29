import Link from "next/link";
import { ArrowIcon } from "../components/Icons";
import { legalDocs } from "../data/site";
import { readDoc } from "../components/LegalDoc";

export const metadata = {
  title: "Legal",
  description:
    "Privacy, terms and refund policies for Neurasense and its products.",
};

export default function LegalIndexPage() {
  const site = legalDocs.filter((doc) => !doc.product);
  const nsqr = legalDocs.filter((doc) => doc.product === "NSQR");

  return (
    <main id="main">
      <section className="relative overflow-hidden border-b border-[color:var(--border)]">
        <div
          className="grid-field pointer-events-none absolute inset-0"
          aria-hidden="true"
        />
        <div className="shell relative pb-16 pt-14">
          {/* Same measure as the documents themselves, so moving from the index
              into a policy reads as one continuous set rather than a jump from
              a wide marketing page into a narrow column. */}
          <div className="legal-measure">
            <p className="eyebrow">Legal</p>
            <h1 className="display mt-4 text-[clamp(1.9rem,4vw,2.75rem)]">
              Policies, in plain order.
            </h1>
            <p className="lead mt-5">
              Each document says at the top which product it governs. The
              website notice covers neurasense.io; the rest apply to NSQR.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-24 pt-14">
        <div className="shell">
          <div className="legal-measure">
            <h2 className="text-xs uppercase tracking-[0.14em] text-faint">
              This website
            </h2>
            <div className="mt-6 space-y-4">
              {site.map((doc) => (
                <DocRow doc={doc} key={doc.slug} />
              ))}
            </div>

            <h2 className="mt-14 text-xs uppercase tracking-[0.14em] text-faint">
              NSQR
            </h2>
            <div className="mt-6 space-y-4">
              {nsqr.map((doc) => (
                <DocRow doc={doc} key={doc.slug} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function DocRow({ doc }) {
  // Read straight from the document so the listed date can never drift from
  // the one printed on the page itself.
  const { updated } = readDoc(doc.file);

  return (
    <Link className="card card-hover block p-5 sm:p-6" href={doc.href}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h3 className="text-lg">{doc.title}</h3>
        {updated && (
          <span className="font-[family-name:var(--font-mono)] text-xs text-faint">
            Updated {updated}
          </span>
        )}
      </div>

      <p className="mt-2.5 text-[0.9rem] leading-relaxed text-muted">
        {doc.summary}
      </p>

      <span className="link-arrow mt-5 text-sm">
        Read
        <ArrowIcon />
      </span>
    </Link>
  );
}
