"use client";

import { useEffect } from "react";

/**
 * Turns the leading `.screen` sections into discrete pages: one scroll
 * gesture — however small — moves exactly one screen, the way a click would.
 *
 * CSS scroll-snap cannot do this on its own. Snap nudges the scroll toward a
 * target once the reader has already travelled most of the way; it has no
 * notion of a gesture, so a short flick leaves you part-way and a long one
 * sails past. Committing on the first movement means taking the wheel event.
 *
 * Scoped as tightly as the effect allows, because hijacking the scroll is
 * hostile when it overreaches:
 *   - only above `.screen` territory. Past the last screen the page scrolls
 *     normally, and the lower sections are far too tall to page through.
 *   - only on pointer-sized viewports. Touch keeps its native scrolling.
 *   - never under prefers-reduced-motion.
 *   - never while the reader is typing.
 *
 * It is an enhancement, not a requirement: the class it puts on <html> is what
 * switches off the CSS snap in globals.css, so if this never runs the snap
 * still holds the screens together on its own.
 */
export default function ScreenPager() {
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    let stops = [];
    let locked = false;
    let timer;

    const offsetOf = (el) =>
      Math.round(el.getBoundingClientRect().top + window.scrollY);

    /* The stops are the top of each screen, plus the point just past the last
       one where ordinary scrolling begins. Measured rather than assumed, so a
       resize or a font swap cannot leave them stale. */
    const measure = () => {
      const screens = Array.from(document.querySelectorAll(".screen"));
      if (screens.length < 2) {
        stops = [];
        return;
      }
      stops = screens.map(offsetOf);
      const last = screens[screens.length - 1];
      stops.push(offsetOf(last) + last.offsetHeight);
    };

    const enabled = () =>
      desktop.matches && !reduced.matches && stops.length > 1;

    const inRange = () => window.scrollY <= stops[stops.length - 1] + 2;

    const nearest = () => {
      const y = window.scrollY;
      let best = 0;
      for (let i = 1; i < stops.length; i += 1) {
        if (Math.abs(stops[i] - y) < Math.abs(stops[best] - y)) best = i;
      }
      return best;
    };

    /* One gesture, one screen. A trackpad emits a long tail of events after
       the fingers lift, and a mouse wheel emits one per notch; without a lock
       either would page several screens at once. The lock is released a beat
       after the scroll lands, so the next deliberate gesture is the next
       move. */
    const goTo = (index) => {
      locked = true;
      window.scrollTo({ top: stops[index], behavior: "smooth" });
      clearTimeout(timer);
      timer = setTimeout(() => {
        locked = false;
      }, 700);
    };

    /* The stop this gesture would land on, or null when there is none — at
       either end of the run there is nothing to page to and the gesture must be
       left alone, or the page would sit stuck against the boundary with the
       native scroll cancelled and nowhere to go. */
    const targetFor = (direction) => {
      const next = nearest() + direction;
      if (next < 0 || next >= stops.length) return null;
      return next;
    };

    const onWheel = (event) => {
      if (!enabled() || !inRange()) return;
      if (event.ctrlKey) return; // pinch-to-zoom, not a scroll
      const direction = Math.sign(event.deltaY);
      if (!direction) return;
      // Resolve the target before taking the event: no target means this
      // gesture leaves the screens, and it has to reach the native scroll.
      const next = targetFor(direction);
      if (next === null) return;
      if (locked) {
        // Swallow the tail of the gesture so it cannot queue up another move.
        event.preventDefault();
        return;
      }
      event.preventDefault();
      goTo(next);
    };

    const KEYS = {
      ArrowDown: 1,
      PageDown: 1,
      ArrowUp: -1,
      PageUp: -1,
    };

    const onKeyDown = (event) => {
      if (!enabled() || !inRange() || locked) return;
      const direction = KEYS[event.key];
      if (!direction) return;
      const el = event.target;
      if (el?.isContentEditable) return;
      const tag = el?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      const next = targetFor(direction);
      if (next === null) return;
      event.preventDefault();
      goTo(next);
    };

    measure();
    document.documentElement.classList.add("screens-paged");

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", measure);
    // Fonts and images land after mount and move the screens under the stops;
    // a stale last stop is what would let the pager keep taking wheel events
    // below the screens.
    window.addEventListener("load", measure);
    const observer = new ResizeObserver(measure);
    observer.observe(document.body);

    return () => {
      document.documentElement.classList.remove("screens-paged");
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", measure);
      window.removeEventListener("load", measure);
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return null;
}
