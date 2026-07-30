# AGENTS

## Project overview
- Next.js 14 (App Router) marketing site using React 18.
- Styling is plain Tailwind CSS over a CSS-variable design system. There is no
  component library — NextUI and framer-motion were removed.
- Two fonts, loaded in `app/layout.js` with `next/font`: Inter (`--font-inter`)
  and JetBrains Mono (`--font-mono`, used for eyebrows, labels and numerals).

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
  `--brand`. Reuse the component classes (`.shell`, `.section`, `.card`,
  `.btn`, `.badge`, `.field-input`, `.eyebrow`, `.lead`) before writing new CSS.
- **Theming.** Light/dark is driven by `data-theme` on `<html>`, set before
  first paint by the inline script in `app/layout.js` and toggled by
  `ThemeToggle`. Any new colour must be declared for both themes.
- **Per-product accent.** Put `data-brand="cyan|violet|emerald|amber|blue"` on a
  wrapper and `--brand` / `--brand-soft` resolve for everything inside it.
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

## Known gap
- `app/api/contact/route.js` validates and logs submissions but only delivers
  them if `CONTACT_WEBHOOK_URL` is set. Wire an email provider before launch.
