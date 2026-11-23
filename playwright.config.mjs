import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  testMatch: "*.spec.mjs",
  fullyParallel: true,
  use: {
    baseURL: "http://127.0.0.1:4178/aikya-page/",
    headless: true,
    launchOptions: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
      ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH }
      : {},
  },
  webServer: {
    command: "npm run dev",
    url: "http://127.0.0.1:4178/aikya-page/",
    reuseExistingServer: !process.env.CI,
    timeout: 20000,
  },
  reporter: "list",
});
