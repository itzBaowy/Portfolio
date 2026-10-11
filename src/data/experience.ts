import type { Experience } from "@/types/content";

export const experience: Experience[] = [
  {
    position: "Software Engineer Intern",
    product: "Oil Gas Management System",
    company: "FPT Software",
    startDate: "Jan 2026",
    endDate: "May 2026",
    location: null,
    description:
      "Internal enterprise platform for drilling-rig oversight, equipment fault tracking and oil-production monitoring.",
    responsibilities: [
      "Contributed to Express/Prisma incident APIs covering 5 fault categories and 3 severity levels, with MongoDB filtering and pagination for fault monitoring.",
      "Integrated React monitoring screens with rig, equipment and production APIs using Axios/TanStack Query.",
      "Integrated a Gemini/LangChain chatbot with 12 tools for operational data queries and management actions.",
    ],
    technologies: [
      "React",
      "Node.js",
      "Express",
      "Prisma",
      "MongoDB",
      "TanStack Query",
      "LangChain",
      "Gemini",
    ],
  },
];
