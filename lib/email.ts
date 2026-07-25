import { Resend } from "resend";
import { siteSettings } from "@/content/site";
import type { ContactPayload } from "@/lib/contact";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function buildAgencyEmail(payload: ContactPayload) {
  const subject = `New consultation request from ${payload.name}`;
  const text = [
    "New consultation request from the Northline website:",
    "",
    `Name: ${payload.name}`,
    `Company: ${payload.company || "(not provided)"}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone || "(not provided)"}`,
    "",
    "Message:",
    payload.message,
  ].join("\n");

  const html = `
    <h2>New consultation request</h2>
    <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
    <p><strong>Company:</strong> ${escapeHtml(payload.company || "(not provided)")}</p>
    <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(payload.phone || "(not provided)")}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(payload.message).replaceAll("\n", "<br />")}</p>
  `;

  return { subject, text, html };
}

export async function sendContactEmail(
  payload: ContactPayload,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? siteSettings.email;
  const from =
    process.env.CONTACT_FROM_EMAIL ??
    "Northline Creative <onboarding@resend.dev>";

  const { subject, text, html } = buildAgencyEmail(payload);

  if (!apiKey) {
    if (process.env.NODE_ENV === "development") {
      console.info("[contact] RESEND_API_KEY missing — logging inquiry instead:");
      console.info({ to, from, subject, payload });
      return { ok: true };
    }

    return {
      ok: false,
      error: "Email delivery is not configured. Please try again later.",
    };
  }

  const resend = new Resend(apiKey);
  const idempotencyKey = `contact-inquiry/${payload.email}/${Date.now()}`;

  const { data, error } = await resend.emails.send(
    {
      from,
      to: [to],
      replyTo: payload.email,
      subject,
      text,
      html,
    },
    { idempotencyKey },
  );

  if (error) {
    console.error("[contact] Resend error:", error.message);
    return {
      ok: false,
      error: "We could not send your message. Please try again shortly.",
    };
  }

  console.info("[contact] Email sent:", data?.id);
  return { ok: true };
}
