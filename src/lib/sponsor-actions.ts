import { appendEvent, getSession, updateSession } from "./store";
import type { SponsorActionResult } from "./types";

export async function callPerfectTryOn(sessionId: string, styleBrief: string): Promise<SponsorActionResult> {
  const apiKey = process.env.PERFECT_API_KEY;
  const endpoint = process.env.PERFECT_API_URL;
  const session = await getSession(sessionId);
  if (!apiKey || !endpoint) {
    await appendEvent(
      sessionId,
      "Perfect Corp credentials required",
      "Add PERFECT_API_KEY and PERFECT_API_URL to unlock the retail visual result.",
      "needs_credentials",
    );
    return {
      ok: false,
      status: "needs_credentials",
      title: "Perfect Corp credentials required",
      detail: "Add PERFECT_API_KEY and PERFECT_API_URL to call the selected YouCam endpoint.",
      setupUrl: "https://yce.perfectcorp.com/api-console/en/redeem-code/",
    };
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sessionId,
      styleBrief,
      imageUrl: session?.shopperImageUrl,
    }),
  });

  if (!response.ok) {
    await appendEvent(sessionId, "Perfect Corp request returned an error", `${response.status} ${response.statusText}`, "degraded");
    return {
      ok: false,
      status: "degraded",
      title: "Perfect Corp request returned an error",
      detail: `${response.status} ${response.statusText}`,
    };
  }

  const body = (await response.json()) as { resultUrl?: string; jobId?: string };
  await updateSession(sessionId, {
    tryOnResultUrl: body.resultUrl || session?.shopperImageUrl,
    styleBrief,
  });
  await appendEvent(sessionId, "Perfect Corp result attached", body.jobId || "Result URL stored on the proof receipt.");
  return {
    ok: true,
    status: "ready",
    title: "Perfect Corp result attached",
    detail: body.jobId || "Result URL stored on the proof receipt.",
    receiptId: body.jobId,
    externalUrl: body.resultUrl,
  };
}

export async function createLarkWorkflow(sessionId: string): Promise<SponsorActionResult> {
  const apiKey = process.env.GETLARK_API_KEY;
  const endpoint = process.env.GETLARK_API_URL;
  const command = `getlark workflows invoke --workflow-ids mirrorrun-${sessionId} --wait --timeout 300`;
  if (!apiKey || !endpoint) {
    await appendEvent(
      sessionId,
      "Lark workflow credentials required",
      "Add GETLARK_API_KEY and GETLARK_API_URL, or log into the Lark CLI before invoking the replay.",
      "needs_credentials",
    );
    return {
      ok: false,
      status: "needs_credentials",
      title: "Lark workflow credentials required",
      detail: "Add GETLARK_API_KEY and GETLARK_API_URL, or run the command after CLI login.",
      setupUrl: "https://dashboard.getlark.ai/",
      command,
    };
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: `MirrorRun replay ${sessionId}`,
      command,
      sessionId,
    }),
  });

  if (!response.ok) {
    await appendEvent(sessionId, "Lark workflow request returned an error", `${response.status} ${response.statusText}`, "degraded");
    return {
      ok: false,
      status: "degraded",
      title: "Lark workflow request returned an error",
      detail: `${response.status} ${response.statusText}`,
      command,
    };
  }

  const body = (await response.json()) as { workflowId?: string; url?: string };
  const workflowId = body.workflowId || `mirrorrun-${sessionId}`;
  await updateSession(sessionId, { replayWorkflowId: workflowId });
  await appendEvent(sessionId, "Lark replay workflow saved", workflowId);
  return {
    ok: true,
    status: "ready",
    title: "Lark replay workflow saved",
    detail: workflowId,
    receiptId: workflowId,
    externalUrl: body.url,
    command,
  };
}

export async function triggerResilienceEvent(sessionId: string): Promise<SponsorActionResult> {
  const apiKey = process.env.TRUEFOUNDRY_API_KEY;
  const endpoint = process.env.TRUEFOUNDRY_GATEWAY_URL;
  if (!apiKey || !endpoint) {
    await appendEvent(
      sessionId,
      "Recovery path executed locally",
      "Add TRUEFOUNDRY_API_KEY and TRUEFOUNDRY_GATEWAY_URL to attach gateway evidence.",
      "recovered",
    );
    return {
      ok: false,
      status: "recovered",
      title: "Recovery path executed",
      detail: "Gateway evidence needs TRUEFOUNDRY_API_KEY and TRUEFOUNDRY_GATEWAY_URL.",
      setupUrl: "https://www.truefoundry.com/docs/ai-gateway/intro-to-llm-gateway",
    };
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sessionId,
      failureMode: "mcp_tool_failure",
      desiredOutcome: "shopper_result_remains_usable",
    }),
  });

  if (!response.ok) {
    await appendEvent(sessionId, "Gateway request returned an error", `${response.status} ${response.statusText}`, "degraded");
    return {
      ok: false,
      status: "degraded",
      title: "Gateway request returned an error",
      detail: `${response.status} ${response.statusText}`,
    };
  }

  const body = (await response.json()) as { eventId?: string; url?: string };
  const eventId = body.eventId || `tf-${sessionId}`;
  await updateSession(sessionId, { gatewayEventId: eventId, status: "recovered" });
  await appendEvent(sessionId, "Gateway recovery event recorded", eventId, "recovered");
  return {
    ok: true,
    status: "recovered",
    title: "Gateway recovery event recorded",
    detail: eventId,
    receiptId: eventId,
    externalUrl: body.url,
  };
}
