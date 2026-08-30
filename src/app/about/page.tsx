import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About the ideas",
  description:
    "Eternal Order is a journal of Sanatan Dharma as a Way of Life, not a Religion. Labor, aims, ages, epics, two fives, then memory.",
};

export default function AboutPage() {
  return (
    <article className="pb-28 pt-28 md:pt-32">
      <div className="px-5 md:px-8">
        <div className="mx-auto max-w-[720px]">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold">
            Eternal Order
            <span className="mx-2 text-ivory/30">|</span>
            Sanatan Dharma
          </p>
          <h1 className="mt-4 font-display text-5xl leading-[1.05] tracking-[-0.035em] text-ivory md:text-7xl">
            A philosophy you walk
          </h1>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-[1180px] px-5 md:px-8">
        <div className="media-frame">
          <div className="relative aspect-[16/8] overflow-hidden">
            <Image
              src="/images/about-library.jpg"
              alt="A long aisle of cloth-wrapped bundles receding to a square of saffron daylight"
              fill
              priority
              sizes="1180px"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div className="px-5 md:px-8">
        <div className="prose-scout mx-auto mt-14 max-w-[680px]">
          <p>
            Eternal Order is a place to read. Sanatan Dharma here is a Way of
            Life, not a Religion: not a church you join, a creed you sign, or a
            conversion you collect. It is the inherited way of ordering a
            people and a person. Labor. Aims. Time. Stories. Memory.
          </p>
          <p>
            Too many Hindus meet their own words only as someone else&apos;s
            summary. Dharma becomes a party adjective. Caste becomes only a
            courtroom. The epics become costume. The pieces here put the older
            map back on the table so you can walk it.
          </p>
          <p>
            The front of the house is a pulse: Michigan Now, a Sanatan
            Spotlight, lessons, and a box if you want to stay updated. Then the
            map, in the order it is useful. First the Caste System as division
            of labor, four functions that held a society, none a leftover. Then
            Dharma, Artha, Kama, Moksha, the four aims of one life. Then the
            Four Yugas, a clock for how memory thins. The Ramayana and the
            Mahabharata sit as working books, not worship. The Maratha lesson
            is unity without erasure. Two Fives are held apart: pancha
            mahabhuta and panchamrita. Late on the page, memory as
            infrastructure, and how memory is built in the inner instrument.
          </p>
          <p>
            There is no membership, no chapter, no donation page, and no party
            line. The close is the whole point. Live the Order. Do not join a
            brand. Say the Sanskrit once, say it in English, keep the source
            and the guess in separate rooms, and under-claim when the evidence
            is thin.
          </p>
        </div>
      </div>
    </article>
  );
}
