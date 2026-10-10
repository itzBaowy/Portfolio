import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { readFile } from "node:fs/promises";

test("ambient background moves, stays fixed across navigation and pauses in a hidden tab", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 950 });
  await page.goto("/");
  const background = page.locator(".ambient-background");
  const trail = background.locator(".ambient-trail").first();
  await expect(background).toHaveAttribute("aria-hidden", "true");
  await expect(background).toHaveCSS("pointer-events", "none");
  await expect(background).toHaveCSS("position", "fixed");
  const initialTransform = await trail.evaluate((node) => getComputedStyle(node).transform);
  await expect
    .poll(() => trail.evaluate((node) => getComputedStyle(node).transform))
    .not.toBe(initialTransform);

  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", { configurable: true, get: () => true });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await expect(trail).toHaveCSS("animation-play-state", "paused");
  const pausedTransforms = await trail.evaluate(async (node) => {
    const first = getComputedStyle(node).transform;
    await new Promise<void>((resolve) =>
      requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
    );
    return [first, getComputedStyle(node).transform];
  });
  expect(pausedTransforms[0]).toBe(pausedTransforms[1]);
  await page.evaluate(() => {
    Reflect.deleteProperty(document, "hidden");
    document.dispatchEvent(new Event("visibilitychange"));
    document.querySelector<HTMLElement>(".ambient-background")!.dataset.navigationMarker = "kept";
  });
  await expect(trail).toHaveCSS("animation-play-state", "running");
  await page.getByRole("link", { name: "Explore My Work" }).click();
  expect((await background.boundingBox())?.y).toBe(0);
  await page.locator('a.project-link[href="/work/dineflow/"]').click();
  await expect(page).toHaveURL(/\/work\/dineflow\/$/);
  await expect(background).toHaveCount(1);
  await expect(background).toHaveAttribute("data-navigation-marker", "kept");
});

test("mobile limits ambient animation and reduced motion keeps a static grid", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  const trails = page.locator(".ambient-trail");
  await expect(page.locator(".ambient-trail:visible")).toHaveCount(4);
  await expect
    .poll(() => trails.evaluateAll((nodes) => nodes.flatMap((node) => node.getAnimations()).length))
    .toBe(4);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".ambient-trail:visible")).toHaveCount(0);
  await expect
    .poll(() => trails.evaluateAll((nodes) => nodes.flatMap((node) => node.getAnimations()).length))
    .toBe(0);
  await expect(page.locator(".ambient-grid")).toBeVisible();
  await expect(page.getByRole("link", { name: "Explore My Work" })).toBeVisible();
});

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

test("work CTA navigates in-page and CV links to a real PDF", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => {
    document.body.dataset.navigationMarker = "kept";
  });
  await page.getByRole("link", { name: "Explore My Work" }).click();
  await expect(page).toHaveURL(/#work$/);
  await expect(page.locator("#work")).toBeInViewport();
  expect(await page.locator("body").getAttribute("data-navigation-marker")).toBe("kept");
  const cv = page.getByRole("link", { name: "Download My CV" });
  await expect(cv).toHaveAttribute("href", "/cv/Khuu_Gia_Bao_CV.pdf");
  await expect(cv).toHaveAttribute("download", "");
  const pdf = await page.request.get("/cv/Khuu_Gia_Bao_CV.pdf");
  expect(pdf.status()).toBe(200);
  expect(pdf.headers()["content-type"]).toContain("application/pdf");
  expect((await pdf.body()).subarray(0, 5).toString()).toBe("%PDF-");
});

test("standalone HTML CV is responsive, accessible and downloads the actual PDF", async ({
  page,
}) => {
  await page.goto("/cv/Khuu_Gia_Bao_CV.html");
  for (const width of [1100, 375]) {
    await page.setViewportSize({ width, height: 950 });
    await expect(page.getByRole("heading", { level: 1, name: "Khuu Gia Bao" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Download PDF", exact: true })).toBeVisible();
    await expect(page.locator(".certificates li")).toHaveCount(6);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
    ).toBe(true);
    const accessibility = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(accessibility.violations.map((violation) => violation.id)).toEqual([]);
  }
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("link", { name: "Download PDF", exact: true }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("Khuu_Gia_Bao_CV.pdf");
  expect(await download.failure()).toBeNull();
  const response = await page.request.get("/cv/Khuu_Gia_Bao_CV.pdf");
  expect(await readFile((await download.path())!)).toEqual(await response.body());
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

test("reduced motion keeps content and the hero portrait", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1440, height: 950 });
  await page.goto("/");
  await expect(page.locator("#home .portrait-image")).toBeVisible();
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

test("hero displays the supplied full-color portrait without 3D rendering", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 950 });
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  const portrait = page.locator("#home").getByRole("img", { name: "Portrait — Khuu Gia Bao" });
  await expect(portrait).toBeVisible();
  await expect(portrait).toHaveCSS("filter", "none");
  await expect
    .poll(() =>
      portrait.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0),
    )
    .toBe(true);
  await expect(page.locator("canvas")).toHaveCount(0);
  await expect(page.locator(".portrait-placeholder")).toHaveCount(0);
  expect(errors).toEqual([]);
});
