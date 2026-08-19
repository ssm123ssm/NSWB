import Link from "next/link";
import { legalDocs, products } from "../data/site";
import { readDoc } from "../components/LegalDoc";
import { ArrowIcon } from "../components/Icons";
import ProductName from "../components/ProductName";

export const metadata = {
  title: "Legal",
  description:
    "Privacy, terms and refund policies for Neurasense and its products.",
  alternates: { canonical: "/legal" },
};

export default function LegalIndexPage() {
  const siteDocs = legalDocs.filter((doc) => !doc.product);
  const nsqrDocs = legalDocs.filter((doc) => doc.product === "NSQR");
  const nsqrProduct = products.find((product) => product.name === "NSQR");

  return (
    <main id="main">
      {/* Deliberately a quieter masthead than the marketing pages — people
          arrive here with an errand, not to be introduced to the section. */}
      <section className="relative isolate overflow-hidden border-b border-[color:var(--border)]">
        <div className="shell pb-12 pt-20 md:pt-24">
          <p className="eyebrow">Legal</p>
          <h1 className="section-title max-w-2xl text-[clamp(2rem,4vw,2.75rem)]">
            Policies, in plain order
          </h1>
          <p className="lead">
            Each document states at the top which product it governs, and when
            it was last updated.
          </p>
        </div>
      </section>

      <section className="section-tight pb-24">
        <div className="shell">
          <Register docs={siteDocs} label="This website" />
          <Register
            brand={nsqrProduct.accent}
            className="mt-14"
            docs={nsqrDocs}
            label={<ProductName product={nsqrProduct} />}
          />
        </div>
      </section>
    </main>
  );
}

function Register({ brand, className = "", docs, label }) {
  return (
    <section className={className} data-brand={brand}>
      <h2 className="text-sm font-semibold text-faint">{label}</h2>
      <div className="legal-register mt-4">
        {docs.map((doc) => (
          <DocRow doc={doc} key={doc.slug} />
        ))}
      </div>
    </section>
  );
}

function DocRow({ doc }) {
  // Read straight from the document so the listed date can never drift from
  // the one printed on the page itself.
  const { updated } = readDoc(doc.file);

  return (
    <Link className="legal-row" href={doc.href}>
      <span className="min-w-0">
        <span className="legal-row-title block">{doc.title}</span>
        <span className="legal-row-note block">{doc.note}</span>
      </span>
      <span className="flex flex-shrink-0 items-center gap-4">
        {updated && <span className="chip chip-neutral">{updated}</span>}
        <ArrowIcon className="h-4 w-4 text-[color:var(--brand-text)]" />
      </span>
    </Link>
  );
}
