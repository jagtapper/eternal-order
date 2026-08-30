import Image from "next/image";
import Link from "next/link";
import { mahabhuta, panchamrita } from "@/lib/site";

function CompareCard({
  title,
  sanskrit,
  meta,
  body,
  image,
  alt,
}: {
  title: string;
  sanskrit: string;
  meta: string;
  body: string;
  image: string;
  alt: string;
}) {
  return (
    <article className="min-w-[72vw] snap-start rounded-[1.5rem] border border-ivory/8 bg-surface p-2.5 sm:min-w-0">
      <div className="relative aspect-square overflow-hidden rounded-[1.15rem]">
        <Image src={image} alt={alt} fill sizes="220px" className="object-cover" />
      </div>
      <div className="px-2 pb-3 pt-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-gold">
          {meta}
        </p>
        <h3 className="mt-1 font-display text-2xl tracking-tight text-ivory">
          {title}
        </h3>
        <p className="font-deva mt-0.5 text-lg text-ivory-dim">{sanskrit}</p>
        <p className="mt-2 text-sm leading-relaxed text-stone">{body}</p>
      </div>
    </article>
  );
}

export function DigitalElements() {
  return (
    <section className="px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-[1180px]">
        <h2
          data-split-reveal
          className="max-w-3xl font-display text-4xl leading-[1.08] tracking-[-0.03em] text-ivory md:text-6xl"
        >
          Two Fives, held apart
        </h2>
        <p data-reveal className="mt-5 max-w-xl text-base leading-relaxed text-ivory-dim">
          <em>Pancha mahabhuta</em> is the cosmology: how a world holds.
          <em> Panchamrita</em> is the kitchen practice: five nectars mixed into
          one taste. They rhyme. They are not the same list.
        </p>
        <Link
          href="/education/pancha-mahabhuta-and-panchamrita"
          className="mt-6 inline-block text-[13px] tracking-[0.04em] text-gold"
        >
          Read both maps
        </Link>

        <div className="mt-14" data-reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold">
            Pancha mahabhuta
          </p>
          <p className="mt-2 max-w-lg text-sm leading-relaxed text-stone">
            The five great elements, subtle to gross: space, air, fire, water,
            earth. Shown here earth to space so the row can sit over the nectars.
          </p>
          <div className="mt-6 flex snap-x gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-5 md:overflow-visible md:pb-0">
            {mahabhuta.map((item) => (
              <CompareCard
                key={item.slug}
                title={item.title}
                sanskrit={item.sanskrit}
                meta={item.role}
                body={item.body}
                image={item.image}
                alt={item.alt}
              />
            ))}
          </div>
        </div>

        <div className="mt-16" data-reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold">
            Panchamrita
          </p>
          <p className="mt-2 max-w-lg text-sm leading-relaxed text-stone">
            Five nectars. A household rhyme lines them under the elements. That
            pairing is pedagogy, not a verse.
          </p>
          <div className="mt-6 flex snap-x gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-5 md:overflow-visible md:pb-0">
            {panchamrita.map((item) => (
              <CompareCard
                key={item.slug}
                title={item.title}
                sanskrit={item.sanskrit}
                meta={`Under ${item.pairsWith}`}
                body={item.body}
                image={item.image}
                alt={item.alt}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
