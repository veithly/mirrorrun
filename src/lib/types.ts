export type CredentialStatus = {
  name: string;
  label: string;
  requiredFor: string;
  keyUrl: string;
  configured: boolean;
};

export type ProviderHealth = {
  name: string;
  score: number;
  state: "ready" | "needs_credentials" | "degraded" | "recovered";
};

export type TimelineEvent = {
  id: string;
  title: string;
  detail: string;
  state: "ready" | "needs_credentials" | "degraded" | "recovered";
  createdAt: string;
};

export type LaunchSession = {
  id: string;
  name: string;
  createdAt: string;
  mobileUrl: string;
  qrDataUrl: string;
  status: "draft" | "active" | "recovered";
  styleBrief: string;
  shopperImageUrl?: string;
  tryOnResultUrl?: string;
  recommendation?: string;
  replayWorkflowId?: string;
  gatewayEventId?: string;
  timeline: TimelineEvent[];
};

export type SponsorActionResult = {
  ok: boolean;
  status: "ready" | "needs_credentials" | "degraded" | "recovered";
  title: string;
  detail: string;
  receiptId?: string;
  externalUrl?: string;
  setupUrl?: string;
  command?: string;
};
