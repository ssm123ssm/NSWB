import Link from "next/link";
import { ContactButton } from "../components/SiteChrome";
import { ArrowIcon, CheckIcon } from "../components/Icons";
import ProductMark from "../components/ProductMarks";
import ProductName from "../components/ProductName";
import { closing, products } from "../data/site";

export const metadata = {
  title: "Products",
  description:
    "Every product in the studio — what each one does, whether it is live, and where to see it.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  const live = products.filter((product) => product.status === "live");
  const building = products.filter((product) => product.status !== "live");

  return (
    <main id="main">
      <section className="relative isolate overflow-hidden">
        <div className="shell pb-14 pt-20 md:pt-24">
          <p className="eyebrow">The studio</p>
          <h1 className="section-title max-w-3xl text-[clamp(2.25rem,5vw,3.5rem)]">
            Six products, one standard
          </h1>
          <p className="lead">
            Some of these you can open right now. Some are still being built,
            and are marked as such rather than described as though they were
            finished.
          </p>
        </div>
      </section>

      <section className="section-tight">
        <div className="shell">
          <h2 className="sr-only">Live products</h2>
          <div className="bento">
            {live.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      {building.length > 0 && (
        <section className="section section-subtle">
          <div className="shell">
            <p className="eyebrow">Still being built</p>
            <h2 className="section-title max-w-2xl">Not finished yet</h2>
            <p className="lead">
              Real work, not vapour — but not shipped, so nothing here claims a
              date it cannot keep.
            </p>
            <div className="bento mt-12">
              {building.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section-tight pb-20">
        <div className="shell">
          <div className="gradient-panel">
            <div className="relative z-10 mx-auto max-w-2xl">
              <h2 className="text-[clamp(1.75rem,3.4vw,2.5rem)] font-bold tracking-tight">
                {closing.title}
              </h2>
              <p className="mt-4 text-[1.0625rem] leading-relaxed text-white/85">
                {closing.body}
              </p>
              <ContactButton className="btn btn-lg mt-8 bg-white text-[color:var(--text)] hover:opacity-90">
                Start a conversation
              </ContactButton>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function ProductCard({ product }) {
  return (
    <article className="card card-hover" data-brand={product.accent}>
      <div className="flex items-start justify-between gap-4">
        <span className="icon-tile">
          <ProductMark product={product} />
        </span>
        <span
          className={`chip ${product.status === "live" ? "chip-dot" : "chip-neutral"}`}
        >
          {product.status === "live" ? "Live" : "In development"}
        </span>
      </div>

      <h3 className="mt-5 text-xl">
        <ProductName product={product} />
      </h3>
      <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">
        {product.tagline}
      </p>

      {product.highlights && (
        <ul className="check-list">
          {product.highlights.slice(0, 3).map((highlight) => (
            <li key={highlight}>
              <CheckIcon className="h-4 w-4" />
              {highlight}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 pt-1">
        {product.detail ? (
          <Link className="link-arrow" href={product.detail}>
            Explore {product.name}
            <ArrowIcon />
          </Link>
        ) : (
          <ContactButton
            className="link-arrow"
            subject={product.name}
            intent="access"
          >
            Request access
            <ArrowIcon />
          </ContactButton>
        )}
      </div>
    </article>
  );
}
