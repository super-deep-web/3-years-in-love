"use client";

import { useEffect, useState } from "react";
import { Heart, Pointer, Sparkles, Star } from "lucide-react";

const BURST_ICONS = [Sparkles, Heart, Star];
const BURST_COLORS = [
  "text-sage",
  "text-coral",
  "text-apricot",
  "text-terracotta",
];
const BURST_COUNT = 6;

const LEVELS = [
  { required: 12, timeMs: 6000 },
  { required: 20, timeMs: 5500 },
  { required: 30, timeMs: 5000 },
];

export default function CardPickGame({ onWin, onLose }) {
  const [levelIndex, setLevelIndex] = useState(0);
  const [taps, setTaps] = useState(0);
  const [timeLeft, setTimeLeft] = useState(LEVELS[0].timeMs);
  const [levelComplete, setLevelComplete] = useState(false);
  const [pulses, setPulses] = useState([]);
  const [bursts, setBursts] = useState([]);

  const level = LEVELS[levelIndex];
  const percent = Math.min(100, Math.round((taps / level.required) * 100));
  const timePercent = Math.max(0, Math.round((timeLeft / level.timeMs) * 100));

  useEffect(() => {
    if (levelComplete) return undefined;

    const interval = setInterval(() => {
      setTimeLeft((t) => Math.max(0, t - 100));
    }, 100);

    return () => clearInterval(interval);
  }, [levelIndex, levelComplete]);

  useEffect(() => {
    if (levelComplete) return;
    if (timeLeft <= 0) {
      onLose();
    }
  }, [timeLeft, levelComplete, onLose]);

  const handleTap = () => {
    if (levelComplete) return;

    const nextTaps = taps + 1;
    setTaps(nextTaps);

    const pulseId = Date.now() + Math.random();
    setPulses((prev) => [...prev, pulseId]);
    setTimeout(() => {
      setPulses((prev) => prev.filter((id) => id !== pulseId));
    }, 700);

    const burstId = pulseId;
    const particles = Array.from({ length: BURST_COUNT }).map((_, i) => {
      const angle =
        (Math.PI * 2 * i) / BURST_COUNT + (Math.random() * 0.5 - 0.25);
      const radius = 44 + Math.random() * 20;
      return {
        key: `${burstId}-${i}`,
        tx: Math.cos(angle) * radius,
        ty: Math.sin(angle) * radius,
        Icon: BURST_ICONS[i % BURST_ICONS.length],
        color: BURST_COLORS[i % BURST_COLORS.length],
      };
    });
    setBursts((prev) => [...prev, { id: burstId, particles }]);
    setTimeout(() => {
      setBursts((prev) => prev.filter((b) => b.id !== burstId));
    }, 650);

    if (nextTaps >= level.required) {
      setLevelComplete(true);
      setTimeout(() => {
        if (levelIndex === LEVELS.length - 1) {
          onWin();
        } else {
          setLevelIndex((i) => i + 1);
          setTaps(0);
          setTimeLeft(LEVELS[levelIndex + 1].timeMs);
          setLevelComplete(false);
        }
      }, 900);
    }
  };

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-6">
      <div className="flex w-full items-center justify-between px-1">
        <span className="text-sm font-semibold text-terracotta">
          Nivel {levelIndex + 1}/{LEVELS.length}
        </span>
        <span className="text-sm font-semibold text-ink/60">
          {taps}/{level.required}
        </span>
      </div>

      <div className="h-2 w-full overflow-hidden rounded-full bg-ivory">
        <div
          className="h-full rounded-full bg-coral transition-all duration-100 ease-linear"
          style={{ width: `${timePercent}%` }}
        />
      </div>

      {levelComplete ? (
        <p className="font-display text-xl font-medium text-coral animate-fade-in-up">
          ¡Nivel {levelIndex + 1} superado!
        </p>
      ) : (
        <>
          <div className="relative flex h-32 w-32 items-center justify-center">
            <Heart
              size={110}
              strokeWidth={1.5}
              className="absolute text-terracotta/25"
            />
            <div
              className="absolute overflow-hidden"
              style={{ clipPath: `inset(${100 - percent}% 0 0 0)` }}
            >
              <Heart
                size={110}
                strokeWidth={1.5}
                className="fill-coral text-coral"
              />
            </div>

            {pulses.map((id) => (
              <span
                key={id}
                className="pointer-events-none absolute text-sm font-bold text-coral animate-tap-pop"
              >
                +1
              </span>
            ))}
          </div>

          <div className="relative flex h-24 w-24 items-center justify-center">
            {bursts.map((burst) =>
              burst.particles.map((particle) => {
                const ParticleIcon = particle.Icon;
                return (
                  <span
                    key={particle.key}
                    className={`pointer-events-none absolute left-1/2 top-1/2 animate-burst ${particle.color}`}
                    style={{
                      "--tx": `${particle.tx}px`,
                      "--ty": `${particle.ty}px`,
                    }}
                  >
                    <ParticleIcon size={14} className="fill-current" />
                  </span>
                );
              }),
            )}

            <button
              type="button"
              onClick={handleTap}
              aria-label="Tocar para llenar el corazón"
              className="relative flex aspect-square h-24 w-24 shrink-0 items-center justify-center rounded-full bg-coral text-cream shadow-glass transition-transform duration-100 active:scale-90"
            >
              <Pointer size={30} strokeWidth={1.8} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
