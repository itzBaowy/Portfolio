import type { Project } from "@/types/content";
import { dineflowScreenshots } from "./dineflow";

const projectCatalog: Project[] = [
  {
    slug: "dineflow",
    number: "01",
    name: "DineFlow",
    category: "Restaurant operations",
    description:
      "A full-stack restaurant platform connecting QR ordering, kitchen operations and billing, with realtime updates and isolated restaurant workspaces.",
    status: "in-progress",
    role: null,
    year: null,
    technologies: [
      "Next.js",
      "NestJS",
      "PostgreSQL",
      "Prisma",
      "Socket.IO",
      "TanStack Query",
      "Docker",
      "MinIO",
    ],
    features: [
      "QR ordering",
      "Restaurant POS",
      "Realtime orders",
      "Kitchen Display System",
      "Table management",
      "Payment management",
      "Multi-restaurant workspaces",
      "Revenue reports & staff roles",
    ],
    highlights: [
      "Unified QR ordering, kitchen and billing workflows with Next.js and NestJS, from confirmation to settlement.",
      "Synchronized guest, staff and kitchen views with Socket.IO and TanStack Query refetching to recover order state after connection drops.",
      "Guarded against duplicate orders and payments with Prisma/PostgreSQL transactions, row locks and idempotency keys; preserved price and receipt snapshots.",
      "Enforced restaurant isolation with tenant-scoped Prisma queries, composite foreign keys and NestJS RBAC.",
      "Tested billing races and tenant isolation with integration tests; verified checkout flows with Playwright.",
      "Authored detailed technical documentation and secured team buy-in for a multi-tenant architecture with NestJS RBAC to strengthen data isolation and access control.",
    ],
    cover: "/images/projects/dineflow/dashboard.webp",
    coverAlt: "DineFlow restaurant dashboard with service overview and restaurant configuration",
    screenshots: dineflowScreenshots,
    liveUrl: "https://dineflow.khuugiabao.com",
    plannedUrl: null,
    repositoryUrl: "https://github.com/itzBaowy/DineFlow",
    overview:
      "A restaurant QR ordering and management application that connects guests, service staff, the kitchen and cashiers. Restaurant owners can manage menus, tables, staff and reports in tenant-scoped workspaces.",
    problem:
      "Restaurant workflows can become fragmented when ordering, table management and kitchen tickets live in separate tools. This project explores a coordinated approach to those interactions.",
    solution:
      "Guests order from a table QR code; staff confirm orders before the kitchen prepares them. Realtime updates connect preparation, service and billing, while owners configure the restaurant and review completed revenue.",
    architecture: [
      "Next.js browser frontend for guests and role-based staff workspaces.",
      "NestJS modular API with tenant scoping, authenticated sessions and Socket.IO events.",
      "PostgreSQL with Prisma for transactional restaurant data and immutable order/payment snapshots.",
      "S3-compatible MinIO storage for images; Resend for account verification and recovery email.",
    ],
    challenges: [
      "Scoping restaurant data to authenticated memberships and handling restaurant switches across browser tabs.",
      "Protecting order creation and payment recording with transactions, revision checks and idempotency keys.",
      "Keeping realtime views consistent by refetching after reconnects instead of automatically replaying mutations.",
    ],
    result:
      "Implemented QR ordering, kitchen and staff workflows, billing, reports and multi-restaurant account management. These previews show the application with development demo data; production usage metrics have not been measured.",
  },
  {
    slug: "flowsync",
    number: "02",
    name: "FlowSync",
    category: "Team collaboration",
    description:
      "A shared space for focused teams. Organize the work, stay in sync and keep ideas moving.",
    status: "planned",
    role: null,
    year: null,
    technologies: ["Next.js", "NestJS", "PostgreSQL", "Redis", "BullMQ", "WebSocket"],
    features: [
      "Organizations",
      "Workspaces",
      "Kanban boards",
      "Task management",
      "Realtime collaboration",
      "Notifications",
      "AI assistant",
    ],
    cover: null,
    liveUrl: null,
    plannedUrl: "https://flowsync.khuugiabao.com",
    repositoryUrl: null,
    overview:
      "A planned realtime team collaboration platform built around organizations, workspaces and a shared view of work.",
    problem:
      "Teams need a clear picture of priorities and a way to coordinate changes without losing context between tasks, conversations and notifications.",
    solution:
      "The proposed platform combines Kanban boards, task management and realtime collaboration with notifications and an AI assistant inside organized workspaces.",
    architecture: [],
    challenges: [],
    result: null,
  },
  ...["03", "04"].map((number): Project => ({
    slug: `project-${number}`,
    number,
    name: "The next chapter",
    category: "Future project",
    description: "A space reserved for the next idea worth building.",
    status: "reserved",
    role: null,
    year: null,
    technologies: [],
    features: [],
    cover: null,
    liveUrl: null,
    plannedUrl: null,
    repositoryUrl: null,
    overview:
      "This project slot is reserved. Details will be added when the project is ready to share.",
    problem: "To be documented.",
    solution: "To be documented.",
    architecture: [],
    challenges: [],
    result: null,
  })),
];

// Temporarily hidden from cards, generated routes, sitemap and the CV.
// Remove the slug here to restore its existing project content.
const hiddenProjectSlugs = new Set(["flowsync"]);
export const projects: Project[] = projectCatalog
  .filter((project) => !hiddenProjectSlugs.has(project.slug))
  .map((project, index) => ({ ...project, number: String(index + 1).padStart(2, "0") }));

export const projectStatusLabels = {
  planned: "Planned project",
  "in-progress": "In development",
  live: "Live project",
  reserved: "Coming next",
} as const;
