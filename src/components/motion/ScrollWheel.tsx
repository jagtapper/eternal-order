"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mark } from "@/components/brand/Mark";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ScrollWheel() {
  const wheelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wheel = wheelRef.current;
    if (!wheel) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.to(wheel, {
        rotation: 720,
        ease: "none",
        scrollTrigger: {
          start: 0,
          end: "max",
          scrub: 0.85,
          invalidateOnRefresh: true,
        },
      });
    }, wheel);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);

    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, []);

  return (
    <div className="scroll-wheel" aria-hidden="true">
      <div className="scroll-wheel__anchor">
        <div ref={wheelRef} className="scroll-wheel__mark">
          <Mark className="h-full w-full" />
        </div>
      </div>
    </div>
  );
}
