"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ContactButton } from "./SiteChrome";
import { ActivityIcon, ArrowIcon, CheckIcon } from "./Icons";
import ProductName from "./ProductName";
import {
  AesGraphic,
  LipdGraphic,
  NsqrGraphic,
  PresenceGraphic,
  VaultGraphic,
} from "./ProductBento";
import { getProduct, hero } from "../data/site";
import styles from "./ProductSequence.module.css";

const SLUGS = ["nsqr", "vault", "presence", "lipd-hub", "aes"];
const PRODUCTS = SLUGS.map((slug) => getProduct(slug));

/** The same per-product graphics the `/products` catalogue cards use — kept
 *  as one source rather than redrawn, so a card reads identically wherever
 *  it appears. */
const GRAPHICS = {
  nsqr: NsqrGraphic,
  vault: VaultGraphic,
  presence: PresenceGraphic,
  "lipd-hub": LipdGraphic,
  aes: AesGraphic,
};

const LAST = PRODUCTS.length - 1;

/** Where a scroll progress (0–1) sits on the 0…4 card track, as a float.
 *  The `- 0.5` keeps `Math.round` of this identical to the discrete
 *  `floor(progress * 5.2)` this replaced, so the copy still swaps at the
 *  scroll positions the section was tuned around — only the cards
 *  themselves became continuous. */
const trackAt = (progress) =>
  Math.max(0, Math.min(LAST, progress * (PRODUCTS.length + 0.2) - 0.5));

/** Where card `i` sits when the track is at `pos` — the same two values the
 *  stylesheet reads, just no longer rounded to whole cards. */
const placeAt = (i, pos) => ({
  offset: Math.max(-2, Math.min(2, i - pos)),
  dist: Math.min(2, Math.abs(i - pos)),
});

/**
 * The five products beside coLab, carried through one sticky stage instead
 * of five separate ones. Scrolling drives a floating-point position along
 * the card track, written straight to each board's custom properties from
 * a rAF loop, so the sweep follows the wheel rather than snapping between
 * five fixed states and playing a canned transition to catch up. The loop
 * eases toward the scroll's target position rather than tracking it
 * exactly, which is what carries the motion through a coarse trackpad
 * flick or a jumpy mouse wheel. `activeIndex` stays discrete because the
 * copy, the CTA and the hit target have nothing to interpolate. Each card
 * is the exact
 * `/products` catalogue card — same brand tag, status chip, graphic and
 * key-points list — so a product looks identical whichever page shows it.
 */
