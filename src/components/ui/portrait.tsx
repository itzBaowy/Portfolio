import Image from "next/image";
import { ScanFace } from "lucide-react";
import { profile, displayName } from "@/data/profile";
import { copy } from "@/data/site-copy";
import { cn } from "@/lib/utils";

export function Portrait({ compact = false }: { compact?: boolean }) {
  return <figure className={cn("portrait", compact && "portrait-compact")}>
    {profile.avatar ? <Image src={profile.avatar} alt={`${profile.avatarAlt} — ${displayName}`} fill sizes={compact ? "120px" : "(max-width: 850px) 100vw, 35vw"} className="portrait-image" /> : <div className="portrait-placeholder"><ScanFace size={compact ? 24 : 48} strokeWidth={1} aria-hidden="true" /><span>{copy.portrait.label}</span>{!compact && <p>{copy.portrait.detail}</p>}</div>}
    {!compact && <figcaption>{copy.portrait.note}</figcaption>}
  </figure>;
}
