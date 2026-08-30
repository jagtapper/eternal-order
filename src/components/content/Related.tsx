import Link from "next/link";
import type { Article } from "@/lib/content";
import { kindMeta } from "@/lib/site";

export function Related({ pieces }: { pieces: Article[] }) {
  if (pieces.length === 0) return null;

  return (
    <aside className="mx-auto mt-20 max-w-[680px] border-t border-ivory/8 pt-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-stone">
        Continue
      </p>
      <ul className="mt-5 space-y-5">
        {pieces.map((piece) => (
          <li key={`${piece.kind}-${piece.slug}`}>
            <Link
              href={`${kindMeta[piece.kind].href}/${piece.slug}`}
              className="group block"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold">
                {kindMeta[piece.kind].singular}
              </p>
              <p className="mt-1 font-display text-2xl tracking-tight text-ivory transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:text-gold">
                {piece.title}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
