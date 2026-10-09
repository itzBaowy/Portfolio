"use client";
import { LazyMotion, domAnimation, m } from "motion/react";
import { useMediaQuery } from "@/hooks/use-media-query";

export default function Template({ children }: { children: React.ReactNode }) {
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={{ y: reduced ? 0 : 8 }}
        animate={{ y: 0 }}
        transition={{ duration: reduced ? 0 : 0.4 }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
