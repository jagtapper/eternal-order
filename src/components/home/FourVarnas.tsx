"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { varnas } from "@/lib/site";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function FourVarnas() {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    if (!root || !track) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          const media = gsap.utils.toArray<HTMLElement>("[data-varna-media]");
          const veils = gsap.utils.toArray<HTMLElement>("[data-varna-veil]");
          const copies = gsap.utils.toArray<HTMLElement>("[data-varna-copy]");
          const lintel = root.querySelector<HTMLElement>("[data-varna-lintel]");
          const sill = root.querySelector<HTMLElement>("[data-varna-sill]");
          const stitches = gsap.utils.toArray<HTMLElement>("[data-varna-stitch]");
          if (!lintel || !sill || media.length !== 4 || copies.length !== 4) return;

          gsap.set(copies, { autoAlpha: 0 });
          gsap.set(copies[0], { autoAlpha: 1 });
          gsap.set(veils, { autoAlpha: 0.08 });
          gsap.set(lintel, { scaleX: 0, transformOrigin: "left center" });
          gsap.set(sill, { scaleX: 0, transformOrigin: "right center" });
          gsap.set(stitches, { scale: 0, transformOrigin: "center center" });
          gsap.set(media[0], { y: -48 });
          gsap.set(media[1], { x: -36 });
          gsap.set(media[2], { x: 36 });
          gsap.set(media[3], { y: 48 });
          root.dataset.scene = "on";

          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: track,
              start: "top 5.1rem",
              end: "bottom bottom",
              scrub: 1.15,
              invalidateOnRefresh: true,
            },
          });

          tl.to(media, { x: 0, y: 0, duration: 1.2, stagger: 0.05 }, 0);
          tl.to(lintel, { scaleX: 1, duration: 0.85 }, 0.3);
          tl.to(sill, { scaleX: 1, duration: 0.85 }, 0.3);
          tl.to(stitches, { scale: 1, duration: 0.7, stagger: 0.08 }, 0.45);

          const beats = [1.25, 2.4, 3.55, 4.7];
          beats.forEach((time, index) => {
            veils.forEach((veil, j) => {
              tl.to(
                veil,
                { autoAlpha: j === index ? 0 : 0.62, duration: 0.55 },
                time,
              );
            });
            copies.forEach((copy, j) => {
              if (j === index) {
                tl.to(copy, { autoAlpha: 1, duration: 0.32 }, time + 0.16);
              } else {
                tl.to(copy, { autoAlpha: 0, duration: 0.16 }, time);
              }
            });
          });

          tl.to(veils, { autoAlpha: 0, duration: 0.8 }, 5.8);

          const refresh = () => ScrollTrigger.refresh();
          root.querySelectorAll("img").forEach((image) => {
            if (!image.complete) {
              image.addEventListener("load", refresh, { once: true });
            }
          });
          requestAnimationFrame(refresh);

          return () => {
            delete root.dataset.scene;
            gsap.set(copies, { clearProps: "all" });
            gsap.set(media, { clearProps: "all" });
            gsap.set(veils, { clearProps: "all" });
          };
        },
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="varna-scene px-5 py-16 md:px-8 md:py-20">
      <div className="mx-auto max-w-[1280px]">
        <h2
          data-split-reveal
          className="scroll-mt-28 max-w-4xl font-display text-4xl leading-[1.08] tracking-[-0.03em] text-ivory md:text-5xl"
        >
          How the Caste System held a Society
        </h2>
        <p
          data-reveal
          className="mt-3 max-w-3xl text-[15px] leading-relaxed text-ivory-dim md:text-base"
        >
          The working idea was division of labor: knowledge, protection,
          production, and craft, each necessary, none a leftover. Standing was
          supposed to be able to move with skill and conduct. The later freeze
          is what made the map look like a cage.
        </p>
        <p
          data-reveal
          className="mt-2 max-w-3xl text-[15px] leading-relaxed text-ivory-dim md:text-base"
        >
          The <em>Purusha Sukta</em> also pictures the four as limbs of one
          cosmic body. That image is traditional. It is a picture of
          integration, not a biology lesson.
        </p>
      </div>

      <div ref={trackRef} className="varna-track mt-5">
        <div className="varna-stage w-full">
          <div className="mx-auto flex h-full w-full max-w-[1280px] flex-col">
            <div className="flex min-h-0 flex-1">
              <div className="relative flex h-full min-h-[22rem] w-full flex-col overflow-hidden rounded-[2rem] border border-ivory/10 bg-gold/20 p-[3px]">
                <span
                  data-varna-lintel
                  className="pointer-events-none absolute inset-x-5 top-2 z-10 hidden h-px bg-gold md:block"
                  aria-hidden="true"
                />
                <span
                  data-varna-sill
                  className="pointer-events-none absolute inset-x-5 bottom-2 z-10 hidden h-px bg-gold md:block"
                  aria-hidden="true"
                />

                <div className="grid h-full min-h-0 flex-1 grid-cols-2 grid-rows-2 gap-[3px] overflow-hidden rounded-[1.55rem]">
                  {varnas.map((varna, index) => (
                    <article
                      key={varna.slug}
                      data-varna-col
                      className="relative min-h-0 overflow-hidden bg-surface"
                    >
                      <div data-varna-media className="absolute -inset-14">
                        <Image
                          src={varna.image}
                          alt={varna.alt}
                          fill
                          sizes="(max-width: 768px) 50vw, 50vw"
                          className="object-cover"
                        />
                        <span
                          data-varna-veil
                          className="pointer-events-none absolute inset-0 bg-ink/70 opacity-0"
                          aria-hidden="true"
                        />
                      </div>
                      {index === 1 || index === 3 ? (
                        <span
                          data-varna-stitch
                          className="pointer-events-none absolute inset-y-6 left-0 z-10 hidden w-px origin-top bg-gold/70 md:block"
                          aria-hidden="true"
                        />
                      ) : null}
                      {index >= 2 ? (
                        <span
                          data-varna-stitch
                          className="pointer-events-none absolute inset-x-6 top-0 z-10 hidden h-px origin-left bg-gold/70 md:block"
                          aria-hidden="true"
                        />
                      ) : null}
                      <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-ink via-ink/80 to-transparent p-4 md:p-6">
                        <p className="font-deva text-lg text-gold md:text-2xl">
                          {varna.sanskrit}
                        </p>
                        <h3 className="font-display text-2xl tracking-tight text-ivory md:text-3xl">
                          {varna.title}
                        </h3>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>

            <div className="shrink-0 pt-3">
              <div className="varna-well max-w-3xl">
                {varnas.map((varna) => (
                  <article key={varna.slug} data-varna-copy className="varna-copy">
                    <p className="text-ivory-dim">{varna.kicker}</p>
                    <p className="mt-2 max-w-3xl text-[15px] leading-relaxed text-stone">
                      {varna.body}
                    </p>
                  </article>
                ))}
              </div>
              <Link
                href="/education/four-varnas"
                className="mt-3 inline-block text-[13px] tracking-[0.04em] text-gold"
              >
                Division of labor, not a ranking
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
