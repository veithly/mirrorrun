import "dotenv/config";
import { existsSync, readFileSync } from "node:fs";

const required = [
  ["CRUSOE_API_KEY", "Crusoe Managed Inference"],
  ["PERFECT_API_KEY", "Perfect Corp YouCam API"],
  ["PERFECT_API_SECRET", "Perfect Corp API secret"],
  ["TRUEFOUNDRY_API_KEY", "TrueFoundry AI Gateway"],
  ["GETLARK_API_KEY", "Lark workflow"],
  ["STEP_API_KEY", "StepFun narration"],
];

const envText = [".env.local", ".dev.vars"]
  .filter((file) => existsSync(file))
  .map((file) => readFileSync(file, "utf8"))
  .join("\n");

function hasValue(name) {
  return Boolean(process.env[name]) || new RegExp(`^${name}=.+`, "m").test(envText);
}

const rows = required.map(([name, label]) => ({
  name,
  label,
  configured: hasValue(name),
}));

console.table(rows);
const missing = rows.filter((row) => !row.configured);
if (missing.length > 0) {
  console.log(`Missing required credentials: ${missing.map((row) => row.name).join(", ")}`);
  process.exitCode = 1;
}
