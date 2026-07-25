import { type ReactNode } from "react";

type DoubleBezelProps = {
  children: ReactNode;
  className?: string;
  /** Inner surface tone */
  tone?: "elevated" | "subtle";
};

/**
 * Nested shell for media / consultation panels only.
 * Do not wrap every block — elevation must earn hierarchy.
 */
export function DoubleBezel({
  children,
  className = "",
  tone = "elevated",
}: DoubleBezelProps) {
  const inner =
    tone === "elevated"
      ? "bg-surface-elevated shadow-[inset_0_1px_1px_rgba(255,255,255,0.65)]"
      : "bg-brand-subtle/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]";

  return (
    <div
      className={`rounded-[1.25rem] border border-ink/5 bg-ink/[0.03] p-1.5 shadow-[0_20px_50px_-28px_rgba(20,22,26,0.35)] ${className}`}
    >
      <div
        className={`overflow-hidden rounded-[calc(1.25rem-0.375rem)] ${inner}`}
      >
        {children}
      </div>
    </div>
  );
}
