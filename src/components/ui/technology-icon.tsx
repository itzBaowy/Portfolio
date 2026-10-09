import type { CSSProperties } from "react";
import {
  BotMessageSquare,
  Cloud,
  RadioTower,
  Spline,
  SquareTerminal,
  Workflow,
} from "lucide-react";
import { technologyVisuals } from "@/data/technology-visuals";
import type { Technology } from "@/data/skills";

const symbols = {
  assistant: BotMessageSquare,
  cloud: Cloud,
  socket: RadioTower,
  design: Spline,
  terminal: SquareTerminal,
  workflow: Workflow,
};

export function TechnologyIcon({ technology }: { technology: Technology }) {
  const visual = technologyVisuals[technology];
  let glyph;
  if (visual.kind === "brand") {
    glyph = (
      <svg viewBox="0 0 24 24" fill="currentColor" focusable="false">
        <path d={visual.path} />
      </svg>
    );
  } else {
    const Icon = symbols[visual.symbol];
    glyph = <Icon strokeWidth={1.7} />;
  }
  return (
    <span
      className="technology-mark"
      aria-hidden="true"
      style={{ "--tech-color": visual.color } as CSSProperties}
    >
      {glyph}
    </span>
  );
}
