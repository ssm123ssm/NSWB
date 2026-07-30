"use client";

import { useEffect, useState } from "react";
import { products } from "../data/site";
import ProductName from "./ProductName";
import styles from "./NsqrPlate.module.css";

/**
 * @typedef {Object} PlateSlide
 * @property {string} eyebrow Kicker above the headline.
 * @property {string} title The headline itself.
 * @property {string} sub One supporting sentence.
 */

/**
 * The four messages, in rotation order. Edit the copy here — the markup below
 * reads this array and nothing else, and each slide is paired by position with
 * the glyph of the same index in GLYPHS.
 *
 * @type {PlateSlide[]}
 */
const SLIDES = [
  {
    eyebrow: "dynamic",
    title: "Change the destination, not the print run.",
    sub: "Re-point a QR code anytime — even after it's printed on the menu, the poster or the packaging.",
  },
  {
    eyebrow: "analytics",
    title: "See every scan as it happens.",
    sub: "When, where and on which device — daily trends, countries and browsers, in one clean view.",
  },
  {
    eyebrow: "secure",
    title: "Lock it behind a passcode.",
    sub: "Menus, documents, members-only pages. A wrong passcode emails you instantly, with location and device.",
  },
  {
    eyebrow: "lost & found",
    title: "Get your things back.",
    sub: "Turn a QR into a recovery tag for luggage, pets or gear. Finders reach you privately; you're alerted with their location.",
  },
];

/** How long each slide holds, and how long the progress bar takes to fill. */
const HOLD = 5200;

const nsqr = products.find((product) => product.slug === "nsqr");

const cls = (...names) => names.map((name) => styles[name]).join(" ");

/**
 * NSQR's marketing plate: four messages on a 5200ms rotation, each with its own
 * animated glyph in the stage on the right.
 *
 * Rotation pauses while the plate is hovered or holds focus, and the arrow keys
 * step through slides. Under prefers-reduced-motion it never auto-advances — the
 * dots and arrow keys still work, so no message is unreachable.
 *
 * `cycle` exists to restart the hold: it is bumped on every deliberate move so
 * that re-selecting the current slide, or leaving hover, refills the progress
 * bar from zero rather than resuming mid-sweep.
 */
