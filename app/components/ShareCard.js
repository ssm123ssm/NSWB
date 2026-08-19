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
          // A hairline grid, flattened to two linear gradients. Satori's CSS
          // parser rejects the page's radial dot-matrix syntax outright, so
          // this is deliberately the simpler figure rather than a match.
          backgroundImage:
            "linear-gradient(to right, #e4e4e7 1px, transparent 1px), linear-gradient(to bottom, #e4e4e7 1px, transparent 1px)",
          backgroundSize: "96px 96px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
            fontSize: 44,
            fontWeight: 700,
            letterSpacing: "-0.03em",
          }}
        >
          {/* The rounded gradient mark, matching the site wordmark. */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 62,
              height: 62,
              borderRadius: 16,
              background: `linear-gradient(135deg, ${accent}, #06b7db)`,
              color: "#ffffff",
            }}
          >
            n
          </div>
          <div style={{ display: "flex" }}>
            <span style={{ color: "#11181c" }}>neura</span>
            <span style={{ color: accent }}>sense</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 76,
            lineHeight: 1.1,
            fontWeight: 700,
            letterSpacing: "-0.035em",
            color: "#11181c",
          }}
        >
          <span>{headline}</span>
          <span style={{ color: accent }}>{emphasis}</span>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: "#52525b",
            borderTop: "1px solid #e4e4e7",
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
