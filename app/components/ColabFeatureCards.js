"use client";

import { useRef, useState } from "react";
import {
  ArrowIcon,
  ChatIcon,
  CheckIcon,
  DocIcon,
  LayersIcon,
  PaletteIcon,
} from "./Icons";
import styles from "./ColabLanding.module.css";

const groupIcons = {
  general: LayersIcon,
  research: DocIcon,
  product: ChatIcon,
  creative: PaletteIcon,
};

export default function ColabFeatureCards({ groups }) {
  const railRef = useRef(null);
  const [canScrollBack, setCanScrollBack] = useState(false);
  const [canScrollForward, setCanScrollForward] = useState(true);

  const updateControls = () => {
    const rail = railRef.current;
    if (!rail) return;

    setCanScrollBack(rail.scrollLeft > 8);
    setCanScrollForward(
      rail.scrollLeft < rail.scrollWidth - rail.clientWidth - 8,
    );
  };

  const scrollCards = (direction) => {
    const rail = railRef.current;
    if (!rail) return;

    const card = rail.querySelector("article");
    const gap = 16;
    const distance = card ? card.getBoundingClientRect().width + gap : 440;
    rail.scrollBy({ left: direction * distance, behavior: "smooth" });
  };

  return (
    <div className={styles.featureCarousel}>
      <div
        aria-label="coLab feature groups"
        className={styles.featureGroupRail}
        onScroll={updateControls}
        ref={railRef}
        tabIndex="0"
      >
        {groups.map((group) => {
          const GroupIcon = groupIcons[group.id];

          return (
            <article
              className={`${styles.featureGroupCard} ${group.wide ? styles.featureGroupWide : ""}`}
              data-brand={group.tone}
              key={group.id}
            >
              <div className={styles.featureGroupContent}>
                <div className={styles.featureGroupLabel}>
                  <GroupIcon className="h-6 w-6" />
                  <span>{group.label}</span>
                </div>
                <h3>{group.title}</h3>
                <p>{group.description}</p>

                <ul className={styles.featureGroupList}>
                  {group.features.map((feature) => (
                    <li key={feature.title}>
                      <CheckIcon />
                      <div>
                        <h4>{feature.title}</h4>
                        <p>{feature.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

            </article>
          );
        })}
      </div>

      <div className={styles.featureCarouselControls} aria-label="Feature card controls">
        <button
          aria-label="Show previous feature card"
          disabled={!canScrollBack}
          onClick={() => scrollCards(-1)}
          type="button"
        >
          <ArrowIcon />
        </button>
        <button
          aria-label="Show next feature card"
          disabled={!canScrollForward}
          onClick={() => scrollCards(1)}
          type="button"
        >
          <ArrowIcon />
        </button>
      </div>
    </div>
  );
}
