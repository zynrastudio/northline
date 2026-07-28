"use client";

import { motion, useReducedMotion } from "motion/react";
import { cta } from "@/lib/nav";
import { Button } from "@/components/shared/Button";

const easePremium = [0.32, 0.72, 0, 1] as const;

type HomeHeroIntroProps = {
  brand: string;
  headline: string;
  support: string;
};

export function HomeHeroIntro({ brand, headline, support }: HomeHeroIntroProps) {
  const reduceMotion = useReducedMotion();

  const item = (delay: number) =>
    reduceMotion
      ? { initial: false as const, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.75, delay, ease: easePremium },
        };

  return (
    <div className="max-w-2xl">
      <motion.p
        className="font-[family-name:var(--font-outfit)] text-4xl font-medium tracking-tight text-white sm:text-5xl lg:text-6xl"
        {...item(0)}
      >
        {brand}
      </motion.p>
      <motion.h1
        className="mt-4 max-w-[18ch] font-[family-name:var(--font-outfit)] text-3xl font-medium tracking-tight text-white sm:text-4xl lg:text-5xl"
        {...item(0.09)}
      >
        {headline}
      </motion.h1>
      <motion.p
        className="mt-5 max-w-[36ch] text-base leading-relaxed text-white/80 sm:text-lg"
        {...item(0.18)}
      >
        {support}
      </motion.p>
      <motion.div
        className="mt-8 flex flex-wrap items-center gap-3"
        {...item(0.27)}
      >
        <Button href={cta.primary.href} withArrow>
          {cta.primary.label}
        </Button>
        <Button href={cta.secondary.href} variant="ghost">
          {cta.secondary.label}
        </Button>
      </motion.div>
    </div>
  );
}
