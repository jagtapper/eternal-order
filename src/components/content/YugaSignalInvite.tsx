import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Subscribe } from "@/components/site/Subscribe";
import { GROKBOT_LINK } from "@/lib/frontier";

export function YugaSignalInvite({
  headingLevel = "h2",
  className = "",
}: {
  headingLevel?: "h2" | "h3";
  className?: string;
}) {
  const Heading = headingLevel;

  return (
    <div
      id="yuga-signal-updates"
      className={`rounded-[1.75rem] border border-ivory/10 bg-surface px-5 py-8 md:px-8 md:py-9 ${className}`}
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold">
        Yuga Signal
      </p>
      <Heading className="mt-3 font-display text-3xl tracking-[-0.03em] text-ivory md:text-4xl">
        Get Yuga Signal updates
      </Heading>
      <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ivory-dim">
        Leave an email for the next cards. No membership. This list is not
        sold.
      </p>
      <Subscribe
        variant="embed"
        hint="One note when the next Yuga Signal cards are ready. That is all."
      />
      <p className="mt-6">
        <a
          href={GROKBOT_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 text-[15px] text-gold transition-colors duration-500 hover:text-ivory"
        >
          Try the Yuga Signal Grokbot
          <ArrowUpRight
            size={16}
            weight="light"
            className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </a>
      </p>
    </div>
  );
}

export function YugaSignalInviteLinks({ className = "" }: { className?: string }) {
  return (
    <p
      className={`px-0.5 text-[12px] leading-relaxed text-stone ${className}`}
    >
      <Link
        href="/education#yuga-signal-updates"
        className="text-ivory-dim transition-colors duration-500 hover:text-gold"
      >
        Get Yuga Signal updates
      </Link>
      <span className="mx-2 text-ivory/20">·</span>
      <a
        href={GROKBOT_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="text-ivory-dim transition-colors duration-500 hover:text-gold"
      >
        Try the Yuga Signal Grokbot
      </a>
    </p>
  );
}
