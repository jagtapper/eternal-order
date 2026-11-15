import fs from "node:fs";
import path from "node:path";
import type { ReactNode } from "react";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/content/Mdx";

// Yuga Signal frontier cards. content/yuga-signal/*.mdx,
// ranked by the weekly frontier slate (not by date).

/** Bhau's Yuga Signal Grokbot link (provided 2026-11-13). */
export const GROKBOT_LINK =
  "https://grok.com/refer/bot?code=5D2R93B7V74W";

export type FrontierCard = {
  slug: string;
  id: string;
  rank: number;
  status: string;
  alternate: boolean;
  title: string;
  description: string;
  date: string;
  reading: string;
  cover: string;
  alt: string;
  /** Generated on-theme tile image. Card pages still use `cover`. */
  thumbnail: string;
  thumbnailAlt: string;
  fit: "cover" | "contain";
  imageLabel: string;
  caption: string;
  credit: string;
  licence: string;
  licenceUrl: string;
  imageSource: string;
  source: string;
  sourceType: string;
  sourceUrl: string;
  secondary: { label: string; url: string }[];
  parallel: string;
  citation: string;
  principle: string;
  /** Yuga signal axis (e.g. "Labour freed") and its honest stage. */
  signal: string;
  signalStage: string;
  displayOrder: number;
  coverAspect: number;
  thumbCrop: [number, number, number, number] | null;
  thumbFocus: [number, number];
  thumbFilter: "none" | "invert" | "tint";
  thumbLabel: string;
};

export type FrontierCardWithBody = FrontierCard & { content: ReactNode };

const DIR = path.join(process.cwd(), "content", "yuga-signal");

function nums(v: unknown, n: number): number[] | null {
  if (v == null) return null;
  const parts = String(v).split(",").map((x) => Number(x.trim()));
  return parts.length === n && parts.every((x) => Number.isFinite(x)) ? parts : null;
}

function toCard(slug: string, d: Record<string, unknown>): FrontierCard {
  const s = (k: string, f = "") => (d[k] == null ? f : String(d[k]));
  return {
    slug,
    id: s("id"),
    rank: Number(d.rank ?? 99),
    status: s("status", "Ready"),
    alternate: Boolean(d.alternate),
    title: s("title", slug),
    description: s("description"),
    date: s("date", "2026-01-01"),
    reading: s("reading", "3 min"),
    cover: s("cover"),
    alt: s("alt", s("title", slug)),
    thumbnail: s("thumbnail"),
    thumbnailAlt: s("thumbnailAlt"),
    fit: d.fit === "contain" ? "contain" : "cover",
    imageLabel: s("imageLabel"),
    caption: s("caption"),
    credit: s("credit"),
    licence: s("licence"),
    licenceUrl: s("licenceUrl"),
    imageSource: s("imageSource"),
    source: s("source"),
    sourceType: s("sourceType"),
    sourceUrl: s("sourceUrl"),
    secondary: Array.isArray(d.secondary)
      ? (d.secondary as { label: string; url: string }[])
      : [],
    parallel: s("parallel"),
    citation: s("citation"),
    principle: s("principle"),
    signal: s("signal"),
    signalStage: s("signalStage"),
    displayOrder: Number(d.displayOrder ?? d.rank ?? 99),
    coverAspect: Number(d.coverAspect ?? 1.5),
    thumbCrop: nums(d.thumbCrop, 4) as FrontierCard["thumbCrop"],
    thumbFocus: (nums(d.thumbFocus, 2) ?? [0.5, 0.5]) as [number, number],
    thumbFilter:
      d.thumbFilter === "invert" || d.thumbFilter === "tint" ? d.thumbFilter : "none",
    thumbLabel: d.thumbnail ? "" : s("thumbLabel", s("imageLabel")),
  };
}

export function getFrontierCards(): FrontierCard[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => {
      const { data } = matter(fs.readFileSync(path.join(DIR, f), "utf8"));
      return toCard(f.replace(/\.mdx$/, ""), data);
    })
    .sort((a, b) => a.displayOrder - b.displayOrder || a.rank - b.rank);
}

export async function getFrontierCard(
  slug: string,
): Promise<FrontierCardWithBody | null> {
  const file = path.join(DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const { content, frontmatter } = await compileMDX<Record<string, unknown>>({
    source: fs.readFileSync(file, "utf8"),
    options: { parseFrontmatter: true },
    components: mdxComponents,
  });
  return { ...toCard(slug, frontmatter), content };
}
