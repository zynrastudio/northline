"use server";

import { headers } from "next/headers";
import {
  normalizeConsultationPayload,
  validateConsultationPayload,
  type ConsultationActionResult,
  type ConsultationPayload,
} from "@/lib/consultation";
import { sendConsultationEmail } from "@/lib/email";
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
      return { ok: true };
    }
    return { ok: false, errors };
  }

  const result = await sendConsultationEmail(payload);

  if (!result.ok) {
    return { ok: false, errors: { form: result.error } };
  }

  return { ok: true };
}
