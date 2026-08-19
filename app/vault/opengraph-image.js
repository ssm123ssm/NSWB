import { SHARE_CARD_SIZE, shareCard } from "../components/ShareCard";
import { getProduct } from "../data/site";

/** Vault's own card, in Vault's cyan. See app/components/ShareCard.js. */
const product = getProduct("vault");

export const runtime = "edge";
export const alt = `${product.name} — ${product.tagline}`;
export const size = SHARE_CARD_SIZE;
export const contentType = "image/png";

export default function Image() {
  return shareCard({
    // --brand-text for cyan, so the card obeys the same contrast rule the
    // pages do rather than using the lighter fill value.
    accent: "#048099",
    headline: "Encrypted before it leaves",
    emphasis: "your device.",
    footer: "Vault — storage only you can open",
  });
}
