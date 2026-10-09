# Digital Atelier

## Direction

A personal engineering studio: editorial typography, open composition, carefully framed work and a signature orbital sculpture. No invented achievements or stock portrait.

## Tokens

- Canvas: #08090D; surface: #111318.
- Text: #F5F5F7; secondary: #A1A1AA.
- Accent: #5B8CFF; sculpture secondary: #8B5CF6.
- Borders: white at 12% opacity. Radius: 8px for controls, 20px for project imagery.
- Geist body and Space Grotesk display, self-hosted through next/font.
- Desktop grid: 12 columns, maximum 1440px, 64px gutters. Mobile: 24px gutters.
- Section rhythm: 120px desktop, 80px mobile.

## Composition

Hero: near-viewport height; left-aligned oversized three-line headline; orbital sculpture in the right column with a restrained portrait placeholder. Fine rule and section index below. Project showcase: large alternating product concept covers with descriptive captions; label concept previews honestly.

## Motion

Motion handles reveal and page entry. GSAP ScrollTrigger handles timeline progress only. CSS handles hover and native smooth scrolling. No Lenis or scroll hijacking. 3D is lazy loaded only for desktop, pauses outside viewport and when hidden, DPR capped at 1.5; mobile, reduced motion and unavailable WebGL use a static SVG sculpture. Native cursor stays intact; pointer-fine project hover indicator is decorative.

## Implementation sequence

1. Next.js static foundation, strict types, editable data, navigation and tokens.
2. Responsive Hero, honest asset states, animated orbital sculpture and fallback.
3. Personal sections and all project detail routes, categorized skills and contact.
4. Metadata, static deployment, lint/type/build, browser and accessibility validation.

## Pending owner content

Name, portrait, email, CV, social URLs, experience, education, dates, roles, verified deployment status and measured project results. Empty fields never create fabricated links or claims.
