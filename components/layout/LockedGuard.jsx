"use client";

import { Lock } from "lucide-react";
import Button from "@/components/ui/Button";
import GlassCard from "@/components/ui/GlassCard";
import { useUnlocks } from "@/components/providers/UnlocksProvider";

export default function LockedGuard({ sectionKey, children }) {
  const { unlocks, ready } = useUnlocks();

  if (!ready) return null; // evita parpadeo mientras se lee localStorage

  if (!unlocks[sectionKey]) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
        <GlassCard className="flex max-w-sm flex-col items-center gap-3 px-8 py-10">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ivory text-coral">
            <Lock size={26} />
          </span>
          <p className="font-display text-xl font-medium text-ink">
            Esta sección está bloqueada
          </p>
          <p className="text-sm text-ink/70">
            Vuelve a Inicio y completa el mini-juego para desbloquearla.
          </p>
          <Button href="/" className="mt-2">
            Volver a Inicio
          </Button>
        </GlassCard>
      </div>
    );
  }

  return children;
}
