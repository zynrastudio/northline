import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import {
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "tertiary";
type ButtonSize = "md" | "sm";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-brand text-on-brand hover:bg-brand-dark focus-visible:outline-brand",
  secondary:
    "border border-ink/15 bg-surface-elevated text-ink hover:border-brand hover:text-brand focus-visible:outline-brand",
  ghost:
    "border border-white/40 bg-transparent text-white hover:bg-white/10 focus-visible:outline-white",
  tertiary:
    "bg-transparent px-0 text-brand underline-offset-4 hover:underline focus-visible:outline-brand",
};

const sizeClasses: Record<ButtonSize, string> = {
  md: "px-5 py-2.5 text-sm",
  sm: "px-3.5 py-2 text-sm",
};

type CommonProps = {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Nested trailing arrow (button-in-button) for primary CTAs */
  withArrow?: boolean;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: string;
  };

export function Button({
  children,
  className = "",
  variant = "primary",
  size = "md",
  withArrow = false,
  ...props
}: ButtonAsButton | ButtonAsLink) {
  const isTertiary = variant === "tertiary";
  const radius = isTertiary
    ? "rounded-sm"
    : "rounded-[var(--radius-button)]";

  const classes = [
    "group inline-flex items-center justify-center gap-2 font-medium whitespace-nowrap",
    "transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
    "focus-visible:outline-2 focus-visible:outline-offset-2",
    "active:scale-[0.98] disabled:opacity-60",
    radius,
    variantClasses[variant],
    isTertiary ? "" : sizeClasses[size],
    withArrow && !isTertiary ? "pr-1.5" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      <span>{children}</span>
      {withArrow ? (
        <span
          aria-hidden
          className={
            variant === "primary"
              ? "flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105"
              : "flex h-7 w-7 items-center justify-center rounded-full bg-ink/5 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105"
          }
        >
          <ArrowUpRight weight="bold" className="h-3.5 w-3.5" />
        </span>
      ) : null}
    </>
  );

  if ("href" in props && props.href) {
    const { href, ...rest } = props;
    return (
      <Link href={href} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;
  return (
    <button
      type={buttonProps.type ?? "button"}
      className={classes}
      {...buttonProps}
    >
      {content}
    </button>
  );
}
