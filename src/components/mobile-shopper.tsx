"use client";

import { Camera, Sparkles } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { LaunchSession, SponsorActionResult } from "@/lib/types";

type Props = {
  sessionId: string;
};

export function MobileShopper({ sessionId }: Props) {
  const router = useRouter();
  const [session, setSession] = useState<LaunchSession | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [styleBrief, setStyleBrief] = useState("polished launch look");
  const [notice, setNotice] = useState<SponsorActionResult | null>(null);
  const [busy, setBusy] = useState(false);
  const [currentStep, setStep] = useState(1);

  useEffect(() => {
    let active = true;

    async function loadSession() {
      if (sessionId === "new") {
        const created = await fetch("/api/sessions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: "Mobile Launch" }),
        });
        const body = (await created.json()) as { session: LaunchSession };
        if (!active) return;
        router.replace(`/m/${encodeURIComponent(body.session.id)}`);
        setSession(body.session);
        return;
      }
      const res = await fetch(`/api/sessions/${encodeURIComponent(sessionId)}`);
      if (res.ok) {
        const body = (await res.json()) as { session: LaunchSession };
        if (active) setSession(body.session);
      }
    }

    void loadSession();
    return () => {
      active = false;
    };
  }, [router, sessionId]);

  async function refresh() {
    const res = await fetch(`/api/sessions/${encodeURIComponent(sessionId)}`);
    if (res.ok) {
      const body = (await res.json()) as { session: LaunchSession };
      setSession(body.session);
    }
  }

  async function uploadAndRun() {
    if (!file) return;
    setBusy(true);
    const form = new FormData();
    form.set("sessionId", sessionId);
    form.set("file", file);
    await fetch("/api/media/upload", { method: "POST", body: form });
    setStep(2);
    const response = await fetch("/api/perfect/try-on", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId, styleBrief }),
    });
    const payload = (await response.json()) as { result: SponsorActionResult };
    setNotice(payload.result);
    await refresh();
    setStep(3);
    setBusy(false);
  }

  return (
    <main
      className="page-shell mobile-shell"
      data-visual-lane="operational-dashboard + beauty-retail editorial"
      data-hero-composition="mirror-control-room"
    >
      <section className="panel panel-pad">
        <p className="label">Shopper path</p>
        <h1 className="mb-3 text-4xl font-black leading-none">Try the launch look</h1>
        <p className="mb-5 text-[#62584f]">
          Upload a photo, choose a style brief, and keep the result even if the agent needs to recover.
        </p>
        <div className="photo-card mb-5 min-h-[280px]">
          {session?.shopperImageUrl && (
            <Image
              className="result-image h-[280px]"
              src={session.shopperImageUrl}
              alt="Uploaded shopper input"
              width={390}
              height={280}
              unoptimized
            />
          )}
        </div>
        <div className="grid gap-4">
          <label className="field">
            <span className="label">Style brief</span>
            <select value={styleBrief} onChange={(event) => setStyleBrief(event.target.value)} data-testid="style-brief">
              <option>polished launch look</option>
              <option>evening campaign look</option>
              <option>clean skincare look</option>
            </select>
          </label>
          <label className="field">
            <span className="label">Photo</span>
            <input data-testid="shopper-file" type="file" accept="image/*" onChange={(event) => setFile(event.target.files?.[0] || null)} />
          </label>
          <button className="button" data-testid="mobile-primary-action" disabled={!file || busy} onClick={uploadAndRun}>
            {busy ? <Sparkles size={18} /> : <Camera size={18} />} Upload and run
          </button>
        </div>
      </section>

      <section className="panel panel-pad mt-6">
        <p className="label">Recovery proof</p>
        <strong>{currentStep >= 3 ? "Ready" : "Waiting"}</strong>
        <p className="mt-2">{notice?.detail || "The proof receipt will show the result and any credential blocker."}</p>
      </section>
    </main>
  );
}
