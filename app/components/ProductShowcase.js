"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowIcon, ExternalIcon } from "./Icons";
import ProductName from "./ProductName";
import ShowcaseShot from "./ShowcaseShots";

/**
 * The product showcase: one panel per product, swept horizontally, with the
 * product's capabilities down the left and a drawn app screen on the right.
 * Selecting a capability opens its description and brings the matching region
 * of the screen forward.
 *
 * The sweep is the browser's own horizontal scroll with CSS scroll-snap — not a
 * pinned section panning cards as the page scrolls down. That second pattern is
 * the one ScreenPager was removed for: it takes the reader's vertical gesture
 * and spends it on something they did not ask for. Here the wheel, the trackpad
 * and a finger all do what they already did, and the vertical scroll is never
 * touched. Everything below is decoration on top of that — remove the whole
 * component and a plain overflow-x track still works.
 *
 * Which is also the no-JS story: the track scrolls and snaps on CSS alone, the
 * first capability of each panel is already open because that is the state
 * rendered on the server, and only the arrows and dots are inert.
 *
 * A client island rather than a page-wide client component, the same way
 * `ProductTimeline` is — the home page stays a server component.
 */
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

  return (
    <article className="showcase-panel" data-brand={product.accent}>
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
            holding the full height beside them. It matters more here than it
            did stacked — four panels of different internal rhythm read as a
            stutter when they pass one after another. */}
        <ul className="showcase-tabs">
          {capabilities.map((capability) => {
            const isOpen = capability.id === active;
            const bodyId = `${product.slug}-${capability.id}`;

            return (
              <li key={capability.id} data-on={isOpen ? "" : undefined}>
                <button
                  aria-controls={bodyId}
                  aria-expanded={isOpen}
                  className="showcase-tab"
                  onClick={() => setActive(capability.id)}
                  type="button"
                >
                  {capability.title}
                </button>
                <p className="showcase-tab-body" hidden={!isOpen} id={bodyId}>
                  {capability.description}
                </p>
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