export default function ProductSequence() {
  const scrollRef = useRef(null);
  const boardsRef = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);

  useEffect(() => {
    const targetRef = { current: 0 };
    const shownRef = { current: 0 };
    let frame = 0;

    /* Honoured here rather than in the stylesheet: with the sweep driven
       from script, "reduce" means stop easing and land on the card, which
       is a JS decision now — the CSS transition it used to override is
       gone. */
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");

    const paint = (pos) => {
      for (let i = 0; i < PRODUCTS.length; i += 1) {
        const el = boardsRef.current[i];
        if (!el) continue;
        const { offset, dist } = placeAt(i, pos);
        el.style.setProperty("--offset", offset.toFixed(4));
        el.style.setProperty("--dist", dist.toFixed(4));
      }
    };

    const tick = () => {
      const target = targetRef.current;
      const gap = target - shownRef.current;

      /* Close enough that another frame would move it less than a pixel —
         land exactly on the target so the cards settle instead of easing
         forever by ever-smaller amounts. */
      if (Math.abs(gap) < 0.0005) {
        shownRef.current = target;
        paint(target);
        frame = 0;
        return;
      }

      shownRef.current += gap * 0.18;
      paint(shownRef.current);
      frame = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      const section = scrollRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const progress = Math.max(
        0,
        Math.min(1, -rect.top / (section.offsetHeight - window.innerHeight))
      );

      const pos = trackAt(progress);
      targetRef.current = pos;

      const next = Math.round(pos);
      if (next !== activeIndexRef.current) {
        activeIndexRef.current = next;
        setActiveIndex(next);
      }

      if (calm.matches) {
        shownRef.current = pos;
        paint(pos);
        return;
      }
      if (!frame) frame = requestAnimationFrame(tick);
    };

    onScroll();
    /* First paint lands on the real scroll position rather than easing up
       to it from card 0 — a reload partway down the section should look
       settled, not mid-animation. */
    shownRef.current = targetRef.current;
    paint(shownRef.current);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const active = PRODUCTS[activeIndex];

  return (
    <section aria-labelledby="sequence-title" className={styles.scroll} ref={scrollRef}>
      <div className={styles.stage}>
        <span className={styles.kicker}>Also in the system</span>

        <div className={styles.copy}>
          <h2 id="sequence-title">
            Five more shapes.
            <br />
            <span>One shared standard.</span>
          </h2>
          <p>{active.description}</p>
          {active.detail ? (
            <Link className={styles.link} href={active.detail}>
              Explore {active.name}
              <span aria-hidden="true">→</span>
            </Link>
          ) : (
            <ContactButton className={styles.link} intent="access" subject={active.name}>
              Request access
              <span aria-hidden="true">→</span>
            </ContactButton>
          )}
        </div>

        <div aria-live="polite" className={styles.carousel}>
          {PRODUCTS.map((product, i) => {
            /* Seeded at track position 0 and deliberately not recomputed from
               `activeIndex`: the rAF loop owns these two properties once
               mounted, and a value that changed between renders would have
               React overwrite mid-sweep and jerk the card back. This is only
               what the markup ships with before script runs. */
            const seed = placeAt(i, 0);
            const isActive = i === activeIndex;
            const Graphic = GRAPHICS[product.slug];
            return (
              <article
                aria-hidden={!isActive}
                className={`card card-hover !p-0 ${styles.board} ${isActive ? styles.isActive : ""}`}
                data-brand={product.accent}
                key={product.slug}
                ref={(el) => {
                  boardsRef.current[i] = el;
                }}
                style={{ "--offset": seed.offset, "--dist": seed.dist }}
              >
                <div className="flex items-start justify-between gap-4 p-6 pb-0">
                  <h3 className="brand-tag">
                    <ProductName product={product} />
                  </h3>
                  <span className={`chip ${product.status === "live" ? "chip-dot" : "chip-neutral"}`}>
                    {product.status === "live" ? "Live" : "In development"}
                  </span>
                </div>

                {Graphic && (
                  <div
                    aria-hidden="true"
                    className="relative mt-4 h-24 overflow-hidden border-y min-[761px]:mt-5 min-[761px]:h-[160px]"
                    style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
                  >
                    <div className="absolute inset-x-0 bottom-0">
                      <Graphic />
                    </div>
                    <div className="bento-fade pointer-events-none absolute inset-x-0 bottom-0 h-16" />
                  </div>
                )}

                {product.highlights && (
                  <div className="px-6 pt-5">
                    <p
                      className="text-[0.7rem] font-semibold uppercase tracking-[0.08em]"
                      style={{ color: "var(--brand-text)" }}
                    >
                      Key Features
                    </p>
                    <ul className="check-list">
                      {product.highlights.map((highlight) => (
                        <li key={highlight}>
                          <CheckIcon className="h-4 w-4" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 p-6 pt-1">
                  {product.detail ? (
                    <Link className="link-arrow" href={product.detail}>
                      Explore {product.name}
                      <ArrowIcon />
                    </Link>
                  ) : (
                    <ContactButton className="link-arrow" subject={product.name} intent="access">
                      Request access
                      <ArrowIcon />
                    </ContactButton>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        <Link className={`pill ${styles.more}`} href="/products">
          <span className="pill-icon-ecg">
            <ActivityIcon className="h-4 w-4" />
          </span>
          {hero.pill.text}
          <ArrowIcon className="h-3.5 w-3.5" />
        </Link>
      </div>
    </section>
  );
}
