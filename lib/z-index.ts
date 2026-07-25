/**
 * Systemic z-index scale — Phase C shell.
 * Do not invent arbitrary z-[9999] values outside this map.
 */
export const zIndex = {
  base: 0,
  raised: 10,
  sticky: 40,
  island: 50,
  overlay: 60,
  grain: 70,
  skipLink: 100,
} as const;
