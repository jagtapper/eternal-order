import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/content";
import { getFrontierCard, getFrontierCards } from "@/lib/frontier";
import { FrontierStill } from "@/components/content/YugaSignal";
import { YugaSignalInvite } from "@/components/content/YugaSignalInvite";
import type { Metadata } from "next";

export function generateStaticParams() {
  return getFrontierCards().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const card = await getFrontierCard(slug);
  if (!card) return {};
  return {
    title: card.title,
    description: card.description,
  };
}

export default async function FrontierCardPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const card = await getFrontierCard(slug);
  if (!card) notFound();

  const others = getFrontierCards().filter((c) => c.slug !== slug).slice(0, 2);

  return (
    <article className="px-5 pb-24 pt-32 md:px-8 md:pt-36">
      <div className="mx-auto max-w-[760px]">
        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-gold">
          Yuga Signal
          <span className="mx-2 text-ivory/20">/</span>
          {formatDate(card.date)}
          <span className="mx-2 text-ivory/20">/</span>
          {card.reading}
        </p>
        <h1 className="mt-5 font-display text-4xl leading-[1.08] tracking-[-0.03em] text-ivory md:text-6xl">
          {card.title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ivory-dim">
          {card.description}
        </p>
      </div>

      <figure className="mx-auto mt-12 max-w-[980px]">
        <FrontierStill card={card} sizes="980px" priority aspect="aspect-[16/9]" />
        <figcaption className="mt-4 px-2 text-sm leading-relaxed text-ivory-dim">
          {card.caption}
          <span className="mt-1 block font-mono text-[11px] uppercase tracking-[0.12em] text-stone">
            {card.imageSource ? (
              <a href={card.imageSource} className="hover:text-gold">
                {card.credit}
              </a>
            ) : (
              card.credit
            )}
            {card.licence ? (
              <>
                <span className="mx-2 text-ivory/20">/</span>
                {card.licenceUrl ? (
                  <a href={card.licenceUrl} className="hover:text-gold">
                    {card.licence}
                  </a>
                ) : (
                  card.licence
                )}
              </>
            ) : null}
          </span>
        </figcaption>
      </figure>

      <div className="mx-auto mt-14 grid max-w-[680px] gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-hairline bg-surface/60 p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold">
            Primary source
          </p>
          <a
            href={card.sourceUrl}
            className="mt-2 block font-display text-lg leading-snug text-ivory hover:text-gold"
          >
            {card.source}
          </a>
          <p className="mt-1 text-[13px] text-stone">
            {card.sourceType} / {formatDate(card.date)}
          </p>
        </div>
        <div className="rounded-2xl border border-hairline bg-surface/60 p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold">
            Textual parallel
          </p>
          <p className="mt-2 font-display text-lg leading-snug text-ivory">
            {card.citation}
          </p>
          <p className="mt-1 text-[13px] text-stone">Principle: {card.principle}</p>
        </div>
        {card.signal ? (
          <div className="rounded-2xl border border-hairline bg-surface/60 p-5 sm:col-span-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold">
              Yuga signal
            </p>
            <p className="mt-2 font-display text-lg leading-snug text-ivory">
              {card.signal}
            </p>
            {card.signalStage ? (
              <p className="mt-1 text-[13px] text-stone">Stage: {card.signalStage}</p>
            ) : null}
          </div>
        ) : null}
      </div>

      <div className="prose-scout mx-auto mt-12 max-w-[680px]">{card.content}</div>

      {card.secondary.length > 0 ? (
        <div className="mx-auto mt-12 max-w-[680px] border-t border-ivory/8 pt-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-stone">
            Also read
          </p>
          <ul className="mt-3 space-y-2 text-[15px]">
            {card.secondary.map((s) => (
              <li key={s.url}>
                <a href={s.url} className="text-gold hover:text-ivory">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {others.length > 0 ? (
        <aside className="mx-auto mt-16 max-w-[680px] border-t border-ivory/8 pt-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-stone">
            More from this week&apos;s Yuga Signal
          </p>
          <ul className="mt-5 space-y-5">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/education/yuga-signal/${o.slug}`} className="group block">
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold">
                    Yuga Signal
                  </p>
                  <p className="mt-1 font-display text-2xl tracking-tight text-ivory transition-colors duration-500 group-hover:text-gold">
                    {o.title}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      ) : null}

      <div className="mx-auto mt-16 max-w-[680px]">
        <YugaSignalInvite />
      </div>

      <div className="mx-auto mt-10 max-w-[680px]">
        <Link href="/education#yuga-signal" className="text-[13px] tracking-[0.04em] text-gold">
          Back to education
        </Link>
      </div>
    </article>
  );
}
