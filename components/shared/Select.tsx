"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { CaretDown, Check } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

export type SelectOption = {
  value: string;
  label: string;
  /** Visual-only row; not selectable */
  divider?: boolean;
  disabled?: boolean;
};

type SelectProps = {
  id: string;
  name?: string;
  value: string;
  placeholder?: string;
  options: readonly string[] | readonly SelectOption[];
  onChange: (value: string) => void;
  hasError?: boolean;
  disabled?: boolean;
  className?: string;
  /** `field` matches text inputs; `inline` is compact (e.g. phone country). */
  variant?: "field" | "inline";
  /** Optional leading content inside the trigger (flags, icons). */
  leading?: ReactNode;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
  "aria-label"?: string;
  onFocus?: () => void;
  onBlur?: () => void;
};

const easePremium = [0.32, 0.72, 0, 1] as const;

function normalizeOptions(
  options: readonly string[] | readonly SelectOption[],
): SelectOption[] {
  return options.map((option) =>
    typeof option === "string"
      ? { value: option, label: option }
      : option,
  );
}

/**
 * Custom listbox select — Soft Structuralism.
 * Replaces native `<select>` so the menu matches Northline controls sitewide.
 */
export function Select({
  id,
  name,
  value,
  placeholder = "Select…",
  options,
  onChange,
  hasError = false,
  disabled = false,
  className = "",
  variant = "field",
  leading,
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedBy,
  "aria-label": ariaLabel,
  onFocus,
  onBlur,
}: SelectProps) {
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const typeBuffer = useRef("");
  const typeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const normalized = useMemo(() => normalizeOptions(options), [options]);
  const selectable = useMemo(
    () =>
      normalized
        .map((option, index) => ({ option, index }))
        .filter(({ option }) => !option.divider && !option.disabled && option.value),
    [normalized],
  );

  const selected = normalized.find((option) => option.value === value);
  const invalid = ariaInvalid ?? hasError;
  const isInline = variant === "inline";

  const close = useCallback(() => {
    setOpen(false);
    setActiveIndex(-1);
  }, []);

  const openMenu = useCallback(() => {
    if (disabled) return;
    setOpen(true);
    const selectedSelectable = selectable.findIndex(
      ({ option }) => option.value === value,
    );
    setActiveIndex(selectedSelectable >= 0 ? selectedSelectable : 0);
  }, [disabled, selectable, value]);

  const selectAt = useCallback(
    (selectableIndex: number) => {
      const entry = selectable[selectableIndex];
      if (!entry) return;
      onChange(entry.option.value);
      close();
    },
    [selectable, onChange, close],
  );

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        close();
      }
    }

    function onKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
      }
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  useEffect(() => {
    if (!open || activeIndex < 0) return;
    const entry = selectable[activeIndex];
    if (!entry) return;
    const node = listRef.current?.querySelector<HTMLElement>(
      `#${CSS.escape(`${listId}-opt-${entry.index}`)}`,
    );
    node?.scrollIntoView({ block: "nearest" });
  }, [open, activeIndex, selectable, listId]);

  useEffect(() => {
    return () => {
      if (typeTimer.current) clearTimeout(typeTimer.current);
    };
  }, []);

  function moveActive(delta: number) {
    if (selectable.length === 0) return;
    setActiveIndex((current) => {
      const next =
        current < 0
          ? delta > 0
            ? 0
            : selectable.length - 1
          : (current + delta + selectable.length) % selectable.length;
      return next;
    });
  }

  function typeahead(character: string) {
    typeBuffer.current += character.toLowerCase();
    if (typeTimer.current) clearTimeout(typeTimer.current);
    typeTimer.current = setTimeout(() => {
      typeBuffer.current = "";
    }, 700);

    const match = selectable.findIndex(({ option }) =>
      option.label.toLowerCase().startsWith(typeBuffer.current),
    );
    if (match >= 0) {
      if (!open) openMenu();
      setActiveIndex(match);
    }
  }

  function onTriggerKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (disabled) return;

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        if (!open) openMenu();
        else moveActive(1);
        break;
      case "ArrowUp":
        event.preventDefault();
        if (!open) openMenu();
        else moveActive(-1);
        break;
      case "Home":
        event.preventDefault();
        if (open) setActiveIndex(0);
        break;
      case "End":
        event.preventDefault();
        if (open) setActiveIndex(selectable.length - 1);
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        if (!open) openMenu();
        else if (activeIndex >= 0) selectAt(activeIndex);
        break;
      case "Escape":
        if (open) {
          event.preventDefault();
          close();
        }
        break;
      case "Tab":
        close();
        break;
      default:
        if (event.key.length === 1 && !event.ctrlKey && !event.metaKey) {
          event.preventDefault();
          typeahead(event.key);
        }
    }
  }

  const activeOption = selectable[activeIndex];
  const activeDescendant =
    open && activeOption ? `${listId}-opt-${activeOption.index}` : undefined;

  return (
    <div
      ref={rootRef}
      className={`relative ${isInline ? "inline-flex" : "w-full"} ${className}`}
    >
      {name ? (
        <input type="hidden" name={name} value={value} />
      ) : null}

      <button
        type="button"
        id={id}
        role="combobox"
        disabled={disabled}
        aria-controls={listId}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-activedescendant={activeDescendant}
        aria-autocomplete="none"
        aria-invalid={invalid || undefined}
        aria-describedby={ariaDescribedBy}
        aria-label={ariaLabel}
        onClick={() => (open ? close() : openMenu())}
        onKeyDown={onTriggerKeyDown}
        onFocus={onFocus}
        onBlur={onBlur}
        className={
          isInline
            ? [
                "group inline-flex h-full items-center gap-1.5 rounded-l-[var(--radius-control)] px-2.5",
                "transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
                "hover:bg-ink/[0.03] focus-visible:outline-none",
                "disabled:cursor-not-allowed disabled:opacity-60",
              ].join(" ")
            : [
                "group flex w-full items-center gap-2 rounded-[var(--radius-control)] border bg-white px-3.5 py-2.5 text-left text-sm",
                "outline-none transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
                "focus-visible:ring-2 focus-visible:ring-brand/30 focus-visible:border-brand",
                "disabled:cursor-not-allowed disabled:opacity-60",
                "active:scale-[0.995]",
                hasError ? "border-red-400" : open ? "border-brand" : "border-border",
                open && !hasError ? "ring-2 ring-brand/30" : "",
              ].join(" ")
        }
      >
        {leading ? (
          <span className="flex shrink-0 items-center" aria-hidden>
            {leading}
          </span>
        ) : null}

        {isInline ? null : (
          <span
            className={`min-w-0 flex-1 truncate ${
              selected ? "text-ink" : "text-muted"
            }`}
          >
            {selected?.label ?? placeholder}
          </span>
        )}

        <span
          aria-hidden
          className={[
            "flex shrink-0 items-center justify-center rounded-full",
            "transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
            isInline
              ? "h-5 w-5 text-steel"
              : "h-7 w-7 bg-ink/[0.04] text-steel group-hover:bg-brand/10 group-hover:text-brand",
            open ? "rotate-180" : "rotate-0",
          ].join(" ")}
        >
          <CaretDown weight="bold" className={isInline ? "h-2.5 w-2.5" : "h-3.5 w-3.5"} />
        </span>
      </button>

      <AnimatePresence>
        {open ? (
          <motion.ul
            ref={listRef}
            id={listId}
            role="listbox"
            aria-labelledby={id}
            tabIndex={-1}
            initial={reduceMotion ? false : { opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: -4, scale: 0.98 }
            }
            transition={{ duration: 0.28, ease: easePremium }}
            className={[
              "absolute z-40 mt-2 max-h-72 overflow-y-auto overscroll-contain p-1.5",
              "rounded-[var(--radius-panel)] border border-ink/8 bg-surface-elevated",
              "shadow-[0_22px_50px_-24px_rgba(20,22,26,0.4)]",
              "origin-top",
              isInline ? "left-0 min-w-[16rem] sm:min-w-[18rem]" : "inset-x-0",
            ].join(" ")}
          >
            {normalized.map((option, index) => {
              if (option.divider) {
                return (
                  <li
                    key={`divider-${index}`}
                    role="separator"
                    className="my-1.5 border-t border-ink/8"
                  />
                );
              }

              const selectableIndex = selectable.findIndex(
                (entry) => entry.index === index,
              );
              const isSelected = option.value === value;
              const isActive = selectableIndex === activeIndex;
              const isDisabled = Boolean(option.disabled) || !option.value;

              return (
                <li
                  key={option.value || `empty-${index}`}
                  id={`${listId}-opt-${index}`}
                  role="option"
                  aria-selected={isSelected}
                  aria-disabled={isDisabled || undefined}
                  onMouseEnter={() => {
                    if (!isDisabled && selectableIndex >= 0) {
                      setActiveIndex(selectableIndex);
                    }
                  }}
                  onClick={() => {
                    if (isDisabled || selectableIndex < 0) return;
                    selectAt(selectableIndex);
                  }}
                  className={[
                    "flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm",
                    "transition-colors duration-200 ease-[cubic-bezier(0.32,0.72,0,1)]",
                    isDisabled ? "cursor-not-allowed opacity-40" : "",
                    isActive ? "bg-brand-subtle text-ink" : "text-ink",
                    isSelected && !isActive ? "text-brand" : "",
                  ].join(" ")}
                >
                  <span className="min-w-0 flex-1 truncate">{option.label}</span>
                  {isSelected ? (
                    <Check
                      weight="bold"
                      className="h-3.5 w-3.5 shrink-0 text-brand"
                    />
                  ) : null}
                </li>
              );
            })}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
