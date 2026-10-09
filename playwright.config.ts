import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  use: { baseURL: "http://localhost:3000", browserName: "chromium", trace: "retain-on-failure" },
  webServer: {
    command: "npm run preview",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
});
