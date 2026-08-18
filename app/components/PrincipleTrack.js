"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowIcon, iconMap, principleMotifMap } from "./Icons";

/**
 * The principles as a sticky split: the heading holds still on the left while
 * the steps move past it on the right, one at a time, the one being read coming
 * forward.
 *
 * What it replaces was a three-column row of equal cells divided by hairlines —
 * a spec sheet, read as one grey block, sitting in a section whose height it
 * used about a quarter of. The height was the section's main problem and is now
 * the mechanism: the reader is held on each principle for a beat instead of
 * scanning three at once.
 *
 * Active state is gated behind data-track="on", which only this sets once
 * mounted. Without JS every step renders at full strength and the section
 * degrades to a plain stack — same content, no emphasis lost.
 */
export default function PrincipleTrack({ title, lead, principles }) {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const steps = Array.from(root.querySelectorAll("[data-track-step]"));
    const marks = Array.from(root.querySelectorAll("[data-track-mark]"));
    if (!steps.length) return;

    // The reel is a wide-viewport device — below this the stylesheet drops the
    // whole thing and the cards are a plain stack, every one of them on screen
    // and every one of them meant to be reachable. Same figure the media query
    // in globals.css uses.
    const wide = window.matchMedia("(min-width: 768px)");

    const setActive = (index) => {
      steps.forEach((step, n) => {
        const on = n === index;
        step.classList.toggle("is-on", on);
        // The cards off the window are still rendered and still partly
        // visible, so they cannot be hidden — but their link must not be
        // tabbable, or focus would scroll the clipped row sideways inside its
        // own window and leave the reel out of register with the scroll.
        // A DOM property rather than a JSX attribute: React 18 does not pass
        // `inert` through, and browsers without it simply keep the old
        // behaviour rather than breaking.
        step.inert = wide.matches && !on;
      });
      marks.forEach((mark, n) => mark.classList.toggle("is-on", n === index));
    };

    // Under reduced motion there is no dimming to undo, so every step stays
    // lit and nothing needs to watch the scroll.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      root.dataset.track = "static";
      steps.forEach((step) => {
        step.classList.add("is-on");
        step.inert = false;
      });
      marks.forEach((mark) => mark.classList.add("is-on"));
      return undefined;
    }

    root.dataset.track = "on";

    const scroll = root.querySelector("[data-track-scroll]");
    const stage = root.querySelector("[data-track-stage]");
    if (!scroll || !stage) return undefined;

    // The deck holds every card in one place, so there is nothing left for an
    // IntersectionObserver to observe — the cards no longer move past a line.
    // Which one is showing comes from how far through the scroll block the
    // stage has been held instead.
    //
    // Read off the two rects rather than from the sticky offset: while the
    // stage is pinned its top stays put as the block's top climbs away, so the
    // distance between them runs from 0 to exactly the pinned distance, and
    // the measurement never needs to know what `top` the CSS chose.
    let frame = 0;
    let current = -1;

    const update = () => {
      frame = 0;
      const block = scroll.getBoundingClientRect();
      const held = stage.getBoundingClientRect();
      const distance = block.height - held.height;
      const progress = distance > 0
        ? Math.min(1, Math.max(0, (held.top - block.top) / distance))
        : 0;

      // How far the row has to move for the last card to land in the window.
      // Measured off the cards rather than computed from a slot width and a
      // gap, so the script never has to agree with the stylesheet about either
      // — and read as a difference of two rects, which makes it immune to the
      // transform already sitting on the row: both edges carry it equally, so
      // it cancels.
      const first = steps[0].getBoundingClientRect();
      const last = steps[steps.length - 1].getBoundingClientRect();
      const travel = Math.max(0, last.right - first.left - stage.clientWidth);
      root.style.setProperty("--deck-shift", `${(progress * travel).toFixed(2)}px`);

      // Which card the rail should mark: the one nearest the window, not the
      // one whose share of the scroll we are inside. At progress 1 the last
      // card is fully landed, so the run is over steps - 1 gaps, not steps.
      const index = Math.round(progress * (steps.length - 1));
      if (index !== current) {
        current = index;
        setActive(index);
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    // A resize alone goes through update(), which only touches the cards when
    // the index moves. Crossing the breakpoint usually does not move it, and
    // the thing that changed is whether inert should be set at all — so drop
    // the cached index and let the next update rewrite the state from scratch.
    const onBreakpoint = () => {
      current = -1;
      onScroll();
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    wide.addEventListener("change", onBreakpoint);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      wide.removeEventListener("change", onBreakpoint);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [principles]);

  return (
    <div
      className="principle-track"
      ref={rootRef}
      style={{ "--deck-steps": principles.length }}
    >
      <div className="principle-aside">
        <h2 className="section-title">{title}</h2>
        <p className="lead mt-4">{lead}</p>

        {/* Duplicates the titles that follow, so it is decoration to a screen
            reader and hidden from one. Non-interactive for the same reason:
            a focusable control inside aria-hidden is a trap. */}
        <div className="principle-rail" aria-hidden="true">
          {principles.map((item) => (
            <div
              className="principle-rail-item"
              data-brand={item.accent}
              data-track-mark=""
              key={item.label}
            >
              <i />
              <span>{item.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* The scroll block gives the section its length; the stage is what gets
          held still inside it; the deck puts every card in one grid cell so
          they occupy the same place on screen and swap there.

          Cards that each own a slot have to travel through it, which is what
          made the second one look like it was being dragged up from under the
          first. Sharing one position removes the travel: the section still
          takes three screens of scroll, but only ever shows one card, and the
          change between them is a change of content rather than of position.

          A list, not an ordered one — these hold at the same time rather than
          following one another. */}
      <div className="principle-scroll" data-track-scroll="">
        <div className="principle-stage" data-track-stage="">
          <ul className="principle-deck">
            {principles.map((item) => {
              const Icon = iconMap[item.icon];
              const Mark = principleMotifMap[item.motif];

              return (
                <li
                  className="principle-step"
                  data-brand={item.accent}
                  data-track-step=""
                  key={item.label}
                >
                  <article className="principle-plate card card-accent p-8 sm:p-10">
                    <div className="principle-body">
                      {Icon && (
                        <span className="icon-tile" aria-hidden="true">
                          <Icon />
                        </span>
                      )}
                      <h3 className="principle-title mt-6">{item.title}</h3>
                      <p className="principle-copy mt-4 text-muted">
                        {item.description}
                      </p>

                      {/* Fine print, and the only interactive thing on the
                          stage. Off-stage cards are hidden outright in CSS
                          rather than merely faded, so this link cannot be
                          tabbed to while its card is not the one showing. */}
                      {item.note && (
                        <p className="principle-note mt-6">
                          <Link className="link-arrow" href={item.note.href}>
                            {item.note.text}
                            <ArrowIcon />
                          </Link>
                        </p>
                      )}
                    </div>

                    {/* After the copy, not before it: this is the second grid
                        column, and decoration should not sit ahead of the text
                        it decorates in reading order either. */}
                    {Mark && <Mark className="principle-motif" />}
                  </article>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
