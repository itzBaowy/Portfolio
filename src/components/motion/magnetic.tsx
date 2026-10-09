"use client";
import { useRef, type ReactNode } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";

export function Magnetic({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const enabled = useMediaQuery("(pointer: fine) and (prefers-reduced-motion: no-preference)");
  return <div ref={ref} className="magnetic" onPointerMove={(event) => {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.transform = `translate(${(event.clientX - rect.left - rect.width / 2) * .07}px, ${(event.clientY - rect.top - rect.height / 2) * .1}px)`;
  }} onPointerLeave={() => { if (ref.current) ref.current.style.transform = "translate(0, 0)"; }}>{children}</div>;
}
