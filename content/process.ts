import type { ProcessStep } from "./types";

export const processIntro =
  "Four steps, run in the open. You always know what is being decided, what is being built, and what it is expected to change.";

export const processSteps: ProcessStep[] = [
  {
    action: "Diagnose",
    summary:
      "We audit the current presence, interview the people closest to your buyers, and agree on the metrics this engagement has to move.",
  },
  {
    action: "Design",
    summary:
      "Positioning, journey, and interface are designed together so the message and the experience make the same argument.",
  },
  {
    action: "Build",
    summary:
      "We ship a fast, accessible site and wire it into the systems your team already uses, with automation handling qualification and routing.",
  },
  {
    action: "Grow",
    summary:
      "After launch we run content, experiments, and reporting on a quarterly cadence so results compound instead of plateau.",
  },
];
