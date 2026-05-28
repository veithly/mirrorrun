import { spawn, spawnSync } from "node:child_process";
import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { setTimeout as wait } from "node:timers/promises";
import { chromium } from "playwright";

const node = process.execPath;
const port = process.env.PORT || "3000";
const host = "127.0.0.1";
const baseURL = `http://${host}:${port}`;
const outputDir = join(process.cwd(), "docs", "screenshots");
const env = {
  ...process.env,
  PORT: port,
  PATH: `${process.execPath.replace(/\\node\.exe$/i, "")};${process.env.PATH || ""}`,
};

function killTree(child) {
  if (!child?.pid) return;
  if (process.platform === "win32") {
    spawnSync("taskkill", ["/pid", String(child.pid), "/T", "/F"], { stdio: "ignore" });
  } else {
    child.kill("SIGTERM");
  }
}

async function waitForServer(child) {
  const started = Date.now();
  while (Date.now() - started < 120_000) {
    if (child.exitCode !== null) {
      throw new Error(`Next dev server exited with code ${child.exitCode}`);
    }
    try {
      const response = await fetch(baseURL);
      if (response.ok) return;
    } catch {
      await wait(500);
    }
  }
  throw new Error("Next dev server did not become ready in 120s");
}

async function capture() {
  await mkdir(outputDir, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const shots = [
    { name: "hero.png", route: "/", viewport: { width: 1920, height: 1200 }, fullPage: false },
    { name: "flow.png", route: "/app", viewport: { width: 1920, height: 1200 }, fullPage: false },
    { name: "mobile.png", route: "/m/new", viewport: { width: 393, height: 852 }, isMobile: true, fullPage: true },
    { name: "architecture.png", route: "/about", viewport: { width: 1920, height: 1200 }, fullPage: false },
  ];

  try {
    for (const shot of shots) {
      const page = await browser.newPage({
        viewport: shot.viewport,
        isMobile: Boolean(shot.isMobile),
        deviceScaleFactor: shot.isMobile ? 2 : 1,
      });
      await page.goto(`${baseURL}${shot.route}`, { waitUntil: "networkidle" });
      await page.waitForTimeout(800);
      const filePath = join(outputDir, shot.name);
      await mkdir(dirname(filePath), { recursive: true });
      await page.screenshot({ path: filePath, fullPage: shot.fullPage });
      console.log(`captured ${filePath}`);
      await page.close();
    }
  } finally {
    await browser.close();
  }
}

const server = spawn(
  node,
  ["node_modules/next/dist/bin/next", "dev", "--webpack", "--hostname", host, "--port", port],
  {
    env,
    stdio: ["ignore", "pipe", "pipe"],
  },
);

server.stdout.on("data", (chunk) => process.stdout.write(`[next] ${chunk}`));
server.stderr.on("data", (chunk) => process.stderr.write(`[next] ${chunk}`));

let exitCode = 1;
try {
  await waitForServer(server);
  await capture();
  exitCode = 0;
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  exitCode = 1;
} finally {
  killTree(server);
}

process.exit(exitCode);
