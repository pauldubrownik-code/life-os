"use client";
import { useState } from "react";

const WEEKDAYS_SHORT = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

function getWeekDates() {
  const today = new Date();
  const start = new Date(today);
  start.setDate(today.getDate() - today.getDay() + 1); // Monday
  const days: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    days.push(d);
  }
  return { days, today };
}

const EVENTS: Record<string, { time: string; title: string; tag?: string }[]> = {
  // Keyed by YYYY-MM-DD
};

export default function CalendarCard() {
  const { days, today } = getWeekDates();
  const [selectedDay, setSelectedDay] = useState(today.getDay() === 0 ? 6 : today.getDay() - 1);

  const sel = days[selectedDay];
  const selKey = sel.toISOString().split("T")[0];
  const dayEvents = EVENTS[selKey] || [];

  return (
    <div className="panel space-y-3">
      <div className="flex items-center justify-between">
        <span className="mono text-[0.65rem] tracking-[0.15em] text-[oklch(0.5_0.02_260)]">
          04 // CALENDAR
        </span>
        <span className="mono text-[0.55rem] tracking-[0.08em] text-[oklch(0.4_0.015_260)]">
          {sel.toLocaleDateString("en-US", { month: "long", year: "numeric" }).toUpperCase()}
        </span>
      </div>

      {/* Week strip */}
      <div className="flex gap-1">
        {days.map((d, i) => {
          const isToday = d.toDateString() === today.toDateString();
          const isSel = i === selectedDay;
          return (
            <button
              key={i}
              onClick={() => setSelectedDay(i)}
              className={`flex-1 flex flex-col items-center py-2 rounded-md transition-colors ${
                isSel
                  ? "bg-accent/20 border border-accent/30"
                  : isToday
                  ? "bg-[oklch(0.28_0.012_260/0.3)]"
                  : "hover:bg-[oklch(0.28_0.012_260/0.2)]"
              }`}
            >
              <span className="mono text-[0.5rem] text-[oklch(0.4_0.015_260)]">{WEEKDAYS_SHORT[i]}</span>
              <span className={`mono text-sm ${isToday ? "text-accent" : "text-white"}`}>{d.getDate()}</span>
            </button>
          );
        })}
      </div>

      {/* Events for selected day */}
      <div className="space-y-1 min-h-[60px]">
        {dayEvents.length > 0 ? (
          dayEvents.map((ev, i) => (
            <div key={i} className="flex items-center gap-2 text-xs py-1">
              <span className="mono text-[0.55rem] text-[oklch(0.4_0.015_260)] w-12">{ev.time}</span>
              <span className="flex-1 text-white">{ev.title}</span>
              {ev.tag && <span className="tag border border-accent/30 text-accent text-[0.5rem]">{ev.tag}</span>}
            </div>
          ))
        ) : (
          <p className="text-[0.65rem] text-[oklch(0.4_0.015_260)] italic text-center py-3">
            Keine Events – verbinde Google Calendar für Live-Daten
          </p>
        )}
      </div>
    </div>
  );
}
