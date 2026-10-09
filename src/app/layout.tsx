import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { profile } from "@/data/profile";
import { socials } from "@/data/socials";
import "@/styles/globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });
const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: {
    default: `${profile.name ?? "Digital Atelier"} — Fullstack Developer`,
    template: "%s — Digital Atelier",
  },
  description: profile.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Digital Atelier — Fullstack Developer",
    description: profile.description,
    url: profile.siteUrl,
    siteName: "Digital Atelier",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Digital Atelier — Building digital experiences that matter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Atelier — Fullstack Developer",
    description: profile.description,
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Digital Atelier",
      url: profile.siteUrl,
    },
    ...(profile.name
      ? [
          {
            "@context": "https://schema.org",
            "@type": "Person",
            name: profile.name,
            jobTitle: profile.title,
            url: profile.siteUrl,
            sameAs: socials.flatMap((s) => (s.url ? [s.url] : [])),
          },
        ]
      : []),
  ];
  return (
    <html lang="en">
      <body className={`${geist.variable} ${mono.variable} ${display.variable}`}>
        <div id="top" />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Navigation />
        {children}
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
