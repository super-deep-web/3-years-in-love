"use client";

import { useEffect, useState } from "react";
import {
  Heart,
  Star,
  Sun,
  Cloud,
  Flower2,
  Gift,
  Bell,
  Candy,
  Sparkles,
  Moon,
  Music,
  Gem,
} from "lucide-react";

const LEVELS = [
  { length: 4, stepMs: 650, icons: [Heart, Star, Sun, Cloud] },
  { length: 6, stepMs: 850, icons: [Flower2, Gift, Bell, Candy] },
  { length: 8, stepMs: 1050, icons: [Sparkles, Moon, Music, Gem] },
];

const STARTING_LIVES = 3;

function generateSequence(length) {
  return Array.from({ length }, () => Math.floor(Math.random() * 4));
}

export default function GiftBoxGame({ onWin, onLose }) {
  const [levelIndex, setLevelIndex] = useState(0);
  const [lives, setLives] = useState(STARTING_LIVES);
  const [sequence, setSequence] = useState(() =>
    generateSequence(LEVELS[0].length),
  );
  const [phase, setPhase] = useState("showing");
  const [playerIndex, setPlayerIndex] = useState(0);
  const [stageIndex, setStageIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [wrongFlash, setWrongFlash] = useState(false);

  const level = LEVELS[levelIndex];
  const icons = level.icons;

  useEffect(() => {
    if (phase !== "showing") return undefined;

    let cancelled = false;
    const timeouts = [];
    const { stepMs } = level;

    sequence.forEach((iconIndex, i) => {
      const onTimeout = setTimeout(
        () => {
          if (cancelled) return;
          setStageIndex(iconIndex);
          const offTimeout = setTimeout(() => {
            if (!cancelled) setStageIndex(null);
          }, stepMs * 0.6);
          timeouts.push(offTimeout);
        },
        i * stepMs + 500,
      );
      timeouts.push(onTimeout);
    });

    const finishTimeout = setTimeout(
      () => {
        if (!cancelled) setPhase("input");
      },
      sequence.length * stepMs + 500,
    );
    timeouts.push(finishTimeout);

    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
  }, [phase, sequence, level]);

  const handleTap = (index) => {
    if (phase !== "input") return;

    setActiveIndex(index);
    setTimeout(() => setActiveIndex(null), 200);

    if (sequence[playerIndex] === index) {
      const nextPlayerIndex = playerIndex + 1;

      if (nextPlayerIndex === sequence.length) {
        setPhase("levelComplete");
        setTimeout(() => {
          if (levelIndex === LEVELS.length - 1) {
            onWin();
          } else {
            const nextLevel = levelIndex + 1;
            setLevelIndex(nextLevel);
            setSequence(generateSequence(LEVELS[nextLevel].length));
            setPlayerIndex(0);
            setPhase("showing");
          }
        }, 1100);
      } else {
        setPlayerIndex(nextPlayerIndex);
      }
      return;
    }

    setWrongFlash(true);
    setTimeout(() => setWrongFlash(false), 400);

    const newLives = lives - 1;
    setLives(newLives);
    setPlayerIndex(0);

    if (newLives <= 0) {
      setTimeout(() => onLose(), 600);
    } else {
      setTimeout(() => {
        setSequence(generateSequence(level.length));
        setPhase("showing");
      }, 600);
    }
  };

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-6">
      <div className="flex w-full items-center justify-between px-1">
        <span className="text-sm font-semibold text-terracotta">
          Nivel {levelIndex + 1}/{LEVELS.length}
        </span>
        <div className="flex gap-1">
          {Array.from({ length: STARTING_LIVES }).map((_, index) => (
            <Heart
              key={index}
              size={18}
              className={
                index < lives ? "fill-coral text-coral" : "text-ink/20"
              }
            />
          ))}
        </div>
      </div>

      <p className="min-h-[20px] text-sm font-medium text-ink/70">
        {phase === "showing" && "Recuerda el orden..."}
        {phase === "input" && "Ahora pulsa los botones en el orden correcto"}
        {phase === "levelComplete" && `¡Nivel ${levelIndex + 1} superado!`}
      </p>

      <div className="glass flex h-28 w-28 items-center justify-center rounded-3xl">
        {stageIndex !== null &&
          (() => {
            const StageIcon = icons[stageIndex];
            return (
              <StageIcon
                size={44}
                strokeWidth={1.8}
                className="text-coral animate-fade-in-up"
              />
            );
          })()}
      </div>

      <div
        className={`grid grid-cols-2 gap-4 ${wrongFlash ? "animate-shake" : ""}`}
      >
        {icons.map((Icon, index) => {
          const isActive = activeIndex === index;
          return (
            <button
              key={index}
              type="button"
              onClick={() => handleTap(index)}
              disabled={phase !== "input"}
              aria-label={`Botón ${index + 1}`}
              className={`flex h-20 w-20 items-center justify-center rounded-3xl shadow-glass transition-all duration-150 active:scale-90 ${
                isActive
                  ? "scale-105 bg-coral text-cream"
                  : "bg-ivory text-terracotta"
              }`}
            >
              <Icon size={30} strokeWidth={1.8} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
