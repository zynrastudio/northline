import { notFound } from "next/navigation";
import { caseStudies, getCaseStudyBySlug } from "@/content/case-studies";
import { CaseStudyDetail } from "@/components/case-studies/CaseStudyDetail";
import { CtaBand } from "@/components/shared/CtaBand";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) return {};
  return buildMetadata({
    title: `${study.client}: ${study.title}`,
    description: study.summary,
    path: `/case-studies/${study.slug}`,
    image: study.hero,
  });
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) notFound();

  return (
    <>
      <CaseStudyDetail study={study} />
      <CtaBand
        title="Ready for a clearer growth path."
        description="Book a strategy consultation and map how a similar engagement would run for you."
      />
    </>
  );
}
