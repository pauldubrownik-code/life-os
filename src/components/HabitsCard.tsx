"use client";
import { useState, useCallback } from "react";

const HABITS = [
  { id: "h1", label: "Habit 1 – simple toggle", category: "CATEGORY A" },
  { id: "h2", label: "Habit 2 – grouped", category: "CATEGORY B", max: 3 },
  { id: "h3", label: "Habit 3 – session", category: "CATEGORY B", max: 5 },
  { id: "h4", label: "Habit 4 – session", category: "CATEGORY C", max: 4 },
  { id: "h5", label: "Habit 5 – session", category: "CATEGORY C", max: 5 },
  { id: "h6", label: "Habit 6 – session", category: "CATEGORY C", max: 4 },
];

export default function HabitsCard() {
  const [counts, setCounts] = useState<Record<string, number>>({});

  const toggle = useCallback((id: string, max?: number) => {
    setCounts((prev) => {
      const cur = prev[id] || 0;
      const next = max ? (cur + 1) % (max + 1) : cur === 0 ? 1 : 0;
      return { ...prev, [id]: next };
    });
  }, []);

  const total = HABITS.reduce((s, h) => s + (counts[h.id] || 0), 0);
  const maxTotal = HABITS.reduce((s, h) => s + (h.max || 1), 0);

  // Group by category
  const groups: Record<string, typeof HABITS> = {};
  for (const h of HABITS) {
    (groups[h.category] ??= []).push(h);
  }

  return (
    <div className="panel space-y-3">
      <div className="flex items-center justify-between">
        <span className="mono text-[0.65rem] tracking-[0.15em] text-[oklch(0.5_0.02_260)]">
          03 // HABITS
        </span>
        <div className="flex items-center gap-2 mono text-xs">
          <span className="text-[oklch(0.5_0.02_260)]">
            DAILY SCORE
          </span>
          <span className="text-accent font-bold">{total}</span>
          <span className="text-[oklch(0.4_0.015_260)]">·</span>
          <span className="text-[oklch(0.4_0.015_260)]">RESETS <span className="text-white">00:00</span></span>
        </div>
      </div>

      <div className="space-y-3">
        {Object.entries(groups).map(([cat, habits]) => (
          <div key={cat} className="space-y-1">
            <span className="mono text-[0.55rem] tracking-[0.1em] text-[oklch(0.4_0.015_260)]">[ {cat} ]</span>
            {habits.map((h) => {
              const c = counts[h.id] || 0;
              const isDone = h.max ? c >= h.max : c > 0;
              return (
                <button
                  key={h.id}
                  onClick={() => toggle(h.id, h.max)}
                  className={`w-full flex items-center justify-between px-2 py-1 rounded text-left transition-colors ${
                    isDone
                      ? "bg-[oklch(0.62_0.18_150/0.1)] text-[oklch(0.62_0.18_150)]"
                      : "hover:bg-[oklch(0.28_0.012_260/0.3)] text-[oklch(0.7_0.01_90)]"
                  }`}
                >
                  <span className="text-xs">{h.label}</span>
                  {h.max ? (
                    <span className="mono text-[0.65rem] text-[oklch(0.5_0.02_260)]">
                      {c} / {h.max}
                    </span>
                  ) : (
                    <span className={c > 0 ? "text-[oklch(0.62_0.18_150)]" : "text-[oklch(0.4_0.015_260)]"}>
                      {c > 0 ? "✓" : "○"}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
