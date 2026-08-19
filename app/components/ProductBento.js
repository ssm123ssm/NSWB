import Link from "next/link";
import { ContactButton } from "./SiteChrome";
import { ArrowIcon, ChatIcon, CheckIcon, WifiIcon } from "./Icons";
import ProductName from "./ProductName";
import NsqrReel from "./NsqrReel";
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
 * Row one is NSQR alone, at the full six columns — the one card with room
 * enough to run its own standalone reel (`<NsqrReel />`, built long before
 * this section existed and never placed anywhere) rather than the panel-only
 * cut made for a shared row. It carries its own name, tagline and CTA, so it
 * renders outside `<BentoCard>` instead of inside a second layer of chrome
 * that would just repeat them.
 *
 * Row three is their three col-span-2 cards exactly, now that Vault has moved
 * down to sit beside AES and Lipd Hub.
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
  { slug: "nsqr", full: true },
  { slug: "presence", span: "col-span-2", height: "h-[340px]", Graphic: PresenceGraphic },
  { slug: "colab", span: "col-span-4", height: "h-[340px]", Graphic: ColabGraphic },
  { slug: "vault", span: "col-span-2", height: "h-[288px]", Graphic: VaultGraphic },
  { slug: "aes", span: "col-span-2", height: "h-[288px]", Graphic: AesGraphic },
  { slug: "lipd-hub", span: "col-span-2", height: "h-[288px]", Graphic: LipdGraphic },
];

export default function ProductBento() {
  return (
    <section className="py-20" id="products">
      <div className="mx-auto w-full max-w-[992px] px-4">
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="text-center text-base font-medium text-[color:var(--accent-text)] max-md:text-sm">
            What we build
          </p>
          <div className="text-center text-5xl font-medium tracking-[-0.015em] max-md:text-4xl">
            <p className="mb-0">Six products.</p>
            <p className="text-[color:var(--display-muted)]">One standard.</p>
          </div>
        </div>

        <div className="relative mt-12 grid grid-cols-6 gap-4 max-lg:grid-cols-2 max-md:mx-auto max-md:max-w-[500px] max-md:grid-cols-1 max-md:[&>*]:col-span-1">
          {layout.map((item) =>
            item.full ? (
              <article
                className="bento-card col-span-6 flex flex-col overflow-hidden rounded-[24px] border border-solid border-[color:var(--border)] max-lg:col-span-2"
                data-brand={getProduct(item.slug).accent}
                key={item.slug}
              >
                <NsqrReel embedded />
                <div className="px-6 pb-5 pt-1">
                  <Link className="link-arrow" href={getProduct(item.slug).detail}>
                    Explore {getProduct(item.slug).name}
                    <ArrowIcon />
                  </Link>
                </div>
              </article>
            ) : (
              <BentoCard
                Graphic={item.Graphic}
                height={item.height}
                key={item.slug}
                product={getProduct(item.slug)}
                span={item.span}
              />
            )
          )}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            className="btn btn-lg bg-[color:var(--bg-subtle)] text-[color:var(--text)] hover:bg-[color:var(--border)]"
            href="/products"
          >
            See all products
          </Link>
        </div>
      </div>
    </section>
  );
}

