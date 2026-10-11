// CV-specific editorial copy. Identity, career, education, skills and credentials
// are read from the same data files as the portfolio by scripts/build-cv.mjs.
export const cv = {
  summary:
    "Full-stack software engineer focused on thoughtful interfaces, maintainable backend systems and realtime workflows. Experience spans enterprise software, AI integration and digital product development.",
  selectedProjectSlugs: ["dineflow"],
  projectSummaries: {
    dineflow: "Full-stack restaurant platform for QR ordering, kitchen operations and billing.",
  } as Record<string, string>,
};
