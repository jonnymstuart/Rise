"use client";

import { useEffect, useState } from "react";

const zones = [
  { label: "Lisbon", tz: "Europe/Lisbon" },
  { label: "London", tz: "Europe/London" },
  { label: "New York", tz: "America/New_York" },
  { label: "San Francisco", tz: "America/Los_Angeles" },
];

function timeIn(tz: string, date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: tz,
  }).format(date);
}

export function WorldClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 20_000);
    return () => clearInterval(id);
  }, []);

  return (
    <ul className="space-y-3">
      {zones.map((z) => (
        <li key={z.tz} className="flex items-center justify-between gap-4">
          <span className="text-ink-2">{z.label}</span>
          <span className="text-muted tabular-nums">
            {now ? timeIn(z.tz, now) : "--:--"}
          </span>
        </li>
      ))}
    </ul>
  );
}
