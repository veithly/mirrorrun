import { mkdir } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import { join } from "node:path";
import { chromium } from "playwright";

const compositionPath = join(process.cwd(), "pitch", "polish-combined", "index.html");
const outDir = join(process.cwd(), "pitch", "polish-combined", "contact-sheet");
const samples = [2, 34, 72, 130, 186, 224, 246];

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1920, height: 1200 }, deviceScaleFactor: 1 });
  await page.goto(pathToFileURL(compositionPath).href, { waitUntil: "networkidle" });

  for (const seconds of samples) {
    await page.evaluate((time) => {
      const clips = Array.from(document.querySelectorAll(".plate"));
      for (const clip of clips) {
        const start = Number(clip.getAttribute("data-start") || 0);
        const duration = Number(clip.getAttribute("data-duration") || 0);
        const active = time >= start && time < start + duration;
        clip.classList.toggle("is-visible", active);
        clip.style.opacity = active ? "1" : "0";
      }
    }, seconds);
    const file = join(outDir, `t-${String(seconds).padStart(3, "0")}.png`);
    await page.screenshot({ path: file });
    console.log(`captured ${file}`);
  }
} finally {
  await browser.close();
}
