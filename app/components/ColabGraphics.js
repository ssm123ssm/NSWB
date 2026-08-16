import { CheckIcon } from "./Icons";
import { colabSceneMilestones, colabSceneTasks } from "../data/site";

/**
 * The hero illustration on the coLab page: one project, from the plan down to
 * the work, with a week passing over it.
 *
 * Markup and CSS rather than an image or a video, like the Vault scene — it
 * inherits the product accent, follows the theme toggle, stays sharp at any
 * size, and costs nothing to download. It is a server component, so /colab
 * ships no client JS beyond the contact dialog.
 *
 * What it shows is the page's whole argument in one frame: dates across the
 * top, the work planned against them underneath, and the states moving. It is
 * not a screenshot and does not pretend to be one — a real screenshot would go
 * stale on the next release, and at this size would be unreadable anyway.
 *
 * `aria-hidden` because it restates the copy beside it, and reading out four
 * task rows and a counter would be noise rather than information.
 */
export function ColabScene() {
  return (
    <div className="colab-scene" aria-hidden="true">
      <div className="colab-scene-head">
        <span>product-launch</span>
        <span className="state-swap">
          <span className="colab-before">4 open</span>
          <span className="colab-after">1 open</span>
        </span>
      </div>

      {/* The milestone rail. Positions come from the data as percentages, so a
          date can move without anything here needing to know about it. */}
      <div className="colab-track">
        <span className="colab-track-line" />
        <span className="colab-track-fill" />
        {colabSceneMilestones.map((milestone) => (
          <span
            className="colab-milestone"
            key={milestone.label}
            style={{ "--at": `${milestone.at}%` }}
          >
            <span className="colab-milestone-node" />
            {milestone.label}
          </span>
        ))}
      </div>

      <div className="colab-rows">
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
            <span className="colab-row-state state-swap">
              <span className="colab-before colab-state" data-state="To do">
                To do
              </span>
              <span className="colab-after colab-state" data-state={task.state}>
                {task.state}
              </span>
            </span>
          </div>
        ))}
      </div>

      <div className="colab-scene-foot">
        <span>4 people</span>
        <span className="state-swap">
          <span className="colab-before">nothing decided yet</span>
          <span className="colab-after">2 decisions logged</span>
        </span>
      </div>
    </div>
  );
}
