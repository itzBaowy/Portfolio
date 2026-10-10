# Khuu Gia Bao — Digital Atelier

A responsive Full-Stack Software Engineer portfolio for `https://khuugiabao.com`. Built with Next.js App Router, strict TypeScript, Tailwind CSS, shadcn-style owned UI primitives, Lucide, Motion and GSAP ScrollTrigger.

## Run locally

Use Node.js 22 and npm. The lockfile is committed.

```sh
npm ci
npm run dev
```

Open `http://localhost:3000`. To test the actual static production build:

```sh
npm run build
npm run preview
```

## Edit content

| Content                                                            | File                     |
| ------------------------------------------------------------------ | ------------------------ |
| Name, title, description, portrait, email, CV                      | `src/data/profile.ts`    |
| Projects, status, roles, years, covers, verified links and results | `src/data/projects.ts`   |
| Career timeline                                                    | `src/data/experience.ts` |
| Education and verified certificates                                | `src/data/education.ts`  |
| Technology categories                                              | `src/data/skills.ts`     |
| GitHub and LinkedIn                                                | `src/data/socials.ts`    |
| English UI copy and navigation                                     | `src/data/site-copy.ts`  |

Personal content is separated from presentation. Add a Vietnamese copy dictionary alongside `site-copy.ts` when implementing localization; no Vietnamese toggle is shown until translations and routing exist.

### Portrait

The latest supplied `public/images/baodeptrai1.png` is displayed in Hero and About through an optimized `public/images/baodeptrai1.webp` (800 × 1000). The original PNG is preserved. Both placements use `profile.avatar` and `avatarAlt`, preserve the photo's colors and keep its 4:5 framing. Hero uses a large portrait in the right column, stacked beneath the text on mobile, with image preload for early loading. To replace it, generate a WebP under a new filename and update `profile.avatar` in `src/data/profile.ts` so visitors receive the new photo without waiting for an old cached image to expire. Setting `avatar` to `null` restores the labeled placeholder. No stock or generated portrait is used.

### CV

The owner's English CV is available as the standalone `public/cv/Khuu_Gia_Bao_CV.html` and its matching **one-page A4** PDF, `public/cv/Khuu_Gia_Bao_CV.pdf`. The HTML includes a native Download PDF button and works offline when kept beside the PDF. Portfolio Hero actions provide View CV and Download My CV. The PDF contains selectable text and working contact/project/credential links; print layout omits the web toolbar.

The header includes the owner's full-color portrait in a circular frame at the upper right, with inline icons for email, GitHub, LinkedIn and portfolio links. The portrait is embedded in the HTML so it also loads offline and appears in the PDF.

Run `npm run cv` after editing portfolio data or `src/data/cv.ts` / `src/templates/cv.css`. This reads the same identity, career, education, skills, projects and credentials as the site, creates self-contained HTML, then exports it with Playwright Chromium. Install Chromium with `npx playwright install chromium` if needed. The generator refuses PDFs with more than one page; shorten content or adjust spacing before publishing, then visually inspect the PDF and run `npm run build`. Both generated files are committed so CI/deployment can use them without installing a browser at build time. The existing server-side PDF signature/path check still guards the download action.

### Projects

Four project slots and routes are ready:

- `/work/dineflow/`
- `/work/flowsync/`
- `/work/project-03/`
- `/work/project-04/`

DineFlow now has an implementation overview, actual development screenshots and a responsive system diagram based on its code and architecture/deployment documentation. Its owner-supplied live-demo link is `https://dineflow.khuugiabao.com`. The web domain did not resolve during the 2026-10-10 check; the separate API readiness endpoint returned HTTP 200 with the database up. DineFlow remains **in development**, with no invented role/year or production usage results. See `docs/project-assets.md` for screenshot provenance and architecture scope. FlowSync retains its **planned** status and labeled concept cover. Reserved slots are `noindex` and excluded from the sitemap.

Selected work uses one compact bordered card grid for all four slots: two columns above 700px, one below. Each card includes an index/status, a wide preview, category, title, short description, technology tags and a corner arrow. The whole card opens its project brief and supports keyboard focus; verified external links remain separate. Empty roles/dates stay on the detail pages rather than cluttering cards. Concept covers remain labeled, and reserved slots show “Preview coming soon.” Detailed project pages keep their larger cover layout.

Real screenshots use optimized local WebP assets, descriptive alternatives and links to the complete captures. Edit the DineFlow gallery and diagram content in `src/data/dineflow.ts`; the diagram is native HTML/CSS and does not load a graph-rendering library.

## Design and motion

See `DESIGN.md` for art direction and tokens. Stitch references and metadata are in `.stitch/`; generated content is visual reference, not authoritative project data.

