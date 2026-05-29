# Partner logos (drop-in)

The partner marquee on the homepage shows each brand **name as text** by default.
If a logo file exists here at the path set in the item's `data-logo` attribute
(in `index.html`), `js/main.js` preloads it and swaps the text for the image
automatically — **no code change needed**. A missing or broken file simply leaves
the text in place (no broken-image icon).

## Current status

Official logos are installed for these brands (height-normalized PNGs with
transparency, rendered 26px tall by `.marquee-logo` in `css/components.css`):

`holbrook.png`, `hudef.png`, `mintsport.png`, `crown.png`, `revolin.png`,
`flik.png`, `onix.png`, `netx.png`

**TopspinPro** and **SpinPro** show as **text** — the brand only publishes a
white logo, which is invisible on the white strip. Drop a dark/colored
`topspinpro.*` / `spinpro.*` here and update their `data-logo` in `index.html`
to activate them.

## How to add or replace a logo

1. Save the official logo here (SVG or transparent PNG).
2. Make sure the item's `data-logo="images/partners/<file>"` in `index.html`
   matches the filename/extension you used.
3. Reload — the marquee item swaps from text to the logo on its own.

## Asset specs

- **Format:** SVG or transparent PNG. (Currently PNG.)
- **Display height:** 26px tall, width auto, capped at 132px.
- **Color:** full-color or dark/mono — must be legible on a **white** background.
- **Trim** excess padding so logos optically align with each other.

## Notes

- Only use **official** partner logos you have the right to display. Do not
  substitute look-alike or recreated marks.
- `data-logo` is not a hard `src`, so referencing a not-yet-added file does **not**
  break the build or the CI asset-link check.
