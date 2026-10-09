export const skills = [
  {
    id: "languages",
    name: "Languages",
    icon: "code",
    description: "The foundations",
    technologies: ["TypeScript", "JavaScript ES6+"],
  },
  {
    id: "frontend",
    name: "Frontend",
    icon: "layers",
    description: "Interfaces with intention",
    technologies: ["Next.js", "React", "Electron", "Redux", "Tailwind CSS"],
  },
  {
    id: "backend",
    name: "Backend",
    icon: "server",
    description: "Behind the experience",
    technologies: ["NestJS", "Express", "WebSocket"],
  },
  {
    id: "data",
    name: "Data",
    icon: "database",
    description: "Structured to scale",
    technologies: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Elasticsearch"],
  },
  {
    id: "production",
    name: "Production",
    icon: "container",
    description: "From code to deployment",
    technologies: ["Docker", "CI/CD", "GitHub Actions", "Jenkins", "AWS Lightsail"],
  },
  {
    id: "tools",
    name: "AI & Tools",
    icon: "sparkles",
    description: "A considered workflow",
    technologies: ["OpenAI", "Codex", "Claude", "Git", "Figma", "Google Stitch", "Cursor"],
  },
] as const;

export type Technology = (typeof skills)[number]["technologies"][number];
