"use client";
import { useState } from "react";
import { AnimatePresence, LazyMotion, domAnimation, m } from "motion/react";
import { Braces, Code2, Container, Database, Layers3, Server, Sparkles } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { skills } from "@/data/skills";
import { copy } from "@/data/site-copy";
import { useMediaQuery } from "@/hooks/use-media-query";

const icons = { code: Code2, layers: Layers3, server: Server, database: Database, container: Container, sparkles: Sparkles };

export function Skills() {
  const [category, setCategory] = useState("all");
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const filtered = skills.filter(skill => category === "all" || skill.id === category);
  return <section id="skills" className="container section" aria-labelledby="skills-heading">
    <SectionHeading id="skills-heading" {...copy.skills} />
    <div className="skill-filters" role="group" aria-label="Filter technologies by category"><button aria-pressed={category === "all"} onClick={() => setCategory("all")}>{copy.skills.all}</button>{skills.map(skill => <button key={skill.id} aria-pressed={category === skill.id} onClick={() => setCategory(skill.id)}>{skill.name}</button>)}</div>
    <LazyMotion features={domAnimation}><div className={`skills-grid ${category !== "all" ? "skills-filtered" : ""}`} aria-live="polite"><AnimatePresence initial={false} mode="popLayout">{filtered.map(skill => {
      const Icon = icons[skill.icon];
      return <m.article layout={!reduced} key={skill.id} className={`skill-card skill-${skill.id}`} initial={{ y: reduced ? 0 : 10 }} animate={{ y: 0 }} exit={{ scale: reduced ? 1 : .98 }} transition={{ duration: reduced ? 0 : .25 }}><div className="skill-card-top"><Icon size={24} strokeWidth={1.3} aria-hidden="true" /><span className="mono">0{skills.findIndex(s => s.id === skill.id) + 1} / {skill.technologies.length} TOOLS</span></div><h3>{skill.name}</h3><p>{skill.description}</p><ul className="technology-list">{skill.technologies.map(tech => <li key={tech}><Braces size={11} strokeWidth={1.5} aria-hidden="true" />{tech}</li>)}</ul></m.article>;
    })}</AnimatePresence></div></LazyMotion>
  </section>;
}
