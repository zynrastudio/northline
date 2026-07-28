/**
 * Live smoke: POST §5.3 payload through lib/n8n to Railway (or N8N_WEBHOOK_URL).
 * Usage: N8N_WEBHOOK_URL=... N8N_WEBHOOK_SECRET=... npx tsx scripts/verify-n8n-intake-live.ts
 */
import { scoreConsultation } from "../lib/lead-scoring";
import {
  buildConsultationAutomationPayload,
  postConsultationIntake,
} from "../lib/n8n";
import type { ConsultationPayload } from "../lib/consultation";

const payload: ConsultationPayload = {
  name: "G3 Form Path",
  email: `test-g3-live-${Date.now()}@example.com`,
  phone: "+14155552671",
  company: "G3 Live Co",
  industry: "SaaS & Software",
  decisionMaker: "I own this decision",
  challenges: "G3 live wire verification.",
  budget: "$100k or more",
  timeline: "As soon as possible",
  scope: "Site plus strategy",
  goals: "Confirm Next to n8n path.",
};

async function main() {
  const scoreResult = scoreConsultation(payload);
  const body = buildConsultationAutomationPayload(payload, scoreResult);
  const result = await postConsultationIntake(body);

  console.log(JSON.stringify({ requestBand: scoreResult.band, result }, null, 2));

  if (!result.ok) {
    console.error("FAIL: n8n intake");
    process.exit(1);
  }

  if (!result.opportunityId) {
    console.error("FAIL: missing opportunityId");
    process.exit(1);
  }

  console.log("OK: Opportunity created via lib/n8n →", result.opportunityId);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
