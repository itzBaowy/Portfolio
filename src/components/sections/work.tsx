import { Reveal } from "@/components/motion/reveal";
import { ProjectCard } from "@/components/projects/project-card";
import { SectionHeading } from "./section-heading";
import { projects } from "@/data/projects";
import { copy } from "@/data/site-copy";

export function Work() {
  return <section id="work" className="container section work-section" aria-labelledby="work-heading">
    <Reveal><SectionHeading id="work-heading" {...copy.work} /></Reveal>
    <div className="project-showcase">{projects.filter(p => p.status !== "reserved").map((project,index) => <Reveal key={project.slug} className={`project-row project-row-${index}`} delay={index * .08}><ProjectCard project={project} /></Reveal>)}</div>
    <div className="reserved-projects">{projects.filter(p => p.status === "reserved").map((project,index) => <Reveal key={project.slug} delay={index * .08}><ProjectCard project={project} /></Reveal>)}</div>
  </section>;
}
