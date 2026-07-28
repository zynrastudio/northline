import { type ReactNode } from "react";
import { Container } from "@/components/shared/Container";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  action?: ReactNode;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  action,
}: SectionHeadingProps) {
  const alignment =
    align === "center" ? "mx-auto text-center items-center" : "items-start text-left";

  return (
    <div
      className={`mb-10 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between ${align === "center" ? "md:flex-col md:items-center" : ""}`}
    >
      <div className={`flex max-w-2xl flex-col gap-3 ${alignment}`}>
        {eyebrow ? (
          <p className="text-sm font-medium uppercase tracking-wide text-brand">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {title}
        </h2>
        {description ? (
          <p className="text-base leading-relaxed text-muted sm:text-lg">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

type SectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

export function Section({ children, className = "", id }: SectionProps) {
  return (
    <section id={id} className={`py-20 sm:py-24 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}
