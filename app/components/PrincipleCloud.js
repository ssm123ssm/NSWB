"use client";

import { useEffect, useRef, useState } from "react";
import cloudLayout from "d3-cloud";

/* size: the font size d3-cloud packs the word at, in px. Mixing a big range
   (44 down to 14) is what gives the cloud its shape — a flat range packs
   into a grid, not a cloud. */
const CLOUD_WORD_SIZES = { 1: 44, 2: 30, 3: 21, 4: 14 };

/* A washed, warm rainbow — green through amber, orange, yellow and red —
   cycled across the words rather than tied to weight or meaning, so the
   colour reads as one continuous mix instead of grouped categories. */
const CLOUD_TONES = ["#5f8f5a", "#a9843f", "#c17a45", "#a99432", "#b4574a"];

const BOX_ASPECT = 1.7;

export default function PrincipleCloud({ words }) {
  const containerRef = useRef(null);
  const [placed, setPlaced] = useState(null);
  const [box, setBox] = useState(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const source = words.map((word, index) => ({
      text: word.text,
      size: CLOUD_WORD_SIZES[word.weight] ?? 14,
      color: CLOUD_TONES[index % CLOUD_TONES.length],
      /* Mostly horizontal, the occasional vertical word — matches how a
         classic tag cloud reads rather than a grid of rotated text. */
      rotate: Math.random() < 0.78 ? 0 : Math.random() < 0.5 ? 90 : -90,
    }));

    /* d3-cloud measures each word on an offscreen canvas to build its
       collision mask, and canvas's `font` property can't resolve a CSS
       custom property — passed var(--font-sans) directly, every word
       measures as a fallback-width box and the collision check is
       meaningless, which caused the earlier overlap. Resolving the computed
       font family first (Next's generated Inter stack) fixes measurement to
       match what's actually on screen. */
    const resolvedFont =
      getComputedStyle(document.body).fontFamily || "sans-serif";

    /* d3-cloud packs into whatever box you give it — a box sized generously
       leaves a loose scatter with dead space around the edges (what "smaller
       text, cloud shape" feedback was pointing at). Size the box from the
       words' actual measured area instead of a fixed guess, then only grow
       it if the pack was too tight to fit everyone. That's what gets an
       edge-to-edge cloud instead of a handful of words floating in a big
       empty canvas. */
    const measureCanvas = document.createElement("canvas");
    const ctx = measureCanvas.getContext("2d");
    let totalArea = 0;
    source.forEach((word) => {
      ctx.font = `${word.size}px ${resolvedFont}`;
      const textWidth = ctx.measureText(word.text).width;
      totalArea += textWidth * word.size * 1.15;
    });

    const runLayout = (width, height, attempt) => {
      cloudLayout()
        .size([width, height])
        .words(source.map((word) => ({ ...word })))
        .padding(2)
        .spiral("rectangular")
        .rotate((word) => word.rotate)
        .font(resolvedFont)
        .fontWeight((word) => (word.size >= 30 ? 600 : word.size >= 21 ? 500 : 400))
        .fontSize((word) => word.size)
        .on("end", (result) => {
          if (result.length < source.length && attempt < 6) {
            runLayout(width * 1.12, height * 1.12, attempt + 1);
            return;
          }
          setBox({ width, height });
          setPlaced(result);
        })
        .start();
    };

    const startWidth = Math.sqrt(totalArea * 2 * BOX_ASPECT);
    runLayout(startWidth, startWidth / BOX_ASPECT, 0);
  }, [words]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !box) return undefined;
    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width;
      if (width) setScale(width / box.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [box]);

  if (!box) {
    return <div className="mx-auto mt-8 h-[300px] w-full max-w-3xl" />;
  }

  return (
    <div
      ref={containerRef}
      className="mx-auto mt-8 w-full max-w-3xl"
      style={{ height: box.height * scale }}
    >
      <div
        className="relative"
        style={{
          width: box.width,
          height: box.height,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        {placed?.map((word) => (
          <span
            key={word.text}
            className="absolute select-none whitespace-nowrap leading-none"
            style={{
              left: box.width / 2 + word.x,
              top: box.height / 2 + word.y,
              fontSize: word.size,
              fontWeight: word.size >= 30 ? 600 : word.size >= 21 ? 500 : 400,
              color: word.color,
              transform: `translate(-50%, -50%) rotate(${word.rotate}deg)`,
            }}
          >
            {word.text}
          </span>
        ))}
      </div>
    </div>
  );
}
