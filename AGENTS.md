# AGENTS

## Project overview
- Next.js 14 (App Router) marketing site using React 18.
- Styling is plain Tailwind CSS over a CSS-variable design system. There is no
  component library — NextUI and framer-motion were removed.
- Two fonts, loaded in `app/layout.js` with `next/font`: Plus Jakarta Sans
  (`--font-sans`) and IBM Plex Mono (`--font-mono`, used for eyebrows, labels
  and numerals).

## The design system — BLANK SLATE
The neurasense brand handoff has been stripped out and **nothing has replaced
it**. The site is deliberately undesigned right now: greyscale ground and ink,
square corners, no elevation, no gradient, no hue anywhere. The four rules the
handoff imposed — weights capped at 400, roughly one violet per screen, a 4.5:1
contrast floor audited by script, mono as a marker of machine output — no
longer apply, and neither does the layout rule that two thirds of any layout
should be empty. Nothing has been put in their place yet.

**What survived is structure.** Every token *name* the components layer reads is
still defined, and all ~230 component classes still resolve, so every page lays
out and reads exactly as it did — it simply carries no aesthetic decision.
Filling a value into `:root` in `app/globals.css` is how a decision gets made,
and it propagates site-wide from that one place.

**Do not quietly re-introduce a design.** If a change needs a colour, a radius,
a shadow or a weight, that is a decision to raise, not to default. Picking a
plausible blue in passing is how the last two systems got built by accident.

Decisions still outstanding, roughly in the order they matter:
1. **The accent.** `--accent` currently resolves to ink so buttons and focus
   rings still read. There is no house colour.
2. **The six product accents.** `[data-brand="violet|blue|cyan|emerald|amber|
   clay"]` all collapse to ink in one rule. The attribute names and every
   `accent` field in `app/data/site.js` are untouched, so real hues drop
   straight in.
3. **The categorical screen scale.** `[data-hue]` (eight hues) and the `--pop`
   triples were a *second and third* palette living down in the components
   layer, outside the token block — undocumented, and contradicting the "never
   hardcode a colour" rule this file used to state. Both are neutralised at
   their own definitions. This one is a real loss and should be re-decided
   early: a status column where every state is the same grey tells the reader
   nothing.
4. **Radius, elevation, and type.** `--radius*` are `0`, `--shadow-*` are
   `none`, and headings are a flat 600 with normal tracking.

**`scripts/contrast.py` is stale** — it encodes the old violet palette and is
not a gate. Re-point it at whatever palette replaces this, if that guarantee is
wanted back.

**Deliberately not stripped:** the NSQR hero illustration
(`app/components/NsqrScene.js` + `.module.css`) keeps its own internal palette —
indigo, mint, coral, sun. It is hand-drawn artwork rather than a token, ~40 SVG
stops deep, and flattening it to grey would destroy the drawing while telling
you nothing about structure. It is therefore the one saturated thing left on
the site, and it is an open decision, not a settled one.

## Key paths
- `app/data/site.js`: **single source of truth** for products, capabilities,
  principles and Vault content. Every page reads from here.
- `app/layout.js`: root layout, metadata defaults, organization schema.
- `app/globals.css`: design tokens + all component classes.
- `app/components/`: shared UI (`SiteChrome`, `SiteHeader`, `SiteFooter`,
  `ContactDialog`, `ProductCard`, `Icons`, …).
- `app/page.js`, `app/products/page.js`: the home page and the product index.
- `app/research/page.js`: the publications page, read from `publications` in
  `site.js`. Adding a paper there is the whole edit. Set as a numbered
  bibliography (`.pub-*`) under a masthead that carries the page title and
  nothing else — no eyebrow, no lead. Links are DOIs and
  arXiv abstracts, never Google Scholar URLs, which carry a profile id and stop
  resolving; no citation counts, which nothing here can keep current.
- `app/nsqr/`, `app/vault/`, `app/colab/`: the three product detail pages, each
  with its own `opengraph-image.js`. NSQR is the short one; Vault and coLab are
  long-form and share their two structural pieces — `StepRail` (`.flow` in
  globals) and the comparison ledger (`.ledger-*`). Neither is Vault's any
  more, so change them with both pages in mind.
