# Roadmap — CJ's Pickleball

**Status: Live & stable.** The site has been in production on Netlify for months — real content, real
partner deals, hardened CSP, CI-gated. This is not an early-stage repo; the core is done and solid.
What's *in progress* is a deliberate push from **good to best-in-class**: performance, motion, content
depth, and conversion polish. Honest one-liner: **stable product, active enhancement.**

North star — the fastest, most trustworthy pickleball deals + community page on the web. Zero
framework, zero build step, hardened CSP, shipped by hand on `main` → Netlify.

---

## Now
*Active work. Pure CSS/HTML/asset changes — highest ROI, lowest risk, no JS-hash churn.*

- **Image hygiene.** `loading="lazy"` + `decoding="async"` on every below-fold image; explicit
  `width`/`height` on all `<img>` to pin CLS to zero. The hero preload stays exactly as-is — it's the
  LCP element, never lazy-loaded.
- **Finish Lighthouse 100 / WCAG AAA.** Close the last gaps across all four categories; screen-reader
  pass on nav + marquee; re-verify AAA contrast on every band.

**Done when:** Lighthouse 100×4, axe-clean, keyboard-complete, `check-csp-hashes.js` green.

## Next
*Queued directly behind Now.*

- **FAQ + FAQPage schema.** 5–8 genuinely useful Q&As. The structured data folds into the *existing*
  JSON-LD `@graph` (one hash to recompute — never a second inline `<script>`). Earns the FAQ rich result.
- **CJ's story.** Expand the About band with CJ's real founder narrative. *Content-pending: his words,
  not invented.*
- **Motion pass — the "wow".** Scroll-driven reveals via native CSS `animation-timeline: view()`, with
  the existing IntersectionObserver as fallback; micro-interactions on buttons, coupon-copy, deal-link
  arrows. Every animation gated behind `prefers-reduced-motion: no-preference`.

## Later
*Real and intended, not yet scheduled.*

- **Deal filter / sort** by category via `data-category` (paddles · balls · gear · training) —
  progressive enhancement, every card visible with JS off.
- **Per-deal anchors + share links**, plus richer copy feedback on the button itself (not just the toast).
- **Sticky mobile "see the deals" CTA** and a truthful, manually-rotated deal-of-the-week (no fake countdowns).
- **Branded 404** page, on-brand and routing home.
- **Privacy-safe analytics** so CJ can see what converts — Netlify server-side (zero client JS, zero CSP impact).
- **PWA** — minimal `manifest.webmanifest`, theme-colored, installable.
- **Email capture** *(owner decision)* — Netlify Forms, no framework, posts same-origin. Only if CJ will use the list.

> Any JS change in this tier: recompute the `main.js` SHA-256 in the `<meta>` CSP, `_headers`, and the
> SRI `integrity`, then run `check-csp-hashes.js` before push.

## Won't Build
*Closed decisions. Don't reopen without a real reason.*

- **A framework or build step.** Vanilla only — no React/Vue, no bundler, no preprocessor, no minify pipeline.
- **CSS minify / merge.** Source stays hand-readable; HTTP/2 + gzip handle delivery.
- **Fabricated content or fake urgency.** No invented testimonials, numbers, prices, or "only 2 left"
  countdown timers. Real deals and the partners' own logos only.
- **A weaker CSP.** The policy only ever *tightens* — no feature ships by loosening a directive.
- **Third-party analytics / tag scripts.** Nothing that needs an external `script-src`. Measurement
  stays server-side or self-hosted.
- **Re-skinning the brand.** Court green `#247139` + pickleball gold `#ffb020` stay; the real partner
  links stay.

## Shipped
*Completed and verified in code. Full history in `git log`.*

| Milestone | What landed | Evidence |
|---|---|---|
| Night Court foundation | Modular type scale, 8px spacing rhythm, extended palette + depth tokens | `cd8b713` |
| Cinematic hero | Full-bleed WebP hero, draw-in court-line SVG, gold scorecard stats | `cd8b713` |
| Sections & deal cards | 10 partner cards, featured hero card, one-tap coupon-copy chips, light/dark bands | ✅ |
| Partner logo wall | Cohesive monochrome marquee of 8 partner logos | `bb7b41c` |
| SEO & structured data | robots, sitemap, single `@graph` JSON-LD (Org + WebSite + ItemList of all 10 deals) | `92ed5b8` |
| Affiliate compliance | Visible FTC disclosure (intro + footer); `rel="sponsored"` on all 10 partner links | `8718010` |
| CSS split + CSP automation | 6-file CSS architecture; hash-pinned CSP/SRI enforced by `check-csp-hashes.js` | `c6066ed` |
| Self-hosted fonts | Montserrat + Open Sans subsetted to local `woff2`; Google Fonts dropped; CSP `font-src 'self'` | `d64e033` |
| CI gate | `node --check`, hash freshness, external-link safety, required-files check | ✅ |

---

## Guardrails — every commit
Run `node --check js/main.js` and `node scripts/check-csp-hashes.js`, then preview at desktop + mobile
(375px) with reduced-motion toggled. New structured data folds into the one JSON-LD `@graph`. Bump the
`?v=` cache-bust on any changed CSS/JS link. CSP stays hardened — and only tightens.

**Reference:** [`docs/redesign-handoff.md`](docs/redesign-handoff.md) · canonical plan:
`~/.claude/plans/this-needs-to-be-drifting-spark.md` · `docs/roadmap.md` is a pointer stub — this file is canonical.
