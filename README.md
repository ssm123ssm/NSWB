# Neurasense — marketing site

Next.js 14 (App Router) marketing site for Neurasense.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts: `npm run build`, `npm run start`, `npm run lint`.

## Structure

| Path | Purpose |
| --- | --- |
| `app/data/site.js` | Single source of truth for all site content |
| `app/globals.css` | Design tokens + component classes |
| `app/components/` | Shared header, footer, dialog, cards, icons |
| `app/page.js` | Home |
| `app/products/page.js` | Product index |
| `app/vault/page.js` | Vault product page |
| `app/api/contact/route.js` | Contact / access-request intake |

## Editing content

Add or change a product in `app/data/site.js` and it updates the home page,
the products index and the footer at once. Set `status: "live"` with an `app`
URL for a shipped product, or `status: "development"` to surface a
"Request access" flow instead.

## Theming

Light and dark are driven by `data-theme` on `<html>`. The preference is read
from `localStorage` (`ns-theme`), falling back to the OS setting, and applied
before first paint by an inline script in `app/layout.js`.

All colours resolve to CSS variables — see `app/globals.css`. Per-product
accents are applied with
`data-brand="violet | blue | cyan | emerald | amber | clay"` on any wrapper
element, giving `--brand` (a fill) and `--brand-text` (its text-safe
companion).

The palette, type and layout follow the neurasense brand handoff — the four
rules are summarised in `AGENTS.md`. Every text pair is checked at 4.5:1 by
`python3 scripts/contrast.py`; run it after changing any colour.

## Environment

Copy `.env.example` to `.env.local` and fill in.

| Variable | Required | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | For email | Resend API key. Enables email delivery of contact + access-request submissions. |
| `CONTACT_FROM_EMAIL` | With the above | Sender address, on a domain verified with Resend. Email delivery fails without it. |
| `CONTACT_TO_EMAIL` | No | Where enquiries land. Defaults to `hello@neurasense.io`. |
| `CONTACT_WEBHOOK_URL` | No | Slack/Teams incoming webhook. Independent of email. |

A submission is sent to every channel configured and succeeds if any one of
them accepts it, so email and the webhook can run together or on their own.
**With neither configured, submissions are only written to the server log.**
