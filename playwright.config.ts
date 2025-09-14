import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  webServer: {
    command: "pnpm dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI
  },
  use: {
    baseURL: "http://localhost:3000",
    viewport: { width: 800, height: 600 },
    deviceScaleFactor: 1,
    colorScheme: "light",
    locale: "pt-BR",
    timezoneId: "America/Fortaleza",
    screenshot: "only-on-failure"
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } }
  ]
});

