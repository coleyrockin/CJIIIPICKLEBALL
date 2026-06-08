# CJ's Pickleball

A fast, hand-built landing page for CJ's Pickleball — a worldwide pickleball community that shares real partner discount codes and connects players around the globe.

[Live site](https://cjspickleball.netlify.app) · [Roadmap](ROADMAP.md) · [![CI](https://github.com/coleyrockin/CJIIIPICKLEBALL/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/coleyrockin/CJIIIPICKLEBALL/actions/workflows/ci.yml)

![CJ's Pickleball — hero preview](docs/screenshot.jpg)

> The repo name **CJIII** is "CJ the third" — the site's for CJ Roberts III. Not a typo.

It does one job and does it well: get players to CJ's community and his real partner deals without a wasted byte. No framework, no bundler, no tracking scripts, no cookie banner — just fast, accessible, honest static pages behind a hardened Content-Security-Policy. If you're a player, it's the shortest path to the codes. If you're a developer, it's a working reference for shipping a polished marketing site on pure HTML/CSS/JS.

## Features

- **One-tap discount codes** — copy a real partner promo code straight to your clipboard (with an `execCommand` fallback for older mobile browsers); link-only deals open in a single tap.
- **Built for courtside phones** — mobile-first, 44px tap targets, and contrast pushed past AA so the codes stay readable in direct sunlight.
- **Zero dependencies, zero tracking** — one hand-written IIFE, no framework or analytics; the only "build" is a `cat` that concatenates the CSS.
- **Accessible by default** — semantic landmarks, scroll-spy nav, a no-JS fallback, and every animation gated behind `prefers-reduced-motion`.
- **Hardened + CI-gated** — self-hosted fonts, a self-only hash-pinned CSP + SRI, locked-down headers; CI fails the build on CSP drift or a stale `app.css`.

## Installation

```bash
git clone https://github.com/coleyrockin/CJIIIPICKLEBALL.git
cd CJIIIPICKLEBALL
```

That's the whole install. Nothing to pull, nothing to build.

## Usage

Open it straight from disk:

```bash
open index.html
```

Or serve it locally (defaults to `http://127.0.0.1:4173`; pass a port and host to override):

```bash
./scripts/start-local.sh
./scripts/start-local.sh 8080 0.0.0.0
```

Deploying is just `git push`: Netlify watches `main`, regenerates `css/app.css`, runs the CSP/SRI check, and publishes in about half a minute (build config in `netlify.toml`). Security and caching headers live in `_headers` (with meta fallbacks in `index.html`).

## Tech Stack

- **HTML5 / CSS3 / vanilla JS** — semantic markup, CSS Grid + custom properties, one dependency-free IIFE. No framework, no bundler.
- **Animation** — CSS transitions, IntersectionObserver scroll reveals, and a `requestAnimationFrame` stat counter — all gated behind `prefers-reduced-motion` (CSS query + a JS `matchMedia` check).
- **Fonts** — Montserrat + Open Sans, self-hosted as subsetted `woff2` (no Google Fonts request; `font-src 'self'` in the CSP).
- **Hosting** — Netlify, continuous deploy from `main`.
- **Security** — hash-pinned CSP + SRI and locked-down response headers, enforced in CI.

CSS is authored as seven files — `fonts · base · components · nav · hero · sections · responsive` — and concatenated into a single `css/app.css` by `scripts/build-css.sh` (one render-blocking request instead of seven; `responsive` stays last so its overrides win). Edit the sources, never `app.css` — CI fails if they drift. `js/main.js` handles navigation, copy-to-clipboard, scroll reveals, and the stats counter.

## Contributing

PRs welcome. Keep it vanilla — no framework, no bundler — and run the checks before you push:

```bash
node --check js/main.js              # JS parses
node scripts/check-csp-hashes.js     # CSP + SRI hashes in sync
./scripts/build-css.sh               # rebuild css/app.css after any CSS edit
```

One gotcha worth knowing up front: **the CSP is hash-pinned.** If you edit `js/main.js` or the inline JSON-LD block, its SHA-256 changes and the browser will silently refuse to load it — broken counter, dead nav, missing structured data. Recompute the hash in three places — the `<meta>` CSP in `index.html`, the CSP line in `_headers`, and the `integrity` attribute on the `main.js` `<script>` tag — then re-run the check script. It prints the exact hash to paste on drift, and CI runs the same check, so a stale hash fails the build rather than production.

See [ROADMAP.md](ROADMAP.md) for what's planned and what's deliberately out of scope.

## License

[MIT](LICENSE) © Boyd Roberts
