import { ArrowUpRight, Braces } from "lucide-react";
import { Portrait } from "@/components/ui/portrait";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "./section-heading";
import { profile } from "@/data/profile";
import { copy } from "@/data/site-copy";

export function About() {
  return <section id="about" className="container section" aria-labelledby="about-heading">
    <Reveal><SectionHeading id="about-heading" {...copy.about} /></Reveal>
    <div className="about-grid"><Reveal className="about-image"><Portrait /><p className="image-caption"><Braces size={14} aria-hidden="true" />{copy.about.caption}</p></Reveal>
      <Reveal className="about-text" delay={.1}>{profile.about.map((paragraph, index) => <p key={paragraph} className={index === 0 ? "about-lead" : undefined}>{paragraph}</p>)}<div className="principles">{profile.principles.map((principle, index) => <div key={principle}><span className="mono">0{index + 1}</span><span>{principle}</span><ArrowUpRight size={15} aria-hidden="true" /></div>)}</div></Reveal>
    </div>
  </section>;
}