export default function NsqrPlate({ className = "" }) {
  const [index, setIndex] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const paused = hovered || focused;

  useEffect(() => {
    if (paused || reduced) return;
    const id = setTimeout(
      () => setIndex((current) => (current + 1) % SLIDES.length),
      HOLD
    );
    return () => clearTimeout(id);
  }, [index, cycle, paused, reduced]);

  const go = (next) => {
    setIndex((next + SLIDES.length) % SLIDES.length);
    setCycle((current) => current + 1);
  };

  const onKeyDown = (event) => {
    if (event.key === "ArrowRight") go(index + 1);
    if (event.key === "ArrowLeft") go(index - 1);
  };

  return (
    <section
      aria-label="NSQR — dynamic QR codes"
      aria-roledescription="carousel"
      className={`${styles.plate} ${paused ? "" : styles.isRunning} ${className}`.trim()}
      data-brand={nsqr.accent}
      style={{ "--p-dur": `${HOLD}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onKeyDown={onKeyDown}
    >
      <div className={styles.left}>
        <div className={styles.brand}>
          <span className={styles.mark}>
            <ProductName product={nsqr} />
          </span>
          <span className={styles.by}>by neurasense</span>
        </div>

        <div className={styles.viewport}>
          <div
            className={styles.track}
            style={{ transform: `translateX(${-index * 100}%)` }}
          >
            {SLIDES.map((slide, n) => (
              <article
                aria-label={`${n + 1} of ${SLIDES.length}`}
                aria-roledescription="slide"
                className={`${styles.slide} ${n === index ? styles.isActive : ""}`}
                key={slide.title}
                role="group"
              >
                <p className={styles.eyebrow}>{slide.eyebrow}</p>
                <h2>{slide.title}</h2>
                <p className={styles.sub}>{slide.sub}</p>
              </article>
            ))}
          </div>
        </div>

        <div className={styles.nav}>
          <div aria-label="Choose slide" className={styles.dots} role="tablist">
            {SLIDES.map((slide, n) => (
              <button
                aria-label={`Slide ${n + 1}`}
                aria-selected={n === index ? "true" : "false"}
                key={slide.title}
                onClick={() => go(n)}
                role="tab"
                type="button"
              />
            ))}
          </div>
          {/* Keyed so the fill animation replays from zero on every new hold
              rather than continuing from wherever the last sweep stopped. */}
          <div
            aria-hidden="true"
            className={styles.timer}
            key={`${index}-${cycle}`}
          />
        </div>
      </div>

      <div className={styles.right}>
        <div aria-hidden="true" className={styles.stage}>
          {GLYPHS.map((Glyph, n) => (
            <Glyph key={n} on={n === index} />
          ))}
        </div>

        <a
          className={styles.cta}
          href={nsqr.app}
          target="_blank"
          rel="noreferrer"
        >
          Start free &rarr;
        </a>
        <p className={styles.note}>no card required</p>
      </div>
    </section>
  );
}

/**
 * One glyph per slide. Each mounts with its animations parked and plays them
 * from the first frame whenever `on` turns true, so the stage re-runs its
 * sequence every time the slide comes back around.
 */
function RepointGlyph({ on }) {
  return (
    <div className={`${cls("g", "g1")} ${on ? styles.isOn : ""}`}>
      <svg viewBox="0 0 64 64">
        <rect className={cls("st", "mod")} x="8" y="8" width="16" height="16" rx="3" />
        <rect className={cls("st", "mod")} x="40" y="8" width="16" height="16" rx="3" />
        <rect className={cls("st", "mod")} x="8" y="40" width="16" height="16" rx="3" />
        <rect className={cls("fa", "mod")} x="42" y="42" width="5" height="5" rx="1" />
        <rect className={cls("fa", "mod")} x="51" y="42" width="5" height="5" rx="1" />
        <rect className={cls("fa", "mod")} x="42" y="51" width="5" height="5" rx="1" />
        <path className={cls("ac", "cyc")} d="M46 24a14 14 0 1 0 4 10" />
        <path className={styles.ac} d="M50 24v10h-9" />
      </svg>
    </div>
  );
}

function ScansGlyph({ on }) {
  return (
    <div className={`${cls("g", "g2")} ${on ? styles.isOn : ""}`}>
      <svg viewBox="0 0 64 64">
        <path className={styles.st} d="M10 52h44" />
        <rect className={cls("st", "bar")} x="13" y="34" width="8" height="18" rx="2" />
        <rect className={cls("st", "bar")} x="26" y="26" width="8" height="26" rx="2" />
        <rect className={cls("st", "bar")} x="39" y="38" width="8" height="14" rx="2" />
        <rect className={cls("fa", "bar")} x="52" y="14" width="8" height="38" rx="2" />
        <circle className={cls("fa", "ping")} cx="56" cy="14" r="3.5" />
      </svg>
    </div>
  );
}

function PasscodeGlyph({ on }) {
  return (
    <div className={`${cls("g", "g3")} ${on ? styles.isOn : ""}`}>
      <svg viewBox="0 0 64 64">
        <path className={cls("st", "shackle")} d="M21 30V22a11 11 0 0 1 22 0v8" />
        <rect className={styles.st} x="14" y="30" width="36" height="26" rx="6" />
        <circle className={cls("ac", "halo")} cx="32" cy="43" r="9" />
        <circle className={cls("fa", "keyhole")} cx="32" cy="41" r="3" />
        <path className={cls("ac", "keyhole")} d="M32 44v5" />
      </svg>
    </div>
  );
}

function RecoveryTagGlyph({ on }) {
  return (
    <div className={`${cls("g", "g4")} ${on ? styles.isOn : ""}`}>
      <svg viewBox="0 0 64 64">
        <path
          className={styles.st}
          d="M31 8H14a6 6 0 0 0-6 6v17a6 6 0 0 0 1.8 4.3l17 17a5 5 0 0 0 7 0l15-15a5 5 0 0 0 0-7l-17-17A6 6 0 0 0 31 8Z"
        />
        <circle className={styles.st} cx="20" cy="20" r="3.5" />
        <g className={styles.pin}>
          <path className={styles.ac} d="M44 26a7 7 0 1 0-14 0c0 5 7 12 7 12s7-7 7-12Z" />
          <circle className={styles.fa} cx="37" cy="26" r="2.4" />
        </g>
        <circle className={cls("ac", "ripple")} cx="37" cy="26" r="8" />
      </svg>
    </div>
  );
}

/** Paired by position with SLIDES. */
const GLYPHS = [RepointGlyph, ScansGlyph, PasscodeGlyph, RecoveryTagGlyph];
