# CJ's Pickleball — Project Roadmap

## Vision
Build the best pickleball website in the world for CJ Roberts III — a cinematic, editorial-athletic landing page that earns trust, drives affiliate conversions, and represents the real community CJ is building.

**Stack:** Zero-framework, zero-build, vanilla HTML/CSS/JS. Hash-pinned CSP. Netlify deploy (push to `main`).

---

## ✅ Completed

### Stage 0 — Night Court Foundation
`css/base.css`
- Full modular type scale (`--fs-300` → `--fs-display: clamp(2.9rem, 1.7rem + 6vw, 6.5rem)`)
- 8px spacing rhythm (`--space-1` → `--space-12`)
- Extended palette: `--color-secondary` (court blue), `--color-night`, `--color-cream`, `--color-ink`
- Elevated shadow token `--shadow-xl`

### Stage 1 — Cinematic Hero
`css/hero.css`, `index.html`, `css/responsive.css`
- Full-bleed WebP/JPEG hero with deep cinematic gradients
- Oversized display headline + eyebrow `.hero-kicker`
- Inline SVG court-line motif (6 lines, draws in via `stroke-dashoffset`, hidden < 700px)
- Proof stats restyled as a **scorecard** with gold numerals
- Entrance animations gated behind `prefers-reduced-motion: no-preference`
- CSP + SRI intact; verified at desktop + mobile

### Infrastructure
- 6-file CSS split (`base`, `components`, `nav`, `hero`, `sections`, `responsive`)
- `scripts/check-csp-hashes.js` — enforces JSON-LD + main.js SHA-256 sync across all 3 locations
- 8 partner logos sourced (transparent PNG, CSS mask monochrome treatment)
- `_headers` (Netlify): CSP, caching, security headers

---

## 🔲 Remaining Stages

### Stage 2 — Sections & Cards
**Files:** `css/sections.css`, `css/components.css`, `index.html`

The body of the page gets the Night Court treatment.

- **Light ↔ dark band rhythm** — alternate white editorial vs. dark night-court sections
- **Deal cards redesign** — brand lockup, prominent coupon chips, category tag, external-link arrow; HUDEF as a featured hero card
- **Stats section** — oversized "kicker" numerals, editorial layout
- **About/features** — depth, subtle court-line SVG dividers between bands
- **Community scorecard** — match the hero proof style
- **Contact** — elevated card with real depth
- **Footer** — visual separation, legal links placeholder

### Stage 3 — Motion
**Files:** `css/sections.css`, `js/main.js`

- Scroll-driven reveals via CSS `animation-timeline: view()` + IntersectionObserver fallback
- Micro-interactions: button press, coupon-copy flash, deal-link arrow nudge, marquee item
- **All gated behind `prefers-reduced-motion: no-preference`** — no exceptions

### Stage 4 — SEO + Trust & Compliance
**Files:** `robots.txt`, `sitemap.xml`, `index.html`, `.github/workflows/ci.yml`

- `robots.txt` + `sitemap.xml` at repo root; add to CI required-files check
- **`ItemList`/`Offer` structured data** folded into existing JSON-LD as `@graph` (recompute single hash)
- `rel="sponsored"` on every affiliate `<a>` (alongside existing `noopener noreferrer`)
- **Visible FTC affiliate disclosure** — deals section intro + footer (this is a legal requirement)
- Short privacy note in footer
- Optional: `manifest.webmanifest`

### Stage 5 — Performance 100 + AAA Accessibility
**Files:** `css/base.css`, `index.html`, `css/components.css`

- Verify `display=swap` on Google Fonts link
- Nudge `--color-text-muted` to `≈#4a5a45` for AAA contrast on `--color-bg-alt`
- Full marquee screen-reader + keyboard focus audit
- Confirm no CLS/LCP regression (hero preload + WebP already in place)

### Stage 6 — Interactive Features
**Files:** `js/main.js`, `index.html`

- Deal **category filter/sort** via `data-category` attributes
- **Per-deal anchors** + copy-share-link button
- Richer copy-to-clipboard feedback
- Remove dead `.hero-deco` JS query (leftover from old markup)
- **Recompute `main.js` hash** in all 3 locations; run `node scripts/check-csp-hashes.js`

---

## Guardrails (non-negotiable)

| Rule | Detail |
|---|---|
| Zero framework/build | Vanilla HTML/CSS/JS only. No preprocessor. No minify step. |
| CSP stays hardened | JS changes → recompute sha256 in `index.html` + `_headers` + SRI integrity. `check-csp-hashes.js` must pass. |
| Truthful only | Real deals, real logos (used nominatively), no fabricated content |
| Reduced-motion honored | All animations behind `@media (prefers-reduced-motion: no-preference)` |
| Brand intact | Court green `#247139` + pickleball gold `#ffb020` |
| New inline scripts | Fold into existing JSON-LD `@graph` — never add a second inline `<script>` (would require a second CSP hash) |

## Verification Checklist (each stage before commit)
```
node --check js/main.js
node scripts/check-csp-hashes.js
# CI parity check from .github/workflows/ci.yml (required-files + asset-links + _blank rel)
# Preview: local-static-audit port 4192 — screenshot desktop + mobile 375
# Confirm no console errors
# Bump ?v= query string on any changed css/js in index.html
```

## Reference
- Plan file: `~/.claude/plans/this-needs-to-be-drifting-spark.md`
- Technical handoff: `docs/redesign-handoff.md`
- Logo drop-in convention: `images/partners/README.md`
- Preview config: `.claude/launch.json` → `local-static-audit` (port 4192)
