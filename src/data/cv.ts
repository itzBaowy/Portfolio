// CV-specific editorial copy. Identity, career, education, skills and credentials
// are read from the same data files as the portfolio by scripts/build-cv.mjs.
export const cv = {
  summary:
    "Full-stack software engineer focused on thoughtful interfaces, maintainable backend systems and realtime workflows. Experience spans enterprise software, AI integration and digital product development.",
  selectedProjectSlugs: ["dineflow", "flowsync"],
  projectSummaries: {
    dineflow:
      "QR ordering, kitchen workflows, billing and reports with tenant-scoped realtime updates.",
    flowsync:
      "Planned collaboration platform with Kanban boards, tasks, realtime updates and AI support.",
  } as Record<string, string>,
};
