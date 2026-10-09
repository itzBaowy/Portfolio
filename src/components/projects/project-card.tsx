"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { ProjectCover } from "./project-cover";
import { useMediaQuery } from "@/hooks/use-media-query";
import { projectStatusLabels } from "@/data/projects";
import { copy } from "@/data/site-copy";
import type { Project } from "@/types/content";

export function ProjectCard({ project }: { project: Project }) {
  const pointer = useRef<HTMLSpanElement>(null);
  const enhanced = useMediaQuery("(pointer: fine) and (prefers-reduced-motion: no-preference)");
  return <article className={`project-card ${project.status === "reserved" ? "project-reserved" : ""}`}>
    <Link href={`/work/${project.slug}/`} className="project-link" onPointerMove={event => {
      if (!enhanced || !pointer.current) return;
      const bounds = event.currentTarget.getBoundingClientRect();
      pointer.current.style.left = `${event.clientX - bounds.left}px`;
      pointer.current.style.top = `${event.clientY - bounds.top}px`;
    }}>
      <ProjectCover project={project} />
      {enhanced && <span ref={pointer} className="project-cursor" aria-hidden="true">View Project<ArrowUpRight size={13} /></span>}
      <div className="project-caption"><div><p className="eyebrow">{project.number} / {project.category}</p><h3>{project.name}<ArrowUpRight aria-hidden="true" /></h3><p className="project-description">{project.description}</p></div><div className="project-meta"><span className={`status status-${project.status}`}><span />{projectStatusLabels[project.status]}</span><span>{project.role ?? copy.work.rolePending}</span><span>{project.year ?? copy.work.yearPending}</span><span className="project-case-link">{copy.work.caseStudy}<ArrowUpRight size={14} aria-hidden="true" /></span></div></div>
    </Link>
    <div className="tags project-tags">{project.technologies.map(tech => <span key={tech}>{tech}</span>)}</div>
    {(project.liveUrl || project.repositoryUrl) && <div className="verified-links">{project.liveUrl && <a className="text-link" href={project.liveUrl} target="_blank" rel="noopener noreferrer">Live demo<ArrowUpRight size={14} aria-hidden="true" /></a>}{project.repositoryUrl && <a className="text-link" href={project.repositoryUrl} target="_blank" rel="noopener noreferrer">GitHub repository<ArrowUpRight size={14} aria-hidden="true" /></a>}</div>}
  </article>;
}
