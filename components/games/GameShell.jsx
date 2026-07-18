"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  PartyPopper,
  RotateCcw,
  Frown,
  Sparkles,
  Heart,
  Star,
} from "lucide-react";
import Button from "@/components/ui/Button";
import GlassCard from "@/components/ui/GlassCard";
import PageWrapper from "@/components/layout/PageWrapper";
import { useUnlocks } from "@/components/providers/UnlocksProvider";
import { GAMES_META } from "@/lib/games";
import { SECTION_META } from "@/lib/unlocks";

export default function GameShell({ gameKey }) {
  const router = useRouter();
  const { unlocks, unlockSection, ready } = useUnlocks();
  const [phase, setPhase] = useState("intro"); // intro | playing | won | lost
  const [attempt, setAttempt] = useState(0);

  const meta = GAMES_META[gameKey];
  const GameComponent = meta.component;
  const Icon = meta.icon;

  if (!ready) return null;

  if (unlocks[gameKey] && phase !== "won") {
    return (
      <PageWrapper className="flex flex-col items-center justify-center px-6 text-center">
        <GlassCard className="flex max-w-sm flex-col items-center gap-4 px-8 py-10">
          <h1 className="font-display text-2xl font-medium text-ink">
            Ya completaste el juego
          </h1>
          <p className="text-sm text-ink/70">
            Esta sorpresa ya está desbloqueada y si quieres puedes ir a verla
            con el siguiente botón. Espero que te esté gustando mi amor, te amo
            muchísimo.
          </p>
          <Button
            onClick={() => router.push(SECTION_META[gameKey].href)}
            icon={SECTION_META[gameKey].icon}
          >
            Ver {SECTION_META[gameKey].label}
          </Button>
        </GlassCard>
      </PageWrapper>
    );
  }

  const handleWin = () => {
    unlockSection(gameKey);
    setPhase("won");
  };

  const handleLose = () => setPhase("lost");

  const handleRetry = () => {
    setAttempt((a) => a + 1);
    setPhase("playing");
  };

  return (
    <PageWrapper className="flex flex-col items-center justify-center px-6 text-center">
      {phase === "intro" && (
        <GlassCard className="flex max-w-sm flex-col items-center gap-5 px-8 py-10 animate-fade-in-up">
          <span className="relative flex h-16 w-16 items-center justify-center">
            <span className="absolute inset-0 rounded-full bg-coral/40 animate-ring-pulse" />
            <span className="absolute inset-0 rounded-full bg-coral/40 animate-ring-pulse [animation-delay:0.6s]" />
            <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-coral text-cream shadow-glass">
              <Icon size={28} strokeWidth={1.8} />
            </span>
          </span>

          <h1 className="font-display text-2xl font-medium text-ink">
            {meta.title}
          </h1>

          <ul className="w-full space-y-2.5 text-left">
            {meta.rules.map((rule, index) => (
              <li
                key={rule}
                className="flex items-start gap-3 rounded-2xl bg-ivory/60 px-4 py-2.5 text-sm text-ink/75 animate-fade-in-up"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-coral text-[11px] font-bold text-cream">
                  {index + 1}
                </span>
                {rule}
              </li>
            ))}
          </ul>

          <Button onClick={() => setPhase("playing")} className="mt-2">
            Comenzar
          </Button>
        </GlassCard>
      )}

      {phase === "playing" && (
        <GameComponent key={attempt} onWin={handleWin} onLose={handleLose} />
      )}

      {phase === "lost" && (
        <GlassCard className="flex max-w-sm flex-col items-center gap-4 px-8 py-10 animate-fade-in-up">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-terracotta/20 text-terracotta animate-shake">
            <Frown size={30} strokeWidth={1.8} />
          </span>
          <h1 className="font-display text-2xl font-medium text-ink">
            Uy jopetas
          </h1>
          <p className="text-sm text-ink/70">
            Que mal mi princesita, pero yo sé que tu puedes hacerlo, inténtalo
            de nuevo jejeje
          </p>
          <Button onClick={handleRetry} icon={RotateCcw}>
            Intentar de nuevo
          </Button>
        </GlassCard>
      )}

      {phase === "won" && (
        <div className="relative flex max-w-sm flex-col items-center">
          <span className="pointer-events-none absolute -top-2 left-4 text-sage animate-confetti [animation-delay:0ms]">
            <Sparkles size={18} />
          </span>
          <span className="pointer-events-none absolute -top-1 right-6 text-coral animate-confetti [animation-delay:150ms]">
            <Heart size={16} className="fill-current" />
          </span>
          <span className="pointer-events-none absolute top-4 left-10 text-apricot animate-confetti [animation-delay:300ms]">
            <Star size={16} className="fill-current" />
          </span>
          <span className="pointer-events-none absolute top-2 right-12 text-terracotta animate-confetti [animation-delay:450ms]">
            <Sparkles size={14} />
          </span>
          <span className="pointer-events-none absolute -top-3 left-1/2 -translate-x-1/2 text-coral animate-confetti [animation-delay:600ms]">
            <Heart size={18} className="fill-current" />
          </span>

          <GlassCard className="flex w-full flex-col items-center gap-4 px-8 py-10 animate-fade-in-up">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-coral text-cream shadow-glass animate-pulse-soft">
              <PartyPopper size={28} />
            </span>
            <h1 className="font-display text-2xl font-medium text-ink">
              ¡Felicidades esposita!
            </h1>
            <p className="text-sm text-ink/70">
              Terminaste este jueguito y también pudiste desbloquear una nueva
              sección aquí, puedes ir a verla cuando quieras ahora, espero que
              te guste, te amo muchísimo.
            </p>
            <Button
              onClick={() => router.push(SECTION_META[gameKey].href)}
              icon={SECTION_META[gameKey].icon}
            >
              Ver {SECTION_META[gameKey].label}
            </Button>
          </GlassCard>
        </div>
      )}
    </PageWrapper>
  );
}
