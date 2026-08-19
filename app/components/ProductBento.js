import Link from "next/link";
import { ContactButton } from "./SiteChrome";
import { ArrowIcon } from "./Icons";
import ProductName from "./ProductName";
import { getProduct } from "../data/site";

/**
 * The products section, built to heroui.pro's "What's included" bento.
 *
 * The measurements are theirs, read out of their markup rather than eyeballed:
 * a 992px container, a six-column grid at gap-4, cards at rounded-[24px] with a
 * solid border, and fixed heights per row — 400 / 280 / 288. The breakpoints
 * are theirs too: two columns under lg, one column under md with every card
 * dropping to a single span and the grid capped at 500px.
 *
 * Their row three is three col-span-2 cards. We have six products where they
 * have seven cards, so row three here is two col-span-3s — the only deviation,
 * and it keeps the grid filled rather than leaving a two-column hole.
 *
 * Each card is a fixed-height flex column: copy, then the graphic in whatever
 * height is left, then the link. The graphic is clipped to its own region and
 * its foot is dissolved into the surface by a gradient overlay, which is what
 * keeps an illustration from meeting the card border as a hard edge.

 * The column is load-bearing rather than tidy. The first version positioned
 * the graphic and the link absolutely inside the frame, and on every card they
 * landed on top of each other. Siblings in a column cannot overlap however
 * tall the copy runs, which matters here because the taglines are not all one
 * line.
 *
 * The graphics are ours. Theirs are demos of their own component library,
 * which would mean nothing here — each of these draws the thing its product
 * actually does.
 */

const layout = [
  { slug: "nsqr", span: "col-span-3", height: "h-[400px]", Graphic: NsqrGraphic },
  { slug: "vault", span: "col-span-3", height: "h-[400px]", Graphic: VaultGraphic },
  { slug: "presence", span: "col-span-2", height: "h-[280px]", Graphic: PresenceGraphic },
  { slug: "colab", span: "col-span-4", height: "h-[280px]", Graphic: ColabGraphic },
  { slug: "aes", span: "col-span-3", height: "h-[288px]", Graphic: AesGraphic },
  { slug: "lipd-hub", span: "col-span-3", height: "h-[288px]", Graphic: LipdGraphic },
];

