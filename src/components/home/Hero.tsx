import Image from "next/image";
import Link from "next/link";
import { Atmosphere } from "@/components/motion/Atmosphere";
import { Now } from "@/components/home/Now";
import { Subscribe } from "@/components/site/Subscribe";
import { formatDate, type Article } from "@/lib/content";
import type { NowNote, Spotlight } from "@/lib/now";
import { kindMeta } from "@/lib/site";

const lanes = [
  {
    href: "/education",
    kicker: "Lessons",
    title: "The inner map",
    image: "/images/cover-antahkarana.jpg",
    alt: "Four gold threads crossing on a dark manuscript page",
  },
  {
    href: "/videos",
    kicker: "Shorts",
    title: "Short posts",
    image: "/images/note-prana.jpg",
    alt: "A single gold filament of light aimed through a dark room",
  },
  {
    href: "/digests",
    kicker: "Digests",
    title: "Weekly pulse",
    image: "/images/cover-rta.jpg",
    alt: "A night sky reflected in a still well with one gold grain of light",
  },
  {
    href: "/ideas",
    kicker: "Ideas",
    title: "Deeper churn",
    image: "/images/cover-unity-essay.jpg",
    alt: "Two different wooden doors ajar onto the same dark lane",
  },
] as const;

export function Hero({
  newest,
  notes = [],
  spotlights = [],
}: {
  newest: Article;
  notes?: NowNote[];
  spotlights?: Spotlight[];
}) {
  const latestHref = `${kindMeta[newest.kind].href}/${newest.slug}`;

  return (
    <section
      data-parallax-section
      className="relative min-h-[100dvh] overflow-hidden"
    >
      <div
        data-parallax-layer
        data-speed="-0.16"
        className="absolute inset-0 scale-110"
      >
        <Image
          src="/images/hero-stepwell.jpg"
          alt="An ancient stepwell at night, a shaft of saffron light falling through dark stone"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/45 to-ink" />
      <Atmosphere />

      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-[1180px] flex-col justify-between gap-8 px-5 pb-10 pt-28 md:px-8 md:pb-12 md:pt-[6.75rem]">
        <div data-hero-item>
          <Now notes={notes} spotlights={spotlights} />
        </div>

        <div className="flex flex-col gap-6 md:gap-8">
        <div
          data-hero-item
          className="hero-index rounded-[1.75rem] border border-ivory/10 bg-ink/62 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl md:p-4"
        >
          <div className="px-2 pb-3 pt-1 md:px-3">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="font-display text-2xl tracking-[-0.03em] text-ivory md:text-3xl">
                Education
              </h2>
              <Link
                href="/education"
                className="hidden shrink-0 text-[13px] tracking-[0.04em] text-gold md:inline"
              >
                All lessons
              </Link>
            </div>
            <p className="mt-1 max-w-md text-[13px] leading-snug text-ivory-dim md:text-sm">
              This week&apos;s pulse. Then the map.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2.5 md:grid-cols-12 md:grid-rows-2 md:gap-3">
            <Link
              href={latestHref}
              className="group col-span-2 md:col-span-6 md:row-span-2"
            >
              <article className="h-full">
                <div className="relative aspect-[16/9] overflow-hidden rounded-[1.2rem] md:aspect-auto md:h-full md:min-h-[220px]">
                  <Image
                    src={newest.cover}
                    alt={newest.alt}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-gold">
                      Latest
                      <span className="mx-2 text-ivory/30">/</span>
                      {formatDate(newest.date)}
                    </p>
                    <h3 className="mt-1.5 font-display text-xl leading-[1.15] tracking-tight text-ivory md:text-3xl">
                      {newest.title}
                    </h3>
                  </div>
                </div>
              </article>
            </Link>

            {lanes.map((lane) => (
              <Link
                key={lane.href}
                href={lane.href}
                className="group col-span-1 md:col-span-3"
              >
                <article>
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[1.1rem] md:aspect-[16/9]">
                    <Image
                      src={lane.image}
                      alt={lane.alt}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.05]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/15 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-2.5 md:p-3">
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-gold">
                        {lane.kicker}
                      </p>
                      <h3 className="mt-0.5 font-display text-[15px] leading-tight tracking-tight text-ivory md:text-lg">
                        {lane.title}
                      </h3>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
          <Subscribe variant="hero" />
          <div className="max-w-3xl">
            <p
              data-hero-item
              className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-gold"
            >
              Eternal Order
              <span className="mx-2 text-ivory/30">|</span>
              Sanatan Dharma
            </p>
            <h1
              data-hero-item
              className="font-display text-[2.15rem] leading-[1.08] tracking-[-0.035em] text-ivory sm:text-5xl lg:text-[3.35rem]"
            >
              A Way of Life, not a Religion.
            </h1>
            <p
              data-hero-item
              className="mt-4 max-w-xl text-[15px] leading-relaxed text-ivory-dim md:text-base"
            >
              Four faculties of mind. Four Yugas. Four aims. A way of life, not
              a faith you join.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
