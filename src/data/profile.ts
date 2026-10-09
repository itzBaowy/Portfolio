// Replace null values with verified personal information before publishing.
export const profile = {
  name: "Khuu Gia Bao" as string | null,
  namePlaceholder: "Your name",
  initials: "KG",
  title: "Fullstack Developer",
  tagline: "Building digital experiences that matter.",
  description:
    "I design and develop scalable, modern and thoughtful digital products — from intuitive interfaces to robust backend systems.",
  avatar: null as string | null,
  avatarAlt: "Personal portrait",
  email: "notbao.js@gmail.com" as string | null,
  location: null as string | null,
  resumeUrl: null as string | null,
  siteUrl: "https://khuugiabao.com",
  about: [
    "I’m a fullstack developer interested in the space where thoughtful design meets reliable engineering. I work across the frontend and backend, with the user experience at the center of each decision.",
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
