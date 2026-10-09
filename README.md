# Khuu Gia Bao — Digital Atelier

A responsive Fullstack Developer portfolio for `https://khuugiabao.com`. Built with Next.js App Router, strict TypeScript, Tailwind CSS, shadcn-style owned UI primitives, Lucide, Motion, GSAP ScrollTrigger, Three.js, React Three Fiber and Drei.

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

Place your actual photo in `public/images/portrait.webp`, set `profile.avatar` to `/images/portrait.webp` and update `avatarAlt`. Use a portrait crop around 800 × 1000. Hero and About share the same configurable image. Until supplied, both show a labeled placeholder. No stock or AI portrait is used.

### CV

Place your real PDF in `public/cv/Fullstack_Developer_CV.pdf` and set `profile.resumeUrl` to `/cv/Fullstack_Developer_CV.pdf`. The server build verifies that the local file exists, stays inside `public/` and starts with a PDF signature. Development displays an unavailable state; production omits the download link until a valid PDF is configured. Rebuild after adding or changing the file. No sample CV is generated.

### Projects

Four project slots and routes are ready:

- `/work/dineflow/`
- `/work/flowsync/`
- `/work/project-03/`
- `/work/project-04/`

DineFlow and FlowSync retain the requirement’s **planned** status. Their covers are explicitly labeled concept illustrations. `plannedUrl` is stored for future deployment and is never rendered as a live link. Populate `liveUrl` and `repositoryUrl` only after verifying them. Add actual roles, dates, architecture, engineering challenges and results before presenting them as completed case studies. Reserved slots are `noindex` and excluded from the sitemap.

## Design and motion

See `DESIGN.md` for art direction and tokens. Stitch references and metadata are in `.stitch/`; generated content is visual reference, not authoritative project data.

- Motion: readable scroll reveals, page entry and skill filtering.
- GSAP ScrollTrigger: timeline progress only; loaded when timelines approach the viewport.
- CSS: native smooth scrolling, button/card hover and Hero line reveal.
- Three.js: lazy desktop orbital sculpture, capped DPR 1.5 and paused rendering outside the viewport or when the document is hidden.
- Static SVG: mobile, reduced motion, blocked/unavailable WebGL and render-error fallback.
- Native cursor stays available. The project hover label is decorative, desktop-only and disabled for reduced motion.

Navigation, project routes, skill filters and content remain accessible with a keyboard. CV and contact actions use real assets/channels only. JavaScript-disabled visitors can still read server-rendered content and navigate anchors and project links.

## Validate

```sh
npm run typecheck
npm run lint
npm run build
npx playwright install chromium
npm run test:e2e
```

The browser suite covers 375, 430, 768, 1440 and 1920px, mobile menu focus, in-page navigation, all project routes, category filters, reduced motion, blocked WebGL, real contact links, metadata, SEO assets and axe accessibility. Screenshots and failure traces are saved under `test-results/`.

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

- Actual portrait and PDF CV.
- Work experience, education and certificates, if applicable.
- Verified project progress, screenshots, roles, dates, repository/demo links and results.
- Hosting account configuration and domain/DNS access for public deployment.

These gaps are represented honestly in the UI. See `docs/QA.md` for validation evidence and limitations.
