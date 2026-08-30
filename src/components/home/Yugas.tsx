"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { yugas } from "@/lib/site";

export function Yugas() {
  const listRef = useRef<HTMLOListElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const list = listRef.current;
    const fill = fillRef.current;
    if (!list || !fill) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const steps = Array.from(list.querySelectorAll<HTMLElement>("[data-yuga-step]"));
    if (steps.length === 0) return;

    if (reduce) {
      fill.style.transform = "scaleY(1)";
      setActive(steps.length - 1);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = steps.indexOf(visible.target as HTMLElement);
        if (index >= 0) setActive(index);
        fill.style.transform = `scaleY(${(index + 1) / steps.length})`;
      },
      { threshold: [0.35, 0.55, 0.75], rootMargin: "-12% 0px -28% 0px" },
    );

    steps.forEach((step) => io.observe(step));
    return () => io.disconnect();
  }, []);

  return (
    <section className="px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-[1180px]">
        <div className="max-w-2xl">
          <h2
            data-split-reveal
            className="font-display text-4xl leading-[1.08] tracking-[-0.03em] text-ivory md:text-6xl"
          >
            Four Yugas
          </h2>
          <p data-reveal className="mt-5 max-w-xl text-base leading-relaxed text-ivory-dim">
            Satya, Treta, Dvapara, Kali. A Puranic clock for how dharma, and
            with it a people&apos;s memory, thins across ages. Not a scientific
            calendar. A way of saying: forgetting is not new, and remembering
            is the work of the thin age.
          </p>
        </div>

        <ol
          ref={listRef}
          className="relative mt-16 list-none space-y-14 pl-8 md:pl-12"
        >
          <span
            className="absolute bottom-6 left-[11px] top-6 w-px bg-ivory/10 md:left-[15px]"
            aria-hidden="true"
          />
          <span
            ref={fillRef}
            className="absolute left-[11px] top-6 w-px origin-top bg-gold md:left-[15px]"
            style={{ height: "calc(100% - 3rem)", transform: "scaleY(0.12)" }}
            aria-hidden="true"
          />

          {yugas.map((yuga, index) => (
            <li
              key={yuga.slug}
              id={yuga.slug}
              data-yuga-step
              data-reveal
              className="relative scroll-mt-28"
              aria-current={active === index ? "step" : undefined}
            >
              <article className="grid items-center gap-8 md:grid-cols-12">
                <span
                  className={`absolute top-3 left-[calc(11px-2rem)] h-2.5 w-2.5 -translate-x-1/2 rounded-full border md:left-[calc(15px-3rem)] ${
                    active === index
                      ? "border-gold bg-gold"
                      : "border-ivory/30 bg-ink"
                  }`}
                  aria-hidden="true"
                />
                <div className="md:col-span-6">
                  <p className="font-deva text-xl text-gold">{yuga.sanskrit}</p>
                  <h3 className="mt-2 font-display text-3xl tracking-tight text-ivory md:text-4xl">
                    {yuga.title}
                  </h3>
                  <p className="mt-2 text-ivory-dim">
                    {yuga.kicker}
                    <span className="text-stone"> · {yuga.also}</span>
                  </p>
                  <p className="mt-4 max-w-md text-[15px] leading-relaxed text-stone">
                    {yuga.body}
                  </p>
                </div>
                <div className="md:col-span-6">
                  <div className="media-frame">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={yuga.image}
                        alt={yuga.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ol>

        <Link
          href="/education/four-yugas"
          className="mt-12 inline-block text-[13px] tracking-[0.04em] text-gold"
        >
          Read the four ages
        </Link>
      </div>
    </section>
  );
}
