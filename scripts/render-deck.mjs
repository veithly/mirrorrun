import { mkdir } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import { join } from "node:path";
import { chromium } from "playwright";

const deckPath = join(process.cwd(), "pitch", "deck.html");
const deckURL = pathToFileURL(deckPath).href;
const outputPdf = join(process.cwd(), "pitch", "deck.pdf");
const outputDir = join(process.cwd(), "pitch", "deck-thumbs");

await mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1200 },
    deviceScaleFactor: 1,
  });

  await page.goto(deckURL, { waitUntil: "networkidle" });
  await page.emulateMedia({ media: "screen" });

  const slides = await page.locator(".slide").all();
  for (let i = 0; i < slides.length; i++) {
    const file = join(outputDir, `slide-${String(i + 1).padStart(2, "0")}.png`);
    await slides[i].screenshot({ path: file });
    console.log(`rendered ${file}`);
  }

  await page.pdf({
    path: outputPdf,
    width: "1920px",
    height: "1200px",
    printBackground: true,
    preferCSSPageSize: false,
  });
  console.log(`rendered ${outputPdf}`);
} finally {
  await browser.close();
}
