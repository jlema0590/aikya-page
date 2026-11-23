import {test,expect} from '@playwright/test';
const routes=['','products/harness/','products/forge/','products/mods/','guides/comparison/','guides/get-started/'];
for(const route of routes){
  test('language switch retains the equivalent page: '+(route||'home'),async({page})=>{
    await page.goto(route);
    await expect(page.locator('.language-toggle')).toHaveCount(1);
    await page.getByRole('link',{name:'Español',exact:true}).click();
    await expect(page).toHaveURL(new RegExp('/aikya-page/es/'+route+'$'));
    await expect(page.locator('html')).toHaveAttribute('lang','es');
    await expect(page.getByRole('navigation',{name:'Navegación principal'})).toBeVisible();
    const esTitle=await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(esTitle).toBe('https://jlema0590.github.io/aikya-page/es/'+route);
    await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute('href','https://jlema0590.github.io/aikya-page/'+route);
    await expect(page.locator('link[rel="alternate"][hreflang="es"]')).toHaveAttribute('href',esTitle);
    await page.getByRole('link',{name:'English',exact:true}).click();
    await expect(page).toHaveURL(new RegExp('/aikya-page/'+route+'$'));
    await expect(page.locator('html')).toHaveAttribute('lang','en');
  });
}
for(const width of [320,390,768,1440]){
  test('Spanish navigation and heading fit at '+width+'px',async({page})=>{
    await page.setViewportSize({width,height:900});
    await page.goto('es/');
    await expect(page.getByRole('heading',{level:1})).toContainText('De la intención');
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    expect(await page.getByRole('heading',{level:1}).evaluate(el=>el.scrollWidth<=el.clientWidth+1)).toBe(true);
    await page.getByRole('link',{name:'Explorar Harness',exact:true}).click();
    await expect(page).toHaveURL(/\/es\/products\/harness\/$/);
    await expect(page.locator('.language-toggle')).toHaveAttribute('data-language','es');
  });
}

test('Spanish previews and motion controls keep the selected language',async({page})=>{
  await page.goto('es/');
  await page.getByRole('button',{name:'Forge',exact:true}).click();
  await expect(page.locator('[data-product-description]')).toContainText('Reúne el contexto del proyecto');
  await page.getByRole('button',{name:'Pausar animación'}).click();
  await expect(page.locator('html')).toHaveAttribute('data-motion','paused');
  await page.getByRole('button',{name:'Reanudar animación'}).click();
  await expect(page.locator('html')).toHaveAttribute('data-motion','running');
  await page.locator('[data-product-link]').click();
  await expect(page).toHaveURL(/\/es\/products\/forge\/$/);
  await expect(page.getByText('Primera versión estable pendiente',{exact:true})).toBeVisible();
});

test('Spanish routes and language navigation work without JavaScript',async({browser})=>{
  const context=await browser.newContext({javaScriptEnabled:false});
  const page=await context.newPage();
  for(const route of routes){
    const response=await page.goto('http://127.0.0.1:4178/aikya-page/es/'+route);
    expect(response.status()).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('lang','es');
    await expect(page.getByRole('navigation',{name:'Navegación principal'})).toBeVisible();
  }
  await page.getByRole('link',{name:'English',exact:true}).click();
  await expect(page).toHaveURL(/\/guides\/get-started\/$/);
  await context.close();
});


test('Spanish reduced-motion control explains the disabled animation',async({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto('es/');
  await expect(page.getByRole('button',{name:'Movimiento reducido activado'})).toBeDisabled();
  await expect(page.locator('html')).toHaveAttribute('data-motion','paused');
});
