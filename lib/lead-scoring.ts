import type { ConsultationPayload } from "@/lib/consultation";
import {
  budgetOptions,
  decisionMakerOptions,
  industryOptions,
  scopeOptions,
  timelineOptions,
} from "@/lib/consultation";

/** Keep in sync with doc/automation-analytics.md §5.2 */
export const QUALIFIED_THRESHOLD = 70;
export const NURTURE_MIN = 40;

export type LeadBand = "qualified" | "nurture" | "low";

export type LeadScoreBucket = "0-39" | "40-69" | "70+";

export type LeadScoreBreakdown = {
  budget: number;
  timeline: number;
  decisionMaker: number;
  industry: number;
  scope: number;
};

export type LeadScoreResult = {
  score: number;
  band: LeadBand;
  breakdown: LeadScoreBreakdown;
};

export type LeadScoreInput = Pick<
  ConsultationPayload,
  "budget" | "timeline" | "decisionMaker" | "industry" | "scope"
>;

const budgetPoints: Record<(typeof budgetOptions)[number], number> = {
  "Under $25k": 5,
  "$25k to $50k": 20,
  "$50k to $100k": 30,
  "$100k or more": 40,
  "Not sure yet": 0,
};

const timelinePoints: Record<(typeof timelineOptions)[number], number> = {
  "As soon as possible": 25,
  "1 to 3 months": 20,
  "3 to 6 months": 10,
  "6 months or later": 0,
  "Still exploring": 0,
};

const decisionMakerPoints: Record<
  (typeof decisionMakerOptions)[number],
  number
> = {
  "I own this decision": 25,
  "I am part of the deciding team": 15,
  "I am researching for a decision maker": 5,
};

const industryPoints: Record<(typeof industryOptions)[number], number> = {
  "Professional Services": 15,
  "SaaS & Software": 15,
  "Industrial & B2B Services": 15,
  Manufacturing: 15,
  Technology: 15,
  Other: 0,
};

const scopePoints: Record<(typeof scopeOptions)[number], number> = {
  "New marketing site": 10,
  "Site plus strategy": 10,
  "Product or interface UX": 10,
  "Automation and CRM": 10,
  "Ongoing growth program": 10,
  "Not sure yet": 0,
};

function pointsFor<T extends string>(
  map: Record<T, number>,
  value: string,
): number {
  if (value in map) {
    return map[value as T];
  }
  return 0;
}

export function bandFromScore(score: number): LeadBand {
  if (score >= QUALIFIED_THRESHOLD) return "qualified";
  if (score >= NURTURE_MIN) return "nurture";
  return "low";
}

export function scoreBucket(score: number): LeadScoreBucket {
  if (score >= QUALIFIED_THRESHOLD) return "70+";
  if (score >= NURTURE_MIN) return "40-69";
  return "0-39";
}

export function scoreConsultation(payload: LeadScoreInput): LeadScoreResult {
  const breakdown: LeadScoreBreakdown = {
    budget: pointsFor(budgetPoints, payload.budget),
    timeline: pointsFor(timelinePoints, payload.timeline),
    decisionMaker: pointsFor(decisionMakerPoints, payload.decisionMaker),
    industry: pointsFor(industryPoints, payload.industry),
    scope: pointsFor(scopePoints, payload.scope),
  };

  const score =
    breakdown.budget +
    breakdown.timeline +
    breakdown.decisionMaker +
    breakdown.industry +
    breakdown.scope;

  return {
    score,
    band: bandFromScore(score),
    breakdown,
  };
}
