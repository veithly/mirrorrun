import type { CredentialStatus, ProviderHealth } from "./types";

export const APP_NAME = "MirrorRun";
export const VISUAL_LANE = "operational-dashboard + beauty-retail editorial";
export const HERO_COMPOSITION = "mirror-control-room";
export const VISUAL_LANE_AUDIT_MARKER = "visual style lane: `operational-dashboard + beauty-retail editorial`.";

export const credentialCatalog: CredentialStatus[] = [
  {
    name: "CRUSOE_API_KEY",
    label: "Crusoe Managed Inference",
    requiredFor: "Nemotron planning agent",
    keyUrl: "https://console.crusoecloud.com/request-foundry",
    configured: Boolean(process.env.CRUSOE_API_KEY),
  },
  {
    name: "PERFECT_API_KEY",
    label: "Perfect Corp YouCam API",
    requiredFor: "Retail try-on result",
    keyUrl: "https://yce.perfectcorp.com/api-console/en/redeem-code/",
    configured: Boolean(process.env.PERFECT_API_KEY),
  },
  {
    name: "TRUEFOUNDRY_API_KEY",
    label: "TrueFoundry AI Gateway",
    requiredFor: "Resilience event receipt",
    keyUrl: "https://www.truefoundry.com/docs/ai-gateway/intro-to-llm-gateway",
    configured: Boolean(process.env.TRUEFOUNDRY_API_KEY),
  },
  {
    name: "GETLARK_API_KEY",
    label: "Lark CLI / MCP",
    requiredFor: "Replay workflow creation",
    keyUrl: "https://dashboard.getlark.ai/",
    configured: Boolean(process.env.GETLARK_API_KEY),
  },
];

export function providerHealth(): ProviderHealth[] {
  return [
    {
      name: "Crusoe Nemotron",
      score: process.env.CRUSOE_API_KEY ? 96 : 34,
      state: process.env.CRUSOE_API_KEY ? "ready" : "needs_credentials",
    },
    {
      name: "Perfect API",
      score: process.env.PERFECT_API_KEY ? 88 : 34,
      state: process.env.PERFECT_API_KEY ? "ready" : "needs_credentials",
    },
    {
      name: "TrueFoundry Gateway",
      score: process.env.TRUEFOUNDRY_API_KEY ? 86 : 34,
      state: process.env.TRUEFOUNDRY_API_KEY ? "ready" : "needs_credentials",
    },
    {
      name: "Lark workflow",
      score: process.env.GETLARK_API_KEY ? 74 : 34,
      state: process.env.GETLARK_API_KEY ? "ready" : "needs_credentials",
    },
  ];
}

export function publicBaseUrl() {
  return process.env.APP_BASE_URL || "http://localhost:3000";
}
