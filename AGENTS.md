# AGENTS

## Project overview
- Next.js 14 (App Router) marketing site using React 18.
- Styling is plain Tailwind CSS over a CSS-variable design system. There is no
  component library — NextUI and framer-motion were removed.
- Two fonts, loaded in `app/layout.js` with `next/font`: Inter (`--font-sans`,
  which is what heroui.pro itself sets) and JetBrains Mono (`--font-mono`, used
  for labels and numerals).

## The design system

> **The spec is `docs/design-handoff.html`.** Open it in a browser. Every token,
> size, radius, duration and contrast ratio in it was read out of heroui.pro's
> compiled stylesheet (`chunks/29qranzd3vz4s.css`) and rendered markup on
> 19 Aug 2026 — it is measured, not estimated, and it is the reference this
> codebase is built to. When this file and the handoff disagree, the handoff
> wins and this file is the thing to correct. The document is built in the
> system it documents, so its own cards and buttons are live specimens.

The palette is **heroui.pro's, duplicated** — values read out of their live
stylesheet (`/_next/static/immutable/chunks/29qranzd3vz4s.css`), not estimated.
It is baked into `:root` in `app/globals.css`; it is not a variant any more.

**It is not the `@heroui/theme` library palette.** The library primary is
`#006fee`; their marketing site runs `#0485f7` and keeps the library's `success`
and `warning`. "HeroUI's colours" is ambiguous — this is the site's.

The language, in four rules:

1. **The ground is grey (`#f5f5f5`) and a card is the same grey.** Their landing
   card resolves to `--landing-card-background: var(--background)` — the page
   colour — with a 1px `#dedee0` border at 24px radius and `p-6`. The border is
   the *only* thing that makes it an object. There is **no fill gradient, no
   hue wash, no dot field, no shadow and no hover lift** on a card anywhere in
   their stylesheet; hover moves the border colour and nothing else.

   An earlier pass here washed the product hue up from the card foot and added
   a masked dot field. Both were removed — the wash is exactly what read as
   faded next to the reference, and their only dot pattern belongs to the
   colour-picker component, not to cards. Two things that look like card
   treatments but are not: that dot field, and the `--surface` shadow token,
   which they use on overlays, dialogs and form fields only.

   **Colour on a card lives in the graphic inside it, at full saturation** —
   never in the panel behind the copy.

   **Beams** remain the one borrowed effect: a narrow gradient window swept
   across an SVG in user space, so one animation lights whichever part of a
   curve it crosses and the paths themselves never move. Their window is 34px
   on `cubic-bezier(0.16, 1, 0.3, 1)`, staggered 4–6.5s so a set never pulses
   in unison, with two stops running hue → lighter step and transparent at both
   ends. `BeamGradient` in `ProductBento.js` is that, parameterised; `--beam-a`
   / `--beam-b` resolve per card from the product hue. Ours travel
   left-to-right where theirs go right-to-left, because on these cards the flow
   has a direction — a scan arriving, work advancing — and reading against it
   would be wrong. Under `prefers-reduced-motion` the beams are removed
   entirely rather than frozen, which would strand a bright patch mid-curve;
   the static connector lines still draw.
1b. **One measure, one grid, one ground.** `.shell` is 62rem (992px), their
   standard section measure; `.shell-wide` is 73.25rem (1172px) for full-bleed
   showcase graphics only. `.bento` is a fixed six-column grid with a 16px
   gutter — not an auto-fit track list — and cards span 2, 3 or 6 of it so the
   spans always sum to a whole row. It collapses to two columns below `lg` and
   to one capped at 500px and centred below `md`, which is the ladder their
   markup carries. Sections do **not** alternate fills: `.section-subtle` is
   the same `#f5f5f5` as everything else and is separated by a rule, because a
   lighter band under a card that is itself the ground colour inverts the
   reference and leaves the card darker than the band it sits in.

1c. **There are no gradient fills.** Not on buttons, not on icons, not on
   chips, not on the closing panel — their stylesheet contains none, and no
   coloured drop shadow under any of them either. `.btn-gradient` keeps its
   name and is a flat `--brand` fill hovering to a 10% snow mix; `.icon-tile`
   is not a tile at all (see 1e); `.gradient-panel` is flat
   `#18181b`, their dark surface. The one `linear-gradient` left in the
   stylesheet is `.bento-fade`, which is a transparent-to-ground fade rather
   than a colour ramp. Buttons are 40/36/44px at 24px radius, 14px weight 500,
   pressing to `scale(0.97)` — 0.98 small, 0.96 large, which is theirs.

1d. **Two additions the reference does not have**, both made at direction and
   both built from their card rather than invented alongside it:

   - `.statement` — the founders' note after the hero. Type on the ground at
     the 32px size, no card, no rule, no quotation mark.
   - `.cloud` — the chat-cloud frame on the three design principles. Their card
     exactly (same ground fill, same 1px border, same 24px radius) plus a tail.
     The tail is a rotated square carrying two of the card's borders, with a
     second pseudo-element masking the segment of the card's own bottom border
     it joins — without that mask the border runs straight across the mouth of
     the tail, because the fill and the page are the same colour.

   `.mark` is the highlighted word inside a cloud. It takes `--brand-soft` as a
   fill and `--brand-text` as the type, both from the card's own brand scope —
   **never the raw semantic hues.** `#17c964` and `#f5a524` as text measure
   2.01:1 and 1.87:1 on the ground and are unreadable; the scope values were
   already measured against exactly this tint. A highlight is a fill, and a
   fill only has to clear 3:1.

