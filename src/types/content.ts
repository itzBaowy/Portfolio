export type ProjectStatus = "planned" | "in-progress" | "live" | "reserved";

export interface Project {
  slug: string;
  number: string;
  name: string;
  category: string;
  description: string;
  status: ProjectStatus;
  role: string | null;
  year: string | null;
  technologies: string[];
  features: string[];
  cover: string | null;
  liveUrl: string | null;
  plannedUrl: string | null;
  repositoryUrl: string | null;
  overview: string;
  problem: string;
  solution: string;
  architecture: string[];
  challenges: string[];
  result: string | null;
}

export interface Experience {
  position: string;
  company: string;
  startDate: string;
  endDate: string | null;
  location: string | null;
  description: string;
  responsibilities: string[];
  technologies: string[];
}

export interface Education {
  school: string;
  major: string;
  startDate: string;
  endDate: string | null;
  degree: string;
  achievements: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  issuedDate: string;
  credentialUrl: string | null;
}

export interface SocialLink {
  label: string;
  url: string | null;
  icon: "github" | "linkedin";
}
