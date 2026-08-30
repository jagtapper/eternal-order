import Image from "next/image";
import Link from "next/link";
import { formatDate, type Article } from "@/lib/content";
import { kindMeta } from "@/lib/site";
import { PieceCard } from "@/components/content/PieceCard";

export function IndexFrame({
  title,
  lede,
  pieces,
}: {
  title: string;
  lede: string;
  pieces: Article[];
}) {
  const [lead, ...rest] = pieces;

  return (
    <div className="px-5 pb-24 pt-32 md:px-8 md:pt-36">
      <div className="mx-auto max-w-[1180px]">
        <h1 className="max-w-3xl font-display text-5xl leading-[1.05] tracking-[-0.035em] text-ivory md:text-7xl">
          {title}
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-ivory-dim">
          {lede}
        </p>

        {!lead ? (
          <p className="mt-16 text-ivory-dim">Nothing filed here yet.</p>
        ) : (
          <>
            <article className="mt-16">
              <Link
                href={`${kindMeta[lead.kind].href}/${lead.slug}`}
                className="group block"
              >
                <div className="media-frame">
                  <div className="relative aspect-[16/9] overflow-hidden md:aspect-[21/9]">
                    <Image
                      src={lead.cover}
                      alt={lead.alt}
                      fill
                      priority
                      sizes="1180px"
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/10 md:from-ink/80 md:via-ink/15 md:to-transparent" />
                    <div className="absolute bottom-0 left-0 max-w-2xl p-6 md:p-10">
                      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold">
                        {kindMeta[lead.kind].singular}
                        <span className="mx-2 text-ivory/30">/</span>
                        {formatDate(lead.date)}
                      </p>
                      <h2 className="mt-3 font-display text-3xl tracking-tight text-ivory md:text-5xl">
                        {lead.title}
                      </h2>
                      <p className="mt-3 max-w-lg text-sm leading-relaxed text-ivory-dim md:text-base">
                        {lead.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </article>

            {rest.length > 0 ? (
              <div className="mt-14 grid gap-12 md:grid-cols-2">
                {rest.map((piece) => (
                  <PieceCard key={`${piece.kind}-${piece.slug}`} piece={piece} />
                ))}
              </div>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}
