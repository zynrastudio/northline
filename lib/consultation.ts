import { isValidPhoneNumber } from "libphonenumber-js";

export type ConsultationPayload = {
  // Step 1 - essentials
  name: string;
  email: string;
  /** E.164 when provided (e.g. +14155552671); empty when skipped */
  phone: string;
  company: string;
  // Step 2 - context
  industry: string;
  decisionMaker: string;
  challenges: string;
  // Step 3 - engagement
  budget: string;
  timeline: string;
  scope: string;
  goals: string;
  /** Honeypot - must stay empty */
  website?: string;
};

export type ConsultationField = Exclude<keyof ConsultationPayload, "website">;

export type ConsultationFieldErrors = Partial<
  Record<ConsultationField | "form", string>
>;

export type ConsultationActionResult =
  | { ok: true }
  | { ok: false; errors: ConsultationFieldErrors };

export const emptyConsultation: ConsultationPayload = {
  name: "",
  email: "",
  phone: "",
  company: "",
  industry: "",
  decisionMaker: "",
  challenges: "",
  budget: "",
  timeline: "",
  scope: "",
  goals: "",
  website: "",
};

export const industryOptions = [
  "Professional Services",
  "SaaS & Software",
  "Industrial & B2B Services",
  "Manufacturing",
  "Technology",
  "Other",
] as const;

export const decisionMakerOptions = [
  "I own this decision",
  "I am part of the deciding team",
  "I am researching for a decision maker",
] as const;

export const budgetOptions = [
  "Under $25k",
  "$25k to $50k",
  "$50k to $100k",
  "$100k or more",
  "Not sure yet",
] as const;

export const timelineOptions = [
  "As soon as possible",
  "1 to 3 months",
  "3 to 6 months",
  "6 months or later",
  "Still exploring",
] as const;

export const scopeOptions = [
  "New marketing site",
  "Site plus strategy",
  "Product or interface UX",
  "Automation and CRM",
  "Ongoing growth program",
  "Not sure yet",
] as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Fields validated per step so the UI can gate Next per step. */
export const consultationSteps: { fields: ConsultationField[] }[] = [
  { fields: ["name", "email", "phone", "company"] },
  { fields: ["industry", "decisionMaker", "challenges"] },
  { fields: ["budget", "timeline", "scope", "goals"] },
];

export function validateConsultationField(
  field: ConsultationField,
  raw: ConsultationPayload,
): string | undefined {
  const value = (raw[field] ?? "").trim();

  switch (field) {
    case "name":
      return value ? undefined : "Please enter your name.";
    case "email":
      if (!value) return "Please enter your email.";
      return EMAIL_PATTERN.test(value)
        ? undefined
        : "Please enter a valid email address.";
    case "phone":
      if (!value) return undefined; // optional
      return isValidPhoneNumber(value)
        ? undefined
        : "Enter a valid phone number with country code.";
    case "company":
      return value ? undefined : "Please enter your company.";
    case "industry":
      return value ? undefined : "Please choose an industry.";
    case "decisionMaker":
      return value ? undefined : "Please pick the option that fits.";
    case "challenges":
      return value.length >= 10
        ? undefined
        : "A sentence or two on the challenge helps us prepare.";
    case "budget":
      return value ? undefined : "Please choose a budget range.";
    case "timeline":
      return value ? undefined : "Please choose a timeline.";
    case "scope":
      return value ? undefined : "Please choose a scope.";
    case "goals":
      return value.length >= 10
        ? undefined
        : "A sentence or two on the goal helps us prepare.";
    default:
      return undefined;
  }
}

export function validateConsultationStep(
  stepIndex: number,
  raw: ConsultationPayload,
): ConsultationFieldErrors {
  const step = consultationSteps[stepIndex];
  if (!step) return {};
  const errors: ConsultationFieldErrors = {};
  for (const field of step.fields) {
    const error = validateConsultationField(field, raw);
    if (error) errors[field] = error;
  }
  return errors;
}

export function validateConsultationPayload(
  raw: ConsultationPayload,
): ConsultationFieldErrors | null {
  if ((raw.website ?? "").trim()) {
    return { form: "spam" };
  }

  const errors: ConsultationFieldErrors = {};
  for (const step of consultationSteps) {
    for (const field of step.fields) {
      const error = validateConsultationField(field, raw);
      if (error) errors[field] = error;
    }
  }

  return Object.keys(errors).length > 0 ? errors : null;
}

export function normalizeConsultationPayload(
  raw: ConsultationPayload,
): ConsultationPayload {
  return {
    name: raw.name.trim(),
    email: raw.email.trim(),
    phone: raw.phone.trim(),
    company: raw.company.trim(),
    industry: raw.industry.trim(),
    decisionMaker: raw.decisionMaker.trim(),
    challenges: raw.challenges.trim(),
    budget: raw.budget.trim(),
    timeline: raw.timeline.trim(),
    scope: raw.scope.trim(),
    goals: raw.goals.trim(),
    website: (raw.website ?? "").trim(),
  };
}
