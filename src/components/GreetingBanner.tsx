"use client";

export default function GreetingBanner() {
  const d = new Date();
  const h = d.getHours();
  const greet =
    h < 6
      ? "Gute Nacht"
      : h < 11
      ? "Guten Morgen"
      : h < 14
      ? "Guten Tag"
      : h < 18
      ? "Guten Nachmittag"
      : h < 22
      ? "Guten Abend"
      : "Gute Nacht";

  const dateStr = d.toLocaleDateString("de-DE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="panel relative overflow-hidden">
      {/* Subtle gradient accent */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 flex items-center justify-between">
        <div>
          <div className="flex items-baseline gap-3">
            <h2 className="text-xl font-bold text-white">{greet}, Paulo 👋</h2>
            <span className="mono text-[0.55rem] tracking-[0.1em] text-[oklch(0.5_0.02_260)]">
              {dateStr.toUpperCase()}
            </span>
          </div>
          <p className="text-xs text-[oklch(0.6_0.025_260)] mt-1">
            {h < 12
              ? "Starte den Tag mit deinen wichtigsten Aufgaben."
              : h < 17
              ? "Weiter geht's – bleib am Ball."
              : "Den Tag abschließen – was war heute wichtig?"}
          </p>
        </div>

        <div className="mono text-right">
          <div className="text-2xl font-bold text-accent">
            {d.toLocaleTimeString("de-DE", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
          <div className="text-[0.55rem] text-[oklch(0.4_0.015_260)]">
            CET · UTC+1
          </div>
        </div>
      </div>
    </div>
  );
}
