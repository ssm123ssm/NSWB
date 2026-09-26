"use client";

import { useState } from "react";
import Link from "next/link";
import { ContactButton } from "./SiteChrome";
import { ArrowIcon } from "./Icons";
import ProductName from "./ProductName";
import ProductStoryGraphic from "./ProductStoryGraphic";
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

/**
 * Five product stories beside coLab. Each card is intentionally different
 * from the compact catalogue card: the large scene demonstrates the product's
 * central job in miniature, while the short copy and one action stay quiet.
 */
export default function ProductSequence() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section aria-labelledby="sequence-title" className={styles.scroll}>
      <div className={styles.stage}>
        <span className={styles.kicker}>Also in the system</span>

        <div className={styles.copy}>
          <h2 id="sequence-title">
            Five more products.
            <br />
            <span>One shared standard.</span>
          </h2>
          <p>
            Each product turns a complex workflow into something clear,
            observable, and useful.
          </p>
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
            return (
              <article
                aria-hidden={!isActive}
                className={`card card-hover !p-0 ${styles.board} ${isActive ? styles.isActive : ""}`}
                data-brand={product.accent}
                key={product.slug}
                style={{ "--offset": offset, "--dist": dist }}
              >
                <div className={styles.cardHead}>
                  <h3>
                    <ProductName product={product} />
                  </h3>
                  <span className={styles.status}>
                    <i /> {product.status === "live" ? "Live" : "In development"}
                  </span>
                </div>
                <p className={styles.cardTagline}>{product.tagline}</p>
                <div aria-hidden="true" className={styles.storyFrame}>
                  <ProductStoryGraphic slug={product.slug} />
                </div>
                <div className={styles.cardFoot}>
                  <p>{product.description}</p>
                  {product.detail ? (
                    <Link aria-label={`Explore ${product.name}`} className={styles.cardAction} href={product.detail}>
                      <ArrowIcon />
                    </Link>
                  ) : (
                    <ContactButton aria-label={`Request access to ${product.name}`} className={styles.cardAction} subject={product.name} intent="access">
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
