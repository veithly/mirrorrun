import Link from "next/link";
import { Boxes, Braces, Cloud, KeyRound } from "lucide-react";

const layers = [
  ["Retail media", "Mobile shopper upload is stored as a receipt artifact and sent to the Perfect Corp adapter when keys exist."],
  ["Planning agent", "Crusoe Managed Inference streams a launch checklist through an OpenAI-compatible SSE route."],
  ["Recovery proof", "TrueFoundry Gateway records the fault event; local execution still shows the credential blocker honestly."],
  ["Replay workflow", "Lark workflow IDs and commands are stored on the receipt so the demo can be replayed by judges."],
];

export default function AboutPage() {
  return (
    <main
      className="page-shell"
      data-visual-lane="operational-dashboard + beauty-retail editorial"
      data-hero-composition="mirror-control-room"
    >
      <section className="mb-10">
        <p className="label">Architecture</p>
        <h1 className="headline max-w-6xl">A sponsor-first launch proof system.</h1>
        <p className="lede">
          MirrorRun is designed around inspectable receipts: every useful sponsor integration either produces a job id,
          stream, workflow id, gateway event, or a clear key-required state.
        </p>
      </section>

      <section className="diagram-panel panel panel-pad">
        <div className="diagram-node">
          <KeyRound /> Browser key setup
        </div>
        <div className="diagram-node">
          <Boxes /> Launch session
        </div>
        <div className="diagram-node">
          <Braces /> Sponsor adapters
        </div>
        <div className="diagram-node">
          <Cloud /> D1/R2 or local store
        </div>
      </section>

      <section className="mt-10 grid gap-5 md:grid-cols-2">
        {layers.map(([title, body]) => (
          <article className="panel panel-pad" key={title}>
            <p className="label">{title}</p>
            <p className="text-lg font-black leading-tight">{body}</p>
          </article>
        ))}
      </section>

      <section className="mt-10 credential-note">
        <strong>Key handling</strong>
        <p>
          Secrets are expected in <code>.env.local</code>, <code>.dev.vars</code>, and Wrangler secret storage. The UI never asks judges to
          paste a sponsor key into a public field.
        </p>
        <Link className="mt-3 inline-flex font-bold underline" href="/app">
          Return to launch room
        </Link>
      </section>
    </main>
  );
}
