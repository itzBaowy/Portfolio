"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";

export function Timeline({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  useEffect(() => {
    if (reduced) return;
    let cancelled = false;
    let revert: (() => void) | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
          ([{ gsap }, { ScrollTrigger }]) => {
            if (cancelled || !ref.current) return;
            gsap.registerPlugin(ScrollTrigger);
            const context = gsap.context(() => {
              gsap.fromTo(
                ".timeline-progress",
                { scaleY: 0 },
                {
                  scaleY: 1,
                  ease: "none",
                  scrollTrigger: {
                    trigger: ref.current,
                    start: "top 80%",
                    end: "bottom 45%",
                    scrub: 0.5,
                  },
                },
              );
            }, ref);
            revert = () => context.revert();
          },
        );
      },
      { rootMargin: "150px" },
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      cancelled = true;
      observer.disconnect();
      revert?.();
    };
  }, [reduced]);
  return (
    <div ref={ref} className="timeline">
      <span className="timeline-track" aria-hidden="true">
        <span className="timeline-progress" />
      </span>
      {children}
    </div>
  );
}
