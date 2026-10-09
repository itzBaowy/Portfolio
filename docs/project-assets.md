# DineFlow project assets and architecture

Updated: 2026-10-10 (Asia/Bangkok).

## Actual screenshots

The five screenshots come from the sibling DineFlow repository's `.local/qa/` directory. They show the implemented application with seeded/demo or browser-test restaurant data in a development environment. They are not generated mockups or screenshots of the public deployment. The visible development indicator and original UI/data are preserved.

| Portfolio asset  | Original DineFlow QA capture | Dimensions  | WebP bytes |
| ---------------- | ---------------------------- | ----------- | ---------: |
| `dashboard.webp` | `dashboard-desktop.png`      | 1440 × 1526 |     106450 |
| `kitchen.webp`   | `kitchen-desktop.png`        | 1440 × 1000 |      53116 |
| `orders.webp`    | `staff-orders-desktop.png`   | 1440 × 1006 |      50932 |
| `cashier.webp`   | `cashier-bill-desktop.png`   | 1440 × 1634 |      85000 |
| `ordering.webp`  | `customer-menu-mobile.png`   | 390 × 1579  |      41288 |

Assets live in `public/images/projects/dineflow/`. Sharp re-encoded the original PNGs as WebP at quality 88 without resizing or retouching. Total: 336786 bytes. Original files in DineFlow are untouched. Dashboard is the project cover; its complete image can be opened from the detail-page action. The other four captures form a gallery whose links open the full image. Preview frames may crop or scale for layout; the asset links preserve the full capture.

## Architecture sources

Read-only inspection of `D:\Projects\DineFlow`:

- `docs/architecture.md`: modular monolith, multi-restaurant scoping, transactions, Socket.IO tickets/events and REST/refetch behavior.
- `docs/deployment-vps.md`: VPS Docker API, PostgreSQL, MinIO and Resend; web deployment target and browser/API routing.
- `apps/web/src/lib/api.ts` and `apps/web/next.config.ts`: optional direct public API origin and same-origin rewrite compatibility.
- `apps/api/package.json`, `apps/api/src/realtime/`, `apps/api/src/storage/`: NestJS, Prisma/pg, Socket.IO and S3-compatible storage.
- `README.md`: implemented ordering, kitchen, billing, reports, staff roles and account workflows.

The diagram shows the Next.js browser UI calling NestJS over REST/Socket.IO, with PostgreSQL/Prisma persistence, MinIO object storage and Resend email. Redis is provisioned locally but not used by the application and is omitted. No Redis adapter, worker, queue, durable event outbox or distributed deployment is represented. Backend events follow database commits; REST/refetch remains the source of truth.

## Demo-link check

The owner requested `https://dineflow.khuugiabao.com`; this exact HTTPS link is displayed on the project card and detail page. During the check on 2026-10-10, that web hostname returned DNS `ENOTFOUND` in this environment, and the web browsing tool could not access it. The separate `https://dineflow-api.khuugiabao.com/api/v1/health/ready` returned HTTP 200 with `status: ok` and `database: up`. This verifies backend readiness only. Web hosting/DNS and complete production browser flows are not verified here; the project remains labeled In development.
