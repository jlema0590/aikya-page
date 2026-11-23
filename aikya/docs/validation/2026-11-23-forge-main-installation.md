# Forge main installation correction — 2026-11-23

## Evidence and cause

Forge main was checked at commit `4232ee8c1548a640285703c13fd7f002ca622e13`.
Its README blob was `26fee6c99712754041a04d86a7d1d3cbb4516391`:
https://github.com/jlema0590/aikya-forge/blob/4232ee8c1548a640285703c13fd7f002ca622e13/README.md

That README documents prepared native installers, explicitly marked publication
pending. Its source snippet still clones develop, which the portal had reproduced.
The user requested main; the portal now deliberately targets main in both OS
source snippets and links its installation documentation to that branch.

The root main shell/PowerShell installers verify a stable release entry against
SHA256SUMS. They do not provide a source fallback. Reading the release procedure
confirmed that merging main alone does not bypass the real-provider acceptance
and native release gates.

Observed public checks:

- Latest stable release API: HTTP 404.
- https://jlema0590.github.io/aikya-forge/install.sh: HTTP 404.
- https://jlema0590.github.io/aikya-forge/install.ps1.txt: HTTP 404.

## Correction

- Main checkout is used for macOS/Linux and Windows source setup.
- Official native and source-guide links explicitly target main.
- Main's native short commands are documented in a collapsed pending-publication
  disclosure. There are no copy/install actions in that disclosure.
- Copyable source fallback and explicit source-runtime launch remain available.
- English and Spanish share identical commands and retain the same availability facts.

This changes portal documentation, not Forge main, its release gates or public
installer availability. It does not run an installer or establish native acceptance.

## Observed verification

Two regression tests failed before the correction: copied source text used develop
instead of main. Final `npm test` passed the build/link/resource check and all
29 Chromium browser tests on macOS ARM64. The new checks exercise real clipboard
text, both operating-system snippets, main documentation links and the absence of
copy actions for unpublished native commands in both languages.

Desktop/mobile viewport screenshots were reviewed, including the visible pending
notice, source command blocks and horizontal command scrolling. No document
horizontal overflow was found at 390 and 1440px. An element-capture attempt showed
a screenshot-only fixed-element artifact; fresh normal viewport captures confirmed
the skip link remains unfocused at top=-90px and does not cover the actual page.

Screenshots: [desktop](forge-main-desktop.png), [mobile](forge-main-mobile.png).
`git diff --check` passed. This does not establish testing on physical devices,
Safari/Firefox or successful execution of the documented installers.

## Publication

Pending the portal Pages check and deployment.
