# Digital Atelier

## Direction

A personal engineering studio: editorial typography, open composition, carefully framed work and the owner's full-color portrait. No invented achievements or stock portrait.

## Tokens

- Canvas: #08090D; surface: #111318.
- Text: #F5F5F7; secondary: #A1A1AA.
- Accent: #5B8CFF; ambient secondary: #8B5CF6.
- Borders: white at 12% opacity. Radius: 8px for controls, 20px for project imagery.
- Geist body and Space Grotesk display, self-hosted through next/font.
- Desktop grid: 12 columns, maximum 1440px, 64px gutters. Mobile: 24px gutters.
- Section rhythm: 120px desktop, 80px mobile.

## Composition

Hero: near-viewport height; left-aligned oversized three-line headline; a large 4:5 personal portrait in the right column, capped at 440px wide with a fine border, corner marks and soft shadow. Keep the photo's natural colors. On mobile, stack the portrait below the copy and controls with breathing room. Fine rule and section index below.

Selected work: one compact two-column card grid with fine shared borders and dark surfaces, inspired by the owner's reference screenshot. All four slots share the same structure: index/status, a 3.1:1 cover (minimum 120px high), category, strong project title, short description, technology chips and a bottom-right arrow. Use 28px padding on desktop, 24px on tablet, 20px on mobile; switch to one column at 700px. Cards in each row stretch to equal heights and align their footers. Preserve honest concept/coming-soon labels and open the existing project routes. Project detail covers keep their larger composition.

## Motion

Motion handles reveal and page entry. GSAP ScrollTrigger handles timeline progress only. CSS handles portrait/card hover and native smooth scrolling, respecting reduced motion. No Lenis or scroll hijacking. The Hero uses the supplied portrait; no WebGL renderer or 3D library is loaded. Native cursor stays intact. Project links provide a visible focus outline and small corner-arrow feedback instead of a floating cursor label.

The full-site background uses a fixed 72px grid with blue, violet and restrained cyan light trails traveling along its lines, inspired by https://www.vulebaolong.com/. Soft static glows support the existing dark palette. Trails animate only transform and opacity, never capture input, and pause when the document is hidden. Mobile uses a 48px grid and four trails instead of eight; reduced motion removes all trails while preserving the static atmosphere. The background lives in the root layout so it remains fixed and continuous across project navigation.

## Implementation sequence

1. Next.js static foundation, strict types, editable data, navigation and tokens.
2. Responsive Hero with the owner's portrait and honest asset states.
3. Personal sections and all project detail routes, categorized skills and contact.
4. Metadata, static deployment, lint/type/build, browser and accessibility validation.

## Pending owner content

CV, experience, education, dates, roles, verified deployment status and measured project results. Name, portrait, email and social URLs use the owner's supplied information. Empty fields never create fabricated links or claims.
