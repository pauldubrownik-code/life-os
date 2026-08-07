"use client";
import { useEffect, useState } from "react";

const WEEKDAYS_SHORT = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

type CalendarEvent = {
  id: string;
  title: string;
  start: string;
  end: string;
  calendar?: string;
  color?: string;
  allDay?: boolean;
};

function getWeekDates() {
  const today = new Date();
  const start = new Date(today);
  start.setDate(today.getDate() - today.getDay() + 1);
  const days: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    days.push(d);
  }
  return { days, today };
}

function fmtTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" });
}

function loadEvents(selectedKey: string, events: CalendarEvent[]) {
  return events.filter((e) => {
    const eDate = e.start?.split("T")[0] || "";
    return eDate === selectedKey;
  });
}

export default function CalendarCard() {
  const { days, today } = getWeekDates();
  const [selectedDay, setSelectedDay] = useState(today.getDay() === 0 ? 6 : today.getDay() - 1);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [connected, setConnected] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);

  const sel = days[selectedDay];
  const selKey = sel.toISOString().split("T")[0];
  const dayEvents = loadEvents(selKey, events);

  // Check connection on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("calendar") === "connected") setConnected(true);
    fetchEvents();
  }, []);

  async function fetchEvents() {
    setLoading(true);
    try {
      const res = await fetch("/api/calendar");
      if (res.status === 401) {
        setConnected(false);
        return;
      }
      if (!res.ok) throw new Error("Fetch failed");
      const data = await res.json();
      setEvents(data.events || []);
      setConnected(true);
    } catch {
      setConnected(false);
    } finally {
      setLoading(false);
    }
  }

  function connectGoogle() {
    window.location.href = "/api/auth/google";
  }

  return (
    <div className="panel space-y-3">
      <div className="flex items-center justify-between">
        <span className="mono text-[0.65rem] tracking-[0.15em] text-[oklch(0.5_0.02_260)]">
          04 // CALENDAR
        </span>
        <div className="flex items-center gap-2">
          {connected === false && (
            <button
              onClick={connectGoogle}
              className="mono text-[0.55rem] bg-[#4285F4]/20 border border-[#4285F4]/40 text-[#4285F4] px-2 py-1 rounded hover:bg-[#4285F4]/30 transition-colors"
            >
              + GOOGLE CAL
            </button>
          )}
          {connected && (
            <button
              onClick={fetchEvents}
              className="mono text-[0.5rem] text-[oklch(0.4_0.015_260)] hover:text-white px-1"
              title="Refresh"
            >
              ↻
            </button>
          )}
          <span className="mono text-[0.55rem] tracking-[0.08em] text-[oklch(0.4_0.015_260)]">
            {sel.toLocaleDateString("en-US", { month: "long", year: "numeric" }).toUpperCase()}
          </span>
        </div>
      </div>

      {/* Connection status */}
      {connected === null && !loading && (
        <div className="flex items-center gap-2 py-1">
          <button
            onClick={connectGoogle}
            className="flex-1 text-center mono text-[0.55rem] bg-[oklch(0.28_0.012_260/0.4)] border border-[oklch(0.28_0.012_260/0.5)] text-[oklch(0.5_0.02_260)] py-2 rounded hover:text-white hover:bg-[oklch(0.28_0.012_260/0.6)] transition-colors"
          >
            MIT GOOGLE CALENDAR VERBINDEN
          </button>
        </div>
      )}
      {loading && (
        <div className="text-center mono text-[0.55rem] text-[oklch(0.4_0.015_260)] py-2">Lade Kalender...</div>
      )}

      {/* Week strip */}
      <div className="flex gap-1">
        {days.map((d, i) => {
          const isToday = d.toDateString() === today.toDateString();
          const isSel = i === selectedDay;
          const hasEvents = events.some((e) => (e.start?.split("T")[0] || "") === d.toISOString().split("T")[0]);
          return (
            <button
              key={i}
              onClick={() => setSelectedDay(i)}
              className={`flex-1 flex flex-col items-center py-2 rounded-md transition-colors relative ${
                isSel
                  ? "bg-accent/20 border border-accent/30"
                  : isToday
                  ? "bg-[oklch(0.28_0.012_260/0.3)]"
                  : "hover:bg-[oklch(0.28_0.012_260/0.2)]"
              }`}
            >
              <span className="mono text-[0.5rem] text-[oklch(0.4_0.015_260)]">{WEEKDAYS_SHORT[i]}</span>
              <span className={`mono text-sm ${isToday ? "text-accent" : "text-white"}`}>{d.getDate()}</span>
              {hasEvents && <span className="absolute bottom-1 w-1 h-1 rounded-full bg-accent" />}
            </button>
          );
        })}
      </div>

      {/* Events for selected day */}
      <div className="space-y-1 min-h-[60px] max-h-28 overflow-y-auto">
        {dayEvents.length > 0 ? (
          dayEvents.map((ev) => (
            <div key={ev.id} className="flex items-center gap-2 text-xs py-1 px-1.5 rounded hover:bg-[oklch(0.28_0.012_260/0.2)]">
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ backgroundColor: ev.color || "#4285F4" }}
              />
              <span className="mono text-[0.55rem] text-[oklch(0.4_0.015_260)] w-12 shrink-0">
                {ev.allDay ? "ALL DAY" : fmtTime(ev.start)}
              </span>
              <span className="flex-1 text-[oklch(0.7_0.01_90)] truncate">{ev.title}</span>
              {ev.calendar && (
                <span className="tag text-[0.45rem] border border-[oklch(0.28_0.012_260/0.4)] text-[oklch(0.4_0.015_260)]">
                  {ev.calendar}
                </span>
              )}
            </div>
          ))
        ) : connected ? (
          <p className="text-[0.65rem] text-[oklch(0.4_0.015_260)] italic text-center py-3">
            Keine Termine an diesem Tag
          </p>
        ) : !loading && (
          <p className="text-[0.65rem] text-[oklch(0.4_0.015_260)] italic text-center py-3">
            Verbinde Google Calendar für Live-Daten
          </p>
        )}
      </div>
    </div>
  );
}
