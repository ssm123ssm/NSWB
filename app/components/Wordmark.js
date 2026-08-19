import { site } from "../data/site";

/**
 * The neurasense wordmark: `neura` in ink and `sense` picking up the theme
 * accent only on hover.
 *
 * Size is inherited from `.wordmark`, so the same component works in the header
 * and in prose. The visible letterforms are hidden from assistive tech behind
 * the canonical `site.name`.
 */
export default function Wordmark({ className = "" }) {
  return (
    <span className={`wordmark ${className}`.trim()}>
      <span className="sr-only">{site.name}</span>
      <span aria-hidden="true">
        neura<span className="wordmark-tone">sense</span>
      </span>
    </span>
  );
}
