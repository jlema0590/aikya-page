# Installation and brand refinement implementation plan

Goal: replace separate EN/ES links with one button-like language toggle, add usable
installation steps for each independent product, and use the original Aikya mark
with genuinely circular orbital guides. The existing navy/cyan/turquoise palette,
Outfit typography and desktop/mobile structure remain the visual foundation.

## Implementation

- [x] In `tests/spanish.spec.mjs`, require one keyboard-accessible toggle that
  retains the equivalent route, including without JavaScript.
- [x] Add `tests/installation.spec.mjs`: select operating-system instructions,
  copy exact commands, retain shell syntax in Spanish, and keep Forge source-only.
- [x] Reproduce elliptical guides at different widths in a browser regression test.
- [x] Update `src/i18n.mjs` and toggle CSS. Preserve command blocks verbatim during
  translation, using code elements rather than registering commands as prose.
- [x] Add reviewed installation data/rendering in `src/installation.mjs`, attach
  it to product pages and the getting-started guide, and translate surrounding copy.
  Harness uses verified published Pages scripts; Mods uses its published v0.0.10
  installer with explicit Flow/Usage selection; Forge uses its source quick start.
- [x] Extract the standalone mark from the original Aikya image, save the transparent
  asset under `assets/images/`, and use it consistently in header/footer/hero/favicon.
  Replace elliptical SVG orbital guides with circles; retain pausable/reduced motion.
- [x] Run the full suite, review desktop/mobile screenshots, update 0.1.2 changelog
  and README, publish through existing Pages checks and verify the public artifact.

## Review focus

Commands must remain identical in English and Spanish; long commands scroll inside
their panel. Copy failures give a manual-copy instruction. No-JavaScript readers can
open OS instructions and switch language. Installation snippets are not executed by
the site or these checks. Public availability is distinguished from main-branch docs.
