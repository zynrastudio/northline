"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

type CaseStudyEngagementProps = {
  slug: string;
  title: string;
  industry: string;
};

/** Fires once on mount so Phase G can wire GA without rewriting pages. */
export function CaseStudyEngagement({
  slug,
  title,
  industry,
}: CaseStudyEngagementProps) {
  useEffect(() => {
    trackEvent("case_study_view", {
      case_study_slug: slug,
      case_study_title: title,
      industry,
    });
  }, [slug, title, industry]);

  return null;
}

type InsightEngagementProps = {
  slug: string;
  category: string;
};

export function InsightEngagement({ slug, category }: InsightEngagementProps) {
  useEffect(() => {
    trackEvent("insight_view", {
      insight_slug: slug,
      category,
    });
  }, [slug, category]);

  return null;
}
