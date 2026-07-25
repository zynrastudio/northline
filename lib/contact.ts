export type ContactPayload = {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
  /** Honeypot — must stay empty */
  website?: string;
};

export type ContactFieldErrors = Partial<
  Record<"name" | "company" | "email" | "phone" | "message" | "form", string>
>;

export type ContactActionResult =
  | { ok: true }
  | { ok: false; errors: ContactFieldErrors };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactPayload(
  raw: ContactPayload,
): ContactFieldErrors | null {
  const errors: ContactFieldErrors = {};

  const name = raw.name.trim();
  const email = raw.email.trim();
  const message = raw.message.trim();
  const phone = raw.phone.trim();
  const website = (raw.website ?? "").trim();

  if (website) {
    // Bot filled honeypot — treat as success upstream without sending.
    return { form: "spam" };
  }

  if (!name) errors.name = "Please enter your name.";
  if (!email) {
    errors.email = "Please enter your email.";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!message) errors.message = "Please enter a message.";
  if (phone && phone.replace(/\D/g, "").length < 7) {
    errors.phone = "Please enter a valid phone number.";
  }

  return Object.keys(errors).length > 0 ? errors : null;
}

export function normalizeContactPayload(raw: ContactPayload): ContactPayload {
  return {
    name: raw.name.trim(),
    company: raw.company.trim(),
    email: raw.email.trim(),
    phone: raw.phone.trim(),
    message: raw.message.trim(),
    website: (raw.website ?? "").trim(),
  };
}
