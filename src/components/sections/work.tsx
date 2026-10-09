import { Reveal } from "@/components/motion/reveal";
import { ProjectCard } from "@/components/projects/project-card";
import { SectionHeading } from "./section-heading";
import { projects } from "@/data/projects";
import { copy } from "@/data/site-copy";

export function Work() {
  return (
    <section id="work" className="container section work-section" aria-labelledby="work-heading">
      <Reveal>
        <SectionHeading id="work-heading" {...copy.work} />
      </Reveal>
      <div className="project-showcase">
        {projects.map((project, index) => (
          <Reveal key={project.slug} className="project-cell" delay={(index % 2) * 0.08}>
            <ProjectCard project={project} total={projects.length} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
