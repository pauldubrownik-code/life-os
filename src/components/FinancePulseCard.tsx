"use client";
import { useState, useEffect } from "react";
import {
  getFinanceCollapsed,
  saveFinanceCollapsed,
} from "@/lib/store";

export default function FinancePulseCard() {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    setCollapsed(getFinanceCollapsed());
  }, []);

  const toggle = () => {
    const next = !collapsed;
    setCollapsed(next);
    saveFinanceCollapsed(next);
  };

  return (
    <div className="panel space-y-3">
      <div className="flex items-center justify-between">
        <span className="mono text-[0.65rem] tracking-[0.15em] text-[oklch(0.5_0.02_260)]">
          02 // FINANCE PULSE
        </span>
        <div className="flex items-center gap-2">
          <span className="live-dot" />
          <button
            onClick={toggle}
            className="mono text-[0.55rem] text-[oklch(0.4_0.015_260)] hover:text-white transition-colors"
          >
            {collapsed ? "▸" : "▾"}
          </button>
        </div>
      </div>

      {!collapsed && (
        <>
          <div>
            <span className="mono text-[0.55rem] tracking-[0.15em] text-[oklch(0.4_0.015_260)]">
              NET WORTH · LIVE
            </span>
            <div className="flex items-baseline gap-3">
              <span className="mono text-2xl text-white">$[NET WORTH]</span>
              <span className="mono text-xs text-[oklch(0.62_0.18_150)]">
                +X.X% · 30D
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 py-2">
            <div className="text-center">
              <span className="mono text-xs text-accent">$[LIQUID]</span>
              <div className="mono text-[0.5rem] text-[oklch(0.4_0.015_260)]">
                LIQUID
              </div>
            </div>
            <div className="text-center">
              <span className="mono text-xs text-[oklch(0.7_0.18_80)]">
                $[INV]
              </span>
              <div className="mono text-[0.5rem] text-[oklch(0.4_0.015_260)]">
                INVESTED
              </div>
            </div>
            <div className="text-center">
              <span className="mono text-xs text-danger">$[LIAB]</span>
              <div className="mono text-[0.5rem] text-[oklch(0.4_0.015_260)]">
                LIABILITIES
              </div>
            </div>
          </div>

          <div className="flex justify-between border-t border-[oklch(0.28_0.012_260/0.3)] pt-2">
            <div>
              <span className="mono text-[0.5rem] tracking-[0.08em] text-[oklch(0.4_0.015_260)]">
                DAILY
              </span>
              <div className="mono text-sm text-[oklch(0.62_0.18_150)]">
                +$[DAY]
              </div>
            </div>
            <div className="text-right">
              <span className="mono text-[0.5rem] tracking-[0.08em] text-[oklch(0.4_0.015_260)]">
                MONTHLY
              </span>
              <div className="mono text-sm text-accent">+$[MONTH]</div>
            </div>
          </div>
        </>
      )}
      {collapsed && (
        <div className="text-center mono text-[0.55rem] text-[oklch(0.4_0.015_260)] py-2">
          Finanzdaten ausgeblendet · <button onClick={toggle} className="text-accent hover:text-accent-hover">▾ einblenden</button>
        </div>
      )}
    </div>
  );
}
