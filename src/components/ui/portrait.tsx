import Image from "next/image";
import { ScanFace } from "lucide-react";
import { profile, displayName } from "@/data/profile";
import { copy } from "@/data/site-copy";
import { cn } from "@/lib/utils";

export function Portrait({ preload = false }: { preload?: boolean }) {
  return (
    <figure className={cn("portrait", profile.avatar && "portrait-with-image")}>
      {profile.avatar ? (
        <Image
          src={profile.avatar}
          alt={`${profile.avatarAlt} — ${displayName}`}
          fill
          sizes="(max-width: 480px) calc(100vw - 48px), (max-width: 850px) 400px, 35vw"
          preload={preload}
          className="portrait-image"
        />
      ) : (
        <div className="portrait-placeholder">
          <ScanFace size={48} strokeWidth={1} aria-hidden="true" />
          <span>{copy.portrait.label}</span>
          <p>{copy.portrait.detail}</p>
        </div>
      )}
      <figcaption>{profile.avatar ? displayName : copy.portrait.note}</figcaption>
    </figure>
  );
}
