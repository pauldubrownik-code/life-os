"use client";
import { useState, useEffect, useCallback } from "react";
import {
  getHabits,
  getHabitProgress,
  saveHabitProgress,
  type Habit,
} from "@/lib/store";

export default function HabitsCard() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [progress, setProgress] = useState<Record<string, number>>({});

  useEffect(() => {
    setHabits(getHabits());
    setProgress(getHabitProgress());
  }, []);

  const toggle = useCallback(
    (id: string, max: number) => {
      setProgress((prev) => {
        const cur = prev[id] || 0;
        const next = max > 1 ? (cur + 1) % (max + 1) : cur === 0 ? 1 : 0;
        const updated = { ...prev, [id]: next };
        saveHabitProgress(updated);
        return updated;
      });
    },
    []
  );

  // Group by category
  const groups: Record<string, Habit[]> = {};
  for (const h of habits) {
    (groups[h.category] ??= []).push(h);
  }

  const total = Object.values(progress).reduce((s, v) => s + v, 0);
  const maxTotal = habits.reduce((s, h) => s + h.max, 0);

  return (
    <div className="panel space-y-3">
      <div className="flex items-center justify-between">
        <span className="mono text-[0.65rem] tracking-[0.15em] text-[oklch(0.5_0.02_260)]">
          03 // HABITS
        </span>
        <div className="flex items-center gap-2 mono text-xs">
          <span className="text-[oklch(0.5_0.02_260)]">DAILY SCORE</span>
          <span className="text-accent font-bold">{total}</span>
          <span className="text-[oklch(0.4_0.015_260)]">·</span>
          <span className="text-[oklch(0.4_0.015_260)]">
            MAX <span className="text-white">{maxTotal}</span>
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-[oklch(0.28_0.012_260/0.5)] rounded-full overflow-hidden">
        <div
          className="h-full bg-accent rounded-full transition-all duration-500"
          style={{ width: `${maxTotal > 0 ? (total / maxTotal) * 100 : 0}%` }}
        />
      </div>

      <div className="space-y-3">
        {Object.entries(groups).map(([cat, hbits]) => (
          <div key={cat} className="space-y-1">
            <span className="mono text-[0.55rem] tracking-[0.1em] text-[oklch(0.4_0.015_260)]">
              [ {cat} ]
            </span>
            {hbits.map((h) => {
              const c = progress[h.id] || 0;
              const isDone = h.max > 1 ? c >= h.max : c > 0;
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
                  {h.max > 1 ? (
                    <span className="mono text-[0.65rem] text-[oklch(0.5_0.02_260)]">
                      {c} / {h.max}
                    </span>
                  ) : (
                    <span
                      className={
                        c > 0
                          ? "text-[oklch(0.62_0.18_150)]"
                          : "text-[oklch(0.4_0.015_260)]"
                      }
                    >
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
