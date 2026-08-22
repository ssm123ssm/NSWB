"use client";

import { useEffect, useRef, useState } from "react";
import { getProduct } from "../data/site";
import ProductName from "./ProductName";
import styles from "./ColabFeature.module.css";

const colab = getProduct("colab");

/**
 * The four phases of a coLab project — plan, discuss, decide, share — ported
 * verbatim from the reference motion source. Each phase restates the same
 * board (project title, status, milestone rail, decision log, footer) and
 * the same discussion thread, as they read at that point in the project.
 */
const PHASES = [
  {
    phase: "01 / Plan the real work",
    project: "Protocol release",
    status: "planning",
    active: 0,
    description:
      "A project should not lose its thinking the moment the meeting ends.",
    milestones: [
      "Define the real question",
      "Set the API boundary",
      "Make the decision visible",
    ],
    decision: [
      "APR 14 · SI",
      "Keep every decision beside the work it changes.",
      "A reason with no home becomes a future argument.",
      "SUPUN ISURU",
    ],
    footer: ["0 tasks without context", "scoping"],
    thread: [
      "01 / Scope it together",
      "What has to be true before we call this complete?",
      "Maya",
      "The decision needs to survive the hand-off.",
      "09:14",
      "4 replies",
    ],
  },
  {
    phase: "02 / Discuss it in place",
    project: "Reviewer workflow",
    status: "in review",
    active: 1,
    description:
      "Discussion belongs beside the task it changes, where the next person can see how the work became the work.",
    milestones: [
      "Frame the reviewer flow",
      "Set the API boundary",
      "Make the decision visible",
    ],
    decision: [
      "APR 18 · IM",
      "Do not split the discussion from the decision.",
      "A good thread is part of the product record, not a notification trail.",
      "ISURU MORAES",
    ],
    footer: ["12 linked discussions", "reviewing"],
    thread: [
      "02 / A decision, in place",
      "Can we keep the rationale in the task, not somewhere beside it?",
      "Supun",
      "Yes. This is the context a hand-off actually needs.",
      "11:28",
      "7 replies",
    ],
  },
  {
    phase: "03 / Decide with a record",
    project: "Release boundary",
    status: "decided",
    active: 2,
    description:
      "A decision log makes the trade-off visible: what changed, who settled it, and why the team chose that path.",
    milestones: [
      "Review the evidence",
      "Sign the release boundary",
      "Share the decision",
    ],
    decision: [
      "APR 22 · SI",
      "Ship the smaller, dependable surface first.",
      "The rejected options stay visible — because future work deserves the full reasoning.",
      "SUPUN ISURU",
    ],
    footer: ["1 signed decision", "recorded"],
    thread: [
      "03 / The trade-off is explicit",
      "The first release is smaller. The logic stays with it.",
      "Maya",
      "That makes the next release a continuation, not a restart.",
      "15:42",
      "9 replies",
    ],
  },
  {
    phase: "04 / Share the whole context",
    project: "Project hand-off",
    status: "shared",
    active: 3,
    description:
      "Share one project, not a folder of fragments. The milestones, the task threads, and the decisions travel together.",
    milestones: [
      "Invite the project team",
      "Open the shared workspace",
      "Continue with the reason intact",
    ],
    decision: [
      "APR 25 · SI / IM",
      "A guest sees this project — and nothing else.",
      "The boundary is clear enough to collaborate without making the whole studio public.",
      "PROJECT TEAM",
    ],
    footer: ["4 collaborators / one project", "shared"],
    thread: [
      "04 / Context arrives together",
      "The new team should not have to reconstruct the old one.",
      "Isuru",
      "They will enter with the decisions, not just the deliverables.",
      "09:06",
      "12 replies",
    ],
  },
];

/** Which phase a scroll progress (0–1) lands on. */
const phaseAt = (progress) =>
  Math.min(PHASES.length - 1, Math.floor(progress * 4.2));

