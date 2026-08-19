"use client";

import { memo, useEffect, useRef, useState } from "react";
import { products } from "../data/site";
import ProductName from "./ProductName";
import styles from "./NsqrReel.module.css";

/**
 * @typedef {Object} BeatRead
 * @property {string} label What the line is reporting on, e.g. "destination".
 * @property {string} [from] Previous value, struck through. Omit if there is none.
 * @property {string} value Current value.
 */

/**
 * @typedef {Object} Beat
 * @property {number} ms How long the beat holds.
 * @property {string} no Step number, as shown.
 * @property {string} head Headline. Text in [square brackets] takes the accent
 *   colour — the only markup this copy carries.
 * @property {string} cap Supporting sentence under the headline.
 * @property {BeatRead} read The instrument readout under the caption.
 */

/**
 * The four beats, in order. Edit the copy here — the markup reads this array and
 * nothing else. Each beat's index also drives the panel: the module reshuffle
 * runs on beat 2, the passcode dots fill on beat 3, the alert card arrives on
 * beat 4.
 *
 * @type {Beat[]}
 */
const BEATS = [
  {
    ms: 3600,
    no: "01",
    head: "Print the code [once.]",
    cap: "One QR on the poster, the menu, the packaging, the badge.",
    read: { label: "destination", value: "/spring-menu" },
  },
  {
    ms: 3800,
    no: "02",
    head: "Change where it [points.]",
    cap: "Dynamic codes let you swap the destination anytime — the printed image never goes stale. Every scan is logged: when, where, which device.",
    read: { label: "destination", from: "/spring-menu", value: "/summer-menu" },
  },
  {
    ms: 3600,
    no: "03",
    head: "Lock it behind a [passcode.]",
    cap: "Menus, documents, members-only pages — only the people you share the code with get through.",
    read: { label: "access", value: "passcode required" },
  },
  {
    ms: 4400,
    no: "04",
    head: "Know the [moment] someone tries.",
    cap: "A wrong passcode emails you instantly, with location and device. A live signal of tampering, leaks or a lost item turning up.",
    read: { label: "alerts", value: "on · email" },
  },
];

/** The alert card shown on the last beat. */
const ALERT = {
  headline: "wrong passcode · attempt 2",
  rows: [
    ["device", "iPhone / Safari"],
    ["location", "Lisbon, PT"],
    ["time", "14:02 · emailed to you"],
  ],
};

/** Beat the reel settles on when the visitor asks for reduced motion. */
const STILL = 1;

/** How long all four segments sit filled before the loop restarts. */
const TAIL = 900;

/** Modules flipped per reshuffle, and the gap between flips. */
const FLIPS = 130;
const FLIP_STEP = 7;
const FLIP_HOLD = 230;

const N = 25;

const nsqr = products.find((product) => product.slug === "nsqr");

/**
 * A stylised QR pattern — finder squares, alignment square and timing lines in
 * their real positions, everything else noise. Not scannable, and not meant to
 * be. Seeded rather than random so the server and the client build the same
 * pattern and hydration matches.
 */
const MODULES = buildModules();

function buildModules() {
  let seed = 20260730;
  const rnd = () => (seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296;

  const finder = (r, c, r0, c0) => {
    const dr = r - r0;
    const dc = c - c0;
    if (dr < 0 || dc < 0 || dr > 6 || dc > 6) return null;
    const ring = dr === 0 || dr === 6 || dc === 0 || dc === 6;
    const core = dr >= 2 && dr <= 4 && dc >= 2 && dc <= 4;
    return ring || core;
  };

  const align = (r, c) => {
    const dr = r - 16;
    const dc = c - 16;
    if (dr < 0 || dc < 0 || dr > 4 || dc > 4) return null;
    return dr === 0 || dr === 4 || dc === 0 || dc === 4 || (dr === 2 && dc === 2);
  };

  const out = [];
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      let on;
      let structural = true;
      const found = finder(r, c, 0, 0) ?? finder(r, c, 0, 18) ?? finder(r, c, 18, 0);

      if (found !== null) on = found;
      else if (align(r, c) !== null) on = align(r, c);
      else if (r === 6) on = c % 2 === 0;
      else if (c === 6) on = r % 2 === 0;
      else {
        on = rnd() > 0.47;
        structural = false;
      }

      // Modules assemble outward from the centre.
      out.push({ on, structural, delay: Math.hypot(r - 12, c - 12) * 44 });
    }
  }
  return out;
}

