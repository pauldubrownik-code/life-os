import TopRail from "@/components/TopRail";
import OperatorCard from "@/components/OperatorCard";
import SessionCard from "@/components/SessionCard";
import HabitsCard from "@/components/HabitsCard";
import NutritionCard from "@/components/NutritionCard";
import CalendarCard from "@/components/CalendarCard";
import BlockersCard from "@/components/BlockersCard";
import FinancePulseCard from "@/components/FinancePulseCard";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <TopRail />

      {/* Capture Bar */}
      <div className="px-5 py-2 border-b border-[oklch(0.28_0.012_260/0.2)]">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <span className="live-dot" />
          <span className="mono text-[0.55rem] tracking-[0.1em] text-[oklch(0.4_0.015_260)]">
            CAPTURE
          </span>
          <input
            type="text"
            placeholder={'Log a meal, task, note — try "estimate 500 cals"'}
            className="flex-1 bg-transparent border-b border-[oklch(0.28_0.012_260/0.3)] py-1 text-xs text-white placeholder:text-[oklch(0.4_0.015_260)] focus:outline-none focus:border-accent transition-colors"
          />
          <span className="mono text-[0.5rem] text-[oklch(0.5_0.02_260)]">⌘K</span>
        </div>
      </div>

      {/* 3-Column Dashboard Grid */}
      <main className="flex-1 px-5 py-4">
        <div className="max-w-7xl mx-auto grid grid-cols-12 gap-4">
          {/* LEFT COLUMN (3/12) */}
          <div className="col-span-12 md:col-span-3 space-y-4">
            <OperatorCard />
            <FinancePulseCard />
            <BlockersCard />
          </div>

          {/* CENTER COLUMN (6/12) */}
          <div className="col-span-12 md:col-span-6 space-y-4">
            <SessionCard />
            <HabitsCard />
            <CalendarCard />
          </div>

          {/* RIGHT COLUMN (3/12) */}
          <div className="col-span-12 md:col-span-3 space-y-4">
            <NutritionCard />
          </div>
        </div>
      </main>
    </div>
  );
}
