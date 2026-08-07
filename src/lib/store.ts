"use client";

// ─── Simple localStorage-backed store ───

function lsGet<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function lsSet<T>(key: string, val: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch {
    /* quota exceeded – silent */
  }
}

// ─── Types ───

export type Habit = {
  id: string;
  label: string;
  category: string;
  max: number; // 1 = simple toggle, >1 = counter
};

export type HabitProgress = Record<string, number>; // habit_id → count

export type Meal = {
  id: string;
  name: string;
  kcal: number;
  p: number;
  c: number;
  f: number;
  time: string;
};

export type Goal = {
  id: string;
  title: string;
  type: "weekly" | "monthly";
  icon: string;
  current: number;
  target: number;
  unit: string;
  createdAt: string;
};

export type CrmTask = {
  id: string;
  title: string;
  starred: boolean;
  done: boolean;
  createdAt: string;
};

// ─── Habit Progress ───

const HP_KEY = "paulo_habit_progress";
const HABITS_KEY = "paulo_habits";

export const DEFAULT_HABITS: Habit[] = [
  { id: "meditate", label: "Meditieren", category: "MORNING", max: 1 },
  { id: "journal", label: "Journaling", category: "MORNING", max: 1 },
  { id: "sport", label: "Sport / Bewegung", category: "FITNESS", max: 3 },
  { id: "steps", label: "10.000 Schritte", category: "FITNESS", max: 1 },
  { id: "reading", label: "Lesen (30min)", category: "GROWTH", max: 1 },
  { id: "coding", label: "Coden / Lernen", category: "GROWTH", max: 5 },
  { id: "nogluten", label: "Kein Gluten", category: "NUTRITION", max: 1 },
  { id: "water", label: "2L Wasser", category: "NUTRITION", max: 1 },
];

export function getHabits(): Habit[] {
  const stored = lsGet<Habit[] | null>(HABITS_KEY, null);
  return stored ?? DEFAULT_HABITS;
}
export function saveHabits(h: Habit[]) {
  lsSet(HABITS_KEY, h);
}
export function getHabitProgress(): HabitProgress {
  const today = new Date().toDateString();
  const all = lsGet<Record<string, HabitProgress>>(HP_KEY, {});
  return all[today] ?? {};
}
export function saveHabitProgress(prog: HabitProgress) {
  const today = new Date().toDateString();
  const all = lsGet<Record<string, HabitProgress>>(HP_KEY, {});
  all[today] = prog;
  lsSet(HP_KEY, all);
}
export function getStreak(): number {
  const all = lsGet<Record<string, HabitProgress>>(HP_KEY, {});
  const days = Object.keys(all).sort().reverse();
  let streak = 0;
  for (const d of days) {
    const p = all[d];
    const total = Object.values(p).reduce((s, v) => s + v, 0);
    if (total > 0) streak++;
    else break;
  }
  return streak;
}

// ─── Meals ───

const MEALS_KEY = "paulo_meals";
export function getMeals(): Meal[] {
  const today = new Date().toDateString();
  const all = lsGet<Record<string, Meal[]>>(MEALS_KEY, {});
  return all[today] ?? [];
}
export function saveMeals(meals: Meal[]) {
  const today = new Date().toDateString();
  const all = lsGet<Record<string, Meal[]>>(MEALS_KEY, {});
  all[today] = meals;
  lsSet(MEALS_KEY, all);
}

// ─── Goals ───

const GOALS_KEY = "paulo_goals";
export function getGoals(): Goal[] {
  return lsGet<Goal[]>(GOALS_KEY, []);
}
export function saveGoals(g: Goal[]) {
  lsSet(GOALS_KEY, g);
}

// ─── CRM Tasks ───

const TASKS_KEY = "paulo_crm_tasks";
export function getCrmTasks(): CrmTask[] {
  return lsGet<CrmTask[]>(TASKS_KEY, []);
}
export function saveCrmTasks(t: CrmTask[]) {
  lsSet(TASKS_KEY, t);
}

// ─── Calendar filter ───

const CAL_FILTER_KEY = "paulo_cal_filter";
export type CalFilter = "personal" | "family" | "all";
export function getCalFilter(): CalFilter {
  return lsGet<CalFilter>(CAL_FILTER_KEY, "all");
}
export function saveCalFilter(f: CalFilter) {
  lsSet(CAL_FILTER_KEY, f);
}

// ─── Finance collapsed state ───

const FINANCE_COLLAPSED_KEY = "paulo_finance_collapsed";
export function getFinanceCollapsed(): boolean {
  return lsGet<boolean>(FINANCE_COLLAPSED_KEY, false);
}
export function saveFinanceCollapsed(c: boolean) {
  lsSet(FINANCE_COLLAPSED_KEY, c);
}
