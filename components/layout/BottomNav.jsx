"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Lock } from "lucide-react";
import { useUnlocks } from "@/components/providers/UnlocksProvider";
import { SECTION_KEYS, SECTION_META } from "@/lib/unlocks";

const NAV_ITEMS = [
  {
    href: "/historia",
    label: SECTION_META[SECTION_KEYS.HISTORIA].label,
    icon: SECTION_META[SECTION_KEYS.HISTORIA].icon,
    key: SECTION_KEYS.HISTORIA,
  },
  {
    href: "/motivos",
    label: SECTION_META[SECTION_KEYS.MOTIVOS].label,
    icon: SECTION_META[SECTION_KEYS.MOTIVOS].icon,
    key: SECTION_KEYS.MOTIVOS,
  },
  { href: "/", label: "Inicio", icon: Home, key: null },
  {
    href: "/cartas",
    label: SECTION_META[SECTION_KEYS.CARTAS].label,
    icon: SECTION_META[SECTION_KEYS.CARTAS].icon,
    key: SECTION_KEYS.CARTAS,
  },
  {
    href: "/galeria",
    label: SECTION_META[SECTION_KEYS.GALERIA].label,
    icon: SECTION_META[SECTION_KEYS.GALERIA].icon,
    key: SECTION_KEYS.GALERIA,
  },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { unlocks } = useUnlocks();

  return (
    <nav
      role="navigation"
      aria-label="Navegación principal"
      className="fixed inset-x-0 bottom-0 z-50"
    >
      <div className="glass-strong nav-safe-area grid w-full grid-cols-5 items-center rounded-t-2xl px-1 py-1.5 shadow-nav">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          const isLocked = item.key && !unlocks[item.key];

          if (isLocked) {
            return (
              <span
                key={item.href}
                aria-disabled="true"
                aria-label="Sección bloqueada"
                className="flex min-h-[44px] cursor-not-allowed flex-col items-center justify-center gap-0.5 rounded-xl py-1 opacity-40"
              >
                <Lock size={17} strokeWidth={2.2} className="text-ink/60" />
                <span className="text-[10px] font-semibold leading-none text-ink/60">
                  ???
                </span>
              </span>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className="flex min-h-[44px] flex-col items-center justify-center gap-0.5 rounded-xl py-1 transition-colors duration-200 active:scale-90"
            >
              <Icon
                size={19}
                strokeWidth={2.2}
                className={isActive ? "text-coral" : "text-ink/60"}
              />
              <span
                className={`text-[10px] font-semibold leading-none ${
                  isActive ? "text-coral" : "text-ink/60"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
