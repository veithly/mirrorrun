import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { chromium } from "playwright";

const baseURL = (process.env.PRODUCTION_URL || process.argv[2] || "").replace(/\/$/, "");
if (!baseURL) {
  console.error("Usage: node scripts/smoke-production.mjs https://<worker>.workers.dev");
  process.exit(1);
}

const evidenceDir = join(process.cwd(), "pitch", "visual-qa");
const routes = ["/", "/app", "/m/demo-smoke", "/app/replays", "/about"];

async function httpSmoke() {
  const results = [];
  for (const route of routes) {
    const url = `${baseURL}${route}`;
    try {
      const response = await fetch(url, { redirect: "follow" });
      const text = await response.text();
      results.push({
        route,
        status: response.status,
        ok: response.ok,
        bytes: text.length,
        title: text.match(/<title>(.*?)<\/title>/i)?.[1] ?? "",
      });
    } catch (error) {
      results.push({
        route,
        status: 0,
        ok: false,
        bytes: 0,
        title: error instanceof Error ? error.message : String(error),
      });
    }
  }
  return results;
}

async function browserSmoke() {
  const browser = await chromium.launch({ headless: true });
  const consoleMessages = [];
  const pages = [];
  try {
    const home = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    home.on("console", (message) => {
      if (["error", "warning"].includes(message.type())) {
        consoleMessages.push(`${message.type()}: ${message.text()}`);
      }
    });
    home.on("pageerror", (error) => consoleMessages.push(`pageerror: ${error.message}`));
    await home.goto(baseURL, { waitUntil: "networkidle", timeout: 45_000 });
    await home.screenshot({ path: join(evidenceDir, "prod-home.png"), fullPage: true });
    const homeText = await home.locator("body").innerText();
    const firstLinks = await home.locator("a, button").evaluateAll((elements) =>
      elements
        .slice(0, 20)
        .map((element) => ({
          tag: element.tagName.toLowerCase(),
          text: (element.innerText || element.getAttribute("aria-label") || "").trim(),
          href: element instanceof HTMLAnchorElement ? element.href : "",
        }))
        .filter((item) => item.text || item.href),
    );
    pages.push({
      route: "/",
      title: await home.title(),
      containsMirrorRun: homeText.includes("MirrorRun"),
      containsLaunchCopy: /launch|Launch|retail/i.test(homeText),
      firstLinks,
    });
    await home.close();

    const app = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    app.on("console", (message) => {
      if (["error", "warning"].includes(message.type())) {
        consoleMessages.push(`${message.type()}: ${message.text()}`);
      }
    });
    app.on("pageerror", (error) => consoleMessages.push(`pageerror: ${error.message}`));
    await app.goto(`${baseURL}/app`, { waitUntil: "networkidle", timeout: 45_000 });
    await app.screenshot({ path: join(evidenceDir, "prod-app.png"), fullPage: true });
    const appText = await app.locator("body").innerText();
    const clickTarget = app.locator("button:visible, a:visible").first();
    let clickResult = null;
    if (await clickTarget.count()) {
      const label =
        (await clickTarget.innerText().catch(() => "")) ||
        (await clickTarget.getAttribute("aria-label").catch(() => "")) ||
        "unlabelled";
      await clickTarget.click({ timeout: 10_000 });
      await app.waitForTimeout(700);
      clickResult = { label: label.trim(), urlAfterClick: app.url() };
    }
    pages.push({
      route: "/app",
      title: await app.title(),
      containsSessionCopy: /session|launch|trace/i.test(appText),
      containsHonestKeyState: /key|missing|configured|blocked/i.test(appText),
      clickResult,
    });
    await app.close();
  } finally {
    await browser.close();
  }
  return { pages, consoleMessages };
}

await mkdir(evidenceDir, { recursive: true });
const http = await httpSmoke();
const browser = await browserSmoke();
const report = {
  baseURL,
  checkedAt: new Date().toISOString(),
  http,
  browser,
};

report.passed =
  http.every((item) => item.ok && item.bytes > 1_000) &&
  browser.pages.every((page) => page.title === "MirrorRun") &&
  browser.consoleMessages.length === 0;

await writeFile(join(evidenceDir, "prod-smoke.json"), `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report, null, 2));

if (!report.passed) {
  process.exit(1);
}
