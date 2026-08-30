import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "gold" | "ghost";
  className?: string;
};

export function Button({ href, children, variant = "gold", className = "" }: Props) {
  const base =
    "group inline-flex items-center gap-3 rounded-full px-5 py-2.5 text-[13px] tracking-[0.04em] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]";
  const look =
    variant === "gold"
      ? "bg-gold text-ink hover:bg-[#e4a05a]"
      : "border border-ivory/14 bg-ivory/[0.03] text-ivory hover:border-gold/40 hover:bg-ivory/[0.06]";

  return (
    <Link href={href} className={`${base} ${look} ${className}`}>
      <span>{children}</span>
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink/10 text-current transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px">
        <ArrowUpRight size={14} weight="light" />
      </span>
    </Link>
  );
}
