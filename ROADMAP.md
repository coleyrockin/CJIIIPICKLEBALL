# CJ's Pickleball — Roadmap

> **North Star:** the best pickleball community + partner-deals page on the web — cinematic,
> trustworthy, blisteringly fast, and effortless on any device. Built by hand: **zero framework,
> zero build step, vanilla HTML/CSS/JS**, hardened CSP, shipped on Netlify (`main` → auto-deploy).

**Live:** https://cjspickleball.netlify.app · **Brand:** court green `#247139` + pickleball gold `#ffb020` · **Design language:** *Night Court* (editorial-athletic, built from the court itself) · **Last verified:** 2026-06-07

This is the single source of truth for the project's direction. It reflects the **actual, verified
state of the code** — not aspirations dressed up as done. Each line item names its files, its
acceptance bar, and any CSP/guardrail implication, so the next session can pick up cold.

---

## The bar — what "best in the world" means here

A measurable definition, so we know when we've hit it:

| Dimension | Target |
|---|---|
| **Trust** | FTC affiliate disclosure visible · every partner link `rel="sponsored" noopener noreferrer` · real deals/logos only, zero fabricated content |
| **Performance** | Lighthouse **100/100/100/100** · LCP < 1.5s on 4G · zero CLS · no render-blocking third-party requests |
| **Accessibility** | WCAG **AAA** contrast · full keyboard path · AA+ tap targets (≥44px) · reduced-motion honored everywhere |
| **Authority** | Real evergreen content (FAQ, buyer guidance) earning organic search — FAQPage + Organization rich results, ranking for "pickleball discount code / deals" queries |
| **Craft** | Cinematic hero, cohesive *Night Court* bands, real depth, motion with intent — "wow" on first scroll |
| **Security** | Hash-pinned CSP + SRI, locked-down headers, `check-csp-hashes.js` green on every commit |
| **Conversion** | Clear path hero → deals → copy code / open partner link, frictionless on mobile; measurable via privacy-safe analytics |

---

## Status board

| Stage | Scope | Status |
|---|---|---|
| 0 · Foundation | *Night Court* tokens (type scale, spacing, color, depth) | ✅ **Shipped** |
| 1 · Hero | Cinematic full-bleed hero, court-line SVG, scorecard stats | ✅ **Shipped** |
| 2 · Sections & cards | Deal-card system, featured card, coupon chips, light/dark bands | ✅ **Shipped** |
| 4 · SEO & trust | robots, sitemap, `@graph` JSON-LD, `rel=sponsored`, FTC disclosure | ✅ **Shipped** |
| 5 · Perf 100 + AAA | AAA contrast token landed; self-host fonts + image hygiene + final audit | 🟡 **In progress — do next** |
| 3 · Motion | Scroll-driven reveals (`animation-timeline: view()`) + micro-interactions | ⚪ Planned |
| 7 · Authority/content | FAQ + FAQPage schema, CJ's story, evergreen buyer guidance | ⚪ Planned *(new)* |
| 6 · Interactive/convert | Deal filter/sort, anchors + share, sticky mobile CTA, deal-of-week | ⚪ Planned |
| 8 · Resilience/polish | Branded 404, privacy-safe analytics, dead-code cleanup | ⚪ Planned *(new)* |
| 9 · PWA | `manifest.webmanifest`, installable, offline-friendly | ⚪ Stretch |

---

## ✅ Shipped (verified in code)

### Stage 0 — *Night Court* foundation · `css/base.css`
- Modular type scale `--fs-300` → `--fs-display: clamp(2.9rem, 1.7rem + 6vw, 6.5rem)`
- 8px spacing rhythm `--space-1` → `--space-12` (no ad-hoc gaps)
- Extended palette: `--color-secondary` (court blue), `--color-night`, `--color-cream`, `--color-ink`
- Elevated depth token `--shadow-xl`
- `--color-text-muted: #4a5a45` — already nudged to AAA contrast on light bands

