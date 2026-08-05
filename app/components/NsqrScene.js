"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";
import { PauseIcon, PlayIcon } from "./Icons";
import styles from "./NsqrScene.module.css";

/**
 * The whole NSQR story as a 13-second cartoon: a sign goes up, its destination
 * swaps under the same printed code, somebody walks over and scans it, the
 * code's own modules break formation and swarm into a checkmark, and the scan
 * lands on the counter.
 *
 * Ported from the "nsqr — Scan & Verify" motion study. Everything is inline SVG
 * driven by CSS keyframes on one clock — no libraries, no video, no images.
 *
 * The geometry is built once at module scope rather than in an effect, so the
 * scene renders on the server and hydrates without a flash. It has to be
 * deterministic for that to hold: the PRNG below is seeded, and the module and
 * confetti loops draw from it in a fixed order. Do not reorder them.
 */

const LOOP_MS = 13000;

/* --- QR geometry ---------------------------------------------------------- */

const GRID = 21;
const BOX = 196;
const ORIGIN_X = 377;
const ORIGIN_Y = 84;
const PITCH = BOX / GRID;
const GAP = 1.1; /* cartoon breathing room between modules */

/* The checkmark the modules reassemble into, in fractions of the code's box. */
const CHECK = [
  { x: 0.14, y: 0.52 },
  { x: 0.4, y: 0.76 },
  { x: 0.86, y: 0.2 },
];

const CONFETTI_COLOURS = [
  "#FFC24B",
  "#FF6B6B",
  "#6366F1",
  "#2FD08A",
  "#4338CA",
  "#FFFFFF",
];

const SCENE = buildScene();

