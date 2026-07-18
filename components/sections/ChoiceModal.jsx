"use client";

import { useEffect, useState } from "react";
import {
  HelpCircle,
  Sparkles,
  Heart,
  Flower2,
  RotateCcw,
  PartyPopper,
} from "lucide-react";
import GameModal from "@/components/games/GameModal";
import { useUnlocks } from "@/components/providers/UnlocksProvider";
import { CORE_SECTIONS } from "@/lib/unlocks";

const REVEAL_ICONS = [Sparkles, Heart, Flower2];

export default function ChoiceModal({ onClose, onChoose }) {
  const { unlocks, resetUnlocks } = useUnlocks();
  const allDone = CORE_SECTIONS.every((key) => unlocks[key]);
  // 'choosing' -> esperando selección | 'revealing' -> la carta gira
  // 'leaving' -> el modal se desvanece antes de navegar
  const [phase, setPhase] = useState("choosing");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (phase === "revealing") {
      const t = setTimeout(() => setPhase("leaving"), 700);
      return () => clearTimeout(t);
    }
    if (phase === "leaving") {
      const t = setTimeout(() => onChoose(CORE_SECTIONS[selected]), 350);
      return () => clearTimeout(t);
    }
  }, [phase, onChoose, selected]);

  const handlePick = (index) => {
    if (phase !== "choosing") return;
    if (unlocks[CORE_SECTIONS[index]]) return;
    setSelected(index);
    setPhase("revealing");
  };

  const handleReset = () => {
    if (
      window.confirm("¿Borrar todo el progreso y volver a empezar los 3 retos?")
    ) {
      resetUnlocks();
      onClose();
    }
  };

  return (
    <GameModal
      title="Elige una opción"
      onClose={phase === "choosing" ? onClose : undefined}
    >
      <div
        className={`transition-opacity duration-300 ${
          phase === "leaving" ? "opacity-0" : "opacity-100"
        }`}
      >
        {allDone ? (
          <p className="mb-5 flex items-center justify-center gap-2 text-sm font-medium text-coral">
            <PartyPopper size={16} /> ¡Felicidades mi amor! Terminaste los
            juegos que preparé para ti.
          </p>
        ) : (
          <p className="mb-5 text-sm font-medium text-ink">
            Descubre que es eligiendo una.
          </p>
        )}
        <div className="flex justify-center gap-3 [perspective:800px]">
          {CORE_SECTIONS.map((sectionKey, index) => {
            const RevealIcon = REVEAL_ICONS[index];
            const isCompleted = unlocks[sectionKey];
            const isSelected = selected === index;
            const isFlipped =
              isCompleted || (phase !== "choosing" && isSelected);
            const isFadingOut =
              phase !== "choosing" && !isSelected && !isCompleted;

            return (
              <button
                key={sectionKey}
                type="button"
                onClick={() => handlePick(index)}
                disabled={phase !== "choosing" || isCompleted}
                aria-label={
                  isCompleted ? "Reto ya completado" : `Opción ${index + 1}`
                }
                className={`relative h-20 w-16 transition-all duration-500 [transform-style:preserve-3d] ${
                  isFadingOut ? "scale-90 opacity-0" : ""
                } ${isCompleted ? "cursor-default" : ""}`}
                style={{
                  transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
              >
                <span className="absolute inset-0 flex flex-col items-center justify-center gap-1 rounded-2xl bg-gradient-to-br from-apricot to-terracotta text-cream shadow-glass [backface-visibility:hidden]">
                  <HelpCircle size={22} />
                  <span className="text-xs font-semibold">{index + 1}</span>
                </span>

                <span
                  className={`absolute inset-0 flex items-center justify-center rounded-2xl text-cream shadow-glass [backface-visibility:hidden] ${
                    isCompleted ? "bg-sage" : "bg-coral"
                  }`}
                  style={{ transform: "rotateY(180deg)" }}
                >
                  <RevealIcon size={22} />
                </span>
              </button>
            );
          })}
        </div>

        {(phase === "choosing" || allDone) && (
          <button
            type="button"
            onClick={handleReset}
            className="mx-auto mt-6 flex items-center gap-1.5 text-xs font-semibold text-ink/50 transition-colors hover:text-terracotta"
          >
            <RotateCcw size={13} />
            Empezar de nuevo
          </button>
        )}
      </div>
    </GameModal>
  );
}