export default function ProductBento() {
  return (
    <section className="py-20" id="products">
      <div className="mx-auto w-full max-w-[992px] px-4">
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="text-center text-base font-medium text-[color:var(--accent-text)] max-md:text-sm">
            What we build
          </p>
          <div className="text-center text-5xl font-bold tracking-[-0.03em] max-md:text-4xl">
            <p className="mb-0">Six products.</p>
            <p className="text-[color:var(--display-muted)]">One standard.</p>
          </div>
        </div>

        <div className="relative mt-12 grid grid-cols-6 gap-4 max-lg:grid-cols-2 max-md:mx-auto max-md:max-w-[500px] max-md:grid-cols-1 max-md:[&>*]:col-span-1">
          {layout.map(({ slug, span, height, Graphic }) => (
            <BentoCard
              Graphic={Graphic}
              height={height}
              key={slug}
              product={getProduct(slug)}
              span={span}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function BentoCard({ product, span, height, Graphic }) {
  return (
    <article
      className={`bento-card flex flex-col overflow-hidden rounded-[24px] border border-solid border-[color:var(--border)] transition-colors hover:border-[color:var(--brand)] ${span} ${height} max-lg:col-span-1`}
      data-brand={product.accent}
    >
      <div className="p-6 pb-0">
        <h3 className="brand-tag">
          <ProductName product={product} />
        </h3>
        <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">
          {product.tagline}
        </p>
      </div>

      {/* The graphic gets whatever height is left over and is clipped to it,
          with the fade dissolving its foot into the surface.

          This is a flex column on purpose. An earlier version absolutely
          positioned the graphic and the link inside a fixed-height frame, and
          on every card they landed on top of each other — the link sat over
          the illustration and both became unreadable. Three siblings in a
          column cannot overlap however tall the copy runs. */}
      <div className="relative min-h-0 flex-1 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-x-0 bottom-0">
          <Graphic />
        </div>
        <div className="bento-fade pointer-events-none absolute inset-x-0 bottom-0 h-16" />
      </div>

      <div className="px-6 pb-5 pt-1">
        {product.detail ? (
          <Link className="link-arrow" href={product.detail}>
            Explore {product.name}
            <ArrowIcon />
          </Link>
        ) : (
          <ContactButton className="link-arrow" subject={product.name} intent="access">
            Request access
            <ArrowIcon />
          </ContactButton>
        )}
      </div>
    </article>
  );
}

/* -------------------------------------------------------------------------
   Card graphics. Each one draws what its product does, in the product's own
   hue, and is sized to sit under the copy without being measured against it.
   ------------------------------------------------------------------------- */

/** NSQR — a QR field with scan volume rising underneath it. */
function NsqrGraphic() {
  const cells = [1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1];
  const bars = [38, 62, 30, 78, 54, 88, 46];
  return (
    <div className="flex items-end justify-between gap-6 px-6 pb-3">
      <div className="grid grid-cols-5 gap-1.5">
        {cells.map((on, i) => (
          <span
            className="h-4 w-4 rounded-[3px]"
            key={i}
            style={{
              background: on ? "var(--brand)" : "var(--bg-subtle)",
              opacity: on ? 0.25 + (i % 5) * 0.14 : 1,
            }}
          />
        ))}
      </div>
      <div className="flex h-[104px] items-end gap-2">
        {bars.map((h, i) => (
          <span
            className="w-4 rounded-t-[3px]"
            key={i}
            style={{ height: `${h}%`, background: "var(--brand)", opacity: 0.2 + i * 0.11 }}
          />
        ))}
      </div>
    </div>
  );
}

/** Vault — file rows whose names are already ciphertext. */
function VaultGraphic() {
  const rows = [
    ["board-pack-q3.pdf", "8f3ac1d94e0b7a2f"],
    ["cohort-2026.csv", "b20e7c8a5f1d3906"],
    ["term-sheet.docx", "5d9142fb6c0ea837"],
    ["keys/rotation.md", "e7602b3d8a94c5f1"],
  ];
  return (
    <div className="grid gap-2 px-6 pb-3">
      {rows.map(([name, cipher], i) => (
        <div
          className="flex items-center justify-between gap-4 rounded-token border border-[color:var(--border)] bg-[color:var(--bg-sunken)] px-3 py-2.5"
          key={name}
          style={{ opacity: 1 - i * 0.14 }}
        >
          <span className="truncate text-xs text-faint line-through">{name}</span>
          <span
            className="font-mono text-[0.7rem]"
            style={{ color: "var(--brand-text)" }}
          >
            {cipher}
          </span>
        </div>
      ))}
    </div>
  );
}

/** Presence — a check-in roll filling up. */
function PresenceGraphic() {
  const people = ["AK", "RS", "MJ", "TP", "LN"];
  return (
    <div className="flex items-end gap-2 px-6 pb-3">
      {people.map((initials, i) => (
        <div className="grid justify-items-center gap-1.5" key={initials}>
          <span
            className="grid h-9 w-9 place-items-center rounded-full text-[0.65rem] font-semibold"
            style={{
              background: i < 4 ? "var(--brand)" : "var(--bg-subtle)",
              color: i < 4 ? "#ffffff" : "var(--text-faint)",
            }}
          >
            {initials}
          </span>
          <span
            className="h-1 w-6 rounded-full"
            style={{ background: i < 4 ? "var(--brand)" : "var(--border-strong)" }}
          />
        </div>
      ))}
    </div>
  );
}

/** coLab — a milestone rail with the settled decision behind it. */
function ColabGraphic() {
  const nodes = [
    { label: "Scope", done: true },
    { label: "Build", done: true },
    { label: "Review", done: false },
    { label: "Ship", done: false },
  ];
  return (
    <div className="px-6 pb-3">
      <div className="relative">
        <span
          className="absolute left-0 right-0 top-[9px] h-[2px]"
          style={{ background: "var(--border)" }}
        />
        <span
          className="absolute left-0 top-[9px] h-[2px] w-1/2"
          style={{ background: "var(--brand)" }}
        />
        <div className="relative flex justify-between">
          {nodes.map((node) => (
            <div className="grid justify-items-center gap-2" key={node.label}>
              <span
                className="h-5 w-5 rounded-full border-2"
                style={{
                  background: node.done ? "var(--brand)" : "var(--bg-sunken)",
                  borderColor: node.done ? "var(--brand)" : "var(--border-strong)",
                }}
              />
              <span className="text-[0.7rem] text-faint">{node.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** AES — prose resolving into a score. */
function AesGraphic() {
  return (
    <div className="flex items-end justify-between gap-6 px-6 pb-3">
      <div className="grid flex-1 gap-1.5">
        {[100, 92, 96, 74, 88].map((w, i) => (
          <span
            className="h-1.5 rounded-full"
            key={i}
            style={{ width: `${w}%`, background: "var(--bg-muted)" }}
          />
        ))}
      </div>
      <div
        className="grid h-16 w-16 shrink-0 place-items-center rounded-full text-lg font-bold"
        style={{ background: "var(--brand-soft)", color: "var(--brand-text)" }}
      >
        A−
      </div>
    </div>
  );
}

/** Lipd Hub — a lipid bilayer, one head picked out of the membrane. */
function LipdGraphic() {
  const heads = [0, 1, 2, 3, 4, 5, 6, 7];
  return (
    <div className="grid gap-1 px-6 pb-3">
      <div className="flex justify-between">
        {heads.map((i) => (
          <span
            className="h-3 w-3 rounded-full"
            key={`t${i}`}
            style={{ background: i === 3 ? "var(--brand)" : "var(--bg-muted)" }}
          />
        ))}
      </div>
      <div className="flex justify-between">
        {heads.map((i) => (
          <span
            className="h-6 w-[2px]"
            key={`l${i}`}
            style={{ background: i === 3 ? "var(--brand)" : "var(--border-strong)" }}
          />
        ))}
      </div>
      <div className="flex justify-between">
        {heads.map((i) => (
          <span
            className="h-3 w-3 rounded-full"
            key={`b${i}`}
            style={{ background: "var(--bg-muted)" }}
          />
        ))}
      </div>
    </div>
  );
}
