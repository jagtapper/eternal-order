import { getAllArticles } from "@/lib/content";
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

  return [...staticRoutes, ...articles];
}
