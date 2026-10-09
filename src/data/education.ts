import type { Certification, Education } from "@/types/content";

export const education: Education[] = [
  {
    school: "FPT University",
    major: null,
    startDate: "2023",
    endDate: null,
    degree: null,
    achievements: ["GPA: 8.5/10"],
  },
];

// Owner-supplied credentials, ordered by issue date (newest first).
export const certifications: Certification[] = [
  {
    name: "User Experience Research and Design Specialization",
    issuer: "University of Michigan",
    issuedDate: "Oct 2025",
    credentialUrl: "https://www.coursera.org/account/accomplishments/specialization/H6OHOCJMXL3J",
  },
  {
    name: "Web Applications for Everybody Specialization",
    issuer: "University of Michigan",
    issuedDate: "Jul 2025",
    credentialUrl: "https://www.coursera.org/account/accomplishments/specialization/LEI22TQ3Y619",
  },
  {
    name: "Software Development Lifecycle Specialization",
    issuer: "University of Minnesota",
    issuedDate: "May 2025",
    credentialUrl: "https://www.coursera.org/account/accomplishments/specialization/PEUQIBF1J6XK",
  },
  {
    name: "Web Design for Everybody: Basics of Web Development & Coding Specialization",
    issuer: "University of Michigan",
    issuedDate: "Mar 2025",
    credentialUrl: "https://www.coursera.org/account/accomplishments/specialization/JGH9YKAIH3U2",
  },
  {
    name: "Core Java for Beginners Specialization",
    issuer: "LearnKartS",
    issuedDate: "Feb 2025",
    credentialUrl: "https://www.coursera.org/account/accomplishments/specialization/BN9ROMQT5CNS",
  },
  {
    name: "AI For Everyone",
    issuer: "DeepLearning.AI",
    issuedDate: "Jun 2024",
    credentialUrl: "https://www.coursera.org/account/accomplishments/records/ZXS2B4GSAM6P",
  },
];
