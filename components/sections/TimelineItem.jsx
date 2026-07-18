import { Heart } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";

export default function TimelineItem({ item, isLast }) {
  return (
    <div className="relative flex gap-5 pl-2">
      <div className="flex flex-col items-center">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-coral text-cream shadow-glass">
          <Heart size={16} fill="currentColor" />
        </span>
        {!isLast && (
          <span className="mt-1 w-[3px] flex-1 rounded-full bg-terracotta/30" />
        )}
      </div>

      <GlassCard className="mb-8 flex-1 px-5 py-5 sm:px-6 sm:py-6">
        <p className="text-sm font-semibold text-coral sm:text-base">
          {item.date}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-ink/70 sm:text-base">
          {item.description}
        </p>
      </GlassCard>
    </div>
  );
}
