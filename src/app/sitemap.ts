import { getAllArticles } from "@/lib/content";
import { getFrontierCards } from "@/lib/frontier";
import { kindMeta, site } from "@/lib/site";

export default function sitemap() {
  const staticRoutes = ["", "/education", "/videos", "/digests", "/ideas", "/now", "/about"].map(
    (path) => ({
      url: `${site.url}${path}`,
      lastModified: new Date(),
    }),
  );

  const articles = getAllArticles().map((article) => ({
    url: `${site.url}${kindMeta[article.kind].href}/${article.slug}`,
    lastModified: new Date(article.date),
  }));

  // Yuga Signal cards live at /education/yuga-signal/<slug>, not under a
  // kindMeta Kind (their frontmatter is a frontier card, not an Article).
  const frontier = getFrontierCards().map((card) => ({
    url: `${site.url}/education/yuga-signal/${card.slug}`,
    lastModified: new Date(card.date),
  }));

  return [...staticRoutes, ...articles, ...frontier];
}
