import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import RequestAccessLink from "./RequestAccessLink";

const LEGAL_DIR = path.join(process.cwd(), "content", "legal");

/**
 * Reads a policy document and peels off its leading `# Heading` and the
 * `**Last updated: …**` line that follows it, so both can be rendered as a
 * proper page header rather than as body prose.
 */
function readDoc(file) {
  const raw = fs.readFileSync(path.join(LEGAL_DIR, file), "utf8");
  const lines = raw.split("\n");

  let title = null;
  let updated = null;
  let cursor = 0;

  while (cursor < lines.length) {
    const line = lines[cursor].trim();

    if (!line) {
      cursor += 1;
      continue;
    }
    if (!title && line.startsWith("# ")) {
      title = line.slice(2).trim();
      cursor += 1;
      continue;
    }
    if (title && !updated && line.startsWith("**Last updated:")) {
      updated = line.replace(/\*\*/g, "").replace("Last updated:", "").trim();
      cursor += 1;
      continue;
    }
    break;
  }

  return { title, updated, body: lines.slice(cursor).join("\n") };
}

/** Tables get their own scroll container so a wide row never widens the page. */
const components = {
  table: ({ node, ...props }) => (
    <div className="legal-table-scroll">
      <table {...props} />
    </div>
  ),
  a: ({ node, href = "", ...props }) =>
    href.startsWith("/") ? (
      <Link href={href} {...props} />
    ) : (
      <a href={href} rel="noreferrer" target="_blank" {...props} />
    ),
};

export default function LegalDoc({ doc }) {
  const { title, updated, body } = readDoc(doc.file);

  return (
    <main id="main">
      <section className="border-b border-[color:var(--border)]">
        <div className="shell pb-10 pt-12">
          <div className="legal-measure">
            <Link className="link-muted text-sm" href="/legal">
              ← All policies
            </Link>
            <p className="eyebrow mt-6">{doc.scope}</p>
            {/* Held smaller than a marketing hero — a document masthead, not a
                headline, so the dense body below reads as one continuous text. */}
            <h1 className="mt-3 text-[clamp(1.75rem,3.4vw,2.5rem)] font-bold tracking-tight">
              {title ?? doc.title}
            </h1>
            {updated && (
              <p className="mt-4 font-[family-name:var(--font-mono)] text-xs text-faint">
                Last updated {updated}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Not `.section` — its 3.5–6.5rem block padding is set for marketing
          sections and opens too wide a gap before the first clause. */}
      <section className="pb-24 pt-10">
        <div className="shell">
          <article className="legal-measure legal-prose">
            <Markdown components={components} remarkPlugins={[remarkGfm]}>
              {body}
            </Markdown>
          </article>

          <p className="legal-measure mt-14 border-t border-[color:var(--border)] pt-8 text-sm text-faint">
            Questions about this document?{" "}
            {/* Opens the contact dialog rather than linking to /#contact: the
                home page closes on the NSQR plate now, so that anchor is gone. */}
            <RequestAccessLink className="link-arrow text-sm" label="Get in touch" />
          </p>
        </div>
      </section>
    </main>
  );
}

export { readDoc };
