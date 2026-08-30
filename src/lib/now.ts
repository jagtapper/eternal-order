import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { getAll } from "@/lib/content";

export type NowNote = {
  slug: string;
  title: string;
  description: string;
  date: string;
  cover: string;
  alt: string;
  href?: string;
};

export type Spotlight = {
  slug: string;
  title: string;
  description: string;
  date: string;
  cover: string;
  alt: string;
  href: string;
  source: string;
};

const ROOT = path.join(process.cwd(), "content");

function loadAll<T extends { date: string }>(
  folder: string,
  map: (slug: string, data: Record<string, unknown>) => T,
): T[] {
  const dir = path.join(ROOT, folder);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const { data } = matter(raw);
      return map(slug, data);
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getNowNotes(): NowNote[] {
  return getAll("now").map((item) => ({
    slug: item.slug,
    title: item.title,
    description: item.description,
    date: item.date,
    cover: item.cover,
    alt: item.alt,
    href: `/now/${item.slug}`,
  }));
}

export function getCurrentNow(): NowNote | undefined {
  return getNowNotes()[0];
}

export function getSpotlights(): Spotlight[] {
  return loadAll("spotlight", (slug, data) => ({
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    date: String(data.date ?? "2026-01-01"),
    cover: String(data.cover ?? "/images/featured-manuscript.jpg"),
    alt: String(data.alt ?? data.title ?? slug),
    href: String(data.href ?? ""),
    source: String(data.source ?? "Watch"),
  }));
}

export function getCurrentSpotlight(): Spotlight | undefined {
  return getSpotlights()[0];
}
