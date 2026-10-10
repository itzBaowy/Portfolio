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

DineFlow uses its actual dashboard screenshot as the cover and a four-image product gallery on its detail page. Gallery previews have descriptive captions and links to full captures; phone previews retain a readable device-width column. The system diagram uses responsive HTML/CSS nodes with directional arrows for the browser frontend, REST/Socket.IO API and persistence/integrations. Screenshot captions distinguish development demo data from production usage; the supplied demo URL does not imply a completed deployment.

Skills: an original toolbox composition rather than the reference's horizontal badge rows. Six category cards form a two-column bento grid above 850px. Each card has a small category mark, index, description and technology tiles with colored icon wells. Languages/Backend use larger marks on desktop; other groups use compact tiles. Category washes stay faint and technology names stay neutral/high contrast. Mobile stacks the groups and uses two columns of compact tiles. A segmented filter bar displays real counts; the heading pairs with totals of 27 technologies and six layers, derived from the data. No proficiency percentages or unverified experience claims.

Experience: a full-width timeline with two columns above 850px. The narrower left column contains dates, product name and company; the right column contains the role, a prominent project description and concise contribution bullets. Use blue date/role labels, fine horizontal rules and the existing scroll-progress rail. Stack metadata before the role and description on mobile. Education follows in its own section, with the heading and academic record sharing the same desktop column proportions; certifications remain a separate responsive card grid.

CV: a standalone light document with navy text, restrained blue section rules and readable Arial typography. Keep the PDF to one A4 page with 12mm margins, selectable text and active contact/credential links. Career, skills, education and implemented projects use the portfolio's data; certifications use a compact two-column list that stacks on mobile. The HTML includes a native PDF download button, hidden during printing. The generator refuses multi-page exports. Hero provides both View CV and Download My CV.

## Motion

Motion handles reveal and page entry. GSAP ScrollTrigger handles timeline progress only. CSS handles portrait/card hover and native smooth scrolling, respecting reduced motion. No Lenis or scroll hijacking. The Hero uses the supplied portrait; no WebGL renderer or 3D library is loaded. Native cursor stays intact. Project links provide a visible focus outline and small corner-arrow feedback instead of a floating cursor label.

The full-site background uses a fixed 72px grid with blue, violet and restrained cyan light trails traveling along its lines, inspired by https://www.vulebaolong.com/. Soft static glows support the existing dark palette. Trails animate only transform and opacity, never capture input, and pause when the document is hidden. Mobile uses a 48px grid and four trails instead of eight; reduced motion removes all trails while preserving the static atmosphere. The background lives in the root layout so it remains fixed and continuous across project navigation.

## Implementation sequence

1. Next.js static foundation, strict types, editable data, navigation and tokens.
2. Responsive Hero with the owner's portrait and honest asset states.
3. Personal sections and all project detail routes, categorized skills and contact.
4. Metadata, static deployment, lint/type/build, browser and accessibility validation.

## Pending owner content

Academic degree/major, internship technologies, verified deployment status and measured portfolio project results. Name, portrait, education, career dates/contributions, certifications, email and social URLs use the owner's supplied information; the one-page CV is generated from these data. Empty fields never create fabricated links or claims.
