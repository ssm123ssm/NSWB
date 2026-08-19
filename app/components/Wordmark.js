import { site } from "../data/site";

/**
 * The neurasense lockup: a rounded gradient mark carrying `n`, then the name —
 * `neura` in ink and `sense` in the house gradient, set at 700.
 *
 * The mark and the name are one object. Pass `markOnly` where there is no room
 * for the name (a collapsed header, a dense card); the mark alone still reads
 * as the company because it is the same gradient the rest of the site runs on.
 *
 * Size is inherited from `.wordmark`, so the same component works in the header
 * and in prose. The visible letterforms are hidden from assistive tech behind
 * the canonical `site.name`, so the mark reads as "Neurasense" rather than as
 * three fragments.
 */
export default function Wordmark({ className = "", markOnly = false }) {
  return (
    <span className={`wordmark ${className}`.trim()}>
      <span className="sr-only">{site.name}</span>
      <span className="brand-mark" aria-hidden="true">
        n
      </span>
      {!markOnly && (
        <span aria-hidden="true">
          neura<span className="gradient-text">sense</span>
        </span>
      )}
    </span>
  );
}
