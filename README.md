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
accents are applied with `data-brand="cyan | violet | emerald | amber | blue"`
on any wrapper element.

## Environment

| Variable | Required | Purpose |
| --- | --- | --- |
| `CONTACT_WEBHOOK_URL` | Recommended | Slack/Teams incoming webhook that receives contact + access-request submissions. **Without it, submissions are only written to the server log.** |
