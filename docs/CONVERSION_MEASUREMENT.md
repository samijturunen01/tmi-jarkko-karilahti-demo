# Conversion measurement plan (future production)

Nothing is tracked in the demo: no analytics, pixels or cookies. Events are prepared in `src/lib/analytics.ts`
(`track()` only logs to the console in development). Never send personal data (names, phone numbers, emails,
free text, registration numbers) in events.

## Metrics

| Level | Metric | Notes |
| --- | --- | --- |
| Primary | Qualified quote/appointment requests (form submits + phone calls) per month | Count form submissions in Apps Script and calls in the phone log |
| Micro-conversions | `phone_click`, `email_click`, `form_start`, `price_builder_quote`, `directions_click` | Intent signals – **not** sales |
| Engagement | Service page views, `service_interest`, `before_after_interact`, `gallery_open`, `price_builder_add` | Content effectiveness |
| Business outcome | Confirmed bookings and revenue (owner's own records) | Only these prove business value |

## Events

| Event | Fired when | Parameters |
| --- | --- | --- |
| `cta_click` | Any primary/secondary CTA | `location`, `label` |
| `phone_click` | Tap on a tel: link | `location` |
| `email_click` | Tap on a mailto: link | `location` |
| `form_start` | First interaction with the quote form | `form` |
| `form_validation_error` | Submit with errors | `fields` (count) |
| `form_submit_success` | Successful submit | `topics` (count), `demo` |
| `price_builder_add` | Item ticked in the price list | `item` |
| `price_builder_quote` | "Pyydä tarjous valituista" | `items` (count) |
| `service_interest` | Service link in index/overview | `service`, `location` |
| `before_after_interact` | First drag of the comparison divider | `case` |
| `gallery_open` | Reference lightbox opened | `project` |
| `map_load` | Visitor loads the Google map | – |
| `directions_click` | "Katso reittiohjeet" | – |
| `facebook_click` | Facebook link | `location` |

## Implementation requirements

- Consent banner (or a cookieless analytics tool) before any tracking; privacy policy (tietosuojaseloste).
- GA4 via GTM or a privacy-friendly alternative (e.g. Plausible) – hook in `track()` (`window.dataLayer.push`).
- Mark `form_submit_success` and `phone_click` as key events; never as "purchases".

## Baseline

The current Webnode site exposes no analytics data to us. Record 1–3 months of baseline (requests/month, calls
from the site) after launch before evaluating changes.

## Future optimisation ideas (test with real data)

- Hero headline variants ("Kiilto takaisin." vs. price-led headline).
- CTA wording "Pyydä tarjous" vs. "Kysy vapaata aikaa".
- Price builder placement on service pages.
- Form completion rate with/without the "Toivottu ajankohta" field.
- Mobile bar: call vs. quote share.
