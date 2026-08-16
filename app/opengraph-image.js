import { SHARE_CARD_SIZE, shareCard } from "./components/ShareCard";
import { site } from "./data/site";

/**
 * The card every link to the site unfurls as — LinkedIn, Slack, WhatsApp,
 * iMessage, X.
 *
 * Drawn rather than shipped as a PNG so it cannot drift: the copy is the hero's
 * own headline and the palette is the house violet. A static export would be a
 * second copy of the brand to remember to update.
 *
 * Next serves this for `/` and for every route that does not define its own.
 * `/nsqr` and `/vault` define their own, in their own accent.
 *
 * Deliberately typographic, matching the hero: a share card is read at about
 * 500px wide in a feed, where an illustration turns to mush and eight words set
 * large still land.
 */
export const runtime = "edge";
export const alt = `${site.name} — ${site.tagline}`;
export const size = SHARE_CARD_SIZE;
export const contentType = "image/png";

export default function Image() {
  return shareCard({
    accent: "#6924d0",
    headline: "We think about what breaks —",
    emphasis: "before it breaks",
    footer: "Software, cryptography, and applied AI",
  });
}
