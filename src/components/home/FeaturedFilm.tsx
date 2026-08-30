import Image from "next/image";
import Link from "next/link";
import { kindMeta } from "@/lib/site";
import type { Article } from "@/lib/content";

export function FeaturedFilm({ piece }: { piece?: Article }) {
  if (!piece) return null;

  return (
    <section className="px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-[1180px]">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold">
          Featured
        </p>
        <h2
          data-split-reveal
          className="mt-6 max-w-3xl font-display text-4xl leading-[1.08] tracking-[-0.03em] text-ivory md:text-6xl"
        >
          {piece.title}
        </h2>
        <p
          data-reveal
          className="mt-5 max-w-xl text-[15px] leading-relaxed text-ivory-dim"
        >
          {piece.description}
        </p>

        <Link
          href={`${kindMeta[piece.kind].href}/${piece.slug}`}
          className="group mt-10 block"
          data-reveal
        >
          <div className="media-frame">
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                src={piece.cover}
                alt={piece.alt}
                fill
                sizes="(max-width: 1180px) 100vw, 1180px"
                className="ken object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.03]"
              />
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
