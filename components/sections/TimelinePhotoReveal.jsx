"use client";

import { useState } from "react";
import { Camera, X } from "lucide-react";

export default function TimelinePhotoReveal({ photo }) {
  const [open, setOpen] = useState(false);

  if (!photo) return null;

  return (
    <div className="mb-8 flex justify-center pl-14">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-terracotta shadow-glass transition-transform duration-200 active:scale-95"
      >
        <Camera size={15} />
        Ver fotito
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Foto del momento"
          className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/40 px-6 backdrop-blur-sm animate-fade-in-up"
          onClick={() => setOpen(false)}
        >
          <div
            className="glass-strong relative max-w-[90vw] overflow-hidden rounded-3xl p-4 shadow-glass"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Cerrar"
              className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-ivory text-ink/60 transition-colors hover:bg-coral hover:text-cream"
            >
              <X size={18} />
            </button>

            <div className="overflow-hidden rounded-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo}
                alt="Foto de este momento"
                className="block max-h-[75vh] max-w-full animate-photo-in animate-photo-drift object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