### Stage 1 — Cinematic hero · `css/hero.css`, `index.html`, `css/responsive.css`
- Full-bleed WebP/JPEG hero, deep cinematic gradient + radial vignette, dual-source `<link rel=preload>` (desktop/mobile) with `fetchpriority="high"`
- Oversized display headline + `.hero-kicker` eyebrow
- Inline decorative court-line SVG (`.hero-court`) that draws in via `stroke-dashoffset`, reduced-motion-gated, hidden < 700px
- Proof stats restyled as a gold-numeral **scorecard**

### Stage 2 — Sections & cards · `css/sections.css`, `css/components.css`, `index.html`
- **10 partner deal cards** (`data-brand`), each with brand lockup + external-link affordance
- **Featured hero card** — HUDEF (`deal-card--featured` + `deal-badge--hot`)
- **Coupon chips** (`coupon-block` / `coupon-code`) with one-tap copy → toast
- Light ↔ dark **band rhythm** via `.section-alt`
- Sections: hero · about · stats · discounts · community · contact · footer
- **Mobile tap targets** meet WCAG (copy-btn 65×40, deal-link 78×44)

### Stage 4 — SEO & trust · `index.html`, `robots.txt`, `sitemap.xml`, `_headers`
- `robots.txt` + `sitemap.xml` at repo root
- Single JSON-LD `@graph`: **SportsOrganization + WebSite + ItemList** of all 10 deals (one CSP hash)
- `rel="noopener noreferrer sponsored"` on **all 10** affiliate links
- **Visible FTC affiliate disclosure** — deals-section intro + footer
- Inline SVG icons (no icon-font dependency)

### Infrastructure
- 6-file CSS split: `base · components · nav · hero · sections · responsive` (responsive loads last)
- `scripts/check-csp-hashes.js` — enforces JSON-LD + `main.js` SHA-256 sync across meta, `_headers`, SRI
- Hash-pinned CSP + SRI `integrity`; locked-down security headers in `_headers`
- GitHub Actions CI: `node --check`, hash check, asset-link + `_blank`-rel check

---

## 🛠 The road ahead

Ordered by ROI and risk. **Do the foundation finish (5) first** — it's pure CSS/HTML/asset work, no
JS-hash churn, and it banks the perf/a11y/security wins that everything else sits on. Then layer
motion (3), content authority (7), interactivity (6), and resilience (8). Each stage is its own
commit with the full verification gate (below) before push.

### ⭐ Recommended next three
1. **Stage 5** — self-host fonts (kills the last render-blocking third-party request *and* tightens the CSP), lazy-load below-fold images, finish AAA/Lighthouse. Highest ROI, lowest risk.
2. **Stage 7** — FAQ section + FAQPage schema. Real content that earns organic search and a rich result, folded into the existing `@graph` (one hash, no new script).
3. **Stage 3** — the motion "wow" pass.

---

