# CJ's Pickleball — Roadmap

> **North Star:** the best pickleball community + partner-deals page on the web — cinematic,
> trustworthy, blisteringly fast, and effortless on any device. Built by hand: **zero framework,
> zero build step, vanilla HTML/CSS/JS**, hardened CSP, shipped on Netlify (`main` → auto-deploy).

**Live:** https://cjspickleball.netlify.app · **Brand:** court green `#247139` + pickleball gold `#ffb020` · **Design language:** *Night Court* (editorial-athletic, built from the court itself)

This is the single source of truth for the project's direction. It reflects the **actual, verified
state of the code** — not aspirations dressed up as done.

---

## The bar — what "best in the world" means here

A measurable definition, so we know when we've hit it:

| Dimension | Target |
|---|---|
| **Trust** | FTC affiliate disclosure visible · every partner link `rel="sponsored" noopener noreferrer` · real deals/logos only, zero fabricated content |
| **Performance** | Lighthouse **100/100/100/100** · LCP < 1.5s on 4G · zero CLS · no render-blocking JS |
| **Accessibility** | WCAG **AAA** contrast · full keyboard path · AA+ tap targets (≥44px) · reduced-motion honored everywhere |
| **Craft** | Cinematic hero, cohesive *Night Court* bands, real depth, motion with intent — "wow" on first scroll |
| **Security** | Hash-pinned CSP + SRI, locked-down headers, `check-csp-hashes.js` green on every commit |
| **Conversion** | Clear path hero → deals → copy code / open partner link, frictionless on mobile |

---

## Status board

| Stage | Scope | Status |
|---|---|---|
| 0 · Foundation | *Night Court* tokens (type scale, spacing, color, depth) | ✅ **Shipped** |
| 1 · Hero | Cinematic full-bleed hero, court-line SVG, scorecard stats | ✅ **Shipped** |
| 2 · Sections & cards | Deal-card system, featured card, coupon chips, light/dark bands | ✅ **Shipped** |
| 4 · SEO & trust | robots, sitemap, `@graph` JSON-LD, `rel=sponsored`, FTC disclosure | ✅ **Shipped** |
| 5 · Perf 100 + AAA | AAA contrast token landed; final Lighthouse + SR audit | 🟡 **In progress** |
| 3 · Motion | Scroll-driven reveals (`animation-timeline: view()`) + micro-interactions | ⚪ **Next** |
| 6 · Interactive | Deal filter/sort, per-deal anchors + share, richer copy feedback | ⚪ **Next** |
| — · PWA polish | `manifest.webmanifest`, installable, offline-friendly | ⚪ Stretch |

---

## ✅ Shipped (verified in code)

### Stage 0 — *Night Court* foundation · `css/base.css`
- Modular type scale `--fs-300` → `--fs-display: clamp(2.9rem, 1.7rem + 6vw, 6.5rem)`
- 8px spacing rhythm `--space-1` → `--space-12` (no ad-hoc gaps)
- Extended palette: `--color-secondary` (court blue), `--color-night`, `--color-cream`, `--color-ink`
- Elevated depth token `--shadow-xl`
- `--color-text-muted: #4a5a45` — already nudged to AAA contrast on light bands

### Stage 1 — Cinematic hero · `css/hero.css`, `index.html`, `css/responsive.css`
- Full-bleed WebP/JPEG hero, deep cinematic gradient + radial vignette
- Oversized display headline + `.hero-kicker` eyebrow
- Inline decorative court-line SVG (`.hero-court`) that draws in via `stroke-dashoffset`,
  reduced-motion-gated, hidden < 700px
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

Three focused stages take the page from "polished and trustworthy" to **best-in-the-world**. Each is
its own commit with the full verification gate (below) before push.

### Stage 5 — Performance 100 + AAA *(finish the foundation)*
**Files:** `index.html`, `css/base.css`, `css/components.css`
- Confirm/add `&display=swap` on the Google Fonts link (no FOIT)
- Full Lighthouse run → close any gap to **100** across all four categories
- Marquee + nav screen-reader pass; visible focus ring on every interactive element
- Re-verify AAA contrast on every band; confirm zero CLS / LCP regression (hero preload + WebP stay)
- **Acceptance:** Lighthouse 100×4, axe-clean, keyboard-complete, reduced-motion verified

### Stage 3 — Motion *(the "wow")*
**Files:** `css/sections.css`, `js/main.js`
- Scroll-driven reveals via native CSS `animation-timeline: view()` — buttery, main-thread-free —
  with the existing IntersectionObserver as the fallback for non-supporting browsers
- Micro-interactions: button press, **coupon-copy flash**, deal-link arrow nudge, marquee hover
- Court-line section dividers that animate between bands
- **Every animation gated behind `@media (prefers-reduced-motion: no-preference)` — no exceptions**
- **Acceptance:** smooth reveals at 60fps, full static fallback, motion fully disabled under reduced-motion

### Stage 6 — Interactive features *(make the deals shine)*
**Files:** `js/main.js`, `index.html`
- Deal **category filter / sort** via `data-category` (paddles · balls · gear · training)
- **Per-deal anchors** + copy-share-link per card
- Richer copy-to-clipboard feedback (state on the button itself, not just the toast)
- Remove the **dead `.hero-deco` query** in `js/main.js` (no-op since the hero redesign)
- **Then:** recompute `main.js` SHA-256 in `index.html` meta + `_headers` + SRI `integrity`; run `check-csp-hashes.js`
- **Acceptance:** filter/anchors/share work, no console errors, CSP/SRI green, no-JS fallback intact

### Stretch — PWA polish
- Minimal `manifest.webmanifest` (name, icons, theme color, standalone) → installable
- Add to CI required-files; verify no CSP/header conflict

---

## Guardrails — non-negotiable

| Rule | Detail |
|---|---|
| **Zero framework / build** | Vanilla HTML/CSS/JS only. No preprocessor, no minify. Keep source hand-readable (HTTP/2 + gzip handle delivery). Keep the 6-file CSS split. |
| **CSP stays hardened** | CSS/HTML-only work = no CSP impact. Any `js/main.js` or inline-script change → recompute sha256 in `index.html` meta **and** `_headers` **and** SRI `integrity`; `node scripts/check-csp-hashes.js` must pass. |
| **One JSON-LD block** | New structured data folds into the **existing** `@graph` (one hash). Never add a second inline `<script>`. |
| **Truthful only** | Real deals/links, partners' own logos used nominatively. No fabricated testimonials, events, numbers, or prices. Never recreate or alter trademarks. |
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
- After JS changes: filter / anchors / copy / share all work; no-JS fallback still reveals content

> Preview note: the headless viewport reports `innerHeight:0`, so scroll-driven JS can't be driven via
> `window.scrollY`. Verify scroll features by synthetic event dispatch + DOM checks, visuals by
> `preview_resize` + screenshot.

---

## Out of scope (won't do)
Framework or build step · CSS minify/merge · fabricated content · weakening the CSP · changing the
brand identity or the real deal links.

## Reference
- Technical handoff: [`docs/redesign-handoff.md`](docs/redesign-handoff.md)
- Logo drop-in convention: `images/partners/README.md`
- Preview config: `.claude/launch.json` → `local-static-audit`
- Full original plan: `~/.claude/plans/this-needs-to-be-drifting-spark.md`
