"use server";

import { headers } from "next/headers";
import {
  normalizeContactPayload,
  validateContactPayload,
  type ContactActionResult,
  type ContactPayload,
} from "@/lib/contact";
import { sendContactEmail } from "@/lib/email";
import { checkRateLimit } from "@/lib/rate-limit";

export async function submitContactForm(
  raw: ContactPayload,
): Promise<ContactActionResult> {
  const headerStore = await headers();
  const forwarded = headerStore.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || headerStore.get("x-real-ip") || "local";
  const rate = checkRateLimit(`contact:${ip}`);

  if (!rate.ok) {
    return {
      ok: false,
      errors: {
        form: `Too many requests. Please try again in ${rate.retryAfterSec} seconds.`,
      },
    };
  }

  const payload = normalizeContactPayload(raw);
  const errors = validateContactPayload(payload);

  if (errors) {
    if (errors.form === "spam") {
      return { ok: true };
    }
    return { ok: false, errors };
  }

  const result = await sendContactEmail(payload);

  if (!result.ok) {
    return {
      ok: false,
      errors: { form: result.error },
    };
  }

  return { ok: true };
}
