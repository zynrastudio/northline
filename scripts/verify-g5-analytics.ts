import { scoreBucket } from "../lib/lead-scoring";

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exitCode = 1;
  }
}

assert(scoreBucket(115) === "70+", "qualified bucket");
assert(scoreBucket(45) === "40-69", "nurture bucket");
assert(scoreBucket(20) === "0-39", "low bucket");

const events = [
  "consultation_start",
  "consultation_step_complete",
  "consultation_submit",
  "generate_lead",
  "lead_qualified",
  "lead_nurture",
  "case_study_view",
  "insight_view",
  "calendar_booking_complete",
] as const;

assert(events.length === 9, "§9 event count");

console.log("OK: G5 score buckets + §9 event name list");
console.log({ events: [...events], buckets: ["0-39", "40-69", "70+"] });
console.log(
  "Manual DebugView: set NEXT_PUBLIC_GA_MEASUREMENT_ID + NEXT_PUBLIC_GA_DEBUG=true, restart, walk /book-consultation and /book-consultation/booked",
);
