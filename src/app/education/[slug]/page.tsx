import { notFound } from "next/navigation";
import { ArticleFrame } from "@/components/content/ArticleFrame";
import { Related } from "@/components/content/Related";
import { getAll, getArticle, getSlugs } from "@/lib/content";
import { site } from "@/lib/site";
import type { Metadata } from "next";

export function generateStaticParams() {
  return getSlugs("education").map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle("education", slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      images: [article.cover],
      url: `${site.url}/education/${slug}`,
    },
  };
}

export default async function EducationArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle("education", slug);
  if (!article) notFound();

  const related = getAll("education")
    .filter((item) => item.slug !== slug)
    .slice(0, 2);

  return (
    <>
      <ArticleFrame article={article}>{article.content}</ArticleFrame>
      <div className="px-5 pb-24 md:px-8">
        <Related pieces={related} />
      </div>
    </>
  );
}