function buildScene() {
  let seed = 20260805;
  const rnd = () => (seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296;

  const inFinder = (r, c) => {
    for (const [r0, c0] of [[0, 0], [0, GRID - 7], [GRID - 7, 0]]) {
      const dr = r - r0;
      const dc = c - c0;
      if (dr >= 0 && dr < 7 && dc >= 0 && dc < 7) {
        const ring = Math.min(dr, dc, 6 - dr, 6 - dc);
        return { hit: true, dark: ring === 0 || ring === 2 };
      }
    }
    return { hit: false, dark: false };
  };

  const inSeparator = (r, c) =>
    [[0, 0], [0, GRID - 8], [GRID - 8, 0]].some(([r0, c0]) => {
      const dr = r - r0;
      const dc = c - c0;
      return dr >= -1 && dr <= 7 && dc >= -1 && dc <= 7;
    });

  const modules = [];
  for (let r = 0; r < GRID; r += 1) {
    for (let c = 0; c < GRID; c += 1) {
      const finder = inFinder(r, c);
      let dark;
      if (finder.hit) dark = finder.dark;
      else if (inSeparator(r, c)) dark = false;
      else if (r === 6 || c === 6) dark = (r === 6 ? c : r) % 2 === 0;
      else dark = rnd() < 0.46;
      if (!dark) continue;

      const x = ORIGIN_X + c * PITCH;
      const y = ORIGIN_Y + r * PITCH;
      modules.push({ x, y, cx: x + PITCH / 2, cy: y + PITCH / 2 });
    }
  }

  /* Where the checkmark wants modules: points along its two strokes, four
     abreast so the stroke has thickness. */
  const abs = (p) => ({ x: ORIGIN_X + p.x * BOX, y: ORIGIN_Y + p.y * BOX });
  const seg = (p, q) => {
    const dx = q.x - p.x;
    const dy = q.y - p.y;
    const len = Math.hypot(dx, dy);
    const steps = Math.max(1, Math.round(len / PITCH));
    const nx = -dy / len;
    const ny = dx / len;
    const out = [];
    for (let i = 0; i <= steps; i += 1) {
      const t = i / steps;
      const bx = p.x + dx * t;
      const by = p.y + dy * t;
      for (let k = -1.5; k <= 1.5; k += 1) {
        out.push({ x: bx + nx * k * PITCH, y: by + ny * k * PITCH });
      }
    }
    return out;
  };

  const [a, b, c] = CHECK.map(abs);
  const targets = [...seg(a, b), ...seg(b, c)];

  /* Nearest free module per target, so travel stays short and it reads as a
     swarm rather than a shuffle. Whatever is left over vanishes. */
  const used = new Array(modules.length).fill(false);
  for (const target of targets) {
    let best = -1;
    let bestDistance = Infinity;
    for (let i = 0; i < modules.length; i += 1) {
      if (used[i]) continue;
      const dx = modules[i].cx - target.x;
      const dy = modules[i].cy - target.y;
      const d = dx * dx + dy * dy;
      if (d < bestDistance) {
        bestDistance = d;
        best = i;
      }
    }
    if (best < 0) continue;
    used[best] = true;
    modules[best].tx = `${(target.x - modules[best].cx).toFixed(2)}px`;
    modules[best].ty = `${(target.y - modules[best].cy).toFixed(2)}px`;
  }
  modules.forEach((module, i) => {
    module.join = used[i];
  });

  const confetti = [];
  for (let p = 0; p < 26; p += 1) {
    const angle = (p / 26) * Math.PI * 2 + rnd() * 0.4;
    const distance = 130 + rnd() * 150;
    confetti.push({
      kind: p % 3,
      group: (p % 3) + 1,
      fill: CONFETTI_COLOURS[p % CONFETTI_COLOURS.length],
      dx: `${(Math.cos(angle) * distance).toFixed(1)}px`,
      dy: `${(Math.sin(angle) * distance - 60).toFixed(1)}px`,
      rot: `${Math.round(-540 + rnd() * 1080)}deg`,
    });
  }

  return { modules, confetti };
}

/* --- the scene ------------------------------------------------------------ */

export default function NsqrScene({ className = "" }) {
  const [playing, setPlaying] = useState(true);
  const [motion, setMotion] = useState(false);

  const stageRef = useRef(null);
  const originRef = useRef(0);
  // Where the clock stood when it was paused, so play resumes rather than
  // restarts.
  const frozenRef = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPlaying(false);
      return;
    }
    setMotion(true);
    originRef.current = performance.now();
  }, []);

  const toggle = useCallback(() => {
    setPlaying((current) => {
      if (current) {
        frozenRef.current = (performance.now() - originRef.current) % LOOP_MS;
      } else {
        setMotion(true);
        originRef.current = performance.now() - frozenRef.current;
      }
      return !current;
    });
  }, []);

  return (
    <div className={className}>
      <div
        className={`${styles.stage} ${motion ? styles.isMotion : ""} ${
          playing ? "" : styles.isPaused
        }`.trim()}
        ref={stageRef}
      >
        <SceneSvg />

        {/* Small, and inside the frame rather than under it. The loop runs for
            longer than five seconds and starts on its own, so something has to
            be able to stop it — but a full transport bar below the stage was
            more furniture than the page wanted. */}
        <button
          className={styles.transport}
          onClick={toggle}
          type="button"
          aria-pressed={!playing}
          aria-label={playing ? "Pause the animation" : "Play the animation"}
        >
          {playing ? <PauseIcon className="h-3.5 w-3.5" /> : <PlayIcon className="h-3.5 w-3.5" />}
        </button>
      </div>
    </div>
  );
}

/**
 * 300-odd modules and 26 confetti pieces, rendered once. Memoised so that
 * toggling play never reconciles the scene: re-rendering it would restart every
 * CSS animation mid-loop, which is the opposite of what pause should do.
 */