/**
 * coLab's featured scroll scene, ported to the pixel from the reference
 * motion source: a sticky stage the visitor scrubs through by scrolling a
 * 240svh track. `--progress` (0–1) is written straight to the DOM on scroll
 * — every transform (the board's rotate/scale, the thread's rise, the
 * milestone rail's fill) reads it directly via CSS, so those stay perfectly
 * in sync with the scrollbar. Only the discrete phase index goes through
 * React state, since that's the only thing that needs a re-render.
 */
export default function ColabFeature() {
  const scrollRef = useRef(null);
  const stageRef = useRef(null);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const phaseIndexRef = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const track = scrollRef.current;
      const stage = stageRef.current;
      if (!track || !stage) return;

      const rect = track.getBoundingClientRect();
      const progress = Math.max(
        0,
        Math.min(1, -rect.top / (track.offsetHeight - window.innerHeight)),
      );
      stage.style.setProperty("--progress", progress.toFixed(3));

      const next = phaseAt(progress);
      if (next !== phaseIndexRef.current) {
        phaseIndexRef.current = next;
        setPhaseIndex(next);
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

  const phase = PHASES[phaseIndex];
  const activeMilestone = Math.min(2, phase.active);

  return (
    <section
      aria-labelledby="colab-feature-title"
      className={styles.scroll}
      data-brand={colab.accent}
      id="colab"
      ref={scrollRef}
    >
      <div className={styles.stage} ref={stageRef}>
        <p className={styles.kicker}>
          Featuring <ProductName product={colab} />
        </p>

        <div className={styles.copy}>
          <h2 id="colab-feature-title">
            The work moves.
            <br />
            <span>The reason stays.</span>
          </h2>
          <p>{phase.description}</p>
        </div>

        <div aria-label="coLab project workspace" className={styles.board}>
          <div className={styles.boardChrome}>
            <strong className={styles.boardName}>
              co<span>lab</span>
            </strong>
            <span className={styles.mono}>project / 01</span>
          </div>

          <div className={styles.boardProject}>
            <div>
              <p>Research platform</p>
              <h3>{phase.project}</h3>
            </div>
            <span className={styles.boardStatus}>{phase.status}</span>
          </div>

          <div className={styles.boardBody}>
            <div className={styles.milestones}>
              <div className={styles.boardLabel}>
                <span>Milestones</span>
                <span>{String(phase.active + 1).padStart(2, "0")} / 04</span>
              </div>
              <div className={styles.track}>
                {phase.milestones.map((label, i) => (
                  <div
                    className={`${styles.milestone} ${i <= activeMilestone ? styles.active : ""}`}
                    key={i}
                  >
                    <time>{["APR 14", "APR 18", "APR 22"][i]}</time>
                    <b>{label}</b>
                    <span>
                      {
                        [
                          "Research / scoped",
                          "Engineering / ready",
                          "Team / pending",
                        ][i]
                      }
                    </span>
                    <span aria-hidden="true" className={styles.milestoneDot} />
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.decisionPane}>
              <div className={styles.boardLabel}>
                <span>Decision log</span>
                <span>signed</span>
              </div>
              <div className={styles.decisionCard}>
                <time>{phase.decision[0]}</time>
                <b>{phase.decision[1]}</b>
                <p>{phase.decision[2]}</p>
                <div className={styles.decisionBy}>
                  <span>{phase.decision[3]}</span>
                  <span>✓</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.boardFooter}>
            <span>{phase.footer[0]}</span>
            <span>{phase.footer[1]}</span>
          </div>
        </div>

        <div aria-live="polite" className={styles.thread}>
          <div className={styles.threadTop}>
            <span>{phase.thread[0]}</span>
            <span>discussion</span>
          </div>
          <div className={styles.threadBody}>
            <div className={styles.threadMessage}>{phase.thread[1]}</div>
            <div className={styles.threadReply}>
              <b>{phase.thread[2]}</b> <span>{phase.thread[3]}</span>
            </div>
            <div className={styles.threadMeta}>
              <span>{phase.thread[4]}</span>
              <span>{phase.thread[5]}</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
