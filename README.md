<div align="center">

# 🏓 CJ's Pickleball

**Bringing the World Together Through Pickleball**

[![CI](https://github.com/coleyrockin/CJIIIPICKLEBALL/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/coleyrockin/CJIIIPICKLEBALL/actions/workflows/ci.yml)
[![Live Site](https://img.shields.io/badge/Live%20Site-cjspickleball.netlify.app-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://cjspickleball.netlify.app)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-2e7d32?style=for-the-badge)](LICENSE)

</div>

> The repo name **CJIII** stands for "CJ the third" — the site is for CJ Roberts III. Not a typo.


---

![CJ's Pickleball — hero preview](docs/screenshot.jpg)

---

## Overview

A polished, single-page landing site for **CJ's Pickleball** — a worldwide pickleball community sharing tips, exclusive partner discounts, and connection points with players around the globe.

Built with semantic HTML5, modern CSS, and vanilla JavaScript. **Zero frameworks, zero build step, zero runtime dependencies.** Just clean, performant, hand-crafted code.

🔗 **Live site:** [cjspickleball.netlify.app](https://cjspickleball.netlify.app)
📘 **Facebook:** [CJ's Pickleball Page](https://www.facebook.com/people/CJs-Pickleball-Page/100089379470047/)
🔖 **Roadmap:** [ROADMAP.md](ROADMAP.md)

---

## Highlights

- 🎨 **Distinctive hero** — full-bleed court photography, layered contrast, and animated court-line accents via the Web Animations API
- 📊 **Animated stats counter** — numbers count up as the section enters the viewport
- 🎢 **Partner marquee strip** — gentle, infinite scroll showcasing every brand
- 📈 **Scroll progress bar** — fixed top indicator that tracks page position
- 🎯 **Active section nav** — current section is highlighted from scroll position and hash navigation
- 💸 **Copy-to-clipboard codes** — one-click coupon copy with a toast confirmation
- ⬆️ **Back-to-top button** — appears after scrolling, smooth-scrolls to the hero
- ✨ **Scroll-reveal animations** — staggered entrance for cards and sections
- ♿ **A11y-first** — skip link, semantic landmarks, ARIA labels, keyboard focus rings, `prefers-reduced-motion` honored across CSS and WAAPI animations
- 🛡️ **Hardened security headers** — Netlify `_headers` plus meta fallbacks for strict CSP, Permissions-Policy, `referrer=no-referrer`, and `upgrade-insecure-requests`
- ✅ **CI smoke checks** — verifies required files, JavaScript syntax, CSP JSON-LD hash freshness, safe external-link attributes, and local asset references
- 📱 **Truly responsive** — mobile-first breakpoints at 480 / 700 / 900 px, with a hamburger menu and stacked grids
- 🔍 **SEO-ready** — Open Graph, Twitter Card, JSON-LD organization schema, canonical link

---

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 (semantic landmarks, ARIA) |
| Styling | CSS3 — Grid, Flexbox, custom properties, `clamp()` |
| Interactivity | Vanilla JavaScript (IIFE, no globals) |
| Animation | CSS transitions + Web Animations API (WAAPI) |
| Fonts | Google Fonts — Montserrat, Open Sans |
| Hosting | Netlify (continuous deployment from `main`) |

---

## Getting Started

```bash
git clone https://github.com/coleyrockin/CJIIIPICKLEBALL.git
cd CJIIIPICKLEBALL
```

Open the file directly:

```bash
open index.html
```

Or run the local dev server (defaults to `http://127.0.0.1:4173`):

```bash
./scripts/start-local.sh
```

You can override the port and host:

```bash
./scripts/start-local.sh 8080 0.0.0.0
```

---

## Project Structure

```
CJIIIPICKLEBALL/
├── css/
│   ├── base.css            # Reset, root variables, typography, base utilities
│   ├── components.css      # Buttons, marquee, toast, scroll progress, reveal, back-to-top
│   ├── nav.css             # Site header, navbar, hamburger toggle
│   ├── hero.css            # Hero section + floating decorations
│   ├── sections.css        # About, stats, discounts, community, contact, footer
│   └── responsive.css      # All media queries (loaded LAST to override base styles)
├── js/
│   └── main.js             # Nav, copy-to-clipboard, scroll reveal, stats, back-to-top
├── images/                 # Logos and hero photography
│   ├── logo.png
│   ├── logo.svg
│   └── hero-court.jpg
├── docs/
│   └── screenshot.jpg      # Used for README + Open Graph preview
├── .github/workflows/
│   └── ci.yml              # Static smoke checks for pushes and pull requests
├── scripts/
│   ├── start-local.sh      # Local dev server (python3 http.server)
│   └── check-csp-hashes.js # Verifies CSP + SRI hashes for JSON-LD and main.js
├── index.html              # Single-page entry point
├── _headers                # Netlify response headers for security + caching
├── .nojekyll               # Disable Jekyll processing on static hosts
├── LICENSE                 # MIT
└── README.md
```

---

## Deployment

Hosted on **Netlify** with continuous deployment from `main`:

```
Push to main → Netlify auto-deploys → live in ~30s
```

No build step. The site is plain static files; Netlify serves them as-is. Custom security headers are declared in `_headers`, with compatible meta fallbacks in `index.html`.

To deploy your own fork, connect the repo in the Netlify dashboard and accept the default static-site settings.

---

## Project status

- ✅ Implemented: static single-page site, responsive UI, navigation behavior, copy-to-clipboard, security headers, and CI smoke checks.
- ⚪ Planned: content governance and stronger release/process documentation (tracked in `ROADMAP.md`).

---

## How to test

No JavaScript build tooling is required. Run the documentation-safe checks:

```bash
node --check js/main.js
node scripts/check-csp-hashes.js
test -f _headers && test -f index.html && test -f js/main.js && \
  test -f css/base.css && test -f css/components.css && test -f css/nav.css && \
  test -f css/hero.css && test -f css/sections.css && test -f css/responsive.css && \
  test -f images/hero-court.jpg && test -f images/logo.png && test -f docs/screenshot.jpg
```

---

## CSP Hash Maintenance

The Content-Security-Policy is hash-pinned. Two `'sha256-...'` entries appear in
both the `<meta http-equiv="Content-Security-Policy">` tag in [index.html](index.html)
and the `Content-Security-Policy` line in [_headers](_headers):

1. The inline `<script type="application/ld+json">` JSON-LD organization block.
2. The external `js/main.js` file (also pinned via the `integrity="..."` SRI
   attribute on its `<script src>` tag).

**Any change to the JSON-LD block or to `js/main.js` invalidates its hash.**
The browser will silently refuse to load the resource and the site will be
visibly broken (broken counter, missing nav behavior, missing structured data).

To verify both hashes are fresh:

```bash
node scripts/check-csp-hashes.js
```

On drift the script prints the file at fault and the exact hash to substitute,
then exits non-zero — CI uses this same script. To update by hand:

```bash
node -e "const fs=require('fs'),c=require('crypto');console.log('sha256-'+c.createHash('sha256').update(fs.readFileSync('js/main.js')).digest('base64'))"
```

Paste the result into:

- `script-src` in [index.html](index.html) `<meta http-equiv="Content-Security-Policy">`
- `script-src` in [_headers](_headers)
- the `integrity="..."` attribute on `<script src="js/main.js" ...>` in [index.html](index.html)

Then re-run `node scripts/check-csp-hashes.js` to confirm.

---

## Browser Support

Manual checks are performed against modern Chromium/WebKit/Gecko browsers, with accessibility checks included in the roadmap.
Graceful degradation:

- No IntersectionObserver → all reveal animations fall back to visible.
- No `navigator.clipboard` → falls back to `document.execCommand('copy')`.
- `prefers-reduced-motion: reduce` → reveals, marquee, stats counter, and floating paddles all stop animating.

---

## License

[MIT](LICENSE) © Boyd Roberts

---

<div align="center">

Built with 🏓 by [Boyd Roberts](https://github.com/coleyrockin)

</div>
