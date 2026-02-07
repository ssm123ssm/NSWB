# AGENTS

## Project overview
- Next.js 14 (App Router) marketing site using React 18.
- Styling via Tailwind CSS and NextUI (`@nextui-org/react`).
- Custom fonts loaded in `app/layout.js` with `next/font`.

## Key paths
- `app/page.js`: main landing page.
- `app/products/page.js`: products page.
- `app/layout.js`: root layout + metadata + font variables.
- `app/globals.css`: global styles and Tailwind layers.
- `public/`: static assets.

## Commands
- `npm run dev`: start dev server.
- `npm run build`: production build.
- `npm run start`: run production server.
- `npm run lint`: ESLint.

## Conventions
- Use App Router routes: create folders under `app/` with `page.js`.
- Prefer Tailwind utility classes and NextUI components for UI work.
- Keep layout-level changes in `app/layout.js`; global styles in `app/globals.css`.
- No tests are configured in this repo.
