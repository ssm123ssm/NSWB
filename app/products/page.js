import Link from "next/link";
import { ContactButton } from "../components/SiteChrome";
import { ArrowIcon, CheckIcon } from "../components/Icons";
import ProductName from "../components/ProductName";
import {
  AesGraphic,
  ColabDecisionLogGraphic,
  ColabGraphic,
  ColabWorkloadGraphic,
  LipdGraphic,
  NsqrGraphic,
  PresenceAccessGraphic,
  PresenceExportGraphic,
  PresenceGraphic,
  VaultGraphic,
} from "../components/ProductBento";
import { getProduct, products } from "../data/site";

const GRAPHICS = {
  nsqr: NsqrGraphic,
  vault: VaultGraphic,
  colab: ColabGraphic,
  presence: PresenceGraphic,
  "lipd-hub": LipdGraphic,
  aes: AesGraphic,
};

// The order and weight this page argues for: coLab, Vault and NSQR carry the
// studio's range best, so they lead and run large. Presence gets its own
// full-width tile too, further down. Lipd Hub and AES are request-access,
// narrower products — smallest, last.
const TOP_ROW = [
  { slug: "nsqr", span: "md:col-span-3", height: "h-[220px]" },
  { slug: "vault", span: "md:col-span-3", height: "h-[220px]" },
];
const BOTTOM_ROW = [
  { slug: "lipd-hub", span: "md:col-span-3", height: "h-[232px]" },
  { slug: "aes", span: "md:col-span-3", height: "h-[232px]" },
];

function availabilityLabel(product) {
  if (product.status !== "live") return "In development";
  if (product.access === "request") return "Access by request";
  return "Available";
}

function AvailabilityChip({ product }) {
  return (
    <span
      className={`chip ${product.status === "live" ? "chip-dot" : "chip-neutral"}`}
    >
      {availabilityLabel(product)}
    </span>
  );
}

