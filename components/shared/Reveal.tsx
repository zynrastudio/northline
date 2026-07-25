"use client";

import { motion, useReducedMotion } from "motion/react";
import { type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

const ease = [0.16, 1, 0.3, 1] as const;

export function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

type RevealStaggerProps = {
  children: ReactNode[];
  className?: string;
  itemClassName?: string;
};

export function RevealStagger({
  children,
  className = "",
  itemClassName = "",
}: RevealStaggerProps) {
  const reduce = useReducedMotion();

  return (
    <div className={className}>
      {children.map((child, i) => (
        <motion.div
          key={i}
          className={itemClassName}
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.65,
            delay: reduce ? 0 : i * 0.06,
            ease,
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}
