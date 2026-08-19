# AGENTS

## Project overview
- Next.js 14 (App Router) marketing site using React 18.
- Styling is plain Tailwind CSS over a CSS-variable design system. There is no
  component library — NextUI and framer-motion were removed.
- Two fonts, loaded in `app/layout.js` with `next/font`: Plus Jakarta Sans
  (`--font-sans`) and IBM Plex Mono (`--font-mono`, used for eyebrows, labels
  and numerals).

## The design system
The palette is **heroui.pro's, duplicated** — values read out of their live
stylesheet (`/_next/static/immutable/chunks/29qranzd3vz4s.css`), not estimated.
It is baked into `:root` in `app/globals.css`; it is not a variant any more.

**It is not the `@heroui/theme` library palette.** The library primary is
`#006fee`; their marketing site runs `#0485f7` and keeps the library's `success`
and `warning`. "HeroUI's colours" is ambiguous — this is the site's.

The language, in four rules:

1. **The ground is grey (`#f5f5f5`) and cards are white.** That inversion is
   why surfaces lift without a shadow, and why `.card` carries none. A section
   that wants more weight uses `.section-subtle`, which inverts to a white band.
2. **The display heading is two-tone.** `.display-tone` is flat
   `--display-muted` grey on its own line — not a gradient, despite the ramp
   tokens still existing for fills. It reads as emphasis and de-emphasis.
3. **Colour appears once above the fold**, as a plain blue line of text.
   `.pill` has no border, background or chip behind it.
4. **Weight carries hierarchy.** 700 display at `-0.045em`, 600 headings, 500
   controls, 400 body. Inter.

**Product hues are steps of the accent's own OKLab lightness ramp**
(`oklch(from var(--accent) calc(l ± .12) c h)`), which is how their charts are
built, with static hex declared first as a fallback. **This makes four of the
six products the same blue**, so colour no longer tells them apart. That is
faithful to a site selling one product; watch it on `/products`. Six distinct
hues are a fifteen-line change — `[data-palette="hues"]` already holds them.

**CONTRAST: this palette fails WCAG in seven places, deliberately.** It is
their design, duplicated at explicit direction after every failure was measured
and reported. `--text-muted` on the ground is 4.43:1; the accent as text is
3.68:1 on a card and 3.38:1 on the ground; white on an accent fill is 3.68:1;
`--display-muted` is 2.33:1 against a 3.0 floor; danger/success/warning as text
are 4.09/2.01/1.87. **Do not silently "fix" these** — the corrected values live
in `[data-palette="corrected"]`, which keeps `#0485f7` as a *fill* (a fill needs
only 3:1) and darkens it to `#0067c9` only where it becomes small type. Moving
to it is one attribute on `<html>`.

**The design lab is gone.** Typeface (Inter), radius, elevation and density are
all settled on the defaults, so the panel, the alternate typefaces and the
shape/elevation/density/type variant CSS are removed. A production build now
carries no trace of any of it.

**Two alternative palettes remain, and they are not leftovers.** They are
escape hatches for the two known costs of duplicating heroui.pro, each one
attribute on `<html>` away:

- `[data-palette="corrected"]` — the same palette with the seven WCAG failures
  fixed.
- `[data-palette="hues"]` — six distinct product hues instead of four steps of
  one blue ramp, for when "every product is blue" stops working.

Delete either once it is clear it will never be wanted.

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
