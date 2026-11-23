# Forge main installation correction

Goal: use Forge main as the portal's installation reference and source target,
while distinguishing prepared native installers from publicly available releases.

Evidence: main commit 4232ee8c1548a640285703c13fd7f002ca622e13 documents native
shell/PowerShell installation as publication pending. Both public installer URLs
return 404 and the latest stable release endpoint returns 404. The same README's
contributor snippet still clones develop; the user explicitly requested main.

- [x] Add browser regressions for main checkout/copy, main documentation links and
  unavailable native commands without an active copy/install action in both locales.
- [x] Update source commands to main; integrate main's official native commands
  behind a clear pending-publication disclosure, with no copy action for that path.
- [x] Keep source fallback, correct links/labels and translate all surrounding copy.
- [x] Run the full suite and review desktop/mobile guide screenshots.
- [ ] Update 0.1.3 docs/changelog, publish and verify deployed HTML and interactions.

No Forge release is created and no installation is performed by this portal change.
