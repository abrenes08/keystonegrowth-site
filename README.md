# Keystone Growth website

Static bilingual marketing website for keystonegrowth.org. Existing IONOS/custom-domain setup is retained; no hosting migration or new JavaScript framework is required.

## Pages

- `/` and `/en/`: English (canonical `/en/`).
- `/es/`: Spanish.
- Existing privacy, terms, swipe-file and thank-you URLs remain available.

## Edit and verify

Edit bilingual copy in `tools/build_pages.py`, shared styling in `assets/site.css`, and form/menu behavior in `assets/site.js`.

```sh
python3 tools/build_pages.py
python3 tools/check_site.py
node --check assets/site.js
node tools/check_form.mjs
```

The build script uses Python's standard library. Generated HTML is committed, so production does not need Python, Node, or a build step. Upload/sync the repository root and preserve `en/`, `es/`, and `assets/` directories. Keep the existing `CNAME`.

Local preview: use an ordinary static HTTP server at the repository root. The optional `tools/preview.sh` stages an ignored `dist/` copy for the Work preview service. Neither `dist/` nor `.openai/` belongs in production source.

## Branding

Montserrat is self-hosted, with its OFL license in `assets/fonts/OFL.txt`. Core palette: navy `#041C35`, soft white `#F6F6FA`, lime `#C4FA00`. Founder image is optimized from the existing `founder.JPEG`. Logo mark and wordmark match the approved brand direction.

## Inquiry and booking

The contact form uses `https://formspree.io/f/xlgaobby`, found in the existing draft homepage. JavaScript provides pending, accepted and failed states; success appears only after an accepted HTTP response. Failed submissions offer email/copy alternatives, and the form works as an ordinary HTML POST without JavaScript. A live labeled test was accepted and is recorded in Formspree. The email action is enabled for aaron@keystonegrowth.org; notification delivery requires mailbox follow-up. Formspree storing a submission does not by itself confirm email delivery.

Booking uses the verified Google Calendar appointment schedule defined by CAL in tools/build_pages.py: 30-minute Google Meet calls, Monday-Friday 08:00-17:00 America/Costa_Rica, with busy-time conflict checking. The homepage and legacy booking buttons use the same booking page. No new analytics/pixels were invented; existing tracking on legacy campaign pages is retained.

## Before production

- Terms now reflect ads, websites and CRM automation across the US and Latin America. New engagements have no blanket money-back guarantee; previously agreed promises remain in effect. Project scope, revisions, fees and exceptions are agreed in writing. Privacy-policy text remains unchanged.
- Resolve email notification delivery for the verified Formspree recipient and confirm a successful inbox receipt. The booking page is published and its availability was verified.
- The 45-day closing, $750K deal and 75% sales increase are not published until their attribution, measurement and sharing context are clarified.
- Pricing remains quote-based. The recommended US/LATAM fees have not been made public.

The legacy draft HTML, campaign download pages and older assets are retained to avoid breaking prior campaign links.
