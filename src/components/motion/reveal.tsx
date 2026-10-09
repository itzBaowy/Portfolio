"use client";
import { LazyMotion, domAnimation, m } from "motion/react";
import type { ReactNode } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";

export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  return <LazyMotion features={domAnimation}><m.div className={className} initial={{ y: reduced ? 0 : 18 }} whileInView={{ y: 0 }} viewport={{ once: true, amount: .15 }} transition={{ duration: reduced ? 0 : .65, delay: reduced ? 0 : delay, ease: [.2,.7,.2,1] }}>{children}</m.div></LazyMotion>;
}
