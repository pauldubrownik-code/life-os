import TopRail from "@/components/TopRail";

const TAGS = [
  { label: "ALL", active: true },
  { label: "HOT", active: false },
  { label: "WARM", active: false },
  { label: "COOL", active: false },
];

const PIPELINE = [
  { name: "Lead A", org: "Company 1", tasks: 3, status: "HOT", statusColor: "hot" as const, captures: 12 },
  { name: "Lead B", org: "Company 2", tasks: 1, status: "WARM", statusColor: "warm" as const, captures: 5 },
  { name: "Lead C", org: "Company 3", tasks: 0, status: "COOL", statusColor: "cool" as const, captures: 2 },
  { name: "Lead D", org: "Company 4", tasks: 7, status: "HOT", statusColor: "hot" as const, captures: 24 },
  { name: "Lead E", org: "Company 5", tasks: 2, status: "HOT", statusColor: "hot" as const, captures: 8 },
  { name: "Lead F", org: "Company 6", tasks: 0, status: "COOL", statusColor: "cool" as const, captures: 1 },
  { name: "Lead G", org: "Company 7", tasks: 4, status: "WARM", statusColor: "warm" as const, captures: 15 },
  { name: "Lead H", org: "Company 8", tasks: 1, status: "WARM", statusColor: "warm" as const, captures: 6 },
];

function statusColor(s: "hot" | "warm" | "cool") {
  return s === "hot"
    ? "text-hot border-hot/30 bg-hot/10"
    : s === "warm"
    ? "text-warm border-warm/30 bg-warm/10"
    : "text-cool border-cool/30 bg-cool/10";
}

export default function CRMPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <TopRail />
      <main className="flex-1 px-5 py-4">
        <div className="max-w-7xl mx-auto space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="mono text-sm tracking-[0.15em] text-accent font-bold">CRM // PEOPLE</h1>
              <div className="flex gap-4 mt-1 mono text-[0.55rem] text-[oklch(0.5_0.02_260)]">
                <span>128 PEOPLE</span>
                <span>42 TASKS</span>
                <span>36 CONTENT</span>
                <span>19 DECISIONS</span>
                <span>241 CAPTURES</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {TAGS.map((t) => (
                <button
                  key={t.label}
                  className={`mono text-[0.6rem] tracking-[0.1em] px-3 py-1.5 rounded-md transition-colors ${
                    t.active
                      ? "bg-accent/20 text-accent border border-accent/30"
                      : "text-[oklch(0.5_0.02_260)] border border-transparent hover:text-white"
                  }`}
                >
                  {t.label}
                </button>
              ))}
              <span className="text-[oklch(0.4_0.015_260)] mx-1">|</span>
              <button className="mono text-[0.6rem] text-accent">KANBAN</button>
              <button className="mono text-[0.6rem] text-[oklch(0.5_0.02_260)]">SMART</button>
              <button className="mono text-[0.6rem] text-[oklch(0.5_0.02_260)] bg-[oklch(0.22_0.008_270/0.5)] px-2 py-1 rounded">CATEGORY</button>
            </div>
          </div>

          {/* People Table */}
          <div className="panel space-y-1">
            <div className="grid grid-cols-[1fr_1fr_80px_100px_80px_60px] gap-2 px-3 py-2 mono text-[0.5rem] tracking-[0.12em] text-[oklch(0.4_0.015_260)] border-b border-[oklch(0.28_0.012_260/0.3)]">
              <span>NAME</span>
              <span>ORG</span>
              <span className="text-right">TASKS</span>
              <span className="text-center">STATUS</span>
              <span className="text-right">CAPTURES</span>
              <span></span>
            </div>
            {PIPELINE.map((p, i) => (
              <div
                key={i}
                className="grid grid-cols-[1fr_1fr_80px_100px_80px_60px] gap-2 px-3 py-2 rounded items-center hover:bg-[oklch(0.28_0.012_260/0.15)] transition-colors"
              >
                <span className="text-xs text-white">{p.name}</span>
                <span className="text-xs text-[oklch(0.6_0.025_260)]">{p.org}</span>
                <span className="mono text-xs text-right text-[oklch(0.5_0.02_260)]">{p.tasks}</span>
                <span className="text-center">
                  <span className={`tag ${statusColor(p.statusColor)} text-[0.5rem]`}>{p.status}</span>
                </span>
                <span className="mono text-xs text-right text-[oklch(0.5_0.02_260)]">{p.captures}</span>
                <button className="mono text-[0.5rem] text-accent opacity-0 hover:opacity-100 transition-opacity">OPEN</button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
