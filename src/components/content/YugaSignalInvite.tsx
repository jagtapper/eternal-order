import Link from "next/link";
import { Subscribe } from "@/components/site/Subscribe";
import { GROKBOT_LINK, YUGA_TEMPLATE_LINK } from "@/lib/frontier";

const TEMPLATE_HREF = YUGA_TEMPLATE_LINK || "/education#yuga-signal";

function BotSteps({ size = "md" }: { size?: "sm" | "md" }) {
  const h = size === "sm" ? "h-10" : "h-11";
  const base = `group inline-flex ${h} shrink-0 items-center justify-center gap-2.5 whitespace-nowrap rounded-full px-4 text-[13px] tracking-[0.04em] transition-colors duration-500`;
  const step = "flex h-6 w-6 items-center justify-center rounded-full font-mono text-[11px]";
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
      <a
        href={GROKBOT_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} border border-gold/70 bg-gold/10 text-gold hover:bg-gold hover:text-ink`}
      >
        <span className={`${step} bg-gold/20`}>1</span>
        <span>Start your free Grok Bot trial</span>
      </a>
      <a
        href={TEMPLATE_HREF}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} border border-gold/70 bg-gold/10 text-gold hover:bg-gold hover:text-ink`}
      >
        <span className={`${step} bg-gold/20`}>2</span>
        <span>Add the Yuga Signal bot</span>
      </a>
    </div>
  );
}

/** Short, full-width version for the homepage, between the feeds and Education. */
export function YugaSignalInviteBar({ className = "" }: { className?: string }) {
  return (
    <div
      id="yuga-signal-updates"
      className={`hero-index rounded-[1.75rem] border border-ivory/10 bg-ink/62 px-5 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl md:px-6 ${className}`}
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-8">
        <div className="shrink-0 lg:max-w-[21rem]">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold">
            Yuga Signal
          </p>
          <h2 className="mt-1.5 font-display text-2xl tracking-[-0.03em] text-ivory md:text-[1.75rem] lg:whitespace-nowrap">
            Get Yuga Signal updates
          </h2>
          <p className="mt-1 text-[13px] leading-snug text-ivory-dim">
            One note when new cards are ready. No membership. Not sold.
          </p>
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <Subscribe variant="inline" />
          <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-3">
            <p className="text-[12px] leading-snug text-stone">
              Or have a bot bring it to you:
            </p>
            <BotSteps size="sm" />
          </div>
        </div>
      </div>
    </div>
  );
}

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
      <div className="mt-6 border-t border-ivory/10 pt-6">
        <p className="text-[13px] leading-relaxed text-ivory-dim">
          Or let a bot bring each new card to you, written for what you care
          about. Two steps:
        </p>
        <div className="mt-3">
          <BotSteps />
        </div>
      </div>
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
