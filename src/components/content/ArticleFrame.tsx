import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { formatDate, type Article } from "@/lib/content";
import { kindMeta } from "@/lib/site";

export function ArticleFrame({
  article,
  children,
}: {
  article: Article;
  children: ReactNode;
}) {
  const kind = kindMeta[article.kind];

  return (
    <article className="px-5 pb-24 pt-32 md:px-8 md:pt-36">
      <div className="mx-auto max-w-[760px]">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold">
          {kind.singular}
          <span className="mx-2 text-ivory/20">/</span>
          {formatDate(article.date)}
          {article.reading ? (
            <>
              <span className="mx-2 text-ivory/20">/</span>
              {article.reading}
            </>
          ) : null}
        </p>
        <h1 className="mt-5 font-display text-4xl leading-[1.08] tracking-[-0.03em] text-ivory md:text-6xl">
          {article.title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ivory-dim">
          {article.description}
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-[980px]">
        <div className="media-frame">
          <div className="relative aspect-[16/9] overflow-hidden">
            <Image
              src={article.cover}
              alt={article.alt}
              fill
              priority
              sizes="980px"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div className="prose-scout mx-auto mt-14 max-w-[680px]">{children}</div>

      <div className="mx-auto mt-16 max-w-[680px]">
        <Link
          href={kind.href}
          className="text-[13px] tracking-[0.04em] text-gold"
        >
          Back to {kind.label.toLowerCase()}
        </Link>
      </div>
    </article>
  );
}
