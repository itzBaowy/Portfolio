# DineFlow engineering bullet evidence

Reviewed: 2026-10-12 (Asia/Bangkok).

Source: https://github.com/itzBaowy/DineFlow, main commit `c3b25f19be92973397d4b0258b30f95dadc1dd55`.

The sibling checkout was inspected read-only after fetching origin. Its two pending upstream commits change web analytics only; the backend, shared domain and test sources used below match the reviewed main branch. No DineFlow application files were changed and its test suite was not rerun for this content edit.

The five bullets in `src/data/projects.ts` are rendered in the DineFlow brief and generated CV. They describe implemented mechanisms rather than unmeasured business improvements, production scale or authorship of every repository change.

| Bullet focus | Repository evidence | Supported claim |
| --- | --- | --- |
| Connected restaurant workflows | `README.md`, `apps/api/src/orders/orders.service.ts`, `apps/api/src/orders/operations.service.ts`, `apps/api/src/payments/payments.service.ts` | Next.js/NestJS support QR ordering, staff confirmation, kitchen preparation, service and cashier settlement. |
| Realtime consistency and reconnects | `apps/api/src/realtime/realtime.gateway.ts`, `apps/api/src/realtime/realtime.service.ts`, `apps/web/src/features/realtime/live-sync.tsx` | Socket.IO requires single-use tickets and scopes delivery by restaurant, role and guest/session. TanStack Query invalidates/refetches REST data on events and reconnect. Events are best-effort; there is no durable outbox or distributed adapter claim. |
| Duplicate requests and billing history | `apps/api/src/orders/orders.service.ts`, `apps/api/src/payments/payments.service.ts`, `apps/api/prisma/schema.prisma`, `apps/api/test/billing.integration.test.ts` | Prisma/PostgreSQL transactions, row locks, idempotency keys and unique payment/session constraints guard writes. Order price and receipt snapshots preserve recorded values; concurrent same-key payment tests assert one payment and post-commit events. Payments are recorded after manual cash/transfer confirmation, not through an external payment gateway. |
| Restaurant isolation and permissions | `apps/api/src/auth/guards.ts`, `apps/api/prisma/schema.prisma`, `apps/api/test/tenancy.integration.test.ts` | Authenticated membership determines restaurant scope; backend role checks and composite foreign keys enforce access and relationships. Multiple restaurant memberships and session revocation on switching are implemented. |
| Verification of failure cases | `apps/api/test/billing.integration.test.ts`, `apps/api/test/tenancy.integration.test.ts`, `apps/api/test/ordering.integration.test.ts`, browser tests under `apps/web` | Repository test cases cover billing races, guest/tenant isolation and end-to-end restaurant workflows. No test-count, coverage percentage or fresh passing-run claim is added to the CV. |

Redis is provisioned infrastructure but not an implemented cache/queue. No AI chatbot, Redis optimization, throughput gain or revenue metric is claimed for DineFlow.