- `app/api/contact/route.js`: contact + access-request intake.
- `content/legal/*.md`: policy prose. `app/legal/` renders it — index,
  `/legal/website-privacy`, and `/legal/nsqr/[slug]` for the three NSQR
  documents. `app/components/LegalDoc.js` does the reading and rendering.
- `public/`: static assets.

## Commands
- `npm run dev` / `npm run build` / `npm run start` / `npm run lint`.

## Conventions
- **Content changes go in `app/data/site.js`, not in JSX.** Adding a product
  there makes it appear on the home page, the products index and the footer.
- **Legal prose is the one exception**, and lives in `content/legal/*.md` —
  these are legal instruments edited as whole documents under their own
  review, not site copy. `site.js` still holds the registry (`legalDocs`:
  titles, routes, summaries); only the body text lives in markdown.
  `react-markdown` + `remark-gfm` render it server-side, so the pages ship no
  client JS. Each paragraph must stay on **one line** — `.legal-prose p` sets
  `white-space: pre-line` so the address blocks keep their line breaks, which
  means a hard-wrapped paragraph would render with breaks mid-sentence.
- **Never hardcode a colour.** Everything resolves to a token in
  `app/globals.css`: `--bg`, `--bg-subtle`, `--surface`, `--border`,
  `--border-strong`, `--text`, `--text-muted`, `--text-faint`, `--accent`,
  `--accent-text`, `--brand`, `--brand-text`. This rule was *stated* before and
  not kept — three separate palettes had grown up in the components layer. It
  now holds: `globals.css` has no hex outside `:root`. Keep it that way.
- **`--brand` is a fill; `--brand-text` is for words.** Anything that sets a
  colour on text uses `--brand-text` (or `--accent-text`). The distinction is
  currently invisible — both are ink — but it is what makes a real palette drop
  in safely later, so keep honouring it.
- **The wordmark** is `Wordmark` in `app/components/Wordmark.js`: lowercase,
  `neura` and `sense`, set entirely in ink for now. It stands alone — no avatar
  or logo beside it. `ProductName` is the equivalent for products and reads its
  lockup from `site.js`.
- **One theme, and it is white.** The site had a derived dark theme, a
  `data-theme` attribute on `<html>`, a pre-paint script and a `ThemeToggle`;
  all four are gone. A colour therefore gets **one** definition. Do not add a
  `data-theme` selector, a `prefers-color-scheme` block, a second `themeColor`
  entry, or a dark variant of anything — there is no switch left to serve them,
  so they would be dead rules that read as live ones.
- **Per-product accent.** Put `data-brand="violet|blue|cyan|emerald|amber|clay"`
  on a wrapper and `--brand` / `--brand-soft` / `--brand-text` resolve for
  everything inside it. The names are historical and the values are all ink
  today, but the wiring is intact — keep using the attribute so a palette can
  land in one edit.
- **The page is white throughout.** There are no dark sections: a section that
  needs more weight uses `.section-subtle`, a `.glow`, or `.grid-field` — never
  a locally pinned dark palette.
- **`.brand-tag`** is the product lockup set in a `--brand-soft` chip (home
  hero, Vault hero). Pair it with a `.badge` for status.
- Pages are server components. Anything needing the contact dialog uses the
  small client islands `ContactButton` / `RequestAccessLink` rather than
  becoming a client component itself.
- No tests are configured in this repo. Verify with `npm run build` +
  `npm run lint`.

## Delivery
- `app/api/contact/route.js` fans a submission out to every channel configured
  in the environment — Resend email (`RESEND_API_KEY` + `CONTACT_FROM_EMAIL`,
  landing at `CONTACT_TO_EMAIL`) and a Slack/Teams webhook
  (`CONTACT_WEBHOOK_URL`) — and returns success if any one accepts it. With
  none set it logs, which is the local-development path. See `.env.example`.
- Resend is called over plain `fetch`, not its SDK, to keep the dependency
  list as short as it is.

## Known gap
- The intake route is public and unauthenticated, with no rate limiting. If
  it draws spam, that is the next thing to add.
