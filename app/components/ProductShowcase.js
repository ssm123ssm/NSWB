"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowIcon, ExternalIcon } from "./Icons";
import ProductName from "./ProductName";
import ShowcaseShot from "./ShowcaseShots";

/**
 * The product showcase: one panel per product, swept horizontally, with the
 * product's capabilities down the left and a drawn app screen on the right.
 *
 * Three of the four behaviours of the reference section this was modelled on
 * (cake.com, "Meet our tools") are here:
 *
 *   1. the capability list advances every 8 seconds;
 *   2. clicking a capability stops that panel's rotation for good;
 *   3. the rule marking the open capability travels and resizes rather than
 *      blinking from one item to the next.
 *
 * The fourth is not, deliberately. The reference pins the section above 1300px
 * and converts vertical scroll into horizontal movement; here the sweep is the
 * browser's own horizontal scroll, so the wheel, the trackpad and a finger all
 * do what they already did and the vertical gesture is never taken. That is the
 * pattern ScreenPager was removed for, and the edge arrows are what stand in
 * for it.
 *
 * Where the navigation lives is the part that was got wrong first. It was a row
 * of arrows and dots centred *under* the track, which is the one place a reader
 * looking at a card does not look: the card is a self-contained thing, the row
 * below it reads as belonging to the section, and nothing inside the panel ever
 * said "there are three more of these". So it moved, in two halves:
 *
 *   - the *where am I* half is now inside the panel, at the head of the copy
 *     column — four dots and an `01 / 04` count, read before the product name.
 *     Each panel knows its own index, so this is static per panel and does not
 *     wait on the scroll position to be right;
 *   - the *there is more* half sits on the track's two edges, as a button that
 *     names the neighbouring product in its own mark and colour. It is absent
 *     rather than disabled at the ends, so the right edge going quiet on the
 *     last panel is itself the signal that the sweep is over.
 *
 * Under both, the panels are cut narrower than the track by `--peek` and snap
 * centred, so a sliver of the next card is always showing. That is the part
 * that does not depend on noticing a control at all.
 *
 * Everything is decoration over a track that already works: remove this
 * component's JS and a plain overflow-x scroller with snap points remains, with
 * each panel's first capability open — which is the server-rendered state.
 *
 * A client island rather than a page-wide client component, the same way
 * `ProductTimeline` is — the home page stays a server component.
 */

/**
 * How long a capability holds before the panel moves to the next one. Eight
 * seconds is the reference's own figure (`8e3`), and it is long for a reason:
 * the description runs to two lines and the screen beside it has to be read,
 * not glanced at.
 */
const HOLD_MS = 8000;

/** `4` reads as a stray number beside a row of dots; `04` reads as a count. */
const pad = (n) => String(n).padStart(2, "0");

