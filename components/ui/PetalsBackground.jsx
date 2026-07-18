import { Heart } from 'lucide-react';

const PETALS = [
  { left: "4%", size: 16, duration: 14, delay: 0, color: "text-apricot/50" },
  { left: "14%", size: 12, duration: 18, delay: 3, color: "text-peach/40" },
  { left: "24%", size: 20, duration: 16, delay: 6, color: "text-sage/40" },
  {
    left: "34%",
    size: 14,
    duration: 20,
    delay: 1,
    color: "text-terracotta/40",
  },
  { left: "46%", size: 18, duration: 15, delay: 8, color: "text-apricot/40" },
  { left: "58%", size: 12, duration: 19, delay: 4, color: "text-peach/50" },
  { left: "68%", size: 22, duration: 17, delay: 10, color: "text-sage/30" },
  {
    left: "78%",
    size: 15,
    duration: 21,
    delay: 2,
    color: "text-terracotta/30",
  },
  { left: "88%", size: 18, duration: 16, delay: 7, color: "text-apricot/40" },
  { left: "94%", size: 13, duration: 23, delay: 5, color: "text-peach/40" },
];

export default function PetalsBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {PETALS.map((petal, index) => (
        <span
          key={index}
          className={`absolute top-0 animate-petal-fall ${petal.color}`}
          style={{
            left: petal.left,
            animationDuration: `${petal.duration}s`,
            animationDelay: `${petal.delay}s`,
          }}
        >
          <Heart size={petal.size} strokeWidth={1.5} className="fill-current" />
        </span>
      ))}
    </div>
  );
}