export const metadata = {
  title: "Products",
  description:
    "Every product in the studio — what each one does, whether it is live, and where to see it.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  const building = products.filter((product) => product.status !== "live");

  return (
    <main id="main">
      <h1 className="sr-only">Products</h1>

      <section className="section-tight !pt-10 md:!pt-14">
        <div className="shell">
          <Link className="icon-button -ml-2 mb-4" href="/" aria-label="Back to home">
            <ArrowIcon className="h-5 w-5 rotate-180" />
          </Link>

          <div
            className="grid gap-4 border-b pb-5 md:grid-cols-[minmax(0,1.45fr)_minmax(17rem,0.75fr)] md:items-end md:gap-8"
            style={{ borderColor: "var(--border)" }}
          >
            <div>
              <p className="eyebrow">Available products</p>
              <h2 className="section-title max-w-2xl">Products you can use now</h2>
            </div>
            <p className="max-w-sm text-sm leading-[1.5] text-muted">
              Explore Neurasense products for project collaboration, secure
              storage, attendance, research, and AI-assisted work.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-6">
            <ColabHeroCard product={getProduct("colab")} />
            {TOP_ROW.map(({ slug, span, height }) => (
              <ProductCard
                key={slug}
                product={getProduct(slug)}
                span={span}
                height={height}
              />
            ))}
            <PresenceHeroCard product={getProduct("presence")} />
            {BOTTOM_ROW.map(({ slug, span, height }) => (
              <ProductCard
                key={slug}
                product={getProduct(slug)}
                span={span}
                height={height}
              />
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

    </main>
  );
}

/**
 * coLab leads the page: the studio's most complete product, so it gets a
 * full-width tile of its own rather than a slot in the equal-size row. The
 * right side is a small mosaic of its own screens — the timeline-and-tasks
 * scene already built for the bento, plus the decision log and workload rail
 * that don't fit in a single card elsewhere — because the point of leading
 * with it is to show more of it, not just say more about it.
 */
function ColabHeroCard({ product }) {
  return (
    <article
      className="card card-hover col-span-1 flex flex-col overflow-hidden !p-0 md:col-span-6"
      data-brand={product.accent}
    >
      <div className="grid gap-0 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <div className="flex flex-col justify-center p-8 md:p-10">
          <h3 className="brand-tag-lg">
            <ProductName product={product} />
          </h3>
          <p className="eyebrow mt-4">Project workspace</p>
          <p className="mt-2 text-lg font-medium" style={{ color: "var(--brand-text)" }}>
            Plan, communicate, document, and use AI in one place
          </p>
          <p className="mt-5 text-base leading-[1.5] text-ink">
            {product.description}
          </p>
          <p className="mt-3 text-base leading-[1.5] text-muted">
            The timeline plans the work, the workload rail flags who is
            already stretched before you assign the next thing, and the
            decision log keeps the reasons — so the team spends less time
            reconstructing what it already decided.
          </p>

          {product.highlights && (
            <div className="mt-6">
              <p
                className="text-[0.7rem] font-semibold uppercase tracking-[0.08em]"
                style={{ color: "var(--brand-text)" }}
              >
                Key Features
              </p>
              <ul className="check-list">
                {product.highlights.map((highlight) => (
                  <li key={highlight}>
                    <CheckIcon className="h-4 w-4" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2">
            <AvailabilityChip product={product} />
            {product.detail && (
              <Link className="link-arrow" href={product.detail}>
                Explore {product.name}
                <ArrowIcon />
              </Link>
            )}
          </div>
        </div>

        <div
          className="grid grid-rows-[220px_200px] gap-3 border-t p-4 md:grid-rows-[240px_210px] md:p-6 lg:border-l lg:border-t-0"
          style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
        >
          <div
            className="relative overflow-hidden rounded-[16px] border"
            style={{ borderColor: "var(--border)", background: "var(--bg)" }}
            aria-hidden="true"
          >
            <p className="px-5 pt-4 text-[0.7rem] font-semibold text-faint">
              Timeline &amp; tasks
            </p>
            <ColabGraphic />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div
              className="overflow-hidden rounded-[16px] border"
              style={{ borderColor: "var(--border)", background: "var(--bg)" }}
              aria-hidden="true"
            >
              <p className="px-4 pt-4 text-[0.7rem] font-semibold text-faint">
                Decision log
              </p>
              <ColabDecisionLogGraphic />
            </div>
            <div
              className="overflow-hidden rounded-[16px] border"
              style={{ borderColor: "var(--border)", background: "var(--bg)" }}
              aria-hidden="true"
            >
              <p className="px-4 pt-4 text-[0.7rem] font-semibold text-faint">
                Workload rail
              </p>
              <ColabWorkloadGraphic />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/**
 * Presence gets the same full-width treatment as coLab: its own tile, its own
 * mosaic. The main screen is the live roster already built for the bento;
 * beside it, the session boundary (who is let in, and what happens to
 * everyone else) and the export it produces — the two things `presence`'s
 * highlights promise beyond the register itself.
 */
function PresenceHeroCard({ product }) {
  return (
    <article
      className="card card-hover col-span-1 flex flex-col overflow-hidden !p-0 md:col-span-6"
      data-brand={product.accent}
    >
      <div className="grid gap-0 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <div className="flex flex-col justify-center p-8 md:p-10">
          <h3 className="brand-tag-lg">
            <ProductName product={product} />
          </h3>
          <p className="eyebrow mt-4">Attendance management</p>
          <p className="mt-2 text-lg font-medium" style={{ color: "var(--brand-text)" }}>
            Real-time check-ins, controlled access, and exportable records
          </p>
          <p className="mt-5 text-base leading-[1.5] text-ink">
            {product.description}
          </p>
          <p className="mt-3 text-base leading-[1.5] text-muted">
            The roster fills as people arrive rather than getting typed up
            that evening, each session is closed to the people it is meant
            for, and the register comes back out by session or by date range
            in a shape a records office can use directly.
          </p>

          {product.highlights && (
            <div className="mt-6">
              <p
                className="text-[0.7rem] font-semibold uppercase tracking-[0.08em]"
                style={{ color: "var(--brand-text)" }}
              >
                Key Features
              </p>
              <ul className="check-list">
                {product.highlights.map((highlight) => (
                  <li key={highlight}>
                    <CheckIcon className="h-4 w-4" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2">
            <AvailabilityChip product={product} />
            <ContactButton className="link-arrow" subject={product.name} intent="access">
              Request access
              <ArrowIcon />
            </ContactButton>
          </div>
        </div>

        <div
          className="grid grid-rows-[220px_200px] gap-3 border-t p-4 md:grid-rows-[240px_210px] md:p-6 lg:border-l lg:border-t-0"
          style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
        >
          <div
            className="relative overflow-hidden rounded-[16px] border"
            style={{ borderColor: "var(--border)", background: "var(--bg)" }}
            aria-hidden="true"
          >
            <p className="px-5 pt-4 text-[0.7rem] font-semibold text-faint">
              Monday standup · live roster
            </p>
            <PresenceGraphic />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div
              className="overflow-hidden rounded-[16px] border"
              style={{ borderColor: "var(--border)", background: "var(--bg)" }}
              aria-hidden="true"
            >
              <p className="px-4 pt-4 text-[0.7rem] font-semibold text-faint">
                Session access
              </p>
              <PresenceAccessGraphic />
            </div>
            <div
              className="overflow-hidden rounded-[16px] border"
              style={{ borderColor: "var(--border)", background: "var(--bg)" }}
              aria-hidden="true"
            >
              <p className="px-4 pt-4 text-[0.7rem] font-semibold text-faint">
                Export
              </p>
              <PresenceExportGraphic />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function ProductCard({ product, span = "md:col-span-2", height = "h-[176px]" }) {
  const Graphic = GRAPHICS[product.slug];
  return (
    <article
      className={`card card-hover col-span-1 flex flex-col overflow-hidden !p-0 ${span}`}
      data-brand={product.accent}
    >
      <div className="flex items-start justify-between gap-4 p-6 pb-0">
        <h3 className="brand-tag">
          <ProductName product={product} />
        </h3>
        <AvailabilityChip product={product} />
      </div>

      <p className="mt-4 px-6 text-base leading-[1.5] text-ink">
        {product.description || product.tagline}
      </p>

      {Graphic && (
        <div
          className={`relative mt-5 ${height} overflow-hidden border-y`}
          style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
          aria-hidden="true"
        >
          <div className="absolute inset-x-0 bottom-0">
            <Graphic />
          </div>
          <div className="bento-fade pointer-events-none absolute inset-x-0 bottom-0 h-16" />
        </div>
      )}

      {product.highlights && (
        <div className="px-6 pt-5">
          <p
            className="text-[0.7rem] font-semibold uppercase tracking-[0.08em]"
            style={{ color: "var(--brand-text)" }}
          >
            Key Features
          </p>
          <ul className="check-list">
            {product.highlights.map((highlight) => (
              <li key={highlight}>
                <CheckIcon className="h-4 w-4" />
                {highlight}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 p-6 pt-1">
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
