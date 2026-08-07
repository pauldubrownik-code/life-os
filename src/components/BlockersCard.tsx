"use client";

type Blocker = {
  id: string;
  title: string;
  owner: string;
  stuckDays: number;
  hot: boolean;
};

const DEFAULT_BLOCKERS: Blocker[] = [
  { id: "b1", title: "Blocker 1 – what's stuck", owner: "Owner", stuckDays: 3, hot: true },
  { id: "b2", title: "Blocker 2 – what's stuck", owner: "You", stuckDays: 1, hot: false },
  { id: "b3", title: "Blocker 3 – what's stuck", owner: "Owner", stuckDays: 7, hot: true },
  { id: "b4", title: "Blocker 4 – what's stuck", owner: "Owner", stuckDays: 5, hot: false },
  { id: "b5", title: "Blocker 5 – what's stuck", owner: "You", stuckDays: 2, hot: false },
];

export default function BlockersCard() {
  const active = DEFAULT_BLOCKERS.filter((b) => b.stuckDays > 0);

  return (
    <div className="panel-thin space-y-2">
      <div className="flex items-center justify-between">
        <span className="mono text-[0.65rem] tracking-[0.15em] text-[oklch(0.5_0.02_260)]">
          06 // KEY BLOCKERS
        </span>
        <div className="flex items-center gap-2">
          <span className="mono text-[0.55rem] text-[oklch(0.6_0.2_25)]">{active.length} ACTIVE</span>
          <button className="mono text-[0.55rem] text-accent hover:text-accent-hover">VIEW ALL</button>
        </div>
      </div>

      <div className="space-y-1">
        {active.slice(0, 5).map((b) => (
          <div key={b.id} className="flex items-center gap-2 py-1 px-1.5 rounded hover:bg-[oklch(0.28_0.012_260/0.2)] transition-colors">
            <span className={`w-2 h-2 rounded-full ${b.hot ? "bg-danger" : "bg-[oklch(0.7_0.18_80)]"}`} />
            <span className="flex-1 text-xs text-[oklch(0.7_0.01_90)] truncate">{b.title}</span>
            <span className="mono text-[0.5rem] text-[oklch(0.4_0.015_260)]">OWNER {b.owner}</span>
            <span className="mono text-[0.5rem] text-[oklch(0.6_0.2_25)]">STUCK {b.stuckDays}d</span>
          </div>
        ))}
      </div>

      {active.length > 5 && (
        <button className="w-full text-center mono text-[0.55rem] text-accent hover:text-accent-hover py-1">
          + {active.length - 5} MORE · VIEW ALL
        </button>
      )}
    </div>
  );
}
