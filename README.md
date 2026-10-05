# Flyttstädning – Frontend (Next.js)

Phase 3: design tokens, header/footer, homepage, `/flyttstadning`, `/vad-ingar`, `/priser`.
Phase 9: the full `/boka` booking flow and `/tack` confirmation page.
Phase 10: dynamic city SEO pages at `/flyttstadning/[city]`.
The full sitemap.xml/robots.txt come in a later phase (this shell already wires up
`LocalBusiness`, `Service`, `BreadcrumbList` and `FAQPage` JSON-LD for every page built so far,
city pages included).

## City pages (`/flyttstadning/[city]`)
`src/app/flyttstadning/[city]/page.tsx` renders whatever `City` rows exist in the backend —
nothing about a city is hard-coded in the frontend.

- **Static + on-demand:** `generateStaticParams()` pre-builds every active city at build time;
  `dynamicParams = true` means a city added in Admin afterwards still renders (and gets cached)
  on its first real request, no redeploy needed. `revalidate = 300` keeps all of them fresh.
- **SEO per city:** `generateMetadata()` uses the city's own `seo_title`/`meta_description`;
  `robots: noindex` is set automatically whenever `is_indexed` is false in Admin, so a
  not-yet-reviewed city never gets indexed by accident.
- **JSON-LD:** `WebPage`, `Service`, `BreadcrumbList` and — only if the city actually has FAQs —
  `FAQPage`, alongside the site-wide `LocalBusiness` block from the root layout.
- **404 vs noindex:** an unknown or inactive (`is_active=False`) slug renders Next's real 404
  (`notFound()`); an active-but-unreviewed one (`is_indexed=False`) still renders normally for
  visitors and internal links, just marked `noindex` for search engines.
- **Anti-thin-content:** the page only shows the "Fler orter" related-cities block and the FAQ
  section when that content actually exists, and content (intro, local text, FAQ) always comes
  from the city itself — no city-name find-and-replace on shared boilerplate.

## Booking flow (`/boka`)
A single React Hook Form + Zod form (`src/lib/booking-schema.ts`) driven through 7 steps
(`src/components/booking/`): bostad → tillägg → info → nyckel → tid → kontakt → bekräfta.

- **Step-gated validation:** moving to the next step only validates that step's fields
  (`trigger(fields)`); the full schema is only validated on final submit. The "Nästa" button is
  deliberately `type="button"`, not `type="submit"` — letting RHF's `handleSubmit` run on every
  step would validate later-step fields (like email) before the person has reached them.
- **Live price preview:** debounced call to `POST /api/pricing/calculate/` whenever area/extras/
  oven change, shown in a sticky sidebar on desktop and a compact sticky bar on mobile.
- **Calendar:** `GET /api/availability/` for the next 60 days, grouped into date chips + time-slot
  buttons — only slots the backend actually has free are ever shown.
- **Submit:** `POST /api/bookings/`. Price is never trusted from the client — the backend always
  recalculates it. On `SLOT_UNAVAILABLE` (409, e.g. someone else just booked it) the person is
  sent back to the schedule step with the backend's Swedish error message. On `VALIDATION_ERROR`
  the backend's per-field messages are mapped onto the form via `setError`.
- **Honeypot:** a visually hidden `website` field neither sighted users nor screen readers
  encounter; filling it in (a bot) is handled identically client- and server-side.
- **Confirmation:** on success, redirects to `/tack?ref=FS-XXXXXXXX`. `/tack` fetches the public
  booking summary by reference (`GET /api/bookings/{reference}/`), which deliberately contains no
  personal data — so the confirmation URL itself never exposes name, email, phone or address.

### A real bug this caught, and why the fix matters
`npm test` runs `src/__tests__/*.test.tsx`, which click through the wizard like a real person
rather than calling internal functions directly. That's what caught a genuine bug before ship:
the "självrengörande ugn" Ja/Nej control was a native `defaultChecked` radio pair with a
`setValueAs` string→boolean transform. If the person never touched it (i.e. left the pre-selected
"Nej"), React Hook Form read the raw DOM value (`"no"`, a string) instead of running it through
`setValueAs`, which only fires on a user-triggered change event — so Zod's `z.boolean()` silently
rejected it and "Nästa" did nothing on step 1, with no visible error. `StepHome.tsx` now uses a
fully-`Controller`-driven boolean toggle instead, so the field is always a real boolean from first
render, touched or not. Run `npm test` after changing any step component to make sure a change
like this doesn't slip through again.

## Quick start
```bash
cd frontend
npm install
cp .env.example .env.local   # point NEXT_PUBLIC_API_URL at your running Django backend
npm run dev                  # http://localhost:3000
npm test                     # Vitest + Testing Library, clicks through the booking wizard
npm run typecheck
```

Requires the backend (see `../backend/README.md`) running so pricing and city data render —
every data-driven page fails soft to a small built-in fallback if the API is unreachable, but the
real experience needs the API.

`npm run build` needs internet access to fonts.googleapis.com the first time (next/font/google
self-hosts "Sora" at build time); in a fully offline environment, swap the font in
`src/app/layout.tsx` for `next/font/local` with a licensed font file.

## Stack
Next.js 16 (App Router, Server Components), TypeScript (strict), Tailwind CSS 4 (tokens defined
in `src/app/globals.css`), React Hook Form + Zod for the booking form, Vitest + React Testing
Library for interaction tests (`npm test`).

## Structure
```
src/
  app/            routes: /, /flyttstadning, /flyttstadning/[city] (dynamic, from the backend),
                  /vad-ingar, /priser, /om-oss, /kontakt (stub), /boka (booking flow),
                  /tack (confirmation, noindex)
  components/     Header, Footer, Hero, Section, PriceTable, FAQAccordion, JsonLd, ...
  components/booking/  BookingWizard + one component per step, ProgressSteps, PriceSummaryPanel
  lib/            api.ts (typed fetch client, including POST helpers that surface backend errors),
                  booking-schema.ts (Zod schema + step field map), jsonld.ts, format.ts, constants.ts
  data/           included.ts (what's-in / what's-out checklist), faq.ts (shared FAQ content)
```

## Design system
Palette, layout and typography decisions are documented as comments at the top of
`src/app/globals.css`. In short: navy `#061735` / deep moss green (derived from the brief's
`#E5F2D0`) / sand `#F7F7F5` background, one sans-serif family (Sora) carrying the whole type
scale, rounded-but-restrained cards, a single original line-art motif (`RoomMotif.tsx`) instead
of stock photography for the hero — see "Known limitations" below.

## Known limitations to close out in later phases
- **Photography:** the hero currently uses an original SVG illustration, not photos, because this
  environment has no way to source and license real photographs of Swedish homes. Drop licensed
  images into `public/images/` and swap them into `Hero.tsx` with `next/image` before launch.
- **Nav completeness:** `/om-oss` and `/kontakt` (the working contact form) are still thin
  placeholders, built out in a later phase. `/boka` and `/tack` are now fully functional.
- **Availability window:** the calendar fetches 60 days ahead; if the backend has no slots
  generated that far out (see `generate_slots` in the backend README) the date strip is empty.
- **ESLint:** `eslint-config-next`'s flat-config preset currently errors under ESLint 9
  (a known upstream issue). `npm run typecheck` (strict TypeScript) is the enforced check for now;
  revisit ESLint once eslint-config-next ships stable flat-config support.
