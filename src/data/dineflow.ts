import type { ProjectScreenshot } from "@/types/content";

// Actual DineFlow development QA captures; provenance is in docs/project-assets.md.
export const dineflowScreenshots: ProjectScreenshot[] = [
  {
    src: "/images/projects/dineflow/kitchen.webp",
    title: "Kitchen display",
    description: "Preparation queues with order details, modifiers and kitchen status.",
    alt: "DineFlow kitchen screen with waiting, preparing and ready queues and a table order",
    width: 1440,
    height: 1000,
  },
  {
    src: "/images/projects/dineflow/orders.webp",
    title: "Order management",
    description: "Staff review QR orders before confirmation and kitchen preparation.",
    alt: "DineFlow staff order screen showing status filters and an order awaiting confirmation",
    width: 1440,
    height: 1006,
  },
  {
    src: "/images/projects/dineflow/cashier.webp",
    title: "Cashier & billing",
    description: "Session totals, permitted discounts and cash or manual transfer recording.",
    alt: "DineFlow cashier screen showing a table bill, discounts, service charges and payment controls",
    width: 1440,
    height: 1634,
  },
  {
    src: "/images/projects/dineflow/ordering.webp",
    title: "At-table QR ordering",
    description: "A mobile menu with modifiers, service requests and bill access.",
    alt: "DineFlow mobile guest menu with drinks, ordering controls and staff assistance requests",
    width: 390,
    height: 1579,
  },
];

// Checked against apps/web, apps/api and DineFlow's architecture/deployment docs.
export const dineflowArchitecture = {
  client: {
    title: "Next.js frontend",
    detail: "QR guests, service staff, kitchen, cashiers and restaurant owners.",
    tags: ["App Router", "Responsive UI", "Browser client"],
  },
  api: {
    title: "NestJS API",
    detail: "A modular, tenant-scoped backend for orders, dining sessions, billing and reports.",
    tags: ["Docker / VPS", "RBAC", "Transactions"],
  },
  services: [
    {
      icon: "database",
      title: "PostgreSQL",
      label: "Prisma ORM",
      detail: "Restaurant data, orders, sessions, payments and audit records.",
    },
    {
      icon: "storage",
      title: "S3 / MinIO",
      label: "Private object storage",
      detail: "Menu photos and restaurant logos through the storage service.",
    },
    {
      icon: "mail",
      title: "Resend",
      label: "Transactional email",
      detail: "Account verification and password recovery emails.",
    },
  ],
  caption:
    "Browser clients call the API over HTTPS using REST and Socket.IO. PostgreSQL is the source of truth; realtime events follow committed changes and clients refetch after reconnecting.",
} as const;
