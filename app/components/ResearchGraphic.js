import { ArrowIcon, CheckIcon } from "./Icons";

/**
 * One small graphic per publication, drawing the actual thing the paper did
 * rather than a generic chart — same object language as the product bento
 * (`ProductBento.js`): a literal checklist, a literal marking comparison, a
 * literal pipeline, not a stock bar/scatter render. Each one still carries
 * the paper's own reported numbers, just staged as the object the paper is
 * actually about.
 *
 * Each reads `var(--brand)` / `var(--brand-text)`, so its colour comes from
 * whichever `data-brand` scope the publication's `<li>` carries in
 * research/page.js — one hue per paper.
 *
 * Each graphic sits under a publication's summary, in a fixed-height frame
 * (`.pub-graphic` in globals.css) so the card's height stays predictable
 * regardless of how tall its abstract runs.
 */

const graphics = {
  "sisu-athwala": CounsellorChecklist,
  "saq-scoring": ScoreCompare,
  "clinical-alignment": ExpandGuessRefine,
  "rag-summarization": PipelineFlow,
};

export default function ResearchGraphic({ paperId }) {
  const Graphic = graphics[paperId];
  if (!Graphic) return null;
  return (
    <div aria-hidden="true" className="pub-graphic">
      <Graphic />
    </div>
  );
}

/** Sisu Athwala — the expert student counsellors' review of the system's
 *  feedback, staged as the review itself: each criterion checked off, at the
 *  rate the paper reports agreement for it. The same checked-list object
 *  `VaultGraphic` uses for its own promises, because this is the same kind
 *  of fact — a list of things confirmed, not a distribution to plot. */
function CounsellorChecklist() {
  const items = [
    { label: "Addressed strengths & weaknesses", value: 100 },
    { label: "Gave clear, actionable plans", value: 90 },
    { label: "Stress management advice helpful", value: 92 },
    { label: "Study technique guidance useful", value: 60 },
  ];
  return (
    <div className="grid h-full content-center gap-2">
      {items.map((item) => (
        <div className="flex items-center gap-2.5" key={item.label}>
          <span
            className="grid h-5 w-5 shrink-0 place-items-center rounded-full"
            style={{ background: "var(--brand-soft)", color: "var(--brand-text)" }}
          >
            <CheckIcon className="h-3 w-3" />
          </span>
          <span className="flex-1 truncate text-[0.75rem] leading-snug">{item.label}</span>
          <span
            className="shrink-0 text-[0.75rem] font-semibold tabular-nums"
            style={{ color: "var(--brand-text)" }}
          >
            {item.value}%
          </span>
        </div>
      ))}
    </div>
  );
}

/** SAQ scoring — two marked scripts, not a scatter of dots: the AI's rubric
 *  marking next to the examiner's, landing on the same score, which is what
 *  a Pearson's r of 0.93–0.96 actually means in the world the paper is
 *  about. The rubric lines are the same object `VaultGraphic`'s checklist
 *  and `AesGraphic`'s bars already use, just marked by two graders. */
function ScoreCompare() {
  const rubric = [100, 70, 90];
  const scripts = [
    { label: "AI marking", score: "18/20" },
    { label: "Examiner", score: "18/20" },
  ];
  return (
    <div className="grid h-full content-center gap-2.5">
      <div className="flex items-center justify-center gap-3">
        {scripts.map((script, i) => (
          <div className="contents" key={script.label}>
            {i === 1 && (
              <span className="shrink-0 text-base font-bold" style={{ color: "var(--brand-text)" }}>
                ≈
              </span>
            )}
            <div
              className="flex w-24 flex-col items-center gap-1 rounded-[14px] border p-2.5"
              style={{ borderColor: "var(--border-strong)", background: "var(--surface)" }}
            >
              <div className="grid w-full gap-1">
                {rubric.map((w, j) => (
                  <span
                    className="h-1 rounded-full"
                    key={j}
                    style={{ width: `${w}%`, background: "var(--brand)" }}
                  />
                ))}
              </div>
              <span className="mt-0.5 text-[0.9375rem] font-bold leading-none" style={{ color: "var(--brand-text)" }}>
                {script.score}
              </span>
              <span className="text-[0.65rem] text-faint">{script.label}</span>
            </div>
          </div>
        ))}
      </div>
      <p className="text-center text-[0.7rem] leading-tight text-faint">
        r = 0.93–0.96 against two examiners
      </p>
    </div>
  );
}

/** Aligning LLMs for clinical tasks — the method's own three named steps,
 *  as a rail rather than a plain bar pair, ending in the one accuracy jump
 *  the paper reports. Same node-and-line object `ColabGraphic` draws for a
 *  timeline, held static since this is a fact about a paper rather than a
 *  live state. */
function ExpandGuessRefine() {
  const steps = ["Expand", "Guess", "Refine"];
  return (
    <div className="grid h-full content-center gap-4">
      <div className="relative flex items-center justify-between px-3">
        <div className="absolute inset-x-3 top-3 h-px" style={{ background: "var(--border-strong)" }} />
        {steps.map((label, i) => (
          <div className="relative z-10 flex flex-col items-center gap-1.5" key={label}>
            <span
              className="grid h-6 w-6 place-items-center rounded-full text-[0.65rem] font-semibold"
              style={{ background: "var(--brand)", color: "var(--accent-on)" }}
            >
              {i + 1}
            </span>
            <span className="text-[0.7rem] text-faint">{label}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-2">
        <span className="text-[0.9375rem] font-semibold tabular-nums text-faint line-through">59.44%</span>
        <ArrowIcon className="h-3.5 w-3.5" style={{ color: "var(--brand-text)" }} />
        <span className="text-[0.9375rem] font-bold tabular-nums" style={{ color: "var(--brand-text)" }}>
          70.63%
        </span>
        <span className="text-[0.7rem] text-faint">USMLE accuracy</span>
      </div>
    </div>
  );
}

/** RAG + representative vector summarisation — the retrieval pipeline the
 *  paper diagrams, as an actual rail of stages rather than scaled SVG text,
 *  which is what made the first pass render oversized: HTML nodes size at
 *  the font they're set, not at whatever a viewBox happens to stretch to. */
function PipelineFlow() {
  const nodes = ["Document", "Chunks", "Embeddings", "Vector DB", "Retrieval"];
  return (
    <div className="grid h-full content-center gap-3">
      <div className="relative flex items-center justify-between px-1">
        <div className="absolute inset-x-1 top-1.5 h-px" style={{ background: "var(--border-strong)" }} />
        {nodes.map((label, i) => (
          <div className="relative z-10 flex flex-col items-center gap-1.5" key={label}>
            <span
              className="h-3 w-3 rounded-full border-2"
              style={{
                borderColor: "var(--brand)",
                background: i === nodes.length - 1 ? "var(--brand)" : "var(--surface)",
              }}
            />
            <span className="whitespace-nowrap text-[0.65rem] text-faint">{label}</span>
          </div>
        ))}
      </div>
      <p className="text-center text-[0.7rem] leading-tight text-faint">
        Build-time indexing, query-time retrieval
      </p>
    </div>
  );
}
