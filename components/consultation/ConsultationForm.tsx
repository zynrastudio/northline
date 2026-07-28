"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, useTransition } from "react";
import { Check } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import { submitConsultation } from "@/app/actions/consultation";
import { PhoneField } from "@/components/consultation/PhoneField";
import { Button } from "@/components/shared/Button";
import { DoubleBezel } from "@/components/shared/DoubleBezel";
import { Select } from "@/components/shared/Select";
import { trackEvent } from "@/lib/analytics";
import { cta } from "@/lib/nav";
import {
  budgetOptions,
  consultationSteps,
  decisionMakerOptions,
  emptyConsultation,
  industryOptions,
  scopeOptions,
  timelineOptions,
  validateConsultationStep,
  type ConsultationField,
  type ConsultationFieldErrors,
  type ConsultationPayload,
} from "@/lib/consultation";

const stepMeta = [
  { title: "About you", hint: "Who we will be talking with." },
  { title: "Your situation", hint: "Where you are today." },
  { title: "The engagement", hint: "What a fit looks like." },
] as const;

const successNext = [
  "We review fit within two business days",
  "You get a clear yes, not yet, or a referral",
  "If it is a fit, that reply includes a booking link",
] as const;

const easePremium = [0.32, 0.72, 0, 1] as const;

/** Prevents Continue→Submit double-fire when the primary control morphs. */
const STEP_GUARD_MS = 450;

