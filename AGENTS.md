# AGENTS

## Project overview
- Next.js 14 (App Router) marketing site using React 18.
- Styling is plain Tailwind CSS over a CSS-variable design system. There is no
  component library — NextUI and framer-motion were removed.
- Two fonts, loaded in `app/layout.js` with `next/font`: Plus Jakarta Sans
  (`--font-sans`) and IBM Plex Mono (`--font-mono`, used for eyebrows, labels
  and numerals).

## The design system
The site runs on **HeroUI's design language**. The values are not an impression
of it — they are lifted from `@heroui/theme@2.4.26` itself
(`dist/colors/semantic.js` for the palette, `dist/default-layout.js` for radius,
elevation and the type scale) and written into `:root` in `app/globals.css`.
Nothing from HeroUI is installed or bundled: this is a plain Tailwind site that
adopts their tokens and builds its own components on top.

The neurasense brand handoff it replaced is gone — weights capped at 400, one
violet per screen, the audited 4.5:1 floor, mono as a marker of machine output,
and the rule that two thirds of a layout stay empty. None of them apply.

What replaces them:

1. **Weight carries hierarchy.** 700 display, 600 headings, 500 controls, 400
   body. Inter, which is what HeroUI itself sets. Tailwind's full weight scale
   is available; the config no longer truncates it.
2. **The palette is meant to be seen.** One saturated primary (`#006fee`) spent
   freely — buttons, links, icon tiles, gradients, tinted chips, blurred colour
   fields behind a hero. There is no per-screen accent budget.
3. **Everything is rounded and elevated.** A card is a raised object: large
   radius, soft wide shadow, a lift on hover. Radii come from the `--radius-*`
   ladder and nothing is square.
4. **The house gradient is one gradient.** `--grad-from` → `--grad-to`, blue
   into cyan by default and re-pointed per product by `data-brand`. It appears
   as `.gradient-text`, `.btn-gradient`, `.icon-tile`, `.brand-mark`,
   `.gradient-panel` and the hero blobs — always the same pair, never a second
   one invented locally.

**Fixed copy.** The hero headline and lead in `hero` (`app/data/site.js`) are
the two lines the studio is named by and are **not to be rewritten**:
"We think about what breaks — before it breaks" and "A studio for software,
cryptography, and applied AI. Nothing here is assumed to work." The headline is
split into head/tail only so the tail can carry the gradient; `headlinePlain`
holds it whole for metadata and OG images. Product names and the `legalDocs`
registry are likewise fixed.

**The design lab is temporary.** `app/components/DesignLab.js` plus the
"DESIGN LAB VARIANTS" block in `globals.css` exist only to choose a direction:
a dev-only panel writes `data-palette`, `data-type`, `data-radius`,
`data-elevation` and `data-density` onto `<html>` and the variant rules
re-point the tokens under the whole site. It never renders in production (the
`isDev` guard in `layout.js`), and the alternate typefaces are fetched at
runtime rather than through `next/font` so a production build carries no trace
of them. The component itself is still bundled into the layout chunk, so it is
dead weight until it goes. **Once a direction is chosen, the winning values
move up into `:root` and the component, the variant block and the axis list all
get deleted together.**

**The `mono` palette is heroui.pro duplicated exactly**, tokens read out of
their live stylesheet (`/_next/static/immutable/chunks/29qranzd3vz4s.css`), not
approximated. Two things to know about it:

- **Their marketing palette is not the `@heroui/theme` palette.** The library
  primary is `#006fee`; theirs is `#0485f7`. They kept the library's `success`
  and `warning` and changed the blue. So "use HeroUI's colours" is ambiguous —
  ask which.
- **Their product/chart hues are derived from the accent by OKLab lightness**
  (`oklch(from var(--accent) calc(l ± .12) c h)`) rather than being separate
  hues. Duplicating that makes all six products blue. If product identity is
  wanted back, the `neutral` palette is the version with six distinct hues.

**It fails WCAG in seven places and that is deliberate** — it is their design,
kept faithfully at the user's explicit direction after the failures were
reported. `--muted` on the ground is 4.43:1, the accent as text is 3.68:1 on a
card and 3.38:1 on the ground, white on an accent fill is 3.68:1, and danger /
success / warning as text are 4.09 / 2.01 / 1.87. **`mono-fixed` is the same
palette with the smallest corrections that pass** — critically, it keeps
`#0485f7` as a *fill* (a fill only needs 3:1) and darkens it to `#0067c9` only
where it becomes small type. That split is what lets it stay recognisably their
blue. Do not "simplify" the two into one.

**Gradients must clear 4.5:1 along their whole length.** Every ramp here is
darkened until white type clears 4.6:1 at both ends. This is not fussiness:
HeroUI's bright scales carry white at 2.0–2.4:1, and the first cut of this
rebuild shipped a house gradient ending in `#06b7db` — 2.39:1 under the white
type on every gradient button, icon tile and panel. The same ramp is also used
as `.gradient-text` on white, so a light endpoint is unreadable there too, which
is why "keep it vivid and put ink on it" is not an escape. `--grad-on` is the
token for the type colour on a gradient fill; it is white everywhere today, and
it exists so that the constraint has somewhere to live rather than being
rediscovered.

