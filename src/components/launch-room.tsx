"use client";

import Image from "next/image";
import Link from "next/link";
import { Activity, Camera, FileCheck2, RefreshCw, ShieldCheck, WandSparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { ProviderHealthList, Timeline } from "./status";
import type { CredentialStatus, LaunchSession, ProviderHealth, SponsorActionResult } from "@/lib/types";

type ConfigPayload = {
  credentials: CredentialStatus[];
  providers: ProviderHealth[];
};

type AgentState = {
  text: string;
  busy: boolean;
  setupUrl?: string;
  error?: string;
};

async function json<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return (await res.json()) as T;
}

export function LaunchRoom() {
  const [session, setSession] = useState<LaunchSession | null>(null);
  const [config, setConfig] = useState<ConfigPayload | null>(null);
  const [agent, setAgent] = useState<AgentState>({ text: "", busy: false });
  const [notice, setNotice] = useState<SponsorActionResult | null>(null);
  const [currentStep, setStep] = useState(1);

  const latestImage = session?.tryOnResultUrl || session?.shopperImageUrl;
  const mobilePath = session?.id ? `/m/${encodeURIComponent(session.id)}` : "/m/new";

  useEffect(() => {
    json<ConfigPayload>("/api/config/status").then(setConfig).catch((error) => {
      setNotice({
        ok: false,
        status: "degraded",
        title: "Configuration check failed",
        detail: error instanceof Error ? error.message : "Unknown configuration error",
      });
    });
  }, []);

  async function refreshSession(id = session?.id) {
    if (!id) return;
    const payload = await json<{ session: LaunchSession }>(`/api/sessions/${encodeURIComponent(id)}`);
    setSession(payload.session);
  }

  async function startSession() {
    const payload = await json<{ session: LaunchSession }>("/api/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Spring Launch" }),
    });
    setSession(payload.session);
    setStep(2);
    setNotice(null);
  }

  async function runPerfect() {
    if (!session) return;
    const payload = await json<{ result: SponsorActionResult }>("/api/perfect/try-on", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId: session.id, styleBrief: session.styleBrief }),
    });
    setNotice(payload.result);
    await refreshSession(session.id);
    setStep(3);
  }

  async function streamAgentPlan() {
    if (!session) return;
    setAgent({ text: "", busy: true });
    const res = await fetch("/api/agent/plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId: session.id }),
    });

    const contentType = res.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      const body = (await res.json()) as SponsorActionResult;
      setAgent({ text: `${body.title}\n${body.detail}`, busy: false, setupUrl: body.setupUrl });
      await refreshSession(session.id);
      return;
    }

    const reader = res.body?.getReader();
    const decoder = new TextDecoder();
    if (!reader) {
      setAgent({ text: "Stream unavailable.", busy: false });
      return;
    }
    let text = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value);
      for (const line of chunk.split("\n")) {
        if (!line.startsWith("data:")) continue;
        const payload = JSON.parse(line.slice(5).trim()) as { delta?: string; error?: string };
        if (payload.delta) {
          text += payload.delta;
          setAgent({ text, busy: true });
        }
        if (payload.error) {
          setAgent({ text, busy: false, error: payload.error });
        }
      }
    }
    setAgent((prev) => ({ ...prev, busy: false }));
    await refreshSession(session.id);
    setStep(4);
  }

  async function triggerFault() {
    if (!session) return;
    const payload = await json<{ result: SponsorActionResult }>("/api/resilience/fault", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId: session.id }),
    });
    setNotice(payload.result);
    await refreshSession(session.id);
    setStep(5);
  }

  async function createReplay() {
    if (!session) return;
    const payload = await json<{ result: SponsorActionResult }>("/api/lark/workflows", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId: session.id }),
    });
    setNotice(payload.result);
    await refreshSession(session.id);
    setStep(6);
  }

  const checklist = useMemo(
    () => [
      { id: 1, label: "Step 1: create launch session", ready: Boolean(session) },
      { id: 2, label: "Step 2: capture shopper media", ready: Boolean(session?.shopperImageUrl) },
      { id: 3, label: "Step 3: attach retail result", ready: Boolean(session?.tryOnResultUrl) || notice?.status === "needs_credentials" },
      { id: 4, label: "Step 4: stream launch checklist", ready: Boolean(session?.recommendation) || Boolean(agent.text) },
      { id: 5, label: "Step 5: recover under fault", ready: session?.status === "recovered" },
      { id: 6, label: "Step 6: save replay workflow", ready: Boolean(session?.replayWorkflowId) || notice?.title.includes("Lark") },
    ],
    [agent.text, notice, session],
  );

  return (
    <main
      className="page-shell"
      data-visual-lane="operational-dashboard + beauty-retail editorial"
      data-hero-composition="mirror-control-room"
    >
      <section className="mb-8 flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="label">Launch control room</p>
          <h1 className="headline max-w-5xl">Try-on media, recovery proof, replay evidence.</h1>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="button" data-testid="start-session" disabled={!config} onClick={startSession}>
            <WandSparkles size={18} /> Start launch session
          </button>
          <Link className="secondary-button" data-testid="open-mobile-path" href={mobilePath}>
            <Camera size={18} /> Shopper path
          </Link>
        </div>
      </section>

      <section className="app-grid">
        <div className="panel mirror-stage">
          <div>
            <p className="label">Shopper upload</p>
            {latestImage ? (
              <Image className="result-image" src={latestImage} alt="Shopper launch input" width={640} height={420} unoptimized />
            ) : (
              <div className="photo-card" aria-label="Shopper input preview" />
            )}
          </div>
          <div>
            <p className="label">Recovered result</p>
            {session?.tryOnResultUrl ? (
              <Image className="result-image" src={session.tryOnResultUrl} alt="Retail visual result" width={640} height={420} unoptimized />
            ) : (
              <div className="photo-card" aria-label="Retail result preview" />
            )}
          </div>
          <div className="col-span-full grid gap-4 rounded-lg border border-white/15 bg-white/5 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="label">Session receipt</p>
                <strong>{session?.id || "No session yet"}</strong>
              </div>
              {session?.qrDataUrl && <Image src={session.qrDataUrl} alt="Shopper QR" width={96} height={96} />}
            </div>
            <p className="text-sm text-[#fff8ec]">
              {session ? "Scan the QR path, upload shopper media, then run the launch proof sequence." : "Create a launch session to begin."}
            </p>
          </div>
        </div>

        <aside className="side-stack grid gap-5">
          <section className="panel panel-pad">
            <p className="label">Provider health</p>
            <ProviderHealthList providers={config?.providers || []} />
          </section>
          <section className="panel panel-pad">
            <p className="label">Launch actions</p>
            <div className="grid gap-3">
              <button className="secondary-button" data-testid="run-perfect" disabled={!session} onClick={runPerfect}>
                <Camera size={18} /> Attach retail result
              </button>
              <button className="secondary-button" data-testid="run-agent" disabled={!session || agent.busy} onClick={streamAgentPlan}>
                <Activity size={18} /> Stream agent checklist
              </button>
              <button className="secondary-button" data-testid="trigger-fault" disabled={!session} onClick={triggerFault}>
                <ShieldCheck size={18} /> Trigger recovery
              </button>
              <button className="secondary-button" data-testid="create-replay" disabled={!session} onClick={createReplay}>
                <FileCheck2 size={18} /> Create Lark replay
              </button>
            </div>
          </section>
        </aside>
      </section>

      <section className="receipt-grid mt-8">
        <div className="panel panel-pad">
          <p className="label">Proof timeline</p>
          {session ? <Timeline events={session.timeline} /> : <p>Create a launch session to open the receipt timeline.</p>}
        </div>
        <div className="grid gap-5">
          <section className="panel panel-pad">
            <p className="label">Agent trace</p>
            <div className="proof-code" data-testid="agent-output">
              {agent.busy && <RefreshCw className="mr-2 inline animate-spin" size={15} />}
              {agent.text || "The Nemotron launch checklist appears here after CRUSOE_API_KEY is configured."}
            </div>
            {agent.setupUrl && (
              <a className="mt-3 inline-flex font-bold underline" href={agent.setupUrl} target="_blank">
                Open key page
              </a>
            )}
          </section>
          <section className="panel panel-pad">
            <p className="label">Launch steps</p>
            <div className="grid gap-2">
              {checklist.map((item) => (
                <div className="flex items-center justify-between gap-3" key={item.id}>
                  <span>{item.label}</span>
                  <span className={`pill px-3 py-1 text-sm ${item.ready ? "bg-[#2cbf8a]" : ""}`}>
                    {item.ready ? "ready" : currentStep >= item.id ? "active" : "waiting"}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>

      {notice && (
        <section className="credential-note mt-8" data-testid="notice-panel">
          <strong>{notice.title}</strong>
          <p>{notice.detail}</p>
          {notice.setupUrl && (
            <a className="font-bold underline" href={notice.setupUrl} target="_blank">
              Open setup page
            </a>
          )}
          {notice.command && <pre className="proof-code mt-3">{notice.command}</pre>}
        </section>
      )}

      <section className="mt-8 grid gap-3 md:grid-cols-4">
        {config?.credentials.map((item) => (
          <div className="panel panel-pad" key={item.name}>
            <p className="label">{item.label}</p>
            <strong>{item.configured ? "Configured" : "Needs key"}</strong>
            <p className="mt-2 text-sm">{item.requiredFor}</p>
            {!item.configured && (
              <a className="mt-3 inline-flex font-bold underline" href={item.keyUrl} target="_blank">
                Open dashboard
              </a>
            )}
          </div>
        ))}
      </section>
    </main>
  );
}