### Stage 5 — Performance 100 + AAA *(finish the foundation)* 🟡
**Files:** `index.html`, `css/base.css`, `css/components.css`, `_headers`, new `css/fonts.css` + `fonts/*.woff2`
- **Self-host Montserrat + Open Sans** (both OFL — redistributable). Download the exact weights in use (Montserrat 400/600/700/800/900, Open Sans 400/600) as `woff2`, serve from `/fonts/`, declare `@font-face` with `font-display: swap`. **Then *tighten* the CSP:** drop `https://fonts.googleapis.com` from `style-src` and `https://fonts.gstatic.com` from `font-src` (both `index.html` meta **and** `_headers`); remove the two `preconnect` hints. Net: one fewer third-party origin, no external render-block, a *stricter* policy — fully within guardrails (we only ever tighten the CSP).
- **Image hygiene:** `loading="lazy"` + `decoding="async"` on every below-fold image (partner logos, community); explicit `width`/`height` on all `<img>` to lock CLS to zero; keep the hero preload + WebP exactly as-is (it's the LCP element — never lazy-load it).
- Full Lighthouse run → close any gap to **100** across all four categories.
- Marquee + nav screen-reader pass; visible focus ring on every interactive element; verify the skip-link path.
- Re-verify AAA contrast on every band; confirm zero CLS / LCP regression.
- **Acceptance:** Lighthouse 100×4, axe-clean, keyboard-complete, reduced-motion verified, CSP has **no** external font origins, `check-csp-hashes.js` green.

### Stage 3 — Motion *(the "wow")* ⚪
**Files:** `css/sections.css`, `js/main.js`
- Scroll-driven reveals via native CSS `animation-timeline: view()` — buttery, main-thread-free — with the existing IntersectionObserver as the fallback for non-supporting browsers
- Micro-interactions: button press, **coupon-copy flash**, deal-link arrow nudge, marquee hover
- Court-line section dividers that animate between bands
- **Every animation gated behind `@media (prefers-reduced-motion: no-preference)` — no exceptions**
- **Acceptance:** smooth reveals at 60fps, full static fallback, motion fully disabled under reduced-motion. (CSS-only path = no CSP impact; if any JS changes, recompute the `main.js` hash trio.)

### Stage 7 — Authority & content *(the real growth engine)* ⚪ **new**
**Files:** `index.html`, `css/sections.css`; structured data folds into the **existing** `@graph`
- **FAQ section** — 5–8 genuinely useful Q&As (How do the discount codes work? Are these CJ's real partners? What paddle should a beginner buy? etc.). Real answers, no fluff.
- **FAQPage JSON-LD** added as another node in the **single** `@graph` block (recompute that one hash in meta + `_headers`) → eligible for the FAQ rich result. **Never a second inline `<script>`.**
- **CJ's story** — expand the About band with an authentic founder narrative (why CJ started this, his pickleball journey). *Content-pending: needs CJ's real words — do not fabricate.*
- **Evergreen buyer guidance** *(optional, content-pending)* — a short, honest "how to choose your first paddle / which deal fits whom" block that earns organic search without keyword-stuffing.
- **Acceptance:** FAQ renders + keyboard-navigable; Google Rich Results test validates FAQPage + Organization; one hash updated; copy is true and in CJ's voice.

### Stage 6 — Interactive features & conversion *(make the deals shine)* ⚪
**Files:** `js/main.js`, `index.html`
- Deal **category filter / sort** via `data-category` (paddles · balls · gear · training) — progressive enhancement, all cards visible with JS off
- **Per-deal anchors** (`#deal-hudef` …) + copy-share-link per card
- **Sticky mobile "See the deals" CTA** that appears past the hero and routes to the deals band (reduced-motion-safe, dismissible)
- **Deal-of-the-week** highlight — a manual, truthful rotation of the featured card (no fabricated urgency/countdowns)
- Richer copy-to-clipboard feedback (state on the button itself, not just the toast)
- Remove the **dead `.hero-deco` query** in `js/main.js:272` (no-op since the hero redesign)
- **Then:** recompute `main.js` SHA-256 in `index.html` meta + `_headers` + SRI `integrity`; run `check-csp-hashes.js`
- **Acceptance:** filter/anchors/share/sticky-CTA work, no console errors, CSP/SRI green, no-JS fallback intact

### Stage 8 — Resilience & measurement *(polish that compounds)* ⚪ **new**
**Files:** new `404.html`, `_headers`, `js/main.js` (cleanup only)
- **Branded 404 page** — on-brand *Night Court* 404 that routes back to the deals (Netlify serves `/404.html` automatically; no config needed)
- **Privacy-safe analytics** so CJ can see what actually converts — prefer **Netlify server-side Analytics** (zero client JS, zero CSP impact, no cookies). If a client option is ever chosen instead, it must be self-hosted/CSP-compatible — never a script that forces loosening `script-src`.
- Confirm the dead-code cleanup from Stage 6 landed; sweep for any remaining no-op selectors/`console.log` debris
- **Acceptance:** 404 renders on-brand and links home; analytics visible to CJ with no CSP/header regression

### Stage 9 — PWA *(stretch)* ⚪
- Minimal `manifest.webmanifest` (name, icons — reuse `apple-touch-icon.png`, theme color `#247139`, `display: standalone`) → installable
- Wire `<link rel="manifest">`; add to CI required-files; verify **no** CSP/header conflict (manifest is same-origin, no policy change)
- **Acceptance:** installable on Android/desktop, Lighthouse PWA checks pass, no CSP regression

### Optional / owner-decision — email capture
A simple newsletter signup via **Netlify Forms** (pure HTML `<form netlify>`, no framework, posts same-origin so `form-action 'self'` already covers it). Real list-building for CJ — but only worth it if CJ will actually send to the list. **Flagged for CJ's go/no-go before building.**

---

## Guardrails — non-negotiable

| Rule | Detail |
|---|---|
| **Zero framework / build** | Vanilla HTML/CSS/JS only. No preprocessor, no minify. Keep source hand-readable (HTTP/2 + gzip handle delivery). Keep the 6-file CSS split. |
| **CSP only tightens** | CSS/HTML-only work = no CSP impact. Self-hosting fonts (Stage 5) **removes** external origins — good. Any `js/main.js` or inline-script change → recompute sha256 in `index.html` meta **and** `_headers` **and** SRI `integrity`; `node scripts/check-csp-hashes.js` must pass. Never *loosen* a directive to make a feature work. |
| **One JSON-LD block** | New structured data (FAQPage, etc.) folds into the **existing** `@graph` (one hash). Never add a second inline `<script>`. |
| **Truthful only** | Real deals/links, partners' own logos used nominatively. No fabricated testimonials, events, numbers, prices, or urgency timers. CJ's story and any guidance must be his real words. Never recreate or alter trademarks. |
| **Reduced-motion honored** | All animation behind `@media (prefers-reduced-motion: no-preference)`. |
| **Brand intact** | Court green `#247139` + pickleball gold `#ffb020`. Use *Night Court* tokens — don't hardcode. |
| **Cache-bust** | Bump the `?v=` query on any changed css/js link in `index.html`. |

---

## Verification gate — run before every commit

```bash
node --check js/main.js                 # JS parses
node scripts/check-csp-hashes.js        # CSP + SRI hashes in sync (meta, _headers, integrity)
# CI parity: required-files + asset-link + _blank/rel check (the python3 block in .github/workflows/ci.yml)
```
Then **live preview** (`local-static-audit`, free port — 4192 has had collisions):
- Screenshots at **desktop + mobile (375)**; no console errors; hero + all bands render
- Toggle reduced-motion emulation → confirm motion is fully suppressed
- Confirm affiliate disclosure + `rel="sponsored"` present on every partner link
- After self-hosting fonts: confirm **no** request to `fonts.googleapis.com`/`fonts.gstatic.com` and fonts still render
- After JS changes: filter / anchors / copy / share / sticky-CTA all work; no-JS fallback still reveals content
- After schema changes: paste into Google Rich Results test → FAQPage/Organization valid

> Preview note: the headless viewport reports `innerHeight:0`, so scroll-driven JS can't be driven via
> `window.scrollY`. Verify scroll features by synthetic event dispatch + DOM checks, visuals by
> `preview_resize` + screenshot.

---

## Out of scope (won't do)
Framework or build step · CSS minify/merge · fabricated content or fake urgency · weakening the CSP ·
changing the brand identity or the real deal links · any analytics that needs a third-party script in `script-src`.

## Reference
- Technical handoff: [`docs/redesign-handoff.md`](docs/redesign-handoff.md)
- Logo drop-in convention: `images/partners/README.md`
- Preview config: `.claude/launch.json` → `local-static-audit`
- Full original plan: `~/.claude/plans/this-needs-to-be-drifting-spark.md`
- `docs/roadmap.md` is a pointer stub → **this file is canonical.**
