import { notFound } from "next/navigation";
import {
  getInsightBySlug,
  getRelatedInsights,
  insights,
} from "@/content/insights";
import { InsightArticle } from "@/components/insights/InsightArticle";
import { CtaBand } from "@/components/shared/CtaBand";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return insights.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const insight = getInsightBySlug(slug);
  if (!insight) return {};
  return buildMetadata({
    title: insight.title,
    description: insight.excerpt,
    path: `/insights/${insight.slug}`,
    image: insight.cover,
  });
}

export default async function InsightPage({ params }: Props) {
  const { slug } = await params;
  const insight = getInsightBySlug(slug);
  if (!insight) notFound();

  const related = getRelatedInsights(insight.slug, 3);

  return (
    <>
      <InsightArticle insight={insight} related={related} />
      <CtaBand
        title="Ready to put this into practice."
        description="Book a strategy consultation and we will map the work to your goals."
      />
    </>
  );
}