function BentoCard({ product, span, height, Graphic }) {
  return (
    <article
      className={`bento-card flex flex-col overflow-hidden rounded-[24px] border border-solid border-[color:var(--border)] ${span} ${height} max-lg:col-span-1`}
      data-brand={product.accent}
    >
      <div className="p-6 pb-0">
        {/* Plain lockup, not the tinted `.brand-tag` pill — matching how the
            NSQR card's own brand row already sets its name, which is the
            look this whole row should carry rather than a capsule. */}
        <h3 className="text-[1.0625rem] font-bold tracking-[-0.02em]">
          <ProductName product={product} />
        </h3>
        <p className="mt-4 text-base leading-[1.5] text-muted">
          {product.taglineSegments ? (
            product.taglineSegments.map((seg, i) =>
              seg.mark ? (
                <span className="mark" key={i}>
                  {seg.text}
                </span>
              ) : (
                <span key={i}>{seg.text}</span>
              )
            )
          ) : (
            product.tagline
          )}
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

/**
 * A beam gradient, matching heroui.pro's: a narrow window swept across the SVG
 * in user space, so one animation lights every path it crosses. Their window
 * runs right-to-left; these run left-to-right, because on this card the flow
 * has a direction — a scan arriving, work advancing — and reading against it
 * would be wrong.
 *
 * `span` is the sweep width, `dur` the stagger. Both keySplines and the 34px
 * window width are theirs.
 */
function BeamGradient({ id, dur, from, to, span = 34 }) {
  return (
    <linearGradient gradientUnits="userSpaceOnUse" id={id} x1={from} x2={from + span} y1="0" y2="0">
      <animate
        attributeName="x1"
        calcMode="spline"
        dur={dur}
        keySplines="0.16 1 0.3 1"
        keyTimes="0; 1"
        repeatCount="indefinite"
        values={`${from}; ${to}`}
      />
      <animate
        attributeName="x2"
        calcMode="spline"
        dur={dur}
        keySplines="0.16 1 0.3 1"
        keyTimes="0; 1"
        repeatCount="indefinite"
        values={`${from + span}; ${to + span}`}
      />
      <stop offset="0%" stopColor="var(--beam-a)" stopOpacity="0" />
      <stop offset="5%" stopColor="var(--beam-a)" stopOpacity="1" />
      <stop offset="32.5%" stopColor="var(--beam-b)" stopOpacity="1" />
      <stop offset="100%" stopColor="var(--beam-b)" stopOpacity="0" />
    </linearGradient>
  );
}

/** Vault — the three things it actually promises (`product.highlights` in
 *  site.js), read as a checked-off list rather than a row of filenames next
 *  to their own ciphertext. The hex strings looked like encryption; they
 *  did not say what the encryption is *for*. This says it directly. */
function VaultGraphic() {
  const values = ["Client-side encryption", "Encrypted manifests", "Policy-based access"];
  return (
    <div className="grid gap-2.5 px-6 pb-3">
      {values.map((label) => (
        <div className="flex items-center gap-2.5" key={label}>
          <span
            className="grid h-5 w-5 shrink-0 place-items-center rounded-full"
            style={{ background: "var(--brand-soft)", color: "var(--brand-text)" }}
          >
            <CheckIcon className="h-3 w-3" />
          </span>
          <span className="text-[0.78rem] leading-snug">{label}</span>
        </div>
      ))}
    </div>
  );
}

/** A row of bars, standing in for a barcode — one of the two ways a check-in
 *  actually gets marked. Widths sum to the viewBox exactly so the mark reads
 *  as deliberate rather than random. */
function BarcodeGlyph({ className = "h-3 w-3" }) {
  const widths = [2, 1, 1, 2, 1, 2, 1, 2, 1, 1];
  let x = 1;
  return (
    <svg aria-hidden="true" className={className} fill="currentColor" viewBox="0 0 24 24">
      {widths.map((w, i) => {
        const bar = (
          <rect height="16" key={i} width={w} x={x} y="4" />
        );
        x += w + 1;
        return bar;
      })}
    </svg>
  );
}

/** Presence — an attendance register, not a row of loose avatars: names,
 *  a time column, and the ruled row a paper register would carry. The two
 *  ways a check-in actually lands — a tap and a scan — get their own small
 *  glyphs at the foot, muted rather than coloured, since they are the method
 *  and not the point. */
function PresenceGraphic() {
  const rows = [
    { initials: "AK", time: "09:02", present: true },
    { initials: "RS", time: "09:04", present: true },
    { initials: "MJ", time: "09:11", present: true },
    { initials: "TP", time: "—", present: false },
  ];
  return (
    <div className="px-6 pb-3">
      <div className="grid">
        {rows.map((row) => (
          <div
            className="flex items-center justify-between gap-3 border-t py-1 first:border-t-0"
            key={row.initials}
            style={{ borderColor: "var(--border)" }}
          >
            <span
              className="grid h-5 w-5 shrink-0 place-items-center rounded-full text-[0.55rem] font-semibold"
              style={{
                background: row.present ? "var(--brand)" : "var(--bg-subtle)",
                color: row.present ? "#ffffff" : "var(--text-faint)",
              }}
            >
              {row.initials}
            </span>
            <span
              className="font-mono text-[0.65rem]"
              style={{ color: row.present ? "var(--brand-text)" : "var(--text-faint)" }}
            >
              {row.time}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-2 flex items-center gap-1.5" style={{ color: "var(--text-faint)" }}>
        <span
          className="grid h-5 w-5 place-items-center rounded-[6px] border"
          style={{ borderColor: "var(--border-strong)" }}
        >
          <WifiIcon className="h-3 w-3 rotate-90" />
        </span>
        <span
          className="grid h-5 w-5 place-items-center rounded-[6px] border"
          style={{ borderColor: "var(--border-strong)" }}
        >
          <BarcodeGlyph className="h-3 w-3" />
        </span>
        <span className="text-[0.6rem]">tap or scan to check in</span>
      </div>
    </div>
  );
}

/** coLab — the milestone rail as a back layer, with two of its own cards
 *  sitting side by side beneath it rather than stacked on top of one
 *  another: a "coming due" checklist and a task carrying its own context —
 *  the objects the product is actually built from (`colabCapabilities`:
 *  "a timeline, not a backlog", "tasks that carry their context", "workloads
 *  before you assign"). An earlier version stacked a third card in the
 *  corner and the two floating panels collided; side by side with real
 *  width and a stronger shadow reads as two cards, not a pile-up. */
/** The status trio — deliberately not `--brand`. A task's urgency is a
 *  universal green/amber/red regardless of which product's blue is on the
 *  card, the same traffic-light read as a due-date column in any tracker. */
const STATUS = { done: "#16a34a", soon: "#d97706", overdue: "#dc2626" };

function ColabGraphic() {
  const nodes = [
    { label: "Scope", at: 40, done: true },
    { label: "Build", at: 190, done: true },
    { label: "Review", at: 340, done: false },
    { label: "Ship", at: 490, done: false },
  ];
  const due = [
    { label: "Wireframes", state: "done" },
    { label: "Client call", state: "soon" },
    { label: "Ship copy", state: "overdue" },
  ];
  const cardStyle = {
    borderColor: "var(--border-strong)",
    background: "var(--surface)",
    boxShadow: "var(--shadow-md)",
  };
  return (
    <div className="relative px-6 pb-3" style={{ height: "192px" }}>
      <svg
        className="absolute inset-x-6 top-0 w-[calc(100%-3rem)]"
        fill="none"
        viewBox="0 0 530 92"
        aria-hidden="true"
      >
        <defs>
          <BeamGradient dur="4.5s" from={-40} id="colab-beam" span={60} to={230} />
        </defs>

        <path className="beam-base" d="M40 20H490" strokeLinecap="round" strokeWidth="2" />
        <path d="M40 20H190" stroke="var(--brand)" strokeLinecap="round" strokeWidth="2" />
        <path className="beam" d="M40 20H190" stroke="url(#colab-beam)" strokeLinecap="round" strokeWidth="3" />

        {nodes.map((node) => (
          <g key={node.label}>
            <circle
              cx={node.at}
              cy="20"
              r="9"
              fill={node.done ? "var(--brand)" : "var(--bg-sunken)"}
              stroke={node.done ? "var(--brand)" : "var(--border-strong)"}
              strokeWidth="2"
            />
            <text fill="var(--text-faint)" fontSize="13" textAnchor="middle" x={node.at} y="52">
              {node.label}
            </text>
          </g>
        ))}
      </svg>

      {/* Coming due + task card, side by side rather than stacked — no
          overlap to fight, and each one gets real width to read at. */}
      <div className="absolute inset-x-6 bottom-0 flex items-end gap-4">
        <div aria-hidden="true" className="flex-1 rounded-[14px] border p-3" style={cardStyle}>
          <span className="text-[0.72rem] font-semibold">Coming due</span>
          <ul className="mt-2 grid gap-1.5">
            {due.map((item) => (
              <li className="flex items-center gap-1.5" key={item.label}>
                <span
                  className="grid h-3.5 w-3.5 shrink-0 place-items-center rounded-[4px] border"
                  style={{
                    borderColor: STATUS[item.state],
                    background: item.state === "done" ? STATUS[item.state] : "transparent",
                    color: "#ffffff",
                  }}
                >
                  {item.state === "done" && <CheckIcon className="h-2.5 w-2.5" />}
                </span>
                <span
                  className={`truncate text-[0.72rem] ${
                    item.state === "done" ? "text-faint line-through" : ""
                  }`}
                >
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
          {/* Task completed — a small confirmation under the checklist that
              already shows the same item struck through, so the panel reads
              as one story: plan → done. */}
          <div
            className="mt-2.5 flex items-center gap-1.5 border-t pt-2"
            style={{ borderColor: "var(--border)" }}
          >
            <span
              className="grid h-4 w-4 shrink-0 place-items-center rounded-full"
              style={{ background: STATUS.done, color: "#ffffff" }}
            >
              <CheckIcon className="h-2.5 w-2.5" />
            </span>
            <span className="truncate text-[0.68rem] text-faint">Wireframes completed</span>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="flex-1 -translate-y-1.5 rounded-[14px] border p-3"
          style={cardStyle}
        >
          <div className="flex items-center justify-between gap-2">
            <span className="chip chip-neutral h-5 px-2 text-[0.65rem]">Review</span>
            <span className="text-[0.65rem] text-faint">Due Fri</span>
          </div>
          <p className="mt-2.5 text-[0.8rem] font-medium leading-snug">Ship the review flow</p>
          <div className="mt-3 flex items-center justify-between">
            <span
              className="grid h-6 w-6 place-items-center rounded-full text-[0.6rem] font-semibold"
              style={{ background: "var(--brand)", color: "var(--accent-on)" }}
            >
              RS
            </span>
            <span className="flex items-center gap-1 text-[0.65rem] text-faint">
              <ChatIcon className="h-3 w-3" /> 3
            </span>
          </div>
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
        className="grid h-16 w-16 shrink-0 place-items-center rounded-full text-lg font-medium"
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
