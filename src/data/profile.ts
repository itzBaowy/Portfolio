// Replace null values with verified personal information before publishing.
const professionalSummary =
  "Software Engineering student with hands-on experience developing backend APIs and full-stack applications using Node.js, NestJS, Express, and PostgreSQL. Experienced in designing RESTful APIs, implementing role-based access control, and maintaining data consistency. Eager to deepen backend engineering expertise and contribute to production systems.";

export const profile = {
  name: "Khuu Gia Bao" as string | null,
  namePlaceholder: "Your name",
  initials: "KG",
  title: "Full-Stack Software Engineer",
  tagline: "Digitizing the entire process that matter.",
  description: "I design and develop scalable, modern and thoughtful digital products.",
  avatar: "/images/baodeptrai1.webp" as string | null,
  avatarAlt: "Portrait",
  email: "notbao.js@gmail.com" as string | null,
  location: null as string | null,
  resumeUrl: "/cv/Khuu_Gia_Bao_CV.pdf" as string | null,
  resumePageUrl: "/cv/Khuu_Gia_Bao_CV.html" as string | null,
  siteUrl: "https://khuugiabao.com",
  summary: professionalSummary,
  about: [professionalSummary],
  principles: [
    "User-centered thinking",
    "Clean architecture",
    "Performance by design",
    "Continuous learning",
  ],
};

export const displayName = profile.name ?? profile.namePlaceholder;
