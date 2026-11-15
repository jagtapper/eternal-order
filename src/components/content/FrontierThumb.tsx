/* eslint-disable @next/next/no-img-element */
import type { CSSProperties } from "react";
import type { FrontierCard } from "@/lib/frontier";

// Thumbnail for Yuga Signal tiles.
// Prefer a generated, on-theme `thumbnail` when present (no CSS tint, crop, or zoom).
// Otherwise fall back to the rights-safe `cover`, with any crop or tint applied as
// CSS on the tile only — the image FILES are never altered.
// Detail pages show the full, unaltered still with its credit and licence.
//  - thumbCrop: CSS crop to a region of a CC BY figure (dark panels only).
//  - "invert": invert + hue-rotate a light CC BY diagram to a dark theme.
//  - "tint": darken/warm a public-domain photo.
//  - "none": shown as-is (required for the CC BY-SA VFS photo).

const FILTERS: Record<FrontierCard["thumbFilter"], string | undefined> = {
  none: undefined,
  invert: "invert(1) hue-rotate(180deg) sepia(0.25) saturate(1.25) brightness(0.95)",
  tint: "brightness(0.62) sepia(0.45) saturate(1.15) contrast(1.05)",
};

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

function cropStyle(card: FrontierCard, C: number): CSSProperties | null {
  if (!card.thumbCrop) return null;
  const [x, y, w, h] = card.thumbCrop;
  const [fx, fy] = card.thumbFocus;
  const A = card.coverAspect;
  const K = (w * A) / h;
  if (K >= C) {
    const imgH = 100 / h;
    const imgW = (A / (h * C)) * 100;
    const vis = C / K;
    const c = clamp(fx, vis / 2, 1 - vis / 2);
    const xl = x + w * (c - vis / 2);
    return { position: "absolute", height: `${imgH}%`, width: `${imgW}%`, left: `${-xl * imgW}%`, top: `${-y * imgH}%`, maxWidth: "none" };
  }
  const imgW = 100 / w;
  const imgH = (100 / w) * (C / A);
  const vis = K / C;
  const c = clamp(fy, vis / 2, 1 - vis / 2);
  const yt = y + h * (c - vis / 2);
  return { position: "absolute", width: `${imgW}%`, height: `${imgH}%`, left: `${-x * imgW}%`, top: `${-yt * imgH}%`, maxWidth: "none" };
}

export function FrontierThumb({
  card,
  aspect,
  aspectClass,
  rounded = "",
}: {
  card: FrontierCard;
  aspect: number;
  aspectClass: string;
  rounded?: string;
}) {
  const generated = Boolean(card.thumbnail);
  const src = generated ? card.thumbnail : card.cover;
  const alt = generated
    ? card.thumbnailAlt || "AI illustration"
    : card.alt;

  if (generated) {
    return (
      <div className={`relative overflow-hidden bg-ink-2 ${aspectClass} ${rounded}`}>
        {src ? (
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center font-mono text-[11px] uppercase tracking-[0.18em] text-stone">
            Image pending
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/15 to-transparent" />
      </div>
    );
  }

  const crop = cropStyle(card, aspect);
  const filter = FILTERS[card.thumbFilter];
  return (
    <div className={`relative overflow-hidden bg-ink-2 ${aspectClass} ${rounded}`}>
      {card.cover ? (
        <img
          src={card.cover}
          alt={card.alt}
          loading="lazy"
          decoding="async"
          style={crop ? { ...crop, filter } : { filter }}
          className={
            crop
              ? ""
              : "absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04]"
          }
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center font-mono text-[11px] uppercase tracking-[0.18em] text-stone">
          Image pending
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/15 to-transparent" />
    </div>
  );
}
