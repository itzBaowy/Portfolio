import type { Project } from "@/types/content";

export const projects: Project[] = [
  {
    slug: "dineflow",
    number: "01",
    name: "DineFlow",
    category: "Restaurant operations",
    description:
      "A more connected dining experience. From the first QR scan to the kitchen’s last order.",
    status: "planned",
    role: null,
    year: null,
    technologies: ["Next.js", "NestJS", "PostgreSQL", "Redis", "WebSocket", "Docker"],
    features: [
      "QR ordering",
      "Restaurant POS",
      "Realtime orders",
      "Kitchen Display System",
      "Table management",
      "Payment management",
    ],
    cover: null,
    liveUrl: null,
    plannedUrl: "https://dineflow.khuugiabao.com",
    repositoryUrl: null,
    overview:
      "A planned restaurant QR ordering and management system that connects guests, service staff and the kitchen in a shared workflow.",
    problem:
      "Restaurant workflows can become fragmented when ordering, table management and kitchen tickets live in separate tools. This project explores a coordinated approach to those interactions.",
    solution:
      "The proposed product brings guest QR ordering, a restaurant POS and a kitchen display into one system, with realtime order updates and table and payment management.",
    architecture: [],
    challenges: [],
    result: null,
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

export const projectStatusLabels = {
  planned: "Planned project",
  "in-progress": "In development",
  live: "Live project",
  reserved: "Coming next",
} as const;