Contrast is no longer machine-audited. `scripts/contrast.py` is stale — it
encodes the old violet palette and is not a gate. The text tokens here
(`--text`, `--text-muted`, `--text-faint`, `--brand-text`, `--accent-text`) were
chosen to read on both white and their own soft tint, but nothing checks it on
every change.

Layout: `.shell` is 80rem and sections are dense — separation comes from card
edges and tinted bands rather than from empty space.

## Key paths
- `app/data/site.js`: **single source of truth** for the hero copy, products,
  capabilities, principles and all product content. Every page reads from here.
- `app/layout.js`: root layout, Inter + JetBrains Mono, metadata defaults,
  organization schema.
- `app/globals.css`: design tokens + all component classes. ~1,000 lines, down
  from the 4,100 the old system had grown to.
- `app/components/ProductSections.js`: the shared furniture for the three
  product pages — `ProductHero`, `FeatureBento`, `StepList`, `PricingCards`,
  `FaqList`, `ProductClosing`. Each product page is the same sections in a
  different order with different data, so a change to the language lands on all
  three at once. Every section expects a `data-brand` ancestor; the page sets
  it once on its `<main>`.
- `app/components/`: the rest of the shared UI (`SiteChrome`, `SiteHeader`,
  `SiteFooter`, `ContactDialog`, `Wordmark`, `Icons`, …).
- `app/page.js`, `app/products/page.js`: the home page and the product index.
- `app/research/page.js`: the publications page, read from `publications` in
  `site.js`. Adding a paper there is the whole edit. Links are DOIs and arXiv
  abstracts, never Google Scholar URLs, which carry a profile id and stop
  resolving; no citation counts, which nothing here can keep current.
- `app/nsqr/`, `app/vault/`, `app/colab/`: the three product detail pages, each
  a thin composition of `ProductSections` plus its own `opengraph-image.js`.
- `app/components/ShareCard.js`: the one OG card layout. Satori's CSS parser is
  much narrower than a browser's — it rejects the page's radial dot-matrix
  outright, so the card carries a linear-gradient grid instead. Test an OG route
  after touching it; a parse failure is a 500, not a fallback.
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
  `app/globals.css`: `--bg`, `--bg-subtle`, `--bg-sunken`, `--surface`,
  `--border`, `--border-strong`, `--text`, `--text-muted`, `--text-faint`,
  `--accent`, `--accent-text`, `--brand`, `--brand-text`, `--grad-from`,
  `--grad-to`. This rule was *stated* under the old system and not kept — three
  separate palettes had grown up in the components layer. It holds now:
  `globals.css` has no hex outside `:root`. Keep it that way. The one exception
  is `ShareCard.js` and the OG routes, which are rendered by Satori outside the
  document and cannot read a CSS variable.
- **`--brand` is a fill; `--brand-text` is for words.** `--brand` is the hue's
  500 and goes on icon tiles, dots, rules and gradients. Anything that sets a
  colour on text uses `--brand-text` (or `--accent-text`), which is the 600/700
  step chosen to read on both white and its own soft tint.
- **Per-product accent.** Put `data-brand="violet|blue|cyan|emerald|amber|clay"`
  on a wrapper and `--brand`, `--brand-soft`, `--brand-text`, `--grad-from` and
  `--grad-to` all resolve for everything inside it. The attribute names are
  historical — they are what every `accent` field in `site.js` already says —
  and the values are HeroUI's semantic scales (primary, secondary, cyan,
  success, warning, danger). "violet" is the house blue; nothing is purple
  except coLab.
- **Reuse the component classes** before writing new CSS: `.shell`, `.section`,
  `.section-subtle`, `.card`, `.card-hover`, `.card-tinted`, `.bento`, `.btn`
  (+ `.btn-gradient` / `.btn-solid` / `.btn-flat` / `.btn-bordered` /
  `.btn-ghost`), `.pill`, `.chip`, `.icon-tile`, `.gradient-text`,
  `.gradient-panel`, `.eyebrow`, `.lead`, `.section-title`, `.check-list`,
  `.steps`, `.field-input`.
- **The wordmark** is `Wordmark` in `app/components/Wordmark.js`: a rounded
  gradient mark carrying `n`, then the name — `neura` in ink and `sense` in the
  house gradient, at 700. Pass `markOnly` where there is no room for the name.
  `ProductName` is the equivalent for products and reads its lockup from
  `site.js`.
- **One theme, and it is white.** A colour gets **one** definition. Do not add a
  `data-theme` selector, a `prefers-color-scheme` block, a second `themeColor`
  entry, or a dark variant of anything — there is no switch left to serve them,
  so they would be dead rules that read as live ones.
- **The page is white throughout.** There are no dark sections. A section that
  needs more weight uses `.section-subtle` (a `--bg-sunken` band), a `.blob`,
  `.grid-field` (a dot matrix), or — for a closing call — a `.gradient-panel`.
  Never pin a local dark palette.
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
