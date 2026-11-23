import {test, expect} from '@playwright/test';

for (const locale of ['', 'es/']) {
  test(`installation commands remain usable and copyable in ${locale || 'en'}`, async ({page, context}) => {
    await context.grantPermissions(['clipboard-read','clipboard-write']);
    await page.goto(locale + 'guides/get-started/');
    const harness = page.locator('[data-install="harness"]');
    await expect(harness.locator('details[open] code').first()).toHaveText(
      'curl -fsSL https://jlema0590.github.io/aikya-harness/install.sh | sh'
    );
    await harness.getByRole('button', {name:locale ? 'Copiar comando' : 'Copy command'}).first().click();
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
      'curl -fsSL https://jlema0590.github.io/aikya-harness/install.sh | sh'
    );
    await harness.locator('summary').filter({hasText:'Windows'}).click();
    await expect(harness.locator('details').filter({hasText:'Windows PowerShell'}).locator('code')).toHaveText(
      'irm https://jlema0590.github.io/aikya-harness/install.ps1.txt | iex'
    );
    const mods = page.locator('[data-install="mods"]');
    await expect(mods.locator('details[open] code').first()).toContainText('--version v0.0.10 aikya-flow aikya-usage --scope user');
    const forge = page.locator('[data-install="forge"]');
    await expect(forge.locator('details[open] code').first()).toContainText('python -m pip install --no-build-isolation -e ".[terminal]"');
    await expect(forge.locator('.install-systems')).not.toContainText('github.io/aikya-forge/install');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}

for (const width of [390,768,1440]) {
  test(`orbital guides remain circular at ${width}px`, async ({page}) => {
    await page.setViewportSize({width,height:900});
    await page.emulateMedia({reducedMotion:'reduce'});
    await page.goto('');
    const shapes = await page.locator('.orbit-guide').evaluateAll(elements => elements.map(el => {
      const box = el.getBoundingClientRect();
      return {width:box.width,height:box.height};
    }));
    expect(shapes.length).toBeGreaterThan(0);
    for (const shape of shapes) expect(Math.abs(shape.width - shape.height)).toBeLessThan(1);
  });
}
