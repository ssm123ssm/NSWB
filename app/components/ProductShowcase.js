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
 * pattern ScreenPager was removed for, and the arrows and dots below are what
 * stand in for it.
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

    track.scrollTo({
      left,
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
        {items.map((item) => (
          <ShowcasePanel key={item.product.slug} {...item} />
        ))}
      </div>

      <div className="showcase-controls">
        <button
          aria-label="Previous product"
          className="showcase-arrow"
          disabled={index === 0}
          onClick={() => goTo(index - 1)}
          type="button"
        >
          <ArrowIcon className="h-4 w-4 rotate-180" />
        </button>

        <ul className="showcase-dots">
          {items.map((item, i) => (
            <li key={item.product.slug}>
              <button
                aria-current={i === index}
                aria-label={item.product.name}
                className="showcase-dot"
                data-on={i === index ? "" : undefined}
                onClick={() => goTo(i)}
                type="button"
              />
            </li>
          ))}
        </ul>

        <button
          aria-label="Next product"
          className="showcase-arrow"
          disabled={index === last}
          onClick={() => goTo(index + 1)}
          type="button"
        >
          <ArrowIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function ShowcasePanel({ product, capabilities }) {
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
