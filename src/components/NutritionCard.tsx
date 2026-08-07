"use client";
import { useState, useEffect } from "react";
import { getMeals, saveMeals, type Meal } from "@/lib/store";

export default function NutritionCard() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    setMeals(getMeals());
  }, []);

  const persist = (updated: Meal[]) => {
    setMeals(updated);
    saveMeals(updated);
  };

  const addMeal = () => {
    if (!input.trim()) return;
    const meal: Meal = {
      id: Date.now().toString(),
      name: input,
      kcal: 0,
      p: 0,
      c: 0,
      f: 0,
      time: new Date().toLocaleTimeString("de-DE", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    persist([...meals, meal]);
    setInput("");
  };

  const updateMacro = (
    id: string,
    field: "kcal" | "p" | "c" | "f",
    value: number
  ) => {
    const updated = meals.map((m) => {
      if (m.id !== id) return m;
      const next = { ...m, [field]: value };
      // Auto-calculate kcal from macros if protein/carbs/fat changes
      if (field === "p") {
        next.kcal = 4 * value + 4 * m.c + 9 * m.f;
      } else if (field === "c") {
        next.kcal = 4 * m.p + 4 * value + 9 * m.f;
      } else if (field === "f") {
        next.kcal = 4 * m.p + 4 * m.c + 9 * value;
      }
      return next;
    });
    persist(updated);
  };

  const removeMeal = (id: string) => {
    persist(meals.filter((m) => m.id !== id));
  };

  const totalKcal = meals.reduce((s, m) => s + m.kcal, 0);
  const totalP = meals.reduce((s, m) => s + m.p, 0);
  const totalC = meals.reduce((s, m) => s + m.c, 0);
  const totalF = meals.reduce((s, m) => s + m.f, 0);
  const deficit = 2500 - totalKcal;

  return (
    <div className="panel space-y-3">
      <div className="flex items-center justify-between">
        <span className="mono text-[0.65rem] tracking-[0.15em] text-[oklch(0.5_0.02_260)]">
          08 // NUTRITION
        </span>
        <div className="flex items-center gap-2">
          <span className="mono text-[0.6rem] tracking-[0.08em] text-[oklch(0.5_0.02_260)]">TODAY</span>
          <span className="mono text-[0.6rem] text-[oklch(0.4_0.015_260)]">
            {meals.length} ITEMS
          </span>
        </div>
      </div>

      {/* Macro overview */}
      <div className="grid grid-cols-4 gap-2 text-center">
        <div>
          <div className="mono text-2xl text-white">{totalKcal}</div>
          <div className="mono text-[0.5rem] tracking-[0.1em] text-[oklch(0.4_0.015_260)]">
            {totalKcal}/2800 KCAL
          </div>
        </div>
        <div>
          <div className="mono text-lg text-[oklch(0.62_0.18_150)]">
            {totalP}g
          </div>
          <div className="mono text-[0.5rem] tracking-[0.1em] text-[oklch(0.4_0.015_260)]">
            PROTEIN
          </div>
        </div>
        <div>
          <div className="mono text-lg text-[oklch(0.7_0.18_80)]">{totalC}g</div>
          <div className="mono text-[0.5rem] tracking-[0.1em] text-[oklch(0.4_0.015_260)]">
            CARBS
          </div>
        </div>
        <div>
          <div className="mono text-lg text-danger">{totalF}g</div>
          <div className="mono text-[0.5rem] tracking-[0.1em] text-[oklch(0.4_0.015_260)]">
            FAT
          </div>
        </div>
        <div className="col-span-4">
          <div className="h-1.5 bg-[oklch(0.28_0.012_260/0.5)] rounded-full overflow-hidden">
            <div
              className="h-full bg-accent rounded-full transition-all"
              style={{
                width: `${Math.min(100, (totalKcal / 2800) * 100)}%`,
              }}
            />
          </div>
          <div className="mono text-[0.55rem] text-[oklch(0.6_0.025_260)] mt-1">
            {deficit > 0
              ? `−${deficit} kcal Defizit`
              : `+${Math.abs(deficit)} kcal Überschuss`}
          </div>
        </div>
      </div>

      {/* Meal list */}
      <div className="space-y-1 max-h-40 overflow-y-auto">
        {meals.length === 0 ? (
          <div className="text-center mono text-[0.55rem] text-[oklch(0.4_0.015_260)] py-2">
            Noch keine Mahlzeiten
          </div>
        ) : (
          meals.map((m) => (
            <div
              key={m.id}
              className="flex items-center gap-2 text-xs py-1 border-b border-[oklch(0.28_0.012_260/0.2)] last:border-0 group"
            >
              <button
                onClick={() => removeMeal(m.id)}
                className="mono text-[0.45rem] text-[oklch(0.4_0.015_260)] opacity-0 group-hover:opacity-100 hover:text-danger transition-opacity"
              >
                ✕
              </button>
              <span className="mono text-[0.55rem] text-[oklch(0.4_0.015_260)] w-10">
                {m.time}
              </span>
              <span className="flex-1 text-[oklch(0.7_0.01_90)] truncate">
                {m.name}
              </span>
              <input
                type="number"
                value={m.p || ""}
                onChange={(e) => updateMacro(m.id, "p", Number(e.target.value) || 0)}
                className="w-9 bg-transparent text-right mono text-xs text-[oklch(0.62_0.18_150)] focus:outline-none"
                placeholder="0"
              />
              <span className="text-[oklch(0.4_0.015_260)] text-[0.5rem]">P</span>
              <input
                type="number"
                value={m.c || ""}
                onChange={(e) => updateMacro(m.id, "c", Number(e.target.value) || 0)}
                className="w-9 bg-transparent text-right mono text-xs text-[oklch(0.7_0.18_80)] focus:outline-none"
                placeholder="0"
              />
              <span className="text-[oklch(0.4_0.015_260)] text-[0.5rem]">C</span>
              <input
                type="number"
                value={m.f || ""}
                onChange={(e) => updateMacro(m.id, "f", Number(e.target.value) || 0)}
                className="w-9 bg-transparent text-right mono text-xs text-danger focus:outline-none"
                placeholder="0"
              />
              <span className="text-[oklch(0.4_0.015_260)] text-[0.5rem]">F</span>
              <span className="mono text-xs text-white w-10 text-right">
                {m.kcal}k
              </span>
            </div>
          ))
        )}
      </div>

      {/* Add meal */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addMeal()}
          placeholder="z.B. Hähnchen mit Reis"
          className="flex-1 bg-[oklch(0.12_0.008_270/0.5)] border border-[oklch(0.28_0.012_260/0.4)] rounded px-2 py-1.5 text-xs text-white placeholder:text-[oklch(0.4_0.015_260)] focus:outline-none focus:border-accent"
        />
        <button
          onClick={addMeal}
          className="px-3 py-1.5 rounded bg-accent/20 border border-accent/30 text-accent hover:bg-accent/30 transition-colors mono text-[0.6rem]"
        >
          CAPTURE
        </button>
      </div>
    </div>
  );
}