export default function ProductShowcase({ items }) {
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0);

  /* Which panel is in view, read from the scroll rather than set by the
     arrows. The dots have to stay right when the reader swipes past three
     panels themselves, and a counter incremented by the buttons would only
     know about the journeys it made. */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const panels = Array.from(track.children);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIndex(panels.indexOf(entry.target));
        });
      },
      { root: track, threshold: 0.6 }
    );

    panels.forEach((panel) => observer.observe(panel));
    return () => observer.disconnect();
  }, []);

  const goTo = useCallback((target) => {
    const track = trackRef.current;
    const panel = track?.children[target];
    if (!panel) return;

    // Measured against the track's own box rather than read off offsetLeft,
    // which is relative to whichever ancestor happens to be positioned.
    const left =
      track.scrollLeft +
      panel.getBoundingClientRect().left -
      track.getBoundingClientRect().left;

    /* Centred, because the panels snap centred — they are narrower than the
       track by --peek so the next one is always showing at the edge. Scrolling
       to the panel's left edge would land a half-peek off the snap point and
       leave the browser to drag it back, which reads as the track overshooting
       every time an arrow is pressed. Clamped because the first and last panels
       have no room to centre in and stop against the ends instead. */
    const rest = track.clientWidth - panel.clientWidth;
    const max = track.scrollWidth - track.clientWidth;

    track.scrollTo({
      left: Math.max(0, Math.min(left - rest / 2, max)),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  }, []);

  const last = items.length - 1;

  return (
    <div className="showcase">
      {/* tabindex on the scroller: a scrollable region has to be reachable and
          operable from the keyboard, and the panels' own links only scroll it
          as far as the next focusable thing. With this it takes focus and the
          arrow keys move it directly. */}
      <div
        aria-label="Products"
        className="showcase-track"
        ref={trackRef}
        role="group"
        tabIndex={0}
      >
        {items.map((item, i) => (
          <ShowcasePanel
            key={item.product.slug}
            {...item}
            current={index}
            index={i}
            items={items}
            onGo={goTo}
          />
        ))}
      </div>

      {/* One per end, and only where there is somewhere to go. A disabled
          arrow at the ends was the old row's compromise — it had to hold its
          place or the dots beside it would shift — and these have no row to
          keep, so the honest thing is to leave. */}
      <ShowcaseEdge
        onGo={goTo}
        product={index > 0 ? items[index - 1].product : null}
        side="prev"
        target={index - 1}
      />
      <ShowcaseEdge
        onGo={goTo}
        product={index < last ? items[index + 1].product : null}
        side="next"
        target={index + 1}
      />
    </div>
  );
}

/**
 * The hint on the track's edge: an arrow with the neighbouring product's own
 * mark under it, in that product's colour. Naming the destination is the whole
 * point — an unlabelled arrow says a fourth panel exists, and this says the
 * fourth panel is coLab, which is the difference between a control and a
 * reason to press it.
 *
 * The label is hidden from assistive tech and the name is spoken through the
 * button's own label instead, so the control is announced once rather than as a
 * button followed by a loose word.
 */
function ShowcaseEdge({ onGo, product, side, target }) {
  if (!product) return null;

  return (
    <div
      className="showcase-edge"
      data-brand={product.accent}
      data-side={side}
    >
      <button
        aria-label={`${side === "prev" ? "Previous" : "Next"} product: ${
          product.name
        }`}
        className="showcase-edge-button"
        onClick={() => onGo(target)}
        type="button"
      >
        <ArrowIcon className={`h-4 w-4 ${side === "prev" ? "rotate-180" : ""}`} />
      </button>
      <span aria-hidden="true" className="showcase-edge-name">
        <ProductName product={product} />
      </span>
    </div>
  );
}

function ShowcasePanel({ capabilities, current, index, items, onGo, product }) {
  const [active, setActive] = useState(capabilities[0].id);
  // Set once, by a click, and never unset. Picking a capability says the reader
  // wants that one, so the panel stops advancing on its own from then on — the
  // reference clears its interval on the same event.
  const [stopped, setStopped] = useState(false);
  const [seen, setSeen] = useState(false);
  const listRef = useRef(null);
  const panelRef = useRef(null);
  const [rule, setRule] = useState(null);

  // A panel three swipes away should not spend its rotation unwatched, and
  // arriving at one mid-cycle is worse than arriving at its first capability.
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setSeen(entry.isIntersecting),
      { threshold: 0.5 }
    );
    observer.observe(panel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (stopped || !seen) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = setInterval(() => {
      setActive((current) => {
        const at = capabilities.findIndex((c) => c.id === current);
        return capabilities[(at + 1) % capabilities.length].id;
      });
    }, HOLD_MS);
    return () => clearInterval(timer);
  }, [capabilities, seen, stopped]);

  /* The rule that marks the open capability travels rather than appearing on
     one item and vanishing from another. Its position has to be measured: the
     open item is taller than the closed ones because it carries its
     description, so there is no fixed step to move by. */
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const measure = () => {
      const open = list.querySelector("[data-on] .showcase-tab");
      if (!open) return;
      setRule({ top: open.offsetTop, height: open.offsetHeight });
    };

    measure();
    // The description opens over 0.3s and moves everything under it, so the
    // rule is placed again once that has settled.
    const settle = setTimeout(measure, 340);
    const observer = new ResizeObserver(measure);
    observer.observe(list);

    return () => {
      clearTimeout(settle);
      observer.disconnect();
    };
  }, [active]);

  return (
    <article
      className="showcase-panel"
      data-brand={product.accent}
      ref={panelRef}
    >
      <div className="showcase-copy">
        {/* The card's own pager, and the reason it is *in* the card: a reader
            who has stopped on one panel is looking at the panel, and four dots
            above the product's name say "one of four" at the moment the name is
            read. The same four dots under the section said it to nobody.

            Static per panel — this one is index 2 whatever the scroll is doing
            — so it is right before hydration and cannot flicker to the wrong
            mark while the observer catches up. */}
        {/* Only the panel in view offers its pager. Four panels each carrying
            four dots is sixteen tab stops for what is one control, and fifteen
            of them are on cards nobody is looking at — so the three panels off
            screen drop out of the tab order and out of the accessibility tree,
            and the row a reader can actually see behaves exactly as the single
            row under the section used to. */}
        <div aria-hidden={index !== current} className="showcase-pager">
          <ul className="showcase-dots">
            {items.map((entry, i) => (
              <li key={entry.product.slug}>
                <button
                  aria-current={i === index}
                  aria-label={entry.product.name}
                  className="showcase-dot"
                  data-on={i === index ? "" : undefined}
                  onClick={() => onGo(i)}
                  tabIndex={index === current ? undefined : -1}
                  type="button"
                />
              </li>
            ))}
          </ul>
          <span aria-hidden="true" className="showcase-count">
            {pad(index + 1)} / {pad(items.length)}
          </span>
        </div>

        <div>
          <h3 className="showcase-name">
            <ProductName product={product} />
          </h3>
          <p className="showcase-tagline">{product.tagline}</p>
        </div>

        {/* The capability list sits at the foot of the column rather than
            directly under the name, which is what gives every panel the same
            shape: mark at the top, capabilities against the base, the screen
            holding the full height beside them. */}
        <ul className="showcase-tabs" ref={listRef}>
          <span
            aria-hidden="true"
            className="showcase-rule"
            style={
              rule
                ? { transform: `translateY(${rule.top}px)`, height: rule.height }
                : { opacity: 0 }
            }
          />
          {capabilities.map((capability) => {
            const isOpen = capability.id === active;
            const bodyId = `${product.slug}-${capability.id}`;

            return (
              <li key={capability.id} data-on={isOpen ? "" : undefined}>
                <button
                  aria-controls={bodyId}
                  aria-expanded={isOpen}
                  className="showcase-tab"
                  onClick={() => {
                    setActive(capability.id);
                    setStopped(true);
                  }}
                  type="button"
                >
                  {capability.title}
                </button>
                {/* Collapsed rather than removed: a height has to animate, and
                    nothing animates out of `hidden`. The wrapper is the grid
                    row that closes to 0fr; the paragraph inside is clipped. */}
                <div className="showcase-tab-fold">
                  <p className="showcase-tab-body" id={bodyId}>
                    {capability.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>

        {/* One link out per panel. Products with a detail page send people
            there — the app link lives on that page, so the panel does not carry
            both and make the reader choose. Presence has no detail page, so its
            panel is the one that opens the app directly. */}
        <div className="showcase-link">
          {product.detail ? (
            <Link className="link-arrow" href={product.detail}>
              Explore <ProductName product={product} />
              <ArrowIcon />
            </Link>
          ) : (
            product.app && (
              <a
                className="link-arrow"
                href={product.app}
                rel="noreferrer"
                target="_blank"
              >
                Visit <ProductName product={product} />
                <ExternalIcon className="h-3.5 w-3.5" />
              </a>
            )
          )}
        </div>
      </div>

      {/* The stage renders the screen for whichever capability is open — the
          capture swaps whole rather than dimming the parts you are not reading,
          which is what lets each one have the full frame. */}
      <div className="showcase-stage">
        <ShowcaseShot capability={active} slug={product.slug} />
      </div>
    </article>
  );
}
