# Tmi Jarkko Karilahti – website concept (Hades Design)

Speculative redesign concept for Tmi Jarkko Karilahti, a car detailing business in Joensuu
("auton fiksaus"). **Demo – not the company's official website.** All pages are `noindex`.

- Live demo: https://samijturunen01.github.io/tmi-jarkko-karilahti-demo/
- Original site: https://toiminimi-jarkko-karilahti.webnode.fi/

## Stack

React 19, Vite, TypeScript, Tailwind CSS 4, React Router 7, GSAP, Lucide. Static prerendering for every route
(GitHub Pages compatible, direct links and refreshes work).

## Development

```bash
npm install
npm run dev       # dev server
npm run build     # type check + build + prerender into dist/
npm run preview   # serve dist/ under the GitHub Pages base path (port 4327)
npm test          # Playwright end-to-end + accessibility tests (run build first)
```

Configuration: `.env.example` (`VITE_BASE_PATH`, `SITE_URL`, `VITE_FORM_MODE`, `VITE_ALLOW_INDEXING`).
Deployment: `.github/workflows/deploy.yml` (lint → build → tests → GitHub Pages).

## Documentation

`docs/PROJECT_STATUS.md` (start here) · `docs/CONTENT_SOURCES.md` · `docs/CONVERSION_STRATEGY.md` ·
`docs/REDESIGN_IMPROVEMENTS.md` · `docs/CONVERSION_MEASUREMENT.md` · `docs/ASSET_PROVENANCE.md` ·
`docs/IMAGE_REPLACEMENT_LIST.md`
