"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { label: "HOME", path: "/" },
  { label: "CRM", path: "/crm" },
  { label: "FINANCE", path: "/finance" },
  { label: "REVIEW", path: "/review" },
];

function fmtDate() {
  const d = new Date();
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  return `${days[d.getDay()]}, ${months[d.getMonth()]} ${String(d.getDate()).padStart(2, "0")}, ${d.getFullYear()}`;
}

function fmtTime() {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

export default function TopRail() {
  const path = usePathname();

  return (
    <header className="flex items-center justify-between px-5 py-3 border-b border-[oklch(0.28_0.012_260/0.3)]">
      {/* Left – Brand */}
      <div className="flex items-center gap-6">
        <span className="mono text-sm tracking-[0.15em] text-[oklch(0.6_0.18_240)] font-bold">
          PAULO OS//V1.0
        </span>
        {/* Tabs */}
        <nav className="flex items-center gap-1">
          {TABS.map((t) => {
            const active = path === t.path;
            return (
              <Link
                key={t.path}
                href={t.path}
                className={`mono text-xs tracking-[0.1em] px-3 py-1.5 rounded-md transition-colors ${
                  active
                    ? "text-white bg-[oklch(0.28_0.012_260/0.5)]"
                    : "text-[oklch(0.55_0.025_260)] hover:text-white hover:bg-[oklch(0.28_0.012_260/0.3)]"
                }`}
              >
                {t.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Right – Market Tickers + Time */}
      <div className="flex items-center gap-4 mono text-xs">
        <span className="text-[oklch(0.55_0.025_260)]">BTC <span className="text-[oklch(0.62_0.18_150)]">$64,120</span></span>
        <span className="text-[oklch(0.55_0.025_260)]">NDX <span className="text-white">18,240</span></span>
        <span className="text-[oklch(0.55_0.025_260)]">XAU <span className="text-[oklch(0.7_0.18_80)]">$2,384</span></span>
        <div className="h-4 w-px bg-[oklch(0.28_0.012_260/0.4)]" />
        <span className="text-[oklch(0_0_0/0)]">|</span>
        <span className="text-[oklch(0.6_0.025_260)] tracking-[0.05em]">{fmtDate()}</span>
        <span className="mono text-[oklch(0.6_0.025_260)]">{fmtTime()}</span>
      </div>
    </header>
  );
}
