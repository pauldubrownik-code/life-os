"use client";
import { useState, useEffect } from "react";
import { getCrmTasks, saveCrmTasks, type CrmTask } from "@/lib/store";

export default function KeyToDosCard() {
  const [tasks, setTasks] = useState<CrmTask[]>([]);
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    setTasks(getCrmTasks().filter((t) => t.starred && !t.done));
  }, []);

  const addTask = () => {
    if (!newTitle.trim()) return;
    const t: CrmTask = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      starred: true,
      done: false,
      createdAt: new Date().toISOString(),
    };
    const updated = [...getCrmTasks(), t];
    saveCrmTasks(updated);
    setTasks(updated.filter((x) => x.starred && !x.done));
    setNewTitle("");
  };

  const toggleDone = (id: string) => {
    const all = getCrmTasks();
    const updated = all.map((t) =>
      t.id === id ? { ...t, done: !t.done } : t
    );
    saveCrmTasks(updated);
    setTasks(updated.filter((x) => x.starred && !x.done));
  };

  const unstar = (id: string) => {
    const all = getCrmTasks();
    const updated = all.map((t) =>
      t.id === id ? { ...t, starred: false } : t
    );
    saveCrmTasks(updated);
    setTasks(updated.filter((x) => x.starred && !x.done));
  };

  return (
    <div className="panel-thin space-y-2">
      <div className="flex items-center justify-between">
        <span className="mono text-[0.65rem] tracking-[0.15em] text-[oklch(0.5_0.02_260)]">
          06 // KEY TO-DOs
        </span>
        <span className="mono text-[0.55rem] text-accent">
          {tasks.length} AKTIV
        </span>
      </div>

      <div className="space-y-1 min-h-[40px]">
        {tasks.length === 0 ? (
          <div className="text-center mono text-[0.55rem] text-[oklch(0.4_0.015_260)] py-2">
            Keine To-Dos — im CRM mit ★ markieren
          </div>
        ) : (
          tasks.map((t) => (
            <div
              key={t.id}
              className="flex items-center gap-2 py-1 px-1.5 rounded hover:bg-[oklch(0.28_0.012_260/0.2)] transition-colors group"
            >
              <button
                onClick={() => toggleDone(t.id)}
                className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                  t.done
                    ? "bg-accent border-accent text-[#0a0e17]"
                    : "border-[oklch(0.4_0.015_260)] hover:border-accent"
                }`}
              >
                {t.done && "✓"}
              </button>
              <span
                className={`flex-1 text-xs ${
                  t.done
                    ? "line-through text-[oklch(0.4_0.015_260)]"
                    : "text-[oklch(0.7_0.01_90)]"
                }`}
              >
                {t.title}
              </span>
              <button
                onClick={() => unstar(t.id)}
                className="mono text-[0.45rem] text-[oklch(0.4_0.015_260)] opacity-0 group-hover:opacity-100 transition-opacity hover:text-warn"
              >
                ★ ENTFERNEN
              </button>
            </div>
          ))
        )}
      </div>

      {/* Quick add */}
      <div className="flex gap-2 pt-1">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          placeholder="Schnelle Aufgabe..."
          className="flex-1 bg-[oklch(0.12_0.008_270/0.5)] border border-[oklch(0.28_0.012_260/0.4)] rounded px-2 py-1 text-xs text-white placeholder:text-[oklch(0.4_0.015_260)] focus:outline-none focus:border-accent"
        />
        <button
          onClick={addTask}
          className="px-2 py-1 rounded bg-accent/20 border border-accent/30 text-accent hover:bg-accent/30 transition-colors mono text-[0.55rem]"
        >
          + ADD
        </button>
      </div>
    </div>
  );
}
