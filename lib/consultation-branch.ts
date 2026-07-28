import { getFeaturedCaseStudies } from "@/content/case-studies";
import type { LeadBand } from "@/lib/lead-scoring";

export type ResourceLink = {
  label: string;
  href: string;
  description?: string;
};

export const qualifiedSuccessCopy = {
  eyebrow: "Qualified",
  headline: "You’re a fit, book a strategy call",
  body: (firstName: string) =>
    `Thanks, ${firstName}. Based on what you shared, a focused strategy conversation is the right next step, not a generic discovery call.`,
  bulletsWithCal: [
    "Pick a time that works for you",
    "Come with one priority outcome for the next two quarters",
    "We’ll confirm fit and outline how we would approach it",
  ],
  bulletsWithoutCal: [
    "We’ll email a booking link within one business day",
    "Come with one priority outcome for the next two quarters",
    "We’ll confirm fit and outline how we would approach it",
  ],
  primaryWithCal: "Book strategy consultation",
  primaryWithoutCal: "We’ll email a booking link",
  secondaryLabel: "See how we work",
  secondaryHref: "/process",
} as const;

export const resourcesSuccessCopy = {
  eyebrow: "Next steps",
  headline: "Thanks, here is useful reading",
  body: (firstName: string) =>
    `Thanks, ${firstName}. We’re not rushing you onto a calendar. These pieces show how we think about growth systems, and you’re welcome to book later if priorities change.`,
  softNote:
    "If timing or scope shifts, you can still request a consultation, we’ll meet you where you are.",
} as const;

export function isQualifiedBand(band: LeadBand): boolean {
  return band === "qualified";
}

export function getSiteOrigin(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return "http://localhost:3000";
  return raw.replace(/\/$/, "");
}

export function getCalComBaseUrl(): string {
  return process.env.NEXT_PUBLIC_CAL_COM_URL?.trim() ?? "";
}

/** Prefill Cal.com with name/email. Returns null when base URL is unset. */
export function buildCalComBookingUrl(
  base: string,
  contact: { name: string; email: string },
): string | null {
  const trimmed = base.trim();
  if (!trimmed) return null;

  try {
    const url = new URL(trimmed);
    if (contact.name) url.searchParams.set("name", contact.name);
    if (contact.email) url.searchParams.set("email", contact.email);
    return url.toString();
  } catch {
    return null;
  }
}

export function getResourceLinks(siteOrigin: string): ResourceLink[] {
  const origin = siteOrigin.replace(/\/$/, "");
  const studies = getFeaturedCaseStudies(2).map((study) => ({
    label: study.title,
    href: `${origin}/case-studies/${study.slug}`,
    description: study.client,
  }));

  return [
    ...studies,
    {
      label: "How we work",
      href: `${origin}/process`,
      description: "Process and engagement shape",
    },
  ];
}

/** Relative hrefs for in-app success UI (client). */
export function getResourceNavLinks(): ResourceLink[] {
  return getFeaturedCaseStudies(2).map((study) => ({
    label: study.title,
    href: `/case-studies/${study.slug}`,
    description: study.client,
  }));
}
