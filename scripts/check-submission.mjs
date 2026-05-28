import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const submissionPath = join(root, "SUBMISSION.md");

const requiredArtifacts = [
  "README.md",
  "docs/ARCHITECTURE.md",
  "docs/DEPLOYMENT.md",
  "docs/deployment/KEY_ACQUISITION.md",
  "docs/zh/README.md",
  "docs/zh/ARCHITECTURE.md",
  "docs/zh/DEPLOYMENT.md",
  "docs/zh/deployment/KEY_ACQUISITION.md",
  "docs/screenshots/hero.png",
  "docs/screenshots/flow.png",
  "docs/screenshots/mobile.png",
  "docs/screenshots/architecture.png",
  "pitch/deck.pdf",
  "pitch/deck-thumbs/slide-01.png",
  "pitch/deck-thumbs/slide-02.png",
  "pitch/deck-thumbs/slide-03.png",
  "pitch/deck-thumbs/slide-04.png",
  "pitch/deck-thumbs/slide-05.png",
  "pitch/illustrations/devpost-cover.png",
  "pitch/polish-combined/index.html",
  "pitch/polish-combined/narration.json",
];

const requiredSections = [
  "## Platform",
  "## Project Name",
  "## Tagline",
  "## Short Description",
  "## Long Description",
  "## Built With",
  "## Track / Category",
  "## Sponsor Prize Tracks",
  "## Demo URL",
  "## Repository URL",
  "## Video URL",
  "## Deck / Gallery Assets",
  "## Team Members",
  "## Submit Blockers",
];

const blockers = [];

if (!existsSync(submissionPath)) {
  blockers.push("SUBMISSION.md is missing.");
} else {
  const text = readFileSync(submissionPath, "utf8");
  for (const section of requiredSections) {
    if (!text.includes(section)) blockers.push(`Missing section: ${section}`);
  }

  const placeholderPatterns = [
    /\bTBD\b/i,
    /TODO-/i,
    /<[^>\n]+>/,
    /https:\/\/www\.youtube\.com\/watch\?v=VIDEO_ID/i,
    /https:\/\/github\.com\/OWNER\/REPO/i,
    /https:\/\/mirrorrun\.workers\.dev/i,
  ];
  for (const pattern of placeholderPatterns) {
    if (pattern.test(text)) blockers.push(`Submission still contains placeholder pattern: ${pattern}`);
  }

  const bannedFiller = [
    "seamless",
    "empower",
    "unlock the future",
    "next-generation",
    "revolutionary",
    "game-changing",
  ];
  const lower = text.toLowerCase();
  for (const word of bannedFiller) {
    if (lower.includes(word)) blockers.push(`Submission copy contains banned filler: ${word}`);
  }
}

for (const artifact of requiredArtifacts) {
  if (!existsSync(join(root, artifact))) blockers.push(`Missing artifact: ${artifact}`);
}

if (blockers.length) {
  console.error("Submission is not ready:");
  for (const blocker of blockers) console.error(`- ${blocker}`);
  process.exit(1);
}

console.log("Submission package ready.");
