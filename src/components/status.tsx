import type { ProviderHealth, TimelineEvent } from "@/lib/types";

export function StateDot({ state }: { state: TimelineEvent["state"] | ProviderHealth["state"] }) {
  const tone = state === "degraded" || state === "needs_credentials" ? "alert" : state === "recovered" ? "warn" : "";
  return <span className={`status-dot ${tone}`} aria-hidden="true" />;
}

export function Timeline({ events }: { events: TimelineEvent[] }) {
  return (
    <div>
      {events.map((item) => (
        <div className="status-row" key={item.id}>
          <StateDot state={item.state} />
          <div>
            <div>{item.title}</div>
            <small>{item.detail}</small>
          </div>
          <small>{new Date(item.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</small>
        </div>
      ))}
    </div>
  );
}

export function ProviderHealthList({ providers }: { providers: ProviderHealth[] }) {
  return (
    <div className="grid gap-4">
      {providers.map((provider) => (
        <div className="grid gap-2" key={provider.name}>
          <div className="flex items-center justify-between gap-3 text-sm font-bold">
            <span>{provider.name}</span>
            <span>{provider.state.replace("_", " ")}</span>
          </div>
          <div className={`health-bar ${provider.state === "needs_credentials" ? "alert" : ""}`}>
            <span style={{ width: `${provider.score}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}
