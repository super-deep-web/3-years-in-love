"use client";

import { X } from "lucide-react";

export default function GameModal({ title, onClose, children }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/40 px-6 backdrop-blur-sm animate-fade-in-up"
      onClick={onClose}
    >
      <div
        className="glass-strong relative w-full max-w-sm rounded-3xl p-7 text-center shadow-glass sm:p-9"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-ivory text-ink/60 transition-colors hover:bg-coral hover:text-cream"
        >
          <X size={18} />
        </button>
        <h3 className="font-display text-xl font-medium text-coral drop-shadow-sm sm:text-2xl">
          {title}
        </h3>
        <div className="mt-5">{children}</div>
      </div>
    </div>
  );
}
