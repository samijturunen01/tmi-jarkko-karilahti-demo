# Redesign improvements – audit of the existing site

Existing site: https://toiminimi-jarkko-karilahti.webnode.fi/ (free Webnode site, audited 19.11.2026).

| Area | Finding on the existing site | Improvement in the concept |
| --- | --- | --- |
| First impression | Home page = header slogan, one Volvo XC40 photo and two sentences; Webnode "Luo kotisivut ilmaiseksi" banner | Full hero: H1 "Kiilto takaisin. Auton fiksaus Joensuussa…", value proposition with prices, CTAs, trust facts, signature intro |
| Brand | Logo used as a small raster JPG; Webnode template look; free-site domain | Logo vectorised 1:1, own "Tarkastusvalo" design system built from the logo's black + blue K |
| Value proposition | Only in the footer text | Above the fold and repeated per service |
| Navigation / IA | 4 pages + "Lisää" menu; no service pages | Etusivu, Palvelut (+5 service pages), Hinnasto, Referenssit, Yhteystiedot, 404 |
| Services | Plain list; 4 of 9 images are third-party stock pictures (≈275 px) | Each service explained (need → what you get → price → proof → FAQ), only own photos |
| Pricing | Separate list, inconsistent formatting ("alk.200€") | Clean price list with notes, prices shown on every service, interactive price builder that pre-fills the quote form |
| References | ~95 photos in unlabelled galleries; captions ambiguous | 17 described cases + 14 more cars, filters, captions, work tags, lightbox, honest before/after pairs |
| Trust | No person, no business ID, no location context | Owner portrait + quote, Y-tunnus, since 2019, hall location, company customer reference |
| Contact | Unclickable phone, obfuscated email, minimal form | Click-to-call/email, 3-step quote form with validation and live estimate, map + directions |
| Mobile | Template-responsive only | Mobile-first layout, sticky call/quote bar, ≥44 px targets, no horizontal overflow (tested 360–1440 px) |
| Accessibility | Images without alt text, low-contrast template text | Alt texts, semantic headings, keyboard support, focus styles, reduced motion; axe checks pass |
| Local SEO | Generic titles, no structured data | Unique titles/descriptions per page, AutomotiveBusiness + Service + FAQ + Breadcrumb JSON-LD (verified facts only), sitemap prepared |
| Performance | Webnode scripts, third-party trackers | Static prerendered pages, responsive WebP, lazy loading, no third-party requests until the map is requested |
| Security / HTTPS | Webnode subdomain over HTTPS | Production: own domain + HTTPS to be configured (not part of the demo) |

## Most commercially meaningful changes

1. Prices + quote builder everywhere → fewer uncertain visitors, better-qualified requests.
2. Authentic before/after proof (same headlight, same day) → credibility for the visible, low-threshold service.
3. One-person business turned into a strength: "Yksi tekijä, oma nimi ovessa."
4. Fast contact on mobile (call/quote bar, preselected form).
