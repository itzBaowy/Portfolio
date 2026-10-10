// CV-specific editorial copy. Identity, career, education, skills and credentials
// are read from the same data files as the portfolio by scripts/build-cv.mjs.
export const cv = {
  summary:
    "Fullstack developer focused on thoughtful interfaces, maintainable backend systems and realtime workflows. Experience spans enterprise software, AI integration and digital product development.",
  projectSummaries: {
    dineflow:
      "Restaurant operations application connecting QR ordering, kitchen preparation, staff service, billing and reporting. Includes tenant-scoped workspaces, transactional order/payment records and realtime updates.",
  } as Record<string, string>,
};
