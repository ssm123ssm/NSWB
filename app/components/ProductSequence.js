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

/** Which board a scroll progress (0–1) lands on. */
const activeAt = (progress) => Math.min(PRODUCTS.length - 1, Math.floor(progress * (PRODUCTS.length + 0.2)));

/**
 * The five products beside coLab, carried through one sticky stage instead
 * of five separate ones. Scrolling advances a discrete `activeIndex`
 * through React state — each card slides in a CSS transition, not a
 * per-pixel scroll-synced transform, since there's nothing continuous to
 * track between one product and the next. Each card is the exact
 * `/products` catalogue card — same brand tag, status chip, graphic and
 * key-points list — so a product looks identical whichever page shows it.
 */
export default function ProductSequence() {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const section = scrollRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const progress = Math.max(
        0,
        Math.min(1, -rect.top / (section.offsetHeight - window.innerHeight))
      );

      const next = activeAt(progress);
      if (next !== activeIndexRef.current) {
        activeIndexRef.current = next;
        setActiveIndex(next);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
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
