"use client";
import { useState } from "react";
import { AnimatePresence, LazyMotion, domAnimation, m } from "motion/react";
import { Code2, Container, Database, Layers3, LayoutGrid, Server, Sparkles } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { skills } from "@/data/skills";
import { copy } from "@/data/site-copy";
import { useMediaQuery } from "@/hooks/use-media-query";
import { TechnologyIcon } from "@/components/ui/technology-icon";

const icons = {
  code: Code2,
  layers: Layers3,
  server: Server,
  database: Database,
  container: Container,
  sparkles: Sparkles,
};

export function Skills() {
  const [category, setCategory] = useState("all");
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const filtered = skills.filter((skill) => category === "all" || skill.id === category);
  const total = skills.reduce((sum, skill) => sum + skill.technologies.length, 0);
  const shown = filtered.reduce((sum, skill) => sum + skill.technologies.length, 0);
  return (
    <section
      id="skills"
      className="container section skills-section"
      aria-labelledby="skills-heading"
    >
      <div className="skills-heading-row">
        <SectionHeading id="skills-heading" {...copy.skills} />
        <div
          className="skills-summary"
          role="group"
          aria-label={`${total} technologies across ${skills.length} categories`}
        >
          <div>
            <strong>{total}</strong>
            <span className="mono">{copy.skills.technologies}</span>
          </div>
          <div>
            <strong>{String(skills.length).padStart(2, "0")}</strong>
            <span className="mono">{copy.skills.layers}</span>
          </div>
        </div>
      </div>
      <div className="skill-filters" role="group" aria-label="Filter technologies by category">
        <button aria-pressed={category === "all"} onClick={() => setCategory("all")}>
          <LayoutGrid size={14} aria-hidden="true" />
          {copy.skills.all}
          <span className="filter-count mono" aria-hidden="true">
            {total}
          </span>
        </button>
        {skills.map((skill) => {
          const Icon = icons[skill.icon];
          return (
            <button
              key={skill.id}
              aria-pressed={category === skill.id}
              onClick={() => setCategory(skill.id)}
            >
              <Icon size={14} aria-hidden="true" />
              {skill.name}
              <span className="filter-count mono" aria-hidden="true">
                {skill.technologies.length}
              </span>
            </button>
          );
        })}
      </div>
      <p className="sr-only" role="status">
        {shown} technologies in {filtered.length} categories shown.
      </p>
      <LazyMotion features={domAnimation}>
        <div className={`skills-grid ${category !== "all" ? "skills-filtered" : ""}`}>
          <AnimatePresence initial={false} mode="popLayout">
            {filtered.map((skill) => {
              const Icon = icons[skill.icon];
              return (
                <m.article
                  layout={!reduced}
                  key={skill.id}
                  className={`skill-card skill-${skill.id}`}
                  initial={{ y: reduced ? 0 : 10 }}
                  animate={{ y: 0 }}
                  exit={{ scale: reduced ? 1 : 0.98 }}
                  transition={{ duration: reduced ? 0 : 0.25 }}
                >
                  <div className="skill-card-header">
                    <span className="skill-category-icon">
                      <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
                    </span>
                    <div>
                      <h3>{skill.name}</h3>
                      <p>{skill.description}</p>
                    </div>
                    <span className="skill-index mono">
                      0{skills.findIndex((s) => s.id === skill.id) + 1}
                    </span>
                  </div>
                  <ul className="technology-list">
                    {skill.technologies.map((tech) => (
                      <li key={tech}>
                        <TechnologyIcon technology={tech} />
                        <span className="technology-label">{tech}</span>
                      </li>
                    ))}
                  </ul>
                </m.article>
              );
            })}
          </AnimatePresence>
        </div>
      </LazyMotion>
    </section>
  );
}
