import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileCheck2, ShieldCheck, Sparkles } from "lucide-react";

const signals = [
  ["00: shopper", "QR upload and style brief enter the session receipt."],
  ["01: try-on", "Perfect Corp result attaches to the launch timeline."],
  ["02: agent", "Crusoe Nemotron streams operator checks."],
  ["03: proof", "TrueFoundry and Lark keep recovery evidence replayable."],
];

export default function HomePage() {
  return (
    <main
      className="page-shell"
      data-visual-lane="operational-dashboard + beauty-retail editorial"
      data-hero-composition="mirror-control-room"
    >
      <section className="hero-grid">
        <div>
          <p className="label">DevNetwork AI + ML Hackathon 2026</p>
          <h1 className="headline">MirrorRun</h1>
          <p className="lede">
            A live retail launch room that turns try-on media, agent planning, fault recovery, and replay workflows into one
            receipt judges can inspect.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link className="button" href="/app" data-testid="enter-app">
              <Sparkles size={18} /> Open launch room
            </Link>
            <Link className="secondary-button" href="/about">
              <FileCheck2 size={18} /> Architecture
            </Link>
          </div>
        </div>
        <div className="panel hero-visual">
          <Image
            src="/art/hero-retail-control-room.png"
            alt="Retail mirror and launch control room"
            width={1100}
            height={850}
            priority
          />
          <div className="hero-proof-strip">
            <span>
              <ShieldCheck size={16} /> fault receipt
            </span>
            <span>QR mobile path</span>
            <span>streaming agent</span>
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-5 md:grid-cols-4">
        {signals.map(([title, detail]) => (
          <article className="panel panel-pad" key={title}>
            <p className="label">{title}</p>
            <p className="text-lg font-black leading-tight">{detail}</p>
          </article>
        ))}
      </section>

      <section className="mt-10 panel panel-pad proof-band">
        <div>
          <p className="label">Winning angle</p>
          <h2 className="section-title">Sponsor APIs are not decoration. They become evidence.</h2>
        </div>
        <Link className="button" href="/app">
          Run the flow <ArrowRight size={18} />
        </Link>
      </section>
    </main>
  );
}