const SceneSvg = memo(function SceneSvg() {
  return (
    <svg
      viewBox="0 0 800 500"
      role="img"
      aria-label="A dynamic QR code sign rises, its destination link swaps, a person walks up and scans it with a phone, and the code's modules rearrange into a green checkmark while the scan is counted."
    >
      <defs>
        <linearGradient id="nsqrSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" className={styles.sky1} />
          <stop offset="1" className={styles.sky2} />
        </linearGradient>
        <linearGradient id="nsqrBeam" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6366F1" stopOpacity="0" />
          <stop offset="0.55" stopColor="#8B8BFF" stopOpacity="0.55" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="nsqrBuild" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#6366F1" stopOpacity="0" />
          <stop offset="0.5" stopColor="#6366F1" stopOpacity="1" />
          <stop offset="1" stopColor="#6366F1" stopOpacity="0" />
        </linearGradient>

        <mask id="nsqrWipe" maskUnits="userSpaceOnUse" x="330" y="60" width="300" height="280">
          <rect className={styles.wipeRect} x="330" y="78" width="300" height="204" fill="#fff" />
        </mask>

        <clipPath id="nsqrCardClip">
          <rect x="350" y="60" width="250" height="250" rx="18" />
        </clipPath>
      </defs>

      {/* backdrop */}
      <rect x="0" y="0" width="800" height="500" fill="url(#nsqrSky)" />

      <g className={styles.cloudA} opacity="0.5">
        <path
          d="M92 118q0-26 26-26 8-20 30-20t30 20q26 0 26 26z"
          opacity=".75"
          style={{ fill: "var(--paper)" }}
        />
      </g>
      <g className={styles.cloudB} opacity="0.4">
        <path
          d="M596 86q0-21 21-21 6-16 24-16t24 16q21 0 21 21z"
          opacity=".7"
          style={{ fill: "var(--paper)" }}
        />
      </g>

      <path d="M0 400 H800 V500 H0 Z" style={{ fill: "var(--ground)" }} />
      <path d="M0 400 H800" className={styles.ink} strokeWidth="6" fill="none" />
      <g opacity=".85" style={{ fill: "var(--ground-2)" }}>
        <ellipse cx="90" cy="432" rx="34" ry="7" />
        <ellipse cx="712" cy="452" rx="46" ry="8" />
        <ellipse cx="330" cy="470" rx="28" ry="6" />
      </g>

      <g className={styles.actors}>
        {/* the sign */}
        <ellipse cx="475" cy="400" rx="70" ry="13" opacity=".16" style={{ fill: "var(--ink)" }} />

        <g className={styles.cardShake}>
          <rect
            className={`${styles.pole} ${styles.ink}`}
            x="465"
            y="300"
            width="20"
            height="102"
            rx="8"
            strokeWidth="5"
            style={{ fill: "var(--indigo-deep)" }}
          />
          <ellipse
            className={`${styles.standBase} ${styles.ink}`}
            cx="475"
            cy="400"
            rx="52"
            ry="14"
            strokeWidth="5"
            style={{ fill: "var(--indigo)" }}
          />

          <g className={styles.card}>
            <rect
              className={`${styles.cardBody} ${styles.ink}`}
              x="350"
              y="60"
              width="250"
              height="250"
              rx="18"
              strokeWidth="6"
              style={{ fill: "var(--paper)" }}
            />

            <g mask="url(#nsqrWipe)">
              {SCENE.modules.map((module) => (
                <rect
                  className={`${styles.mod} ${module.join ? styles.join : styles.vanish}`}
                  key={`${module.x}-${module.y}`}
                  x={module.x.toFixed(2)}
                  y={module.y.toFixed(2)}
                  width={(PITCH - GAP).toFixed(2)}
                  height={(PITCH - GAP).toFixed(2)}
                  rx="1.6"
                  fill="#1B1230"
                  style={module.join ? { "--tx": module.tx, "--ty": module.ty } : undefined}
                />
              ))}
            </g>

            <g clipPath="url(#nsqrCardClip)">
              <rect
                className={styles.buildLine}
                x="374"
                y="82"
                width="202"
                height="5"
                rx="2.5"
                fill="url(#nsqrBuild)"
              />
            </g>

            {/* the destination label, swapping under a code that never changes */}
            <g fontSize="13" textAnchor="middle" style={{ fontFamily: "var(--font-mono)" }}>
              <text className={styles.destA} x="475" y="296" style={{ fill: "var(--ink-soft)" }}>
                nsqr.io/r/x7k2 → menu-spring
              </text>
              <text className={styles.destB} x="475" y="296" style={{ fill: "var(--indigo-deep)" }}>
                nsqr.io/r/x7k2 → menu-summer
              </text>
            </g>

            <g clipPath="url(#nsqrCardClip)">
              <g className={styles.beam}>
                <rect x="352" y="58" width="246" height="46" fill="url(#nsqrBeam)" />
                <rect x="352" y="100" width="246" height="5" fill="#FFFFFF" opacity=".95" />
              </g>
            </g>
          </g>

          <g className={styles.livePill}>
            <rect
              className={styles.ink}
              x="340"
              y="42"
              width="122"
              height="36"
              rx="18"
              strokeWidth="5"
              style={{ fill: "var(--sun)" }}
            />
            <circle
              className={`${styles.liveDot} ${styles.ink}`}
              cx="362"
              cy="60"
              r="6"
              strokeWidth="3"
              style={{ fill: "var(--coral)" }}
            />
            <text
              x="378"
              y="66"
              fontSize="17"
              style={{ fontFamily: "var(--font-display)", fill: "var(--ink)" }}
            >
              DYNAMIC
            </text>
          </g>
          <circle
            className={styles.swapRing}
            cx="401"
            cy="60"
            r="30"
            fill="none"
            strokeWidth="5"
            style={{ stroke: "var(--sun)" }}
          />
        </g>

        <circle
          className={styles.ring1}
          cx="475"
          cy="185"
          r="105"
          fill="none"
          strokeWidth="9"
          style={{ stroke: "var(--mint)" }}
        />
        <circle
          className={styles.ring2}
          cx="475"
          cy="185"
          r="105"
          fill="none"
          strokeWidth="6"
          style={{ stroke: "var(--sun)" }}
        />

        {/* the person */}
        <g className={styles.guy}>
          <g className={styles.guyBoil}>
            <ellipse
              className={styles.guyShadow}
              cx="205"
              cy="402"
              rx="52"
              ry="10"
              opacity=".18"
              style={{ fill: "var(--ink)" }}
            />

            <g opacity="0" style={{ fill: "var(--paper)" }}>
              <circle className={styles.puff} cx="160" cy="392" r="11" />
              <circle className={`${styles.puff} ${styles.puffB}`} cx="146" cy="398" r="8" />
            </g>

            <g className={styles.guyJump}>
              <g className={styles.guySquash}>
                <g className={styles.guyBob}>
                  <g className={styles.legBack}>
                    <path d="M192 344 V392" className={styles.ink} strokeWidth="20" fill="none" />
                    <path
                      d="M192 344 V392"
                      strokeWidth="12"
                      strokeLinecap="round"
                      fill="none"
                      style={{ stroke: "var(--indigo-deep)" }}
                    />
                    <rect x="176" y="384" width="34" height="17" rx="8" style={{ fill: "var(--ink)" }} />
                  </g>

                  <g className={styles.armBack}>
                    <path d="M182 282 L162 322" className={styles.ink} strokeWidth="18" fill="none" />
                    <path
                      d="M182 282 L162 322"
                      strokeWidth="10"
                      strokeLinecap="round"
                      fill="none"
                      style={{ stroke: "var(--coral)" }}
                    />
                    <circle
                      className={styles.ink}
                      cx="161"
                      cy="324"
                      r="9"
                      strokeWidth="4"
                      style={{ fill: "var(--skin)" }}
                    />
                  </g>

                  <path
                    d="M175 268 q30 -10 60 0 l8 78 q-38 10 -76 0 Z"
                    className={styles.ink}
                    strokeWidth="6"
                    style={{ fill: "var(--coral)" }}
                  />
                  <path
                    d="M186 292 h38"
                    strokeWidth="4"
                    opacity=".25"
                    fill="none"
                    style={{ stroke: "var(--ink)" }}
                  />

                  <g className={styles.legFront}>
                    <path d="M220 346 V392" className={styles.ink} strokeWidth="20" fill="none" />
                    <path
                      d="M220 346 V392"
                      strokeWidth="12"
                      strokeLinecap="round"
                      fill="none"
                      style={{ stroke: "var(--indigo)" }}
                    />
                    <rect x="212" y="384" width="36" height="17" rx="8" style={{ fill: "var(--ink)" }} />
                  </g>

                  <g className={styles.head}>
                    <circle
                      className={styles.ink}
                      cx="205"
                      cy="238"
                      r="34"
                      strokeWidth="6"
                      style={{ fill: "var(--skin)" }}
                    />
                    <path
                      d="M172 232 q4 -34 34 -34 t32 30 q-14 -14 -34 -8 t-32 12 Z"
                      style={{ fill: "var(--ink)" }}
                    />
                    <path
                      d="M238 236 q9 4 6 14 t-10 6"
                      className={styles.ink}
                      strokeWidth="4"
                      style={{ fill: "var(--skin)" }}
                    />
                    <g style={{ fill: "var(--ink)" }}>
                      <ellipse className={styles.eye} cx="216" cy="240" rx="4.2" ry="5.4" />
                      <ellipse className={styles.eye} cx="232" cy="240" rx="4.2" ry="5.4" />
                    </g>
                    <path d="M215 254 q9 8 18 0" className={styles.ink} strokeWidth="4.5" fill="none" />
                    <circle cx="209" cy="252" r="5" opacity=".35" style={{ fill: "var(--coral)" }} />
                    <circle cx="239" cy="252" r="5" opacity=".35" style={{ fill: "var(--coral)" }} />
                  </g>

                  <g className={styles.armPhone}>
                    {/* sleeve, then bare forearm, so the hand reads as skin */}
                    <path d="M232 280 L268 254" className={styles.ink} strokeWidth="19" fill="none" />
                    <path
                      d="M232 280 L268 254"
                      strokeWidth="11"
                      strokeLinecap="round"
                      fill="none"
                      style={{ stroke: "var(--coral)" }}
                    />
                    <path d="M268 254 L286 238" className={styles.ink} strokeWidth="16" fill="none" />
                    <path
                      d="M268 254 L286 238"
                      strokeWidth="9"
                      strokeLinecap="round"
                      fill="none"
                      style={{ stroke: "var(--skin)" }}
                    />

                    <g transform="rotate(-14 292 210)">
                      <rect x="272" y="176" width="40" height="68" rx="9" style={{ fill: "var(--ink)" }} />
                      <rect
                        className={styles.screen}
                        x="277"
                        y="182"
                        width="30"
                        height="52"
                        rx="5"
                        fill="#241C4A"
                      />

                      <g
                        className={styles.screenScan}
                        stroke="#8B8BFF"
                        strokeWidth="2.4"
                        fill="none"
                        strokeLinecap="round"
                      >
                        <path d="M281 190 h6 M281 190 v6" />
                        <path d="M303 190 h-6 M303 190 v6" />
                        <path d="M281 226 h6 M281 226 v-6" />
                        <path d="M303 226 h-6 M303 226 v-6" />
                        <rect x="286" y="200" width="12" height="12" rx="2" stroke="#6366F1" strokeWidth="2" />
                      </g>

                      <path
                        className={styles.screenCheck}
                        d="M281 209 l7 8 14 -18"
                        fill="none"
                        stroke="#0F2E20"
                        strokeWidth="5.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      <circle cx="292" cy="239" r="2.6" fill="#6b6790" />
                    </g>

                    {/* gripping hand, drawn over the phone */}
                    <circle
                      className={styles.ink}
                      cx="288"
                      cy="238"
                      r="10"
                      strokeWidth="5"
                      style={{ fill: "var(--skin)" }}
                    />
                  </g>
                </g>
              </g>
            </g>
          </g>

          <g className={styles.bubble} opacity="0">
            <path
              d="M60 86 h150 a16 16 0 0 1 16 16 v44 a16 16 0 0 1 -16 16 h-16 l-12 20 -10 -20 h-112 a16 16 0 0 1 -16 -16 v-44 a16 16 0 0 1 16 -16 Z"
              className={styles.ink}
              strokeWidth="6"
              style={{ fill: "var(--paper)" }}
            />
            <text x="78" y="140" className={styles.toonText} fontSize="27" style={{ fill: "var(--mint-deep)" }}>
              Menu&rsquo;s up!
            </text>
          </g>
        </g>

        <g className={styles.finder} opacity="0">
          <g
            className={styles.finderCorner}
            fill="none"
            strokeWidth="9"
            strokeLinecap="round"
            style={{ stroke: "var(--indigo)" }}
          >
            <path d="M344 96 v-32 h32" />
            <path d="M606 96 v-32 h-32" />
            <path d="M344 278 v32 h32" />
            <path d="M606 278 v32 h-32" />
          </g>
        </g>

        <g className={styles.ribbon} opacity="0">
          <path
            d="M338 292 h274 l-18 26 18 26 h-274 l18 -26 Z"
            className={styles.ink}
            strokeWidth="6"
            style={{ fill: "var(--mint)" }}
          />
          <text
            x="475"
            y="328"
            className={styles.toonText}
            fontSize="30"
            textAnchor="middle"
            letterSpacing="2"
            style={{ fill: "var(--paper)" }}
          >
            VERIFIED
          </text>
        </g>

        <g>
          {SCENE.confetti.map((piece, index) => {
            const props = {
              className: `${styles.confetti} ${styles[`g${piece.group}`]}`,
              fill: piece.fill,
              stroke: "#1B1230",
              strokeWidth: "2.4",
              strokeLinejoin: "round",
              style: { "--dx": piece.dx, "--dy": piece.dy, "--rot": piece.rot },
            };
            if (piece.kind === 0) {
              return <rect key={index} {...props} x="470" y="180" width="13" height="9" rx="2" />;
            }
            if (piece.kind === 1) {
              return <circle key={index} {...props} cx="476" cy="184" r="5.5" />;
            }
            return <path key={index} {...props} d="M476 174 l5 10 -5 10 -5 -10 Z" />;
          })}
        </g>

        <g className={styles.flyChip} opacity="0">
          <rect
            className={styles.ink}
            x="440"
            y="168"
            width="70"
            height="34"
            rx="17"
            strokeWidth="5"
            style={{ fill: "var(--sun)" }}
          />
          <text
            x="475"
            y="192"
            fontSize="21"
            fontWeight="700"
            textAnchor="middle"
            style={{ fontFamily: "var(--font-display)", fill: "var(--ink)" }}
          >
            +1
          </text>
        </g>

        <g className={styles.counter}>
          <rect
            className={styles.ink}
            x="596"
            y="418"
            width="176"
            height="54"
            rx="16"
            strokeWidth="6"
            style={{ fill: "var(--paper)" }}
          />
          <text
            x="616"
            y="438"
            fontSize="11"
            fontWeight="700"
            letterSpacing="1.6"
            style={{ fill: "var(--ink-soft)" }}
          >
            TOTAL SCANS
          </text>
          <g fontSize="22" fontWeight="700" style={{ fontFamily: "var(--font-mono)", fill: "var(--ink)" }}>
            <text className={styles.numOld} x="616" y="462">
              1,247
            </text>
            <text className={styles.numNew} x="616" y="462" style={{ fill: "var(--mint-deep)" }}>
              1,248
            </text>
          </g>
        </g>
      </g>
    </svg>
  );
});
