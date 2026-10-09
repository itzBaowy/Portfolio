import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, FileClock, Layers } from "lucide-react";
import { ProjectCover } from "@/components/projects/project-cover";
import { ProjectGallery } from "@/components/projects/project-gallery";
import { DineFlowArchitecture } from "@/components/projects/dineflow-architecture";
import { Reveal } from "@/components/motion/reveal";
import { projects, projectStatusLabels } from "@/data/projects";
import { copy } from "@/data/site-copy";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.name} — Project Brief`,
    description: project.overview,
    robots: project.status === "reserved" ? { index: false, follow: true } : undefined,
    alternates: { canonical: `/work/${slug}/` },
    openGraph: {
      title: `${project.name} — Digital Atelier`,
      description: project.overview,
      url: `/work/${slug}/`,
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: `${project.name} — Digital Atelier project brief`,
        },
      ],
    },
    twitter: {
      title: `${project.name} — Project Brief`,
      description: project.overview,
      card: "summary_large_image",
      images: ["/og.png"],
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index < 0) notFound();
  const project = projects[index];
  const implemented = project.status === "in-progress" || project.status === "live";
  const next = projects[(index + 1) % projects.length];
  return (
    <main id="main" className="container case-study">
      <Link href="/#work" className="text-link case-back">
        <ArrowLeft size={16} aria-hidden="true" />
        {copy.caseStudy.back}
      </Link>
      <Reveal>
        <div className="case-top">
          <p className="eyebrow">
            PROJECT {project.number} / {project.category}
          </p>
          <span className={`status status-${project.status}`}>
            <span />
            {projectStatusLabels[project.status]}
          </span>
        </div>
        <h1>{project.name}</h1>
        <p className="case-intro">{project.description}</p>
        <p className="brief-note mono">
          {implemented ? copy.caseStudy.implementationNote : copy.caseStudy.briefNote}
        </p>
      </Reveal>
      <dl className="case-metadata">
        <div>
          <dt>Role</dt>
          <dd>{project.role ?? "To be confirmed"}</dd>
        </div>
        <div>
          <dt>Year</dt>
          <dd>{project.year ?? "To be confirmed"}</dd>
        </div>
        <div>
          <dt>{implemented ? "Tech stack" : "Planned stack"}</dt>
          <dd>{project.technologies.join(" · ") || "To be documented"}</dd>
        </div>
      </dl>
      {project.liveUrl && (
        <div className="case-actions">
          <a
            className="button button-primary"
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open live demo
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
          {project.cover && (
            <a className="text-link" href={project.cover} target="_blank" rel="noopener noreferrer">
              View full dashboard screenshot
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          )}
        </div>
      )}
      <Reveal className="case-cover">
        <ProjectCover project={project} />
      </Reveal>
      <section className="case-overview case-section" aria-labelledby="overview">
        <p className="eyebrow">01 / THE CONTEXT</p>
        <div>
          <h2 id="overview">{copy.caseStudy.overview}</h2>
          <p>{project.overview}</p>
        </div>
      </section>
      <div className="case-split">
        <section className="case-section" aria-labelledby="problem">
          <p className="eyebrow">02 / THE QUESTION</p>
          <h2 id="problem">{copy.caseStudy.problem}</h2>
          <p>{project.problem}</p>
        </section>
        <section className="case-section" aria-labelledby="solution">
          <p className="eyebrow">03 / THE DIRECTION</p>
          <h2 id="solution">{copy.caseStudy.solution}</h2>
          <p>{project.solution}</p>
        </section>
      </div>
      {!!project.screenshots?.length && (
        <section className="case-section" aria-labelledby="previews">
          <p className="eyebrow">PRODUCT IN ACTION</p>
          <h2 id="previews">{copy.caseStudy.screenshots}</h2>
          <p>{copy.caseStudy.screenshotNote}</p>
          <ProjectGallery screenshots={project.screenshots} />
        </section>
      )}
      <section className="case-section" aria-labelledby="features">
        <p className="eyebrow">04 / THE SCOPE</p>
        <h2 id="features">
          {implemented ? copy.caseStudy.implementedFeatures : copy.caseStudy.features}
        </h2>
        {project.features.length ? (
          <ul className="feature-grid">
            {project.features.map((feature) => (
              <li key={feature}>
                <Check size={18} aria-hidden="true" />
                {feature}
              </li>
            ))}
          </ul>
        ) : (
          <p>Features will be added once the project is defined.</p>
        )}
      </section>
      <section className="case-section" aria-labelledby="architecture">
        <p className="eyebrow">05 / THE SYSTEM</p>
        <h2 id="architecture">{copy.caseStudy.architecture}</h2>
        {project.slug === "dineflow" && project.architecture.length ? (
          <DineFlowArchitecture />
        ) : project.architecture.length ? (
          <ol className="architecture-diagram">
            {project.architecture.map((node) => (
              <li key={node}>
                <Layers size={19} aria-hidden="true" />
                {node}
              </li>
            ))}
          </ol>
        ) : (
          <div className="documentation-pending">
            <Layers size={23} strokeWidth={1.3} aria-hidden="true" />
            <p>{copy.caseStudy.architecturePending}</p>
          </div>
        )}
      </section>
      <div className="case-split">
        <section className="case-section" aria-labelledby="challenges">
          <h2 id="challenges">{copy.caseStudy.challenges}</h2>
          {project.challenges.length ? (
            <ul className="responsibilities">
              {project.challenges.map((challenge) => (
                <li key={challenge}>{challenge}</li>
              ))}
            </ul>
          ) : (
            <p>{copy.caseStudy.challengesPending}</p>
          )}
        </section>
        <section className="case-section" aria-labelledby="results">
          <h2 id="results">{copy.caseStudy.result}</h2>
          <p>{project.result ?? copy.caseStudy.resultPending}</p>
        </section>
      </div>
      <div className="case-links">
        {project.liveUrl || project.repositoryUrl ? (
          <>
            {project.liveUrl && (
              <a
                className="text-link"
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Live demo
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            )}
            {project.repositoryUrl && (
              <a
                className="text-link"
                href={project.repositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub repository
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            )}
          </>
        ) : (
          <p>
            <FileClock size={18} aria-hidden="true" />
            {copy.caseStudy.linksPending}
          </p>
        )}
      </div>
      <Link href={`/work/${next.slug}/`} className="next-project">
        <div>
          <p className="eyebrow">
            {copy.caseStudy.next} / {next.number}
          </p>
          <span>{next.name}</span>
        </div>
        <ArrowRight size={36} strokeWidth={1.2} aria-hidden="true" />
      </Link>
    </main>
  );
}
