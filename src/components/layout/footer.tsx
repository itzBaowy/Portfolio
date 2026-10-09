import { ArrowUp, Code2, ContactRound } from "lucide-react";
import { displayName, profile } from "@/data/profile";
import { socials } from "@/data/socials";
import { copy } from "@/data/site-copy";

export function Footer() {
  return <footer className="container site-footer">
    <div className="footer-top"><span className="monogram">{profile.initials}<span>.</span></span><a href="#top" className="text-link">{copy.footer.top}<ArrowUp size={16} aria-hidden="true" /></a></div>
    <p className="footer-statement">{copy.footer.thanks}</p>
    <div className="footer-bottom"><p>© {new Date().getFullYear()} {displayName} <span>· {profile.title}</span></p><div className="social-links">{socials.filter(s => s.url).map(s => <a href={s.url!} key={s.label} target="_blank" rel="noopener noreferrer">{s.icon === "github" ? <Code2 size={16} aria-hidden="true" /> : <ContactRound size={16} aria-hidden="true" />}{s.label}</a>)}</div><span className="mono">BUILT WITH INTENTION</span></div>
  </footer>;
}
