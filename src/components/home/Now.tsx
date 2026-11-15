import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { NowNote, Spotlight } from "@/lib/now";
import type { FrontierCard } from "@/lib/frontier";
import { FrontierThumb } from "@/components/content/FrontierThumb";
import { YugaSignalInviteLinks } from "@/components/content/YugaSignalInvite";

function Feed({
  label,
  marker,
  className = "",
  children,
}: {
  label: string;
  marker?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`flex min-h-0 flex-col ${className}`}>
      <div className="mb-2.5 flex items-center justify-between gap-3">
        <p className="font-display text-base font-semibold tracking-tight text-gold md:text-lg">
          {label}
        </p>
        {marker}
      </div>
      <div
        data-lenis-prevent
        className="now-feed max-h-[15.5rem] space-y-3 overflow-y-auto overscroll-contain rounded-[1.4rem] border border-ivory/14 bg-ink/20 p-2 md:max-h-[min(52rem,72vh)] md:p-2.5"
      >
        {children}
      </div>
    </div>
  );
}

function NowCard({ note }: { note: NowNote }) {
  return (
    <Link href={note.href ?? "/now"} className="group block">
      <article className="overflow-hidden rounded-[1.25rem] border border-ivory/10 bg-ink/55">
        <div className="relative aspect-[16/8] overflow-hidden">
          <Image
            src={note.cover}
            alt={note.alt}
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/15 to-transparent" />
        </div>
        <div className="px-4 py-3">
          <h3 className="font-display text-lg leading-tight tracking-tight text-ivory">
            {note.title}
          </h3>
          <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-ivory-dim">
            {note.description}
          </p>
        </div>
      </article>
    </Link>
  );
}

function SpotlightCard({ item }: { item: Spotlight }) {
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      <article className="overflow-hidden rounded-[1.25rem] border border-ivory/10 bg-ink/55">
        <div className="relative aspect-[16/8] overflow-hidden">
          <Image
            src={item.cover}
            alt={item.alt}
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/15 to-transparent" />
        </div>
        <div className="flex items-start justify-between gap-3 px-4 py-3">
          <div className="min-w-0">
            <h3 className="font-display text-lg leading-tight tracking-tight text-ivory">
              {item.title}
            </h3>
            <p className="mt-1 text-[12px] text-stone">{item.source}</p>
          </div>
          <ArrowUpRight
            size={16}
            weight="light"
            className="mt-1 shrink-0 text-gold"
          />
        </div>
      </article>
    </a>
  );
}

// Yuga Signal frontier tile (links to /education/yuga-signal/<slug>)
// Tiles use the generated `thumbnail` when present; card pages keep the rights-safe still.
function FrontierTile({ card }: { card: FrontierCard }) {
  return (
    <Link href={`/education/yuga-signal/${card.slug}`} className="group block">
      <article className="overflow-hidden rounded-[1.25rem] border border-ivory/10 bg-ink/55">
        <FrontierThumb card={card} aspect={2} aspectClass="aspect-[16/8]" />
        <div className="flex items-start justify-between gap-3 px-4 py-3">
          <div className="min-w-0">
            {card.thumbLabel ? (
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-stone">
                {card.thumbLabel}
              </p>
            ) : null}
            <h3 className="font-display text-lg leading-tight tracking-tight text-ivory">
              {card.title}
            </h3>
            <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-ivory-dim">
              {card.description}
            </p>
            <p className="mt-1 text-[12px] text-stone">
              {card.source} · {card.citation}
            </p>
          </div>
          <ArrowUpRight
            size={16}
            weight="light"
            className="mt-1 shrink-0 text-gold"
          />
        </div>
      </article>
    </Link>
  );
}

export function Now({
  notes = [],
  spotlights = [],
  frontier = [],
}: {
  notes?: NowNote[];
  spotlights?: Spotlight[];
  frontier?: FrontierCard[];
}) {
  if (notes.length === 0 && spotlights.length === 0 && frontier.length === 0)
    return null;

  return (
    <div className="grid gap-5 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
      {frontier.length > 0 ? (
        <div className="flex min-h-0 flex-col sm:col-span-2 lg:col-span-1">
          <Feed
            label="Yuga Signal"
          >
            {frontier.map((card) => (
              <FrontierTile key={card.slug} card={card} />
            ))}
          </Feed>
          <YugaSignalInviteLinks className="mt-2.5" />
        </div>
      ) : null}
      {notes.length > 0 ? (
        <Feed label="Michigan Now">
          {notes.map((note) => (
            <NowCard key={note.slug} note={note} />
          ))}
        </Feed>
      ) : null}
      {spotlights.length > 0 ? (
        <Feed label="Sanatan Spotlight">
          {spotlights.map((item) => (
            <SpotlightCard key={item.slug} item={item} />
          ))}
        </Feed>
      ) : null}
    </div>
  );
}
