import fs from "node:fs";
import path from "node:path";
import type { ReactNode } from "react";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import { kindMeta, type Kind } from "@/lib/site";
import { mdxComponents } from "@/components/content/Mdx";

export type Article = {
  slug: string;
  kind: Kind;
  title: string;
  description: string;
  date: string;
  cover: string;
  alt: string;
  reading: string;
  duration?: string;
  featured?: boolean;
  videoSrc?: string;
};

export type ArticleWithBody = Article & {
  content: ReactNode;
};

const ROOT = path.join(process.cwd(), "content");

function dirFor(kind: Kind) {
  return path.join(ROOT, kindMeta[kind].folder);
}

function toArticle(kind: Kind, slug: string, data: Record<string, unknown>): Article {
  return {
    slug,
    kind,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    date: String(data.date ?? "2026-01-01"),
    cover: String(data.cover ?? "/images/featured-manuscript.jpg"),
    alt: String(data.alt ?? data.title ?? slug),
    reading: String(data.reading ?? "6 min"),
    duration: data.duration ? String(data.duration) : undefined,
    featured: Boolean(data.featured),
    videoSrc: data.videoSrc ? String(data.videoSrc) : undefined,
  };
}

export function getAll(kind: Kind): Article[] {
  const dir = dirFor(kind);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const { data } = matter(raw);
      return toArticle(kind, slug, data);
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllArticles(): Article[] {
  return (Object.keys(kindMeta) as Kind[])
    .flatMap((kind) => getAll(kind))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getFeatured(): Article | undefined {
  return getAllArticles().find((item) => item.featured) ?? getAll("video")[0];
}

export async function getArticle(
  kind: Kind,
  slug: string,
): Promise<ArticleWithBody | null> {
  const file = path.join(dirFor(kind), `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;

  const source = fs.readFileSync(file, "utf8");
  const { content, frontmatter } = await compileMDX<Record<string, unknown>>({
    source,
    options: { parseFrontmatter: true },
    components: mdxComponents,
  });

  return {
    ...toArticle(kind, slug, frontmatter),
    content,
  };
}

export function getSlugs(kind: Kind): string[] {
  return getAll(kind).map((item) => item.slug);
}

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${iso}T00:00:00`));
}
