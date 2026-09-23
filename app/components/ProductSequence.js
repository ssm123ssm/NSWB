"use client";

import { useState } from "react";
import Link from "next/link";
import { ContactButton } from "./SiteChrome";
import { ArrowIcon, CheckIcon } from "./Icons";
import ProductName from "./ProductName";
import {
  AesGraphic,
  LipdGraphic,
  NsqrGraphic,
  PresenceGraphic,
  VaultGraphic,
} from "./ProductBento";
import { getProduct } from "../data/site";
import styles from "./ProductSequence.module.css";

const SLUGS = ["nsqr", "vault", "presence", "lipd-hub", "aes"];
const PRODUCTS = SLUGS.map((slug) => getProduct(slug));

function CarouselChevron() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
      <path d="m9 5 7 7-7 7" />
    </svg>
  );
}

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

/**
 * The five products beside coLab, carried through one carousel instead of
 * five separate sections. Previous and next controls advance a discrete
 * `activeIndex`; each card slides with a CSS transition. Each card is the exact
 * `/products` catalogue card — same brand tag, status chip, graphic and
 * key-points list — so a product looks identical whichever page shows it.
 */
export default function ProductSequence() {
  const [activeIndex, setActiveIndex] = useState(0);

  const active = PRODUCTS[activeIndex];

  return (
    <section aria-labelledby="sequence-title" className={styles.scroll}>
      <div className={styles.stage}>
        <span className={styles.kicker}>Also in the system</span>

        <div className={styles.copy}>
          <h2 id="sequence-title">
            Five more shapes.
            <br />
            <span>One shared standard.</span>
          </h2>
          <p>{active.description}</p>
          <Link className={styles.link} href="/products">
            Visit our Product Studio
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div aria-live="polite" className={styles.carousel}>
          {PRODUCTS.map((product, i) => {
            const dist = Math.min(2, Math.abs(i - activeIndex));
            const offset = Math.max(-2, Math.min(2, i - activeIndex));
            const isActive = i === activeIndex;
            const Graphic = GRAPHICS[product.slug];
            return (
              <article
                aria-hidden={!isActive}
                className={`card card-hover !p-0 ${styles.board} ${isActive ? styles.isActive : ""}`}
                data-brand={product.accent}
                key={product.slug}
                style={{ "--offset": offset, "--dist": dist }}
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

        <div aria-label="Product navigation" className={styles.controls} role="group">
          <button
            aria-label="Previous product"
            disabled={activeIndex === 0}
            onClick={() => setActiveIndex((index) => Math.max(0, index - 1))}
            type="button"
          >
            <CarouselChevron />
          </button>
          <button
            aria-label="Next product"
            disabled={activeIndex === PRODUCTS.length - 1}
            onClick={() => setActiveIndex((index) => Math.min(PRODUCTS.length - 1, index + 1))}
            type="button"
          >
            <CarouselChevron />
          </button>
        </div>

      </div>
    </section>
  );
}
