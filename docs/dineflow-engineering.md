# DineFlow engineering bullet evidence

Reviewed: 2026-10-12 (Asia/Bangkok).

Source: https://github.com/itzBaowy/DineFlow, main commit `c3b25f19be92973397d4b0258b30f95dadc1dd55`.

The sibling checkout was inspected read-only after fetching origin. Its two pending upstream commits change web analytics only; the backend, shared domain and test sources used below match the reviewed main branch. No DineFlow application files were changed and its test suite was not rerun for this content edit.

The six bullets in `src/data/projects.ts` are shared by the DineFlow brief and CV. Five describe technical mechanisms; the sixth is an owner-supplied contribution about writing technical documentation and securing team buy-in for multi-tenant architecture with NestJS RBAC. Repository code supports the technical mechanisms; the owner's personal communication contribution comes from their supplied update. The strengthened FPT Software API bullet and self-driven profile wording are also owner-supplied copy, now shared by portfolio and CV through their data files.

| Bullet focus | Repository evidence | Supported claim |
| --- | --- | --- |
| Connected restaurant workflows | `README.md`, `apps/api/src/orders/orders.service.ts`, `apps/api/src/orders/operations.service.ts`, `apps/api/src/payments/payments.service.ts` | Next.js/NestJS support QR ordering, staff confirmation, kitchen preparation, service and cashier settlement. |
| Realtime consistency and reconnects | `apps/api/src/realtime/realtime.gateway.ts`, `apps/api/src/realtime/realtime.service.ts`, `apps/web/src/features/realtime/live-sync.tsx` | Socket.IO requires single-use tickets and scopes delivery by restaurant, role and guest/session. TanStack Query invalidates/refetches REST data on events and reconnect. Events are best-effort; there is no durable outbox or distributed adapter claim. |
| Duplicate requests and billing history | `apps/api/src/orders/orders.service.ts`, `apps/api/src/payments/payments.service.ts`, `apps/api/prisma/schema.prisma`, `apps/api/test/billing.integration.test.ts` | Prisma/PostgreSQL transactions, row locks, idempotency keys and unique payment/session constraints guard writes. Order price and receipt snapshots preserve recorded values; concurrent same-key payment tests assert one payment and post-commit events. Payments are recorded after manual cash/transfer confirmation, not through an external payment gateway. |
| Restaurant isolation and permissions | `apps/api/src/auth/guards.ts`, `apps/api/prisma/schema.prisma`, `apps/api/test/tenancy.integration.test.ts` | Authenticated membership determines restaurant scope; backend role checks and composite foreign keys enforce access and relationships. Multiple restaurant memberships and session revocation on switching are implemented. |
| Verification of failure cases | `apps/api/test/billing.integration.test.ts`, `apps/api/test/tenancy.integration.test.ts`, `apps/api/test/ordering.integration.test.ts`, browser tests under `apps/web` | Repository test cases cover billing races, guest/tenant isolation and end-to-end restaurant workflows. No test-count, coverage percentage or fresh passing-run claim is added to the CV. |

Redis is provisioned infrastructure but not an implemented cache/queue. No AI chatbot, Redis optimization, throughput gain or revenue metric is claimed for DineFlow.

## Quantified scope update

The local checkout at `76365f11332f98d61b8f02e97792c7927934e8a4` was inspected read-only for this revision. The CV and portfolio now quantify implemented scope and describe the concurrency assertion explicitly, rather than implying measured production performance:

- **6 order states:** `packages/shared/src/ordering.ts` defines PENDING_CONFIRMATION, ACCEPTED, PREPARING, READY, SERVED and CANCELLED. These are workflow states, not 6 successful processing stages.
- **5 staff roles:** `packages/shared/src/identity.ts` defines OWNER, MANAGER, CASHIER, WAITER and KITCHEN; `apps/api/src/auth/guards.ts` enforces backend role checks. Guests are separate from staff roles.
- **2 identical concurrent payment requests / 1 payment:** the billing integration test named `concurrent identical cash requests commit one payment/close/audit and publish only after commit` submits two requests via `Promise.all`, checks equal receipts and asserts one payment row. The CV says a test was added with this assertion; it does not claim a fresh test run or a production duplicate-payment rate.

No benchmark, measured latency improvement or production volume was available. FPT implementation scope is documented separately in `oilgas-engineering.md`; quantitative performance achievements remain pending measured figures and context.
