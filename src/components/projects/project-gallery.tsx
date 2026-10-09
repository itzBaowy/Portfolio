import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { ProjectScreenshot } from "@/types/content";

export function ProjectGallery({ screenshots }: { screenshots: ProjectScreenshot[] }) {
  return (
    <div className="project-gallery">
      {screenshots.map((shot, index) => (
        <figure className="project-screenshot" key={shot.src}>
          <a
            className={`screenshot-link ${shot.height / shot.width > 2 ? "screenshot-portrait" : ""}`}
            href={shot.src}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open full screenshot: ${shot.title} (opens in a new tab)`}
          >
            <Image
              src={shot.src}
              alt={shot.alt}
              width={shot.width}
              height={shot.height}
              sizes="(max-width: 700px) 100vw, 50vw"
            />
            <span className="screenshot-expand" aria-hidden="true">
              <ArrowUpRight size={18} />
            </span>
          </a>
          <figcaption>
            <span className="mono" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <h3>{shot.title}</h3>
              <p>{shot.description}</p>
            </div>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
