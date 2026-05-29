# Partner logos (drop-in)

The partner marquee on the homepage shows each brand **name as text** by default.
If a logo file exists here at the expected path, `js/main.js` preloads it and
swaps the text for the image automatically — **no code change needed**. A missing
or broken file simply leaves the text in place (no broken-image icon).

## How to add a logo

1. Save the official logo here using the exact filename below.
2. Reload the page — the marquee item swaps from text to the logo on its own.

| Brand          | Expected file                |
|----------------|------------------------------|
| Holbrook       | `holbrook.svg`               |
| HUDEF          | `hudef.svg`                  |
| Mint Sport     | `mintsport.svg`              |
| Crown          | `crown.svg`                  |
| Revolin Sports | `revolin.svg`                |
| FLiK           | `flik.svg`                   |
| ONIX           | `onix.svg`                   |
| TopspinPro     | `topspinpro.svg`             |
| SpinPro        | `spinpro.svg`                |
| NETX           | `netx.svg`                   |

(The path is set per item via `data-logo="images/partners/<file>"` in `index.html`.)

## Asset specs

- **Format:** SVG preferred (crisp at any size). Transparent PNG also fine.
- **Display height:** rendered at 26px tall (`.marquee-logo` in `css/components.css`);
  width auto, capped at 132px.
- **Color:** full-color or monochrome both work; the strip background is white.
- **Trim** excess padding so logos optically align with each other.

## Notes

- Only use **official** partner logos you have the right to display. Do not
  substitute look-alike or recreated marks.
- `data-logo` is not a hard `src`, so referencing a not-yet-added file does **not**
  break the build or the CI asset-link check.
- To change which file a brand points at, edit its `data-logo` in `index.html`.
