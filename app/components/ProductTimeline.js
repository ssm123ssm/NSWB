"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowIcon, ExternalIcon, motifMap } from "./Icons";
import { useContact } from "./SiteChrome";

/**
 * The product line as a vertical timeline: one spine down the middle with
 * cards branching off alternate sides. The spine fills as you scroll and each
 * branch rises in when it reaches the viewport.
 *
 * Reveal styling is gated behind data-reveal="on", which is only set once this
 * mounts — without JS every row stays visible.
 */
export default function ProductTimeline({ products }) {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const rows = Array.from(root.querySelectorAll("[data-reveal-row]"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    root.dataset.reveal = "on";

    let observer;
    if (reduced) {
      rows.forEach((row) => row.classList.add("is-in"));
    } else {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          });
        },
        { rootMargin: "0px 0px -12% 0px", threshold: 0.15 }
      );
      rows.forEach((row) => observer.observe(row));
    }

    // Spine fill. Measured against a line ~55% down the viewport so the fill
    // lands on a card roughly as that card is being read.
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = root.getBoundingClientRect();
      const mark = window.innerHeight * 0.55;
      const progress = rect.height
        ? Math.min(1, Math.max(0, (mark - rect.top) / rect.height))
        : 0;
      root.style.setProperty("--tl-progress", progress.toFixed(4));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      observer?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const rows = [];
  let status = null;
  let position = 0;

  products.forEach((product) => {
    if (product.status !== status) {
      status = product.status;
      rows.push({
        kind: "marker",
        key: `marker-${status}`,
        label: status === "live" ? "Available now" : "In development",
      });
    }
    rows.push({
      kind: "product",
      key: product.slug,
      product,
      side: position % 2 === 0 ? "left" : "right",
      index: position + 1,
    });
    position += 1;
  });

  return (
    <div className="timeline" ref={rootRef}>
      <div className="timeline-rail" aria-hidden="true" />

      {rows.map((row) =>
        row.kind === "marker" ? (
          <div className="timeline-marker" key={row.key}>
            <h2 className="timeline-chip">{row.label}</h2>
          </div>
        ) : (
          <TimelineRow
            index={row.index}
            key={row.key}
            product={row.product}
            side={row.side}
          />
        )
      )}
    </div>
  );
}

function TimelineRow({ product, side, index }) {
  const { open } = useContact();
  const isLive = product.status === "live";
  const Motif = motifMap[product.motif];

  return (
    <div
      className="timeline-row"
      data-brand={product.accent}
      data-reveal-row=""
      data-side={side}
      data-status={product.status}
    >
      <span className="timeline-arm" aria-hidden="true" />
      <span className="timeline-node" aria-hidden="true" />

      <article className="timeline-card card card-hover card-accent p-6 sm:p-7">
        {Motif && <Motif className="timeline-motif" />}

        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="timeline-index">
              {String(index).padStart(2, "0")}
            </span>
            <h3 className="mt-2 text-2xl">{product.name}</h3>
          </div>
          <span className={`badge shrink-0 ${isLive ? "" : "badge-outline"}`}>
            {isLive ? (
              <>
                <span className="dot" aria-hidden="true" />
                Live
              </>
            ) : (
              "In development"
            )}
          </span>
        </div>

        <p className="mt-3 text-[0.95rem] font-medium">{product.tagline}</p>
        <p className="mt-1 text-sm text-faint">{product.discipline}</p>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">
          {product.description}
        </p>

        <ul className="mt-5 flex flex-wrap gap-1.5">
          {product.highlights.map((highlight) => (
            <li
              key={highlight}
              className="rounded-md border border-[color:var(--border)] px-2 py-1 text-[0.7rem] text-faint"
            >
              {highlight}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-6">
          {product.detail && (
            <Link className="link-arrow" href={product.detail}>
              Explore {product.name}
              <ArrowIcon />
            </Link>
          )}
          {product.app && (
            <a
              className={
                product.detail
                  ? "link-muted inline-flex items-center gap-1.5"
                  : "link-arrow"
              }
              href={product.app}
              target="_blank"
              rel="noreferrer"
            >
              {product.detail ? "Open app" : `Visit ${product.name}`}
              <ExternalIcon className="h-3.5 w-3.5" />
            </a>
          )}
          <button
            className={isLive ? "link-muted" : "link-arrow"}
            type="button"
            onClick={() => open(product.name)}
          >
            {isLive ? "Talk to us" : "Request access"}
            {!isLive && <ArrowIcon />}
          </button>
        </div>
      </article>
    </div>
  );
}
