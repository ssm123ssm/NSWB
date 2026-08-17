import { breakNotes } from "../data/site";

/**
 * "What we thought would break" — the same section, in the same slot, on every
 * product page.
 *
 * This is the company line turned into a format. The value is in the
 * repetition and in the third part: naming the trade-off the design cost you,
 * in a fixed place, is something a marketing page will not do, and it is what
 * makes the other two parts believable.
 *
 * A server component, and deliberately three elements: the failure, the
 * answer, the price. Resist adding a fourth — an icon, a stat, a quote — every
 * one of them turns evidence back into copy.
 *
 * Content lives in `breakNotes` in app/data/site.js, keyed by product slug, so
 * a product that has no page yet still has its note ready for /products.
 */
export function BreakNote({ slug }) {
  const note = breakNotes[slug];
  if (!note) return null;

  return (
    <section className="section">
      <div className="shell">
        <div className="reveal break-note">
          <p className="eyebrow">What we thought would break</p>

          <h2 className="break-note-failure">{note.failure}</h2>

          <p className="lead break-note-answer">{note.answer}</p>

          <p className="break-note-tradeoff">
            <span className="break-note-tradeoff-label">The trade-off we accepted</span>
            <span>{note.tradeoff}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
