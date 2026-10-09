import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ProjectCover } from "./project-cover";
import { projectStatusLabels } from "@/data/projects";
import { copy } from "@/data/site-copy";
import type { Project } from "@/types/content";

export function ProjectCard({ project, total }: { project: Project; total: number }) {
  return (
    <article className={`project-card ${project.status === "reserved" ? "project-reserved" : ""}`}>
      <Link
        href={`/work/${project.slug}/`}
        className="project-link"
        aria-label={`${copy.work.caseStudy}: ${project.name}${project.status === "reserved" ? ` (${project.number})` : ""}`}
      >
        <div className="project-topline">
          <span className="mono">
            {project.number} / {String(total).padStart(2, "0")}
          </span>
          <span className={`status status-${project.status}`}>
            <span />
            {projectStatusLabels[project.status]}
          </span>
        </div>
        <ProjectCover project={project} compact />
        <div className="project-caption">
          <p className="eyebrow">{project.category}</p>
          <h3>{project.name}</h3>
          <p className="project-description">{project.description}</p>
        </div>
        <div className="project-card-footer">
          {project.technologies.length > 0 ? (
            <div className="tags project-tags">
              {project.technologies.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
          ) : (
            <span className="project-pending mono">{copy.work.detailsPending}</span>
          )}
          <span className="project-card-arrow" aria-hidden="true">
            <ArrowUpRight size={22} />
          </span>
        </div>
      </Link>
      {(project.liveUrl || project.repositoryUrl) && (
        <div className="verified-links">
          {project.liveUrl && (
            <a
              className="text-link"
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Live demo
              <ArrowUpRight size={14} aria-hidden="true" />
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
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          )}
        </div>
      )}
    </article>
  );
}