- Motion: readable scroll reveals, page entry and skill filtering.
- GSAP ScrollTrigger: timeline progress only; loaded when timelines approach the viewport.
- CSS: native smooth scrolling, button/card hover and Hero line reveal.
- Ambient background: fixed fine grid, blue/violet/cyan light trails and soft glows across all routes, inspired by [Vu Le Bao Long's portfolio](https://www.vulebaolong.com/). Eight CSS transform/opacity trails on desktop, four on mobile; pauses in hidden tabs. Reduced motion keeps only the static grid and glows. Tune lanes, timing and colors in `src/components/layout/ambient-background.tsx` and `src/styles/globals.css`.
- Hero: supplied full-color portrait with a subtle entrance and hover; reduced motion disables these effects. The former orbital model, fallback illustration and Three.js dependencies have been removed.
- Project cards use a small arrow and subtle cover/background hover with visible keyboard focus. Native cursor stays available; no floating cursor label is used.

### Skills toolbox

Skills use an original bento layout with six category cards, colored icon wells and 27 technology tiles. Languages/Backend have larger marks on desktop; mobile uses compact two-column tiles. Category filters retain keyboard support, pressed state and a concise screen-reader status. Counts come directly from `src/data/skills.ts`; no proficiency ratings are inferred.

The app embeds only 21 selected SVG brand paths from [Simple Icons](https://github.com/simple-icons/simple-icons) and six semantic Lucide symbols (WebSocket, CI/CD, AWS Lightsail, OpenAI, Codex, Google Stitch). There are no icon CDN requests or full-catalog browser imports. Colors are tuned for the dark canvas. Metadata/source links are recorded in `docs/icon-sources.json`, and the package license is preserved under `docs/licenses/`. `simple-icons` is build tooling only. Run `npm run icons` after changing the selections in `scripts/build-tech-icons.mjs`; the generated `src/data/technology-visuals.ts` is checked against every configured technology name.

Navigation, project routes, skill filters and content remain accessible with a keyboard. CV and contact actions use real assets/channels only. JavaScript-disabled visitors can still read server-rendered content and navigate anchors and project links.

## Validate

```sh
npm run typecheck
npm run lint
npm run build
npx playwright install chromium
npm run test:e2e
```

The browser suite covers 375, 430, 768, 1440 and 1920px, mobile menu focus, in-page navigation, all project routes, category filters, ambient motion/visibility/navigation behavior, reduced motion, full-color portrait loading, real contact links, metadata, SEO assets and axe accessibility. Screenshots and failure traces are saved under `test-results/`.

With the production preview running:

```sh
npm run audit:perf
```

Lighthouse reports are generated under `test-results/lighthouse/`. These are local lab measurements, not field Core Web Vitals or a production-domain guarantee. INP requires real interaction/field measurement and is not inferred from Lighthouse TBT.

Regenerate the Open Graph PNG after editing the source SVG with `npm run og`. Use `npm run format` to format source, tests and scripts.

## Deploy

This is a static export: `npm run build` writes `out/`. There is no separate backend or server-side contact form. [Next.js static export documentation](https://nextjs.org/docs/app/guides/static-exports) describes the supported hosting model.

### Cloudflare Pages

Use build command `npm run build`, output directory `out`, Node version `22`. The committed `_headers` file configures response headers and immutable caching for hashed assets.

The manual `Deploy to Cloudflare Pages` workflow requires:

- Secrets: `CLOUDFLARE_API_TOKEN` with Pages edit permission and `CLOUDFLARE_ACCOUNT_ID`.
- Repository variable: `CLOUDFLARE_PAGES_PROJECT`, the name of an existing Pages project.

It runs checks before deploying via [Wrangler Pages](https://developers.cloudflare.com/workers/wrangler/commands/pages/). Configure `khuugiabao.com` in the Pages project’s Custom Domains tab and follow Cloudflare’s DNS/HTTPS setup. No account, DNS change or public deployment has been performed from this repository task.

### Docker / Lightsail

```sh
docker build -t portfolio:local .
docker run --rm -p 8080:8080 portfolio:local
```

Open `http://localhost:8080`. The multistage image serves static files using unprivileged Nginx, with gzip, asset caching, a real 404 and healthcheck. On Lightsail, put the container behind your HTTPS reverse proxy and point the domain to your instance. Domain and TLS provisioning require your infrastructure access.

### CI

`.github/workflows/ci.yml` runs typecheck, lint, build and browser tests on pushes and pull requests to `main`, then uploads the static export and browser artifacts. Actions are pinned to verified commit SHAs. Cloudflare deployment is a separate manually triggered workflow.

## Remaining owner input

- Optional CV tailoring for a specific position; the current one-page English HTML/PDF uses supplied portfolio information.
- Internship technologies; academic degree and major, if desired. FPT University (2023–Present, GPA 8.5/10), the FPT Software internship (Jan–May 2026) with supplied contributions and six Coursera credentials are now included.
- Verified project progress, screenshots, roles, dates, repository/demo links and results.
- Hosting account configuration and domain/DNS access for public deployment.

These gaps are represented honestly in the UI. See `docs/QA.md` for validation evidence and limitations.
