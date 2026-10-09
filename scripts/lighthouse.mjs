import { mkdir, writeFile } from "node:fs/promises";
import lighthouse from "lighthouse";
import { launch } from "chrome-launcher";
import { chromium } from "@playwright/test";

const chrome = await launch({
  chromePath: chromium.executablePath(),
  chromeFlags: ["--headless", "--no-sandbox", "--disable-dev-shm-usage"],
});
try {
  await mkdir("test-results/lighthouse", { recursive: true });
  for (const path of ["/", "/work/dineflow/", "/work/flowsync/"]) {
    const result = await lighthouse(`http://localhost:3000${path}`, {
      port: chrome.port,
      output: ["html", "json"],
      onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
    });
    if (!result) throw new Error("Lighthouse did not return a report.");
    const name = path === "/" ? "home" : path.split("/")[2];
    await writeFile(`test-results/lighthouse/${name}.html`, result.report[0]);
    await writeFile(`test-results/lighthouse/${name}.json`, result.report[1]);
    console.log(
      JSON.stringify({
        page: path,
        scores: Object.fromEntries(
          Object.entries(result.lhr.categories).map(([key, value]) => [
            key,
            Math.round(value.score * 100),
          ]),
        ),
        metrics: Object.fromEntries(
          ["largest-contentful-paint", "cumulative-layout-shift", "total-blocking-time"].map(
            (key) => [key, result.lhr.audits[key].displayValue],
          ),
        ),
      }),
    );
  }
} finally {
  await chrome.kill();
}
