import { readFile, writeFile, mkdir } from "node:fs/promises";
import { resolve, dirname, sep } from "node:path";
import { pathToFileURL } from "node:url";
import ts from "typescript";
import { chromium } from "@playwright/test";
import { format, resolveConfig } from "prettier";

const dataRoot = resolve("src/data");
const modules = new Map();
async function loadData(name) {
  const file = resolve(dataRoot, `${name}.ts`);
  if (!file.startsWith(dataRoot + sep)) throw new Error("CV data must stay inside src/data");
  if (modules.has(file)) return modules.get(file);
  const source = await readFile(file, "utf8");
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    fileName: file,
  }).outputText;
  const dependencies = new Map();
  for (const [, dependency] of compiled.matchAll(/require\("(\.[^"]+)"\)/g)) {
    const path = resolve(dirname(file), dependency);
    dependencies.set(dependency, await loadData(path.slice(dataRoot.length + 1)));
  }
  const result = { exports: {} };
  const requireData = (id) => {
    if (!dependencies.has(id)) throw new Error(`Unsupported CV data import: ${id}`);
    return dependencies.get(id);
  };
  new Function("require", "module", "exports", compiled)(requireData, result, result.exports);
  modules.set(file, result.exports);
  return result.exports;
}

const { profile, displayName } = await loadData("profile");
const { experience } = await loadData("experience");
const { education, certifications } = await loadData("education");
const { skills } = await loadData("skills");
const { projects } = await loadData("projects");
const { socials } = await loadData("socials");
const { cv } = await loadData("cv");
const css = await readFile("src/templates/cv.css", "utf8");
const text = (value) =>
  String(value ?? "")
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/\.\.$/, ".")
    .replace(
      /[&<>"']/g,
      (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char],
    );
const link = (url, label) => `<a href="${text(url)}">${text(label)}</a>`;
const dates = (item) =>
  item.startDate ? `${text(item.startDate)} - ${text(item.endDate ?? "Present")}` : "";
const entries = experience
  .map(
    (item) => `<article class="entry">
  <div class="entry-heading"><h3>${text(item.position)} <span class="company">| ${text(item.company)}</span></h3>${item.startDate ? `<span class="dates">${dates(item)}</span>` : ""}</div>
  <p class="product">${text(item.product)}</p>
  <p>${text(item.description)}</p>
  ${item.responsibilities.length ? `<ul>${item.responsibilities.map((entry) => `<li>${text(entry)}</li>`).join("")}</ul>` : ""}
</article>`,
  )
  .join("");
const academics = education
  .map(
    (item) => `<article class="entry">
  <div class="entry-heading"><h3>${text(item.school)}</h3><span class="dates">${dates(item)}</span></div>
  <p class="academic-detail">${[item.degree, item.major, ...item.achievements].filter(Boolean).map(text).join(" | ")}</p>
</article>`,
  )
  .join("");
const selected = projects.filter((project) => ["in-progress", "live"].includes(project.status));
const projectEntries = selected
  .map(
    (project) => `<article class="entry">
  <div class="entry-heading"><h3>${link(`${profile.siteUrl}/work/${project.slug}/`, project.name)} <span class="company">| ${text(project.category)}</span></h3><span class="dates">${project.status === "live" ? "Live" : "In development"}</span></div>
  <p>${text(cv.projectSummaries[project.slug] ?? project.overview)}</p>
  <p class="project-stack">${project.technologies.map(text).join(" | ")}</p>
</article>`,
  )
  .join("");
const contacts = [
  profile.email ? link(`mailto:${profile.email}`, profile.email) : "",
  ...socials
    .filter((social) => social.url)
    .map((social) => link(social.url, social.url.replace(/^https?:\/\/(www\.)?/, ""))),
  link(profile.siteUrl, profile.siteUrl.replace(/^https?:\/\//, "")),
]
  .filter(Boolean)
  .join("");

const output = resolve("public/cv");
const basename = "Khuu_Gia_Bao_CV";
const htmlPath = resolve(output, `${basename}.html`);
const pdfPath = resolve(output, `${basename}.pdf`);
const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="${text(displayName)} - ${text(profile.title)} CV. Experience, education, projects and certifications.">
<title>${text(displayName)} | ${text(profile.title)} CV</title><style>${css}</style></head>
<body>
<nav class="toolbar" aria-label="CV actions"><p>${text(displayName)} / CV</p><div class="toolbar-actions">${link(profile.siteUrl, "Portfolio")}
<a class="download" href="./${basename}.pdf" download="${basename}.pdf"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M12 3v12m-5-5 5 5 5-5M5 15v5h14v-5"/></svg>Download PDF</a></div></nav>
<main class="cv-sheet">
<header class="cv-header"><h1>${text(displayName)}</h1><p class="job-title">${text(profile.title)}</p><div class="contacts">${contacts}</div></header>
<section class="summary" aria-labelledby="summary"><h2 id="summary">Profile</h2><p>${text(cv.summary)}</p></section>
<section aria-labelledby="experience"><h2 id="experience">Experience</h2>${entries}</section>
<section aria-labelledby="skills"><h2 id="skills">Technical skills</h2><dl class="skills">${skills.map((group) => `<div><dt>${text(group.name)}</dt><dd>${group.technologies.map(text).join(", ")}</dd></div>`).join("")}</dl></section>
<section aria-labelledby="education"><h2 id="education">Education</h2>${academics}</section>
${selected.length ? `<section aria-labelledby="projects"><h2 id="projects">Selected projects</h2>${projectEntries}</section>` : ""}
<section aria-labelledby="certifications"><h2 id="certifications">Certifications</h2><ul class="certificates">${certifications.map((item) => `<li>${item.credentialUrl ? link(item.credentialUrl, item.name) : text(item.name)}<span class="issuer">${text(item.issuer)} | ${text(item.issuedDate)}</span></li>`).join("")}</ul></section>
</main></body></html>`;
await mkdir(output, { recursive: true });
await writeFile(
  htmlPath,
  await format(html, { ...(await resolveConfig(htmlPath)), parser: "html" }),
);
const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  await page.goto(pathToFileURL(htmlPath).href);
  await page.evaluate(() => document.fonts.ready);
  const pdf = await page.pdf({
    format: "A4",
    preferCSSPageSize: true,
    printBackground: true,
    tagged: true,
    outline: true,
  });
  // Chromium emits its page-tree dictionary uncompressed. Keep this CV to the
  // owner's requested single A4 page and refuse an overflowing regeneration.
  const pageCount = pdf.toString("latin1").match(/\/Type\s*\/Pages\s*\/Count\s+(\d+)\b/);
  if (!pageCount || Number(pageCount[1]) !== 1) {
    throw new Error(
      "CV must fit one A4 page. Shorten the content or adjust cv.css before publishing.",
    );
  }
  await writeFile(pdfPath, pdf);
} finally {
  await browser.close();
}
console.log(`Generated ${htmlPath} and ${pdfPath} from portfolio data.`);