export function ConsultationForm() {
  const formId = useId();
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<ConsultationPayload>(emptyConsultation);
  const [errors, setErrors] = useState<ConsultationFieldErrors>({});
  const [success, setSuccess] = useState(false);
  const [pending, startTransition] = useTransition();
  const [stepReady, setStepReady] = useState(true);
  const guardTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduceMotion = useReducedMotion();

  const isLastStep = step === consultationSteps.length - 1;
  const progress = ((step + 1) / consultationSteps.length) * 100;

  useEffect(() => {
    return () => {
      if (guardTimer.current) clearTimeout(guardTimer.current);
    };
  }, []);

  function armStepGuard() {
    setStepReady(false);
    if (guardTimer.current) clearTimeout(guardTimer.current);
    guardTimer.current = setTimeout(() => setStepReady(true), STEP_GUARD_MS);
  }

  function updateField(key: ConsultationField | "website", value: string) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!current[key as keyof ConsultationFieldErrors]) return current;
      const next = { ...current };
      delete next[key as keyof ConsultationFieldErrors];
      return next;
    });
  }

  function focusFirstError(stepErrors: ConsultationFieldErrors) {
    const firstField = consultationSteps[step].fields.find(
      (field) => stepErrors[field],
    );
    if (firstField) {
      document.getElementById(`${formId}-${firstField}`)?.focus();
    }
  }

  function goNext() {
    const stepErrors = validateConsultationStep(step, values);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      focusFirstError(stepErrors);
      return;
    }
    setErrors({});
    armStepGuard();
    setStep((current) => Math.min(current + 1, consultationSteps.length - 1));
  }

  function goBack() {
    setErrors({});
    armStepGuard();
    setStep((current) => Math.max(current - 1, 0));
  }

  function submitForm() {
    if (!isLastStep || !stepReady || pending) return;

    const stepErrors = validateConsultationStep(step, values);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      focusFirstError(stepErrors);
      return;
    }

    startTransition(async () => {
      const result = await submitConsultation(values);

      if (!result.ok) {
        setErrors(result.errors);
        const firstStepWithError = consultationSteps.findIndex((s) =>
          s.fields.some((field) => result.errors[field]),
        );
        if (firstStepWithError >= 0) setStep(firstStepWithError);
        return;
      }

      setErrors({});
      setSuccess(true);
      trackEvent("generate_lead", {
        method: "consultation_form",
        form_id: "strategy_consultation",
      });
    });
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isLastStep) {
      goNext();
      return;
    }
    submitForm();
  }

  if (success) {
    const firstName = values.name.split(" ")[0] || "there";

    return (
      <motion.div
        role="status"
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: easePremium }}
      >
        <DoubleBezel tone="elevated">
          <div className="px-6 py-8 sm:px-8 sm:py-10">
            <p className="inline-flex items-center rounded-full bg-brand/10 px-3 py-1 text-[10px] font-medium tracking-[0.2em] text-brand uppercase">
              Confirmed
            </p>

            <span className="mt-6 flex h-14 w-14 items-center justify-center rounded-full bg-brand text-on-brand shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)]">
              <Check weight="bold" className="h-6 w-6" />
            </span>

            <h2 className="mt-6 font-[family-name:var(--font-outfit)] text-2xl font-medium tracking-tight text-ink sm:text-3xl">
              Request received
            </h2>
            <p className="mt-3 max-w-prose text-base leading-relaxed text-steel">
              Thanks, {firstName}. We review every request carefully so the next
              step is useful — not a pitch deck with a calendar link bolted on.
            </p>

            <ul className="mt-8 space-y-3 border-t border-ink/5 pt-6">
              {successNext.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm leading-relaxed text-steel"
                >
                  <Check
                    weight="bold"
                    className="mt-0.5 h-4 w-4 shrink-0 text-brand"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href={cta.secondary.href} withArrow>
                {cta.secondary.label}
              </Button>
              <Button href={cta.supporting.href} variant="secondary">
                {cta.supporting.label}
              </Button>
            </div>
          </div>
        </DoubleBezel>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-[var(--radius-card)] border border-border bg-white p-6 sm:p-8"
      aria-describedby={errors.form ? `${formId}-form-error` : undefined}
    >
      <div className="mb-8">
        <div className="flex items-baseline justify-between">
          <p className="text-sm font-medium text-ink">
            {stepMeta[step].title}
          </p>
          <p className="text-xs font-medium uppercase tracking-wide text-steel">
            Step {step + 1} of {consultationSteps.length}
          </p>
        </div>
        <p className="mt-1 text-sm text-steel">{stepMeta[step].hint}</p>
        <div
          className="mt-4 h-1 w-full overflow-hidden rounded-full bg-surface-muted"
          role="progressbar"
          aria-valuenow={step + 1}
          aria-valuemin={1}
          aria-valuemax={consultationSteps.length}
          aria-label="Form progress"
        >
          <div
            className="h-full rounded-full bg-brand transition-[width] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {step === 0 ? (
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id={`${formId}-name`} label="Name" required error={errors.name}>
            <input
              id={`${formId}-name`}
              name="name"
              autoComplete="name"
              value={values.name}
              onChange={(e) => updateField("name", e.target.value)}
              className={inputClass(Boolean(errors.name))}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={
                errors.name ? `${formId}-name-error` : undefined
              }
            />
          </Field>
          <Field
            id={`${formId}-company`}
            label="Company"
            required
            error={errors.company}
          >
            <input
              id={`${formId}-company`}
              name="company"
              autoComplete="organization"
              value={values.company}
              onChange={(e) => updateField("company", e.target.value)}
              className={inputClass(Boolean(errors.company))}
              aria-invalid={Boolean(errors.company)}
              aria-describedby={
                errors.company ? `${formId}-company-error` : undefined
              }
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
              onChange={(e) => updateField("email", e.target.value)}
              className={inputClass(Boolean(errors.email))}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={
                errors.email ? `${formId}-email-error` : undefined
              }
            />
          </Field>
          <Field id={`${formId}-phone`} label="Phone" error={errors.phone}>
            <PhoneField
              id={`${formId}-phone`}
              value={values.phone}
              onChange={(v) => updateField("phone", v)}
              hasError={Boolean(errors.phone)}
            />
          </Field>
        </div>
      ) : null}

      {step === 1 ? (
        <div className="grid gap-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              id={`${formId}-industry`}
              label="Industry"
              required
              error={errors.industry}
            >
              <Select
                id={`${formId}-industry`}
                name="industry"
                value={values.industry}
                placeholder="Select industry"
                options={industryOptions}
                onChange={(v) => updateField("industry", v)}
                hasError={Boolean(errors.industry)}
                aria-describedby={
                  errors.industry ? `${formId}-industry-error` : undefined
                }
              />
            </Field>
            <Field
              id={`${formId}-decisionMaker`}
              label="Your role in the decision"
              required
              error={errors.decisionMaker}
            >
              <Select
                id={`${formId}-decisionMaker`}
                name="decisionMaker"
                value={values.decisionMaker}
                placeholder="Select role"
                options={decisionMakerOptions}
                onChange={(v) => updateField("decisionMaker", v)}
                hasError={Boolean(errors.decisionMaker)}
                aria-describedby={
                  errors.decisionMaker
                    ? `${formId}-decisionMaker-error`
                    : undefined
                }
              />
            </Field>
          </div>
          <Field
            id={`${formId}-challenges`}
            label="Current challenges"
            required
            error={errors.challenges}
          >
            <textarea
              id={`${formId}-challenges`}
              name="challenges"
              rows={4}
              placeholder="What is getting in the way right now?"
              value={values.challenges}
              onChange={(e) => updateField("challenges", e.target.value)}
              className={`${inputClass(Boolean(errors.challenges))} resize-y`}
              aria-invalid={Boolean(errors.challenges)}
              aria-describedby={
                errors.challenges ? `${formId}-challenges-error` : undefined
              }
            />
          </Field>
        </div>
      ) : null}

      {step === 2 ? (
        <div className="grid gap-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              id={`${formId}-budget`}
              label="Budget range"
              required
              error={errors.budget}
            >
              <Select
                id={`${formId}-budget`}
                name="budget"
                value={values.budget}
                placeholder="Select budget"
                options={budgetOptions}
                onChange={(v) => updateField("budget", v)}
                hasError={Boolean(errors.budget)}
                aria-describedby={
                  errors.budget ? `${formId}-budget-error` : undefined
                }
              />
            </Field>
            <Field
              id={`${formId}-timeline`}
              label="Timeline"
              required
              error={errors.timeline}
            >
              <Select
                id={`${formId}-timeline`}
                name="timeline"
                value={values.timeline}
                placeholder="Select timeline"
                options={timelineOptions}
                onChange={(v) => updateField("timeline", v)}
                hasError={Boolean(errors.timeline)}
                aria-describedby={
                  errors.timeline ? `${formId}-timeline-error` : undefined
                }
              />
            </Field>
          </div>
          <Field
            id={`${formId}-scope`}
            label="Project scope"
            required
            error={errors.scope}
          >
            <Select
              id={`${formId}-scope`}
              name="scope"
              value={values.scope}
              placeholder="Select scope"
              options={scopeOptions}
              onChange={(v) => updateField("scope", v)}
              hasError={Boolean(errors.scope)}
              aria-describedby={
                errors.scope ? `${formId}-scope-error` : undefined
              }
            />
          </Field>
          <Field
            id={`${formId}-goals`}
            label="Business goals"
            required
            error={errors.goals}
          >
            <textarea
              id={`${formId}-goals`}
              name="goals"
              rows={4}
              placeholder="What does success look like 6 to 12 months from now?"
              value={values.goals}
              onChange={(e) => updateField("goals", e.target.value)}
              className={`${inputClass(Boolean(errors.goals))} resize-y`}
              aria-invalid={Boolean(errors.goals)}
              aria-describedby={
                errors.goals ? `${formId}-goals-error` : undefined
              }
            />
          </Field>
        </div>
      ) : null}

      {/* Honeypot - hidden from users */}
      <div
        className="absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden"
        aria-hidden
      >
        <label htmlFor={`${formId}-website`}>Website</label>
        <input
          id={`${formId}-website`}
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(e) => updateField("website", e.target.value)}
        />
      </div>

      {errors.form ? (
        <p
          id={`${formId}-form-error`}
          className="mt-6 rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-700"
          role="alert"
        >
          {errors.form}
        </p>
      ) : null}

      <div className="mt-8 flex items-center justify-between gap-4">
        {step > 0 ? (
          <Button type="button" variant="secondary" onClick={goBack}>
            Back
          </Button>
        ) : (
          <span />
        )}

        {isLastStep ? (
          <Button
            type="button"
            disabled={pending || !stepReady}
            onClick={submitForm}
            className="min-w-44"
          >
            {pending ? "Sending request…" : "Submit request"}
          </Button>
        ) : (
          <Button type="button" onClick={goNext} withArrow className="min-w-32">
            Continue
          </Button>
        )}
      </div>

      <p className="mt-5 text-xs leading-relaxed text-steel">
        Not ready to share details?{" "}
        <Link
          href="/case-studies"
          className="font-medium text-brand hover:text-brand-dark"
        >
          See the work first
        </Link>{" "}
        or{" "}
        <Link
          href="/process"
          className="font-medium text-brand hover:text-brand-dark"
        >
          read how we work
        </Link>
        .
      </p>
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
