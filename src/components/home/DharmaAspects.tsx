"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { purusharthas } from "@/lib/site";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const NODE_ANCHORS = [
  "left-[50%] top-[20%]",
  "left-[80%] top-[50%]",
  "left-[50%] top-[80%]",
  "left-[20%] top-[50%]",
] as const;

function sizeMandala(root: HTMLElement) {
  const slot = root.querySelector<HTMLElement>(".aim-mandala-slot");
  const mandala = root.querySelector<HTMLElement>("[data-aim-mandala]");
  if (!slot || !mandala) return;

  const gutter = window.matchMedia("(min-width: 768px)").matches ? 0 : 28;
  const side = Math.min(slot.clientWidth, slot.clientHeight) - gutter * 2;
  const size = Math.max(96, Math.floor(side));
  mandala.style.width = `${size}px`;
  mandala.style.height = `${size}px`;
  mandala.style.maxWidth = "none";
  mandala.style.maxHeight = "none";
}

export function DharmaAspects() {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const layout = () => sizeMandala(root);
    layout();
    const slot = root.querySelector(".aim-mandala-slot");
    const observer = slot ? new ResizeObserver(layout) : null;
    if (slot) observer?.observe(slot);
    window.addEventListener("resize", layout);
    window.visualViewport?.addEventListener("resize", layout);

    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", layout);
      window.visualViewport?.removeEventListener("resize", layout);
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    if (!root || !track) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
          const nodes = gsap.utils.toArray<HTMLElement>("[data-aim-orb]");
          const rings = gsap.utils.toArray<HTMLElement>("[data-aim-ring]");
          const copies = gsap.utils.toArray<HTMLElement>("[data-aim-copy]");
          const arm = root.querySelector<HTMLElement>("[data-aim-arm]");
          if (!arm || nodes.length !== 4 || copies.length !== 4) return;

          gsap.set(copies, { autoAlpha: 0 });
          gsap.set(copies[0], { autoAlpha: 1 });
          gsap.set(rings, { autoAlpha: 0 });
          gsap.set(rings[0], { autoAlpha: 1 });
          gsap.set(nodes, { opacity: 0.72, scale: 1, transformOrigin: "50% 50%" });
          gsap.set(nodes[0], { opacity: 1, scale: 1.04 });
          gsap.set(arm, { rotation: 0, transformOrigin: "50% 100%" });
          root.dataset.scene = "on";
          sizeMandala(root);
          requestAnimationFrame(() => sizeMandala(root));

          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: track,
              start: "top 4.75rem",
              end: "bottom bottom",
              scrub: 1.15,
              invalidateOnRefresh: true,
            },
          });

          const rotations = [0, 90, 180, 270];
          const beats = [0.15, 1.35, 2.55, 3.75];

          beats.forEach((time, index) => {
            tl.to(arm, { rotation: rotations[index], duration: 1.05 }, time);
            nodes.forEach((node, j) => {
              tl.to(
                node,
                {
                  opacity: j === index ? 1 : 0.62,
                  scale: j === index ? 1.05 : 0.97,
                  duration: 0.85,
                },
                time,
              );
            });
            rings.forEach((ring, j) => {
              tl.to(
                ring,
                { autoAlpha: j === index ? 1 : 0, duration: 0.4 },
                time,
              );
            });
            copies.forEach((copy, j) => {
              if (j === index) {
                tl.to(copy, { autoAlpha: 1, duration: 0.35 }, time + 0.18);
              } else {
                tl.to(copy, { autoAlpha: 0, duration: 0.18 }, time);
              }
            });
          });

          tl.to(nodes, { opacity: 1, scale: 1, duration: 1.05 }, 5);
          tl.to(rings, { autoAlpha: 0.85, duration: 1.05 }, 5);
          tl.to(arm, { rotation: 360, duration: 1.05 }, 5);

          const refresh = () => {
            sizeMandala(root);
            ScrollTrigger.refresh();
          };
          root.querySelectorAll("img").forEach((image) => {
            if (!image.complete) {
              image.addEventListener("load", refresh, { once: true });
            }
          });
          requestAnimationFrame(refresh);

          return () => {
            delete root.dataset.scene;
            gsap.set(copies, { clearProps: "all" });
            gsap.set(nodes, { clearProps: "all" });
            gsap.set(rings, { clearProps: "all" });
          };
        },
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="aims-scene py-12 md:py-20">
      <div className="mx-auto max-w-[1280px] px-5 md:px-8">
        <h2
          data-split-reveal
          className="scroll-mt-28 max-w-4xl font-display text-4xl leading-[1.08] tracking-[-0.03em] text-ivory md:text-5xl"
        >
          Dharma, Artha, Kama, Moksha
        </h2>
        <p
          data-reveal
          className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ivory-dim md:text-base"
        >
          The four aims of a human life. This is philosophy as a way of
          walking, not a religion you sign. If these are foggy, most arguments
          about who Hindus are will keep missing.
        </p>
      </div>

      <div ref={trackRef} className="aim-track mt-5">
        <div className="aim-stage w-full bg-ink">
          <div className="flex h-full min-h-0 w-full min-w-0 flex-col">
            <div className="aim-mandala-slot">
              <div data-aim-mandala className="aim-mandala relative aspect-square">
                <svg
                  className="pointer-events-none absolute left-[20%] top-[20%] h-[60%] w-[60%] text-gold"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="xMidYMid meet"
                  aria-hidden="true"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="50"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.35"
                    opacity="0.28"
                    vectorEffect="non-scaling-stroke"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="50"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    opacity="0.9"
                    vectorEffect="non-scaling-stroke"
                  />
                  <line
                    x1="50"
                    y1="50"
                    x2="50"
                    y2="0"
                    stroke="currentColor"
                    strokeWidth="0.3"
                    opacity="0.55"
                    vectorEffect="non-scaling-stroke"
                  />
                  <line
                    x1="50"
                    y1="50"
                    x2="100"
                    y2="50"
                    stroke="currentColor"
                    strokeWidth="0.3"
                    opacity="0.55"
                    vectorEffect="non-scaling-stroke"
                  />
                  <line
                    x1="50"
                    y1="50"
                    x2="50"
                    y2="100"
                    stroke="currentColor"
                    strokeWidth="0.3"
                    opacity="0.55"
                    vectorEffect="non-scaling-stroke"
                  />
                  <line
                    x1="50"
                    y1="50"
                    x2="0"
                    y2="50"
                    stroke="currentColor"
                    strokeWidth="0.3"
                    opacity="0.55"
                    vectorEffect="non-scaling-stroke"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="2.1"
                    fill="rgb(217 139 69 / 0.28)"
                    stroke="currentColor"
                    strokeWidth="0.4"
                  />
                </svg>

                <div
                  className="pointer-events-none absolute left-[20%] top-[20%] z-20 h-[60%] w-[60%]"
                  aria-hidden="true"
                >
                  <div data-aim-arm className="absolute left-1/2 top-0 h-1/2 w-0 origin-bottom">
                    <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold shadow-[0_0_18px_rgb(217_139_69_/_0.7)]" />
                  </div>
                </div>

                {purusharthas.map((aspect, index) => (
                  <article
                    key={aspect.slug}
                    className={`absolute z-10 w-[20%] -translate-x-1/2 -translate-y-1/2 md:w-[22%] ${NODE_ANCHORS[index]}`}
                  >
                    <span
                      data-aim-ring
                      className="pointer-events-none absolute -inset-1 rounded-full opacity-0 ring-2 ring-gold/90"
                      aria-hidden="true"
                    />
                    <div
                      data-aim-orb
                      className="relative aspect-square overflow-hidden rounded-full border border-ivory/14 bg-surface"
                    >
                      <Image
                        src={aspect.image}
                        alt={aspect.alt}
                        fill
                        sizes="(max-width: 768px) 30vw, 22vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/70 to-transparent pb-2.5 pt-10 text-center">
                        <p className="font-deva text-sm leading-none text-gold md:text-base">
                          {aspect.sanskrit}
                        </p>
                        <h3 className="mt-1 font-display text-base leading-tight tracking-tight text-ivory md:text-xl">
                          {aspect.title}
                        </h3>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="relative z-10 mx-auto w-full max-w-[1280px] shrink-0 px-5 pt-3 md:px-8">
              <div className="aim-well max-w-3xl">
                {purusharthas.map((aspect) => (
                  <article key={aspect.slug} data-aim-copy className="aim-copy">
                    <p className="font-deva text-lg text-gold md:text-xl">
                      {aspect.sanskrit}
                    </p>
                    <h3 className="mt-0.5 font-display text-2xl tracking-tight text-ivory md:text-3xl">
                      {aspect.title}
                    </h3>
                    <p className="mt-1 text-ivory-dim">{aspect.kicker}</p>
                    <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-stone">
                      {aspect.body}
                    </p>
                  </article>
                ))}
              </div>
              <Link
                href="/education/dharma-artha-kama-moksha"
                className="mt-3 inline-block text-[13px] tracking-[0.04em] text-gold"
              >
                Read the four aims
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
