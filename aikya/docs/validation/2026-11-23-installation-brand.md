# Installation and brand refinement validation — 2026-11-23

## Delivered behavior

A single EN/ES toggle replaces the two separate links. Its highlight identifies
the current language and activating it opens the equivalent page in the other
language. It remains a native navigation link for keyboard and no-script access.

The getting-started guide and each product page display operating-system
instructions and copy controls. Long commands scroll inside their own panel;
Spanish translation preserves code text verbatim. New/existing Harness project
commands are separate so copying one does not request both workflows.

- Harness: published macOS/Linux and Windows Pages entry scripts returned HTTP 200
  and identified release 7.2.2. Its verified defaults include Flow/Usage; BoxBot is optional.
- Mods: the latest published release endpoint returned v0.0.10. Instructions use
  that tag's standalone scripts, explicitly select Flow/Usage, and declare Git and
  compatible Claude Code requirements. Newer main-branch OS release assets are
  not advertised as published. Existing Harness-installed mods need no second install.
- Forge: latest stable release returned 404. The page retains the documented
  develop source setup and explicit terminal launch rather than offering an unavailable installer.

These checks inspect instructions; they do not execute installers or alter users'
Harness, Forge, Mods, Python, Node, Claude or provider configurations.

## Brand and geometry

The source reference is the original mark in
https://github.com/jlema0590/aikya-harness/blob/main/docs/images/aikya-harness.png

The final `assets/images/aikya-mark.svg` is a clean vector trace based on that
symbol, with the original navy/cyan/turquoise palette and true circular nodes.
It replaces the former approximate mark in header, footer, favicon and hero.
It is not a pixel-identical crop: SVG contours were reconstructed for clean scaling.
Raster cutout attempts with irregular transparency were rejected rather than shipped.
The hero shares this same standalone asset and positions it above the preview panel.

The former orbital SVG guides had unequal horizontal/vertical radii. Browser
measurements reproduced width/height differences of about 47–79px across viewports.
Both guides and the hand-drawn connection loop now use true circles. Motion still
follows pause/resume, system reduced motion and off-screen behavior.

## Observed verification

- Before implementation, installation panels and the single toggle failed their
  browser tests because those controls did not exist. Circular geometry tests
  failed at 390, 768 and 1440px.
- Final `npm test`: build/link/resource check passed; all 27 Chromium browser tests
  passed on macOS ARM64. Existing English/Spanish routes and interactions passed.
- Copy tests read the actual browser clipboard and confirmed exact command text
  in English and Spanish, including Windows and shell quoting.
- Additional real-browser checks confirmed no-script Windows OS disclosures,
  hidden no-script copy buttons, and Enter-key navigation through the toggle.
- Spanish guide/product pages fit document widths of 320, 390 and 1440px.
- Desktop/mobile screenshots were visually reviewed. Evidence:
  [hero](installation-brand-desktop.png), [mobile guide](installation-guide-mobile.png).
- `git diff --check` passed.

This does not establish execution of the documented installers or testing on
physical devices, Safari or Firefox. Hosted Linux verification is recorded below
when observed.

## Publication

Pages check and deploy both completed successfully for source commit
`e519d156d80453d0489bb7e998106200884b19c6`:
https://github.com/jlema0590/aikya-page/actions/runs/45225245040

All twelve public HTML pages returned HTTP 200 and matched the local generated
artifact byte-for-byte. The published app module, mark SVG and changed stylesheets
also matched. Public Chromium checks passed for the single language toggle,
Enter-key navigation, actual clipboard text and Windows instruction selection.
No page errors were observed.

Published site: https://jlema0590.github.io/aikya-page/es/
Installation guide: https://jlema0590.github.io/aikya-page/es/guides/get-started/

This validation-only follow-up changes no deployed files and does not request a
second Pages build.
