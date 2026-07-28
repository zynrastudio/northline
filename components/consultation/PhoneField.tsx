"use client";

import { useId, useMemo, type ComponentType } from "react";
import PhoneInput, { type Country } from "react-phone-number-input";
import { Select, type SelectOption } from "@/components/shared/Select";
import "react-phone-number-input/style.css";

type PhoneFieldProps = {
  id: string;
  value: string;
  onChange: (value: string) => void;
  hasError?: boolean;
  defaultCountry?: Country;
};

type CountryOption = {
  value?: string;
  label: string;
  divider?: boolean;
};

type CountrySelectProps = {
  value?: string;
  onChange: (value?: string) => void;
  options: CountryOption[];
  iconComponent: ComponentType<{
    country?: string;
    label: string;
    "aria-hidden"?: boolean;
  }>;
  disabled?: boolean;
  readOnly?: boolean;
  "aria-label"?: string;
  onFocus?: () => void;
  onBlur?: () => void;
};

function PhoneCountrySelect({
  value,
  onChange,
  options,
  iconComponent: Icon,
  disabled,
  readOnly,
  "aria-label": ariaLabel,
  onFocus,
  onBlur,
}: CountrySelectProps) {
  const selectId = useId();

  const selectOptions = useMemo<SelectOption[]>(
    () =>
      options.map((option) =>
        option.divider
          ? { value: "", label: "", divider: true }
          : {
              value: option.value || "ZZ",
              label: option.label,
            },
      ),
    [options],
  );

  const selected =
    selectOptions.find((option) => option.value === (value || "ZZ")) ??
    selectOptions.find((option) => !option.divider);

  return (
    <div className="PhoneInputCountry PhoneInputCountry--custom">
      <Select
        id={selectId}
        variant="inline"
        value={value || "ZZ"}
        options={selectOptions}
        disabled={disabled || readOnly}
        aria-label={ariaLabel ?? "Country"}
        leading={
          <Icon
            aria-hidden
            country={value}
            label={selected?.label ?? "Country"}
          />
        }
        onChange={(next) => onChange(next === "ZZ" ? undefined : next)}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </div>
  );
}

/**
 * Industry-standard phone control: flag + country dial code + national number.
 * Stores E.164 (e.g. +14155552671). Empty string when cleared.
 * Country menu uses the shared Northline Select (not the browser default).
 */
export function PhoneField({
  id,
  value,
  onChange,
  hasError = false,
  defaultCountry = "US",
}: PhoneFieldProps) {
  return (
    <PhoneInput
      id={id}
      international
      countryCallingCodeEditable={false}
      defaultCountry={defaultCountry}
      value={value || undefined}
      onChange={(next) => onChange(next ?? "")}
      countrySelectComponent={PhoneCountrySelect}
      className={[
        "PhoneInput--northline",
        hasError ? "PhoneInput--error" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      numberInputProps={{
        name: "phone",
        autoComplete: "tel",
        "aria-invalid": hasError,
        "aria-describedby": hasError ? `${id}-error` : undefined,
        className: "PhoneInputInput",
      }}
    />
  );
}
