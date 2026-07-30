import Link from "next/link";
import { legalDocs, products } from "../data/site";
import { readDoc } from "../components/LegalDoc";
import ProductName from "../components/ProductName";

export const metadata = {
  title: "Legal",
  description:
    "Privacy, terms and refund policies for Neurasense and its products.",
};

export default function LegalIndexPage() {
  const site = legalDocs.filter((doc) => !doc.product);
  const nsqr = legalDocs.filter((doc) => doc.product === "NSQR");
  const nsqrProduct = products.find((product) => product.name === "NSQR");

  return (
    <main id="main">
      <section className="border-b border-[color:var(--border)]">
        <div className="shell pb-10 pt-12">
          {/* Deliberately the same masthead as a document page rather than a
              marketing hero — people arrive here with an errand, not to be
              introduced to the section. */}
          <div className="legal-measure">
            <p className="eyebrow">Legal</p>
            <h1 className="display mt-3 text-[clamp(1.6rem,3.4vw,2.25rem)]">
              Policies, in plain order.
            </h1>
            <p className="mt-4 text-[0.9rem] leading-relaxed text-muted">
              Each document states at the top which product it governs.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-24 pt-10">
        <div className="shell">
          <div className="legal-measure">
            <Register docs={site} label="This website" />
            {/* The register heading names the product, so it wears the lockup
                and the product's accent rather than plain uppercase text. */}
            <Register
              brand={nsqrProduct.accent}
              className="mt-12"
              docs={nsqr}
              label={<ProductName className="text-sm" product={nsqrProduct} />}
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function Register({ brand, className = "", docs, label }) {
  return (
    <section className={className} data-brand={brand}>
      <h2 className="text-xs uppercase tracking-[0.14em] text-faint">
        {label}
      </h2>
      <div className="legal-register mt-3">
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
      <span className="legal-row-title">{doc.title}</span>
      {updated && <span className="legal-row-date">{updated}</span>}
      <span className="legal-row-note">{doc.note}</span>
    </Link>
  );
}
