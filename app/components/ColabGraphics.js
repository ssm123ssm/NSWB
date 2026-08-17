"use client";

import { useCallback, useState } from "react";
import { CheckIcon } from "./Icons";
import {
  colabEditRefusal,
  colabSceneDecisions,
  colabSceneMilestones,
  colabSceneTasks,
} from "../data/site";

/**
 * The hero illustration on the coLab page: one project, from the plan down to
 * the work, with the reasoning kept beside it.
 *
 * Markup and CSS rather than an image or a video, like the Vault scene — it
 * inherits the product accent, follows the theme toggle, stays sharp at any
 * size, and costs nothing to download. It is a small client island; /colab
 * itself is still a server component.
 *
 * The scene used to advance on a 12s loop and show only the plan and the work.
 * The decision log — the thing the page's headline is actually about, and the
 * only part of coLab a shared to-do list cannot imitate — was nowhere in it.
 * Now the milestones are the reader's to pick, and each one opens the decision
 * that was settled on that date.
 *
 * The Edit button is the point of the whole scene and is meant to fail. A
 * product that explains its own constraint by refusing is more convincing than
 * the paragraph beside it, and it answers the page's own FAQ — "Can a decision
 * be edited afterwards?" — before the reader scrolls to it.
 *
 * The task rows keep their staggered entrance and are decorative, so they stay
 * `aria-hidden`; the timeline and the log are real controls and real content.
 */
export function ColabScene() {
  const [active, setActive] = useState(0);
  const [refused, setRefused] = useState(false);
  const [superseded, setSuperseded] = useState(false);

  const milestone = colabSceneMilestones[active];
  const record = colabSceneDecisions[active];
  const shown = superseded ? record.supersede : record;

  const select = useCallback((index) => {
    setActive(index);
    setRefused(false);
    setSuperseded(false);
  }, []);

  return (
    <div className="colab-scene">
      <div className="colab-scene-head">
        <span>product-launch</span>
        <span>4 people · 3 decisions logged</span>
      </div>

      {/* The milestone rail. Positions come from the data as percentages, so a
          date can move without anything here needing to know about it. The
          fill stops at whichever milestone is open rather than advancing on a
          timer — the reader is the clock now. */}
      <div className="colab-track">
        <span className="colab-track-line" aria-hidden="true" />
        <span
          className="colab-track-fill"
          style={{ width: `${milestone.at}%` }}
          aria-hidden="true"
        />
        {colabSceneMilestones.map((point, index) => (
          <button
            className="colab-milestone"
            type="button"
            key={point.label}
            style={{ "--at": `${point.at}%` }}
            onClick={() => select(index)}
            aria-pressed={index === active}
          >
            <span className="colab-milestone-node" aria-hidden="true" />
            {point.label}
          </button>
        ))}
      </div>

      <div className="colab-rows" aria-hidden="true">
        {colabSceneTasks.map((task, index) => (
          <div
            className="colab-row"
            data-done={task.state === "Done" ? "" : undefined}
            key={task.title}
            style={{ "--i": index }}
          >
            <span className="colab-box">
              <CheckIcon className="colab-check h-2.5 w-2.5" />
            </span>
            <span className="colab-row-title">{task.title}</span>
            <span className="colab-row-owner">{task.owner}</span>
            <span className="colab-row-state colab-state" data-state={task.state}>
              {task.state}
            </span>
          </div>
        ))}
      </div>

      <div className="colab-decision">
        <div className="colab-decision-head">
          <span>
            {milestone.date} · decision log
            {superseded ? " · superseding entry" : ""}
          </span>
          <span className="colab-decision-lock" data-state={refused ? "refused" : "locked"}>
            {refused ? "Edit refused" : "Signed · locked"}
          </span>
        </div>

        <div className="colab-decision-body">
          <p className="colab-decision-question">{shown.question}</p>
          <p className="colab-decision-answer">{shown.answer}</p>

          {superseded ? (
            <p className="colab-decision-supersedes">
              Supersedes the entry of {record.recorded.slice(0, 10)}, which stays in the log
              exactly as it was written.
            </p>
          ) : null}

          <p className="colab-decision-sig">
            <span>{shown.author}</span>
            <span>{shown.recorded}</span>
            <span>sig {shown.signature}</span>
          </p>

          <div className="colab-decision-actions">
            <button
              className="colab-decision-btn"
              type="button"
              onClick={() => setRefused(true)}
              disabled={refused}
            >
              Edit this decision
            </button>
            <button
              className="colab-decision-btn"
              type="button"
              onClick={() => {
                setSuperseded(true);
                setRefused(false);
              }}
              disabled={superseded}
            >
              Add a superseding entry
            </button>
          </div>

          <p className="colab-decision-refusal" role="status" hidden={!refused}>
            {colabEditRefusal}
          </p>
        </div>
      </div>
    </div>
  );
}
