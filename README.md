# Keystone Growth website

Static bilingual marketing website for keystonegrowth.org. Existing GitHub Pages deployment and IONOS-managed custom domain are retained; no hosting migration or new JavaScript framework is required.

## Pages

- `/` and `/en/`: English (canonical `/en/`).
- `/es/`: Spanish, with LATAM-focused copy and advertising-budget ranges.
- English copy focuses on US service-business inquiries and bookings. Language choice does not restrict where a client can be based.
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

The contact form uses `https://formspree.io/f/xlgaobby`, found in the existing draft homepage. JavaScript provides pending, accepted and failed states; success appears only after an accepted HTTP response. Failed submissions offer email/copy alternatives, and the form works as an ordinary HTML POST without JavaScript. A live labeled test was accepted and is recorded in Formspree. Both Formspree email actions route to the verified aaronbrenes918@gmail.com address. Live test KEYSTONE-GMAIL-20261112-B was accepted and its notification was confirmed in that Gmail inbox on 2026-11-12. Formspree storing a submission does not by itself confirm email delivery.

Booking uses the verified Google Calendar appointment schedule defined by CAL in tools/build_pages.py: 30-minute Google Meet calls, Monday-Friday 08:00-17:00 America/Costa_Rica, with busy-time conflict checking. The homepage and legacy booking buttons use the same booking page. No new analytics/pixels were invented; existing tracking on legacy campaign pages is retained.

## Before production

- Terms now reflect ads, websites and CRM automation across the US and Latin America. New engagements have no blanket money-back guarantee; previously agreed promises remain in effect. Project scope, revisions, fees and exceptions are agreed in writing. Public contact addresses use the working Gmail mailbox.
- Form notifications and Google booking are live and verified. Repeat a labeled delivery check if recipient settings change.
- The 45-day closing, $750K deal and 75% sales increase are not published until their attribution, measurement and sharing context are clarified.
- Pricing remains quote-based. The recommended US/LATAM fees have not been made public.

The legacy draft HTML, campaign download pages and older assets are retained to avoid breaking prior campaign links.
