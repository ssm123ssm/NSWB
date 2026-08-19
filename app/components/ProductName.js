/**
 * A product's trade name, set as its own lockup: head in ink, tail in the
 * product's colour. These are the products' established marks — they are the
 * logo, so this component is the logo, and the split and the hue are not
 * styling choices to revisit.
 *
 * The lockup is the product's mark, so it is the same on every surface: hero,
 * product card, contact dialog. Prose and metadata keep the canonical `name`
 * instead — this is for the places where the name is set as type rather than
 * read as a sentence.
 *
 * The tail is `.lockup-tail`, which resolves --brand-text. That is a *text*
 * colour, chosen to clear 4.5:1 on a white card, on the grey page and on the
 * lockup's own tinted pill — the pill being the tightest of the three. Never
 * set the tail to --brand, which is a fill and is not safe on words.
 *
 * Every call site needs a data-brand ancestor carrying the product's accent,
 * or the mark wears the house colour and quietly says the wrong thing.
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
        <span className="lockup-tail">{tail}</span>
      </span>
    </span>
  );
}
