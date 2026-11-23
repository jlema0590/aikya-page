import {test,expect} from '@playwright/test';

for(const locale of ['', 'es/']) {
  test(`Forge source installation uses main and keeps native availability explicit in ${locale || 'en'}`,async({page,context})=>{
    await context.grantPermissions(['clipboard-read','clipboard-write']);
    await page.goto(locale+'guides/get-started/');
    const forge=page.locator('[data-install="forge"]');
    const source=forge.locator('.install-systems details[open] code');
    await expect(source).toContainText('git clone --branch main https://github.com/jlema0590/aikya-forge.git');
    await forge.locator('.install-systems').getByRole('button',{name:locale?'Copiar comando':'Copy command'}).first().click();
    expect(await page.evaluate(()=>navigator.clipboard.readText())).toContain('git clone --branch main https://github.com/jlema0590/aikya-forge.git');
    const native=forge.locator('.pending-native');
    await expect(native).toContainText(locale?'Publicación pendiente':'Publication pending');
    await native.locator('summary').click();
    await expect(native.locator('code').first()).toHaveText('curl -fsSL https://jlema0590.github.io/aikya-forge/install.sh | sh');
    await expect(native.locator('code').last()).toHaveText('irm https://jlema0590.github.io/aikya-forge/install.ps1.txt | iex');
    await expect(native.getByRole('button')).toHaveCount(0);
    await expect(forge.locator('a[href="https://github.com/jlema0590/aikya-forge/tree/main#install-with-one-command"]')).toBeVisible();
    await expect(forge.locator('a[href="https://github.com/jlema0590/aikya-forge/tree/main#quick-start-from-source"]')).toBeVisible();
    await forge.locator('.install-systems summary').filter({hasText:'Windows'}).click();
    await expect(forge.locator('.install-systems details[open] code')).toContainText('git clone --branch main https://github.com/jlema0590/aikya-forge.git');
  });
}
