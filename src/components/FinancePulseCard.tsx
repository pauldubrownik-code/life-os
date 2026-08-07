"use client";

export default function FinancePulseCard() {
  return (
    <div className="panel space-y-3">
      <div className="flex items-center justify-between">
        <span className="mono text-[0.65rem] tracking-[0.15em] text-[oklch(0.5_0.02_260)]">
          02 // FINANCE PULSE
        </span>
        <span className="live-dot" />
      </div>

      {/* Net Worth */}
      <div>
        <span className="mono text-[0.55rem] tracking-[0.15em] text-[oklch(0.4_0.015_260)]">
          NET WORTH · LIVE
        </span>
        <div className="flex items-baseline gap-3">
          <span className="mono text-2xl text-white">$[NET WORTH]</span>
          <span className="mono text-xs text-[oklch(0.62_0.18_150)]">+X.X% · 30D</span>
        </div>
      </div>

      {/* Mini donut */}
      <div className="grid grid-cols-3 gap-2 py-2">
        <div className="text-center">
          <span className="mono text-xs text-accent">$[LIQUID]</span>
          <div className="mono text-[0.5rem] text-[oklch(0.4_0.015_260)]">LIQUID</div>
        </div>
        <div className="text-center">
          <span className="mono text-xs text-[oklch(0.7_0.18_80)]">$[INV]</span>
          <div className="mono text-[0.5rem] text-[oklch(0.4_0.015_260)]">INVESTED</div>
        </div>
        <div className="text-center">
          <span className="mono text-xs text-danger">$[LIAB]</span>
          <div className="mono text-[0.5rem] text-[oklch(0.4_0.015_260)]">LIABILITIES</div>
        </div>
      </div>

      {/* Daily + Monthly change */}
      <div className="flex justify-between border-t border-[oklch(0.28_0.012_260/0.3)] pt-2">
        <div>
          <span className="mono text-[0.5rem] tracking-[0.08em] text-[oklch(0.4_0.015_260)]">DAILY</span>
          <div className="mono text-sm text-[oklch(0.62_0.18_150)]">+$[DAY]</div>
        </div>
        <div className="text-right">
          <span className="mono text-[0.5rem] tracking-[0.08em] text-[oklch(0.4_0.015_260)]">MONTHLY</span>
          <div className="mono text-sm text-accent">+$[MONTH]</div>
        </div>
      </div>
    </div>
  );
}
