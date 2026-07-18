'use client';

import { useEffect, useState } from 'react';
import { couple } from '@/lib/data';

function getElapsed(from) {
  const now = new Date();
  const start = new Date(from);
  let diff = Math.max(0, now.getTime() - start.getTime());

  const msInSecond = 1000;
  const msInMinute = msInSecond * 60;
  const msInHour = msInMinute * 60;
  const msInDay = msInHour * 24;

  const days = Math.floor(diff / msInDay);
  diff -= days * msInDay;
  const hours = Math.floor(diff / msInHour);
  diff -= hours * msInHour;
  const minutes = Math.floor(diff / msInMinute);
  diff -= minutes * msInMinute;
  const seconds = Math.floor(diff / msInSecond);

  return { days, hours, minutes, seconds };
}

const UNITS = [
  { key: 'days', label: 'días' },
  { key: 'hours', label: 'horas' },
  { key: 'minutes', label: 'min' },
  { key: 'seconds', label: 'seg' },
];

export default function TimeCounter() {
  const [elapsed, setElapsed] = useState(null);

  useEffect(() => {
    setElapsed(getElapsed(couple.anniversaryDate));
    const interval = setInterval(() => {
      setElapsed(getElapsed(couple.anniversaryDate));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="glass-strong grid grid-cols-4 gap-2 rounded-3xl px-4 py-5 shadow-glass
                 sm:gap-4 sm:px-8 sm:py-6"
      role="timer"
      aria-live="off"
      aria-label="Tiempo que llevamos juntos"
    >
      {UNITS.map((unit) => (
        <div key={unit.key} className="flex flex-col items-center">
          <span className="font-display text-2xl font-semibold tabular-nums text-coral sm:text-4xl">
            {elapsed ? String(elapsed[unit.key]).padStart(2, '0') : '00'}
          </span>
          <span className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-ink/60 sm:text-xs">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}
