import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const compositionPath = resolve("pitch/polish-combined/index.html");
const narrationPath = resolve("pitch/polish-combined/narration.json");
const html = readFileSync(compositionPath, "utf8");
const rootDir = dirname(compositionPath);
const blockers = [];

if (!html.includes('data-composition-id="root"')) blockers.push("Missing root composition id.");
if (/<audio\b/i.test(html)) blockers.push("Composition must be visual-only; remove audio tags.");
if (!html.includes("window.__timelines")) blockers.push("Missing HyperFrames timeline registry.");

const clipRegex = /<(?<tag>div|img|video)[^>]*data-start="(?<start>[^"]+)"[^>]*data-duration="(?<duration>[^"]+)"[^>]*data-track-index="(?<track>[^"]+)"[^>]*>/gi;
const clips = [];
for (const match of html.matchAll(clipRegex)) {
  const raw = match[0];
  const id = raw.match(/\sid="([^"]+)"/)?.[1] || "";
  const src = raw.match(/\ssrc="([^"]+)"/)?.[1] || "";
  const start = Number(match.groups.start);
  const duration = Number(match.groups.duration);
  const track = Number(match.groups.track);
  clips.push({ id, src, start, duration, end: start + duration, track });
  if (!id) blockers.push(`Timed clip missing id: ${raw.slice(0, 120)}`);
  if (!Number.isFinite(start)) blockers.push(`Clip ${id || raw.slice(0, 30)} has invalid data-start.`);
  if (!Number.isFinite(duration) || duration <= 0) blockers.push(`Clip ${id || raw.slice(0, 30)} has invalid data-duration.`);
  if (!Number.isInteger(track)) blockers.push(`Clip ${id || raw.slice(0, 30)} has invalid data-track-index.`);
}

if (!clips.length) blockers.push("No timed clips found.");

for (const clip of clips) {
  if (clip.src && !clip.src.startsWith("http")) {
    const target = resolve(rootDir, clip.src);
    if (!existsSync(target)) blockers.push(`Clip ${clip.id} references missing asset: ${clip.src}`);
  }
}

const byTrack = new Map();
for (const clip of clips) {
  const list = byTrack.get(clip.track) || [];
  list.push(clip);
  byTrack.set(clip.track, list);
}

for (const [track, list] of byTrack) {
  const sorted = list.sort((a, b) => a.start - b.start);
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i].start < sorted[i - 1].end) {
      blockers.push(`Track ${track} overlap: ${sorted[i - 1].id} overlaps ${sorted[i].id}.`);
    }
  }
}

const durationMatch = html.match(/data-composition-id="root"[^>]*data-duration="([^"]+)"/);
const rootDuration = Number(durationMatch?.[1]);
if (!Number.isFinite(rootDuration) || rootDuration <= 0) blockers.push("Root duration is invalid.");
const lastEnd = clips.reduce((max, clip) => Math.max(max, clip.end), 0);
if (rootDuration && Math.abs(rootDuration - lastEnd) > 0.001) {
  blockers.push(`Root duration ${rootDuration}s does not match final clip end ${lastEnd}s.`);
}

if (!existsSync(narrationPath)) {
  blockers.push("Missing pitch/polish-combined/narration.json.");
} else {
  const narration = JSON.parse(readFileSync(narrationPath, "utf8"));
  if (narration.model !== "stepaudio-2.5-tts") {
    blockers.push(`Narration model must be stepaudio-2.5-tts, got ${narration.model || "missing"}.`);
  }
  if (!Array.isArray(narration.chapters) || !narration.chapters.length) {
    blockers.push("Narration manifest must contain chapters[].");
  } else {
    for (const chapter of narration.chapters) {
      if (!chapter.id || !chapter.text || !chapter.out) {
        blockers.push(`Narration chapter is incomplete: ${JSON.stringify(chapter)}`);
        continue;
      }
      const audioPath = resolve("pitch/polish-combined", chapter.out);
      if (!existsSync(audioPath)) blockers.push(`Narration audio missing for ${chapter.id}: ${chapter.out}`);
      if (chapter.generated !== true) blockers.push(`Narration chapter not marked generated: ${chapter.id}`);
      if (!Number.isFinite(chapter.bytes) || chapter.bytes < 10_000) {
        blockers.push(`Narration chapter has implausible byte count: ${chapter.id}`);
      }
    }
  }
}

if (blockers.length) {
  console.error("Combined composition is not ready:");
  for (const blocker of blockers) console.error(`- ${blocker}`);
  process.exit(1);
}

console.log(`Combined composition ok: ${clips.length} clips, ${rootDuration}s.`);
