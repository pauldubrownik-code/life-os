"use client";
import { useState, useEffect } from "react";
import { getCrmTasks, saveCrmTasks, type CrmTask } from "@/lib/store";

export function CrmTasksSection() {
  const [tasks, setTasks] = useState<CrmTask[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [filter, setFilter] = useState<"all" | "starred" | "done">("all");

  useEffect(() => {
    setTasks(getCrmTasks());
  }, []);

  const persist = (updated: CrmTask[]) => {
    setTasks(updated);
    saveCrmTasks(updated);
  };

  const addTask = () => {
    if (!newTitle.trim()) return;
    const t: CrmTask = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      starred: false,
      done: false,
      createdAt: new Date().toISOString(),
    };
    persist([...getCrmTasks(), t]);
    setNewTitle("");
  };

  const toggleStar = (id: string) => {
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, starred: !t.starred } : t
    );
    persist(updated);
  };

  const toggleDone = (id: string) => {
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, done: !t.done } : t
    );
    persist(updated);
  };

  const removeTask = (id: string) => {
    persist(tasks.filter((t) => t.id !== id));
  };

  const filtered = tasks.filter((t) => {
    if (filter === "starred") return t.starred;
    if (filter === "done") return t.done;
    return true;
  });

  const starredCount = tasks.filter((t) => t.starred).length;
  const doneCount = tasks.filter((t) => t.done).length;

  return (
    <div className="panel space-y-3">
      {/* Stats + Filter */}
      <div className="flex items-center justify-between">
        <div className="flex gap-3 mono text-[0.55rem] text-[oklch(0.5_0.02_260)]">
          <span>{tasks.length} GESAMT</span>
          <span className="text-accent">{starredCount} ★</span>
          <span className="text-[oklch(0.62_0.18_150)]">{doneCount} ✓</span>
          <span className="text-[oklch(0.4_0.015_260)]">
            {tasks.length - doneCount} OFFEN
          </span>
        </div>
        <div className="flex gap-1 mono text-[0.5rem]">
          <button
            onClick={() => setFilter("all")}
            className={`px-2 py-0.5 rounded transition-colors ${
              filter === "all"
                ? "bg-accent/20 text-accent border border-accent/30"
                : "text-[oklch(0.4_0.015_260)] hover:text-white"
            }`}
          >
            ALLE
          </button>
          <button
            onClick={() => setFilter("starred")}
            className={`px-2 py-0.5 rounded transition-colors ${
              filter === "starred"
                ? "bg-accent/20 text-accent border border-accent/30"
                : "text-[oklch(0.4_0.015_260)] hover:text-white"
            }`}
          >
            ★ STERN
          </button>
          <button
            onClick={() => setFilter("done")}
            className={`px-2 py-0.5 rounded transition-colors ${
              filter === "done"
                ? "bg-accent/20 text-accent border border-accent/30"
                : "text-[oklch(0.4_0.015_260)] hover:text-white"
            }`}
          >
            ✓ ERLEDIGT
          </button>
        </div>
      </div>

      {/* Tasks */}
      <div className="space-y-1 min-h-[120px]">
        {filtered.length === 0 ? (
          <div className="text-center mono text-[0.55rem] text-[oklch(0.4_0.015_260)] py-6">
            {filter === "all"
              ? "Noch keine Aufgaben — erstelle deine erste Aufgabe"
              : filter === "starred"
              ? "Keine markierten Aufgaben — mit ★ markieren für Daily-Ansicht"
              : "Keine erledigten Aufgaben"}
          </div>
        ) : (
          filtered.map((t) => (
            <div
              key={t.id}
              className="flex items-center gap-2 py-2 px-2 rounded hover:bg-[oklch(0.28_0.012_260/0.2)] transition-colors group"
            >
              {/* Done toggle */}
              <button
                onClick={() => toggleDone(t.id)}
                className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                  t.done
                    ? "bg-[oklch(0.62_0.18_150)] border-[oklch(0.62_0.18_150)] text-[#0a0e17]"
                    : "border-[oklch(0.4_0.015_260)] hover:border-accent"
                }`}
              >
                {t.done && "✓"}
              </button>

              {/* Title */}
              <span
                className={`flex-1 text-sm ${
                  t.done
                    ? "line-through text-[oklch(0.4_0.015_260)]"
                    : "text-white"
                }`}
              >
                {t.title}
              </span>

              {/* Date */}
              <span className="mono text-[0.45rem] text-[oklch(0.35_0.01_260)]">
                {new Date(t.createdAt).toLocaleDateString("de-DE")}
              </span>

              {/* Star toggle */}
              <button
                onClick={() => toggleStar(t.id)}
                className={`text-xs px-2 py-0.5 rounded transition-all ${
                  t.starred
                    ? "text-accent bg-accent/15"
                    : "text-[oklch(0.35_0.01_260)] hover:text-[oklch(0.5_0.02_260)]"
                }`}
                title={t.starred ? "Von Daily entfernen" : "Zur Daily hinzufügen"}
              >
                {t.starred ? "★" : "☆"}
              </button>

              {/* Delete */}
              <button
                onClick={() => removeTask(t.id)}
                className="mono text-[0.45rem] text-[oklch(0.4_0.015_260)] opacity-0 group-hover:opacity-100 hover:text-danger transition-opacity"
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>

      {/* Add task */}
      <div className="flex gap-2 pt-1 border-t border-[oklch(0.28_0.012_260/0.3)]">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          placeholder="Neue Aufgabe..."
          className="flex-1 bg-[oklch(0.12_0.008_270/0.5)] border border-[oklch(0.28_0.012_260/0.4)] rounded px-2 py-1.5 text-xs text-white placeholder:text-[oklch(0.4_0.015_260)] focus:outline-none focus:border-accent"
        />
        <button
          onClick={addTask}
          className="px-3 py-1.5 rounded bg-accent/20 border border-accent/30 text-accent hover:bg-accent/30 transition-colors mono text-[0.55rem]"
        >
          + TASK
        </button>
      </div>
    </div>
  );
}
