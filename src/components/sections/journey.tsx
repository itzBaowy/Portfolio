import { ArrowUpRight, BookOpen, BriefcaseBusiness, GraduationCap } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Timeline } from "@/components/motion/timeline";
import { SectionHeading } from "./section-heading";
import { experience } from "@/data/experience";
import { education, certifications } from "@/data/education";
import { copy } from "@/data/site-copy";

export function Journey() {
  return <div className="container journey-grid">
    <section id="experience" className="section" aria-labelledby="experience-heading"><Reveal><SectionHeading id="experience-heading" {...copy.experience} /></Reveal>
      <Timeline>{experience.length ? <ol className="timeline-list">{experience.map((item, index) => <li key={`${item.company}-${item.startDate}`}><Reveal delay={index * .06}><p className="eyebrow">{item.startDate} — {item.endDate ?? "Present"}</p><h3>{item.position}</h3><p className="timeline-company">{item.company}{item.location && ` · ${item.location}`}</p><p>{item.description}</p><ul className="responsibilities">{item.responsibilities.map(r => <li key={r}>{r}</li>)}</ul><div className="tags">{item.technologies.map(t => <span key={t}>{t}</span>)}</div></Reveal></li>)}</ol> : <div className="journey-empty"><BriefcaseBusiness size={24} strokeWidth={1.4} aria-hidden="true" /><h3>{copy.experience.emptyTitle}</h3><p>{copy.experience.emptyDescription}</p><a href="#work" className="text-link">{copy.experience.link}<ArrowUpRight size={15} aria-hidden="true" /></a></div>}</Timeline>
    </section>
    <section id="education" className="section" aria-labelledby="education-heading"><Reveal><SectionHeading id="education-heading" {...copy.education} /></Reveal>
      <Timeline>{education.length ? <ol className="timeline-list">{education.map((item, index) => <li key={`${item.school}-${item.startDate}`}><Reveal delay={index * .06}><p className="eyebrow">{item.startDate} — {item.endDate ?? "Present"}</p><h3>{item.school}</h3><p className="timeline-company">{item.degree} · {item.major}</p><ul className="responsibilities">{item.achievements.map(a => <li key={a}>{a}</li>)}</ul></Reveal></li>)}</ol> : <div className="journey-empty"><GraduationCap size={26} strokeWidth={1.4} aria-hidden="true" /><h3>{copy.education.emptyTitle}</h3><p>{copy.education.emptyDescription}</p><span className="learning-note"><BookOpen size={14} aria-hidden="true" />Academic details pending</span></div>}</Timeline>
      {certifications.length > 0 && <div className="certifications"><h3>Certifications</h3>{certifications.map(c => <article key={c.name}><h4>{c.name}</h4><p>{c.issuer} · {c.issuedDate}</p>{c.credentialUrl && <a className="text-link" href={c.credentialUrl} target="_blank" rel="noopener noreferrer">View credential<ArrowUpRight size={15} aria-hidden="true" /></a>}</article>)}</div>}
    </section>
  </div>;
}
