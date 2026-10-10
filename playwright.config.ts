import { defineConfig } from "@playwright/test";

const port = Number(process.env.PORTFOLIO_TEST_PORT ?? 3000);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error("PORTFOLIO_TEST_PORT must be a valid TCP port");
}
const baseURL = `http://127.0.0.1:${port}`;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  use: { baseURL, browserName: "chromium", trace: "retain-on-failure" },
  webServer: {
    command: `npx serve out -l tcp://127.0.0.1:${port}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
  },
});
