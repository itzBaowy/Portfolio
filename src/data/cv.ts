import { profile } from "./profile";

// CV contact details, project selection and short introductions. Summary, career bullets and
// engineering highlights share the portfolio's source data.
export const cv = {
  phone: "0943113909",
  summary: profile.summary,
  selectedProjectSlugs: ["dineflow"],
  projectSummaries: {
    dineflow: "Full-stack restaurant platform for QR ordering, kitchen operations and billing.",
  } as Record<string, string>,
};
