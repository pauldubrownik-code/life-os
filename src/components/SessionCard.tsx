"use client";
import { useState } from "react";

export default function SessionCard() {
  const [oneThing, setOneThing] = useState("");

  return (
    <div className="panel space-y-3">
      <div className="flex items-center justify-between">
        <span className="mono text-[0.65rem] tracking-[0.15em] text-[oklch(0.5_0.02_260)]">
          07 // FINANCE PULSE – LIVE
        </span>
        <span className="live-dot" />
      </div>

      {/* Date greeting */}
      <p className="text-xs text-[oklch(0.6_0.025_260)]">
        Good afternoon, Paulo.
      </p>
      <p className="mono text-[0.6rem] tracking-[0.08em] text-[oklch(0.4_0.015_260)]">
        {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }).toUpperCase()}
      </p>

      {/* "Today I will" */}
      <div className="space-y-1">
        <span className="mono text-[0.55rem] tracking-[0.1em] text-[oklch(0.4_0.015_260)]">
          TODAY I WILL
        </span>
        <input
          type="text"
          value={oneThing}
          onChange={(e) => setOneThing(e.target.value)}
          placeholder="Set today's one thing…"
          className="w-full bg-transparent border-b border-[oklch(0.28_0.012_260/0.4)] py-1 text-sm text-white placeholder:text-[oklch(0.45_0.02_260)] focus:outline-none focus:border-accent transition-colors"
        />
      </div>

      {/* Daily Score */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <span className="mono text-[0.55rem] tracking-[0.15em] text-[oklch(0.4_0.015_260)]">
            DAILY SCORE
          </span>
          <div className="mono text-2xl text-accent">0</div>
        </div>
        <div className="text-right">
          <div className="mono text-[0.55rem] tracking-[0.1em] text-[oklch(0.4_0.015_260)]">
            RESETS
          </div>
          <div className="mono text-xs text-[oklch(0.5_0.02_260)]">00:00</div>
        </div>
      </div>
    </div>
  );
}
