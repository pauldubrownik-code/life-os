"use client";
import { useState, useEffect } from "react";
import { getStreak } from "@/lib/store";

export default function OperatorCard() {
  const [time, setTime] = useState("");
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    setStreak(getStreak());
    const tick = () => {
      const d = new Date();
      setTime(
        d.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })
      );
    };
    tick();
    const iv = setInterval(tick, 30000);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="panel space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="mono text-[0.65rem] tracking-[0.15em] text-[oklch(0.5_0.02_260)]">
          01 // OPERATOR
        </span>
        <span className="tag text-[oklch(0.62_0.18_150)] border border-[oklch(0.62_0.18_150/0.3)]">
          <span className="live-dot" /> ONLINE
        </span>
      </div>

      {/* Person */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-accent font-bold text-sm">
          P
        </div>
        <div>
          <div className="text-sm font-semibold text-white">Paulo</div>
          <div className="mono text-[0.55rem] text-[oklch(0.5_0.02_260)]">
            Christian Radden · DE
          </div>
        </div>
      </div>

      {/* Streak */}
      <div className="flex items-center justify-between pt-1 border-t border-[oklch(0.28_0.012_260/0.3)]">
        <div>
          <span className="mono text-[0.55rem] tracking-[0.15em] text-[oklch(0.4_0.015_260)]">
            STREAK
          </span>
          <div className="flex items-baseline gap-2">
            <span className="mono text-2xl text-[oklch(0.62_0.18_150)]">
              {streak}
            </span>
            <span className="mono text-xs text-[oklch(0.5_0.02_260)]">
              DAY{streak !== 1 ? "S" : ""}
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="mono text-[0.5rem] text-[oklch(0.4_0.015_260)]">
            CET · UTC+1
          </div>
          <div className="mono text-xs text-white">{time}</div>
        </div>
      </div>
    </div>
  );
}
