# "Night Court" Redesign — Handoff

Goal: make this the **best pickleball website in the world**. Owner approved a **big redesign**
(new visual language, dramatic "wow") across four tracks: design/motion, SEO+trust, perf+AAA,
and new interactive features. Same brand and the same **truthful** content — we redesign the
execution, never invent content.

## Hard guardrails (do not break)
- **Zero framework, zero build step, vanilla HTML/CSS/JS.** No preprocessor, no minify. Keep the
  6-file CSS split.
- **CSP stays hardened & hash-pinned.** CSS/HTML-only work = no CSP impact. Any `js/main.js` change
  or new inline `<script>` requires recomputing sha256 in `index.html` `<meta>` CSP **and** `_headers`
  (+ SRI `integrity` on the main.js tag), then `node scripts/check-csp-hashes.js` must pass.
  Put any new structured data into the **existing single JSON-LD block as an `@graph`** (one hash),
  not a second inline script.
- **Truthful only.** Real deals/links, partners' own logos, no fabricated testimonials/events/numbers.
- **Honor `prefers-reduced-motion`; keep/raise accessibility.** Brand stays green `#247139` + gold `#ffb020`.
- Run before every commit: `node --check js/main.js`, `node scripts/check-csp-hashes.js`, and the
  CI asset-link/`_blank`-rel python check from `.github/workflows/ci.yml`. Bump the `?v=` query on
  changed css/js links in `index.html`. Verify live (preview below) at desktop + mobile (375).

## Art direction — "Night Court"
Editorial-athletic system built from the court itself. Alternate **light editorial ↔ dark "night
court"** section bands for rhythm. Promote court-blue `--color-secondary:#154d6b` to a real
secondary; deep `--color-night:#08200f`; warm `--color-cream:#f4efe1`. Bigger modular type scale;
8px spacing rhythm; stronger depth. Tokens already added in `css/base.css :root` (see "Night Court
redesign tokens": `--fs-300..--fs-display`, `--space-1..12`, `--color-secondary/-night/-night-2/
-cream/-ink`, `--shadow-xl`). **Use these tokens — don't hardcode.**

## DONE (committed)
- **Stage 0 — Foundation tokens** in `css/base.css` (type scale, spacing, colors, shadow-xl). Additive.
- **Stage 1 — Hero redesign** (`css/hero.css`, hero markup in `index.html`, mobile sync in
  `css/responsive.css`): cinematic darker gradient + radial vignette, oversized display headline
  (`--fs-display`), eyebrow `.hero-kicker`, inline decorative **court-line SVG `.hero-court`** that
  draws in via `stroke-dashoffset` (reduced-motion-gated; hidden < 700px), proof restyled as a
  **scorecard**. Gold accent underline retained. Verified: no console errors, CSP intact, desktop +
  mobile good.
  - Note: old `.hero-deco` elements removed; `js/main.js` still has a `.hero-deco` query that now
    no-ops (harmless). Clean it up when you next touch JS (Stage 6) so the hash change is bundled.

## TODO — remaining stages (each its own commit; verify + push)
**Stage 2 — Sections & cards** (`css/sections.css`, `css/components.css`, some `index.html`):
apply the light/dark band system (`.section-alt`/new dark band) for rhythm; redesign deal cards
(clean brand lockup, prominent coupon chips, category tag, external-link arrow affordance) with the
featured HUDEF card as a hero card; refresh about/feature, stats (kicker numerals), community
scorecard, contact, footer (add visual separation + legal links placeholder). Add subtle court-line
section dividers. Use depth tokens.

**Stage 3 — Motion**: scroll-driven reveals via CSS `animation-timeline: view()` with the existing
IntersectionObserver as fallback; refined micro-interactions (button press, coupon-copy flash,
deal-link arrow nudge). All `prefers-reduced-motion`-gated.

**Stage 4 — SEO + trust/compliance**: add `robots.txt` + `sitemap.xml` at repo root (and to CI
required-files + the asset checks). Fold an **`ItemList`/`Offer`** for the real deals into the
existing JSON-LD as `@graph` (recompute that JSON-LD hash in meta + `_headers`; the check script may
need extending to validate the graph). Add **`rel="sponsored"`** to every affiliate `<a>` (keep
`noopener noreferrer`). Add a **visible FTC affiliate disclosure** (deals-section intro + footer) and
a short **privacy note**. Optional minimal `manifest.webmanifest`.

**Stage 5 — Perf 100 + AAA**: `display=swap` already on the fonts link (verify); nudge
`--color-text-muted` toward AAA (≈`#4a5a45`) and re-check contrast on `--color-bg-alt`; marquee/
screen-reader + focus audit; confirm no CLS/LCP regression (keep hero preload + WebP).

**Stage 6 — Interactive features** (`js/main.js` + markup): deal **category filter/sort** via
`data-category`, **per-deal anchors + copy-share-link**, richer copy-to-clipboard feedback. Also
delete the dead `.hero-deco` JS here. Then recompute the main.js hash (meta + `_headers` + integrity)
and run the check script.

## Reference
- Full plan: `~/.claude/plans/this-needs-to-be-drifting-spark.md` (this machine).
- Two grounding audits (design + technical) were run; key external gap = the FTC affiliate disclosure.
- Local preview: `.claude/launch.json` → `local-static-audit` on port **4192** (4173 has a stray-server
  collision; use 4192 or another free port). The preview's headless viewport reports `innerHeight:0`
  so scroll-driven JS can't be exercised via `window.scrollY` there — verify scroll features by
  synthetic event dispatch + DOM checks, and visuals by `preview_resize` + screenshot.
