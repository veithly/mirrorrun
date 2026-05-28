import { spawn, spawnSync } from "node:child_process";
import { setTimeout as wait } from "node:timers/promises";

const node = process.execPath;
const port = process.env.PORT || "3000";
const baseURL = `http://127.0.0.1:${port}`;
const env = {
  ...process.env,
  PORT: port,
  PLAYWRIGHT_BASE_URL: baseURL,
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

const server = spawn(
  node,
  ["node_modules/next/dist/bin/next", "dev", "--webpack", "--hostname", "127.0.0.1", "--port", port],
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
  const test = spawn(node, ["node_modules/@playwright/test/cli.js", "test", "--reporter=list"], {
    env: { ...env, PLAYWRIGHT_EXTERNAL_SERVER: "1" },
    stdio: "inherit",
  });
  exitCode = await new Promise((resolve) => test.on("exit", (code) => resolve(code ?? 1)));
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  exitCode = 1;
} finally {
  killTree(server);
}

process.exit(exitCode);
