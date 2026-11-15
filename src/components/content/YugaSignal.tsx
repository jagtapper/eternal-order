import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/content";
import type { FrontierCard } from "@/lib/frontier";
import { FrontierThumb } from "@/components/content/FrontierThumb";
import { YugaSignalInvite } from "@/components/content/YugaSignalInvite";

export function PreviewBanner({ className = "" }: { className?: string }) {
  return (
    <div
      className={`inline-flex items-center gap-3 rounded-full border border-dashed border-gold/60 bg-gold/10 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-gold ${className}`}
      role="note"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />
      Preview — not published
    </div>
  );
}

export function FrontierStill({
  card,
  sizes,
  priority = false,
  aspect = "aspect-[4/3]",
}: {
  card: FrontierCard;
  sizes: string;
  priority?: boolean;
  aspect?: string;
}) {
  const contain = card.fit === "contain";
  return (
    <div className="media-frame">
      <div
        className={`relative overflow-hidden ${aspect} ${contain ? "bg-white" : "bg-ink-2"}`}
      >
        {card.cover ? (
          <Image
            src={card.cover}
            alt={card.alt}
            fill
            priority={priority}
            sizes={sizes}
            className={
              contain
                ? "object-contain p-3"
                : "object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04]"
            }
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center font-mono text-[11px] uppercase tracking-[0.18em] text-stone">
            Image pending
          </div>
        )}
      </div>
    </div>
  );
}

function FrontierTile({ card }: { card: FrontierCard }) {
  return (
    <article>
      <Link href={`/education/yuga-signal/${card.slug}`} className="group block">
        <div className="media-frame">
          <FrontierThumb card={card} aspect={4 / 3} aspectClass="aspect-[4/3]" />
        </div>
        {card.thumbLabel ? (
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-stone">
            {card.thumbnail ? card.thumbLabel : `Image: ${card.thumbLabel}`}
          </p>
        ) : null}
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-stone">
          {formatDate(card.date)}
          <span className="mx-2 text-ivory/20">/</span>
          {card.status}
        </p>
        <h3 className="mt-2 font-display text-xl leading-[1.2] tracking-tight text-ivory transition-colors duration-500 group-hover:text-gold md:text-[1.4rem]">
          {card.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ivory-dim">
          {card.description}
        </p>
        <p className="mt-3 border-t border-ivory/8 pt-3 text-[13px] leading-snug text-stone">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-gold">
            Parallel
          </span>{" "}
          {card.citation}
        </p>
      </Link>
    </article>
  );
}

export function YugaSignalBlock({ cards }: { cards: FrontierCard[] }) {
  if (cards.length === 0) return null;

  return (
    <section
      id="yuga-signal"
      aria-labelledby="yuga-signal-title"
      className="px-5 pb-28 md:px-8"
    >
      <div className="mx-auto max-w-[1180px] rounded-[2rem] border border-dashed border-gold/35 p-5 md:p-10">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div className="max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold">
              Frontier slate
              <span className="mx-2 text-ivory/20">/</span>
              Week of Nov 11, 2026
            </p>
            <h2
              id="yuga-signal-title"
              className="mt-3 font-display text-4xl leading-[1.05] tracking-[-0.03em] text-ivory md:text-5xl"
            >
              Yuga Signal
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ivory-dim">
              New results from the frontier, each read beside a verified line
              from the texts. A parallel, not a proof: every card names its
              primary source and what the comparison does not claim.
            </p>
          </div>
                  </div>

        <div className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <FrontierTile key={card.slug} card={card} />
          ))}
        </div>

        <YugaSignalInvite headingLevel="h3" className="mt-14" />

      </div>
    </section>
  );
}
