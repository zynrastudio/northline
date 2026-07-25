import { Resend } from "resend";
import { siteSettings } from "@/content/site";
import type { ContactPayload } from "@/lib/contact";
import type { ConsultationPayload } from "@/lib/consultation";

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

function buildConsultationEmail(payload: ConsultationPayload) {
  const subject = `Strategy consultation request from ${payload.name}${
    payload.company ? ` (${payload.company})` : ""
  }`;

  const rows: [string, string][] = [
    ["Name", payload.name],
    ["Company", payload.company],
    ["Email", payload.email],
    ["Phone", payload.phone || "(not provided)"],
    ["Industry", payload.industry],
    ["Decision role", payload.decisionMaker],
    ["Budget", payload.budget],
    ["Timeline", payload.timeline],
    ["Scope", payload.scope],
  ];

  const text = [
    "New strategy consultation request from the Northline website:",
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Current challenges:",
    payload.challenges,
    "",
    "Business goals:",
    payload.goals,
  ].join("\n");

  const html = `
    <h2>New strategy consultation request</h2>
    ${rows
      .map(
        ([label, value]) =>
          `<p><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value)}</p>`,
      )
      .join("")}
    <p><strong>Current challenges:</strong></p>
    <p>${escapeHtml(payload.challenges).replaceAll("\n", "<br />")}</p>
    <p><strong>Business goals:</strong></p>
    <p>${escapeHtml(payload.goals).replaceAll("\n", "<br />")}</p>
  `;

  return { subject, text, html };
}

async function deliver(
  channel: string,
  email: { subject: string; text: string; html: string },
  replyTo: string,
  idempotencyKey: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? siteSettings.email;
  const from =
    process.env.CONTACT_FROM_EMAIL ??
    "Northline Creative <onboarding@resend.dev>";

  if (!apiKey) {
    if (process.env.NODE_ENV === "development") {
      console.info(
        `[${channel}] RESEND_API_KEY missing — logging inquiry instead:`,
      );
      console.info({ to, from, subject: email.subject });
      return { ok: true };
    }

    return {
      ok: false,
      error: "Email delivery is not configured. Please try again later.",
    };
  }

  const resend = new Resend(apiKey);

  const { data, error } = await resend.emails.send(
    {
      from,
      to: [to],
      replyTo,
      subject: email.subject,
      text: email.text,
      html: email.html,
    },
    { idempotencyKey },
  );

  if (error) {
    console.error(`[${channel}] Resend error:`, error.message);
    return {
      ok: false,
      error: "We could not send your request. Please try again shortly.",
    };
  }

  console.info(`[${channel}] Email sent:`, data?.id);
  return { ok: true };
}

export async function sendContactEmail(
  payload: ContactPayload,
): Promise<{ ok: true } | { ok: false; error: string }> {
  return deliver(
    "contact",
    buildAgencyEmail(payload),
    payload.email,
    `contact-inquiry/${payload.email}/${Date.now()}`,
  );
}

export async function sendConsultationEmail(
  payload: ConsultationPayload,
): Promise<{ ok: true } | { ok: false; error: string }> {
  return deliver(
    "consultation",
    buildConsultationEmail(payload),
    payload.email,
    `consultation-request/${payload.email}/${Date.now()}`,
  );
}
