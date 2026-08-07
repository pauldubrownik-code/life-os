import TopRail from "@/components/TopRail";

export default function ReviewPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <TopRail />
      <main className="flex-1 px-5 py-4">
        <div className="max-w-7xl mx-auto space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="mono text-sm tracking-[0.15em] text-accent font-bold">WEEKLY REVIEW</h1>
              <div className="mono text-[0.55rem] text-[oklch(0.5_0.02_260)] mt-1">
                {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }).toUpperCase()}
              </div>
            </div>
            <div className="flex items-center gap-2 mono text-[0.55rem]">
              <span className="text-[oklch(0.5_0.02_260)]">WEEK [XX]</span>
              <span className="text-[oklch(0.4_0.015_260)]">·</span>
              <span className="text-accent">REVIEW NOW</span>
            </div>
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-2 gap-4">
            {/* Left column */}
            <div className="space-y-4">
              <div className="panel space-y-3">
                <span className="mono text-[0.65rem] tracking-[0.15em] text-[oklch(0.5_0.02_260)]">WINS</span>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-xs text-[oklch(0.7_0.01_90)]">
                    <span className="text-[oklch(0.62_0.18_150)]">✓</span>
                    Win 1 – description goes here
                  </li>
                  <li className="flex items-center gap-2 text-xs text-[oklch(0.7_0.01_90)]">
                    <span className="text-[oklch(0.62_0.18_150)]">✓</span>
                    Win 2 – description goes here
                  </li>
                  <li className="flex items-center gap-2 text-xs text-[oklch(0.7_0.01_90)]">
                    <span className="text-[oklch(0.62_0.18_150)]">✓</span>
                    Win 3 – description goes here
                  </li>
                </ul>
              </div>

              <div className="panel space-y-3">
                <span className="mono text-[0.65rem] tracking-[0.15em] text-[oklch(0.5_0.02_260)]">SLIPPED</span>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-xs text-danger">
                    <span>—</span>
                    Slipped item 1
                  </li>
                  <li className="flex items-center gap-2 text-xs text-danger">
                    <span>—</span>
                    Slipped item 2
                  </li>
                </ul>
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-4">
              <div className="panel space-y-3">
                <span className="mono text-[0.65rem] tracking-[0.15em] text-[oklch(0.5_0.02_260)]">OPEN LOOPS</span>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-xs text-[oklch(0.7_0.01_90)]">
                    <span className="text-warn">◷</span>
                    Open loop 1 – needs decision
                  </li>
                  <li className="flex items-center gap-2 text-xs text-[oklch(0.7_0.01_90)]">
                    <span className="text-warn">◷</span>
                    Open loop 2 – waiting on reply
                  </li>
                  <li className="flex items-center gap-2 text-xs text-[oklch(0.7_0.01_90)]">
                    <span className="text-warn">◷</span>
                    Open loop 3 – needs research
                  </li>
                </ul>
              </div>

              <div className="panel space-y-3">
                <span className="mono text-[0.65rem] tracking-[0.15em] text-[oklch(0.5_0.02_260)]">NEXT WEEK / KEY AREAS</span>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-xs text-[oklch(0.7_0.01_90)]">
                    <span className="text-accent">→</span>
                    Priority area 1
                  </li>
                  <li className="flex items-center gap-2 text-xs text-[oklch(0.7_0.01_90)]">
                    <span className="text-accent">→</span>
                    Priority area 2
                  </li>
                  <li className="flex items-center gap-2 text-xs text-[oklch(0.7_0.01_90)]">
                    <span className="text-accent">→</span>
                    Priority area 3
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
