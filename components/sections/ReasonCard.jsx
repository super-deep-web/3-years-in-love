import { Heart } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';

export default function ReasonCard({ reason, index }) {
  return (
    <GlassCard className="flex items-center gap-4 px-5 py-4 sm:px-6 sm:py-5">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sage/40 text-sage">
        <Heart size={16} fill="currentColor" />
      </span>
      <p className="text-sm leading-relaxed text-ink/80 sm:text-base">{reason}</p>
    </GlassCard>
  );
}
