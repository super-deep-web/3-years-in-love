"use client";

import { useState } from "react";
import { Mail, MailOpen, X, Heart } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";

export default function LetterCard({ letter }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group w-full text-left"
        aria-haspopup="dialog"
      >
        <GlassCard className="relative flex items-center gap-4 overflow-hidden px-5 py-5 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg group-active:scale-[0.98] sm:px-6 sm:py-6">
          <span className="pointer-events-none absolute inset-y-0 left-0 w-1/2 -translate-x-[150%] bg-gradient-to-r from-transparent via-cream/60 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[250%]" />

          <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-apricot/50 text-coral transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
            <Mail
              size={20}
              className="transition-opacity duration-200 group-hover:opacity-0"
            />
            <MailOpen
              size={20}
              className="absolute opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            />
          </span>

          <span className="font-display relative block text-lg font-medium text-ink sm:text-xl">
            {letter.title}
          </span>
        </GlassCard>
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={letter.title}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/40 px-6 backdrop-blur-sm animate-fade-in-up"
          onClick={() => setOpen(false)}
        >
          <div
            className="glass-strong relative max-h-[75vh] w-full max-w-md overflow-y-auto rounded-3xl p-7 shadow-glass animate-letter-open sm:p-9"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Cerrar carta"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-ivory text-ink/60 transition-colors hover:bg-coral hover:text-cream"
            >
              <X size={18} />
            </button>

            <span className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-coral text-cream">
              <Mail size={20} />
              <span className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-2xl bg-coral animate-seal-crack">
                <Heart size={16} className="fill-current text-cream" />
              </span>
            </span>

            <div className="animate-content-reveal">
              <h3 className="font-display mt-4 text-2xl font-medium text-ink">
                {letter.title}
              </h3>

              {letter.photo && (
                <div className="mt-4 flex justify-center">
                  <div className="rounded-md bg-white p-2 pb-4 shadow-glass">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={letter.photo}
                      alt=""
                      className="block max-h-56 w-full rounded-sm object-contain"
                    />
                  </div>
                </div>
              )}

              <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-ink/80 sm:text-base">
                {letter.body}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
