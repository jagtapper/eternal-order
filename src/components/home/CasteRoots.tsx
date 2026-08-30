import Image from "next/image";
import Link from "next/link";

export function CasteRoots() {
  return (
    <section className="px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-[1180px] items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6" data-reveal>
          <div className="media-frame">
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src="/images/caste-workshop.jpg"
                alt="A dark workshop with a loom and tools of several trades in saffron lamp light"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
        <div className="lg:col-span-6">
          <h2
            data-split-reveal
            className="font-display text-4xl leading-[1.08] tracking-[-0.03em] text-ivory md:text-5xl"
          >
            Two older words sit under &ldquo;caste&rdquo;
          </h2>
          <p data-reveal className="mt-6 max-w-md text-[15px] leading-relaxed text-ivory-dim">
            <em>Varna</em> is the fourfold map of function in the texts.{" "}
            <em>Jati</em> is the community your people actually named. English
            collapsed them into one courtroom word. A Hindu who cannot tell them
            apart will keep borrowing someone else&apos;s story about who they are.
          </p>
          <p data-reveal className="mt-4 max-w-md text-[15px] leading-relaxed text-ivory-dim">
            This is orientation, not a ranking exercise. Learn the map you
            inherited. Then you can judge it with your own eyes.
          </p>
          <Link
            href="/education/varna-and-jati"
            className="mt-8 inline-block text-[13px] tracking-[0.04em] text-gold"
          >
            Read the orientation
          </Link>
        </div>
      </div>
    </section>
  );
}
