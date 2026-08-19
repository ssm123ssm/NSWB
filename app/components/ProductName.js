/**
 * A product's name as display type. Products carrying a `wordmark` render as
 * their lockup — the tail in the product's gradient; everything else renders as
 * plain text.
 *
 * The lockup is the product's mark, so it is the same on every surface: hero,
 * product card, contact dialog. Prose and metadata keep the canonical `name`
 * instead — this is for the places where the name is set as type rather than
 * read as a sentence.
 *
 * The tail is `.gradient-text`, which resolves --grad-from/--grad-to, so every
 * call site needs a data-brand ancestor carrying the product's accent —
 * otherwise the mark wears the house pair and quietly says the wrong thing.
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
        <span className="gradient-text">{tail}</span>
      </span>
    </span>
  );
}
