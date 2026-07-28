import type { LeadBand, LeadScoreInput } from "@/lib/lead-scoring";

export type LeadScoreFixture = {
  label: string;
  input: LeadScoreInput;
  expectedScore: number;
  expectedBand: LeadBand;
  expectedBreakdown?: Partial<{
    budget: number;
    timeline: number;
    decisionMaker: number;
    industry: number;
    scope: number;
  }>;
};

/**
 * Point values are multiples of 5, so scores like 69 / 39 are unreachable.
 * Band edges use the nearest achievable totals: 70 / 65 / 40 / 35.
 */
export const leadScoreFixtures: LeadScoreFixture[] = [
  // --- Max / min stacks ---
  {
    label: "max stack → qualified (115)",
    input: {
      budget: "$100k or more",
      timeline: "As soon as possible",
      decisionMaker: "I own this decision",
      industry: "SaaS & Software",
      scope: "Site plus strategy",
    },
    expectedScore: 115,
    expectedBand: "qualified",
    expectedBreakdown: {
      budget: 40,
      timeline: 25,
      decisionMaker: 25,
      industry: 15,
      scope: 10,
    },
  },
  {
    label: "minimal / low stack → low (5)",
    input: {
      budget: "Not sure yet",
      timeline: "Still exploring",
      decisionMaker: "I am researching for a decision maker",
      industry: "Other",
      scope: "Not sure yet",
    },
    expectedScore: 5,
    expectedBand: "low",
    expectedBreakdown: {
      budget: 0,
      timeline: 0,
      decisionMaker: 5,
      industry: 0,
      scope: 0,
    },
  },

  // --- Band boundaries (achievable) ---
  {
    label: "exactly 70 → qualified",
    input: {
      budget: "$100k or more",
      timeline: "As soon as possible",
      decisionMaker: "I am researching for a decision maker",
      industry: "Other",
      scope: "Not sure yet",
    },
    expectedScore: 70,
    expectedBand: "qualified",
  },
  {
    label: "65 → nurture (just below qualified)",
    input: {
      budget: "$100k or more",
      timeline: "1 to 3 months",
      decisionMaker: "I am researching for a decision maker",
      industry: "Other",
      scope: "Not sure yet",
    },
    expectedScore: 65,
    expectedBand: "nurture",
  },
  {
    label: "exactly 40 → nurture",
    input: {
      budget: "Under $25k",
      timeline: "3 to 6 months",
      decisionMaker: "I own this decision",
      industry: "Other",
      scope: "Not sure yet",
    },
    expectedScore: 40,
    expectedBand: "nurture",
  },
  {
    label: "35 → low (just below nurture)",
    input: {
      budget: "Under $25k",
      timeline: "As soon as possible",
      decisionMaker: "I am researching for a decision maker",
      industry: "Other",
      scope: "Not sure yet",
    },
    expectedScore: 35,
    expectedBand: "low",
  },

  // --- Budget branches ---
  {
    label: "budget Under $25k → +5",
    input: {
      budget: "Under $25k",
      timeline: "Still exploring",
      decisionMaker: "I am researching for a decision maker",
      industry: "Other",
      scope: "Not sure yet",
    },
    expectedScore: 10,
    expectedBand: "low",
    expectedBreakdown: { budget: 5 },
  },
  {
    label: "budget $25k to $50k → +20",
    input: {
      budget: "$25k to $50k",
      timeline: "Still exploring",
      decisionMaker: "I am researching for a decision maker",
      industry: "Other",
      scope: "Not sure yet",
    },
    expectedScore: 25,
    expectedBand: "low",
    expectedBreakdown: { budget: 20 },
  },
  {
    label: "budget $50k to $100k → +30",
    input: {
      budget: "$50k to $100k",
      timeline: "Still exploring",
      decisionMaker: "I am researching for a decision maker",
      industry: "Other",
      scope: "Not sure yet",
    },
    expectedScore: 35,
    expectedBand: "low",
    expectedBreakdown: { budget: 30 },
  },
  {
    label: "budget $100k or more → +40",
    input: {
      budget: "$100k or more",
      timeline: "Still exploring",
      decisionMaker: "I am researching for a decision maker",
      industry: "Other",
      scope: "Not sure yet",
    },
    expectedScore: 45,
    expectedBand: "nurture",
    expectedBreakdown: { budget: 40 },
  },
  {
    label: "budget Not sure yet → +0",
    input: {
      budget: "Not sure yet",
      timeline: "Still exploring",
      decisionMaker: "I am researching for a decision maker",
      industry: "Other",
      scope: "Not sure yet",
    },
    expectedScore: 5,
    expectedBand: "low",
    expectedBreakdown: { budget: 0 },
  },

  // --- Timeline branches ---
  {
    label: "timeline ASAP → +25",
    input: {
      budget: "Not sure yet",
      timeline: "As soon as possible",
      decisionMaker: "I am researching for a decision maker",
      industry: "Other",
      scope: "Not sure yet",
    },
    expectedScore: 30,
    expectedBand: "low",
    expectedBreakdown: { timeline: 25 },
  },
  {
    label: "timeline 1 to 3 months → +20",
    input: {
      budget: "Not sure yet",
      timeline: "1 to 3 months",
      decisionMaker: "I am researching for a decision maker",
      industry: "Other",
      scope: "Not sure yet",
    },
    expectedScore: 25,
    expectedBand: "low",
    expectedBreakdown: { timeline: 20 },
  },
  {
    label: "timeline 3 to 6 months → +10",
    input: {
      budget: "Not sure yet",
      timeline: "3 to 6 months",
      decisionMaker: "I am researching for a decision maker",
      industry: "Other",
      scope: "Not sure yet",
    },
    expectedScore: 15,
    expectedBand: "low",
    expectedBreakdown: { timeline: 10 },
  },
  {
    label: "timeline 6 months or later → +0",
    input: {
      budget: "Not sure yet",
      timeline: "6 months or later",
      decisionMaker: "I am researching for a decision maker",
      industry: "Other",
      scope: "Not sure yet",
    },
    expectedScore: 5,
    expectedBand: "low",
    expectedBreakdown: { timeline: 0 },
  },

  // --- Decision maker branches ---
  {
    label: "decision maker owns → +25",
    input: {
      budget: "Not sure yet",
      timeline: "Still exploring",
      decisionMaker: "I own this decision",
      industry: "Other",
      scope: "Not sure yet",
    },
    expectedScore: 25,
    expectedBand: "low",
    expectedBreakdown: { decisionMaker: 25 },
  },
  {
    label: "decision maker part of team → +15",
    input: {
      budget: "Not sure yet",
      timeline: "Still exploring",
      decisionMaker: "I am part of the deciding team",
      industry: "Other",
      scope: "Not sure yet",
    },
    expectedScore: 15,
    expectedBand: "low",
    expectedBreakdown: { decisionMaker: 15 },
  },

  // --- Industry / scope ---
  {
    label: "launch industry → +15",
    input: {
      budget: "Not sure yet",
      timeline: "Still exploring",
      decisionMaker: "I am researching for a decision maker",
      industry: "Manufacturing",
      scope: "Not sure yet",
    },
    expectedScore: 20,
    expectedBand: "low",
    expectedBreakdown: { industry: 15 },
  },
  {
    label: "scope mapped to pillars → +10",
    input: {
      budget: "Not sure yet",
      timeline: "Still exploring",
      decisionMaker: "I am researching for a decision maker",
      industry: "Other",
      scope: "Automation and CRM",
    },
    expectedScore: 15,
    expectedBand: "low",
    expectedBreakdown: { scope: 10 },
  },

  // --- Unknown values → 0 for that signal ---
  {
    label: "unknown option strings → 0 points",
    input: {
      budget: "not-a-real-budget",
      timeline: "not-a-real-timeline",
      decisionMaker: "not-a-real-dm",
      industry: "not-a-real-industry",
      scope: "not-a-real-scope",
    },
    expectedScore: 0,
    expectedBand: "low",
    expectedBreakdown: {
      budget: 0,
      timeline: 0,
      decisionMaker: 0,
      industry: 0,
      scope: 0,
    },
  },
];
