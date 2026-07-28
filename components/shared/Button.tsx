"use client";

import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import {
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "tertiary"
  /** White fill + brand text — for CTAs sitting on `bg-brand` surfaces */
  | "inverse";
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
  inverse:
    "bg-white text-brand hover:bg-brand-subtle focus-visible:outline-white",
};

const arrowNestClasses: Record<ButtonVariant, string> = {
  primary: "bg-white/15",
  secondary: "bg-ink/5",
  ghost: "bg-white/15",
  tertiary: "bg-brand/10",
  inverse: "bg-brand/10",
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

type MotionDomConflict =
  | "onDrag"
  | "onDragStart"
  | "onDragEnd"
  | "onAnimationStart"
  | "onAnimationEnd"
  | "onAnimationIteration";

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, MotionDomConflict> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    "href" | MotionDomConflict
  > & {
    href: string;
  };

const MotionLink = motion.create(Link);
const MotionButton = motion.button;

export function Button({
  children,
  className = "",
  variant = "primary",
  size = "md",
  withArrow = false,
  ...props
}: ButtonAsButton | ButtonAsLink) {
  const reduceMotion = useReducedMotion();
  const isTertiary = variant === "tertiary";
  const radius = isTertiary
    ? "rounded-sm"
    : "rounded-[var(--radius-button)]";

  const classes = [
    "group inline-flex items-center justify-center gap-2 font-medium whitespace-nowrap",
    "transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
    "focus-visible:outline-2 focus-visible:outline-offset-2",
    "disabled:opacity-60",
    radius,
    variantClasses[variant],
    isTertiary ? "" : sizeClasses[size],
    withArrow && !isTertiary ? "pr-1.5" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const tap = reduceMotion ? undefined : { scale: 0.97 };

  const content = (
    <>
      <span>{children}</span>
      {withArrow ? (
        <span
          aria-hidden
          className={[
            "flex h-7 w-7 items-center justify-center rounded-full",
            "transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
            "group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105",
            arrowNestClasses[variant],
          ].join(" ")}
        >
          <ArrowUpRight weight="bold" className="h-3.5 w-3.5" />
        </span>
      ) : null}
    </>
  );

  if ("href" in props && props.href) {
    const { href, ...rest } = props;
    return (
      <MotionLink
        href={href}
        className={classes}
        whileTap={tap}
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
        {...rest}
      >
        {content}
      </MotionLink>
    );
  }

  const buttonProps = props as ButtonAsButton;
  return (
    <MotionButton
      type={buttonProps.type ?? "button"}
      className={classes}
      whileTap={tap}
      transition={{ type: "spring", stiffness: 500, damping: 32 }}
      {...buttonProps}
    >
      {content}
    </MotionButton>
  );
}
