import { scoreConsultation } from "../lib/lead-scoring";
import { buildConsultationAutomationPayload } from "../lib/n8n";
import type { ConsultationPayload } from "../lib/consultation";

const sample: ConsultationPayload = {
  name: "G3 Verify Lead",
  email: "test-g3@example.com",
  phone: "+14155552671",
  company: "G3 Test Co",
  industry: "SaaS & Software",
  decisionMaker: "I own this decision",
  challenges: "Pipeline quality is inconsistent.",
  budget: "$100k or more",
  timeline: "As soon as possible",
  scope: "Site plus strategy",
  goals: "Raise qualified consultation volume.",
};

const scoreResult = scoreConsultation(sample);
const body = buildConsultationAutomationPayload(
  sample,
  scoreResult,
  "2026-07-28T12:00:00.000Z",
);

const errors: string[] = [];

if (body.source !== "northline-after") errors.push("source");
if (body.submittedAt !== "2026-07-28T12:00:00.000Z") errors.push("submittedAt");
if (body.score !== scoreResult.score) errors.push("score");
if (body.band !== scoreResult.band) errors.push("band");
if (body.contact.email !== sample.email) errors.push("contact.email");
if (body.contact.company !== sample.company) errors.push("contact.company");
if (body.qualification.budget !== sample.budget) errors.push("qualification.budget");
if (body.qualification.scope !== sample.scope) errors.push("qualification.scope");
if (body.band !== "qualified" || body.score !== 115) {
  errors.push(`expected qualified/115 got ${body.band}/${body.score}`);
}

if (errors.length > 0) {
  console.error("FAIL: n8n payload builder");
  for (const error of errors) console.error(`  - ${error}`);
  process.exit(1);
}

console.log("OK: n8n payload builder matches §5.3 shape");
console.log(JSON.stringify(body, null, 2));
