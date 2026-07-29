"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * The name inside the copyright line, resolving into a hash-like digest.
 *
 * Renders the visual only — the footer pairs this with an `sr-only`
 * "Neurasense" so the notice still reads correctly to assistive tech, which
 * would otherwise be handed a string of scrambling glyphs.
 */

const NAME = "Neurasense";
/**
 * Uneven leet substitution, so it reads as a digest rather than a tidy cipher.
 * Same length as NAME, which keeps the morph in place instead of growing the
 * line and reflowing the footer mid-animation.
 */
const DIGEST = "n3ur45ens3";
const GLYPHS = "0123456789abcdef";
const FRAME_MS = 45;

const randomGlyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

export default function HashMark() {
  // Server and first client render both show the plain name, so hydration
  // matches; the scramble only ever starts from inside an effect.
  const [text, setText] = useState(NAME);
  const hostRef = useRef(null);
  const timerRef = useRef(null);
  const runningRef = useRef(false);

  const stop = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = null;
    runningRef.current = false;
  }, []);

  const run = useCallback(() => {
    if (runningRef.current) return;
    runningRef.current = true;

    // Each slot scrambles for its own window, so the digest resolves roughly
    // left to right instead of snapping into place all at once.
    const slots = Array.from({ length: DIGEST.length }, (_, i) => ({
      from: NAME[i],
      to: DIGEST[i],
      start: Math.round(i * 1.6 + Math.random() * 5),
      end: Math.round(i * 1.6 + 12 + Math.random() * 9),
    }));

    let frame = 0;
    const tick = () => {
      let output = "";
      let settled = 0;

      for (const slot of slots) {
        if (frame >= slot.end) {
          output += slot.to;
          settled += 1;
        } else if (frame >= slot.start) {
          output += randomGlyph();
        } else {
          output += slot.from;
        }
      }

      setText(output);

      if (settled === slots.length) {
        runningRef.current = false;
        return;
      }

      frame += 1;
      timerRef.current = setTimeout(tick, FRAME_MS);
    };

    tick();
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;

    // A JS interval ignores the global reduced-motion CSS, so honour it here:
    // show the resolved digest and never animate.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) {
      setText(DIGEST);
      return undefined;
    }

    // The footer is below the fold — without this the animation would play
    // out entirely before anyone scrolled down to it.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        run();
      },
      { threshold: 0.6 },
    );

    observer.observe(host);

    return () => {
      observer.disconnect();
      stop();
    };
  }, [run, stop]);

  return (
    <span
      aria-hidden="true"
      className="font-mono tracking-[0.12em]"
      onMouseEnter={run}
      ref={hostRef}
    >
      {text}
    </span>
  );
}
