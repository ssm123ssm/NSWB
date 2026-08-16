import { site } from "../data/site";

/**
 * The neurasense lockup: lowercase, never bold, `neura` in ink and `sense` in
 * the house violet. The split never moves and the mark is never inverted.
 *
 * Size is inherited so the same component works in the header and in prose,
 * with `.brand-wordmark` holding the 19px floor the brand sets. The mark is
 * never shrunk below it.
 *
 * The visible letterforms are hidden from assistive tech behind the canonical
 * `site.name`, so the mark reads as "Neurasense" rather than as two fragments.
 *
 * The wordmark stands alone — there is no avatar beside it. The brand's `ns`
 * avatar exists for surfaces too small for the lockup (a favicon, an app
 * icon); nothing on the site is currently one, so it is not implemented here.
 */
export default function Wordmark({ className = "" }) {
  return (
    <span className={`wordmark brand-wordmark ${className}`.trim()}>
      <span className="sr-only">{site.name}</span>
      <span aria-hidden="true">
        neura<span className="wordmark-tail">sense</span>
      </span>
    </span>
  );
}
