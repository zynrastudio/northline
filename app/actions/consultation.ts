"use server";

import { headers } from "next/headers";
import {
  normalizeConsultationPayload,
  validateConsultationPayload,
  type ConsultationActionResult,
  type ConsultationPayload,
} from "@/lib/consultation";
import { sendConsultationEmail } from "@/lib/email";
import { scoreConsultation } from "@/lib/lead-scoring";
import {
  buildConsultationAutomationPayload,
  postConsultationIntake,
} from "@/lib/n8n";
import { checkRateLimit } from "@/lib/rate-limit";

export async function submitConsultation(
  raw: ConsultationPayload,
): Promise<ConsultationActionResult> {
  const headerStore = await headers();
  const forwarded = headerStore.get("x-forwarded-for");
  const ip =
    forwarded?.split(",")[0]?.trim() ||
    headerStore.get("x-real-ip") ||
    "local";
  const rate = checkRateLimit(`consultation:${ip}`);

  if (!rate.ok) {
    return {
      ok: false,
      errors: {
        form: `Too many requests. Please try again in ${rate.retryAfterSec} seconds.`,
      },
    };
  }

  const payload = normalizeConsultationPayload(raw);
  const errors = validateConsultationPayload(payload);

  if (errors) {
    if (errors.form === "spam") {
      return { ok: true, band: "low", score: 0 };
    }
    return { ok: false, errors };
  }

  const scoreResult = scoreConsultation(payload);
  const automationPayload = buildConsultationAutomationPayload(
    payload,
    scoreResult,
  );
  const intake = await postConsultationIntake(automationPayload);

  // Unset or any value other than "false" → soft-fail (Mode A email continues).
  const fallbackEmail = process.env.AUTOMATION_FALLBACK_EMAIL !== "false";

  if (!intake.ok) {
    console.error("[consultation] n8n intake soft-fail:", intake.error, {
      skipped: intake.skipped ?? false,
      band: scoreResult.band,
      score: scoreResult.score,
      email: payload.email,
      fallbackEmail,
    });
    if (!fallbackEmail) {
      return {
        ok: false,
        errors: {
          form: "We could not record your request. Please try again shortly.",
        },
      };
    }
  }

  const result = await sendConsultationEmail({
    payload,
    band: scoreResult.band,
    score: scoreResult.score,
  });

  if (!result.ok) {
    return { ok: false, errors: { form: result.error } };
  }

  return {
    ok: true,
    band: scoreResult.band,
    score: scoreResult.score,
  };
}