/** Splits a headline on its [accent] markers. */
const renderHead = (head) =>
  head.split(/\[([^\]]+)\]/).map((part, i) =>
    i % 2 ? (
      <span className={styles.accent} key={i}>
        {part}
      </span>
    ) : (
      part
    )
  );

/** The same headline as plain text, for the screen-reader summary. */
const plainHead = (head) => head.replace(/[[\]]/g, "");

/**
 * The beat clock and the panel's per-beat business (module reshuffle, lock
 * fill, alert), shared by the full reel and the compact panel-only view —
 * both are the same four-beat sequence, just narrated or not.
 */
function useReelBeats() {
  const [beat, setBeat] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [animated, setAnimated] = useState(false);
  const [assembled, setAssembled] = useState(false);
  const [filled, setFilled] = useState(0);
  const [bad, setBad] = useState(false);

  const gridRef = useRef(null);
  // What is left of the current beat, so a pause resumes rather than restarts.
  const remaining = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true);
      setBeat(STILL);
      return;
    }
    setAnimated(true);
    const id = setTimeout(() => setAssembled(true), 120);
    return () => clearTimeout(id);
  }, []);

  // The clock. Each beat schedules the next; the last one loops back after
  // the tail. Runs continuously — nothing pauses it, hover included.
  useEffect(() => {
    if (reduced) return;

    const last = beat === BEATS.length - 1;
    const duration = remaining.current ?? BEATS[beat].ms + (last ? TAIL : 0);
    const startedAt = Date.now();
    let fired = false;

    const id = setTimeout(() => {
      fired = true;
      remaining.current = null;
      if (last) {
        setBeat(0);
        setCycle((current) => current + 1);
      } else {
        setBeat((current) => current + 1);
      }
    }, duration);

    return () => {
      clearTimeout(id);
      if (!fired) {
        remaining.current = Math.max(0, duration - (Date.now() - startedAt));
      }
    };
  }, [beat, cycle, reduced]);

  // Per-beat business in the panel.
  useEffect(() => {
    if (reduced) return;

    const timers = [];
    const at = (ms, fn) => timers.push(setTimeout(fn, ms));

    if (beat === 0) {
      setFilled(0);
      setBad(false);
    }
    if (beat === 1) {
      reshuffle(gridRef.current, at);
    }
    if (beat === 2) {
      for (let j = 0; j < 4; j += 1) at(300 + j * 260, () => setFilled(j + 1));
    }
    if (beat === 3) {
      setBad(true);
    }

    return () => timers.forEach(clearTimeout);
  }, [beat, cycle, reduced]);

  return { beat, reduced, animated, assembled, filled, bad, gridRef };
}

/** The animated panel's markup — the QR grid, the passcode lock, the alert
 *  card — shared by the full reel and the compact panel-only view. */
