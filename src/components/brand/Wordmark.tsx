import { Mark } from "@/components/brand/Mark";
import { site } from "@/lib/site";

export function Wordmark({
  size = "nav",
}: {
  size?: "nav" | "footer";
}) {
  const title =
    size === "footer"
      ? "font-display text-2xl leading-none tracking-tight"
      : "font-display text-[1.02rem] leading-none tracking-tight md:text-[1.12rem]";
  const sub =
    size === "footer"
      ? "mt-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-gold"
      : "mt-1 font-mono text-[8px] uppercase tracking-[0.2em] text-gold sm:text-[9px]";

  return (
    <span className="flex items-center gap-2.5 text-ivory">
      <Mark
        className={
          size === "footer" ? "h-10 w-10 text-gold" : "h-8 w-8 text-gold"
        }
      />
      <span className="flex flex-col">
        <span className={title}>{site.shortName}</span>
        <span className={sub}>{site.subtitle}</span>
      </span>
    </span>
  );
}