1e. **Icons are strokes, not tiles.** By direction: no filled square, no soft
   tint, no shape of any kind behind an icon — just the line drawing in the
   scope's colour. `.icon-tile` keeps its name because it is on four call sites
   and still marks "the icon that heads a card", but it draws no tile. It
   needs `align-self: flex-start`: the explicit width it used to carry is what
   kept it off the left edge of a flex-column card, and without one it
   stretches and centres its own content.

   `--brand` is the right token for a stroke. WCAG 1.4.11 asks 3:1 of a
   graphical object and every scope clears it on the ground — violet 5.23,
   blue 4.74, clay 4.43, emerald 3.46, cyan 3.43, amber 3.06. A stroke is not
   type and does not owe 4.5:1.

2. **The display heading is two-tone.** `.display-tone` is flat
   `--display-muted` grey on its own line — not a gradient, despite the ramp
   tokens still existing for fills. It reads as emphasis and de-emphasis.
3. **Colour appears once above the fold**, as a plain blue line of text.
   `.pill` has no border, background or chip behind it. The section eyebrow is
   the same idea: `text-accent`, 16px, weight 500, with **nothing drawn beside
   it** — the gradient dash that used to head `.eyebrow` is not in their markup
   and has been removed.
4. **Size carries hierarchy, not weight.** Every heading in their stylesheet is
   `font-medium` — there is no 600 or 700 anywhere in their type. The scale is
   72 / 48 / 32 / 20 at weight 500, body 16 at 400, and all three of their
   tracking values (`-1.08px`, `-0.72px`, `-0.48px`) are `-0.015em` of their
   own size, so one letter-spacing serves the lot. Bolding a heading to give it
   emphasis visibly leaves the system.

   Two card-title sizes exist and are **not** interchangeable: 14px/500 title
   with 12px body is their compact showcase tile; feature cards (`p-6`, 240px+)
   take 20px/500 with 16px body. Ours are feature cards.

**Product hues are six distinct colours**, one per product — a deliberate
departure from heroui.pro, whose chart hues are steps of one accent ramp. That
works for a site selling one product and made four of these six the same blue.
NSQR keeps the house accent as the flagship; the rest are spaced around the
wheel. Every fill clears 3:1 on the ground (a card is that same `#f5f5f5`, so
there is one ground to clear, not two) and every `--brand-text` clears 4.5:1.

**NSQR is violet and coLab is blue**, which is what the `accent` field in
`site.js` has always said. An earlier pass had the two swapped when the palette
was mapped onto HeroUI's scales; the data was right and the mapping was wrong.
Lipd Hub keeps its amber and AES is red, both by direction.

**A product's trade name is its logo.** Each one is an established two-tone
lockup — head in ink, tail in the product's own colour — rendered by
`ProductName` and set in its tinted pill by `.brand-tag`. Cards and product
heroes lead with it. Do not draw product icons: a set of bespoke marks was
tried and removed, because these lockups already are the marks and an icon
beside one only repeats it.

**The tail is text.** `.lockup-tail` resolves `--brand-text`, which clears
4.5:1 on the `#f5f5f5` ground **and on the lockup's own tinted pill**. The pill
is the tighter of the two and is what set the values — the teal, green and
amber tails all cleared the ground comfortably and failed on their own chip. Never set a tail to `--brand`, which is a fill and is
only held to 3:1.

**AES is "Automated AI-based Essay Scoring", not Advanced Encryption
Standard.** The initials and the studio's cryptography work both point the
wrong way, and the old `score` motif key had already half-lost it. Do not give
it a cipher mark.

**CONTRAST: this palette fails WCAG in seven places, deliberately.** It is
their design, duplicated at explicit direction after every failure was measured
and reported. `--text-muted` on the ground is 4.43:1; the accent as text is
3.38:1 (a card is the ground colour now, so there is one figure, not two);
white on an accent fill is 3.59:1; `--display-muted` — their `text-muted/60`,
which resolves to `#a6a6ab` — is 2.22:1 against a 3.0 floor;
danger/success/warning as text are 4.09/2.01/1.87. The full ledger, with the
dark-theme figures, is in `docs/design-handoff.html`. **Do not silently "fix" these** — the corrected values live
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
  the founders' note, the design principles, principles and all product
  content. Every page reads from here.
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
- `app/components/ProductBento.js`: the home page's products section, built to
  heroui.pro's "What's included" bento. The measurements are theirs, read out
  of their markup: a 992px container, `grid-cols-6` at `gap-4`,
  `rounded-[24px]` cards with a solid border, row heights 400 / 280 / 288, and
  their breakpoints (two columns under `lg`, one under `md` with every card at
  `col-span-1` and the grid capped at 500px). **Their row three is three
  `col-span-2` cards — we have six products where they have seven cards, so
  ours is two `col-span-3`s.** That is the only deviation.
  Each card is a fixed-height frame with copy at the top and a graphic bleeding
  out of the bottom, faded into the surface by a
  `linear-gradient(to bottom, transparent, var(--surface))` overlay. That fade
  is what lets an illustration run past the frame without the card containing
  it — keep it if the graphics change. The graphics themselves are ours; theirs
  demo their own component library and would say nothing here.
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
  500 and goes on icon strokes, dots and rules. Anything that sets a
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
