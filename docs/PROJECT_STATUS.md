# Project status – Tmi Jarkko Karilahti (Hades Design concept demo)

- **Company:** Tmi Jarkko Karilahti – auton fiksaus, Aspitie 17 (halliosake 33), 80100 Joensuu. Y-tunnus 2986233-3.
- **Original website:** https://toiminimi-jarkko-karilahti.webnode.fi/
- **Instructions:** `C:\VERKKOSIVUT\Prompt.md` (Master Prompt V2.0, not modified). No extra user instructions.
- **Repository:** https://github.com/samijturunen01/tmi-jarkko-karilahti-demo
- **Live demo:** https://samijturunen01.github.io/tmi-jarkko-karilahti-demo/
- **Current phase:** 13 – deployment (see "Deployment status").

## Conversion strategy (summary)

Primary goal: quote/appointment request (form) or phone call. Prices are the strongest differentiator → shown
everywhere and turned into a price builder that pre-fills the form. Proof via authentic references and same-day
before/after headlight photos. Details: `CONVERSION_STRATEGY.md`.

## Creative direction – "Tarkastusvalo" (inspection light)

Detailers inspect paint under a raking light that reveals swirl marks. The site is a night-time showroom:
lacquer-black sections (#0b0d10), cool paper reading sections (#f3f4f1) and the logo's electric blue K (#3434f4).
Bricolage Grotesque (display) + Inter Tight (body). Motion: one signature light sweep, light-wipe photo reveals,
a glint on primary CTAs; calm elsewhere.

- **Signature intro (home):** a light beam sweeps across a hazed, swirl-marked photo of real work (Volvo V90) and
  leaves mirror gloss; the authentic logo is written in part by part and the blue K catches a glint (~1.8 s).
  Copy and CTAs are visible from first paint. Plays on every full load/refresh (no storage); skipped on in-app
  navigation and with reduced motion. State in `.hero-stage[data-intro]`.
- **Signature interaction:** honest before/after comparison – two separate same-day photos side by side with a
  draggable light-bar divider (native range input).

## Pages

Etusivu · Palvelut · 5 service pages (maalipinta, ajovalot, käsinpesu & vahaus, sisätilat, otsonointi) ·
Hinnasto (price builder) · Referenssit (filters + lightbox, `?auto=<id>` deep links) · Yhteystiedot (quote form,
click-to-load Google Map) · branded 404.

## Tech

React 19 + Vite 8 + TypeScript + Tailwind 4 + React Router 7, GSAP for the intro. Every route is prerendered
(`scripts/prerender.mjs`) with its own title/description/OG/JSON-LD → works on GitHub Pages without SPA hacks.
Form delivery is an adapter (`src/lib/forms/submit.ts`): demo mode now, Google Apps Script + reCAPTCHA v3 later.

## Commands

```
npm install
npm run dev          # http://127.0.0.1:5173/tmi-jarkko-karilahti-demo/
npm run build        # tsc + vite build + prerender
npm run preview      # serves dist/ like GitHub Pages on :4327
npm test             # Playwright (desktop + mobile, incl. axe)
npm run images       # rebuild WebP variants from source-assets/original (git-ignored)
node scripts/trace-logo.mjs  # re-vectorise the logo
```

## Testing status

- `tsc`, ESLint, production build: pass.
- Playwright: 97 tests (desktop 1440 + Pixel 7) – pages, navigation, scroll behaviour, intro, reduced motion,
  form validation/demo submit, price builder, before/after, lightbox, map, structured data, no tracking, axe
  WCAG 2.2 AA (serious/critical). All pass locally.
- Manual screenshot review at 360 / 390 / 768 / 1024 / 1440 px.

## Known issues / decisions

- Owner portrait is low resolution (720 px) – recommended replacement in `IMAGE_REPLACEMENT_LIST.md`.
- Port 4318 was occupied by another project's preview server, so this project uses 4327.
- Open questions for the customer: `CONTENT_SOURCES.md` → "Needs customer confirmation".

## Asset permissions

User confirmed permission for the company's logo and photos (Master Prompt §8). Only the company's own images are
used; third-party stock images and the Wunderbaum artwork from the original site are excluded. See `ASSET_PROVENANCE.md`.

## Next recommended action

Present the demo to the owner; collect answers to the confirmation list; then production setup (domain, Apps Script
+ reCAPTCHA, privacy policy, analytics with consent, `VITE_ALLOW_INDEXING=true`).
