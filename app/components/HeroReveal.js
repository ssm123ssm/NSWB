"use client";

import { useEffect, useRef } from "react";
import { motifMap } from "./Icons";

/**
 * The hero's ground: product surfaces held just under the threshold of
 * legibility, with a light the reader carries over them.
 *
 * Two copies of one field of tiles. The base sits at hairline strength — the
 * quiet texture the grid used to provide — and a brighter copy above it is
 * masked to a circle that follows the pointer. Nothing is drawn on top of a
 * tile; the mask opens a hole and lets the brighter copy through, so a panel
 * comes up out of the ground where the light falls and sinks back when it
 * leaves. The two layers differ only in which tokens they resolve: `--border`
 * and no fill below, `--border-strong` over `--surface` above, which is the
 * same "a card lifts by being lighter than the page" the light theme is built
 * on, and holds in dark without a second palette.
 *
 * The tiles are deliberately not screenshots and carry no readable text. They
 * are the shape of a product surface — a head, some rows, a chart — at the
 * size a real one would be, cropped by the edges of the screen so the field
 * reads as something larger than the viewport rather than as six cards
 * arranged on it. Only the motif in each head is coloured, in that product's
 * `--brand`, so the light passing over a tile says which product it is
 * without a label.
 *
 * Positions are here rather than in `site.js` because they are layout, not
 * content: they say where a tile sits in this composition and nothing about
 * the product. Which products appear is content, and comes from the caller.
 * More products than positions cycle, so the field cannot break when the
 * lineup grows.
 *
 * Degrades to a still field: without JS, on a touch screen, or under reduced
 * motion, only the base layer renders and no listener is ever attached.
 */

// Cropped left and right, clear of the centre column where the headline, the
// lead and the product strip sit. `lines` is the tile's contents — row widths
// for `rows` and `chips`, bar heights for `chart` — varied per tile so six
// panels do not read as one component stamped six times.
const tiles = [
  { x: "-6%", y: "6%", w: "21rem", shape: "rows", lines: [72, 54, 88, 46] },
  { x: "76%", y: "4%", w: "23rem", shape: "chips", lines: [64, 82, 55, 70] },
  { x: "-5%", y: "38%", w: "19rem", shape: "chart", lines: [38, 70, 52, 94, 61] },
  { x: "80%", y: "35%", w: "22rem", shape: "rows", lines: [66, 86, 48] },
  { x: "-3%", y: "68%", w: "18rem", shape: "chips", lines: [74, 52] },
  { x: "78%", y: "64%", w: "20rem", shape: "chart", lines: [56, 82, 44, 68] },
];

// The lerp factor. The light trails the pointer by a few frames, which is the
// whole difference between a light in a room and a cursor with a circle
// welded to it.
const EASE = 0.11;

function Tile({ product, at }) {
  const Motif = motifMap[product.motif];

  return (
    <span
      className="hero-tile"
      data-brand={product.accent}
      data-shape={at.shape}
      style={{ "--at-x": at.x, "--at-y": at.y, "--at-w": at.w }}
    >
      <span className="hero-tile-head">
        {Motif ? <Motif className="hero-tile-mark" /> : null}
        <span className="hero-tile-bar" style={{ "--w": "46%" }} />
      </span>
      <span className="hero-tile-body">
        {at.lines.map((n, index) => (
          <span
            className="hero-tile-line"
            key={index}
            style={{ "--w": `${n}%`, "--h": `${n}%` }}
          />
        ))}
      </span>
    </span>
  );
}

export default function HeroReveal({ products }) {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    // No pointer to track on a touch screen, and under reduced motion a light
    // that chases the hand is exactly the kind of movement being declined.
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches) return undefined;

    let x = 0;
    let y = 0;
    let targetX = 0;
    let targetY = 0;
    let frame = null;
    let away = true;

    // The hero moves under the reader on every scroll, so its box is measured
    // lazily: marked stale by scroll and resize, read at most once per pointer
    // event. Reading it on every event would force a layout flush per frame.
    let box = null;
    const restale = () => {
      box = null;
    };

    const tick = () => {
      x += (targetX - x) * EASE;
      y += (targetY - y) * EASE;
      root.style.setProperty("--rx", `${x.toFixed(1)}px`);
      root.style.setProperty("--ry", `${y.toFixed(1)}px`);

      // Once the pointer is gone and the light has caught up with where it
      // last was, there is nothing left to animate. An idle frame loop on the
      // first screen of every visit is not a decoration anyone agreed to pay
      // for.
      if (away && Math.abs(targetX - x) < 0.5 && Math.abs(targetY - y) < 0.5) {
        frame = null;
        return;
      }
      frame = requestAnimationFrame(tick);
    };

    const run = () => {
      if (frame === null) frame = requestAnimationFrame(tick);
    };

    const onMove = (event) => {
      if (box === null) box = root.getBoundingClientRect();
      const nextX = event.clientX - box.left;
      const nextY = event.clientY - box.top;
      const inside =
        nextX >= 0 && nextY >= 0 && nextX <= box.width && nextY <= box.height;

      if (!inside) {
        if (!away) {
          away = true;
          root.style.setProperty("--hero-lit", "0");
        }
        return;
      }

      if (away) {
        // Seed the eased position and its target together on the way in, or
        // the light flies across the hero from wherever it was left.
        away = false;
        x = targetX = nextX;
        y = targetY = nextY;
        root.style.setProperty("--hero-lit", "1");
      } else {
        targetX = nextX;
        targetY = nextY;
      }
      run();
    };

    // Only listens while the hero is on screen. Past the fold the pointer has
    // nothing to reveal, and the page has four more screens to render.
    let listening = false;
    const listen = (on) => {
      if (on === listening) return;
      listening = on;
      if (on) {
        window.addEventListener("pointermove", onMove, { passive: true });
        window.addEventListener("scroll", restale, { passive: true });
        window.addEventListener("resize", restale, { passive: true });
        return;
      }
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", restale);
      window.removeEventListener("resize", restale);
      away = true;
      root.style.setProperty("--hero-lit", "0");
    };

    const observer = new IntersectionObserver(
      ([entry]) => listen(entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(root);

    return () => {
      observer.disconnect();
      listen(false);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  const field = (layer) =>
    products.map((product, index) => (
      <Tile
        at={tiles[index % tiles.length]}
        key={`${layer}-${product.slug}`}
        product={product}
      />
    ));

  return (
    <div className="hero-reveal" ref={rootRef} aria-hidden="true">
      <div className="hero-reveal-layer">{field("base")}</div>
      <div className="hero-reveal-layer" data-lit="">
        {field("lit")}
      </div>
    </div>
  );
}
