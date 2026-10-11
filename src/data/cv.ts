// CV-specific editorial copy. Identity, career, education, skills and credentials
// are read from the same data files as the portfolio by scripts/build-cv.mjs.
export const cv = {
  summary:
    "A self-driven full-stack software engineer focused on thoughtful interfaces and reliable backend systems, with a strong track record of independently researching and resolving complex system bottlenecks.",
  experienceBulletOverrides: {
    "Developed APIs for the system's management and tracking workflows.":
      "Proactively designed and developed equipment fault monitoring APIs, optimizing data handling to support stable operation under high data volumes.",
  } as Record<string, string>,
  selectedProjectSlugs: ["dineflow"],
  projectSummaries: {
    dineflow: "Full-stack restaurant platform for QR ordering, kitchen operations and billing.",
  } as Record<string, string>,
  projectHighlights: {
    dineflow: [
      "Unified QR ordering, kitchen and billing workflows with Next.js and NestJS, from confirmation to settlement.",
      "Synchronized guest, staff and kitchen views with Socket.IO and TanStack Query refetching to recover order state after connection drops.",
      "Guarded against duplicate orders and payments with Prisma/PostgreSQL transactions, row locks and idempotency keys; preserved price and receipt snapshots.",
      "Enforced restaurant isolation with tenant-scoped Prisma queries, composite foreign keys and NestJS RBAC.",
      "Tested billing races and tenant isolation with integration tests; verified checkout flows with Playwright.",
      "Authored detailed technical documentation and secured team buy-in for a multi-tenant architecture with NestJS RBAC to strengthen data isolation and access control.",
    ],
  } as Record<string, string[]>,
};
