import type { LeadBand, LeadScoreBucket } from "@/lib/lead-scoring";

function stringifyParams(
  params?: Record<string, string | number | undefined>,
): Record<string, string> | undefined {
  if (!params) return undefined;
  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined) continue;
    out[key] = String(value);
  }
  return out;
}

export function trackEvent(
  name: string,
  params?: Record<string, string | number | undefined>,
): void {
  if (typeof window === "undefined") return;

  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (!measurementId) return;

  const gtag = (
    window as Window & {
      gtag?: (...args: unknown[]) => void;
    }
  ).gtag;

  if (typeof gtag !== "function") return;

  gtag("event", name, stringifyParams(params));
}

export function trackConsultationStart(): void {
  trackEvent("consultation_start");
}

/** `step` is 1-based index of the step just completed. */
export function trackConsultationStepComplete(step: 1 | 2 | 3): void {
  trackEvent("consultation_step_complete", { step });
}

export function trackConsultationSubmit(input: {
  band: LeadBand;
  scoreBucket: LeadScoreBucket;
}): void {
  const { band, scoreBucket } = input;
  const common = {
    band,
    score_bucket: scoreBucket,
    method: "consultation_form",
    form_id: "strategy_consultation",
  };

  trackEvent("consultation_submit", common);
  trackEvent("generate_lead", common);

  if (band === "qualified") {
    trackEvent("lead_qualified", { score_bucket: scoreBucket });
  } else {
    trackEvent("lead_nurture", { band });
  }
}

export function trackCalendarBookingComplete(): void {
  trackEvent("calendar_booking_complete", { provider: "cal.com" });
}
