/**
 * The three venues the papers on this page were published in, set as plain
 * type rather than traced artwork — each one's real mark is already just its
 * own name in a particular case and weight (arXiv's mixed case, PLOS's small
 * caps pair, bmc's lowercase mark plus its journal name), so reproducing the
 * typography is enough to read as "the logo" without copying anyone's actual
 * graphic. Muted to `--display-muted` — the same flat grey the two-tone
 * display heading uses for its second line — so the row sits as a quiet
 * credential behind the hero rather than competing with it.
 */
export default function VenueLogos() {
  return (
    <div className="grid gap-9 text-right" style={{ color: "var(--display-muted)" }}>
      <ArxivMark />
      <PlosMark />
      <BmcMark />
    </div>
  );
}

function ArxivMark() {
  return (
    <span className="text-[2.25rem] font-semibold leading-none tracking-[-0.02em]">
      <span className="italic">ar</span>
      Xiv
    </span>
  );
}

function PlosMark() {
  return (
    <span className="text-[2rem] font-extrabold leading-none tracking-[0.01em]">
      PLOS <span className="font-medium tracking-[0.04em]">ONE</span>
    </span>
  );
}

function BmcMark() {
  return (
    <div className="grid justify-items-end gap-1">
      <span className="text-[2rem] font-extrabold lowercase leading-none tracking-[-0.02em]">bmc</span>
      <span className="text-[0.6875rem] font-semibold uppercase leading-none tracking-[0.14em]">
        Medical Education
      </span>
    </div>
  );
}
