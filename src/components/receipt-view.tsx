import Link from "next/link";
import { Timeline } from "./status";
import type { LaunchSession } from "@/lib/types";

export function ReceiptView({ session }: { session: LaunchSession }) {
  const command = `getlark workflows invoke --workflow-ids mirrorrun-${session.id} --wait --timeout 300`;

  return (
    <main
      className="page-shell"
      data-visual-lane="operational-dashboard + beauty-retail editorial"
      data-hero-composition="mirror-control-room"
    >
      <section className="mb-8 flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="label">Proof receipt</p>
          <h1 className="headline max-w-5xl">{session.id}</h1>
        </div>
        <Link className="button" href="/app">
          Back to launch room
        </Link>
      </section>

      <section className="receipt-grid">
        <div className="panel panel-pad">
          <p className="label">Timeline</p>
          <Timeline events={session.timeline} />
        </div>
        <div className="grid gap-5">
          <div className="panel panel-pad">
            <p className="label">Artifacts</p>
            <div className="grid gap-3">
              <div className="status-row">
                <span className="status-dot" />
                <span>Shopper media</span>
                <strong>{session.shopperImageUrl ? "stored" : "waiting"}</strong>
              </div>
              <div className="status-row">
                <span className="status-dot" />
                <span>Retail result</span>
                <strong>{session.tryOnResultUrl ? "attached" : "credentials"}</strong>
              </div>
              <div className="status-row">
                <span className="status-dot warn" />
                <span>Gateway event</span>
                <strong>{session.gatewayEventId || "pending"}</strong>
              </div>
              <div className="status-row">
                <span className="status-dot" />
                <span>Lark replay</span>
                <strong>{session.replayWorkflowId || `mirrorrun-${session.id}`}</strong>
              </div>
            </div>
          </div>
          <div className="panel panel-pad">
            <p className="label">Replay command</p>
            <pre className="proof-code">{command}</pre>
          </div>
        </div>
      </section>
    </main>
  );
}
