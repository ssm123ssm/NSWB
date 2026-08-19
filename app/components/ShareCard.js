import { ImageResponse } from "next/og";

/**
 * The one share card layout, so `/`, `/nsqr` and `/vault` cannot drift apart.
 *
 * Each caller supplies its own accent and its own two lines; everything that
 * makes the card recognisably ours — the grid, the wordmark, the rule, the
 * proportions — lives here. A product page unfurls in that product's colour,
 * which is the same rule the pages themselves follow.
 *
 * Not a React component: it returns the finished ImageResponse, because that is
 * what a Next `opengraph-image` file has to default-export.
 */
export const SHARE_CARD_SIZE = { width: 1200, height: 630 };

export function shareCard({ accent, headline, emphasis, footer }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          padding: "80px",
          // The hairline grid from the hero, flattened to two gradients.
          backgroundImage:
            "linear-gradient(to right, #ececec 1px, transparent 1px), linear-gradient(to bottom, #ececec 1px, transparent 1px)",
          backgroundSize: "96px 96px",
        }}
      >
        <div style={{ display: "flex", fontSize: 44, letterSpacing: "-0.03em" }}>
          <span style={{ color: "#111111" }}>neura</span>
          <span style={{ color: "#111111" }}>sense</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 76,
            lineHeight: 1.1,
            letterSpacing: "-0.035em",
            color: "#111111",
          }}
        >
          <span>{headline}</span>
          <span style={{ color: accent }}>{emphasis}</span>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: "#555555",
            borderTop: "1px solid #dcdcdc",
            paddingTop: "28px",
          }}
        >
          {footer}
        </div>
      </div>
    ),
    SHARE_CARD_SIZE
  );
}
