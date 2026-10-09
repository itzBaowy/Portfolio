# Portfolio validation

Date: 2026-10-09 (Asia/Bangkok).

## Checked

- Strict TypeScript, ESLint and Next.js production static export passed.
- The latest full suite, after adding the owner's education, internship and certifications, passed all 20 Playwright tests: five homepage sizes (375, 430, 768, 1440, 1920px), mobile keyboard menu/focus restoration, same-document Work navigation, four project routes on desktop/mobile, category filters with all 27 technologies, ambient animation/hidden-tab pause/route continuity, mobile trail limits, reduced motion, full-color Hero portrait loading, supplied contact channels, structured data and SEO assets.
- FPT University (2023–Present, GPA 8.5/10), Software Engineer Intern at FPT Software (Jan–May 2026) and the internal Oil Gas Management System project use owner-supplied information. Experience now spans the section: dates/product/company occupy the left column, with role, project scope and API/UI/AI chatbot contributions on the right. The description covers drilling rigs, equipment faults and oil production. Focused browser geometry/content checks and Axe checks passed at 1440/1024/768/375px; the desktop columns align and mobile stacks without overflow. Final desktop/mobile screenshots were inspected after correcting the description's CSS specificity. The full 20-test suite passed before that typography correction; focused journey checks passed afterward.
- Six certification cards show supplied issuers/months and direct Coursera credential URLs, sorted newest first. Focused browser checks confirmed all six IDs and safe new-tab links, content accuracy and no overflow at 1440/768/375px. Desktop/mobile screenshots were inspected. Academic degree/major and unspecified internship technologies remain omitted.
- Skills now use an original two-column bento composition with 27 inline SVG technology icons (21 selected brand paths and six semantic symbols). Screenshots were inspected at 1440px and 375px; all 27 SVGs rendered at 1440/1024/768/375px without horizontal overflow. All six category filters and All were exercised: visible tile/icon counts matched the button counts and Axe reported zero WCAG violations in every state. The filter-counter contrast issue found in the first run was corrected before the final passing suite. Icon data is committed and uses no CDN requests; the complete Simple Icons catalog is absent from app imports.
- The four project slots now share a compact card grid. Browser geometry checks confirmed two equal-width columns at 1440px/768px and a single column at 375px; desktop cards are about 483px high, mobile cards about 401–432px. Final preview screenshots were inspected. Keyboard Enter opens the DineFlow brief, and all existing project links/back navigation passed. Concept/planned/coming-soon states remain explicit; detail-page cover sizing is preserved.
- Axe WCAG checks reported no violations on the tested homepage and four project pages. This does not replace manual screen-reader testing.
- The Hero now uses the owner's large 4:5 portrait in the desktop right column and beneath the text on mobile. The orbital components, SVG fallback and Three.js/R3F/Drei dependencies were removed.
- The background was visually inspected at 1440px and 375px and after scrolling to Contact. The fixed grid, light trails and glows remain behind content without intercepting clicks; reduced motion retains only the static background. Reference: https://www.vulebaolong.com/.
- The latest owner-supplied `baodeptrai1.png` is now configured in Hero and About. Its `baodeptrai1.webp` derivative preserves the original framing at 800 × 1000 and 46,794 bytes, compared with the 1,997,340-byte PNG. The original is preserved. A new asset URL avoids stale cached copies of the previous photo. Real portraits display the owner's name instead of pending-photo copy.
- After this image replacement, the production build and eight focused browser checks passed: five homepage widths, reduced motion, accessibility and portrait loading. Both Hero and About decoded the new asset at 1440px and 375px with no CSS filter; portrait screenshots were inspected.
- Both portrait placements preserve their original colors; no grayscale filter is applied. Hero preloads the optimized image.
- Updated desktop 1440px and mobile 375px Hero screenshots were inspected. The photo loads successfully, no horizontal overflow was found across the five tested widths, and the page renders without a canvas.
- The earlier Docker validation passed: image build, Nginx configuration, UID 101, expected HTTP 200/404 routes and security headers. Container configuration is unchanged by the portrait update.

## Lighthouse mobile lab measurements

Production static export served locally, Chromium, Lighthouse default mobile throttling. Latest run after the Skills toolbox redesign:

| Page     | Performance | Accessibility | Best practices | SEO |   LCP | CLS |   TBT |
| -------- | ----------: | ------------: | -------------: | --: | ----: | --: | ----: |
| Home     |          91 |           100 |            100 | 100 | 3.5 s |   0 | 60 ms |
| DineFlow |          97 |           100 |            100 | 100 | 2.6 s |   0 | 60 ms |
| FlowSync |          95 |           100 |            100 | 100 | 3.0 s |   0 | 50 ms |

These single-run lab scores vary with machine load.

LCP remains above the requested 2.5 s target in this lab run. INP and production field Core Web Vitals have not been measured. Results may change with device load, hosting, CDN caching, portrait/CV changes and real content. Run `npm run audit:perf` with the production preview active to regenerate HTML/JSON reports under `test-results/lighthouse/`.

## Dependency audit

`npm audit --omit=dev` reported zero vulnerabilities. The full development dependency audit currently reports five high-severity entries propagated from the `braces` dependency used by Next.js ESLint tooling. The installed registry has no fixed `braces` release available; npm’s proposed automatic fix would downgrade the Next.js lint configuration across major versions. No forced downgrade was applied. The affected tooling is absent from the static runtime container. Recheck the audit when updating dependencies.

## Pending verification and input

- A valid PDF CV has not been provided; the production CV link is omitted.
- Internship technologies, academic degree/major and verified portfolio project implementation details remain unprovided. No claims, results or live links were fabricated.
- Hosting credentials and domain/DNS access have not been configured; no public deployment or HTTPS/domain verification was performed.
- The previous GitHub Actions CI run at `e20206a` was verified successful: https://github.com/itzBaowy/Portfolio/actions/runs/37926296383. New pushes trigger fresh CI; the manual Cloudflare deployment workflow has not been executed.
- Contact uses supplied `mailto`, GitHub and LinkedIn links. Sending email depends on the visitor’s email client; there is no fake contact form.
