import Image from "next/image";
import Link from "next/link";

export function Epics() {
  return (
    <section className="relative min-h-[88vh] overflow-hidden" data-parallax-section>
      <div data-parallax-layer data-speed="-0.12" className="absolute inset-0 scale-110">
        <Image
          src="/images/epics-rivers.jpg"
          alt="Two riverbanks at dusk joined by a thin filament of saffron light"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/40 to-ink/15" />

      <div className="relative mx-auto flex min-h-[88vh] max-w-[1180px] items-end px-5 py-20 md:px-8">
        <div className="max-w-2xl">
          <h2
            data-split-reveal
            className="font-display text-4xl leading-[1.08] tracking-[-0.03em] text-ivory md:text-6xl"
          >
            Ramayana and Mahabharata
          </h2>
          <p data-reveal className="mt-6 max-w-lg text-base leading-relaxed text-ivory-dim">
            One is about keeping a vow when you have been sent away from the
            house. The other is about dharma after every clean option is gone.
            Working books for a way of life, not scripture to join.
          </p>
          <Link
            href="/education/ramayana-and-mahabharata"
            className="mt-8 inline-block text-[13px] tracking-[0.04em] text-gold"
          >
            Read the pairing
          </Link>
        </div>
      </div>
    </section>
  );
}
