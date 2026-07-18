"use client";

import { useEffect, useRef, useState } from "react";
import { Heart, Bomb } from "lucide-react";

const WINNING_SCORE = 30;
const STARTING_LIVES = 3;
const MAX_BUBBLES = 4;
const BUBBLE_LIFESPAN = 1200; // ms que dura una burbuja antes de explotar sola
const POP_TRANSITION = 200; // ms de animación al reventar
const BOMB_CHANCE = 0.28;
const INITIAL_SPAWN_MS = 650; // qué tan rápido salen burbujas desde el inicio
const MIN_SPAWN_MS = 280; // velocidad máxima al final
const SPAWN_RAMP_PER_POINT = 12; // cuánto baja el intervalo por cada punto ganado

let idCounter = 0;

export default function BalloonPopGame({ onWin, onLose }) {
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(STARTING_LIVES);
  const [bubbles, setBubbles] = useState([]);

  const bubblesRef = useRef(bubbles);
  const timeoutsRef = useRef(new Map());
  const gameOverRef = useRef(false);

  useEffect(() => {
    bubblesRef.current = bubbles;
  }, [bubbles]);

  const removeBubble = (id) => {
    setBubbles((prev) => prev.filter((b) => b.id !== id));
    timeoutsRef.current.delete(id);
  };

  const popBubble = (id, tapped) => {
    if (gameOverRef.current) return;
    const bubble = bubblesRef.current.find((b) => b.id === id);
    if (!bubble || bubble.popping) return;

    setBubbles((prev) =>
      prev.map((b) => (b.id === id ? { ...b, popping: true } : b)),
    );

    const existingTimeout = timeoutsRef.current.get(id);
    if (existingTimeout) clearTimeout(existingTimeout);

    if (tapped) {
      if (bubble.type === "heart") {
        setScore((s) => Math.min(WINNING_SCORE, s + 1));
      } else {
        setLives((l) => Math.max(0, l - 1));
      }
    }

    const removalTimeout = setTimeout(() => removeBubble(id), POP_TRANSITION);
    timeoutsRef.current.set(id, removalTimeout);
  };

  // Genera burbujas nuevas; la velocidad aumenta conforme sube el puntaje
  useEffect(() => {
    if (gameOverRef.current) return undefined;

    const spawnInterval = Math.max(MIN_SPAWN_MS, INITIAL_SPAWN_MS - score * SPAWN_RAMP_PER_POINT);

    const interval = setInterval(() => {
      if (gameOverRef.current) return;
      if (bubblesRef.current.length >= MAX_BUBBLES) return;

      const id = idCounter++;
      const isBomb = Math.random() < BOMB_CHANCE;
      const newBubble = {
        id,
        type: isBomb ? "bomb" : "heart",
        left: Math.random() * 75 + 5,
        top: Math.random() * 65 + 5,
        popping: false,
      };

      setBubbles((prev) => [...prev, newBubble]);

      const autoTimeout = setTimeout(
        () => popBubble(id, false),
        BUBBLE_LIFESPAN,
      );
      timeoutsRef.current.set(id, autoTimeout);
    }, spawnInterval);

    return () => clearInterval(interval);
  }, [score]);

  // Condición de victoria
  useEffect(() => {
    if (score >= WINNING_SCORE && !gameOverRef.current) {
      gameOverRef.current = true;
      timeoutsRef.current.forEach((t) => clearTimeout(t));
      timeoutsRef.current.clear();
      onWin();
    }
  }, [score, onWin]);

  // Condición de derrota
  useEffect(() => {
    if (lives <= 0 && !gameOverRef.current) {
      gameOverRef.current = true;
      timeoutsRef.current.forEach((t) => clearTimeout(t));
      timeoutsRef.current.clear();
      onLose();
    }
  }, [lives, onLose]);

  // Limpieza general al salir del juego
  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach((t) => clearTimeout(t));
      timeoutsRef.current.clear();
    };
  }, []);

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-4">
      <div className="flex w-full items-center justify-between px-1">
        <span className="text-sm font-semibold text-terracotta">
          Puntos: {score}/{WINNING_SCORE}
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

      <div className="glass relative h-64 w-full overflow-hidden rounded-3xl xs:h-72 sm:h-96">
        {bubbles.map((bubble) => {
          const Icon = bubble.type === "heart" ? Heart : Bomb;
          return (
            <button
              key={bubble.id}
              type="button"
              onClick={() => popBubble(bubble.id, true)}
              aria-label={bubble.type === "heart" ? "Corazón" : "Bomba"}
              className={`absolute flex h-14 w-14 items-center justify-center rounded-full shadow-glass transition-all duration-200 active:scale-90 ${
                bubble.popping ? "scale-0 opacity-0" : "scale-100 opacity-100"
              } ${bubble.type === "heart" ? "bg-coral text-cream" : "bg-ink/80 text-cream"}`}
              style={{ left: `${bubble.left}%`, top: `${bubble.top}%` }}
            >
              <Icon
                size={24}
                className={bubble.type === "heart" ? "fill-current" : ""}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
