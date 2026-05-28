import { spawn } from "node:child_process";
import { createWriteStream, existsSync } from "node:fs";
import { mkdir, rename, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { chromium } from "playwright";

const port = process.env.PORT || "3000";
const baseURL = process.env.PLAYWRIGHT_BASE_URL || `http://localhost:${port}`;
const recordingDir = join(process.cwd(), "pitch", "recording");
const tmpDir = join(recordingDir, ".tmp");
const rawPath = join(recordingDir, "raw.webm");
const cuesPath = join(recordingDir, "cues.json");

async function isMirrorRunUp() {
  try {
    const response = await fetch(baseURL);
    const text = await response.text();
    return response.ok && text.includes("MirrorRun");
  } catch {
    return false;
  }
}

async function waitForServer() {
  const started = Date.now();
  while (Date.now() - started < 45_000) {
    if (await isMirrorRunUp()) return;
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  throw new Error(`Timed out waiting for ${baseURL}`);
}

async function prewarm() {
  for (const route of ["/", "/app", "/m/new", "/about", "/app/replays"]) {
    try {
      await fetch(`${baseURL}${route}`);
    } catch {
      // The browser pass below is authoritative. Prewarm is best-effort only.
    }
  }
}

await mkdir(recordingDir, { recursive: true });
await mkdir(tmpDir, { recursive: true });

let serverProcess;
if (!(await isMirrorRunUp())) {
  const out = createWriteStream(join(recordingDir, "next-record.out.log"), { flags: "a" });
  const err = createWriteStream(join(recordingDir, "next-record.err.log"), { flags: "a" });
  serverProcess = spawn(process.execPath, ["node_modules/next/dist/bin/next", "dev", "--webpack", "-p", port], {
    cwd: process.cwd(),
    stdio: ["ignore", "pipe", "pipe"],
    windowsHide: true,
  });
  serverProcess.stdout.pipe(out);
  serverProcess.stderr.pipe(err);
  await waitForServer();
}

await prewarm();

const browser = await chromium.launch({
  headless: true,
  args: ["--window-size=1920,1200", "--hide-scrollbars", "--force-device-scale-factor=1"],
});

const cues = [];
const startedAt = Date.now();

function mark(id, extra = {}) {
  cues.push({
    id,
    at_ms: Date.now() - startedAt,
    ...extra,
  });
}

async function settle(page, ms = 850) {
  await page.mouse.move(300, 260, { steps: 12 });
  await page.waitForLoadState("networkidle").catch(() => undefined);
  await page.waitForTimeout(ms);
}

try {
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1200 },
    deviceScaleFactor: 1,
    recordVideo: { dir: tmpDir, size: { width: 1920, height: 1200 } },
  });
  const page = await context.newPage();
  const video = page.video();

  page.on("console", (message) => {
    if (message.type() === "error") console.error(`[browser] ${message.text()}`);
  });

  await page.goto(`${baseURL}/`, { waitUntil: "networkidle" });
  mark("01_landing", { url: page.url() });
  await settle(page, 900);

  await page.getByTestId("enter-app").click();
  await page.getByRole("heading", { name: /Try-on media/ }).waitFor();
  await page.waitForResponse((response) => response.url().includes("/api/config/status")).catch(() => undefined);
  await page.waitForFunction(() => {
    const button = document.querySelector("[data-testid='start-session']");
    return Boolean(button && !button.disabled);
  });
  mark("02_launch_room", { url: page.url() });
  await settle(page, 900);

  await page.getByTestId("start-session").click();
  await page.getByText(/MR-\d{3}-/).first().waitFor();
  const receiptText = (await page.getByText(/MR-\d{3}-/).first().textContent()) || "";
  const sessionId = receiptText.match(/MR-\d{3}-[A-Z0-9]+/)?.[0] || "";
  mark("03_session_created", { sessionId });
  await settle(page, 900);

  await page.getByTestId("run-perfect").click();
  await page.getByTestId("notice-panel").waitFor();
  mark("04_perfect_or_blocker", { sessionId });
  await settle(page, 900);

  await page.getByTestId("run-agent").click();
  await page.getByTestId("agent-output").waitFor();
  mark("05_agent_or_blocker", { sessionId });
  await settle(page, 900);

  await page.getByTestId("trigger-fault").click();
  await page.getByText(/Recovery|recovered|fault/i).first().waitFor({ timeout: 10_000 }).catch(() => undefined);
  mark("06_recovery_event", { sessionId });
  await settle(page, 900);

  await page.getByTestId("create-replay").click();
  await page.getByTestId("notice-panel").waitFor();
  mark("07_lark_or_blocker", { sessionId });
  await settle(page, 900);

  if (sessionId) {
    await page.goto(`${baseURL}/m/${encodeURIComponent(sessionId)}`, { waitUntil: "networkidle" });
    await page.getByRole("heading", { name: "Try the launch look" }).waitFor();
    mark("08_mobile_path", { sessionId, url: page.url() });
    await settle(page, 900);

    await page.goto(`${baseURL}/app/session/${encodeURIComponent(sessionId)}`, { waitUntil: "networkidle" });
    mark("09_receipt_detail", { sessionId, url: page.url() });
    await settle(page, 1100);
  }

  await context.close();
  const tmpVideoPath = await video.path();
  if (existsSync(rawPath)) {
    await rename(rawPath, join(recordingDir, `raw-${Date.now()}.webm`));
  }
  await rename(tmpVideoPath, rawPath);
  await writeFile(
    cuesPath,
    JSON.stringify(
      {
        schema: "mirrorrun.recording-cues.v1",
        baseURL,
        status: "honest-blocker-capture-until-sponsor-keys-are-installed",
        width: 1920,
        height: 1200,
        started_at: new Date(startedAt).toISOString(),
        cues,
      },
      null,
      2,
    ),
  );
  console.log(`recorded ${rawPath}`);
  console.log(`wrote ${cuesPath}`);
} finally {
  await browser.close();
  if (serverProcess && !serverProcess.killed) serverProcess.kill();
}
