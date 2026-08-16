import { SHARE_CARD_SIZE, shareCard } from "../components/ShareCard";
import { getProduct } from "../data/site";

/** NSQR's own card, in NSQR's violet. See app/components/ShareCard.js. */
const product = getProduct("nsqr");

export const runtime = "edge";
export const alt = `${product.name} — ${product.tagline}`;
export const size = SHARE_CARD_SIZE;
export const contentType = "image/png";

export default function Image() {
  return shareCard({
    accent: "#6924d0",
    headline: "Print it once.",
    emphasis: "Change it forever.",
    footer: "NSQR — dynamic QR codes with scan analytics",
  });
}
