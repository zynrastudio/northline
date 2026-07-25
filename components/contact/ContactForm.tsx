"use client";

import { useId, useState, useTransition } from "react";
import { submitContactForm } from "@/app/actions/contact";
import { Button } from "@/components/shared/Button";
import { trackEvent } from "@/lib/analytics";
import type { ContactFieldErrors, ContactPayload } from "@/lib/contact";

const initialValues: ContactPayload = {
  name: "",
  company: "",
  email: "",
  phone: "",
  message: "",
  website: "",
};

export function ContactForm() {
  const formId = useId();
  const [values, setValues] = useState<ContactPayload>(initialValues);
  const [errors, setErrors] = useState<ContactFieldErrors>({});
  const [success, setSuccess] = useState(false);
  const [pending, startTransition] = useTransition();

  function updateField<K extends keyof ContactPayload>(
    key: K,
    value: ContactPayload[K],
  ) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!current[key as keyof ContactFieldErrors]) return current;
      const next = { ...current };
      delete next[key as keyof ContactFieldErrors];
      return next;
    });
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSuccess(false);

    startTransition(async () => {
      const result = await submitContactForm(values);

      if (!result.ok) {
        setErrors(result.errors);
        return;
      }

      setErrors({});
      setValues(initialValues);
      setSuccess(true);
      trackEvent("generate_lead", {
        method: "contact_form",
        form_id: "consultation_request",
      });
    });
  }

  if (success) {
    return (
      <div
        className="rounded-[var(--radius-card)] border border-brand/30 bg-brand-subtle p-6 sm:p-8"
        role="status"
      >
        <h2 className="text-xl font-semibold text-ink">Message sent</h2>
        <p className="mt-2 text-base leading-relaxed text-muted">
          Thanks for reaching out. Our team will review your consultation request
          and get back to you soon.
        </p>
        <Button
          type="button"
          variant="secondary"
          className="mt-6"
          onClick={() => setSuccess(false)}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-[var(--radius-card)] border border-border bg-white p-6 sm:p-8"
      aria-describedby={errors.form ? `${formId}-form-error` : undefined}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id={`${formId}-name`}
          label="Name"
          required
          error={errors.name}
        >
          <input
            id={`${formId}-name`}
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={(event) => updateField("name", event.target.value)}
            className={inputClass(Boolean(errors.name))}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${formId}-name-error` : undefined}
          />
        </Field>

        <Field
          id={`${formId}-company`}
          label="Company"
          error={errors.company}
        >
          <input
            id={`${formId}-company`}
            name="company"
            autoComplete="organization"
            value={values.company}
            onChange={(event) => updateField("company", event.target.value)}
            className={inputClass(Boolean(errors.company))}
          />
        </Field>

        <Field
          id={`${formId}-email`}
          label="Email"
          required
          error={errors.email}
        >
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(event) => updateField("email", event.target.value)}
            className={inputClass(Boolean(errors.email))}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${formId}-email-error` : undefined}
          />
        </Field>

        <Field id={`${formId}-phone`} label="Phone" error={errors.phone}>
          <input
            id={`${formId}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            className={inputClass(Boolean(errors.phone))}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? `${formId}-phone-error` : undefined}
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field
          id={`${formId}-message`}
          label="Message"
          required
          error={errors.message}
        >
          <textarea
            id={`${formId}-message`}
            name="message"
            rows={6}
            value={values.message}
            onChange={(event) => updateField("message", event.target.value)}
            className={`${inputClass(Boolean(errors.message))} resize-y`}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={
              errors.message ? `${formId}-message-error` : undefined
            }
          />
        </Field>
      </div>

      {/* Honeypot — hidden from users */}
      <div className="absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden" aria-hidden>
        <label htmlFor={`${formId}-website`}>Website</label>
        <input
          id={`${formId}-website`}
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(event) => updateField("website", event.target.value)}
        />
      </div>

      {errors.form ? (
        <p
          id={`${formId}-form-error`}
          className="mt-4 text-sm text-red-700"
          role="alert"
        >
          {errors.form}
        </p>
      ) : null}

      <div className="mt-6">
        <Button type="submit" disabled={pending} className="min-w-40">
          {pending ? "Sending…" : "Send message"}
        </Button>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
        {required ? <span className="text-brand"> *</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function inputClass(hasError: boolean): string {
  return [
    "w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-ink shadow-none outline-none transition-colors",
    "placeholder:text-muted focus-visible:ring-2 focus-visible:ring-brand/30 focus-visible:border-brand",
    hasError ? "border-red-400" : "border-border",
  ].join(" ");
}
