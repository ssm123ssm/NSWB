/**
 * A product's name as display type. Products carrying a `wordmark` render as
 * their lockup — the tail in the display's second tone; everything else renders
 * as plain text.
 *
 * The lockup is the product's mark, so it is the same on every surface: hero,
 * product card, contact dialog. Prose and metadata keep the canonical `name`
 * instead — this is for the places where the name is set as type rather than
 * read as a sentence.
 *
 * The tail is `.display-tone` — flat --display-muted grey, the same second tone
 * the display headings use. It is deliberately not the product's own hue: the
 * lockup is type, and colouring half a word competes with the icon tile that is
 * already carrying the product's colour in the same card.
 */
export default function ProductName({ product, className = "" }) {
  if (!product.wordmark) {
    return product.name;
  }

  const [head, tail] = product.wordmark;

  return (
    <span className={`wordmark ${className}`.trim()}>
      <span className="sr-only">{product.name}</span>
      <span aria-hidden="true">
        {head}
        <span className="display-tone">{tail}</span>
      </span>
    </span>
  );
}
