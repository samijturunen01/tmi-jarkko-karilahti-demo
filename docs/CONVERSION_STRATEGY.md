# Conversion strategy – Tmi Jarkko Karilahti

## Business model (verified vs. assumed)

- **Verified:** one-person car detailing business (toiminimi, since 2019) in a hall unit at Aspitie 17, Salpakangas,
  Joensuu. Sells fixed-price services (wash 39 €, interior 65 €, upholstery 60 €, ozone 110 €) and quote-based
  "from" services (paint correction + protection from 200/350 €, headlights from 50/150 €/pair). Also rents an
  ozone generator (20 €/day). Contact by phone, email or the site's message form.
- **Assumed:** most revenue per job comes from paint correction + coatings; customers bring the car to the hall
  by appointment; most customers are private car owners, with some company vehicles (Teokem example).

## Primary customer segments

1. **Car owners preparing to sell or "refresh" a car** – faded, scratched paint, yellow headlights. Need: visible
   result, price certainty, proof it works on older cars.
2. **Owners of newer / valued cars** – want protection (ceramic/nano). Need: trust in workmanship, warranty facts.
3. **Everyday maintenance** – hand wash, interior cleaning, odour removal. Need: price, quick contact, location.
4. **Companies** – van/fleet protection (Teokem). Need: references, invoicing contact.

## Main pain points & objections

- "What will it cost?" → alkaen-prices create uncertainty.
- "Is it worth it for my old car?"
- "Does it really work?" → need before/after proof.
- "Who does the work, is it a real business?" → one-person firm with a free Webnode site looks fragile.
- "Where is it / how do I book?"

## Verified strengths used on the site

Published prices · 31 cars of authentic references incl. same-day before/after headlight photos · ceramic coating
1-year warranty / up to 3 years · broad menu from wash to ozone · company customer reference (Teokem Oy) ·
local hall in Salpakangas · owner's own words and face · business ID since 2019.

## Goals

- **Primary conversion:** quote/appointment request (form) or phone call → `form_submit_success`, `phone_click`.
- **Secondary:** email click, price-builder use, directions click, reference gallery views, service page visits.

## Customer journey

Hero (what + where + price anchor) → service index with prices → proof (before/after) → explanation of paint
correction + protection options → references → the person (trust) → 3-step process → FAQ → closing CTA.
Every service page: need → what you get + prices → proof → FAQ → CTA with the service preselected.

## Conversion barriers addressed

| Barrier on the old site | Redesign response |
| --- | --- |
| Home page is one photo + two sentences | Clear H1, value proposition, two CTAs and trust facts above the fold |
| Prices hidden on a separate plain page | Prices visible in hero, service index, service pages and an interactive price builder |
| Stock images on the services page | Only the company's own photos |
| References as unlabelled photo dumps | Filterable cases with captions, work tags, before/after pairs, lightbox |
| Generic form, obfuscated email, unclickable phone | Click-to-call everywhere, sticky mobile call/quote bar, service-preselected quote form with live price total |
| No proof of the person/business | Owner portrait, quote, business ID, location |
| Webnode ads and "Luo kotisivut ilmaiseksi" badge | Removed – own brand only |

## Conversion hypotheses (to be measured, not promised)

1. Showing prices next to every service reduces "what does it cost" calls and raises qualified requests.
2. The price builder → preselected form increases form completion for multi-service jobs.
3. Same-day before/after headlight photos increase headlight requests (an easy, low-price entry service).
4. The mobile sticky call/quote bar increases phone contacts from mobile visitors.
5. Asking for the car model up front improves quote accuracy (fewer back-and-forth messages).

## Measurement

See `CONVERSION_MEASUREMENT.md`. Events are prepared in `src/lib/analytics.ts`; nothing is sent in the demo.
