import TopRail from "@/components/TopRail";
import { CrmTasksSection } from "./CrmTasksSection";

export default function CRMPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <TopRail />
      <main className="flex-1 px-5 py-4">
        <div className="max-w-7xl mx-auto space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="mono text-sm tracking-[0.15em] text-accent font-bold">
                CRM // TASKS
              </h1>
              <p className="mono text-[0.55rem] text-[oklch(0.5_0.02_260)] mt-1">
                Aufgaben verwalten · Mit ★ markieren für die Daily-Ansicht
              </p>
            </div>
          </div>

          {/* Task list */}
          <CrmTasksSection />
        </div>
      </main>
    </div>
  );
}
