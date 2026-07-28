import { leadScoreFixtures } from "../lib/lead-scoring.fixtures";
import { scoreConsultation, scoreBucket } from "../lib/lead-scoring";

let failed = 0;

for (const fixture of leadScoreFixtures) {
  const result = scoreConsultation(fixture.input);
  const errors: string[] = [];

  if (result.score !== fixture.expectedScore) {
    errors.push(`score ${result.score} !== ${fixture.expectedScore}`);
  }
  if (result.band !== fixture.expectedBand) {
    errors.push(`band ${result.band} !== ${fixture.expectedBand}`);
  }
  if (fixture.expectedBreakdown) {
    for (const [key, points] of Object.entries(fixture.expectedBreakdown)) {
      const actual = result.breakdown[key as keyof typeof result.breakdown];
      if (actual !== points) {
        errors.push(`breakdown.${key} ${actual} !== ${points}`);
      }
    }
  }

  const bucket = scoreBucket(result.score);
  if (result.band === "qualified" && bucket !== "70+") {
    errors.push(`scoreBucket ${bucket} expected 70+ for qualified`);
  }
  if (result.band === "nurture" && bucket !== "40-69") {
    errors.push(`scoreBucket ${bucket} expected 40-69 for nurture`);
  }
  if (result.band === "low" && bucket !== "0-39") {
    errors.push(`scoreBucket ${bucket} expected 0-39 for low`);
  }

  if (errors.length > 0) {
    failed += 1;
    console.error(`FAIL: ${fixture.label}`);
    for (const error of errors) {
      console.error(`  - ${error}`);
    }
  } else {
    console.log(`ok: ${fixture.label}`);
  }
}

if (failed > 0) {
  console.error(`\n${failed} fixture(s) failed`);
  process.exit(1);
}

console.log(`\nAll ${leadScoreFixtures.length} lead-scoring fixtures passed.`);
