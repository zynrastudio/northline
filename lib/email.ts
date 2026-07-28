import { Resend } from "resend";
import { siteSettings } from "@/content/site";
import type { ContactPayload } from "@/lib/contact";
import type { ConsultationPayload } from "@/lib/consultation";
import {
  buildCalComBookingUrl,
  getCalComBaseUrl,
  getResourceLinks,
  getSiteOrigin,
  isQualifiedBand,
} from "@/lib/consultation-branch";
import type { LeadBand } from "@/lib/lead-scoring";

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

function buildConsultationAgencyEmail(
  payload: ConsultationPayload,
  band: LeadBand,
  score: number,
) {
  const subject = `[${band}] Strategy consultation from ${payload.name}${
    payload.company ? ` (${payload.company})` : ""
  }`;

  const rows: [string, string][] = [
    ["Name", payload.name],
    ["Company", payload.company],
    ["Email", payload.email],
    ["Phone", payload.phone || "(not provided)"],
    ["Band", band],
    ["Score", String(score)],
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

function buildProspectConfirmationEmail(
  payload: ConsultationPayload,
  band: LeadBand,
) {
  const firstName = payload.name.split(" ")[0] || "there";
  const origin = getSiteOrigin();
  const bookingUrl = buildCalComBookingUrl(getCalComBaseUrl(), {
    name: payload.name,
    email: payload.email,
  });

  if (isQualifiedBand(band)) {
    const subject = "Book your Northline strategy consultation";
    const bookingLine = bookingUrl
      ? `Book a time here: ${bookingUrl}`
      : "We’ll email a booking link within one business day.";

    const text = [
      `Hi ${firstName},`,
      "",
      "Thanks for requesting a strategy consultation with Northline Creative.",
      "Based on what you shared, a focused conversation is the right next step.",
      "",
      bookingLine,
      "",
      `How we work: ${origin}/process`,
      "",
      "- Northline Creative",
    ].join("\n");

    const bookingHtml = bookingUrl
      ? `<p><a href="${escapeHtml(bookingUrl)}">Book your strategy consultation</a></p>`
      : `<p>We’ll email a booking link within one business day.</p>`;

    const html = `
      <p>Hi ${escapeHtml(firstName)},</p>
      <p>Thanks for requesting a strategy consultation with Northline Creative. Based on what you shared, a focused conversation is the right next step.</p>
      ${bookingHtml}
      <p><a href="${escapeHtml(`${origin}/process`)}">See how we work</a></p>
      <p>- Northline Creative</p>
    `;

    return { subject, text, html };
  }

  const resources = getResourceLinks(origin);
  const subject = "Resources from Northline Creative";
  const text = [
    `Hi ${firstName},`,
    "",
    "Thanks for reaching out. We’re not rushing you onto a calendar, here is useful reading while you sort priorities.",
    "",
    ...resources.map(
      (link) =>
        `- ${link.label}${link.description ? ` (${link.description})` : ""}: ${link.href}`,
    ),
    "",
    "If timing or scope shifts, you’re welcome to request a consultation again.",
    "",
    "- Northline Creative",
  ].join("\n");

  const html = `
    <p>Hi ${escapeHtml(firstName)},</p>
    <p>Thanks for reaching out. We’re not rushing you onto a calendar, here is useful reading while you sort priorities.</p>
    <ul>
      ${resources
        .map(
          (link) =>
            `<li><a href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a>${
              link.description
                ? `, ${escapeHtml(link.description)}`
                : ""
            }</li>`,
        )
        .join("")}
    </ul>
    <p>If timing or scope shifts, you’re welcome to request a consultation again.</p>
    <p>- Northline Creative</p>
  `;

  return { subject, text, html };
}

async function deliver(
  channel: string,
  email: { subject: string; text: string; html: string },
  options: {
    to: string;
    replyTo?: string;
    idempotencyKey: string;
  },
): Promise<{ ok: true } | { ok: false; error: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const from =
    process.env.CONTACT_FROM_EMAIL ??
    "Northline Creative <onboarding@resend.dev>";

  if (!apiKey) {
    if (process.env.NODE_ENV === "development") {
      console.info(
        `[${channel}] RESEND_API_KEY missing, logging inquiry instead:`,
      );
      console.info({
        to: options.to,
        from,
        subject: email.subject,
        text: email.text,
      });
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
      to: [options.to],
      replyTo: options.replyTo,
      subject: email.subject,
      text: email.text,
      html: email.html,
    },
    { idempotencyKey: options.idempotencyKey },
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
  return deliver("contact", buildAgencyEmail(payload), {
    to: process.env.CONTACT_TO_EMAIL ?? siteSettings.email,
    replyTo: payload.email,
    idempotencyKey: `contact-inquiry/${payload.email}/${Date.now()}`,
  });
}

export type ConsultationEmailInput = {
  payload: ConsultationPayload;
  band: LeadBand;
  score: number;
};

/**
 * Mode A: agency notify (hard-fail) + prospect confirmation (soft-fail if agency ok).
 */
export async function sendConsultationEmail({
  payload,
  band,
  score,
}: ConsultationEmailInput): Promise<{ ok: true } | { ok: false; error: string }> {
  const stamp = Date.now();
  const agency = await deliver(
    "consultation-agency",
    buildConsultationAgencyEmail(payload, band, score),
    {
      to: process.env.CONTACT_TO_EMAIL ?? siteSettings.email,
      replyTo: payload.email,
      idempotencyKey: `consultation-agency/${payload.email}/${stamp}`,
    },
  );

  if (!agency.ok) {
    return agency;
  }

  const prospect = await deliver(
    "consultation-prospect",
    buildProspectConfirmationEmail(payload, band),
    {
      to: payload.email,
      replyTo: process.env.CONTACT_TO_EMAIL ?? siteSettings.email,
      idempotencyKey: `consultation-prospect/${payload.email}/${stamp}`,
    },
  );

  if (!prospect.ok) {
    console.error(
      "[consultation-prospect] soft-fail after agency ok:",
      prospect.error,
    );
  }

  return { ok: true };
}
