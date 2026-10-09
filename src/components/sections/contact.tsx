import { ArrowUpRight, Code2, ContactRound, Mail } from "lucide-react";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/profile";
import { socials } from "@/data/socials";
import { copy } from "@/data/site-copy";

export function Contact() {
  return (
    <section
      id="contact"
      className="container section contact-section"
      aria-labelledby="contact-heading"
    >
      <Reveal>
        <p className="eyebrow">{copy.contact.eyebrow}</p>
        <h2 id="contact-heading">{copy.contact.title}</h2>
        <p className="section-description">{copy.contact.description}</p>
        {profile.email ? (
          <Magnetic>
            <Button asChild>
              <a href={`mailto:${profile.email}`}>
                {copy.contact.cta}
                <ArrowUpRight aria-hidden="true" />
              </a>
            </Button>
          </Magnetic>
        ) : (
          <p className="contact-pending">
            <span className="accent-dot" />
            {copy.contact.pending}
          </p>
        )}
      </Reveal>
      <div className="contact-channels">
        <div className="contact-channel">
          <Mail size={20} strokeWidth={1.3} aria-hidden="true" />
          <span className="eyebrow">DIRECT EMAIL</span>
          {profile.email ? (
            <a href={`mailto:${profile.email}`} className="text-link">
              {profile.email}
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          ) : (
            <p>{copy.contact.emailPending}</p>
          )}
        </div>
        {socials.map((social) => {
          const Icon = social.icon === "github" ? Code2 : ContactRound;
          return (
            <div className="contact-channel" key={social.label}>
              <Icon size={20} strokeWidth={1.3} aria-hidden="true" />
              <span className="eyebrow">{social.label}</span>
              {social.url ? (
                <a
                  href={social.url}
                  className="text-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.label}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              ) : (
                <p>{copy.contact.socialPending}</p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
