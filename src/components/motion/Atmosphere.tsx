"use client";

import { useEffect, useRef } from "react";

export function Atmosphere() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    let raf = 0;
    let visible = !document.hidden;

    const folds = [
      { x: 0.18, w: 0.09, speed: 0.00011, phase: 0.2, a: 0.11 },
      { x: 0.42, w: 0.14, speed: 0.00008, phase: 1.4, a: 0.16 },
      { x: 0.68, w: 0.11, speed: 0.00013, phase: 2.6, a: 0.13 },
      { x: 0.86, w: 0.18, speed: 0.00007, phase: 0.8, a: 0.2 },
    ];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.6);
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (t: number) => {
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "screen";

      folds.forEach((fold) => {
        const sway = reduce ? 0 : Math.sin(t * fold.speed + fold.phase) * width * 0.018;
        const x = fold.x * width + sway;
        const gradient = ctx.createLinearGradient(x, 0, x, height);
        gradient.addColorStop(0, "rgba(224,112,32,0)");
        gradient.addColorStop(0.45, `rgba(224,112,32,${fold.a * 0.38})`);
        gradient.addColorStop(1, `rgba(224,112,32,${fold.a})`);
        ctx.fillStyle = gradient;
        ctx.filter = "blur(28px)";
        ctx.fillRect(x - (fold.w * width) / 2, 0, fold.w * width, height);
      });

      const bloom = ctx.createRadialGradient(
        width * 0.82,
        height * 0.92,
        20,
        width * 0.82,
        height * 0.92,
        width * 0.55,
      );
      bloom.addColorStop(0, "rgba(224,112,32,0.26)");
      bloom.addColorStop(0.45, "rgba(138,61,18,0.16)");
      bloom.addColorStop(1, "rgba(0,0,0,0)");
      ctx.filter = "blur(8px)";
      ctx.fillStyle = bloom;
      ctx.fillRect(0, 0, width, height);
      ctx.filter = "none";
      ctx.globalCompositeOperation = "source-over";
    };

    const loop = (t: number) => {
      if (visible && !reduce) {
        draw(t);
        raf = window.requestAnimationFrame(loop);
      }
    };

    const onVisibility = () => {
      visible = !document.hidden;
      if (visible && !reduce) {
        window.cancelAnimationFrame(raf);
        raf = window.requestAnimationFrame(loop);
      }
    };

    resize();
    draw(0);
    if (!reduce) raf = window.requestAnimationFrame(loop);

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("resize", resize);

    return () => {
      window.cancelAnimationFrame(raf);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", resize);
      frame = 0;
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
