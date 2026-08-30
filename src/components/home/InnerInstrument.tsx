import Image from "next/image";
import Link from "next/link";
import { antahkarana } from "@/lib/site";

export function InnerInstrument() {
  return (
    <section className="px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-[1180px]">
        <div className="max-w-2xl">
          <h2
            data-split-reveal
            className="font-display text-4xl leading-[1.08] tracking-[-0.03em] text-ivory md:text-6xl"
          >
            How Memory is Built
          </h2>
          <p data-reveal className="mt-5 max-w-xl text-base leading-relaxed text-ivory-dim">
            Vedanta and yoga do not split memory into four kinds. They name four
            functions of the inner instrument, the <em>antahkarana</em>.{" "}
            <em>Citta</em> is the store. <em>Manas</em> moves. <em>Buddhi</em>{" "}
            decides. <em>Ahamkara</em> says I. Ahankar is the same word in a
            shorter spelling.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {antahkarana.map((item) => (
            <article
              key={item.slug}
              data-reveal
              className="overflow-hidden rounded-[1.75rem] border border-ivory/8 bg-surface"
            >
              <div className="relative aspect-[16/9] md:aspect-[16/8]">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6 md:p-8">
                <p className="font-deva text-xl text-gold">{item.sanskrit}</p>
                <h3 className="mt-2 font-display text-3xl tracking-tight text-ivory">
                  {item.title}
                </h3>
                <p className="mt-2 text-ivory-dim">{item.kicker}</p>
                <p className="mt-4 max-w-md text-[15px] leading-relaxed text-stone">
                  {item.body}
                </p>
              </div>
            </article>
          ))}
        </div>

        <Link
          href="/education/citta-manas-buddhi-ahamkara"
          className="mt-10 inline-block text-[13px] tracking-[0.04em] text-gold"
        >
          Read the inner instrument
        </Link>
      </div>
    </section>
  );
}
