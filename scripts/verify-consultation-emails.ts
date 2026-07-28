import { sendConsultationEmail } from "../lib/email";
import { scoreConsultation } from "../lib/lead-scoring";
import type { ConsultationPayload } from "../lib/consultation";

const qualified: ConsultationPayload = {
  name: "G4 Qualified Live",
  email: "g4-q@example.com",
  phone: "+14155552671",
  company: "G4 Q Co",
  industry: "SaaS & Software",
  decisionMaker: "I own this decision",
  challenges: "Pipeline.",
  budget: "$100k or more",
  timeline: "As soon as possible",
  scope: "Site plus strategy",
  goals: "Growth.",
};

const nurture: ConsultationPayload = {
  name: "G4 Nurture Live",
  email: "g4-n@example.com",
  phone: "",
  company: "G4 N Co",
  industry: "Other",
  decisionMaker: "I am researching for a decision maker",
  challenges: "Exploring.",
  budget: "$100k or more",
  timeline: "Still exploring",
  scope: "Not sure yet",
  goals: "Learn.",
};

async function main() {
  process.env.NEXT_PUBLIC_CAL_COM_URL ??=
    "https://cal.com/northline/strategy-consultation";
  process.env.NEXT_PUBLIC_SITE_URL ??= "http://localhost:3000";

  const qs = scoreConsultation(qualified);
  const ns = scoreConsultation(nurture);

  const a = await sendConsultationEmail({
    payload: qualified,
    band: qs.band,
    score: qs.score,
  });
  const b = await sendConsultationEmail({
    payload: nurture,
    band: ns.band,
    score: ns.score,
  });

  if (!a.ok || !b.ok) {
    console.error("FAIL email", { a, b });
    process.exit(1);
  }

  console.log("OK: both band emails (agency + prospect)");
  console.log({ qualified: qs.band, nurture: ns.band });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
