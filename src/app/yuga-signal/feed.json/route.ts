import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { getFrontierCards } from "@/lib/frontier";
import { site } from "@/lib/site";

// Subscriber bots follow these links, so never emit a localhost URL.
const BASE = site.url.includes("localhost") ? "https://eternalorder.org" : site.url;

// Machine-readable Yuga Signal feed (JSON Feed 1.1) for readers' Grokbots.
// Each subscriber's bot reads this, picks posts newer than the last one it
// saw, and writes a personalized brief. Flip PREVIEW to false at go-live.
const PREVIEW = false;

export const dynamic = "force-static";

function plain(mdx: string): string {
  return mdx
    .replace(/<[^>]+>/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[#*_>`]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function GET() {
  const dir = path.join(process.cwd(), "content", "yuga-signal");
  const items = getFrontierCards()
    .filter((c) => c.status === "Ready" && !c.alternate)
    .sort((a, b) => a.displayOrder - b.displayOrder || a.rank - b.rank)
    .map((c) => {
      const raw = fs.readFileSync(path.join(dir, `${c.slug}.mdx`), "utf8");
      const url = `${BASE}/education/yuga-signal/${c.slug}`;
      return {
        id: c.id,
        url,
        title: c.title,
        summary: c.description,
        content_text: plain(matter(raw).content),
        date_published: `${c.date}T00:00:00-05:00`,
        image: c.thumbnail ? `${BASE}${c.thumbnail}` : undefined,
        tags: [c.signal].filter(Boolean),
        _yuga_signal: {
          signal: c.signal,
          stage: c.signalStage,
          source: c.source,
          source_type: c.sourceType,
          source_url: c.sourceUrl,
          parallel: c.parallel,
          citation: c.citation,
          principle: c.principle,
          rank: c.rank,
        },
      };
    });

  return Response.json({
    version: "https://jsonfeed.org/version/1.1",
    title: "Yuga Signal | Eternal Order",
    home_page_url: `${BASE}/education`,
    feed_url: `${BASE}/yuga-signal/feed.json`,
    description:
      "Primary-sourced frontier breakthroughs, each with a Yuga signal and a cited Dharmic parallel.",
    _preview: PREVIEW,
    items,
  });
}