function ReelPanel({ gridRef, filled, bad }) {
  return (
    <div aria-hidden="true" className={styles.panel}>
      <QrGrid gridRef={gridRef} />

      <div className={styles.lock}>
        <div className={styles.shackle}>
          <i />
        </div>
        <div className={styles.dots}>
          {[0, 1, 2, 3].map((j) => (
            <b
              className={`${styles.dot} ${bad ? styles.bad : j < filled ? styles.fill : ""}`}
              key={j}
            />
          ))}
        </div>
      </div>

      <div className={styles.alert}>
        <div className={styles.alertHead}>
          <em className={styles.alertBlip} />
          {ALERT.headline}
        </div>
        {ALERT.rows.map(([label, value]) => (
          <div key={label}>
            {label} &nbsp;·&nbsp; {value}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * NSQR's four-beat reel: print the code, re-point it, lock it, learn the moment
 * someone tries. The panel on the left illustrates whichever beat is running —
 * modules reshuffling as the destination changes, then a passcode prompt, then
 * the alert that a wrong entry sends.
 *
 * Runs continuously — hover and focus do not freeze it. Under
 * prefers-reduced-motion nothing moves: the reel settles on one beat and
 * stays. The animated half is aria-hidden and all four messages are given to
 * assistive tech as a plain list instead, so nothing depends on watching text
 * replace itself.
 */
export default function NsqrReel({ className = "", embedded = false }) {
  const { beat, animated, assembled, filled, bad, gridRef } = useReelBeats();

  return (
    <section
      aria-label="NSQR — how a dynamic QR code works"
      className={`${styles.reel} ${embedded ? styles.embedded : ""} ${
        assembled ? styles.isAssembled : ""
      } ${className}`.trim()}
      data-anim={animated ? "on" : undefined}
      data-beat={beat + 1}
      data-brand={nsqr.accent}
    >
      <div className={styles.top}>
        <div className={styles.brand}>
          <div className={styles.mark}>
            <ProductName product={nsqr} />
          </div>
          <div className={styles.markSub}>Dynamic QR codes</div>
        </div>
      </div>

      {/* Every beat's message, for anything that cannot watch the animation. */}
      <ul className="sr-only">
        {BEATS.map((item) => (
          <li key={item.no}>
            {plainHead(item.head)} {item.cap}
          </li>
        ))}
      </ul>

      <div className={styles.body}>
        <ReelPanel bad={bad} filled={filled} gridRef={gridRef} />

        <div aria-hidden="true" className={styles.narr}>
          <div className={styles.stack}>
            {BEATS.map((item, j) => (
              <div
                className={`${styles.take} ${j === beat ? styles.isOn : ""}`}
                key={item.no}
              >
                <div className={styles.step}>
                  <span>{item.no}</span>
                  <span className={styles.stepBar} />
                </div>

                <h2>{renderHead(item.head)}</h2>
                <p className={styles.cap}>{item.cap}</p>

                <p className={styles.read}>
                  <span>
                    <span className={styles.readArrow}>▸</span> {item.read.label}
                  </span>
                  <span>
                    {item.read.from && (
                      <>
                        <s className={styles.readOld}>{item.read.from}</s>{" "}
                      </>
                    )}
                    <span className={styles.readKey}>{item.read.value}</span>
                  </span>
                </p>
              </div>
            ))}
          </div>

          <div className={styles.prog}>
            {BEATS.map((item, j) => (
              <i
                className={`${styles.seg} ${
                  j < beat ? styles.done : j === beat ? styles.run : ""
                }`}
                key={item.no}
                style={j === beat ? { "--r-dur": `${item.ms}ms` } : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * 625 modules, rendered once. Memoised because the reshuffle drives individual
 * modules through the DOM rather than through state — 130 flips a beat would be
 * 130 re-renders of the whole reel — and a re-render here would reconcile those
 * classes away, resetting the pattern mid-loop.
 */
const QrGrid = memo(function QrGrid({ gridRef }) {
  return (
    <div className={styles.grid} ref={gridRef}>
      {MODULES.map((module, i) => (
        <div
          className={`${styles.m} ${module.on ? styles.on : ""}`}
          key={i}
          style={{ transitionDelay: `${module.delay}ms` }}
        />
      ))}
    </div>
  );
});

/**
 * Flips a burst of non-structural modules as the destination changes: each one
 * lands on the accent colour, then settles to its opposite state. The pattern
 * drifts a little every loop, which is the point — the code is being rewritten.
 */
function reshuffle(grid, at) {
  if (!grid) return;

  const pool = Array.from(grid.children).filter((_, i) => !MODULES[i].structural);
  if (!pool.length) return;

  for (let i = 0; i < FLIPS; i += 1) {
    const el = pool[Math.floor(Math.random() * pool.length)];
    at(i * FLIP_STEP, () => {
      el.classList.add(styles.flip);
      at(FLIP_HOLD, () => {
        el.classList.remove(styles.flip);
        el.classList.toggle(styles.on);
      });
    });
  }
}
