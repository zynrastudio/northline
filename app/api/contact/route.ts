import { NextResponse } from "next/server";
import {
  normalizeContactPayload,
  validateContactPayload,
  type ContactPayload,
} from "@/lib/contact";
import { sendContactEmail } from "@/lib/email";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip =
    forwarded?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "local";
  const rate = checkRateLimit(`contact-api:${ip}`);

  if (!rate.ok) {
    return NextResponse.json(
      {
        ok: false,
        errors: {
          form: `Too many requests. Please try again in ${rate.retryAfterSec} seconds.`,
        },
      },
      { status: 429 },
    );
  }

  let body: ContactPayload;

  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { ok: false, errors: { form: "Invalid request body." } },
      { status: 400 },
    );
  }

  const payload = normalizeContactPayload(body);
  const errors = validateContactPayload(payload);

  if (errors) {
    if (errors.form === "spam") {
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  const result = await sendContactEmail(payload);

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, errors: { form: result.error } },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
