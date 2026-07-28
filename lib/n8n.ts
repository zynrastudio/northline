import type { ConsultationPayload } from "@/lib/consultation";
import type { LeadBand, LeadScoreResult } from "@/lib/lead-scoring";

const WEBHOOK_TIMEOUT_MS = 10_000;
const SECRET_HEADER = "X-Northline-Webhook-Secret";

export type ConsultationAutomationPayload = {
  source: "northline-after";
  submittedAt: string;
  score: number;
  band: LeadBand;
  contact: {
    name: string;
    email: string;
    phone: string;
    company: string;
  };
  qualification: {
    industry: string;
    decisionMaker: string;
    challenges: string;
    budget: string;
    timeline: string;
    scope: string;
    goals: string;
  };
  utm?: Record<string, string>;
};

export type N8nIntakeSuccess = {
  ok: true;
  band: LeadBand;
  score: number;
  opportunityId?: string;
};

export type N8nIntakeResult =
  | N8nIntakeSuccess
  | { ok: false; skipped?: boolean; error: string };

let missingEnvLogged = false;

export function buildConsultationAutomationPayload(
  payload: ConsultationPayload,
  scoreResult: Pick<LeadScoreResult, "score" | "band">,
  submittedAt: string = new Date().toISOString(),
): ConsultationAutomationPayload {
  return {
    source: "northline-after",
    submittedAt,
    score: scoreResult.score,
    band: scoreResult.band,
    contact: {
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      company: payload.company,
    },
    qualification: {
      industry: payload.industry,
      decisionMaker: payload.decisionMaker,
      challenges: payload.challenges,
      budget: payload.budget,
      timeline: payload.timeline,
      scope: payload.scope,
      goals: payload.goals,
    },
  };
}

function parseSuccessBody(data: unknown): N8nIntakeSuccess | null {
  if (!data || typeof data !== "object") return null;
  const body = data as Record<string, unknown>;
  if (body.ok !== true) return null;
  if (typeof body.score !== "number") return null;
  if (
    body.band !== "qualified" &&
    body.band !== "nurture" &&
    body.band !== "low"
  ) {
    return null;
  }

  const result: N8nIntakeSuccess = {
    ok: true,
    band: body.band,
    score: body.score,
  };

  if (typeof body.opportunityId === "string") {
    result.opportunityId = body.opportunityId;
  } else if (typeof body.opportunityId === "number") {
    result.opportunityId = String(body.opportunityId);
  }

  return result;
}

async function postOnce(
  url: string,
  secret: string,
  body: ConsultationAutomationPayload,
): Promise<N8nIntakeResult> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), WEBHOOK_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        [SECRET_HEADER]: secret,
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    let data: unknown = null;
    try {
      data = await response.json();
    } catch {
      data = null;
    }

    if (!response.ok) {
      return {
        ok: false,
        error: `n8n webhook HTTP ${response.status}`,
      };
    }

    const parsed = parseSuccessBody(data);
    if (!parsed) {
      return { ok: false, error: "n8n webhook returned unexpected body" };
    }

    return parsed;
  } catch (error) {
    const message =
      error instanceof Error && error.name === "AbortError"
        ? "n8n webhook timed out"
        : error instanceof Error
          ? error.message
          : "n8n webhook request failed";
    return { ok: false, error: message };
  } finally {
    clearTimeout(timer);
  }
}

function shouldRetry(result: N8nIntakeResult): boolean {
  if (result.ok || result.skipped) return false;
  return (
    result.error.includes("timed out") ||
    result.error.includes("HTTP 5") ||
    result.error.includes("fetch") ||
    result.error.includes("network") ||
    result.error.includes("ECONN") ||
    result.error.includes("request failed")
  );
}

/**
 * POST consultation intake to n8n. Never throws — soft-fail friendly.
 * Retries once on timeout / 5xx / network errors.
 */
export async function postConsultationIntake(
  body: ConsultationAutomationPayload,
): Promise<N8nIntakeResult> {
  const url = process.env.N8N_WEBHOOK_URL?.trim();
  const secret = process.env.N8N_WEBHOOK_SECRET?.trim();

  if (!url || !secret) {
    if (!missingEnvLogged) {
      missingEnvLogged = true;
      console.error(
        "[n8n] N8N_WEBHOOK_URL or N8N_WEBHOOK_SECRET missing, skipping intake webhook",
      );
    }
    return {
      ok: false,
      skipped: true,
      error: "n8n webhook env not configured",
    };
  }

  const first = await postOnce(url, secret, body);
  if (first.ok || !shouldRetry(first)) {
    return first;
  }

  console.warn("[n8n] intake webhook retrying once:", first.error);
  return postOnce(url, secret, body);
}
