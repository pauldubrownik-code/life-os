"use client";
import { useState } from "react";

type Meal = {
  id: string;
  name: string;
  kcal: number;
  p: number;
  c: number;
  f: number;
  time: string;
};

export default function NutritionCard() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [input, setInput] = useState("");

  const addMeal = () => {
    if (!input.trim()) return;
    const meal: Meal = {
      id: Date.now().toString(),
      name: input,
      kcal: 0,
      p: 0,
      c: 0,
      f: 0,
      time: new Date().toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" }),
    };
    setMeals((prev) => [...prev, meal]);
    setInput("");
  };

  const updateMacro = (id: string, field: "kcal" | "p" | "c" | "f", value: number) => {
    setMeals((prev) =>
      prev.map((m) => {
        if (m.id !== id) return m;
        const updated = { ...m, [field]: value };
        if (field === "p" || field === "c" || field === "f") {
          updated.kcal = 4 * (field === "p" ? value : m.p) + 4 * (field === "c" ? value : m.c) + 9 * (field === "f" ? value : m.f);
        }
        return updated;
      })
    );
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
          <button className="mono text-[0.6rem] text-[oklch(0.4_0.015_260)] hover:text-white px-1">&lt;</button>
          <span className="mono text-[0.6rem] tracking-[0.08em] text-[oklch(0.5_0.02_260)]">TODAY</span>
          <button className="mono text-[0.6rem] text-[oklch(0.4_0.015_260)] hover:text-white px-1">&gt;</button>
          <span className="mono text-[0.6rem] text-[oklch(0.4_0.015_260)]">HISTO</span>
        </div>
      </div>

      {/* Macro rings */}
      <div className="grid grid-cols-4 gap-2 text-center">
        <div>
          <div className="mono text-2xl text-white">{totalKcal}</div>
          <div className="mono text-[0.5rem] tracking-[0.1em] text-[oklch(0.4_0.015_260)]">
            {totalKcal}/2800 KCAL
          </div>
        </div>
        <div>
          <div className="mono text-lg text-[oklch(0.62_0.18_150)]">{totalP}g</div>
          <div className="mono text-[0.5rem] tracking-[0.1em] text-[oklch(0.4_0.015_260)]">PROTEIN 0/180g</div>
        </div>
        <div>
          <div className="mono text-lg text-[oklch(0.7_0.18_80)]">{totalC}g</div>
          <div className="mono text-[0.5rem] tracking-[0.1em] text-[oklch(0.4_0.015_260)]">CARBS 0/300g</div>
        </div>
        <div>
          <div className="mono text-lg text-[oklch(0.6_0.2_25)]">{totalF}g</div>
          <div className="mono text-[0.5rem] tracking-[0.1em] text-[oklch(0.4_0.015_260)]">FAT 0/80g</div>
        </div>
        <div className="col-span-4">
          <div className="h-1.5 bg-[oklch(0.28_0.012_260/0.5)] rounded-full overflow-hidden">
            <div className="h-full bg-accent rounded-full transition-all" style={{ width: `${Math.min(100, (totalKcal / 2800) * 100)}%` }} />
          </div>
          <div className="mono text-[0.55rem] text-[oklch(0.6_0.025_260)] mt-1">
            −{deficit > 0 ? deficit : 0} deficit
          </div>
        </div>
      </div>

      {/* Meals */}
      <div className="space-y-1 max-h-40 overflow-y-auto">
        {meals.map((m) => (
          <div key={m.id} className="flex items-center gap-2 text-xs py-1 border-b border-[oklch(0.28_0.012_260/0.2)] last:border-0">
            <span className="mono text-[0.55rem] text-[oklch(0.4_0.015_260)] w-10">{m.time}</span>
            <span className="flex-1 text-[oklch(0.7_0.01_90)] truncate">{m.name}</span>
            <input
              type="number"
              value={m.p || ""}
              onChange={(e) => updateMacro(m.id, "p", Number(e.target.value) || 0)}
              className="w-10 bg-transparent text-right mono text-xs text-[oklch(0.62_0.18_150)] focus:outline-none"
              placeholder="0"
            />
            <span className="text-[oklch(0.4_0.015_260)]">p</span>
            <span className="mono text-xs text-white">{m.kcal}k</span>
          </div>
        ))}
      </div>

      {/* Add meal */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addMeal()}
          placeholder="estimate 500 cals"
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
