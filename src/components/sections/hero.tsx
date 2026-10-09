import { ArrowDown, ArrowDownRight, ArrowUpRight, Download } from "lucide-react";
import { OrbitalVisual } from "@/components/three/orbital-visual";
import { Magnetic } from "@/components/motion/magnetic";
import { Button } from "@/components/ui/button";
import { Portrait } from "@/components/ui/portrait";
import { displayName, profile } from "@/data/profile";
import { copy } from "@/data/site-copy";
import { getResumeUrl } from "@/lib/resume";

export function Hero() {
  const resumeUrl = getResumeUrl();
  return (
    <section id="home" aria-labelledby="hero-heading" className="hero container">
      <div className="hero-main">
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow">
            <span className="accent-dot" />
            {copy.hero.eyebrow}
            <span className="hero-edition">PORTFOLIO / {new Date().getFullYear()}</span>
          </p>
          <h1 id="hero-heading">
            {copy.hero.lines.map((line, index) => (
              <span className={`hero-line hero-line-${index}`} key={line}>
                <span>{line}</span>
              </span>
            ))}
          </h1>
          <p className="hero-description">{profile.description}</p>
          <div className="hero-actions">
            <Magnetic>
              <Button asChild>
                <a href="#work">
                  {copy.hero.explore}
                  <ArrowUpRight aria-hidden="true" />
                </a>
              </Button>
            </Magnetic>
            {resumeUrl ? (
              <Button asChild variant="outline">
                <a href={resumeUrl} download>
                  {copy.hero.cv}
                  <Download aria-hidden="true" />
                </a>
              </Button>
            ) : process.env.NODE_ENV === "development" ? (
              <span className="cv-pending">
                <Download size={16} aria-hidden="true" />
                {copy.hero.cvPending}
              </span>
            ) : null}
          </div>
          <div className="hero-person">
            <span className="person-line" />
            <span>{displayName}</span>
            <span className="muted">/ {profile.title}</span>
          </div>
        </div>
        <div className="hero-art">
          <OrbitalVisual />
          <div className="hero-portrait">
            <Portrait compact />
            <div>
              <span className="eyebrow">THE HUMAN SIDE</span>
              <p>{profile.avatar ? displayName : copy.portrait.detail}</p>
            </div>
            <ArrowDownRight size={18} aria-hidden="true" />
          </div>
        </div>
      </div>
      <div className="hero-bottom">
        <span className="mono hero-index">00 / INTRODUCTION</span>
        <p>{copy.hero.note}</p>
        <a href="#about" className="text-link">
          {copy.hero.scroll}
          <ArrowDown size={15} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
