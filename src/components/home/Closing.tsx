import { Button } from "@/components/ui/Button";

export function Closing() {
  return (
    <section className="px-5 py-28 md:px-8 md:py-40">
      <div className="mx-auto max-w-3xl text-center">
        <h2
          data-split-reveal
          className="font-display text-4xl leading-[1.08] tracking-[-0.03em] text-ivory md:text-6xl"
        >
          Live the Order. Do not join a brand.
        </h2>
        <p
          data-reveal
          className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ivory-dim"
        >
          No membership. No conversion. If a piece helps you walk the week with
          a clearer map, that is the whole point.
        </p>
        <div data-reveal className="mt-10 flex justify-center">
          <Button href="/about">About the ideas</Button>
        </div>
      </div>
    </section>
  );
}
