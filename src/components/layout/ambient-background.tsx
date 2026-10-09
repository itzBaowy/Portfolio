"use client";

import type { CSSProperties } from "react";
import { useDocumentVisible } from "@/hooks/use-document-visible";

// Fixed phases keep the server markup deterministic and avoid a synchronized start.
const trails = [
  { axis: "horizontal", lane: 2, duration: 14, delay: -3, color: "blue", mobile: true },
  { axis: "horizontal", lane: 5, duration: 19, delay: -13, color: "violet", mobile: true },
  { axis: "horizontal", lane: 8, duration: 17, delay: -8, color: "cyan", mobile: false },
  { axis: "horizontal", lane: 11, duration: 22, delay: -17, color: "blue", mobile: false },
  { axis: "vertical", lane: 2, duration: 18, delay: -10, color: "violet", mobile: true },
  { axis: "vertical", lane: 6, duration: 23, delay: -4, color: "blue", mobile: true },
  { axis: "vertical", lane: 12, duration: 16, delay: -11, color: "cyan", mobile: false },
  { axis: "vertical", lane: 17, duration: 21, delay: -7, color: "violet", mobile: false },
] as const;

export function AmbientBackground() {
  const visible = useDocumentVisible();

  return (
    <div className="ambient-background" aria-hidden="true" data-paused={!visible}>
      <div className="ambient-grid" />
      <div className="ambient-trails">
        {trails.map((trail, index) => (
          <span
            key={index}
            className={`ambient-trail ambient-trail--${trail.axis} ambient-trail--${trail.color}`}
            data-mobile={trail.mobile}
            style={
              {
                "--lane": trail.lane,
                "--duration": `${trail.duration}s`,
                "--delay": `${trail.delay}s`,
              } as CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
}
