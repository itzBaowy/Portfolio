import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const width of [375, 430, 768, 1440, 1920]) {
  test(`homepage at ${width}px is readable without overflow`, async ({ page }) => {
    await page.setViewportSize({ width, height: 950 });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("link", { name: "Explore My Work" })).toBeVisible();
    await expect
      .poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth))
      .toBe(true);
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all(
        document
          .getAnimations()
          .filter((animation) => animation.effect?.getTiming().iterations !== Infinity)
          .map((animation) => animation.finished),
      );
    });
    await page.screenshot({ path: `test-results/home-${width}.png`, fullPage: true });
    expect(errors).toEqual([]);
  });
}

test("work CTA navigates in-page and production has no fake download", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => {
    document.body.dataset.navigationMarker = "kept";
  });
  await page.getByRole("link", { name: "Explore My Work" }).click();
  await expect(page).toHaveURL(/#work$/);
  await expect(page.locator("#work")).toBeInViewport();
  expect(await page.locator("body").getAttribute("data-navigation-marker")).toBe("kept");
  await expect(page.getByRole("link", { name: "Download My CV" })).toHaveCount(0);
});

test("mobile navigation supports keyboard, closes and restores focus", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Open navigation" });
  await trigger.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(trigger).toBeFocused();
  await trigger.click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: /Work/ })
    .click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(page.locator("#work")).toBeInViewport();
});

test("reduced motion keeps content and static 3D fallback", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1440, height: 950 });
  await page.goto("/");
  await expect(page.locator(".orbital-visual")).toHaveAttribute("data-renderer", "static");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe(
    "auto",
  );
});

test("homepage has no serious accessibility violations", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const result = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(result.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) }))).toEqual(
    [],
  );
});

for (const slug of ["dineflow", "flowsync", "project-03", "project-04"]) {
  test(`${slug} brief renders on desktop and mobile with its own metadata`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.emulateMedia({ reducedMotion: "reduce" });
    for (const width of [1440, 375]) {
      await page.setViewportSize({ width, height: 950 });
      const response = await page.goto(`/work/${slug}/`);
      expect(response?.status()).toBe(200);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expect(page.getByRole("heading", { name: "Overview", exact: true })).toBeVisible();
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        "href",
        `https://khuugiabao.com/work/${slug}/`,
      );
      await expect(page).toHaveTitle(/Project Brief/);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
      ).toBe(true);
      const a11y = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(
        a11y.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })),
      ).toEqual([]);
      await page.screenshot({ path: `test-results/${slug}-${width}.png`, fullPage: true });
    }
    expect(errors).toEqual([]);
  });
}

test("project cards and back navigation work", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#work");
  await page.locator('a.project-link[href="/work/dineflow/"]').click();
  await expect(page).toHaveURL(/\/work\/dineflow\/$/);
  await expect(page.getByRole("heading", { name: "DineFlow", exact: true })).toBeVisible();
  await page.getByRole("link", { name: "Back to selected work" }).click();
  await expect(page).toHaveURL(/\/#work$/);
  await expect(page.locator("#work")).toBeInViewport();
});

test("all 27 technologies are available and category filtering is keyboard accessible", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#skills");
  await expect(page.locator(".technology-list li")).toHaveCount(27);
  const filters = page.getByRole("group", { name: "Filter technologies by category" });
  const backend = filters.getByRole("button", { name: "Backend", exact: true });
  await backend.focus();
  await page.keyboard.press("Enter");
  await expect(backend).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".skill-card")).toHaveCount(1);
  await expect(page.locator(".technology-list li")).toHaveText(["NestJS", "Express", "WebSocket"]);
  await filters.getByRole("button", { name: "All technologies" }).click();
  await expect(page.locator(".technology-list li")).toHaveCount(27);
});

test("SEO assets exist and reserved projects are excluded from sitemap", async ({ request }) => {
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  expect(await sitemap.text()).toContain("https://khuugiabao.com/work/dineflow/");
  expect(await sitemap.text()).not.toContain("project-03");
  const robots = await request.get("/robots.txt");
  expect(await robots.text()).toContain("Sitemap: https://khuugiabao.com/sitemap.xml");
  const image = await request.get("/og.png");
  expect(image.status()).toBe(200);
  expect(image.headers()["content-type"]).toContain("image/png");
});

test("real contact channels and Person structured data use supplied information", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: "Get In Touch" })).toHaveAttribute(
    "href",
    "mailto:notbao.js@gmail.com",
  );
  await expect(page.locator('#contact a[href="https://github.com/itzBaowy"]')).toBeAttached();
  await expect(page.locator('#contact a[href="https://www.linkedin.com/in/kgbao"]')).toBeAttached();
  const schemas = await page.locator('script[type="application/ld+json"]').textContent();
  expect(JSON.parse(schemas!)).toContainEqual(
    expect.objectContaining({ "@type": "Person", name: "Khuu Gia Bao" }),
  );
});

test("blocked WebGL keeps the static visual without runtime errors", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 950 });
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    Object.defineProperty(HTMLCanvasElement.prototype, "getContext", {
      value: function (kind: string, ...args: unknown[]) {
        if (kind === "webgl2") {
          document.body.dataset.webglAttempted = "true";
          return null;
        }
        return Reflect.apply(original, this, [kind, ...args]);
      },
    });
  });
  await page.goto("/");
  await expect(page.locator("body")).toHaveAttribute("data-webgl-attempted", "true");
  await expect(page.locator(".orbital-visual")).toHaveAttribute("data-renderer", "static");
  await expect(page.locator(".orbital-fallback")).toBeVisible();
  expect(errors).toEqual([]);
});
