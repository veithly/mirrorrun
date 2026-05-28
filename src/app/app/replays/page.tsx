import Link from "next/link";
import { FileCheck2 } from "lucide-react";
import { listSessions } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function ReplaysPage() {
  const sessions = await listSessions();
  return (
    <main
      className="page-shell"
      data-visual-lane="operational-dashboard + beauty-retail editorial"
      data-hero-composition="mirror-control-room"
    >
      <section className="mb-8 flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="label">Replay ledger</p>
          <h1 className="headline max-w-5xl">Receipts judges can replay.</h1>
        </div>
        <Link className="button" href="/app">
          <FileCheck2 size={18} /> New session
        </Link>
      </section>

      <section className="grid gap-5">
        {sessions.length === 0 && (
          <div className="panel panel-pad">
            <p className="label">No receipts yet</p>
            <p>Open the launch room and create the first session.</p>
          </div>
        )}
        {sessions.map((session) => (
          <Link className="panel panel-pad replay-row" href={`/app/session/${encodeURIComponent(session.id)}`} key={session.id}>
            <div>
              <p className="label">{new Date(session.createdAt).toLocaleString()}</p>
              <strong>{session.id}</strong>
            </div>
            <span>{session.status}</span>
            <span>{session.timeline.length} events</span>
          </Link>
        ))}
      </section>
    </main>
  );
}
