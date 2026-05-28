import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { config as loadEnv } from "dotenv";
import OpenAI from "openai";

loadEnv({ path: ".env.local", override: false, quiet: true });
loadEnv({ path: ".dev.vars", override: false, quiet: true });

const manifestPath = resolve(process.argv[2] || "pitch/polish-combined/narration.json");
const manifest = JSON.parse(await import("node:fs/promises").then((fs) => fs.readFile(manifestPath, "utf8")));

const apiKey = process.env.STEP_API_KEY;
const baseURL = process.env.STEP_BASE_URL || "https://api.stepfun.com/v1";
const model = process.env.STEP_TTS_MODEL || "stepaudio-2.5-tts";
const voice = process.env.STEP_TTS_VOICE || "cixingnansheng";
const instruction =
  process.env.STEP_TTS_INSTRUCTION ||
  manifest.instruction ||
  "Confident, calm hackathon narration. Native English pronunciation for MirrorRun.";

if (!apiKey) {
  throw new Error("STEP_API_KEY missing. Add it to .env.local before rendering narration.");
}
if (model !== "stepaudio-2.5-tts") {
  throw new Error(`STEP_TTS_MODEL must stay stepaudio-2.5-tts, got ${model}.`);
}
if (!Array.isArray(manifest.chapters) || !manifest.chapters.length) {
  throw new Error("narration.json must contain chapters[].");
}

const client = new OpenAI({ apiKey, baseURL });

async function synthesize(chapter) {
  const outPath = resolve("pitch/polish-combined", chapter.out);
  await mkdir(dirname(outPath), { recursive: true });

  const response = await client.audio.speech.create({
    model,
    voice,
    input: chapter.text,
    response_format: "mp3",
    speed: 1,
    extra_body: {
      instruction: instruction.slice(0, 200),
      markdown_filter: true,
      sample_rate: 48000,
    },
  });
  const buffer = Buffer.from(await response.arrayBuffer());
  await writeFile(outPath, buffer);
  chapter.audio_path = chapter.out;
  chapter.generated = true;
  chapter.bytes = buffer.length;
  console.log(`rendered ${chapter.out} (${buffer.length} bytes)`);
}

for (const chapter of manifest.chapters) {
  await synthesize(chapter);
}

manifest.status = "pitch-narration-rendered";
manifest.model = model;
manifest.voice = `stepfun:${model}:${voice}`;
await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`updated ${manifestPath}`);
