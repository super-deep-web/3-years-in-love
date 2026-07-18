"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Unlock } from "lucide-react";
import { useUnlocks } from "@/components/providers/UnlocksProvider";
import ChoiceModal from "@/components/sections/ChoiceModal";
import Button from "@/components/ui/Button";

export default function MiniGameLauncher() {
  const router = useRouter();
  const { ready } = useUnlocks();
  const [showChoices, setShowChoices] = useState(false);

  if (!ready) return null;

  const handleChoose = (sectionKey) => {
    router.push(`/juego/${sectionKey}`);
    setShowChoices(false);
  };

  return (
    <div className="mt-8 flex flex-col items-center gap-3">
      <Button
        onClick={() => setShowChoices(true)}
        icon={Unlock}
        variant="outline"
      >
        Descubre algo nuevo
      </Button>

      {showChoices && (
        <ChoiceModal
          onClose={() => setShowChoices(false)}
          onChoose={handleChoose}
        />
      )}
    </div>
  );
}
