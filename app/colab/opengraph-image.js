import { SHARE_CARD_SIZE, shareCard } from "../components/ShareCard";
import { getProduct } from "../data/site";

/** coLab's own card, in coLab's blue. See app/components/ShareCard.js. */
const product = getProduct("colab");

export const runtime = "edge";
export const alt = `${product.name} — ${product.tagline}`;
export const size = SHARE_CARD_SIZE;
export const contentType = "image/png";

export default function Image() {
  return shareCard({
    // --brand-text for blue, so the card obeys the same contrast rule the
    // pages do rather than using the lighter fill value.
    accent: "#7828c8",
    headline: "Every project remembers",
    emphasis: "what it is for.",
    footer: "coLab — dates, work, and the decisions between them",
  });
}
