// Replace null values with verified personal information before publishing.
export const profile = {
  name: "Khuu Gia Bao" as string | null,
  namePlaceholder: "Your name",
  initials: "KG",
  title: "Fullstack Developer",
  tagline: "Digitizing the entire process that matter.",
  description: "I design and develop scalable, modern and thoughtful digital products.",
  avatar: "/images/baodeptrai1.webp" as string | null,
  avatarAlt: "Portrait",
  email: "notbao.js@gmail.com" as string | null,
  location: null as string | null,
  resumeUrl: "/cv/Khuu_Gia_Bao_CV.pdf" as string | null,
  resumePageUrl: "/cv/Khuu_Gia_Bao_CV.html" as string | null,
  siteUrl: "https://khuugiabao.com",
  about: [
    "I’m a fullstack developer interested in the space where thoughtful design meets reliable engineering. I enjoy building products that are not only functional but also delightful to use.",
    "My focus is on solving problems with clean architecture, maintainable code and careful attention to performance. I explore system design, deployment and AI-assisted development as part of that process.",
  ],
  principles: [
    "User-centered thinking",
    "Clean architecture",
    "Performance by design",
    "Continuous learning",
  ],
};

export const displayName = profile.name ?? profile.namePlaceholder;
