"use client";
import { useState, useEffect, useCallback } from "react";
import {
  getGoals,
  saveGoals,
  type Goal,
} from "@/lib/store";

export default function GoalsCard() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newTarget, setNewTarget] = useState(100);
  const [newUnit, setNewUnit] = useState("%");
  const [newIcon, setNewIcon] = useState("🎯");
  const [newType, setNewType] = useState<"weekly" | "monthly">("weekly");

  useEffect(() => {
    setGoals(getGoals());
  }, []);

  const addGoal = () => {
    if (!newTitle.trim()) return;
    const g: Goal = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      type: newType,
      icon: newIcon,
      current: 0,
      target: newTarget,
      unit: newUnit,
      createdAt: new Date().toISOString(),
    };
    const updated = [...getGoals(), g];
    saveGoals(updated);
    setGoals(updated);
    setNewTitle("");
    setShowAdd(false);
  };

  const updateProgress = (id: string, val: number) => {
    const updated = goals.map((g) =>
      g.id === id ? { ...g, current: Math.max(0, Math.min(g.target, val)) } : g
    );
    saveGoals(updated);
    setGoals(updated);
  };

  const removeGoal = (id: string) => {
    const updated = goals.filter((g) => g.id !== id);
    saveGoals(updated);
    setGoals(updated);
  };

  const weekly = goals.filter((g) => g.type === "weekly");
  const monthly = goals.filter((g) => g.type === "monthly");

  return (
    <div className="panel space-y-3">
      <div className="flex items-center justify-between">
        <span className="mono text-[0.65rem] tracking-[0.15em] text-[oklch(0.5_0.02_260)]">
          05 // ZIELE
        </span>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="mono text-[0.55rem] text-accent hover:text-accent-hover"
        >
          + NEU
        </button>
      </div>

      {/* Quick add form */}
      {showAdd && (
        <div className="space-y-2 p-2 rounded bg-[oklch(0.28_0.012_260/0.3)]">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Zielname..."
            className="w-full bg-[oklch(0.12_0.008_270/0.5)] border border-[oklch(0.28_0.012_260/0.4)] rounded px-2 py-1 text-xs text-white placeholder:text-[oklch(0.4_0.015_260)] focus:outline-none focus:border-accent"
          />
          <div className="flex gap-2">
            <select
              value={newType}
              onChange={(e) => setNewType(e.target.value as "weekly" | "monthly")}
              className="bg-[oklch(0.12_0.008_270/0.5)] border border-[oklch(0.28_0.012_260/0.4)] rounded px-1 py-1 text-xs text-white focus:outline-none focus:border-accent"
            >
              <option value="weekly">Wöchentlich</option>
              <option value="monthly">Monatlich</option>
            </select>
            <input
              type="number"
              value={newTarget}
              onChange={(e) => setNewTarget(Number(e.target.value))}
              placeholder="Ziel"
              className="w-16 bg-[oklch(0.12_0.008_270/0.5)] border border-[oklch(0.28_0.012_260/0.4)] rounded px-1 py-1 text-xs text-white text-right focus:outline-none focus:border-accent"
            />
            <input
              type="text"
              value={newUnit}
              onChange={(e) => setNewUnit(e.target.value)}
              placeholder="Einheit"
              className="w-14 bg-[oklch(0.12_0.008_270/0.5)] border border-[oklch(0.28_0.012_260/0.4)] rounded px-1 py-1 text-xs text-white focus:outline-none focus:border-accent"
            />
            <button
              onClick={addGoal}
              className="px-2 py-1 rounded bg-accent/20 border border-accent/30 text-accent hover:bg-accent/30 transition-colors mono text-[0.55rem]"
            >
              + ADD
            </button>
          </div>
        </div>
      )}

      {/* Weekly */}
      {weekly.length > 0 && (
        <div>
          <span className="mono text-[0.55rem] tracking-[0.1em] text-[oklch(0.4_0.015_260)]">
            [ WÖCHENTLICH ]
          </span>
          {weekly.map((g) => {
            const pct =
              g.target > 0 ? Math.min(100, Math.round((g.current / g.target) * 100)) : 0;
            return (
              <div
                key={g.id}
                className="flex items-center gap-2 py-1.5 px-1 rounded hover:bg-[oklch(0.28_0.012_260/0.2)] group"
              >
                <span className="text-sm">{g.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-white truncate">{g.title}</div>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      value={g.current}
                      onChange={(e) =>
                        updateProgress(g.id, Number(e.target.value) || 0)
                      }
                      className="w-10 bg-transparent text-right mono text-[0.6rem] text-accent focus:outline-none"
                    />
                    <span className="mono text-[0.5rem] text-[oklch(0.4_0.015_260)]">
                      / {g.target} {g.unit}
                    </span>
                    <div className="flex-1 h-1 bg-[oklch(0.28_0.012_260/0.5)] rounded-full overflow-hidden ml-1">
                      <div
                        className="h-full bg-accent rounded-full transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeGoal(g.id)}
                  className="mono text-[0.45rem] text-[oklch(0.4_0.015_260)] opacity-0 group-hover:opacity-100 hover:text-danger transition-opacity"
                >
                  ✕
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Monthly */}
      {monthly.length > 0 && (
        <div>
          <span className="mono text-[0.55rem] tracking-[0.1em] text-[oklch(0.4_0.015_260)]">
            [ MONATLICH ]
          </span>
          {monthly.map((g) => {
            const pct =
              g.target > 0 ? Math.min(100, Math.round((g.current / g.target) * 100)) : 0;
            return (
              <div
                key={g.id}
                className="flex items-center gap-2 py-1.5 px-1 rounded hover:bg-[oklch(0.28_0.012_260/0.2)] group"
              >
                <span className="text-sm">{g.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-white truncate">{g.title}</div>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      value={g.current}
                      onChange={(e) =>
                        updateProgress(g.id, Number(e.target.value) || 0)
                      }
                      className="w-10 bg-transparent text-right mono text-[0.6rem] text-accent focus:outline-none"
                    />
                    <span className="mono text-[0.5rem] text-[oklch(0.4_0.015_260)]">
                      / {g.target} {g.unit}
                    </span>
                    <div className="flex-1 h-1 bg-[oklch(0.28_0.012_260/0.5)] rounded-full overflow-hidden ml-1">
                      <div
                        className="h-full bg-accent rounded-full transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeGoal(g.id)}
                  className="mono text-[0.45rem] text-[oklch(0.4_0.015_260)] opacity-0 group-hover:opacity-100 hover:text-danger transition-opacity"
                >
                  ✕
                </button>
              </div>
            );
          })}
        </div>
      )}

      {goals.length === 0 && !showAdd && (
        <div className="text-center mono text-[0.55rem] text-[oklch(0.4_0.015_260)] py-3">
          Noch keine Ziele · Klicke &quot;+ NEU&quot; um loszulegen
        </div>
      )}
    </div>
  );
}
