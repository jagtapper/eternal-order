import Image from "next/image";

export function UnityLesson() {
  return (
    <section className="px-5 py-24 md:px-8 md:py-36">
      <div className="mx-auto grid max-w-[1180px] items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2
            data-split-reveal
            className="font-display text-4xl leading-[1.08] tracking-[-0.03em] text-ivory md:text-6xl"
          >
            The Maratha lesson
          </h2>
          <blockquote
            data-reveal
            className="mt-8 font-display text-2xl leading-[1.25] text-ivory md:text-[2rem]"
          >
            Village, jati, language, and court were all real. They were also how
            a people was kept from acting as a people.
          </blockquote>
          <p data-reveal className="mt-6 max-w-md text-[15px] leading-relaxed text-ivory-dim">
            Shivaji&apos;s swarajya was less a throne than a proof: Hindus could
            govern themselves by a shared memory of duty, instead of waiting for
            a distant court to remember them.
          </p>
        </div>
        <div className="lg:col-span-7" data-reveal>
          <div className="media-frame">
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src="/images/unity-fort.jpg"
                alt="A Deccan mountain fortress at dawn, saffron rim light on dark stone"
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
