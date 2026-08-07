import TopRail from "@/components/TopRail";

const MONTHLY_HISTORY = [
  { month: "MAY '24", nw: 0, liquid: 0, invested: 0, liabilities: 0 },
  { month: "JUN '24", nw: 0, liquid: 0, invested: 0, liabilities: 0 },
  { month: "JUL '24", nw: 0, liquid: 0, invested: 0, liabilities: 0 },
  { month: "AUG '24", nw: 0, liquid: 0, invested: 0, liabilities: 0 },
  { month: "SEP '24", nw: 0, liquid: 0, invested: 0, liabilities: 0 },
  { month: "OCT '24", nw: 0, liquid: 0, invested: 0, liabilities: 0 },
  { month: "NOV '24", nw: 0, liquid: 0, invested: 0, liabilities: 0 },
  { month: "DEC '24", nw: 0, liquid: 0, invested: 0, liabilities: 0 },
  { month: "JAN '25", nw: 0, liquid: 0, invested: 0, liabilities: 0 },
  { month: "FEB '25", nw: 0, liquid: 0, invested: 0, liabilities: 0 },
  { month: "MAR '25", nw: 0, liquid: 0, invested: 0, liabilities: 0 },
  { month: "APR '25", nw: 0, liquid: 0, invested: 0, liabilities: 0 },
  { month: "MAY '25", nw: 0, liquid: 0, invested: 0, liabilities: 0 },
  { month: "JUN '25", nw: 0, liquid: 0, invested: 0, liabilities: 0 },
  { month: "JUL '25", nw: 0, liquid: 0, invested: 0, liabilities: 0 },
  { month: "AUG '25", nw: 0, liquid: 0, invested: 0, liabilities: 0 },
  { month: "SEP '25", nw: 0, liquid: 0, invested: 0, liabilities: 0 },
  { month: "OCT '25", nw: 0, liquid: 0, invested: 0, liabilities: 0 },
  { month: "NOV '25", nw: 0, liquid: 0, invested: 0, liabilities: 0 },
  { month: "DEC '25", nw: 0, liquid: 0, invested: 0, liabilities: 0 },
  { month: "JAN '26", nw: 0, liquid: 0, invested: 0, liabilities: 0 },
  { month: "FEB '26", nw: 0, liquid: 0, invested: 0, liabilities: 0 },
  { month: "MAR '26", nw: 0, liquid: 0, invested: 0, liabilities: 0 },
  { month: "APR '26", nw: 0, liquid: 0, invested: 0, liabilities: 0 },
];

export default function FinancePage() {
  const current = MONTHLY_HISTORY[MONTHLY_HISTORY.length - 1];

  return (
    <div className="min-h-screen flex flex-col">
      <TopRail />
      <main className="flex-1 px-5 py-4">
        <div className="max-w-7xl mx-auto space-y-4">
          {/* Header + Summary */}
          <div className="panel grid grid-cols-4 gap-6">
            <div>
              <span className="mono text-[0.55rem] tracking-[0.12em] text-[oklch(0.4_0.015_260)]">NET WORTH</span>
              <div className="mono text-2xl text-white mt-1">$[NW]</div>
              <div className="mono text-xs text-[oklch(0.62_0.18_150)]">+$[CHG] · 30D</div>
            </div>
            <div>
              <span className="mono text-[0.55rem] tracking-[0.12em] text-[oklch(0.4_0.015_260)]">RUNWAY</span>
              <div className="mono text-2xl text-accent mt-1">~[MOS] MO</div>
              <div className="mono text-xs text-[oklch(0.5_0.02_260)]">$[MONTHLY] burn</div>
            </div>
            <div>
              <span className="mono text-[0.55rem] tracking-[0.12em] text-[oklch(0.4_0.015_260)]">INCOME / BURN</span>
              <div className="mono text-2xl text-white mt-1">$[INC]</div>
              <div className="mono text-xs text-[oklch(0.6_0.2_25)]">−$[BURN] per month</div>
            </div>
            <div className="text-right">
              <span className="mono text-[0.55rem] tracking-[0.12em] text-[oklch(0.4_0.015_260)]">LIQUID</span>
              <div className="mono text-2xl text-accent mt-1">$[LIQ]</div>
              <div className="mono text-xs text-[oklch(0.5_0.02_260)]">+$[INV] invested · $[LIAB] liabilities</div>
            </div>
          </div>

          {/* 24-Month History */}
          <div className="panel">
            <div className="flex items-center justify-between mb-3">
              <span className="mono text-[0.65rem] tracking-[0.15em] text-[oklch(0.5_0.02_260)]">
                24-MONTH SNAPSHOT
              </span>
              <div className="flex gap-2 mono text-[0.5rem] text-[oklch(0.4_0.015_260)]">
                <span className="w-2 h-2 rounded-full bg-accent inline-block" /> NET WORTH
                <span className="w-2 h-2 rounded-full bg-[oklch(0.7_0.18_80)] inline-block" /> INVESTED
                <span className="w-2 h-2 rounded-full bg-[oklch(0.6_0.2_25)] inline-block" /> LIABILITIES
              </div>
            </div>

            {/* Bar chart */}
            <div className="flex items-end gap-1 h-24">
              {MONTHLY_HISTORY.map((m, i) => {
                const maxNw = 100000; // placeholder scale
                const nwPct = Math.min(100, (m.nw / maxNw) * 100);
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                    <div
                      className="w-full rounded-t"
                      style={{
                        height: `${nwPct}%`,
                        background: i % 3 === 0 ? "oklch(0.65_0.18_240 / 0.3)" : "oklch(0.28_0.012_260 / 0.5)",
                      }}
                    />
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between mt-1 mono text-[0.45rem] text-[oklch(0.4_0.015_260)]">
              {MONTHLY_HISTORY.filter((_, i) => i % 3 === 0).map((m) => (
                <span key={m.month}>{m.month}</span>
              ))}
            </div>
          </div>

          {/* Asset breakdown */}
          <div className="grid grid-cols-3 gap-4">
            <div className="panel">
              <span className="mono text-[0.55rem] tracking-[0.12em] text-[oklch(0.4_0.015_260)]">LIQUID CASH</span>
              <div className="mono text-xl text-white mt-1">$[CASH]</div>
              <div className="mono text-[0.5rem] text-[oklch(0.5_0.02_260)]">Checking + Savings + Cash</div>
            </div>
            <div className="panel">
              <span className="mono text-[0.55rem] tracking-[0.12em] text-[oklch(0.4_0.015_260)]">INVESTED ASSETS</span>
              <div className="mono text-xl text-[oklch(0.7_0.18_80)] mt-1">$[INV]</div>
              <div className="mono text-[0.5rem] text-[oklch(0.5_0.02_260)]">Stocks + Crypto + Property</div>
            </div>
            <div className="panel">
              <span className="mono text-[0.55rem] tracking-[0.12em] text-[oklch(0.4_0.015_260)]">LIABILITIES</span>
              <div className="mono text-xl text-danger mt-1">$[LIAB]</div>
              <div className="mono text-[0.5rem] text-[oklch(0.5_0.02_260)]">Debt + Loans + Credit</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
