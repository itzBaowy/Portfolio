"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import {
  Component,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { useMediaQuery } from "@/hooks/use-media-query";

const OrbitalScene = dynamic(() => import("./orbital-scene"), { ssr: false });

function subscribeVisibility(callback: () => void) {
  document.addEventListener("visibilitychange", callback);
  return () => document.removeEventListener("visibilitychange", callback);
}

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export function OrbitalVisual() {
  const holder = useRef<HTMLDivElement>(null);
  const desktop = useMediaQuery("(min-width: 1024px) and (pointer: fine)");
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(true);
  const pageVisible = useSyncExternalStore(
    subscribeVisibility,
    () => !document.hidden,
    () => true,
  );

  useEffect(() => {
    if (!desktop || reduced) return;
    const timer = window.setTimeout(() => {
      try {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("webgl2");
        if (context) {
          context.getExtension("WEBGL_lose_context")?.loseContext();
          setReady(true);
        }
      } catch {
        /* Keep the static visual when the browser blocks WebGL. */
      }
    }, 1000);
    return () => window.clearTimeout(timer);
  }, [desktop, reduced]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.05,
    });
    if (holder.current) observer.observe(holder.current);
    return () => observer.disconnect();
  }, []);

  const render3D = desktop && !reduced && ready;
  return (
    <div
      className="orbital-visual"
      ref={holder}
      aria-hidden="true"
      data-renderer={render3D ? "webgl" : "static"}
    >
      <div className="orbital-aura" />
      <Image
        className="orbital-fallback"
        src="/images/orbital.svg"
        alt=""
        fill
        sizes="(max-width: 850px) 85vw, 45vw"
        loading="eager"
        fetchPriority="high"
      />
      {render3D && (
        <SceneBoundary>
          <div className="scene-layer">
            <OrbitalScene active={visible && pageVisible} />
          </div>
        </SceneBoundary>
      )}
      <span className="orbital-coordinate coordinate-top mono">FIG. 01 — CONNECTED SYSTEMS</span>
      <span className="orbital-coordinate coordinate-bottom mono">FORM / FUNCTION / FLOW</span>
    </div>
  );
}
