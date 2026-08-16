# AGENTS

## Project overview
- Next.js 14 (App Router) marketing site using React 18.
- Styling is plain Tailwind CSS over a CSS-variable design system. There is no
  component library — NextUI and framer-motion were removed.
- Two fonts, loaded in `app/layout.js` with `next/font`: Plus Jakarta Sans
  (`--font-sans`) and IBM Plex Mono (`--font-mono`, used for eyebrows, labels
  and numerals).

## The brand system
The site follows the neurasense brand handoff. Four rules govern it, and they
are not preferences:
1. **Weights stay between 300 and 400.** No 500+ anywhere. Hierarchy comes from
   size, space and one accent — never from bold. Display type (`h1`, `h2`,
   `.display`, `.statement-body`) is 300; everything else is 400. Tailwind's
   weight scale is replaced in `tailwind.config.js` so heavier classes do not
   exist, and only 300/400 are loaded in `app/layout.js`. The brand names one
   exception — the `ns` avatar at 500 — which the site does not use.
2. **Roughly one violet element per screen.** A button, a rule, or a live
   indicator — not all three. Violet washes (`--accent-soft`, `.glow`) are
   surfaces, not accents, and do not count. Never place two violets adjacent.
3. **Contrast is a hard limit.** Every text pair clears 4.5:1. Run
   `python3 scripts/contrast.py` after touching any colour — it derives the
   text-safe companions and audits both themes.
4. **Mono marks what the machine produced** — paths, timestamps, states,
   hashes, IDs, labels. The sans is anything a person wrote.

Layout: two thirds of any layout should be empty. `.section` and `.shell` carry
most of that; resist filling the space.

## Key paths
- `app/data/site.js`: **single source of truth** for products, capabilities,
  principles and Vault content. Every page reads from here.
- `app/layout.js`: root layout, metadata defaults, pre-paint theme script.
- `app/globals.css`: design tokens + all component classes.
- `app/components/`: shared UI (`SiteChrome`, `SiteHeader`, `SiteFooter`,
  `ContactDialog`, `ProductCard`, `Icons`, …).
- `app/page.js`, `app/products/page.js`, `app/vault/page.js`: the three pages.
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
  `--accent-text`, `--brand`, `--brand-text`. Reuse the component classes
  (`.shell`, `.section`, `.card`, `.btn`, `.badge`, `.field-input`,
  `.eyebrow`, `.lead`) before writing new CSS.
- **`--brand` is a fill; `--brand-text` is for words.** The product accents are
  the brand's chart hues, which are fills only — icon tiles, rules, dots,
  motifs. Anything that sets a colour on text uses `--brand-text` (or
  `--accent-text`), which is the same hue moved until it clears 4.5:1.
- **The wordmark** is `Wordmark` in `app/components/Wordmark.js`: lowercase,
  `neura` in ink and `sense` in violet, never bold, never inverted, never below
  19px. It stands alone — no avatar or logo beside it. `ProductName` is the
  equivalent for products and reads its lockup from `site.js`.
- **Theming.** Light/dark is driven by `data-theme` on `<html>`, set before
  first paint by the inline script in `app/layout.js` and toggled by
  `ThemeToggle`. Any new colour must be declared for both themes.
- **Per-product accent.** Put `data-brand="violet|blue|cyan|emerald|amber|clay"`
  on a wrapper and `--brand` / `--brand-soft` / `--brand-text` resolve for
  everything inside it. The names are historical; the values are the brand's
  chart set. `violet` is the house violet rather than chart 1 — NSQR shares the
  parent's colour so that two different violets never sit side by side.
- **Every page follows the light/dark theme.** There are no always-dark
  sections: a section that needs more weight uses `.section-subtle`, a `.glow`
  tinted with `var(--brand)`, or `.grid-field` — never a locally pinned dark
  palette, which would ignore the theme toggle.
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
