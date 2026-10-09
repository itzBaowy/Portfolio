# Portfolio validation

Date: 2026-10-09 (Asia/Bangkok).

## Checked

- Strict TypeScript, ESLint and Next.js production static export passed.
- 20 Playwright tests passed: five homepage sizes (375, 430, 768, 1440, 1920px), mobile keyboard menu/focus restoration, same-document Work navigation, four project routes on desktop/mobile, category filters with all 27 technologies, ambient animation/hidden-tab pause/route continuity, mobile trail limits, reduced motion, unavailable WebGL fallback, supplied contact channels, structured data and SEO assets.
- Axe WCAG checks reported no violations on the tested homepage and four project pages. This does not replace manual screen-reader testing.
- Desktop/mobile screenshots were inspected. The Hero adapts to a stacked composition and static sculpture on mobile; no horizontal overflow was found.
- The new background was visually inspected at 1440px and 375px and after scrolling to Contact. The fixed grid, light trails and glows remain behind content without intercepting clicks. The desktop canvas is transparent; reduced motion retains only the static background. Reference: https://www.vulebaolong.com/.
- Docker image built successfully. Nginx configuration passed; runtime UID is 101. Home, DineFlow, FlowSync, robots, sitemap and OG image returned HTTP 200; an unknown route returned HTTP 404. Security headers were present.

## Lighthouse mobile lab measurements

Production static export served locally, Chromium, Lighthouse default mobile throttling. Latest run after adding the animated background:

| Page     | Performance | Accessibility | Best practices | SEO |   LCP | CLS |   TBT |
| -------- | ----------: | ------------: | -------------: | --: | ----: | --: | ----: |
| Home     |          93 |           100 |            100 | 100 | 3.1 s |   0 | 90 ms |
| DineFlow |          94 |           100 |            100 | 100 | 3.0 s |   0 | 70 ms |
| FlowSync |          95 |           100 |            100 | 100 | 3.0 s |   0 | 50 ms |

Initial homepage performance was 89. Deferring GSAP until the timeline approaches the viewport, giving the Hero fallback image high fetch priority and removing its mobile entrance animation improved the previous measurement to 94. The latest run with the ambient background measured 93; these single-run lab scores vary with machine load.

LCP remains above the requested 2.5 s target in this lab run. INP and production field Core Web Vitals have not been measured. Results may change with device load, hosting, CDN caching, final portrait/CV assets and real content. Run `npm run audit:perf` with the production preview active to regenerate HTML/JSON reports under `test-results/lighthouse/`.

## Dependency audit

`npm audit --omit=dev` reported zero vulnerabilities. The full development dependency audit currently reports five high-severity entries propagated from the `braces` dependency used by Next.js ESLint tooling. The installed registry has no fixed `braces` release available; npm’s proposed automatic fix would downgrade the Next.js lint configuration across major versions. No forced downgrade was applied. The affected tooling is absent from the static runtime container. Recheck the audit when updating dependencies.

## Pending verification and input

- Actual portrait and valid PDF CV have not been provided. Placeholders remain; the production CV link is omitted.
- Experience, education, certificates and verified project implementation details remain unprovided. No claims, results or live links were fabricated.
- Hosting credentials and domain/DNS access have not been configured; no public deployment or HTTPS/domain verification was performed.
- The previous GitHub Actions CI run at `e20206a` was verified successful: https://github.com/itzBaowy/Portfolio/actions/runs/37926296383. New pushes trigger fresh CI; the manual Cloudflare deployment workflow has not been executed.
- Contact uses supplied `mailto`, GitHub and LinkedIn links. Sending email depends on the visitor’s email client; there is no fake contact form.
