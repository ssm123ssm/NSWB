/**
 * Product marks.
 *
 * One mark per product, drawn from what the product actually does rather than
 * from a category icon. They matter more than usual here: NSQR, Vault and
 * Presence sit within 0.007 luminance of each other, so in greyscale — or for
 * a reader who does not separate those hues — colour is not telling the
 * products apart. The mark is.
 *
 * The system, so six marks read as one family:
 *   - A 24×24 box, drawn on a 2px grid so edges land on whole pixels at 24px.
 *   - `currentColor` throughout, so a mark inherits the product hue from its
 *     `.icon-tile` (white on the fill) or `--brand-text` when set on its own.
 *   - 1.8 stroke, round caps and joins, matching the Icons.js set.
 *   - One solid element per mark and the rest outline. The solid is the thing
 *     the product is *about* — the payload, the key, the settled decision.
 *
 * Each mark is documented with the idea it encodes, because the whole point is
 * that they are meaningful; a mark nobody can explain is decoration and should
 * be redrawn rather than kept.
 */

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

/**
 * NSQR — the code is printed once, the destination keeps moving.
 * A QR finder square (the corner pattern every scanner looks for) with its
 * fourth corner opened into an arrow that turns back on itself. The frame is
 * fixed; the thing inside it is not.
 */
export function NsqrMark({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden="true">
      <path d="M4 9V5.6A1.6 1.6 0 0 1 5.6 4H9" />
      <path d="M15 4h3.4A1.6 1.6 0 0 1 20 5.6V9" />
      <path d="M4 15v3.4A1.6 1.6 0 0 0 5.6 20H9" />
      <rect x="8.5" y="8.5" width="7" height="7" rx="1.4" fill="currentColor" stroke="none" />
      <path d="M20 14.5v2.2a3.3 3.3 0 0 1-3.3 3.3h-2.2" />
      <path d="m16.4 17.6 -1.9 2.4 2.4 1.7" />
    </svg>
  );
}

/**
 * Vault — we hold the box, you hold the key.
 * A sealed container with its contents scrambled, and the keyhole sitting
 * outside the wall rather than in it. The key is deliberately not attached:
 * that separation is the entire product claim.
 */
export function VaultMark({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden="true">
      <rect x="3" y="6" width="12" height="12" rx="2.2" />
      <path d="M6 9.6h6M6 12h4M6 14.4h6" opacity="0.55" />
      <circle cx="19" cy="9.6" r="2.2" fill="currentColor" stroke="none" />
      <path d="M19 11.8V17m0-2.2h1.8" />
    </svg>
  );
}

/**
 * coLab — the plan, and the reasons.
 * A milestone rail with the settled decision filled in. The two open nodes are
 * dates still ahead; the solid one is the decision already signed, which is the
 * part of coLab nothing else keeps.
 */
export function ColabMark({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden="true">
      <path d="M3 12h18" />
      <circle cx="6.5" cy="12" r="2.4" />
      <circle cx="12" cy="12" r="2.4" fill="currentColor" stroke="none" />
      <circle cx="17.5" cy="12" r="2.4" />
      <path d="M12 14.4v3.2M9.6 17.6h4.8" />
      <path d="M12 9.6V6.4" opacity="0.55" />
    </svg>
  );
}

/**
 * Presence — scanned, and therefore here.
 * The same finder square as NSQR, because Presence is QR attendance and shares
 * that lineage, but closed and carrying a check. Where NSQR's mark opens
 * outward to a moving destination, this one closes on a confirmed fact.
 */
export function PresenceMark({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden="true">
      <path d="M4 9V5.6A1.6 1.6 0 0 1 5.6 4H9" />
      <path d="M15 4h3.4A1.6 1.6 0 0 1 20 5.6V9" />
      <path d="M4 15v3.4A1.6 1.6 0 0 0 5.6 20H9" />
      <path d="M20 15v3.4a1.6 1.6 0 0 1-1.6 1.6H15" />
      <path d="m8.6 12.2 2.4 2.4 4.4-4.8" fill="none" strokeWidth="2.2" />
    </svg>
  );
}

/**
 * Lipd Hub — the thing being measured.
 * A lipid bilayer: two ranks of head groups with their tails facing inward,
 * which is the structure the whole field is named for. One head is solid — the
 * pattern picked out of the membrane, which is what the product is for.
 */
export function LipdMark({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden="true">
      <circle cx="5" cy="6.5" r="1.7" />
      <circle cx="12" cy="6.5" r="1.7" fill="currentColor" stroke="none" />
      <circle cx="19" cy="6.5" r="1.7" />
      <path d="M5 8.2v3.3M12 8.2v3.3M19 8.2v3.3" />
      <path d="M5 15.8v-3.3M12 15.8v-3.3M19 15.8v-3.3" />
      <circle cx="5" cy="17.5" r="1.7" />
      <circle cx="12" cy="17.5" r="1.7" />
      <circle cx="19" cy="17.5" r="1.7" />
    </svg>
  );
}

/**
 * AES — Automated AI-based Essay Scoring. (Not Advanced Encryption Standard,
 * which is what the initials suggest and what the old `score` motif key had
 * already half-forgotten.)
 * A page of prose with the last line resolving into a filled mark: text goes
 * in, a judgement comes out. The rising step under it is the score, not a
 * chart — three lines of writing, one verdict.
 */
export function AesMark({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke} aria-hidden="true">
      <path d="M5.5 4h9.2L19 8.3V20a0 0 0 0 1 0 0H5.5a0 0 0 0 1 0 0V4Z" />
      <path d="M14.4 4v4.2H19" />
      <path d="M8.4 11h7.2M8.4 13.8h7.2" opacity="0.55" />
      <rect x="8.4" y="16.2" width="4.4" height="1.9" rx="0.95" fill="currentColor" stroke="none" />
    </svg>
  );
}

/**
 * Keyed by the `motif` field each product already carries in site.js, so
 * adding a product does not mean editing a second lookup here.
 */
export const productMarks = {
  qr: NsqrMark,
  vault: VaultMark,
  plan: ColabMark,
  checkin: PresenceMark,
  lipid: LipdMark,
  score: AesMark,
};

/** The mark for a product, falling back to nothing rather than to a generic
 *  icon — a wrong mark is worse than none, and a missing one is a visible bug
 *  that gets fixed rather than a plausible placeholder that does not. */
export default function ProductMark({ product, className }) {
  const Mark = productMarks[product.motif];
  return Mark ? <Mark className={className} /> : null;
}
