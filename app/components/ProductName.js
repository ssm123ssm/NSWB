/**
 * A product's name as display type. Products carrying a `wordmark` render as
 * their lockup — lowercase and tightened, with the tail in the product accent;
 * everything else renders as plain text.
 *
 * Marks still on trial are scoped to the hero, so pass `hero` there and nowhere
 * else. Only `wordmarkScope: "all"` marks appear on every surface.
 *
 * Size and weight are inherited, so the same component works at hero-strip
 * scale and card-heading scale. The lockup is hidden from assistive tech behind
 * the canonical `name`, so links read as "Explore NSQR" rather than "nsqr".
 */
export default function ProductName({ product, className = "", hero = false }) {
  const showLockup =
    product.wordmark && (hero || product.wordmarkScope === "all");

  if (!showLockup) {
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
