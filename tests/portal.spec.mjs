import { test, expect } from "@playwright/test";

test("product selection updates the explanation and destination, including keyboard selection", async ({
  page,
}) => {
  await page.goto("");
  await page.getByRole("button", { name: "Forge", exact: true }).click();
  await expect(page.locator("[data-product-name]")).toHaveText("Aikya Forge");
  await expect(page.locator("[data-product-link]")).toHaveAttribute(
    "href",
    "products/forge/",
  );
  await page.getByRole("button", { name: "Mods", exact: true }).focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("[data-product-name]")).toHaveText("Aikya Mods");
});

test("motion can be paused and resumed without changing the selected product", async ({
  page,
}) => {
  await page.goto("");
  await page.getByRole("button", { name: "Pause animation" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-motion", "paused");
  await expect(
    page.getByRole("button", { name: "Resume animation" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Resume animation" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-motion", "running");
  await expect(page.locator("[data-product-name]")).toHaveText("Aikya Harness");
});

test("system reduced motion starts paused and never starts decorative animation", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("");
  await expect(page.locator("html")).toHaveAttribute("data-motion", "paused");
  expect(
    await page
      .locator(".flow-particle")
      .first()
      .evaluate((el) => getComputedStyle(el).animationPlayState),
  ).toBe("paused");
});

for (const width of [390, 768, 1440]) {
  test("navigation and layout work at " + width + "px", async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto("");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page
      .getByRole("link", { name: "Explore Harness", exact: true })
      .click();
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Harness",
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    expect(errors).toEqual([]);
  });
}

test("Forge guidance does not offer an unavailable public download", async ({
  page,
}) => {
  await page.goto("products/forge/");
  await expect(
    page.getByText("First stable release pending", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Source quick start" }),
  ).toHaveAttribute(
    "href",
    "https://github.com/jlema0590/aikya-forge/tree/main#quick-start-from-source",
  );
});

test("all six routes render without JavaScript and expose the primary navigation", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  for (const route of [
    "",
    "products/harness/",
    "products/forge/",
    "products/mods/",
    "guides/comparison/",
    "guides/get-started/",
  ]) {
    const response = await page.goto(
      "http://127.0.0.1:4178/aikya-page/" + route,
    );
    expect(response.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(
      page.getByRole("navigation", { name: "Main navigation" }),
    ).toBeVisible();
  }
  await context.close();
});

test('mobile product buttons remain fully clickable beside the preview panel', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('');
  await page.getByRole('button', { name: 'Mods', exact: true }).click({ position: { x: 8, y: 12 }, timeout: 5000 });
  await expect(page.locator('[data-product-name]')).toHaveText('Aikya Mods');
});
