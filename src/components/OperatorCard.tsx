export default function OperatorCard() {
  return (
    <div className="panel space-y-3">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <span className="mono text-[0.65rem] tracking-[0.15em] text-[oklch(0.5_0.02_260)]">
          01 // OPERATOR
        </span>
        <span className="tag text-[oklch(0.62_0.18_150)] border border-[oklch(0.62_0.18_150/0.3)]">
          <span className="live-dot" /> ONLINE
        </span>
      </div>

      {/* Session */}
      <div className="flex items-baseline gap-2">
        <span className="mono text-[0.6rem] tracking-[0.15em] text-[oklch(0.45_0.02_260)]">
          02 // SESSION
        </span>
        <span className="mono text-xs text-[oklch(0.5_0.02_260)]">[ FIRST ] [ LAST ]</span>
      </div>

      {/* Role + City */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="mono text-[0.6rem] tracking-[0.1em] text-[oklch(0.4_0.015_260)]">[ ROLE ]</span>
          <span className="text-[oklch(0.5_0.02_260)]">·</span>
          <span className="mono text-[0.6rem] tracking-[0.1em] text-[oklch(0.4_0.015_260)]">[ CITY ]</span>
        </div>
        <div className="mono text-[0.6rem] tracking-[0.1em] text-[oklch(0.4_0.015_260)]">
          FOCUS
        </div>
        <p className="text-xs text-[oklch(0.7_0.01_90)] italic">
          [Your focus today]
        </p>
      </div>

      {/* Streak */}
      <div className="flex items-center justify-between pt-1 border-t border-[oklch(0.28_0.012_260/0.3)]">
        <div>
          <span className="mono text-[0.55rem] tracking-[0.15em] text-[oklch(0.4_0.015_260)]">
            STREAK
          </span>
          <div className="mono text-xl text-[oklch(0.62_0.18_150)]">0 DAYS</div>
        </div>
        <div className="text-right">
          <div className="mono text-[0.55rem] tracking-[0.1em] text-[oklch(0.4_0.015_260)]">
            [ REGION ] · UTC±0
          </div>
          <div className="mono text-xs text-white">{new Date().toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })}</div>
        </div>
      </div>
    </div>
  );
}
