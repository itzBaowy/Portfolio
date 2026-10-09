# Portfolio validation

Date: 2026-10-09 (Asia/Bangkok).

## Checked

- Strict TypeScript, ESLint and Next.js production static export passed.
- 20 Playwright tests passed: five homepage sizes (375, 430, 768, 1440, 1920px), mobile keyboard menu/focus restoration, same-document Work navigation, four project routes on desktop/mobile, category filters with all 27 technologies, ambient animation/hidden-tab pause/route continuity, mobile trail limits, reduced motion, full-color Hero portrait loading, supplied contact channels, structured data and SEO assets.
- Axe WCAG checks reported no violations on the tested homepage and four project pages. This does not replace manual screen-reader testing.
- The Hero now uses the owner's large 4:5 portrait in the desktop right column and beneath the text on mobile. The orbital components, SVG fallback and Three.js/R3F/Drei dependencies were removed.
- The background was visually inspected at 1440px and 375px and after scrolling to Contact. The fixed grid, light trails and glows remain behind content without intercepting clicks; reduced motion retains only the static background. Reference: https://www.vulebaolong.com/.
- The owner-supplied `baodeptrai.png` is now configured in Hero and About. A WebP derivative preserves the original framing at 800 × 1000 and 51,468 bytes, compared with the 2,030,744-byte PNG. The original is preserved. Real portraits display the owner's name instead of pending-photo copy.
- Both portrait placements preserve their original colors; no grayscale filter is applied. Hero preloads the optimized image.
- Updated desktop 1440px and mobile 375px Hero screenshots were inspected. The photo loads successfully, no horizontal overflow was found across the five tested widths, and the page renders without a canvas.
- The earlier Docker validation passed: image build, Nginx configuration, UID 101, expected HTTP 200/404 routes and security headers. Container configuration is unchanged by the portrait update.

## Lighthouse mobile lab measurements

Production static export served locally, Chromium, Lighthouse default mobile throttling. Latest run after replacing the orbital model with the supplied Hero portrait:

| Page     | Performance | Accessibility | Best practices | SEO |   LCP | CLS |   TBT |
| -------- | ----------: | ------------: | -------------: | --: | ----: | --: | ----: |
| Home     |          93 |           100 |            100 | 100 | 3.2 s |   0 | 30 ms |
| DineFlow |          95 |           100 |            100 | 100 | 3.0 s |   0 | 40 ms |
| FlowSync |          95 |           100 |            100 | 100 | 3.0 s |   0 | 30 ms |

These single-run lab scores vary with machine load.

LCP remains above the requested 2.5 s target in this lab run. INP and production field Core Web Vitals have not been measured. Results may change with device load, hosting, CDN caching, portrait/CV changes and real content. Run `npm run audit:perf` with the production preview active to regenerate HTML/JSON reports under `test-results/lighthouse/`.

## Dependency audit

`npm audit --omit=dev` reported zero vulnerabilities. The full development dependency audit currently reports five high-severity entries propagated from the `braces` dependency used by Next.js ESLint tooling. The installed registry has no fixed `braces` release available; npm’s proposed automatic fix would downgrade the Next.js lint configuration across major versions. No forced downgrade was applied. The affected tooling is absent from the static runtime container. Recheck the audit when updating dependencies.

## Pending verification and input

- A valid PDF CV has not been provided; the production CV link is omitted.
- Experience, education, certificates and verified project implementation details remain unprovided. No claims, results or live links were fabricated.
- Hosting credentials and domain/DNS access have not been configured; no public deployment or HTTPS/domain verification was performed.
- The previous GitHub Actions CI run at `e20206a` was verified successful: https://github.com/itzBaowy/Portfolio/actions/runs/37926296383. New pushes trigger fresh CI; the manual Cloudflare deployment workflow has not been executed.
- Contact uses supplied `mailto`, GitHub and LinkedIn links. Sending email depends on the visitor’s email client; there is no fake contact form.
