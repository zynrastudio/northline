import {
  buildCalComBookingUrl,
  getResourceLinks,
  isQualifiedBand,
  qualifiedSuccessCopy,
  resourcesSuccessCopy,
} from "../lib/consultation-branch";
import { scoreConsultation } from "../lib/lead-scoring";
import type { ConsultationPayload } from "../lib/consultation";

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exitCode = 1;
  }
}

const qualifiedInput: ConsultationPayload = {
  name: "G4 Qualified",
  email: "g4-qualified@example.com",
  phone: "+14155552671",
  company: "G4 Co",
  industry: "SaaS & Software",
  decisionMaker: "I own this decision",
  challenges: "Need clearer pipeline.",
  budget: "$100k or more",
  timeline: "As soon as possible",
  scope: "Site plus strategy",
  goals: "Raise qualified volume.",
};

const nurtureInput: ConsultationPayload = {
  name: "G4 Nurture",
  email: "g4-nurture@example.com",
  phone: "",
  company: "G4 Nurture Co",
  industry: "Other",
  decisionMaker: "I am researching for a decision maker",
  challenges: "Still exploring.",
  budget: "$100k or more",
  timeline: "Still exploring",
  scope: "Not sure yet",
  goals: "Learn options.",
};

const q = scoreConsultation(qualifiedInput);
const n = scoreConsultation(nurtureInput);

assert(q.band === "qualified", `expected qualified got ${q.band}`);
assert(n.band === "nurture", `expected nurture got ${n.band}`);
assert(isQualifiedBand(q.band), "isQualifiedBand qualified");
assert(!isQualifiedBand(n.band), "isQualifiedBand nurture");

const cal = buildCalComBookingUrl(
  "https://cal.com/northline/strategy-consultation",
  { name: qualifiedInput.name, email: qualifiedInput.email },
);
assert(!!cal && cal.includes("name="), "cal url has name");
assert(!!cal && cal.includes("email="), "cal url has email");
assert(
  buildCalComBookingUrl("", { name: "a", email: "b@c.com" }) === null,
  "empty cal base returns null",
);

const resources = getResourceLinks("http://localhost:3000");
assert(resources.length === 3, `expected 3 resource links got ${resources.length}`);
assert(
  resources.some((r) => r.href.includes("/case-studies/")),
  "includes case study",
);
assert(
  resources.some((r) => r.href.endsWith("/process")),
  "includes process",
);

assert(
  qualifiedSuccessCopy.headline.toLowerCase().includes("book"),
  "qualified headline mentions book",
);
assert(
  resourcesSuccessCopy.headline.toLowerCase().includes("reading"),
  "resources headline mentions reading",
);

if (process.exitCode) {
  console.error("G4 branch verify failed");
  process.exit(1);
}

console.log("OK: G4 branch helpers — qualified + resources paths");
console.log({
  qualifiedScore: q.score,
  nurtureScore: n.score,
  cal,
  resources: resources.map((r) => r.href),
});
