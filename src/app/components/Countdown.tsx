"use client";

import { useEffect, useState } from "react";

const pad = (n: number) => String(n).padStart(2, "0");

export default function Countdown({ target }: { target: string }) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const remaining = now === null ? null : new Date(target).getTime() - now;

  if (remaining !== null && remaining <= 0) {
    return <p className="countdown-done">happening now / see you there</p>;
  }

  const total = Math.max(0, Math.floor((remaining ?? 0) / 1000));
  const units = [
    { label: "days", value: Math.floor(total / 86400) },
    { label: "hrs", value: Math.floor((total % 86400) / 3600) },
    { label: "min", value: Math.floor((total % 3600) / 60) },
    { label: "sec", value: total % 60 },
  ];

  return (
    <div className="countdown" role="timer" aria-label="Time until the event">
      {units.map((unit) => (
        <div key={unit.label} className="countdown-unit">
          <span className="countdown-value">
            {remaining === null ? "--" : pad(unit.value)}
          </span>
          <span className="countdown-label">{unit.label}</span>
        </div>
      ))}
    </div>
  );
}
