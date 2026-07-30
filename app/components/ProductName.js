/**
 * A product's name as display type. Products carrying a `wordmark` render as
 * their lockup — lowercase and tightened, with the tail in the product accent;
 * everything else renders as plain text.
 *
 * The lockup is the product's mark, so it is the same on every surface: hero
 * strip, timeline card, product row, contact dialog. Prose and metadata keep
 * the canonical `name` instead — this is for the places where the name is set
 * as type rather than read as a sentence.
 *
 * Size and weight are inherited, so the same component works at hero-strip
 * scale and card-heading scale. The lockup is hidden from assistive tech behind
 * the canonical `name`, so links read as "Explore NSQR" rather than "nsqr".
 *
 * The tail colour comes from --brand, so every call site needs a data-brand
 * ancestor carrying the product's accent — otherwise the mark wears the house
 * accent and quietly says the wrong thing.
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
        <span className="wordmark-tail">{tail}</span>
      </span>
    </span>
  );
}
