import Image from "next/image";
import Link from "next/link";
import { formatDate, type Article } from "@/lib/content";
import { kindMeta } from "@/lib/site";

export function PieceCard({
  piece,
  large = false,
}: {
  piece: Article;
  large?: boolean;
}) {
  const href = `${kindMeta[piece.kind].href}/${piece.slug}`;

  return (
    <article className={large ? "md:col-span-7" : ""}>
      <Link href={href} className="group block">
        <div className="media-frame">
          <div
            className={`relative overflow-hidden ${large ? "aspect-[16/10]" : "aspect-[4/3]"}`}
          >
            <Image
              src={piece.cover}
              alt={piece.alt}
              fill
              sizes={large ? "(max-width: 768px) 100vw, 60vw" : "(max-width: 768px) 100vw, 33vw"}
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04]"
            />
          </div>
        </div>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-stone">
          {kindMeta[piece.kind].singular}
          <span className="mx-2 text-ivory/20">/</span>
          {formatDate(piece.date)}
        </p>
        <h3 className="mt-2 font-display text-2xl leading-[1.15] tracking-tight text-ivory md:text-[1.7rem]">
          {piece.title}
        </h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-ivory-dim">
          {piece.description}
        </p>
      </Link>
    </article>
  );
}
