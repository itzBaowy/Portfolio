import { ArrowUpRight, Award, BookOpen, BriefcaseBusiness, GraduationCap } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Timeline } from "@/components/motion/timeline";
import { SectionHeading } from "./section-heading";
import { experience } from "@/data/experience";
import { education, certifications } from "@/data/education";
import { copy } from "@/data/site-copy";

export function Journey() {
  return (
    <div className="container journey-grid">
      <section
        id="experience"
        className="section experience-section"
        aria-labelledby="experience-heading"
      >
        <Reveal>
          <SectionHeading id="experience-heading" {...copy.experience} />
        </Reveal>
        <Timeline>
          {experience.length ? (
            <ol className="timeline-list experience-list">
              {experience.map((item, index) => (
                <li key={`${item.company}-${item.startDate}`}>
                  <Reveal className="experience-row" delay={index * 0.06}>
                    <div className="experience-meta">
                      <p className={`eyebrow ${!item.startDate ? "experience-date-pending" : ""}`}>
                        {item.startDate
                          ? `${item.startDate} — ${item.endDate ?? "Present"}`
                          : copy.experience.datesPending}
                      </p>
                      <h3>{item.product}</h3>
                      <p className="timeline-company">
                        {item.company}
                        {item.location && ` · ${item.location}`}
                      </p>
                    </div>
                    <div className="experience-detail">
                      <p className="eyebrow experience-role">{item.position}</p>
                      <p className="experience-description">{item.description}</p>
                      {item.responsibilities.length > 0 && (
                        <ul className="responsibilities">
                          {item.responsibilities.map((r) => (
                            <li key={r}>{r}</li>
                          ))}
                        </ul>
                      )}
                      {item.technologies.length > 0 && (
                        <div className="tags">
                          {item.technologies.map((t) => (
                            <span key={t}>{t}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          ) : (
            <div className="journey-empty">
              <BriefcaseBusiness size={24} strokeWidth={1.4} aria-hidden="true" />
              <h3>{copy.experience.emptyTitle}</h3>
              <p>{copy.experience.emptyDescription}</p>
              <a href="#work" className="text-link">
                {copy.experience.link}
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </div>
          )}
        </Timeline>
      </section>
      <section
        id="education"
        className="section education-section"
        aria-labelledby="education-heading"
      >
        <Reveal>
          <SectionHeading id="education-heading" {...copy.education} />
        </Reveal>
        <Timeline>
          {education.length ? (
            <ol className="timeline-list">
              {education.map((item, index) => (
                <li key={`${item.school}-${item.startDate}`}>
                  <Reveal delay={index * 0.06}>
                    <p className="eyebrow">
                      {item.startDate} — {item.endDate ?? "Present"}
                    </p>
                    <h3>{item.school}</h3>
                    {(item.degree || item.major) && (
                      <p className="timeline-company">
                        {[item.degree, item.major].filter(Boolean).join(" · ")}
                      </p>
                    )}
                    {item.achievements.length > 0 && (
                      <ul className="academic-achievements">
                        {item.achievements.map((a) => (
                          <li key={a}>
                            <GraduationCap size={16} aria-hidden="true" />
                            {a}
                          </li>
                        ))}
                      </ul>
                    )}
                  </Reveal>
                </li>
              ))}
            </ol>
          ) : (
            <div className="journey-empty">
              <GraduationCap size={26} strokeWidth={1.4} aria-hidden="true" />
              <h3>{copy.education.emptyTitle}</h3>
              <p>{copy.education.emptyDescription}</p>
              <span className="learning-note">
                <BookOpen size={14} aria-hidden="true" />
                Academic details pending
              </span>
            </div>
          )}
        </Timeline>
      </section>
      {certifications.length > 0 && (
        <section className="certifications" aria-labelledby="certifications-heading">
          <Reveal className="certifications-heading">
            <div>
              <p className="eyebrow">CONTINUOUS LEARNING</p>
              <h2 id="certifications-heading">{copy.education.certifications}</h2>
            </div>
            <span className="certificate-total mono">
              {String(certifications.length).padStart(2, "0")}
            </span>
          </Reveal>
          <div className="certificate-grid">
            {certifications.map((c, index) => (
              <Reveal key={c.name} delay={index * 0.04}>
                <article className="certificate-card">
                  <div className="certificate-meta">
                    <span className="certificate-icon">
                      <Award size={21} strokeWidth={1.5} aria-hidden="true" />
                    </span>
                    <span className="mono">
                      {copy.education.issued} {c.issuedDate}
                    </span>
                  </div>
                  <h3>{c.name}</h3>
                  <p>{c.issuer}</p>
                  {c.credentialUrl && (
                    <a
                      className="text-link"
                      href={c.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${copy.education.credential}: ${c.name} (opens in a new tab)`}
                    >
                      {copy.education.credential}
                      <ArrowUpRight size={15} aria-hidden="true" />
                    </a>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
