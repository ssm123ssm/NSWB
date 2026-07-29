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
          <p className="eyebrow">Legal</p>
          <h1 className="display mt-4 max-w-2xl text-[clamp(2rem,4.6vw,3.25rem)]">
            Policies, in plain order.
          </h1>
          <p className="lead mt-5 max-w-xl">
            Each document says at the top which product it governs. The website
            notice covers neurasense.io; the rest apply to NSQR.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <h2 className="text-xs uppercase tracking-[0.14em] text-faint">
            This website
          </h2>
          <div className="mt-6 space-y-5">
            {site.map((doc) => (
              <DocRow doc={doc} key={doc.slug} />
            ))}
          </div>

          <h2 className="mt-16 text-xs uppercase tracking-[0.14em] text-faint">
            NSQR
          </h2>
          <div className="mt-6 space-y-5">
            {nsqr.map((doc) => (
              <DocRow doc={doc} key={doc.slug} />
            ))}
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
    <Link className="card card-hover block p-6 sm:p-7" href={doc.href}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h3 className="text-xl">{doc.title}</h3>
        {updated && (
          <span className="font-[family-name:var(--font-mono)] text-xs text-faint">
            Updated {updated}
          </span>
        )}
      </div>

      <p className="mt-3 max-w-2xl text-[0.95rem] leading-relaxed text-muted">
        {doc.summary}
      </p>

      <span className="link-arrow mt-5 text-sm">
        Read
        <ArrowIcon />
      </span>
    </Link>
  );
}
